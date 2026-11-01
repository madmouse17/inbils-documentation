---
title: "2.2 Notifikasi"
description: "Notifikasi adalah pemberitahuan yang ditujukan ke akun Anda, misalnya tiket yang ditugaskan kepada Anda, tiket yang melewati batas SLA (\"SLA tiket"
---

Notifikasi adalah pemberitahuan yang ditujukan ke akun Anda, misalnya tiket yang ditugaskan kepada Anda, tiket yang melewati batas SLA ("SLA tiket terlampaui"), tiket yang dibuka kembali, dokumen pelanggan yang akan habis, permintaan barang yang siap diambil, atau kegagalan penjadwalan tagihan ("Jadwal penagihan gagal"). Notifikasi tampil di tiga tempat: panel di dasbor, angka di lonceng bilah atas, dan halaman **Notifikasi**. Beberapa teks memuat rincian supaya Anda tidak perlu membuka halamannya:

- Tiket ditugaskan: judulnya memuat kode dan prioritas tiket, misalnya "Tiket {kode} · Tinggi", dan pesannya memuat judul tiket dan batas respons, misalnya "{judul}. Respons sebelum 21.17." Jam ditulis "21.17" untuk hari ini, "08.30 besok" untuk besok, dan tanggal disusul jam untuk hari yang lebih jauh. Tiket tanpa target respons tidak memuat kalimat "Respons sebelum".
- Tiket dibuka kembali oleh staf: "Tiket {kode} dibuka kembali", dengan pesan "Oleh {nama}: {alasan}". Petugas tiket yang menerimanya, atau pemegang `ticket.assign` bila tiket tidak punya petugas aktif. Orang yang membuka kembali tiket tidak menerimanya.
- Dokumen pelanggan akan habis: "Dokumen {jenis} {nama pelanggan} segera habis", dengan pesan "Berlaku sampai {tanggal}." Pemegang `customer.update` menerimanya sekali per dokumen, saat dokumen itu masuk 30 hari terakhir masa berlakunya. Sistem memeriksanya setiap hari.

Notifikasi lama yang dibuat sebelum teks ini ada tetap memakai kalimat umum, misalnya "Tiket ditugaskan". Notifikasi untuk pelanggan (tagihan, tiket selesai, tiket dibuka kembali) tampil di aplikasi pelanggan, bukan di halaman ini.

Peran yang dapat memakai: semua pengguna web, untuk notifikasi miliknya sendiri.

1. Lihat panel **Notifikasi** di kanan dasbor (di layar sempit, di bawah kartu). Panel menampilkan lima notifikasi terbaru, dengan lencana jumlah yang belum dibaca bila ada. Bila belum ada notifikasi, panel menulis "Belum ada notifikasi." Klik **Lihat semua notifikasi** di dasar panel.
2. Atau klik ikon lonceng di bilah atas. Lonceng langsung membuka halaman **Notifikasi**. Angka merah pada lonceng adalah jumlah yang belum dibaca.

   ![Halaman Notifikasi dengan judul, tombol Tandai semua dibaca, dan daftar notifikasi](~/assets/guide/web/notifications.webp)

3. Baca daftar. Setiap notifikasi memuat judul, pesan, dan waktu. Notifikasi yang belum dibaca berjudul tebal dan berlatar tipis. Daftar menampilkan 20 notifikasi per halaman.
4. Klik **Lihat detail** untuk membuka halaman yang dimaksud notifikasi: tiket, SPK, tagihan, atau pelanggan. Notifikasi yang belum dibaca otomatis ditandai sudah dibaca.
5. Klik **Tandai dibaca** pada satu notifikasi untuk menandainya tanpa membuka halamannya.
6. Klik **Tandai semua dibaca** di kanan atas untuk menandai semuanya. Tombol ini nonaktif bila tidak ada yang belum dibaca.
7. Bila daftar panjang, pakai **Sebelumnya** dan **Berikutnya** di bawah daftar.

## Kesalahan umum

- Lonceng tanpa angka hanya berarti tidak ada yang belum dibaca. Notifikasi lama tetap ada di halaman **Notifikasi**. Layar ini tidak menyediakan tombol hapus.
- Tombol **Lihat detail** hanya ada pada notifikasi yang punya halaman tujuan: tiket, SPK yang menunggu review, tagihan draf, ringkasan isolir otomatis (membuka **Tunggakan**), dan dokumen pelanggan yang akan habis (membuka halaman pelanggan). Tombol itu tampil bila datanya ada di perusahaan aktif dan boleh Anda buka. Notifikasi lain, atau notifikasi dari perusahaan lain ([bagian 1.6](/docs/guides/web/introduction/switch-company/)), tidak punya tombol itu.
- Notifikasi hanya untuk akun Anda. Admin tidak melihat notifikasi pengguna lain.
