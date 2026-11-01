---
title: "Tiket dan SLA"
description: "Cara Inbils menangani keluhan pelanggan dan masalah NOC sebagai tiket, dengan target SLA, peringatan pelanggaran, komentar, lampiran, penilaian pelanggan, dan SPK dari tiket."
---

Modul Ticketing adalah service desk sebuah ISP. Tiket mencatat keluhan atau gangguan, mengaitkannya dengan pelanggan, langganan, aset jaringan, dan lokasi yang terkait, melacak siapa yang menanganinya, mengukurnya terhadap SLA, dan bisa melahirkan SPK lapangan saat ada yang harus datang ke lokasi.

## Konsep utama

- **Sumber**: `customer`, `noc` (monitoring), atau `internal`. Tiket dengan sumber `customer` wajib menyebut pelanggan.
- **Kategori**: jenis gangguan. Kategori awal adalah `no_internet` (4 jam, urgent), `slow_connection` (8 jam, high), `packet_loss` (8 jam, high), `device_issue` (12 jam, medium), dan `fiber_issue` (12 jam, high). Masing-masing membawa SLA bawaan dalam jam kalender dan prioritas bawaan. Staf dengan `ticket.category.manage` bisa mengubahnya (jam, petunjuk pelanggan, aktif), tetapi tidak bisa menambah kategori baru.
- **Prioritas**: `low`, `medium`, `high`, `urgent`.
- **Kode**: tiket bernomor `TKT-{YEAR}-{NNNNN}`, aman dari balapan.
- **Tingkat SLA**: tingkat yang dijual bersama versi paket layanan, dengan target respons pertama dan target penyelesaian. Lihat [Tingkat SLA](/docs/guides/web/customers-and-services/sla-tiers/).
- **Komentar**: publik atau internal. Komentar internal hanya untuk staf.
- **Lampiran**: jpg, jpeg, png, atau pdf sampai 10 MB, dengan keterangan opsional.

## Siklus hidup tiket

| Dari | Ke | Pemicu | Efek |
|---|---|---|---|
| `open` | `assigned` | Menugaskan petugas | `assigned_to` diisi, entri audit, petugas diberi tahu. |
| `assigned` | `on_progress` | **Mulai** (mulai kerja) | Respons pertama dicatat (sumber `start`) bila masih kosong. |
| status terbuka mana pun | sama | Balasan publik pertama dari staf | Respons pertama dicatat (sumber `reply`). Catatan internal dan balasan pelanggan tidak dihitung. |
| `on_progress` | `resolved` | Selesaikan dengan catatan penyelesaian | `resolved_at` dan `resolution_note` diisi. |
| `resolved` | `assigned` atau `open` | Balasan pelanggan | Tiket dibuka kembali ke `assigned` bila masih punya petugas, selain itu `open`. Tenggat tidak dihitung ulang. |
| `resolved` atau `closed` | `assigned` atau `open` | Staf dengan `ticket.reopen` beserta alasan (5 sampai 500 karakter) | Sama seperti di atas, ditambah `closed_at` dikosongkan. Alasan dan pelaku masuk log audit. |
| `resolved` | `closed` | Tutup | `closed_at` diisi. Nama kategori dan petugas dibekukan. |

Tiket `closed` menolak komentar staf (422) dan balasan atau lampiran pelanggan (API 422 `ticket_closed`). Soft delete hanya berlaku untuk tiket `closed`, dan staf bisa memulihkan tiket yang dihapus dengan izin yang sama dengan hapus.

## SLA

Saat tiket dibuat, dua tenggat dihitung dari `created_at`: `response_deadline` (respons pertama) dan `sla_deadline` (penyelesaian).

1. Bila tiket punya langganan, target berasal dari tingkat SLA pada versi paket yang dipakai langganan itu.
2. Selain itu target berasal dari kategori tiket (`default_response_hours` dan `default_sla_hours`).
3. Prioritas `urgent` memotong kedua target menjadi setengah, dibulatkan ke atas.

Target dihitung dalam jam kalender (24 jam sehari), kecuali tingkat memakai kalender `business` dan perusahaan sudah mengisi `service_hours`. Dalam kasus itu hanya menit jam buka yang dihitung, menurut zona waktu perusahaan, dan tiket yang masuk di luar jam buka mulai dihitung saat buka berikutnya. Tenggat dihitung ulang hanya saat tiket dibuat atau saat prioritas tiket `open` diubah. Halaman tiket menulis dari mana target berasal, dan form tiket baru menampilkan pratinjaunya (`GET admin.tickets.sla-preview`).

Pelanggaran SLA adalah badge hasil hitungan (tenggat lewat dan tiket belum `resolved` atau `closed`), bukan sebuah status.

### Job pengecekan pelanggaran

`tickets:sla` berjalan tiap 15 menit (`withoutOverlapping(10)`) dan mengantrekan `CheckTicketSlaBreachesJob` untuk setiap perusahaan aktif. Job mengklaim penanda notifikasi di bawah kunci baris agar peringatan tidak terkirim ganda.

- Peringatan dikirim sampai 30 menit sebelum tenggat respons: ke petugas tiket `assigned`, atau ke pemegang `ticket.assign` untuk tiket `open`.
- Pelanggaran target respons atau penyelesaian memberi tahu petugas dan pemegang `ticket.assign`, tanpa duplikat. Pembuat tiket tidak diberi tahu hanya karena membuat tiket.
- Peringatan SLA memakai lonceng dan push di aplikasi. Tidak ada email SLA.

## Yang dikerjakan staf

Staf bekerja di menu **Tiket**, lihat panduan pengguna tentang [tiket](/docs/guides/web/operations/tickets/) dan alurnya di [Tiket sampai SPK](/docs/guides/web/workflows/ticket-to-work-order/).

- **Antrean**: filter tanpa petugas, hampir jatuh tempo (dalam 30 menit), menunggu balasan staf, dan "Tiket saya". Ekspor berupa CSV atau PDF dengan filter yang sama.
- **Penugasan**: **Tugaskan tiket** menampilkan beban kerja aktif setiap kandidat dan menandai yang paling sedikit pekerjaannya. **Tugaskan ke saya** menugaskan diri sendiri untuk tiket tanpa petugas; bila orang lain lebih cepat, jawabannya 409.
- **Spawn SPK**: untuk tiket yang butuh kerja lapangan, `TicketService::spawnSpk` membuat SPK `maintenance` dengan `source=ticket`, terisi otomatis dengan pelanggan, langganan, dan lokasi, lalu mengisi `spawned_spk_id` pada tiket. SPK baru berstatus `generated`, menunggu teknisi ditugaskan. Lihat [SPK](/docs/modules/work-orders/).
- **Jarak check-in**: saat teknisi memulai tiket atau SPK jauh dari lokasi pelanggan (batas bawaan `checkin_max_distance_m` 500 m, diatur di pengaturan perusahaan), alasan wajib ditulis.
- **Laporan**: tiket yang selesai mengisi [Kepatuhan SLA](/docs/guides/web/finance-and-reports/sla-compliance/) dan kinerja teknisi, lihat [Pelaporan](/docs/modules/reporting/).

## Penilaian pelanggan

Pelanggan menjawab "Masalah sudah beres?" di aplikasi dengan nilai 1 sampai 5 dan komentar opsional (`POST /api/v1/customer/tickets/{ticket}/confirmation`, izin `evaluation.customer.submit`, mendukung `Idempotency-Key`). Tiket `resolved` ditutup oleh jawaban itu. Tiket `closed` yang belum dinilai hanya menerima penilaian. Satu tiket dinilai satu kali, penilaian bertahan saat tiket dibuka kembali, dan penilaian kosong tidak dihitung sebagai nol. Laporan Kepatuhan SLA menghitung kepuasan pelanggan (CSAT) dari nilai ini.

## Aplikasi dan API

- **Aplikasi pelanggan** (`api/v1/customer/tickets`): membuat tiket, melihat daftar dan isinya, membalas (balasan pada tiket `resolved` membukanya kembali), melampirkan berkas, dan mengonfirmasi. Respons menambah `can_reply`, `reopened_at`, `rating`, `can_confirm`, dan `can_rate`. Panduan pelanggan ada di [Bantuan dan tiket](/docs/guides/customer/help-and-tickets/).
- **Aplikasi teknisi**: teknisi melihat tiket yang ditugaskan kepadanya di "pekerjaan saya", dengan `response_due_at` untuk hitung mundur, lalu memulai, menyelesaikan, berkomentar, dan melampirkan. Lihat [panduan teknisi](/docs/guides/technician/tickets/).
- **Back office web**: `/admin/tickets` dan turunannya, termasuk `assign`, `assign-self`, `start`, `resolve`, `close`, `reopen`, `comments`, `attachments`, `spawn-spk`, `export`, dan `ticket-categories`.

## Notifikasi

Lonceng dan push di aplikasi memberi tahu petugas dan dispatcher tentang penugasan, pembukaan kembali, dan event SLA. Pesan WhatsApp dikirim ke pelanggan tiket, hanya bila pelanggan sudah setuju dan perusahaan mengaktifkan eventnya:

| Event | Pemicu |
|---|---|
| `ticket_created` | Tiket dibuat dengan pelanggan. |
| `ticket_assigned` | Hanya penugasan pertama. |
| `ticket_resolved` | Tiket diselesaikan. |

## Izin

| Kunci | Mengizinkan |
|---|---|
| `ticket.view` | Melihat tiket (teknisi melihat miliknya sendiri). |
| `ticket.create` | Membuat tiket. |
| `ticket.update` | Mengubah tiket yang terbuka. |
| `ticket.delete` | Menghapus dan memulihkan tiket tertutup. |
| `ticket.assign` | Menugaskan petugas; menerima peringatan SLA. |
| `ticket.reassign` | Mengganti petugas. |
| `ticket.start` | Memulai pekerjaan. |
| `ticket.resolve` | Menyelesaikan tiket. |
| `ticket.close` | Menutup tiket yang sudah selesai. |
| `ticket.reopen` | Membuka kembali tiket selesai atau tertutup dengan alasan. |
| `ticket.comment.create` | Menulis komentar publik. |
| `ticket.comment.internal` | Menulis komentar khusus staf. |
| `ticket.attachment.upload` | Mengunggah lampiran. |
| `ticket.attachment.view` | Membuka lampiran. |
| `ticket.spawn_spk` | Membuat SPK dari tiket. |
| `ticket.export` | Mengekspor daftar tiket. |
| `ticket.manage` | Cadangan: tidak diperiksa oleh aksi mana pun. |
| `ticket.category.manage` | Mengelola kategori tiket. |

## Invarian

- Tiket hanya berpindah mengikuti siklus hidup di atas. Resolve butuh tiket yang sedang dikerjakan (`on_progress`), dan close butuh tiket yang sudah selesai.
- Data pelanggan tidak pernah dibuka lebih dari id, kode, dan nama bagi pengguna tanpa `customer.view`.
- Penutupan membekukan nama kategori dan petugas, sehingga penggantian nama kemudian tidak menulis ulang riwayat. Pembukaan kembali mengosongkannya lagi.
- Isolasi tenant berlaku untuk setiap tiket, komentar, dan lampiran.

Lihat juga [Katalog layanan](/docs/modules/service-catalogue/) untuk tingkat SLA dan [Queue dan scheduler](/docs/operations/queues-and-scheduler/).
