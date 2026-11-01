---
title: "2.3 Ringkasan administrasi"
description: "Di bagian bawah dasbor, region Administrasi merangkum kondisi perusahaan untuk orang yang mengelola pengguna, peran, atau perusahaan."
---

Di bagian bawah dasbor, region **Administrasi** merangkum kondisi perusahaan untuk orang yang mengelola pengguna, peran, atau perusahaan.

Peran yang dapat memakai: pengguna dengan izin `users.manage` (**Kelola pengguna**), `roles.manage` (**Kelola peran dan hak akses**), atau `company.manage` (**Kelola perusahaan**); admin pada pengaturan standar. Region ini tidak tampil untuk akun lain.

1. Buka **Dasbor** lalu gulir ke bawah sampai judul **Administrasi**.
2. Baca empat kartu angka: **Pengguna** (pengguna perusahaan aktif), **Pengguna aktif**, **Peran**, dan **Izin akses**. Angka **Peran** dan **Izin akses** mencakup seluruh sistem, bukan satu perusahaan.
3. Lihat kartu **Perusahaan**: **Nama**, **Kode**, **Mata uang**, dan **Zona waktu** perusahaan aktif.
4. Lihat **Aktivitas terbaru**: sepuluh catatan audit terakhir di perusahaan aktif. Setiap baris memuat satu kalimat pendek dari server yang menyebut objek dan kejadiannya, misalnya "Tiket ditugaskan", disusul waktunya. Kalimat itu memakai kamus yang sama dengan halaman **Log audit** ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)). Kejadian yang belum punya kalimat Indonesia ditulis sebagai "objek: kejadian" dengan tanda garis bawah diganti spasi. Bila belum ada catatan, kartu menulis "Belum ada aktivitas. Setiap perubahan data di perusahaan ini akan tercatat di sini." Untuk telusur lengkap, buka halaman **Log audit** ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)).
5. Di kartu **Modul**, klik satu modul (Pelanggan, Layanan, Inventaris, Aset jaringan, SPK, Tagihan, Tiket) untuk membuka menunya. Setiap kotak modul bertuliskan "Buka modul". Angka di lencana adalah jumlah data modul itu di perusahaan aktif. Modul yang menunya tidak boleh Anda buka tidak tampil.

## Kesalahan umum

- Region **Administrasi** tidak ada: akun Anda tidak punya izin `users.manage`, `roles.manage`, atau `company.manage`.
- Angka **Pengguna** lebih kecil dari yang Anda harapkan: angka itu menghitung pengguna yang perusahaan asalnya adalah perusahaan aktif. Pindah perusahaan ([bagian 1.6](/docs/guides/web/introduction/switch-company/)) untuk melihat perusahaan lain.
