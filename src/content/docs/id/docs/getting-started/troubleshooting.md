---
title: "Troubleshooting"
description: "Solusi masalah umum saat menjalankan Inbils lokal: Docker context, port, storage link, manifest Vite, permission, test, queue, dan proxy HTTPS."
---

Berikut masalah yang paling sering muncul saat menjalankan Inbils dengan Sail atau stack bergaya produksi. Setiap baris memberi gejala dan solusinya. Perintah memakai Sail; untuk stack bergaya produksi, pakai `docker compose --env-file .env.docker exec app php artisan ...`.

## Docker dan setup

| Gejala | Solusi |
| --- | --- |
| `docker compose` pada stack deploy menampilkan container hanya berstatus "Created", atau daftar kosong | Pakai daemon root: awali dengan `DOCKER_CONTEXT=default` (atau `export`) |
| `sail build` menyebut `vendor/laravel/sail` tidak ada | Jalankan dulu `composer install` di container sekali pakai dari [Memulai](/docs/getting-started/) |
| Port sudah dipakai (80, 3306, 6379, 8025, 5173) | Atur untuk satu shell: `APP_PORT=8081 ./vendor/bin/sail up -d` (samakan `APP_URL`), atau `FORWARD_DB_PORT`, `FORWARD_REDIS_PORT`, `FORWARD_MAILPIT_DASHBOARD_PORT`, `VITE_PORT`. Jangan pernah mengisi `APP_PORT` di `.env` |

## Aplikasi

| Gejala | Solusi |
| --- | --- |
| `/ready` menampilkan `storage_link: fail` dan status `degraded`, atau logo yang diunggah menjadi gambar rusak | `./vendor/bin/sail artisan storage:link`. Jika `public/storage` adalah direktori asli, jalankan dulu `mv public/storage public/storage.old` |
| `/ready` `scheduler` atau `backup` bernilai `unknown` | Normal saat pengembangan sampai `schedule:work` (atau profile `workers`) pernah berjalan. Backup hanya ada di tempat Anda menjalankan `scripts/operations/backup.sh` |
| "Unable to locate file in Vite manifest" | `./vendor/bin/sail npm run build`, atau jalankan `npm run dev` |
| Job queue, email, atau bell tidak muncul | Jalankan worker (lihat [Memulai](/docs/getting-started/)) dan periksa Mailpit. Jalankan `queue:restart` setelah perubahan kode |
| Worker atau scheduler menjalankan kode lama | `./vendor/bin/sail artisan queue:restart`. Untuk stack 8080, rebuild dan buat ulang `app queue platform-queue scheduler` |
| Halaman dimuat tanpa gaya di belakang `https://inbils.test` | `TRUSTED_PROXIES` harus mencakup network Docker, lihat [Domain .test lokal](/docs/getting-started/local-domains/) |
| Vite HMR tidak berfungsi di belakang `https://inbils.test` | HMR tidak berfungsi di belakang proxy HTTPS. Pakai <http://localhost> untuk `npm run dev` |

## File dan permission

| Gejala | Solusi |
| --- | --- |
| Permission denied atau EACCES pada `storage/app/...` dari host atau dari E2E, setelah run sebagai root | File yang dibuat oleh `sail exec` tanpa `-u sail` dimiliki root. Solusi: `./vendor/bin/sail exec -T laravel.test sh -c 'find /var/www/html/storage -user root -exec chown 1000:1000 {} +'` (pakai `id -u`:`id -g` Anda jika bukan 1000). Jalankan tugas PHP sebagai `sail artisan ...` atau `sail exec -u sail` |

## Test

| Gejala | Solusi |
| --- | --- |
| Test menolak boot: "PHPUnit bootstrap safety guard refused to bootstrap Laravel." | Environment mengarah ke database lain, atau `bootstrap/cache/config.php` ada. Jalankan `./vendor/bin/sail artisan config:clear`, dan jangan meng-export `DB_*` atau `APP_ENV` di shell Anda |
| Test tidak dapat terhubung ke MySQL sebagai `inbils` | Volume MySQL lebih lama dari init script. Jalankan sekali, lihat [Menjalankan test](/docs/getting-started/testing/) |
| Login E2E gagal tepat setelah run PHPUnit | PHPUnit menghapus pengguna demo di `inbils_test` yang dipakai bersama. `node scripts/e2e-setup.mjs` meresetnya |

## Push notification

| Gejala | Solusi |
| --- | --- |
| `Push is off` | `FIREBASE_CREDENTIALS` kosong, atau config cache lebih lama dari perubahannya. Lihat [Integrasi per perusahaan](/docs/getting-started/integrations/) |
| Bell ada, tidak ada job push | Penerima tidak memiliki device token yang dapat dijangkau untuk app itu, atau kredensial belum diatur |
| Job gagal setelah tiga percobaan | Periksa `queue:failed`, pengaktifan FCM v1 API, project service account, dan akses jaringan |

:::note
Jangan pernah menjalankan `migrate:fresh`, `db:wipe`, `sail down -v`, atau `docker volume rm` untuk memperbaiki masalah pada data yang ingin Anda simpan.
:::
