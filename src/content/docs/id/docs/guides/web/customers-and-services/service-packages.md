---
title: "4.2 Paket Layanan"
description: "Paket Layanan adalah katalog paket internet yang dijual ke pelanggan."
---

Paket Layanan adalah katalog paket internet yang dijual ke pelanggan. Satu paket menggabungkan satu profil bandwidth, satu profil kecepatan dan satu tingkat SLA, ditambah harga bulanan dan harga pemasangan. Buka menu ini saat Anda menambah paket baru, mengubah harga, atau menonaktifkan paket yang tidak dijual lagi.

Peran yang dapat memakai: admin, manajer, staf. Izin: `service.view` atau `service.manage` membuka menu dan daftar, `service.create` membuat paket, `service.update` mengubah paket, `service.delete` menghapus paket, `service.export` mengekspor daftar. Izin `service.manage` sudah mencakup lihat, buat, ubah dan hapus, tetapi tidak mencakup ekspor. Dengan peran bawaan: admin memegang semua izin, manajer memegang `service.view`, `service.create`, `service.update` dan `service.manage` (tanpa ekspor), staf hanya `service.view`. Teknisi dan pelanggan tidak punya izin layanan.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Pelanggan & Layanan**, lalu klik **Paket Layanan**.
2. Baca daftar paket.

   - Kotak **Cari** (isian "Nama atau kode") mencari kode dan nama paket.
   - Filter **Status** berisi **Semua status**, **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus** ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/)).
   - Filter **Tingkat SLA** adalah kotak cari: ketik untuk mencari, lalu pilih. Isinya semua tingkat SLA perusahaan. Selama belum ada pilihan, kotak menampilkan **Semua tingkat**. Ikon X di kotak itu mengosongkan filter.
   - Filter **Kategori** bekerja sama dan menampilkan **Semua kategori** selama belum ada pilihan. Isinya semua kategori perusahaan. Kategori nonaktif tampil dengan tulisan `(nonaktif)`.
   - Tombol **Reset filter** muncul bila ada filter atau pencarian yang aktif. Bila tidak ada paket yang cocok, daftar menampilkan "Tidak ada paket yang cocok" dengan tombol **Reset filter** yang sama.
   - Kolom: **Nama**, **Kode**, **Kategori**, **Harga bulanan**, **Harga pemasangan**, **Status** (lencana **Aktif** atau **Nonaktif**), **Dibuat** dan **Aksi**. Kolom **Kategori** dan **Aksi** tidak bisa diurutkan, kolom lain bisa.
   - Nama paket adalah tautan ke halaman rincian.
   - Tombol **Ekspor** muncul hanya bagi pemegang `service.export`. Menunya berisi **Ekspor CSV** dan **Ekspor PDF**. Ekspor memakai pencarian dan filter yang sedang aktif, dengan kolom Kode, Nama, Bandwidth, Kecepatan, SLA, Kategori, Biaya bulanan, Biaya pemasangan dan Status.
   - Tombol **Buat Paket Layanan** muncul bagi pemegang `service.create` atau `service.manage`.

   ![Daftar Paket Layanan dengan kotak Cari, filter Status, Tingkat SLA dan Kategori, serta kolom Nama, Kode, Kategori, Harga bulanan, Harga pemasangan, Status, Dibuat dan Aksi](~/assets/guide/web/service-packages.webp)

3. Klik nama paket untuk membuka halaman rincian. Kartu **Rincian paket** memuat kategori, profil bandwidth, profil kecepatan, tingkat SLA, masa kontrak minimum dan deskripsi (baris deskripsi hanya tampil bila diisi). Kartu **Harga dan status** memuat harga bulanan, harga pemasangan dan status. Masa kontrak `0` tampil sebagai tanda hubung. Dari sini tombol **Ubah** membuka form ubah dan **Kembali** membawa Anda ke daftar.

Di setiap baris, tombol **Ubah** membuka form ubah. Menu **Aksi lainnya** berisi **Lihat detail** dan **Nonaktifkan** atau **Aktifkan**, serta **Hapus permanen** bila paket belum pernah dipakai. Baris paket yang dihapus hanya punya **Pulihkan**. Tombol dan menu ini tampil untuk semua orang yang bisa melihat daftar. Server menolak aksi dari pengguna tanpa izin yang sesuai dengan halaman **Akses ditolak**. Cara kerja tombol dan dialognya ada di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).

## Menyiapkan bahan paket

Form paket hanya menawarkan profil bandwidth, profil kecepatan dan tingkat SLA yang berstatus aktif. Buat dulu ketiganya, lihat [bagian 4.3](/docs/guides/web/customers-and-services/bandwidth-profiles/), [4.4](/docs/guides/web/customers-and-services/speed-profiles/) dan [4.5](/docs/guides/web/customers-and-services/sla-tiers/), baru buat paketnya. Atau buat yang kurang langsung dari form paket lewat tombol **+ Baru** (lihat "Membuat paket").

## Membuat paket

1. Klik **Buat Paket Layanan**. Halaman **Buat Paket Layanan** terbuka dengan kartu **Data paket**.
2. Isi form:
   - **Kode**: wajib, maksimal 255 karakter, tidak boleh sama dengan kode paket lain di perusahaan yang sama. Contoh: `PKG-HOME-50`. Selama **Kode** kosong dan **Nama** sudah terisi, tombol saran muncul di bawah isian, misalnya **Gunakan: PKG-HOME-50MBPS** untuk nama `Home 50Mbps`. Klik tombol itu untuk mengisi kode. Saran berupa `PKG-` diikuti nama dalam huruf besar, tanpa tanda baca, dengan kata dipisah strip (paling panjang 50 karakter). Server tetap memeriksa bahwa kode itu belum dipakai. Tombol saran hanya ada di form buat.
   - **Nama**: wajib, maksimal 255 karakter. Contoh: `Home 50Mbps`.
   - **Kategori**: wajib. Ketik untuk mencari, lalu pilih salah satu kategori aktif (lihat Kategori Paket di bawah). Pada form ubah, kategori nonaktif yang sedang dipakai paket tetap tampil.
   - **Profil bandwidth**: wajib. Ketik untuk mencari, lalu pilih dari profil bandwidth aktif.
   - **Profil kecepatan**: wajib. Ketik untuk mencari, lalu pilih dari profil kecepatan aktif.
   - **Tingkat SLA**: wajib. Ketik untuk mencari, lalu pilih dari tingkat SLA aktif.
   - Di bawah **Profil bandwidth**, **Profil kecepatan**, dan **Tingkat SLA** ada tombol **+ Baru**. Tombol itu membuka dialog kecil untuk membuat baris baru tanpa meninggalkan form paket (butuh Buat layanan, `service.create`, atau Kelola layanan, `service.manage`). Klik **Simpan** di dialog: baris baru langsung aktif dan terpilih di isian itu, sedangkan isian paket lain tetap seperti semula. Klik **Batal** untuk menutup dialog. Isian dialog semuanya wajib, dan pesan galat tampil di bawah isiannya. Bila server gagal, dialog menulis "Gagal menyimpan. Coba lagi." Baris yang dibuat lewat dialog tersimpan saat itu juga, walau Anda kemudian membatalkan form paket. Form ubah punya tombol yang sama.
     - **Profil bandwidth baru**: **Nama**, **Unduh (Mbps)**, **Unggah (Mbps)**, **Tipe** (**Shared** atau **Dedicated**, isian awal **Shared**) dan, untuk **Shared**, **Rasio kontensi** (isian awal `4`).
     - **Profil kecepatan baru**: **Nama**, **Unduh maksimum (Mbps)** dan **Unggah maksimum (Mbps)**. Kedua angka terisi dari profil bandwidth yang sudah Anda pilih di form paket, dan bisa diubah. Dialog tidak punya isian burst dan **Nama profil RADIUS**. Isi keduanya lewat **Ubah** di Profil Kecepatan ([bagian 4.4](/docs/guides/web/customers-and-services/speed-profiles/)), karena akun jaringan butuh nama profil RADIUS.
     - **Tingkat SLA baru**: **Nama**, **Target respons (jam)** dan **Target penyelesaian (jam)**. Dialog menulis "Target dihitung 24 jam. Ubah hitungan tenggat di halaman Tingkat SLA bila perlu." ([bagian 4.5](/docs/guides/web/customers-and-services/sla-tiers/)).
   - **Harga bulanan**: wajib, angka 0 atau lebih. Ini harga langganan per bulan (MRC, Monthly Recurring Charge).
   - **Harga pemasangan**: angka 0 atau lebih, isian awal `0`. Ini biaya sekali bayar untuk pemasangan (OTC, One-Time Charge). Isi `0` bila paket tidak memungut biaya pemasangan. Jangan dikosongkan.
   - **Masa kontrak minimum (bulan)**: bilangan bulat 0 atau lebih, isian awal `0`. Isi `0` bila paket tanpa kontrak. Jangan dikosongkan.
   - **Aktif**: saklar, aktif secara awal. Paket nonaktif tidak muncul di pilihan paket pada form pelanggan dan langganan.
   - **Deskripsi**: opsional, teks bebas.

   ![Form Buat Paket Layanan dengan kartu Data paket, serta isian Profil bandwidth, Profil kecepatan, dan Tingkat SLA yang masing-masing punya tombol + Baru](~/assets/guide/web/service-packages-create.webp)

   ![Dialog Profil bandwidth baru di atas form Buat Paket Layanan, dengan isian Nama, Unduh (Mbps), Unggah (Mbps), Tipe, dan Rasio kontensi](~/assets/guide/web/service-packages-quick-create.webp)

3. Klik **Simpan**. Anda kembali ke daftar dan muncul toast `Paket layanan dibuat.` Tombol **Batal** membatalkan form.

Form tidak punya isian pajak. Harga yang Anda isi adalah angka yang akan disalin ke langganan.

## Mengubah paket

1. Di daftar, klik **Ubah** di baris paket. Dari halaman rincian, klik **Ubah**.
2. Ubah isian. Aturannya sama dengan form buat. Halaman ini berjudul **Ubah Paket Layanan** dan memuat isi paket yang sekarang, termasuk kategori dan masa kontrak.
3. Klik **Simpan**. Muncul toast `Paket layanan diperbarui.`

Bila profil bandwidth, profil kecepatan atau tingkat SLA paket itu sudah dinonaktifkan, kolomnya tampak kosong karena daftar hanya memuat yang aktif, tetapi pilihan lama tetap tersimpan sampai Anda memilih yang lain.

Harga disalin ke langganan saat langganan dibuat atau dipindahkan: **Biaya bulanan** pelanggan diisi dari **Harga bulanan** dan biaya pemasangan dari **Harga pemasangan**. Karena itu mengubah harga atau isian lain pada paket tidak mengubah langganan yang sudah ada. Hanya langganan baru, atau langganan yang Anda pindahkan lewat **Ganti paket** di detail langganan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)), yang memakai syarat baru. Biaya bulanan langganan lama tetap bisa diubah sendiri saat **Ganti paket**.

**Versi paket.** Mengubah **Harga bulanan**, **Harga pemasangan**, **Profil bandwidth**, **Profil kecepatan**, **Tingkat SLA**, atau **Kategori** membuat versi baru paket itu. Halaman **Ubah Paket Layanan** menulis ini di kotak biru. Mengubah **Kode**, **Nama**, **Deskripsi**, **Masa kontrak minimum**, atau **Aktif** tidak membuat versi: namanya berubah di tempat. Halaman rincian paket punya kartu **Versi paket** dengan kolom **Versi**, **Berlaku sejak**, **Harga bulanan**, **Harga pemasangan**, **Profil bandwidth**, **Profil kecepatan**, **Tingkat SLA**, **Kategori**, dan **Langganan** (jumlah langganan di versi itu), versi terbaru ditandai **Terbaru**. Langganan baru memakai versi terbaru. Langganan lama tetap di versinya, dengan profil kecepatan RADIUS, tingkat SLA tiket, dan kategori laporannya, sampai dipindahkan.

**Peringatan: profil, tingkat SLA, dan kategori tetap diubah di tempatnya.** Versi mencatat profil mana yang dipilih paket, bukan isi profilnya. Mengubah angka Mbps sebuah profil kecepatan mengubah semua versi dan grup RADIUS yang memakainya, termasuk langganan lama (sesi yang sedang online memakai laju baru setelah menyambung ulang atau **Sinkron ulang**). Hal yang sama berlaku bagi profil bandwidth dan tingkat SLA. Untuk mengubah syarat hanya bagi penjualan baru, buat profil (atau tingkat SLA) baru lalu pilih itu di paket. Perubahan itu membuat versi baru, dan langganan lama tetap memakai profil lama.

## Menonaktifkan, menghapus permanen, dan memulihkan paket

1. Untuk berhenti menjual paket, buka **Aksi lainnya** di baris paket dan klik **Nonaktifkan**, lalu konfirmasi (dialog menulis jumlah langganan yang memakainya). Anda juga bisa mematikan saklar **Aktif** di **Ubah**. Paket tetap ada di daftar dengan lencana **Nonaktif**, langganan yang sudah berjalan tidak terganggu, dan paket tidak ditawarkan pada pelanggan baru. **Aktifkan** menjual paket itu lagi. Untuk menyembunyikan satu kelompok paket sekaligus, nonaktifkan kategorinya (bagian Kategori Paket di bawah).
2. **Hapus permanen** hanya ada di menu paket yang belum pernah dipakai langganan mana pun, dalam status apa pun (menunggu, aktif, ditangguhkan, atau berhenti). Dialog **Hapus permanen `<nama paket>`?** berbunyi `Paket layanan "<nama paket>" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan.` Toast `Paket layanan dihapus permanen.` muncul, dan riwayat versinya ikut terhapus.
3. Bila langganan baru memakai paket itu setelah Anda membuka menu, server menolak dan dialog menulis `Paket layanan masih dipakai 1 langganan. Nonaktifkan saja.`
4. Paket yang dihapus dengan cara lama muncul di filter **Status** **Dihapus**. **Pulihkan** mengembalikannya dengan statusnya semula.

## Kesalahan umum

- Pesan `kode sudah digunakan.` di bawah isian **Kode**: kode harus unik per perusahaan. Ganti kodenya.
- Pesan `harga pemasangan harus berupa angka.` atau `masa kontrak minimum harus berupa bilangan bulat.`: isian itu dikosongkan. Isi `0`.
- Paket baru tidak muncul pada form pelanggan baru: saklar **Aktif** paket masih mati, atau kategorinya nonaktif. Nyalakan di **Ubah**.
- Pilihan profil atau tingkat SLA kosong atau tidak lengkap: hanya data aktif yang tampil. Buat atau aktifkan dulu di menu yang bersangkutan.
- Harga paket sudah diubah tetapi tagihan pelanggan lama tetap memakai harga lama: harga tersimpan di langganan, bukan di paket, dan langganan lama tetap di versi paket yang dijualnya. Pindahkan langganan itu lewat **Ganti paket** di detail langganan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)).
- Menu baris paket tidak menawarkan **Hapus permanen**: paket itu sudah dipakai langganan, dalam status apa pun termasuk **Berhenti**. Pilih **Nonaktifkan**.
- Staf menekan **Ubah** atau **Hapus** dan ditolak: staf hanya punya `service.view`. Minta admin menambah izin atau mengubah perannya ([bagian 8.6](/docs/guides/web/administration/roles/) dan [8.7](/docs/guides/web/administration/permissions/)).
- Paket baru tidak bisa disimpan karena **Kategori** kosong (`kategori wajib diisi.`): pilih kategori. Kategori yang nonaktif tidak ada di daftar. Aktifkan lagi di **Kategori Paket** atau pilih kategori lain.

## Kategori Paket

Kategori Paket mengelompokkan paket menurut segmen pelanggan, misalnya rumahan atau bisnis. Setiap paket wajib punya tepat satu kategori. Kategori dipakai untuk filter di daftar paket, pengelompokan di pilihan paket pada form pelanggan dan langganan, dan filter **Kategori paket** pada laporan Metrik Bisnis dan KPI Penjualan ([bagian 7.4](/docs/guides/web/finance-and-reports/business-metrics/) dan [7.10](/docs/guides/web/finance-and-reports/sales-kpis/)).

Peran dan izin sama dengan Paket Layanan: `service.view` atau `service.manage` membuka halaman, `service.create` membuat kategori, `service.update` mengubah, `service.delete` menghapus. Staf bawaan hanya melihat: kolom **Aksi** tidak tampil bagi mereka.

Setiap perusahaan punya tiga kategori bawaan: **Rumahan** (urutan 1), **Bisnis** (urutan 2) dan **Korporat** (urutan 3), dengan kode `RUMAHAN`, `BISNIS` dan `KORPORAT`. Perusahaan baru, termasuk anak perusahaan, mendapat ketiganya otomatis. Paket yang sudah ada sebelum fitur ini dimasukkan ke kategori menurut kata di kode atau namanya: `ENT`, `Enterprise`, `Dedicated`, `Korporat` atau `Corporate` masuk **Korporat**, lalu `BIZ`, `Business`, `Bisnis`, `SOHO` atau `UMKM` masuk **Bisnis**, sisanya (termasuk `Home`, `Rumah`, `Kos`, `Asrama`, `Gamer`, `Trial`, `Promo`) masuk **Rumahan**. Korporat didahulukan, jadi "Business 100Mbps Dedicated" masuk **Korporat**. Periksa hasilnya di daftar paket dan pindahkan paket yang salah tempat lewat **Ubah**.

1. Di sidebar, buka grup **Pelanggan & Layanan**, lalu klik **Kategori Paket** (di bawah **Paket Layanan**).
2. Baca daftar. Kotak **Cari** (isian "Kode atau nama") mencari kode atau nama, filter **Status** berisi **Semua status**, **Aktif** dan **Nonaktif**. Kolom: **Kode**, **Nama**, **Urutan**, **Paket**, **Status** dan **Aksi**. Kolom **Paket** menghitung paket di kategori itu, termasuk paket yang sudah dihapus. Angkanya adalah tautan ke daftar paket yang sudah difilter menurut kategori itu. Kolom **Kode**, **Nama**, **Urutan** dan **Status** bisa diurutkan.

   ![Daftar Kategori Paket dengan kolom Kode, Nama, Urutan, Paket, Status dan Aksi, serta tombol Buat Kategori Paket](~/assets/guide/web/package-categories.webp)

3. Klik **Buat Kategori Paket** (pemegang `service.create` atau `service.manage`). Dialog **Buat Kategori Paket** terbuka. Isi:
   - **Kode**: wajib, huruf besar, angka, `_` dan `-`, maksimal 30 karakter, unik per perusahaan. Sistem mengubah huruf kecil menjadi besar. Kode tidak bisa diubah setelah kategori dibuat, karena pilihan paket mengenali Rumahan, Bisnis dan Korporat lewat kode.
   - **Nama**: wajib, maksimal 100 karakter.
   - **Urutan**: angka 0 sampai 65535, isian awal `0`. Kategori dengan angka kecil tampil lebih dulu di daftar dan di pilihan paket.
   - **Aktif**: saklar, aktif secara awal.
4. Klik **Simpan**. Muncul toast `Kategori paket dibuat.` Untuk mengubah, klik **Ubah** di baris. Dialog **Ubah Kategori Paket** terbuka dengan **Kode** terkunci. Ubah **Nama**, **Urutan** atau **Aktif**, lalu klik **Simpan** (`Kategori paket diperbarui.`). Tombol **Batal** menutup dialog tanpa menyimpan.
5. Untuk berhenti memakai kategori, matikan saklar **Aktif**. Kategori nonaktif tidak muncul di pilihan **Kategori** saat membuat paket baru dan tidak muncul di pilihan paket pada form pelanggan dan langganan. Paket yang sudah memakainya tetap utuh, dan kategorinya tetap tampil di form ubah paket itu.
6. Untuk menghapus, buka **Aksi lainnya** di baris (menu ini ada bagi pemegang `service.delete` atau `service.manage`), lalu klik **Hapus**. Dialog **Hapus kategori {nama}?** terbuka. Isinya `Kategori hanya bisa dihapus selama tidak ada paket di dalamnya. Nonaktifkan kategori jika sudah dipakai.` Klik **Hapus** di dialog itu untuk menghapus. Muncul toast `Kategori paket dihapus.` Kategori yang masih dipakai paket tidak bisa dihapus. Paket yang sudah dihapus dan paket yang pernah memakai kategori itu di versi lama ikut dihitung. Dialog tetap terbuka dan menampilkan kotak merah `Kategori masih dipakai {n} paket. Nonaktifkan saja.` Klik **Batal**, lalu nonaktifkan kategorinya sebagai gantinya. Kategori Paket memakai aturan hapus ini, bukan **Nonaktifkan**, **Hapus permanen**, dan **Pulihkan** di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).

Pesan galat lain di dialog kategori: kode yang sudah ada menampilkan `Kode kategori sudah dipakai.` dan kode dengan karakter lain menampilkan `Kode hanya boleh berisi huruf, angka, tanda hubung, dan garis bawah.`
