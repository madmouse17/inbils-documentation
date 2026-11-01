---
title: "4.5 Tingkat SLA"
description: "Tingkat SLA mencatat target layanan sebuah paket: batas waktu respons dan batas waktu penyelesaian tiket."
---

Tingkat SLA mencatat target layanan sebuah paket: batas waktu respons dan batas waktu penyelesaian tiket. Target ini dipakai saat tiket dari langganan paket itu dibuat. Hasilnya tidak diisi manual: sistem mengukurnya dari tiket. Buka menu ini saat Anda menambah tingkat layanan baru, misalnya untuk paket bisnis.

Peran yang dapat memakai: sama dengan [bagian 4.2](/docs/guides/web/customers-and-services/service-packages/). Izin: `service.view` atau `service.manage` membuka menu, `service.create`, `service.update`, `service.delete` dan `service.export` untuk aksi masing-masing.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Pelanggan & Layanan**, lalu klik **Tingkat SLA**.
2. Baca daftar. Kolomnya **Nama**, **Target respons (jam)**, **Target penyelesaian (jam)**, **Hitungan tenggat** (**24 jam** atau **Jam layanan**), **Respons tepat waktu (30 hari)**, **Penyelesaian tepat waktu (30 hari)**, **Tiket (30 hari)**, **Dibuat**, **Status** dan **Aksi**. Kotak **Cari** (isian "Nama tingkat") mencari nama tingkat. Tiga kolom 30 hari tidak bisa diurutkan dan dihitung dari tiket yang dibuat dalam 30 hari terakhir pada langganan yang versi paketnya memakai tingkat itu. Kolom persen memakai koma desimal dengan paling banyak satu angka di belakangnya (misalnya `83,3%`) dan bernilai `-` bila belum ada tiket yang bisa dinilai. Nama tingkat dan tombol **Ubah** membuka form ubah, dan menu **Aksi lainnya** berisi **Nonaktifkan** atau **Aktifkan**, dan **Hapus permanen** bila tingkat belum pernah dipakai. Tombol **Ekspor** (pemegang `service.export`) menghasilkan CSV atau PDF (judul PDF **Tingkat SLA**) dengan kolom Nama, Target respons (jam), Target penyelesaian (jam), Hitungan tenggat (**24 jam** atau **Jam layanan**) dan Status (**Aktif** atau **Nonaktif**).

   ![Daftar Tingkat SLA dengan kolom Nama, Target respons (jam), Target penyelesaian (jam), Hitungan tenggat, Respons tepat waktu (30 hari), Penyelesaian tepat waktu (30 hari), Tiket (30 hari), Dibuat dan Aksi](~/assets/guide/web/sla-tiers.webp)

## Membuat tingkat SLA

1. Klik **Buat Tingkat SLA**. Halaman terbuka dengan judul **Buat Tingkat SLA** dan kartu **Target layanan**.
2. Isi form:
   - **Nama**: wajib, maksimal 255 karakter, unik per perusahaan. Contoh: `Silver`.
   - **Target respons (jam)**: wajib, bilangan bulat 1 sampai 720. Batas waktu sampai teknisi menekan **Mulai** pada tiket. Nilainya tidak boleh melebihi target penyelesaian.
   - **Target penyelesaian (jam)**: wajib, bilangan bulat 1 sampai 720. Batas waktu sampai tiket diselesaikan.
   - **Aktif**: saklar, aktif secara awal.
   - **Hitungan tenggat**: pilih **24 jam** (isian awal) atau **Jam layanan**. **24 jam** menghitung setiap jam, siang dan malam. **Jam layanan** hanya menghitung jam buka perusahaan, yang diisi di bagian **Jam layanan** pada Pengaturan Perusahaan ([bagian 8.1](/docs/guides/web/administration/company/)): tiket yang masuk di luar jam buka mulai dihitung saat buka berikutnya. Bila jam layanan belum diisi, form menulis "Jam layanan belum diisi; tenggat dihitung 24 jam." dan tenggat tetap 24 jam sampai Anda mengisinya. Pemegang Kelola perusahaan (`company.manage`) melihat link **Isi di Pengaturan Perusahaan** di peringatan itu, pengguna lain membaca "Minta admin mengisinya di Pengaturan Perusahaan."
3. Klik **Simpan**. Muncul toast `Tingkat SLA dibuat.`

Untuk mengubah, klik **Ubah** (halaman **Ubah Tingkat SLA**), ubah isian, lalu klik **Simpan** (toast `Tingkat SLA diperbarui.`). Perubahan jam dan **Hitungan tenggat** hanya berlaku untuk tiket yang dibuat sesudahnya. Tiket yang sudah ada tidak dihitung ulang. **Peringatan:** tingkat SLA diubah di tempatnya, jadi perubahan jam berlaku bagi semua versi paket dan langganan yang memakai tingkat itu. Untuk mengubah target hanya bagi penjualan baru, buat tingkat baru lalu pilih di paket (versi baru). Untuk berhenti memakai tingkat, buka **Aksi lainnya** dan klik **Nonaktifkan** (toast `Tingkat SLA dinonaktifkan.`). **Hapus permanen** hanya ada bila tingkat belum pernah dipakai paket atau versi paket mana pun (toast `Tingkat SLA dihapus permanen.`). Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. **Pulihkan** ada di menu baris yang dihapus ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/)).

Sebuah tingkat memengaruhi tiket seperti ini:

- Tiket yang punya **Langganan** mengambil kedua targetnya dari tingkat SLA **versi paket** yang dipakai langganan itu. Tingkat tetap berlaku walau sudah **Nonaktif**: menonaktifkan hanya menghentikan penjualan baru dan tidak mengubah tiket langganan yang sudah dijual. Memindahkan langganan lewat **Ganti paket** mengganti tingkatnya sesuai versi baru. Tiket tanpa langganan memakai **Kategori Tiket** ([bagian 3.4](/docs/guides/web/operations/tickets/)).
- Tiket berprioritas **Mendesak** memakai separuh dari kedua target, dibulatkan ke atas.
- **Hitungan tenggat** menentukan jam yang dihitung. Tingkat **24 jam** menghitung setiap jam, siang dan malam. Tingkat **Jam layanan** hanya menghitung jam buka perusahaan, dan menghitung 24 jam selama jam layanan perusahaan belum diisi. **Kategori Tiket** selalu menghitung 24 jam.
- Hasilnya muncul di kolom 30 hari pada daftar ini dan di laporan Kepatuhan SLA ([bagian 7.6](/docs/guides/web/finance-and-reports/sla-compliance/)). Sistem tidak memakai tingkat ini untuk menghitung uptime atau kredit tagihan. Kedua isian itu sudah dihapus dari tingkat SLA.

## Kesalahan umum

- Tingkat tidak muncul di form paket: saklar **Aktif** mati. Nyalakan di **Ubah**.
- Target respons atau penyelesaian ditolak: isi bilangan bulat jam antara 1 dan 720. Angka desimal tidak diterima.
- Target respons ditolak dengan pesan `Target respons tidak boleh lebih lama dari target penyelesaian.`: turunkan target respons atau naikkan target penyelesaian.
- Penyimpanan ditolak dengan pesan `nama sudah digunakan.`: **Nama** sudah dipakai tingkat lain di perusahaan ini.
- Menu baris tingkat tidak menawarkan **Hapus permanen**: tingkat itu masih dipakai paket atau versi paket (angkanya tampil di dialog **Nonaktifkan**). Pilih **Nonaktifkan**. Tingkat nonaktif tidak muncul di form paket, tetapi langganan yang sudah dijual dengan tingkat itu tetap memakainya.
