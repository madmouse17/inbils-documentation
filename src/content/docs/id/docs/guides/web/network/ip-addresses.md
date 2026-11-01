---
title: "5.4 Alamat IP"
description: "Alamat IP adalah register pasif ruang alamat IP perusahaan: prefiks (blok CIDR), VLAN, dan alamat yang sudah dipegang. Register hanya mencatat."
---

Alamat IP adalah register pasif ruang alamat IP perusahaan: prefiks (blok CIDR), VLAN, dan alamat yang sudah dipegang. Register hanya mencatat. Sistem tidak membaca perangkat dan tidak mengirim konfigurasi ke router. Buka menu ini untuk melihat seberapa penuh tiap blok, mendaftarkan prefiks atau VLAN, dan melihat siapa memegang sebuah alamat statis.

Peran yang dapat memakai: admin dan manajer (semua tindakan), staf (hanya melihat). Izin: `ipam.view` untuk membuka daftar prefiks, detail prefiks, dan VLAN, `ipam.manage` untuk mendaftarkan, mengubah, dan menghapus prefiks dan VLAN serta menambah dan melepas reservasi, `ipam.assign` untuk memberi dan melepas alamat statis langganan. Data berlaku per perusahaan aktif ([bagian 1.6](/docs/guides/web/introduction/switch-company/)).

## Membuka dan membaca daftar prefiks

1. Di sidebar, buka grup **Jaringan**, lalu klik **Alamat IP**.
2. Atur daftar dengan lima saringan di atas tabel. Daftar menyesuaikan diri setelah Anda mengetik atau memilih.
   - **Cari**: prefiks atau keterangan.
   - **Versi IP**: **IPv4 dan IPv6**, **IPv4**, atau **IPv6**.
   - **Peruntukan**: **Semua peruntukan**, **Induk**, **IP statis pelanggan**, **IP dinamis pelanggan**, atau **Infrastruktur**.
   - **POP** dan **VLAN**: ketik untuk mencari, lalu pilih. Isian awalnya **Semua POP** dan **Semua VLAN**. Tombol **Hapus pilihan** di ujung isian mengosongkannya.

   Prefiks yang berada di dalam prefiks lain diberi indentasi di bawah induknya. Urutannya IPv4 dulu, lalu IPv6, menurut alamat awal blok. Daftar ini tidak punya urutan manual dan halaman. Bila saringan tidak menemukan apa pun, tabel menulis "Tidak ada prefiks yang cocok" dengan tombol **Reset filter**. Bila belum ada prefiks sama sekali, tabel menulis "Belum ada prefiks".

   ![Daftar prefiks pada menu Alamat IP: tombol VLAN dan Buat Prefiks, lima saringan, dan tabel Prefiks, Peruntukan, POP, VLAN, Ukuran, Terpakai, Kosong, Pemakaian](~/assets/guide/web/ipam-prefixes.webp)

3. Baca kolomnya.

   Kolom **Prefiks** berisi blok CIDR dengan keterangan di bawahnya, dan klik CIDR itu untuk membuka detail. Kolom **Peruntukan** berisi lencana peruntukan blok. Kolom **POP** berisi kode POP, dan kolom **VLAN** berisi ID dan nama VLAN yang terikat. Sel yang kosong berisi tanda "-". Kolom **Ukuran** menunjukkan jumlah alamat dalam blok.

   Kolom **Terpakai** menjumlahkan alamat yang sudah diberikan (**Dipakai**) dan yang dicadangkan (**Dicadangkan**), dan hanya terisi untuk **IP statis pelanggan** dan **Infrastruktur**. Kolom **Kosong** menunjukkan sisa alamat yang bisa dipakai. Untuk blok IPv4 selain /31 dan /32, sistem tidak menghitung alamat network dan broadcast.

   Kolom **Pemakaian** menampilkan bilah dan persen pemakaian: hijau di bawah 75%, kuning mulai 75%, merah mulai 90%. **IP dinamis pelanggan** hanya punya **Ukuran**. Untuk blok IPv6, **Kosong** dan **Pemakaian** berisi tanda "-" karena alamat IPv6 diketik manual. Untuk **Induk**, **Pemakaian** menunjukkan bagian blok yang sudah diisi prefiks di dalamnya.

## Mendaftarkan prefiks

1. Klik **Buat Prefiks** di kanan atas halaman. Tombol ini butuh `ipam.manage`.
2. Isi form di dialog **Buat Prefiks**:
   - **CIDR**: wajib, maksimal 64 karakter, berbentuk CIDR IPv4 atau IPv6, misalnya `10.20.0.0/22` atau `2001:db8::/48`. Alamat tunggal, rentang, dan panjang prefiks di atas 32 (IPv4) atau 128 (IPv6) ditolak. Bagian host dibuang otomatis, jadi yang tersimpan adalah alamat awal blok.
   - **Peruntukan**: wajib. Pilih dari daftar. Keterangan singkat tiap pilihan muncul di bawah isian.
   - **POP**: opsional. Ketik untuk mencari, lalu pilih kode dan nama POP yang aktif. Isian kosong (**Tidak terkait POP**) berarti blok tidak terikat POP.
   - **VLAN**: opsional. Ketik untuk mencari, lalu pilih. Pilihannya menampilkan ID dan nama VLAN, dengan kode POP atau **Seluruh perusahaan** di bawahnya. Isian kosong (**Tanpa VLAN**) berarti tanpa VLAN.
   - **Keterangan**: opsional, maksimal 255 karakter.
3. Klik **Daftarkan prefiks**. Daftar tampil kembali dengan toast `Prefiks <CIDR> didaftarkan.` Tombol **Batal** menutup dialog tanpa menyimpan.

Arti nilai **Peruntukan**:

| Peruntukan | Arti | Yang dihitung |
|---|---|---|
| Induk | Mengelompokkan prefiks lain. Tidak memuat alamat sendiri. | Pemakaian: bagian blok yang diisi prefiks di dalamnya. |
| IP statis pelanggan | Pool alamat statis pelanggan, diberikan dari halaman langganan. | Terpakai, lalu Kosong dan Pemakaian untuk IPv4. |
| IP dinamis pelanggan | Pool yang dibagikan router. Hanya ukurannya yang dicatat di sini. | Hanya Ukuran. |
| Infrastruktur | Alamat perangkat dan manajemen, dicadangkan secara manual. | Terpakai, lalu Kosong dan Pemakaian untuk IPv4. |

Sistem otomatis menempatkan prefiks baru di bawah prefiks terkecil yang sudah terdaftar dan memuatnya. Prefiks dan alamat yang sudah ada di dalam blok baru ikut berpindah ke bawahnya. Blok CIDR yang sudah terdaftar tidak bisa didaftarkan lagi, dan blok yang hanya sebagian tumpang tindih dengan prefiks lain ditolak.

## Membuka detail prefiks

1. Di daftar, klik CIDR prefiks.
2. Baca halaman detail. Judulnya CIDR prefiks, dengan keterangan (atau nama peruntukan) di bawahnya.

   Kartu **Detail** memuat **Peruntukan**, **Di dalam** (prefiks induk, atau **Tingkat atas**), **POP**, **VLAN**, dan **Ukuran**. Untuk **IP statis pelanggan** dan **Infrastruktur**, kartu ini juga memuat **Dapat dipakai**, **Dipakai**, **Dicadangkan**, dan **Kosong**. Di bawahnya ada bilah pemakaian dengan satu kalimat penjelasnya.

   ![Halaman detail prefiks: tombol Kembali, Ubah, Hapus, dan Cadangkan alamat, kartu Detail dengan bilah pemakaian, dan kartu Alamat](~/assets/guide/web/ipam-prefix-show.webp)

   Kartu **Prefiks di dalam** mendaftar prefiks di dalam blok dan selalu tampil untuk **Induk**. Kartu **Alamat** mendaftar alamat yang tercatat di rentang blok, termasuk alamat di prefiks bersarang, 25 per halaman. Kolomnya **Alamat**, **Status** (**Dipakai** atau **Dicadangkan**), **Dipakai oleh** (kode dan nama langganan atau aset pemegang, kosong untuk reservasi), **Catatan**, **Ditambahkan**, dan **Aksi** bagi pemegang `ipam.manage` atau `ipam.assign`. Bila blok belum berisi alamat, kartu menulis "Belum ada alamat di blok ini".
3. Klik **Kembali** untuk kembali ke daftar.

## Mengubah dan menghapus prefiks

1. Di halaman detail, klik **Ubah**. Tombol ini butuh `ipam.manage`.
2. Ubah **Peruntukan**, **POP**, **VLAN**, atau **Keterangan** di dialog **Ubah** diikuti CIDR prefiks, lalu klik **Simpan**. Isian **CIDR** terkunci, dengan petunjuk "Prefiks tetap memakai CIDR-nya. Daftarkan yang baru untuk mengubahnya." Toast "Prefiks diperbarui." muncul.
3. Untuk menghapus, klik **Hapus** di halaman yang sama, lalu klik **Hapus prefiks** di dialog konfirmasi. Dialog menjelaskan bahwa prefiks hanya bisa dihapus selama tidak memuat prefiks lain dan alamat.
   - Bila prefiks masih berisi prefiks lain atau alamat, dialog tetap terbuka dengan pesan merah.
   - Bila berhasil, daftar tampil kembali dengan toast `Prefiks <CIDR> dihapus.`

## Mereservasi alamat

Reservasi menahan satu alamat supaya tidak diberikan ke pelanggan, misalnya gateway atau loopback router.

1. Di halaman detail prefiks, klik **Cadangkan alamat**. Tombol ini butuh `ipam.manage`.
2. Isi form di dialog **Cadangkan alamat di** diikuti CIDR prefiks:
   - **Alamat**: wajib, alamat IP yang valid dan berada di dalam prefiks. Petunjuknya: "Alamat yang dicadangkan tidak pernah diberikan ke pelanggan."
   - **Catatan**: opsional, maksimal 255 karakter, misalnya gateway.
3. Klik **Cadangkan alamat**. Toast `Alamat <alamat> dicadangkan.` muncul, dan alamat tampil di kartu **Alamat** dengan status **Dicadangkan**.

Sistem menolak alamat network dan broadcast pada blok IPv4 selain /31 dan /32. Alamat yang sudah dipegang pihak lain ditolak dengan menyebut pemegangnya.

## Memberi alamat statis ke langganan

Gunakan halaman langganan untuk memberi alamat statis, bukan halaman Alamat IP. Langganan tanpa alamat tercatat dianggap dinamis, yaitu router yang membagikan alamatnya. Panelnya menulis "Dinamis (diberikan router)".

1. Buka halaman langganan (lihat bagian Pelanggan, [bagian 4.1](/docs/guides/web/customers-and-services/customers/)), lalu cari kartu **Alamat IP**.
2. Klik **Berikan IP statis**. Tombol ini butuh `ipam.assign` dan hanya muncul bila langganan belum berhenti dan masih ada pool yang bisa dipakai.
3. Di dialog **Berikan IP statis ke** diikuti kode langganan, pilih **Pool**: wajib, ketik untuk mencari, lalu pilih. Tiap pilihan menampilkan CIDR dan jumlah alamat kosong (atau "IPv6, ketik alamatnya"). Pool yang ditawarkan adalah pool **IP statis pelanggan** yang tidak terikat POP atau terikat ke POP pelayan langganan. Satu langganan hanya boleh punya satu alamat per versi IP, jadi pool untuk versi yang sudah terisi tidak muncul. Bila hanya ada satu pool, pool itu sudah terpilih.
4. Isi **Alamat**, atau kosongkan agar sistem memilih alamat bebas terendah. Pengosongan hanya berlaku untuk pool IPv4 /16 atau blok yang lebih kecil (/17 sampai /32). Pool IPv6 dan blok yang lebih besar dari /16 butuh alamat yang diketik, dan untuk IPv6 isian ini wajib.
5. Klik **Berikan alamat**. Toast `Alamat <alamat> diberikan ke <kode langganan>.` muncul. Alamat tampil di kartu **Alamat IP** dengan versi IP dan CIDR pool-nya, serta di kartu **Alamat** prefiks. Dialog mengingatkan bahwa bila pelanggan sedang online lewat RADIUS, sesinya diputus sebentar lalu tersambung lagi dengan alamat baru.

Bila langganan berhenti saat dialog masih terbuka, dialog menolak dengan pesan merah di bagian atasnya.

## Melepas alamat

1. Di kartu **Alamat IP** langganan, klik **Lepas** pada baris alamat. Atau di kartu **Alamat** halaman detail prefiks, klik **Lepas** pada baris **Dipakai** atau **Dicadangkan**.
2. Klik **Lepas alamat** di dialog konfirmasi **Lepas** diikuti alamatnya. Alamat langganan butuh `ipam.assign`, dan reservasi butuh `ipam.manage`. Toast `Alamat <alamat> dilepas.` muncul.

Langganan yang alamatnya dilepas kembali ke alamat dinamis, dan alamat itu kembali ke pool. Konfirmasi **Lepas alamat** juga menyebut bahwa pelanggan yang sedang online lewat RADIUS diputus sebentar lalu tersambung lagi dengan alamat dari pool dinamis. Saat langganan dihentikan, sistem melepas alamat statisnya sendiri. Alamat milik aset jaringan tidak bisa dilepas di sini. Barisnya punya tombol **Ubah aset**: klik tombol itu, lalu ubah **Alamat IP** atau **IP manajemen** di aset ([bagian 5.2](/docs/guides/web/network/network-assets/)).

## Mengelola VLAN

1. Di halaman daftar prefiks, klik **VLAN**.
2. Baca tabelnya: **ID VLAN**, **Nama**, **POP** (kode POP, atau **Seluruh perusahaan**), **Prefiks** (jumlah prefiks yang memakai VLAN itu), **Keterangan**, dan **Aksi** untuk pemegang `ipam.manage`. Klik angka di **Prefiks** untuk membuka daftar prefiks yang disaring menurut VLAN itu. Tombol **Alamat IP** kembali ke daftar prefiks. Tabel menampilkan 25 VLAN per halaman, diurutkan menurut ID VLAN.

   ![Daftar VLAN: tombol Alamat IP dan Buat VLAN, serta tabel ID VLAN, Nama, POP, Prefiks, Keterangan, dan Aksi](~/assets/guide/web/ipam-vlans.webp)

3. Klik **Buat VLAN**, lalu isi form di dialog **Buat VLAN**:
   - **ID VLAN**: wajib, bilangan bulat 1 sampai 4094.
   - **Nama**: wajib, maksimal 64 karakter.
   - **POP**: opsional, ketik untuk mencari, lalu pilih. Isian kosong (**Seluruh perusahaan**) berarti VLAN berlaku untuk seluruh perusahaan.
   - **Keterangan**: opsional, maksimal 255 karakter.
4. Klik **Daftarkan VLAN**. Toast `VLAN <ID> didaftarkan.` muncul.

ID yang sama boleh ada di beberapa POP, tetapi hanya sekali per POP dan hanya sekali untuk **Seluruh perusahaan**.

Untuk mengubah VLAN, klik **Ubah** pada baris, ubah isiannya di dialog **Ubah VLAN** diikuti ID, lalu klik **Simpan**. Toast "VLAN diperbarui." muncul. Untuk menghapus, klik **Hapus** pada baris, lalu klik **Hapus VLAN**. Toast `VLAN <ID> dihapus.` muncul. VLAN hanya terhapus bila tidak ada prefiks yang memakainya. Lepaskan VLAN dari prefiks lebih dulu dengan **Ubah** pada prefiks dan mengosongkan isian **VLAN**.

## Kesalahan umum

- `Masukkan prefiks IPv4 atau IPv6 dalam bentuk CIDR yang valid, misalnya 10.20.0.0/22.` berarti isian **CIDR** bukan blok CIDR: alamat tunggal, rentang, panjang prefiks di atas 32 (IPv4) atau 128 (IPv6), atau ada teks tambahan. Tulis ulang sebagai alamat jaringan diikuti garis miring dan panjang prefiks.
- `<CIDR> sudah terdaftar.` berarti blok itu sudah ada. Cari di daftar dengan **Cari**.
- `<CIDR> tumpang tindih sebagian dengan <CIDR lain>.` berarti blok baru memotong prefiks yang sudah terdaftar tanpa memuatnya atau berada di dalamnya. Pilih blok yang sejajar, lebih besar, atau lebih kecil dari prefiks itu.
- CIDR yang salah ketik pada prefiks tersimpan tidak bisa diperbaiki lewat **Ubah**. Daftarkan prefiks baru dengan CIDR yang benar, lalu hapus prefiks lama setelah kosong.
- `<CIDR> memuat prefiks lain. Hapus dulu.` dan `<CIDR> masih punya alamat. Lepas dulu.` menolak penghapusan prefiks. Hapus prefiks di dalamnya dan lepas semua alamatnya lebih dulu.
- Tombol **Berikan IP statis** hilang, atau kartu **Alamat IP** menulis "Belum ada pool statis untuk POP langganan ini." Tidak ada pool **IP statis pelanggan** yang tidak terikat POP atau terikat ke POP pelayan langganan. Daftarkan pool lewat **Buat Prefiks** dengan **Peruntukan** **IP statis pelanggan**. Bila langganan belum punya POP pelayan, kartu menulis "Langganan ini belum punya POP. Pool statis per POP baru ditawarkan setelah POP layanan dipilih." Pool yang terikat POP baru ditawarkan kepada langganan yang punya POP pelayan. Bila langganan sudah punya alamat IPv4 dan IPv6, tombol juga hilang tanpa pesan itu.
- `<alamat> berada di luar <CIDR>.` dan `<alamat> adalah alamat jaringan atau broadcast dari <CIDR>.` berarti alamat yang diketik berada di luar blok, atau berupa alamat network atau broadcast. Pilih alamat host di dalam blok.
- `<alamat> sudah dipakai langganan <kode>.` berarti alamat sudah dipegang. Pesan yang sama dengan `dipakai aset <kode>` atau `dicadangkan (<catatan>)` menyebut pemegang lain. Pilih alamat lain, atau lepas alamat itu lebih dulu. `<alamat> baru saja diambil. Coba lagi.` berarti pemegangnya baru saja berubah.
- `Langganan <kode> sudah memakai alamat IPv<versi> <alamat>. Lepas dulu.` berarti satu langganan hanya boleh punya satu alamat per versi IP. Lepas alamat lama lebih dulu.
- "Alokasi otomatis hanya untuk pool IPv4. Ketik alamatnya." dan `<CIDR> lebih besar dari /16. Ketik alamatnya.` berarti kolom **Alamat** tidak boleh kosong untuk pool itu. Ketik alamatnya.
- `<CIDR> tidak punya alamat kosong.` berarti pool penuh. Pilih pool lain atau daftarkan pool baru. `<CIDR> sedang sibuk. Coba lagi.` berarti beberapa pemberian alamat berbenturan di pool yang sama. Ulangi sekali lagi.
- `<CIDR> bukan pool statis pelanggan.` dan `<alamat> berada di <CIDR>, yang bukan pool statis pelanggan.` berarti pool atau prefiks bersarang yang memuat alamat itu tidak berperuntukan **IP statis pelanggan**. Pilih pool lain.
- `Langganan <kode> sudah berhenti dan tidak dapat memakai alamat.` berarti langganan sudah berstatus Berhenti. Langganan itu tidak bisa lagi menerima alamat.
- `VLAN <ID> sudah terdaftar untuk seluruh perusahaan.` dan `VLAN <ID> sudah terdaftar di POP ini.` berarti ID itu sudah dipakai di cakupan yang sama. Pilih ID lain atau POP lain.
- `VLAN <ID> dipakai sebuah prefiks. Lepas dulu.` berarti VLAN masih terikat ke prefiks. Lepaskan dari prefiks itu lebih dulu.
- Tombol **Buat Prefiks**, **Ubah**, **Hapus**, **Cadangkan alamat**, **Berikan IP statis**, dan **Buat VLAN** tidak muncul bila izin `ipam.manage` atau `ipam.assign` tidak dimiliki. Staf hanya punya `ipam.view`.
