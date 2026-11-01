---
title: "4.3 Profil Bandwidth"
description: "Profil Bandwidth adalah templat kapasitas yang dipilih pada paket: kecepatan unduh dan unggah, jenis (berbagi atau dedikasi) dan rasio kontensi."
---

Profil Bandwidth adalah templat kapasitas yang dipilih pada paket: kecepatan unduh dan unggah, jenis (berbagi atau dedikasi) dan rasio kontensi. Buka menu ini sebelum membuat paket baru yang membutuhkan kapasitas berbeda.

Peran yang dapat memakai: sama dengan [bagian 4.2](/docs/guides/web/customers-and-services/service-packages/). Izin: `service.view` atau `service.manage` membuka menu, `service.create`, `service.update`, `service.delete` dan `service.export` untuk aksi masing-masing.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Pelanggan & Layanan**, lalu klik **Profil Bandwidth**.
2. Baca daftar. Kolomnya **Nama**, **Unduh (Mbps)**, **Unggah (Mbps)**, **Dibuat**, **Status** dan **Aksi**. Kotak **Cari** (isian "Nama atau tipe") mencari nama dan jenis. Untuk jenis, ketik `shared` atau `dedicated` (kata asli di basis data, bukan **Berbagi** atau **Dedikasi**). Tidak ada halaman rincian: nama profil dan tombol **Ubah** sama-sama membuka form ubah, dan menu **Aksi lainnya** berisi **Nonaktifkan** atau **Aktifkan**, dan **Hapus permanen** bila profil belum pernah dipakai. Jenis dan rasio hanya terlihat di form ubah. Tombol **Ekspor** (pemegang `service.export`) menghasilkan CSV atau PDF (judul PDF **Profil Bandwidth**) dengan kolom Nama, Unduh (Mbps), Unggah (Mbps), Tipe (**Berbagi** atau **Dedikasi**), Rasio berbagi dan Status (**Aktif** atau **Nonaktif**).

   ![Daftar Profil Bandwidth dengan kolom Nama, Unduh (Mbps), Unggah (Mbps), Dibuat dan Aksi](~/assets/guide/web/bandwidth-profiles.webp)

## Membuat profil

1. Klik **Buat Profil Bandwidth**. Halaman dengan kartu **Data profil** terbuka.
2. Isi form:
   - **Nama**: wajib, maksimal 255 karakter, unik per perusahaan. Contoh: `Home 50Mbps`.
   - **Tipe**: pilih **Berbagi** (isian awal) atau **Dedikasi**.
   - **Unduh (Mbps)**: wajib, bilangan bulat minimal 1.
   - **Unggah (Mbps)**: wajib, bilangan bulat minimal 1.
   - **Rasio kontensi**: bilangan bulat minimal 1, isian awal `1`. Wajib bila **Tipe** adalah **Berbagi**. Bila Anda memilih **Dedikasi**, isian ini terkunci dengan keterangan `Tidak dipakai untuk profil dedikasi.`
   - **Aktif**: saklar, aktif secara awal.
3. Klik **Simpan**. Muncul toast `Profil bandwidth dibuat.`

Profil bandwidth juga bisa dibuat dari form paket lewat tombol **+ Baru** ([bagian 4.2](/docs/guides/web/customers-and-services/service-packages/)). Dialog itu menulis **Tipe** sebagai **Shared** atau **Dedicated**, dan **Rasio kontensi** bernilai awal `4`.

Untuk mengubah, klik **Ubah**, ubah isian, lalu klik **Simpan** (toast `Profil bandwidth diperbarui.`). **Peringatan:** profil diubah di tempatnya, jadi perubahan Mbps berlaku bagi semua paket, versi paket, dan langganan yang memakai profil itu. Untuk mengubah kapasitas hanya bagi penjualan baru, buat profil baru lalu pilih di paket (versi baru). Untuk berhenti memakai profil, buka **Aksi lainnya** dan klik **Nonaktifkan**: dialog menulis berapa paket yang memakainya (misalnya "dipakai 1 paket"), dan toast `Profil bandwidth dinonaktifkan.` muncul. **Aktifkan** memakainya lagi. **Hapus permanen** hanya ada bila profil belum pernah dipakai paket atau versi paket mana pun (toast `Profil bandwidth dihapus permanen.`). Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. **Pulihkan** ada di menu baris yang dihapus ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/)).

## Kesalahan umum

- Profil tidak muncul di form paket: saklar **Aktif** mati. Nyalakan di **Ubah**.
- Penyimpanan ditolak dengan pesan `nama sudah digunakan.`: **Nama** sudah dipakai profil lain di perusahaan ini.
- Penyimpanan ditolak dengan pesan `rasio kontensi wajib diisi.`: profil berjenis **Berbagi** butuh rasio. Isi angka minimal 1.
- Menu baris profil tidak menawarkan **Hapus permanen**: profil itu masih dipakai paket atau versi paket (angkanya tampil di dialog **Nonaktifkan**). Pilih **Nonaktifkan**. Profil nonaktif tidak muncul di form paket, tetapi paket yang sudah memakainya tetap memakainya.
