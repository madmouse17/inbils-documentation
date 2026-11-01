---
title: "4.4 Profil Kecepatan"
description: "Profil Kecepatan adalah label kecepatan yang dipilih pada paket. Isinya batas unduh dan unggah, kecepatan burst (opsional) dan nama grup kecepatan RADIUS."
---

Profil Kecepatan adalah label kecepatan yang dipilih pada paket. Isinya batas unduh dan unggah, kecepatan burst (opsional) dan nama grup kecepatan RADIUS. Buka menu ini saat Anda menambah label kecepatan baru atau mengubah batas kecepatan paket.

Peran yang dapat memakai: sama dengan [bagian 4.2](/docs/guides/web/customers-and-services/service-packages/). Izin: `service.view` atau `service.manage` membuka menu, `service.create`, `service.update`, `service.delete` dan `service.export` untuk aksi masing-masing.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Pelanggan & Layanan**, lalu klik **Profil Kecepatan**.
2. Baca daftar. Kolomnya **Nama**, **Unduh maksimum (Mbps)**, **Unggah maksimum (Mbps)**, **Dibuat**, **Status** dan **Aksi**. Kotak **Cari** (isian "Nama atau profil RADIUS") mencari nama profil dan nama profil RADIUS. Nama profil dan tombol **Ubah** membuka form ubah, dan menu **Aksi lainnya** berisi **Nonaktifkan** atau **Aktifkan**, dan **Hapus permanen** bila profil belum pernah dipakai, seperti Profil Bandwidth. Tombol **Ekspor** (pemegang `service.export`) menghasilkan CSV atau PDF (judul PDF **Profil Kecepatan**) dengan kolom Nama, Unduh maks (Mbps), Unggah maks (Mbps), Burst unduh (Mbps), Burst unggah (Mbps), Profil RADIUS dan Status (**Aktif** atau **Nonaktif**). Burst atau profil RADIUS yang kosong diisi `-`.

   ![Daftar Profil Kecepatan dengan kolom Nama, Unduh maksimum (Mbps), Unggah maksimum (Mbps), Dibuat dan Aksi](~/assets/guide/web/speed-profiles.webp)

## Membuat profil

1. Klik **Buat Profil Kecepatan**. Halaman dengan kartu **Data profil** terbuka.
2. Isi form:
   - **Isi dari profil bandwidth**: opsional, kotak cari dengan petunjuk **Pilih untuk menyalin kecepatan**. Pilihannya profil bandwidth aktif, tiap pilihan dengan keterangan kecepatannya (misalnya `50/20 Mbps`: unduh, lalu unggah). Memilih satu menyalin angkanya ke **Unduh maksimum (Mbps)** dan **Unggah maksimum (Mbps)**, yang tetap bisa Anda ubah. Kotak ini hanya alat bantu dan tidak ikut disimpan.
   - **Nama**: wajib, maksimal 255 karakter, unik per perusahaan. Contoh: `SP-Home-50`.
   - **Unduh maksimum (Mbps)**: wajib, bilangan bulat minimal 1.
   - **Unggah maksimum (Mbps)**: wajib, bilangan bulat minimal 1.
   - **Burst unduh (Mbps)**: opsional, bilangan bulat minimal 1.
   - **Burst unggah (Mbps)**: opsional, bilangan bulat minimal 1.
   - **Nama profil RADIUS**: opsional, maksimal 255 karakter. Ini nama grup kecepatan di RADIUS. Isi bila paket ini akan dipasang pada akun jaringan pelanggan.
   - **Aktif**: saklar, aktif secara awal.
3. Klik **Simpan**. Muncul toast `Profil kecepatan dibuat.`

Profil kecepatan juga bisa dibuat dari form paket lewat tombol **+ Baru** ([bagian 4.2](/docs/guides/web/customers-and-services/service-packages/)). Dialog itu hanya meminta **Nama**, **Unduh maksimum (Mbps)** dan **Unggah maksimum (Mbps)**, dengan kedua angka terisi dari profil bandwidth yang sudah dipilih di form paket. Isi burst dan **Nama profil RADIUS** lewat **Ubah** di halaman ini.

Untuk mengubah, klik **Ubah**, ubah isian, lalu klik **Simpan** (toast `Profil kecepatan diperbarui.`). **Peringatan:** profil diubah di tempatnya. Mengubah **Unduh maksimum** atau **Unggah maksimum** mengubah laju semua langganan yang memakai profil itu lewat versi paket mana pun, termasuk langganan lama (lihat "Hubungan dengan RADIUS"). Untuk mengubah laju hanya bagi penjualan baru, buat profil kecepatan baru lalu pilih di paket (versi baru). Untuk berhenti memakai profil, buka **Aksi lainnya** dan klik **Nonaktifkan** (toast `Profil kecepatan dinonaktifkan.`). **Hapus permanen** hanya ada bila profil belum pernah dipakai paket atau versi paket mana pun (toast `Profil kecepatan dihapus permanen.`). Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. **Pulihkan** ada di menu baris yang dihapus ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/)).

## Hubungan dengan RADIUS

Bila integrasi RADIUS aktif, Inbils menulis satu grup kecepatan per perusahaan dan profil, dengan nama `<realm>/<Nama profil RADIUS>` (realm adalah kode perusahaan huruf kecil). Batas kecepatannya diambil dari **Unggah maksimum** dan **Unduh maksimum** dalam format unggah/unduh. Nilai burst tidak dikirim ke RADIUS.

Saat Anda mengubah **Nama profil RADIUS**, **Unduh maksimum** atau **Unggah maksimum**, Inbils menulis ulang grup itu. Login baru langsung memakai kecepatan baru. Sesi yang sedang online memakai kecepatan lama sampai pelanggan tersambung ulang atau staf menekan **Sinkron ulang** di halaman **Akses jaringan** langganan pelanggan.

Paket yang profil kecepatannya tidak punya **Nama profil RADIUS** tidak dapat diberi akun jaringan. Inbils menolaknya dengan pesan `Profil kecepatan paket ini belum punya nama profil RADIUS.`

## Kesalahan umum

- Akun jaringan pelanggan ditolak dengan pesan di atas: isi **Nama profil RADIUS** pada profil kecepatan paket itu.
- Penyimpanan ditolak dengan pesan `nama sudah digunakan.`: **Nama** sudah dipakai profil lain di perusahaan ini.
- Menu baris profil tidak menawarkan **Hapus permanen**: profil itu masih dipakai paket atau versi paket. Pilih **Nonaktifkan**. Profil nonaktif tidak muncul di form paket, tetapi paket yang sudah memakainya tetap memakainya.
