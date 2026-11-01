---
title: "8.3 Karyawan"
description: "Karyawan menyimpan profil karyawan yang terhubung ke satu akun pengguna: nomor karyawan, unit, kendaraan, nomor telepon, tanggal masuk, status dan catatan."
---

Karyawan menyimpan profil karyawan yang terhubung ke satu akun pengguna: nomor karyawan, unit, kendaraan, nomor telepon, tanggal masuk, status dan catatan. Akun pengguna saja belum cukup untuk pekerjaan lapangan, karena fitur lapangan juga meminta profil berstatus **Aktif**. Buka menu ini setelah Anda mengundang akun baru di Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)). Pemegang `employee.manage` juga bisa membuat profilnya sekaligus di form **Buat Pengguna**. Form itu hanya memuat telepon, tanggal masuk, status dan catatan, jadi unit dan kendaraan tetap diisi di layar ini.

Peran yang dapat memakai: admin. Izin: `employee.view` membuka menu dan daftar, `employee.manage` menampilkan tombol **Buat Karyawan** dan **Ubah**, `employee.export` menampilkan tombol **Ekspor**. Pada peran bawaan hanya admin yang memegang ketiganya. Layar ini tidak punya tombol **Lihat** dan **Hapus**.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Administrasi**, lalu klik **Karyawan**.
2. Baca daftar. Cara kerja pencarian, urutan dan halaman ada di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).

   - Kotak **Cari** (teks petunjuk "Nomor, nama, email, atau telepon") mencari nomor karyawan, telepon, nama dan email pengguna.
   - Filter **Organisasi** adalah kotak cari: ketik, lalu pilih unit aktif (petunjuk "Semua organisasi"). Tombol silang ("Hapus pilihan: Organisasi") mengembalikannya ke semua unit. Filter **Status** berisi **Semua status**, **Aktif**, **Nonaktif**, **Berhenti**, **Dihapus** dan **Semua, termasuk dihapus**.
   - Kolom: **Nomor karyawan**, **Nama** (nama akun pengguna, dengan email di bawahnya), **Organisasi**, **Kendaraan** (nomor polisi), **Status** dan **Aksi**. **Nomor karyawan** dan **Status** bisa diurutkan; urutan awal menurut karyawan terbaru. Sel kosong berisi `-`.
   - Lencana **Status** berwarna hijau untuk **Aktif**, abu-abu untuk **Nonaktif** dan **Berhenti**.
   - Tombol **Buat Karyawan** dan tombol **Ubah** di tiap baris hanya tampil bagi pemegang `employee.manage`. Baris tidak punya menu **Aksi lainnya**, kecuali baris karyawan yang dihapus: menunya berisi **Pulihkan** (izin `employee.manage`), dan toast "Karyawan dipulihkan." muncul. Karyawan yang dipulihkan kembali dengan statusnya semula.
   - Bila belum ada profil, layar menulis "Belum ada karyawan". Bila filter tidak menemukan apa pun, layar menulis "Tidak ada karyawan yang cocok" dengan tombol **Reset filter**.

   ![Daftar Karyawan pada perusahaan demo: tiga karyawan berstatus Aktif tanpa organisasi dan kendaraan, dengan filter Organisasi dan Status](~/assets/guide/web/employees.webp)

## Menambah profil karyawan

1. Pastikan akun pengguna karyawan sudah ada dan aktif ([bagian 8.5](/docs/guides/web/administration/users/)). Akun yang dibuat bersama profil di form **Buat Pengguna** sudah punya profil, jadi lengkapi **Organisasi** dan **Kendaraan**-nya lewat **Ubah** pada baris karyawan itu.
2. Klik **Buat Karyawan**.
3. Isi form pada dialog **Buat Karyawan**:
   - **Pengguna**: wajib. Ketik nama atau email, lalu pilih akun (petunjuk "Cari nama atau email"). Server mencari setelah Anda mengetik sedikitnya 2 karakter dan menampilkan paling banyak 20 hasil. Daftar hanya memuat pengguna aktif yang belum punya profil karyawan di perusahaan ini, baik akun milik perusahaan ini maupun akun yang diberi akses ke perusahaan ini, sesuai teks bantuan "Hanya pengguna aktif yang belum punya profil karyawan." Bila tidak ada yang cocok, layar menulis "Tidak ada pengguna aktif yang cocok dan belum punya profil." Satu akun hanya bisa punya satu profil. Pilihan berubah hanya saat Anda memilih akun lain atau mengklik tombol silang ("Hapus pilihan: Pengguna").
   - **Nomor karyawan**: terisi otomatis dan terkunci selama Penomoran ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)) tidak mengizinkan input manual. Isian menampilkan perkiraan nomor berikutnya, bentuk awalnya `EMP-0001`, dengan teks "Dibuat otomatis saat disimpan, perkiraan: &lt;nomor&gt;". Bila input manual diizinkan, Anda bisa mengetik nomor (maksimal 50 karakter, unik per perusahaan) atau mengosongkannya agar dibuat otomatis ("Kosongkan untuk dibuat otomatis").
   - **Organisasi**: opsional. Ketik untuk mencari, lalu pilih unit aktif (petunjuk "Cari organisasi"). Daftar ditulis "kode - nama".
   - **Kendaraan**: opsional. Ketik untuk mencari, lalu pilih kendaraan aktif menurut nomor polisi (petunjuk "Cari nomor polisi").
   - **Telepon**: opsional, maksimal 50 karakter. Sistem memakai nomor ini untuk pesan WhatsApp penjadwalan SPK bila WhatsApp perusahaan aktif. Sistem melewati nomor yang bukan seluler Indonesia dengan awalan `08` atau `+62`.
   - **Tanggal masuk**: opsional. Ketik tanggal dalam format tanggal perusahaan, atau klik isian untuk membuka kalender ("Pilih tanggal") lalu pilih hari, atau klik **Hari ini**. Tombol "Hapus tanggal" mengosongkan isian.
   - **Status**: pilih **Aktif**, **Nonaktif** atau **Berhenti**. Isian awalnya **Aktif**.
   - **Catatan**: opsional, teks bebas.
4. Klik **Buat**. Muncul toast "Karyawan dibuat."

   ![Dialog Buat Karyawan dengan isian Pengguna, Nomor karyawan, Organisasi, Kendaraan, Telepon, Tanggal masuk, Status dan Catatan](~/assets/guide/web/employees-create.webp)

## Mengubah profil karyawan

1. Klik **Ubah** pada baris karyawan. Dialog **Ubah Karyawan** terbuka dengan semua data profil yang tersimpan: organisasi, kendaraan, telepon, tanggal masuk, status dan catatan sudah terisi.
2. Ubah isian yang perlu. **Pengguna** tampil sebagai teks yang hanya bisa dibaca, dengan keterangan "Pengguna tidak bisa diganti." **Nomor karyawan** hanya bisa dibaca (keterangan "Dibuat otomatis dan tidak dapat diubah.") selama input manual tidak diizinkan; bila diizinkan, isian wajib terisi dan unik per perusahaan.
3. Klik **Simpan**. Muncul toast "Karyawan diperbarui."

Untuk mencabut akses lapangan seorang karyawan, ubah **Status** menjadi **Nonaktif** atau **Berhenti**. Layar ini tidak punya tombol hapus profil.

## Menyiapkan karyawan untuk pekerjaan lapangan

- Pekerjaan Saya ([bagian 3.6](/docs/guides/web/operations/my-work/)) tampil di sidebar hanya untuk pengguna aktif yang memegang izin kerja (`ticket.start`, `ticket.resolve`, `ticket.close`, `spk.start` atau `spk.submit`) dan punya profil **Aktif** di perusahaan aktif.
- Aplikasi teknisi memakai syarat tersebut, ditambah email pengguna yang sudah diverifikasi. Aplikasi memeriksanya saat masuk dan pada setiap permintaan berikutnya. Teknisi mengerjakan tugasnya di aplikasi itu, bukan di web.
- Pilihan teknisi untuk SPK, di Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)) dan di halaman SPK ([bagian 3.3](/docs/guides/web/operations/work-orders/)), hanya memuat pengguna aktif dengan profil **Aktif** dan izin `spk.start` atau `spk.submit`.
- Pilihan penerima tiket di Penugasan tidak meminta profil. Tiket yang ditugaskan ke pengguna tanpa profil **Aktif** tidak muncul di Pekerjaan Saya.
- Isian **Diperoleh oleh** pada pelanggan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)) hanya menawarkan pengguna aktif dengan profil **Aktif** yang memegang `customer.create`. Admin tanpa profil tidak ditawarkan.
- Evaluasi ([bagian 3.5](/docs/guides/web/operations/evaluations/)) menilai akun pengguna. Nilai evaluasi itu masuk ke rata-rata skor dan rating pelanggan di Kinerja Teknisi ([bagian 7.9](/docs/guides/web/finance-and-reports/technician-performance/)).
- Kinerja Teknisi hanya memuat teknisi dengan profil **Aktif**.

## Mengekspor daftar

1. Atur kotak **Cari**, filter **Organisasi** dan filter **Status** sesuai data yang Anda butuhkan.
2. Klik **Ekspor**, lalu pilih **Ekspor CSV** atau **Ekspor PDF**.

Berkas `employees-export-<tanggal>-<jam>.csv` atau `.pdf` memuat Nomor karyawan, Nama, Email, Organisasi, Kendaraan, Status dan Telepon. Tombol **Ekspor** hanya tampil bagi pemegang `employee.export`.

## Kesalahan umum

- Akun tidak ada di pilihan **Pengguna**: daftar hanya memuat pengguna aktif di perusahaan ini yang belum punya profil, dan baru mencari setelah Anda mengetik 2 karakter. Buat atau aktifkan akunnya di Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)). Akun yang sudah punya profil tidak bisa dipilih lagi.
- Akun baru sudah punya profil karyawan tetapi **Organisasi** dan **Kendaraan** masih kosong: kartu **Profil karyawan** di form **Buat Pengguna** hanya memuat telepon, tanggal masuk, status dan catatan. Buka **Ubah** pada baris karyawan itu untuk mengisi unit dan kendaraan.
- Pengguna muncul di pilihan tetapi ditolak dengan "Pengguna ini sudah punya profil karyawan.": akun itu sudah punya profil di perusahaan lain, atau profil lamanya pernah dihapus dan masih menahan akun itu. Satu akun hanya boleh punya satu profil karyawan, di semua perusahaan. Layar web tidak punya langkah untuk memperbaikinya.
- Pekerjaan Saya atau aplikasi teknisi tidak terbuka untuk karyawan yang sudah punya profil: periksa akun aktif, email terverifikasi, profil **Aktif** (kolom **Status**) dan izin kerja pada perannya.
- Teknisi tidak muncul di pilihan SPK: perannya belum memegang `spk.start` atau `spk.submit`, atau profilnya belum **Aktif**.
- Tanggal masuk ditolak dengan "Format tanggal tidak valid. Contoh: &lt;tanggal&gt;." di bawah isian: tulis tanggal sesuai contoh itu, atau pilih dari kalender.
- Nomor karyawan ditolak dengan "nomor karyawan sudah digunakan." (hanya saat input manual diizinkan): pilih nomor lain atau kosongkan isian pada dialog **Buat Karyawan**.
- Layar ini tidak punya isian jabatan dan tombol **Hapus**. Untuk mencabut akses lapangan, ubah **Status** profil, atau matikan saklar **Aktif** pada akun orangnya di Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)).
