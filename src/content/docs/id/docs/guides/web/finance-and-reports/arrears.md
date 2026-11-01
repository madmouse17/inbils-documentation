---
title: "7.2 Tunggakan"
description: "Halaman ini menjumlahkan sisa tagihan yang belum dibayar dan mengelompokkannya menurut umur jatuh tempo, per tagihan atau per pelanggan."
---

Halaman ini menjumlahkan sisa tagihan yang belum dibayar dan mengelompokkannya menurut umur jatuh tempo, per tagihan atau per pelanggan. Buka halaman ini untuk melihat siapa yang menunggak dan sudah berapa lama, mengirim pengingat, lalu mengisolir atau memblokir langganan pelanggan itu.

Peran yang dapat memakai: admin, manajer, dan staf. Izin: `billing.view`. **Kirim pengingat** perlu `billing.send` (admin, manajer, staf), **Ekspor** perlu `billing.export` (admin, manajer). Tombol **Isolir** perlu `customer.subscription.suspend`, tombol **Blokir** dan **Buka blokir** perlu `customer.subscription.block`. Admin dan manajer memiliki keduanya, jadi staf tidak melihat tombol isolir dan blokir. Data hanya dari perusahaan aktif.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Keuangan & Laporan**, lalu klik **Tunggakan**. Halaman ini menulis "Pantau umur piutang pelanggan dan tindakan isolir."
2. Enam kartu di atas menjumlahkan semua pelanggan, bukan hanya halaman yang tampil: **Belum jatuh tempo**, tiga rentang umur (**1-30 hari**, **31-60 hari**, dan **61-90 hari**), **>90 hari**, dan **Total piutang**. Kartu tanpa nilai menulis Rp 0.
3. Di bawah kartu ada dua tab: **Per tagihan** (terbuka lebih dulu) dan **Per pelanggan**. Pilihan tab ikut ke alamat halaman, jadi tautan ke tab tertentu bisa dibagikan.

   ![Halaman Tunggakan dengan enam kartu umur piutang dan tab Per tagihan berisi filter Cari tagihan, Umur, dan Jatuh tempo, tombol Ekspor, serta tabel tagihan terbuka](~/assets/guide/web/receivables.webp)
4. Tab **Per tagihan** memuat satu baris per tagihan yang masih punya sisa, yang jatuh temponya paling lama di atas, 25 baris per halaman. Kolomnya **Tagihan** (nomor, tautan ke detail), **Pelanggan** (nama dan kode), **Jatuh tempo**, **Umur** (`Lewat {n} hari` berwarna merah, atau `Belum jatuh tempo`), **Status**, **Total**, **Sisa**, dan **Aksi**. Lencana **Status** membaca tanggal jatuh tempo, seperti di daftar **Tagihan** ([bagian 7.1](/docs/guides/web/finance-and-reports/invoices/)). Di atas tabel ada:
   - **Cari tagihan** (petunjuk `Nomor tagihan atau pelanggan`): mencari nomor tagihan serta nama dan kode pelanggan.
   - **Umur**: **Semua umur**, **Belum jatuh tempo**, **1-30 hari**, **31-60 hari**, **61-90 hari**, atau **>90 hari**. Kelompoknya sama dengan kartu di atas.
   - **Jatuh tempo**: rentang tanggal. Tanggal akhir tidak boleh sebelum tanggal awal ("Jatuh tempo akhir tidak boleh sebelum jatuh tempo awal.").
   - **Ekspor** (pemegang `billing.export`): **Ekspor CSV** dan **Ekspor PDF** dari pencarian dan filter yang berlaku. Kolomnya Nomor tagihan, Pelanggan, Kode pelanggan, Tanggal terbit, Jatuh tempo, Lewat jatuh tempo (hari), Umur, Total, Terbayar, Sisa, dan Status (ditulis sebagai label, misalnya Belum dibayar). Format berkas dibahas di [bagian 7.3](/docs/guides/web/finance-and-reports/reports/).
   - Bila tidak ada baris, tabel menulis "Tidak ada tagihan terbuka" dan "Tagihan yang belum lunas muncul di sini, yang paling lama jatuh tempo lebih dulu." Bila filter terlalu sempit, tombol **Reset filter** mengosongkannya.
5. Tab **Per pelanggan** memuat satu baris per pelanggan: **Pelanggan** (nama dan jumlah tagihan terbuka, misalnya "(1 tagihan)"), **Belum jatuh tempo**, tiga kolom rentang umur, **>90 hari** (merah), **Total**, dan **Aksi** (tombol isolir dan blokir). Sel tanpa nilai menulis tanda hubung. Semua kolom kecuali **Aksi** bisa diurutkan, dan urutan awalnya **Pelanggan** dari A ke Z. Halaman, jumlah baris, dan urutan bekerja seperti di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/). Tab ini tidak punya kotak pencarian, filter, atau tombol ekspor: pakai **Per tagihan** untuk itu. Bila tidak ada tunggakan, tabel menulis "Tidak ada tunggakan" dan "Tagihan yang belum lunas di perusahaan ini akan muncul di sini."

   ![Tab Per pelanggan di halaman Tunggakan dengan tabel umur piutang dan tombol isolir dan blokir](~/assets/guide/web/receivables-customers.webp)

6. Di tab **Per pelanggan**, klik nama pelanggan untuk membuka **Tagihan** dengan filter **Pelanggan** yang sudah terisi nama itu, semua status termasuk yang lunas. Klik **Hapus pilihan: Pelanggan** untuk melihat semua tagihan lagi.

Yang dihitung:

- Tagihan berstatus **Belum dibayar**, **Dibayar sebagian**, atau **Lewat jatuh tempo** yang masih punya sisa. Nilainya **Total** dikurangi jumlah terbayar. Tagihan **Draf**, **Lunas**, dan **Dibatalkan** tidak dihitung.
- Kolom ditentukan dari tanggal jatuh tempo dan hari ini, bukan dari status. Tagihan yang jatuh tempo hari ini atau belum lewat masuk **Belum jatuh tempo**. Tagihan yang lewat 1 sampai 30 hari masuk kolom pertama, dan seterusnya sampai **>90 hari**.
- Pelanggan yang semua tagihannya lunas tidak tampil.

Beda dengan **Tagihan** ([bagian 7.1](/docs/guides/web/finance-and-reports/invoices/)): **Tagihan** memuat setiap tagihan, semua status, dengan filter lengkap dan ekspor. **Tunggakan** hanya memuat sisa yang masih terbuka: tab **Per tagihan** satu baris per tagihan, tab **Per pelanggan** dijumlahkan per pelanggan.

## Mengirim pengingat

Izin yang dibutuhkan: `billing.send`. Pakai ini bila pelanggan perlu diingatkan sekarang, tanpa menunggu pengingat otomatis ([bagian 7.1](/docs/guides/web/finance-and-reports/invoices/)).

1. Di tab **Per tagihan**, klik **Kirim pengingat** pada baris tagihan.
2. Baca dialog **Kirim pengingat untuk {nomor}?**: "Pelanggan menerima pengingat di aplikasi Inbils, juga lewat WhatsApp bila aktif. Satu tagihan hanya bisa diingatkan sekali per hari." Dialog menyebut **Pelanggan**, **Sisa**, dan **Jatuh tempo**.
3. Klik **Kirim pengingat**. Toast "Pengingat dikirim untuk {nomor}." muncul.

Satu tagihan hanya bisa diingatkan sekali dalam satu hari kalender perusahaan, oleh siapa pun. Setelah itu, kolom **Aksi** pada baris itu menulis "Pengingat terkirim hari ini". Bila orang lain mengirimnya lebih dulu saat dialog Anda terbuka, muncul toast "Pengingat untuk {nomor} sudah dikirim hari ini." dan tidak ada pesan kedua yang terkirim. Kolom **Aksi** kosong bila Anda tidak memegang `billing.send` atau pelanggan tagihan itu sudah dihapus. Server juga menolak tagihan yang sudah lunas atau dibatalkan ("Hanya tagihan yang belum lunas yang bisa diingatkan."). Pengingat yang terkirim tercatat di Log Audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)).

## Pembayaran online yang perlu dicek

Bila Midtrans menerima uang yang tidak bisa dicatat Inbils sendiri, alert merah muncul di atas keenam kartu dengan judul "&lt;n&gt; pembayaran online perlu dicek". Contohnya tagihan yang sudah lunas atau dibatalkan saat pelanggan membayar, jumlah yang berbeda dari tagihan, atau uang yang ditarik kembali oleh Midtrans. Alert ini tidak muncul bila tidak ada kasus terbuka.

- Angka di judul menghitung semua kasus yang masih terbuka. Daftar di bawahnya memuat paling banyak sepuluh kasus terbaru. Setiap baris memuat nomor tagihan (tautan ke detail tagihan), jumlah, order ID Midtrans, dan alasannya bila ada.
- Teks di bawah daftar: "Catat pembayarannya dengan referensi order ID tersebut, atau refund di Midtrans." Untuk mencatat, buka tagihannya, klik **Catat pembayaran**, lalu isi **Referensi** dengan order ID itu ([bagian 7.1](/docs/guides/web/finance-and-reports/invoices/)).
- Pemegang izin `billing.payment.record` di perusahaan itu juga menerima notifikasi "Pembayaran online perlu dicek" di lonceng dan, bila perangkatnya terdaftar, sebagai notifikasi push.
- Kasus hilang dari alert setelah pembayarannya tercatat dengan order ID itu, atau setelah uang yang ditarik kembali sudah dibatalkan di Inbils.

## Mengisolir langganan

Izin yang dibutuhkan: `customer.subscription.suspend`. Di tab **Per pelanggan**, kolom **Aksi** menampilkan tombol untuk setiap langganan Aktif milik pelanggan di baris itu, termasuk langganan yang tagihannya belum jatuh tempo.

1. Buka tab **Per pelanggan**. Di kolom **Aksi**, klik tombol **Isolir** diikuti kode langganan yang benar.
2. Isi **Alasan isolir (wajib)** di jendela `Isolir langganan <kode>?`. Tombol **Isolir** aktif setelah alasan terisi. Alasan maksimal 500 karakter, dan server menolak yang lebih panjang. Tombol **Batal** menutup jendela.
3. Klik **Isolir**. Toast "Langganan ditangguhkan." muncul, dan langganan berstatus Ditangguhkan dengan sumber tunggakan.

Isolir dari halaman ini dihitung sebagai isolir karena tunggakan, jadi pembayaran dapat membukanya otomatis dengan syarat di [bagian 7.1](/docs/guides/web/finance-and-reports/invoices/) ("Memantau jatuh tempo dan isolir otomatis"). Langganan Ditangguhkan tidak lagi punya tombol **Isolir** di halaman ini. Aktifkan kembali secara manual dengan tombol **Aktifkan kembali** di halaman langganan, yang dibuka dari halaman pelanggan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)). Bila status langganan sudah berubah sebelum Anda menyimpan, server menolak dengan "Langganan harus berstatus Aktif untuk ditangguhkan."

## Memblokir atau membuka blokir

Izin yang dibutuhkan: `customer.subscription.block`. Blokir mengisolir pelanggan tanpa mengubah status langganan, dan pembayaran tidak mencabutnya.

1. Buka tab **Per pelanggan**, lalu klik tombol **Blokir** diikuti kode langganan yang benar. Langganan yang sudah diblokir menampilkan lencana **Diblokir** dan tombol **Buka blokir** diikuti kodenya. Langganan Ditangguhkan hanya tampil di halaman ini selama diblokir.
2. Baca penjelasan di jendela `Blokir internet <kode>?` atau `Buka blokir internet <kode>?`. Blokir mengisolir dan memutus pelanggan, sedangkan penagihan jalan terus dan pembayaran tidak mencabut blokir. Buka blokir mengembalikan layanan normal saat router menyambung ulang. Bila langganan masih Ditangguhkan, layanan tetap diisolir sampai langganan diaktifkan kembali.
3. Isi **Alasan** (wajib, maksimal 500 karakter) untuk blokir, atau **Catatan (opsional)** untuk buka blokir. Tombol **Batal** menutup jendela.
4. Klik **Blokir internet** atau **Buka blokir**. Toast "Internet langganan diblokir." atau "Blokir internet langganan dibuka." muncul. Tombol **Blokir internet** aktif setelah alasan terisi.

## Kesalahan umum

- Jumlah di **Tunggakan** berbeda dari jumlah di **Tagihan**. **Tunggakan** menghitung sisa, bukan **Total**, dan hanya tagihan **Belum dibayar**, **Dibayar sebagian**, dan **Lewat jatuh tempo**. Cocokkan dengan kolom **Sisa** dan **Status** di daftar tagihan pelanggan itu.
- Tombol **Isolir** muncul untuk setiap langganan aktif pelanggan itu, bukan hanya yang menunggak. Cocokkan kode langganan dengan tagihan yang menunggak sebelum klik.
- Langganan Ditangguhkan tanpa blokir tidak punya tombol di halaman ini. Aktifkan kembali dari halaman langganan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)).
- Server menolak blokir bila langganan sudah berhenti ("Langganan yang sudah berhenti tidak bisa diblokir."), sudah diblokir ("Internet langganan sudah diblokir."), dan buka blokir bila langganan tidak sedang diblokir ("Internet langganan tidak sedang diblokir.").
- Staf tidak melihat tombol isolir atau blokir. Tombol itu hanya muncul untuk pemilik izin `customer.subscription.suspend` atau `customer.subscription.block`. Staf masih melihat **Kirim pengingat** bila memegang `billing.send`.
- Halaman **Tunggakan** terbuka di **Per pelanggan**, bukan **Per tagihan**: alamat yang Anda buka membawa urutan atau halaman tabel pelanggan. Klik tab **Per tagihan**.
- Tombol **Ekspor** tidak ada: peran Anda tidak memegang `billing.export`.
