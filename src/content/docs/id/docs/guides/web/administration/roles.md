---
title: "8.6 Peran"
description: "Menu ini mengelola peran perusahaan Anda: kumpulan izin yang diberikan ke pengguna."
---

Menu ini mengelola peran perusahaan Anda: kumpulan izin yang diberikan ke pengguna. Buka saat perusahaan butuh jabatan baru, saat tugas sebuah jabatan berubah, atau saat Anda perlu tahu hak akses apa yang dipegang sebuah peran sebelum memberikannya.

Peran yang dapat memakai: pemegang `roles.manage` (daftar, detail, buat, ubah, dan hapus), yaitu Admin pada templat bawaan, dan `roles.export` (tombol **Ekspor**). Peran milik perusahaan: nama dan isinya hanya berlaku di perusahaan yang sedang aktif. Perusahaan induk dan tiap anak perusahaan mempunyai peran sendiri, dan satu pengguna dapat memegang peran berbeda di tiap perusahaan. Izin berasal dari satu katalog tetap ([bagian 8.7](/docs/guides/web/administration/permissions/)): Anda menyusun peran dari katalog itu dan tidak dapat membuat izin baru. Operator platform tidak mengubah peran Anda dalam keadaan biasa. Mereka hanya memperbaiki peran atas permintaan, dan perbaikan itu tercatat di log audit Anda.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Administrasi**, lalu klik **Peran**.
2. Baca layar:
   - Subjudul berbunyi "Kumpulan hak akses yang diberikan ke pengguna lewat peran. Peran ini hanya berlaku di perusahaan ini."
   - **Cari** (petunjuk "Nama peran") mencari di nama peran.
   - Kolom: **Nama** (bisa diurutkan; tautan ke halaman detail), **Templat** (lencana "Dari templat" diikuti nama templat untuk peran salinan, atau "Dibuat sendiri"), **Hak akses** (jumlah izin), **Pengguna** (jumlah pengguna ber-peran itu di perusahaan yang sedang aktif) dan **Aksi**.
   - **Aksi** berisi tombol **Ubah** dan **Hapus**. Bila peran memuat izin yang tidak Anda pegang, tombol **Ubah** berganti menjadi **Lihat** dan **Hapus** tidak tampil. Peran akun pelanggan tidak punya **Hapus**.
   - Tombol **Buat peran** dan tombol **Ekspor** (**Ekspor CSV** dan **Ekspor PDF**; kolom Nama, Hak akses, Pengguna, Guard) tampil di kanan atas, masing-masing bila Anda boleh membuat peran atau memegang `roles.export`.
   - Bila tidak ada baris, layar menulis "Belum ada peran" dengan tombol **Buat peran**.

   ![Daftar Peran dengan kotak Cari, kolom Nama, Templat, Hak akses, Pengguna dan Aksi, serta tombol Buat peran dan Ekspor](~/assets/guide/web/roles.webp)

3. Perusahaan baru mendapat delapan peran dari templat platform:

   | Peran | Fungsi |
   |---|---|
   | Admin | Administrator penuh dan jalan darurat. Memegang semua izin, kecuali izin yang hanya untuk aplikasi teknisi dan pelanggan, dan selalu memegang `roles.manage` dan akses web |
   | Manajer | Pengendali: menyetujui permintaan barang, SPK dan penyesuaian stok, membatalkan tagihan, membatalkan pembayaran, menutup dan membuka kembali tiket, melihat laporan |
   | NOC & Layanan Pelanggan | Mendaftarkan pelanggan, menerima keluhan dan mengelola tiket (termasuk membuka kembali tiket yang sudah selesai atau ditutup), mengumumkan gangguan, melihat dan menelusuri jaringan, sinkron ulang RADIUS, blokir internet manual. Tanpa hapus, tanpa tulis tagihan, tanpa kelola pengguna dan peran |
   | Teknisi | Pekerjaan lapangan, di aplikasi teknisi |
   | Gudang | Menyiapkan dan menyerahkan barang, mengelola stok masuk, keluar dan pindah |
   | Keuangan | Membuat dan mengirim tagihan, mencatat dan membatalkan pembayaran, laporan keuangan. Tanpa pembatalan tagihan |
   | Staf | Operator: mencatat pelanggan, membuat SPK, tiket dan tagihan, menjalankan stok masuk dan keluar |
   | Pelanggan | Tiket, evaluasi dan portal tagihan, di aplikasi pelanggan |

   Perusahaan yang sudah ada sebelum peran per perusahaan mendapat salinan lima peran lama dengan nama berbahasa Indonesia (Admin, Manajer, Staf, Teknisi, Pelanggan), ditambah NOC & Layanan Pelanggan, Gudang dan Keuangan tanpa pemegang. Isi salinan itu sama persis dengan sebelumnya, jadi akses siapa pun tidak berubah; Staf lama masih memegang izin mendaftarkan pelanggan. Setelah disalin, semuanya milik perusahaan Anda, dan pembaruan sistem tidak mengubahnya.

## Membaca detail peran

1. Di daftar, klik nama peran, atau **Lihat** bila peran itu tidak boleh Anda ubah. Judul halaman berbunyi "Peran" diikuti nama peran, dengan subjudul "Hak akses yang dipegang peran ini. Berikan peran ke pengguna di menu Pengguna." **Kembali** membuka daftar, dan **Ubah** tampil bila Anda boleh mengubah peran itu.
2. Kartu **Ringkasan** memuat **Nama**, **Hak akses** (jumlah izin peran) dan **Pengguna di perusahaan ini**, disusul keterangan "Peran ini hanya berlaku di perusahaan ini."
3. Kartu **Hak akses peran** mengelompokkan izin peran per kategori, dengan nama Indonesia (daftar kodenya ada di [bagian 8.7](/docs/guides/web/administration/permissions/)) dan lencana jumlah izin di tiap kategori. Setiap izin tampil sebagai kalimat Indonesia, misalnya `billing.payment.record` sebagai "Catat pembayaran". Arahkan kursor ke kalimat itu untuk melihat kode lengkapnya. Peran tanpa izin menampilkan "Peran ini belum memegang hak akses apa pun. Pengguna yang hanya memegang peran ini tidak bisa membuka menu apa pun."

   ![Detail Peran dengan kartu Ringkasan dan kartu Hak akses peran yang mengelompokkan izin per kategori](~/assets/guide/web/roles-show.webp)

Bila peran memuat izin yang tidak Anda pegang, alert menulis "Anda hanya bisa melihat peran ini, karena ia memuat hak akses yang tidak Anda pegang. Hanya pemegang semua hak akses itu yang bisa mengubahnya." Alert "Peran ini tidak bisa dihapus: setiap akun pelanggan baru mendapatkannya." muncul pada peran Pelanggan.

## Membuat peran

1. Klik **Buat peran**. Halaman berjudul "Buat peran" dengan subjudul "Kumpulkan hak akses menjadi satu peran, lalu berikan ke pengguna lewat menu Pengguna."
2. Bila perlu, pilih **Mulai dari templat**. Isian ini opsional dan mengisi **Nama** (bila masih kosong) serta hak akses dari salah satu templat platform. Keduanya masih bisa Anda ubah. Di bawahnya layar menulis "{n} hak akses dari templat {nama} dimuat.", atau "{n} hak akses tidak Anda miliki dan dilewati." bila templat memuat izin yang tidak Anda pegang.
3. Isi **Nama**: wajib, unik di perusahaan ini, paling banyak 255 karakter. Nama yang sudah dipakai ditolak dengan "nama sudah digunakan."
4. Pilih hak akses di pemilih izin. Gunakan **Cari hak akses** untuk mencari kode atau label, klik nama kategori di kiri untuk membuka izin kategori itu, dan centang kotak kategori untuk memilih atau mengosongkan semua izin yang tampil. Izin yang tidak Anda pegang tidak bisa dicentang dan diberi keterangan "Anda tidak memegang hak akses ini".
5. Klik **Buat peran**. Anda kembali ke daftar dan toast "Peran dibuat." muncul. **Batal** kembali ke daftar tanpa menyimpan.

Dua keterangan muncul di bawah pemilih izin: "Pemegang peran ini dapat mengubah semua peran perusahaan." bila peran memuat `roles.manage`, dan "Peran akun pelanggan: berlaku di aplikasi Pelanggan." bila memuat `portal.access`.

## Mengubah peran

1. Di daftar, klik **Ubah** pada baris peran, atau **Ubah** di halaman detail. Judul halaman berbunyi "Ubah peran" diikuti nama peran, dengan subjudul jumlah pengguna di perusahaan ini yang memegang peran itu. Peran salinan menulis "Dibuat dari templat {nama}. Perubahan templat tidak mengubah peran ini."
2. Ubah **Nama** dan hak akses, lalu klik **Simpan peran**. Toast "Peran diperbarui." muncul.

Perubahan langsung berlaku bagi semua pemegang peran itu di perusahaan ini. Mengganti nama peran tidak merusak fitur apa pun, karena Inbils memeriksa izin, bukan nama peran. Bila orang lain sudah menyimpan perubahan pada peran yang sama, peringatan "Muat ulang halaman untuk melihat data terbaru, lalu ulangi perubahan Anda." muncul dengan tombol **Muat ulang**. Anda tidak bisa menambah izin yang tidak Anda pegang, dan tidak bisa mengubah peran yang memuat izin yang tidak Anda pegang.

## Menghapus peran

1. Di daftar, klik **Hapus** pada baris peran. Dialog berjudul "Hapus peran" diikuti nama peran dan tanda tanya.
2. Bila tidak ada pengguna yang memegang peran itu, dialog menulis "Tidak ada pengguna yang memegang peran ini. Penghapusan tidak bisa dibatalkan."
3. Bila ada, dialog menulis berapa pengguna memegangnya dan meminta Anda memilih peran tujuan di **Pindahkan {n} pengguna ke** (kotak cari "Cari peran tujuan"). Pengguna itu mendapat peran tujuan dan kehilangan peran yang dihapus. Tombol **Hapus peran** baru aktif setelah tujuan dipilih. Server menolak tujuan yang memuat izin yang tidak Anda pegang, dan tumpukan peran pengguna yang melanggar pemisahan tugas.
4. Klik **Hapus peran**. Toast "Peran dihapus." muncul. **Batal** menutup dialog.

Peran Pelanggan, yang disalin dari templat Pelanggan, tidak bisa dihapus karena setiap akun pelanggan baru mendapatkannya. Bila server menolak, alasannya tampil di dalam dialog atau di bawah pilihan tujuan, misalnya "Peran ini dipakai untuk akun pelanggan baru." atau "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage."

## Aturan penjaga

Aturan ini berlaku saat Anda membuat, mengubah, atau menghapus peran, dan saat Anda memberi peran ke pengguna ([bagian 8.5](/docs/guides/web/administration/users/)):

- **Hanya yang Anda pegang.** Anda memberi hak akses ke sebuah peran hanya bila Anda memegangnya sendiri. Pesannya "Anda tidak dapat memberi hak akses yang tidak Anda miliki:" diikuti daftar hak akses. Izin penanda audiens (akses aplikasi teknisi, dapat dinilai di Evaluasi, akun pelanggan) tidak dibatasi aturan ini.
- **Jangan mengubah yang lebih berkuasa.** Anda hanya bisa mengubah atau menghapus peran yang semua izinnya Anda pegang.
- **Minimal satu admin.** Perusahaan harus tetap punya minimal satu pengguna aktif yang memegang `roles.manage` dan akses web. Melepas izin itu dari peran terakhir yang memuatnya, menghapus peran itu, atau memindahkan penggunanya ditolak dengan "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage."
- **Pemisahan tugas** (bagian berikut).
- **Peran yang masih dipakai.** Hapus peran hanya setelah memilih peran tujuan bagi penggunanya.
- **Tercatat.** Setiap pembuatan, perubahan, dan penghapusan peran masuk ke Log Audit dengan label **Peran dibuat**, **Peran diubah**, dan **Peran dihapus**, lengkap dengan izin yang ditambah atau dicabut.

## Pemisahan tugas pada peran

Inbils menolak menyimpan peran yang tidak memuat `roles.manage` dan memuat salah satu pasangan izin ini:

- Pengendali permintaan barang (`inventory.request.approve`, `inventory.request.reject`) bersama pelaksana gudang (`inventory.request.prepare`, `inventory.request.issue`, `inventory.stock.receive`, `inventory.stock.issue`, `inventory.stock.transfer`).
- Penyetuju penyesuaian stok (`inventory.stock.adjust.approve`) bersama pengaju atau pelaksana (`inventory.stock.adjust.request`, `inventory.stock.receive`, `inventory.stock.issue`, `inventory.stock.transfer`).
- `inventory.stock.adjust` ("Sesuaikan stok langsung", penyesuaian langsung, jalan darurat) hanya boleh dimuat peran yang juga memuat `roles.manage`.

Peran yang memuat `roles.manage` dikecualikan sebagai jalan darurat. Aturan yang sama berlaku saat Anda memberi beberapa peran ke satu pengguna di menu **Pengguna** ([bagian 8.5](/docs/guides/web/administration/users/)): izin gabungan tidak boleh memuat pasangan di atas.

## Kesalahan umum

- Tombol **Buat peran**, **Ubah** atau **Hapus** tidak ada: Anda tidak boleh membuat peran, atau peran itu memuat izin yang tidak Anda pegang. Minta admin perusahaan yang memegang semua izin itu.
- Peran yang dibutuhkan belum ada di daftar: buat sendiri dengan **Buat peran**, atau mulai dari templat.
- Alert **Peran belum dapat disimpan**: baca pesan di bawah isian dan di dalam alert. Penyebab umum: nama sudah dipakai, pasangan izin yang berbenturan, atau izin yang tidak Anda pegang.
- Peran baru tidak mengubah menu seseorang: peran belum diberikan. Berikan lewat menu **Pengguna** ([bagian 8.5](/docs/guides/web/administration/users/)).
- Pengguna tidak melihat menu setelah izin dicabut dari perannya: itu perilaku normal. Menu mengikuti izin, bukan nama peran.
- Perusahaan lama tidak punya templat yang baru, atau salah satu perannya terhapus: tambahkan dengan **Mulai dari templat** di **Buat peran**. Admin yang kehilangan semua peran admin dapat diperbaiki operator platform (**Panduan Panel Operator Inbils**).
- Izin baru yang dirilis sesudah perusahaan Anda dibuat masuk ke peran yang disalin dari templat tertentu, bukan ke semua peran. Contohnya `ticket.reopen` ("Buka kembali tiket"): izin itu masuk ke peran salinan Manajer dan NOC & Layanan Pelanggan, juga yang sudah Anda ganti namanya. Peran buatan sendiri tidak menerimanya. Tombol **Buka kembali** di halaman tiket tidak tampil untuk peran itu sampai Admin menambahkan izinnya lewat **Ubah** di menu Peran.
- Halaman detail menolak dengan **Akses ditolak** (403): Anda tidak memegang `roles.manage`.
- Tombol **Ekspor** tidak ada: Anda tidak memegang `roles.export`.
