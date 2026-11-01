---
title: "10. Audit platform"
description: "Klik Audit platform. Halaman memuat kegiatan operator pada seluruh tenant dan, bila Anda memilihnya, salinan yang dilihat tenant sebagai akses dukungan."
---

## 10.1 Menyaring dan membaca audit


Peran yang dapat memakai: semua operator platform.

Klik **Audit platform**. Halaman memuat kegiatan operator pada seluruh tenant dan, bila Anda memilihnya, salinan yang dilihat tenant sebagai akses dukungan.

![Halaman Audit platform dengan filter dan daftar kegiatan operator](~/assets/guide/web/platform-audit.webp)

Filter:

- **Cari**: kata dari kalimat kegiatan seperti yang tampil di tabel (misalnya "ditangguhkan"), kode kegiatan, nama atau email operator, atau nama atau kode perusahaan, paling banyak 100 karakter;
- **Perusahaan**: satu tenant, termasuk anak perusahaannya;
- **Operator**: satu admin platform;
- **Kegiatan**: satu kegiatan dari semua yang tercatat. Pilihannya memakai kalimat yang sama seperti di tabel, dengan kode kegiatan di bawahnya;
- **Sumber**: **Platform** (pilihan awal), **Akses dukungan**, atau **Semua sumber**;
- **Rentang tanggal**: tanggal mulai dan akhir dalam UTC.

**Platform** adalah log operator sendiri, satu baris untuk satu tindakan. **Akses dukungan** adalah salinan yang dilihat tenant. Satu tindakan yang juga diberitahukan ke tenant, misalnya penangguhan, tercatat sebagai satu baris **Platform** dan satu salinan **Akses dukungan** untuk tiap perusahaan yang terkena, semuanya dengan kode kelompok yang sama. **Semua sumber** menampilkan keduanya, tetapi menyembunyikan salinan yang mengulang baris **Platform**, sehingga satu tindakan tampil sekali.

Tabel memuat:

| Kolom | Arti |
| --- | --- |
| **Waktu** | Waktu pada zona waktu browser. |
| **Kegiatan** | Kalimat kegiatan, misalnya "Perusahaan ditangguhkan", dan kode kegiatan di bawahnya. |
| **Sumber** | **Platform** atau **Akses dukungan**. |
| **Pelaku** | Nama operator atau pengguna, atau **Sistem**. |
| **Perusahaan** | Nama/kode tenant. Klik nama bila tenant masih ada. |
| **Subjek** | Jenis model dan public id bila tersedia. |
| **Rincian** | Tombol **Lihat**. |

Rentang filter dihitung menurut hari UTC. Waktu di tabel mengikuti jam browser. Halaman menampilkan 10 baris per halaman secara standar.

Filter yang tidak bisa dipakai tidak menolak halaman. Halaman tetap terbuka dengan filter lain yang sah, dan pesan tampil di bawah isian yang bermasalah, misalnya "Tanggal akhir tidak boleh sebelum tanggal mulai." atau "Sumber tidak dikenal. Pilih Platform, Akses dukungan, atau Semua sumber." Kesalahan pada nomor halaman atau jumlah baris tampil sebagai alert kuning di atas tabel, misalnya "Pilih 10, 25, atau 50 baris per halaman." Nomor halaman yang melewati halaman terakhir menampilkan halaman terakhir, bukan tabel kosong.


## 10.2 Membaca rincian kegiatan


Klik **Lihat** pada kolom **Rincian**.

![Dialog rincian Audit platform dengan pelaku, perusahaan, kode kegiatan, kelompok, dan properti](~/assets/guide/web/platform-audit-detail.webp)

Dialog memuat:

- Waktu;
- Sumber;
- Pelaku;
- Perusahaan;
- Subjek;
- Kode kegiatan;
- Kelompok kegiatan;
- Properti tercatat.

**Kelompok kegiatan** adalah UUID yang menghubungkan baris yang termasuk satu tindakan: baris **Platform** dengan salinan **Akses dukungan**-nya, atau seluruh baris satu sesi dukungan. **Subjek** menulis jenis record dan nama atau kodenya bila ada, misalnya `PlatformAdmin` dengan nama operator. Tanpa nama atau kode, dialog menulis jenis dan id. Judul dialog memakai kalimat kegiatan. Properti skalar tampil apa adanya, boolean sebagai Ya/Tidak, dan array sebagai JSON ringkas. Properti id internal bertipe integer disembunyikan dari tampilan. Nilai pribadi yang dimask tetap menulis `[disembunyikan]`.

Setelah purge permanen, audit platform tetap ada. Kolom perusahaan menampilkan nama dan kode yang disimpan pada properti, tetapi tidak lagi menjadi tautan.


## 10.3 Kegiatan yang tercatat


Label utama:

| Kelompok | Contoh label |
| --- | --- |
| Akun operator | **Operator dibuat**, **Operator masuk**, **Operator keluar**, **Sesi operator berakhir**, **Operator gagal masuk**, **Masuk operator diblokir** |
| 2FA operator | **Pendaftaran 2FA dimulai**, **2FA diaktifkan**, **Kode 2FA benar**, **Kode 2FA salah**, **Kode pemulihan dipakai**, **Kode pemulihan dibuat ulang** |
| Peran | **Peran dibuat**, **Peran diubah**, **Peran dihapus** (perbaikan peran perusahaan), **Templat peran dibuat**, **Templat peran diubah**, **Templat peran dihapus** |
| Tenant | **Perusahaan dibuat**, **Anak perusahaan dibuat**, **Anak perusahaan {nama} diminta** (`tenant.subsidiary_requested`), **Permintaan anak perusahaan {nama} dibuat** atau **ditolak** (`tenant.subsidiary_request_closed`, dengan alasan penolakan), **Perusahaan ditangguhkan**, **Perusahaan diaktifkan kembali**, **Permintaan hapus data dicatat** |
| Data contoh | **Data contoh terisi**, **Data contoh gagal diisi** |
| Ekspor | **Ekspor data diminta**, **Ekspor data selesai**, **Ekspor data gagal**, **Ekspor data kedaluwarsa**, **Ekspor data diunduh** |
| Purge | **Penghapusan data dimulai**, **Penghapusan data gagal**, **Penghapusan data selesai** |
| Dukungan pengguna | **2FA pengguna diatur ulang**, **Undangan dikirim ulang**, **Kunci masuk dibuka**, **Undangan gagal terkirim** |
| Akses dukungan | **Akses dukungan dimulai**, **Mode akses dukungan diubah**, **Data diubah saat akses dukungan**, **Akses dukungan berakhir** |

Kolom IP dan user agent disimpan untuk penelusuran server dan tidak tampil sebagai kolom di halaman ini. Baris masuk dan keluar operator mencatat IP di **Properti tercatat**. Kata sandi, token, QR secret, kode pemulihan, isi request, dan stack trace tidak masuk ke properti audit.


## 10.4 Apa yang terlihat oleh perusahaan


Audit internal bersumber **Platform** tidak tampil pada Log Audit tenant. Tindakan yang perlu transparan kepada perusahaan ditulis lagi sebagai sumber **Akses dukungan**, misalnya:

- penangguhan dan reaktivasi;
- pengajuan hapus;
- permintaan, penyelesaian, dan unduhan ekspor;
- buka kunci, reset 2FA, dan kirim ulang undangan;
- seluruh lifecycle sesi akses dukungan.

Tenant melihat pelaku sebagai **Tim dukungan Inbils**, tanpa email atau id internal operator. Log `platform`, `support`, dan `security` disimpan 730 hari. Scheduler menjalankan `inbils:activity-log:prune` setiap hari.

Permintaan anak perusahaan dari tenant dan penutupannya hanya tercatat dengan sumber **Platform**. Tenant melihat permintaannya selama masih terbuka di halaman **Perusahaan**, dan menerima email bila operator menolaknya.

### Kesalahan umum

- Pencarian tidak menemukan baris: cari dengan kata dari kalimat kegiatan (misalnya "ditangguhkan") atau dengan kode kegiatan, misalnya `tenant.export_requested`. Periksa juga **Sumber**. Sumber awalnya **Platform**, jadi baris **Akses dukungan** baru tampil bila Anda memilih **Akses dukungan** atau **Semua sumber**.
- Perusahaan terhapus tetap muncul tanpa tautan: ini perilaku audit yang disengaja.
- Tanggal yang dipilih tampak bergeser: filter memakai hari UTC, sementara tabel memakai jam browser.
- Audit tenant tidak menampilkan login operator biasa: hanya sumber **Akses dukungan** yang terlihat oleh tenant.
- Pesan merah di bawah satu filter: isian itu tidak dipakai, dan halaman menampilkan hasil filter lain. Perbaiki isiannya.
- Alert kuning di atas tabel menulis soal nomor halaman atau jumlah baris: nomor halaman mulai dari 1, dan jumlah baris 10, 25, atau 50.
