---
title: "Autentikasi dan token"
description: "Cara aplikasi mobile masuk dengan bearer token Sanctum: field app, langkah two-factor, masa berlaku dan refresh token, logout, perangkat, dan penanganan 401."
---

API mobile memakai bearer token (Laravel Sanctum). Setiap endpoint kecuali `POST auth/login`, `POST auth/two-factor`, dan `POST auth/forgot-password` memerlukan header `Authorization: Bearer <token>`.

## Model token

Sebuah token milik satu instalasi aplikasi dan membawa tepat satu ability, `customer` atau `technician`. Ability dipilih oleh field `app` saat login. Token pelanggan tidak bisa memanggil route `technician/*` dan sebaliknya: hasilnya 403 `forbidden`. Akun yang tidak boleh memakai aplikasi yang dipilih mendapat 403 `app_not_allowed`.

| Aplikasi | Masa berlaku token |
|---|---|
| `customer` | 90 hari |
| `technician` | 30 hari |

## Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{"email":"user@your-domain.example","password":"<password>","device_name":"Pixel 7","app":"customer"}
```

`device_name` wajib (maksimal 100 karakter). Pemeriksaan kredensial, pencarian pengguna (pengguna nonaktif gagal seperti password salah), dan batas percobaan gagal sama dengan login web dan memakai throttle key yang sama. Aplikasi mendapat 429 dengan `Retry-After`, bukan error form.

Berhasil adalah `200`:

```json
{"data":{"token":"<token>","token_type":"Bearer","expires_at":"<timestamp>","user":{}}}
```

`user` adalah resource yang sama dengan `GET /api/v1/me`.

## Langkah two-factor

Pengguna dengan two-factor yang sudah dikonfirmasi mendapat `202` dan tanpa token:

```json
{"data":{"two_factor_required":true,"challenge_id":"<challenge-id>","expires_in":300}
}
```

Challenge berlaku 300 detik dan mengizinkan 5 percobaan. Kirim satu kode, berupa kode TOTP atau recovery code:

```http
POST /api/v1/auth/two-factor
Content-Type: application/json

{"challenge_id":"<challenge-id>","code":"<code>"}
```

Jawabannya sama dengan body `200` pada login. Kode yang salah dihitung pada limiter key yang sama dengan challenge web, sehingga percobaan dari aplikasi dan browser dijumlahkan. Challenge yang kedaluwarsa adalah 422 `challenge_expired`.

## Refresh

`POST auth/token/refresh` menukar token saat ini dengan yang baru dan menjawab `{"data":{"token","token_type","expires_at"}}`. Lakukan refresh ketika sisa waktu kurang dari 7 hari. Endpoint ini memerlukan bearer token tetapi tidak memerlukan `Idempotency-Key`.

## Logout

`POST auth/logout` hanya memerlukan token yang valid, bahkan untuk pengguna yang kehilangan akses ke aplikasi. Token juga dicabut oleh penggantian password, penonaktifan, perubahan two-factor, dan `DELETE devices/{id}`.

## Forgot password

```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{"email":"user@your-domain.example"}
```

Jawabannya selalu `202` dengan pesan yang sama, ada atau tidaknya akun, sehingga endpoint tidak membuka informasi akun. Pengguna yang sudah masuk mengganti password dengan `POST me/password`.

## Perangkat dan push token

`GET devices` menampilkan instalasi milik pengguna dan `DELETE devices/{id}` mencabut satu instalasi beserta tokennya. Setelah sign-in dan setiap refresh, aplikasi mendaftarkan token Firebase Cloud Messaging miliknya:

```http
POST /api/v1/me/device-token
Content-Type: application/json

{"token":"<FCM registration token>","app":"customer","platform":"android","device_name":"Pixel 7"}
```

Token baru dijawab `201`, token yang sudah ada `200`. `app` harus cocok dengan bearer token. Ponsel yang sama yang masuk sebagai pengguna lain memindahkan token ke pengguna itu. `DELETE me/device-token` dengan `{"token":"..."}` selalu dijawab 204 dan dipanggil aplikasi sebelum sign-out. `POST me/push-test` mengirim push uji (503 `push_unavailable` bila push mati di server, 409 `push_token_not_registered` bila instalasi ini belum punya token terdaftar). Pengaturan server ada di [Integrations](/docs/getting-started/integrations/).

## Throttling

| Route | Batas |
|---|---|
| `POST auth/login` | 20 per menit per IP |
| `POST auth/forgot-password` | 6 per menit per IP |
| Semua route lain | 120 per menit per token |

429 membawa `Retry-After` dalam detik.

## Arti 401

Setiap 401 berarti "masuk lagi": token hilang, kedaluwarsa, atau dicabut (`unauthenticated`), atau akun dinonaktifkan dan token dihapus (`account_inactive`). Aplikasi membuang sesi tersimpan dan menampilkan layar login. Aplikasi tidak mengulang request itu.
