---
title: "6.3 Kategori"
description: "Kategori mengelompokkan barang dan menentukan satuannya. Setiap kategori punya satu satuan, dan semua barang di dalamnya memakai satuan itu."
---

Kategori mengelompokkan barang dan menentukan satuannya. Setiap kategori punya satu satuan, dan semua barang di dalamnya memakai satuan itu. Buka menu ini sebelum membuat barang yang kategorinya belum ada.

Peran yang dapat memakai: sama dengan [bagian 6.2](/docs/guides/web/inventory/items/). Izin: `inventory.view` membuka daftar, `inventory.create` membuat kategori, `inventory.update` mengubahnya, `inventory.delete` menghapusnya, `inventory.export` mengekspor daftar.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Inventaris**, lalu klik **Kategori**.
2. Baca daftar.

   - Isian **Cari kategori** mencari nama dan kode kategori. Klik **Filter** (atau tekan Enter) untuk menerapkan.
   - Kolom: **Kode**, **Nama**, **Satuan** (nama dan simbol satuan), **Sub-kategori** (jumlah kategori anak), **Status** (**Aktif** atau **Nonaktif**) dan **Aksi**. **Kode** dan **Nama** bisa diurutkan, urutan awalnya menurut nama.
   - Baris punya tombol **Ubah** dan menu **Aksi lainnya** yang berisi **Nonaktifkan** atau **Aktifkan**, dan **Hapus permanen** bila kategori belum pernah dipakai. Tidak ada halaman detail, dan **Ubah** membuka dialog. Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**.
   - Tombol **Ekspor** (pemegang `inventory.export`) menawarkan **Ekspor CSV** dan **Ekspor PDF** dengan kolom Kode, Nama, Satuan (nama satuan) dan Sub-kategori. Tombol **Buat Kategori** tampil bagi pemegang `inventory.create`.
   - Bila belum ada kategori, daftar menulis **Tidak ada data.** dengan keterangan **Buat kategori lebih dulu, lalu pilih kategori itu saat membuat barang.** dan tombol **Buat Kategori**.

   ![Daftar Kategori dengan kolom Kode, Nama, Satuan, Sub-kategori dan Status](~/assets/guide/web/categories.webp)

## Membuat kategori

1. Klik **Buat Kategori**. Dialog **Buat Kategori** terbuka.
2. Isi form:
   - Isi **Nama**. Isian ini wajib, maksimal 255 karakter. Contoh: `Connector`.
   - Isi **Kode**. Isian ini wajib, maksimal 100 karakter, dan belum dipakai kategori lain di perusahaan ini. Contoh: `CON`.
   - Pilih **Satuan**: ketik untuk mencari, lalu pilih satuan, misalnya `pcs (pcs)`. Isian ini wajib. Satuan dibuat di menu Satuan ([bagian 6.4](/docs/guides/web/inventory/units/)).
   - Pilih **Induk** bila kategori ini anak dari kategori lain: ketik untuk mencari, lalu pilih kategori (ditulis kode dan nama). Daftar memuat semua kategori. Biarkan kosong (**Tanpa induk (kategori utama)**) untuk kategori utama. Klik **Hapus pilihan: Induk** untuk mengosongkan pilihan.
   - Saklar **Aktif** menyala secara awal.
   - Isian **Deskripsi** opsional dan menerima teks bebas.
3. Klik **Buat**, atau **Batal**. Dialog menutup dan muncul toast `Kategori berhasil dibuat.`

## Mengubah, menonaktifkan, menghapus permanen, dan memulihkan kategori

1. Klik **Ubah**, ubah isian di dialog **Ubah Kategori**, lalu klik **Simpan**. Muncul toast `Kategori berhasil diubah.` Pilihan **Induk** tidak menawarkan kategori yang sedang diubah.
2. Untuk berhenti memakai kategori, buka menu **Aksi lainnya** dan pilih **Nonaktifkan**. Toast `Kategori barang dinonaktifkan.` muncul. Kategori nonaktif tidak muncul di pilihan **Kategori** saat membuat barang baru, tetapi barang yang sudah memakainya tetap utuh. **Aktifkan** memakainya lagi.
3. **Hapus permanen** hanya ada bila kategori belum pernah dipakai: tidak punya kategori anak dan tidak ada barang di dalamnya (termasuk yang sudah dihapus). Toast `Kategori barang dihapus permanen.` muncul.
4. Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. Baris yang dihapus punya **Pulihkan**. Kategori anak tidak bisa dipulihkan selama induknya masih dihapus ("Kategori barang tidak bisa dipulihkan karena induknya, `<nama>`, masih dihapus. Pulihkan induknya dulu.").

Mengganti **Satuan** kategori ikut mengganti satuan semua barang di kategori itu. Jumlah stok barang tidak dikonversi. Satuan yang dipilih untuk kategori harus aktif.

## Kesalahan umum

- Kode ditolak dengan pesan `kode sudah digunakan.`: kode harus unik per perusahaan, termasuk kode kategori yang sudah dihapus. Pakai kode lain.
- **Hapus permanen** tidak ada di menu kategori: kategori masih punya kategori anak atau barang (angkanya tampil di dialog **Nonaktifkan**). Pindahkan barangnya ke kategori lain lewat **Ubah** di menu Barang ([bagian 6.2](/docs/guides/web/inventory/items/)), dan kosongkan **Induk** pada kategori anak. Atau cukup **Nonaktifkan** kategorinya.
- Satuan barang berubah tanpa disengaja: Anda mengganti **Satuan** kategori. Pilih lagi satuan semula lewat **Ubah**.
- Staf atau manajer memilih **Hapus** dan muncul halaman **Akses ditolak** (galat 403): izin `inventory.delete` hanya dipegang admin pada peran bawaan ([bagian 6.2](/docs/guides/web/inventory/items/)).
