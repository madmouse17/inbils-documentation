---
title: "Health check, log, dan metrik"
description: "Cara membaca /up dan /ready, melacak request lewat id, memakai audit log dan log, serta alert yang sebaiknya dipasang operator Inbils."
---

Inbils memberi operator tiga jenis sinyal: endpoint kesehatan, log terstruktur dengan request id, dan jejak audit di database. Inbils tidak membawa APM atau error reporter vendor. Anda memilih sendiri (Sentry, Bugsnag, OpenTelemetry, atau lainnya) dan menyambungkannya.

## Endpoint kesehatan

| Endpoint | Tujuan | Nilai status |
|---|---|---|
| `GET /up` | Liveness (default Laravel) | kesehatan framework |
| `GET /ready` | Kesiapan dependensi | `ready`, `degraded`, `not_ready` |

Body `/ready` adalah JSON yang aman untuk publik. Isinya tidak pernah memuat host, DSN, pesan exception, atau stack trace.

```json
{
  "status": "ready|degraded|not_ready",
  "checks": {
    "database": "ok|fail|unknown",
    "cache": "ok|fail|unknown",
    "queue": "ok|fail|unknown",
    "failed_jobs": "ok|fail|unknown",
    "scheduler": "ok|fail|unknown",
    "backup": "ok|fail|unknown",
    "storage_link": "ok|fail|unknown",
    "mail": "ok|fail|unknown"
  }
}
```

`fail` pada database membuat status keseluruhan `not_ready` (HTTP 503). `fail` lain membuatnya `degraded` (HTTP 200 dengan status degraded).

| Check | Arti |
|---|---|
| `scheduler` | `ok` hanya bila cache key `ops:scheduler:heartbeat_at` masih segar (300 detik atau kurang). Entri scheduler `ops:scheduler-heartbeat` menulisnya setiap 5 menit. |
| `backup` | Membaca penanda yang ditulis `php artisan ops:backup-heartbeat` setelah backup terverifikasi. Lebih tua dari 25 jam adalah `fail`; belum pernah diatur adalah `unknown`. |
| `storage_link` | `ok` bila setiap link yang dideklarasikan di `config/filesystems.php` (`public/storage`) adalah symbolic link ke targetnya. `fail` bila berupa direktori asli, link rusak, atau mengarah ke tempat lain: logo yang diunggah lalu tampil sebagai gambar rusak. Perbaiki dengan `php artisan storage:link` setelah menghapus direktori salinan. `unknown` saat menjalankan test. |
| `mail` | Dinilai hanya bila `APP_ENV=production`, selain itu `unknown`. `fail` bila `MAIL_FROM_ADDRESS` kosong, berakhir `.local`, atau berakhir `example.com`. Status keseluruhan menjadi `degraded`, bukan `not_ready`. |

Service Docker `app` memakai `/ready` sebagai healthcheck. Untuk memeriksa kedua endpoint dari shell:

```bash
bash scripts/operations/health-check.sh --base-url http://127.0.0.1:8000
```

## Request id

Satu id mengikuti request dari browser atau aplikasi ke baris log, job queue, panggilan vendor, dan baris audit.

- Middleware `App\Http\Middleware\AssignRequestId` berjalan paling awal, sehingga jawaban maintenance mode (503) pun membawa id.
- Middleware menerima `X-Request-Id` atau `X-Correlation-Id` masuk sepanjang 1 sampai 128 karakter dari `[A-Za-z0-9._:-]`, bila tidak ia membuat UUID. Id dari klien dipercaya apa adanya, jadi jangan pernah memakainya untuk otorisasi.
- Setiap response menggemakan `X-Request-Id`. Setiap body error `api/*` membawa `request_id`, dan halaman error browser menampilkan "ID permintaan".
- Id sampai ke setiap record log sebagai `extra.request_id`, ke job queue yang di-dispatch request, ke panggilan `Http::` keluar (Midtrans, WhatsApp Cloud API, Nominatim) sebagai header `X-Request-Id`, dan ke setiap baris `activity_log`.

Saat pengguna melaporkan masalah, minta id-nya lalu cari:

```bash
docker compose --env-file .env.docker logs app | grep <id>
```

```sql
select * from activity_log where request_id = '<id>';
```

Di host tanpa Docker pakai `grep <id> storage/logs/laravel-*.log`. Konsumen log yang membaca `context.request_id` harus membaca `extra.request_id`.

## Log

- Template deploy mengatur `LOG_CHANNEL=stack`, `LOG_STACK=stderr,daily`, `LOG_DAILY_DAYS=14`, dan `LOG_STDERR_FORMATTER=Monolog\Formatter\JsonFormatter`: satu objek JSON per baris di stderr (yang ditampilkan `docker compose logs`) dan satu file per hari di `storage/logs/laravel-YYYY-MM-DD.log`, 14 file disimpan. `LOG_LEVEL=info` menjaga baris `debug` tidak masuk produksi.
- Setiap service Compose memakai driver `json-file` dengan `max-size: 10m` dan `max-file: 5`, paling banyak 50 MB per container. Batas ini berlaku saat container dibuat, jadi jalankan `docker compose --env-file .env.docker up -d` setelah perubahan; `restart` tidak menerapkannya.
- Deployment yang sudah berjalan memakai `.env.docker` sendiri. Bila masih menulis satu `storage/logs/laravel.log`, file itu tumbuh tanpa batas dan tidak ada job yang memangkasnya. Setelah beralih, arsipkan atau hapus secara manual.
- `App\Support\Observability\LogRedactor` mengganti seluruh nilai pada key secret dan data pribadi (misalnya `token`, `secret`, `authorization`, `cookie`, `api_key`, `nik`, `npwp`, `phone`, `email`, `session`, `signature`) dengan `[REDACTED]`, dan kecocokan whole-key `otp`, `pin`, `code`. Ia tidak mencakup pesan log atau pesan exception itu sendiri: pesan `QueryException` bisa menyematkan binding SQL. Kode mencatat id dan nama class, tidak pernah nilai.
- Exception dicatat lewat `ExceptionReporter`, satu kali per instance exception, dan paling banyak 5 kali per menit per lokasi kegagalan. Dengan `APP_DEBUG=false`, response publik tidak pernah membocorkan pesan exception atau trace.

### Baris log yang layak dipasangi alert

Konteks hanya memuat id dan nama class.

| Pesan | Level | Arti |
|---|---|---|
| `db.slow_query` | warning | Sebuah query memakan lebih dari 500 ms. SQL dengan placeholder, tanpa binding. |
| `activity_log.pruned` | info | Satu baris per grup retensi dari prune harian. `deleted` 0 selama berhari-hari pada instalasi yang ramai berarti prune berhenti. |
| `geocode.failed` | warning | Pencarian alamat (Nominatim) gagal; kegagalan tidak di-cache, jadi pencarian berikutnya bertanya lagi. |
| `radius.unavailable` | warning | Database RADIUS sebuah perusahaan tidak menjawab; halaman jaringan menampilkan status tidak diketahui. |
| `tickets.sla_check_failed` | warning | `CheckTicketSlaBreachesJob` kehabisan percobaan. |
| `announcement.notify_failed` | warning | `SendAnnouncementNotifications` kehabisan percobaan. |
| `push.send_failed` | warning | Push ke FCM gagal. |
| `integration.host_refused` | warning | Host mail atau RADIUS ditolak saat runtime. |
| `queue.job_failed` | warning | Sebuah job gagal permanen. |

## Jejak audit

Halaman audit (Laporan, Log Audit) dan halaman audit platform membaca satu tabel, `activity_log`. Selain perubahan model, sebuah baris mencatat asalnya: `request_id`, `ip_address` (hanya untuk baris yang ditulis di dalam request web atau API) dan `user_agent` (hanya untuk nama log `security`, `platform`, dan `support`). Di belakang reverse proxy atur `TRUSTED_PROXIES`, atau setiap baris membawa alamat proxy.

Baris keamanan (nama log `security`; panel platform menulis `platform`) mencakup `login`, `logout`, `login.failed`, `lockout`, kejadian reset dan perubahan kata sandi, `two_factor.challenge_passed`, serta `role.attached` dan `role.detached`. Tidak ada baris yang menyimpan secret atau alamat yang diketik: `email_hash` adalah HMAC dari alamat huruf kecil dengan `APP_KEY`.

Retensi diatur oleh `php artisan inbils:activity-log:prune`, dijadwalkan harian pukul 19:30 UTC: 365 hari untuk setiap nama log, 730 hari untuk `security`, `platform`, dan `support` (`config/activitylog.php`). `queue:prune-failed --hours=720` menyimpan `failed_jobs` selama 30 hari. Halaman audit memerlukan periode paling lama 92 hari (7 hari bila tidak diisi).

## Alert yang dipasang

| Sinyal | Severity | Deteksi | Tindakan pertama |
|---|---|---|---|
| Lonjakan HTTP 5xx | Sev-1 | Hitungan log reverse proxy atau aplikasi | Cek `/ready`, deploy terakhir, log exception lewat `request_id`; rollback bila mulai setelah deploy. |
| Latensi p95 tinggi | Sev-2 | Latensi proxy atau APM | Cari route yang lambat; cek database dan cache. |
| Kedalaman queue tinggi | Sev-2 | Kedalaman tabel `jobs` atau metrik worker | Pastikan worker hidup; kuras backlog; cek failed jobs. |
| Failed jobs bertambah | Sev-1 | Pertumbuhan `failed_jobs` | Periksa lewat uuid; perbaiki consumer; jangan menjalankan ulang efek samping uang atau stok secara membabi buta. |
| Heartbeat scheduler basi | Sev-2 | `/ready` `scheduler=fail` | Pastikan `schedule:work` atau cron berjalan; pulihkan penulis heartbeat. |
| Backup basi atau tidak diketahui | Sev-2 | `/ready` `backup` | Jalankan `scripts/operations/backup.sh`, lalu catat heartbeat. |
| Kegagalan tagihan | Sev-1 | Log domain, failed jobs, notifikasi admin | Periksa error tagihan; hentikan retry bila uang berisiko; rekonsiliasi invoice manual. |
| Pelanggaran SLA tiket | Sev-2 | `tickets:sla` dan notifikasi pelanggaran | Tugaskan atau eskalasi tiket. |
| Ruang disk menipis | Sev-1 | Monitor host | Bebaskan log dan backup; perbesar volume. |
| Database tidak tersedia | Sev-1 | `/ready` `database=fail` | Pulihkan konektivitas; biarkan aplikasi di maintenance mode bila perlu. |

Lihat [Queue dan scheduler](/docs/operations/queues-and-scheduler/) untuk worker dan [Backup dan restore](/docs/operations/backup-restore/) untuk sinyal backup.
