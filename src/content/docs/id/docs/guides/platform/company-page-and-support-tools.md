---
title: "5. Halaman perusahaan dan alat dukungan"
description: "Klik nama tenant pada Dasbor. Bagian atas halaman memuat: Peran yang dapat memakai: semua operator platform."
---

## 5.1 Profil, ringkasan, dan status


Peran yang dapat memakai: semua operator platform.

Klik nama tenant pada Dasbor. Bagian atas halaman memuat:

- judul nama perusahaan dan subjudul **Kode {kode}**;
- lencana status dan tombol lifecycle;
- kartu **Permintaan anak perusahaan**, hanya bila tenant ini punya permintaan terbuka ([bagian 5.3](/docs/guides/platform/company-page-and-support-tools/));
- kartu **Profil perusahaan**;
- kartu **Ringkasan**;
- kartu **Status perusahaan**.

![Halaman tenant operator dengan profil perusahaan, ringkasan, dan status](~/assets/guide/web/platform-company-show.webp)

**Profil perusahaan** hanya dapat dibaca. Isinya: Kode, Email, Telepon, Situs web, Alamat, Zona waktu, Mata uang, Dibuat, Ditangguhkan, dan Pengajuan hapus. Admin tenant mengubah profil dan pengaturan operasional dari web perusahaan.

**Ringkasan** mengulang angka tenant dari dasbor: Anak perusahaan, Pengguna, Pelanggan, Masuk terakhir, Penyimpanan, Job gagal 7 hari, dan WhatsApp gagal 7 hari.

**Status perusahaan** menampilkan status sekarang dan, bila ada, daftar **Syarat pengajuan hapus**. Tindakan lifecycle dibahas pada [bab 6](/docs/guides/platform/suspend-reactivate-delete/).


## 5.2 Admin perusahaan dan integrasi


Kartu **Admin perusahaan** menampilkan paling banyak 25 pengguna yang memegang hak `roles.manage` lewat perannya di perusahaan asal, diurutkan menurut nama. Nama perannya boleh apa saja. Kolomnya:

- **Admin**: nama dan email;
- **Perusahaan**: kode perusahaan asal;
- **Status**: aktif, nonaktif, dan lencana kunci masuk;
- **2FA**: **Aktif** atau **Nonaktif**;
- **Masuk terakhir**: waktu login atau status undangan.

Kartu **Integrasi** memuat Midtrans, WhatsApp, Email, dan RADIUS untuk induk serta setiap anak perusahaan. Kolomnya:

- **Perusahaan**;
- **Layanan**;
- **Status**: **Tidak diisi**, **Terisi**, **Terverifikasi**, atau **Galat**;
- **Aktif**: Ya atau Tidak;
- **Terakhir diuji**, atau **Belum pernah**.

Operator hanya melihat status dan waktu uji. Panel tidak mengirim isi kredensial atau rahasia ke browser operator. Admin setiap perusahaan mengisi dan menguji integrasinya sendiri di menu **Integrasi**. Lihat **Panduan Web Inbils [bagian 8.9](/docs/guides/platform/role-templates/)**.


## 5.3 Menambah anak perusahaan


Kartu **Anak perusahaan** menampilkan Nama dan Kode, Status, Mata uang, Zona waktu, serta jumlah Pengguna.

![Bagian Anak perusahaan pada halaman tenant operator](~/assets/guide/web/platform-company-subsidiaries.webp)

1. Pastikan perusahaan induk berstatus **Aktif**.
2. Klik **Tambah anak perusahaan**.
3. Isi **Nama** dan **Kode**. Aturan kode sama dengan perusahaan induk dan harus unik pada seluruh instalasi.
4. Di bagian **Akses admin**, centang admin yang boleh berpindah ke anak perusahaan baru. Daftar ini memakai admin yang tampil pada kartu **Admin perusahaan**.
5. Klik **Tambah anak perusahaan**.

Membuat anak perusahaan tidak meminta **Kata sandi operator**.

Anak perusahaan mengikuti mata uang dan zona waktu induk. Inbils mengisi Katalog awal, bukan data contoh, dan menyalin templat peran ke anak perusahaan itu. Pengguna yang dicentang mendapat keanggotaan tanpa mengubah perusahaan asalnya, dan mendapat peran di anak perusahaan yang berasal dari templat yang sama dengan perannya di perusahaan asal, selama isi peran itu tidak melebihi hak akses yang ia pegang di perusahaan asal. Anggota yang hanya memegang peran buatan perusahaan tidak mendapat peran. Toast "Anak perusahaan dibuat." lalu menambahkan "Anggota ini belum punya peran di anak perusahaan baru dan perlu diberi peran di Pengguna:" disusul namanya, dan untuk peran yang lebih luas "Peran ini lebih luas daripada yang dipegang anggotanya di perusahaan asal, jadi tidak disalin dan perlu diberikan sendiri di Pengguna:" disusul anggota dan perannya. Minta admin perusahaan memberi peran di menu **Pengguna**.

Seeder membuat akun internal `system-seed-...@inbils.internal` bila anak perusahaan belum mempunyai pengguna asal saat katalog diisi. Akun itu memakai kata sandi acak dan dapat terlihat di tabel **Pengguna**. Akun tersebut bukan operator platform.

### Permintaan anak perusahaan dari tenant

Admin perusahaan induk tidak membuat anak perusahaan sendiri. Admin dengan izin `company.manage` meminta lewat tombol **Minta anak perusahaan** pada kartu **Anak perusahaan** di halaman **Perusahaan** web tenant. Admin mengisi **Nama**, **Kode usulan** (boleh kosong), dan **Catatan** (paling banyak 500 karakter). Satu tenant hanya boleh punya satu permintaan terbuka. Anak perusahaan tidak bisa mengajukan permintaan, hanya perusahaan induk.

Saat permintaan masuk:

- Inbils mengirim email dengan subjek **Permintaan anak perusahaan dari {nama perusahaan}** ke setiap operator platform yang aktif, lewat mailer platform. Email memuat nama yang diminta, kode usulan, catatan, dan pemohon. Tombol **Tinjau permintaan** membuka halaman tenant dengan dialog permintaan itu sudah terbuka.
- Kartu **Permintaan anak perusahaan** tampil di **Dasbor** (permintaan semua tenant, yang paling lama di atas) dan di halaman tenant. Tiap baris menulis nama, "Kode usulan: {kode}" bila ada, "Diminta oleh {nama}, {waktu}", dan catatan. Di Dasbor baris juga menulis "Untuk {perusahaan} ({kode})".
- Audit platform mencatat **Anak perusahaan diminta** (`tenant.subsidiary_requested`).
- Email yang gagal diantrekan tidak membatalkan permintaan. Permintaan tetap tampil di kartu.

Membuat anak perusahaan dari permintaan:

1. Klik **Buat anak perusahaan** pada baris permintaan. Di Dasbor, tombol ini membuka halaman tenant dengan dialognya. Di halaman tenant, tombol ini nonaktif selama tenant belum **Aktif**.
2. Dialog **Buat anak perusahaan dari permintaan** memuat nama pemohon dan catatannya. **Nama** dan **Kode** sudah terisi dari permintaan. Bila permintaan tidak membawa kode, Inbils menyarankannya dari nama. Nama dan kode boleh diubah.
3. Pilih **Akses admin** seperti pada penambahan biasa, lalu klik **Buat anak perusahaan**.

Toast menulis "Anak perusahaan dibuat. Permintaannya ditutup." Membuat anak perusahaan tidak meminta kata sandi operator, juga bila berasal dari permintaan. Audit platform mencatat **Anak perusahaan dibuat** dan **Permintaan anak perusahaan {nama} dibuat** (`tenant.subsidiary_request_closed`, hasil `created`). Inbils tidak mengirim email ke pemohon saat anak perusahaan dibuat.

Menolak permintaan:

1. Klik **Tolak** pada baris permintaan.
2. Dialog **Tolak permintaan {nama}?** menulis bahwa alasan dicatat di audit dan dikirim lewat email ke pemohon.
3. Isi **Alasan**, 5 sampai 200 karakter. Tulis dengan kalimat yang bisa dipahami admin perusahaan. Isi **Kata sandi operator** bila diminta.
4. Klik **Tolak permintaan**.

Inbils mengirim email **Permintaan anak perusahaan ditolak** ke pemohon dengan nama permintaan dan alasan Anda. Toast menulis "Permintaan ditolak. Alasannya dikirim ke pemohon lewat email." Bila pemohon sudah nonaktif atau emailnya tidak bisa diantrekan, toast menulis "Permintaan ditolak. Pemohon tidak bisa dikirimi email, jadi sampaikan alasannya langsung." Audit platform mencatat **Permintaan anak perusahaan {nama} ditolak** dengan alasannya. Tenant bisa mengajukan permintaan baru setelah permintaan ditutup. Tombol **Tolak** tetap aktif pada tenant yang ditangguhkan, dan kartu menulis "Aktifkan kembali perusahaan sebelum membuat anak perusahaan. Permintaan masih bisa ditolak."

### Kesalahan umum

- Tombol nonaktif dan teks menulis "Aktifkan kembali perusahaan sebelum menambah anak perusahaan.": aktifkan kembali tenant lebih dulu.
- "Perusahaan sedang ditangguhkan: aktifkan kembali sebelum menambah anak perusahaan.": status berubah setelah halaman dibuka. Muat ulang, lalu aktifkan kembali.
- Admin yang dicari tidak ada: kartu **Admin perusahaan** hanya menampilkan 25 admin pertama. Gunakan perintah membership pada [bagian 11.1](/docs/guides/platform/console-tasks-and-queues/) bila perlu penanganan server.
- "Permintaan ini sudah ditutup. Muat ulang halaman untuk melihat yang terbaru." atau "Permintaan tidak ditemukan atau sudah ditutup.": operator lain sudah membuat anak perusahaan dari permintaan itu atau menolaknya. Muat ulang halaman.
- Kartu **Permintaan anak perusahaan** tidak tampil: tidak ada permintaan terbuka untuk tenant itu.


## 5.4 Membaca tabel pengguna


Kartu **Pengguna** menggabungkan akun pada perusahaan induk dan semua anak perusahaan. Gunakan **Cari** untuk nama atau email dan **Status** untuk **Aktif** atau **Nonaktif**.

![Bagian Pengguna tenant dengan perusahaan, peran, status, 2FA, masuk terakhir, dan aksi](~/assets/guide/web/platform-company-users.webp)

Kolom:

| Kolom | Arti |
| --- | --- |
| **Pengguna** | Nama dan email. |
| **Perusahaan** | Perusahaan asal pengguna. |
| **Peran** | Peran yang dipegang akun itu di perusahaan asalnya. Bila akun juga anggota perusahaan lain, perannya di sana tidak tampil di kolom ini. |
| **Status** | Aktif atau Nonaktif, ditambah kunci masuk bila ada. |
| **2FA** | Aktif atau Nonaktif. |
| **Masuk terakhir** | Waktu login terakhir atau status undangan. |
| **Aksi** | **Masuk sebagai** dan menu **Aksi lain**. |

Lencana kunci menulis **Terkunci N mnt** atau **Terkunci < 1 mnt**. Arahkan penunjuk ke lencana untuk membaca sebabnya: terlalu banyak kata sandi salah atau terlalu banyak kode 2FA salah. Menit dibulatkan ke atas.

**Masuk sebagai** hanya tampil untuk pengguna aktif yang dapat masuk ke perusahaan aktif dalam tenant itu. Izin pengguna tetap berlaku selama akses. Operator tidak mendapat izin tambahan.


## 5.5 Membuka kunci masuk


1. Pada baris pengguna, buka **Aksi lain**.
2. Klik **Buka kunci masuk**.
3. Dialog menjelaskan bahwa kunci karena kata sandi salah dan kode 2FA salah akan dihapus.
4. Klik **Buka kunci masuk**. Tindakan ini tidak meminta kata sandi operator.

Inbils membersihkan budget login untuk setiap alamat yang tercatat gagal pada pengguna itu selama 15 menit terakhir dan budget 2FA tingkat akun. Budget alamat yang tidak cocok dengan akun mana pun tetap ada. Pengguna lain pada alamat yang sama tidak ikut terbuka.

Toast berhasil menulis "Kunci masuk pengguna dibuka." Tindakan tercatat sebagai **Kunci masuk dibuka** pada audit platform dan sebagai tindakan tim dukungan pada Log Audit perusahaan.


## 5.6 Mengatur ulang 2FA pengguna


**Atur ulang 2FA** hanya tampil bila pengguna mempunyai 2FA.

1. Buka **Aksi lain**, lalu klik **Atur ulang 2FA**.
2. Dialog menulis bahwa 2FA pengguna dimatikan dan pengguna perlu mengaktifkannya lagi. Soal sesi, pada deployment dengan sesi database dialog menulis "Semua sesi masuknya berakhir." Pada driver sesi lain dialog menulis "Sesi yang sedang berjalan berakhir sendiri setelah N menit tanpa dipakai.", dengan N dari masa sesi aplikasi (`SESSION_LIFETIME`).
3. Isi **Kata sandi operator** bila dialog memintanya.
4. Klik **Atur ulang 2FA**.

Inbils menghapus secret dan kode pemulihan pengguna, memutar token **Ingat saya**, dan mencabut token aplikasi. Pada deployment dengan sesi database, Inbils juga menghapus semua sesi web pengguna. Pada driver sesi lain, sesi web yang sedang berjalan tidak dihapus dan berakhir setelah masa sesi habis tanpa dipakai. Pengguna masuk lagi dengan kata sandi dan mendaftarkan 2FA sendiri.

Tindakan hanya berlaku untuk pengguna yang berasal dari tenant itu, bukan orang dari tenant lain yang sekadar mempunyai keanggotaan tambahan. 2FA berlaku untuk seluruh akun pengguna.


## 5.7 Mengirim ulang undangan


**Kirim ulang undangan** hanya tampil untuk admin aktif yang belum pernah masuk.

1. Buka **Aksi lain**, lalu klik **Kirim ulang undangan**.
2. Dialog menyebut alamat email tujuan dan batas 6 kali per menit untuk pengguna itu.
3. Klik **Kirim ulang undangan**. Tindakan ini tidak meminta kata sandi operator.

Inbils membuat tautan atur kata sandi baru dan mengirim email melalui mailer platform. Tautan berlaku 60 menit. Status **Masuk terakhir** kembali mengikuti posisi undangan terbaru.

Bila terlalu banyak permintaan, toast menulis "Terlalu banyak percobaan. Coba lagi dalam N detik." atau "Terlalu banyak percobaan. Coba lagi nanti."


## 5.8 Job gagal, WhatsApp gagal, dan audit terbaru


Halaman tenant menampilkan dua kartu kegagalan:

- **Job gagal**: Waktu, Job, Antrean, dan Galat;
- **WhatsApp gagal**: Waktu, Peristiwa, Template, Kode galat, Penerima, dan Perusahaan.

Tampilan awal berisi paling banyak 10 kegagalan selama 7 hari. Klik **Lihat 30 hari terakhir** untuk membuka daftar paginasi 30 hari. Tombol berubah menjadi **Kembali ke ringkasan**. Bila daftar gagal dimuat, klik **Coba lagi**.

Kartu **Audit terbaru** menampilkan 10 kegiatan terbaru pada induk dan anak perusahaan. Kolomnya Waktu, Kegiatan, Sumber, Pelaku, dan Alasan. **Kegiatan** memuat kalimat kegiatan tanpa rincian, sama seperti di halaman **Audit platform** ([bagian 10.1](/docs/guides/platform/platform-audit/)). Klik **Lihat semua audit** untuk membuka **Audit platform** dengan filter perusahaan itu. **Sumber** pada halaman itu awalnya **Platform**.

### Kesalahan umum

- **Masuk sebagai** tidak tampil: pengguna atau tenant nonaktif, atau pengguna tidak mempunyai perusahaan aktif yang dapat dimasuki dalam tenant itu.
- **Atur ulang 2FA** tidak tampil: 2FA pengguna belum aktif.
- **Kirim ulang undangan** tidak tampil: pengguna bukan admin aktif, atau sudah pernah masuk.
- "Undangan hanya dapat dikirim kepada admin aktif yang belum pernah masuk.": data berubah setelah halaman dibuka. Muat ulang.
- Daftar 30 hari menampilkan galat: periksa koneksi, lalu klik **Coba lagi**.
