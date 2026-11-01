---
title: "7.9 Kinerja Teknisi"
description: "Kinerja Teknisi menampilkan hasil satu teknisi: SPK selesai, tiket diselesaikan, kepatuhan SLA, rata-rata skor evaluasi, rata-rata respons pertama, dan beban"
---

Kinerja Teknisi menampilkan hasil satu teknisi: SPK selesai, tiket diselesaikan, kepatuhan SLA, rata-rata skor evaluasi, rata-rata respons pertama, dan beban kerja aktif. Tanpa teknisi terpilih, layar menampilkan peringkat semua teknisi dalam satu tabel. Pilih satu teknisi untuk membaca rinciannya.

Peran yang dapat memakai di web: admin dengan `report.manage`, atau manajer dengan `report.technician`, profil karyawan aktif, dan penempatan pada organisasi aktif. Admin dapat memilih semua teknisi aktif pada perusahaan. Manajer hanya dapat memilih teknisi di unitnya dan unit di bawahnya. Aturan server juga mengizinkan peran teknisi dengan `report.technician` melihat dirinya sendiri, tetapi akun teknisi diarahkan ke aplikasi Android.

## Memilih teknisi dan membaca hasil

1. Di sidebar, buka **Keuangan & Laporan**, lalu klik **Kinerja Teknisi**. Anda juga dapat membuka **Laporan** lalu klik tautan **Kinerja Teknisi**.

   ![Halaman Kinerja Teknisi dengan pemilih Teknisi, isian Periode, tombol Tampilkan, dan tabel Peringkat teknisi](~/assets/guide/web/reports-technician.webp)

2. Pada **Teknisi** (opsional, petunjuk **Semua teknisi**), ketik minimal 2 huruf nama atau email teknisi, tunggu daftar muncul, lalu pilih satu. Kotak ini hanya mencari, jadi tidak ada daftar sebelum Anda mengetik. Daftar memuat paling banyak 20 hasil dan hanya berisi pengguna aktif dengan peran teknisi dan profil karyawan aktif pada perusahaan. Pilihan tetap sampai Anda memilih teknisi lain atau mengklik tombol **Hapus pilihan: Teknisi**.
3. Isi **Periode** bila perlu. Ketik rentang dengan format tanggal perusahaan, atau klik **Buka kalender**, pilih tanggal mulai lalu tanggal akhir, atau pakai pilihan cepat (**Hari ini**, **7 hari terakhir**, **30 hari terakhir**, **Bulan ini**, **Bulan lalu**, **Tahun ini**). Klik **Hapus rentang tanggal** untuk mengosongkan. Isian kosong (**Semua tanggal**) berarti tanpa batas.
4. Klik **Tampilkan**. Tombol aktif juga tanpa teknisi: dalam keadaan itu periode saja yang dipakai dan tabel **Peringkat teknisi** menjawabnya.
5. Tanpa teknisi terpilih, baca tabel **Peringkat teknisi**: "Menurut jumlah SPK dan tiket yang selesai pada periode. Pilih satu teknisi untuk melihat rinciannya." Tabel memuat semua teknisi dalam cakupan akun Anda, dengan kolom **Peringkat**, **Teknisi** (tautan), **SPK selesai**, **Tiket diselesaikan**, **Kepatuhan SLA**, **Respons pertama**, **Skor evaluasi**, dan **Beban aktif**. Urutannya menurut jumlah SPK selesai ditambah tiket diselesaikan, yang terbanyak di atas. Teknisi dengan jumlah sama berbagi peringkat dan diurutkan menurut nama. Klik nama teknisi untuk membuka rinciannya dengan periode yang sama. Teknisi tanpa tiket diselesaikan tidak punya **Kepatuhan SLA**, dan ditulis **-**. **Respons pertama** ditulis misalnya `2 jam 15 menit`. Bila akun Anda tidak punya teknisi dalam cakupan, layar menulis "Tidak ada teknisi yang bisa dipilih."
6. Dengan teknisi terpilih, baca enam kartu. Setiap angka ditulis bersama satuannya (`SPK`, `tiket`, `dari 5`, `pekerjaan`) dan persentase memakai koma desimal, misalnya `63,6%`:
   - **SPK selesai** menghitung SPK berstatus Selesai yang ditugaskan kepada teknisi dan selesai dalam **Periode**.
   - **Tiket diselesaikan** menghitung tiket berstatus Diselesaikan atau Ditutup yang ditugaskan kepada teknisi dan mempunyai waktu selesai dalam **Periode**.
   - **Kepatuhan SLA** adalah persentase Tiket diselesaikan yang selesai paling lambat pada batas SLA. Tiket tanpa batas SLA tetap dihitung, tetapi tidak pernah dianggap sesuai SLA.
   - **Rata-rata skor evaluasi** adalah rata-rata skor pada Evaluasi ([bagian 3.5](/docs/guides/web/operations/evaluations/)) yang tanggal evaluasinya jatuh dalam **Periode**.
   - **Rata-rata respons pertama** adalah rata-rata waktu dari pembuatan tiket sampai respons pertama, untuk Tiket diselesaikan yang mempunyai respons pertama. Ditulis dalam jam dan menit, misalnya `45 menit` atau `2 jam 15 menit`.
   - **Beban kerja aktif** menghitung SPK berstatus Ditugaskan atau Dikerjakan, ditambah tiket berstatus Terbuka, Ditugaskan, atau Dikerjakan yang saat ini ditugaskan kepada teknisi.
7. Klik **Lihat data** di bawah kartu untuk membuka daftar sumber ([bagian 7.3](/docs/guides/web/finance-and-reports/reports/)). Tautan hanya muncul bila akun Anda boleh membuka modul sumbernya. Kartu **Beban kerja aktif** mempunyai dua tautan: **Lihat SPK** untuk SPK dan **Lihat tiket** untuk tiket.
8. Baca tiga grafik:
   - **SPK selesai per hari**, **SPK selesai per minggu**, atau **SPK selesai per bulan** menampilkan SPK selesai sepanjang **Periode**. Satuan mengikuti panjang periode. Satuan yang masih berjalan hari ini diberi tulisan "(berjalan)".
   - **SPK selesai menurut jenis** memisahkan Instalasi, Perawatan, Peningkatan layanan, dan Pindah lokasi.
   - **Tiket selesai menurut kategori** membagi Tiket diselesaikan berdasarkan kategori tiket. Grafik batang menampilkan paling banyak 10 baris, sisanya digabung menjadi **Lainnya**.
9. Klik **Ekspor** setelah hasil muncul, lalu pilih **Ekspor CSV** atau **Ekspor PDF**. Menu ini hanya ada bila akun Anda memegang `report.export`. Kolom file adalah Metrik, Rincian, Nilai, Satuan, Cakupan, Filter, dan Versi, dengan nama teknisi di Filter. File juga memuat Rata-rata waktu SPK, Rata-rata waktu tiket, Rata-rata rating pelanggan, SPK per jenis, dan Tiket per kategori yang tidak tampil sebagai kartu. Peringkat tidak ikut diekspor.

## Kesalahan umum

- Menu tidak ada atau halaman menampilkan **Akses ditolak**: manajer tidak memegang `report.technician`, tidak mempunyai profil aktif, atau belum ditempatkan pada organisasi aktif. Perbaiki data pada Karyawan ([bagian 8.3](/docs/guides/web/administration/employees/)) dan Organisasi ([bagian 8.2](/docs/guides/web/administration/organisation/)).
- Teknisi tidak muncul di daftar: akunnya nonaktif, profil karyawannya tidak aktif, perannya bukan teknisi, perusahaannya berbeda, atau posisinya di luar unit manajer. Ketik minimal 2 huruf, karena kotak **Teknisi** menampilkan "Ketik minimal 2 huruf untuk mencari." sebelum itu, dan "Tidak ada hasil." bila tidak ada yang cocok.
- Pesan **Tidak ada teknisi yang bisa dipilih.** muncul bila akun Anda tidak punya teknisi dalam ruang lingkup, atau pencarian terakhir tidak menemukan teknisi. Tanpa teknisi terpilih, halaman menampilkan peringkat, bukan pesan **Pilih teknisi untuk melihat laporan.**, yang tidak dipakai lagi.
- Nilai berupa tanda hubung (-) berarti tidak ada data yang dapat dirata-ratakan pada periode itu. Angka 0 berarti jumlah yang cocok memang nol.
- **Beban kerja aktif** adalah posisi saat ini. Angka ini tidak berubah saat **Periode** diganti.
- **Kepatuhan SLA** di sini hanya memakai tiket berstatus Diselesaikan atau Ditutup milik teknisi. Angkanya dapat berbeda dari Kepatuhan SLA pada [bagian 7.6](/docs/guides/web/finance-and-reports/sla-compliance/).
- **Tanggal akhir tidak boleh sebelum tanggal mulai.** muncul di bawah **Periode** bila rentang terbalik. Ketikan yang bukan tanggal menghasilkan **Format tanggal tidak valid.** dengan contoh format.
