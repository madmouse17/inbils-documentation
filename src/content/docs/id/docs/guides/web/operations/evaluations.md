---
title: "3.5 Evaluasi"
description: "Evaluasi mencatat nilai kinerja seorang karyawan untuk satu tiket atau satu SPK."
---

Evaluasi mencatat nilai kinerja seorang karyawan untuk satu tiket atau satu SPK. Rata-rata skor dan rating pelanggan dari evaluasi dibaca laporan Kinerja Teknisi ([bagian 7.9](/docs/guides/web/finance-and-reports/technician-performance/)). Buat evaluasi setelah tiket diselesaikan atau SPK disetujui, supaya angka waktunya terisi.

Peran yang dapat memakai: admin, manajer, dan staf pada peran bawaan. Izin: `evaluation.view` melihat semua evaluasi perusahaan, `evaluation.create` membuat, `evaluation.update` mengubah. Peran teknisi memegang `evaluation.view.own` dan hanya melihat evaluasi atas dirinya, tetapi teknisi bekerja di aplikasi. Menu tampil bagi pemegang `evaluation.view` atau `evaluation.view.own`. Izin `evaluation.delete` dan `evaluation.export` ada, tetapi layar Evaluasi tidak punya tombol **Hapus** maupun **Ekspor**.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Operasional**, lalu klik **Evaluasi**.

   ![Halaman Evaluasi dengan tombol Buat evaluasi, kotak Cari, filter Karyawan dan Jenis referensi, serta tabel kosong](~/assets/guide/web/evaluations.webp)

2. Tombol **Buat evaluasi** di kanan atas tampil bagi pemegang `evaluation.create`.
3. Isi filter. Daftar langsung menyesuaikan diri sesaat setelah Anda mengetik atau memilih, tanpa tombol filter:
   - Isian **Cari** mencari nama karyawan (isian bertuliskan "Nama karyawan").
   - Isian **Karyawan** memilih satu karyawan: ketik nama atau email (minimal 2 huruf), lalu pilih. Daftar memuat anggota aktif perusahaan yang memegang izin **Dapat dinilai di Evaluasi** (`evaluation.evaluable`), paling banyak 20 hasil. Pengguna tanpa `evaluation.view` hanya mendapat dirinya sendiri di daftar ini. Klik **Hapus pilihan** untuk mencabut filter ini.
   - Pilihan **Jenis referensi** berisi **Semua jenis**, **SPK**, dan **Tiket**. Filter **Status** berisi **Semua status**, **Dihapus**, dan **Semua, termasuk dihapus**.
4. Baca tabel. Kolom: **Karyawan**, **Referensi**, **Nilai**, **Penilaian pelanggan**, **Penilai**, **Tanggal**, dan **Aksi**. Kolom **Referensi** memuat lencana jenis (**SPK** atau **Tiket**) dan kode tiket atau SPK-nya. Bila tiket atau SPK itu sudah tidak ada, kolom menulis `#` dan nomor id internalnya. Kolom **Tanggal** memuat tanggal dan jam dalam format tanggal perusahaan. Kolom **Referensi**, **Nilai**, dan **Tanggal** bisa diurutkan. Setiap baris hanya punya tombol **Lihat**, kecuali evaluasi yang dihapus: barisnya tidak punya tombol dan menu **Aksi lainnya** berisi **Pulihkan** (izin `evaluation.delete`, toast "Evaluasi dipulihkan.").
5. Daftar memuat 10 evaluasi per halaman, terbaru di atas. Bila ada lebih dari satu halaman, di bawah tabel tampil "Menampilkan" rentang baris dan jumlah total, tombol **Sebelumnya** dan **Berikutnya**, serta "Halaman" nomor dan jumlah halaman.

Daftar yang kosong menulis **Belum ada evaluasi** dengan tombol **Buat evaluasi**. Bila filter tidak menemukan apa pun, daftar menulis **Tidak ada evaluasi yang cocok** dengan tombol **Reset filter**.

## Membuat evaluasi

1. Klik **Buat evaluasi**. Halaman **Buat Evaluasi** terbuka.

   ![Form Buat Evaluasi dengan kartu Data evaluasi: isian Karyawan, Jenis referensi, Tiket, Nilai (1,0 sampai 5,0), Penilaian pelanggan (opsional), dan Komentar](~/assets/guide/web/evaluations-create.webp)

2. Isi kartu **Data evaluasi**. Bila Anda datang dari tombol **Evaluasi teknisi** di tiket **Ditutup**, **Karyawan**, **Jenis referensi** (**Tiket**) dan **Tiket** sudah terisi, dan **Penilaian pelanggan** ikut terisi bila pelanggan sudah menilai tiket itu di aplikasi. Hanya **Nilai** yang perlu Anda pilih:
   - **Karyawan**: wajib. Ketik nama atau email karyawan (minimal 2 huruf), lalu pilih. Daftar memuat anggota aktif perusahaan yang sedang aktif dan memegang izin **Dapat dinilai di Evaluasi** (`evaluation.evaluable`), paling banyak 20 hasil. Bila tidak ada yang cocok, daftar menulis "Tidak ada karyawan yang cocok."
   - **Jenis referensi**: wajib. Pilih **Tiket** (nilai awal) atau **SPK**. Mengganti jenis mengosongkan pilihan referensi.
   - **Tiket** atau **SPK** (nama isian mengikuti jenis referensi): wajib. Ketik kode atau judul (minimal 2 huruf), lalu pilih. Isian tiket memuat tiket berstatus **Diselesaikan** atau **Ditutup** yang sudah punya petugas. Isian SPK memuat SPK berstatus **Selesai** yang sudah punya teknisi. Keduanya terbatas pada perusahaan yang sedang aktif, paling banyak 20 hasil. Tidak ada lagi isian ID yang diketik.
   - **Nilai (1,0 sampai 5,0)**: wajib. Angka 1,0 sampai 5,0 dengan langkah 0,1. Isian ini selalu kosong saat form dibuka, karena nilai adalah penilaian Anda. Menyimpan dengan nilai kosong menampilkan "Pilih nilai 1 sampai 5.".
   - **Penilaian pelanggan (opsional)**: opsional. Angka 1,0 sampai 5,0 dengan langkah 0,1. Dari tombol **Evaluasi teknisi** pada tiket yang sudah dinilai pelanggan di aplikasi, isian ini sudah berisi nilai itu dan boleh Anda ubah. Selain itu, isi bila Anda mencatat rating dari pelanggan.
   - **Komentar**: opsional, maksimal 1000 karakter.
3. Klik **Simpan**. Daftar terbuka dan toast "Evaluasi berhasil dibuat." muncul. Klik **Batal** atau **Kembali** untuk kembali tanpa menyimpan.

Inbils mengisi sendiri **Penilai** (akun Anda) dan waktu evaluasi. Inbils juga menyalin waktu dari tiket atau SPK saat Anda menyimpan, dan tidak memperbaruinya lagi:

- Untuk tiket, **Respons pertama** adalah menit dari tiket dibuat sampai petugas memulai tiket, dan **Penyelesaian** adalah menit dari tiket dibuat sampai diselesaikan. Keduanya kosong bila kejadiannya belum ada.
- Untuk SPK, **Penyelesaian** adalah menit dari SPK mulai dikerjakan sampai disetujui. **Respons pertama** tidak diisi.

## Melihat dan mengubah evaluasi

1. Di daftar, klik **Lihat**. Halaman detail berjudul "Evaluasi" diikuti nama karyawan, dengan jenis, kode referensi, dan tanggal di bawahnya. Halaman memuat kartu **Hasil penilaian** (**Karyawan**, **Penilai**, **Nilai**, **Penilaian pelanggan**, **Respons pertama**, **Penyelesaian**, dan **Komentar**) dan kartu **Referensi** (**Jenis**, **Kode**, **Judul**, dan **Tanggal evaluasi**). Waktu tampil dalam menit, misalnya "90 menit". Nilai kosong tampil sebagai tanda hubung (-).
2. Klik **Ubah** untuk mengubah. Halaman **Ubah Evaluasi** menampilkan nama karyawan dan hanya menawarkan **Nilai (1,0 sampai 5,0)**, **Penilaian pelanggan (opsional)**, dan **Komentar**, dengan aturan yang sama seperti saat membuat. Karyawan dan referensi tidak bisa diubah.
3. Klik **Simpan**. Daftar terbuka dan toast "Evaluasi berhasil diubah." muncul. Klik **Batal** atau **Kembali** untuk kembali ke halaman detail.

Tombol **Ubah** tampil bagi semua orang yang bisa membuka halaman detail. Halaman **Ubah Evaluasi** terbuka bagi pemegang `evaluation.update` atau penilai evaluasi itu, tetapi menyimpan perubahan butuh `evaluation.update`. Tanpa izin itu, server menolak dengan halaman **Akses ditolak**.

## Kesalahan umum

- Pesan "referensi yang dipilih tidak valid untuk perusahaan ini." di bawah isian tiket atau SPK: tiket atau SPK itu milik perusahaan lain. Pastikan perusahaan aktif Anda benar ([bagian 1.6](/docs/guides/web/introduction/switch-company/)), lalu pilih ulang dari daftar.
- Pesan "karyawan yang dipilih tidak valid." di bawah **Karyawan**: karyawan itu bukan anggota aktif dari perusahaan yang sedang aktif. Pindah ke perusahaan yang tepat atau pilih karyawan lain. Pesan "karyawan yang dipilih harus berupa pengguna aktif dengan hak akses yang sesuai." berarti karyawan itu tidak memegang izin **Dapat dinilai di Evaluasi**.
- "karyawan wajib diisi.", "referensi wajib diisi.", atau "nilai wajib diisi.": pilih karyawan dan referensi, lalu isi nilai.
- Pesan "nilai harus bernilai antara 1.0 dan 5.0." (untuk **Penilaian pelanggan**: "penilaian pelanggan harus bernilai antara 1.0 dan 5.0."): isi angka 1,0 sampai 5,0.
- Pesan "komentar tidak boleh lebih dari 1000 karakter.": persingkat komentar.
- Evaluasi kedua oleh penilai yang sama untuk tiket atau SPK yang sama ditolak basis data, karena satu penilai hanya boleh punya satu evaluasi per referensi. Layar tidak menangkap penolakan ini sebagai pesan isian, jadi yang tampil adalah halaman **Terjadi kesalahan di server**. Perbaiki evaluasi yang ada lewat **Ubah**.
- **Respons pertama** atau **Penyelesaian** kosong: tiket belum dimulai atau diselesaikan, atau SPK belum disetujui, saat evaluasi dibuat. **Ubah** tidak mengisinya ulang, jadi buat evaluasi setelah pekerjaan selesai.
- Evaluasi lama tidak terlihat di halaman pertama: daftar memuat 10 baris per halaman. Pakai **Sebelumnya** dan **Berikutnya**, atau persempit dengan **Cari**, **Karyawan**, dan **Jenis referensi**.
- Di **Ubah Evaluasi**, **Nilai** atau **Penilaian pelanggan** di luar 1 sampai 5 ditolak lebih dulu oleh gelembung browser berbahasa Indonesia, misalnya "Nilai paling kecil 1." atau "Nilai paling besar 5." **Buat Evaluasi** memeriksa sendiri dan menulis pesan merah di bawah isian.
