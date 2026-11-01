---
title: "8. Templat peran dan perbaikan peran perusahaan"
description: "Peran dimiliki perusahaan. Setiap perusahaan mempunyai peran, nama, dan susunan hak akses sendiri, dan satu pengguna dapat memegang peran berbeda di tiap"
---

## 8.1 Cara kerja peran per perusahaan


Peran dimiliki perusahaan. Setiap perusahaan mempunyai peran, nama, dan susunan hak akses sendiri, dan satu pengguna dapat memegang peran berbeda di tiap perusahaan tempat ia menjadi anggota. Hak akses berasal dari satu katalog di kode. Perusahaan menyusun peran dari katalog itu dan tidak dapat membuat hak akses baru.

Operator mengerjakan dua hal:

- **Templat peran**: daftar peran awal yang disalin ke setiap perusahaan **baru** saat perusahaan dibuat (termasuk anak perusahaan). Templat bawaan adalah Admin, Manajer, NOC & Layanan Pelanggan, Teknisi, Gudang, Keuangan, Staf, dan Pelanggan. Mengubah templat tidak mengubah perusahaan yang sudah ada, dan deploy tidak menyinkronkan peran perusahaan.
- **Perbaikan peran perusahaan**: mengubah peran satu perusahaan di halaman tenant, misalnya bila admin perusahaan menghapus perannya sendiri atau tidak ada lagi admin. Tindakan ini tercatat di audit platform dan di audit perusahaan (support).

Admin perusahaan mengelola peran perusahaannya sendiri di menu **Peran** pada **Panduan Web Inbils [bagian 8.6](/docs/guides/platform/role-templates/)**. Operator tidak perlu ikut campur dalam keadaan biasa.


## 8.2 Membaca daftar templat


Peran yang dapat memakai: semua operator platform.

Klik **Templat peran** di sidebar. Halaman berjudul **Templat peran** dengan keterangan "Titik awal peran untuk perusahaan baru. Setiap perusahaan memiliki salinannya sendiri."

![Daftar Templat peran dengan jumlah hak akses dan tombol Ubah dan Hapus](~/assets/guide/web/platform-role-templates.webp)

Kartu **Templat** menulis "Perubahan templat hanya berlaku untuk perusahaan baru; peran perusahaan yang sudah ada tidak berubah. Templat Admin dan Pelanggan tidak dapat dihapus." dan memuat:

- kolom **Nama** (tautan ke form ubah, dengan baris "Kunci" di bawahnya), **Hak akses** (jumlah izin), dan **Aksi**;
- tombol **Ubah** pada semua templat;
- tombol **Hapus** pada semua templat kecuali Admin dan Pelanggan;
- tombol **Buat templat**.

Kunci templat tetap sama walau namanya diubah. Peran perusahaan yang berasal dari templat menyimpan kunci itu, sehingga perusahaan tetap dikenali sebagai salinan Admin walau perannya diganti nama menjadi "Pemilik".


## 8.3 Membuat templat


1. Klik **Buat templat**.
2. Isi **Nama**. Nama wajib, unik di antara templat, dan paling banyak 255 karakter. Nama harus memuat huruf atau angka. Inbils membuat kunci dari nama itu, dan kunci tidak dapat diubah kemudian.
3. Pilih hak akses dengan **Cari hak akses**, daftar kategori di kiri, dan kotak kategori untuk memilih atau mengosongkan semua izin yang tampil pada kategori itu.
4. Klik **Buat templat**.
5. Dialog **Konfirmasi perubahan templat** terbuka. Isi **Kata sandi operator** bila dialog memintanya, lalu klik **Buat templat**.

Toast menulis "Templat dibuat." Audit platform menyimpan kunci, nama, dan daftar hak akses. Peran dari templat baru muncul di perusahaan yang dibuat sesudahnya. Untuk perusahaan yang sudah ada, tambahkan dari templat ([bagian 8.6](/docs/guides/platform/role-templates/)).


## 8.4 Mengubah templat


Klik nama templat atau **Ubah**. Halaman berjudul "Ubah templat" diikuti nama templat, dengan subjudul "Kunci {kunci}. Perusahaan yang sudah ada tidak ikut berubah." Alert **Berlaku untuk perusahaan baru** mengulang aturan itu.

Ubah nama atau hak akses, klik **Simpan templat**, lalu konfirmasi dengan kata sandi operator bila dialog memintanya. Toast menulis "Templat diperbarui. Peran perusahaan yang sudah ada tidak berubah."

Templat Admin harus tetap memuat `roles.manage` dan `app.web`. Tanpa keduanya perusahaan baru tidak punya admin, dan form menolak dengan "Templat Admin harus tetap memuat roles.manage dan app.web, kalau tidak perusahaan baru tidak punya admin."

### Pemisahan tugas

Templat yang tidak memuat `roles.manage` tidak boleh menggabungkan hak persetujuan dengan hak pelaksanaan yang saling mengawasi. Form menolak kombinasi seperti:

- menyetujui atau menolak permintaan barang bersama menyiapkan, menyerahkan, menerima, mengeluarkan, atau memindahkan stok;
- menyetujui penyesuaian stok bersama mengajukan penyesuaian, menerima, mengeluarkan, atau memindahkan stok.

Pesan diawali "Pemisahan tugas (...)" dan menyebut izin yang berbenturan. Izin darurat `inventory.stock.adjust` hanya boleh dimuat templat yang juga memuat `roles.manage`; templat lain ditolak dengan "Hanya administrator yang boleh memberikan hak akses darurat inventory.stock.adjust." Daftar lengkap ada di **Panduan Web Inbils [bagian 10.1](/docs/guides/platform/platform-audit/)**. Aturan yang sama berlaku saat operator memperbaiki peran perusahaan.


## 8.5 Menghapus templat


1. Pada templat selain Admin dan Pelanggan, klik **Hapus**.
2. Dialog **Hapus templat {nama}?** menulis "Perusahaan baru tidak lagi mendapat peran ini. Peran yang sudah disalin ke perusahaan tidak berubah." Isi **Kata sandi operator** bila dialog memintanya.
3. Klik **Hapus templat**.

Toast menulis "Templat dihapus." Templat Admin dan Pelanggan tidak mempunyai tombol **Hapus**. Admin dipakai sebagai peran admin pertama, dan Pelanggan dipakai untuk akun pelanggan baru. Server menolaknya dengan "Templat ini dipakai saat perusahaan dibuat."


## 8.6 Memperbaiki peran sebuah perusahaan


Peran yang dapat memakai: semua operator platform.

Buka halaman tenant, lalu gulir ke kartu **Peran**, setelah kartu **Pengguna**. Keterangannya: "Setiap perusahaan mengelola perannya sendiri. Perbaikan oleh operator tercatat di audit perusahaan (support)."

![Kartu Peran pada halaman tenant dengan satu tabel per perusahaan](~/assets/guide/web/platform-company-roles.webp)

Kartu memuat satu bagian per perusahaan dalam tenant, perusahaan induk lebih dulu. Tiap bagian menulis nama perusahaan dan "Kode {kode}", lalu tabel dengan kolom **Nama**, **Templat**, **Hak akses**, **Pengguna**, dan **Aksi**. Kolom **Templat** menulis "Dari templat {nama templat}" untuk peran salinan, atau "Dibuat perusahaan" untuk peran buatan sendiri. Tabel kosong menulis "Belum ada peran".

**Tambah peran dari templat**

1. Pada bagian perusahaan yang dituju, pilih templat di **Templat untuk {kode}**.
2. Klik **Tambah dari templat**. Halaman **Tambah peran** terbuka dengan nama dan hak akses terisi dari templat.
3. Ubah isian bila perlu, lalu klik **Tambah peran**.
4. Dialog **Konfirmasi perbaikan peran** terbuka. Isi **Kata sandi operator** bila dialog memintanya, lalu klik **Tambah peran**.

Toast menulis "Peran dibuat." Cara ini juga dipakai untuk perusahaan lama yang kehilangan peran Admin-nya.

**Perbaiki peran**

1. Klik **Perbaiki** pada baris peran. Halaman berjudul "Perbaiki peran" diikuti nama peran, dengan nama dan kode perusahaan serta jumlah pengguna yang memegangnya.
2. Alert **Perbaikan oleh operator** menulis "Perbaikan oleh operator tercatat di audit perusahaan (support)." Ubah **Nama** (harus unik di perusahaan itu) dan hak akses.
3. Klik **Simpan peran**, lalu isi **Kata sandi operator** pada dialog **Konfirmasi perbaikan peran** bila dialog memintanya.

Toast menulis "Peran diperbarui." Perubahan langsung berlaku bagi pengguna perusahaan itu, dan hanya di perusahaan itu.

**Hapus peran**

1. Di halaman **Perbaiki peran**, gulir ke kartu **Hapus peran**.
2. Bila ada pengguna yang memegang peran, pilih peran pengganti di **Pindahkan {n} pengguna ke**. Pengguna yang belum memegang peran itu mendapatkannya.
3. Klik **Hapus peran**, lalu konfirmasi di dialog **Hapus peran {nama}?** dengan kata sandi operator bila dialog memintanya.

Toast menulis "Peran dihapus." Peran Pelanggan (dari templat `customer`) tidak dapat dihapus.

Penjaga yang berlaku sama seperti di web perusahaan:

- Perusahaan harus tetap punya minimal satu admin aktif yang memegang `roles.manage` dan `app.web`. Bila tidak, server menolak dengan "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage." Perusahaan yang sudah tanpa admin tetap dapat diperbaiki.
- Pemisahan tugas ([bagian 8.4](/docs/guides/platform/role-templates/)) berlaku pada hak akses peran dan pada peran yang tertumpuk di satu pengguna saat pengguna dipindahkan. Operator tidak mendapat pengecualian untuk tumpukan peran.
- Dua operator atau admin yang mengubah peran yang sama: yang menyimpan belakangan melihat peringatan dan tombol **Muat ulang**, "Muat ulang halaman untuk melihat data terbaru, lalu ulangi perubahan Anda."
- Halaman tenant hanya membuka peran perusahaan induk dan anak perusahaannya. Peran tenant lain ditolak seperti data yang tidak ada (404).

Operator tidak memegang peran perusahaan. Perbaikan hanya mengubah peran, bukan pengguna lain di luar perpindahan saat peran dihapus.

### Kesalahan umum

- "Nama templat sudah dipakai.": pakai nama lain, atau nama itu menghasilkan kunci yang sama dengan templat yang ada.
- "Nama templat harus memuat huruf atau angka.": nama hanya berisi simbol.
- "Nama peran sudah dipakai di perusahaan ini.": pilih nama lain; nama unik per perusahaan.
- "Pilih peran tujuan untuk memindahkan pengguna.": peran masih dipegang pengguna, pilih **Pindahkan ... pengguna ke**. "Pilih peran lain sebagai tujuan." muncul bila tujuan sama dengan peran yang dihapus.
- "Peran akun pelanggan tidak bisa menjadi tujuan.": pilih peran back-office sebagai pengganti.
- Alert **Templat belum dapat disimpan** atau **Peran belum dapat disimpan**: periksa nama dan kombinasi hak akses yang ditandai.
- Pengguna kehilangan akses setelah peran dihapus: berikan peran lain di menu **Pengguna** pada web perusahaan, atau pilih peran pengganti saat menghapus.
