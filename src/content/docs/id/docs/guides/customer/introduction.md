---
title: "1. Pendahuluan"
description: "Aplikasi Android Inbils Pelanggan dipakai untuk melihat tagihan dan membayarnya, memeriksa layanan internet Anda, dan menghubungi penyedia layanan (ISP)"
---

Aplikasi Android **Inbils Pelanggan** dipakai untuk melihat tagihan dan membayarnya, memeriksa layanan internet Anda, dan menghubungi penyedia layanan (ISP) lewat tiket. Pelanggan tidak lagi memakai situs web untuk hal-hal itu. Login pelanggan di situs web hanya menampilkan halaman "Gunakan aplikasi Inbils".


## Memasang aplikasi


1. Buka halaman aplikasi **Inbils Pelanggan** di Google Play Store. Alamatnya diberikan ISP Anda; halaman "Gunakan aplikasi Inbils" di situs web juga memuat tombol **Buka Play Store** bila ISP sudah mengisinya.
2. Ketuk **Pasang**, lalu buka aplikasinya.

Aplikasi berjalan di ponsel Android dan butuh koneksi internet. Bila koneksi putus, aplikasi menampilkan pesan "Anda sedang offline. Data yang tampil mungkin belum terbaru."


## Akun dibuat oleh ISP


Anda tidak mendaftar sendiri. Petugas ISP membuat data pelanggan beserta akun login, lalu sistem mengirim email ke alamat email pelanggan berisi **tautan atur kata sandi**.

1. Buka email dari ISP Anda.
2. Ketuk tautan di dalamnya. Tautan membuka halaman web untuk mengatur kata sandi.
3. Isi kata sandi baru dan simpan.
4. Kembali ke aplikasi dan masuk dengan email dan kata sandi itu.

Tautan berlaku 60 menit. Bila sudah lewat atau email tidak ditemukan, pakai **Lupa kata sandi** (bagian "Lupa kata sandi" di bawah) atau minta ISP mengirim ulang tautan. Kata sandi tidak pernah dikirim lewat WhatsApp; WhatsApp paling banyak hanya memberi tahu bahwa tautan ada di email.

Akun lama yang kata sandinya masih nomor telepon sudah dimatikan. Pemilik akun itu harus mengatur kata sandi baru lewat tautan email dulu. Lihat "Kesalahan umum".


## Membuka aplikasi


![Layar pembuka dengan logo Inbils dan tulisan Aplikasi pelanggan](~/assets/guide/customer/splash.webp)

Saat aplikasi dibuka, layar menampilkan logo Inbils dengan kilau cahaya yang melintas, lalu tulisan "Aplikasi pelanggan" muncul di bawahnya. Layar ini hilang sendiri begitu aplikasi siap, biasanya dalam sekitar satu detik. Bila sinyal lambat, indikator kecil muncul di bawah tulisan itu sampai aplikasi siap. Bila ponsel diatur untuk mengurangi animasi, logo tampil tanpa kilau dan layar langsung berganti saat aplikasi siap.


## Masuk


![Layar masuk](~/assets/guide/customer/masuk.webp)

1. Buka aplikasi.
2. Isi **Email** dengan email yang dipakai ISP untuk akun Anda. Alamat ini terlihat di menu Akun sebagai "Email untuk masuk".
3. Isi **Kata sandi**. Ketuk ikon mata untuk menampilkan atau menyembunyikan kata sandi.
4. Ketuk **Masuk**.

Bila email atau kata sandi salah, muncul "Email atau kata sandi salah." tepat di bawah kolom **Email**, dan pesan itu hilang begitu Anda mengubah email. Pesan lain dari server tampil di tempat yang sama, misalnya "Akun perusahaan Anda sedang ditangguhkan. Hubungi dukungan." Setelah beberapa kali salah, aplikasi menampilkan "Terlalu banyak percobaan"; tunggu sesuai waktu yang tertera.

Anda tetap masuk di ponsel ini sampai Anda keluar, mengganti kata sandi, atau masa berlaku sesi berakhir (sampai 90 hari; aplikasi memperbarui sesi sendiri selama dipakai). Lihat "Kesalahan umum".

Layar masuk juga punya tombol **Tentang aplikasi** (versi aplikasi dan server) yang bisa dibuka sebelum masuk.

![Tentang aplikasi sebelum masuk](~/assets/guide/customer/tentang-aplikasi-before-login.webp)


## Verifikasi dua langkah


Verifikasi dua langkah bersifat pilihan. Bila Anda mengaktifkannya, setelah kata sandi benar aplikasi menampilkan layar **Verifikasi dua langkah**.

![Verifikasi dua langkah](~/assets/guide/customer/verifikasi-dua-langkah.webp)

1. Buka aplikasi autentikator di ponsel Anda.
2. Masukkan **Kode 6 digit** yang tampil, lalu ketuk **Verifikasi**.
3. Bila ponsel autentikator hilang, ketuk **Pakai kode pemulihan** dan masukkan salah satu kode pemulihan. Setiap kode hanya berlaku sekali.
4. Untuk kembali ke kode autentikator, ketuk **Pakai kode autentikator**.

Mengaktifkan, mematikan, dan membuat ulang kode pemulihan **tidak** bisa dilakukan di aplikasi. Lakukan di situs web Inbils: masuk dengan akun Anda, lalu di halaman "Gunakan aplikasi Inbils" ketuk **Kelola akun & 2FA**. Alamat situs web ditanyakan ke ISP.

Kode yang salah menampilkan "Kode salah. Periksa lalu coba lagi." Bila terlalu lama di layar ini, muncul "Kode verifikasi kedaluwarsa. Silakan masuk lagi." Kembali ke layar masuk dan ulangi dari awal. Jika kode pemulihan habis dan ponsel hilang, minta administrator ISP mereset verifikasi dua langkah akun Anda.


## Lupa kata sandi


![Lupa kata sandi](~/assets/guide/customer/lupa-kata-sandi.webp)

1. Di layar masuk, ketuk **Lupa kata sandi?**
2. Isi email akun Anda dan ketuk **Kirim link**.
3. Aplikasi menjawab "Jika email itu terdaftar, link atur ulang kata sandi sudah kami kirim. Periksa kotak masuk Anda." Jawaban ini sama untuk semua alamat, supaya orang lain tidak bisa menebak email mana yang terdaftar.
4. Buka email, ketuk tautannya, dan atur kata sandi baru di halaman web yang terbuka.
5. Kembali ke aplikasi dan masuk dengan kata sandi baru.

Pengaturan ulang selalu selesai di halaman web lewat tautan email, bukan di aplikasi. Format email yang salah ditolak dengan "Format email tidak valid." Tombol **Kembali ke halaman masuk** membatalkan.
