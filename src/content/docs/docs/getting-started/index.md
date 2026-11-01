---
title: "Getting started"
description: "Install Inbils locally with Laravel Sail: prerequisites, setup, seeding, first user, platform operator, health checks and workers."
---

This page takes you from a fresh clone to a running Inbils on your own machine, using Laravel Sail. Sail is the local development stack. Everything runs in containers, so the host needs no PHP or Composer. For a production-style stack, see [Docker stacks](/docs/getting-started/docker-stacks/).

## Prerequisites

| Need | Notes |
| --- | --- |
| Docker Engine with Compose v2 | Everything runs in containers; the host needs no PHP or Composer |
| Git | Access to the repository (`https://github.com/madmouse17/isp_inbils.git`) |
| About 6 GB free disk, ports free | 80, 3306, 6379, 1025, 8025, 5173 (all bound to `127.0.0.1`). You can change them per shell, see [Troubleshooting](/docs/getting-started/troubleshooting/) |
| Node.js and PHP on the host | Optional. Only the Playwright E2E suite and `npm run docs:screenshots` run on the host (Node 22+, PHP 8.4+ CLI) |

## First-time setup with Laravel Sail

Sail uses `compose.sail.yaml` and the Compose project `inbils-sail`. It is independent from the production-style stack in `compose.yaml`.

### 1. Clone and create `.env`

```bash
git clone https://github.com/madmouse17/isp_inbils.git inbils
cd inbils
cp .env.example .env
```

Edit `.env`. These are the keys that matter (names only; the values are yours):

| Key | What to do |
| --- | --- |
| `APP_KEY` | Leave empty; a step below generates it |
| `WWWUSER`, `WWWGROUP` | Set to the output of `id -u` and `id -g` if your host user is not 1000 |
| `DB_PASSWORD` | The committed value is a local placeholder that also initialises the Sail MySQL volume. Change it before the first `sail up` if you want another one; later changes do not reach an existing MySQL volume |
| `SAIL_FILES` | Keep `compose.sail.yaml` (already set) |
| `APP_PORT` | Leave unset (it is shared with `compose.yaml`) |
| `MAIL_*` | Defaults point to Mailpit; nothing to do |
| `FIREBASE_CREDENTIALS`, `MIDTRANS_*`, `WHATSAPP_*`, `RADIUS_*` | Optional. Leave empty, see [Integrations per company](/docs/getting-started/integrations/) |

### 2. Install PHP dependencies

`sail build` needs `vendor/laravel/sail`, which a fresh clone does not have. Run Composer once in a throwaway container:

```bash
docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html \
    composer:2 composer install --ignore-platform-reqs
```

### 3. Build, start and finish the install

```bash
./vendor/bin/sail build
./vendor/bin/sail up -d
./vendor/bin/sail ps                          # laravel.test, mysql, redis, mailpit must be healthy
./vendor/bin/sail composer install            # again, inside the container, with the real PHP extensions
./vendor/bin/sail artisan key:generate        # only while APP_KEY is empty
./vendor/bin/sail artisan migrate --force
./vendor/bin/sail artisan storage:link
./vendor/bin/sail npm ci --legacy-peer-deps
./vendor/bin/sail npm run build
```

## Seed the data

Choose one of the two options.

| Choice | Commands | Result |
| --- | --- | --- |
| Demo data (quickest way to see the app) | `./vendor/bin/sail artisan db:seed` | `DatabaseSeeder` seeds the permission catalogue, role templates, system settings and Indonesian region reference data. Because `APP_ENV=local`, it also creates a demo company `DEMO` ("Inbils Demo Company") with demo users and sample data. It is slow: the region seeder loads about 80k village rows |
| Clean install (production-like) | `./vendor/bin/sail artisan db:seed --class=RolePermissionSeeder`, then `--class=SystemSettingSeeder`, then `--class=IndonesiaRegionSeeder` | Catalogue, templates, settings and regions only: no company and no user |

:::danger
The demo seeder creates demo users that all share one public login secret. Never seed demo data on a real server.
:::

## First user and Setup Wizard

After demo data, open <http://localhost/login> and sign in with one of the demo users. They are defined in `database/seeders/DemoUserSeeder.php`.

After a clean install there is no user yet. Create the first user, log in at <http://localhost/login>, and the Setup Wizard (`/setup`, one-shot) creates the first company and copies the role templates:

```bash
./vendor/bin/sail artisan inbils:setup
```

The command asks for a name, an email and a login secret. It prints "Already bootstrapped." if any user exists.

## Platform operator and two-factor

The `/platform` panel uses a separate login that is not a tenant user. Tenants (companies) and subsidiaries are created there. Create the first operator, then enrol two-factor authentication at the first login:

```bash
./vendor/bin/sail artisan inbils:platform:admin-create
```

The command asks for a name, an email and a login secret (12 or more characters, letters and numbers). Then open <http://localhost/platform/login>.

## Check that it works

```bash
curl --fail http://localhost/up
curl http://localhost/ready      # JSON; "unknown" scheduler/backup is normal until heartbeats exist
```

## Service addresses

All addresses are loopback only.

| Service | Address |
| --- | --- |
| App | <http://localhost> |
| Mailpit (all outgoing dev mail) | <http://localhost:8025> |
| MySQL | `127.0.0.1:3306`, CLI with `./vendor/bin/sail mysql` |
| Redis | `127.0.0.1:6379` |
| Vite HMR | <http://localhost:5173> while `./vendor/bin/sail npm run dev` runs |

## Queue and scheduler

Mail, notifications, WhatsApp, Midtrans follow-ups and reports run on queues (`QUEUE_CONNECTION=database`). Billing and SLA checks run on the scheduler. Start them when you work on those features:

```bash
COMPOSE_PROFILES=workers ./vendor/bin/sail up -d       # queue + scheduler containers next to the app
# or in two terminals:
./vendor/bin/sail artisan queue:work --queue=default,whatsapp --tries=3 --timeout=90
./vendor/bin/sail artisan schedule:work
# the platform panel's long jobs (sample data, tenant exports) need their own worker:
./vendor/bin/sail artisan queue:work platform --queue=platform --tries=1 --timeout=3600
```

A worker keeps the code it started with. Run `./vendor/bin/sail artisan queue:restart` after changing a job, listener or notification.

## Next steps

- [Docker stacks](/docs/getting-started/docker-stacks/): Sail versus the deploy-like stack, and daily commands.
- [Integrations per company](/docs/getting-started/integrations/): Midtrans, WhatsApp, RADIUS, mail and push.
- [Running the tests](/docs/getting-started/testing/).
