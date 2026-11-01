---
title: "6.7 Mutasi Stok"
description: "Mutasi Stok adalah riwayat semua perubahan stok: barang masuk, keluar, koreksi dan pencadangan."
---

Mutasi Stok adalah riwayat semua perubahan stok: barang masuk, keluar, koreksi dan pencadangan. Buka menu ini untuk menelusuri kenapa jumlah stok sebuah barang berubah. Layar ini hanya untuk dibaca, dan mutasi yang sudah tercatat tidak bisa diubah atau dihapus oleh siapa pun.

Peran yang dapat memakai: admin, manajer, staf. Izin: `inventory.view` (Lihat barang) membuka daftar, dan `inventory.export` (Ekspor barang) menampilkan **Ekspor**. Dengan peran bawaan, admin dan manajer bisa mengekspor, staf tidak.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Inventaris**, lalu klik **Mutasi Stok**.
2. Baca daftar.

   - Kolom: **Jenis** (lencana berwarna), **Barang** (nama dengan SKU di bawahnya), **Jumlah** (bertanda minus bila stok berkurang), **Saldo setelah** (stok fisik barang di lokasi itu sesudah mutasi), **Dari**, **Ke**, **Oleh** (pengguna yang mencatat mutasi), **Catatan** dan **Waktu** (tanggal dan jam dalam format perusahaan). **Jenis**, **Jumlah** dan **Waktu** bisa diurutkan, dan mutasi terbaru tampil paling atas. Sel kosong tampil sebagai tanda hubung (`-`). Mutasi yang dibuat otomatis oleh sistem bisa kosong di kolom **Oleh**. Pada mutasi **Masuk** yang mencatat **Pemasok**, **No. faktur**, atau **Harga satuan** ([bagian 6.5](/docs/guides/web/inventory/stock/)), ketiganya tampil di bawah catatan, sebagai `Pemasok: ...`, `No. faktur: ...`, dan `Harga satuan: Rp ...`.
   - Kolom **Cari mutasi** (petunjuk `Barang, SKU, lokasi, atau catatan`) mencari nama atau SKU barang, nama atau kode lokasi asal dan tujuan, catatan, dan kode jenis mutasi dalam bahasa Inggris (misalnya `receive`, bukan label **Masuk**). Daftar dimuat ulang sendiri sebentar setelah Anda berhenti mengetik.
   - Filter **Jenis** berisi **Semua jenis** dan tujuh jenis mutasi: **Masuk**, **Keluar**, **Transfer**, **Penyesuaian**, **Dicadangkan**, **Cadangan dilepas** dan **Pengembalian**.
   - Filter **Barang** (petunjuk `Semua barang`) dan **Lokasi** (petunjuk `Semua lokasi`) adalah kotak pilih dengan pencarian: ketik untuk mencari, lalu pilih. Ketik sedikitnya 2 huruf. Daftar menampilkan paling banyak 20 hasil dari barang aktif atau lokasi aktif, berbentuk `SKU - nama (satuan)` dan `kode - nama`. Pilihan tetap tampil selama Anda mengetik dan baru berganti saat Anda memilih yang lain atau mengklik **Hapus pilihan**. Filter **Lokasi** cocok dengan mutasi yang lokasi **Dari** atau lokasi **Ke**-nya adalah lokasi itu.
   - Semua filter berlaku langsung tanpa tombol. Tidak ada filter tanggal. Untuk rentang tanggal dan saldo di awal dan akhir periode, pakai laporan Kartu Stok ([bagian 7.7](/docs/guides/web/finance-and-reports/stock-card/)).
   - Menu **Ekspor** (pemegang `inventory.export`) berisi **Ekspor CSV** dan **Ekspor PDF** dari pencarian dan filter yang berlaku. Kolomnya Jenis, Barang, Dari, Ke, Jumlah, Saldo, Catatan dan Tanggal. Kolom **Oleh** dan keterangan penerimaan tidak ikut diekspor. Format file dibahas di [bagian 7.3](/docs/guides/web/finance-and-reports/reports/).
   - Tombol **Stok** membuka halaman Stok ([bagian 6.5](/docs/guides/web/inventory/stock/)).

   ![Daftar Mutasi Stok dengan kolom Cari mutasi, filter Jenis, Barang dan Lokasi, menu Ekspor, dan tabel mutasi](~/assets/guide/web/stock-movements.webp)

3. Untuk melihat satu barang, buka rincian barang di menu Barang ([bagian 6.2](/docs/guides/web/inventory/items/)). Kartu **Mutasi Terbaru** di sana memuat mutasi barang itu, yang terbaru di atas. Klik **Lihat semua mutasi**. Mutasi Stok terbuka dengan filter **Barang** sudah terisi barang itu. Klik **Hapus pilihan** pada filter **Barang** untuk melihat semua barang lagi.
4. Bila tidak ada baris, tabel menampilkan `Belum ada mutasi stok` (belum ada mutasi sama sekali) atau `Tidak ada mutasi yang cocok` dengan tombol **Reset filter** (pencarian atau filter terlalu sempit).

## Jenis mutasi

Kolom **Jenis** menampilkan salah satu dari tujuh label ini.

| Jenis | Arti | Jumlah | Dari dan Ke |
|---|---|---|---|
| **Masuk** | Barang masuk ke lokasi dari **Terima Barang** (pembelian atau penerimaan lain) | Plus | Hanya **Ke** terisi |
| **Keluar** | Barang keluar dari lokasi, saat permintaan barang diserahkan atau SPK disetujui | Minus | Hanya **Dari** terisi |
| **Transfer** | Pemindahan antar lokasi, tercatat dua baris: keluar dari lokasi asal, masuk ke lokasi tujuan | Minus pada baris asal, plus pada baris tujuan | **Dari** pada baris keluar, **Ke** pada baris masuk |
| **Penyesuaian** | Koreksi stok ke hasil hitung fisik yang sudah disetujui | Selisih, plus atau minus | **Dari** dan **Ke** sama |
| **Dicadangkan** | Stok dicadangkan untuk permintaan barang yang disetujui, jumlah fisik tidak berubah | Plus | Hanya **Ke** terisi |
| **Cadangan dilepas** | Cadangan dilepas, jumlah fisik tidak berubah | Minus | Hanya **Ke** terisi |
| **Pengembalian** | Barang kembali ke lokasi, dari penerimaan fisik retur material ([bagian 6.8](/docs/guides/web/inventory/material-returns/)) | Plus | Hanya **Ke** terisi |

Satu permintaan barang meninggalkan jejak berurutan: **Dicadangkan** saat disetujui, lalu **Cadangan dilepas** dan **Keluar** saat barang diserahkan. SPK tidak membuat mutasi **Dicadangkan** atau **Cadangan dilepas**. Catatan mutasi memuat kode sumbernya: `Penyerahan Permintaan Barang: <kode>` untuk serah terima, `SPK <kode>` untuk pemakaian pada SPK (dengan tambahan `(partial IR covered <jumlah>)` bila sebagian jumlahnya sudah keluar lewat permintaan barang), dan `Penerimaan Fisik Pengembalian Material: <kode permintaan>` untuk retur material yang diterima (kode permintaan barang asalnya; tanpa permintaan asal, catatan hanya `Penerimaan Fisik Pengembalian Material`). Cari kode itu di kolom **Cari mutasi** untuk menelusuri satu permintaan atau SPK.

Penerimaan fisik retur material tercatat sebagai **Pengembalian**, bukan **Masuk**, jadi barang yang pulang dari lapangan terpisah dari barang yang dibeli. Mutasi penerimaan retur yang tercatat sebelum perubahan ini tetap berjenis **Masuk**.

## Kesalahan umum

- Mencari mutasi menurut tanggal: layar ini tidak punya filter tanggal. Pakai laporan Kartu Stok ([bagian 7.7](/docs/guides/web/finance-and-reports/stock-card/)), yang punya isian **Periode** dan kolom **Saldo**.
- Mutasi salah catat tidak bisa diubah atau dihapus: koreksi dengan **Ajukan Penyesuaian** di Stok ([bagian 6.5](/docs/guides/web/inventory/stock/)). Setelah disetujui, koreksi itu menambah mutasi **Penyesuaian** baru dan tidak menghapus yang lama.
- Jumlah fisik tidak berubah setelah permintaan barang disetujui: baris **Dicadangkan** hanya menaikkan **Dicadangkan** di Stok. Jumlah fisik berkurang saat barang diserahkan (**Keluar**).
- Daftar hanya berisi satu barang: filter **Barang** terisi, misalnya karena Anda datang dari tautan **Lihat semua mutasi**. Klik **Hapus pilihan** pada filter itu.
- Mengetik **Masuk** di **Cari mutasi** tidak menemukan jenis itu: kolom pencarian membaca kode jenis dalam bahasa Inggris. Pakai filter **Jenis**.
- Menu **Ekspor** tidak ada: peran Anda tidak memegang `inventory.export`, dan staf bawaan tidak memegangnya.
