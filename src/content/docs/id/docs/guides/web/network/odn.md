---
title: "5.5 ODN"
description: "ODN adalah register pasif jaringan serat optik: port PON pada OLT, splitter pada ODC dan ODP, dan port drop yang dipakai tiap langganan."
---

ODN adalah register pasif jaringan serat optik: port PON pada OLT, splitter pada ODC dan ODP, dan port drop yang dipakai tiap langganan. Register hanya mencatat dan tidak menghubungi perangkat. Buka menu ini untuk melihat seberapa penuh tiap ODP, siapa berada di belakang tiap port PON, dan langganan aktif mana yang belum punya port drop.

OLT, ODC, dan ODP sendiri didaftarkan di **Aset Jaringan** ([bagian 5.2](/docs/guides/web/network/network-assets/)), dengan **Tipe aset** OLT, ODC, atau ODP.

Panel perangkat ([bagian 5.6](/docs/guides/web/network/device-panel/)) menggambar OLT, ODC, dan ODP seperti wajah aslinya dan membuka lembar port dengan tindakan ODN yang sama. Jalur fiber seorang pelanggan juga digambar di sana.

Peran yang dapat memakai: admin dan manajer (semua tindakan), staf (melihat dan mengatur port drop, tanpa mengelola port PON dan splitter). Izin: `odn.view` untuk membuka menu dan halaman ODN, `odn.manage` untuk menambah dan menghapus port PON dan splitter serta menyambung splitter, `odn.assign` untuk mencatat dan melepas port drop. Data berlaku per perusahaan aktif ([bagian 1.6](/docs/guides/web/introduction/switch-company/)).

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Jaringan**, lalu klik **ODN**.
2. Atur daftar dengan tiga saringan di atas tabel: **Cari**, **POP**, dan **ODP minimal terpakai (%)** (isi 0 sampai 100). **Cari** mencari kode dan nama ODP atau OLT, label port PON, atau kode langganan dan nama pelanggan di tab **Langganan tanpa port drop**. **POP**: ketik untuk mencari, lalu pilih, dan tombol **Hapus pilihan** mengosongkannya. Di tab ODP dan **Port PON**, **POP** menyisakan aset yang lokasinya berada di bawah POP itu. Di tab **Langganan tanpa port drop**, saringan ini mencocokkan POP pelayan langganan. **ODP minimal terpakai (%)** hanya berlaku di tab ODP dan menyisakan ODP yang terpakai sebesar itu atau lebih. Saringan baru selalu memulai tiap tab dari halaman pertama. Bila saringan tidak menemukan apa pun, tab menulis "Tidak ada ODP yang cocok" (atau "Tidak ada port PON yang cocok", "Tidak ada langganan yang cocok") dengan tombol **Reset filter**.

   ![Halaman ODN dengan tiga saringan dan tab ODP, Port PON, dan Langganan tanpa port drop, masing-masing dengan jumlah barisnya](~/assets/guide/web/odn.webp)

3. Baca tab **ODP**. Namanya diikuti jumlah ODP dalam kurung. Kolom **ODP** berisi kode ODP, dan klik kode itu untuk membuka halaman ODP. Kolom **Nama** dan **Lokasi** berisi nama ODP dan path lokasinya. Kolom **Kapasitas** menghitung port keluaran semua splitter di ODP itu, dengan lencana **Tanpa splitter** bila ODP belum punya splitter. Kolom **Terpakai** menghitung keluaran yang dipegang langganan atau menyuplai splitter lain. Kolom **Kosong** adalah sisanya, dengan lencana **Penuh** bila habis. Kolom **Pemakaian** menampilkan bilah dan persen pemakaian dengan warna yang sama seperti di Alamat IP.
4. Baca tab **Port PON**. Tiap baris adalah satu port PON milik OLT, ditulis "PON" diikuti nomor dan label bila ada. Kolom **Pelanggan** menghitung langganan di belakang port itu lewat semua tingkat splitter. Klik kode di kolom **OLT** untuk membuka halaman OLT.
5. Baca tab **Langganan tanpa port drop**. Tab ini mendaftar langganan berstatus Aktif yang belum punya port drop, sebagai daftar untuk melengkapi data. Kolomnya **Langganan**, **Pelanggan**, **POP layanan**, dan **Status**. Klik kode di kolom **Langganan** untuk membuka halaman langganan. Langganan berstatus lain tidak tampil. Bila semua langganan aktif sudah punya port drop, tab menulis "Semua langganan aktif punya port drop".

   Bila belum ada ODP sama sekali, tab **ODP** menulis **Belum ada ODP** dengan keterangan "ODP adalah aset jaringan bertipe ODP. Daftarkan satu, lalu tambahkan splitter agar punya port." Pemegang Buat aset jaringan (`network_asset.create`) juga melihat tombol **Daftarkan ODP**. Tombol itu membuka form **Buat Aset Jaringan** dengan **Tipe aset** sudah berisi ODP ([bagian 5.2](/docs/guides/web/network/network-assets/)).

Setiap tab menampilkan 25 baris per halaman, dengan **Sebelumnya** dan **Berikutnya** bila lebih dari satu halaman.

## Membuka halaman OLT, ODC, atau ODP

1. Dari tab **ODP**, klik kode ODP. Dari tab **Port PON**, klik kode OLT.
2. Untuk ODC, atau OLT yang belum punya port PON, buka **Aset Jaringan** ([bagian 5.2](/docs/guides/web/network/network-assets/)), buka aset itu, lalu klik **Port ODN**. Tombol ini muncul untuk aset bertipe OLT, ODC, dan ODP bagi pemegang `odn.view`.
3. Baca halamannya. Judulnya kode aset, dengan nama, tipe, dan path lokasinya di bawahnya. Tombol **ODN** kembali ke daftar, dan **Data aset** membuka aset di Aset Jaringan (butuh `network_asset.view`). Pemegang `odn.manage` juga melihat **Tambah port PON** pada OLT, atau **Tambah splitter** pada ODC dan ODP. ODC atau ODP tanpa splitter menulis "Belum ada splitter di" diikuti jenis asetnya.

   ![Halaman ODP: tombol ODN, Data aset, dan Tambah splitter, serta kartu splitter dengan port keluarannya](~/assets/guide/web/odn-asset.webp)

## Menambah port PON pada OLT

1. Buka halaman OLT, lalu klik **Tambah port PON**.
2. Isi **Jumlah port** di dialog **Tambah port PON ke** diikuti kode OLT: wajib, bilangan bulat 1 sampai 64, isian awal 1. Port baru diberi nomor setelah nomor tertinggi yang sudah ada.
3. Klik **Tambah port**. Toast `<jumlah> port PON dibuat di <kode OLT>.` muncul.

Kartu **Port PON** di halaman OLT berisi kolom **Port PON** (ditulis "PON" diikuti nomor), **Splitter** (**Belum terhubung**, atau "Splitter #" diikuti nomor internal splitter yang tersambung), **Pelanggan**, dan **Aksi** bagi pemegang `odn.manage`. Nomor internal itu tidak sama dengan rasio atau label splitter. Untuk mencari splitternya, buka halaman ODC atau ODP dan cocokkan lewat baris **Masukan** pada kartu splitter.

## Menambah splitter pada ODC atau ODP

1. Buka halaman ODC atau ODP, lalu klik **Tambah splitter**.
2. Isi form di dialog **Tambah splitter ke** diikuti kode aset:
   - **Rasio**: wajib. Pilihannya 1:2, 1:4, 1:8, 1:16, 1:32, dan 1:64, isian awal 1:8. Rasio menentukan jumlah port keluaran yang dibuat.
   - **Port masukan**: opsional. Ketik kode aset, label splitter, atau label port (paling sedikit 2 huruf), lalu pilih. Daftar menampilkan paling banyak 20 port kosong, yaitu port PON OLT atau port keluaran splitter lain di perusahaan ini, ditulis seperti "OLT-1 · PON 3" atau "ODC-2 · 1:4 · keluaran 2". Tombol **Hapus pilihan** mengosongkan isian, dan isian kosong berarti disambung nanti. Bila tidak ada hasil, daftar menulis "Tidak ada port kosong yang cocok."
   - **Label**: opsional, maksimal 100 karakter. Label membantu mengenali splitter pada kartu dan daftar port masukan.
3. Klik **Tambah splitter**. Toast `Splitter 1:<jumlah> ditambahkan ke <kode aset>.` muncul, dan kartu splitter tampil di halaman.

Judul kartu splitter berbunyi "Splitter 1:8", diikuti tanda "-" dan label bila ada. Di bawahnya ada baris **Masukan** dengan port hulu (atau "belum terhubung") dan jumlah keluaran yang terpakai. Pemegang `odn.manage` melihat isian **Port masukan** dengan tombol **Simpan sambungan**, serta tombol **Hapus**. Di bawahnya ada satu kotak per port keluaran. Kotak port bertuliskan **Kosong**, "Menyuplai splitter" diikuti nomor internal splitter hilirnya, atau kode langganan yang memegang port (klik untuk membuka langganan) dengan nama pelanggan dan tombol **Lepas** bagi pemegang `odn.assign`.

## Menyambung atau memutus splitter

1. Di kartu splitter, pilih port di **Port masukan**: ketik untuk mencari, lalu pilih. Isian kosong (**Belum terhubung**) memutus sambungan, dan tombol **Hapus pilihan** mengosongkannya.
2. Klik **Simpan sambungan**. Tombol ini aktif setelah pilihan berubah. Toast "Splitter diperbarui." muncul.

Port hulu harus bebas, yaitu tidak dipegang langganan dan bukan masukan splitter lain. Splitter tidak boleh disambung ke keluarannya sendiri atau ke hilirnya, dan rantai ke atas paling banyak 8 splitter.

## Menghapus port PON atau splitter

1. Untuk port PON, klik **Hapus** pada barisnya di kartu **Port PON**, lalu klik **Hapus port** di dialog **Hapus PON** diikuti nomornya. Tombol ini hanya ada pada port yang **Belum terhubung**. Nomor port lain tidak berubah. Toast "Port PON dihapus." muncul.
2. Untuk splitter, klik **Hapus** di kartunya, lalu klik **Hapus splitter**. Port keluaran ikut terhapus. Toast "Splitter dihapus." muncul.

Penghapusan ini butuh `odn.manage`. Splitter yang masih punya drop atau splitter hilir ditolak dengan pesan merah di dialog: "Masih ada yang terhubung ke keluarannya. Lepas port drop dan putuskan splitter hilir lebih dulu."

## Mencatat dan melepas port drop pelanggan

Catat port drop dari formulir pelanggan baru, dari halaman langganan, atau dari lembar port sebuah ODP di panel perangkat (**Pasang pelanggan**, [bagian 5.6](/docs/guides/web/network/device-panel/)), bukan dari halaman daftar ODN. Halaman ODN hanya menunjukkan siapa memegang port dan menyediakan tombol **Lepas**. Semua langkah ini butuh `odn.assign`.

1. Di formulir pelanggan baru, buka tab **Langganan & SPK**, pilih **POP pelayan**, lalu isi **Port drop (ODP)**. Isian ini opsional dan hanya tampil bagi pemegang `odn.assign`. Sebelum POP dipilih, isian nonaktif dengan petunjuk "Pilih POP layanan untuk melihat port kosongnya." Tiap port ditulis dengan nama ODP, jumlah port kosong, dan jarak ODP dari alamat pemasangan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)).
2. Di halaman langganan, buka kartu **Port drop**, lalu klik **Atur port drop**. Bila langganan sudah punya port, tombolnya **Pindahkan port drop**. Kartu menulis "Belum ada port drop tercatat." bila belum ada port.
3. Di dialog **Atur port drop** diikuti kode langganan, isi **Port drop (ODP)**: ketik kode ODP atau label splitter (paling sedikit 2 huruf), lalu pilih. Daftar menampilkan paling banyak 20 port keluaran ODP yang bebas di bawah POP pelayan langganan, ditulis `<kode ODP> · <rasio atau label splitter> · port <nomor>` dengan path lokasi di bawahnya. ODP yang sudah penuh tidak ditawarkan. Pilihan lama tetap berlaku selama Anda mengetik. Pilihan berubah hanya bila Anda memilih port lain atau menekan **Hapus pilihan**.
4. Klik **Atur port drop**, atau **Pindahkan port drop** bila memindahkan. Tombol ini baru aktif setelah Anda memilih port. Toast "Port drop dicatat." muncul, dan port lama dibebaskan saat memindahkan.
5. Untuk melepas, klik **Lepas** di kartu **Port drop**, lalu klik **Lepas port drop** di dialog konfirmasi. Atau klik **Lepas** pada port di kartu splitter. Langganan tetap berlangganan dan port menjadi kosong. Toast "Port drop dilepas." muncul.

Port drop harus berupa port keluaran ODP yang bebas, dan ODP harus berada di bawah POP pelayan langganan. Langganan harus berstatus Menunggu, Aktif, atau Ditangguhkan. Saat langganan dihentikan, sistem melepas port drop-nya sendiri.

## Kesalahan umum

- Isian **Port masukan** atau **Port drop (ODP)** tidak menampilkan daftar berarti Anda belum mengetik 2 huruf (isian menulis `Ketik minimal 2 huruf untuk mencari.`), atau tidak ada port bebas yang cocok. Tambah port PON atau splitter, atau lepas port yang tidak dipakai. Tiap pencarian menampilkan paling banyak 20 port, jadi ketik lebih banyak huruf bila port yang dicari tidak muncul.
- ODP tidak muncul di tab **ODP** bila asetnya bukan bertipe ODP, sudah dihapus, atau (saat saringan **POP** dipakai) ditempatkan langsung di lokasi POP itu. Saringan **POP** hanya mencocokkan lokasi di bawah POP, yaitu Rak atau Site. Perbaiki di Aset Jaringan ([bagian 5.2](/docs/guides/web/network/network-assets/)).
- `ODP ini tidak berada di bawah POP layanan langganan <kode>.` berarti lokasi ODP berada di luar POP pelayan langganan. Ubah lokasi ODP di Aset Jaringan ke lokasi di bawah POP itu, atau ubah POP pelayan langganan.
- "Langganan ini belum punya POP layanan, jadi belum ada port yang bisa ditawarkan." berarti langganan belum punya POP pelayan. Isi POP pelayan lebih dulu.
- "Tidak ada port kosong yang cocok di bawah POP ini." berarti tidak ada port keluaran ODP yang bebas di bawah POP pelayan untuk kata yang diketik.
- "Port ini sudah dipakai." berarti port sudah dipegang langganan atau menjadi masukan splitter. Buka ulang halaman dan pilih port lain.
- "Splitter tidak dapat dihubungkan ke keluarannya sendiri atau ke apa pun di hilirnya." menolak sambungan yang membentuk lingkaran. Pilih port hulu di luar hilir splitter itu.
- `Rantai fiber di atas port ini lebih dari 8 splitter.` menolak rantai splitter yang terlalu dalam. Sambungkan ke port yang lebih dekat ke OLT.
- `Langganan <kode> tidak dalam layanan, jadi tidak dapat memakai port drop.` berarti hanya langganan berstatus Menunggu, Aktif, atau Ditangguhkan yang boleh memegang port drop.
- "Masih ada yang terhubung ke keluarannya. Lepas port drop dan putuskan splitter hilir lebih dulu." menolak penghapusan splitter. Lepas semua port drop dan putuskan splitter hilir lebih dulu.
- "Sebuah splitter terhubung ke port PON ini. Putuskan lebih dulu." menolak penghapusan port PON yang baru saja disambung. Putuskan splitternya, lalu hapus port.
- Tombol **Tambah port PON**, **Tambah splitter**, **Simpan sambungan**, dan **Hapus** tidak muncul tanpa `odn.manage`. Staf hanya punya `odn.view` dan `odn.assign`.
