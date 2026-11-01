---
title: "1.1 Siapa memakai panduan ini"
description: "Panduan ini untuk pengguna web Inbils di kantor: admin, manajer, dan staf. Ketiganya membuka alamat web yang sama."
---

Panduan ini untuk pengguna web Inbils di kantor: admin, manajer, dan staf. Ketiganya membuka alamat web yang sama. Yang berbeda adalah menu dan tombol yang muncul, karena Inbils hanya menampilkan apa yang diizinkan untuk peran Anda.

- Admin memegang semua izin kecuali izin portal pelanggan. Admin mengelola pengguna, peran, perusahaan, dan pengaturan sistem.
- Manajer menyetujui SPK dan permintaan barang, memantau laporan, mengelola pelanggan, layanan, jaringan, dan tagihan, serta boleh membatalkan tagihan dan pembayaran.
- Staf menjalankan pekerjaan harian: mengubah data pelanggan, membuat SPK, tiket, dan tagihan, mencatat pembayaran, serta memproses stok masuk dan keluar di gudang.

Pembagian izin yang rinci ada di [bagian 10.1](/docs/guides/web/appendix/roles-and-permissions-summary/). Peran dimiliki perusahaan Anda: admin perusahaan dapat membuat peran lain dan mengubah isi peran ([bagian 8.6](/docs/guides/web/administration/roles/)), jadi daftar menu per orang di perusahaan Anda bisa berbeda dari uraian di atas. Operator platform adalah tim Inbils yang mengelola seluruh instalasi melalui `/platform`, bukan admin perusahaan. Pekerjaan mereka dibahas terpisah dalam [Panduan Panel Operator Inbils](/docs/guides/platform/).

Teknisi dan pelanggan tidak memakai web. Akun yang tidak memegang izin akses web (`app.web`) dialihkan ke halaman **Gunakan aplikasi Inbils**, yang menyebut aplikasi Android yang harus dipakai: Inbils Teknisi atau Inbils Pelanggan. Halaman itu punya tombol **Buka Play Store** (tampil bila tautan Play Store sudah diatur), **Kelola akun & 2FA**, dan **Keluar**. Pekerjaan teknisi (memulai dan menyerahkan SPK, mengerjakan tiket, mengembalikan material) dan pekerjaan pelanggan (melihat dan membayar tagihan, membuat tiket) dilakukan di aplikasi masing-masing, dengan panduan terpisah: [Panduan Aplikasi Teknisi](/docs/guides/technician/) dan [Panduan Aplikasi Pelanggan](/docs/guides/customer/). Di web, mereka hanya membuka halaman masuk, lupa kata sandi, profil (termasuk 2FA), dan halaman hasil pembayaran. Di halaman profil, tautan **Kembali ke halaman aplikasi** membawa mereka kembali. Akun yang juga memegang peran lain dengan izin akses web, misalnya Admin, Manajer, atau Staf, tidak dialihkan. Akun yang tidak memegang peran apa pun di perusahaan, atau yang perannya tidak memuat akses teknisi maupun pelanggan, membuka halaman **Akun ini belum punya akses aplikasi web** dengan keterangan "Minta admin perusahaan Anda memberi peran yang memuat akses web."

Bila tautan Play Store untuk aplikasi itu belum diatur, halaman **Gunakan aplikasi Inbils** menulis "Minta tautan aplikasi ke admin ISP Anda." di tempat tombol **Buka Play Store**.

## Cara membaca panduan

- Nama menu, tombol, tab, dan isian ditulis tebal persis seperti tulisan di layar. Semua layar Inbils berbahasa Indonesia. Singkatan dan nama produk berikut tidak diterjemahkan: SPK, ODN, ODP, OLT, PON, NAS, IP, CIDR, MAC, VLAN, SLA, MRR, KPI, SKU, RADIUS, Midtrans, WhatsApp, 2FA, dan Email.
- Gambar diambil dari data contoh "Inbils Demo Company" dengan login admin. Data dan tombol di layar Anda bisa berbeda, terutama bila peran Anda bukan admin.
- Setiap menu dimulai dengan tujuan dan peran yang dapat memakainya, disusul langkah bernomor dan daftar kesalahan umum.
- [Bab 9](/docs/guides/web/workflows/new-customer-to-payment/) menyusun alur kerja yang melewati beberapa menu. [Bab 10](/docs/guides/web/appendix/roles-and-permissions-summary/) memuat tabel peran dan istilah.

Bila menu yang disebut panduan tidak ada di sidebar Anda, peran Anda belum memiliki izinnya. Minta admin perusahaan menambahkannya ke peran Anda di menu Peran, atau memberi Anda peran lain di menu Pengguna ([bagian 8.5](/docs/guides/web/administration/users/) dan [8.6](/docs/guides/web/administration/roles/)). Bila Anda membuka halaman yang tidak diizinkan, Inbils menampilkan halaman **Akses ditolak** dengan pesan "Anda tidak punya izin untuk membuka halaman ini. Hubungi administrator jika Anda memerlukan aksesnya." Klik **Ke dasbor** untuk kembali.
