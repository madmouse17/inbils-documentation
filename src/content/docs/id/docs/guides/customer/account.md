---
title: "8. Akun"
description: "Tab Akun menampilkan siapa Anda, tampilan aplikasi, cara menghubungi ISP, profil pelanggan, lalu menu pengelolaan akun."
---

Tab **Akun** menampilkan siapa Anda, tampilan aplikasi, cara menghubungi ISP, profil pelanggan, lalu menu pengelolaan akun.

![Akun](~/assets/guide/customer/redesign/akun-teal-light.webp)

Isi layar dari atas ke bawah:

1. **Kepala profil**: inisial, nama, kode pelanggan, dan status pelanggan (Aktif, Ditangguhkan, dan seterusnya).
2. **Tampilan**: pilih **Sistem** (mengikuti pengaturan ponsel), **Terang**, atau **Gelap**. Pilihan tersimpan di ponsel ini dan berlaku seketika.
3. Kartu **Hubungi {nama ISP}**: kontak ISP yang diisi di profil perusahaan. Baris yang mungkin ada: **WhatsApp**, **Telepon**, **Email**, **Situs web**, dan **Jam layanan**. Ketuk **WhatsApp** untuk membuka percakapan di WhatsApp, **Telepon** untuk membuka pemanggil, **Email** untuk menulis email, dan **Situs web** untuk membuka peramban. **Jam layanan** hanya teks, misalnya "Senin sampai Sabtu 08.00 sampai 20.00". Bagian yang belum diisi ISP tidak tampil, dan kartunya hilang bila ISP belum mengisi satu pun. Bila ponsel tidak punya aplikasi untuk tautan itu, muncul "Tidak bisa membuka WhatsApp." (atau nama kanal lain).
4. **Profil pelanggan** (hanya dibaca): email untuk masuk, email, telepon, dan narahubung. Data yang kosong tertulis "Belum diisi". Tertulis "Hubungi CS untuk mengubah data."
5. **Alamat** dengan penanda "Utama" dan "Titik pemasangan". Nama tagihan, alamat, dan email hanya bisa diubah oleh ISP.
6. Baris menu: **Langganan**, **Riwayat pembayaran**, **Kunjungan teknisi**, lalu **Ubah profil**, **Ganti kata sandi**, **Perangkat**, **Notifikasi uji**, **Tentang aplikasi**, dan **Keluar**.

Warna aplikasi mengikuti warna merek ISP, jadi tiap ISP bisa tampak berbeda. Warna itu dikirim dari server saat aplikasi memuat data akun.


## Ubah profil


1. Ketuk **Ubah profil**.
2. Ubah **Nama** (wajib) atau **Telepon**.
3. Ketuk **Simpan**. Muncul "Profil diperbarui."

Email login tidak bisa diubah di aplikasi; hubungi ISP bila perlu mengubahnya. Perubahan ini mengubah nama akun login (yang tampil di sapaan Beranda) dan nomor telepon kontak. Nama dan alamat penagihan pada data pelanggan tidak berubah.


## Ganti kata sandi


1. Ketuk **Ganti kata sandi**.
2. Isi **Kata sandi saat ini**, **Kata sandi baru** (minimal 8 karakter), dan **Ulangi kata sandi baru**.
3. Ketuk **Ganti kata sandi**.
4. Semua perangkat yang sedang masuk, termasuk ponsel ini, keluar. Aplikasi kembali ke layar masuk dengan pesan "Kata sandi sudah diganti. Masuk lagi dengan kata sandi baru." Masuk lagi dengan kata sandi baru.

Kata sandi saat ini yang salah menampilkan "Kata sandi saat ini salah." Setelah 5 kali salah dalam semenit, aplikasi menolak percobaan berikutnya sampai jeda berlalu. Ulangan yang berbeda ditolak dengan "Ulangan kata sandi baru tidak sama."


## Perangkat


![Perangkat](~/assets/guide/customer/perangkat.webp)

Daftar ponsel yang sedang masuk ke akun Anda: nama perangkat, kapan masuk, dan terakhir dipakai; ponsel yang sedang Anda pegang ditandai "Perangkat ini".

Untuk mengeluarkan perangkat (misalnya ponsel hilang):

1. Ketuk tombol **Keluarkan** pada perangkat itu.
2. Konfirmasi di "Keluarkan perangkat?".
3. Perangkat itu keluar dari akun dan harus masuk lagi dengan kata sandi.

Bila yang dikeluarkan ponsel ini sendiri, Anda keluar dari aplikasi. Bila ponsel hilang, ganti juga kata sandi supaya semua sesi berakhir.


## Tentang aplikasi


![Tentang aplikasi](~/assets/guide/customer/tentang-aplikasi.webp)

Menampilkan versi aplikasi, ID aplikasi, lingkungan, server, dan lisensi sumber terbuka. Sebutkan versi ini saat menghubungi ISP tentang masalah aplikasi.


## Keluar


1. Ketuk **Keluar**.
2. Konfirmasi di "Keluar dari akun?". Aplikasi langsung keluar, walaupun ponsel sedang offline.

Anda harus masuk lagi untuk memakai aplikasi.
