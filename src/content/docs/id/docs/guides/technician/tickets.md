---
title: "4. Tiket"
description: "Tiket adalah laporan gangguan atau permintaan layanan dari pelanggan. Tiket yang ditugaskan kepada Anda tampil di tab Pekerjaan dengan label Tiket."
---

Tiket adalah laporan gangguan atau permintaan layanan dari pelanggan. Tiket yang ditugaskan kepada Anda tampil di tab **Pekerjaan** dengan label **Tiket**.


## Detail tiket dan Mulai


Ketuk baris tiket di tab **Pekerjaan**.

![Detail tiket](~/assets/guide/technician/detail-tiket.webp)

Detail tiket dibuka dengan kartu judul yang memuat kode, judul, status, **Prioritas** (misalnya "Prioritas mendesak"), **Kategori**, dan batas waktu: "Respons sebelum 21:17 · sisa 41 mnt" selama tiket menunggu respons pertama (merah bila lewat), serta "Batas {tanggal}" untuk batas penyelesaian. Di bawahnya, dalam urutan ini:

1. **Pelanggan**: nama, nomor telepon dengan tombol **Telepon** dan **WhatsApp** (WhatsApp hanya ada bila nomornya nomor seluler Indonesia), lalu alamat tempat Anda harus datang dengan tombol **Buka di Maps**. Untuk pelanggan, itu **Alamat pemasangan**; tiket tanpa pelanggan memakai **Lokasi** tiket. Bila alamat belum diisi, aplikasi menulis "Alamat pelanggan belum diisi. Hubungi kantor."
2. **POP**: POP atau gudang yang tercatat di tiket, dengan tombol **Buka di Maps** sendiri. Kartu ini hanya tampil bila alamat di atas adalah alamat pemasangan, supaya tidak tertukar.
3. **Deskripsi**, **Lampiran**, dan **Komentar**. Setelah tiket diselesaikan, **Catatan penyelesaian** juga tampil.

Untuk memulai:

1. Buka tiket berstatus **Ditugaskan**.
2. Ketuk **Mulai**.
3. Aplikasi bertanya "Mulai tiket ini?" dan menjelaskan bahwa status berubah menjadi **Dikerjakan** dan kantor bisa melihatnya. Ketuk **Mulai**.
4. Setelah tiket dimulai, aplikasi menulis hasil check-in di bagian bawah layar: "Check-in tercatat, 120 m dari lokasi" (jarak dihitung dari posisi Anda), atau "Mulai tercatat tanpa lokasi" bila posisi tidak tersedia.

Seperti pada SPK, aplikasi mencatat posisi Anda bila izin lokasi diberikan. Tanpa izin, tiket tetap dimulai. Bila Anda lebih jauh dari lokasi pelanggan daripada batas kantor, aplikasi menanyakan **Alasan** lebih dulu (lihat "Jauh dari lokasi pelanggan" di [bab 3](/docs/guides/technician/work-orders/)). Tanpa internet, **Mulai** disimpan dan dikirim saat sinyal kembali.


## Komentar dan komentar internal


Di bagian bawah daftar **Komentar** ada kotak komentar.

1. Ketik di kolom **Tulis komentar** (maksimal 2000 karakter).
2. Untuk catatan yang hanya boleh dibaca staf, nyalakan **Catatan internal**. Teksnya: "Hanya staf yang melihatnya, pelanggan tidak." Biarkan mati untuk komentar yang boleh dibaca pelanggan.
3. Ketuk **Kirim komentar**.

Komentar Anda diberi label **Anda**, komentar staf diberi label **Staf**, dan komentar internal diberi label **Internal**. Tombol kirim nonaktif saat kolom kosong dan saat teks lebih dari 2000 karakter. Tanpa internet, komentar tidak hilang: komentar itu muncul di atas kolom dengan tanda **Menunggu kirim** dan terkirim sendiri saat sinyal kembali, sementara kolom sudah bebas untuk komentar berikutnya.

### Balasan cepat

Pada tiket yang masih dikerjakan, selama kolom komentar kosong dan **Catatan internal** mati, bagian **Balasan cepat** tampil di atas kolom. Satu ketukan langsung mengirim komentar yang bisa dibaca pelanggan, tanpa konfirmasi:

- "Laporan diterima. Saya menuju lokasi."
- "Laporan diterima. Saya periksa dari jaringan dulu."
- "Mohon nyalakan ulang modem, lalu kabari hasilnya di sini."

Balasan cepat dihitung sebagai respons pertama, sama seperti komentar yang Anda ketik. Tombolnya nonaktif selama komentar sedang disimpan. Mulai mengetik, atau menyalakan **Catatan internal**, menyembunyikannya.


## Lampiran


Lampirkan foto yang membantu kantor, misalnya foto modem atau lampu indikator.

![Tiket dengan lampiran foto](~/assets/guide/technician/detail-tiket-lampiran.webp)

1. Di bagian **Lampiran**, ketuk **Tambah lampiran**.
2. Pilih **Kamera** atau **Galeri**, lalu ambil atau pilih foto.
3. Di jendela **Keterangan foto**, ketik keterangan (opsional, maksimal 255 karakter), lalu ketuk **Simpan**.
4. Aplikasi mengunggah dan menulis "Lampiran ditambahkan."

Foto lampiran diproses sama seperti foto bukti SPK: JPEG, sisi terpanjang paling besar 1920 piksel, tanpa EXIF. Server menerima berkas JPG, PNG, dan PDF sampai 10 MB; aplikasi hanya mengirim foto.

Lampiran tiket **tidak** memakai antrean unggah. Tombol **Tambah lampiran** nonaktif tanpa internet. Bila unggahan gagal di tengah jalan, foto tetap di bawah daftar dengan pilihan **Kirim ulang** dan **Buang**.

Lampiran PDF dari kantor atau pelanggan tampil dengan namanya ("Buka PDF {nama}"). Ketuk untuk mengunduhnya: aplikasi menulis "Membuka PDF", lalu membuka lembar bagikan Android tempat Anda memilih aplikasi pembaca PDF. Bila gagal, aplikasi menulis "PDF tidak bisa dibuka. Coba lagi."

Untuk menghapus lampiran: ketuk **Hapus** di barisnya, lalu konfirmasi "Hapus lampiran ini?". Tombol **Hapus** hanya ada pada lampiran yang Anda unggah, selama tiket belum selesai. Lampiran bisa ditambah sampai tiket ditutup.


## Selesaikan tiket


![Lembar Selesaikan tiket](~/assets/guide/technician/selesaikan-tiket.webp)

1. Buka tiket berstatus **Dikerjakan**.
2. Ketuk **Selesaikan**.
3. Di lembar **Selesaikan tiket**, isi **Catatan penyelesaian**: apa yang Anda temukan dan lakukan. Catatan wajib diisi, maksimal 1000 karakter.
4. Ketuk **Selesaikan tiket**.

Setelah berhasil, tombol aksi hilang dari layar tiket dan **Catatan penyelesaian** tampil di detail. Bila pengiriman gagal, catatan yang sudah Anda ketik tetap tersimpan di lembar itu selama Anda tidak meninggalkan layar tiket. Tanpa internet, **Selesaikan tiket** disimpan dengan tanda **Menunggu kirim** dan terkirim saat sinyal kembali; tiket langsung tampil sebagai **Diselesaikan**.

### Kesalahan umum pada tiket

- **"Isi catatan penyelesaian."** Catatan kosong. Tombol **Selesaikan tiket** nonaktif sampai catatan terisi.
- **"Maksimal 1000 karakter."** atau **"Maksimal 2000 karakter."** Persingkat teksnya.
- **"Data tidak ditemukan atau sudah dihapus."** Tiket dialihkan ke orang lain atau dihapus. Aplikasi menutup layar tiket.
- **"Butuh koneksi internet."** Lampiran dan hapus lampiran butuh internet. Mulai, Selesaikan, dan komentar tidak: ketiganya menunggu kirim. Layar tetap bisa dibaca dari salinan terakhir.
