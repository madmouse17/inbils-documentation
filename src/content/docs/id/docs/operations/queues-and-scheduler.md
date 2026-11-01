---
title: "Queue dan scheduler"
description: "Nama queue, worker, timeout dan retry, perintah terjadwal beserta waktunya, supervisi proses, restart worker, dan penghapusan tenant."
---

Inbils menjalankan pekerjaan latar belakang di dua tempat: queue worker (job seperti pesan WhatsApp, notifikasi push, pemeriksaan SLA) dan scheduler (perintah yang berjalan menurut jam, seperti pembuatan tagihan). Keduanya harus berjalan di produksi dan keduanya harus diawasi oleh host. Worker yang hilang tidak membuat aplikasi crash: job menunggu di tabel `jobs` sampai ada worker yang mulai.

## Queue dan worker

| Worker | Perintah | Membaca | Tries | Timeout |
|---|---|---|---|---|
| Default | `php artisan queue:work --queue=default,whatsapp --sleep=3 --tries=3 --timeout=90` | `default`, `whatsapp` | 3 | 90 s |
| Platform | `php artisan queue:work platform --queue=platform --sleep=3 --tries=1 --timeout=3600` | `platform` | 1 | 3600 s |

Stack Docker menjalankannya sebagai service `queue` dan `platform-queue`. Worker default tidak pernah membaca queue `platform` dan worker platform tidak pernah membaca queue default, jadi jalankan keduanya. Atur `--timeout` di atas job terlama yang diharapkan.

### Queue platform

Panel operator (`/platform`) menyerahkan pekerjaan lambat ke koneksi dan queue sendiri, sehingga job sepanjang satu jam tidak pernah memblokir email tagihan dan worker 90 detik tidak pernah mematikannya. Queue ini memakai driver database dan tabel `jobs` yang sama. Job di dalamnya: `SeedTenantDemoDataJob` (data contoh untuk tenant baru) dan `BuildTenantExportJob` (ekspor tenant).

Queue ini berjalan dengan satu percobaan: run data contoh yang setengah jadi di-rollback seluruhnya dan ekspor yang gagal meninggalkan baris di panel. Retry diam-diam akan menyembunyikan keduanya, jadi operator memulainya lagi dengan sengaja. Jangan menaikkan `--tries` tanpa akar masalah.

`retry_after` adalah 3660 s (tetap di `config/queue.php`, tanpa variabel environment), di atas timeout 3600 s, sehingga job yang sedang berjalan tidak pernah diserahkan ke worker kedua. Docker memerlukan `stop_grace_period: 3660s`, karena default 10 detik akan mematikan job di tengah jalan.

Gejala dan pemeriksaan:

| Gejala | Cek |
|---|---|
| "Isi data contoh" dicentang tetapi tenant baru tetap kosong | Apakah worker platform berjalan (`docker compose ps platform-queue`, `systemctl status inbils-platform-queue-worker`)? Baris dengan `queue = 'platform'` menumpuk di `jobs` bila tidak. |
| Audit platform menampilkan `tenant.demo_data_failed` | Barisnya memuat kelas error dan pesan singkat; `php artisan queue:failed` memuat job lengkapnya. Perbaiki penyebabnya dan dispatch `SeedTenantDemoDataJob` lagi. Run ini semua atau tidak sama sekali, jadi run yang gagal tidak meninggalkan apa pun. |
| `tenant.demo_data_failed` dengan "already has customers, jobs or invoices" | Data contoh hanya masuk ke perusahaan yang kosong. Ini memang dirancang begitu. |
| Sebuah job berjalan dua kali | `retry_after` atau `--timeout` diubah. Jaga `retry_after` di atas `--timeout`. |
| Worker dimatikan di tengah job | Stop timeout process manager lebih pendek dari job. |

### Retry, timeout, dan aturan reliable job

- `retry_after` adalah 180 detik pada koneksi `database` dan `redis` (`DB_QUEUE_RETRY_AFTER`, `REDIS_QUEUE_RETRY_AFTER`), di atas timeout job terlama di queue default (120 detik), sehingga job yang sedang berjalan tidak pernah diserahkan ke worker kedua. Bila host mengatur salah satunya lebih rendah, naikkan ke minimal 180.
- Job menyatakan batasnya sendiri:

  | Job | Tries | Backoff | Timeout |
  |---|---|---|---|
  | `CheckTicketSlaBreachesJob` | 3 | 60/300 s | 60 s |
  | `SendAnnouncementNotifications` | 3 | 30/120/300 s | 120 s |
  | `BuildTenantExportJob` (queue platform) | 1 | tidak ada | 3600 s |
  | `WriteNasDeviceJob` | 1 | tidak ada | 60 s |
  | `CancelMidtransTransactionJob` | 3 | 10/60/300 s | 30 s |

- Job yang kehabisan percobaan dilaporkan satu kali: `ReportFailedQueueJob` menulis warning `queue.job_failed` dengan id aman saja, dan sebagian job menambah warning sendiri (`tickets.sla_check_failed`, `announcement.notify_failed`, `push.send_failed`). Barisnya tetap di `failed_jobs` selama 30 hari, lalu `queue:prune-failed --hours=720` harian menghapusnya. Lakukan retry atau investigasi dalam jendela itu, dan jangan pernah menjalankan ulang efek samping uang atau stok secara membabi buta.
- Job dirancang idempoten: pembuatan tagihan berulang melewati langganan yang sudah punya tagihan untuk periode itu (didukung unique index), pemberitahuan pelanggaran SLA dicap di bawah row lock, pengumuman mengklaim `announcements.notified_at` di bawah row lock, dan pembayaran memakai referensi aktif yang unik.
- Perintah tagihan menangkap kegagalan per perusahaan, sehingga satu perusahaan yang gagal tidak menghentikan yang lain. Admin tiap perusahaan yang gagal menerima satu notifikasi (email dan database) dan perintah keluar dengan kode 1.
- Penulisan web admin punya tiga penjaga terhadap klik ganda dan tab basi: penulisan identik dalam 10 detik dijawab 409, form basi (`expected_updated_at`) dijawab 409, dan penulisan dari tab yang menampilkan perusahaan lain (`X-Inbils-Company`) dijawab 409.

## Scheduler

Semua entri ada di `routes/console.php`. Jalankan tepat satu pemilik scheduler per environment, baik sekali per menit dengan `php artisan schedule:run` maupun terus berjalan dengan `php artisan schedule:work` (service Docker `scheduler`). Jangan pernah menjalankan keduanya di beberapa host. Periksa dengan:

```bash
php artisan schedule:list
```

Angka overlap adalah umur lock `withoutOverlapping` dalam menit, sehingga run yang crash memblokir run berikutnya paling lama sebatas itu. Container `scheduler` menjalankan `php artisan schedule:clear-cache` sebelum `schedule:work` untuk membuang lock yang tertinggal akibat crash. Host yang memakai cron atau systemd dengan `schedule:run` tidak mendapat langkah ini, dan menunggu lock kedaluwarsa.

| Perintah | Kapan | Lock overlap | Fungsi |
|---|---|---|---|
| `ops:scheduler-heartbeat` | setiap 5 menit | tidak ada | Memberi makan check scheduler `/ready`. |
| `announcements:publish-scheduled` | setiap menit | 10 | Mengirim notifikasi gangguan dan pemeliharaan yang jatuh tempo. |
| `tickets:sla` | setiap 15 menit | 10 | Memberi tahu sekali per tiket yang melanggar SLA. |
| `midtrans:reconcile` | setiap 15 menit | 10 | Menanyakan ke Midtrans percobaan pembayaran yang masih pending setelah sepuluh menit. |
| `network:sync` | setiap 15 menit | 10 | Mengantrekan satu `SyncCompanyNetworkJob` per perusahaan dengan integrasi RADIUS aktif. |
| `inventory:send-digest` | harian pukul 00:00 UTC | 120 | Ringkasan gudang untuk pengguna yang mengaktifkannya. |
| `customers:document-expiry` | harian pukul 00:30 | 120 | Mengingatkan saat dokumen pelanggan memasuki 30 hari terakhirnya. |
| `billing:whatsapp-reminders` | harian pukul 01:00 UTC | 120 | Pengingat pembayaran WhatsApp H-3, H-1, dan H+1. |
| `billing:generate` | harian pukul 02:00 | 120 | Tagihan berulang (idempoten). |
| `billing:check-overdue` | harian pukul 03:00 | 120 | Menandai tagihan lewat jatuh tempo sebagai overdue (idempoten). |
| `billing:suspend-overdue` | harian pukul 08:00 | 120 | Isolir untuk langganan yang melewati hari tenggang, untuk perusahaan dengan suspend otomatis aktif. |
| `inbils:activity-log:prune` | harian pukul 19:30 UTC | 120 | Menghapus baris audit yang melewati retensi. |
| `inbils:platform:exports:prune` | setiap jam | 50 | Menghapus arsip ekspor tenant yang kedaluwarsa dan menggagalkan build yang basi. |
| `promo-banners:cleanup-images` | harian | 120 | Menghapus gambar banner 180 hari setelah banner berakhir. |
| `model:prune` | harian | tidak ada | Memangkas log pesan WhatsApp (12 bulan) dan tanda terima STOP (30 hari). |
| `sanctum:prune-expired --hours=24` | harian | tidak ada | Membuang token mobile yang kedaluwarsa lebih dari 24 jam lalu. |
| `queue:prune-failed --hours=720` | harian | tidak ada | Menghapus baris `failed_jobs` yang lebih tua dari 30 hari. |

Waktu yang ditandai UTC dinyatakan sebagai UTC di komentar kode. Waktu lainnya ditulis seperti di `routes/console.php`.

## Supervisi

| Proses | Perintah | Catatan |
|---|---|---|
| Scheduler | `php artisan schedule:run` setiap menit, atau `php artisan schedule:work` | Hanya satu pemilik. |
| Worker default | `php artisan queue:work --sleep=3 --tries=3 --timeout=90` | Restart setelah setiap deploy. |
| Worker platform | `php artisan queue:work platform --queue=platform --tries=1 --timeout=3600` | Stop timeout di atas 3600 s. |

Worker yang diawasi harus restart saat crash dengan backoff, start saat boot, memakai retry dan timeout yang terbatas, dan menulis outputnya ke log host.

- **Docker.** Service `queue`, `platform-queue`, dan `scheduler` punya healthcheck dan kebijakan restart. `platform-queue` mengatur `stop_grace_period: 3660s`.

  ```bash
  docker compose --env-file .env.docker up -d --force-recreate platform-queue
  docker compose --env-file .env.docker logs --tail=100 platform-queue
  ```

- **systemd.** Repositori menyertakan contoh unit di `deploy/systemd/` (`queue-worker.service.example`, `platform-queue-worker.service.example`, `scheduler.service.example`, `scheduler.timer.example`). Salin, ubah path dan user, lalu aktifkan. Unit platform memerlukan `TimeoutStopSec=3660`.

  ```bash
  sudo cp deploy/systemd/queue-worker.service.example /etc/systemd/system/inbils-queue-worker.service
  sudo systemctl edit inbils-queue-worker --full
  sudo systemctl daemon-reload
  sudo systemctl enable --now inbils-queue-worker
  sudo systemctl status inbils-queue-worker
  sudo journalctl -u inbils-queue-worker -n 20 --no-pager
  ```

  Scheduler memakai timer: `sudo systemctl enable --now inbils-scheduler.timer`, lalu `sudo systemctl list-timers --all | grep inbils`.

- **Supervisor.** Contoh `docs/operations/examples/supervisor-laravel.conf.example` mendefinisikan program `inbils-platform-queue` dengan `stopwaitsecs=3700`.
- **Windows.** Satu service NSSM untuk tiap worker (yang platform dengan stop timeout di atas satu jam), dan Task Scheduler untuk `schedule:run`. Contohnya ada di `docs/operations/examples/`.

## Restart worker setelah perubahan kode

Worker menyimpan kode lama di memori. Setelah setiap deploy jalankan:

```bash
php artisan queue:restart
```

Setiap worker, termasuk yang platform, keluar setelah job yang sedang berjalan dan process manager menjalankannya lagi dengan kode baru. Job data contoh yang sedang berjalan selesai lebih dulu, jadi deploy bisa menunggu hingga satu jam untuk worker platform. Jangan mematikannya demi terburu-buru: job di-rollback dan operator harus memulainya lagi. Lalu periksa worker dan scheduler:

```bash
bash scripts/operations/health-check.sh --base-url http://127.0.0.1:8000
```

Script mengharapkan `/up` 200 dan `/ready` 200 dengan `"status":"ready"`.

## Penghapusan tenant

Sebuah tenant (perusahaan induk beserta anak perusahaannya) dihapus permanen dengan satu perintah di konsol server. Tidak ada tombol web, tidak ada job queue, dan tidak ada flag yang melewati pemeriksaan.

```bash
php artisan inbils:platform:purge-company {code}
```

Perintah menolak kecuali semua ini terpenuhi:

1. `{code}` adalah kode persis perusahaan induk (peka huruf besar-kecil; untuk anak perusahaan, hapus perusahaan induknya).
2. Perusahaan dan semua anak perusahaannya disuspend (`is_active = false`) dan `suspended_at` sudah minimal 30 hari lalu.
3. Seorang admin platform meminta penghapusan (`deletion_requested_at` terisi).
4. Ekspor tenant selesai setelah suspend (`ready` atau `expired`). Arsipnya mungkin sudah hilang; catatannya membuktikan ekspor pernah dibuat.
5. Tidak ada user yang bernaung di tenant itu yang juga anggota perusahaan di luarnya.
6. Ada orang di terminal: `--no-interaction` ditolak, dan kode perusahaan harus diketik ulang setelah rencana ditampilkan.

Semuanya diperiksa ulang di dalam transaksi dengan baris perusahaan terkunci, sehingga reaktivasi di antara pertanyaan dan penghapusan yang menang.

Yang dilakukannya:

1. Mencetak id perusahaan, jumlah user dan file media, serta jumlah baris setiap tabel yang akan dikosongkan.
2. Menulis `tenant.purge_started` ke audit platform dengan kode, nama, id perusahaan, dan jumlah tadi.
3. Dalam satu transaksi, melepas baris audit platform milik tenant (tetap menyimpan `tenant_code` dan `tenant_name`), menghapus baris pivot, baris media, notifikasi, token API, sesi, token reset, dan penugasan peran milik user, mengosongkan setiap tabel dengan `company_id` (anak dulu), lalu menghapus anak perusahaan dan perusahaan induk. Error apa pun me-rollback semuanya dan menulis `tenant.purge_failed`.
4. Setelah commit, menghapus `companies/{id}` di disk privat dan publik (dan disk lain yang disebut baris media) serta arsip ekspor tenant, lalu menulis `tenant.purge_completed`.

Peran, permission, pengaturan, wilayah, tenant lain, dan akun platform tidak pernah disentuh.

Setelah run yang gagal atau sebagian:

- **"database was left unchanged" (exit code 1).** Tidak ada yang terhapus. Pesannya menyebut penyebab, biasanya baris perusahaan lain yang menunjuk ke salah satu user tenant ini. Perbaiki datanya dan jalankan lagi.
- **"could not be deleted" (exit code 1).** Bagian database sudah selesai dan tidak bisa dibatalkan. Perintah mendaftar setiap sisa sebagai `disk:path`. Hapus manual (di bawah `storage/app/private` atau `storage/app/public`).
- **Tidak ada undo.** Satu-satunya jalan kembali adalah backup terakhir. Buat satu dan periksa tanggalnya sebelum menjalankan perintah pada tenant yang penting. Lihat [Backup dan restore](/docs/operations/backup-restore/).

Jalankan pada periode sepi: penghapusan dilakukan dalam satu transaksi, dan tenant dengan jutaan baris audit memegang lock selama itu berlangsung.

Lihat juga [Merilis versi baru](/docs/operations/deployment/) dan [Health check, log, dan metrik](/docs/operations/observability/).
