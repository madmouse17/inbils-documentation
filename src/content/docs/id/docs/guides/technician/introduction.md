---
title: "1. Pendahuluan"
description: "Aplikasi Inbils Teknisi adalah aplikasi Android untuk teknisi lapangan."
---

Aplikasi **Inbils Teknisi** adalah aplikasi Android untuk teknisi lapangan. Dengan aplikasi ini Anda menerima SPK dan tiket yang ditugaskan, memulai dan menyelesaikannya, mengirim foto bukti kerja, mencatat material, dan meminta barang ke gudang. Akun teknisi tidak lagi memakai situs web Inbils untuk pekerjaan harian.

Panduan ini mengikuti urutan layar di aplikasi. Lima tab di bagian bawah layar: **Beranda**, **Pekerjaan**, **Material**, **Notifikasi**, **Akun**.


## Memasang aplikasi


1. Minta tautan Play Store aplikasi Inbils Teknisi kepada kantor Inbils. Tautan yang sama muncul sebagai tombol **Buka Play Store** bila akun teknisi Anda membuka situs web Inbils.
2. Buka tautan di ponsel Android, lalu pasang aplikasi.
3. Buka aplikasi **Inbils Teknisi**.

Aplikasi hanya tersedia untuk Android.


## Akun


Akun dibuat oleh admin Inbils. Anda tidak bisa mendaftar sendiri di aplikasi. Admin memberi Anda email dan kata sandi awal, dan mengaktifkan akun Anda sebagai teknisi dengan profil karyawan aktif.

Aplikasi memakai **email dan kata sandi yang sama dengan situs web Inbils**. Mengganti kata sandi di aplikasi berarti mengganti kata sandi di web, dan sebaliknya.


## Membuka aplikasi


![Layar pembuka dengan logo Inbils dan tulisan Aplikasi teknisi](~/assets/guide/technician/splash.webp)

Saat aplikasi dibuka, layar menampilkan logo Inbils dengan kilau cahaya yang melintas, lalu tulisan "Aplikasi teknisi" muncul di bawahnya. Layar ini hilang sendiri begitu aplikasi siap, biasanya dalam sekitar satu detik. Bila sinyal lambat, indikator kecil muncul di bawah tulisan itu sampai aplikasi siap. Bila Anda membuka aplikasi dari notifikasi, layar pembuka hilang langsung ke pekerjaan yang dituju.


## Masuk


![Layar Masuk](~/assets/guide/technician/masuk.webp)

1. Ketik **Email** Anda.
2. Ketik **Kata sandi**. Ketuk ikon mata untuk menampilkan atau menyembunyikannya.
3. Ketuk **Masuk**.
4. Bila akun Anda memakai verifikasi dua langkah, aplikasi membuka layar kode (lihat bagian berikutnya). Bila tidak, Anda langsung masuk ke tab **Beranda**.

Setelah masuk, aplikasi mengingat sesi Anda di ponsel ini. Anda tidak perlu masuk lagi setiap kali membuka aplikasi.

### Kesalahan umum saat masuk

- **"Email atau kata sandi salah."** Periksa ejaan email dan huruf besar-kecil kata sandi.
- **"Akun ini tidak terdaftar sebagai teknisi."** Akun Anda belum diberi hak teknisi atau profil karyawan Anda tidak aktif. Hubungi kantor Inbils.
- **"Akun Anda dinonaktifkan. Hubungi kantor Inbils."** Admin menonaktifkan akun Anda.
- **"Terlalu banyak percobaan. Coba lagi dalam N detik."** Tunggu sesuai hitungan, lalu coba lagi.
- **"Tidak ada koneksi internet."** Masuk selalu butuh internet.


## Verifikasi dua langkah


Bila verifikasi dua langkah aktif di akun Anda, setelah email dan kata sandi benar aplikasi membuka layar **Verifikasi dua langkah**.

![Layar Verifikasi dua langkah](~/assets/guide/technician/verifikasi-dua-langkah.webp)

1. Buka aplikasi autentikator di ponsel Anda.
2. Ketik **Kode 6 digit** yang tampil untuk Inbils.
3. Ketuk **Verifikasi**.
4. Bila ponsel autentikator hilang, ketuk **Pakai kode pemulihan**, ketik salah satu kode pemulihan Anda, lalu ketuk **Verifikasi**. Setiap kode pemulihan hanya berlaku sekali. Ketuk **Pakai kode autentikator** untuk kembali ke kode 6 digit.

Verifikasi dua langkah diaktifkan, dimatikan, dan dikelola di **situs web** Inbils (halaman profil), bukan di aplikasi. Setiap kali pengaturan itu berubah, semua ponsel yang sedang masuk keluar otomatis dan Anda masuk lagi.

### Kesalahan umum pada verifikasi dua langkah

- **"Kode salah. Periksa lalu coba lagi."** Pastikan jam ponsel akurat dan Anda memakai kode terbaru dari aplikasi autentikator.
- **"Kode verifikasi kedaluwarsa. Silakan masuk lagi."** Anda terlalu lama di layar ini. Aplikasi kembali ke layar **Masuk**; ulangi dari awal.
- Jumlah percobaan dibatasi. Setelah beberapa kali salah, tunggu sebelum mencoba lagi.


## Lupa kata sandi


![Layar Lupa kata sandi](~/assets/guide/technician/lupa-kata-sandi.webp)

1. Di layar **Masuk**, ketuk **Lupa kata sandi?**. Bila Anda sudah mengetik email, aplikasi membawanya ke layar ini.
2. Ketik email akun Anda, lalu ketuk **Kirim link**.
3. Aplikasi menjawab "Jika email itu terdaftar, link atur ulang kata sandi sudah kami kirim." Jawaban ini sama untuk email apa pun, jadi tidak membocorkan email mana yang terdaftar.
4. Buka email Anda dan ketuk link di dalamnya. Link membuka **halaman web** Inbils tempat Anda mengetik kata sandi baru. Kata sandi tidak diatur ulang di dalam aplikasi.
5. Kembali ke aplikasi dan masuk dengan kata sandi baru.

Bila sebuah akun masih memakai kata sandi lama yang wajib diganti, aplikasi menampilkan lembar **Atur ulang kata sandi** dengan pesan "Demi keamanan, atur ulang kata sandi lewat link yang kami kirim ke email Anda." Ketuk **Kirim link** dan ikuti langkah 4 dan 5.

Kesalahan umum: email tidak masuk. Periksa folder spam, lalu tunggu satu menit sebelum meminta link lagi. Permintaan link dibatasi per menit.


## Perangkat dan keluar


Satu sesi aplikasi berlaku untuk satu ponsel. Anda bisa melihat dan mengeluarkan ponsel lain di **Akun > Perangkat** (lihat [bab 7](/docs/guides/technician/account/)).

Untuk keluar dari aplikasi: **Akun > Keluar**, lalu konfirmasi. Bila masih ada foto bukti atau aksi yang belum terkirim, aplikasi memberi peringatan bahwa semuanya akan dihapus (lihat [bab 3](/docs/guides/technician/work-orders/)).


## Sesi berakhir


Sesi aplikasi teknisi berlaku 30 hari sejak masuk. Aplikasi memperpanjang sesi saat masa berlakunya tersisa kurang dari 7 hari. Bila sesi habis, atau kata sandi Anda diganti, atau akun dinonaktifkan, aplikasi membuka layar **Masuk** dengan pesan "Sesi Anda berakhir. Silakan masuk lagi." Masuk lagi dengan email dan kata sandi.
