---
title: "Health checks, logs and metrics"
description: "How to read /up and /ready, trace a request by id, use the audit log and logs, and which alerts an Inbils operator should wire."
---

Inbils gives an operator three kinds of signal: health endpoints, structured logs with a request id, and the audit trail in the database. It does not ship a vendor APM or error reporter. You choose one (Sentry, Bugsnag, OpenTelemetry or another) and connect it yourself.

## Health endpoints

| Endpoint | Purpose | Status values |
|---|---|---|
| `GET /up` | Liveness (Laravel default) | framework health |
| `GET /ready` | Dependency readiness | `ready`, `degraded`, `not_ready` |

The `/ready` body is public-safe JSON. It never returns hosts, DSNs, exception messages or stack traces.

```json
{
  "status": "ready|degraded|not_ready",
  "checks": {
    "database": "ok|fail|unknown",
    "cache": "ok|fail|unknown",
    "queue": "ok|fail|unknown",
    "failed_jobs": "ok|fail|unknown",
    "scheduler": "ok|fail|unknown",
    "backup": "ok|fail|unknown",
    "storage_link": "ok|fail|unknown",
    "mail": "ok|fail|unknown"
  }
}
```

A database `fail` makes the overall status `not_ready` (HTTP 503). Any other `fail` makes it `degraded` (HTTP 200 with the degraded status).

| Check | Meaning |
|---|---|
| `scheduler` | `ok` only when the cache key `ops:scheduler:heartbeat_at` is fresh (300 seconds or less). The scheduler entry `ops:scheduler-heartbeat` writes it every 5 minutes. |
| `backup` | Reads the marker written by `php artisan ops:backup-heartbeat` after a verified backup. Older than 25 hours is `fail`; never set is `unknown`. |
| `storage_link` | `ok` when every link declared in `config/filesystems.php` (`public/storage`) is a symbolic link to its target. `fail` when it is a real directory, a broken link or points elsewhere: uploaded logos then show as broken images. Fix with `php artisan storage:link` after removing the copied directory. `unknown` in a test run. |
| `mail` | Judged only when `APP_ENV=production`, otherwise `unknown`. `fail` when `MAIL_FROM_ADDRESS` is empty, ends with `.local` or ends with `example.com`. The overall status becomes `degraded`, not `not_ready`. |

The Docker `app` service uses `/ready` as its healthcheck. To check both endpoints from a shell:

```bash
bash scripts/operations/health-check.sh --base-url http://127.0.0.1:8000
```

## Request id

One id follows a request from the browser or the app to the log line, the queued job, the vendor call and the audit row.

- The middleware `App\Http\Middleware\AssignRequestId` runs first, so even the maintenance-mode answer (503) carries an id.
- It accepts an incoming `X-Request-Id` or `X-Correlation-Id` of 1 to 128 characters from `[A-Za-z0-9._:-]`, otherwise it generates a UUID. A client-supplied id is trusted as sent, so never use it for authorisation.
- Every response echoes `X-Request-Id`. Every `api/*` error body carries `request_id`, and the browser error page shows "ID permintaan".
- The id reaches every log record as `extra.request_id`, the queued jobs the request dispatches, outbound `Http::` calls (Midtrans, WhatsApp Cloud API, Nominatim) as the `X-Request-Id` header, and every `activity_log` row.

When a user reports a problem, ask for the id and search:

```bash
docker compose --env-file .env.docker logs app | grep <id>
```

```sql
select * from activity_log where request_id = '<id>';
```

On a host without Docker use `grep <id> storage/logs/laravel-*.log`. Log consumers that read `context.request_id` must read `extra.request_id`.

## Logs

- The deploy template sets `LOG_CHANNEL=stack`, `LOG_STACK=stderr,daily`, `LOG_DAILY_DAYS=14` and `LOG_STDERR_FORMATTER=Monolog\Formatter\JsonFormatter`: one JSON object per line on stderr (what `docker compose logs` shows) and one file per day in `storage/logs/laravel-YYYY-MM-DD.log`, 14 files kept. `LOG_LEVEL=info` keeps `debug` lines out of production.
- Every Compose service uses the `json-file` driver with `max-size: 10m` and `max-file: 5`, at most 50 MB per container. The cap applies when a container is created, so run `docker compose --env-file .env.docker up -d` after a change; `restart` does not apply it.
- A running deployment keeps its own `.env.docker`. If it still writes one `storage/logs/laravel.log`, that file grows without a limit and no job prunes it. After switching, archive or delete it by hand.
- `App\Support\Observability\LogRedactor` replaces the whole value of secret and personal keys (for example `token`, `secret`, `authorization`, `cookie`, `api_key`, `nik`, `npwp`, `phone`, `email`, `session`, `signature`) with `[REDACTED]`, and the whole-key matches `otp`, `pin`, `code`. It does not cover the log message or an exception's own message: a `QueryException` message can embed SQL bindings. Code logs ids and class names, never values.
- Exceptions are logged through `ExceptionReporter`, once per exception instance, and at most 5 times a minute per failure site. With `APP_DEBUG=false` public responses never leak exception messages or traces.

### Log lines worth alerting on

Context holds ids and class names only.

| Message | Level | Meaning |
|---|---|---|
| `db.slow_query` | warning | A query took more than 500 ms. SQL with placeholders, no bindings. |
| `activity_log.pruned` | info | One line per retention group of the daily prune. `deleted` of 0 for days on a busy install means the prune stopped. |
| `geocode.failed` | warning | The address lookup (Nominatim) failed; the failure is not cached, so the next search asks again. |
| `radius.unavailable` | warning | A company's RADIUS database did not answer; network pages show the state as unknown. |
| `tickets.sla_check_failed` | warning | `CheckTicketSlaBreachesJob` ran out of tries. |
| `announcement.notify_failed` | warning | `SendAnnouncementNotifications` ran out of tries. |
| `push.send_failed` | warning | A push to FCM failed. |
| `integration.host_refused` | warning | A mail or RADIUS host was refused at runtime. |
| `queue.job_failed` | warning | A job failed for good. |

## Audit trail

The audit page (Laporan, Log Audit) and the platform audit page read one table, `activity_log`. Besides model changes, a row records where it came from: `request_id`, `ip_address` (only for rows written inside a web or API request) and `user_agent` (only for the log names `security`, `platform` and `support`). Behind a reverse proxy set `TRUSTED_PROXIES`, or every row carries the proxy's address.

Security rows (log name `security`; the platform panel writes `platform`) cover `login`, `logout`, `login.failed`, `lockout`, password reset and change events, `two_factor.challenge_passed`, and `role.attached` and `role.detached`. No row holds the typed secret or address: `email_hash` is an HMAC of the lowercased address with `APP_KEY`.

Retention is set by `php artisan inbils:activity-log:prune`, scheduled daily at 19:30 UTC: 365 days for every log name, 730 days for `security`, `platform` and `support` (`config/activitylog.php`). `queue:prune-failed --hours=720` keeps `failed_jobs` for 30 days. The audit page needs a period of at most 92 days (7 days when none is given).

## Alerts to wire

| Signal | Severity | Detection | First action |
|---|---|---|---|
| HTTP 5xx spike | Sev-1 | Reverse-proxy or app log count | Check `/ready`, the last deploy, the exception log by `request_id`; roll back if it began after a deploy. |
| Latency p95 high | Sev-2 | Proxy or APM latency | Find the slow route; check database and cache. |
| Queue depth high | Sev-2 | `jobs` table depth or worker metrics | Make sure workers are up; drain the backlog; check failed jobs. |
| Failed jobs growing | Sev-1 | `failed_jobs` growth | Inspect by uuid; fix the consumer; do not re-run money or stock side effects blindly. |
| Scheduler heartbeat stale | Sev-2 | `/ready` `scheduler=fail` | Confirm `schedule:work` or cron runs; restore the heartbeat writer. |
| Backup stale or unknown | Sev-2 | `/ready` `backup` | Run `scripts/operations/backup.sh`, then stamp the heartbeat. |
| Billing failure | Sev-1 | Domain logs, failed jobs, admin notification | Inspect the billing error; stop retries if money is at risk; reconcile invoices by hand. |
| Ticket SLA breach | Sev-2 | `tickets:sla` and the breach notification | Assign or escalate the ticket. |
| Disk free low | Sev-1 | Host monitor | Free logs and backups; expand the volume. |
| Database unavailable | Sev-1 | `/ready` `database=fail` | Restore connectivity; keep the app in maintenance mode if needed. |

See [Queues and scheduler](/docs/operations/queues-and-scheduler/) for workers and [Backup and restore](/docs/operations/backup-restore/) for the backup signal.
