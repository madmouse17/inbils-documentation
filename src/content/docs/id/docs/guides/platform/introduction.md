---
title: "1. Pendahuluan"
description: "Panduan ini untuk operator Inbils, yang juga disebut superadmin. Operator menjalankan satu instalasi Inbils untuk banyak perusahaan ISP."
---

## 1.1 Siapa memakai panduan ini


Panduan ini untuk operator Inbils, yang juga disebut superadmin. Operator menjalankan satu instalasi Inbils untuk banyak perusahaan ISP. Operator memakai panel `/platform` untuk membuat perusahaan, memeriksa kondisi tenant, menanggapi permintaan anak perusahaan, membantu pengguna, memelihara templat peran dan memperbaiki peran perusahaan, meminta ekspor data, dan membaca audit lintas perusahaan.

Peran yang dapat memakai: semua operator platform dengan akun aktif. Panel operator tidak membagi operator ke dalam peran atau izin yang berbeda. Aksesnya berlaku penuh setelah operator lolos autentikasi dua langkah (2FA) pada sesi itu.

Akun operator terpisah dari akun perusahaan. Akun ini tersimpan sebagai `PlatformAdmin` di tabel `platform_admins`, memakai guard `platform`, dan tidak mempunyai perusahaan asal, keanggotaan, peran perusahaan, token aplikasi, atau fitur **Ingat saya**. Akun operator juga tidak muncul di menu **Pengguna** milik perusahaan.

Admin perusahaan berbeda dari operator:

| Hal | Operator platform | Admin perusahaan |
| --- | --- | --- |
| Alamat masuk | `/platform` atau host khusus platform | halaman masuk web Inbils |
| Ruang lingkup | semua tenant pada satu instalasi | perusahaan yang boleh dimasuki akun itu |
| 2FA | wajib | diatur pengguna, atau diwajibkan kebijakan perusahaan |
| Batas sesi tanpa aktivitas | 30 menit | 120 menit secara standar |
| Peran | memelihara templat untuk perusahaan baru dan memperbaiki peran perusahaan sebagai tindakan dukungan tercatat | membuat, mengubah, dan menghapus peran perusahaannya sendiri di menu **Peran** |
| Data operasional tenant | dibuka melalui **Akses dukungan** sebagai pengguna tenant | dibuka langsung sesuai izin pengguna |
| Lupa kata sandi | tidak ada pemulihan mandiri | tautan atur ulang melalui email |

Admin, manajer, dan staf perusahaan mengikuti **Panduan Web Inbils**. Teknisi dan pelanggan mengikuti panduan aplikasi masing-masing.


## 1.2 Perusahaan, anak perusahaan, dan tenant


Satu baris di dasbor operator mewakili satu tenant. Tenant terdiri dari satu perusahaan paling atas dan semua anak perusahaannya. Panduan ini menyebut perusahaan paling atas sebagai perusahaan induk atau Head.

Operator membuka halaman tenant melalui perusahaan induknya. Anak perusahaan tidak mempunyai halaman tenant tersendiri di panel operator. Saat operator menangguhkan, mengaktifkan kembali, mengekspor, atau menghapus tenant, tindakan itu mencakup perusahaan induk dan anak perusahaan sesuai aturan pada [bab 6](/docs/guides/platform/suspend-reactivate-delete/) dan [9](/docs/guides/platform/company-data-export/).

Data setiap perusahaan tetap terpisah. Pengguna, pelanggan, langganan, tagihan, inventaris, jaringan, dan audit tenant selalu dibaca menurut perusahaan pemiliknya. Angka pada baris perusahaan induk di dasbor menjumlahkan data induk dan anak perusahaannya.


## 1.3 Cara membaca panduan


- Nama menu, tombol, lencana, dan isian ditulis tebal persis seperti tulisan di layar.
- Pesan kesalahan ditulis dalam tanda kutip.
- Nama rute, perintah, kode peran, dan kode izin ditulis sebagai `kode`.
- **Peran yang dapat memakai** menjelaskan siapa yang menjalankan langkah. Sebagian besar layar dipakai semua operator. Perintah konsol hanya dijalankan tim server yang mempunyai akses terminal.
- Gambar diambil dari database E2E dengan akun operator dan perusahaan contoh. Nama, jumlah, status, dan waktu pada instalasi Anda akan berbeda.
- Bagian yang membahas layar perusahaan merujuk ke **Panduan Web Inbils** bila operator perlu memahami apa yang dilihat pengguna tenant.

Panel biasanya dibuka di `/platform` pada host aplikasi. Bila tim server mengatur `PLATFORM_DOMAIN`, rute platform hanya tersedia pada host itu. Host khusus tetap memakai path `/platform` dan harus memakai sesi yang sama dengan aplikasi agar **Akses dukungan** dapat berpindah ke layar tenant.


## 1.4 Mengenal layar


Panel operator memakai kerangka yang sama pada setiap halaman:

- Pita berwarna di atas menulis **Panel operator** dan "Akses lintas perusahaan tercatat di audit."
- Sidebar bernama **Inbils Platform** memuat **Dasbor**, **Perusahaan baru**, **Templat peran**, **Ekspor**, dan **Audit platform**.
- Di layar sempit, klik tombol **Menu navigasi** untuk membuka sidebar.
- Bilah atas menampilkan judul halaman dan menu operator. Menu itu memuat nama, email, **Autentikasi dua langkah**, **Mode gelap** atau **Mode terang**, dan **Keluar**.
- Tautan **Lewati ke konten utama** muncul saat menerima fokus keyboard.
- Toast hijau menandai tindakan berhasil. Toast merah menampilkan penolakan atau kegagalan.
- Pilih jumlah baris di kotak "10 / halaman" (10, 25, atau 50). Tombol **Sebelumnya** dan **Berikutnya** memindahkan halaman.

Tindakan sensitif membuka dialog. Isian yang mungkin muncul:

- **Alasan**, 5 sampai 200 karakter. Keterangan di bawahnya menulis bahwa alasan tercatat di audit.
- **Ketik {kode} untuk melanjutkan**. Huruf besar dan kecil harus sama.
- **Kata sandi operator**. Gunakan kata sandi akun operator, bukan akun perusahaan. Isian ini hanya tampil bila konfirmasi kata sandi terakhir sudah lewat 5 menit. Selama konfirmasi masih berlaku, dialog menulis "Terkonfirmasi sampai HH.mm" ([bagian 2.5](/docs/guides/platform/sign-in-and-account-security/)).

Tombol tindakan tetap nonaktif sampai semua isian wajib memenuhi syarat.
