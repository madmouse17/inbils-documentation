---
title: "7.7 Kartu Stok"
description: "Kartu Stok adalah buku catatan pergerakan satu barang. Laporan ini menunjukkan kuantitas gerakan dan saldo lokasi tepat setelah setiap gerakan, tanpa"
---

Kartu Stok adalah buku catatan pergerakan satu barang. Laporan ini menunjukkan kuantitas gerakan dan saldo lokasi tepat setelah setiap gerakan, tanpa menghitung ulang stok.

Peran yang dapat memakai: admin, manajer, staf. Izin: `report.stock_card.view`. Tombol **Ekspor** memerlukan `report.export`. Tombol menuju stok dan semua mutasi juga memerlukan `inventory.view`.

## Membuka dan membaca kartu stok

1. Buka **Laporan**, lalu klik **Kartu Stok**.
2. Pilih **Barang** (wajib, bertanda bintang). Ketik nama atau SKU di isian yang berbunyi **Cari nama atau SKU...**, lalu pilih barang dari daftar. Daftar baru muncul setelah Anda mengetik minimal dua huruf. Server mencari di barang perusahaan aktif dan menampilkan paling banyak 20 hasil, dengan SKU di bawah nama. Barang yang sudah dihapus tetap dapat dipilih, karena buku besar menyimpan gerakannya. Pilihan bertahan saat Anda mengetik dan berganti hanya saat Anda memilih barang lain atau mengklik **Hapus pilihan: Barang**.
3. Bila perlu, pilih **Lokasi** dengan cara yang sama (cari nama atau kode lokasi). Isian kosong bertuliskan **Semua lokasi**. Dengan lokasi terpilih, laporan hanya memuat gerakan yang memakai lokasi itu sebagai asal atau tujuan.
4. Pilih **Periode**, lalu klik **Tampilkan**. Tombol ini nonaktif sebelum barang dipilih. Sebelum Anda menerapkan barang, halaman menampilkan "Pilih barang lalu tekan Tampilkan untuk melihat pergerakan stok." Di bawah kalimat itu, bagian **Barang terakhir bergerak** menampilkan sampai 8 barang yang stoknya paling baru bergerak, masing-masing dengan nama, SKU, dan tanggal gerakan terakhir. Klik salah satunya untuk membuka kartu barang itu tanpa mengetik. Bagian ini tidak tampil bila perusahaan belum punya gerakan stok.

   ![Halaman Kartu Stok sebelum barang dipilih, dengan bagian Barang terakhir bergerak](~/assets/guide/web/reports-stock-card.webp)

5. Baca tabel:
   - Kolom **Jenis** menampilkan jenis gerakan sebagai lencana: Masuk, Keluar, Transfer, Penyesuaian, Dicadangkan, Cadangan dilepas, atau Pengembalian.
   - Kolom **Jumlah** menampilkan kuantitas bertanda seperti yang dicatat Inventaris.
   - Kolom **Saldo** menampilkan saldo baris stok yang tersentuh tepat setelah gerakan.
   - Kolom **Dari** dan **Ke** menampilkan lokasi asal dan tujuan. Sel kosong ditulis **-**.
   - Kolom **Catatan** menampilkan catatan gerakan.
   - Kolom **Referensi** menampilkan SPK atau permintaan barang yang menimbulkan gerakan, misalnya "SPK" diikuti kode SPK. Teks itu menjadi tautan bila akun boleh membukanya. Sumber lain tampil sebagai teks biasa.
   - Kolom **Tanggal** menampilkan waktu pencatatan gerakan dalam format perusahaan.
6. Urutkan lewat judul kolom **Jumlah**, **Saldo**, atau **Tanggal**. Urutan awal memakai waktu terbaru. Di bawah tabel, pilih **Baris per halaman** (10, 25, atau 50 per halaman) dan pindah halaman dengan **Sebelumnya** dan **Berikutnya**.
7. Gunakan **Lihat stok** untuk membuka Stok ([bagian 6.5](/docs/guides/web/inventory/stock/)), atau **Semua pergerakan** untuk membuka Mutasi Stok ([bagian 6.7](/docs/guides/web/inventory/stock-movements/)). Tombol hanya muncul setelah barang diterapkan, dan membawa barang serta lokasi yang sama.
8. Baca kartu **Definisi** di bawah tabel untuk definisi **Pergerakan stok**, **Jumlah**, dan **Saldo**.
9. Klik **Ekspor** untuk mengunduh seluruh ledger yang cocok sebagai CSV atau PDF. File memuat Tanggal, Barang, Jenis, Jumlah, Saldo setelah, Dari, Ke, Referensi, dan Catatan. Kolom Jenis ditulis dengan label seperti di layar (Masuk, Keluar, Pengembalian, dan seterusnya). Kolom Tanggal memakai jam perusahaan, dan PDF menulis tanggal, jam, jumlah, dan saldo seperti di layar. PDF menulis barang dan lokasi yang dipilih di kop, pada baris **Filter**.

## Kesalahan umum

- **Barang** wajib. Tombol **Tampilkan** tetap nonaktif sampai Anda memilih barang.
- Barang atau lokasi tidak muncul di daftar: daftar hanya memuat data perusahaan aktif. Periksa pemilih perusahaan di sidebar. Lokasi yang sudah dihapus juga tidak ditawarkan. Alamat halaman yang memuat barang atau lokasi milik perusahaan lain, atau yang tidak ada, ditolak server dengan kesalahan validasi "Barang tidak ditemukan." atau "Lokasi tidak ditemukan." Pemilih tidak dapat menghasilkan kesalahan ini. Kartu Stok tidak menulis pesan itu di dekat isian. Yang tampil hanya pemberitahuan "Data gagal disimpan. Periksa input." bila server mengembalikan Anda ke layar.
- Pesan **Tidak ada pergerakan stok** berarti tidak ada gerakan untuk barang dan periode tersebut. Ubah filter lalu klik **Tampilkan** lagi.
- **Saldo** bukan saldo berjalan gabungan dari semua lokasi atau semua baris hasil filter. Nilainya adalah snapshot satu baris stok saat gerakan dicatat.
- Laporan tidak membuat baris saldo awal. Untuk saldo saat ini, klik **Lihat stok**.
- Tombol **Ekspor** baru muncul setelah barang diterapkan dan akun memegang `report.export`.
