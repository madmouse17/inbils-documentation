---
title: "7. Akses dukungan"
description: "Akses dukungan membuka web tenant persis seperti pengguna target. Kebijakan dan izin tetap milik pengguna itu."
---

## 7.1 Memulai akses sebagai pengguna


Peran yang dapat memakai: semua operator platform. Target harus pengguna aktif dalam tenant aktif.

Akses dukungan membuka web tenant persis seperti pengguna target. Kebijakan dan izin tetap milik pengguna itu.

1. Buka halaman tenant, lalu bagian **Pengguna**.
2. Klik **Masuk sebagai** pada pengguna yang akan dibantu.
3. Dialog **Masuk sebagai {nama}?** terbuka. Isi **Alasan**, 5 sampai 200 karakter.
4. Isi **Kata sandi operator** bila dialog memintanya.
5. Klik **Mulai akses dukungan**.

![Dialog Masuk sebagai pengguna dengan alasan dan kata sandi operator](~/assets/guide/web/platform-support-dialog.webp)

Inbils membuka dasbor tenant dan memulai sesi dalam mode baca. Login diam-diam ini tidak mengubah **Masuk terakhir** atau token **Ingat saya** milik target.


## 7.2 Membaca banner dan batas waktu


Banner **Akses dukungan** tampil di atas semua halaman tenant:

"Anda masuk sebagai {pengguna} ({perusahaan}) · superadmin {operator} · mode Baca · sisa mm:ss"

![Dasbor tenant dengan banner Akses dukungan dalam mode Baca](~/assets/guide/web/platform-support-banner.webp)

Sesi berlaku paling lama 30 menit sejak dimulai dan tidak dapat diperpanjang. Hitung mundur browser hanya indikator. Server memeriksa waktu pada setiap request. Sesi juga berakhir bila:

- operator klik **Keluar** pada banner;
- target logout dari web;
- sesi platform berakhir;
- akun operator atau target dinonaktifkan;
- tenant ditangguhkan;
- target tidak lagi mempunyai perusahaan aktif dalam tenant.

Bila batas 30 menit habis dan sesi platform masih aktif, Inbils kembali ke halaman tenant pada panel operator.


## 7.3 Mode baca dan mode ubah


Mode awal adalah **Baca**. GET dan HEAD tetap berjalan. Perpindahan perusahaan dalam induk dan anak perusahaan tenant yang sama tetap boleh. Setiap perubahan lain ditolak dengan:

"Mode baca saja: perubahan tidak diizinkan selama akses dukungan. Aktifkan mode ubah dari banner untuk melanjutkan."

Untuk mengubah data:

1. Klik **Mode ubah** pada banner.
2. Dialog **Aktifkan mode ubah** menjelaskan bahwa perubahan memengaruhi data nyata dan tercatat di audit.
3. Isi **Ketik {kode} untuk melanjutkan** dengan kode perusahaan induk.

   ![Dialog Aktifkan mode ubah pada banner Akses dukungan](~/assets/guide/web/platform-support-write-dialog.webp)

4. Klik **Aktifkan mode ubah**.
5. Bila konfirmasi kata sandi platform sudah lewat 5 menit, Inbils membuka **Konfirmasi kata sandi**. Setelah berhasil, Inbils kembali ke halaman tenant. Klik **Mode ubah** dan ketik kode lagi.
6. Banner berubah menjadi **mode Ubah**. Klik **Mode baca** untuk kembali ke mode aman.

Setiap request perubahan pada mode Ubah mencatat rute, metode HTTP, path, dan status respons sebagai **Data diubah saat akses dukungan**.


## 7.4 Tindakan yang tetap dilarang


Mode Ubah tidak melewati izin target. Bila target tidak berhak mengubah sesuatu, operator juga tidak berhak.

Tindakan berikut selalu ditolak dalam mode Baca maupun Ubah:

- profil, email, kata sandi, 2FA, dan verifikasi akun target;
- melihat rahasia akun jaringan pelanggan;
- mengubah, menghapus, atau mereset 2FA pengguna target dari menu **Pengguna**;
- membuat atau mengubah pengguna sambil menetapkan kata sandi login;
- berpindah ke perusahaan di luar tenant;

Penolakan pengaturan pribadi menulis "Pengaturan akun pribadi tidak tersedia selama akses dukungan." Perpindahan keluar tenant menulis "Perpindahan ke perusahaan di luar tenant tidak diizinkan selama akses dukungan."


## 7.5 Audit dan visibilitas perusahaan


Satu sesi memakai satu kode kelompok (`batch_uuid`). Audit platform mencatat:

- **Akses dukungan dimulai**;
- **Mode akses dukungan diubah**;
- **Data diubah saat akses dukungan** untuk setiap perubahan;
- **Akses dukungan berakhir**, alasan berakhir, dan durasi.

Tenant melihat baris modul **Akses dukungan** di **Log Audit**. Nama dan email operator tidak ditampilkan. Deskripsi memakai kalimat seperti:

- "Tim dukungan Inbils masuk sebagai Budi Santoso";
- "Tim dukungan Inbils mengubah mode akses saat masuk sebagai Budi Santoso";
- "Tim dukungan Inbils mengubah data saat masuk sebagai Budi Santoso";
- "Tim dukungan Inbils keluar dari akun Budi Santoso".

Lihat **Panduan Web Inbils [bagian 7.12](/docs/guides/platform/support-access/)** untuk tampilan tenant.

### Kesalahan umum

- **Masuk sebagai** tidak tampil: target atau tenant nonaktif, atau target tidak mempunyai perusahaan aktif dalam tenant.
- "Akhiri sesi pengguna yang sedang aktif sebelum memulai akses dukungan.": browser mempunyai login web biasa atau sesi dukungan lain. Keluar dari sesi itu, lalu ulangi.
- "Perusahaan sedang ditangguhkan.": aktifkan kembali tenant bila dukungan masih diperlukan.
- "Pengguna tidak aktif.": aktifkan pengguna dari web tenant dengan akun yang berwenang, bukan melalui operator.
- "Kode perusahaan yang diketik tidak sesuai.": pakai kode induk yang tampil pada halaman tenant.
- Banner habis dan halaman kembali ke panel: batas 30 menit tercapai. Mulai sesi baru dengan alasan baru bila masih perlu.
