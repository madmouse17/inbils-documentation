---
title: "Running the tests"
description: "Run PHPUnit, the quality gates and the Playwright E2E suite for Inbils: the inbils_test database rule, exact commands, locks and what not to run together."
---

Inbils has a PHPUnit suite (PHPUnit 11 with the parallel runner), static checks and a Playwright E2E suite (chromium). Tests and E2E use one MySQL schema and share locks, so read the rules below before you run them.

## The `inbils_test` database rule

Tests and E2E use the MySQL schema `inbils_test` and nothing else, never `inbils`. `phpunit.xml` pins host `mysql`, schema `inbils_test` and user `inbils`. `Tests\TestCase` refuses to boot on any other target.

The Sail MySQL init script `docker/mysql/sail/10-create-test-database.sh` creates the schema, the `inbils` test user and its grants (including the `inbils_test_test_%` worker schemas used by parallel runs) once, when the MySQL volume is first created. A normal fresh setup needs nothing. If your volume existed before that script, apply it once:

```bash
./vendor/bin/sail exec -T mysql bash -s < docker/mysql/sail/10-create-test-database.sh
```

## PHPUnit

Run one file or filter serially. This runs on `inbils_test` and costs no schema rebuild:

```bash
./vendor/bin/sail artisan test --compact tests/Feature/Admin/DashboardTest.php
./vendor/bin/sail artisan test --compact --filter=SomeTest
```

Run the full suite in parallel (about 5400 tests, about 33 minutes with 3 workers). Check `uptime` first and keep the load under 6:

```bash
flock /tmp/inbils-e2e.lock env DOCKER_CONTEXT=default ./vendor/bin/sail exec -T -u sail laravel.test \
  flock /tmp/inbils-phpunit.lock php -d memory_limit=1G artisan test --parallel --processes=3 --compact
```

- The maximum is 4 processes. Use 4 only on a quiet host.
- Never pass `--drop-databases` or `--recreate-databases`. Workers reuse the schemas `inbils_test_test_<N>`.
- A test class with a database trait runs on its worker's own schema; a class without one stays on `inbils_test`.

## Other quality gates

```bash
./vendor/bin/sail bin pint --dirty              # PHP format
./vendor/bin/sail composer analyse              # PHPStan (larastan) level 5
./vendor/bin/sail npm run typecheck
./vendor/bin/sail npm run lint
./vendor/bin/sail npm run format:check
./vendor/bin/sail npm run build                 # tsc + vite build
```

## Playwright E2E

E2E runs on the host against a canonical server on port 8010 and the schema `inbils_test`. It needs Node, a PHP CLI (8.4+, with `vendor/` installed; set `PHP_BINARY` to use a specific binary) and a reachable MySQL that has `inbils_test` and the `inbils` user.

### First run

```bash
npm ci --legacy-peer-deps
npx playwright install chromium
cp .env.e2e.example .env.e2e        # fill DB_PASSWORD; `.env.e2e` is git-ignored
php artisan key:generate --env=e2e  # or ./vendor/bin/sail artisan key:generate --env=e2e
```

`.env.e2e.example` points at `127.0.0.1:3307`, the MySQL of the production-style stack. Its `DB_PASSWORD` is `DOCKER_DB_PASSWORD` from `.env.docker`. The Sail MySQL (`127.0.0.1:3306`) has the same schema and user, so `DB_PORT=3306` is the alternative when you do not run the 8080 stack.

### The canonical command

```bash
flock /tmp/inbils-e2e.lock sh -c 'npm run build && node scripts/e2e-setup.mjs && npm run test:e2e -- --project=chromium --workers=1'
```

- Do not add a positional spec path. The runner forwards arguments to Playwright, which reads them as a file filter and reports "No tests found". Use `--grep "<text>"`, or `npm run test:e2e:smoke` for the `@smoke` tests.
- `node scripts/e2e-setup.mjs` resets the data. Never run `tests/e2e/setup.php` directly.

## Locks and what not to run together

:::caution
Never run PHPUnit, the E2E suite and `npm run docs:screenshots` at the same time. They share `inbils_test` and a mutex. Running them together makes them wipe each other's data.
:::

- E2E and `docs:screenshots` take the lock `/tmp/inbils-e2e.lock`. Parallel PHPUnit takes `/tmp/inbils-phpunit.lock` inside the container.
- The E2E setup wrapper also takes a canonical mutex and refuses to reset data while another `npm run test:e2e` suite is active.
- A PHPUnit run wipes the demo users in `inbils_test` (`RefreshDatabase`). If E2E login fails right after PHPUnit, run `node scripts/e2e-setup.mjs`.

See [Troubleshooting](/docs/getting-started/troubleshooting/) for the errors that follow from these rules.
