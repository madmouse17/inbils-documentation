---
title: "5.2 Aset Jaringan"
description: "Aset Jaringan memuat satu baris untuk tiap perangkat jaringan perusahaan, misalnya router, OLT, ONU/ONT, ODP dan rak."
---

Aset Jaringan memuat satu baris untuk tiap perangkat jaringan perusahaan, misalnya router, OLT, ONU/ONT, ODP dan rak. Buka menu ini saat Anda mencatat perangkat baru, mengubah status pakainya (pasang, lepas, rawat, rusak, pensiun) atau mencari perangkat dari serial, MAC atau alamat IP.

Peran yang dapat memakai: admin, manajer, staf. Izin: `network_asset.view` membuka menu, daftar, rincian dan **Lacak Aset**. Aksi lain punya izin sendiri: `network_asset.create`, `network_asset.update`, `network_asset.delete`, `network_asset.export`, `network_asset.install`, `network_asset.remove`, `network_asset.maintenance`, `network_asset.repair` dan `network_asset.retire`. Dengan peran bawaan, admin memegang semuanya, manajer memegang semua kecuali `network_asset.delete`, staf hanya `network_asset.view`. Daftar hanya memuat aset perusahaan yang sedang dipilih.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Jaringan**, lalu klik **Aset Jaringan**.
2. Baca daftar.

   - Kotak **Cari** mencari sebagian kode, nama, serial, MAC dan alamat IP, walau petunjuknya hanya `Kode, nama, atau nomor seri`.
   - Filter **Tipe** berisi **Semua tipe** dan 12 jenis aset (daftarnya ada di form buat). Filter **Status** berisi **Semua status**, lima status (Tersedia, Terpasang, Perawatan, Rusak, dan Dipensiunkan; lihat tabel di bagian Mengubah status aset), **Dihapus**, dan **Semua, termasuk dihapus**.
   - Kolom: **Kode** (tautan ke rincian), **Nama**, **Tipe**, **Nomor seri**, **Status**, **Lokasi**, **Dibuat** dan **Aksi**. Tipe dan status tampil sebagai lencana, misalnya ONU/ONT dan Tersedia. Kolom **Kode**, **Nama**, **Tipe**, **Status** dan **Dibuat** bisa diurutkan, dan urutan awalnya dari aset terbaru.
   - Kolom **Dibuat** berisi `-` di semua baris, karena server tidak mengirim tanggal pembuatan ke halaman ini.
   - Tombol **Ekspor** (pemegang `network_asset.export`) membuka menu **Ekspor CSV** dan **Ekspor PDF**. Berkas memuat kolom Kode, Nama, Tipe, Nomor seri, Status dan Kepemilikan dari hasil yang sedang difilter. Isi kolom Tipe, Status dan Kepemilikan di berkas berupa kode mentah, misalnya `onu_ont`, `available` dan `owned`.
   - Tombol **Buat Aset Jaringan** (pemegang `network_asset.create`) membuka form buat. Baris daftar hanya punya tombol **Lihat**, tanpa **Ubah** dan **Hapus**. Aset yang dihapus muncul di filter **Status** **Dihapus**: barisnya tidak punya tombol, namanya teks biasa, dan menu **Aksi lainnya** berisi **Pulihkan** (izin `network_asset.delete`). Aset kembali dengan statusnya semula (toast "Aset jaringan dipulihkan.").
   - Daftar yang kosong menampilkan `Belum ada aset jaringan`, dan saringan yang tidak menemukan apa pun menampilkan `Tidak ada aset jaringan yang cocok` dengan tombol **Reset filter**.

   ![Daftar Aset Jaringan dengan kotak Cari, filter Tipe dan Status, serta tombol Ekspor dan Buat Aset Jaringan](~/assets/guide/web/network-assets.webp)

3. Klik kode aset atau tombol **Lihat** untuk membuka halaman rincian.

## Membaca halaman rincian

Judul halaman memuat nama aset, dengan kodenya di bawahnya. Tombol di kanan atas adalah **Kembali**, **Ubah** dan, untuk aset OLT, ODC atau ODP bagi pemegang `odn.view`, **Port ODN** (lihat [bagian 5.5](/docs/guides/web/network/odn/)).

- Untuk router, switch, OLT, ONU/ONT, ODC, ODP, dan rak, kartu **Panel perangkat** menggambar perangkat seperti wajah aslinya, dengan port, sambungan, dan posisi di rak. Kartu ini ada di atas kartu **Detail aset** dan dijelaskan di [bagian 5.6](/docs/guides/web/network/device-panel/).
- Kartu **Detail aset** memuat Status, Tipe, Produk, Kepemilikan, Nomor seri, Alamat MAC, Alamat IP, IP manajemen, Vendor, Model, Lokasi, Jalur lokasi, Pelanggan, Langganan, Dipasang, Dipensiunkan dan Catatan (bila terisi). Status, Tipe dan Kepemilikan tampil sebagai lencana. Pelanggan dan Langganan adalah tautan ke halaman pelanggan dan langganan. Tanggal pembelian, harga beli dan masa garansi hanya terlihat di form **Ubah**.
- Kartu **Siklus hidup** berisi tombol ubah status.
- Kartu **Riwayat pemasangan** mencatat tiap pemasangan dengan kolom **Lokasi**, **Dipasang**, **Dilepas** dan **Alasan**. Aset yang belum pernah dipasang menampilkan `Belum ada riwayat pemasangan. Riwayat tercatat setiap kali aset dipasang dan dilepas.`

  ![Halaman rincian aset jaringan dengan kartu Detail aset dan Siklus hidup](~/assets/guide/web/network-assets-show.webp)

## Membuat aset

1. Klik **Buat Aset Jaringan**.
2. Isi form pada kartu **Detail**:
   - **Nama**: wajib, maksimal 255 karakter. Contoh: `OLT Huawei MA5800`.
   - **Produk**: opsional. Ketik SKU atau nama produk (sedikitnya 2 huruf), lalu pilih produk aktif dari katalog barang ([bagian 6.2](/docs/guides/web/inventory/items/)). Daftar menampilkan paling banyak 20 hasil. SPK memakai tautan ini untuk menawarkan aset (lihat bagian Memasang aset lewat SPK instalasi).
   - **Tipe aset**: wajib. Kotak cari dengan petunjuk **Cari tipe aset**: ketik untuk mencari, lalu pilih Router, Switch, OLT, ONU/ONT (isian awal), Radio, Antena, Fiber, ODP, ODC, Rak, Perangkat daya atau Lainnya. Bila tidak ada yang cocok, kotak menulis **Tidak ada tipe aset yang cocok.** Tombol **Daftarkan ODP** di halaman ODN ([bagian 5.5](/docs/guides/web/network/odn/)) membuka form ini dengan tipe ODP sudah terpilih.
   - **Nomor seri**: opsional, maksimal 255 karakter, tidak boleh sama dengan serial aset lain di perusahaan ini. Contoh: `HW-MA5800-002`.
   - **Alamat MAC**: opsional, maksimal 255 karakter. Format tidak diperiksa.
   - **Alamat IP** dan **IP manajemen**: opsional, harus alamat IP yang sah (IPv4 atau IPv6). Petunjuk **Alamat IP**: "Alamat perangkat itu sendiri, bila tetap. Boleh kosong." Petunjuk **IP manajemen**: "Alamat untuk mengelola perangkat. Router NAS memakainya sebagai alamat NAS dan target CoA." Inbils ikut mencatat keduanya di register Alamat IP ([bagian 5.4](/docs/guides/web/network/ip-addresses/)). Isi **IP manajemen** bila router akan didaftarkan sebagai Router NAS ([bagian 5.3](/docs/guides/web/network/nas-routers/)). Router juga bisa dibuat langsung dari form pendaftaran Router NAS.
   - **Lokasi**: opsional. Ketik kode, nama atau jalur lokasi, lalu pilih. Hanya lokasi aktif yang tampil ([bagian 5.1](/docs/guides/web/network/locations/)). Kosongkan bila aset ada di gudang, sesuai petunjuk `Kosongkan jika aset masih di gudang.`
   - **Kepemilikan**: Milik sendiri (isian awal), Sewa atau Milik pelanggan.
   - **Vendor** dan **Model**: opsional, maksimal 255 karakter.
   - **Tanggal pembelian** dan **Tanggal garansi berakhir**: opsional. Ketik tanggal dengan format tanggal perusahaan, atau buka kalender dengan **Pilih tanggal**. **Hari ini** mengisi tanggal hari ini dan **Hapus tanggal** mengosongkan isian.
   - **Harga beli**: opsional, angka 0 atau lebih.
   - **Catatan**: opsional, teks bebas.
3. Klik **Simpan**. Anda kembali ke daftar dan muncul toast "Aset jaringan dibuat." Aset baru berstatus Tersedia. Inbils membuat kodenya sendiri, dengan format yang diatur di Penomoran ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)). Klik **Batal** untuk kembali ke daftar tanpa menyimpan.

## Mengubah aset

1. Di halaman rincian, klik **Ubah**.
2. Ubah isian di halaman **Ubah Aset Jaringan**. Aturannya sama dengan form buat. Produk dan lokasi yang sekarang tetap tampil di pilihannya, dan tanggal yang sudah tercatat sudah terisi. Kode dan status tidak ada di form ini.
3. Klik **Simpan**. Anda kembali ke daftar dan muncul toast "Aset jaringan diperbarui." Klik **Batal** untuk keluar tanpa menyimpan.

## Mengubah status aset

Status berubah hanya lewat tombol di kartu **Siklus hidup**. Tombol yang tampil mengikuti status aset:

| Status | Arti | Tombol yang tampil |
| --- | --- | --- |
| Tersedia | Belum terpasang. Status awal aset baru. | **Pasang aset**, **Pensiunkan aset** |
| Terpasang | Terpasang di sebuah lokasi. | **Lepas aset**, **Masukkan ke perawatan**, **Tandai rusak**, **Pensiunkan aset** |
| Perawatan | Terpasang, sedang dirawat. | **Selesaikan perawatan**, **Tandai rusak**, **Pensiunkan aset** |
| Rusak | Rusak, menunggu perbaikan. | **Selesai diperbaiki**, **Pensiunkan aset** |
| Dipensiunkan | Status akhir. | Tidak ada |

Setiap tombol punya izin dan isian sendiri:

| Tombol | Menjadi | Isian | Izin |
| --- | --- | --- | --- |
| **Pasang aset** | Terpasang | **Lokasi** (wajib) | `network_asset.install` |
| **Lepas aset** | Tersedia | **Alasan** (wajib) | `network_asset.remove` |
| **Masukkan ke perawatan** | Perawatan | **Alasan** (wajib) | `network_asset.maintenance` |
| **Selesaikan perawatan** | Terpasang | Tanpa isian | `network_asset.maintenance` |
| **Tandai rusak** | Rusak | **Alasan** (wajib) | `network_asset.repair` |
| **Selesai diperbaiki** | Tersedia | Tanpa isian | `network_asset.repair` |
| **Pensiunkan aset** | Dipensiunkan | **Alasan** (wajib) | `network_asset.retire` |

1. Di halaman rincian, klik tombol di kartu **Siklus hidup**. Jendela yang terbuka berjudul sama dengan tombolnya, dengan kalimat `Status aset menjadi <status>.`
2. Isi **Lokasi** (untuk **Pasang aset**: ketik kode, nama atau jalur, lalu pilih lokasi aktif) atau **Alasan** (untuk tombol lain yang memintanya). **Alasan** maksimal 500 karakter. Tombol **Pasang** baru aktif setelah Anda memilih lokasi. Galat isian tampil di bawah isian itu.
3. Klik tombol konfirmasi: **Pasang**, **Lepas**, **Mulai perawatan**, **Selesai perawatan**, **Tandai rusak**, **Selesai diperbaiki** atau **Pensiunkan**, sesuai tombol yang Anda buka. Klik **Batal** untuk menutup jendela. Muncul toast "Aset dipasang.", "Aset dilepas.", "Aset masuk perawatan.", "Aset kembali terpasang.", "Aset ditandai rusak.", "Aset diperbaiki." atau "Aset dipensiunkan."

Tombol **Pasang aset** hanya mencatat lokasi. Baris Pelanggan dan Langganan di kartu **Detail aset** terisi saat SPK instalasi disetujui.

**Lepas aset** dan **Selesai diperbaiki** mengosongkan lokasi, pelanggan, langganan dan tanggal pasang aset, lalu menutup baris aktif di **Riwayat pemasangan**. **Selesai diperbaiki** mencatat alasan `repair`.

**Pensiunkan aset** menutup baris aktif dengan alasan yang Anda isi dan mengisi tanggal **Dipensiunkan**. Lokasi, pelanggan dan langganan terakhir tetap tertulis di aset, dan tidak ada tombol untuk mengembalikan aset Dipensiunkan.

## Memasang aset lewat SPK instalasi

Teknisi memasang aset di rumah pelanggan, misalnya ONT, lewat SPK berjenis **Instalasi** di aplikasi teknisi. Di web, Anda menyiapkan item SPK dan menyetujui hasilnya ([bagian 3.3](/docs/guides/web/operations/work-orders/)).

1. Pastikan aset berstatus Tersedia dan isian **Produk**-nya terisi. Pastikan SPK punya **Lokasi**, **Pelanggan** dan **Langganan**.
2. Di halaman SPK, kartu **Item**, klik **Tambah item**. Pilih **Barang** bertipe Aset. Isian **Aset jaringan** muncul, wajib diisi, dan hanya menawarkan aset Tersedia dengan produk yang sama. Ketik kode atau nama aset, lalu pilih.
3. Setelah teknisi mengirim hasil kerja, pemegang izin `spk.approve` (admin atau manajer) mengklik **Setujui** pada SPK berstatus Menunggu review, lalu **Setujui** lagi di dialog **Setujui SPK**. Pembuat SPK dan teknisi yang ditugaskan tidak boleh menyetujui SPK itu sendiri. Server menolak dengan "Pembuat SPK tidak boleh menyetujui SPK sendiri." atau "Teknisi yang ditugaskan tidak boleh menyetujui SPK sendiri."
4. Saat itu Inbils memasang setiap aset di item SPK. Status aset menjadi Terpasang, lokasi, pelanggan dan langganan diambil dari SPK, dan satu baris baru muncul di **Riwayat pemasangan**. Inbils juga mengaktifkan langganan berstatus Menunggu.

Bila aset tidak lagi Tersedia atau produknya tidak cocok, persetujuan ditolak dengan pesan seperti "Aset jaringan yang dipilih harus berstatus tersedia." atau "Aset jaringan yang dipilih harus sesuai dengan barang pada item SPK."

## Menelusuri aset dengan Lacak Aset

Halaman **Lacak Aset** mencari aset dari serial, MAC, alamat IP atau kode, lalu menampilkan status, lokasi dan pelanggannya dalam satu tabel. Pakai halaman ini saat Anda hanya memegang serial di perangkat atau sebuah alamat IP dan perlu tahu di mana aset itu terpasang. Izinnya `network_asset.view`.

1. Buka alamat `/admin/network-assets/trace` di peramban. Halaman ini tidak punya tautan di sidebar maupun di daftar.
2. Isi **Cari** (petunjuk `Nomor seri, MAC, IP, atau kode`), lalu klik **Lacak**.
3. Baca tabel hasil dengan kolom **Nama**, **Kode**, **Tipe**, **Nomor seri**, **Status**, **Lokasi**, **Jalur**, **Pelanggan** dan **Langganan**. Kolom **Jalur** memuat jalur lokasi dari induk sampai lokasi aset. Sebelum Anda mencari, tabel menampilkan `Masukkan nomor seri, MAC, IP, atau kode, lalu pilih Lacak.` Bila tidak ada yang cocok, tabel menampilkan `Tidak ada aset yang cocok dengan "<kata>". Periksa penulisannya atau coba kata kunci lain.`

Pencarian mencocokkan sebagian teks, tetapi tidak mencari nama aset. Hasil tidak dibagi per halaman dan barisnya bukan tautan, jadi buka rincian aset lewat kotak **Cari** di daftar.

## Kesalahan umum

- Aset tidak muncul di isian **Aset jaringan** pada SPK: statusnya bukan Tersedia, atau **Produk**-nya berbeda dari produk item SPK. Perbaiki **Produk** lewat **Ubah**, atau kembalikan aset ke Tersedia dengan **Lepas aset** atau **Selesai diperbaiki**.
- SPK instalasi sudah disetujui tetapi aset tetap Tersedia: Inbils hanya memasang aset bila SPK berjenis **Instalasi**, punya **Lokasi**, dan item SPK memakai produk bertipe Aset. Lengkapi SPK sebelum disetujui.
- Serial ditolak dengan `nomor seri sudah digunakan.`: serial harus unik di perusahaan, termasuk terhadap aset Dipensiunkan. Cari serialnya dengan **Cari** di daftar.
- Alamat IP ditolak dengan pesan seperti `<alamat> sudah dipakai aset <kode>.`: alamat itu sudah tercatat di register Alamat IP atas pemegang lain. Pesan lain untuk pemegang lain berbunyi `<alamat> sudah dipakai langganan <kode>.` atau `<alamat> sudah dicadangkan (<catatan>).` Lepas pemegang itu lebih dulu atau pakai alamat lain ([bagian 5.4](/docs/guides/web/network/ip-addresses/)). Alamat yang bukan IP ditolak dengan `alamat IP harus berupa alamat IP yang valid.`
- Tombol **Ubah** atau tombol di **Siklus hidup** ditolak dengan galat 403: tombol tampil untuk semua pemegang `network_asset.view`, tetapi server memeriksa izin tiap aksi. Staf hanya punya `network_asset.view`. Minta admin menambah izin atau mengubah perannya ([bagian 8.6](/docs/guides/web/administration/roles/) dan [8.7](/docs/guides/web/administration/permissions/)).
- Tombol yang dicari tidak tampil di **Siklus hidup**: tombol mengikuti status. Misalnya **Pasang aset** hanya tampil saat status Tersedia, dan **Selesaikan perawatan** hanya saat Perawatan.
- Aksi status ditolak dengan pesan seperti "Aset harus berstatus tersedia untuk dipasang.", "Aset harus terpasang untuk dilepas.", "Aset harus dalam perawatan untuk dilanjutkan." atau "Aset sudah dipensiunkan.": status aset sudah berubah sejak halaman dibuka. Muat ulang halaman rincian dan baca status terbaru.
- Aset jaringan tidak punya tombol **Hapus**, baik di daftar maupun di rincian. Endpoint hapus hanya menerima admin dengan `network_asset.delete`, dan menolak aset Terpasang atau Perawatan dengan pesan "Aset yang terpasang atau dalam perawatan tidak dapat dihapus. Lepas dulu." Endpoint itu juga hanya menghapus permanen aset yang belum pernah dipakai data lain (riwayat pemasangan, item SPK, tiket, splitter atau port ODN, perangkat NAS, ONT langganan, port perangkat, atau perangkat di rak), dengan pesan seperti "Aset jaringan masih dipakai 1 riwayat pemasangan, jadi tidak bisa dihapus." Pakai **Lepas aset** lebih dulu bila penghapusan memang diperlukan. Untuk menghentikan pemakaian sambil mempertahankan riwayat, pakai **Pensiunkan aset**.
