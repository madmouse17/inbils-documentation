---
title: "3. Dasbor dan daftar perusahaan"
description: "Dasbor adalah halaman pertama setelah login. Empat kartu di atas merangkum tenant paling atas:"
---

## 3.1 Membaca ringkasan dasbor


Peran yang dapat memakai: semua operator platform.

Dasbor adalah halaman pertama setelah login. Empat kartu di atas merangkum tenant paling atas:

- **Perusahaan aktif**: tenant aktif tanpa pengajuan hapus;
- **Ditangguhkan**: tenant nonaktif tanpa pengajuan hapus;
- **Pengajuan hapus**: tenant yang sudah mengajukan penghapusan;
- **Job gagal tanpa perusahaan**: job gagal dalam 7 hari terakhir yang tidak membawa id perusahaan.

![Dasbor operator dengan kartu ringkasan, filter perusahaan, dan tabel tenant](~/assets/guide/web/platform-dashboard.webp)

Bila ada job gagal tanpa perusahaan, alert kuning menjelaskan bahwa job itu tidak masuk ke baris perusahaan mana pun. Tim server perlu membaca `failed_jobs` dan log aplikasi untuk menemukan asalnya.

Bila ada tenant yang meminta anak perusahaan, kartu **Permintaan anak perusahaan** tampil di atas tabel tenant. Kartu itu hanya ada selama ada permintaan terbuka. Cara menanggapinya ada di [bagian 5.3](/docs/guides/platform/company-page-and-support-tools/).


## 3.2 Mencari dan membaca perusahaan


Filter di atas tabel:

- **Cari** mencari nama atau kode perusahaan, paling banyak 100 karakter;
- **Status** memilih **Semua status**, **Aktif**, **Ditangguhkan**, atau **Pengajuan hapus**.

Klik judul **Perusahaan** atau **Kode** untuk mengurutkan. Tabel memuat:

| Kolom | Arti |
| --- | --- |
| **Perusahaan** | Nama perusahaan induk. Klik untuk membuka halaman tenant. |
| **Kode** | Kode tetap tenant. Dua kode yang hanya berbeda huruf besar-kecil tidak bisa dipakai bersama; saat konfirmasi, kode harus diketik persis. |
| **Status** | **Aktif**, **Ditangguhkan**, atau **Pengajuan hapus**. |
| **Anak perusahaan** | Jumlah anak perusahaan, aktif maupun nonaktif. |
| **Pengguna** | Jumlah pengguna pada induk dan anak perusahaan. |
| **Pelanggan** | Jumlah pelanggan yang tidak dihapus pada seluruh tenant. |
| **Job gagal 7 hari** | Job gagal yang membawa id salah satu perusahaan tenant. |
| **WhatsApp gagal 7 hari** | Pesan WhatsApp berstatus gagal selama 7 hari terakhir. |
| **Masuk terakhir** | Login pengguna tenant terbaru pada induk atau anak perusahaan. |
| **Penyimpanan** | Total ukuran media yang mempunyai metadata perusahaan. |

Angka **Penyimpanan** dapat lebih rendah daripada ukuran folder sebenarnya bila berkas lama tidak mempunyai metadata `company_id`. Gunakan angka ini sebagai ukuran data media yang tercatat, bukan pemeriksaan disk server.

Klik **Reset filter** pada keadaan kosong untuk menghapus pencarian dan status. Klik **Perusahaan baru** di kanan atas atau sidebar untuk membuat tenant.

### Kesalahan umum

- Perusahaan tidak ditemukan: hapus filter **Status**, periksa ejaan kode, lalu klik **Reset filter**.
- Anak perusahaan tidak tampil sebagai baris sendiri: halaman ini memang hanya menampilkan perusahaan induk. Angkanya digabung ke induk.
- Jumlah job gagal berbeda dari halaman server: panel hanya menghitung 7 hari terakhir dan hanya job yang membawa `companyId`.
- Angka penyimpanan tampak kecil: media lama mungkin belum mempunyai metadata perusahaan.
