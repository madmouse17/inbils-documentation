---
title: "11. Tugas konsol dan antrean"
description: "Perintah membership menerima kode atau id internal perusahaan."
---

## 11.1 Perintah untuk tim server


Peran yang dapat memakai: tim server dengan akses terminal dan prosedur operasi yang disetujui.

| Perintah | Kegunaan |
| --- | --- |
| `inbils:platform:admin-create` | Membuat akun operator baru secara interaktif. |
| `inbils:platform:purge-company {kode}` | Menghapus tenant permanen setelah semua syarat terpenuhi. |
| `inbils:platform:exports:prune` | Menghapus arsip kedaluwarsa dan menggagalkan build yang macet lebih dari 2 jam. Scheduler menjalankannya tiap jam. |
| `inbils:company:create-subsidiary {head} {name} {code}` | Membuat anak perusahaan dari konsol, dengan opsi mata uang, zona waktu, dan anggota. |
| `inbils:company:grant-membership {email} {company}` | Memberi pengguna akses ke perusahaan lain tanpa mengubah perusahaan asal. |
| `inbils:company:revoke-membership {email} {company}` | Mencabut keanggotaan tambahan. Perusahaan asal tidak dapat dicabut. |
| `inbils:integrations:import-env --company={kode}` | Menyalin konfigurasi Midtrans, WhatsApp, dan RADIUS lama dari environment ke satu perusahaan. Gunakan `--dry-run` lebih dulu. |
| `inbils:push:test {email}` | Menguji pengiriman push ke instalasi aplikasi pengguna. Gunakan `--dry-run` untuk validasi FCM tanpa mengirim. |
| `inbils:activity-log:prune` | Menjalankan pembersihan audit secara manual menurut masa simpan. |

Perintah membership menerima kode atau id internal perusahaan. Perintah dari panel memakai public id dan tidak menerima id dari browser sebagai kebenaran lintas tenant.

Tidak ada perintah reset 2FA operator. Reset 2FA di panel hanya menargetkan `User` tenant.


## 11.2 Worker antrean platform


Dua pekerjaan lambat berjalan pada koneksi dan antrean `platform`:

- `SeedTenantDemoDataJob` untuk **Isi data contoh**;
- `BuildTenantExportJob` untuk ekspor tenant.

Worker produksi:

```bash
php artisan queue:work platform --queue=platform --sleep=3 --tries=1 --timeout=3600
```

Dengan Sail:

```bash
./vendor/bin/sail artisan queue:work platform --queue=platform --tries=1 --timeout=3600
```

Worker default tidak membaca antrean ini. Worker platform juga tidak membaca antrean default atau WhatsApp. Produksi memerlukan keduanya.

Tanda worker platform tidak berjalan:

- data contoh tidak muncul setelah tenant dibuat;
- ekspor tetap **Antrean**;
- baris `jobs` dengan `queue = platform` bertambah.

Job memakai satu percobaan. Jangan menaikkan `--tries` tanpa memperbaiki akar masalah. Seed data menjalankan satu transaksi besar, dan ekspor mempunyai baris status sendiri. Pengulangan diam-diam dapat menutupi kegagalan.

Lihat [`docs/operations/platform-queue.md`](https://github.com/madmouse17/isp_inbils/blob/main/docs/operations/platform-queue.md) untuk systemd, Supervisor, Docker, stop timeout, dan diagnosis.


## 11.3 Scheduler dan retensi


Scheduler harus berjalan satu kali per menit. Tugas terkait panel:

- `inbils:platform:exports:prune` tiap jam;
- `inbils:activity-log:prune` setiap hari pukul 19:30 UTC;
- `queue:prune-failed --hours=720` setiap hari.

`failed_jobs` disimpan 30 hari. Audit biasa disimpan 365 hari. Audit `security`, `platform`, dan `support` disimpan 730 hari.


## 11.4 Host panel platform


Tanpa konfigurasi tambahan, panel berada pada host aplikasi dengan path `/platform`. `PLATFORM_DOMAIN` mengikat semua rute platform ke host tertentu dan menambah host itu ke daftar host tepercaya.

Host terpisah harus memakai rencana sesi dan cookie yang tetap dapat dibaca aplikasi tenant. **Akses dukungan** memakai satu sesi untuk guard `platform` dan `web`. Bila cookie tidak dibagikan, perpindahan ke layar tenant gagal.
