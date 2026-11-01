---
title: "1.3 Lupa kata sandi"
description: "Akun pelanggan hidup di aplikasi, bukan di web. Bila Anda memasang kata sandi dari tautan di email akun pelanggan, Inbils membawa Anda ke halaman masuk"
---

Peran yang dapat memakai: semua pengguna. Inbils mengirim tautan ke email akun, jadi email di akun Anda harus masih aktif.

1. Di halaman masuk, klik **Lupa kata sandi?**.
2. Isi **Email** akun Anda, lalu klik **Kirim tautan**.

   ![Halaman Lupa kata sandi dengan isian Email, tombol Kirim tautan, dan tautan Kembali ke halaman masuk](~/assets/guide/web/forgot-password.webp)

3. Baca pesan hijau yang muncul: "Jika ada akun dengan alamat email tersebut, kami telah mengirim tautan pengaturan ulang kata sandi." Pesan ini sama untuk email yang terdaftar maupun tidak, supaya orang lain tidak bisa menebak akun yang ada.
4. Buka email dengan subjek **Pengaturan Ulang Kata Sandi** dan klik tombol **Atur Ulang Kata Sandi**. Tautan berlaku 60 menit.
5. Di halaman **Atur ulang kata sandi**, isian **Email** sudah terisi. Isi **Kata sandi baru** dan **Ulangi kata sandi baru** dengan kata sandi yang sama (minimal 8 karakter), lalu klik **Simpan kata sandi**.
6. Inbils membawa Anda ke halaman masuk dengan pesan hijau "Kata sandi Anda telah diatur ulang." Masuk dengan kata sandi baru.

Akun pelanggan hidup di aplikasi, bukan di web. Bila Anda memasang kata sandi dari tautan di email akun pelanggan, Inbils membawa Anda ke halaman masuk dengan pesan "Kata sandi tersimpan. Masuk lewat aplikasi Inbils." dan **Email** sudah terisi. Tombol **Buka aplikasi Inbils** di atas isian membuka aplikasi pelanggan: lewat tautan Play Store bila perusahaan sudah mengaturnya, atau, bila belum, langsung ke aplikasi di ponsel Android (bila aplikasinya belum terpasang, Chrome membuka halaman Play Store-nya). Di komputer tanpa tautan Play Store, tombol itu tidak tampil.

## Kesalahan umum

- Pesan "Token pengaturan ulang kata sandi tidak valid." di bawah **Email** berarti tautan sudah lewat 60 menit atau sudah dipakai. Ulangi dari langkah 1 dan pakai tautan dari email terbaru.
- Alamat di isian **Email** yang tidak punya akun mendapat pesan yang sama dengan tautan yang salah, "Token pengaturan ulang kata sandi tidak valid.", supaya halaman ini tidak membocorkan alamat mana yang punya akun. Samakan **Email** dengan alamat yang menerima tautan, atau minta tautan baru.
- Pesan "kata sandi minimal 8 karakter." atau "Konfirmasi kata sandi tidak cocok." muncul di bawah **Kata sandi baru**. Perpanjang kata sandinya, atau samakan kedua isian.
- Email tidak datang: tunggu beberapa menit, periksa folder spam, lalu minta ulang. Permintaan kedua dalam 60 detik tidak mengirim email baru, tetapi layar tetap menampilkan pesan yang sama. Satu alamat IP dibatasi enam permintaan per menit.
- Setelah kata sandi berganti, login aplikasi Android milik akun yang sama berakhir. Masuk lagi di aplikasi dengan kata sandi baru.
