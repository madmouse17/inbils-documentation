---
title: "Troubleshooting"
description: "Fixes for common problems when running Inbils locally: Docker context, ports, storage link, Vite manifest, permissions, tests, queues and the HTTPS proxy."
---

These are the problems seen most often when running Inbils with Sail or the production-style stack. Each row gives the symptom and the fix. Commands use Sail; for the production-style stack, use `docker compose --env-file .env.docker exec app php artisan ...` instead.

## Docker and setup

| Symptom | Fix |
| --- | --- |
| `docker compose` against the deploy stack shows containers as only "Created", or an empty list | Use the root daemon: prefix with `DOCKER_CONTEXT=default` (or `export` it) |
| `sail build` says `vendor/laravel/sail` is missing | Run the throwaway-container `composer install` from [Getting started](/docs/getting-started/) first |
| Port already in use (80, 3306, 6379, 8025, 5173) | Set it for one shell: `APP_PORT=8081 ./vendor/bin/sail up -d` (keep `APP_URL` in sync), or `FORWARD_DB_PORT`, `FORWARD_REDIS_PORT`, `FORWARD_MAILPIT_DASHBOARD_PORT`, `VITE_PORT`. Never put `APP_PORT` in `.env` |

## Application

| Symptom | Fix |
| --- | --- |
| `/ready` shows `storage_link: fail` and status `degraded`, or uploaded logos are broken images | `./vendor/bin/sail artisan storage:link`. If `public/storage` is a real directory, run `mv public/storage public/storage.old` first |
| `/ready` `scheduler` or `backup` is `unknown` | Normal in development until `schedule:work` (or the `workers` profile) has run. Backups exist only where you run `scripts/operations/backup.sh` |
| "Unable to locate file in Vite manifest" | `./vendor/bin/sail npm run build`, or start `npm run dev` |
| Queue jobs, mails or bells do not appear | Start the workers (see [Getting started](/docs/getting-started/)) and look at Mailpit. Run `queue:restart` after code changes |
| A worker or the scheduler runs old code | `./vendor/bin/sail artisan queue:restart`. For the 8080 stack, rebuild and recreate `app queue platform-queue scheduler` |
| Page loads without styles behind `https://inbils.test` | `TRUSTED_PROXIES` must cover the Docker networks, see [Local .test domains](/docs/getting-started/local-domains/) |
| Vite HMR does not work behind `https://inbils.test` | HMR does not work behind the HTTPS proxy. Use <http://localhost> for `npm run dev` |

## Files and permissions

| Symptom | Fix |
| --- | --- |
| Permission denied or EACCES on `storage/app/...` from the host or from E2E, after a run as root | Files made by `sail exec` without `-u sail` are root-owned. Fix: `./vendor/bin/sail exec -T laravel.test sh -c 'find /var/www/html/storage -user root -exec chown 1000:1000 {} +'` (use your `id -u`:`id -g` if not 1000). Run PHP tasks as `sail artisan ...` or `sail exec -u sail` |

## Tests

| Symptom | Fix |
| --- | --- |
| Test refuses to boot: "PHPUnit bootstrap safety guard refused to bootstrap Laravel." | The environment points at another database, or `bootstrap/cache/config.php` exists. Run `./vendor/bin/sail artisan config:clear`, and do not export `DB_*` or `APP_ENV` in your shell |
| Tests cannot connect to MySQL as `inbils` | The MySQL volume predates the init script. Apply it once, see [Running the tests](/docs/getting-started/testing/) |
| E2E login fails right after a PHPUnit run | PHPUnit wiped the demo users in the shared `inbils_test`. `node scripts/e2e-setup.mjs` resets them |

## Push notifications

| Symptom | Fix |
| --- | --- |
| `Push is off` | `FIREBASE_CREDENTIALS` is empty, or the config cache predates the change. See [Integrations per company](/docs/getting-started/integrations/) |
| Bell exists, no push job | The recipient has no reachable device token for that app, or credentials are unset |
| Job fails after three tries | Check `queue:failed`, FCM v1 API enablement, the service-account project and network access |

:::note
Never run `migrate:fresh`, `db:wipe`, `sail down -v` or `docker volume rm` to fix a problem on data you want to keep.
:::
