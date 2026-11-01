---
title: "2.1 Kartu antrean"
description: "Dasbor adalah halaman pertama setelah masuk. Isinya antrean dan pengecualian yang perlu Anda tangani hari ini."
---

Dasbor adalah halaman pertama setelah masuk. Isinya antrean dan pengecualian yang perlu Anda tangani hari ini. Setiap kartu menampilkan angka langsung untuk perusahaan yang sedang aktif. Klik pada kartu membuka menu tujuannya dengan filter yang sudah terpasang. Di Tiket dan Stok, filter itu tidak tampil di layar (lihat Kesalahan umum di bawah).

Peran yang dapat memakai: semua akun web dengan izin `dashboard.view` (**Lihat dasbor**; admin, manajer, staf). Kartu muncul hanya bila peran Anda boleh mengerjakan antrean itu. Kartu yang tidak tampil berarti antrean itu bukan tugas Anda, bukan berarti angkanya nol.

## Membaca kartu

1. Klik **Dasbor** di sidebar. Dasbor juga terbuka otomatis setelah masuk.

   ![Dasbor admin dengan judul Dasbor, kartu antrean di kiri termasuk kartu Jatuh tempo ≤ 3 hari, dan panel Notifikasi di kanan](~/assets/guide/web/dashboard.webp)

2. Baca kartu per grup: **Operasional**, **Persetujuan**, **Gudang**, **Keuangan**. Grup yang tidak relevan untuk peran Anda tidak tampil.
3. Perhatikan penanda di kanan atas kartu. **Perlu tindakan** (kuning) dan **Segera tangani** (merah) muncul hanya bila angkanya lebih dari nol, dan hanya pada kartu yang menandai pengecualian. Kartu **Pekerjaan saya** dan **Antrean permintaan gudang** tidak punya penanda. Angka nol tampil abu-abu dengan tulisan "Tidak ada yang perlu ditangani."
4. Klik kartu untuk membuka menu tujuannya.
5. Pada kartu **SLA terlampaui**, lihat daftar sampai lima tiket di bawah angka. Setiap baris memuat kode tiket, lencana prioritas (**Mendesak**, **Tinggi**, **Sedang**, **Rendah**), judul, dan "Batas SLA" dengan tanggal dan jam. Tiket dengan batas SLA tertua tampil paling atas. Bila tiket lebih dari lima, Inbils menulis "Menampilkan 5 dari N tiket, batas SLA terlama lebih dulu." Klik satu baris untuk membuka tiketnya.

## Daftar kartu

| Kartu | Yang dihitung | Dibuka ke | Muncul untuk |
| --- | --- | --- | --- |
| Pekerjaan saya | SPK dan tiket yang ditugaskan kepada Anda. Rincian: **Belum dimulai**, **Dikerjakan**, **Menunggu tindakan** | **Pekerjaan Saya** (3.6) | Pemegang izin kerja lapangan (**Mulai SPK**, **Kirim SPK untuk ditinjau**, **Mulai menangani tiket**, **Selesaikan tiket**, atau **Tutup tiket**) yang punya profil karyawan aktif |
| Belum ditugaskan | Tiket dan SPK tanpa penerima. Rincian: **Tiket**, **SPK** | **Penugasan** (3.1), dengan **Status penugasan** di **Belum ditugaskan** | Pengguna aktif dengan izin **Tugaskan tiket**, **Tugaskan ulang tiket**, **Tugaskan SPK**, atau **Tugaskan ulang SPK** |
| SLA terlampaui | Tiket yang belum selesai dan sudah lewat batas SLA | **Tiket** (3.4), daftar hanya berisi tiket yang lewat batas SLA. Layar Tiket tidak punya chip untuk ini | Pemegang `ticket.view` yang juga menugaskan, mengerjakan, atau melaporkan SLA tiket |
| Menunggu persetujuan saya | SPK dan permintaan barang yang menunggu keputusan Anda. Bila Anda sendiri pembuat SPK yang menunggu review, baris abu-abu di bawah angka menulis "{n} SPK menunggu admin (Anda pembuatnya)", karena SPK itu tidak ikut dihitung | **Persetujuan** (3.2) | Pemegang izin **Setujui SPK**, **Tolak SPK**, **Setujui permintaan barang**, atau **Tolak permintaan barang** |
| Antrean permintaan gudang | Permintaan barang di antrean gudang yang bisa Anda kerjakan sekarang: menyetujui, menyiapkan, atau menyerahkan. Rincian: **Seluruh antrean**, jumlah seluruh antrean gudang | **Permintaan Barang** (6.1), tab **Persiapan & Antrean Gudang** | Pemegang `inventory.request.view.all` yang juga boleh menyetujui, menyiapkan, atau mengeluarkan permintaan barang |
| Antrean retur material | Pengembalian material yang menunggu diproses. Rincian: **Pengecualian** | **Permintaan Barang**, tab **Antrean Pengembalian** (6.8) | Pemegang `inventory.return.view.all` yang juga boleh menerima atau menyelesaikan pengembalian, dan boleh membuka Permintaan Barang |
| Stok di bawah minimum | Baris stok (satu barang di satu lokasi) yang jumlahnya sama dengan atau di bawah stok minimum | **Stok** (6.5), daftar hanya berisi baris stok rendah. Layar Stok tidak punya kontrol filter untuk ini | Pemegang `inventory.view` |
| Tagihan jatuh tempo | Tagihan terbuka yang lewat jatuh tempo dan masih bersisa. Rincian: **Terutang** | **Tagihan** (7.1), dengan **Status** di **Lewat jatuh tempo** | Pemegang `billing.view` |
| Jatuh tempo ≤ 3 hari | Tagihan **Belum dibayar** atau **Dibayar sebagian** yang masih bersisa dan jatuh tempo mulai hari ini sampai 3 hari ke depan, menurut kalender perusahaan | **Tagihan** (7.1), dengan chip filter **Jatuh tempo ≤ 3 hari** menyala | Pemegang `billing.view` |
| Tagihan draf menunggu dikirim | Tagihan draf perusahaan dan total nilainya | **Tagihan** (7.1), dengan **Status** di **Draf** | Pemegang `billing.send` |
| Hampir terlampaui (≤ 30 menit) | Tiket yang belum selesai dan target responsnya (bila belum dijawab) atau target penyelesaiannya jatuh tempo dalam 30 menit ke depan | **Tiket** (3.4), chip **Hampir terlampaui** menyala | Sama dengan kartu **SLA terlampaui** |
| Pelanggan membalas | Tiket yang belum selesai dan balasan terakhirnya (bukan catatan internal) ditulis pelanggan, jadi belum ada petugas yang menjawab | **Tiket**, chip **Pelanggan membalas** menyala | Sama dengan kartu **SLA terlampaui** |
| Pembayaran online bermasalah | Pembayaran online yang uangnya sudah masuk di Midtrans tetapi tidak bisa dibukukan, atau yang dikembalikan. Angkanya sama dengan peringatan merah di Tunggakan | **Tunggakan** (7.2), bagian **Pembayaran online yang perlu dicek** | Pemegang `billing.view` dan `billing.payment.record` |
| Pembayaran online tertunda > 1 jam | Tagihan yang halaman bayar onlinenya dibuka lebih dari satu jam lalu, belum kedaluwarsa, dan belum dibayar. Satu tagihan dihitung sekali | **Tagihan** (7.1), chip **Pembayaran online tertunda > 1 jam** menyala | Pemegang `billing.view` dan `billing.payment.record` |

## Daftar "Mulai dari sini"

Admin perusahaan (pemegang `company.manage`) melihat kartu **Mulai dari sini** di atas semua kartu antrean selama masih ada langkah yang belum selesai. Kartu ini memuat batang kemajuan "{n} dari {total} langkah selesai" dan satu baris per langkah:

| Langkah | Selesai bila | Dibuka ke |
| --- | --- | --- |
| Lengkapi profil perusahaan | alamat dan telepon perusahaan terisi | Profil perusahaan (8.1) |
| Atur wilayah peta | kota atau titik peta di Pengaturan terisi | Pengaturan, bagian **Peta** |
| Tambah POP | ada lokasi POP yang aktif | Lokasi (5.1) |
| Atur paket layanan | ada paket layanan yang aktif | Paket Layanan (4.2) |
| Tambahkan pengguna | ada lebih dari satu pengguna aktif yang bukan akun aplikasi pelanggan | Pengguna (8.5) |
| Daftarkan pelanggan pertama | ada satu pelanggan | Tambah pelanggan (4.1) |
| Atur penagihan otomatis | Pengaturan perusahaan pernah disimpan sekali sejak tagihan otomatis ditawarkan | Pengaturan, bagian **Tagihan** |

Langkah yang selesai tampil dengan tanda centang. Langkah yang belum selesai berupa tautan ke halaman yang mengerjakannya. Inbils mencentang dari data yang tersimpan, jadi tidak ada tombol untuk mencentang atau menyembunyikan langkah. Langkah yang halamannya tidak boleh Anda buka tidak tampil. Kartu hilang sendiri setelah semua langkah selesai.

Kartu ini juga menulis satu baris awalan kode dokumen, misalnya "Kode dokumen dimulai dengan Tiket TKT, Tagihan INV, SPK SPK." Baris itu menunjukkan awalan yang sedang dipakai perusahaan Anda untuk tiket, tagihan, dan SPK, sebelum rekam pertamanya dibuat. Awalan diubah di Penomoran ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)).

## Kesalahan umum

- Angka kartu berbeda dengan daftar di menu tujuan: periksa perusahaan yang sedang aktif ([bagian 1.6](/docs/guides/web/introduction/switch-company/)). Kartu dan daftar memakai aturan hitung yang sama untuk perusahaan aktif, kecuali kartu **Tagihan jatuh tempo** (bullet di bawah).
- Daftar Tiket atau Stok yang dibuka dari kartu hanya berisi sebagian baris, dan layarnya tidak menampilkan filter yang aktif. Buka menu itu lewat sidebar untuk melihat semua baris.
- Kartu **Tagihan jatuh tempo** dihitung dari tanggal jatuh tempo dan sisa tagihan. Filter **Lewat jatuh tempo** di Tagihan memakai status tagihan, yang diperbarui otomatis setiap hari pukul 03:00 UTC (10:00 WIB). Sampai pembaruan itu jalan, daftar bisa memuat lebih sedikit tagihan daripada kartu.
- Kartu **Menunggu persetujuan saya** tidak menghitung SPK yang Anda buat atau tugaskan ke diri sendiri, dan permintaan barang yang Anda ajukan sendiri. Aturan pemisahan tugas melarang Anda menyetujuinya ([bagian 3.2](/docs/guides/web/operations/approvals/)). Untuk SPK yang Anda buat sendiri, kartu menulis baris abu-abu "{n} SPK menunggu admin (Anda pembuatnya)", jadi angka 0 tidak membuat Anda mengira tidak ada yang menunggu.
- Angka kartu **Antrean permintaan gudang** lebih kecil dari jumlah baris di tab **Persiapan & Antrean Gudang**: kartu hanya menghitung permintaan yang bisa Anda kerjakan sekarang, dan tidak menghitung yang menunggu orang lain atau yang dilarang aturan pemisahan tugas (pemohon tidak memutuskan atau menyerahkan permintaannya sendiri, dan penyetuju tidak menyiapkan atau menyerahkannya). Baris **Seluruh antrean** di kartu menulis jumlah seluruh antrean.
- Angka **SLA terlampaui** lebih kecil dari yang Anda duga: pemegang izin mengerjakan tiket yang tidak boleh menugaskan hanya menghitung tiket yang ditugaskan kepadanya.
- Kartu **Pekerjaan saya** tidak ada padahal Anda punya izin: akun Anda perlu profil karyawan yang aktif di perusahaan ini ([bagian 8.3](/docs/guides/web/administration/employees/)).
- Dasbor kosong dengan judul "Belum ada antrean untuk akun Anda": peran Anda belum punya izin ke antrean mana pun. Hubungi admin untuk menambah izin.
- Halaman **Akses ditolak** saat membuka dasbor: peran Anda tidak memegang izin `dashboard.view`.
