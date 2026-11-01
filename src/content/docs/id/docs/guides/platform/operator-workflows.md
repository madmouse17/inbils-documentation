---
title: "12. Alur kerja operator"
description: ""
---

## 12.1 Perusahaan baru sampai admin pertama masuk


1. Operator membuka **Perusahaan baru** dan memilih **Katalog awal** atau **Kosong** ([bagian 4.1](/docs/guides/platform/create-a-company/) sampai 4.2).
2. Operator mengisi admin pertama, lalu klik **Buat perusahaan**.
3. Inbils membuat perusahaan, menyalin templat peran, membuat akun admin, penomoran, pengaturan dasar, dan katalog.
4. Mailer platform mengirim undangan. Bila **Isi data contoh** dicentang, worker `platform` mengisi data demo.
5. Operator membuka halaman tenant dan memantau **Masuk terakhir**, **Audit terbaru**, serta **Job gagal**.
6. Admin membuka tombol **Atur kata sandi** dari email dalam 60 menit.
7. Bila tautan kedaluwarsa atau email gagal, operator memakai **Kirim ulang undangan**.
8. Setelah admin berhasil masuk, kolom **Masuk terakhir** menampilkan waktunya.
9. Admin mengisi profil, integrasi, pengguna, dan data operasional melalui web perusahaan.


## 12.2 Pengguna tidak dapat masuk


1. Operator mencari tenant di Dasbor dan membuka bagian **Pengguna**.
2. Periksa **Status**, lencana **Terkunci**, **2FA**, dan **Masuk terakhir**.
3. Bila terkunci karena percobaan salah, pakai **Buka kunci masuk**.
4. Bila pengguna kehilangan autentikator dan kode pemulihan, pakai **Atur ulang 2FA**.
5. Bila admin belum pernah masuk dan undangan tidak aktif, pakai **Kirim ulang undangan**.
6. Bila masalah hanya dapat direproduksi pada layar pengguna, mulai **Akses dukungan** dengan alasan yang jelas.
7. Periksa masalah dalam mode baca. Aktifkan **Mode ubah** hanya bila perubahan diperlukan dan sudah disetujui.
8. Klik **Keluar** segera setelah pemeriksaan selesai.
9. Baca **Audit platform** dan minta perusahaan memeriksa **Log Audit** bila perlu bukti tindakan.


## 12.3 Menutup layanan satu tenant


1. Pastikan pemilik tenant memahami dampak penangguhan dan penghapusan.
2. Operator klik **Tangguhkan**, isi alasan, kode, dan kata sandi.
3. Operator meminta ekspor baru setelah waktu penangguhan.
4. Tim server memastikan worker platform menyelesaikan ekspor. Serahkan arsip kepada pihak yang berhak sebelum masa unduh 24 jam habis.
5. Tunggu sampai 30 hari sejak penangguhan terakhir.
6. Operator klik **Ajukan hapus** setelah daftar syarat kosong.
7. Tim server memeriksa keanggotaan pengguna tenant di perusahaan di luar tenant dan mencabutnya dengan `inbils:company:revoke-membership` ([bagian 11.1](/docs/guides/platform/console-tasks-and-queues/)); penghapusan ditolak selama keanggotaan itu ada.
8. Tim server mengambil backup dan memeriksa tanggalnya.
9. Tim server jalankan `inbils:platform:purge-company {kode}`, baca rencana, lalu ketik ulang kode.
10. Bila ada sisa berkas, hapus `disk:path` yang dicantumkan terminal.
11. Periksa **Audit platform**. Baris lama harus tetap menampilkan nama dan kode tenant tanpa tautan.


## 12.4 Menanggapi permintaan anak perusahaan


1. Operator menerima email **Permintaan anak perusahaan dari {nama perusahaan}**, atau melihat kartu **Permintaan anak perusahaan** di **Dasbor**.
2. Baca nama yang diminta, kode usulan, catatan, dan pemohon.
3. Bila permintaan wajar, klik **Buat anak perusahaan**. Periksa **Nama** dan **Kode** (kode harus unik), pilih **Akses admin**, lalu klik **Buat anak perusahaan**. Permintaan ditutup. Beri tahu admin perusahaan, karena Inbils tidak mengirim email ke pemohon saat anak perusahaan dibuat.
4. Bila permintaan tidak bisa dipenuhi, klik **Tolak**, tulis alasan yang jelas, lalu klik **Tolak permintaan**. Inbils mengirim alasan itu ke pemohon.
5. Bila tenant sedang ditangguhkan, aktifkan kembali lebih dulu untuk membuat anak perusahaan. Menolak tetap bisa.
6. Baca **Audit platform** bila perlu bukti: **Anak perusahaan diminta**, **Anak perusahaan dibuat**, dan **Permintaan anak perusahaan {nama} dibuat** atau **ditolak**.
