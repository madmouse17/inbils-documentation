---
title: "Integrasi per perusahaan"
description: "Midtrans, WhatsApp, RADIUS, email perusahaan, dan push Firebase diatur per perusahaan di aplikasi, dengan impor sekali dari .env dan URL webhook."
---

Midtrans, WhatsApp Cloud API, RADIUS (database FreeRADIUS), dan akun email perusahaan tidak dibaca dari `.env` saat runtime. Setiap perusahaan mengisi pengaturannya sendiri di aplikasi, sehingga satu instalasi dapat melayani banyak ISP dengan akun yang berbeda.

## Tempat mengatur

Buka **Pengaturan > Integrasi** (`/admin/company/integrations`). Permission-nya adalah `company.integrations.manage`.

| Integrasi | Diatur per perusahaan | Catatan |
| --- | --- | --- |
| Midtrans | Ya | Payment gateway untuk billing |
| WhatsApp Cloud API | Ya | Pesan berjalan di queue `whatsapp` |
| RADIUS (database FreeRADIUS) | Ya | Data autentikasi jaringan |
| Email perusahaan | Ya | Akun email milik perusahaan |
| Push Firebase | Tidak, berlaku untuk seluruh platform | Satu project Firebase dipakai bersama oleh semua perusahaan; lihat di bawah |
| Pengirim email platform | Tidak, `.env` | Email reset dan undangan memakai `MAIL_*` di `.env` |

## Impor nilai `.env` sekali saja

Key `.env` `MIDTRANS_*`, `WHATSAPP_*`, dan `RADIUS_*` hanya sumber impor sekali jalan. Perintah ini menyalinnya ke pengaturan sebuah perusahaan:

```bash
./vendor/bin/sail artisan inbils:integrations:import-env --company=<company-code> [--provider=midtrans|whatsapp|radius] [--dry-run] [--force]
```

| Opsi | Arti |
| --- | --- |
| `--company=<company-code>` | Perusahaan yang menerima nilai |
| `--provider=midtrans\|whatsapp\|radius` | Impor satu provider saja |
| `--dry-run` | Pratinjau tanpa menulis |
| `--force` | Menimpa pengaturan yang sudah ada |

Setelah impor, aplikasi tidak lagi membaca key `.env` tersebut saat runtime. Ubah nilai di **Pengaturan > Integrasi**.

## URL webhook

Provider pembayaran dan WhatsApp memanggil balik ke Inbils. Kedua URL membutuhkan alamat publik.

| Provider | URL |
| --- | --- |
| Midtrans (notification URL) | `<APP_URL>/webhooks/midtrans/{company}` |
| WhatsApp (webhook aplikasi Meta) | `<APP_URL>/webhooks/whatsapp` |

Untuk callback Midtrans sungguhan saat pengembangan, `scripts/dev-payments.sh` menjalankan aplikasi dan profile `workers`. Jika `INBILS_TUNNEL` menyebut sebuah tunnel cloudflared, skrip juga menjalankan tunnel itu:

```bash
INBILS_TUNNEL=<name> ./scripts/dev-payments.sh
```

Buka aplikasi lewat alamat https publik, karena notification URL sebuah order dibangun dari alamat tersebut.

## Push Firebase untuk aplikasi mobile

Aplikasi pelanggan dan teknisi menerima push notification Android lewat Firebase Cloud Messaging. Server memerlukan JSON service account Firebase Admin SDK, bukan `google-services.json`.

- Simpan file service account di luar git dan di luar web root. Isi `FIREBASE_CREDENTIALS` hanya dengan path-nya.
- `FIREBASE_CREDENTIALS` yang kosong mematikan push. Notifikasi bell, email, dan WhatsApp tidak terpengaruh.
- Di Sail, container tidak dapat membaca direktori home Anda. Salin kunci sementara ke `storage/app/private/`, yang diabaikan git, dan hapus setelah pengecekan.
- Di stack bergaya produksi, isi `FIREBASE_CREDENTIALS_FILE` di `.env.docker` dengan path di host. `compose.yaml` me-mount file itu read-only ke `app`, `queue`, `platform-queue`, dan `scheduler`.
- Worker queue default yang mengirim push, jadi ia harus tetap mendengarkan `default`.
- Setelah deploy atau rotasi kunci, buat ulang container dan restart worker queue.

:::danger
Jangan pernah menaruh isi JSON atau private key di `.env`, log, screenshot, atau laporan dukungan.
:::

Untuk memeriksa kredensial tanpa mengirim pesan:

```bash
php artisan inbils:push:test <user-id-or-email> --dry-run
```

**Pengaturan > Integrasi** juga menampilkan kartu read-only, **Notifikasi aplikasi (Firebase)**. Kartu ini menunjukkan apakah kredensial server terpasang dan kapan FCM terakhir menerima push. Kartu tidak pernah menampilkan kunci atau path-nya.

## Aplikasi mobile dan API

Aplikasi memakai `api/v1`. Emulator Android menjangkau host sebagai `10.0.2.2`. Lihat [Konvensi API](/docs/api/conventions/) dan [Autentikasi](/docs/api/authentication/).
