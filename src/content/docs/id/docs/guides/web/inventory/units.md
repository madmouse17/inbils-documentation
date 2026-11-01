---
title: "6.4 Satuan"
description: "Satuan adalah ukuran barang, misalnya pcs, meter atau box. Satuan dipilih pada kategori, dan barang mengikuti satuan kategorinya."
---

Satuan adalah ukuran barang, misalnya pcs, meter atau box. Satuan dipilih pada kategori, dan barang mengikuti satuan kategorinya. Buka menu ini saat Anda butuh ukuran baru yang belum ada.

Peran yang dapat memakai dan izin: sama dengan [bagian 6.3](/docs/guides/web/inventory/categories/).

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Inventaris**, lalu klik **Satuan**.
2. Baca daftar. Kolomnya **Nama**, **Simbol** (keduanya bisa diurutkan), **Status**, dan **Aksi** (tombol **Ubah** dan menu **Aksi lainnya** berisi **Nonaktifkan** atau **Aktifkan**, dan **Hapus permanen** bila satuan belum pernah dipakai). Daftar punya filter **Status** dan tidak punya kotak cari atau halaman detail. Tombol **Ekspor** (pemegang `inventory.export`) menawarkan **Ekspor CSV** dan **Ekspor PDF** dengan kolom Nama dan Simbol, dan tombol **Buat Satuan** tampil bagi pemegang `inventory.create`. Bila belum ada satuan, daftar menulis **Tidak ada data.** dengan keterangan **Buat satuan lebih dulu, lalu pakai satuan itu pada kategori barang.** dan tombol **Buat Satuan**.

   ![Daftar Satuan dengan kolom Nama dan Simbol](~/assets/guide/web/units.webp)

## Membuat satuan

1. Klik **Buat Satuan**. Dialog **Buat Satuan** terbuka.
2. Isi form:
   - Isi **Nama**. Isian ini wajib, maksimal 100 karakter, dan belum dipakai satuan lain di perusahaan ini. Contoh: `box`.
   - Isi **Simbol**. Isian ini wajib, maksimal 20 karakter, dan belum dipakai satuan lain di perusahaan ini. Contoh: `box`.
3. Klik **Buat**, atau **Batal**. Dialog menutup dan muncul toast `Satuan berhasil dibuat.`

## Menonaktifkan, menghapus permanen, dan memulihkan satuan

1. Klik **Ubah**, ubah isian di dialog **Ubah Satuan**, lalu klik **Simpan**. Muncul toast `Satuan berhasil diubah.`
2. Untuk berhenti memakai satuan, buka menu **Aksi lainnya** dan pilih **Nonaktifkan**. Toast `Satuan dinonaktifkan.` muncul. Satuan nonaktif tidak muncul di pilihan **Satuan** saat membuat atau mengubah kategori, tetapi kategori dan barang yang sudah memakainya tetap utuh. **Aktifkan** memakainya lagi.
3. **Hapus permanen** hanya ada bila tidak ada barang atau kategori barang yang pernah memakai satuan itu. Toast `Satuan dihapus permanen.` muncul. Satuan barang mengikuti kategori, jadi ganti dulu **Satuan** pada kategori yang bersangkutan ([bagian 6.3](/docs/guides/web/inventory/categories/)) bila ingin menghapus satuan lama.
4. Daftar punya kolom **Status** dan filter **Status** (**Aktif**, **Nonaktif**, **Dihapus**, **Semua, termasuk dihapus**). Baris yang dihapus punya **Pulihkan**.

## Kesalahan umum

- Penyimpanan ditolak dengan pesan `nama sudah digunakan.` atau `simbol sudah digunakan.`: **Nama** dan **Simbol** harus unik per perusahaan, termasuk milik satuan yang sudah dihapus.
- **Hapus permanen** tidak ada di menu satuan: satuan masih dipakai barang atau kategori barang (angkanya tampil di dialog **Nonaktifkan**). Periksa kolom **Satuan** di daftar Kategori ([bagian 6.3](/docs/guides/web/inventory/categories/)) dan pilih satuan lain pada kategori itu, atau cukup **Nonaktifkan** satuannya.
- Staf atau manajer memilih **Hapus** dan muncul halaman **Akses ditolak** (galat 403): lihat [bagian 6.2](/docs/guides/web/inventory/items/).
