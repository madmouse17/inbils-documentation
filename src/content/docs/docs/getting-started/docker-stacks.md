---
title: "Docker stacks"
description: "The two independent Inbils Docker stacks, Sail on port 80 and the production-style stack on port 8080: contents, when to use which, commands and ports."
---

Inbils ships two Docker stacks. They are independent Compose projects with no shared containers, networks, volumes or ports. You can run both at the same time.

## The two stacks

| | Sail (development) | Production-style stack |
| --- | --- | --- |
| Compose file | `compose.sail.yaml`, selected by `SAIL_FILES` in `.env` | `compose.yaml` with `Dockerfile` |
| Project / network | `inbils-sail` / `inbils-sail_sail` | `inbils` / `inbils_inbils` |
| App runtime | `sail-8.5/app` (PHP 8.5, Node 24, `artisan serve`, source bind-mounted) | FrankenPHP image `inbils-app:local`, source baked in |
| Env file | `.env` | `.env.docker`, passed with `--env-file` |
| App | <http://localhost> | <http://localhost:8080> |
| MySQL | `127.0.0.1:3306`, user `sail`, schema `inbils` | `127.0.0.1:3307`, user `inbils` |
| Redis / Mailpit | `127.0.0.1:6379` / <http://localhost:8025> | Redis internal only / none |
| Named volumes | `inbils-sail_sail-mysql`, `inbils-sail_sail-redis` | `inbils_mysql_data`, `inbils_redis_data`, `inbils_app_storage` |

### What each contains

- **Sail**: the app container (`laravel.test`), MySQL, Redis and Mailpit. The `queue` and `scheduler` services exist too but sit under the profile `workers` and start only with `COMPOSE_PROFILES=workers`.
- **Production-style stack**: the FrankenPHP app, MySQL 8.4, Redis, a `queue` worker (default and WhatsApp queues), a `platform-queue` worker (the platform panel's hour-long jobs) and a `scheduler`.

## When to use which

- Use **Sail** for day-to-day development. The source is bind-mounted, so code edits need no rebuild. Run `./vendor/bin/sail npm run build` after frontend changes.
- Use the **production-style stack** to check what a release image does: source baked in, separate workers, `APP_ENV=production` in the example env file. It is also the stack that the deployment procedure builds. See [Deployment](/docs/operations/deployment/).

:::caution
Every Sail port is published on `127.0.0.1` only. Sail runs with `APP_DEBUG=true`, public demo credentials and unauthenticated Redis, so never expose it.
:::

## Set up the production-style stack

```bash
cp .env.docker.example .env.docker      # git-ignored; set APP_KEY and the DOCKER_DB_* secrets
docker run --rm dunglas/frankenphp:php8.5-bookworm php -r 'echo "base64:", base64_encode(random_bytes(32)), PHP_EOL;'   # a fresh APP_KEY value
export DOCKER_CONTEXT=default           # the root daemon; see the note below
docker compose --env-file .env.docker config > /dev/null
docker compose --env-file .env.docker build --pull
docker compose --env-file .env.docker up -d
docker compose --env-file .env.docker exec app php artisan migrate --force
docker compose --env-file .env.docker exec app php artisan db:seed --force     # production env: roles, settings, regions only
docker compose --env-file .env.docker exec app php artisan inbils:setup        # first user, then the wizard
docker compose --env-file .env.docker ps
```

Check <http://localhost:8080/up>, <http://localhost:8080/ready> and <http://localhost:8080/platform/login>. Back up before updating a stack that holds data, see [Backup and restore](/docs/operations/backup-restore/).

## The `DOCKER_CONTEXT=default` note

The deploy stack runs on the root Docker daemon. With another Docker context (for example Docker Desktop), `docker compose` shows the containers as only "Created", or an empty list. Prefix commands with `DOCKER_CONTEXT=default`, or `export` it for the shell.

## Daily commands (Sail)

| Task | Command |
| --- | --- |
| Start / stop (keeps data) | `./vendor/bin/sail up -d` / `./vendor/bin/sail stop` |
| Artisan, tinker | `./vendor/bin/sail artisan <cmd>`, `./vendor/bin/sail artisan tinker` |
| Migrate | `./vendor/bin/sail artisan migrate --force` |
| Frontend HMR | `./vendor/bin/sail npm run dev` (then <http://localhost>) |
| Frontend build | `./vendor/bin/sail npm run build` |
| Logs | `./vendor/bin/sail artisan pail` or `./vendor/bin/sail logs -f laravel.test` |
| Shell in the app container | `./vendor/bin/sail shell` |
| Export the mobile API contract | `./vendor/bin/sail artisan scramble:export` |
| Render user-guide PDFs | `./vendor/bin/sail exec -T -u sail laravel.test php -d memory_limit=1G artisan inbils:docs:pdf` |

:::danger
Never run `migrate:fresh`, `db:wipe`, `sail down -v`, `docker volume rm` or `docker system prune --volumes` on data you want to keep. `sail stop` and `sail down` keep the MySQL and Redis volumes. Do not run `sail:install` or `sail:add`: they edit `compose.yaml`.
:::

## Ports

| Stack | Service | Default | Change for one shell |
| --- | --- | --- | --- |
| Sail | App | 80 | `APP_PORT=8081 ./vendor/bin/sail up -d` (keep `APP_URL` in sync) |
| Sail | MySQL | 3306 | `FORWARD_DB_PORT` |
| Sail | Redis | 6379 | `FORWARD_REDIS_PORT` |
| Sail | Mailpit dashboard | 8025 | `FORWARD_MAILPIT_DASHBOARD_PORT` |
| Sail | Vite | 5173 | `VITE_PORT` |
| Production-style | App | 8080 | `APP_PORT` in `.env.docker` |
| Production-style | MySQL | 3307 | `MYSQL_HOST_PORT` in `.env.docker` |

Never put `APP_PORT` in the Sail `.env`: it is shared with `compose.yaml`. For the production-style stack, change the value in `.env.docker` and recreate the app service:

```bash
docker compose --env-file .env.docker up -d --force-recreate app
```

Do not publish Redis. In the production-style stack it is reachable only on the Compose network.
