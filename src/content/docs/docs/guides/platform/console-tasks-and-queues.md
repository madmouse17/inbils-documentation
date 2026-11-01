---
title: "11. Console tasks and queues"
description: "Reference for the server team: console commands, the platform queue worker, scheduler and retention periods, and the platform panel host setting."
---

## 11.1 Commands for the server team


Roles that can use it: the server team with terminal access and an approved operating procedure.

| Command | Purpose |
| --- | --- |
| `inbils:platform:admin-create` | Creates a new operator account interactively. |
| `inbils:platform:purge-company {kode}` | Permanently deletes a tenant after all requirements are met. |
| `inbils:platform:exports:prune` | Deletes expired archives and fails builds that have been stuck for more than 2 hours. The scheduler runs it every hour. |
| `inbils:company:create-subsidiary {head} {name} {code}` | Creates a subsidiary from the console, with options for currency, time zone and members. |
| `inbils:company:grant-membership {email} {company}` | Gives a user access to another company without changing their home company. |
| `inbils:company:revoke-membership {email} {company}` | Revokes an additional membership. The home company cannot be revoked. |
| `inbils:integrations:import-env --company={kode}` | Copies the old Midtrans, WhatsApp and RADIUS configuration from the environment to one company. Use `--dry-run` first. |
| `inbils:push:test {email}` | Tests push delivery to the user's app installations. Use `--dry-run` to validate FCM without sending. |
| `inbils:activity-log:prune` | Runs the audit clean-up manually according to the retention period. |

The membership commands accept the company code or internal id. Commands from the panel use the public id and do not accept an id from the browser as truth across tenants.

There is no command to reset operator 2FA. The 2FA reset in the panel targets only tenant `User` accounts.


## 11.2 Platform queue worker


Two slow jobs run on the `platform` connection and queue:

- `SeedTenantDemoDataJob` for **Isi data contoh** (Fill sample data);
- `BuildTenantExportJob` for the tenant export.

Production worker:

```bash
php artisan queue:work platform --queue=platform --sleep=3 --tries=1 --timeout=3600
```

With Sail:

```bash
./vendor/bin/sail artisan queue:work platform --queue=platform --tries=1 --timeout=3600
```

The default worker does not read this queue. The platform worker also does not read the default or WhatsApp queues. Production needs both.

Signs that the platform worker is not running:

- sample data does not appear after a tenant is created;
- exports stay **Antrean** (Queued);
- rows in `jobs` with `queue = platform` keep increasing.

Jobs use one attempt. Do not raise `--tries` without fixing the root cause. Seeding runs one large transaction, and an export has its own status row. Silent retries can hide failures.

See [`docs/operations/platform-queue.md`](https://github.com/madmouse17/isp_inbils/blob/main/docs/operations/platform-queue.md) for systemd, Supervisor, Docker, stop timeout and diagnosis.


## 11.3 Scheduler and retention


The scheduler must run once per minute. Panel-related tasks:

- `inbils:platform:exports:prune` every hour;
- `inbils:activity-log:prune` every day at 19:30 UTC;
- `queue:prune-failed --hours=720` every day.

`failed_jobs` is kept for 30 days. Normal audit is kept for 365 days. `security`, `platform` and `support` audit is kept for 730 days.


## 11.4 Platform panel host


Without extra configuration, the panel is on the application host with the path `/platform`. `PLATFORM_DOMAIN` binds all platform routes to a specific host and adds that host to the list of trusted hosts.

A separate host must use a session and cookie scheme that the tenant application can still read. **Akses dukungan** (Support access) uses one session for the `platform` and `web` guards. If the cookie is not shared, the switch to the tenant screen fails.
