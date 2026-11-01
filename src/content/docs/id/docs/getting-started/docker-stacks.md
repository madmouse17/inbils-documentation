---
title: "Docker stacks"
description: "Dua stack Docker Inbils yang independen, Sail di port 80 dan stack bergaya produksi di port 8080: isi, kapan dipakai, perintah, dan port."
---

Inbils menyediakan dua stack Docker. Keduanya adalah project Compose yang independen, tanpa container, network, volume, atau port bersama. Anda dapat menjalankan keduanya sekaligus.

## Dua stack

| | Sail (pengembangan) | Stack bergaya produksi |
| --- | --- | --- |
| File Compose | `compose.sail.yaml`, dipilih lewat `SAIL_FILES` di `.env` | `compose.yaml` dengan `Dockerfile` |
| Project / network | `inbils-sail` / `inbils-sail_sail` | `inbils` / `inbils_inbils` |
| Runtime aplikasi | `sail-8.5/app` (PHP 8.5, Node 24, `artisan serve`, source di-bind-mount) | Image FrankenPHP `inbils-app:local`, source dimasukkan ke image |
| File env | `.env` | `.env.docker`, diberikan dengan `--env-file` |
| Aplikasi | <http://localhost> | <http://localhost:8080> |
| MySQL | `127.0.0.1:3306`, user `sail`, schema `inbils` | `127.0.0.1:3307`, user `inbils` |
| Redis / Mailpit | `127.0.0.1:6379` / <http://localhost:8025> | Redis hanya internal / tidak ada |
| Named volume | `inbils-sail_sail-mysql`, `inbils-sail_sail-redis` | `inbils_mysql_data`, `inbils_redis_data`, `inbils_app_storage` |

### Isi masing-masing

- **Sail**: container aplikasi (`laravel.test`), MySQL, Redis, dan Mailpit. Service `queue` dan `scheduler` juga ada, tetapi berada di profile `workers` dan hanya berjalan dengan `COMPOSE_PROFILES=workers`.
- **Stack bergaya produksi**: aplikasi FrankenPHP, MySQL 8.4, Redis, worker `queue` (queue default dan WhatsApp), worker `platform-queue` (job panel platform yang berjalan sampai satu jam), dan `scheduler`.

## Kapan memakai yang mana

- Pakai **Sail** untuk pengembangan sehari-hari. Source di-bind-mount, jadi perubahan kode tidak perlu rebuild. Jalankan `./vendor/bin/sail npm run build` setelah mengubah frontend.
- Pakai **stack bergaya produksi** untuk memeriksa perilaku image rilis: source ada di dalam image, worker terpisah, dan `APP_ENV=production` di file env contoh. Stack ini juga yang dibangun oleh prosedur deployment. Lihat [Deployment](/docs/operations/deployment/).

:::caution
Setiap port Sail hanya dipublikasikan di `127.0.0.1`. Sail berjalan dengan `APP_DEBUG=true`, kredensial demo yang publik, dan Redis tanpa autentikasi, jadi jangan pernah membukanya ke luar.
:::

## Menyiapkan stack bergaya produksi

```bash
cp .env.docker.example .env.docker      # git-ignored; set APP_KEY and the DOCKER_DB_* secrets
docker run --rm dunglas/frankenphp:php8.5-bookworm php -r 'echo "base64:", base64_encode(random_bytes(32)), PHP_EOL;'   # a fresh APP_KEY value
export DOCKER_CONTEXT=default           # the root daemon; see the note below
docker compose --env-file .env.docker config > /dev/null
docker compose --env-file .env.docker build --pull
docker compose --env-file .env.docker up -d
docker compose --env-file .env.docker exec app php artisan migrate --force
docker compose --env-file .env.docker exec app php artisan db:seed --force     # production env: roles, settings, regions only
docker compose --env-file .env.docker exec app php artisan inbils:setup        # first user, then the wizard
docker compose --env-file .env.docker ps
```

Periksa <http://localhost:8080/up>, <http://localhost:8080/ready>, dan <http://localhost:8080/platform/login>. Lakukan backup sebelum memperbarui stack yang berisi data, lihat [Backup dan restore](/docs/operations/backup-restore/).

## Catatan `DOCKER_CONTEXT=default`

Stack deploy berjalan di Docker daemon root. Dengan Docker context lain (misalnya Docker Desktop), `docker compose` menampilkan container hanya berstatus "Created", atau daftar kosong. Awali perintah dengan `DOCKER_CONTEXT=default`, atau `export` untuk shell tersebut.

## Perintah harian (Sail)

| Tugas | Perintah |
| --- | --- |
| Start / stop (data tetap) | `./vendor/bin/sail up -d` / `./vendor/bin/sail stop` |
| Artisan, tinker | `./vendor/bin/sail artisan <cmd>`, `./vendor/bin/sail artisan tinker` |
| Migrate | `./vendor/bin/sail artisan migrate --force` |
| Frontend HMR | `./vendor/bin/sail npm run dev` (lalu <http://localhost>) |
| Build frontend | `./vendor/bin/sail npm run build` |
| Log | `./vendor/bin/sail artisan pail` atau `./vendor/bin/sail logs -f laravel.test` |
| Shell di container aplikasi | `./vendor/bin/sail shell` |
| Ekspor kontrak API mobile | `./vendor/bin/sail artisan scramble:export` |
| Render PDF panduan pengguna | `./vendor/bin/sail exec -T -u sail laravel.test php -d memory_limit=1G artisan inbils:docs:pdf` |

:::danger
Jangan pernah menjalankan `migrate:fresh`, `db:wipe`, `sail down -v`, `docker volume rm`, atau `docker system prune --volumes` pada data yang ingin Anda simpan. `sail stop` dan `sail down` mempertahankan volume MySQL dan Redis. Jangan jalankan `sail:install` atau `sail:add`: keduanya mengubah `compose.yaml`.
:::

## Port

| Stack | Layanan | Default | Ubah untuk satu shell |
| --- | --- | --- | --- |
| Sail | Aplikasi | 80 | `APP_PORT=8081 ./vendor/bin/sail up -d` (samakan `APP_URL`) |
| Sail | MySQL | 3306 | `FORWARD_DB_PORT` |
| Sail | Redis | 6379 | `FORWARD_REDIS_PORT` |
| Sail | Dashboard Mailpit | 8025 | `FORWARD_MAILPIT_DASHBOARD_PORT` |
| Sail | Vite | 5173 | `VITE_PORT` |
| Bergaya produksi | Aplikasi | 8080 | `APP_PORT` di `.env.docker` |
| Bergaya produksi | MySQL | 3307 | `MYSQL_HOST_PORT` di `.env.docker` |

Jangan pernah mengisi `APP_PORT` di `.env` Sail: nilainya dipakai bersama dengan `compose.yaml`. Untuk stack bergaya produksi, ubah nilai di `.env.docker` lalu buat ulang service aplikasi:

```bash
docker compose --env-file .env.docker up -d --force-recreate app
```

Jangan publikasikan Redis. Di stack bergaya produksi, Redis hanya dapat dijangkau di network Compose.
