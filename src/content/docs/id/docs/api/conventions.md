---
title: "Conventions, errors and idempotency"
description: "Envelope dan kode error, aturan Idempotency-Key, pagination, rate limit, unduhan media, dan cara klien pulih dari request yang terputus."
---

Aturan ini berlaku untuk setiap route di bawah `/api/v1`.

## Envelope error

Setiap error berupa JSON:

```json
{"message":"...","code":"validation_failed","errors":{"field":["..."]},"request_id":"<request-id>"}
```

- `message` untuk developer dan bisa berbahasa Inggris atau Indonesia. Tampilkan teks Anda sendiri per `code`.
- `errors` hanya muncul bersama `validation_failed`.
- `request_id` sama dengan header respons `X-Request-Id`. Sebutkan dalam laporan: log server bisa dicari dengannya.
- 429 membawa `Retry-After` dalam detik.

| Status | `code` |
|---|---|
| 400 | `bad_request` |
| 401 | `unauthenticated`, `account_inactive` |
| 403 | `forbidden`, `app_not_allowed`, `password_reset_required` |
| 404 | `not_found` (juga untuk data pelanggan atau perusahaan lain), `payment_unavailable` |
| 405 | `method_not_allowed` |
| 408 | `request_timeout` |
| 409 | `conflict`, `idempotency_in_progress`, `push_token_not_registered` |
| 413 | `payload_too_large` |
| 415 | `unsupported_media_type` |
| 422 | `validation_failed`, `unprocessable`, `idempotency_conflict`, `invoice_not_payable`, `challenge_expired` |
| 428 | `precondition_required`, `idempotency_key_required` |
| 429 | `too_many_requests` |
| 500 | `server_error` |
| 503 | `push_unavailable` |
| 4xx lainnya | `client_error` |

`unprocessable` adalah request yang bentuknya benar tetapi ditolak aturan bisnis. `payment_unavailable` berarti pembayaran online mati.

## Identifier

Setiap `id` dan setiap field yang menyebut record lain (`customer_id`, `subscription_id`) adalah string opaque, ULID huruf kecil 26 karakter. Simpan sebagai string dan kirim kembali tanpa diubah. Id integer atau id tak dikenal di path dijawab 404 `not_found`, di body 422 `validation_failed`. `id` notifikasi adalah UUID.

## Idempotency

Setiap `POST`, `PUT`, `PATCH`, dan `DELETE` memerlukan `Idempotency-Key: <UUID>`, kecuali tiga endpoint auth publik (`auth/login`, `auth/two-factor`, `auth/forgot-password`) serta `auth/token/refresh` dan `auth/logout`, yang berada di grup sesi tanpa header ini. Key tidak ada: 428 `idempotency_key_required`. Bukan UUID: 422 `validation_failed`.

```http
POST /api/v1/customer/tickets
Idempotency-Key: 6f1c2d34-0000-4000-8000-000000000000
```

Buat satu key per aksi pengguna dan pakai ulang untuk setiap percobaan ulang aksi itu. Selama 24 jam server menyimpan respons per pengguna dan key:

- request yang sama lagi mendapat status dan body tersimpan, dengan header `Idempotent-Replayed: true`;
- key yang sama dengan request berbeda adalah 422 `idempotency_conflict`;
- key yang sama saat request pertama masih berjalan adalah 409 `idempotency_in_progress`;
- respons 5xx dan 429 tidak disimpan dan key dilepas, jadi ulangi dengan key yang sama;
- respons bertanda `Cache-Control: no-store` (rahasia yang hanya tampil sekali, seperti login PPPoE sebuah instalasi) juga tidak disimpan, sehingga percobaan ulang berjalan lagi melewati setiap guard dan replay tidak pernah memberikan rahasia kepada orang yang aksesnya sudah berakhir.

### Mengapa key yang sama setelah kegagalan yang ambigu

Bila koneksi putus setelah server menerapkan request, aplikasi tidak tahu hasilnya. Key baru akan menerapkan aksi dua kali. Key yang sama membuat server menjawab dengan hasil tersimpan. Penulisan yang bisa diputar ulang outbox offline di kemudian hari (bukti, deklarasi material, komentar tiket, permintaan inventori) juga menyimpan key di kolom database dengan unique index per penulis, jadi cache 24 jam bukan satu-satunya pengaman.

## Pagination

Endpoint daftar menjawab `{data, links, meta}` (paginator Laravel). `?page=` dimulai dari 1. `?per_page=` bawaannya 20 dan maksimal 50. Satu record adalah `{data}`.

## Rate limit

| Cakupan | Batas per menit |
|---|---|
| Semua panggilan, per token | 120 |
| Sign-in, per IP | 20 |
| Forgot password, per IP | 6 |
| Awal pembayaran, per pengguna | 6 |
| Unggahan, per pengguna | 30 |
| Ketukan banner promo, per pengguna | 30 |
| Push uji, per pengguna | 3 |

## Media dan unduhan

File dilayani oleh `GET media/{media}` dengan bearer token, tidak pernah lewat URL publik. Unduh file dengan klien terautentikasi yang sama, dan jangan cache untuk pengguna lain. Kuitansi tagihan berasal dari `customer/invoices/{id}/receipt`. Saat menyimpan file dengan nama dari server, bersihkan dulu menjadi nama file yang aman.

## Aplikasi offline dan request terputus

Aplikasi offline mengantrekan penulisan dan memutar ulang dengan `Idempotency-Key` aslinya. Klien harus menganggap hasil berikut sebagai "mungkin sudah diterapkan": status 0 (tidak ada respons HTTP), koneksi putus saat body dibaca, dan body 2xx yang tidak bisa diurai. Pada semuanya pertahankan key yang sama dan ulangi, jangan buat key baru. Ulangi 5xx dan 429 dengan key yang sama juga (tunggu `Retry-After` pada 429). Jangan ulangi jawaban 4xx lain tanpa perubahan: hasilnya akan sama. 401 berarti masuk lagi, lihat [Authentication and tokens](/docs/api/authentication/).
