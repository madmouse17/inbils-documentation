---
title: "1.4 Autentikasi dua langkah (2FA)"
description: "2FA meminta kode 6 digit dari aplikasi autentikator di ponsel setelah kata sandi, sehingga kata sandi yang bocor saja tidak cukup untuk masuk."
---

2FA meminta kode 6 digit dari aplikasi autentikator di ponsel setelah kata sandi, sehingga kata sandi yang bocor saja tidak cukup untuk masuk. Fitur ini opsional dan diatur sendiri oleh setiap pengguna. Kode berganti setiap 30 detik.

Peran yang dapat memakai: semua pengguna, untuk akunnya sendiri. Teknisi dan pelanggan menyalakannya di web lewat tombol **Kelola akun & 2FA** pada halaman **Gunakan aplikasi Inbils**.

## Menyalakan 2FA

1. Klik nama Anda di kanan atas, lalu **Profil** ([bagian 1.7](/docs/guides/web/introduction/profile-and-password/)).
2. Di bagian **Autentikasi dua langkah** (lencana **Nonaktif**), klik **Aktifkan autentikasi dua langkah**.
3. Bila Inbils membuka halaman **Konfirmasi kata sandi**, isi **Kata sandi** lalu klik **Konfirmasi**. Kata sandi yang salah ditolak dengan pesan "Kata sandi yang Anda masukkan salah." Konfirmasi ini berlaku 3 jam, jadi Anda tidak ditanya lagi saat mengelola 2FA dalam rentang itu. Setelah konfirmasi, Anda kembali ke Profil. Klik **Aktifkan autentikasi dua langkah** sekali lagi.
4. Pindai kode QR dengan aplikasi autentikator di ponsel. Bila tidak bisa memindai, ketik kunci pengaturan yang tampil di bawah kode QR ke dalam aplikasi.
5. Ketik kode 6 digit dari aplikasi ke isian **Kode autentikasi**, lalu klik **Konfirmasi dan aktifkan**. Lencana berubah menjadi **Aktif**, dan toast hijau menulis "Autentikasi dua langkah aktif. Simpan kode pemulihan Anda dengan aman."
6. Inbils menampilkan **Kode pemulihan Anda**: delapan kode, masing-masing hanya berlaku sekali. Klik **Salin** (tampil bila browser mendukung) atau **Unduh sebagai teks**, simpan di tempat aman seperti pengelola kata sandi, lalu klik **Saya sudah menyimpan kode ini**. Kode tidak ditampilkan lagi.

Kode QR hanya tampil sekali. Bila Anda menutup halaman sebelum langkah 5, lencana menjadi **Belum selesai** dan Inbils menampilkan **Pengaturan belum selesai**. Klik **Mulai lagi** untuk mendapat kode QR baru, atau **Batalkan pengaturan** untuk membatalkan. **Batalkan pengaturan** juga ada di samping **Konfirmasi dan aktifkan** selama kode QR tampil.

## Masuk dengan 2FA

1. Isi email dan kata sandi di halaman masuk, lalu klik **Masuk**.
2. Di halaman **Autentikasi dua langkah**, isi **Kode autentikasi** dengan kode 6 digit dari aplikasi, lalu klik **Masuk**.
3. Bila ponsel hilang atau rusak, klik **Pakai kode pemulihan**, isi **Kode pemulihan**, lalu klik **Masuk**. Klik **Pakai kode autentikasi** untuk kembali ke kode biasa.

Halaman kode berlaku 10 menit setelah kata sandi diterima. Setelah itu Inbils mengembalikan Anda ke halaman masuk. Tautan **Kembali ke halaman masuk** membawa Anda ke sana kapan saja.

Profil menulis "Sisa kode pemulihan:" disusul jumlahnya. Klik **Buat kode pemulihan baru** untuk membuat set baru. Set lama berhenti berlaku saat itu juga.

## Mematikan 2FA

1. Buka **Profil**, bagian **Autentikasi dua langkah**.
2. Klik **Nonaktifkan autentikasi dua langkah**.
3. Di dialog **Nonaktifkan autentikasi dua langkah?**, klik **Nonaktifkan**. Klik **Tetap aktif** untuk membatalkan. Akun kembali hanya dilindungi kata sandi, dan kode pemulihan tidak berlaku lagi.

## Kebijakan 2FA perusahaan dan pengingat

Admin perusahaan (pemegang `company.manage`) dapat mewajibkan 2FA untuk semua admin lewat saklar **Wajib 2FA untuk admin** di **Pengaturan Perusahaan**, kartu **Keamanan** ([bagian 8.1](/docs/guides/web/administration/company/)). Dalam kebijakan ini, admin adalah pengguna yang memegang `company.manage`, `users.manage`, atau `roles.manage`.

- Selama saklar mati (bawaan), admin yang belum memakai 2FA melihat pengingat "Lindungi akun admin dengan 2FA. Satu kata sandi yang bocor cukup untuk membuka data semua pelanggan." di atas halaman admin. **Aktifkan 2FA** membuka Profil. **Nanti saja** menyembunyikannya 7 hari di peramban itu untuk pengguna itu saja, jadi admin lain di komputer yang sama tetap melihatnya.
- Selama saklar nyala, admin tanpa 2FA yang membuka halaman admin mana pun dialihkan ke Profil dengan pesan "Perusahaan mewajibkan 2FA untuk admin. Aktifkan 2FA untuk melanjutkan." Profil, pengaturan 2FA, halaman kata sandi, dan keluar tetap terbuka, jadi admin bisa mengaktifkannya lalu kembali bekerja. Pengguna tanpa izin admin tidak terkena. Permintaan API ke halaman admin dijawab 403.
- Saklar hanya bisa dinyalakan bila 2FA akun Anda sendiri sudah aktif. Tim dukungan Inbils yang masuk sebagai pengguna tidak terkena kebijakan ini, karena mereka sudah memakai 2FA operator.

## Kesalahan umum

- Pesan "Kode autentikasi dua langkah tidak valid." berarti kode salah, sudah berganti, atau sudah dipakai. Ketik kode terbaru dari aplikasi dan pastikan jam ponsel akurat.
- Satu kode hanya diterima sekali. Setelah kode dipakai untuk masuk, tunggu kode berikutnya untuk masuk lagi.
- Lima percobaan salah dalam semenit dari satu alamat menghentikan percobaan berikutnya sementara, bahkan bila kode yang diketik benar. Sepuluh percobaan salah dalam 15 menit menghentikannya untuk akun itu dari alamat mana pun. Tunggu sampai menit pada pesan "Terlalu banyak percobaan. Coba lagi dalam N menit." habis.
- Ponsel hilang dan kode pemulihan habis: minta admin mereset 2FA akun Anda lewat tombol **Atur ulang 2FA** di halaman detail pengguna ([bagian 8.5](/docs/guides/web/administration/users/)). Setelah reset, Anda masuk dengan kata sandi saja dan bisa mendaftar ulang.
- Menyalakan, mematikan, atau membuat ulang kode pemulihan mengakhiri login Anda di browser dan perangkat lain, termasuk login "Ingat saya" dan login aplikasi Android. Sesi yang sedang Anda pakai tetap berjalan. Masuk lagi di aplikasi setelahnya.
