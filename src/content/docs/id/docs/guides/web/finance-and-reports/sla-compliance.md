---
title: "7.6 Kepatuhan SLA"
description: "Kepatuhan SLA menghitung tiket selesai, tiket yang memenuhi batas SLA, pelanggaran, kecepatan respons pertama, waktu penyelesaian, rincian per kategori"
---

Kepatuhan SLA menghitung tiket selesai, tiket yang memenuhi batas SLA, pelanggaran, kecepatan respons pertama, waktu penyelesaian, rincian per kategori, teknisi, prioritas, dan sumber target, serta penilaian pelanggan. Data sumbernya berasal dari Tiket ([bagian 3.4](/docs/guides/web/operations/tickets/)).

Peran yang dapat memakai: admin, manajer, staf. Izin: `report.sla.view`. Tombol **Ekspor** memerlukan `report.export`.

## Membuka dan membaca laporan

1. Buka **Laporan**, lalu klik **Kepatuhan SLA**. Laporan langsung tampil untuk semua tanggal.
2. Pilih **Periode**, lalu klik **Tampilkan**. Layar tidak mempunyai filter tambahan. Header menampilkan **Versi rumus** `sla.v1`.

   ![Halaman Kepatuhan SLA dengan kartu angka, tabel per kategori, teknisi, prioritas, dan sumber target, serta tabel Pelanggaran terlama](~/assets/guide/web/reports-sla.webp)

3. Baca enam kartu:
   - **Tiket selesai** menghitung tiket yang mempunyai waktu selesai dalam **Periode**, apa pun statusnya saat ini.
   - **Tingkat kepatuhan SLA** adalah persentase tiket selesai yang selesai paling lambat pada batas SLA.
   - **Tingkat respons** adalah persentase tiket selesai yang respons pertamanya datang paling lambat pada target respons. Hanya tiket yang sudah dinilai yang dihitung: tiket yang punya target respons dan punya catatan respons pertama. Di bawah angka tertulis `N tepat waktu, N terlambat, N tanpa target respons`. Angka kosong tampil sebagai **-**.
   - **Pelanggaran SLA** menghitung tiket selesai yang selesai setelah batas SLA.
   - **Rata-rata waktu penyelesaian** adalah rata-rata menit dari pembuatan sampai penyelesaian. Nilai kosong tampil sebagai **- menit**.
   - **Kepuasan pelanggan** adalah rata-rata nilai 1 sampai 5 yang diberikan pelanggan pada tiket yang dinilai dalam **Periode**, ditulis misalnya `4,3 dari 5`. Di bawahnya tertulis `{n} penilaian`. Tanpa penilaian pada periode itu, angkanya **-** dan keterangannya "Belum ada penilaian pada periode ini." Tiket yang belum dinilai tidak dihitung dan tidak dianggap bernilai nol. Kartu ini mengikuti hari penilaian, bukan hari tiket selesai.
4. Baca diagram **Tiket selesai menurut SLA**. Irisan **Sesuai SLA** dan **Melewati SLA** memakai jumlah tiket yang sesuai SLA dan angka **Pelanggaran SLA**.
5. Baca grafik **Tiket selesai per kategori**. Grafik membandingkan **Total selesai** dan **Sesuai SLA** pada setiap kategori.
6. Baca tabel **Tiket selesai per kategori** dengan kolom **Kategori**, **Total**, **Sesuai SLA**, dan **Persentase**. Klik **Lihat data** pada Total untuk membuka tiket kategori tersebut.
7. Baca tiga tabel rincian, yang mengikuti **Periode**: **Tiket selesai per teknisi** (kolom pertama **Teknisi**), **Tiket selesai per prioritas** (**Prioritas**, dari Mendesak sampai Rendah), dan **Tiket selesai per sumber target** (**Sumber target**). Sumber target ditulis `Tingkat SLA {nama}` untuk tiket yang langganannya punya tingkat SLA, dan `Target kategori tiket` untuk tiket tanpa langganan. Kolom di semua tabel: **Tiket selesai**, **Sesuai SLA**, **Melanggar**, **Persentase**, dan **Respons pertama** (rata-rata, ditulis misalnya `2 jam 15 menit`, atau **-** bila tidak ada). Tiket yang belum punya penangan menjadi satu baris **Belum ditugaskan**.
   - Pengguna yang tidak memegang `report.manage` hanya melihat nama teknisi yang masuk cakupan Kinerja Teknisi mereka ([bagian 7.9](/docs/guides/web/finance-and-reports/technician-performance/)). Penangan lain digabung menjadi satu baris **Penangan lain**, jadi jumlah baris tetap sama dengan **Tiket selesai**.
   - Tiket yang sudah ditutup memakai nama penangan saat ditutup.
8. Baca tabel **Pelanggaran terlama**: sepuluh tiket selesai yang paling lama melewati batas SLA pada periode itu. Kolomnya **Tiket** (tautan ke tiket), **Judul**, **Kategori**, **Penangan**, **Prioritas**, dan **Terlambat** (misalnya `2 jam 15 menit`). Klik **Lihat semua pelanggaran** untuk membuka daftar di balik **Pelanggaran SLA**. Tabel ini hanya tampil bagi akun yang boleh membuka daftar tiket, dan penangan tanpa izin menugaskan hanya melihat tiket miliknya. Tanpa pelanggaran, tabel menulis "Tidak ada tiket yang melanggar SLA pada periode ini."
9. Klik **Ekspor** untuk mengunduh CSV atau PDF. File memuat semua metrik laporan ini: Tiket selesai, Sesuai SLA, Tingkat kepatuhan SLA, Pelanggaran SLA, Respons tepat waktu, Respons terlambat, Tanpa target respons, Tingkat respons, Rata-rata waktu penyelesaian, Rata-rata respons pertama, Kepuasan pelanggan, dan Jumlah penilaian pelanggan. Rincian kategori ditulis tiga baris per kategori: total, sesuai SLA, dan persentase. Rincian per teknisi, prioritas, dan sumber target ditulis empat baris per entri: total, sesuai SLA, persentase, dan rata-rata respons pertama (bila ada).

## Kesalahan umum

- Grafik dan tabel kategori mengabaikan **Periode**. Keduanya dapat berbeda dari kartu dan tabel rincian lain pada rentang yang sama.
- Jumlah tiket yang sesuai SLA ditambah **Pelanggaran SLA** dapat lebih kecil daripada **Tiket selesai**. Tiket tanpa batas SLA masuk Tiket selesai, tetapi tidak dianggap patuh atau melanggar.
- **Tingkat kepatuhan SLA** bernilai 0 bila tidak ada tiket selesai. **Rata-rata waktu penyelesaian** kosong pada kondisi yang sama.
- **Tingkat respons** kosong (**-**) bila belum ada tiket yang dinilai. Tiket lama yang dibuat sebelum target respons ada tidak punya target respons. Tiket itu masuk hitungan **tanpa target respons** dan tidak masuk penyebut. Tiket yang punya target tetapi tidak punya catatan respons pertama juga tidak dinilai.
- Definisi lengkap angka respons ada di Kamus Data ([bagian 7.8](/docs/guides/web/finance-and-reports/data-dictionary/)): **Respons tepat waktu**, **Respons terlambat**, **Tanpa target respons**, dan **Tingkat respons**. Daftar tiket yang dibuka lewat **Lihat data** dan ekspornya memuat kolom **Target respons** dan **Respons**. Kolom **Respons** berisi Tepat waktu, Terlambat, Tanpa target, atau Belum ada respons. Kolom **SLA** berisi Tepat waktu, Terlambat, atau Tanpa batas.
- Kategori bernama sama bergabung menjadi satu baris.
- Parameter `category_id` dapat diterima server, tetapi layar ini tidak menyediakan pemilih kategori.
- Kartu **Kepuasan pelanggan** berbeda dari jumlah **Tiket selesai**: kartu itu menghitung tiket menurut hari penilaian. Tiket yang selesai sebelum periode tetapi dinilai di dalamnya ikut dihitung.
- Tabel **Pelanggaran terlama** tidak ada: akun Anda tidak boleh membuka daftar tiket ([bagian 3.4](/docs/guides/web/operations/tickets/)).
- Baris **Penangan lain** muncul pada tabel per teknisi bila Anda tidak memegang `report.manage` dan sebagian tiket ditangani teknisi di luar cakupan Anda.
