---
title: "Operations"
description: "What it takes to run Inbils in production: the container stack, what the operator owns, and where to find each runbook."
---

This section is for the person who keeps an Inbils installation running: an ISP IT person or a hosting operator. It covers releasing new versions, watching the system, backing it up and keeping the background workers alive. The procedures are provider neutral. Inbils does not assume a cloud vendor, a CI product or a secret store.

## The production-style stack

The repository ships a Docker Compose stack (`compose.yaml` and `Dockerfile`) that builds the application on a FrankenPHP image (PHP 8.5, base image `dunglas/frankenphp:php8.5-bookworm`). The `Dockerfile` stops the build when the PHP version is below 8.5.12, so build with `--pull`. The stack has six services:

| Service | What it runs |
|---|---|
| `app` | The web application on port 8080 inside the container. Its healthcheck calls `/ready`. |
| `queue` | `php artisan queue:work --queue=default,whatsapp --sleep=3 --tries=3 --timeout=90` |
| `platform-queue` | `php artisan queue:work platform --queue=platform --sleep=3 --tries=1 --timeout=3600`, for the long jobs of the `/platform` operator panel |
| `scheduler` | `php artisan schedule:work`, the single scheduler owner |
| `mysql` | MySQL 8.4 |
| `redis` | Redis 7.4 with `--appendonly yes` |

Every service uses the Docker `json-file` log driver capped at 10 MB and 5 files, so a container keeps at most 50 MB of output. How to start the stack the first time is on [Docker stacks](/docs/getting-started/docker-stacks/).

You can also run the application without Docker. In that case the host process manager (systemd, Supervisor, NSSM on Windows) must run the same worker and scheduler commands. See [Queues and scheduler](/docs/operations/queues-and-scheduler/).

## What the operator is responsible for

- **Releases.** Take a backup, build, migrate, restart workers, check health. Never run `migrate:fresh`, `migrate:refresh`, `migrate:reset` or `db:seed` on a deployed instance.
- **Secrets and configuration.** `.env` (or `.env.docker`) lives on the host, never in the repository. `APP_KEY` is also data: every integration secret stored per company is encrypted with it, so back it up together with the database.
- **Workers.** Queue workers and the scheduler must be supervised, restart on crash, start on boot and restart after every deploy. Run exactly one scheduler owner per environment.
- **Monitoring.** Wire `/up`, `/ready`, the 5xx rate, queue depth, `failed_jobs`, disk space and backup age into your own alerting. Inbils exposes the signals but does not ship a vendor APM or error reporter.
- **Backups.** The scripts create and verify archives, but delivery to an off-host destination and the restore drill are the operator's job.
- **Reverse proxy and TLS.** Behind a proxy or load balancer, set `TRUSTED_PROXIES`. Empty (the default), it trusts nobody, so every visitor appears with the proxy's address and per-address throttles share one budget.
- **Mail sender.** In production `MAIL_FROM_ADDRESS` must be a real address on a domain you own. Otherwise `/ready` reports `mail` as `fail`.

## Page map

| Page | Read it when |
|---|---|
| [Deploying a release](/docs/operations/deployment/) | You are about to ship a new version. |
| [Health checks, logs and metrics](/docs/operations/observability/) | You are wiring monitoring or tracing a problem by request id. |
| [Backup and restore](/docs/operations/backup-restore/) | You are setting up backups, running a drill or recovering from an incident. |
| [Queues and scheduler](/docs/operations/queues-and-scheduler/) | You are supervising workers, reading the schedule or purging a tenant. |

Related pages: [Multi-tenancy](/docs/architecture/multi-tenancy/), [Troubleshooting](/docs/getting-started/troubleshooting/) and [Integrations](/docs/getting-started/integrations/).
