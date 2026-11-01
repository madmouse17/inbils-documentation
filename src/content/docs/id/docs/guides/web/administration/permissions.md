---
title: "8.7 Hak Akses"
description: "Menu ini adalah katalog kode izin yang dikenal sistem, hanya untuk dibaca."
---

Menu ini adalah katalog kode izin yang dikenal sistem, hanya untuk dibaca. Buka saat Anda perlu memastikan kode izin yang tepat atau kelompoknya, misalnya sebelum menyusun atau mengubah sebuah peran ([bagian 8.6](/docs/guides/web/administration/roles/)). Katalog sama untuk semua perusahaan.

Peran yang dapat memakai: admin. Izin: `roles.manage`, sama dengan menu **Peran**. Layar ini tidak punya tombol tambah, ubah, hapus atau ekspor.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Administrasi**, lalu klik **Hak Akses**.
2. Baca layar (subjudul "Semua hak akses yang bisa diberikan ke peran. Daftar ini hanya untuk dibaca."):
   - **Cari** (petunjuk "Kode hak akses, mis. billing.view") mencari bagian dari kode izin. Pencarian tidak membaca kolom **Fungsi**.
   - **Kode** (bisa diurutkan): kode izin, berpola `<area>.<aksi>` atau `<area>.<objek>.<aksi>`, misalnya `billing.payment.record`.
   - **Fungsi**: apa yang dibolehkan izin itu dalam kalimat Indonesia, misalnya "Catat pembayaran". Teks ini sama dengan label izin di halaman detail peran ([bagian 8.6](/docs/guides/web/administration/roles/)).
   - **Kelompok**: lencana berisi nama Indonesia dari awalan kode sebelum titik pertama, misalnya **Tagihan** untuk `billing`. Kelompok ini sama dengan kategori di halaman detail peran.
   - Di bawah tabel ada keterangan jumlah baris yang tampil, pemilih "Baris per halaman" (10, 25 atau 50), serta tombol **Sebelumnya** dan **Berikutnya** dengan keterangan "Halaman n dari m". Katalog bawaan memuat 173 izin.
   - Bila tidak ada baris, layar menampilkan "Belum ada hak akses" (keterangan "Hak akses dibuat bersama pembaruan sistem."), atau "Tidak ada hak akses yang cocok" dengan tombol **Reset filter** saat pencarian aktif.

   ![Daftar Hak Akses dengan kotak Cari, kolom Kode, Fungsi dan Kelompok](~/assets/guide/web/permissions.webp)

3. Pakai katalog ini sebagai kamus. Cari bagian kode, misalnya `export` untuk izin ekspor atau `approve` untuk izin persetujuan, lalu periksa apakah peran Anda memegangnya di halaman detail peran ([bagian 8.6](/docs/guides/web/administration/roles/)). Ringkasan izin per peran ada di lampiran 10.1.

Nama kelompok di kolom **Kelompok** dan di pemilih izin:

| Awalan kode | Nama di layar |
|---|---|
| `billing` | Tagihan |
| `company` | Perusahaan |
| `customer` | Pelanggan |
| `dashboard` | Dasbor |
| `developer` | Pengembang |
| `employee` | Karyawan |
| `evaluation` | Evaluasi |
| `inventory` | Inventaris |
| `ipam` | IPAM |
| `location` | Lokasi |
| `network_asset` | Aset jaringan |
| `odn` | ODN |
| `organization` | Organisasi |
| `portal` | Portal pelanggan |
| `report` | Laporan |
| `roles` | Peran |
| `service` | Paket layanan |
| `spk` | SPK |
| `system` | Sistem |
| `ticket` | Tiket |
| `users` | Pengguna |
| `vehicle` | Kendaraan |

Layar ini tidak menunjukkan peran mana yang memegang suatu izin. Untuk itu buka **Ubah** pada peran yang bersangkutan.

## Kesalahan umum

- Item **Hak Akses** tidak tampil di sidebar: akun Anda tidak memegang `roles.manage`.
- Izin yang dicari tidak ada di daftar: katalog hanya memuat izin yang dibuat sistem. Admin tidak dapat menambah izin dari layar ini.
- Pencarian dengan kata Indonesia, misalnya "Catat pembayaran", tidak menemukan apa pun: kotak **Cari** di layar ini hanya mencocokkan kode. Cari dengan bagian kode, atau pakai kotak **Cari hak akses** di form peran, yang juga membaca label Indonesia.
- Izin sudah ada tetapi tidak berefek pada seseorang: izin itu harus dipegang peran orang itu ([bagian 8.6](/docs/guides/web/administration/roles/)) dan peran itu harus diberikan ke penggunanya ([bagian 8.5](/docs/guides/web/administration/users/)).
