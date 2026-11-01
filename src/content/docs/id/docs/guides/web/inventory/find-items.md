---
title: "6.6 Cari Barang"
description: "Cari Barang menjawab pertanyaan barang ini ada di lokasi mana dan berapa jumlahnya. Ketik sebagian nama atau SKU, lalu baca jumlah di setiap lokasi."
---

Cari Barang menjawab pertanyaan barang ini ada di lokasi mana dan berapa jumlahnya. Ketik sebagian nama atau SKU, lalu baca jumlah di setiap lokasi. Buka menu ini saat Anda perlu tahu di lokasi mana sebuah barang habis pakai tersedia.

Peran yang dapat memakai: admin, manajer, staf. Izin: `inventory.view` (Lihat barang). Tidak ada izin tambahan, dan menu ini tidak mengubah data.

## Membuka dan membaca hasil

1. Di sidebar, buka grup **Inventaris**, lalu klik **Cari Barang**. Tabel awal berisi teks `Ketik nama atau SKU di kolom atas, lalu klik Cari.` karena belum ada pencarian.

   ![Halaman Cari Barang sebelum pencarian, dengan kolom Nama atau SKU, tombol Cari, dan tabel berkolom Barang, SKU, Lokasi, Jalur, Tersedia, Jumlah, Dicadangkan](~/assets/guide/web/inventory-find.webp)

2. Ketik sebagian nama atau SKU di kolom **Nama atau SKU** (contoh isian: `Contoh: kabel`), lalu klik **Cari** atau tekan Enter. Kolom kosong tidak menghasilkan apa pun.
3. Baca hasil. Setiap baris adalah satu barang di satu lokasi, dengan kolom **Barang**, **SKU**, **Lokasi**, **Jalur** (jalur lokasi), **Tersedia** (jumlah yang bisa dipakai), **Jumlah** (jumlah fisik) dan **Dicadangkan** (jumlah yang dicadangkan). Hasil tidak dibagi per halaman dan tidak bisa diurutkan.

   ![Hasil pencarian di Cari Barang dengan kolom Barang, SKU, Lokasi, Jalur, Tersedia, Jumlah dan Dicadangkan](~/assets/guide/web/inventory-find-result.webp)

Subjudul layar berbunyi `Cari barang habis pakai berdasarkan nama atau SKU, lalu lihat jumlahnya di setiap lokasi.` Pencarian memang hanya memuat barang bertipe **Habis pakai**. Barang bertipe **Aset** atau **Layanan** tidak tampil, sedangkan barang nonaktif tetap tampil bila nama atau SKU-nya cocok.

## Kesalahan umum

- Muncul `Tidak ada barang habis pakai yang cocok dengan "<kata>". Coba potongan nama atau SKU yang lain.`: pencarian hanya mencocokkan potongan nama atau SKU, bukan kategori atau deskripsi. Barang bertipe **Aset** atau **Layanan** juga tidak pernah tampil di sini. Ketik potongan yang tepat.
- Barang tampil satu baris dengan teks `Belum ada stok di lokasi mana pun.`: barang itu belum pernah masuk ke lokasi mana pun. Catat penerimaannya dengan **Terima Barang** di Stok ([bagian 6.5](/docs/guides/web/inventory/stock/)).
- **Tersedia** lebih kecil dari **Jumlah**: selisihnya adalah jumlah **Dicadangkan**, misalnya oleh permintaan barang yang sudah disetujui.
