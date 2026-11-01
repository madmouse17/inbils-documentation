---
title: "6.2 Barang"
description: "Barang adalah katalog yang dipakai oleh stok, permintaan barang dan SPK."
---

Barang adalah katalog yang dipakai oleh stok, permintaan barang dan SPK. Setiap barang punya SKU, kategori, satuan, harga dan batas stok minimum, dan datanya berlaku per perusahaan aktif. Buka menu ini saat Anda menambah barang baru, mengubah harganya, atau berhenti memakainya.

Peran yang dapat memakai: admin, manajer, staf. Izin: `inventory.view` membuka daftar dan rincian, `inventory.create` membuat barang, `inventory.update` mengubah barang, `inventory.delete` menghapus barang, `inventory.export` mengekspor daftar. Dengan peran bawaan, admin memegang semuanya, manajer memegang semuanya kecuali `inventory.delete`, dan staf hanya memegang `inventory.view`, `inventory.create` dan `inventory.update`.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Inventaris**, lalu klik **Barang**.
2. Baca daftar.

   - Isian **Cari barang** mencari SKU dan nama barang.
   - Filter **Kategori**: ketik untuk mencari, lalu pilih kategori aktif (ditulis kode dan nama). Bila kosong, tampil **Semua kategori**. Filter **Status** berisi **Semua status**, **Aktif** dan **Nonaktif**. Klik **Filter** (atau tekan Enter di kotak cari) untuk menerapkan pilihan. Klik **Hapus pilihan: Kategori** untuk mengosongkan kategori.
   - Kolom: **SKU**, **Nama**, **Kategori**, **Satuan** (nama dan simbol), **Harga Jual**, **Status** (lencana **Aktif** atau **Nonaktif**) dan **Aksi**. **SKU** dan **Nama** bisa diurutkan, dan barang terbaru tampil paling atas.
   - Harga pokok dan stok minimum tidak ada di daftar. Keduanya terlihat di rincian dan di form ubah.
   - Tombol **Ekspor** (pemegang `inventory.export`) menawarkan **Ekspor CSV** dan **Ekspor PDF** dari pencarian dan filter yang berlaku. Kolomnya SKU, Nama, Kategori, Satuan (simbol), Harga Jual, Harga Pokok, Stok Minimum dan Aktif (`Ya` atau `Tidak`). Satu file memuat paling banyak 5000 baris, batas yang sama untuk semua ekspor di bab ini.
   - Tombol **Buat Barang** tampil bagi pemegang `inventory.create`.
   - Baris punya tautan nama barang, tombol **Ubah**, dan menu **Aksi lainnya** berisi **Lihat detail** dan **Hapus**.
   - Bila tidak ada baris yang cocok, daftar menulis **Tidak ada barang yang cocok** dengan tombol **Reset filter**. Bila belum ada barang sama sekali, daftar menulis **Tidak ada data.** dengan keterangan **Barang yang dibuat muncul di sini, lengkap dengan kategori dan satuannya.** dan tombol **Buat Barang**.

   ![Daftar Barang dengan pencarian Cari barang, filter Kategori dan Status, serta kolom SKU sampai Aksi](~/assets/guide/web/products.webp)

3. Klik nama barang, atau pilih **Lihat detail** di menu **Aksi lainnya**, untuk membuka rincian barang. Halaman ini punya tombol **Kembali** dan **Ubah**, dan lencana **Aktif** atau **Nonaktif**.

   - Kartu **Rincian Barang** memuat **Kategori**, **Satuan**, **Harga Jual**, **Harga Pokok**, **Stok Minimum**, **Lacak Stok** dan **Deskripsi**.
   - Kartu **Stok per Lokasi** memuat kolom **Lokasi**, **Jalur**, **Jumlah**, **Dicadangkan** dan **Tersedia**. Barang yang belum pernah terkena operasi stok di suatu lokasi menampilkan **Belum ada stok barang ini di lokasi mana pun. Catat penerimaannya di halaman Stok.**
   - Kartu **Mutasi Terbaru** memuat 20 mutasi stok terakhir barang itu, yang terbaru di atas, dengan kolom **Jenis** (lencana seperti **Masuk**, **Keluar**, **Penyesuaian**), **Jumlah**, **Saldo**, **Catatan** dan **Waktu**. Barang tanpa mutasi menampilkan **Belum ada mutasi stok untuk barang ini.** Tautan **Lihat semua mutasi** di bawahnya membuka Mutasi Stok yang disaring ke barang itu ([bagian 6.7](/docs/guides/web/inventory/stock-movements/)).

   ![Halaman detail barang yang digulir ke kartu Mutasi Terbaru, dengan tabel mutasi stok barang itu](~/assets/guide/web/products-show.webp)

Tombol **Ubah** dan **Hapus** tampil untuk semua orang yang bisa melihat daftar, dan server menolak aksi dari pengguna tanpa izin yang sesuai dengan halaman **Akses ditolak** (galat 403). Cara kerja tombol dan dialog hapus ada di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).

## Membuat barang

Siapkan dulu satuan ([bagian 6.4](/docs/guides/web/inventory/units/)) dan kategori ([bagian 6.3](/docs/guides/web/inventory/categories/)). Satuan barang tidak dipilih sendiri karena mengikuti kategori.

1. Klik **Buat Barang**.
2. Isi form pada kartu **Data Barang**:
   - Isian **SKU** opsional. Kosongkan agar sistem membuat kode berurutan, bawaannya berawalan `PRD-` diikuti angka lima digit, dan perkiraan kode berikutnya tampil di isian sebagai contoh. Isi sendiri bila Anda punya kode sendiri: maksimal 100 karakter dan belum dipakai barang lain di perusahaan ini. Contoh: `PTC-SC-3M`.
   - Isi **Nama**. Isian ini wajib, maksimal 255 karakter. Contoh: `Patch Cord SC/APC 3m`.
   - Pilih **Kategori**: ketik untuk mencari, lalu pilih kategori aktif. Isian ini wajib. Setiap pilihan menampilkan satuannya.
   - **Satuan** tidak bisa diisi. Isian ini menampilkan satuan kategori yang Anda pilih, misalnya `meter (m)`, atau `Pilih kategori dulu` sebelum ada pilihan.
   - **Harga Jual** dan **Harga Pokok** opsional. Keduanya menerima angka 0 atau lebih dengan dua desimal.
   - **Stok Minimum** opsional dan menerima angka 0 atau lebih. Isian kosong disimpan sebagai `0`. Nilai ini menjadi batas filter stok rendah di Stok ([bagian 6.5](/docs/guides/web/inventory/stock/)).
   - Saklar **Lacak stok** menyala secara awal. Nilainya hanya disimpan dan ditampilkan di rincian (**Lacak Stok**), dan tidak ada aturan stok yang membacanya.
   - Saklar **Aktif** menyala secara awal.
   - Isian **Deskripsi** opsional dan menerima teks bebas.
3. Klik **Simpan**, atau **Batal** untuk kembali ke daftar. Setelah **Simpan**, Anda kembali ke daftar dan muncul toast `Barang berhasil dibuat.`

Bila admin mematikan **Izinkan input kode manual** untuk **Barang (SKU)** di Penomoran ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)), isian **SKU** terkunci dan hanya menampilkan perkiraan kode dengan keterangan **Dibuat otomatis saat disimpan, perkiraan:** diikuti kodenya.

Form tidak punya isian jenis barang. Barang yang Anda buat di sini selalu bertipe habis pakai (`consumable`). Server mengenal juga tipe aset serial (dipasang per unit lewat SPK dengan memilih aset jaringan, [bagian 3.3](/docs/guides/web/operations/work-orders/) dan [5.2](/docs/guides/web/network/network-assets/)) dan layanan, tetapi layar tidak menawarkannya dan tidak menampilkan jenis barang.

## Mengubah barang

1. Di daftar, klik **Ubah**, atau buka rincian barang lalu klik **Ubah**.
2. Ubah isian di halaman **Ubah Barang**. Aturannya sama dengan form buat, kecuali **SKU**: isian ini wajib terisi dan boleh diganti selama kode manual diizinkan. Bila terkunci, isian menampilkan `Dibuat otomatis dan tidak dapat diubah.`
3. Klik **Simpan**, atau **Batal** untuk membuang perubahan. Setelah **Simpan**, Anda kembali ke daftar dan muncul toast `Barang berhasil diubah.`

Mengganti **Kategori** ikut mengganti **Satuan** barang mengikuti satuan kategori baru. Jumlah stok tidak dikonversi.

## Menonaktifkan, menghapus permanen, dan memulihkan barang

1. Untuk berhenti memakai barang, buka menu **Aksi lainnya** di baris barang dan pilih **Nonaktifkan** (atau matikan saklar **Aktif** lewat **Ubah**). Toast `Barang dinonaktifkan.` muncul. Barang tetap ada di daftar dengan lencana **Nonaktif**, dan tidak lagi muncul di pilihan **Barang** pada halaman Stok dan Mutasi Stok. **Aktifkan** memakainya lagi.
2. **Hapus permanen** hanya ada bila tidak ada data lain yang pernah memakai barang itu: mutasi stok, permintaan barang, retur material, penyesuaian stok, item SPK, aset jaringan, atau item tagihan. Konfirmasi di dialog **Hapus permanen &lt;nama barang&gt;?** Muncul toast `Barang dihapus permanen.`
3. Barang yang belum pernah dipakai tetapi stok di salah satu lokasi masih lebih dari 0 tidak bisa dihapus permanen. Dialog tetap terbuka dan menulis "Barang masih punya stok." Kosongkan stok lewat penyesuaian ([bagian 6.5](/docs/guides/web/inventory/stock/)), atau cukup nonaktifkan barang.
4. Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. Baris yang dihapus punya **Pulihkan**.

Barang yang dihapus permanen tidak bisa dipulihkan. SKU barang nonaktif atau yang dihapus (**Dihapus**) tetap terpakai, jadi barang baru tidak bisa memakai SKU yang sama.

## Kesalahan umum

- SKU ditolak dengan pesan `SKU sudah digunakan.`: SKU harus unik per perusahaan, termasuk SKU barang yang sudah dihapus. Pakai SKU lain, atau kosongkan isian agar sistem membuat kode.
- Kategori yang dicari tidak ada di pilihan: hanya kategori **Aktif** yang tampil. Aktifkan kategorinya di menu Kategori ([bagian 6.3](/docs/guides/web/inventory/categories/)).
- Isian **Satuan** tidak bisa diketik: satuan mengikuti kategori. Pilih kategori lain, atau ubah satuan kategorinya ([bagian 6.3](/docs/guides/web/inventory/categories/)).
- Barang tidak ada di pilihan **Barang** pada Stok: saklar **Aktif** barang mati.
- **Hapus permanen** tidak ada di menu barang: barang sudah dipakai data lain (mutasi stok, permintaan barang, retur material, penyesuaian stok, item SPK, aset jaringan, atau item tagihan) dan angkanya tampil di dialog **Nonaktifkan**. Pakai **Nonaktifkan**. Barang yang belum pernah dipakai tetapi masih punya stok di satu lokasi menolak **Hapus permanen** dengan "Barang masih punya stok." Cek kartu **Stok per Lokasi** di rincian.
- Staf atau manajer memilih **Hapus** dan muncul halaman **Akses ditolak** (galat 403): pada peran bawaan, izin `inventory.delete` hanya dipegang admin. Minta admin perusahaan menambahkannya ke peran di menu Peran ([bagian 8.6](/docs/guides/web/administration/roles/)), atau memberi Anda peran yang memegangnya ([bagian 8.7](/docs/guides/web/administration/permissions/)).
- Tombol **Ekspor** tidak ada: staf tidak memegang `inventory.export`.
