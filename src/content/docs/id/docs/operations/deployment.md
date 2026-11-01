---
title: "Merilis versi baru"
description: "Prosedur rilis Inbils yang berurutan: prasyarat, backup, build, migrate, restart, health check, dan cara rollback."
---

Rilis punya satu aturan: backup dulu, ubah kode dan database kemudian, buktikan kesehatan di akhir. Halaman ini adalah prosedur berurutan untuk stack Docker, dengan varian host-managed dicatat di tempat yang berbeda. Prosedurnya netral terhadap penyedia. Perintah yang mengubah sistem live hanya untuk produksi.

## Prasyarat

- Rilis sudah direview dan di-merge, dan working tree di host deploy bersih.
- Backup terbaru ada, dan checksum-nya terverifikasi (lihat [Backup dan restore](/docs/operations/backup-restore/)).
- `/up` dan `/ready` ada di rilis target.
- Queue worker dan scheduler dikelola process manager (Docker, systemd, Supervisor), bukan sesi shell.
- Anda tahu apakah rilis memuat migration yang tidak bisa dibalik. Bila ya, rencanakan restore, bukan rollback (lihat di bawah).

:::danger
Jangan pernah menjalankan ini pada instance yang sudah berjalan: `php artisan migrate:fresh`, `migrate:refresh`, `migrate:reset`, dan `db:seed`. Tiga yang pertama menghapus atau memutar balik data. Seeding produksi tidak didukung: permission baru dikirim lewat migration, bukan seeder.
:::

## Prosedur (stack Docker)

Jalankan perintah dari repositori di host. `DOCKER_CONTEXT=default` hanya perlu bila konteks Docker Desktop aktif.

1. **Umumkan jendela rilis dan backup.** Jalankan `scripts/operations/backup.sh`, verifikasi checksum, lalu catat kesegaran backup:

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan ops:backup-heartbeat
   ```

   Sertakan `storage/app/private` di backup media: lampiran tiket, bukti SPK, dan dokumen pelanggan ada di sana.

2. **Maintenance mode** selama migrate:

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan down --retry=60
   ```

3. **Simpan image untuk rollback**, lalu build dari kode baru sambil menarik base image:

   ```bash
   docker tag inbils-app:local inbils-app:before-release
   docker compose --env-file .env.docker build --pull app queue platform-queue scheduler
   ```

4. **Buat ulang service aplikasi** dari image baru (database dan Redis tetap):

   ```bash
   docker compose --env-file .env.docker up -d --no-deps app queue platform-queue scheduler
   ```

5. **Migrate** (hanya produksi):

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan migrate --force
   docker compose --env-file .env.docker exec -T app php artisan migrate:status
   ```

6. **Cache dan restart.** Bangun ulang cache konfigurasi, reset cache permission bila rilis menambah atau mengubah permission, dan suruh worker memuat kode baru:

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan config:cache
   docker compose --env-file .env.docker exec -T app php artisan permission:cache-reset
   docker compose --env-file .env.docker exec -T app php artisan queue:restart
   ```

   Jangan menjalankan `cache:clear` sebagai langkah rutin: cache juga menyimpan catatan idempotensi API (24 jam), penghitung throttle, dan heartbeat yang dibaca `/ready`.

7. **Keluar dari maintenance mode:**

   ```bash
   docker compose --env-file .env.docker exec -T app php artisan up
   ```

8. **Cek kesehatan** (bagian berikut).

## Prosedur (PHP di-host sendiri)

Untuk host yang menjalankan PHP sendiri, urutan dari checkout baru adalah:

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan down --retry=60
# back up here, then: php artisan ops:backup-heartbeat
php artisan migrate --force
php artisan up
php artisan queue:restart
```

Lalu pastikan process manager menghidupkan kembali worker dan timer scheduler masih aktif:

```bash
sudo systemctl status inbils-queue-worker
sudo systemctl status inbils-platform-queue-worker
sudo systemctl status inbils-scheduler.timer
```

## Health check setelah rilis

```bash
curl -s http://127.0.0.1:8000/up
curl -s http://127.0.0.1:8000/ready
bash scripts/operations/health-check.sh --base-url http://127.0.0.1:8000
```

Pakai base URL Anda sendiri (stack Docker default ke port 8080). `health-check.sh` keluar dengan 0 hanya bila `/up` dan `/ready` menjawab HTTP 200 dan body `/ready` berisi `"status":"ready"`. Jawaban `degraded` adalah HTTP 200 tetapi gagal di script: baca check mana yang `fail` (lihat [Health check, log, dan metrik](/docs/operations/observability/)).

Pastikan juga:

- `php artisan schedule:list` menampilkan entri tagihan dan operasional yang diharapkan.
- Worker berjalan di bawah process manager (`docker compose --env-file .env.docker ps`).
- `/platform/login` terbuka.
- Di produksi `storage_link` dan `mail` bernilai `ok` di `/ready`. Bila `storage_link` gagal, `public/storage` bukan symbolic link: jalankan `php artisan storage:link`.

## Checklist keamanan migration

1. Buat backup baru dan verifikasi checksum-nya.
2. Jalankan migration pada klon non-produksi lebih dulu.
3. Pakai `php artisan down --retry=60` agar tidak ada penulisan setengah jadi.
4. Utamakan expand, migrate, contract: tambah kolom nullable, backfill, baru terapkan constraint.
5. Periksa apakah migration bisa dibalik. Bila menghapus atau menulis ulang data, siapkan restore dari backup, bukan rollback.
6. Jalankan `php artisan migrate --force`, lalu `php artisan migrate:status` dan `/ready`.
7. Jalankan `php artisan up`.

## Konfigurasi yang dicek pada setiap instalasi

- `TRUSTED_PROXIES`: atur di belakang reverse proxy atau load balancer (alamat dipisah koma, rentang CIDR boleh, `*` hanya bila proxy adalah satu-satunya jalan masuk).
- `MAIL_FROM_ADDRESS` dan `MAIL_FROM_NAME`: alamat asli pada domain Anda sendiri.
- Logging: `LOG_CHANNEL=stack`, `LOG_STACK=stderr,daily`, `LOG_DAILY_DAYS=14`, `LOG_STDERR_FORMATTER=Monolog\Formatter\JsonFormatter`, `LOG_LEVEL=info`. Deployment yang sudah berjalan memakai `.env.docker` sendiri: perubahan template tidak sampai dengan sendirinya.
- Timing queue: `retry_after` adalah 180 detik pada koneksi `database` dan `redis` (`DB_QUEUE_RETRY_AFTER`, `REDIS_QUEUE_RETRY_AFTER`). Bila host mengatur salah satunya lebih rendah, naikkan ke minimal 180.
- `CACHE_STORE` harus bertahan melebihi satu request (`redis` atau `database`), karena penjaga submit ganda menyimpan kuncinya di cache selama 10 detik.
- `APP_KEY`: backup bersama database. Saat merotasi, cantumkan kunci lama di `APP_PREVIOUS_KEYS` (dipisah koma) sampai secret tersimpan ulang.

## Upload privat (sekali per environment)

Lampiran tiket, bukti SPK, dan dokumen pelanggan ada di disk privat (`storage/app/private`) dan hanya disajikan setelah policy pemilik mengizinkan. File yang diunggah sebelum perubahan itu masih di disk publik sampai Anda memindahkannya:

```bash
php artisan inbils:media:privatize --dry-run
php artisan inbils:media:privatize
php artisan inbils:media:privatize
```

Perintah pertama mendaftar apa yang akan dipindah dan tidak menulis apa pun. Yang kedua menyalin, memverifikasi, membalik baris, dan menghapus salinan publik. Yang ketiga harus melaporkan `Moved 0 media`. Jalankan sebagai user pemilik `storage/`. Exit code 1 berarti ada media yang masih di disk publik: baris `Failed <id>: ...` atau `Missing <id>: public:<path>` menyebut penyebabnya. Perbaiki dan jalankan ulang.

## Rollback

Rollback aplikasi lebih dulu bila masalahnya hanya di kode. Jangan rollback migration secara membabi buta. Pohon keputusannya ada di [Backup dan restore](/docs/operations/backup-restore/). Singkatnya, untuk rilis tanpa perubahan skema:

```bash
docker tag inbils-app:before-release inbils-app:local
docker compose --env-file .env.docker up -d --no-deps app queue platform-queue scheduler
docker compose --env-file .env.docker exec -T app php artisan queue:restart
```

Bila rilis menjalankan migration destruktif atau satu arah, berhenti dan restore dari backup ke target baru sebelum mengarahkan traffic ke sana.
