---
title: "7.5 Pemanfaatan Aset"
description: "Pemanfaatan Aset merangkum status aset jaringan, lokasi aset, riwayat pemasangan, aset yang terhubung ke pelanggan, dan aset pensiun."
---

Pemanfaatan Aset merangkum status aset jaringan, lokasi aset, riwayat pemasangan, aset yang terhubung ke pelanggan, dan aset pensiun. Data sumbernya berasal dari Aset Jaringan ([bagian 5.2](/docs/guides/web/network/network-assets/)).

Peran yang dapat memakai: admin, manajer, staf. Izin: `report.asset.view`. Tombol **Ekspor** memerlukan `report.export`.

## Membuka dan membaca laporan

1. Buka **Laporan**, lalu klik **Pemanfaatan Aset**. Laporan langsung tampil untuk semua jenis dan semua tanggal.
2. Pilih **Jenis aset**: klik isian lalu pilih, atau ketik untuk menyaring daftar. Pilihannya **Router**, **Switch**, **OLT**, **ONU/ONT**, **Radio**, **Antena**, **Fiber**, **ODP**, **ODC**, **Rak**, **Perangkat daya**, dan **Lainnya**. Isian kosong berarti **Semua jenis**. Tombol **Hapus pilihan: Jenis aset** mengosongkannya.
3. Pilih **Periode**, lalu klik **Tampilkan**. Header menampilkan **Versi rumus** `asset.v1`.

   ![Halaman Pemanfaatan Aset dengan Versi rumus, isian Jenis aset dan Periode, tombol Tampilkan, serta kartu Pemasangan aset, Terhubung ke pelanggan, dan Dipensiunkan](~/assets/guide/web/reports-asset.webp)

4. Baca tiga kartu:
   - **Pemasangan aset** menghitung catatan pemasangan aset yang tanggal pasangnya masuk dalam **Periode**. Angka ini mengabaikan **Jenis aset**.
   - **Terhubung ke pelanggan** menghitung aset yang saat ini mempunyai pelanggan. Angka ini mengabaikan semua filter.
   - **Dipensiunkan** menghitung aset yang saat ini berstatus Dipensiunkan. Angka ini mengabaikan semua filter.
5. Baca diagram **Aset jaringan menurut status**. Diagram memakai **Jenis aset** dan menampilkan kondisi saat ini. **Periode** tidak berlaku. Statusnya Tersedia, Terpasang, Perawatan, Rusak, dan Dipensiunkan, sebatas yang ada di data.
6. Baca grafik **Aset jaringan per lokasi**. Grafik menghitung aset yang mempunyai lokasi, tanpa memakai **Jenis aset** atau **Periode**.
7. Baca tabel **Sebaran status** dengan kolom **Status** dan **Jumlah**. Klik **Lihat data** pada satu status untuk membuka aset di balik jumlah itu.
8. Klik **Ekspor** untuk mengunduh CSV atau PDF. File memuat Sebaran status, Aset per lokasi, Pemasangan aset, Terhubung ke pelanggan, dan Dipensiunkan.

## Kesalahan umum

- **Jenis aset** hanya memengaruhi **Sebaran status**. Kartu, grafik lokasi, dan sebagian besar angka tidak berubah saat filter ini diganti.
- **Pemasangan aset** menghitung catatan pemasangan aset. Metrik **Pemasangan selesai** di Metrik Bisnis menghitung SPK pemasangan yang selesai, sehingga angkanya dapat berbeda.
- Lokasi bernama sama bergabung menjadi satu batang. Aset tanpa lokasi tidak masuk ke grafik lokasi.
- Layar tidak menyediakan filter Lokasi. URL dengan `location_id` dapat membatasi **Sebaran status**, tetapi filter itu tidak dapat dipilih dari form. Server menolak lokasi yang bukan milik perusahaan aktif dengan kesalahan validasi "Lokasi tidak ditemukan." Layar ini tidak menulis pesan itu.
- Tabel kosong menampilkan **Tidak ada data.** Grafik kosong menampilkan **Tidak ada data pada periode ini**.
