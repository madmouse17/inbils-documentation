---
title: "5.6 Panel perangkat"
description: "Panel perangkat menggambar router, switch, OLT, ONU/ONT, ODC, ODP, dan rak seperti wajah perangkat aslinya."
---

Panel perangkat menggambar router, switch, OLT, ONU/ONT, ODC, ODP, dan rak seperti wajah perangkat aslinya: setiap port ada di tempat port itu berada, dan warnanya menunjukkan statusnya. Buka panel saat Anda perlu tahu port mana yang kosong atau terpakai, perangkat mana yang tersambung ke sebuah port, siapa pelanggan di belakang port itu, dan lewat OLT, ODC, dan ODP mana serat seorang pelanggan berjalan. Panel hanya membaca dan mencatat data di Inbils. Inbils tidak menghubungi perangkatnya, jadi lampu link dan lalu lintas per port tidak ada di sini.

Peran yang dapat memakai: admin, manajer, dan staf melihat panel, dan hanya admin dan manajer yang mengubahnya. Izin: `network_asset.view` membuka panel, dan `odn.view` menambahkan data ODN di dalamnya (port PON, splitter, pelanggan di port, jalur fiber). `network_asset.update` mengizinkan memilih model, memberi label, menyambung port, dan memasang perangkat di rak. Memilih atau mengganti model OLT dan ODP juga butuh `odn.manage`. Memasang pelanggan di port ODP dan melepas port drop butuh `odn.assign`, yang dengan peran bawaan dimiliki staf juga. Panel tidak menambah izin baru. Gambar di bagian ini diambil dari data contoh tanpa RADIUS, jadi port pelanggan berwarna **Terpakai**, bukan **Online** atau **Offline** (lihat "Membaca warna port").

## Membuka panel

1. Di sidebar, buka grup **Jaringan**, klik **Aset Jaringan**, lalu klik kode aset ([bagian 5.2](/docs/guides/web/network/network-assets/)). Kartu **Panel perangkat** ada di atas kartu **Detail aset**, dan hanya ada untuk aset bertipe Router, Switch, OLT, ONU/ONT, ODC, ODP, dan Rak.
2. Panel yang sama tampil di tiga tempat lain: kartu **Panel router** di rincian **Router NAS** (untuk aset router milik NAS itu, [bagian 5.3](/docs/guides/web/network/nas-routers/)), kartu **Panel perangkat** di halaman OLT, ODC, dan ODP di **ODN** ([bagian 5.5](/docs/guides/web/network/odn/)), dan jalur fiber di **Lacak Aset** (lihat "Melacak jalur fiber").
3. Tunggu gambarnya muncul. Selama data dimuat, kartu menampilkan bidang abu-abu, dan sisa halaman sudah bisa dibaca.
4. Baca keterangan di bawah judul kartu: nama model dan tinggi unitnya (misalnya "MikroTik CCR2004-16G-2S+ · 1U"), "Susunan manual" diikuti jumlah port bila port disusun sendiri, atau, pada rak, tinggi rak dan jumlah perangkat ("42U · 2 perangkat"). ODC dan ODP tidak punya keterangan, karena gambarnya mengikuti splitter.
5. Baca gambarnya seperti unit aslinya. Nomor port tercetak di atas atau di bawah port, nama blok ("Slot 1", "Ethernet 1-8", "Uplink") ada di bawah blok, dan simbol daya, konsol, USB, WLAN, serta reset hanya gambar yang tidak bisa diklik.

   ![Panel perangkat sebuah OLT: delapan baris slot berisi 16 port PON dan empat port uplink, legenda Terpakai dan Kosong, serta tooltip port gpon-olt_1/1/1](~/assets/guide/web/panel-olt.webp)

## Memilih model perangkat

Aset Router, Switch, OLT, dan ONU/ONT yang baru dibuat belum punya gambar sampai Anda memilih modelnya. Pengguna tanpa `network_asset.update` hanya membaca "Model perangkat belum dipilih. Minta admin memilih model agar panel tampil."

1. Buka rincian aset. Di kartu **Panel perangkat**, baca judul **Pilih model perangkat** dan kalimat "Panel digambar dari model perangkat. Pilih dari katalog atau susun port sendiri."
2. Isi **Model perangkat** (wajib). Isian ini kotak cari dengan petunjuk "Cari vendor atau model": ketik sebagian vendor atau model, lalu klik hasilnya. Bila isian **Vendor** dan **Model** di aset memuat nama sebuah model katalog, Inbils sudah memilihkannya dan menulis "Disarankan dari vendor dan model aset ini." Misalnya vendor MikroTik dengan model "hAP ac2 RBD52G-5HacD2HnD" disarankan "MikroTik hAP ac² (RBD52G-5HacD2HnD)". Pilihan hanya berisi model untuk tipe aset itu, dan unit rak memuat tingginya (misalnya 1U) sebagai keterangan.
3. Klik **Terapkan model**. Toast "Model perangkat diterapkan." muncul dan gambarnya tampil. Semua port barunya **Kosong**.

   ![Kartu Panel perangkat pada router tanpa model: kotak Model perangkat berisi saran MikroTik hAP ac², serta tombol Terapkan model dan Susun manual](~/assets/guide/web/panel-picker.webp)

Katalog memuat 14 model:

| Tipe | Model di pilihan |
| --- | --- |
| Router | MikroTik hAP ac² (RBD52G-5HacD2HnD), MikroTik RB4011iGS+RM, MikroTik CCR2004-16G-2S+ |
| Switch | MikroTik CRS326-24G-2S+RM, MikroTik CRS317-1G-16S+RM, Umum Switch 8 port, Umum Switch 24 port + 2 SFP, Umum Switch 48 port + 4 SFP |
| OLT | ZTE ZXA10 C320 · 2× GTGH (32 PON), ZTE ZXA10 C320 · 2× GTGO (16 PON), Huawei SmartAX MA5608T · 2× GPFD (32 PON) |
| ONU/ONT | Umum ONT 1 PON · 4 LAN · 2 POTS · WLAN |
| ODP | Umum ODP 1:8, Umum ODP 1:16 |

Model OLT juga mendaftarkan port PON ke ODN: model dengan 32 slot PON membuat port PON yang belum ada di register ([bagian 5.5](/docs/guides/web/network/odn/)). Nama port mengikuti nama di unit aslinya, misalnya `gpon-olt_1/2/1` pada ZTE C320 atau `0/1/0` pada Huawei MA5608T. Baris **Di register ODN** di lembar port (lihat "Menghubungkan port") tetap menulis nomor PON seperti di tabel ODN ("PON 17").

Untuk unit yang tidak ada di katalog, susun port sendiri:

1. Klik **Susun manual**. Satu baris isian muncul: **Jenis port**, **Jumlah**, dan **Awalan nama**.
2. Pilih **Jenis port**: **RJ45 (kabel LAN)** atau **SFP / SFP+ (fiber)**, dan untuk ONU/ONT juga **SC (fiber)** dan **RJ11 (telepon)**. Isi **Jumlah** (1 sampai 64) dan, bila perlu, **Awalan nama** (maksimal 20 karakter). Awalan yang kosong memakai bawaan jenisnya: ether, sfp, PON, TEL, atau LAN untuk RJ45 di ONU/ONT. Port dinamai awalan diikuti nomornya, misalnya ether1.
3. Klik **Tambah baris** untuk kelompok port berikutnya (paling banyak 8 baris), atau tombol ikon tempat sampah **Hapus baris N** untuk membuang satu baris. Tulisan "Total N port (paling banyak 256)" menghitung semua baris. Baris dengan 13 port atau lebih digambar dalam dua tingkat.
4. Klik **Terapkan model**. Klik **Pilih dari katalog** untuk kembali ke daftar model.

Susunan manual tidak punya blok PON. Pada OLT, port PON yang sudah ada di ODN digambar di baris tambahan **Port PON di luar model**, tanpa nama dari unit aslinya. Pilih model katalog bila ada, supaya port PON tergambar di tempatnya.

Untuk mengganti model:

1. Klik **Ganti model** di kanan atas kartu. Tombol ini ada pada Router, Switch, OLT, dan ONU/ONT yang sudah punya model, bagi pemegang `network_asset.update`.
2. Baca dialog **Ganti model perangkat**: "Port yang bernama sama tetap menyimpan label, catatan, dan sambungannya. Port yang tidak ada di model baru dihapus; port yang masih terhubung menahan penggantian." Port dianggap sama bila kelompok dan nomornya sama di model lama dan baru, misalnya ether1 sampai ether5 di dua model router.
3. Pilih model baru, atau klik **Susun manual**, lalu klik **Terapkan model**. Bila ada port yang masih terhubung dan tidak ada di model baru, pesan merah di dialog menyebut port itu. Lepas sambungannya lebih dulu (lihat "Menghubungkan port").

ODC dan ODP tidak memakai model sendiri: gambarnya mengikuti splitter di ODN, satu baris per splitter, dengan port **Masuk** (masukan splitter) dan port keluarannya. ODC atau ODP tanpa splitter menulis "Belum ada splitter. Tambah splitter di halaman ODN." dengan tombol **Buka halaman ODN** (bagi pemegang `odn.manage`). Pada ODP tanpa splitter, pilihan Umum ODP 1:8 atau Umum ODP 1:16 (butuh `odn.manage`) membuat splitter pertamanya sekaligus.

## Membaca warna port

Legenda di atas gambar hanya memuat status yang sedang ada di panel itu, dengan jumlah port di sampingnya (misalnya "Terpakai 2" dan "Kosong 130"). Setiap status punya tanda selain warna, jadi gambar tetap terbaca bagi orang yang sulit membedakan warna:

| Status | Tampilan port | Arti |
| --- | --- | --- |
| **Kosong** | garis tanpa isi | Menurut data Inbils, tidak ada perangkat yang tersambung dan tidak ada pelanggan. |
| **Terpakai** | isi biru | Port tersambung ke perangkat lain, memberi makan sebuah splitter, atau dipegang pelanggan yang status onlinenya tidak diketahui. |
| **Online** | isi hijau dengan titik di lubang | Pelanggan di port itu, atau salah satu pelanggan di belakangnya, punya sesi RADIUS yang terbuka. |
| **Offline** | isi abu-abu dengan garis pendek di lubang | Ada pelanggan di port itu atau di belakangnya, tetapi tidak satu pun punya sesi RADIUS yang terbuka. |
| **Diisolir** | isi oranye dengan arsiran miring | Langganan pemegang port berstatus Ditangguhkan atau diblokir. |
| **Dinonaktifkan** | isi merah dengan tanda silang | Seseorang menandai port nonaktif di panel (saklar **Nonaktifkan port**). Ini penanda saja, pengaturan perangkatnya tidak berubah. |
| **Belum terdaftar** | garis putus-putus | Port ada di model, tetapi register belum punya barisnya. Pada OLT, ini berarti baris port PON-nya belum ada di ODN. |

Status **Online** dan **Offline** hanya muncul bila RADIUS menyala. Legenda menulis "Online = sesi RADIUS terbuka, diperbarui paling lama tiap 15 detik." Sesi yang tidak memberi kabar selama 15 menit tidak dihitung. Bila RADIUS nonaktif atau tidak terjangkau, legenda menulis "Status online tidak tersedia: RADIUS nonaktif." atau "Status online tidak tersedia: RADIUS tidak dapat dihubungi.", dan port berpelanggan tampil **Terpakai**. Halaman tetap terbuka.

Port yang memberi makan sebuah splitter (port PON, dan output ODC yang mengisi ODP) menyala mengikuti pelanggan di belakangnya: satu pelanggan online cukup untuk membuatnya **Online**, dan tooltip-nya menulis jumlah pelanggan dan berapa yang online.

Untuk membaca satu port:

- Arahkan penunjuk ke port, atau fokuskan dengan keyboard, untuk melihat tooltip: nama port dan statusnya, nomor di ODN ("PON 1 di ODN"), label, tujuan sambungan ("ke E2E-PANEL-ODC · 1:8"), pelanggan, dan "2 pelanggan · 0 online". Di layar sentuh tidak ada tooltip: ketuk port untuk membuka lembar port, yang memuat semua isi tooltip.
- Klik port, tekan Enter, atau tekan Spasi untuk membuka lembar port (lihat "Menghubungkan port").
- Tab masuk ke panel di satu port saja, dan Tab berikutnya keluar dari panel. Tombol panah memindah fokus antar port, Home dan End ke port pertama dan terakhir, dan Escape menutup lembar port dengan fokus kembali ke port itu.
- Pembaca layar menyebut nama, label, status, dan tujuan sebuah port, misalnya "ether3, cadangan: Dinonaktifkan".

## Menghubungkan port

Klik sebuah port untuk membuka lembar port, yang terbuka di sisi kanan layar (dari bawah di ponsel). Judulnya nama port dan labelnya (misalnya "sfp-sfpplus1 · ke OLT"), dan di bawahnya tertulis kelompok port dan kode aset ("Ethernet 1-8 · E2E-PANEL-RTR"). Bagian atas lembar memuat **Status**, **Kecepatan**, **Terhubung ke** (tautan ke halaman perangkat tujuan), **Di register ODN** (port PON), **Pelanggan di bawah** (port yang memberi makan splitter), dan **Catatan**. Bagian di bawahnya mengikuti jenis port.

Untuk menyambung port router, switch, uplink OLT, atau port ONU/ONT ke port perangkat lain (butuh `network_asset.update`):

1. Klik port yang berstatus **Kosong**, lalu klik **Hubungkan ke port lain** di bagian **Sambungan**.
2. Isi **Perangkat tujuan**: ketik kode atau nama perangkat, lalu klik hasilnya. Daftarnya hanya memuat router, switch, OLT, dan ONU/ONT yang sudah punya model, kecuali aset ini sendiri. Bila tidak ada yang cocok, daftar menulis "Tidak ada perangkat berpanel yang cocok."
3. Isi **Port tujuan**. Sebelum perangkat dipilih, isian ini menulis "Pilih perangkat tujuan dulu". Sesudahnya, isian menawarkan port kosong perangkat itu, ditulis dengan namanya dan labelnya bila ada. Bila perangkat itu tidak punya port kosong, daftar menulis "Perangkat itu tidak punya port kosong."
4. Klik **Hubungkan**. Toast "Port dihubungkan." muncul, dan kedua port berubah menjadi **Terpakai**. Bagian **Terhubung ke** menulis tautan ke perangkat tujuan, misalnya "E2E-PANEL-OLT · UP2". Di panel perangkat tujuan, portnya juga **Terpakai** dan menunjuk balik ke port ini.

   ![Lembar port ether2 pada router: bagian Sambungan dengan Perangkat tujuan E2E-PANEL-OLT dan Port tujuan UP2, lalu bagian Label dan catatan](~/assets/guide/web/panel-router-portsheet.webp)

Untuk melepas sambungan, buka port di salah satu ujung, klik **Lepas sambungan**, lalu klik **Lepas sambungan** lagi di dialog "Lepas sambungan ether2?" yang menjelaskan "Port ether2 dan port UP2 di E2E-PANEL-OLT menjadi kosong." Toast "Sambungan port dilepas." muncul, dan kedua port kembali **Kosong**.

Bagian **Label dan catatan** di lembar yang sama menyimpan keterangan port:

1. Isi **Label** (maksimal 64 karakter, misalnya "ke CCR-INTI") dan **Catatan** (maksimal 255 karakter, misalnya "VLAN 100 · ke ODC barat."). Label tampil di tooltip dan di judul lembar.
2. Nyalakan saklar **Nonaktifkan port** bila port sengaja dimatikan di unitnya, dan Anda ingin panel menunjukkannya. Panel menulis "Hanya penanda di panel. Pengaturan perangkatnya tidak berubah."
3. Klik **Simpan port**. Tombol ini aktif setelah ada perubahan. Toast "Port diperbarui." muncul dan "Tersimpan." tampil di samping tombol.

Port ODN punya isi lembar sendiri:

- Port PON OLT dan output ODC atau ODP menulis di mana ia tersambung dan berapa pelanggan di belakangnya. Tombol **Buka halaman ODN** membuka halaman splitter atau aset itu (butuh `odn.view`). Sambungan splitter, port PON, dan splitter diatur di ODN ([bagian 5.5](/docs/guides/web/network/odn/)), bukan dari panel.
- Port ODP yang dipegang pelanggan menampilkan bagian **Pelanggan** dengan **Langganan** (kode dan status), **Pelanggan**, **Paket**, dan **Sesi** ("Online sejak" disusul tanggal dan jam, "Offline", atau "Status online tidak tersedia."). Tombolnya **Buka langganan** (butuh `customer.subscription.view`), **Buka pelanggan** (butuh `customer.view`), **Lacak jalur**, **Blokir internet** atau **Buka blokir** (butuh `customer.subscription.block`, dialognya sama dengan di [bagian 5.3](/docs/guides/web/network/nas-routers/)), dan **Lepas port drop** (butuh `odn.assign`). Dialog "Lepas ... dari port ...?" menjelaskan "Port menjadi kosong. Langganannya sendiri tidak berubah." Klik **Lepas port drop** untuk melanjutkan.
- Port output ODP yang kosong menampilkan **Pasang pelanggan** (butuh `odn.assign`). Isi **Langganan**: ketik kode langganan atau nama pelanggan, lalu klik hasilnya. Daftarnya hanya memuat langganan yang belum punya port drop dan dilayani POP di atas ODP itu ("Hanya langganan yang belum punya port drop dan dilayani POP di atas ODP ini."). Klik **Pasang pelanggan**, dan toast "Port drop dicatat." muncul. Ini jalan ketiga mencatat port drop, di samping formulir pelanggan dan halaman langganan ([bagian 5.5](/docs/guides/web/network/odn/)).
- Port yang ada di model OLT tetapi belum ada di ODN menulis "Port ini ada di model, tetapi belum terdaftar di ODN." Port **Masuk** pada splitter menulis apakah masukannya sudah tersambung ke port hulu, dan sambungannya diatur di halaman ODN.
- Port ONU/ONT yang menghadap serat (**PON SC/APC**) menampilkan pelanggan dari langganan ONU/ONT itu, dengan tujuan ke port output ODP-nya. Lembarnya punya **Lacak jalur** tetapi tidak punya **Lepas port drop**, karena ODP yang memegang drop-nya. Port LAN dan POTS ONU/ONT berlaku seperti port router.

## Panel di ponsel

Di layar sempit (lebar di bawah 640 piksel), gambar panel tidak mengecil. Gambar tetap berukuran besar, dan tiap port berukuran paling sedikit 44 piksel supaya mudah diketuk di layar sentuh. Gambar bergeser ke samping di dalam kartu, dan halaman tidak ikut bergeser. Legenda berada di luar bagian yang bergeser dan menempel di bawah bilah atas saat halaman digulir, jadi legenda selalu terbaca. Ketuk port untuk membuka lembar port, yang naik dari bagian bawah layar dan memuat semua yang ada di tooltip.

![Panel router di layar ponsel: legenda Terpakai, Kosong, dan Dinonaktifkan di atas gambar yang bergeser ke samping, dengan port berukuran besar dan satu port berwarna merah bertanda silang](~/assets/guide/web/panel-phone.webp)

## Memasang perangkat di rak

Rak di sini adalah aset bertipe Rak, bukan lokasi bertipe Rak di pohon lokasi ([bagian 5.1](/docs/guides/web/network/locations/)). Buat aset bertipe Rak di Aset Jaringan ([bagian 5.2](/docs/guides/web/network/network-assets/)) dan buka rinciannya.

1. Di kartu **Panel perangkat**, baca judul **Tentukan ukuran rak**. Isi **Tinggi rak (U)** (1 sampai 52, isian awal 42), lalu klik **Simpan**. Toast "Ukuran rak disimpan." muncul dan rak digambar dari U1 di bagian bawah sampai U teratas di atas. Pengguna tanpa `network_asset.update` membaca "Ukuran rak belum ditentukan. Minta admin menentukannya agar isi rak tampil."
2. Rak yang kosong menulis "Rak masih kosong. Pilih slot U untuk memasang perangkat." Tiap slot kosong punya tanda plus, dan namanya ("U12 kosong, pasang perangkat") dibaca pembaca layar. Klik slot kosong.
3. Di dialog **Pasang perangkat di U12** (nomor sesuai slot yang Anda klik), baca "E2E-PANEL-RACK, 42U. U1 ada di bagian bawah rak." Isi **Perangkat**: ketik kode atau nama aset, lalu klik hasilnya. Daftarnya memuat semua aset selain rak. Periksa **Mulai di U** (terisi dari slot yang Anda klik) dan **Tinggi (U)** (1 sampai 10, isian awal 1).
4. Klik **Pasang di rak**. Toast "Posisi rak disimpan." muncul. Perangkat tampil sebagai batang berlabel kode dan namanya, dengan gambar mini wajahnya, dan jumlah perangkat di keterangan kartu bertambah satu (misalnya "42U · 3 perangkat").

   ![Rak dengan nomor U di sisi kiri: router di U13, OLT di U10 dan U11, dan tanda plus di setiap slot kosong](~/assets/guide/web/panel-rack.webp)

Untuk memindahkan atau melepas perangkat, klik batangnya. Dialog berjudul "{kode perangkat} di {kode rak}" memuat tautan **Buka halaman aset** serta isian **Mulai di U** dan **Tinggi (U)**. Ubah angkanya lalu klik **Simpan posisi**, atau klik **Lepas dari rak** (toast "Perangkat dilepas dari rak."). Untuk mengubah ukuran rak, klik **Ubah ukuran** di kanan atas kartu. Rak tidak bisa diperkecil sampai di bawah U tertinggi yang terisi. Pengguna tanpa `network_asset.update` tidak melihat slot kosong yang bisa diklik, dan klik pada batang membuka halaman asetnya.

## Melacak jalur fiber

Jalur fiber menunjukkan lewat perangkat mana serat seorang pelanggan berjalan, dari OLT sampai ONU/ONT di rumahnya. Jalurnya butuh port drop yang sudah tercatat ([bagian 5.5](/docs/guides/web/network/odn/)) dan `odn.view`. Ada dua jalan masuk:

1. Buka lembar port milik pelanggan (port output ODP yang dipegang pelanggan, atau port PON ONU/ONT-nya), lalu klik **Lacak jalur**.
2. Atau buka **Lacak Aset** ([bagian 5.2](/docs/guides/web/network/network-assets/)), cari ONU/ONT dengan kodenya, lalu klik **Jalur fiber** di kolom **Langganan** pada baris yang punya langganan.

Halaman **Lacak Aset** menampilkan kartu **Jalur fiber** diikuti kode langganan, dengan nama pelanggan di bawahnya. Legenda di atas gambar memuat status jalur. Gambar di bawahnya berisi satu kartu per titik, dari OLT di kiri sampai pelanggan di kanan. Tiap kartu menulis kode asetnya, dan di bawah gambar kecil perangkatnya tertulis port yang dilalui: port PON untuk OLT (misalnya `gpon-olt_1/1/1`), port output untuk ODC dan ODP ("KODE · 1:8 · 1"), dan nama pelanggan untuk ONU/ONT. Bila langganan tidak punya ONU/ONT, kartu terakhir berjudul **Pelanggan** dan hanya menulis nama pelanggan. Port yang dilalui diberi lingkaran, dan garis penghubung memakai warna status drop. Klik kartu untuk membuka halaman asetnya.

![Jalur fiber E2E-PANEL-SUB dari OLT lewat ODC dan ODP sampai ONT pelanggan, dengan legenda Terpakai dan tabel hasil Lacak Aset di bawahnya](~/assets/guide/web/panel-trace.webp)

Langganan tanpa port drop menulis "Belum ada port drop tercatat untuk {kode}. Atur di halaman langganan.", dengan tombol **Buka langganan**. Catat port drop-nya dulu ([bagian 5.5](/docs/guides/web/network/odn/)).

## Kesalahan umum

- Kartu **Panel perangkat** tidak ada di rincian aset: tipe aset bukan Router, Switch, OLT, ONU/ONT, ODC, ODP, atau Rak, atau akun Anda tidak punya `network_asset.view`.
- Kartu hanya menulis "Model perangkat belum dipilih. Minta admin memilih model agar panel tampil.": aset belum punya model dan akun Anda tidak punya `network_asset.update`.
- Kartu menulis "Port PON dan splitter tampil untuk pengguna dengan akses ODN." dan blok PON atau splitter tidak tergambar: akun Anda tidak punya `odn.view`.
- **Terapkan model** pada OLT atau ODP ditolak dengan galat 403, walau pilihan modelnya tampil: server juga meminta `odn.manage`. Minta admin menambahkan izin itu.
- "OLT ini sudah punya 32 port PON terdaftar; model ini hanya 16." (angkanya mengikuti OLT dan model Anda): OLT punya lebih banyak port PON di ODN daripada slot di model. Pilih model dengan slot PON sebanyak itu, atau hapus port PON yang tidak dipakai di ODN ([bagian 5.5](/docs/guides/web/network/odn/)).
- "Port ether3 dan ether4 masih terhubung. Lepas sambungannya dulu." di dialog **Ganti model perangkat**: model baru tidak punya port itu. Lepas sambungannya, lalu terapkan lagi.
- "Port UP2 di E2E-PANEL-OLT sudah terhubung." di bawah **Port tujuan**: orang lain mengambil port itu saat formulir Anda terbuka. Pilih port kosong yang lain.
- Isian **Perangkat tujuan** tidak menemukan perangkat yang Anda cari: daftarnya hanya memuat router, switch, OLT, dan ONU/ONT yang sudah punya model. Pilih model perangkat itu dulu.
- Port pelanggan tampil **Terpakai**, bukan **Online** atau **Offline**: RADIUS belum menyala atau tidak terjangkau, dan legenda menyebut alasannya ([bagian 5.3](/docs/guides/web/network/nas-routers/)).
- "U13 sudah terisi E2E-PANEL-RTR." di dialog rak: perangkat lain memegang U itu. Pilih U lain atau kurangi **Tinggi (U)**. Pesan "Posisi melewati tinggi rak (42U)." berarti perangkat melewati puncak rak, dan "Rak belum punya ukuran." berarti ukuran rak belum diisi.
- "Rak berisi perangkat sampai U13; ukurannya tidak boleh lebih kecil." di dialog **Ubah ukuran rak**: lepas perangkat di U yang lebih tinggi dulu, atau isi ukuran yang lebih besar.
- Tombol **Ganti model**, **Hubungkan ke port lain**, **Simpan port**, atau **Ubah ukuran**, dan slot rak yang bisa diklik, tidak tampil: akun Anda tidak punya `network_asset.update`.
- Tombol **Jalur fiber** di **Lacak Aset** tidak tampil: tombol itu butuh `odn.view`, dan hanya baris dengan langganan yang memilikinya.
