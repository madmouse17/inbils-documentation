---
title: "7.11 Metrik Konsolidasi"
description: "Metrik Konsolidasi membandingkan Metrik Bisnis milik perusahaan Head dan setiap anak perusahaan aktif, lalu menjumlahkannya."
---

Metrik Konsolidasi membandingkan Metrik Bisnis milik perusahaan Head dan setiap anak perusahaan aktif, lalu menjumlahkannya. Gunakan laporan ini untuk melihat angka per perusahaan dan total grup tanpa berpindah perusahaan satu per satu.

Peran yang dapat memakai: admin. Izin: `report.consolidated.view`. Perusahaan aktif juga harus berupa Head, yaitu perusahaan tanpa induk yang mempunyai anak perusahaan aktif. Menu **Ekspor** memerlukan `report.export`.

## Membuka dan membaca konsolidasi

1. Pastikan perusahaan aktif di sidebar adalah Head, lihat [bagian 1.6](/docs/guides/web/introduction/switch-company/).
2. Di sidebar, buka **Keuangan & Laporan**, lalu klik **Metrik Konsolidasi**. Anda juga dapat membuka **Laporan** lalu klik tautan **Metrik Konsolidasi**.

   ![Metrik Konsolidasi dengan filter Periode, tabel Angka per perusahaan, dan baris Total konsolidasi](~/assets/guide/web/reports-consolidated.webp)

3. Baca subtitle. Layar menulis nama Head, jumlah anak perusahaan, dan mata uang yang dipakai, misalnya "Metrik bisnis gabungan &lt;nama Head&gt; dan 1 anak perusahaan. Nilai dalam IDR." Header menampilkan **Versi rumus business.v1**.
4. Isi **Periode** seperti pada Kinerja Teknisi ([bagian 7.9](/docs/guides/web/finance-and-reports/technician-performance/)), lalu klik **Tampilkan**. Baris keterangan di bawah filter menulis rentang yang berlaku, atau "Periode: semua waktu. Pilih rentang tanggal untuk membatasi periode." bila kosong. Teks di bawahnya menjelaskan bahwa laporan mencakup Head dan anak perusahaan aktif, dan setiap perusahaan memakai hari kalender dalam zona waktunya sendiri.
5. Baca bagian **Angka per perusahaan**:
   - Kolom **Perusahaan** memuat nama, kode dan zona waktu, dan lencana **Induk** pada perusahaan Head.
   - Kolom **MRR**, **Pendapatan terbayar**, **Piutang**, **Langganan aktif**, **Langganan ditangguhkan**, dan **Kepatuhan SLA** memakai definisi Metrik Bisnis ([bagian 7.4](/docs/guides/web/finance-and-reports/business-metrics/)). Sel Kepatuhan SLA juga menulis "n dari m tepat waktu".
   - Setiap perusahaan mempunyai satu baris. Baris **Total konsolidasi** berada paling bawah.
   - Pada layar yang lebih sempit dari 1200 piksel, tabel berubah menjadi kartu per perusahaan dengan angka yang sama, dan kartu **Total konsolidasi** di akhir.
6. Baca catatan SLA di bawah tabel. Kepatuhan SLA konsolidasi menggabungkan seluruh tiket tepat waktu lalu membaginya dengan seluruh tiket selesai. Inbils tidak merata-ratakan persentase perusahaan.
7. Baca bagian **Cara menghitung setiap angka** untuk definisi enam kolom. Klik **Rumus dan sumber data** pada satu angka untuk melihat rumus dan sumbernya.
8. Klik **Ekspor**, lalu **Ekspor CSV**. Menu ini hanya menawarkan CSV. File memuat seluruh metrik Metrik Bisnis per perusahaan, disusul baris Total konsolidasi, dengan kolom Perusahaan, Metrik, Rincian, Nilai, Satuan, Cakupan, Filter, dan Versi.

## Kesalahan umum

- Menu tidak ada: perusahaan aktif bukan Head, tidak mempunyai anak perusahaan aktif, atau akun tidak memegang `report.consolidated.view`.
- Pindah ke anak perusahaan menyembunyikan menu. Bila akun Anda memegang `report.consolidated.view` dan Anda membuka alamat Metrik Konsolidasi dari anak perusahaan, Inbils membuka halaman **Laporan** dengan peringatan "Metrik Konsolidasi hanya tersedia di perusahaan induk {nama}. Ganti perusahaan lewat pemilih di menu samping." dan kartu "Metrik Konsolidasi ada di perusahaan induk {nama}." Klik **Pindah ke {nama}** di kartu itu untuk berpindah ke induk, sama seperti lewat pemilih perusahaan di sidebar ([bagian 1.6](/docs/guides/web/introduction/switch-company/)). Tombol itu tidak tampil bila akun Anda tidak boleh berpindah ke induk. Tanpa izin laporan itu, alamat langsung ditolak dengan halaman **Akses ditolak**.
- Kepatuhan SLA ditulis dengan koma desimal, misalnya `63,6%`, seperti di Kepatuhan SLA dan Kinerja Teknisi.
- Bila mata uang perusahaan berbeda, layar menampilkan peringatan **Perusahaan ini tidak bisa dikonsolidasikan** dengan pesan "Laporan konsolidasi ditolak: perusahaan yang dipilih memakai mata uang berbeda" diikuti daftar mata uangnya. Samakan mata uang perusahaan sebelum menjumlahkan nilai uang. Bila akun Anda boleh membuka Metrik Bisnis, peringatan memuat tautan **Metrik Bisnis** untuk melihat angka tiap perusahaan. Menu **Ekspor** tidak muncul selama peringatan tampil.
- **MRR**, **Piutang**, langganan, dan Kepatuhan SLA merupakan posisi saat ini. **Periode** terutama mengubah Pendapatan terbayar dan metrik periode lain di file ekspor.
- Setiap perusahaan membaca batas hari dalam zona waktunya sendiri. Catatan dekat tengah malam dapat masuk ke hari berbeda pada dua perusahaan.
- Laporan tidak mempunyai tautan **Lihat data**. Buka Metrik Bisnis setelah berpindah ke perusahaan yang ingin diperiksa.
- **Tanggal akhir tidak boleh sebelum tanggal mulai.** muncul di bawah **Periode** bila rentang terbalik.
