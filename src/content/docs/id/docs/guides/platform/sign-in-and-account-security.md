---
title: "2. Masuk dan keamanan akun operator"
description: "Jalankan perintah interaktif ini: Peran yang dapat memakai: tim server dengan akses terminal."
---

## 2.1 Membuat akun operator


Peran yang dapat memakai: tim server dengan akses terminal. Panel tidak menyediakan tombol membuat, mengubah, menonaktifkan, atau menghapus akun operator.

Jalankan perintah interaktif ini:

```bash
php artisan inbils:platform:admin-create
```

Dengan Sail:

```bash
./vendor/bin/sail artisan inbils:platform:admin-create
```

Perintah meminta **Name**, **Email**, **Password**, dan **Confirm password**. Aturannya:

- nama wajib, paling banyak 255 karakter;
- email wajib, valid, paling banyak 255 karakter, dan belum dipakai operator lain;
- kata sandi minimal 12 karakter serta memuat huruf dan angka;
- konfirmasi kata sandi harus sama.

Perintah menulis audit **Operator dibuat**. Bila berhasil, terminal menulis bahwa admin platform dibuat dan meminta orang itu masuk di `/platform/login` untuk segera mendaftarkan 2FA.

Buat akun hanya saat calon operator siap mendaftarkan aplikasi autentikator. Login pertama memakai pola trust on first use. Orang yang mengetahui kata sandi sebelum pendaftaran selesai dapat mendaftarkan autentikatornya lebih dulu.

Tidak ada perintah untuk mereset 2FA operator. Bila operator kehilangan aplikasi autentikator dan seluruh kode pemulihan, tim server harus membuat akun operator baru dengan email lain. Nonaktifkan akun lama melalui prosedur server yang dikendalikan pemilik instalasi. Panel tidak menyediakan tindakan tersebut.


## 2.2 Masuk pertama kali dan mendaftarkan 2FA


Peran yang dapat memakai: operator baru yang akunnya belum mempunyai 2FA.

1. Buka `/platform`. Isi **Email** dan **Kata sandi**, lalu klik **Masuk**.

   ![Halaman Masuk ke panel operator dengan logo inbils, isian Email, dan Kata sandi](~/assets/guide/web/platform-login.webp)

2. Inbils membuka halaman **Autentikasi dua langkah**. Lencana awalnya **Nonaktif**. Klik **Mulai pengaturan**.

   ![Halaman Autentikasi dua langkah operator sebelum pendaftaran dengan lencana Nonaktif dan tombol Mulai pengaturan](~/assets/guide/web/platform-two-factor-setup.webp)

3. Pindai kode QR dengan aplikasi autentikator. Bila pemindaian gagal, masukkan kunci pengaturan yang tampil di bawah QR.
4. Isi **Kode autentikasi** dengan kode 6 digit dari aplikasi, lalu klik **Konfirmasi dan aktifkan**.
5. Bila kode benar, halaman menampilkan **Kode pemulihan Anda**. Ada 8 kode. Setiap kode hanya dapat dipakai sekali dan tidak ditampilkan lagi setelah halaman ditinggalkan.
6. Klik **Salin** atau **Unduh sebagai teks**. Unduhan bernama `kode-pemulihan-platform-inbils.txt`.
7. Simpan kode di pengelola kata sandi atau tempat aman lain. Klik **Saya sudah menyimpan kode ini** untuk membuka **Dasbor**.

Akun autentikator memakai nama aplikasi dengan akhiran `Platform` dan email operator sebagai nama akun. Kode berubah setiap 30 detik. Kode yang dipakai untuk menyelesaikan pendaftaran langsung dihitung sebagai sudah dipakai dan tidak dapat digunakan lagi pada login berikutnya.

Kode QR hanya tampil sekali. Bila halaman ditutup sebelum konfirmasi, lencana menjadi **Belum selesai**. Alert **Pengaturan belum selesai** menulis "Kode QR hanya tampil sekali. Mulai lagi untuk mendapat kode baru." Klik **Mulai lagi**.

Sebelum 2FA aktif, operator hanya dapat membuka halaman pengaturan 2FA dan keluar. Rute panel lain mengembalikan operator ke halaman ini.

### Kesalahan umum

- Pesan "Kode autentikasi dua langkah tidak valid." berarti kode salah, sudah dipakai, atau tidak lagi berada dalam jendela waktunya. Pakai kode terbaru dan periksa jam perangkat.
- Pendaftaran selesai, tetapi kode yang sama ditolak saat login berikutnya: tunggu aplikasi menampilkan kode berikutnya. Inbils menolak pemakaian ulang satu kode.
- Halaman menampilkan **Pengaturan belum selesai**: klik **Mulai lagi**. Kode QR lama tidak dapat ditampilkan ulang.
- QR tidak bisa dipindai: masukkan kunci pengaturan yang tampil di bawah QR secara manual.


## 2.3 Masuk berikutnya


Peran yang dapat memakai: operator dengan 2FA aktif.

1. Isi **Email** dan **Kata sandi** di halaman **Masuk ke panel operator**, lalu klik **Masuk**.
2. Di halaman **Autentikasi dua langkah**, isi **Kode autentikasi** dengan kode 6 digit, lalu klik **Masuk**.
3. Bila aplikasi autentikator tidak tersedia, klik **Pakai kode pemulihan**. Isi **Kode pemulihan**, lalu klik **Masuk**.
4. Klik **Pakai kode autentikasi** untuk kembali ke kode 6 digit. Klik **Kembali ke halaman masuk** untuk membatalkan login.

Login yang menunggu kode berlaku 10 menit sejak kata sandi diterima. Setelah itu Inbils mengembalikan operator ke halaman masuk. Setiap sesi browser harus melewati tantangannya sendiri. Login di browser kedua tidak memakai verifikasi dari browser pertama.

Inbils menerima kode TOTP pada langkah waktu sekarang, satu langkah sebelum, atau satu langkah sesudah untuk menoleransi perbedaan jam perangkat. Guard anti-replay tetap menolak langkah yang sudah dipakai.

### Batas percobaan

- Lima kegagalan dalam satu menit untuk satu email dan alamat IP menahan login dari pasangan itu.
- Dua puluh kegagalan dalam satu jam untuk satu email menahan akun itu dari semua alamat.
- Dua puluh kegagalan dalam satu menit dari satu alamat IP menahan alamat itu, meski email yang dicoba berubah.
- Tantangan 2FA menerima paling banyak 5 percobaan per menit untuk satu operator dan alamat, serta 10 percobaan per 15 menit untuk operator itu dari semua alamat.

Saat dibatasi, Inbils menulis "Terlalu banyak percobaan. Coba lagi dalam N menit." N dibulatkan ke atas ke menit penuh. Kode atau kata sandi yang benar tetap ditolak sampai waktu tunggu habis. Akun operator nonaktif memakai pesan kredensial salah yang sama agar orang lain tidak dapat menebak status akun.


## 2.4 Mengelola kode pemulihan


Peran yang dapat memakai: operator untuk akunnya sendiri.

1. Klik menu operator di kanan atas, lalu **Autentikasi dua langkah**.
2. Alert **Autentikasi dua langkah aktif** menampilkan **Sisa kode pemulihan**.

   ![Halaman Autentikasi dua langkah operator aktif dengan jumlah kode pemulihan dan tombol Buat kode pemulihan baru](~/assets/guide/web/platform-two-factor-status.webp)

3. Klik **Buat kode pemulihan baru** bila kode tersisa sedikit atau salinannya tidak lagi aman.
4. Dialog **Buat kode pemulihan baru?** menulis bahwa kode lama langsung tidak berlaku. Isi **Kata sandi operator** bila dialog memintanya ([bagian 2.5](/docs/guides/platform/sign-in-and-account-security/)), lalu klik **Buat kode baru**.
5. Simpan 8 kode baru sebelum meninggalkan halaman.

Kode pemulihan yang dipakai tercatat di **Audit platform** sebagai **Kode pemulihan dipakai**. Pembuatan ulang kode tercatat sebagai **Kode pemulihan dibuat ulang**.

Panel operator tidak mempunyai tombol mematikan 2FA. Reset 2FA pada halaman perusahaan hanya berlaku untuk pengguna tenant, bukan operator.


## 2.5 Konfirmasi kata sandi untuk tindakan sensitif


Konfirmasi kata sandi platform terpisah dari konfirmasi kata sandi pengguna tenant. Satu konfirmasi berlaku 5 menit pada sesi operator dan mencakup semua tindakan sensitif, tidak hanya dialog tempat Anda mengetik kata sandi.

Dialog yang meminta **Kata sandi operator** menanyakannya sekali. Setelah berhasil, dialog sensitif berikutnya dalam 5 menit tidak menampilkan isian itu dan menulis "Terkonfirmasi sampai HH.mm" (jam di browser Anda). Bila 5 menit habis selagi dialog terbuka, isian muncul lagi. Server memeriksa batas itu pada setiap tindakan, jadi menyembunyikan isian hanya menghemat mengetik.

Untuk tindakan tanpa isian itu, misalnya **Mode ubah** pada banner dukungan, server membuka halaman **Konfirmasi kata sandi** bila konfirmasi terakhir sudah lewat 5 menit. Isi **Kata sandi**, lalu klik **Konfirmasi**. Inbils kembali ke halaman yang Anda buka sebelum diminta mengonfirmasi, atau ke **Dasbor** bila halaman itu bukan bagian panel. Dari banner dukungan, Inbils kembali ke halaman tenant yang sama. Klik **Mode ubah** lagi.

Kata sandi salah menampilkan "Kata sandi tidak sesuai." Lima kegagalan per operator dan alamat dalam satu menit menahan percobaan berikutnya dengan "Terlalu banyak percobaan. Coba lagi dalam N menit." Kata sandi hanya dikirim di body request. Inbils tidak menyimpannya di URL, audit, properti Inertia, atau riwayat browser.

Ringkasan tindakan ada di [bagian 13.1](/docs/guides/platform/appendix/).


## 2.6 Sesi dan keluar


Sesi operator berakhir setelah 30 menit tanpa aktivitas. Request yang diterima selama **Akses dukungan** memperbarui aktivitas platform, tetapi sesi dukungan tetap mempunyai batas mutlak 30 menit sejak dimulai.

Bila sesi operator berakhir karena tidak aktif, Inbils membuka halaman masuk dengan pesan "Sesi Anda telah berakhir. Silakan masuk kembali." dan mencatat **Sesi operator berakhir**. Akun operator yang dinonaktifkan juga dikeluarkan dengan pesan yang sama, tetapi tanpa baris audit.

Untuk keluar, klik menu operator, lalu **Keluar**. Bila **Akses dukungan** sedang aktif, logout operator juga mengakhiri akses itu.
