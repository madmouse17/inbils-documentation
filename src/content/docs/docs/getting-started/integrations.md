---
title: "Integrations per company"
description: "Midtrans, WhatsApp, RADIUS, company mail and Firebase push are set per company in the app, with a one-time import from .env and webhook URLs."
---

Midtrans, the WhatsApp Cloud API, RADIUS (the FreeRADIUS database) and a company mail account are not read from `.env` at runtime. Each company enters its own settings in the app, so one installation can serve many ISPs with different accounts.

## Where to configure

Open **Pengaturan > Integrasi** (`/admin/company/integrations`). The permission is `company.integrations.manage`.

| Integration | Configured per company | Notes |
| --- | --- | --- |
| Midtrans | Yes | Payment gateway for billing |
| WhatsApp Cloud API | Yes | Messages on the `whatsapp` queue |
| RADIUS (FreeRADIUS database) | Yes | Network authentication data |
| Company mail | Yes | A mail account of the company |
| Firebase push | No, platform wide | One Firebase project shared by every company; see below |
| Platform mail sender | No, `.env` | Reset and invitation mails use `MAIL_*` in `.env` |

## Import the `.env` values once

The `.env` keys `MIDTRANS_*`, `WHATSAPP_*` and `RADIUS_*` are one-time import sources. This command copies them into a company's settings:

```bash
./vendor/bin/sail artisan inbils:integrations:import-env --company=<company-code> [--provider=midtrans|whatsapp|radius] [--dry-run] [--force]
```

| Option | Meaning |
| --- | --- |
| `--company=<company-code>` | The company that receives the values |
| `--provider=midtrans\|whatsapp\|radius` | Import only one provider |
| `--dry-run` | Preview without writing |
| `--force` | Overwrite existing settings |

After the import, the app no longer reads those `.env` keys at runtime. Change values in **Pengaturan > Integrasi**.

## Webhook URLs

Payment and WhatsApp providers call back into Inbils. Both URLs need a public address.

| Provider | URL |
| --- | --- |
| Midtrans (notification URL) | `<APP_URL>/webhooks/midtrans/{company}` |
| WhatsApp (webhook of the Meta app) | `<APP_URL>/webhooks/whatsapp` |

For real Midtrans callbacks in development, `scripts/dev-payments.sh` starts the app and the `workers` profile. When `INBILS_TUNNEL` names a cloudflared tunnel, it also runs that tunnel:

```bash
INBILS_TUNNEL=<name> ./scripts/dev-payments.sh
```

Open the app through the public https address, because the notification URL of an order is built from it.

## Firebase push for the mobile apps

The customer and technician apps get Android push notifications through Firebase Cloud Messaging. The server needs the Firebase Admin SDK service-account JSON, not `google-services.json`.

- Keep the service-account file outside git and outside the web root. Set only its path in `FIREBASE_CREDENTIALS`.
- An empty `FIREBASE_CREDENTIALS` turns push off. The bell, mail and WhatsApp notifications are not affected.
- In Sail, the container cannot read your home directory. Copy the key temporarily to `storage/app/private/`, which git ignores, and delete it after the check.
- In the production-style stack, set `FIREBASE_CREDENTIALS_FILE` in `.env.docker` to the host path. `compose.yaml` mounts it read-only into `app`, `queue`, `platform-queue` and `scheduler`.
- The default queue worker sends pushes, so it must keep listening to `default`.
- After deploy or key rotation, recreate the containers and restart the queue workers.

:::danger
Never put JSON or private-key contents in `.env`, logs, screenshots or support reports.
:::

To check credentials without delivering a message:

```bash
php artisan inbils:push:test <user-id-or-email> --dry-run
```

**Pengaturan > Integrasi** also shows a read-only card, **Notifikasi aplikasi (Firebase)**. It tells whether the server credentials are set and when FCM last accepted a push. It never shows the key or its path.

## Mobile apps and the API

The apps use `api/v1`. The Android emulator reaches the host as `10.0.2.2`. See [API conventions](/docs/api/conventions/) and [Authentication](/docs/api/authentication/).
