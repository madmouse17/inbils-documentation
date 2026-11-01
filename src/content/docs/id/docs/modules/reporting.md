---
title: "Pelaporan"
description: "Apa yang dihitung modul pelaporan Inbils yang read-only, bagaimana angka didefinisikan dan ditelusuri, cara kerja ekspor CSV dan PDF, serta siapa boleh melihat laporan apa."
---

Modul Reporting mengubah riwayat yang disimpan modul lain menjadi laporan untuk manajer, NOC, dan keuangan. Modul ini benar-benar read-only: hanya berisi kelas query dan satu model read-only, tidak menulis apa pun, dan tidak menyimpan nilai kinerja hasil hitungan. Setiap angka dihitung langsung dari catatan sumbernya, sehingga laporan yang sama untuk periode lain cukup memberi hasil lain.

## Laporan

| Laporan | Menjawab | Sumber utama |
|---|---|---|
| Business | MRR, langganan aktif, churn, langganan baru, pendapatan, piutang, suspend rate, throughput pemasangan, pemanfaatan aset. | Langganan, tagihan, pembayaran, SPK. |
| Sales | Pelanggan, langganan, nilai ditagihkan, nilai terkumpul, dan nilai belum lunas per acquirer (pengguna yang dikreditkan pada pelanggan). | Pelanggan, tagihan, pembayaran. |
| Technician | SPK dan tiket selesai, rata-rata waktu penyelesaian, kepatuhan SLA, nilai pelanggan, waktu respons pertama, beban kerja, rincian per tipe SPK dan kategori tiket, serta peringkat semua teknisi. | SPK, tiket, evaluasi. |
| Asset | Sebaran status, aset per lokasi, riwayat pemasangan, downtime, aset yang tertaut pelanggan, aset yang dipensiunkan. | Aset jaringan dan pemasangannya. |
| Kepatuhan SLA | Porsi tiket selesai dalam SLA (keseluruhan dan per kategori), waktu penyelesaian dan respons pertama, pelanggaran dan tren, rincian per penangan, prioritas, dan sumber target, kepuasan pelanggan (CSAT), sepuluh pelanggar terlama. | Tiket. |
| Kartu stok | Riwayat pergerakan stok per produk dan lokasi dengan saldo setelah tiap pergerakan. | Pergerakan stok. |
| Log audit | Entri aktivitas berisi siapa, apa, serta nilai sebelum dan sesudah. | Activity log. |
| Kamus data | Definisi setiap angka. | Registry metrik (teks statis). |

Laporan Technician dengan pilihan "Semua teknisi" menampilkan tabel **Peringkat teknisi** untuk semua teknisi yang boleh dipilih pengguna, diurutkan menurut SPK selesai ditambah tiket selesai. Kartu stok tanpa produk terpilih menampilkan delapan produk yang paling baru bergerak. Log audit menulis tindakan dukungan tim Inbils sebagai satu kalimat per kode.

Lihat panduan pengguna tentang [Laporan](/docs/guides/web/finance-and-reports/reports/) dan [Kepatuhan SLA](/docs/guides/web/finance-and-reports/sla-compliance/).

## Registry metrik dan kamus data

`MetricRegistry` adalah katalog berversi yang didefinisikan di kode untuk setiap angka: definisi, satuan, rumus, dan filter tanggal yang diikutinya. Ia mencatat setiap rumus persis seperti yang dijalankan query saat ini, termasuk keanehannya, sehingga angka bisa dilacak ke definisi yang menghasilkannya. Memperbaiki sebuah keanehan berarti merilis versi baru metrik itu, tidak pernah mengedit entri yang ada. Halaman **kamus data** mencetak registry ini. Isinya teks statis dan tidak membaca data perusahaan.

Beberapa angka berupa snapshot dan mengabaikan filter periode. Kamus dan ekspor sama-sama menyebut angka mana saja.

## Drill-down

Angka agregat pada laporan Business, SLA, Asset, dan Technician tertaut ke baris di baliknya. `DrillRegistry` mendaftar satu sumber per angka, dan halaman serta daftar drill membaca query builder yang sama, sehingga angka dan baris sumbernya tidak bisa berselisih. Daftar drill hanya diizinkan dengan izin laporan itu sendiri dan izin modul pemilik barisnya, dan bisa diurutkan, dipaginasi, serta diekspor.

## Ekspor

Semua ekspor lewat `App\Support\ExportQuery`. Izinnya adalah `report.export` bersama izin laporan itu sendiri.

- **CSV**: UTF-8 dengan byte order mark, satu baris judul kolom lalu data mentah.
- **PDF**: A4 lanskap dengan kop (logo dan nama perusahaan, judul laporan, "Periode", "Filter", "Dicetak {tanggal} oleh {nama}") dan "Halaman {n} dari {total}" di setiap kaki halaman. Nilai ditulis seperti di layar, misalnya "Rp 1.250.000" atau "18 Okt 2026".
- Batas baris mengikuti `config('exports.max_rows')` (bawaan 5000, diatur oleh `EXPORTS_MAX_ROWS`). PDF juga berhenti di 1500 sel, sehingga tabel lebar mendapat lebih sedikit baris. PDF yang terpotong menulis "PDF dibatasi {n} baris. Untuk data lengkap, unduh CSV atau persempit periode."
- Tunggakan punya ekspor sendiri di [Penagihan](/docs/modules/billing/), dan daftar tiket di [Tiket](/docs/modules/ticketing/).

## Laporan konsolidasi

Laporan Business konsolidasi menambahkan angka perusahaan induk atas anak perusahaannya. Laporan ini hanya ada di perusahaan induk. Pemegang `report.consolidated.view` yang membukanya dari anak perusahaan dialihkan ke halaman Laporan dengan peringatan, dan dengan tombol untuk pindah ke perusahaan induk bila pengguna boleh. Tanpa izin itu, jawabannya tetap 403.

## Izin

| Kunci | Mengizinkan |
|---|---|
| `report.view` | Membuka daftar laporan. |
| `report.business.view` | Laporan Business. |
| `report.sales.view` | Laporan Sales. |
| `report.technician` | Laporan Technician (teknisi hanya melihat miliknya). |
| `report.technician.team` | Laporan Technician untuk subtree organisasi pengguna. |
| `report.asset.view` | Laporan Asset. |
| `report.sla.view` | Laporan Kepatuhan SLA. |
| `report.stock_card.view` | Kartu stok. |
| `report.audit.view` | Laporan log audit. |
| `report.dictionary.view` | Kamus data. |
| `report.export` | Ekspor CSV dan PDF untuk laporan apa pun yang bisa dibuka pengguna. |
| `report.manage` | Izin super; melihat semua nama penangan pada rincian SLA. |
| `report.consolidated.view` | Laporan konsolidasi perusahaan induk (khusus admin). |

Nama penangan pada rincian SLA per teknisi hanya tampil penuh bagi pemegang `report.manage`. Pengguna lain membaca nama dalam cakupan laporan Technician mereka, dan semua penangan di luar cakupan digabung menjadi satu baris "Penangan lain".

## Invarian

- Reporting tidak pernah menulis data dan tidak menyimpan tabel kinerja statis.
- Setiap angka bisa dilacak ke definisi registry dan, untuk agregat, ke baris sumbernya.
- Laporan mengikuti perusahaan aktif. Teknisi tidak bisa membuka laporan teknisi lain (403).
- Reporting membaca tabel modul lain secara langsung. Ini satu-satunya pengecualian terdokumentasi dari aturan batas modul, lihat [Arsitektur modul](/docs/architecture/modules/).

Lihat juga modul [Kinerja teknisi](/docs/modules/technician-performance/) dan [model data](/docs/architecture/data-model/).
