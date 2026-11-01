---
title: "Memulai"
description: "Pasang Inbils secara lokal dengan Laravel Sail: prasyarat, setup, seeding, pengguna pertama, operator platform, health check, dan worker."
---

Halaman ini membawa Anda dari clone baru sampai Inbils berjalan di mesin sendiri, memakai Laravel Sail. Sail adalah stack pengembangan lokal. Semuanya berjalan di container, jadi host tidak memerlukan PHP atau Composer. Untuk stack bergaya produksi, lihat [Docker stacks](/docs/getting-started/docker-stacks/).

## Prasyarat

| Kebutuhan | Catatan |
| --- | --- |
| Docker Engine dengan Compose v2 | Semuanya berjalan di container; host tidak memerlukan PHP atau Composer |
| Git | Akses ke repositori (`https://github.com/madmouse17/isp_inbils.git`) |
| Sekitar 6 GB disk kosong, port bebas | 80, 3306, 6379, 1025, 8025, 5173 (semuanya terikat ke `127.0.0.1`). Anda dapat mengubahnya per shell, lihat [Troubleshooting](/docs/getting-started/troubleshooting/) |
| Node.js dan PHP di host | Opsional. Hanya suite E2E Playwright dan `npm run docs:screenshots` yang berjalan di host (Node 22+, PHP 8.4+ CLI) |

## Setup pertama kali dengan Laravel Sail

Sail memakai `compose.sail.yaml` dan project Compose `inbils-sail`. Stack ini terpisah dari stack bergaya produksi di `compose.yaml`.

### 1. Clone dan buat `.env`

```bash
git clone https://github.com/madmouse17/isp_inbils.git inbils
cd inbils
cp .env.example .env
```

Edit `.env`. Berikut key yang penting (hanya nama; nilainya milik Anda):

| Key | Yang dilakukan |
| --- | --- |
| `APP_KEY` | Biarkan kosong; langkah di bawah membuatnya |
| `WWWUSER`, `WWWGROUP` | Isi dengan hasil `id -u` dan `id -g` jika user host Anda bukan 1000 |
| `DB_PASSWORD` | Nilai yang di-commit adalah placeholder lokal yang juga menginisialisasi volume MySQL Sail. Ubah sebelum `sail up` pertama jika Anda ingin nilai lain; perubahan setelahnya tidak sampai ke volume MySQL yang sudah ada |
| `SAIL_FILES` | Biarkan `compose.sail.yaml` (sudah terisi) |
| `APP_PORT` | Biarkan tidak diisi (dipakai bersama dengan `compose.yaml`) |
| `MAIL_*` | Default mengarah ke Mailpit; tidak perlu diubah |
| `FIREBASE_CREDENTIALS`, `MIDTRANS_*`, `WHATSAPP_*`, `RADIUS_*` | Opsional. Biarkan kosong, lihat [Integrasi per perusahaan](/docs/getting-started/integrations/) |

### 2. Pasang dependensi PHP

`sail build` membutuhkan `vendor/laravel/sail`, yang tidak ada pada clone baru. Jalankan Composer sekali di container sekali pakai:

```bash
docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html \
    composer:2 composer install --ignore-platform-reqs
```

### 3. Build, jalankan, dan selesaikan instalasi

```bash
./vendor/bin/sail build
./vendor/bin/sail up -d
./vendor/bin/sail ps                          # laravel.test, mysql, redis, mailpit must be healthy
./vendor/bin/sail composer install            # again, inside the container, with the real PHP extensions
./vendor/bin/sail artisan key:generate        # only while APP_KEY is empty
./vendor/bin/sail artisan migrate --force
./vendor/bin/sail artisan storage:link
./vendor/bin/sail npm ci --legacy-peer-deps
./vendor/bin/sail npm run build
```

## Mengisi data (seeding)

Pilih salah satu dari dua opsi.

| Pilihan | Perintah | Hasil |
| --- | --- | --- |
| Data demo (cara tercepat melihat aplikasi) | `./vendor/bin/sail artisan db:seed` | `DatabaseSeeder` mengisi katalog permission, template role, system settings, dan data referensi wilayah Indonesia. Karena `APP_ENV=local`, seeder juga membuat perusahaan demo `DEMO` ("Inbils Demo Company") dengan pengguna demo dan data contoh. Prosesnya lambat: seeder wilayah memuat sekitar 80 ribu baris desa |
| Instalasi bersih (mirip produksi) | `./vendor/bin/sail artisan db:seed --class=RolePermissionSeeder`, lalu `--class=SystemSettingSeeder`, lalu `--class=IndonesiaRegionSeeder` | Hanya katalog, template, settings, dan wilayah: tanpa perusahaan dan tanpa pengguna |

:::danger
Seeder demo membuat pengguna demo yang semuanya memakai satu kata sandi login publik yang sama. Jangan pernah menjalankan seed data demo di server sungguhan.
:::

## Pengguna pertama dan Setup Wizard

Setelah data demo, buka <http://localhost/login> dan masuk dengan salah satu pengguna demo. Pengguna demo didefinisikan di `database/seeders/DemoUserSeeder.php`.

Setelah instalasi bersih belum ada pengguna. Buat pengguna pertama, masuk di <http://localhost/login>, lalu Setup Wizard (`/setup`, sekali jalan) membuat perusahaan pertama dan menyalin template role:

```bash
./vendor/bin/sail artisan inbils:setup
```

Perintah ini menanyakan nama, email, dan kata sandi login. Jika sudah ada pengguna, perintah mencetak "Already bootstrapped."

## Operator platform dan two-factor

Panel `/platform` memakai login terpisah yang bukan pengguna tenant. Tenant (perusahaan) dan anak perusahaan dibuat di sana. Buat operator pertama, lalu daftarkan two-factor authentication saat login pertama:

```bash
./vendor/bin/sail artisan inbils:platform:admin-create
```

Perintah ini menanyakan nama, email, dan kata sandi login (12 karakter atau lebih, huruf dan angka). Lalu buka <http://localhost/platform/login>.

## Memeriksa bahwa sistem berjalan

```bash
curl --fail http://localhost/up
curl http://localhost/ready      # JSON; "unknown" scheduler/backup is normal until heartbeats exist
```

## Alamat layanan

Semua alamat hanya loopback.

| Layanan | Alamat |
| --- | --- |
| Aplikasi | <http://localhost> |
| Mailpit (semua email keluar saat dev) | <http://localhost:8025> |
| MySQL | `127.0.0.1:3306`, CLI dengan `./vendor/bin/sail mysql` |
| Redis | `127.0.0.1:6379` |
| Vite HMR | <http://localhost:5173> selama `./vendor/bin/sail npm run dev` berjalan |

## Queue dan scheduler

Email, notifikasi, WhatsApp, tindak lanjut Midtrans, dan laporan berjalan di queue (`QUEUE_CONNECTION=database`). Pengecekan tagihan dan SLA berjalan di scheduler. Jalankan keduanya saat Anda mengerjakan fitur tersebut:

```bash
COMPOSE_PROFILES=workers ./vendor/bin/sail up -d       # queue + scheduler containers next to the app
# or in two terminals:
./vendor/bin/sail artisan queue:work --queue=default,whatsapp --tries=3 --timeout=90
./vendor/bin/sail artisan schedule:work
# the platform panel's long jobs (sample data, tenant exports) need their own worker:
./vendor/bin/sail artisan queue:work platform --queue=platform --tries=1 --timeout=3600
```

Worker memakai kode yang ada saat ia dijalankan. Jalankan `./vendor/bin/sail artisan queue:restart` setelah mengubah job, listener, atau notifikasi.

## Langkah berikutnya

- [Docker stacks](/docs/getting-started/docker-stacks/): Sail dibanding stack bergaya deploy, serta perintah harian.
- [Integrasi per perusahaan](/docs/getting-started/integrations/): Midtrans, WhatsApp, RADIUS, email, dan push.
- [Menjalankan test](/docs/getting-started/testing/).
