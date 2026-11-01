---
title: "4.6 Pengumuman & Promo"
description: "Menu ini mengelola dua jenis isi untuk pelanggan: pengumuman (informasi, gangguan, pemeliharaan) dan banner promo (gambar dengan tautan)."
---

Menu ini mengelola dua jenis isi untuk pelanggan: **pengumuman** (informasi, gangguan, pemeliharaan) dan **banner promo** (gambar dengan tautan). Buka menu ini saat ada gangguan atau jadwal pemeliharaan yang perlu diumumkan, atau saat ISP punya promo untuk pelanggan. Isinya bisa ditujukan ke semua pelanggan atau dipersempit menurut lokasi dan kategori paket.

Peran yang dapat memakai: admin dan manajer pada peran bawaan, staf tidak. Izin: `announcement.manage` (**Kelola pengumuman dan banner promo**). Tanpa izin ini menu **Pengumuman & Promo** tidak tampil di sidebar, dan alamat `/admin/announcements` ditolak dengan halaman **Akses ditolak**. Menunya ada di paling bawah grup **Pelanggan & Layanan**, di bawah **Kategori Tiket**. Semua isi berlaku untuk perusahaan yang sedang aktif ([bagian 1.6](/docs/guides/web/introduction/switch-company/)).

Aplikasi pelanggan menggambar kartu pengumuman di atas kartu layanan (Gangguan dan Pemeliharaan) atau di bawah bagian Sedang berjalan (Info), dan carousel banner di bawahnya. Pratinjau di layar ini meniru tampilan itu.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Pelanggan & Layanan**, lalu klik **Pengumuman & Promo**.
2. Pilih tab **Pengumuman** atau **Banner promo**. Angka di dalam kurung adalah jumlah semua isinya di perusahaan ini, apa pun statusnya.
3. Baca daftar. Kotak **Cari** (isian "Judul") mencari judul, dan filter **Status** berisi **Semua status**, **Draf**, **Terjadwal**, **Tayang**, **Selesai** dan **Nonaktif**. Pindah tab mengosongkan pencarian dan filter. Daftar menampilkan 10 baris per halaman.
   - Tab **Pengumuman**: kolom **Pengumuman** (judul dan dua baris pertama isi), **Jenis**, **Status**, **Periode**, **Sasaran** dan **Aksi**.
   - Tab **Banner promo**: kolom **Banner** (gambar kecil, judul, dan tujuan tautan), **Status**, **Periode**, **Sasaran**, **Urutan**, **Ketukan** dan **Aksi**. Daftar diurutkan menurut **Urutan**, lalu yang terbaru.
   - Kolom **Aksi** hanya tampil bagi pemegang `announcement.manage`.

   ![Layar Pengumuman & Promo dengan tab Pengumuman dan Banner promo, kotak Cari, filter Status, dan tombol Buat Pengumuman](~/assets/guide/web/announcements.webp)

Status dihitung server dari waktu terbit, saklar aktif, dan periode tayang:

| Status | Arti | Tampil ke pelanggan |
| --- | --- | --- |
| Draf | Disimpan, belum diterbitkan. | Tidak |
| Terjadwal | Sudah diterbitkan, tetapi **Mulai tayang** belum tiba. | Tidak, sampai jadwal tiba |
| Tayang | Sudah diterbitkan dan berada di dalam periode. | Ya |
| Selesai | Sudah diterbitkan dan **Selesai tayang** sudah lewat. Tetap ada sebagai riwayat. | Tidak |
| Nonaktif | Diterbitkan lalu dinonaktifkan. Tetap ada sebagai riwayat. | Tidak |

Kolom **Sasaran** menulis **Semua pelanggan**, atau **Pelanggan tertentu** diikuti daftar lokasi dan kategori ("Lokasi: A, B dan 2 lainnya"). Sasaran tertentu yang daftarnya sudah kosong menulis "Sasaran kosong, tidak tampil ke siapa pun."

## Membuat pengumuman

1. Di tab **Pengumuman**, klik **Buat Pengumuman**. Dialog **Buat Pengumuman** terbuka dengan formulir di kiri dan **Pratinjau di aplikasi pelanggan** di kanan (di bawahnya pada layar sempit).
2. Isi formulir:
   - **Jenis**: **Informasi**, **Gangguan** atau **Pemeliharaan**. Keterangan di bawah isian menjelaskan efeknya. **Gangguan** dan **Pemeliharaan** dirancang tampil paling atas dengan nada peringatan dan mengirim notifikasi ke pelanggan sasaran. **Informasi** hanya tampil.
   - **Judul**: wajib, maksimal 120 karakter.
   - **Isi**: wajib, maksimal 2000 karakter. Teks biasa, baris baru ikut tampil.
   - **Sasaran**, **Mulai tayang** dan **Selesai tayang**: lihat "Sasaran dan jadwal" di bawah.
3. Klik **Simpan**. Pengumuman tersimpan sebagai **Draf** (toast "Pengumuman disimpan sebagai draf.") dan belum terlihat oleh pelanggan. Periksa pratinjaunya, lalu terbitkan dari daftar (lihat "Menerbitkan, mengubah, dan menonaktifkan"). Keterangan di bawah judul dialog menyebut pilihan ini: "Simpan sebagai draf, atau pakai Simpan & Terbitkan setelah dicek di pratinjau."
4. Untuk menyimpan dan menerbitkan dalam satu langkah, klik **Simpan & Terbitkan**. Tombol ini ada pada pengumuman baru dan pada draf, tidak pada pengumuman yang sudah terbit. Layar lebih dulu menghitung penerimanya, lalu membuka dialog **Terbitkan untuk {n} pelanggan?** dengan judul pengumuman, akibat penerbitan menurut **Jenis**, dan kalimat "Setelah terbit, pengumuman tidak bisa dihapus, hanya dinonaktifkan." {n} adalah jumlah pelanggan sasaran yang punya akun masuk aktif, sama dengan jumlah penerima notifikasi **Gangguan** dan **Pemeliharaan**. Klik **Simpan & Terbitkan** di dialog itu untuk melanjutkan, atau **Kembali ke formulir** untuk memeriksa lagi. Toast "Pengumuman disimpan dan diterbitkan." muncul.

   ![Dialog Terbitkan untuk n pelanggan? di atas formulir Buat Pengumuman, dengan tombol Kembali ke formulir dan Simpan & Terbitkan](~/assets/guide/web/announcements-publish-confirm.webp)

5. Bila penerbitan ditolak (misalnya **Selesai tayang** sudah lewat), pengumuman tidak ikut tersimpan, jadi tidak ada draf ganda. Perbaiki formulir, lalu kirim lagi. Bila penghitungan penerima gagal, formulir menulis "Jumlah penerima gagal dihitung. Coba lagi." Bila **Sasaran** tertentu belum punya lokasi atau kategori, tombol langsung mengirim formulir tanpa menghitung, dan pesan penolakan tampil di bawah **Sasaran**.

![Dialog Buat Pengumuman dengan isian Jenis, Judul, Isi, Sasaran, Mulai tayang dan Selesai tayang di kiri, serta pratinjau ponsel di kanan](~/assets/guide/web/announcements-create.webp)

## Membuat banner promo

1. Di tab **Banner promo**, klik **Buat Banner Promo**. Dialog **Buat Banner Promo** terbuka.
2. Isi formulir:
   - **Gambar**: wajib untuk banner baru. Seret berkas ke kotak atau klik untuk memilih. Pakai JPG, PNG atau WebP, paling besar 2 MB, dengan rasio lebar banding tinggi 2:1 (disarankan 1200 x 600 piksel). Rasio boleh meleset paling banyak 5%. Layar memeriksa ukuran begitu berkas dipilih dan menolak yang tidak cocok, misalnya "Gambar ini 1000 x 600 piksel. Rasio harus 2:1 dengan selisih paling banyak 5%, misalnya 1200 x 600." Server mengulang pemeriksaan yang sama. Pada banner yang sudah ada, kosongkan **Gambar** untuk mempertahankan gambar lama.
   - **Judul**: wajib, maksimal 80 karakter. Tampil sebagai keterangan di bawah gambar.
   - **Teks alternatif**: wajib, maksimal 200 karakter. Dibacakan pembaca layar. Tulis isi gambar, misalnya "Diskon 20% pemasangan baru sampai 31 Oktober".
   - **Saat banner diketuk**: **Tanpa tautan**, **Halaman di aplikasi** atau **Tautan web**. Untuk **Halaman di aplikasi**, pilih salah satu dari **Tagihan**, **Langganan**, **Buat tiket** atau **Kunjungan**. Untuk **Tautan web**, isi **Alamat tautan** yang diawali `https://` (maksimal 500 karakter). Alamat web dibuka di peramban ponsel.
   - **Urutan**: angka 0 sampai 65535, isian awal 0. Banner dengan angka kecil tampil lebih dulu. Angka yang sama diurutkan dari yang terbaru.
   - **Sasaran**, **Mulai tayang** dan **Selesai tayang**: lihat bagian berikut.
3. Klik **Simpan**. Banner tersimpan sebagai **Draf** (toast "Banner promo disimpan sebagai draf."). Selama gambar diunggah, bilah **Mengunggah gambar** menunjukkan kemajuan. Gambar banner bersifat privat: hanya pelanggan perusahaan yang sama dan yang cocok dengan sasaran yang bisa memuatnya lewat aplikasi.

Aplikasi pelanggan menerima paling banyak 5 banner yang sedang tayang, diurutkan menurut **Urutan** lalu yang terbaru. Carousel dirancang berganti slide tiap 5 detik. Server tidak menolak banner keenam: banner di luar 5 teratas hanya tidak ikut tampil, dan dialog banner menulis peringatan "Dengan urutan ini banner tidak masuk 5 banner pertama, jadi belum tampil di aplikasi." Nonaktifkan banner lama atau beri **Urutan** lebih kecil bila ingin banner baru ikut tampil.

## Sasaran dan jadwal

**Sasaran** menentukan pelanggan yang menerima isi itu:

- **Semua pelanggan**: seluruh pelanggan perusahaan aktif.
- **Pelanggan tertentu**: muncul pilihan **Lokasi** dan **Kategori paket**. Ketik nama lokasi di **Lokasi** lalu pilih untuk menambahkannya. Lokasi yang dipilih ikut menyertakan semua lokasi di bawahnya, jadi memilih sebuah area mencakup semua POP di dalamnya. Pilih kategori di **Kategori paket**, misalnya **Rumahan** atau **Bisnis** ([bagian 4.2](/docs/guides/web/customers-and-services/service-packages/)). Tombol silang di samping tiap pilihan menghapusnya. Sasaran tertentu wajib punya minimal satu lokasi atau satu kategori. Kalau tidak, server menolak dengan "Pilih minimal satu lokasi atau kategori paket."

Pelanggan cocok bila salah satu langganannya berstatus **Aktif** atau **Ditangguhkan** dan memenuhi semua daftar yang diisi. Dalam satu daftar cukup satu pilihan yang cocok. Contoh: **Lokasi** berisi dua area dan **Kategori paket** berisi **Bisnis**, maka yang cocok adalah pelanggan dengan langganan paket Bisnis yang dilayani POP di salah satu area itu. Bila lokasi atau kategori sasaran kemudian dihapus dari data hingga daftarnya kosong, item itu tidak menjadi tampil ke semua orang. Ia tidak cocok dengan siapa pun.

**Mulai tayang** wajib dan **Selesai tayang** boleh kosong. Keduanya dipilih dengan pemilih tanggal dan jam, menurut zona waktu perusahaan. **Mulai tayang** bernilai awal saat dialog dibuka. Waktu mulai di masa depan membuat item berstatus **Terjadwal** setelah diterbitkan. **Selesai tayang** kosong berarti tayang sampai dinonaktifkan ("Kosongkan agar tayang sampai dinonaktifkan."). Bila diisi, harus sesudah **Mulai tayang**.

## Pratinjau ponsel

Panel **Pratinjau di aplikasi pelanggan** berupa bingkai ponsel yang mengikuti isian formulir saat Anda mengetik, tanpa menyimpan apa pun. Panel punya saklar **Terang** dan **Gelap** sendiri yang awalnya mengikuti tema halaman web.

- Pengumuman: satu kartu dengan ikon, judul, isi, dan periode. **Gangguan** dan **Pemeliharaan** memakai nada peringatan, **Informasi** memakai nada info.
- Banner: carousel gambar 2:1 dengan keterangan, titik halaman, dan tombol sebelumnya atau berikutnya. Banner yang sedang Anda buat tampil di antara banner yang sudah tayang, dengan urutan yang dipakai aplikasi.

Pratinjau memakai warna dan susunan yang dirancang untuk aplikasi, bukan tangkapan layar aplikasi yang terpasang.

## Menerbitkan, mengubah, dan menonaktifkan

Kolom **Aksi** memuat tombol menurut status baris:

| Status | Tombol |
| --- | --- |
| Draf | **Ubah**, **Terbitkan**, **Hapus** |
| Terjadwal, Tayang | **Ubah**, **Nonaktifkan** |
| Selesai, Nonaktif | **Ubah** |

1. **Terbitkan**: untuk pengumuman, dialog **Terbitkan untuk {n} pelanggan?** memuat judul pengumuman, akibat penerbitan menurut **Jenis**, dan kalimat "Setelah terbit, pengumuman tidak bisa dihapus, hanya dinonaktifkan." {n} adalah jumlah pelanggan sasaran yang punya akun masuk aktif, yaitu penerima yang sama dengan notifikasi **Gangguan** dan **Pemeliharaan** (bagian "Notifikasi Gangguan dan Pemeliharaan"). Angka ini dihitung untuk draf di halaman yang sedang terbuka. Untuk banner, dialog berjudul **Terbitkan banner {judul}?** dan menjelaskan efeknya. Klik **Terbitkan**. Toast "Pengumuman diterbitkan." atau "Banner promo diterbitkan." Setelah terbit, item tidak bisa dihapus, hanya dinonaktifkan. Banner tanpa gambar tidak bisa diterbitkan ("Gambar banner wajib tersedia."). Pengumuman yang **Selesai tayang**-nya sudah lewat juga ditolak ("Periode pengumuman sudah berakhir."). Ubah tanggalnya dulu.
2. **Ubah**: dialog **Ubah Pengumuman** atau **Ubah Banner Promo**. Keterangan di bawah judul dialog menyebut efek simpan menurut status. Draf disimpan sebagai draf, atau terbit sekaligus lewat **Simpan & Terbitkan** (hanya pengumuman). Item yang sudah terbit, baik **Terjadwal** maupun **Tayang**, langsung berlaku begitu disimpan. Item **Selesai** tayang lagi bila **Selesai tayang** diubah ke waktu yang akan datang. Item **Nonaktif** bisa disimpan, tetapi tidak tampil lagi.
3. **Nonaktifkan**: dialog **Nonaktifkan pengumuman {judul}?** berbunyi "Tidak tampil lagi di aplikasi pelanggan. Riwayatnya tetap tersimpan, tetapi pengumuman ini tidak bisa diaktifkan lagi. Buat pengumuman baru bila perlu." Klik **Nonaktifkan** untuk melanjutkan. Tidak ada tombol untuk mengaktifkan kembali, jadi buat item baru bila perlu.
4. **Hapus** (hanya draf): dialog **Hapus draf pengumuman {judul}?** berbunyi "Draf dihapus permanen." Klik **Hapus draf**. Item yang pernah diterbitkan tidak bisa dihapus, supaya riwayat dan tautan notifikasi tetap valid. Server menolak dengan "Pengumuman terbit hanya dapat dinonaktifkan." atau "Banner terbit hanya dapat dinonaktifkan."

Pembuatan, perubahan, penerbitan, penonaktifan, dan penghapusan tercatat di Log audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)) dengan modul `announcement`, hanya berisi nomor item. Gambar banner yang sudah selesai tayang lebih dari 180 hari dihapus otomatis setiap hari. Baris banner dan jumlah ketukannya tetap ada.

## Notifikasi Gangguan dan Pemeliharaan

Pengumuman berjenis **Gangguan** dan **Pemeliharaan** mengirim satu notifikasi ke aplikasi tiap pelanggan sasaran yang punya akun masuk aktif. Notifikasi tampil di lonceng aplikasi dengan judul "Pengumuman baru" dan judul pengumuman sebagai isinya.

- Bila Anda menerbitkan setelah **Mulai tayang** tiba, notifikasi dikirim saat itu juga.
- Bila **Mulai tayang** masih di depan (status **Terjadwal**), notifikasi dikirim saat jadwal tiba. Penjadwal memeriksanya tiap menit, jadi notifikasi bisa terlambat sekitar satu menit.
- Tiap pelanggan menerima satu notifikasi per pengumuman. Mengubah pengumuman sesudahnya tidak mengirim notifikasi lagi.
- **Informasi** dan banner promo tidak pernah mengirim notifikasi. Tidak ada WhatsApp untuk pengumuman.
- Pengiriman memakai antrean. Antrean dan penjadwal harus berjalan di server. Hubungi pengelola server bila notifikasi tidak muncul.

## Jumlah ketukan banner

Kolom **Ketukan** di tab **Banner promo** menghitung berapa kali pelanggan mengetuk banner. Satu pelanggan dihitung satu kali per banner per hari, berapa pun ketukannya. Aplikasi tidak mencatat berapa kali banner terlihat, jadi angka ini bukan jumlah tayangan.

## Kesalahan umum

- Pesan "Pilih minimal satu lokasi atau kategori paket." di bawah **Sasaran**: Anda memilih **Pelanggan tertentu** tanpa menambahkan lokasi atau kategori. Tambahkan minimal satu, atau ganti ke **Semua pelanggan**.
- Pesan "Rasio gambar banner harus 2:1 dengan toleransi 5%." atau teks "Gambar ini ... piksel" di bawah **Gambar**: ukuran gambar tidak mendekati 2:1. Potong gambar menjadi 1200 x 600 piksel. Berkas lebih dari 2 MB, atau selain JPG, PNG dan WebP, juga ditolak di kotak yang sama.
- Pesan "Tujuan tautan wajib diisi." atau "Tautan harus memakai HTTPS.": pilih halaman di aplikasi atau isi alamat yang diawali `https://`. Pesan "Tujuan tautan harus kosong tanpa tautan." berarti **Saat banner diketuk** masih **Tanpa tautan** padahal alamat terisi.
- Pesan "selesai harus berupa tanggal setelah mulai." di bawah **Selesai tayang**: pilih waktu sesudah **Mulai tayang**, atau kosongkan.
- Pelanggan tidak melihat isi yang berstatus **Tayang**: periksa **Sasaran** (pelanggan harus punya langganan **Aktif** atau **Ditangguhkan** di lokasi atau kategori itu). Untuk banner, periksa juga urutannya: hanya 5 teratas yang dikirim ke aplikasi.
- Banner atau pengumuman tidak bisa diaktifkan lagi setelah **Nonaktifkan**. Aturan ini disengaja. Buat item baru.
- Notifikasi **Gangguan** tidak sampai: pelanggan harus punya akun masuk yang aktif dan cocok dengan sasaran, dan antrean serta penjadwal harus berjalan.
