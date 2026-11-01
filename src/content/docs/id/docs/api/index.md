---
title: "API mobile"
description: "Apa itu API mobile api/v1, siapa yang memakainya, bagaimana kontrak diberi versi dan dibuat ulang, serta grup endpoint untuk aplikasi pelanggan dan teknisi."
---

API mobile adalah antarmuka JSON yang dipakai kedua aplikasi Android Inbils (pelanggan dan teknisi) untuk berbicara dengan server. Semua route berada di bawah base path `/api/v1`. Aplikasi web tidak memakainya.

## Siapa yang memakainya

- **Aplikasi pelanggan**: pelanggan melihat home feed, tagihan, langganan, dan tiket.
- **Aplikasi teknisi**: teknisi mengerjakan SPK, mengirim bukti, dan meminta material.

Kedua aplikasi menulis model mereka dengan tangan dari file kontrak, `docs/api/mobile-v1.openapi.json`. Kontrak adalah sumber kebenaran untuk nama dan tipe field. Versi kontrak saat ini adalah 1.1.0. Versi 1.1 mengganti id integer dari 1.0 dengan string ULID opaque 26 karakter.

## Kontrak dan pembuatan ulang

Kontrak dihasilkan dari route, request, dan resource. Setelah mengubah route, request, atau resource `api/v1`, buat ulang kontrak:

```bash
php artisan scramble:export
```

Berkas kontrak adalah [`docs/api/mobile-v1.openapi.json`](https://github.com/madmouse17/isp_inbils/blob/main/docs/api/mobile-v1.openapi.json) di repositori aplikasi. Referensi per endpoint yang dihasilkan ada di [API reference](/docs/api/reference/).

## Grup endpoint

| Grup | Path | Fungsi |
|---|---|---|
| Auth | `auth/*` | Login, langkah two-factor, refresh token, logout, forgot password. Lihat [Authentication and tokens](/docs/api/authentication/). |
| Me dan profil | `me`, `me/password` | Membaca dan memperbarui pengguna yang masuk, mengganti password. |
| Perangkat dan push token | `devices`, `me/device-token`, `me/push-test` | Daftar dan cabut instalasi, daftarkan token Firebase (FCM), kirim push uji. |
| Pelanggan: home feed | `customer/home-feed`, `customer/profile` | Data layar utama aplikasi dan profil pelanggan. |
| Pelanggan: tagihan dan pembayaran | `customer/invoices`, `customer/payments` | Daftar tagihan, mulai pembayaran online, unduh kuitansi, riwayat pembayaran. |
| Pelanggan: langganan | `customer/subscriptions` | Daftar langganan dan tampilkan koneksi satu langganan. |
| Pelanggan: tiket dan lampiran | `customer/tickets`, `customer/ticket-categories`, `customer/work-orders` | Buka tiket, beri komentar, konfirmasi, lampirkan file, ikuti work order terkait. |
| Pelanggan: pengumuman | `customer/announcements`, `customer/promo-banners` | Pengumuman dan ketukan banner promo. |
| Teknisi: pekerjaan saya | `technician/my-work` | Daftar pekerjaan yang ditugaskan ke teknisi. |
| Teknisi: work order | `technician/work-orders/{wo}/start`, `en-route`, `submit` | Memindahkan SPK antar status. |
| Teknisi: bukti | `technician/work-orders/{wo}/evidence` | Unggah dan hapus bukti SPK. |
| Teknisi: item | `technician/work-orders/{wo}/items`, `technician/products`, `technician/warehouses` | Mencatat material yang dipakai pada SPK. |
| Teknisi: kredensial jaringan | `technician/work-orders/{wo}/network-credentials` | Menampilkan login PPPoE sebuah SPK instalasi. Panggilan dibatasi lajunya dan setiap penampilan dicatat di audit. |
| Teknisi: pengembalian material | `technician/material-returns` | Daftar pengembalian material dan deklarasinya. |
| Teknisi: permintaan inventori | `technician/inventory-requests` | Daftar, buat, dan batalkan permintaan material. |
| Teknisi: tiket | `technician/tickets/{id}` | Mulai, selesaikan, beri komentar, dan lampirkan file pada tiket yang ditugaskan. |
| Bersama: notifikasi | `notifications` | Bel notifikasi: daftar, tandai satu atau semua sudah dibaca. |
| Bersama: media | `media/{media}` | Unduhan file terautentikasi. |

## Langkah berikutnya

- [Authentication and tokens](/docs/api/authentication/) untuk sign-in, masa berlaku token, dan pendaftaran perangkat.
- [Conventions, errors and idempotency](/docs/api/conventions/) untuk envelope error, `Idempotency-Key`, pagination, dan rate limit.
- [API reference](/docs/api/reference/) untuk setiap endpoint, request, dan response.
