---
title: "Operasional"
description: "Yang diperlukan untuk menjalankan Inbils di produksi: stack container, tanggung jawab operator, dan peta setiap runbook."
---

Bagian ini untuk orang yang menjaga instalasi Inbils tetap berjalan: staf IT ISP atau operator hosting. Isinya mencakup rilis versi baru, pemantauan sistem, backup, dan menjaga worker latar belakang tetap hidup. Prosedurnya netral terhadap penyedia. Inbils tidak mengasumsikan vendor cloud, produk CI, atau secret store tertentu.

## Stack gaya produksi

Repositori menyertakan stack Docker Compose (`compose.yaml` dan `Dockerfile`) yang membangun aplikasi di atas image FrankenPHP (PHP 8.5, base image `dunglas/frankenphp:php8.5-bookworm`). `Dockerfile` menghentikan build bila versi PHP di bawah 8.5.12, jadi lakukan build dengan `--pull`. Stack ini punya enam service:

| Service | Yang dijalankan |
|---|---|
| `app` | Aplikasi web di port 8080 di dalam container. Healthcheck-nya memanggil `/ready`. |
| `queue` | `php artisan queue:work --queue=default,whatsapp --sleep=3 --tries=3 --timeout=90` |
| `platform-queue` | `php artisan queue:work platform --queue=platform --sleep=3 --tries=1 --timeout=3600`, untuk job panjang panel operator `/platform` |
| `scheduler` | `php artisan schedule:work`, pemilik tunggal scheduler |
| `mysql` | MySQL 8.4 |
| `redis` | Redis 7.4 dengan `--appendonly yes` |

Setiap service memakai log driver Docker `json-file` yang dibatasi 10 MB dan 5 file, sehingga satu container menyimpan paling banyak 50 MB output. Cara menjalankan stack untuk pertama kali ada di [Stack Docker](/docs/getting-started/docker-stacks/).

Aplikasi juga bisa dijalankan tanpa Docker. Dalam hal itu, process manager host (systemd, Supervisor, NSSM di Windows) harus menjalankan perintah worker dan scheduler yang sama. Lihat [Queue dan scheduler](/docs/operations/queues-and-scheduler/).

## Tanggung jawab operator

- **Rilis.** Backup, build, migrate, restart worker, cek kesehatan. Jangan pernah menjalankan `migrate:fresh`, `migrate:refresh`, `migrate:reset`, atau `db:seed` pada instance yang sudah berjalan.
- **Secret dan konfigurasi.** `.env` (atau `.env.docker`) ada di host, tidak pernah di repositori. `APP_KEY` juga data: semua secret integrasi per perusahaan dienkripsi dengannya, jadi backup bersama database.
- **Worker.** Queue worker dan scheduler harus diawasi, restart saat crash, start saat boot, dan restart setelah setiap deploy. Jalankan tepat satu pemilik scheduler per environment.
- **Monitoring.** Sambungkan `/up`, `/ready`, laju 5xx, kedalaman queue, `failed_jobs`, ruang disk, dan usia backup ke alerting Anda sendiri. Inbils menyediakan sinyalnya, tetapi tidak membawa APM atau error reporter vendor.
- **Backup.** Script membuat dan memverifikasi arsip, tetapi pengiriman ke tujuan off-host dan restore drill adalah tugas operator.
- **Reverse proxy dan TLS.** Di belakang proxy atau load balancer, atur `TRUSTED_PROXIES`. Bila kosong (default), tidak ada yang dipercaya, sehingga semua pengunjung terlihat dengan alamat proxy dan throttle per alamat berbagi satu jatah.
- **Pengirim email.** Di produksi `MAIL_FROM_ADDRESS` harus alamat asli pada domain milik Anda. Bila tidak, `/ready` melaporkan `mail` sebagai `fail`.

## Peta halaman

| Halaman | Baca bila |
|---|---|
| [Merilis versi baru](/docs/operations/deployment/) | Anda akan merilis versi baru. |
| [Health check, log, dan metrik](/docs/operations/observability/) | Anda memasang monitoring atau melacak masalah lewat request id. |
| [Backup dan restore](/docs/operations/backup-restore/) | Anda menyiapkan backup, menjalankan drill, atau memulihkan dari insiden. |
| [Queue dan scheduler](/docs/operations/queues-and-scheduler/) | Anda mengawasi worker, membaca jadwal, atau menghapus tenant. |

Halaman terkait: [Multi-tenancy](/docs/architecture/multi-tenancy/), [Pemecahan masalah](/docs/getting-started/troubleshooting/), dan [Integrasi](/docs/getting-started/integrations/).
