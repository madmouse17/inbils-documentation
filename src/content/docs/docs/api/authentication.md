---
title: "Authentication and tokens"
description: "How the mobile apps sign in with Sanctum bearer tokens: the app field, two-factor step, token lifetime and refresh, logout, device registration and 401 handling."
---

The mobile API uses bearer tokens (Laravel Sanctum). Every endpoint except `POST auth/login`, `POST auth/two-factor` and `POST auth/forgot-password` needs the header `Authorization: Bearer <token>`.

## Token model

A token belongs to one app install and carries exactly one ability, `customer` or `technician`. The ability is chosen by the `app` field at login. A customer token cannot call `technician/*` routes and the other way round: that is a 403 `forbidden`. An account that may not use the chosen app gets 403 `app_not_allowed`.

| App | Token lifetime |
|---|---|
| `customer` | 90 days |
| `technician` | 30 days |

## Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{"email":"user@your-domain.example","password":"<password>","device_name":"Pixel 7","app":"customer"}
```

`device_name` is required (at most 100 characters). The credential check, the lookup of the user (an inactive user fails like a wrong password) and the failed-attempt budget are the same as on the web login and share the same throttle key. The app gets a 429 with `Retry-After` instead of a form error.

Success is `200`:

```json
{"data":{"token":"<token>","token_type":"Bearer","expires_at":"<timestamp>","user":{}}}
```

`user` is the same resource as `GET /api/v1/me`.

## Two-factor step

A user with confirmed two-factor authentication gets `202` and no token:

```json
{"data":{"two_factor_required":true,"challenge_id":"<challenge-id>","expires_in":300}
}
```

The challenge is valid for 300 seconds and allows 5 attempts. Send one code, either a TOTP code or a recovery code:

```http
POST /api/v1/auth/two-factor
Content-Type: application/json

{"challenge_id":"<challenge-id>","code":"<code>"}
```

The answer is the same `200` body as a login. Wrong codes count against the same limiter keys as the web challenge, so attempts from the app and the browser add up. An expired challenge is 422 `challenge_expired`.

## Refresh

`POST auth/token/refresh` swaps the current token for a new one and answers `{"data":{"token","token_type","expires_at"}}`. Refresh when fewer than 7 days remain. It needs the bearer token but no `Idempotency-Key`.

## Logout

`POST auth/logout` needs only a valid token, even for a user who lost access to the app. Tokens are also revoked by a password change, deactivation, a two-factor change and `DELETE devices/{id}`.

## Forgot password

```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{"email":"user@your-domain.example"}
```

The answer is always `202` with the same message, whether or not an account exists, so the endpoint does not reveal accounts. Signed-in users change the password with `POST me/password`.

## Devices and push tokens

`GET devices` lists the installs of the user and `DELETE devices/{id}` revokes one together with its tokens. After sign-in and after each refresh the app registers its Firebase Cloud Messaging token:

```http
POST /api/v1/me/device-token
Content-Type: application/json

{"token":"<FCM registration token>","app":"customer","platform":"android","device_name":"Pixel 7"}
```

A new token answers `201`, an existing one `200`. `app` must match the bearer token. The same phone signing in as another user moves the token to that user. `DELETE me/device-token` with `{"token":"..."}` always answers 204 and the app calls it before sign-out. `POST me/push-test` sends a test push (503 `push_unavailable` when push is off on the server, 409 `push_token_not_registered` when this install has no registered token). Server setup is in [Integrations](/docs/getting-started/integrations/).

## Throttling

| Route | Limit |
|---|---|
| `POST auth/login` | 20 a minute per IP |
| `POST auth/forgot-password` | 6 a minute per IP |
| All other routes | 120 a minute per token |

A 429 carries `Retry-After` in seconds.

## What a 401 means

Any 401 means "sign in again": the token is missing, expired or revoked (`unauthenticated`), or the account was deactivated and the token deleted (`account_inactive`). The app drops its stored session and shows the login screen. It does not retry the request.
