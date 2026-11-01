---
title: "6. Menangguhkan, mengaktifkan, dan menghapus perusahaan"
description: "Di bawah keterangan, dialog menulis dampak penangguhan. Angkanya dihitung saat halaman tenant dimuat:"
---

## 6.1 Menangguhkan tenant


Peran yang dapat memakai: semua operator platform.

1. Buka halaman tenant aktif.
2. Klik **Tangguhkan**.
3. Isi **Alasan**, 5 sampai 200 karakter.
4. Isi **Ketik {kode} untuk melanjutkan** dengan kode induk yang sama persis.
5. Isi **Kata sandi operator** bila dialog memintanya ([bagian 2.5](/docs/guides/platform/sign-in-and-account-security/)).
6. Klik **Tangguhkan perusahaan**.

![Dialog Tangguhkan perusahaan dengan alasan, kode perusahaan, dan kata sandi operator](~/assets/guide/web/platform-company-suspend-dialog.webp)

Di bawah keterangan, dialog menulis dampak penangguhan. Angkanya dihitung saat halaman tenant dimuat:

- "{n} pengguna aktif tidak bisa masuk lagi." menghitung pengguna aktif pada induk dan anak perusahaan;
- "{n} sesi yang sedang berjalan langsung berakhir." hanya tampil pada deployment dengan sesi database, dan menghitung sesi yang masih dalam masa sesi;
- "{n} token aplikasi seluler berhenti berlaku." menghitung token aplikasi pengguna itu yang belum kedaluwarsa;
- "{n} faktur terbuka senilai {jumlah}." menghitung faktur yang sudah terkirim dan belum lunas, termasuk yang dibayar sebagian atau lewat jatuh tempo. Jumlahnya sisa tagihan dalam mata uang perusahaan induk. Bila tidak ada, dialog menulis "Tidak ada faktur terbuka."

Dialog hanya menulis jumlah, bukan daftar nama pengguna.

Penangguhan menonaktifkan perusahaan induk dan anak perusahaan yang saat itu aktif. Anak perusahaan yang sudah nonaktif tetap nonaktif. Data tidak dihapus.

Pengguna yang kehilangan seluruh perusahaan aktif dikeluarkan pada request berikutnya dan melihat "Akun perusahaan Anda sedang ditangguhkan. Hubungi dukungan." Token aplikasi pengguna yang tidak lagi mempunyai perusahaan aktif dicabut. Pengguna dengan keanggotaan di perusahaan aktif lain berpindah ke perusahaan itu.

Inbils mencatat alasan pada audit platform dan audit dukungan setiap perusahaan yang terkena.


## 6.2 Mengaktifkan kembali


1. Buka tenant berstatus **Ditangguhkan** atau **Pengajuan hapus**.
2. Klik **Aktifkan kembali**.
3. Isi **Alasan**, lalu klik **Aktifkan kembali**.

Reaktivasi tidak meminta kata sandi operator atau kode perusahaan. Inbils mengaktifkan induk dan anak perusahaan yang mempunyai waktu penangguhan. Anak perusahaan yang sudah nonaktif sebelum penangguhan tetap nonaktif. Pengajuan hapus yang masih ada dibatalkan.

Toast menulis "Perusahaan diaktifkan kembali."


## 6.3 Mengajukan penghapusan


Tombol **Ajukan hapus** muncul pada tenant nonaktif. Tombol tetap nonaktif sampai semua syarat terpenuhi:

1. tenant sudah ditangguhkan selama 30 hari;
2. ada ekspor berstatus **Siap diunduh** atau **Kedaluwarsa** yang selesai setelah penangguhan terakhir;
3. belum ada pengajuan hapus.

Daftar **Syarat pengajuan hapus** menampilkan semua syarat yang belum terpenuhi beserta waktu UTC saat masa 30 hari selesai.

Setelah syarat terpenuhi:

1. Klik **Ajukan hapus**.
2. Ketik kode perusahaan dengan besar-kecil huruf yang sama.
3. Isi **Kata sandi operator** bila dialog memintanya.
4. Klik **Ajukan hapus**.

Panel hanya mencatat pengajuan. Toast menulis "Pengajuan hapus dicatat. Tidak ada data yang dihapus." Status berubah menjadi **Pengajuan hapus**. Aktifkan kembali tenant untuk membatalkan pengajuan.


## 6.4 Menghapus permanen dari konsol


Peran yang dapat memakai: tim server dengan akses terminal.

Panel web tidak mempunyai tombol hapus permanen. Jalankan:

```bash
php artisan inbils:platform:purge-company {kode}
```

Perintah menolak bila:

- kode bukan kode induk yang sama persis;
- tenant atau satu anak perusahaan masih aktif;
- penangguhan belum 30 hari;
- pengajuan hapus belum dibuat;
- tidak ada ekspor selesai setelah penangguhan;
- pengguna asal tenant masih menjadi anggota perusahaan di luar tenant;
- terminal tidak interaktif.

Perintah menampilkan id perusahaan, jumlah pengguna, jumlah media, dan jumlah baris per tabel. Baca rencana itu, lalu ketik ulang kode perusahaan. Tidak ada opsi melewati pertanyaan.

Database dihapus dalam satu transaksi. Kegagalan database membatalkan seluruh perubahan. Setelah commit, perintah menghapus folder media dan arsip ekspor. Bila berkas tidak dapat dihapus, terminal mencantumkan `disk:path` yang harus dibersihkan manual.

Audit platform tenant tetap tersimpan. Link perusahaan dilepas, lalu kode dan nama tenant disalin ke properti audit. Audit dukungan milik tenant ikut terhapus bersama data tenant. Tidak ada undo. Pemulihan hanya dari backup.

Lihat [`docs/operations/tenant-purge.md`](https://github.com/madmouse17/isp_inbils/blob/main/docs/operations/tenant-purge.md) sebelum menjalankan perintah pada produksi.

### Kesalahan umum

- "Kode perusahaan yang diketik tidak sesuai.": samakan huruf besar dan kecil dengan kode pada profil.
- "Perusahaan ini sudah ditangguhkan." atau "Perusahaan ini sudah aktif.": status berubah setelah halaman dibuka. Muat ulang.
- "Perusahaan belum ditangguhkan.": tangguhkan tenant sebelum menunggu masa hapus.
- "Pengajuan hapus baru boleh setelah 30 hari ditangguhkan": tunggu tanggal UTC yang ditulis pada syarat.
- "Belum ada ekspor data yang selesai setelah penangguhan.": minta ekspor baru setelah waktu penangguhan.
- "Pengajuan hapus sudah dibuat": aktifkan kembali bila pengajuan harus dibatalkan.
