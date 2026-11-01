---
title: "Deploying a release"
description: "An ordered release procedure for Inbils: preconditions, backup, build, migrate, restarts, health checks and how to roll back."
---

A release has one rule: back up first, change the code and database second, prove health last. This page is the ordered procedure for the Docker stack, with the host-managed variant noted where it differs. It is provider neutral. Commands that change a live system are production only.

## Preconditions

- The release is reviewed and merged, and the working tree on the deployment host is clean.
- A current backup exists, and its checksum verifies (see [Backup and restore](/docs/operations/backup-restore/)).
- `/up` and `/ready` exist in the target release.
- The queue workers and the scheduler are managed by a process manager (Docker, systemd, Supervisor), not by a shell session.
- You know whether the release contains a migration that cannot be reversed. If it does, plan a restore instead of a rollback (see below).

:::danger
Never run these on a deployed instance: `php artisan migrate:fresh`, `migrate:refresh`, `migrate:reset` and `db:seed`. The first three drop or rewind data. Production seeding is unsupported: a new permission ships through a migration, not through the seeder.
:::

## Procedure (Docker stack)

Run the commands from the repository on the host. `DOCKER_CONTEXT=default` is only needed when a Docker Desktop context is active.

1. **Announce the window and back up.** Run `scripts/operations/backup.sh`, verify the checksum, then stamp backup freshness:

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan ops:backup-heartbeat
   ```

   Keep `storage/app/private` in the media backup: ticket attachments, SPK evidence and customer documents live there.

2. **Maintenance mode** while migrating:

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan down --retry=60
   ```

3. **Keep a rollback image**, then build from the new code, pulling the base image:

   ```bash
   docker tag inbils-app:local inbils-app:before-release
   docker compose --env-file .env.docker build --pull app queue platform-queue scheduler
   ```

4. **Recreate the application services** from the new image (the database and Redis stay as they are):

   ```bash
   docker compose --env-file .env.docker up -d --no-deps app queue platform-queue scheduler
   ```

5. **Migrate** (production only):

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan migrate --force
   docker compose --env-file .env.docker exec -T app php artisan migrate:status
   ```

6. **Cache and restart.** Rebuild the configuration cache, reset the permission cache when the release added or changed permissions, and tell workers to load the new code:

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan config:cache
   docker compose --env-file .env.docker exec -T app php artisan permission:cache-reset
   docker compose --env-file .env.docker exec -T app php artisan queue:restart
   ```

   Do not run `cache:clear` as a routine step: the cache also holds the API idempotency records (24 hours), throttle counters and the heartbeats that `/ready` reads.

7. **Leave maintenance mode:**

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan up
   ```

8. **Check health** (next section).

## Procedure (host-managed PHP)

For a host that runs PHP itself, the sequence from a fresh checkout is:

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan down --retry=60
# back up here, then: php artisan ops:backup-heartbeat
php artisan migrate --force
php artisan up
php artisan queue:restart
```

Then confirm the process manager brought the workers back and the scheduler timer is still active:

```bash
sudo systemctl status inbils-queue-worker
sudo systemctl status inbils-platform-queue-worker
sudo systemctl status inbils-scheduler.timer
```

## Health checks after the release

```bash
curl -s http://127.0.0.1:8000/up
curl -s http://127.0.0.1:8000/ready
bash scripts/operations/health-check.sh --base-url http://127.0.0.1:8000
```

Use your own base URL (the Docker stack defaults to port 8080). `health-check.sh` exits 0 only when `/up` and `/ready` both answer HTTP 200 and the `/ready` body says `"status":"ready"`. A `degraded` answer is HTTP 200 but fails the script: read which check is `fail` (see [Health checks, logs and metrics](/docs/operations/observability/)).

Also confirm:

- `php artisan schedule:list` shows the expected billing and operations entries.
- The workers run under the process manager (`docker compose --env-file .env.docker ps`).
- `/platform/login` loads.
- In production `storage_link` and `mail` read `ok` in `/ready`. If `storage_link` fails, `public/storage` is not a symbolic link: run `php artisan storage:link`.

## Migration safety checklist

1. Create a fresh backup and verify its checksum.
2. Run the migration against a non-production clone first.
3. Use `php artisan down --retry=60` to avoid partial writes.
4. Prefer expand, migrate, contract: add nullable columns, backfill, then enforce constraints.
5. Check the migration is reversible. If it destroys or rewrites data, prepare a restore from backup instead of a rollback.
6. Run `php artisan migrate --force`, then `php artisan migrate:status` and `/ready`.
7. Run `php artisan up`.

## Configuration to check on every install

- `TRUSTED_PROXIES`: set it behind a reverse proxy or load balancer (comma-separated addresses, CIDR ranges allowed, `*` only when the proxy is the single way in).
- `MAIL_FROM_ADDRESS` and `MAIL_FROM_NAME`: a real address on your own domain.
- Logging: `LOG_CHANNEL=stack`, `LOG_STACK=stderr,daily`, `LOG_DAILY_DAYS=14`, `LOG_STDERR_FORMATTER=Monolog\Formatter\JsonFormatter`, `LOG_LEVEL=info`. A running deployment keeps its own `.env.docker`: template changes do not reach it by themselves.
- Queue timing: `retry_after` is 180 seconds on the `database` and `redis` connections (`DB_QUEUE_RETRY_AFTER`, `REDIS_QUEUE_RETRY_AFTER`). If the host sets either lower, raise it to at least 180.
- `CACHE_STORE` must outlive a request (`redis` or `database`), because the duplicate-submit guard keeps its key in the cache for 10 seconds.
- `APP_KEY`: back it up with the database. When rotating it, list the old key in `APP_PREVIOUS_KEYS` (comma-separated) until stored secrets are saved again.

## Private uploads (one-time per environment)

Ticket attachments, SPK evidence and customer documents live on the private disk (`storage/app/private`) and are served only after the owner's policy allows it. Files uploaded before that change sit on the public disk until you move them:

```bash
php artisan inbils:media:privatize --dry-run
php artisan inbils:media:privatize
php artisan inbils:media:privatize
```

The first command lists what would move and writes nothing. The second copies, verifies, flips the row and removes the public copy. The third must report `Moved 0 media`. Run it as the user that owns `storage/`. Exit code 1 means at least one media is still on the public disk: a `Failed <id>: ...` or `Missing <id>: public:<path>` line names the cause. Fix it and rerun.

## Rolling back

Roll back the application first when the problem is code-only. Do not roll back a migration blindly. The decision tree is on [Backup and restore](/docs/operations/backup-restore/). In short, for a release with no schema change:

```bash
docker tag inbils-app:before-release inbils-app:local
docker compose --env-file .env.docker up -d --no-deps app queue platform-queue scheduler
docker compose --env-file .env.docker exec -T app php artisan queue:restart
```

If the release ran a destructive or one-way migration, stop and restore from backup into a fresh target before pointing traffic at it.
