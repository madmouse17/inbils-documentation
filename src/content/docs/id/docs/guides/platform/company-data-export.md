---
title: "9. Ekspor data perusahaan"
description: "Toast menulis \"Ekspor data dijadwalkan.\" Job berjalan pada antrean platform, satu job per tenant, satu percobaan, dengan timeout satu jam."
---

## 9.1 Meminta ekspor


Peran yang dapat memakai: semua operator platform.

1. Buka halaman tenant.
2. Gulir ke kartu **Ekspor data**.
3. Klik **Minta ekspor**.
4. Dialog menjelaskan bahwa arsip dibuat di latar belakang, tersedia selama 24 jam, dan hanya satu ekspor boleh berjalan untuk satu perusahaan.
5. Ketik kode induk dan isi **Kata sandi operator** bila dialog memintanya.
6. Klik **Minta ekspor**.

Toast menulis "Ekspor data dijadwalkan." Job berjalan pada antrean `platform`, satu job per tenant, satu percobaan, dengan timeout satu jam.


## 9.2 Memantau dan mengunduh


Klik **Ekspor** pada sidebar atau **Semua ekspor** pada kartu tenant.

![Halaman Ekspor data operator dengan filter status dan daftar ekspor](~/assets/guide/web/platform-exports.webp)

Status:

- **Antrean**: job belum diambil worker;
- **Berjalan**: builder sedang membuat CSV dan berkas;
- **Siap diunduh**: arsip selesai dan tombol **Unduh** tersedia;
- **Gagal**: kolom **Catatan** memuat kelas dan ringkasan galat;
- **Kedaluwarsa**: masa unduh lewat dan arsip sudah dihapus.

Tabel memuat **Perusahaan**, **Status**, **Diminta**, **Ukuran**, **Baris**, **Berlaku sampai**, **Catatan**, dan **Unduh**. **Diminta** menampilkan nama operator dan waktu. Gunakan filter **Status**. Bila halaman dibuka dari satu tenant, lencana filter perusahaan tampil bersama tombol **Tampilkan semua perusahaan**.

Halaman memuat ulang data setiap 5 detik selama baris yang terlihat masih **Antrean** atau **Berjalan**.

Klik **Unduh** pada ekspor **Siap diunduh**. URL bertanda tangan berlaku sampai **Berlaku sampai**, paling lama 24 jam sejak selesai, dan tetap memerlukan sesi operator aktif dengan 2FA. Nama berkas `{kode-lowercase}-tenant-export.zip`. Respons memakai `private, no-store`.

Kartu **Ekspor data** pada halaman tenant juga mempunyai kolom **Unduh**. Kolomnya Dibuat, Status, Diminta oleh, Ukuran, Baris, Selesai, Kedaluwarsa, Catatan, dan Unduh. Tombol **Unduh** tampil selama ekspor **Siap diunduh** dan masa berlakunya belum lewat. Pada ekspor lain kolom itu kosong. Tombol memakai URL bertanda tangan dan aturan yang sama dengan halaman **Ekspor**, dan setiap unduhan tercatat sebagai **Ekspor data diunduh**.


## 9.3 Isi arsip dan data yang dikecualikan


ZIP berisi:

- folder `data/` dengan satu CSV per tabel tenant;
- `companies.csv` untuk induk dan anak perusahaan;
- `media.csv` dan berkas media di `files/{disk}/companies/{id}/...`;
- `roles.csv`, yaitu peran perusahaan tenant, dan `user_roles.csv` (kolom `user_public_id`, `company_code`, `role_name`, `template_key`), yaitu siapa memegang peran mana, termasuk anggota yang berasal dari perusahaan lain. Isi hak akses tiap peran tidak ikut ekspor;
- `manifest.json` dengan waktu pembuatan, perusahaan, jumlah baris, format CSV, jumlah media per disk, dan kolom yang dihilangkan.

CSV memakai UTF-8 BOM, koma sebagai delimiter, tanda kutip ganda, dan string kosong untuk nilai null.

Inbils tidak mengekspor:

- kata sandi dan hash kata sandi;
- secret TOTP, kode pemulihan, dan langkah TOTP terakhir;
- token, kunci API, kata sandi, dan kredensial integrasi lain (kolom `credentials`). Pengaturan integrasi yang bukan rahasia tetap ikut, misalnya host dan nama pengguna mail atau RADIUS;
- secret RADIUS, NAS, PPPoE, dan akun jaringan;
- token dan isi sensitif percobaan pembayaran;
- IP address dan user agent pada audit;
- baris audit internal `platform`.

Baris audit `support` tetap ikut karena perusahaan berhak menerima jejak dukungan. Berkas media tanpa file fisik tetap tercatat di `media.csv`, tetapi file yang hilang tidak dapat dimasukkan. Jalur media yang menunjuk ke luar folder tenant menggagalkan seluruh ekspor.


## 9.4 Masa berlaku dan pembersihan


Perintah `inbils:platform:exports:prune` berjalan setiap jam:

- ekspor **Siap diunduh** yang melewati masa berlaku menjadi **Kedaluwarsa** dan file ZIP dihapus;
- ekspor **Antrean** atau **Berjalan** yang lebih tua dari 2 jam menjadi **Gagal**.

Baris **Kedaluwarsa** tetap ada. Baris itu dapat menjadi bukti ekspor selesai setelah penangguhan untuk syarat pengajuan hapus.

### Kesalahan umum

- "Ekspor perusahaan ini masih diproses.": tunggu ekspor aktif selesai atau menjadi gagal. Hanya satu build berjalan per tenant.
- Status lama di **Antrean**: worker `platform` tidak berjalan. Periksa [bagian 11.2](/docs/guides/platform/console-tasks-and-queues/).
- Status **Gagal**: baca **Catatan**, **Audit platform**, dan `failed_jobs`. Setelah penyebab diperbaiki, minta ekspor baru.
- Tombol **Unduh** hilang di halaman **Ekspor** atau di kartu **Ekspor data** pada halaman tenant: ekspor belum siap atau sudah kedaluwarsa. Muat ulang halaman bila ekspor baru saja selesai.
- Unduhan menjawab 403: URL kedaluwarsa atau tanda tangannya tidak valid. Unduhan menjawab 404: ekspor belum siap atau file fisiknya hilang. Minta ekspor baru.
