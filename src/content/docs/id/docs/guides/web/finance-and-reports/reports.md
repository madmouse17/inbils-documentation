---
title: "7.3 Laporan"
description: "Laporan menghitung angka langsung dari riwayat langganan, tagihan, tiket, SPK, aset, stok, dan evaluasi. Semua layar laporan hanya-baca."
---

Laporan menghitung angka langsung dari riwayat langganan, tagihan, tiket, SPK, aset, stok, dan evaluasi. Semua layar laporan hanya-baca. Layar ini tidak menyediakan tombol untuk menambah, mengubah, atau menghapus data sumber.

Peran yang dapat memakai hub: admin, manajer, dan staf dengan izin `report.view`. Setiap laporan tetap memerlukan izin khusus. Angka hanya mencakup perusahaan yang sedang aktif, kecuali Metrik Konsolidasi.

| Laporan di hub | Izin untuk membuka | Peran bawaan |
| --- | --- | --- |
| Metrik Bisnis | `report.business.view` | admin, manajer, staf |
| Pemanfaatan Aset | `report.asset.view` | admin, manajer, staf |
| Kepatuhan SLA | `report.sla.view` | admin, manajer, staf |
| Kartu Stok | `report.stock_card.view` | admin, manajer, staf |
| Kamus Data | `report.dictionary.view` | admin, manajer, staf |
| Kinerja Teknisi | `report.technician` dan aturan akses teknisi | admin, manajer |
| KPI Penjualan | `report.sales.view` | admin, manajer |
| Log Audit | `report.audit.view` | admin |
| Metrik Konsolidasi | `report.consolidated.view` dan perusahaan aktif berupa Head | admin |

Admin dengan `report.manage` dapat memilih teknisi aktif di perusahaan. Manajer harus mempunyai profil karyawan aktif pada unit organisasi aktif. Pilihan teknisinya terbatas pada unit tersebut dan unit di bawahnya. Aturan teknisi untuk melihat dirinya sendiri ada di server, tetapi akun teknisi memakai aplikasi Android, bukan web.

Laporan **Metrik Konsolidasi** hanya muncul saat perusahaan aktif berupa Head, yaitu perusahaan tanpa induk yang mempunyai anak perusahaan aktif. Tombol ekspor memerlukan `report.export` selain izin laporannya. Peran bawaan admin dan manajer memegang izin ekspor, sedangkan staf tidak.

## Membuka daftar laporan

1. Di sidebar, buka grup **Keuangan & Laporan**, lalu klik **Laporan**.
2. Baca daftar yang tampil. Setiap baris memuat judul laporan sebagai tautan dan satu kalimat uraian.

   ![Halaman Laporan dengan judul, subjudul, dan daftar tautan laporan beserta uraian singkatnya](~/assets/guide/web/reports.webp)

3. Klik judul laporan yang diperlukan. Hub hanya menampilkan laporan yang diizinkan untuk akun Anda.
4. **Kinerja Teknisi**, **KPI Penjualan**, dan **Metrik Konsolidasi** juga mempunyai menu sendiri di sidebar. Judul ketiganya di hub sama dengan nama menu itu.

Bila tidak ada laporan yang diizinkan, hub menampilkan **Belum ada laporan yang bisa dibuka** dengan keterangan "Peran Anda belum punya akses laporan. Minta administrator memberi akses." Admin dapat menambah izin lewat Peran ([bagian 8.6](/docs/guides/web/administration/roles/)) dan Hak Akses ([bagian 8.7](/docs/guides/web/administration/permissions/)).

Bila Anda membuka alamat Metrik Konsolidasi saat bekerja di anak perusahaan, hub terbuka dengan kartu yang menunjuk ke perusahaan induk dan tombol **Pindah ke** diikuti nama induk ([bagian 7.11](/docs/guides/web/finance-and-reports/consolidated-metrics/)).

## Memilih Periode

1. Klik isian **Periode** yang mula-mula kosong dan bertuliskan **Semua tanggal**, atau klik tombol **Buka kalender**.
2. Pilih salah satu tombol di grup pilihan cepat: **Hari ini**, **7 hari terakhir**, **30 hari terakhir**, **Bulan ini**, **Bulan lalu**, atau **Tahun ini**. Rentang berjalan seperti **Bulan ini** dan **Tahun ini** berakhir pada hari ini menurut waktu perusahaan. Pilihan cepat langsung mengisi isian dan menutup kalender.
3. Untuk rentang lain, klik tanggal mulai lalu tanggal akhir. Teks di bawah kalender menuntun Anda ("Pilih tanggal mulai, lalu tanggal akhir." dan "Pilih tanggal akhir."). Kalender menutup setelah tanggal akhir dipilih. Kalender menampilkan dua bulan pada layar lebar dan satu bulan pada layar sempit.
4. Anda juga dapat mengetik rentang dalam format tanggal perusahaan. Pisahkan kedua tanggal dengan tanda hubung yang diberi spasi di kedua sisinya. Satu tanggal tanpa pemisah berarti satu hari itu. Tanda hubung di akhir tulisan membiarkan tanggal akhir kosong. Tahun harus memakai empat angka. Tulisan diterima saat Anda menekan Enter atau berpindah dari isian.
5. Klik **Tampilkan**. Log Audit memakai tombol **Terapkan filter**. Pilihan baru belum memengaruhi angka sebelum tombol ini diklik.
6. Untuk kembali ke semua tanggal, klik **Hapus rentang tanggal**, lalu klik **Tampilkan** lagi.

Kedua batas tanggal bersifat inklusif. Untuk kolom waktu, Inbils memakai awal hari tanggal mulai sampai akhir hari tanggal akhir menurut zona waktu perusahaan. Kolom kalender seperti tanggal terbit tagihan dibandingkan sebagai tanggal tanpa konversi zona waktu.

Rentang boleh hanya mempunyai tanggal mulai atau tanggal akhir. Tanggal akhir tidak boleh lebih awal daripada tanggal mulai. Isian menampilkan "Tanggal akhir tidak boleh sebelum tanggal mulai." bila urutannya terbalik. Bila tulisan tidak dapat dibaca, isian menampilkan "Format tanggal tidak valid." disertai contoh tanggal dalam format perusahaan.

Kode tidak membatasi jumlah hari dalam satu rentang. Rentang yang panjang hanya mengubah pengelompokan grafik. Setelah Anda mengklik **Tampilkan**, `date_from` dan `date_to` tersimpan pada URL, sehingga filter pulih saat halaman dimuat ulang atau dibagikan.

## Membaca grafik

Metrik Bisnis, Pemanfaatan Aset, Kepatuhan SLA, Kinerja Teknisi, dan KPI Penjualan memakai grafik berikut:

- Grafik garis menampilkan perubahan menurut waktu.
- Grafik batang membandingkan kategori, lokasi, atau petugas penjualan.
- Diagram donat membagi satu jumlah menurut status atau hasil SLA. Irisan status memakai warna yang sama dengan lencana status di tabel dan daftar.

Grafik waktu memakai kelompok harian untuk rentang sampai 31 hari, mingguan sampai 184 hari, lalu bulanan. Minggu dimulai hari Senin. Tanpa tanggal mulai, grafik memakai kelompok bulanan dari data tertua sampai hari ini, dengan paling banyak 36 kelompok bulan. Bulan yang lebih lama digabung ke kelompok pertama. Tanpa tanggal akhir, grafik berakhir hari ini.

Kelompok waktu yang masih berjalan, yaitu yang memuat hari ini, diberi tulisan **(berjalan)** setelah labelnya. Angka kelompok itu belum lengkap, sehingga angka yang rendah di sana belum tentu penurunan.

Arahkan penunjuk ke titik, batang, atau irisan untuk melihat nama seri dan nilai lengkap. Sumbu dapat menyingkat angka, sedangkan tooltip memakai nilai lengkap. Diagram donat menulis jumlah dan persentase pada legenda.

Grafik batang dan donat tertentu, misalnya **Aset jaringan per lokasi**, menampilkan paling banyak sepuluh baris. Bila datanya lebih banyak, sembilan baris terbesar tampil dan sisanya bergabung sebagai **Lainnya**. Bila seluruh nilainya nol, area grafik menampilkan **Tidak ada data pada periode ini**.

## Membaca angka dan definisinya

Banyak kartu angka mempunyai kalimat definisi, lalu satu baris yang berbunyi **Per periode** atau **Posisi saat ini**, diikuti versi rumus. **Per periode** berarti tanggal sumber harus masuk dalam **Periode**. **Posisi saat ini** berarti angka mencerminkan kondisi saat ini dan mengabaikan **Periode**. Kartu uang pada Metrik Bisnis dan KPI Penjualan menulis angka dalam bentuk singkat, misalnya "Rp 1,2 jt". Arahkan penunjuk ke angka itu untuk melihat jumlah rupiah yang tepat.

Klik **Rumus dan sumber data** untuk membuka rincian **Rumus**, **Satuan**, **Dasar tanggal**, **Status**, **Sumber data**, **Cakupan**, dan **Catatan penting**. Header laporan memuat **Versi rumus** diikuti nomor versi, misalnya `business.v1`. Buka Kamus Data ([bagian 7.8](/docs/guides/web/finance-and-reports/data-dictionary/)) untuk membaca semua definisi pada satu halaman. Kinerja Teknisi tidak menampilkan rincian ini pada kartu, tetapi definisinya tetap ada di Kamus Data.

## Mengekspor laporan

1. Jalankan filter yang diperlukan dengan **Tampilkan**.
2. Klik **Ekspor**. Log Audit memakai tombol **Ekspor log**.
3. Pilih **Ekspor CSV** atau **Ekspor PDF**. Menu ekspor laporan hanya menawarkan kedua format ini.

Ekspor ringkasan memakai kolom Metrik, Rincian, Nilai, Satuan, Cakupan, Filter, dan Versi. Rincian dan Satuan memakai kata yang sama seperti di layar: status aset dan jenis SPK dalam label (misalnya `Tersedia`, `Instalasi`), prioritas dalam label (`Mendesak`), teknisi dengan nama, dan satuan `Rupiah`, `Jumlah`, `Persen`, `Menit`, `Nilai (1-5)`, `Kuantitas`, `Rincian`, atau `Baris`. Kolom Filter menulis nama, bukan ID, misalnya `Teknisi: Budi Santoso` atau `Kategori: Internet mati`. Kolom Cakupan menyebut apakah angka berlaku untuk periode atau posisi saat ini. Pada daftar di balik angka, status, jenis tagihan atau SPK, dan jenis aset juga ditulis dalam label. Kartu Stok dan Log Audit mengekspor seluruh baris yang cocok dengan filter, bukan hanya halaman tabel yang sedang terlihat.

CSV tetap menyimpan angka mentah supaya bisa dihitung di spreadsheet: uang tanpa tulisan Rp, tanggal dan jam apa adanya, dan durasi dalam menit. PDF ditulis untuk dibaca orang. Semua ekspor PDF di Inbils, termasuk Tagihan, Tunggakan, Stok, dan Mutasi Stok, memakai tata letak yang sama di kertas A4 lanskap:

- Kop berisi logo perusahaan (bila ada), nama perusahaan, dan di kanan atas `Dicetak {tanggal dan jam} oleh {nama pengguna}` menurut jam dan format tanggal perusahaan.
- Di bawah kop: judul laporan, `Periode:` (dalam format tanggal perusahaan), `Filter:` (satu frasa per filter, dipisah titik koma), dan `Baris:` jumlah baris. Periode dan Filter hanya tampil bila ekspornya memilikinya.
- Kolom angka rata kanan dan ditulis seperti di layar: uang `Rp 1.250.000`, tanggal `18 Okt 2026`, durasi `2 j 15 m`, persen `63,6%`, angka dengan koma desimal.
- Setiap halaman diberi `Halaman 2 dari 5` di kanan bawah.

KPI Penjualan dan Kamus Data tidak menyediakan ekspor. Metrik Konsolidasi hanya menyediakan CSV. Ekspor baris (Kartu Stok, Log Audit, dan daftar di balik angka) dibatasi 5.000 baris. Pada CSV yang terpotong, baris terakhir berbunyi "# Ekspor dipotong pada 5000 baris. Persempit filter untuk mengekspor sisa barisnya." PDF memuat lebih sedikit baris: batasnya 1.500 sel dibagi jumlah kolom, jadi tabel yang lebar terpotong lebih awal, dan di bawah judul PDF tertulis "PDF dibatasi N baris. Untuk data lengkap, unduh CSV atau persempit periode." Batas ini dijelaskan juga di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).

## Melihat data di balik angka

1. Klik **Lihat data** di bawah angka atau baris rincian. Tautan hanya muncul bila akun Anda juga boleh membuka modul sumber.
2. Baca kartu **Kecocokan dengan laporan**. Kartu ini membandingkan jumlah baris atau penjumlahan baris dengan angka pada laporan. Kartu ini menampilkan **Baris ditampilkan**, penjumlahan kolom bila angkanya berupa uang (ditulis dengan nama kolomnya, misalnya `Σ MRC`, dan untuk piutang total dikurangi terbayar), **Tepat waktu** bila angkanya persentase, dan **Angka di** diikuti judul laporan.
3. Baca lencana hasil:
   - **Cocok** berarti baris sama dengan angka laporan.
   - **Berbeda** berarti daftar dan angka laporan berbeda.
   - **Tidak bisa dicocokkan per baris** muncul untuk rata-rata atau daftar yang dibatasi oleh akses pengguna.
4. Klik nilai pada kolom pertama untuk membuka catatan sumber, misalnya tagihan, tiket, SPK, langganan, aset, atau evaluasi.
5. Pakai tombol **Kembali ke** yang diikuti judul laporan untuk kembali. Menu **Ekspor** pada halaman ini mengunduh daftar sumber sebagai CSV atau PDF. Menu ini muncul bila akun Anda memegang `report.export`.

Tautan sumber memerlukan izin modul terkait: `customer.subscription.view`, `billing.view`, `ticket.view`, `spk.view`, `network_asset.view`, atau `evaluation.view` maupun `evaluation.view.own`. Pengguna yang boleh mengerjakan tiket atau SPK tetapi tidak boleh menugaskannya hanya melihat baris yang ditugaskan kepadanya. Halaman daftar menyatakannya dengan "Anda hanya melihat baris yang ditugaskan kepada Anda, jadi ini sebagian dari angka."

Daftar di balik **Piutang** dapat menampilkan kartu **Rekonsiliasi** dan tombol **Buka Tunggakan**. Kartu ini memperlihatkan selisih terhadap Tunggakan karena kedua layar mempunyai aturan penyertaan sendiri. Kartu ini tidak muncul bila **Kategori paket** dipilih atau akun Anda tidak boleh membuka daftar tagihan.

## Kesalahan umum

- Laporan tidak ada di hub: peran Anda tidak memegang izin laporan itu. Minta admin memeriksa Peran dan Hak Akses.
- Tombol **Ekspor** tidak ada: akun tidak memegang `report.export`, laporan memang tidak mendukung ekspor, atau Kartu Stok belum menerapkan barang.
- Tautan **Lihat data** tidak ada: akun boleh melihat angka agregat tetapi tidak boleh membuka daftar sumbernya.
- Angka tidak berubah setelah memilih tanggal: klik **Tampilkan** atau **Terapkan filter**. Ekspor dan daftar di balik angka memakai filter yang sudah diterapkan.
- Angka **Posisi saat ini** tidak berubah saat **Periode** berganti. Ini perilaku rumus, bukan kegagalan filter.
- Angka berubah setelah ganti perusahaan: semua laporan biasa mengikuti perusahaan aktif. Periksa pemilih perusahaan di sidebar, lihat [bagian 1.6](/docs/guides/web/introduction/switch-company/).
