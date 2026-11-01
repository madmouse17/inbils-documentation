---
title: "3.6 Pekerjaan Saya"
description: "Pekerjaan Saya memuat tiket dan SPK yang ditugaskan kepada akun Anda sendiri, lengkap dengan tombol untuk mengerjakannya."
---

Pekerjaan Saya memuat tiket dan SPK yang ditugaskan kepada akun Anda sendiri, lengkap dengan tombol untuk mengerjakannya. Teknisi mengerjakan tugas yang sama di aplikasi teknisi, jadi halaman ini untuk pengguna web (admin, manajer, staf) yang menerima penugasan.

Peran yang dapat memakai: pengguna yang memenuhi dua syarat. Pertama, akun aktif dan memegang minimal satu izin kerja: `ticket.start`, `ticket.resolve`, `ticket.close`, `spk.start`, atau `spk.submit`. Kedua, akun tertaut ke profil karyawan berstatus `active` di perusahaan yang sedang aktif ([bagian 8.3](/docs/guides/web/administration/employees/)). Peran bawaan yang bisa memenuhinya: admin (semua izin), staf (`spk.start`, `spk.submit`), dan manajer (`ticket.close`). Izin tiket menampilkan tiket, izin SPK menampilkan SPK.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Operasional**, lalu klik **Pekerjaan Saya**. Angka di samping menu adalah jumlah tugas Anda.
2. Bila syaratnya belum terpenuhi, menu tidak tampil. Membuka alamatnya langsung menampilkan halaman **Akses ditolak**, dengan keterangan "Anda tidak punya izin untuk membuka halaman ini. Hubungi administrator jika Anda memerlukan aksesnya." dan "Kode galat 403". Server menolak dengan alasan "Anda tidak memiliki izin operasional untuk domain apa pun.", tetapi layar tidak menampilkan kalimat itu. Minta admin membuat profil karyawan aktif untuk akun Anda di menu Karyawan ([bagian 8.3](/docs/guides/web/administration/employees/)). Akun admin demo tidak punya profil karyawan, jadi halaman ini menolaknya.

   ![Halaman Akses ditolak dengan kode galat 403 dan tombol Ke dasbor, untuk akun yang belum memenuhi syarat](~/assets/guide/web/my-work.webp)

3. Baca deretan tombol hitungan di atas daftar. Klik sebuah tombol untuk memfilter daftar, dan klik **Semua tugas** untuk menampilkan semuanya lagi.
   - **Semua tugas** menghitung semua tiket dan SPK yang ditugaskan kepada Anda dalam status yang terkait dengan izin Anda.
   - **Belum dimulai** menghitung tugas berstatus **Ditugaskan**.
   - **Sedang dikerjakan** menghitung tiket **Dikerjakan** dan SPK **Dikerjakan**.
   - **Menunggu tindakan** menghitung tiket **Diselesaikan** dan SPK **Dikerjakan**. SPK yang sedang dikerjakan dihitung di dua tombol terakhir, jadi jumlah ketiga tombol terakhir bisa melebihi **Semua tugas**. Hitungan tidak berubah saat Anda memakai filter lain.
4. Persempit daftar dengan filter. Filter jalan sendiri sesaat setelah Anda mengetik atau memilih:
   - Kotak **Pencarian** mencari kode, judul, serta nama dan kode pelanggan (isian bertuliskan "Cari kode, judul, atau nama pelanggan...").
   - Pilihan **Jenis** (**Semua jenis**, **Tiket**, **SPK**) tampil bila Anda memegang izin tiket dan izin SPK.
   - Pilihan **Status** berisi **Semua status**, **Belum dimulai**, **Sedang dikerjakan**, dan **Menunggu tindakan**. **Menunggu tindakan** menampilkan tiket **Diselesaikan** dan SPK **Dikerjakan**.
   - Pilihan **Prioritas** (**Semua prioritas**, **Rendah**, **Sedang**, **Tinggi**, **Mendesak**) dan isian **Periode** (isian bertuliskan "Semua tanggal", dengan kalender dan pilihan cepat) bekerja seperti di Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)). Tombol **Cari** menjalankan pencarian yang sama. Tombol **Reset filter** muncul bila ada filter aktif dan mengosongkan semuanya.
5. Baca kolom tabel: **Kode** (tautan ke detail dan lencana **Tiket** atau **SPK**), **Judul dan pelanggan** (tiket yang lewat SLA diberi tulisan merah "SLA terlampaui"), **Prioritas dan umur** (lencana prioritas dan sudah berapa lama tugas ada), **Status** (lencana status dan satu baris "Berikutnya:" yang menyebut status berikutnya), **Batas atau jadwal** ("SLA:" dengan tenggat untuk tiket, "Jadwal:" dengan tanggal untuk SPK), dan **Tindakan**. Judul kolom **Kode**, **Judul dan pelanggan**, **Prioritas dan umur**, dan **Status** bisa diurutkan. Tautan **Kode** hanya aktif pada baris yang boleh Anda buka.
6. Bila akun Anda juga memegang izin penugasan, dua tab muncul di atas hitungan: **Pekerjaan Saya** dan **Antrean Penugasan**. Tab **Antrean Penugasan** membuka halaman Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)).

Daftar yang kosong menulis **Belum ada tugas untuk Anda**. Bila filter tidak menemukan apa pun, daftar menulis **Tidak ada tugas yang cocok** dengan tombol **Reset filter**.

Tombol di kolom **Tindakan** mengikuti status tugas:

| Status | Jenis | Tombol | Syarat |
|---|---|---|---|
| **Ditugaskan** | Tiket dan SPK | **Mulai** | `ticket.start` atau `spk.start` |
| **Dikerjakan** | Tiket | **Selesaikan** | `ticket.resolve` |
| **Dikerjakan** | SPK | **Ajukan review** | `spk.submit` |
| **Diselesaikan** | Tiket | Tidak ada tombol | Tiket ini sudah Anda selesaikan sendiri, jadi Anda tidak boleh menutupnya |

## Memulai pekerjaan

1. Pada tugas berstatus **Ditugaskan**, klik **Mulai**.
2. Dialog meminta konfirmasi dengan judul "Mulai pengerjaan Tiket" atau "Mulai pengerjaan SPK" diikuti kode tugas dan tanda tanya. Isinya "Status akan menjadi Dikerjakan. Waktu mulai pengerjaan tercatat di jejak audit." Klik **Mulai kerja**. Klik **Batal** untuk menutup tanpa memulai.
3. Status berubah menjadi **Dikerjakan** dan waktu mulai tercatat di audit. Toast "Tiket mulai dikerjakan." atau "SPK mulai dikerjakan." muncul. Pada tiket, langkah ini juga mencatat waktu respons pertama bila belum ada. Angka itu disalin ke Evaluasi ([bagian 3.5](/docs/guides/web/operations/evaluations/)).

## Menyelesaikan tiket

1. Pada tiket berstatus **Dikerjakan**, klik **Selesaikan**.
2. Di dialog "Selesaikan tiket" diikuti kode tiket, isi **Catatan penyelesaian**. Isian ini wajib dan maksimal 1000 karakter. Dialog juga menampilkan judul tiket dan nama pelanggan. Catatan tersimpan di riwayat audit tiket dan dibaca saat penutupan.
3. Klik **Selesaikan tiket**. Status menjadi **Diselesaikan** dan toast "Tiket diselesaikan." muncul. Sistem mengantrekan pesan WhatsApp ke pelanggan tiket. Klik **Batal** untuk menutup dialog tanpa menyimpan.

## Mengajukan SPK untuk review

Syarat: SPK sudah punya minimal satu bukti (evidence), dan sisa material dari permintaan barang yang sudah diserahkan sudah dideklarasikan teknisi ([bagian 6.1](/docs/guides/web/inventory/item-requests/) dan [6.8](/docs/guides/web/inventory/material-returns/)).

1. Pada SPK berstatus **Dikerjakan**, klik **Ajukan review**.
2. Dialog berjudul "Ajukan SPK" diikuti kode SPK dan "untuk review?". Baca keterangannya bahwa pekerjaan lapangan dan deklarasi material masuk ke antrean persetujuan dan item pekerjaan tidak bisa diubah sampai review selesai, lalu klik **Ajukan review**.
3. SPK berstatus **Menunggu review** dan toast "SPK diajukan untuk review." muncul. SPK keluar dari daftar ini dan masuk ke antrean **Persetujuan** pengguna lain ([bagian 3.2](/docs/guides/web/operations/approvals/)). Anda sendiri tidak melihatnya di sana karena Anda teknisi yang ditugaskan.

## Kesalahan umum

- Alert **Item sudah berubah** di dialog, dengan tombol **Muat ulang pekerjaan**: status tugas diubah di tempat lain, misalnya teknisi memulainya di aplikasi. Klik **Muat ulang pekerjaan**. Dialog memuat data terbaru, atau menutup bila tombolnya sudah tidak berlaku. Pemuatan yang gagal menulis "Gagal memuat ulang pekerjaan." dengan penyebabnya.
- Pesan "Catatan resolusi/penanganan wajib diisi." di dialog **Selesaikan tiket**: isi **Catatan penyelesaian** dengan teks selain spasi. Catatan lebih dari 1000 karakter ditolak dengan "catatan penyelesaian tidak boleh lebih dari 1000 karakter." di alert **Gagal menyimpan**.
- Server menolak pengajuan SPK dengan "Bukti pekerjaan wajib diunggah sebelum SPK diajukan." bila SPK belum punya bukti. Unggah bukti di halaman detail SPK ([bagian 3.3](/docs/guides/web/operations/work-orders/)), lalu ajukan lagi.
- Server menolak pengajuan SPK dengan "Seluruh sisa material dari permintaan barang harus dideklarasikan terlebih dahulu sebelum SPK diajukan." bila deklarasi sisa material belum lengkap. Lengkapi deklarasinya ([bagian 6.1](/docs/guides/web/inventory/item-requests/) dan [6.8](/docs/guides/web/inventory/material-returns/)), lalu ajukan lagi.
- Tombol **Tutup** tidak pernah muncul di halaman ini: daftar hanya memuat tiket yang ditugaskan kepada Anda, dan penanggung jawab tiket tidak boleh menutup tiket yang ia selesaikan. Pengguna lain pemegang `ticket.close` menutupnya dari halaman detail tiket ([bagian 3.4](/docs/guides/web/operations/tickets/)).
- Tugas yang baru ditugaskan tidak tampil: daftar hanya memuat tugas yang ditugaskan ke akun Anda, dan hanya pada status yang cocok dengan izin Anda. Contohnya, tiket **Ditugaskan** baru tampil bila Anda memegang `ticket.start`.
