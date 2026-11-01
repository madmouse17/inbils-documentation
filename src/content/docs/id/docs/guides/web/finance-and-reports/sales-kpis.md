---
title: "7.10 KPI Penjualan"
description: "KPI Penjualan membagi akuisisi pelanggan, aktivasi langganan, MRR, tagihan, pembayaran, piutang, dan tingkat penagihan menurut petugas penjualan pelanggan."
---

KPI Penjualan membagi akuisisi pelanggan, aktivasi langganan, MRR, tagihan, pembayaran, piutang, dan tingkat penagihan menurut petugas penjualan pelanggan. Petugas penjualan adalah pengguna yang tercatat pada isian **Diperoleh oleh** di Pelanggan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)).

Peran yang dapat memakai: admin dan manajer. Izin: `report.sales.view`. Staf tidak memegang izin ini pada peran bawaan. Laporan tidak mempunyai tombol **Ekspor** dan tautan **Lihat data**.

## Membuka dan membaca laporan

1. Di sidebar, buka **Keuangan & Laporan**, lalu klik **KPI Penjualan**. Anda juga dapat membuka **Laporan** lalu klik tautan **KPI Penjualan**.

   ![KPI Penjualan dengan filter Periode, Petugas penjualan, Kategori paket, kartu total, dan tabel petugas](~/assets/guide/web/reports-sales.webp)

2. Isi **Periode** seperti pada Kinerja Teknisi ([bagian 7.9](/docs/guides/web/finance-and-reports/technician-performance/)): ketik rentang, atau buka kalender dan pakai pilihan cepat. Tanpa pilihan, baris keterangan menulis **Periode: semua waktu**.
3. Pilih **Petugas penjualan**. Klik kotaknya untuk membuka daftar, ketik untuk menyaring, lalu pilih satu nama. Isian kosong (**Semua petugas**) menampilkan semua petugas dan baris **Tanpa petugas**. Nama pengguna nonaktif diberi tulisan "(nonaktif)". Klik **Hapus pilihan: Petugas penjualan** untuk mengosongkan.

   Pilih juga **Kategori paket**: **Semua kategori** atau satu kategori ([bagian 4.2](/docs/guides/web/customers-and-services/service-packages/)). Kategori nonaktif tetap ada di daftar dengan tulisan "(nonaktif)", karena riwayat masih memakainya. Dengan satu kategori, **Langganan diaktifkan**, **MRR aktif**, **Ditagihkan**, **Terkumpul**, **Piutang**, dan **Tingkat penagihan** hanya menghitung langganan pada paket kategori itu beserta tagihan dan pembayarannya. Teks bantu di bawah isian menulis "Pelanggan baru tidak terpengaruh." karena **Pelanggan baru** tidak ikut terfilter.

4. Klik **Tampilkan**. Header menampilkan **Versi rumus sales.v1**.
5. Baca tujuh kartu total:
   - **Pelanggan baru** menghitung pelanggan yang saat ini dikreditkan kepada petugas dan dibuat dalam **Periode**. Pelanggan yang dihapus secara lunak tidak masuk.
   - **Langganan diaktifkan** menghitung langganan pelanggan petugas yang mempunyai tanggal aktivasi dalam **Periode**, apa pun statusnya saat ini.
   - **MRR aktif** menjumlahkan tarif bulanan langganan yang saat ini berstatus Aktif. Angka ini adalah posisi saat ini.
   - **Ditagihkan** menjumlahkan total tagihan berstatus Belum dibayar, Dibayar sebagian, Lunas, atau Lewat jatuh tempo menurut tanggal terbit dalam **Periode**.
   - **Terkumpul** menjumlahkan pembayaran yang tidak dibatalkan menurut tanggal bayar dalam **Periode**.
   - **Piutang** menjumlahkan sisa tagihan berstatus Belum dibayar, Dibayar sebagian, atau Lewat jatuh tempo. Angka ini adalah posisi saat ini.
   - **Tingkat penagihan** adalah Terkumpul dibagi Ditagihkan, ditulis dengan koma desimal dan paling banyak dua angka desimal, misalnya `95,5%`. Nilai tampil sebagai tanda hubung (-) bila Ditagihkan bernilai 0.

   Kartu uang menampilkan angka singkat, misalnya "Rp 1,2 jt". Arahkan penunjuk ke angka itu untuk melihat jumlah rupiah lengkap. Tabel di bawah selalu menampilkan jumlah lengkap. Setiap kartu juga memuat definisi singkat, keterangan **Per periode** atau **Posisi saat ini**, dan bagian **Rumus dan sumber data** yang dapat dibuka.
6. Baca grafik:
   - **Pelanggan baru per hari**, **Pelanggan baru per minggu**, atau **Pelanggan baru per bulan** memakai tanggal pembuatan pelanggan. Satuan yang masih berjalan hari ini diberi tulisan "(berjalan)".
   - **Pelanggan baru per petugas penjualan** membandingkan Pelanggan baru.
   - **Pembayaran diterima per petugas penjualan** membandingkan Terkumpul. Keterangannya menulis "Semua pembayaran yang tidak dibatalkan, menurut tanggal bayar."
7. Baca tabel petugas. Kolom pertama, **Petugas penjualan**, memuat nama dan lencana **Nonaktif**. Tujuh kolom metrik dan kolom nama dapat diurutkan dengan mengklik judul kolom. Tabel memakai paging bawaan (10, 25, atau 50 baris per halaman).
8. Lihat baris **Tanpa petugas** untuk pelanggan tanpa petugas yang sah. Baris **Total** menjumlahkan semua petugas dan Tanpa petugas. Memilih satu petugas menyembunyikan baris Tanpa petugas.

## Kesalahan umum

- Mengoreksi **Diperoleh oleh** memindahkan seluruh riwayat pelanggan ke petugas baru. Angka periode lama dapat berubah.
- **Pelanggan baru** memakai tanggal pembuatan pelanggan, bukan tanggal penetapan petugas.
- **Terkumpul** memakai tanggal pembayaran dan memasukkan pembayaran sebagian yang tidak dibatalkan. Nilainya tidak sama dengan **Pendapatan terbayar** di Metrik Bisnis ([bagian 7.4](/docs/guides/web/finance-and-reports/business-metrics/)).
- **Tingkat penagihan** dapat lebih dari 100 persen karena Terkumpul memakai tanggal bayar, sedangkan Ditagihkan memakai tanggal terbit.
- Nilai Piutang seluruh petugas ditambah Tanpa petugas harus sama dengan Piutang di Metrik Bisnis pada perusahaan yang sama.
- Pesan **Belum ada petugas penjualan** berarti belum ada karyawan yang dapat menerima kredit akuisisi. Isi **Diperoleh oleh** pada data pelanggan untuk memulai.
- Baris dengan **Tingkat penagihan** bertanda hubung (-) selalu ditempatkan terakhir saat kolom itu diurutkan.
- Alamat dengan `acquirer_id` pengguna di luar perusahaan aktif, atau yang tidak ada, ditolak dengan "Petugas penjualan tidak ditemukan." di bawah **Petugas penjualan**. Pengguna perusahaan aktif yang tidak ada di daftar petugas membuka halaman **Akses ditolak**. Pemilih tidak dapat menghasilkan keduanya.
- **Tanggal akhir tidak boleh sebelum tanggal mulai.** muncul di bawah **Periode** bila rentang terbalik.
