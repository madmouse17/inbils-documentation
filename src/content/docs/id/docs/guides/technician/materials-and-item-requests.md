---
title: "5. Material dan permintaan barang"
description: "Tab Material punya dua bagian: material yang Perlu dideklarasi dan Permintaan barang saya."
---

Tab **Material** punya dua bagian: material yang **Perlu dideklarasi** dan **Permintaan barang saya**.

![Tab Material](~/assets/guide/technician/material.webp)


## Deklarasi material (pengembalian)


Setelah gudang menyerahkan barang untuk SPK Anda, Anda wajib melaporkan berapa yang terpakai dan berapa yang kembali dalam kondisi baik. Sisanya, yang tidak terpakai dan tidak kembali, dihitung aplikasi sebagai selisih (rusak atau hilang). Pengembalian yang menunggu laporan Anda muncul di bagian **Perlu dideklarasi**, berlabel **Perlu dideklarasi** atau **Perlu koreksi**. Selama ada yang belum dideklarasi, SPK tidak bisa dikirim untuk ditinjau.

![Layar Deklarasi material](~/assets/guide/technician/deklarasi-material.webp)

1. Di tab **Material**, ketuk baris di **Perlu dideklarasi**. Atau ketuk notifikasi pengembalian, atau tombol **Deklarasi** di SPK.
2. Untuk tiap barang, aplikasi menulis **Diserahkan** (jumlah dari gudang), misalnya "Diserahkan 10 m". Bila SPK sudah mencatat pemakaian barang itu, **Terpakai** terisi dengan angka dari catatan SPK (paling banyak sebesar yang diserahkan), **Kembali baik** terisi sisanya, dan di bawah **Terpakai** tertulis "Dari catatan SPK" sampai Anda mengetik angka lain. Bila SPK tidak mencatat apa-apa dan Anda belum pernah melapor, **Terpakai** sama dengan **Diserahkan** dan **Kembali baik** 0. Ubah angkanya sesuai yang terjadi:
   - **Terpakai**: jumlah yang Anda pakai.
   - **Kembali baik**: jumlah sisa yang masih bagus.
   - **Selisih**: tidak diketik. Aplikasi menghitungnya (Diserahkan dikurangi Terpakai dikurangi Kembali baik) dan menulis misalnya "Selisih 2 m". Selisih nol berarti angkanya pas.
3. Bila **Selisih** lebih dari 0, wajib pilih **Penyebab selisih** (**Rusak**, **Hilang**, atau **Lainnya**) dan isi **Alasan selisih**. Kolom itu hanya tampil saat ada selisih.
4. Ketuk **Semua terpakai** bila semua barang terpakai: tombol itu mengisi **Terpakai** sama dengan **Diserahkan** dan **Kembali baik** 0 untuk setiap barang.
5. Bila perlu, isi **Alasan keseluruhan (opsional)**, maksimal 1000 karakter.
6. Ketuk **Kirim deklarasi**.

Angka harus 0 atau lebih; koma atau titik sama saja. Bila kantor meminta koreksi, **Alasan koreksi** tampil di atas formulir; perbaiki angka lalu kirim lagi. Deklarasi yang sudah dikirim dan tidak butuh koreksi hanya bisa dibaca: "Deklarasi ini tidak dapat diubah sekarang."

Kesalahan umum:

- **"Isi angka 0 atau lebih."** Ada kolom kosong atau berisi teks.
- **"Terpakai dan kembali melebihi yang diserahkan"** tampil di bawah Selisih: jumlah Terpakai ditambah Kembali baik lebih besar dari Diserahkan. Kurangi salah satunya, karena deklarasi tidak bisa dikirim selama angkanya melebihi.
- **"Pilih penyebab selisih."** atau **"Isi alasan selisih."** Selisih lebih dari 0 butuh penyebab dan alasan.
- **"Deklarasi sudah dikirim dengan nilai berbeda. Muat ulang."** Deklarasi sudah terkirim dari perangkat lain atau sebelumnya. Aplikasi memuat ulang datanya.
- Tanpa internet, **Kirim deklarasi** menyimpan deklarasi dan menulis "Deklarasi disimpan. Dikirim otomatis saat online."


## Permintaan barang baru


Gunakan ini bila Anda butuh barang dari gudang untuk pekerjaan.

![Layar Permintaan barang dengan Gudang asal, SPK, Alasan, dan Barang yang diminta](~/assets/guide/technician/permintaan-baru.webp)

Ada dua jalan masuk:

- Dari detail SPK: di bagian **Material**, ketuk **Minta material**. Tombol ini tampil saat SPK **Ditugaskan** atau **Dikerjakan**, dan formulir terbuka dengan SPK itu sudah terpilih.
- Dari tab **Material**: ketuk **Permintaan baru** (tombol melayang di kanan bawah).

Lalu isi formulir:

1. Pilih **Gudang asal**. Bila hanya ada satu gudang, gudang itu otomatis terpilih. Bila ada beberapa, yang terpilih adalah gudang yang Anda pakai pada permintaan terakhir selama masih punya stok, atau bila tidak, gudang dengan barang tersedia terbanyak. Tiap gudang di daftar memuat "{n} barang tersedia", atau "Stok kosong" dengan ikon peringatan bila tidak ada yang tersedia. Mengganti gudang memuat ulang ketersediaan setiap barang. Bila daftar kosong, aplikasi menulis "Belum ada gudang yang bisa dipilih. Hubungi kantor."
2. Cek kolom **SPK**. Pilihannya **Tanpa SPK** dan SPK Anda yang **Ditugaskan** atau **Dikerjakan**, masing-masing tertulis "kode · judul". Kolom ini terisi sendiri. Bila Anda datang dari **Minta material**, SPK itu yang terpilih. Bila Anda datang dari tab **Material**, yang terpilih adalah SPK yang sedang dikerjakan, atau bila tidak ada, SPK **Ditugaskan** dengan jadwal terdekat. Ganti pilihannya, atau pilih **Tanpa SPK** bila barang itu bukan untuk SPK.
3. Isi **Alasan (opsional)**, maksimal 2000 karakter. Bila dikosongkan dan SPK terpilih, alasannya tertulis "Permintaan material untuk SPK" disusul nomor SPK.
4. Ketuk **Tambah barang**. Layar **Pilih material** mengelompokkan barang menurut kategorinya (urut abjad, **Tanpa kategori** terakhir). Tiap barang menampilkan **Stok {jumlah} {satuan}** untuk gudang yang dipilih, atau **Stok kosong** dengan ikon peringatan bila jumlahnya 0. Cari dan ketuk barang, lalu isi **Jumlah diminta**. Jumlah di atas stok menampilkan peringatan **Melebihi stok tersedia ({jumlah} {satuan})**, tetapi tidak memblokir permintaan karena gudang masih dapat menerima stok. Ketuk **Tambah** dan ulangi untuk barang lain.
5. Untuk membuang baris barang, ketuk ikon tempat sampah di sebelahnya.
6. Ketuk **Kirim permintaan**.

Aplikasi menulis "Permintaan REQ-xxxx diajukan." Permintaan langsung masuk antrean gudang, tanpa tahap draf. Tanpa internet, aplikasi menyimpan permintaan, menutup formulir, dan menulis "Permintaan disimpan. Dikirim otomatis saat online."; permintaan baru muncul di **Permintaan barang saya** setelah terkirim.

Permintaan yang memuat SPK menjadi material SPK itu. Barang yang gudang serahkan untuk SPK itu dihitung terhadap pemakaian SPK, jadi saat kantor menyetujui SPK, barang tersebut tidak dikurangi dari stok untuk kedua kalinya. Gudang tidak bisa menyerahkan barang bila SPK-nya sudah selesai atau dibatalkan.

Kesalahan umum:

- **"Pilih gudang asal."** atau **"Tambahkan minimal satu barang."** muncul bila bagian itu belum diisi.
- **"SPK harus SPK aktif (ditugaskan atau dikerjakan) milik Anda."** tampil di bawah kolom **SPK**: SPK itu sudah selesai, dibatalkan, atau pindah ke teknisi lain sejak daftar dimuat. Pilih SPK lain atau **Tanpa SPK**.
- Pesan lain dari server tampil di bawah kolom yang dimaksud, dan permintaan yang ditolak itu tidak disimpan di ponsel.


## Pantau dan batalkan permintaan


Di **Permintaan barang saya**, tiap permintaan menampilkan kode, barang dan jumlah, SPK terkait (ketuk untuk membukanya), dan status. Baris barang menulis berapa yang sudah jalan, bukan hanya berapa yang Anda minta: setelah gudang menyetujui, "Kabel UTP: disetujui 50 dari 80", dan setelah barang diserahkan, "Kabel UTP: diserahkan 50 dari 80". Sebelum itu baris hanya menulis jumlah yang diminta.

| Status | Arti |
| --- | --- |
| Diajukan | Menunggu gudang |
| Disetujui | Gudang menyetujui dan mengalokasikan barang |
| Disiapkan | Gudang menyiapkan barang |
| Siap diambil | Barang siap, ambil di gudang |
| Diserahkan | Barang sudah diserahkan kepada Anda |
| Ditolak | Gudang menolak |
| Dibatalkan | Permintaan dibatalkan |

Untuk membatalkan permintaan yang masih menunggu gudang:

1. Ketuk **Batalkan** di baris permintaan. Tombol hanya ada selama permintaan masih bisa dibatalkan.
2. Di jendela "Batalkan permintaan REQ-xxxx?", isi alasan (opsional).
3. Ketuk **Batalkan permintaan**. Ketuk **Kembali** untuk mempertahankannya.

Permintaan yang dibatalkan tidak bisa dipulihkan. Bila permintaan sudah disetujui gudang saat Anda menekan tombol, aplikasi memuat ulang daftar dan permintaan tidak dibatalkan.

Tarik layar tab **Material** ke bawah untuk memperbarui kedua daftar. Daftar juga diperbarui sendiri saat aplikasi dibuka kembali, saat Anda membuka tab **Material**, dan setelah Anda mengirim deklarasi (langsung), serta sekitar 1 detik setelah notifikasi terakhir dalam satu rentetan.
