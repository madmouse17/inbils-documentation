---
title: "1.6 Ganti perusahaan"
description: "Satu instalasi Inbils dapat memuat lebih dari satu perusahaan, misalnya perusahaan induk (Head) dan anak perusahaannya. Data setiap perusahaan terpisah."
---

Satu instalasi Inbils dapat memuat lebih dari satu perusahaan, misalnya perusahaan induk (Head) dan anak perusahaannya. Data setiap perusahaan terpisah: pelanggan, tagihan, stok, dan laporan hanya milik perusahaan yang sedang aktif.

Peran yang dapat memakai: admin dan manajer (izin `company.switch`, **Ganti perusahaan**), dan hanya bila akun itu punya akses ke lebih dari satu perusahaan. Tombol ganti perusahaan tidak tampil untuk akun lain.

1. Lihat bagian atas sidebar. Tombol di bawah nama perusahaan menampilkan nama perusahaan aktif dan tulisan **Ganti perusahaan**.
2. Klik tombol itu. Menu **Ganti perusahaan** terbuka dengan nama dan kode setiap perusahaan. Perusahaan asal akun Anda diberi tulisan "bawaan" setelah kodenya.
3. Pilih perusahaan tujuan. Inbils membuka **Dasbor** perusahaan itu dan menampilkan toast hijau "Sekarang bekerja di" disusul nama perusahaan.
4. Untuk kembali, ulangi langkah 1 sampai 3 dan pilih perusahaan asal, atau klik **Kembali ke induk** di pita bila Anda sedang di anak perusahaan (lihat di bawah).

Perpindahan berlaku selama sesi login. Setiap login baru dimulai lagi di perusahaan asal. Peran dan izin Anda tidak berubah saat pindah. Di layar sempit, sidebar menutup sendiri setelah perpindahan.

Selama perpindahan berjalan, tombol ganti perusahaan nonaktif dan menampilkan indikator putar, jadi klik kedua tidak memulai perpindahan lain. Setelah selesai, fokus keyboard kembali ke tombol itu.

Di anak perusahaan, pita di bagian paling atas halaman menulis "Sedang di anak perusahaan {nama}". Tombol **Kembali ke induk** di pita itu memindahkan Anda ke perusahaan induk (Head) tanpa membuka menu, lalu toast "Sekarang bekerja di" disusul nama induk muncul. Tombol hanya tampil bila akun Anda boleh berpindah ke induk itu (izin `company.switch` dan akses ke perusahaan induk). Pita tidak tampil di Head maupun di perusahaan yang berdiri sendiri.

Akses ke perusahaan lain dan anak perusahaan dibuat oleh administrator server dengan perintah `inbils:company:grant-membership` dan `inbils:company:create-subsidiary`, bukan lewat layar web.

Perusahaan induk (Head) adalah perusahaan tanpa induk yang punya minimal satu anak perusahaan aktif. Hanya saat Anda bekerja di Head dan akun Anda punya izin `report.consolidated.view` (**Lihat laporan konsolidasi**, admin), menu **Metrik Konsolidasi** muncul di grup **Keuangan & Laporan** ([bagian 7.11](/docs/guides/web/finance-and-reports/consolidated-metrics/)).

## Kesalahan umum

- Angka di layar mendadak berbeda: periksa nama perusahaan aktif di tombol sidebar. Anda mungkin masih berada di perusahaan lain.
- Tombol ganti perusahaan tidak ada: akun Anda hanya punya satu perusahaan, atau perannya tidak memiliki izin `company.switch`. Minta administrator server menambah akses.
- Menu **Metrik Konsolidasi** tidak ada di anak perusahaan. Pindah ke Head dulu.
- Toast merah "Perusahaan aktif berubah di tab lain." saat menyimpan: Anda mengganti perusahaan di tab lain, lalu menyimpan dari tab yang masih menampilkan perusahaan sebelumnya. Inbils menolak penyimpanan itu dan membuka ulang halaman di perusahaan yang sekarang aktif. Cek nama perusahaan di tombol sidebar, lalu ulangi ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/), **Pesan benturan**).
