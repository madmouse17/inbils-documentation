---
title: "Technician performance"
description: "Cara Inbils menilai staf lapangan: evaluasi SPK dan tiket, metrik laporan teknisi, cara menghitungnya, dan siapa boleh melihat teknisi mana."
---

Kinerja teknisi punya dua bagian. Evaluasi adalah catatan yang ditulis orang berizin tentang satu SPK atau satu tiket. Laporan teknisi membaca pekerjaan selesai, tiket, dan evaluasi itu, lalu mengubahnya menjadi angka dan peringkat. Evaluasi adalah entity inti bersama (`app/Models/Core/EmployeeEvaluation.php`), dan laporannya ada di modul Reporting, lihat [Reporting](/docs/modules/reporting/).

## Evaluasi

Evaluasi menilai satu karyawan untuk satu pekerjaan. Evaluasi ditulis dengan tangan: tidak ada yang membuatnya otomatis saat pekerjaan ditutup.

| Isian | Aturan |
|---|---|
| Employee (karyawan) | Pengguna aktif perusahaan yang memegang izin `evaluation.evaluable` (peran technician dan staff secara bawaan). |
| Reference (rujukan) | Satu `WorkOrder` ([SPK](/docs/modules/work-orders/)) atau satu `Ticket` ([Ticketing](/docs/modules/ticketing/)) di perusahaan yang sama. Tipe lain ditolak dengan 422. |
| `score` | Wajib, dari 1.0 sampai 5.0 (pemeriksaan database). |
| `customer_rating` | Opsional, dari 1.0 sampai 5.0, diisi staf atas nama pelanggan. |
| `comment` | Opsional, sampai 1000 karakter. |
| Evaluator | Pengguna yang menulisnya. Satu evaluator hanya bisa menilai satu rujukan sekali. |

Evaluasi juga menyimpan cuplikan menit respons pertama dan menit penyelesaian untuk tiket, sehingga perubahan tiket di kemudian hari (buka ulang, tugaskan ulang) tidak mengubah riwayat. Evaluasi memakai soft delete. Staf menulis dan meninjaunya di [Evaluasi](/docs/guides/web/operations/evaluations/).

## Laporan teknisi

Laporan ini adalah halaman **Kinerja Teknisi** (route `reports/technician`, izin `report.technician`), dijelaskan di [Kinerja teknisi (panduan)](/docs/guides/web/finance-and-reports/technician-performance/). Untuk satu teknisi dan rentang tanggal, laporan menampilkan:

| Metrik | Cara menghitung |
|---|---|
| SPK selesai | Jumlah SPK teknisi berstatus `completed`, difilter menurut `completed_at`. |
| Tiket diselesaikan | Jumlah tiket berstatus `resolved` atau `closed`, difilter menurut `resolved_at`. |
| Rata-rata durasi SPK | Rata-rata menit antara `started_at` dan `completed_at`, untuk SPK yang punya waktu mulai. |
| Rata-rata penyelesaian tiket | Rata-rata menit antara tiket dibuat dan `resolved_at`. |
| Kepatuhan SLA | Bagian tiket selesai dengan `resolved_at` sebelum atau tepat pada batas SLA, sebagai persentase satu desimal. |
| Rata-rata respons pertama (FRT) | Rata-rata menit antara tiket dibuat dan `first_response_at`, untuk tiket yang punya nilai itu. |
| Rata-rata skor | Rata-rata `score` evaluasi pada periode itu (menurut `evaluated_at`). |
| Rata-rata rating pelanggan | Rata-rata `customer_rating`, hanya untuk evaluasi yang memilikinya. |
| Beban kerja aktif | SPK berstatus `assigned` atau `in_progress` ditambah tiket berstatus `open`, `assigned`, atau `on_progress`. |
| SPK per jenis, tiket per kategori | Jumlah untuk tabel rincian. |

Grafik menampilkan SPK selesai per bucket waktu, satu bucket adalah satu hari kalender di zona waktu perusahaan. Peringkat memuat setiap teknisi yang boleh dilihat penonton, diurutkan menurut SPK selesai ditambah tiket diselesaikan pada periode itu. Teknisi dengan total sama berbagi peringkat, dan urutan di antara mereka menurut nama. Di peringkat, teknisi tanpa tiket selesai tidak punya angka SLA (kosong), bukan 0.

Hanya teknisi aktif yang dihitung: pengguna aktif dengan izin `app.technician` dan profil karyawan aktif di perusahaan.

## Siapa melihat siapa

Laporan menampilkan kumpulan teknisi yang berbeda menurut izin penonton.

| Penonton memegang | Melihat |
|---|---|
| `report.manage` (administrator) | Semua teknisi aktif perusahaan. |
| `report.technician.team` dan `report.technician` | Teknisi yang profil karyawannya berada di unit organisasi penonton atau unit di bawahnya. Penonton tanpa profil aktif di unit aktif tidak melihat siapa pun. |
| `app.technician` dan `report.technician` | Hanya dirinya sendiri. |
| Selain itu | Tidak ada. |

Memilih teknisi di luar kumpulan ini ditolak (403). Halaman Teknisi karena itu bekerja sebagai tampilan diri untuk teknisi dan tampilan tim untuk manager.

## Izin

| Kunci | Arti | Pemegang bawaan |
|---|---|---|
| `evaluation.view` | Melihat semua evaluasi | manager, staff |
| `evaluation.create` | Menulis evaluasi | manager, staff |
| `evaluation.update` | Mengubah evaluasi apa pun (evaluator selalu boleh mengubah miliknya) | manager, staff |
| `evaluation.delete` | Menghapus evaluasi | admin |
| `evaluation.view.own` | Hanya melihat evaluasi tentang dirinya (evaluasi orang lain dijawab 404) | technician |
| `evaluation.customer.submit` | Rating pelanggan | customer |
| `evaluation.evaluable` | Boleh dievaluasi | technician, staff |
| `evaluation.export`, `evaluation.manage` | Ekspor, izin super | admin |
| `report.technician` | Membuka laporan teknisi | technician, manager, admin |
| `report.technician.team` | Cakupan tim pada laporan | manager |

Peran bersifat per perusahaan, lihat [Permissions](/docs/architecture/permissions/).

## Invarian

- Laporan tidak pernah menampilkan teknisi di luar cakupan penonton, dan target diperiksa lagi saat halaman memuat satu teknisi.
- Skor dan rating tetap dalam 1.0 sampai 5.0.
- Evaluasi selalu menunjuk SPK atau tiket yang ada di perusahaan yang sama.
- Rata-rata kosong, bukan nol, bila tidak ada data, kecuali angka SLA satu teknisi, yang terbaca 0 tanpa tiket selesai.
