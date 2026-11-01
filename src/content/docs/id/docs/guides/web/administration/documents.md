---
title: "8.8 Dokumen"
description: "Menu ini bernama Jenis Dokumen di sidebar. Ia mengelola jenis dokumen pelanggan, yaitu kategori berkas dengan nama, kode, objek yang dicakup, status wajib"
---

Menu ini bernama **Jenis Dokumen** di sidebar. Ia mengelola jenis dokumen pelanggan, yaitu kategori berkas dengan nama, kode, objek yang dicakup, status wajib dan masa berlaku, misalnya KTP atau kontrak. Buka menu ini saat Anda menambah atau mengubah jenis dokumen. Halaman ini hanya mengelola jenisnya: berkas pelanggan diunggah di tab **Dokumen** pada halaman detail pelanggan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/); ringkasannya ada di "Berkas dokumen pelanggan" di bawah). Lampiran tiket dan bukti SPK dikelola di halaman tiket ([bagian 3.4](/docs/guides/web/operations/tickets/)) dan SPK ([bagian 3.3](/docs/guides/web/operations/work-orders/)).

Peran yang dapat memakai: admin. Izin: `system.setting` membuka menu dan mengizinkan semua aksi (lihat, tambah, ubah, hapus), `system.document.export` menampilkan tombol **Ekspor**. Pada peran bawaan hanya admin yang memegang keduanya. Izin `system.setting` juga membuka menu Penomoran ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)).

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Administrasi**, lalu klik **Jenis Dokumen**. Judul layar berbunyi **Jenis Dokumen** dengan subjudul "Jenis dokumen pelanggan beserta status wajib dan masa berlakunya. Berkasnya diunggah di tab Dokumen pada halaman pelanggan."
2. Baca daftar. Cara kerja pencarian, urutan, tombol baris dan dialog hapus ada di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).

   - Kotak **Cari** (petunjuk "Nama, kode, atau berlaku untuk") mencari di nama, kode dan **Berlaku untuk**.
   - Kolom: **Nama**, **Kode**, **Berlaku untuk**, **Wajib**, **Masa berlaku**, **Status** dan **Aksi**. **Nama**, **Kode** dan **Berlaku untuk** bisa diurutkan.
   - **Wajib** berisi "Ya" atau "Tidak". **Masa berlaku** berisi jumlah hari diikuti kata "hari" (misalnya "30 hari"), atau tanda "-". **Berlaku untuk** kosong tampil sebagai "-". **Status** berisi lencana **Aktif** atau **Nonaktif**.
   - Daftar menampilkan 10 baris per halaman. Pemilih "Baris per halaman" menawarkan 10, 25 dan 50, dan tombol **Sebelumnya** dan **Berikutnya** dengan keterangan "Halaman n dari m" ada di bawah tabel.
   - Tombol **Buat Jenis Dokumen**, **Ubah** dan menu **Aksi lainnya** (**Nonaktifkan** atau **Aktifkan**, dan **Hapus permanen** bila jenis belum dipakai) tampil untuk semua orang yang bisa membuka halaman ini. Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**.
   - Bila tidak ada baris, layar menampilkan "Belum ada jenis dokumen" dengan tombol **Buat Jenis Dokumen**, atau "Tidak ada jenis dokumen yang cocok" dengan tombol **Reset filter** saat pencarian aktif.

   ![Daftar Jenis Dokumen yang masih kosong pada perusahaan demo, dengan pesan Belum ada jenis dokumen, tombol Ekspor dan Buat Jenis Dokumen](~/assets/guide/web/documents.webp)

## Menambah jenis dokumen

1. Klik **Buat Jenis Dokumen**.
2. Isi form pada dialog **Buat Jenis Dokumen**:
   - **Nama**: wajib, maksimal 255 karakter.
   - **Kode**: wajib, maksimal 50 karakter (petunjuk "Unik di perusahaan ini dan tidak bisa diubah nanti."). Kode tidak boleh sama dengan kode jenis lain di perusahaan yang sama, termasuk jenis yang sudah dihapus. Bila sama, pesan "kode sudah digunakan." muncul di bawah isian. Kode tidak bisa diubah setelah disimpan.
   - **Berlaku untuk**: opsional, teks bebas maksimal 100 karakter. Petunjuk "Mis. pelanggan". Sistem tidak memeriksa isinya, tetapi tab **Dokumen** pada halaman pelanggan hanya menawarkan jenis aktif yang **Berlaku untuk**-nya kosong, `Customer` atau `Pelanggan`. Jenis dengan isian lain tidak muncul di pilihan itu.
   - **Masa berlaku (hari)**: opsional, bilangan bulat 1 atau lebih. Kosong berarti jenis ini tanpa masa berlaku. Berkas pelanggan yang diunggah dengan jenis ini berlaku sampai tanggal unggah ditambah jumlah hari itu.
   - **Wajib**: saklar, mati secara awal. Saklar ini hanya penanda yang tampil di kolom **Wajib** dan di ekspor. Layar lain tidak memakainya untuk menolak atau mengingatkan apa pun.
   - **Aktif**: saklar, hidup secara awal. Nilainya tersimpan: matikan bila jenis baru belum dipakai.
3. Klik **Buat**. Muncul toast "Jenis dokumen dibuat." **Batal** menutup dialog tanpa menyimpan.

## Mengubah jenis dokumen

1. Klik **Ubah** pada baris jenis dokumen. Dialog **Ubah Jenis Dokumen** terbuka dengan data jenis itu.
2. Ubah **Nama**, **Berlaku untuk**, **Masa berlaku (hari)**, **Wajib** atau **Aktif**. Isian **Kode** tampil abu-abu dan hanya bisa dibaca, dengan keterangan "Kode tidak bisa diubah setelah jenis dokumen dibuat."
3. Klik **Simpan**. Muncul toast "Jenis dokumen diperbarui."

## Menonaktifkan, menghapus permanen, dan memulihkan jenis dokumen

1. Klik menu **Aksi lainnya** pada baris jenis dokumen. Isinya **Nonaktifkan** (atau **Aktifkan**) dan **Hapus permanen**. Dialog **Nonaktifkan** menulis berapa dokumen yang memakai jenis itu, misalnya "dipakai 3 dokumen". Toast "Jenis dokumen dinonaktifkan." muncul.
2. **Hapus permanen** hanya ada bila belum ada dokumen yang memakai jenis itu. Dialog "Hapus permanen" diikuti nama menulis "Jenis dokumen "&lt;nama&gt;" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan." Muncul toast "Jenis dokumen dihapus permanen."
3. Filter **Status** punya **Semua status**, **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. Baris yang dihapus punya **Pulihkan**.

Kode jenis yang nonaktif atau sudah dihapus (**Dihapus**) tetap dianggap terpakai. Untuk jenis yang tidak dipakai lagi, pilih **Nonaktifkan**.

## Berkas dokumen pelanggan

Berkas pelanggan diunggah, dibuka dan dihapus di tab **Dokumen (n)** pada halaman detail pelanggan, bukan di menu **Jenis Dokumen**. Hubungannya dengan menu ini:

- Tab itu hanya menampilkan formulir unggah bagi pemegang `customer.update`, bukan `system.setting`. Izin yang sama dibutuhkan untuk menghapus berkas. Berkas hanya terhubung ke pelanggan perusahaan aktif.
- Formulir meminta **Jenis dokumen** (wajib, dari jenis aktif menurut aturan **Berlaku untuk** di atas) dan **Berkas**. Server hanya menerima PDF, JPG dan PNG, paling besar 10240 KB (10 MB).
- Tanggal berlaku dihitung saat berkas diunggah, dari **Masa berlaku (hari)** jenisnya saat itu. Daftar berkas menulis "Berlaku sampai {tanggal}" atau "Tanpa masa berlaku". Lencana **Segera habis** muncul 30 hari sebelum tanggal itu, dan **Kedaluwarsa** sesudahnya. Mengubah masa berlaku jenis kemudian tidak menggeser tanggal berkas yang sudah ada.
- Setiap hari dini hari Inbils menaruh pengingat di lonceng pemegang `customer.update`, sekali untuk setiap berkas yang masuk jendela 30 hari itu. Judulnya "Dokumen {jenis} {nama pelanggan} segera habis" dengan isi "Berlaku sampai {tanggal}.", dan mengetuknya membuka halaman pelanggan itu. Unggah dan hapus berkas tercatat di Log Audit pelanggan.

## Mengekspor daftar

1. Isi kotak **Cari** bila Anda hanya butuh sebagian jenis.
2. Klik **Ekspor**, lalu pilih **Ekspor CSV** atau **Ekspor PDF**.

Berkas `document-types-export-<tanggal>-<jam>.csv` (atau `.pdf`, berjudul "Jenis dokumen") berisi kolom Kode, Nama, Berlaku untuk, Wajib ("Ya" atau "Tidak"), Masa berlaku (hari) dan Status (**Aktif** atau **Nonaktif**). Kolom yang kosong berisi "-". Tombol **Ekspor** hanya tampil bagi pemegang `system.document.export`.

## Kesalahan umum

- Pesan "kode sudah digunakan." di bawah **Kode**: perusahaan ini sudah punya jenis dengan kode itu, termasuk yang sudah dihapus. Pakai kode lain, atau ubah jenis yang lama lewat **Ubah**.
- Anda mengubah **Kode** di **Ubah Jenis Dokumen**: isian itu hanya bisa dibaca. Untuk kode lain, buat jenis baru.
- Penyimpanan gagal dengan toast "Data gagal disimpan. Periksa input.": baca pesan merah di bawah isian. Periksa **Masa berlaku (hari)** (bilangan bulat 1 atau lebih) dan panjang **Berlaku untuk** (maksimal 100 karakter).
- Anda mencari tombol untuk mengunggah berkas: halaman ini tidak punya tombol itu. Buka tab **Dokumen** pada halaman detail pelanggan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)). Jenis yang Anda cari tidak muncul di sana: periksa bahwa jenisnya **Aktif** dan **Berlaku untuk**-nya kosong, `Customer` atau `Pelanggan`.
