---
title: "6.5 Stok"
description: "Stok menunjukkan jumlah setiap barang di setiap lokasi. Dari sini Anda mencatat barang masuk, memindahkan stok antar lokasi, mengajukan koreksi hasil hitung"
---

Stok menunjukkan jumlah setiap barang di setiap lokasi. Dari sini Anda mencatat barang masuk, memindahkan stok antar lokasi, mengajukan koreksi hasil hitung fisik, dan menyetujui koreksi itu. Buka menu ini untuk mengecek ketersediaan atau mencatat penerimaan.

Peran yang dapat memakai: admin, manajer, staf. Izin: `inventory.view` membuka daftar, `inventory.export` menampilkan **Ekspor**, `inventory.stock.receive` menampilkan **Terima Barang**, `inventory.stock.transfer` menampilkan **Pindahkan stok**, `inventory.stock.adjust.request` menampilkan **Ajukan Penyesuaian**, `inventory.stock.adjust.approve` menampilkan **Setujui** dan **Tolak**. Dengan peran bawaan, admin memegang semuanya, staf memegang `inventory.view`, `inventory.stock.receive`, `inventory.stock.transfer` dan `inventory.stock.adjust.request`, dan manajer memegang `inventory.view`, `inventory.export` dan `inventory.stock.adjust.approve`.

Peran yang tidak memuat `roles.manage` tidak bisa memegang izin menyetujui bersama izin mengajukan, menerima, mengeluarkan atau memindahkan stok (pemisahan tugas). Bila Anda menyimpan peran dengan pasangan itu ([bagian 8.6](/docs/guides/web/administration/roles/)), sistem menolak dengan pesan seperti `Pemisahan tugas (persetujuan penyesuaian stok vs operasi stok): inventory.stock.adjust.approve tidak boleh digabung dengan inventory.stock.adjust.request.` Pemohon juga tidak bisa memutuskan permintaannya sendiri, termasuk admin.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Inventaris**, lalu klik **Stok**.
2. Baca daftar.

   - Satu baris adalah satu barang di satu lokasi. Sistem membuat baris saat operasi stok pertama, misalnya penerimaan, pemindahan masuk atau penyesuaian.
   - Kolom: **Barang** (nama dan SKU), **Lokasi** (kode dan nama lokasi), **Jumlah** (jumlah fisik di lokasi, termasuk yang sudah dicadangkan), **Dicadangkan** (jumlah yang dicadangkan, misalnya oleh permintaan barang yang sudah disetujui) dan **Tersedia** (**Jumlah** dikurangi **Dicadangkan**). **Jumlah** dan **Dicadangkan** bisa diurutkan, dan baris terbaru tampil paling atas.
   - Isian **Cari stok** mencari nama dan SKU barang serta nama dan kode lokasi. Filter **Lokasi** (bila kosong tampil **Semua lokasi**) dan **Barang** (bila kosong tampil **Semua barang**) adalah isian cari: ketik minimal 2 huruf, lalu pilih. Pilihan ditampilkan paling banyak 20, hanya lokasi dan barang aktif, dan pilihan Anda tetap terlihat sampai Anda memilih yang lain atau mengklik **Hapus pilihan: Lokasi** atau **Hapus pilihan: Barang**. Tidak ada tombol **Filter**: daftar dimuat ulang sendiri saat Anda mengetik atau memilih.
   - Tombol **Ekspor** (pemegang `inventory.export`) menawarkan **Ekspor CSV** dan **Ekspor PDF** dari pencarian dan filter yang berlaku. Kolomnya Barang, Lokasi (kode lokasi), Jumlah, Dicadangkan dan Tersedia.
   - Bila tidak ada baris yang cocok, daftar menulis **Tidak ada stok yang cocok** dengan tombol **Reset filter**. Bila belum ada stok sama sekali, daftar menulis **Belum ada stok** dan **Stok muncul setelah barang diterima di sebuah lokasi.**, dengan tombol **Terima Barang** bagi pemegang `inventory.stock.receive`.

   ![Daftar Stok per barang dan lokasi dengan tombol Terima Barang dan Ajukan Penyesuaian](~/assets/guide/web/stocks.webp)

3. Untuk melihat stok rendah, klik kartu **Stok di bawah minimum** di Dasbor ([bab 2](/docs/guides/web/dashboard/queue-cards/)).

   - Halaman Stok terbuka dengan filter stok rendah: hanya baris yang nilai **Jumlah**-nya sama dengan atau di bawah **Stok Minimum** barang ([bagian 6.2](/docs/guides/web/inventory/items/)).
   - Perbandingan dilakukan per baris (satu lokasi), bukan terhadap total semua lokasi, dan barang nonaktif ikut dihitung.
   - Filter ini tidak punya kotak atau tanda di layar, dan tetap berlaku saat Anda mencari atau mengganti filter lain. Tombol **Reset filter** juga menghapusnya, tetapi tombol itu hanya muncul bila tidak ada baris yang cocok. Buka **Stok** lagi dari sidebar untuk melihat semua baris.

## Menerima barang

Gunakan saat barang masuk ke sebuah lokasi, misalnya dari pembelian.

1. Klik **Terima Barang**. Dialog **Terima Barang** terbuka.

   ![Dialog Terima Barang dengan isian Barang, Lokasi, Jumlah, Pemasok, No. faktur, Harga satuan, dan Catatan](~/assets/guide/web/stocks-receive.webp)

2. Isi form:
   - Pilih **Barang**: ketik minimal 2 huruf nama atau SKU, lalu pilih. Isian ini wajib dan hanya menawarkan barang aktif. Pilihan ditulis SKU, nama, dan satuan dalam kurung, dengan nama kategori di bawahnya.
   - Pilih **Lokasi**: ketik minimal 2 huruf kode atau nama lokasi, lalu pilih. Isian ini wajib dan hanya menawarkan lokasi aktif. Pilihan ditulis kode dan nama, dengan jalur lokasi di bawahnya. Lokasi dibuat di menu Lokasi ([bagian 5.1](/docs/guides/web/network/locations/)).
   - Isi **Jumlah**. Isian ini wajib, harus lebih dari 0, dan nilai awalnya `1`.
   - **Pemasok** opsional, maksimal 150 karakter. Tulis nama pemasok barang.
   - **No. faktur** opsional, maksimal 100 karakter. Tulis nomor faktur atau dokumen penerimaan.
   - **Harga satuan** opsional: harga satu satuan barang dalam rupiah (petunjuk `Rupiah per satuan barang.`), 0 atau lebih, dengan paling banyak dua angka desimal.
   - **Catatan** opsional dan menerima maksimal 500 karakter.
3. Klik **Simpan**, atau **Batal**. Dialog menutup dan muncul toast `Barang berhasil diterima.`

**Jumlah** barang di lokasi itu bertambah sebesar jumlah yang diterima, dan baris stok dibuat bila belum ada. Satu mutasi berjenis **Masuk** tercatat ([bagian 6.7](/docs/guides/web/inventory/stock-movements/)). **Pemasok**, **No. faktur**, dan **Harga satuan** ikut tersimpan pada mutasi itu dan tampil di kolom **Catatan** Mutasi Stok sebagai `Pemasok: ...`, `No. faktur: ...`, dan `Harga satuan: Rp ...`. Ketiganya hanya keterangan penerimaan dan tidak mengubah jumlah stok. Penerimaan berlaku langsung, tanpa persetujuan.

## Mengajukan penyesuaian stok

Gunakan saat hasil hitung fisik berbeda dari angka di sistem. Stok baru berubah setelah pengguna lain menyetujui.

1. Klik **Ajukan Penyesuaian**. Dialog **Ajukan Penyesuaian Stok** terbuka.
2. Isi form:
   - Pilih **Barang** dan **Lokasi**, seperti pada penerimaan. Keduanya wajib.
   - Isi **Jumlah baru (hasil hitung fisik)** dengan angka 0 atau lebih. Isian ini wajib. Isi total hasil hitung, bukan selisihnya.
   - Isi **Alasan**. Isian ini wajib, maksimal 500 karakter. Alasan ini menjadi catatan mutasi saat permintaan disetujui.
   - Setelah **Barang** dan **Lokasi** terpilih, dialog menulis **Stok sistem: {jumlah} {satuan}**, ditambah `({jumlah} dicadangkan)` bila ada cadangan. Bandingkan angka itu dengan hasil hitung Anda sebelum mengisi **Jumlah baru (hasil hitung fisik)**. Saat angka dimuat, dialog menulis `Memuat stok...`.
3. Klik **Ajukan**, atau **Batal**. Dialog menutup dan muncul toast `Permintaan penyesuaian stok diajukan dan menunggu persetujuan.` Stok belum berubah, dan permintaan muncul di panel **Penyesuaian stok menunggu persetujuan** di atas daftar.

## Menyetujui atau menolak penyesuaian

Panel **Penyesuaian stok menunggu persetujuan** muncul bila ada permintaan yang menunggu, dengan keterangan bahwa perubahan stok baru berlaku setelah disetujui orang lain, bukan pemohon. Pemohon hanya melihat permintaannya sendiri, sedangkan pemegang `inventory.stock.adjust.approve` melihat semuanya (paling banyak 50, yang terlama di atas). Kolomnya **Barang**, **Lokasi**, **Stok** (jumlah saat diajukan, tanda panah, dan jumlah baru), **Selisih** (jumlah baru dikurangi jumlah saat diajukan, bertanda plus atau minus), **Alasan**, **Pemohon**, **Status** (lencana **Menunggu**) dan **Aksi**.

1. Pada baris permintaan, klik **Setujui** atau **Tolak**. Kedua tombol hanya muncul bagi pemegang `inventory.stock.adjust.approve` yang bukan pemohon. Bagi pengguna lain, kolom **Aksi** berisi tanda hubung.
2. Untuk menyetujui, periksa barang, lokasi, jumlah, dan alasan pemohon di dialog **Setujui Penyesuaian Stok**, lalu klik **Setujui**. Muncul toast `Penyesuaian stok disetujui.`
3. Untuk menolak, isi **Alasan penolakan** di dialog **Tolak Penyesuaian Stok** (wajib, 3 sampai 500 karakter), lalu klik **Tolak**. Muncul toast `Penyesuaian stok ditolak.`

Saat disetujui, stok langsung diatur ke **Jumlah baru** dan satu mutasi berjenis **Penyesuaian** tercatat dengan **Alasan** sebagai catatan. Selisih pada mutasi dihitung dari stok yang tercatat saat pengajuan, dan persetujuan hanya berjalan bila stok saat itu masih sama dengan angka tersebut. Bila stok sudah berubah, persetujuan ditolak (lihat **Kesalahan umum** di bawah). Saat ditolak, stok tidak berubah.

Sistem tidak mengirim notifikasi untuk pengajuan, persetujuan maupun penolakan. Permintaan yang sudah diputuskan hilang dari panel, dan alasan penolakan tercatat di audit trail ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)), bukan di halaman Stok. Beri tahu pemohon secara langsung.

## Memindahkan stok

Izin: `inventory.stock.transfer`. Gunakan saat barang berpindah dari satu lokasi ke lokasi lain, misalnya dari gudang pusat ke gudang cabang. Pemindahan berlaku langsung, tanpa persetujuan.

1. Klik **Pindahkan stok** di kanan atas halaman Stok. Dialog **Pindahkan stok** terbuka.

   ![Dialog Pindahkan stok dengan isian Dari, Ke, Barang, Jumlah, dan Catatan](~/assets/guide/web/stocks-transfer.webp)

2. Isi form:
   - Pilih **Dari**: lokasi asal. Ketik minimal 2 huruf kode atau nama lokasi, lalu pilih. Isian ini wajib.
   - Pilih **Ke**: lokasi tujuan, dengan cara yang sama. Isian ini wajib dan harus berbeda dari **Dari**.
   - Pilih **Barang**: ketik minimal 2 huruf nama atau SKU, lalu pilih. Isian ini wajib.
   - Setelah **Barang** dan **Dari** terpilih, dialog menulis **Tersedia di lokasi asal: {jumlah} {satuan}**. Jumlah yang Anda pindahkan tidak boleh melebihi angka ini.
   - Isi **Jumlah**. Isian ini wajib dan harus lebih dari 0.
   - **Catatan** opsional dan menerima maksimal 500 karakter.
3. Klik **Pindahkan**, atau **Batal**. Dialog menutup dan muncul toast `Stok berhasil ditransfer.`

Stok di lokasi asal berkurang dan stok di lokasi tujuan bertambah sebesar jumlah yang sama. Mutasi Stok mencatat dua baris berjenis **Transfer** ([bagian 6.7](/docs/guides/web/inventory/stock-movements/)).

## Pengeluaran dan penyesuaian langsung

Izin untuk dua operasi ini ada, tetapi halaman Stok tidak menyediakan tombolnya:

- Pengeluaran (`inventory.stock.issue`, dipegang admin, staf, dan teknisi) memerlukan barang, lokasi, jumlah lebih dari 0 dan catatan opsional. Stok tidak boleh berkurang melebihi **Tersedia**. Pada web, stok keluar lewat Permintaan Barang saat barang diserahkan ([bagian 6.1](/docs/guides/web/inventory/item-requests/)), dan lewat SPK saat SPK disetujui dan menjadi `completed` ([bagian 3.3](/docs/guides/web/operations/work-orders/)).
- Penyesuaian langsung atau break-glass (`inventory.stock.adjust`, hanya admin) memakai barang, lokasi, jumlah baru 0 atau lebih dan alasan wajib. Perubahan berlaku langsung dan audit memberi penanda `break_glass`, tetapi tidak ada tombolnya. Koreksi stok dari layar selalu lewat pengajuan dan persetujuan di atas.

## Kesalahan umum

- Dialog **Terima Barang** menolak dengan `Barang, lokasi, dan jumlah (lebih dari 0) wajib diisi.`: pilih barang dan lokasi, lalu isi jumlah lebih dari 0.
- Barang tidak ada di pilihan **Barang**: barang itu **Nonaktif**, atau Anda belum mengetik minimal 2 huruf (isian menulis **Ketik minimal 2 huruf untuk mencari.**). Aktifkan di menu Barang ([bagian 6.2](/docs/guides/web/inventory/items/)). Untuk melihat stok barang nonaktif, pakai kotak **Cari stok**. Lokasi yang tidak aktif juga tidak ditawarkan ([bagian 5.1](/docs/guides/web/network/locations/)).
- Tombol **Terima Barang** atau **Ajukan Penyesuaian** tidak ada: peran Anda tidak memegang izinnya. Manajer sengaja tidak memegangnya karena pemisahan tugas. Minta admin mengatur peran ([bagian 8.6](/docs/guides/web/administration/roles/) dan [8.7](/docs/guides/web/administration/permissions/)).
- Tombol **Setujui** dan **Tolak** tidak ada pada permintaan Anda sendiri: pemohon tidak boleh memutuskan permintaannya, termasuk admin. Minta pengguna lain yang memegang `inventory.stock.adjust.approve`.
- Dialog keputusan menampilkan `Permintaan penyesuaian stok tidak dapat disetujui karena status telah berubah atau Anda tidak berwenang.` (atau `... tidak dapat ditolak ...`): pengguna lain sudah memutuskan lebih dulu, atau izin Anda berubah. Tutup dialog dan muat ulang halaman.
- Toast merah `Stok berubah sejak dihitung; hitung ulang.` saat **Setujui**: stok barang itu di lokasi tersebut berubah (barang masuk, keluar, atau penyesuaian lain) antara pengajuan dan persetujuan. Stok tidak berubah dan permintaan tetap menunggu. Minta penyetuju menolaknya, lalu ajukan ulang dengan hasil hitung yang baru. Penyesuaian langsung oleh admin tidak melalui pemeriksaan ini.
- **Jumlah baru (hasil hitung fisik)** salah isi: angka ini adalah total hasil hitung fisik, bukan selisih, dan tidak boleh negatif. Pemohon tidak bisa mengubah atau membatalkan permintaan yang sudah diajukan. Minta penyetuju menolaknya, lalu ajukan ulang.
- Persetujuan penyesuaian gagal dengan pesan `Stok {barang} di {lokasi} tidak bisa diturunkan ke {jumlah} {satuan}, karena {jumlah} {satuan} sudah dicadangkan.` bila **Jumlah baru** lebih kecil dari jumlah **Dicadangkan**. Tolak permintaan, tunggu reservasi selesai, lalu ajukan ulang.
- Dialog **Pindahkan stok** menolak dengan `Dari, ke, barang, dan jumlah (lebih dari 0) wajib diisi.` bila ada isian kosong, dan dengan `Lokasi tujuan harus berbeda dari lokasi asal.` bila **Dari** sama dengan **Ke**. Bila jumlah melebihi **Tersedia** di lokasi asal, pesannya `Stok {barang} di {lokasi} tidak cukup: tersedia {jumlah} {satuan}, diminta {jumlah} {satuan}.` Pilih dua lokasi berbeda dan kurangi jumlah.
- Tombol **Pindahkan stok** tidak ada: peran Anda tidak memegang `inventory.stock.transfer`. Minta admin mengatur peran ([bagian 8.6](/docs/guides/web/administration/roles/) dan [8.7](/docs/guides/web/administration/permissions/)).
