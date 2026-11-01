---
title: "3. SPK"
description: "SPK (surat perintah kerja) adalah pekerjaan instalasi atau perbaikan di lokasi pelanggan. Alurnya."
---

SPK (surat perintah kerja) adalah pekerjaan instalasi atau perbaikan di lokasi pelanggan. Alurnya: **Ditugaskan** → Anda berangkat (**Saya berangkat**) → Anda mulai → **Dikerjakan** → Anda kirim untuk ditinjau → **Menunggu review** → kantor menyetujui (**Selesai**) atau mengembalikan (**Dikembalikan**). Di layar, alur ini tampil sebagai empat langkah **Progres kunjungan**: **Ditugaskan**, **Dalam perjalanan**, **Sedang dikerjakan**, dan **Selesai dipasang** (**Selesai dikerjakan** pada SPK yang bukan pemasangan).


## Detail SPK dan progres kunjungan


Ketuk baris SPK di tab **Pekerjaan**.

![Detail SPK berstatus Ditugaskan: Progres kunjungan, kartu Pelanggan, serta tombol Saya berangkat dan Mulai](~/assets/guide/technician/redesign/spk-step-1-ditugaskan.webp)

Detail SPK memuat judul, status, jenis dan prioritas, jadwal, kode tiket asal (bila ada), **Progres kunjungan**, **Pelanggan**, **POP / gudang**, **Deskripsi**, **Material**, dan **Bukti kerja**. Selama SPK berstatus **Dikerjakan**, **Bukti kerja** dan **Material** naik tepat di bawah **Progres kunjungan**, karena itulah yang Anda kerjakan di lokasi; **Pelanggan**, **POP / gudang**, dan **Deskripsi** pindah ke bawahnya. Pada status lain urutannya seperti di atas. Bila kantor mengembalikan SPK, kotak **Dikembalikan ke kantor** dan **Alasan dikembalikan** tampil di atas (lihat "SPK dikembalikan ke kantor" di bawah).

**Progres kunjungan** menunjukkan empat langkah yang sama dengan yang dilihat kantor dan pelanggan. Tanda centang berarti langkah sudah dilalui, dengan waktunya di bawah nama langkah. Lingkaran bertitik dengan nama tebal adalah langkah yang sedang berjalan. Lingkaran kosong adalah langkah yang belum tercapai. Tombol di bagian bawah layar mengikuti langkah itu: **Saya berangkat**, **Mulai**, lalu **Selesai dipasang · kirim untuk ditinjau**. Pada SPK yang bukan pemasangan (perawatan, peningkatan layanan, pindah lokasi), langkah terakhir bernama **Selesai dikerjakan** dan tombolnya **Pekerjaan selesai · kirim untuk ditinjau**. Jenis SPK di layar ditulis dengan nama dari kantor, misalnya Instalasi atau Perawatan.

**Dalam perjalanan** bukan status SPK. Status tetap **Ditugaskan** sampai Anda mulai bekerja. Langkah ini hanya memberi tahu kantor dan pelanggan bahwa Anda menuju lokasi.

### Pelanggan, alamat pemasangan, dan POP

Gulir ke bawah untuk membaca kartu **Pelanggan** dan **POP / gudang**.

![Kartu Pelanggan dengan Alamat pemasangan, dan kartu POP / gudang, masing-masing dengan tombol Buka di Maps](~/assets/guide/technician/redesign/spk-step-1-pelanggan-pop.webp)

- Kartu **Pelanggan** memuat nama, kode langganan dan paket, serta nomor telepon pelanggan. Ketuk **Telepon** untuk membuka pemanggil. Ketuk **WhatsApp** untuk membuka percakapan dengan nomor itu. Tombol **WhatsApp** hanya ada bila nomornya nomor seluler Indonesia.
- Di bawahnya, **Alamat pemasangan** memuat nama alamat, jalan, dan kota rumah pelanggan. Ketuk **Buka di Maps** untuk membuka petunjuk arah ke titik koordinat alamat itu. Bila alamat belum punya koordinat, aplikasi peta mencari teks alamatnya.
- Kartu **POP / gudang** menunjukkan POP atau gudang yang tercatat di SPK, dengan tombol **Buka di Maps** sendiri. Pakai tombol ini untuk ke POP atau gudang, bukan untuk ke rumah pelanggan.
- SPK tanpa langganan memakai satu kartu **Lokasi kerja** dengan tombol **Buka di Maps**.

### Akun PPPoE untuk pemasangan

SPK **Instalasi** yang sudah ditugaskan menampilkan kartu **Akun PPPoE** bila kantor sudah membuat akun jaringan langganan.

- **Nama pengguna** selalu terlihat dan dapat disalin.
- **Kata sandi** tersamar. Ketuk **Tampilkan** untuk mengambilnya dari server. Kata sandi terlihat selama 60 detik atau sampai Anda menutup layar, lalu tersamar lagi. Ketuk **Salin** selama masih terlihat.
- Pengungkapan butuh internet, dibatasi 5 kali per menit, dan setiap percobaan yang berhasil dicatat di log audit. Aplikasi tidak menyimpan kata sandi di cache offline atau log.
- Status **Menunggu ditulis ke router**, **Siap dipakai**, atau **Belum tertulis, hubungi kantor** menunjukkan keadaan sinkronisasi.
- Tulisan **Akun PPPoE belum dibuat. Hubungi kantor.** berarti akun belum tersedia. Ini terjadi juga bila perusahaan belum mengaktifkan RADIUS: akun tidak dibuat otomatis tanpa RADIUS. Hubungi kantor melalui tombol yang disediakan.

Hanya teknisi yang sedang ditugaskan pada SPK **Instalasi** berstatus **Ditugaskan** atau **Dikerjakan** yang dapat menampilkan kata sandi. Bila SPK dipindahkan ke teknisi lain, kata sandi diganti: yang pernah Anda lihat tidak berlaku lagi dan Anda tidak dapat menampilkannya lagi. Tanpa internet, aplikasi menulis "Butuh koneksi internet untuk menampilkan kata sandi." Terlalu banyak permintaan menampilkan pesan pembatasan dari server.

### Saya berangkat

Pakai **Saya berangkat** saat Anda berangkat menuju lokasi pelanggan.

1. Buka SPK berstatus **Ditugaskan**.
2. Ketuk **Saya berangkat** di bagian bawah.
3. Aplikasi bertanya "Berangkat ke lokasi?" dan menjelaskan bahwa pelanggan akan diberi tahu di aplikasinya. Ketuk **Saya berangkat**.

![Dialog Berangkat ke lokasi?](~/assets/guide/technician/redesign/spk-step-2-berangkat-konfirmasi.webp)

Langkah **Dalam perjalanan** tercentang dengan waktunya, dan tombol **Saya berangkat** hilang. **Mulai** menjadi tombol utama. Pelanggan menerima notifikasi "Teknisi dalam perjalanan" yang memuat nama depan Anda. Nomor telepon Anda tidak dikirim.

![Progres kunjungan pada langkah Dalam perjalanan](~/assets/guide/technician/redesign/spk-step-2-dalam-perjalanan.webp)

Seperti **Mulai**, aplikasi meminta izin lokasi dan mencatat posisi Anda. Jaraknya dihitung ke alamat pemasangan pelanggan. Bila Anda menolak izin, GPS mati, atau sinyal GPS tidak dapat dibaca dalam 15 detik, langkah tetap tercatat tanpa posisi. Tanpa internet, **Saya berangkat** disimpan di ponsel dan dikirim otomatis saat sinyal kembali (lihat "Tanpa sinyal: aksi menunggu kirim"). Pelanggan baru diberi tahu saat aksi itu terkirim.

Anda boleh melewati langkah ini. Bila sudah berada di lokasi, ketuk **Mulai** langsung: langkah **Dalam perjalanan** tetap dihitung sudah dilalui, tanpa waktu, dan pelanggan tidak menerima notifikasi.

### Mulai

Untuk memulai pekerjaan:

1. Buka SPK berstatus **Ditugaskan**.
2. Ketuk **Mulai** di bagian bawah. Tombol ini ada sebelum dan sesudah **Saya berangkat**.
3. Aplikasi bertanya "Mulai SPK ini?". Ketuk **Mulai**. Status berubah menjadi **Dikerjakan**, langkah **Sedang dikerjakan** tercentang dengan waktunya, dan kantor bisa melihatnya.

![SPK sesudah Mulai: Bukti kerja dan chip Foto 0/1 di atas, sebelum Pelanggan](~/assets/guide/technician/detail-spk-dikerjakan-tanpa-foto.webp)

Saat memulai, aplikasi meminta izin lokasi dan mencatat posisi Anda sebagai tanda tiba di lokasi. Bila Anda menolak izin, GPS mati, atau sinyal GPS tidak dapat dibaca dalam 15 detik, SPK tetap dimulai tanpa posisi. Setelah SPK dimulai, aplikasi menulis hasil check-in di bagian bawah layar: "Check-in tercatat, 120 m dari lokasi" (jarak dihitung dari posisi Anda), atau "Mulai tercatat tanpa lokasi" bila posisi tidak tersedia.

Tanpa internet, **Mulai** tidak gagal: aplikasi menyimpannya di ponsel dengan tanda **Menunggu kirim** dan mengirimnya saat sinyal kembali (lihat "Tanpa sinyal: aksi menunggu kirim"). Tombol kirim untuk ditinjau sudah tersedia sambil **Mulai** menunggu.

### Jauh dari lokasi pelanggan

Kantor menetapkan jarak paling jauh antara posisi Anda dan lokasi pelanggan saat Anda menekan **Mulai** (bawaan 500 m). Bila Anda lebih jauh, aplikasi membuka jendela **Jauh dari lokasi pelanggan** dengan jaraknya, misalnya "Anda berjarak 3,2 km dari lokasi pelanggan. Tulis alasannya untuk melanjutkan."

![Jendela Jauh dari lokasi pelanggan dengan kolom Alasan](~/assets/guide/technician/detail-spk-jauh-dari-lokasi.webp)

1. Ketik **Alasan** (wajib, maksimal 300 karakter).
2. Ketuk **Mulai**. Ketuk **Batal** bila Anda memutuskan tidak memulai.

Alasan itu tersimpan pada SPK dan tampil bagi kantor sebagai "Jauh dari lokasi: {alasan}". Jendela ini tidak muncul bila posisi Anda tidak terbaca, atau alamat pelanggan belum punya koordinat. Aturan yang sama berlaku untuk **Mulai** pada tiket. **Saya berangkat** tidak menanyakan alasan.


## Foto bukti dan antrean unggah


Foto bukti diwajibkan sebelum SPK dikirim untuk review. Foto diambil saat SPK berstatus **Dikerjakan**. Selama itu, **Bukti kerja** ada di dekat atas layar dan judulnya memuat chip jumlah foto, misalnya **Foto 0/1**: foto yang sudah terkirim atau masih di antrean, dari jumlah minimal yang dibutuhkan sebelum SPK bisa dikirim. Chip berwarna peringatan selama foto kurang dan berwarna hijau saat cukup; angkanya sendiri sudah menyampaikan keadaannya.

1. Di bagian **Bukti kerja**, ketuk **Ambil foto**.
2. Pilih sumber di lembar **Ambil foto dari**: **Kamera** atau **Galeri**.
3. Ambil foto, atau pilih satu atau beberapa foto dari galeri. Tidak ada jendela pertanyaan sesudahnya: setiap foto langsung masuk antrean.
4. Aplikasi menulis "Foto masuk antrean unggah." (atau "N foto masuk antrean unggah." untuk beberapa foto dari galeri) dan mencoba mengirim. Pada foto dari kamera, pesan itu punya tombol **Ambil lagi** yang membuka kamera untuk foto berikutnya.
5. Bila perlu keterangan, ketik di kolom **Keterangan (opsional)** pada kartu foto yang menunggu (maksimal 255 karakter). Setiap foto baru ditahan 6 detik sebelum dikirim supaya keterangan ikut terkirim, dan setiap ketikan memberi Anda 6 detik lagi. Ketuk **Kirim sekarang**, tarik layar ke bawah, atau buka kembali aplikasi untuk mengirim tanpa menunggu. Setelah foto mulai dikirim, keterangannya hanya bisa dibaca.

Aplikasi mengecilkan foto sebelum mengirim: format JPEG, sisi terpanjang paling besar 1920 piksel, dan data EXIF (termasuk lokasi GPS foto) dibuang. Ukuran file hasilnya jauh di bawah batas server 10 MB.

Foto tidak hilang saat sinyal buruk. Setiap foto masuk **antrean unggah** di ponsel lebih dulu dan dikirim satu per satu, yang lama lebih dulu. Foto yang belum terkirim muncul di bagian **Bukti kerja** dan di banner **N foto belum terkirim**.

![Layar Antrean unggah](~/assets/guide/technician/antrean-unggah.webp)

Ketuk banner untuk membuka **Antrean unggah**. Tiap foto punya status:

- **Menunggu**: belum terkirim, aplikasi akan mencoba lagi sendiri.
- **Mengunggah**: sedang dikirim.
- **Gagal**: server menolak foto, atau berkas foto hilang dari ponsel.

Tombol di layar ini:

- **Kirim sekarang**: kirim semua foto yang menunggu tanpa menunggu jeda otomatis.
- **Coba lagi** (foto Gagal): masukkan foto kembali ke antrean dan kirim.
- **Hapus**: buang foto dari antrean. Foto ini belum terkirim dan hilang dari ponsel.

Untuk menghapus foto yang sudah terkirim: ketuk foto di **Bukti kerja**, lalu **Hapus** dan konfirmasi "Hapus foto ini?". Anda hanya bisa menghapus foto yang Anda unggah sendiri, selama SPK masih **Dikerjakan**. Tombol ini butuh internet.

### Kesalahan umum pada foto

- **"Foto tidak dapat diproses. Coba lagi."** File yang dipilih bukan gambar yang bisa dibaca. Ambil foto ulang.
- **"Server menolak foto ini."** Foto tidak memenuhi aturan server (JPG atau PNG, maksimal 10 MB) atau SPK sudah tidak menerima bukti. Hapus dari antrean dan ambil foto baru, atau hubungi kantor.
- **"Berkas foto hilang dari ponsel."** Berkas dihapus dari penyimpanan ponsel. Hapus barisnya dan ambil foto lagi.
- **Foto terputus karena aplikasi ditutup Android.** Saat aplikasi dibuka lagi, aplikasi memulihkan foto itu ke antrean dan menulis "Foto yang terputus dipulihkan dan masuk antrean unggah."
- **Keluar dari akun saat foto atau aksi masih di antrean.** Aplikasi memperingatkan "N bukti atau aksi belum terkirim akan dihapus. Keluar?". Kirim dulu agar tidak hilang.


## Material di SPK


Bagian **Material** di detail SPK menampilkan material SPK: **Dialokasikan** dan **Terpakai**. **Dialokasikan** hanya terisi pada SPK lama, karena kantor tidak lagi menulis jumlah rencana; pada SPK baru angkanya 0. Saat SPK **Dikerjakan**, Anda bisa mencatat pemakaian sendiri. Saat SPK **Ditugaskan** atau **Dikerjakan**, tombol **Minta material** membuka permintaan barang untuk SPK itu (bagian Permintaan barang baru).

![SPK berstatus Dikerjakan dengan tombol Tambah material](~/assets/guide/technician/detail-spk-material.webp)

### Tambah atau ubah pemakaian

1. Di bagian **Material**, ketuk **Tambah material**.
2. Di layar **Pilih material**, ketik nama atau kode di **Cari material**, lalu ketuk material yang dipakai. Material yang tidak muncul berarti tidak ada di daftar material aktif perusahaan, atau berupa perangkat bernomor seri yang diurus kantor.

   ![Layar Pilih material](~/assets/guide/technician/pilih-material.webp)

3. Di jendela **Catat pemakaian**, isi **Jumlah** (lebih dari 0, maksimal dua angka desimal; koma atau titik sama saja), lalu ketuk **Simpan**.
4. Aplikasi menulis "Material dicatat."

Bila material itu sudah ada di SPK, jumlah **Terpakai** diganti dengan angka baru. Untuk mengubah jumlah, ulangi langkah di atas dan isi angka yang benar. Jumlah **Dialokasikan** dari kantor tidak berubah.

### Hapus pemakaian

1. Di baris material, ketuk **Hapus**.
2. Konfirmasi "Hapus pemakaian material ini?". Jumlah terpakai material itu di SPK menjadi 0.

Baris yang direncanakan kantor tetap tampil dengan **Terpakai** 0, hanya pemakaian Anda yang dihapus. Baris yang tidak punya pemakaian Anda tidak punya tombol **Hapus**. Bila server menolak, baris menulis "Baris ini tidak bisa diubah dari aplikasi" dan tombolnya hilang.

Tambah, ubah, dan hapus material butuh internet.


## Kirim untuk review


Setelah pekerjaan selesai, kirim SPK ke kantor untuk diperiksa.

![SPK dengan dua foto bukti dan tombol Selesai dipasang · kirim untuk ditinjau yang sudah aktif](~/assets/guide/technician/detail-spk-dikerjakan-2-foto.webp)

Tombol **Selesai dipasang · kirim untuk ditinjau** (pada SPK pemasangan) atau **Pekerjaan selesai · kirim untuk ditinjau** (jenis lain) di bagian bawah detail SPK baru aktif bila semua syarat ini terpenuhi:

- Minimal **satu foto bukti** sudah terkirim. Tanpa foto, aplikasi menulis "Belum ada foto bukti". Chip **Foto n/1** di judul **Bukti kerja** menunjukkan hitungannya.
- Tidak ada foto yang masih di antrean. Aplikasi menulis "Tunggu N foto terkirim".
- Semua deklarasi material sudah dikirim (lihat [bab 5](/docs/guides/technician/materials-and-item-requests/)). Aplikasi menulis "Deklarasikan material dulu" selama masih ada yang perlu dideklarasi.

Internet tidak lagi menjadi syarat. Tanpa sinyal, ketukan tombol kirim disimpan di ponsel sebagai "Kirim SPK untuk ditinjau", ditandai **Menunggu kirim**, dan terkirim sendiri setelah foto-fotonya sampai.

Langkah:

1. Pastikan syarat di atas terpenuhi dan teks merah di bawah tombol hilang.
2. Ketuk tombol kirim itu.
3. Status SPK berubah menjadi **Menunggu review**, dan langkah **Selesai dipasang** (atau **Selesai dikerjakan**) tercentang dengan waktunya.

![Progres kunjungan lengkap: keempat langkah tercentang dan status Menunggu review](~/assets/guide/technician/redesign/spk-step-4-selesai-dipasang.webp)

Kantor lalu menyetujui SPK (**Selesai**) atau mengembalikannya (**Dikembalikan**) dengan **Alasan dikembalikan**. Anda mendapat notifikasi untuk keduanya ([bab 6](/docs/guides/technician/notifications/)). SPK yang dikembalikan tidak tampil di daftar pekerjaan sampai kantor menugaskannya lagi. Setelah itu SPK muncul kembali sebagai **Ditugaskan**, kotak **Alasan dikembalikan** tampil di atas, dan **Progres kunjungan** dimulai dari awal dengan waktu penugasan yang baru.

### SPK dikembalikan ke kantor

Bila kantor tidak menyetujui hasil kerja, status SPK menjadi **Dikembalikan**. Detail SPK menampilkan kotak **Dikembalikan ke kantor** dengan tulisan "Menunggu penugasan ulang." di bawah kartu judul, lalu kotak **Alasan dikembalikan** yang memuat alasan dari kantor. Selama menunggu, Anda tidak bisa mengerjakan SPK itu.

- **Telepon kantor** membuka pemanggil ke nomor telepon perusahaan.
- **WhatsApp kantor** membuka percakapan ke nomor WhatsApp perusahaan.

Tombol yang nomornya belum diisi ISP tidak tampil. Bila ISP mengisi keduanya, keduanya ada. SPK dikembalikan tidak muncul di tab **Pekerjaan**; buka dari notifikasi "SPK ditolak".

### Kesalahan umum pada SPK

- **Tombol kirim untuk ditinjau nonaktif.** Baca teks merah di bawahnya, itu syarat yang belum terpenuhi.
- **Pesan dari server saat Mulai atau Kirim.** Bila status SPK sudah berubah (misalnya dibatalkan atau dialihkan kantor), aplikasi menampilkan alasan dari server dan memuat ulang SPK.
- **"Data sudah berubah. Kami memuat ulang."** SPK diubah pihak lain saat Anda membukanya. Periksa isi layar yang baru, lalu ulangi tindakan.
- **"Anda tidak punya akses untuk tindakan ini."** SPK dialihkan ke teknisi lain atau status tidak mengizinkan tindakan itu.
- **Aksi tersimpan "Gagal dikirim: {alasan}".** Server menolak aksi yang menunggu sinyal, misalnya SPK sudah dialihkan. Ketuk **Coba lagi** atau **Buang** (lihat bagian berikut).


## Tanpa sinyal: aksi menunggu kirim


Aksi berikut tidak gagal saat sinyal hilang: **Saya berangkat**, **Mulai** (SPK dan tiket), kirim SPK untuk ditinjau, **Selesaikan** tiket, komentar tiket, deklarasi material, dan permintaan barang. Aplikasi menyimpannya di ponsel dan mengirimnya sendiri saat sinyal kembali, satu per satu menurut urutan ketukan, per SPK atau tiket. Kirim ulang karena sinyal putus memakai kunci yang sama, jadi server tidak mencatatnya dua kali.

![SPK yang Mulai-nya disimpan: banner luring dan tanda Menunggu kirim](~/assets/guide/technician/detail-spk-menunggu-kirim.webp)

1. Ketuk aksinya dan konfirmasi seperti biasa.
2. Tanpa sinyal, layar menulis banner "Anda sedang luring. Aksi disimpan dan dikirim otomatis saat online." Aksi itu muncul di atas tombol, bertanda **Menunggu kirim**. Tombol untuk aksi yang sama tidak ditawarkan lagi.
3. Saat sinyal kembali, tanda berganti menjadi **Mengirim**, lalu hilang bila server menerima. Ketuk **Coba lagi** di banner untuk memeriksa sinyal dan mengirim saat itu juga.

Bila server menolak aksi itu, tandanya menjadi **Gagal dikirim: {alasan}** dengan dua tombol:

- **Coba lagi** mengirim ulang aksi itu. Untuk **Mulai** yang ditolak karena jauh dari lokasi, aplikasi menanyakan **Alasan** lebih dulu.
- **Buang** menghapus aksi dari ponsel setelah konfirmasi "Buang aksi ini?". Aksi yang dibuang tidak pernah terkirim.

Aksi yang ditolak menahan aksi di belakangnya untuk SPK atau tiket yang sama sampai Anda memutuskannya. Di layar mana pun, pemberitahuan merah "N aksi gagal dikirim" dengan tombol **Lihat aksi** membuka lembar **Aksi belum terkirim**, yang mendaftar semua aksi yang menunggu dari semua SPK dan tiket ("Semua aksi sudah terkirim." bila kosong).

### Belum pasti terkirim

Kadang aksi sudah sampai ke server, tetapi jawabannya tidak sampai ke ponsel, misalnya sinyal putus tepat saat server menjawab. Aplikasi mencobanya lagi beberapa kali, lalu berhenti setelah sekitar 30 menit tanpa jawaban yang jelas. Aksi itu tampil dengan tulisan "Belum pasti terkirim. Aksi ini mungkin sudah sampai, dan mengirim ulang tidak membuatnya ganda." Waktu tanpa sinyal sama sekali tidak dihitung.

- Periksa dulu status SPK atau tiketnya di layar. Aplikasi memuatnya ulang saat aksi berhenti.
- **Coba lagi** mengirim aksi yang sama sekali lagi. Server mengenali aksi yang sudah pernah diterima dan tidak mencatatnya dua kali, jadi komentar atau permintaan barang tidak menjadi ganda.
- **Buang** menghentikan pengiriman setelah konfirmasi "{aksi} belum pasti terkirim dan mungkin sudah sampai. Bila dibuang, aplikasi berhenti mengirimnya. Periksa statusnya di layar dulu." Aksi yang sudah sampai tetap tercatat di kantor.

Beberapa hal tetap butuh internet dan tombolnya nonaktif dengan tulisan "Butuh koneksi internet": menampilkan kata sandi PPPoE, tambah, ubah, dan hapus material di SPK, lampiran tiket, menghapus foto yang sudah terkirim, membatalkan permintaan barang, notifikasi uji, dan masuk.
