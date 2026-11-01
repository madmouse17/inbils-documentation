---
title: "7.4 Metrik Bisnis"
description: "Metrik Bisnis merangkum pendapatan berulang, pendapatan tagihan lunas, piutang, langganan, dan kepatuhan SLA."
---

Metrik Bisnis merangkum pendapatan berulang, pendapatan tagihan lunas, piutang, langganan, dan kepatuhan SLA. Buka laporan ini untuk memeriksa kondisi bisnis perusahaan aktif dan menelusuri catatan sumbernya.

Peran yang dapat memakai: admin, manajer, staf. Izin: `report.business.view`. Tombol **Ekspor** memerlukan `report.export`.

## Membuka dan membaca laporan

1. Buka **Laporan**, lalu klik **Metrik Bisnis**. Laporan langsung tampil untuk semua tanggal dan semua kategori.
2. Pilih **Periode**, lalu klik **Tampilkan**. Header menampilkan **Versi rumus** `business.v1`.

   ![Halaman Metrik Bisnis dengan Versi rumus, isian Periode dan Kategori paket, tombol Tampilkan, serta kartu MRR, Pendapatan terbayar, dan Piutang](~/assets/guide/web/reports-business.webp)

   Pilih juga **Kategori paket**: kosongkan untuk **Semua kategori**, atau klik isian dan pilih satu kategori ([bagian 4.2](/docs/guides/web/customers-and-services/service-packages/)). Daftar dapat disaring dengan mengetik. Tombol **Hapus pilihan: Kategori paket** mengembalikan ke semua kategori. Pilihan ini membatasi MRR, pendapatan, piutang, jumlah langganan, pemasangan, serta grafik tagihan dan MRR pada paket kategori itu. Kategori nonaktif tampil dengan tulisan `(nonaktif)`. Aset dan SLA tidak terpengaruh. Tagihan satu kali tanpa langganan tidak masuk kategori mana pun. Tautan **Lihat data** dan file ekspor mengikuti kategori yang dipilih.

3. Baca enam kartu. Kartu uang menulis angka dalam bentuk singkat, dan arahan penunjuk menampilkan rupiah yang tepat.
   - **MRR** menjumlahkan tarif bulanan semua langganan yang saat ini berstatus Aktif. Angka ini **Posisi saat ini**.
   - **Pendapatan terbayar** menjumlahkan jumlah terbayar tagihan berstatus Lunas berdasarkan tanggal terbit dalam **Periode**. Tagihan yang baru dibayar sebagian tidak masuk.
   - **Piutang** menjumlahkan total dikurangi jumlah terbayar pada tagihan berstatus Belum dibayar, Dibayar sebagian, atau Lewat jatuh tempo. Angka ini **Posisi saat ini**.
   - **Langganan aktif** menghitung langganan yang saat ini berstatus Aktif.
   - **Langganan ditangguhkan** menghitung langganan yang saat ini berstatus Ditangguhkan.
   - **Kepatuhan SLA** menghitung persentase tiket yang punya waktu selesai dan selesai paling lambat pada batas SLA. Angka ini memakai semua waktu dan mengabaikan **Periode**.
4. Klik **Lihat data** untuk membuka langganan, tagihan, atau tiket di balik kartu. Tautan mengikuti izin modul sumber.
5. Baca grafik **Pendapatan terbayar dan MRR per hari**, **per minggu**, atau **per bulan**. Garisnya bernama **Pendapatan terbayar** dan **MRR (akhir periode)**. Pendapatan memakai tanggal terbit tagihan lunas. MRR menunjukkan posisi pada akhir setiap kelompok waktu. Kelompok yang masih berjalan diberi tulisan **(berjalan)**.
6. Baca diagram **Tagihan menurut status**. Diagram memakai tanggal terbit dan memisahkan status yang ada di data: Draf, Belum dibayar, Dibayar sebagian, Lunas, Lewat jatuh tempo, dan Dibatalkan.
7. Klik **Ekspor** untuk mengunduh CSV atau PDF. File memuat semua 13 metrik Business, termasuk Langganan berhenti, Langganan baru, Churn, Pendapatan berulang, Pendapatan sekali bayar, Sebaran aset, dan Pemasangan selesai yang tidak tampil sebagai kartu.

## Kesalahan umum

- **Periode** hanya mengubah **Pendapatan terbayar** di antara enam kartu. Lima kartu lain merupakan **Posisi saat ini** atau angka semua waktu.
- Pendapatan terbayar dapat lebih kecil daripada uang yang masuk. Metrik ini memakai tagihan yang sudah Lunas dan tanggal terbit, sedangkan **Terkumpul** di KPI Penjualan memakai pembayaran yang tidak dibalik dan tanggal bayar.
- **Piutang** dapat berbeda dengan Tunggakan. Klik **Lihat data** pada kartu ini untuk melihat kartu **Rekonsiliasi** terhadap **Tunggakan**.
- **Kepatuhan SLA** dapat berbeda dari **Tingkat kepatuhan SLA** di [bagian 7.6](/docs/guides/web/finance-and-reports/sla-compliance/). Metrik Bisnis memakai semua tiket yang mempunyai waktu selesai, tanpa filter periode.
- Tanpa **Periode**, Langganan baru dan Churn pada file ekspor bernilai 0. Metrik periode lain memakai semua catatan yang cocok.
- Grafik menampilkan **Tidak ada data pada periode ini** bila tidak ada nilai yang dapat digambar. Kartu tetap menampilkan 0 atau nilai **Posisi saat ini**.
