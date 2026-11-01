---
title: "Queues and scheduler"
description: "Queue names, workers, timeouts and retries, the scheduled commands and their times, process supervision, worker restarts and tenant purge."
---

Inbils runs background work in two places: queue workers (jobs such as WhatsApp messages, push notifications, SLA checks) and the scheduler (commands that run on a clock, such as invoice generation). Both must run in production and both must be supervised by the host. A missing worker does not crash the application: jobs wait in the `jobs` table until one starts.

## Queues and workers

| Worker | Command | Reads | Tries | Timeout |
|---|---|---|---|---|
| Default | `php artisan queue:work --queue=default,whatsapp --sleep=3 --tries=3 --timeout=90` | `default`, `whatsapp` | 3 | 90 s |
| Platform | `php artisan queue:work platform --queue=platform --sleep=3 --tries=1 --timeout=3600` | `platform` | 1 | 3600 s |

The Docker stack runs them as the `queue` and `platform-queue` services. The default worker never reads the `platform` queue and the platform worker never reads the default ones, so run both. Tune `--timeout` above the longest expected job.

### The platform queue

The operator panel (`/platform`) hands slow work to its own connection and queue, so an hour-long job never blocks an invoice mail and a 90-second worker never kills it. It uses the database driver and the same `jobs` table. Jobs on it: `SeedTenantDemoDataJob` (sample data for a new tenant) and `BuildTenantExportJob` (tenant exports).

It runs with one try: a half-finished sample-data run rolls back as a whole and a failed export leaves a row in the panel. A silent retry would hide both, so the operator starts it again on purpose. Do not raise `--tries` without a root cause.

`retry_after` is 3660 s (fixed in `config/queue.php`, no environment variable), above the 3600 s timeout, so a running job is never handed to a second worker. Docker needs `stop_grace_period: 3660s`, because the default 10 seconds would kill a job in the middle.

Symptoms and checks:

| Symptom | Check |
|---|---|
| "Isi data contoh" was ticked but a new tenant stays empty | Is the platform worker running (`docker compose ps platform-queue`, `systemctl status inbils-platform-queue-worker`)? Rows with `queue = 'platform'` pile up in `jobs` if not. |
| Platform audit shows `tenant.demo_data_failed` | The row has the error class and a short message; `php artisan queue:failed` has the full job. Fix the cause and dispatch `SeedTenantDemoDataJob` again. The run is all or nothing, so a failed run left nothing behind. |
| `tenant.demo_data_failed` with "already has customers, jobs or invoices" | Sample data only goes into an empty company. This is by design. |
| A job ran twice | `retry_after` or `--timeout` was changed. Keep `retry_after` above `--timeout`. |
| Worker killed in the middle of a job | The stop timeout of the process manager is shorter than the job. |

### Retries, timeouts and reliable job rules

- `retry_after` is 180 seconds on the `database` and `redis` connections (`DB_QUEUE_RETRY_AFTER`, `REDIS_QUEUE_RETRY_AFTER`), above the longest default-queue job timeout (120 seconds), so a running job is never handed to a second worker. If the host sets either lower, raise it to at least 180.
- Jobs declare their own limits:

  | Job | Tries | Backoff | Timeout |
  |---|---|---|---|
  | `CheckTicketSlaBreachesJob` | 3 | 60/300 s | 60 s |
  | `SendAnnouncementNotifications` | 3 | 30/120/300 s | 120 s |
  | `BuildTenantExportJob` (platform queue) | 1 | none | 3600 s |
  | `WriteNasDeviceJob` | 1 | none | 60 s |
  | `CancelMidtransTransactionJob` | 3 | 10/60/300 s | 30 s |

- A job that ran out of tries is reported once: `ReportFailedQueueJob` writes the `queue.job_failed` warning with safe ids only, and some jobs add their own (`tickets.sla_check_failed`, `announcement.notify_failed`, `push.send_failed`). The row stays in `failed_jobs` for 30 days, then the daily `queue:prune-failed --hours=720` deletes it. Retry or investigate inside that window, and never re-run money or stock side effects blindly.
- Jobs are idempotent by design: recurring invoice generation skips a subscription that already has an invoice for the period (a unique index backs this), the SLA breach notice is stamped under a row lock, announcements claim `announcements.notified_at` under a row lock, and payments use a unique active reference.
- A billing command catches a failure per company, so one failing company does not stop the others. Each failed company's administrators get one notification (mail and database) and the command exits 1.
- Admin web writes have three guards against double clicks and stale tabs: an identical write within 10 seconds answers 409, a stale form (`expected_updated_at`) answers 409, and a write from a tab showing another company (`X-Inbils-Company`) answers 409.

## Scheduler

Define-and-forget: all entries live in `routes/console.php`. Run exactly one scheduler owner per environment, either once a minute with `php artisan schedule:run` or long-running with `php artisan schedule:work` (the Docker `scheduler` service). Never run both on several hosts. Check it with:

```bash
php artisan schedule:list
```

The overlap number is the lifetime in minutes of the `withoutOverlapping` lock, so a crashed run blocks the next one for at most that long. The `scheduler` container runs `php artisan schedule:clear-cache` before `schedule:work` to drop locks a crash left behind. A host that uses cron or systemd with `schedule:run` does not get this step, and waits for the locks to expire.

| Command | When | Overlap lock | What it does |
|---|---|---|---|
| `ops:scheduler-heartbeat` | every 5 minutes | none | Feeds the `/ready` scheduler check. |
| `announcements:publish-scheduled` | every minute | 10 | Sends due outage and maintenance notifications. |
| `tickets:sla` | every 15 minutes | 10 | Notifies once per SLA-breached ticket. |
| `midtrans:reconcile` | every 15 minutes | 10 | Asks Midtrans about payment attempts still pending after ten minutes. |
| `network:sync` | every 15 minutes | 10 | Queues one `SyncCompanyNetworkJob` per company with an enabled RADIUS integration. |
| `inventory:send-digest` | daily at 00:00 UTC | 120 | The warehouse digest for users who switched it on. |
| `customers:document-expiry` | daily at 00:30 | 120 | Reminds when a customer document enters its last 30 days. |
| `billing:whatsapp-reminders` | daily at 01:00 UTC | 120 | WhatsApp payment reminders H-3, H-1 and H+1. |
| `billing:generate` | daily at 02:00 | 120 | Recurring invoices (idempotent). |
| `billing:check-overdue` | daily at 03:00 | 120 | Marks past-due invoices overdue (idempotent). |
| `billing:suspend-overdue` | daily at 08:00 | 120 | Isolir for subscriptions past the grace days, for companies with auto suspend on. |
| `inbils:activity-log:prune` | daily at 19:30 UTC | 120 | Deletes audit rows past retention. |
| `inbils:platform:exports:prune` | hourly | 50 | Deletes expired tenant export archives and fails stale builds. |
| `promo-banners:cleanup-images` | daily | 120 | Deletes banner images 180 days after the banner ends. |
| `model:prune` | daily | none | Prunes the WhatsApp message log (12 months) and STOP receipts (30 days). |
| `sanctum:prune-expired --hours=24` | daily | none | Drops mobile tokens expired more than 24 hours ago. |
| `queue:prune-failed --hours=720` | daily | none | Deletes `failed_jobs` rows older than 30 days. |

All times are UTC: `config/app.php` sets the application timezone to `UTC` and `routes/console.php` sets no other timezone for any entry.

## Supervision

| Process | Command | Notes |
|---|---|---|
| Scheduler | `php artisan schedule:run` every minute, or `php artisan schedule:work` | Single owner only. |
| Default worker | `php artisan queue:work --sleep=3 --tries=3 --timeout=90` | Restart after every deploy. |
| Platform worker | `php artisan queue:work platform --queue=platform --tries=1 --timeout=3600` | Stop timeout above 3600 s. |

A supervised worker must restart on crash with backoff, start on boot, use bounded retries and a timeout, and write its output to host logs.

- **Docker.** The `queue`, `platform-queue` and `scheduler` services have healthchecks and a restart policy. `platform-queue` sets `stop_grace_period: 3660s`.

  ```bash
  docker compose --env-file .env.docker up -d --force-recreate platform-queue
  docker compose --env-file .env.docker logs --tail=100 platform-queue
  ```

- **systemd.** The repository ships example units under `deploy/systemd/` (`queue-worker.service.example`, `platform-queue-worker.service.example`, `scheduler.service.example`, `scheduler.timer.example`). Copy them, edit paths and user, then enable them. The platform unit needs `TimeoutStopSec=3660`.

  ```bash
  sudo cp deploy/systemd/queue-worker.service.example /etc/systemd/system/inbils-queue-worker.service
  sudo systemctl edit inbils-queue-worker --full
  sudo systemctl daemon-reload
  sudo systemctl enable --now inbils-queue-worker
  sudo systemctl status inbils-queue-worker
  sudo journalctl -u inbils-queue-worker -n 20 --no-pager
  ```

  The scheduler uses a timer: `sudo systemctl enable --now inbils-scheduler.timer`, then `sudo systemctl list-timers --all | grep inbils`.

- **Supervisor.** The example `docs/operations/examples/supervisor-laravel.conf.example` defines the `inbils-platform-queue` program with `stopwaitsecs=3700`.
- **Windows.** An NSSM service for each worker (the platform one with a stop timeout above one hour), and Task Scheduler for `schedule:run`. Examples ship under `docs/operations/examples/`.

## Restarting workers after a code change

Workers keep the old code in memory. After every deploy run:

```bash
php artisan queue:restart
```

Every worker, the platform one included, exits after its current job and the process manager starts it again on the new code. A running sample-data job finishes first, so a deploy can wait up to an hour for the platform worker. Do not kill it to hurry: the job rolls back and the operator must start it again. Then check the workers and the scheduler:

```bash
bash scripts/operations/health-check.sh --base-url http://127.0.0.1:8000
```

It expects `/up` 200 and `/ready` 200 with `"status":"ready"`.

## Tenant purge

A tenant (a top-level company with its subsidiaries) is deleted for good with one command at the server console. There is no web button, no queue job and no flag that skips a check.

```bash
php artisan inbils:platform:purge-company {code}
```

The command refuses unless all of these hold:

1. `{code}` is the exact code of a top-level company (case-sensitive; for a subsidiary, purge its head company).
2. The company and every subsidiary are suspended (`is_active = false`) and `suspended_at` is at least 30 days ago.
3. A platform admin requested the deletion (`deletion_requested_at` is set).
4. A tenant export finished after the suspension (`ready` or `expired`). The archive may be gone; the record proves it was made.
5. No user homed in the tenant is also a member of a company outside it.
6. A person is at the terminal: `--no-interaction` is refused, and the company code must be typed again after the plan is shown.

Everything is re-checked inside the transaction with the company row locked, so a reactivation between the question and the delete wins.

What it does:

1. Prints the company ids, the number of users and media files, and the row count of every table it will empty.
2. Writes `tenant.purge_started` to the platform audit with the code, name, company ids and counts.
3. In one transaction, detaches the tenant's platform audit rows (they keep `tenant_code` and `tenant_name`), removes the users' pivot rows, media rows, notifications, API tokens, sessions, reset tokens and role assignments, empties every table with a `company_id` (children first), then deletes the subsidiaries and the head company. Any error rolls everything back and writes `tenant.purge_failed`.
4. After the commit, deletes `companies/{id}` on the private and public disks (and any other disk a media row names) and the tenant's export archives, then writes `tenant.purge_completed`.

Roles, permissions, settings, regions, other tenants and platform accounts are never touched.

After a failed or partial run:

- **"database was left unchanged" (exit code 1).** Nothing was deleted. The message names the cause, usually a row of another company that points at one of this tenant's users. Fix the data and run it again.
- **"could not be deleted" (exit code 1).** The database part is done and cannot be undone. The command lists each leftover as `disk:path`. Remove them by hand (under `storage/app/private` or `storage/app/public`).
- **There is no undo.** The only way back is the last backup. Take one and check its date before you run the command on a tenant that matters. See [Backup and restore](/docs/operations/backup-restore/).

Run it in a quiet period: it deletes in one transaction, and a tenant with millions of audit rows holds its locks for as long as that takes.

See also [Deploying a release](/docs/operations/deployment/) and [Health checks, logs and metrics](/docs/operations/observability/).
