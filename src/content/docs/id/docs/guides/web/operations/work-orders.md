---
title: "3.3 SPK"
description: "SPK (Surat Perintah Kerja) adalah perintah kerja lapangan untuk teknisi."
---

SPK (Surat Perintah Kerja) adalah perintah kerja lapangan untuk teknisi. Jenisnya **Instalasi** (pemasangan baru), **Perawatan** (perbaikan), **Peningkatan layanan** (naik paket), dan **Pindah lokasi**. Buka menu ini untuk membuat SPK, menugaskan teknisi, memeriksa material dan bukti kerja, lalu menyetujui hasilnya.

Teknisi mengerjakan SPK di aplikasi teknisi: berangkat (**Saya berangkat**), memulai, mencatat material, mengunggah foto, dan mengajukan hasil. Halaman SPK di web punya tombol **Mulai** dan **Ajukan review**, tetapi server hanya menerimanya dari teknisi yang ditugaskan pada SPK itu. **Saya berangkat** hanya ada di aplikasi. Web menampilkannya sebagai langkah **Dalam perjalanan** di kartu **Tahap kunjungan** (bagian di bawah) dan sebagai lencana di Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)).

Peran yang dapat memakai: admin, manajer, staf. Izin `spk.view` membuka menu dan daftar, `spk.create` membuat SPK, `spk.export` mengekspor daftar. Dengan peran bawaan:

- Admin memegang semua izin SPK.
- Manajer memegang `spk.view`, `spk.create`, `spk.update`, `spk.assign`, `spk.reassign`, `spk.approve`, `spk.reject`, `spk.cancel`, `spk.export`, dan `spk.manage`.
- Staf memegang `spk.view`, `spk.create`, `spk.start`, dan `spk.submit`.

Pengguna yang memegang `spk.start` atau `spk.submit` tetapi tidak `spk.assign` (staf bawaan) hanya melihat SPK yang ditugaskan kepadanya.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Operasional**, lalu klik **SPK**.
2. Baca daftar SPK.

   - Kotak **Cari** mencari pada nomor dan judul SPK (isian bertuliskan "Nomor atau judul...").
    - Pilihan **Jenis** berisi **Semua jenis**, **Instalasi**, **Perawatan**, **Peningkatan layanan**, dan **Pindah lokasi**. Pilihan **Status** berisi **Semua status**, delapan status SPK (**Draf**, **Menunggu penugasan**, **Ditugaskan**, **Dikerjakan**, **Menunggu review**, **Selesai**, **Dikembalikan**, dan **Dibatalkan**), **Dihapus**, dan **Semua, termasuk dihapus**.
   - Kolom: **Nomor** (tautan ke detail), **Judul**, **Jenis**, **Status** (lencana), **Pelanggan**, **Jadwal**, **Dibuat**. Semua kolom kecuali **Pelanggan** bisa diurutkan, dan urutan awal menaruh SPK terbaru di atas.
   - Tombol **Ekspor** (pemegang `spk.export`) membuka menu **Ekspor CSV** dan **Ekspor PDF**. Berkas memuat kolom Kode, Judul, Tipe, Status, Prioritas, Pelanggan, dan Teknisi sesuai pencarian dan filter aktif. Kolom Tipe, Status, dan Prioritas berisi nilai tersimpan (misalnya `maintenance`), bukan label lencana.
   - Tombol **Buat SPK** (pemegang `spk.create`) membuka form buat.
   - Tanpa data, tabel menampilkan "Belum ada SPK". Bila filter aktif, tabel menampilkan "Tidak ada SPK yang cocok" dengan tombol **Reset filter**.

   ![Daftar SPK dengan filter Jenis dan Status, tombol Ekspor, dan tombol Buat SPK](~/assets/guide/web/spk-index.webp)

3. Klik nomor SPK untuk membuka detail. Baris tidak punya tombol **Ubah**, **Lihat detail**, atau **Hapus**, kecuali baris SPK yang dihapus: menunya berisi **Pulihkan** (izin `spk.delete`), nomornya berupa teks biasa, dan SPK kembali dengan statusnya semula (toast "SPK dipulihkan.").

## Status SPK

SPK dari **Buat SPK** berstatus **Draf** dan bersumber manual. SPK dari pendaftaran pelanggan baru ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)) dan dari tiket ([bagian 3.4](/docs/guides/web/operations/tickets/)) langsung berstatus **Menunggu penugasan**. Bila pendaftaran memakai blok **Tugaskan sekarang**, SPK-nya langsung **Ditugaskan** ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)).

| Status | Arti | Langkah berikut | Siapa |
|---|---|---|---|
| **Draf** | SPK baru, belum siap | **Ubah**, **Terbitkan**, atau langsung **Tugaskan** | **Ubah** dan **Terbitkan**: `spk.update`. **Tugaskan**: `spk.assign` |
| **Menunggu penugasan** | Siap ditugaskan | **Ubah** atau **Tugaskan** | **Ubah**: `spk.update`. **Tugaskan**: `spk.assign` |
| **Ditugaskan** | Teknisi sudah ditunjuk. Setelah teknisi menekan **Saya berangkat** di aplikasi, status tetap **Ditugaskan** dan kartu **Tahap kunjungan** menunjukkan **Dalam perjalanan** | **Mulai** | Teknisi yang ditugaskan |
| **Dikerjakan** | Teknisi bekerja di lokasi | **Ajukan review** | Teknisi yang ditugaskan |
| **Menunggu review** | Hasil menunggu tinjauan | **Setujui** atau **Tolak** | `spk.approve` atau `spk.reject`, bukan pembuat dan bukan teknisi SPK |
| **Dikembalikan** | Ditolak peninjau lewat **Tolak**, alasan tampil di **Alasan penolakan** | **Tugaskan** ulang untuk kerja ulang | `spk.reassign` |
| **Selesai** | Disetujui, final | Tidak ada | Tidak ada |
| **Dibatalkan** | Dibatalkan, final | Tidak ada | Tidak ada |

**Terbitkan** hanya menandai SPK siap, jadi boleh dilewati. **Batalkan** (izin `spk.cancel`) tersedia pada semua status selain **Selesai** dan **Dibatalkan**. Teknisi yang ditugaskan berarti pengguna yang ditunjuk pada SPK itu, berstatus karyawan aktif, dan memegang `spk.start` atau `spk.submit`.

**Dikembalikan** adalah nama di layar untuk SPK yang ditolak peninjau lewat **Tolak**: SPK kembali ke kantor untuk ditugaskan ulang. Notifikasi dan toast untuk kejadian itu tetap menulis "SPK ditolak.", dan kolom Status di berkas ekspor berisi kode tersimpan.

SPK dari pendaftaran pelanggan baru berjenis **Instalasi** dan berjudul "Pemasangan &lt;kode langganan&gt; - &lt;nama pelanggan&gt;". SPK dari tiket berjenis **Perawatan** dan berjudul "SPK dari tiket TKT-..." (kode tiket).

## Membuat SPK

1. Di daftar SPK, klik **Buat SPK**.

   ![Form Buat SPK dengan kartu Data pekerjaan](~/assets/guide/web/spk-create.webp)

2. Isi kartu **Data pekerjaan**:
   - **Jenis**: wajib. Pilih **Instalasi** (isian awal), **Perawatan**, **Peningkatan layanan**, atau **Pindah lokasi**.
   - **Judul**: wajib, maksimal 255 karakter. Contoh: `E2E Dispatch SPK`.
   - **Pelanggan**: wajib untuk **Instalasi**, **Peningkatan layanan**, dan **Pindah lokasi**, opsional untuk **Perawatan**. Ketik nama atau kode pelanggan (minimal 2 huruf), lalu pilih dari hasil pencarian. Sebelum Anda mengetik, daftar menampilkan "Ketik minimal 2 huruf untuk mencari." Daftar memuat pelanggan aktif, paling banyak 20 hasil.
   - **Langganan**: aturan wajibnya sama dengan **Pelanggan**. Ketik kode langganan (minimal 2 huruf), lalu pilih. Daftar memuat langganan **Menunggu** dan **Aktif**, tiap pilihan bertuliskan kode langganan dengan nama pelanggan di bawahnya. Setelah Anda memilih pelanggan, daftar hanya memuat langganan milik pelanggan itu, dan pilihan langganan sebelumnya dikosongkan. Pilih pelanggan lebih dulu.
   - **Lokasi**: opsional, berisi lokasi aktif (kode dan nama). Ketik kode atau nama (minimal 2 huruf), lalu pilih. Isi bila SPK memakai barang dari stok atau memasang aset, karena stok dan aset mengikuti lokasi ini.
   - **Prioritas**: **Rendah**, **Sedang** (isian awal), **Tinggi**, atau **Mendesak**.
   - **Tanggal jadwal**: opsional, tanggal kunjungan. Isian kosong tertulis "Pilih tanggal". Ketik tanggal dalam format tanggal perusahaan, atau klik tombol **Buka kalender** lalu pilih tanggal (tombol **Hari ini** memilih hari ini, **Hapus tanggal** mengosongkan isian).
   - **Deskripsi**: opsional.
   - Pada ketiga isian pencarian, teks yang diketik belum memilih apa pun. Pilihan berubah hanya saat Anda memilih hasil lain atau klik tombol **Hapus pilihan**.
3. Klik **Simpan**. Daftar SPK terbuka dengan toast "SPK berhasil dibuat." SPK baru berstatus **Draf** dan bernomor otomatis (aturan nomor di [bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)). **Batal** kembali ke daftar tanpa menyimpan.

## Mengubah SPK

Izin: `spk.update` (admin, manajer). SPK hanya bisa diubah selama berstatus **Draf** atau **Menunggu penugasan**. Setelah ditugaskan, halaman ubah tidak bisa dibuka: jadwal bisa diganti lewat **Ganti teknisi** dengan mengisi **Tanggal kunjungan** (bagian "Menugaskan teknisi" di bawah), dan isian lain hanya bisa diperbaiki dengan membatalkan SPK lalu membuat yang baru.

1. Buka detail SPK berstatus **Draf** atau **Menunggu penugasan**, lalu klik **Ubah** di samping **Kembali**.

   ![Halaman Ubah SPK dengan kartu Data pekerjaan: Judul, Pelanggan, Langganan, Lokasi, Prioritas, Tanggal kunjungan, dan Deskripsi](~/assets/guide/web/spk-edit.webp)

2. Ubah isian di kartu **Data pekerjaan**. Di bawah judul kartu tertulis jenis dan status SPK, yang tidak bisa diubah di sini. **Judul** wajib. **Pelanggan** dan **Langganan** wajib untuk jenis **Instalasi**, **Peningkatan layanan**, dan **Pindah lokasi**, dan dicari seperti di **Buat SPK**: mengganti **Pelanggan** mengosongkan **Langganan**, jadi pilih langganannya lagi. **Lokasi**, **Prioritas**, dan **Deskripsi** bekerja seperti di **Buat SPK**. **Tanggal kunjungan** opsional.
3. Klik **Simpan**. Daftar SPK terbuka dengan toast "SPK berhasil diubah." Klik **Batal** untuk kembali ke detail tanpa menyimpan.

**Tanggal kunjungan** tidak boleh sebelum hari ini menurut zona waktu perusahaan: pesannya "Tanggal kunjungan tidak boleh sebelum hari ini." Tanggal yang sudah tersimpan di SPK boleh tetap, walau sudah lewat. Bila orang lain mengubah SPK itu sejak Anda membuka halaman, banner "Data diubah pengguna lain; muat ulang." muncul ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/), **Pesan benturan**). Bila status SPK sudah berubah, Inbils kembali ke detail SPK dengan toast "SPK hanya bisa diubah saat berstatus draf atau menunggu penugasan."

## Membuka detail SPK

1. Di daftar, klik nomor SPK di kolom **Nomor**.

   ![Detail SPK dengan tombol Ubah di kanan atas dan kartu Rincian, Tindakan, Item, dan Bukti](~/assets/guide/web/spk-show.webp)

2. Baca halaman dari atas ke bawah:
   - Judul halaman memuat judul SPK, dengan nomor SPK di bawahnya. Tombol **Kembali** kembali ke daftar. Tombol **Ubah** di sampingnya tampil bagi pemegang `spk.update` selama SPK berstatus **Draf** atau **Menunggu penugasan** (bagian "Mengubah SPK").
   - Kartu **Rincian** memuat **Status** dan **Jenis** (lencana), **Prioritas** (lencana), **Pelanggan**, **Langganan**, **Lokasi**, **Teknisi**, **Jadwal**, **Dimulai**, **Check-in**, dan **Selesai**. **Deskripsi**, **Hasil**, dan **Alasan penolakan** tampil bila terisi. Pada SPK **Selesai**, baris **Teknisi** dan **Lokasi** menulis nilai saat SPK disetujui (lihat "Yang terjadi saat SPK disetujui").
   - Baris **Lokasi** menunjukkan POP atau gudang SPK, bukan alamat pelanggan. Baris **Check-in** menunjukkan jarak ke alamat pemasangan pelanggan (ke **Lokasi** bila SPK tanpa langganan) bila aplikasi teknisi mencatat lokasi saat memulai, misalnya "820 m dari lokasi (akurasi ±12 m)". Jarak 1 km atau lebih ditulis dalam km, misalnya "119,3 km". Bila teknisi memulai lebih jauh dari batas jarak perusahaan, alasannya ditambahkan: "Jauh dari lokasi: {alasan}" (bagian "Jarak check-in saat memulai" di bawah). Bila lokasi tidak tersedia, baris menulis alasannya. Tanpa catatan, tertulis "Belum ada check-in". Baris **Port drop** (ODP dan nomor port yang dicadangkan untuk pelanggan, [bagian 5.5](/docs/guides/web/network/odn/)) tampil pada SPK **Instalasi** yang punya langganan, bagi pemegang `odn.view`.
   - Kartu **Tindakan** memuat tombol langkah berikut sesuai status. Pada gambar, SPK berstatus **Menunggu penugasan**, jadi hanya **Tugaskan** dan **Batalkan** yang tampil.
   - Kartu **Tahap kunjungan** di bawah **Tindakan** menunjukkan empat langkah kunjungan dengan waktunya (bagian **Tahap kunjungan** di bawah).
   - Kartu **Item** (kolom **Barang**, **Aset jaringan**, **Satuan**, **Terpakai**, **Catatan**), **Bukti**, dan **Riwayat penugasan** (kolom **Teknisi**, **Ditugaskan**, **Dicabut**).

Tombol **Setujui** dan **Tolak** hanya tampil bagi pemegang `spk.approve` dan `spk.reject`. Tombol lain tampil menurut status saja, dan server memeriksa izinnya saat tombol ditekan.

## Tahap kunjungan

Kartu **Tahap kunjungan** di kolom kanan halaman SPK menunjukkan jalannya kunjungan dalam empat langkah, dari atas ke bawah: **Ditugaskan**, **Dalam perjalanan**, **Sedang dikerjakan**, dan **Selesai dipasang**. Teknisi yang menekan **Saya berangkat** di aplikasi mengisi langkah kedua. Kartu ini hanya dibaca, dan tidak punya tombol.

- Langkah yang sudah dilalui memakai ikon centang dan menulis waktunya dalam format tanggal perusahaan. Langkah yang sedang berjalan memakai ikon bertitik dan menulis "Tahap sekarang," diikuti waktunya. Langkah yang belum tercapai memakai lingkaran kosong dan menulis "Belum dicapai". Ikon dan tulisan membawa artinya, bukan warna saja.
- Langkah yang sudah dilalui tanpa waktu menulis "waktu tidak tercatat". Ini wajar untuk SPK lama, atau bila teknisi langsung menekan **Mulai** tanpa **Saya berangkat**.
- **Selesai dipasang** tercapai saat teknisi mengirim hasil kerja (status **Menunggu review**) dan tetap tercentang setelah status **Selesai**. Waktunya adalah waktu pengiriman pertama pada kunjungan itu.
- SPK **Dikembalikan** menaruh lencana **Perlu perbaikan** di langkah **Sedang dikerjakan**, dan **Selesai dipasang** kembali "Belum dicapai".
- Bila SPK ditugaskan ulang (kepada teknisi lain, atau setelah ditolak), kartu mulai lagi dari **Ditugaskan** dengan waktu penugasan yang baru. Waktu berangkat dan waktu selesai dipasang dari kunjungan sebelumnya tidak tampil lagi.
- SPK **Dibatalkan** mengganti keempat langkah dengan tulisan **Dibatalkan**. SPK **Draf** dan **Menunggu penugasan** menampilkan keempat langkah "Belum dicapai".

Pelanggan melihat langkah yang sama di aplikasinya (bagian **Kunjungan teknisi** di panduan aplikasi pelanggan) dan menerima notifikasi "Teknisi dalam perjalanan" saat langkah kedua terisi.

## Menugaskan teknisi

Izin: `spk.assign`, atau `spk.reassign` bila SPK sudah punya teknisi (misalnya setelah ditolak).

1. Buka SPK berstatus **Draf**, **Menunggu penugasan**, atau **Dikembalikan**.
2. Klik **Tugaskan**. Dialog **Tugaskan SPK** terbuka.
3. Di **Teknisi** (wajib), ketik nama, nomor karyawan, organisasi, atau telepon ("Cari karyawan teknisi"), lalu klik teknisi dari hasil pencarian. Teks yang diketik belum memilih teknisi. Selama isian kosong, tombol saran "Gunakan: {nama} (beban terendah: {n} SPK hari ini)" menunjuk teknisi dengan SPK terbuka paling sedikit hari ini. Klik tombol itu untuk memakainya, atau pilih orang lain: saran tidak memilih apa pun.
4. Isi **Tanggal kunjungan** bila perlu. Isian opsional ini sudah berisi jadwal SPK bila tanggalnya belum lewat, dan "Kosong berarti jadwal SPK tidak berubah" (petunjuk di bawah isian). Aturan tanggalnya sama dengan di Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)). Dialog **Ganti teknisi** punya isian yang sama.
5. Klik **Tugaskan**. Muncul toast "{kode} ditugaskan ke {nama teknisi}.", status menjadi **Ditugaskan**, dan **Riwayat penugasan** menambah satu baris. **Batal** menutup dialog tanpa menyimpan.

Pada penugasan pertama SPK **Instalasi**, Inbils membuat akun PPPoE langganan secara otomatis bila belum ada. Nama pengguna berasal dari kode pelanggan dan dibuat unik. Kegagalan karena profil RADIUS atau realm belum siap tidak membatalkan penugasan. Perbaiki pengaturan jaringan, lalu gunakan proses sinkronisasi yang tersedia.
Teknisi yang ditugaskan melihat kartu **Akun PPPoE** di aplikasi teknisi. Nama pengguna selalu terlihat. Kata sandi hanya terbuka setelah **Tampilkan**, tersamar lagi setelah 60 detik atau saat layar ditutup, dibatasi 5 kali per menit, dan setiap pengungkapan dicatat di Log Audit. Secret tidak disimpan di cache offline atau log aplikasi.

Daftar **Teknisi** memuat karyawan aktif ([bagian 8.3](/docs/guides/web/administration/employees/)) yang akun penggunanya aktif dan memegang `spk.start` atau `spk.submit`, lewat perannya atau sebagai izin langsung. Tiap pilihan menampilkan nama, dengan nomor karyawan, organisasi, dan telepon di bawahnya. Bila tidak ada yang cocok, tertulis "Tidak ada karyawan teknisi yang cocok."

Bila WhatsApp perusahaan aktif, teknisi menerima pesan berisi nomor, judul, tanggal kunjungan, dan tautan SPK. Pelanggan menerima satu pesan jadwal pada penugasan pertama, bila SPK punya **Pelanggan** dan **Jadwal**.

Untuk mengganti teknisi SPK berstatus **Ditugaskan** atau **Dikerjakan**, klik **Ganti teknisi** di halaman SPK atau pakai Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)). Penggantian saat **Dikerjakan** mengembalikan SPK ke **Ditugaskan** untuk teknisi baru dan memulai ulang waktu kunjungan. Bila teknisi yang sama dipilih lagi pada SPK **Dikerjakan**, progresnya dipertahankan. Bila dialog menampilkan alert **SPK sudah berubah** dengan pesan "Konflik penugasan: SPK ini sudah ditugaskan oleh pengguna lain.", pengguna lain mengubah SPK lebih dulu. Klik **Muat ulang SPK**, lalu ulangi.

## Memulai dan mengajukan SPK

Teknisi melakukan kedua langkah ini di aplikasi teknisi, sesudah **Saya berangkat** yang hanya ada di aplikasi. Di web, **Mulai** dan **Ajukan review** ada di halaman SPK dan di Pekerjaan Saya ([bagian 3.6](/docs/guides/web/operations/my-work/)).

1. Buka SPK berstatus **Ditugaskan**.
2. Klik **Mulai**. Dialog **Mulai SPK** terbuka.
3. Klik **Mulai** di dialog. Status menjadi **Dikerjakan** dan **Dimulai** terisi, dengan toast "SPK mulai dikerjakan." Izin `spk.start`.
4. Setelah SPK punya bukti, klik **Ajukan review**. Dialog **Ajukan SPK untuk review** terbuka.
5. Klik **Ajukan** di dialog. Status menjadi **Menunggu review**, dengan toast "SPK diajukan untuk review." Izin `spk.submit`.

Server hanya menerima kedua tindakan dari teknisi yang ditugaskan pada SPK itu. Admin yang tidak ditunjuk ditolak, walau tombolnya tampil.

Pengajuan juga ditolak dengan pesan "Bukti pekerjaan wajib diunggah sebelum SPK diajukan." bila SPK belum punya bukti. Ia ditolak pula dengan pesan "Seluruh sisa material dari permintaan barang harus dideklarasikan terlebih dahulu sebelum SPK diajukan." bila permintaan barang berstatus **Diserahkan** yang ditautkan ke SPK ([bagian 6.1](/docs/guides/web/inventory/item-requests/)) masih punya sisa material yang belum dideklarasikan ([bagian 6.8](/docs/guides/web/inventory/material-returns/)).

## Jarak check-in saat memulai

Saat teknisi menekan **Mulai** di aplikasi teknisi, aplikasi mengirim lokasinya. Bila jaraknya ke alamat pemasangan pelanggan (ke **Lokasi** SPK bila SPK tanpa langganan) lebih jauh dari batas perusahaan, aplikasi menulis "Jauh dari lokasi pelanggan" dan meminta **Alasan** lebih dulu. Tanpa alasan, SPK tidak dimulai. Admin mengatur batas itu di **Pengaturan Perusahaan**, kartu **Lapangan**, isian **Jarak check-in maksimal (meter)** ([bagian 8.1](/docs/guides/web/administration/company/)). Selama belum diubah, batasnya 500 meter. **Saya berangkat** tidak kena aturan ini, dan **Mulai** dari web tidak mengirim lokasi, jadi aturan ini hanya berlaku di aplikasi. Hasilnya tampil di baris **Check-in** pada kartu **Rincian**, di panel tinjau **Persetujuan**, dan di halaman tiket untuk tiket ([bagian 3.4](/docs/guides/web/operations/tickets/)): jaraknya, disusul "Jauh dari lokasi: {alasan}". Lokasi yang tidak tersedia (izin ditolak, GPS mati) dan alamat tanpa koordinat tidak dihitung jauh.

## Mengelola item material

Izin: `spk.update` (admin, manajer). Kartu **Item** mencatat barang dan perangkat SPK. **Terpakai** adalah jumlah yang dipakai, dan stok baru berkurang saat SPK disetujui, sebesar **Terpakai**. SPK tidak mencadangkan stok.

1. Di kartu **Item**, klik **Tambah item**. Dialog **Tambah item** terbuka. Tombol ini tampil selama SPK berstatus **Draf**, **Menunggu penugasan**, **Ditugaskan**, **Dikerjakan**, atau **Dikembalikan**. Pada SPK **Menunggu review**, **Selesai**, dan **Dibatalkan** tombolnya hilang dan kartu menulis "Item dikunci selama SPK menunggu review.", "SPK selesai, item tidak bisa diubah." atau "SPK dibatalkan, item tidak bisa diubah." Bila SPK belum punya baris, kartu menampilkan "Belum ada barang di SPK ini." dengan petunjuk memakai **Tambah item**.

   ![Dialog Tambah item dengan isian Barang, Jumlah terpakai, dan Catatan](~/assets/guide/web/spk-add-item.webp)

2. Isi dialog:
   - **Barang**: wajib. Ketik nama atau SKU (minimal 2 huruf), lalu pilih produk aktif. Tiap pilihan tertulis "SKU - Nama", dengan kategori di bawahnya.
   - **Aset jaringan**: tampil dan wajib hanya bila barang bertipe **Aset**. Ketik kode atau nama aset (minimal 2 huruf), lalu pilih. Daftar memuat aset **Tersedia** milik barang itu, tertulis "kode - nama".
   - **Jumlah terpakai**: angka 0 atau lebih dengan dua desimal. Boleh dikosongkan, dan kosong dihitung 0. Setelah barang dipilih, labelnya memuat satuan barang, misalnya "Jumlah terpakai - Meter (m)".
   - **Catatan**: opsional, maksimal 500 karakter.
3. Klik **Tambah**. Muncul toast "Item berhasil ditambahkan." dan baris tampil di tabel. **Batal** menutup dialog tanpa menyimpan. Bila server menolak satu isian dialog, dialog tetap terbuka dan pesan merah tampil di bawah isian itu, misalnya "Aset jaringan yang dipilih sedang terpasang." di bawah **Aset jaringan**. Perbaiki isian, lalu klik **Tambah** lagi.

Dialog **Tambah item** tidak punya isian cadangan, karena SPK tidak mencadangkan stok. Satu produk hanya punya satu baris, jadi menambah produk yang sama menimpa jumlah, catatan, dan aset pada baris lama dengan isian terbaru. Web tidak punya tombol hapus baris, walau rute hapus server memerlukan `spk.update`.

Teknisi mengisi **Terpakai** produk biasa di aplikasi saat SPK **Dikerjakan**. Teknisi dapat menarik kembali pemakaian itu selama status masih **Dikerjakan**; baris rencana tetap ada dengan **Terpakai** 0, sedangkan baris tanpa rencana atau catatan dihapus. Teknisi tidak dapat menambah atau menghapus baris produk **Aset**; baris itu hanya dikelola kantor di web.

## Mengunggah bukti kerja

Izin di web: `spk.update` (admin, manajer), selama SPK belum **Selesai** atau **Dibatalkan**. Pengguna lain tidak melihat formulir unggah. Teknisi yang ditugaskan mengunggah foto dari aplikasi saat SPK **Dikerjakan**.

1. Di kartu **Bukti**, klik **telusuri** pada area "Seret berkas ke sini atau telusuri" (isian **Berkas bukti**, wajib), atau seret satu berkas ke area itu.
2. Isi **Keterangan** bila perlu (opsional, maksimal 255 karakter).
3. Klik **Unggah**. Tombol ini baru aktif setelah ada berkas. Bilah "Mengunggah bukti" menunjukkan kemajuan, lalu muncul toast "Bukti berhasil diunggah."

Berkas boleh `jpg`, `jpeg`, `png`, `pdf`, `doc`, atau `docx`, maksimal 10 MB, satu berkas per unggahan. Berkas dengan jenis yang tidak diizinkan ditolak di area unggah dengan "Jenis berkas tidak diizinkan". Penolakan oleh server menampilkan toast "Bukti gagal diunggah." dengan keterangan "Periksa jenis berkas yang diizinkan dan ukuran maksimal 10 MB."

Daftar bukti menampilkan **Foto** atau **Dokumen**, keterangan (atau nama berkas), dan waktu unggah. Gambar punya tombol **Buka** (tab baru) dan **Unduh**, sedangkan PDF dan dokumen Word hanya punya **Unduh**.

Web tidak punya tombol hapus bukti. Rute hapus server hanya menerima pemegang `spk.update` selama SPK belum **Selesai** atau **Dibatalkan**, atau pengunggah sendiri yang memegang `spk.evidence.upload` selama SPK **Dikerjakan**.

## Menyetujui, menolak, dan membatalkan SPK

Izin: `spk.approve` untuk **Setujui**, `spk.reject` untuk **Tolak**, `spk.cancel` untuk **Batalkan**. Antrean **Persetujuan** ([bagian 3.2](/docs/guides/web/operations/approvals/)) menampilkan SPK **Menunggu review** dan memakai aturan yang sama.

1. Buka SPK berstatus **Menunggu review**, lalu periksa jumlah **Terpakai** di kartu **Item** dan berkas di kartu **Bukti**.
2. Untuk menyetujui, klik **Setujui**. Dialog **Setujui SPK** terbuka dan memuat daftar dampak persetujuan: pelanggan dan langganan yang menjadi aktif, tagihan pemasangan (jumlah, dan apakah langsung dikirim atau menjadi draf), akun PPPoE yang dibuat, dan jumlah barang yang dikurangi dari stok. Daftar hanya memuat langkah yang benar-benar terjadi pada SPK itu.
3. Klik **Setujui** di dialog. Muncul toast "SPK disetujui.", status menjadi **Selesai**, dan **Selesai** di kartu **Rincian** terisi.
4. Untuk menolak, klik **Tolak**. Dialog **Tolak SPK** terbuka.
5. Isi **Alasan** (wajib, maksimal 500 karakter), lalu klik **Tolak** di dialog. Muncul toast "SPK ditolak.", status menjadi **Dikembalikan**, dan alasan tampil di baris **Alasan penolakan**.
6. Untuk membatalkan, klik **Batalkan** di kartu **Tindakan**. Dialog **Batalkan SPK** terbuka.
7. Isi **Alasan** (wajib, maksimal 500 karakter), lalu klik **Batalkan** di dialog. Muncul toast "SPK dibatalkan." dan status menjadi **Dibatalkan**.

Pembuat SPK dan teknisi yang ditugaskan tidak boleh menyetujui atau menolak SPK itu, termasuk admin. SPK dari pendaftaran pelanggan atau dari tombol **Buat SPK** di halaman tiket tercatat dibuat oleh orang yang melakukannya, jadi orang itu butuh rekan lain untuk menyetujuinya.

Persetujuan butuh minimal satu bukti. Bila SPK punya permintaan barang **Diserahkan**, semua retur materialnya harus berstatus **Diterima** atau **Selisih diselesaikan** ([bagian 6.8](/docs/guides/web/inventory/material-returns/)).

Pembatalan tidak bisa dibalik, dan alasannya hanya tercatat di Log Audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)). Pembatalan dan penolakan tidak menggerakkan stok, karena SPK tidak mencadangkan stok. Permintaan barang yang sudah **Diserahkan** untuk SPK itu tidak berubah.

## Yang terjadi saat SPK disetujui

**Setujui** menjalankan langkah berikut dalam satu transaksi. Bila satu langkah gagal, SPK tetap **Menunggu review** dan tidak ada yang berubah. Persetujuan tidak bisa dibatalkan dari web.

- Setiap baris dengan **Terpakai** lebih dari 0 mengurangi stok produk sebesar **Terpakai**, dengan mutasi **Keluar** bercatatan "SPK &lt;nomor SPK&gt;" ([bagian 6.7](/docs/guides/web/inventory/stock-movements/)). Jumlah yang sudah dikeluarkan lewat permintaan barang **Diserahkan** untuk SPK ini tidak dikurangi dua kali. Bila **Terpakai** melebihi jumlah yang diserahkan, selisihnya keluar dari gudang permintaan itu (lokasi sumber barisnya, atau **Gudang Tujuan** permintaan), bukan dari **Lokasi** SPK. Barang yang tidak pernah diminta keluar dari **Lokasi** SPK.
- Tanpa **Lokasi**, aset tidak dipasang, dan stok barang yang tidak pernah diminta lewat permintaan barang tidak berubah. Stok yang kurang membuat persetujuan gagal.
- Pada SPK **Instalasi**, setiap baris produk **Aset** memasang **Aset jaringan** yang dipilih: aset berstatus **Terpasang** pada lokasi, pelanggan, dan langganan SPK ([bagian 5.2](/docs/guides/web/network/network-assets/)). Aset pertama dicatat sebagai ONT langganan bila langganan belum punya.
- Langganan SPK yang berstatus **Menunggu** menjadi **Aktif**, dengan tanggal aktivasi hari itu dan tanggal tagihan berikutnya dari hari tagih langganan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)). Jenis **Peningkatan layanan** dan **Pindah lokasi** tidak mengubah paket, alamat, atau aset langganan.
- Pada SPK **Instalasi**, sistem memastikan akun PPPoE langganan sudah ada. Akun biasanya dibuat saat SPK pertama kali ditugaskan. Persetujuan hanya menjadi pengaman bila akun masih belum ada.
- Bila SPK **Instalasi** punya biaya yang dapat ditagih, sistem selalu membuat satu tagihan **Sekali bayar**. Baris biaya paket berlabel **Biaya pemasangan**. Bahan terpakai tidak ditagih secara bawaan. Bila **Tagihkan bahan terpakai** menyala di **Pengaturan Perusahaan**, tiap bahan menjadi baris **Bahan terpakai: {nama barang}** dengan harga jualnya.
- Bila **Kirim tagihan pemasangan otomatis** menyala, tagihan langsung dikirim dan pelanggan dapat melihatnya. Bila saklar mati, tagihan tetap **Draf**, pemegang `billing.send` menerima lonceng dan push, dan Dasbor Keuangan menampilkan kartu **Tagihan draf menunggu dikirim** beserta total nilainya.
- SPK menjadi **Selesai** dan menyimpan nama teknisi, kode lokasi, dan unit organisasi teknisi pada saat itu. Mengganti nama akun teknisi atau kode lokasi sesudahnya tidak mengubah SPK yang sudah selesai. Bila nilainya sekarang berbeda, kartu **Rincian** menulis nilai yang tersimpan disusul "(saat selesai)" pada baris **Teknisi** dan **Lokasi**.

Satu SPK paling banyak punya satu tagihan. Tagihan tidak dibuat bila SPK tidak punya biaya pemasangan atau bahan yang dipilih untuk ditagih.

## Langkah berikut setelah SPK instalasi selesai

Pada SPK **Instalasi** berstatus **Selesai**, kartu **Langkah berikut** tampil di bawah **Tahap kunjungan**. Kartu memuat satu baris per hal yang tersisa, dan hanya baris yang boleh Anda kerjakan:

- Tagihan masih draf: "Tagihan {nomor} Rp ... masih draf", tombol **Kirim tagihan** (butuh `billing.send`). Dialog konfirmasi menyebut pelanggan, jumlah, dan jatuh tempo.
- Tagihan sudah dikirim: "Tagihan {nomor} terkirim", berupa tautan ke tagihan.
- Belum ada tagihan: "Belum ada tagihan pemasangan", tombol **Buat tagihan pemasangan** (butuh `billing.create`). Baris ini hanya tampil bila SPK punya biaya yang dapat ditagih.
- Akun PPPoE ada: "Akun PPPoE {username} sudah dibuat", tombol **Buka akun jaringan**.
- Akun PPPoE belum ada: **Buat akun jaringan**, yang membuka halaman akun jaringan langganan. Baris ini hanya tampil bila RADIUS menyala untuk perusahaan.

## Kesalahan umum

- Pesan "Pelanggan dan langganan wajib diisi untuk jenis SPK ini." muncul di **Pelanggan**: jenis **Instalasi**, **Peningkatan layanan**, dan **Pindah lokasi** butuh pelanggan dan langganan. Isi keduanya (pilih pelanggan dulu, lalu langganannya), atau pilih **Perawatan** bila pekerjaan tidak terkait langganan.
- Pesan "Langganan bukan milik pelanggan yang dipilih." muncul di **Langganan**: langganan yang dipilih milik pelanggan lain. Pilih pelanggan lebih dulu, lalu pilih langganan dari daftar yang sudah menyempit.
- Staf membuat SPK tetapi tidak melihatnya di daftar: daftar staf hanya memuat SPK yang ditugaskan kepadanya. SPK tetap ada dan terlihat oleh manajer dan admin.
- Isian SPK salah setelah **Simpan**: selama SPK masih **Draf** atau **Menunggu penugasan**, klik **Ubah** di halaman SPK. Setelah SPK ditugaskan, hanya jadwalnya yang bisa diganti, lewat **Ganti teknisi**. Untuk perbaikan lain, **Batalkan** SPK lalu buat SPK baru. Server hanya menghapus SPK **Draf** atau **Dibatalkan**, untuk pemegang `spk.delete` (admin), tetapi tidak ada layar yang memanggilnya.
- Tombol **Mulai**, **Ajukan review**, atau **Tugaskan** tampil tetapi ditolak: tombol mengikuti status, sedangkan izin dan penunjukan teknisi diperiksa server. Hanya teknisi yang ditugaskan boleh memulai dan mengajukan, termasuk bila Anda admin.
- **Setujui** gagal dan hanya muncul toast "Data gagal disimpan. Periksa input.": dialog di halaman SPK tidak menulis penyebabnya. Penyebab yang mungkin: Anda pembuat atau teknisi SPK itu, bukti belum ada, retur material belum **Diterima** atau **Selisih diselesaikan**, atau stok di **Lokasi** kurang. Buka SPK dari **Persetujuan** ([bagian 3.2](/docs/guides/web/operations/approvals/)) supaya penyebabnya tampil di panel tinjauan, atau minta orang lain menyetujui.
- Tombol **Tambah item** hilang dan kartu **Item** menulis "Item dikunci selama SPK menunggu review.", "SPK selesai, item tidak bisa diubah." atau "SPK dibatalkan, item tidak bisa diubah.": item hanya bisa diubah sampai SPK diajukan untuk review. SPK **Dikembalikan** masih bisa diubah itemnya. Bila SPK berpindah status saat dialog **Tambah item** terbuka, server menolak dengan "Item SPK tidak bisa diubah saat SPK menunggu review, selesai, atau dibatalkan."
- Stok tidak berkurang dan aset tidak terpasang setelah **Setujui**: SPK tidak punya **Lokasi**. Isi **Lokasi** lewat **Ubah** selama SPK masih **Draf** atau **Menunggu penugasan**. Setelah SPK ditugaskan, **Lokasi** tidak bisa diubah: batalkan SPK dan buat yang baru dengan **Lokasi** terisi.
- Tagihan tidak muncul setelah **Setujui**: SPK bukan jenis **Instalasi**, atau SPK tidak punya biaya pemasangan dan tidak punya bahan yang diaktifkan untuk ditagih. Periksa **Kirim tagihan pemasangan otomatis** untuk menentukan apakah tagihan yang dibuat langsung dikirim atau tetap **Draf**.
- Jumlah salah pada **Tambah item**: tambahkan lagi produk yang sama dengan jumlah yang benar, dan baris lama diganti.
- Unggahan bukti ditolak: berkas bukan `jpg`, `jpeg`, `png`, `pdf`, `doc`, atau `docx`, atau lebih dari 10 MB. Formulir unggah tidak tampil bagi pengguna tanpa `spk.update`, atau bila SPK sudah **Selesai** atau **Dibatalkan**.
- Tombol **Batal** di dalam dialog hanya menutup dialog. Untuk membatalkan SPK, klik **Batalkan** di kartu **Tindakan**.
- Pesan "Tanggal kunjungan tidak boleh sebelum hari ini." di **Ubah SPK** atau di dialog **Tugaskan** dan **Ganti teknisi**: pilih hari ini atau sesudahnya. Isian **Tanggal jadwal** di **Buat SPK** tidak punya batas ini.
- Tombol **Ubah** tidak tampil: SPK sudah **Ditugaskan** atau lebih jauh, atau Anda tidak memegang `spk.update`. Membuka alamat ubah langsung mengembalikan Anda ke detail SPK dengan toast "SPK hanya bisa diubah saat berstatus draf atau menunggu penugasan."
