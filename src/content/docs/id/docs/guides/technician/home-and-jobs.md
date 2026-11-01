---
title: "2. Beranda dan Pekerjaan"
description: "Lima tab di bagian bawah layar: Beranda menunjukkan pekerjaan hari ini, Pekerjaan memuat daftar lengkap SPK dan tiket yang ditugaskan kepada Anda."
---

Lima tab di bagian bawah layar: **Beranda** menunjukkan pekerjaan hari ini, **Pekerjaan** memuat daftar lengkap SPK dan tiket yang ditugaskan kepada Anda.


## Beranda


![Tab Beranda](~/assets/guide/technician/redesign/beranda-teal-light.webp)

Beranda adalah tab pertama dan layar yang terbuka setelah masuk. Isinya dari atas ke bawah:

1. **Kepala ISP**: logo perusahaan (atau bulatan biru Inbils bila belum ada logo atau logonya gagal dimuat), nama perusahaan, dan tanggal hari ini. Di bawahnya sapaan "Halo, nama depan Anda". Warna aplikasi mengikuti warna merek ISP, jadi tampilannya bisa berbeda antar ISP.
2. **Kartu tiket mendesak**: tiket Anda yang paling dekat batas respons pertamanya, di atas kartu kunjungan. Teksnya "Tiket mendesak · respons sebelum 21:17 (sisa 41 menit)", dengan kode dan judul tiket di bawahnya. Ikonnya berubah kuning saat sisa 30 menit atau kurang dan merah setelah batas lewat ("lewat 12 menit"). Ketuk kartu untuk membuka tiketnya. Hitungannya bergerak tiap 30 detik. Kartu tidak tampil bila tidak ada tiket yang menunggu respons pertama. Respons pertama berarti Anda menekan **Mulai** pada tiket atau mengirim komentar yang bisa dibaca pelanggan.
3. **Kartu kunjungan**: SPK yang perlu Anda datangi sekarang. Aplikasi memilih SPK yang sedang **Dikerjakan** (judulnya **Sedang dikerjakan**), atau bila tidak ada, SPK **Ditugaskan** dengan jadwal paling awal (judulnya **Kunjungan berikutnya**). SPK tanpa jadwal ada di urutan terakhir. Tiket bukan kunjungan dan tidak muncul di kartu ini. Kartu memuat:
   - jadwal: **Hari ini**, **Besok**, atau tanggalnya. Jadwal yang sudah lewat tertulis "Terlambat, jadwal {tanggal}" dan kartu berubah menjadi warna peringatan;
   - judul dan kode SPK, nama pelanggan, dan alamat pemasangan;
   - jarak ("850 m dari lokasi Anda" atau "3,4 km dari lokasi Anda"), hanya bila SPK punya koordinat dan ponsel sudah mengizinkan lokasi. Beranda tidak meminta izin lokasi; izin diminta saat Anda memulai SPK;
   - tombol **Navigasi**, yang membuka aplikasi peta ponsel ke lokasi pelanggan bila lokasi SPK diketahui, dan tombol **Buka SPK** yang membuka detail SPK ([bab 3](/docs/guides/technician/work-orders/)).
4. Bila tidak ada SPK yang menunggu, kartu kunjungan diganti kartu "Tidak ada kunjungan SPK yang menunggu. Penugasan baru muncul di sini."
5. **Pekerjaan saya**: empat petak angka, **Ditugaskan**, **Dikerjakan**, **Menunggu tindakan**, dan **Total**. Ketuk satu petak untuk membuka tab **Pekerjaan** dengan filter status itu. Petak **Total** membuka daftar tanpa filter.

Tarik layar ke bawah untuk memperbarui. Tarikan yang sama mencoba mengirim foto bukti yang menunggu di antrean (lihat [bab 3](/docs/guides/technician/work-orders/)). Aplikasi juga memperbarui diri tanpa tarikan: saat Anda membuka kembali aplikasi dari latar belakang dan saat Anda berpindah tab (langsung), serta saat ada notifikasi baru masuk (sekitar 1 detik setelah notifikasi terakhir dalam satu rentetan). Selama data dimuat ulang, garis tipis berjalan di atas daftar dan isi lama tetap terbaca. Bila satu bagian gagal dimuat, bagian itu menampilkan pesan kesalahan dan tombol **Coba lagi**; bagian lain tetap tampil. Banner offline dan banner foto belum terkirim (lihat "Kesalahan umum" di bawah) juga tampil di Beranda.

Aplikasi memilih kunjungan dari 10 SPK terbaru yang dikirim server. Teknisi dengan lebih dari 10 SPK terbuka bisa melihat kunjungan yang lebih lambat dari yang paling awal. Kartu tiket mendesak memilih dari halaman pertama daftar tiket Anda. Buka tab **Pekerjaan** untuk daftar lengkap.


## Daftar pekerjaan


![Tab Pekerjaan](~/assets/guide/technician/redesign/pekerjaan-teal-light.webp)

Tab **Pekerjaan** memuat SPK dan tiket yang ditugaskan kepada Anda. Layar menampilkan, dari atas ke bawah:

- Pilihan jenis: **Semua**, **SPK**, atau **Tiket**.
- Filter status: **Ditugaskan**, **Dikerjakan**, dan **Menunggu tindakan**. Ketuk satu untuk menyaring, ketuk lagi untuk melepas. Petak di Beranda memilih salah satunya.
- Kartu pekerjaan. Tiap kartu memuat ikon jenis, jenis dan kode, judul, nama pelanggan, status, dan tanggal: **Jadwal** untuk SPK, **Batas** untuk tiket. Untuk SPK, jenisnya memakai nama jenis SPK dari kantor, misalnya `Instalasi · SPK-0021`, bukan kata "SPK" saja. Tiket berprioritas **Mendesak** (merah) atau **Tinggi** (kuning) diberi label prioritas, dan tiket yang menunggu respons pertama menulis "Respons sebelum 21:17 · sisa 41 mnt" (atau "lewat 12 mnt" setelah batas). Tiket yang lewat batas waktu layanan diberi label **SLA terlewat**.

Cara memakai:

1. Pilih **Semua**, **SPK**, atau **Tiket**.
2. Bila perlu, ketuk filter **Ditugaskan**, **Dikerjakan**, atau **Menunggu tindakan**.
3. Ketuk baris untuk membuka detail SPK atau detail tiket.
4. Geser daftar ke bawah sampai habis. Aplikasi memuat halaman berikutnya sendiri.

Tarik layar ke bawah (pull-to-refresh) untuk memperbarui daftar. Tarikan yang sama juga mencoba mengirim foto bukti yang menunggu di antrean (lihat [bab 3](/docs/guides/technician/work-orders/)). Daftar juga memuat ulang sendiri saat aplikasi dibuka kembali dan saat Anda berpindah tab (langsung), dan sekitar 1 detik setelah notifikasi terakhir dalam satu rentetan.

Bila tidak ada pekerjaan, layar menulis "Tidak ada pekerjaan untuk filter ini."


## Kesalahan umum


- **Banner "Data offline · diperbarui HH:mm".** Ponsel tidak punya internet, dan aplikasi menampilkan salinan terakhir. Pekerjaan baru dan perubahan dari kantor tidak muncul sampai internet kembali. Tarik layar ke bawah setelah sinyal pulih.
- **Banner "Anda sedang luring. Aksi disimpan dan dikirim otomatis saat online."** Tampil di layar SPK, tiket, dan pengembalian material setelah sebuah permintaan gagal karena tidak ada sinyal. Aksi yang Anda ketuk tetap tersimpan dan terkirim sendiri saat sinyal kembali (lihat "Tanpa sinyal: aksi menunggu kirim" di [bab 3](/docs/guides/technician/work-orders/)). Ketuk **Coba lagi** di banner untuk memeriksa sinyal dan mengirim saat itu juga.
- **Banner "N foto belum terkirim".** Ada foto bukti di antrean unggah. Ketuk untuk membukanya.
- **Pemberitahuan merah "N aksi gagal dikirim".** Ada aksi tersimpan yang ditolak server atau belum pasti terkirim. Ketuk **Lihat aksi** untuk mencoba lagi atau membuangnya.
- **Pekerjaan tidak muncul.** Hanya pekerjaan berstatus Ditugaskan dan Dikerjakan yang ditugaskan kepada Anda yang tampil. Bila yakin ada yang kurang, minta kantor memeriksa penugasan.
