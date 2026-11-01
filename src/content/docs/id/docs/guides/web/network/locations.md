---
title: "5.1 Lokasi"
description: "Lokasi adalah daftar tempat fisik jaringan dalam satu pohon: wilayah, area, POP, rak, dan site."
---

Lokasi adalah daftar tempat fisik jaringan dalam satu pohon: wilayah, area, POP, rak, dan site. Aset jaringan, stok, VLAN, dan prefiks IP memilih lokasinya dari daftar ini, jadi isi pohon ini lebih dulu. Buka menu ini untuk menambah, memperbaiki, memindahkan, atau menghapus lokasi.

Peran yang dapat memakai: admin (semua tindakan), manajer (tambah, ubah, dan pindah, tanpa hapus), staf (hanya melihat). Izin: `location.view` untuk membuka menu, `location.create` untuk **Buat Lokasi**, `location.update` untuk **Ubah**, `location.move` untuk **Pindahkan**, `location.delete` untuk **Hapus**. Daftar dan kode lokasi berlaku per perusahaan aktif ([bagian 1.6](/docs/guides/web/introduction/switch-company/)).

Perusahaan yang dibuat dengan **Katalog awal** memulai dengan tiga lokasi yang bertingkat: wilayah **Wilayah Utama** (kode `REG-01`), area **Area Utama** (`AREA-01`), dan POP **POP Utama** (`POP-01`). Ubah namanya lewat **Ubah** dan tambahkan POP lain sesuai jaringan Anda. Perusahaan yang dibuat sebelum perubahan ini tetap memakai nama lamanya (`Default Region`, `Default Area`, `Default POP`) sampai Anda mengubahnya.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Jaringan**, lalu klik **Lokasi**.
2. Halaman terbuka di tab **Peta**. Bila belum ada satu pun lokasi yang punya koordinat, halaman terbuka di tab **Tabel**, karena peta yang kosong tidak menunjukkan apa-apa. Setiap lokasi yang punya koordinat tampil sebagai penanda. Kotak di kiri atas peta menyaring penanda: ketik sebagian kode atau nama di kotak pencarian, lalu pilih tipe (**Semua tipe**, Wilayah, Area, POP, Rak, atau Site) dan status (**Semua status**, Aktif, atau Nonaktif) dari dua pilihan di bawahnya. Lokasi **Nonaktif** memakai warna penanda yang berbeda.

   Di kotak yang sama ada jumlah lokasi yang tampil, misalnya `3 lokasi`, dan tombol **Tampilkan semua**, yang memusatkan peta ke semua penanda yang lolos saringan. **Legenda** di kiri bawah menjelaskan bentuk penanda tiap tipe dan penanda **Nonaktif**. Klik tombolnya untuk menyembunyikan atau menampilkan daftar itu. Tombol zoom ada di kanan bawah.

   Bila ada lokasi yang belum punya koordinat, satu baris di atas tab menulis `{n} lokasi belum punya koordinat. Titik muncul di peta setelah lintang dan bujurnya diisi.` Angka itu menghitung semua lokasi di pohon yang lintang atau bujurnya kosong.

   ![Tab Peta pada menu Lokasi dengan kotak cari, pilihan tipe dan status, jumlah lokasi, tombol Tampilkan semua, dan Legenda](~/assets/guide/web/locations.webp)

3. Klik sebuah penanda untuk membuka kartunya. Kartu memuat kode, nama, tipe, lencana **Nonaktif** (bila lokasinya nonaktif), dan koordinat, serta tombol **Ubah** dan **Hapus** sesuai izin Anda.
4. Klik tab **Tabel** untuk melihat semua lokasi, termasuk yang tanpa koordinat. Kolomnya **Kode**, **Nama**, **Tipe**, **Jalur**, **Status**, **Koordinat**, dan **Aksi**. Tipe dan status tampil sebagai lencana. Kolom **Aksi** berisi tombol **Pindahkan** dan **Ubah**, serta menu **Aksi lainnya** untuk **Nonaktifkan** dan **Hapus permanen** (bagian-bagian berikut).

   Kotak **Cari** (petunjuk `Kode, nama, jalur, atau alamat`) mencari di kode, nama, jalur, dan alamat, sedangkan **Tipe** dan **Status** menyaring daftar. Urutan bawaan mengikuti **Jalur**, jadi lokasi anak berada di dekat induknya. Pencarian, urutan, dan halaman bekerja seperti di layar lain ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/)). Daftar yang kosong menampilkan `Belum ada lokasi`, dan saringan yang tidak menemukan apa pun menampilkan `Tidak ada lokasi yang cocok` dengan tombol **Reset filter**.

   ![Tab Tabel pada menu Lokasi dengan kotak Cari, filter Tipe dan Status, serta kolom Kode sampai Aksi](~/assets/guide/web/locations-table.webp)

## Menambah lokasi

1. Klik **Buat Lokasi** di kanan atas halaman.
   - Cara lain: di tab **Peta**, klik titik kosong. Pin sementara muncul dan bisa digeser. Kartu pin berjudul `Buat lokasi baru di sini`. Pilih **Tambah POP** atau **Tambah Site** di kartu itu, dan dialog terbuka dengan **Tipe**, **Lintang**, dan **Bujur** sudah terisi. **Batal** di kartu pin membuang pin.
2. Isi form di dialog **Buat Lokasi**:
   - **Kode**: wajib, maksimal 50 karakter, unik di perusahaan, dan tanpa tanda `>` (tanda ini memisahkan tingkat di Jalur).
   - **Nama**: wajib, maksimal 255 karakter.
   - **Tipe**: wajib. Pilihannya Wilayah, Area, POP, Rak, dan Site. Isian awalnya POP.
   - **Induk**: induk lokasi. Ketik untuk mencari kode atau jalur, lalu pilih lokasi yang tipenya diizinkan sebagai induk (aturan di bawah). Pilihan memuat semua lokasi perusahaan. Untuk Wilayah biarkan kosong, sesuai petunjuk `Kosongkan untuk lokasi bertipe Wilayah.`
   - **Alamat**: opsional.
   - **Lintang** dan **Bujur**: opsional, tetapi isi keduanya atau kosongkan keduanya. Lintang -90 sampai 90, bujur -180 sampai 180. Ketik angkanya, atau pakai peta di bawah kedua isian itu.
   - **Peta** (petunjuk "Klik peta atau seret penanda untuk mengatur koordinat."): klik peta atau seret penanda, dan **Lintang** serta **Bujur** terisi sendiri. Tombol **Gunakan lokasi saya** memakai lokasi perangkat Anda. Tanpa koordinat, penanda berdiri di pusat peta bawaan dan belum mengisi apa pun sampai Anda mengklik peta atau menggeser penanda. Dialog memuat peta, jadi layar yang pendek menggulir di dalam dialog.
3. Klik **Simpan**. Toast "Lokasi dibuat." muncul dan lokasi tampil di daftar. Lokasi yang punya koordinat juga tampil di peta. Klik **Batal** untuk menutup dialog tanpa menyimpan.

   ![Dialog Buat Lokasi dengan isian Kode, Nama, Tipe, Induk, Alamat, Lintang, Bujur, dan peta untuk menandai koordinat](~/assets/guide/web/locations-create.webp)

Setiap tipe punya induk tertentu:

- Wilayah: tanpa induk.
- Area: induknya Wilayah.
- POP: induknya Area.
- Rak: induknya POP.
- Site: induknya Rak, POP, atau Area. Perusahaan kecil yang tidak memakai rak boleh menaruh site langsung di bawah POP atau Area.

**Jalur** terbentuk dari jalur induk, tanda ` > `, dan kode lokasi, misalnya `REG-01 > AREA-01 > POP-01`.

## Mengubah lokasi

1. Di tab **Tabel**, klik **Ubah** pada baris lokasi. Dari tab **Peta**, klik penanda, lalu klik **Ubah** di kartunya.
2. Ubah isian di dialog **Ubah** yang memuat kode lokasi di judulnya. Isiannya sama dengan dialog tambah. Dialog tidak punya isian untuk mengubah status **Aktif** atau **Nonaktif**: gunakan **Nonaktifkan** atau **Aktifkan** di menu **Aksi lainnya** (lihat di bawah).
   - Mengubah **Kode** atau **Induk** memperbarui **Jalur** lokasi itu dan semua lokasi di bawahnya.
   - Mengubah **Tipe** hanya diterima bila semua sub-lokasi masih cocok dengan tipe baru.
   - Bila **Lintang** atau **Bujur** berubah, kotak **Koordinat berubah** menampilkan nilai **Lama** dan **Baru**, dan tombol simpan menjadi **Simpan dan konfirmasi koordinat**.
3. Klik **Simpan**. Toast "Lokasi diperbarui." muncul.

## Memindahkan lokasi

1. Di tab **Tabel**, klik **Pindahkan** pada baris lokasi. Tombol ini tidak ada di kartu penanda.
2. Di dialog **Pindahkan** yang memuat kode lokasi di judulnya, pilih **Induk baru**. Isian ini wajib: ketik untuk mencari kode atau jalur, lalu pilih. Tombol **Pindahkan** baru aktif setelah Anda memilih.
3. Klik **Pindahkan**. Toast "Lokasi dipindahkan." muncul, dan **Jalur** lokasi serta semua lokasi di bawahnya ikut berubah.

Induk baru harus bertipe yang diizinkan untuk lokasi itu (daftarnya ada di bagian "Menambah lokasi"), sama seperti saat menambah. Lokasi bertipe Wilayah tidak bisa dipindah. Sistem juga menolak memindahkan lokasi ke bawah dirinya sendiri atau turunannya dengan pesan "Lokasi tidak dapat dipindahkan ke bawah dirinya sendiri." di bawah **Induk baru**.

## Menonaktifkan, menghapus permanen, dan memulihkan lokasi

1. Di tab **Tabel**, buka **Aksi lainnya** pada baris lokasi. Isinya **Nonaktifkan** (atau **Aktifkan**) dengan `location.update`, dan **Hapus permanen** dengan `location.delete`. Dialog **Nonaktifkan** menulis apa saja yang memakai lokasi itu, misalnya "dipakai 2 lokasi turunan, 3 aset jaringan, 1 stok". Lokasi nonaktif tidak muncul di pilihan lokasi baru, dan semua data yang memakainya tetap utuh.
2. **Hapus permanen** hanya ada bila tidak ada data lain yang pernah menunjuk ke lokasi itu: lokasi turunan, pelanggan, langganan, stok, mutasi stok, permintaan barang, retur material, penyesuaian stok, VLAN, prefiks IP, aset jaringan, riwayat pemasangan, SPK, tiket, pengumuman, atau banner promo, termasuk yang sudah dihapus. Dialog `Hapus permanen <kode>?` menyatakan penghapusan tidak bisa dibatalkan. Toast "Lokasi dihapus permanen." muncul bila berhasil.
3. Di tab **Peta**, tombol **Hapus** pada kartu penanda membuka dialog `Hapus permanen <kode>?` yang sama. Dialog itu menulis alasan penolakan dalam teks merah, misalnya "Lokasi masih dipakai 1 lokasi turunan. Nonaktifkan saja." Lokasi yang sudah dipakai dinonaktifkan dari tab **Tabel**.
4. Filter **Status** di tab **Tabel** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. Baris lokasi yang dihapus punya **Pulihkan**. Lokasi turunan tidak bisa dipulihkan selama induknya masih dihapus ("Lokasi tidak bisa dipulihkan karena induknya, `<nama>`, masih dihapus. Pulihkan induknya dulu."). Lokasi yang dipulihkan menghitung ulang **Jalur** dari induknya yang sekarang.

Lokasi yang dihapus permanen tidak bisa dikembalikan. Kode lokasi yang dihapus tidak permanen (**Dihapus**) atau yang nonaktif tetap terpesan dan tidak bisa dipakai lokasi lain.

## Kesalahan umum

- "Induk lokasi wajib diisi untuk lokasi selain Wilayah." muncul di **Induk** saat menambah lokasi bila **Tipe** masih POP (isian awal) dan **Induk** kosong. Pilih induk, atau ganti **Tipe** ke Wilayah bila ini lokasi puncak.
- "Lokasi POP harus punya induk Area." berarti induk salah tipe. Ganti **Induk** dengan lokasi bertipe yang diminta pesan. Pesan memuat nama tipe lokasi dan tipe induk yang boleh, misalnya "Lokasi Site harus punya induk Rak, POP atau Area."
- "Lokasi Wilayah tidak boleh punya induk." berarti **Tipe** Wilayah tetapi **Induk** terisi. Kosongkan **Induk**.
- "Lintang dan bujur harus diisi bersamaan." berarti hanya satu koordinat yang terisi. Isi keduanya atau kosongkan keduanya.
- "kode sudah digunakan." berarti kode itu dipakai lokasi lain di perusahaan, termasuk lokasi yang sudah dihapus. `Kode tidak boleh memuat tanda ">".` berarti kode memuat tanda `>`. Pakai kode lain.
- Perubahan **Tipe** ditolak dengan `Lokasi <tipe> tidak dapat punya induk <tipe baru>.` bila ada sub-lokasi yang tidak cocok dengan tipe baru. Pindahkan atau hapus sub-lokasi itu lebih dulu.
- Peta kosong atau penanda kurang: lokasi tanpa koordinat tidak punya penanda, jadi cari di tab **Tabel**. Isian **Cari**, **Tipe**, dan **Status** di tab **Tabel** juga ikut menyaring peta, jadi kosongkan isian itu (**Reset filter**). Pilihan tipe dan status di kotak peta hanya menyaring penanda.
- "Lapisan peta tidak dapat dimuat" berarti peta dasar OpenStreetMap tidak bisa diakses dari browser Anda. Klik **Coba lagi**. Penanda dan tab **Tabel** tetap bisa dipakai.
