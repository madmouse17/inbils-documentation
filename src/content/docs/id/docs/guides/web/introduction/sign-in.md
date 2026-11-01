---
title: "1.2 Masuk"
description: "Akun dibuat oleh admin lewat menu Pengguna (bagian 8.5). Web tidak menyediakan pendaftaran sendiri. Admin tidak mengetik kata sandi untuk akun staf."
---

Akun dibuat oleh admin lewat menu Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)). Web tidak menyediakan pendaftaran sendiri. Admin tidak mengetik kata sandi untuk akun staf: Inbils mengirim email undangan ke alamat akun, dan pemilik akun memasang kata sandinya lewat tombol **Atur kata sandi** di email itu. Tautan undangan berlaku 60 menit. Bila undangan hilang atau kedaluwarsa, admin memakai **Kirim ulang undangan** di halaman detail pengguna ([bagian 8.5](/docs/guides/web/administration/users/)), atau pemilik akun memakai **Lupa kata sandi?** ([bagian 1.3](/docs/guides/web/introduction/forgot-password/)).

Peran yang dapat memakai: semua pengguna dengan akun aktif. Akun nonaktif ditolak dengan pesan yang sama seperti kata sandi salah.

1. Buka alamat Inbils di browser. Admin atau tim IT Anda memberi alamatnya.
2. Isi **Email** dan **Kata sandi**.

   ![Halaman masuk Inbils dengan logo inbils, judul Masuk, isian Email dan Kata sandi, kotak Ingat saya, tautan Lupa kata sandi?, dan tombol Masuk](~/assets/guide/web/login.webp)

3. Centang **Ingat saya** bila Anda memakai perangkat pribadi. Tanpa centang ini, sesi berakhir setelah 120 menit tanpa aktivitas (pengaturan standar yang dapat diubah admin server).
4. Klik **Masuk**.

Setelah Anda klik **Masuk**, ada beberapa kemungkinan:

- Berhasil: Inbils membuka halaman yang Anda tuju sebelumnya, atau **Dasbor** ([bab 2](/docs/guides/web/dashboard/queue-cards/)).
- Akun memakai 2FA: Inbils membuka halaman **Autentikasi dua langkah** ([bagian 1.4](/docs/guides/web/introduction/two-factor-authentication/)).
- Akun tanpa izin akses web: Inbils membuka halaman **Gunakan aplikasi Inbils** untuk teknisi dan pelanggan, atau **Akun ini belum punya akses aplikasi web** untuk akun tanpa akses sama sekali ([bagian 1.1](/docs/guides/web/introduction/who-uses-this-guide/)).
- Instalasi baru tanpa perusahaan: Inbils membuka halaman **Pengaturan awal** (uraiannya di bawah). Wizard tidak muncul lagi setelah perusahaan ada.

Untuk keluar, klik nama Anda di kanan atas, lalu **Keluar**.

## Pengaturan awal pada instalasi baru

Kartu **Buat perusahaan Anda** memuat empat langkah: **Data perusahaan**, **Pengaturan sistem**, **Admin pertama**, dan **Konfirmasi**. Tombol Enter di langkah 1 sampai 3 memindahkan Anda ke langkah berikutnya, sama seperti **Lanjut**. Isian wajib yang kosong ditolak dengan pesan merah di atas formulir sebelum Anda pindah langkah.

1. Di **Data perusahaan**, isi **Nama perusahaan** dan **Kode perusahaan** (wajib). **Email**, **Telepon**, **Website**, **Logo**, dan **Alamat** boleh dikosongkan. Klik **Lanjut**.
2. Di **Pengaturan sistem**, pilih **Mata uang** (IDR, USD, SGD, atau EUR) dan **Zona waktu** (ketik untuk mencari, lalu pilih). Isi **Format tanggal** (misalnya d M Y atau d/m/Y) dan **Format tanggal dan jam** (misalnya d M Y H:i). Keempatnya sudah terisi nilai standar dan semuanya wajib. Klik **Lanjut**.
3. Di **Admin pertama**, isi **Nama admin**. **Email admin** terisi otomatis dengan email akun Anda dan tidak bisa diubah. Klik **Lanjut**.
4. Di **Konfirmasi**, periksa ringkasan, lalu klik **Selesaikan**. Klik **Kembali** untuk memperbaiki langkah sebelumnya.

Inbils menampilkan toast hijau "Pengaturan awal selesai." dan membuka **Dasbor**. Akun yang menyelesaikan wizard menjadi admin perusahaan baru. Nama, kode, kontak, logo, dan alamat bisa diubah lagi di menu **Perusahaan**, dan format tanggal di **Pengaturan Perusahaan** ([bagian 8.1](/docs/guides/web/administration/company/)). Layar web tidak menyediakan pengubah **Mata uang** dan **Zona waktu**, jadi periksa keduanya sebelum klik **Selesaikan**.

## Kesalahan umum

- Pesan "Email atau kata sandi salah." berarti email atau kata sandi salah, atau akun Anda nonaktif. Periksa tulisan email, lalu minta admin memeriksa status akun bila kata sandi sudah benar.
- Pesan "Terlalu banyak percobaan. Coba lagi dalam N menit." muncul setelah lima percobaan gagal dari alamat dan email yang sama. Tunggu sampai menit itu habis, lalu coba lagi.
- Pesan "Akun perusahaan Anda sedang ditangguhkan. Hubungi dukungan." muncul bila email dan kata sandi benar, tetapi semua perusahaan yang boleh Anda masuki ditangguhkan. Hubungi admin server. Pesan yang sama muncul di bawah **Email** bila perusahaan Anda ditangguhkan saat Anda sedang bekerja dan tidak ada perusahaan lain yang bisa Anda masuki: Inbils mengeluarkan Anda dan membuka halaman masuk.
- Halaman **Sesi berakhir** muncul bila halaman masuk terbuka terlalu lama. Klik **Muat ulang halaman**, lalu masuk lagi.
- Di **Pengaturan awal**, langkah yang belum lengkap ditolak dengan pesan merah, misalnya "Nama dan kode perusahaan wajib diisi." Di langkah **Konfirmasi**, bila server menolak data (misalnya kode perusahaan sudah dipakai), pesan "Data belum bisa disimpan:" disusul alasannya. Klik **Kembali** ke langkah yang bersangkutan untuk memperbaikinya.
