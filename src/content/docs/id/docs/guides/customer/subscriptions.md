---
title: "5. Langganan"
description: "Langganan adalah layanan internet yang Anda pakai. Buka dari tab Akun → Langganan, atau ketuk nama paket di kartu layanan pada Beranda."
---

Langganan adalah layanan internet yang Anda pakai. Buka dari tab **Akun** → **Langganan**, atau ketuk nama paket di kartu layanan pada Beranda.


## Daftar langganan


![Daftar langganan](~/assets/guide/customer/langganan.webp)

Setiap baris memuat nama paket, biaya bulanan, dan status. Ketuk satu baris untuk melihat rinciannya. Bila kosong: "Tidak ada layanan".


## Detail langganan


![Detail langganan](~/assets/guide/customer/detail-langganan.webp)

| Bagian | Isi |
| --- | --- |
| Status | Status langganan (tabel di bawah). |
| Paket | Nama paket. |
| Kategori | Kategori paket, misalnya Rumahan, Bisnis atau Korporat. Muncul bila ISP memberi paket itu kategori. |
| Biaya bulanan | Tarif per bulan. |
| Tanggal aktivasi | Tanggal layanan mulai aktif. |
| Tanggal tagihan | "Setiap tanggal N" tiap bulan. |
| Tagihan berikutnya | Tanggal tagihan berikutnya terbit. |
| Masa kontrak | Lama kontrak dalam bulan. |
| Berakhir | Tanggal kontrak berakhir. |
| Alamat pemasangan | Lokasi layanan. |

Data yang belum ada tertulis "Tidak tersedia". Data langganan hanya bisa dibaca; perubahan paket atau alamat dilakukan lewat ISP.

Detail langganan juga memuat bagian **Janji layanan** ("Paket SLA {nama}" dengan "Respons ≤ 4 jam, selesai ≤ 24 jam", bila paket Anda punya SLA), **Koneksi** dengan **Username PPPoE** yang bisa disalin ("Username PPPoE disalin."), dan peta alamat pemasangan dengan tombol **Buka di Maps**. Langganan yang ditangguhkan menulis penyebabnya dan sejak kapan.


## Status langganan


| Status | Arti |
| --- | --- |
| Menunggu | Pemasangan belum selesai; layanan belum aktif. |
| Aktif | Layanan berjalan dan ditagih tiap bulan. |
| Ditangguhkan | Layanan dihentikan sementara (diisolir). |
| Dihentikan | Langganan sudah berhenti. |
| Dibatalkan | Langganan dibatalkan sebelum aktif. |


## Isolir: arti dan cara pulih


**Isolir** berarti ISP membatasi layanan internet sementara. Isolir karena tunggakan dapat pulih otomatis setelah semua tagihan yang menahannya lunas. Penangguhan manual dan blokir petugas tidak dibuka oleh pembayaran.

Cara melunasi isolir karena tunggakan:

1. Hubungkan ponsel lewat **data seluler** atau jaringan lain.
2. Buka Inbils Pelanggan. Bila router membuka halaman **Layanan internet Anda sedang dibatasi**, gunakan tombol **Buka aplikasi {nama ISP}**. Halaman juga menyediakan **Telepon** dan **WhatsApp** bila ISP mengisinya.
3. Pada kartu layanan **Diisolir**, baca daftar **Lunasi tagihan berikut agar layanan aktif kembali**. Daftar ini hanya memuat tagihan yang masih menahan reaktivasi.
4. Untuk satu tagihan, ketuk **Bayar**. Untuk dua tagihan atau lebih, ketuk **Bayar semua (Rp {total})**. Aplikasi membayar tagihan satu per satu, dari jatuh tempo paling lama.
5. Selesaikan pembayaran tagihan pertama. Saat Anda kembali ke aplikasi, langkah **Tagihan 1 dari N** tetap terlihat. Bila tagihan berikutnya masih ada, lembar **Tagihan {nomor} lunas. Lanjut bayar {nomor berikut} (Rp {jumlah})** muncul. Ketuk **Lanjut bayar**.
6. Ulangi sampai aplikasi menulis **Semua tagihan lunas. Layanan aktif kembali dalam beberapa menit.** Jangan membayar tagihan yang sama lagi saat menunggu konfirmasi.

Pembayaran sebagian belum cukup. Bila salah satu pembayaran belum dikonfirmasi, periksa statusnya dari tab **Tagihan** sebelum melanjutkan. Setelah seluruh tagihan penahan tercatat lunas, sistem mengaktifkan layanan di latar belakang.

Pemulihan otomatis hanya berlaku untuk isolir karena tunggakan dan bila ISP mengaktifkannya. Untuk penangguhan manual atau blokir, gunakan **Hubungi ISP**. Bila semua tagihan penahan sudah lunas tetapi layanan belum aktif setelah beberapa menit, hubungi ISP dengan nomor tagihan.


## Kunjungan teknisi


Kunjungan teknisi adalah SPK instalasi atau perawatan yang dikerjakan di alamat Anda. Aplikasi menunjukkan sampai mana kunjungan itu. Buka dari tab **Akun** → **Kunjungan teknisi**, dari kartu kunjungan di **Beranda**, atau dari notifikasi "Teknisi dalam perjalanan". Hanya kunjungan untuk langganan Anda yang tampil.

![Tab Akun: baris Kunjungan teknisi di antara Riwayat pembayaran dan Ubah profil](~/assets/guide/customer/redesign/kunjungan-akun-menu.webp)

### Daftar kunjungan

![Daftar Kunjungan teknisi: satu kunjungan Dalam perjalanan dan satu Selesai dipasang](~/assets/guide/customer/redesign/kunjungan-daftar.webp)

Daftar memuat kunjungan yang masih berjalan, dan kunjungan yang selesai atau dibatalkan dalam 30 hari terakhir, dengan yang terbaru di atas. Tiap kartu menulis nomor SPK, jenis kunjungan, tahap sekarang, dan tanggal jadwal bila ada. Tarik layar ke bawah untuk memuat ulang.

### Detail kunjungan

Ketuk satu kartu.

![Detail kunjungan pada tahap Dalam perjalanan](~/assets/guide/customer/redesign/kunjungan-detail-dalam-perjalanan.webp)

- Bagian atas memuat tahap sekarang, jenis kunjungan, dan nomor SPK.
- **Tahapan** menunjukkan empat langkah: **Ditugaskan**, **Dalam perjalanan**, **Sedang dikerjakan**, dan **Selesai dipasang**. Tanda centang berarti langkah sudah dilalui, dengan waktunya di bawah nama langkah. Lingkaran bertitik dengan nama tebal adalah langkah sekarang. Lingkaran kosong adalah langkah berikutnya.
- **Rincian** memuat **Jadwal** ("Belum ditentukan" bila ISP belum mengisi tanggal), **Teknisi** (nama depan saja), dan **Alamat pemasangan**.
- Tarik layar ke bawah untuk memuat tahap terbaru.

![Detail kunjungan pada tahap Sedang dikerjakan](~/assets/guide/customer/redesign/kunjungan-detail-dikerjakan.webp)

Tahap **Selesai dipasang** muncul begitu teknisi mengirim hasil kerjanya, walau kantor ISP belum memeriksanya.

![Detail kunjungan yang selesai dipasang: keempat langkah tercentang](~/assets/guide/customer/redesign/kunjungan-detail-selesai.webp)

Kunjungan yang dibatalkan menulis **Dibatalkan** tanpa langkah. Aplikasi tidak menampilkan nomor telepon teknisi. Untuk bertanya, pakai **Hubungi ISP** di Beranda.
