---
title: "3. Tagihan"
description: "Daftar kosong menampilkan \"Tidak ada tagihan yang belum dibayar.\", \"Belum ada tagihan lunas.\", atau \"Belum ada tagihan.\" sesuai filter."
---

## Daftar tagihan


Ketuk tab **Tagihan**.

![Daftar tagihan](~/assets/guide/customer/tagihan.webp)

1. Pilih filter di atas daftar: **Belum dibayar**, **Lunas**, atau **Semua**.
2. Setiap baris memuat nomor tagihan, tanggal terbit, tanggal jatuh tempo, dan sisa yang harus dibayar.
3. Ketuk baris untuk membuka rinciannya.
4. Gulir ke bawah untuk memuat tagihan berikutnya. Bila gagal, muncul "Gagal memuat tagihan berikutnya." dengan tombol untuk mencoba lagi.

Daftar kosong menampilkan "Tidak ada tagihan yang belum dibayar.", "Belum ada tagihan lunas.", atau "Belum ada tagihan." sesuai filter.


## Status tagihan


| Status di aplikasi | Arti |
| --- | --- |
| Belum dibayar | Tagihan sudah terbit dan belum ada pembayaran. |
| Dibayar sebagian | Sudah ada pembayaran, tetapi masih ada sisa. |
| Lewat jatuh tempo | Tanggal jatuh tempo terlewat dan masih ada sisa. |
| Lunas | Seluruh tagihan sudah dibayar. |
| Dibatalkan | Tagihan dibatalkan oleh ISP; tidak perlu dibayar. |

Tagihan yang masih berupa konsep di ISP tidak tampil di aplikasi.


## Detail tagihan


![Detail tagihan](~/assets/guide/customer/detail-tagihan.webp)

Layar detail memuat, dari atas ke bawah:

- Tanggal terbit dan jatuh tempo, serta **Periode tagihan** bila ISP mengisinya.
- **Sisa yang harus dibayar** dengan status tagihan.
- Subtotal, Diskon, Pajak, **Total**, dan **Sudah dibayar**.
- Tombol **Bayar** dengan catatan tentang halaman Midtrans (lihat di bawah). Tagihan yang belum lunas tetapi tidak bisa dibayar di aplikasi menampilkan tombol **Hubungi ISP**, yang membuka lembar kontak ISP, jadi Anda tidak pernah buntu.
- **Pembayaran online terakhir** dan alasan bila percobaan bayar terakhir tidak berhasil (lihat di bawah).
- **Rincian tagihan**: tiap baris dengan jumlah × harga satuan.
- **Pembayaran**: pembayaran yang sudah tercatat pada tagihan ini, masing-masing dengan metode, tanggal dan jam, nomor referensi ("Ref. ...") bila ada, dan jumlahnya, serta tautan **Lihat riwayat pembayaran**.
- Tagihan **Lunas** punya tombol **Unduh bukti bayar**. Aplikasi menyiapkan PDF ("Menyiapkan bukti bayar…"), lalu membuka lembar bagikan Android: simpan, kirim, atau buka dengan aplikasi pembaca PDF. Bila gagal, tertulis "Bukti bayar tidak bisa diunduh. Coba lagi."

![Detail tagihan yang tidak bisa dibayar di aplikasi: tombol Hubungi ISP](~/assets/guide/customer/detail-tagihan-tidak-bisa-dibayar.webp)

Tarik layar ke bawah untuk memuat ulang.


## Bayar lewat Midtrans


Pembayaran online dilakukan di halaman milik Midtrans, bukan di dalam aplikasi. Anda membayar **seluruh sisa** tagihan, bukan sebagian.

1. Buka tagihan yang belum dibayar, atau yang lewat jatuh tempo, atau yang dibayar sebagian.
2. Ketuk **Bayar**. Aplikasi bertanya "Bayar tagihan sekarang?" dan menjelaskan bahwa Anda akan diarahkan ke halaman pembayaran. Ketuk **Lanjut bayar**.
3. Layar **Menyiapkan pembayaran** tampil sebentar dengan sisa yang dibayar, jatuh tempo, dan bilah kemajuan, sementara aplikasi meminta halaman pembayaran. Tombol kembali ditahan selama layar ini, paling lama sekitar 30 detik.
4. Halaman pembayaran Midtrans terbuka di browser dalam aplikasi (atau browser ponsel bila perlu).
5. Pilih metode pembayaran di halaman itu dan ikuti petunjuknya sampai selesai. Metode yang muncul ditentukan oleh Midtrans dan pengaturan akun merchant ISP; aplikasi tidak membatasi atau memilihkannya.
6. Setelah selesai, kembali ke aplikasi Inbils.

Halaman pembayaran yang sudah dibuat dipakai ulang selama belum kedaluwarsa (24 jam) dan jumlahnya masih sama dengan sisa tagihan. Jadi mengetuk **Bayar** dua kali tidak membuat dua tagihan pembayaran.

Selama halaman pembayaran yang sudah dibuat masih berlaku, bagian **Pembayaran online terakhir** menulis **Menunggu pembayaran** dan "Bayar sebelum 08.30 besok" (batas waktunya, ditulis seperti orang menyebut jam). Setelah lewat, tertulis **Kedaluwarsa**; ketuk **Bayar** untuk membuat halaman baru.

### Setelah bayar

Saat Anda kembali ke aplikasi, layar detail memuat ulang status tagihan sendiri dan sekali lagi sekitar 10 detik kemudian, karena sebagian metode dikonfirmasi agak lambat. Status selalu diambil dari server, bukan dari halaman Midtrans.

- Banner **Pembayaran diterima** berarti tagihan sudah tercatat. Statusnya menjadi **Lunas** dan pembayaran muncul di bagian **Pembayaran** serta di Riwayat pembayaran.
- Banner **Menunggu konfirmasi pembayaran** berarti pembayaran belum sampai ke sistem. Ketuk **Periksa status** beberapa saat kemudian. Sistem juga memeriksa ke Midtrans secara berkala, jadi pembayaran yang berhasil tetap tercatat walaupun aplikasi sempat tertutup.
- Pembayaran yang dikonfirmasi lebih lama (misalnya transfer bank) boleh dicek lagi nanti dari tab **Tagihan**.

### Bila pembayaran terakhir tidak berhasil

Bila percobaan bayar terakhir tidak selesai, detail tagihan menulis alasannya di spanduk di atas **Rincian tagihan**, lengkap dengan langkah berikutnya:

| Spanduk | Artinya | Tombol |
| --- | --- | --- |
| "Pembayaran ditolak. Coba lagi, metode lain bisa dipilih di halaman bayar." | Bank atau penyedia metode menolak pembayaran. | **Bayar lagi** |
| "Pembayaran dibatalkan." | Pembayaran dibatalkan di halaman bayar sebelum selesai. | **Bayar lagi** |
| "Waktu bayar habis." | Halaman bayar kedaluwarsa sebelum selesai. | **Bayar lagi** |
| "Pembayaran Anda sedang diperiksa ISP. Hubungi ISP bila saldo Anda sudah terpotong." | Uang masuk tetapi sistem belum bisa mencatatnya pada tagihan ini. ISP memeriksanya. | **Hubungi ISP** |
| "Halaman bayar ditutup karena tagihan sudah dibayar atau berubah." | ISP mencatat pembayaran lain atau mengubah tagihan, sehingga halaman lama ditutup. | **Bayar lagi**, hanya bila tagihan masih bisa dibayar |
| "Pembayaran online Anda sudah dikembalikan ISP." | ISP mengembalikan uang pembayaran online Anda. | **Hubungi ISP** |

**Bayar lagi** membuka halaman bayar Midtrans yang sama seperti tombol **Bayar**, dan di sana semua metode tersedia. **Hubungi ISP** membuka lembar kontak. Spanduk "ditolak", "dibatalkan" dan "waktu habis" tidak tampil pada tagihan yang sudah lunas atau tidak bisa dibayar lagi.

Bila ISP sudah mengaktifkan WhatsApp dan Anda menyetujuinya, pesan "pembayaran diterima" juga dikirim ke WhatsApp. Lihat [bab 7](/docs/guides/customer/notifications/).

Bila pembayaran online tidak tersedia, detail tagihan menampilkan "Pembayaran online belum tersedia. Hubungi kami untuk membayar tagihan ini." dengan tombol **Hubungi ISP**. Bayar lewat kantor atau rekening ISP; petugas mencatatnya dan tagihan berubah di aplikasi. Tagihan yang sudah lunas atau dibatalkan tidak punya tombol **Bayar**.

Jangan bayar dua kali. Bila Anda ragu apakah pembayaran sudah masuk, periksa status tagihan dan Riwayat pembayaran dulu.
