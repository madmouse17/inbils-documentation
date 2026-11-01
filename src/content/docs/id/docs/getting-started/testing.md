---
title: "Menjalankan test"
description: "Jalankan PHPUnit, quality gate, dan suite E2E Playwright untuk Inbils: aturan database inbils_test, perintah persis, lock, dan yang tidak boleh berbarengan."
---

Inbils memiliki suite PHPUnit (PHPUnit 11 dengan parallel runner), pemeriksaan statis, dan suite E2E Playwright (chromium). Test dan E2E memakai satu schema MySQL dan berbagi lock, jadi baca aturan di bawah sebelum menjalankannya.

## Aturan database `inbils_test`

Test dan E2E memakai schema MySQL `inbils_test` dan tidak ada yang lain, jangan pernah `inbils`. `phpunit.xml` mengunci host `mysql`, schema `inbils_test`, dan user `inbils`. `Tests\TestCase` menolak boot pada target lain.

Init script MySQL Sail `docker/mysql/sail/10-create-test-database.sh` membuat schema, user test `inbils`, dan grant-nya (termasuk schema worker `inbils_test_test_%` yang dipakai run paralel) sekali, saat volume MySQL pertama kali dibuat. Setup baru yang normal tidak perlu melakukan apa pun. Jika volume Anda sudah ada sebelum script itu, jalankan sekali:

```bash
./vendor/bin/sail exec -T mysql bash -s < docker/mysql/sail/10-create-test-database.sh
```

## PHPUnit

Jalankan satu file atau filter secara serial. Ini berjalan di `inbils_test` dan tidak membangun ulang schema:

```bash
./vendor/bin/sail artisan test --compact tests/Feature/Admin/DashboardTest.php
./vendor/bin/sail artisan test --compact --filter=SomeTest
```

Jalankan seluruh suite secara paralel (sekitar 5400 test, sekitar 33 menit dengan 3 worker). Periksa `uptime` lebih dulu dan jaga beban di bawah 6:

```bash
flock /tmp/inbils-e2e.lock env DOCKER_CONTEXT=default ./vendor/bin/sail exec -T -u sail laravel.test \
  flock /tmp/inbils-phpunit.lock php -d memory_limit=1G artisan test --parallel --processes=3 --compact
```

- Maksimum 4 proses. Pakai 4 hanya pada host yang sepi.
- Jangan pernah memakai `--drop-databases` atau `--recreate-databases`. Worker memakai ulang schema `inbils_test_test_<N>`.
- Kelas test dengan trait database berjalan di schema milik worker-nya; kelas tanpa trait tetap di `inbils_test`.

## Quality gate lainnya

```bash
./vendor/bin/sail bin pint --dirty              # PHP format
./vendor/bin/sail composer analyse              # PHPStan (larastan) level 5
./vendor/bin/sail npm run typecheck
./vendor/bin/sail npm run lint
./vendor/bin/sail npm run format:check
./vendor/bin/sail npm run build                 # tsc + vite build
```

## E2E Playwright

E2E berjalan di host terhadap server kanonik di port 8010 dan schema `inbils_test`. E2E memerlukan Node, PHP CLI (8.4+, dengan `vendor/` terpasang; isi `PHP_BINARY` untuk memakai binary tertentu), dan MySQL yang dapat dijangkau dan memiliki `inbils_test` serta user `inbils`.

### Run pertama

```bash
npm ci --legacy-peer-deps
npx playwright install chromium
cp .env.e2e.example .env.e2e        # fill DB_PASSWORD; `.env.e2e` is git-ignored
php artisan key:generate --env=e2e  # or ./vendor/bin/sail artisan key:generate --env=e2e
```

`.env.e2e.example` mengarah ke `127.0.0.1:3307`, MySQL milik stack bergaya produksi. `DB_PASSWORD`-nya adalah `DOCKER_DB_PASSWORD` dari `.env.docker`. MySQL Sail (`127.0.0.1:3306`) memiliki schema dan user yang sama, jadi `DB_PORT=3306` adalah alternatif jika Anda tidak menjalankan stack 8080.

### Perintah kanonik

```bash
flock /tmp/inbils-e2e.lock sh -c 'npm run build && node scripts/e2e-setup.mjs && npm run test:e2e -- --project=chromium --workers=1'
```

- Jangan menambahkan path spec posisional. Runner meneruskan argumen ke Playwright, yang membacanya sebagai filter file dan melaporkan "No tests found". Pakai `--grep "<text>"`, atau `npm run test:e2e:smoke` untuk test `@smoke`.
- `node scripts/e2e-setup.mjs` mereset data. Jangan pernah menjalankan `tests/e2e/setup.php` secara langsung.

## Lock dan yang tidak boleh berbarengan

:::caution
Jangan pernah menjalankan PHPUnit, suite E2E, dan `npm run docs:screenshots` pada saat yang sama. Semuanya berbagi `inbils_test` dan sebuah mutex. Bila dijalankan bersamaan, mereka menghapus data satu sama lain.
:::

- E2E dan `docs:screenshots` mengambil lock `/tmp/inbils-e2e.lock`. PHPUnit paralel mengambil `/tmp/inbils-phpunit.lock` di dalam container.
- Wrapper setup E2E juga mengambil mutex kanonik dan menolak mereset data selama suite `npm run test:e2e` lain aktif.
- Run PHPUnit menghapus pengguna demo di `inbils_test` (`RefreshDatabase`). Jika login E2E gagal tepat setelah PHPUnit, jalankan `node scripts/e2e-setup.mjs`.

Lihat [Troubleshooting](/docs/getting-started/troubleshooting/) untuk error yang timbul dari aturan ini.
