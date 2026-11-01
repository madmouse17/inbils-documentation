---
title: "Mobile API"
description: "What the api/v1 mobile API is, who calls it, how the contract is versioned and regenerated, and which endpoint groups the customer and technician apps use."
---

The mobile API is the JSON interface that the two Inbils Android apps (customer and technician) use to talk to the server. Every route lives under the base path `/api/v1`. The web application does not use it.

## Who uses it

- The **customer app**: pelanggan see their home feed, invoices, subscriptions and tickets.
- The **technician app**: teknisi work through their SPK, send evidence and request materials.

Both apps hand-write their models from the contract file, `docs/api/mobile-v1.openapi.json`. The contract is the source of truth for field names and types. The current contract version is 1.1.0. Version 1.1 replaced the integer ids of 1.0 with opaque 26-character ULID strings.

## Contract and regeneration

The contract is generated from the routes, requests and resources. After any change to an `api/v1` route, request or resource, regenerate it:

```bash
php artisan scramble:export
```

The generated per-endpoint reference is on [API reference](/docs/api/reference/).

## Endpoint groups

| Group | Paths | What it does |
|---|---|---|
| Auth | `auth/*` | Login, two-factor step, token refresh, logout, forgot password. See [Authentication and tokens](/docs/api/authentication/). |
| Me and profile | `me`, `me/password` | Read and update the signed-in user, change the password. |
| Devices and push tokens | `devices`, `me/device-token`, `me/push-test` | List and revoke installs, register the Firebase (FCM) token, send a test push. |
| Customer: home feed | `customer/home-feed`, `customer/profile` | The data for the app home screen and the customer profile. |
| Customer: invoices and payments | `customer/invoices`, `customer/payments` | List invoices, start an online payment, download a receipt, payment history. |
| Customer: subscriptions | `customer/subscriptions` | List subscriptions and show the connection of one. |
| Customer: tickets and attachments | `customer/tickets`, `customer/ticket-categories`, `customer/work-orders` | Open tickets, comment, confirm, attach files, follow related work orders. |
| Customer: announcements | `customer/announcements`, `customer/promo-banners` | Announcements and promo banner taps. |
| Technician: my work | `technician/my-work` | The list of work assigned to the technician. |
| Technician: work orders | `technician/work-orders/{wo}/start`, `en-route`, `submit` | Move an SPK through its states. |
| Technician: evidence | `technician/work-orders/{wo}/evidence` | Upload and delete evidence for an SPK. |
| Technician: items | `technician/work-orders/{wo}/items`, `technician/products`, `technician/warehouses` | Record materials used on an SPK. |
| Technician: network credentials | `technician/work-orders/{wo}/network-credentials` | Submit the network credentials of an installation. |
| Technician: material returns | `technician/material-returns` | List material returns and declare them. |
| Technician: inventory requests | `technician/inventory-requests` | List, create and cancel material requests. |
| Technician: tickets | `technician/tickets/{id}` | Start, resolve, comment and attach files on assigned tickets. |
| Shared: notifications | `notifications` | The notification bell: list, mark one or all as read. |
| Shared: media | `media/{media}` | Authenticated file downloads. |

## Where to go next

- [Authentication and tokens](/docs/api/authentication/) for sign-in, token lifetime and device registration.
- [Conventions, errors and idempotency](/docs/api/conventions/) for the error envelope, `Idempotency-Key`, pagination and rate limits.
- [API reference](/docs/api/reference/) for every endpoint, request and response.
