---
title: "7.8 Kamus Data"
description: "Kamus Data menjelaskan arti, formula, unit, kolom sumber, ruang lingkup, dan keterbatasan setiap angka laporan."
---

Kamus Data menjelaskan arti, formula, unit, kolom sumber, ruang lingkup, dan keterbatasan setiap angka laporan. Buka halaman ini ketika dua angka tampak berbeda atau saat Anda perlu memeriksa rumus yang dipakai.

Peran yang dapat memakai: admin, manajer, staf. Izin: `report.dictionary.view`. Halaman ini tidak mempunyai filter, grafik, daftar di balik angka, atau ekspor.

## Membaca kamus data

1. Buka **Laporan**, lalu klik **Kamus Data**.

   ![Halaman Kamus Data dengan catatan awal, daftar tautan laporan, dan kartu definisi metrik](~/assets/guide/web/reports-dictionary.webp)

2. Baca catatan awal. Angka laporan dibatasi pada perusahaan Anda. Data yang sudah dihapus tidak dihitung kecuali catatan penting sebuah angka menyebut lain.
3. Di bawah catatan awal ada daftar tautan, satu per laporan, misalnya **Metrik Bisnis** diikuti jumlah definisi dalam kurung. Klik nama laporan untuk meloncat ke bagiannya.
4. Baca header setiap bagian. Header memuat judul laporan, **Versi rumus** dan nomor versinya, izin yang dibutuhkan (**Memerlukan** diikuti nama izin), dan uraian laporan.
5. Baca kartu metrik:
   - Judul kartu adalah nama angka pada laporan.
   - Baris kecil di bawah judul menampilkan key dan versi, misalnya `mrr` dan `v1`.
   - Kalimat di bawahnya adalah definisi angka.
   - **Rumus** menjelaskan hitungan yang dijalankan kode.
   - **Satuan** dapat berupa Nilai uang, Jumlah, Persen, Menit, Penilaian, Kuantitas, Rincian (jumlah per kelompok), atau Catatan (baris buku besar).
   - **Dasar tanggal** menyatakan Posisi saat ini atau Per periode, termasuk kolom tanggal untuk angka per periode.
   - **Status** mencantumkan status data yang ikut dihitung, sebagai kode tersimpan seperti `active` atau `sent`. Baris ini hanya ada bila status relevan.
   - **Sumber data** mencantumkan pasangan tabel dan kolom.
   - **Cakupan** menyatakan batas perusahaan atau teknisi.
   - **Catatan penting** mencatat pengecualian dan perilaku versi rumus tersebut. Baris ini hanya ada bila ada catatan.

Kamus berisi Metrik Bisnis, KPI Penjualan, Kinerja Teknisi, Pemanfaatan Aset, Kepatuhan SLA, dan Kartu Stok. Versi v1 merekam rumus yang benar-benar dijalankan saat ini, termasuk perilaku yang belum ideal.

## Kesalahan umum

- Metrik Konsolidasi tidak mempunyai bagian sendiri. Laporan itu memakai definisi Metrik Bisnis.
- Log Audit dan Kamus Data tidak mempunyai metrik dalam registri, sehingga keduanya tidak muncul sebagai bagian kamus.
- Judul grafik dapat berbeda dari nama metrik. Diagram **Aset jaringan menurut status** memakai definisi **Sebaran status**, sedangkan grafik **Aset jaringan per lokasi** memakai **Aset per lokasi**.
- Rumus dan catatan di kamus, juga di rincian **Rumus dan sumber data** pada kartu laporan, menyebut batas tanggal dengan kata Dari dan Sampai. Maksudnya awal dan akhir isian **Periode**.
- Nama serupa belum tentu memakai aturan sama. Baca **Dasar tanggal** dan **Catatan penting** sebelum membandingkan dua laporan.
- Halaman ini tidak menampilkan nilai perusahaan. Halaman hanya memuat definisi statis yang sama bagi semua perusahaan.
