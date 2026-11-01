---
title: "Conventions, errors and idempotency"
description: "The error envelope and codes, Idempotency-Key rules, pagination, rate limits, media downloads and how clients should recover from interrupted requests."
---

These rules apply to every route under `/api/v1`.

## Error envelope

Every error is JSON:

```json
{"message":"...","code":"validation_failed","errors":{"field":["..."]},"request_id":"<request-id>"}
```

- `message` is for developers and may be English or Indonesian. Show your own text per `code`.
- `errors` appears only with `validation_failed`.
- `request_id` equals the `X-Request-Id` response header. Quote it in a report: the server log can be searched by it.
- A 429 carries `Retry-After` in seconds.

| Status | `code` |
|---|---|
| 400 | `bad_request` |
| 401 | `unauthenticated`, `account_inactive` |
| 403 | `forbidden`, `app_not_allowed`, `company_inactive` (the company of the account is suspended), `password_reset_required` |
| 404 | `not_found` (also another customer's or company's record), `payment_unavailable` |
| 405 | `method_not_allowed` |
| 408 | `request_timeout` |
| 409 | `conflict`, `idempotency_in_progress`, `push_token_not_registered`, `work_order_closed`, `ticket_already_rated` |
| 413 | `payload_too_large` |
| 415 | `unsupported_media_type` |
| 422 | `validation_failed`, `unprocessable`, `idempotency_conflict`, `invoice_not_payable`, `challenge_expired`, `credentials_not_ready`, `ticket_not_resolved`, `ticket_closed` |
| 428 | `precondition_required`, `idempotency_key_required` |
| 429 | `too_many_requests` |
| 500 | `server_error` |
| 503 | `push_unavailable` |
| other 4xx | `client_error` |

`unprocessable` is a well-formed request that the business rules refuse. `payment_unavailable` means online payment is off.

## Identifiers

Every `id` and every field that names another record (`customer_id`, `subscription_id`) is an opaque string, a 26-character lowercase ULID. Keep it as a string and send it back unchanged. An integer or unknown id in a path answers 404 `not_found`, in a body 422 `validation_failed`. A notification `id` is a UUID.

## Idempotency

Every `POST`, `PUT`, `PATCH` and `DELETE` needs `Idempotency-Key: <UUID>`, except the three public auth endpoints (`auth/login`, `auth/two-factor`, `auth/forgot-password`) and `auth/token/refresh` and `auth/logout`, which sit in the session group without the header. Missing key: 428 `idempotency_key_required`. Not a UUID: 422 `validation_failed`.

```http
POST /api/v1/customer/tickets
Idempotency-Key: 6f1c2d34-0000-4000-8000-000000000000
```

Generate one key per user action and reuse it for every retry of that action. For 24 hours the server stores the response per user and key:

- the same request again gets the stored status and body, with the header `Idempotent-Replayed: true`;
- the same key with a different request is 422 `idempotency_conflict`;
- the same key while the first request still runs is 409 `idempotency_in_progress`;
- 5xx and 429 responses are not stored and release the key, so retry them with the same key;
- a response marked `Cache-Control: no-store` (a secret shown once, such as the PPPoE login of an installation) is not stored either, so a retry runs again behind every guard and a replay can never hand the secret to someone whose access ended.

### Why the same key after an ambiguous failure

If the connection drops after the server applied the request, the app cannot know the result. A new key would apply the action twice. The same key makes the server answer with the stored result. Writes that an offline outbox may replay later (evidence, material declarations, ticket comments, inventory requests) also keep the key in a database column with a unique index per author, so the 24 hour cache is not the only guard.

## Pagination

List endpoints answer `{data, links, meta}` (Laravel paginator). `?page=` starts at 1. `?per_page=` defaults to 20 and is at most 50. A single record is `{data}`.

## Rate limits

| Scope | Limit per minute |
|---|---|
| Any call, per token | 120 |
| Sign-in, per IP | 20 |
| Forgot password, per IP | 6 |
| Payment starts, per user | 6 |
| Uploads, per user | 30 |
| Promo banner taps, per user | 30 |
| Push tests, per user | 3 |
| Network credential reveals, per user | 5 |
| Invoice receipts, per user | 6 |

## Media and downloads

Files are served by `GET media/{media}` with the bearer token, never by a public URL. Download a file with the same authenticated client, and never cache it for other users. Invoice receipts come from `customer/invoices/{id}/receipt`. When saving a file under a name the server gave, strip it to a safe file name first.

## Offline apps and interrupted requests

Offline apps queue writes and replay them with the original `Idempotency-Key`. Clients should treat these outcomes as "may have applied": a status of 0 (no HTTP response), a connection dropped while the body is read, and a 2xx body that cannot be parsed. In all of them keep the same key and retry, and never mint a new one. Retry 5xx and 429 with the same key too (wait `Retry-After` on a 429). Do not retry other 4xx answers unchanged: they will fail the same way. A 401 means sign in again, see [Authentication and tokens](/docs/api/authentication/).
