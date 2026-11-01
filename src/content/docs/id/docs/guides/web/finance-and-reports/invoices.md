---
title: "7.1 Tagihan"
description: "Menu ini memuat tagihan pelanggan di perusahaan aktif: tagihan bulanan dari langganan, tagihan sekali bayar dari SPK, dan tagihan manual."
---

Menu ini memuat tagihan pelanggan di perusahaan aktif: tagihan bulanan dari langganan, tagihan sekali bayar dari SPK, dan tagihan manual. Buka menu ini untuk menerbitkan tagihan bulanan, mengirim tagihan, mencatat atau membatalkan pembayaran, dan membatalkan tagihan.

Peran yang dapat memakai: admin, manajer, dan staf. Izin dasar: `billing.view`. Teknisi dan pelanggan tidak punya akses web. Tagihan perusahaan lain tidak tampil dan tidak bisa dibuka (galat 404). Setiap tindakan punya izin sendiri:

| Tindakan | Izin | Peran bawaan |
| --- | --- | --- |
| Melihat daftar dan detail, mengunduh PDF | `billing.view` | admin, manajer, staf |
| **Buat tagihan bulanan**, **Buat tagihan** | `billing.create` | admin, manajer, staf |
| **Tambah item**, **Ubah** (draf) | `billing.update`, atau `billing.create` bagi pembuat draf itu | admin, manajer (pembuat draf: juga staf) |
| **Kirim tagihan** | `billing.send` | admin, manajer, staf |
| **Catat pembayaran** | `billing.payment.record` | admin, manajer, staf |
| **Batalkan pembayaran** | `billing.payment.reverse` | admin, manajer |
| **Batalkan tagihan** | `billing.cancel` | admin, manajer |
| **Ekspor** | `billing.export` | admin, manajer |
| **Unduh kuitansi** (tagihan lunas) | `billing.pdf.view` | admin, manajer |
| **Batalkan di Midtrans** | `billing.payment.record` | admin, manajer, staf |

Tombol **Buat tagihan bulanan**, **Buat tagihan**, dan **Ekspor** hanya tampil bagi pemilik izinnya. Di kanan atas halaman detail, **Unduh PDF** selalu ada, **Ubah** tampil pada draf bagi yang boleh mengubahnya, dan **Unduh kuitansi** tampil pada tagihan **Lunas** bagi pemegang `billing.pdf.view`. Kartu **Aksi** menampilkan **Kirim tagihan**, **Catat pembayaran**, **Tambah item**, dan **Batalkan tagihan** menurut status tagihan, bukan menurut izin pengguna. Tombol **Batalkan pembayaran** di tabel **Pembayaran** dan **Batalkan di Midtrans** di kartu **Pembayaran online** juga memeriksa izin sebelum tampil. Server memeriksa semua izin saat tindakan disimpan dan menolak tindakan tanpa izin (galat 403).

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Keuangan & Laporan**, lalu klik **Tagihan**.
2. Di atas daftar ada empat filter: kotak **Cari tagihan** ("Nomor tagihan atau pelanggan"), pilihan **Status**, pilihan **Pelanggan**, dan **Periode**. Daftar langsung menyesuaikan setiap kali Anda mengubah filter.
   - **Status** berisi Semua status, Draf, Belum dibayar, Dibayar sebagian, Lunas, Lewat jatuh tempo, Dibatalkan, Dihapus, dan Semua, termasuk dihapus. Tanpa pilihan khusus, tagihan yang dihapus tidak tampil. Filter ini membaca status yang tersimpan, jadi **Lewat jatuh tempo** baru memuat tagihan setelah pengecekan harian menandainya.
   - **Pelanggan** berupa kotak cari ("Semua pelanggan"): ketik minimal 2 huruf nama atau kode pelanggan, lalu pilih dari hasil (paling banyak 20). Tombol **Hapus pilihan: Pelanggan** mengosongkannya lagi.
   - **Periode** menyaring menurut **Tanggal terbit**, bukan jatuh tempo. Ketik rentang tanggal dalam format tanggal perusahaan atau klik **Buka kalender**. Pilihan cepatnya **Hari ini**, **7 hari terakhir**, **30 hari terakhir**, **Bulan ini**, **Bulan lalu**, dan **Tahun ini**. Tombol **Hapus rentang tanggal** mengosongkannya. Tanggal akhir tidak boleh sebelum tanggal awal.
   - Chip **Pembayaran online tertunda > 1 jam** muncul bila daftar dibuka dari kartu Dasbor dengan nama yang sama. Daftar hanya memuat tagihan yang halaman bayar onlinenya sudah terbuka lebih dari satu jam dan belum kedaluwarsa. Klik tanda hapus pada chip untuk melihat semua tagihan lagi. Filter ini ikut ke berkas ekspor.
   - Chip **Jatuh tempo ≤ 3 hari** muncul bila daftar dibuka dari kartu Dasbor **Jatuh tempo ≤ 3 hari**. Daftar hanya memuat tagihan **Belum dibayar** atau **Dibayar sebagian** yang masih punya sisa dan jatuh temponya dari hari ini sampai 3 hari ke depan, menurut tanggal perusahaan. Klik tanda hapus pada chip untuk melihat semua tagihan lagi. Filter ini ikut ke berkas ekspor.

   ![Daftar tagihan dengan kotak Cari tagihan, filter Status, Pelanggan, dan Periode, serta tombol Ekspor, Buat tagihan bulanan, dan Buat tagihan](~/assets/guide/web/invoices-index.webp)
3. Kolom daftar: **Nomor tagihan** (tautan ke detail), **Pelanggan** (nama dan kode), **Status** (lencana berwarna), **Tanggal terbit**, **Jatuh tempo**, **Total**, **Sisa** (yang belum dibayar), dan **Aksi**. Lencana **Status** membaca tanggal jatuh tempo: tagihan **Belum dibayar** atau **Dibayar sebagian** yang jatuh temponya sudah lewat langsung tampil **Lewat jatuh tempo**, tanpa menunggu pengecekan harian. Daftar urut menurut **Tanggal terbit**, terbaru dulu. Kolom **Nomor tagihan**, **Status**, **Tanggal terbit**, **Jatuh tempo**, dan **Total** bisa diurutkan. Halaman, jumlah baris, dan urutan bekerja seperti di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).
4. Klik nomor tagihan atau tombol **Lihat** di kolom **Aksi** untuk membuka detail. Baris tidak punya tombol **Ubah** atau **Hapus**. Tagihan **Draf** yang dihapus muncul di filter **Status** **Dihapus**; barisnya tidak punya tombol dan menu **Aksi lainnya** berisi **Pulihkan** (izin `billing.delete`), yang mengembalikan draf dengan statusnya semula. Lihat [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).
5. Bila tidak ada hasil, daftar menulis "Tidak ada tagihan yang cocok" dengan tombol **Reset filter**. Bila perusahaan belum punya tagihan, daftar menulis "Belum ada tagihan" dengan tombol **Buat tagihan** (untuk pemilik izin `billing.create`).
6. Tombol **Ekspor** menawarkan **Ekspor CSV** dan **Ekspor PDF**. Berkas memuat kolom Nomor tagihan, Pelanggan, Status, Total, Tanggal terbit, Jatuh tempo, dan Dibuat, sesuai filter yang sedang aktif. Kolom Status di berkas berisi kode status (misalnya `sent`), bukan label lencana.

Sistem memakai enam status tagihan. Lencana di daftar dan di detail menulis labelnya:

| Status | Arti | Langkah berikut |
| --- | --- | --- |
| **Draf** | Baru dibuat, belum dikirim. Pelanggan belum melihatnya. Jatuh tempo, diskon, dan catatan bisa diubah, dan item bisa ditambah atau dihapus. | **Kirim tagihan**, **Ubah**, atau **Batalkan tagihan** |
| **Belum dibayar** | Sudah dikirim, belum ada pembayaran. Pelanggan melihatnya di aplikasi pelanggan. | **Catat pembayaran**, atau **Batalkan tagihan** |
| **Dibayar sebagian** | Sudah dibayar sebagian. | **Catat pembayaran** untuk sisanya, atau **Batalkan pembayaran** |
| **Lewat jatuh tempo** | Lewat jatuh tempo dan belum lunas. | **Catat pembayaran**, atau **Batalkan tagihan** |
| **Lunas** | Lunas. | **Batalkan pembayaran** bila pembayaran salah |
| **Dibatalkan** | Dibatalkan dengan alasan. | Tidak ada |

Tagihan **Belum dibayar** atau **Dibayar sebagian** disimpan sebagai **Lewat jatuh tempo** lewat pengecekan harian bila jatuh tempo sudah lewat dan masih ada sisa. Daftar **Tagihan** dan **Tunggakan** sudah menampilkan **Lewat jatuh tempo** sejak tanggalnya lewat, tetapi halaman detail dan filter **Status** baru mengikutinya setelah pengecekan harian berjalan. Pembayaran sebagian pada tagihan **Lewat jatuh tempo** mengembalikannya ke **Dibayar sebagian** sampai pengecekan berikutnya. Tagihan tidak pernah kembali ke **Draf**.

Untuk tagihan jatuh tempo, klik kartu **Tagihan jatuh tempo** di Dasbor ([bab 2](/docs/guides/web/dashboard/queue-cards/)): daftar terbuka dengan filter **Status** **Lewat jatuh tempo**. Angka kartu dihitung dari tanggal jatuh tempo dan sisa tagihan, jadi bisa lebih besar daripada daftar sampai pengecekan harian berjalan.

## Membuka detail dan mengunduh PDF

1. Klik nomor tagihan atau **Lihat** di daftar.
2. Halaman **Tagihan &lt;nomor&gt;** memuat kartu **Detail** (Pelanggan, Langganan, Tanggal terbit, Jatuh tempo, Jenis, Sumber, Catatan), kartu **Ringkasan** (Status, Subtotal, Pajak, Diskon, Total, Terbayar, Sisa), kartu **Aksi**, tabel **Item** (kolom **Deskripsi**, **Jml**, **Harga satuan**, **Diskon**, **Pajak**, **Total baris**), dan tabel **Pembayaran**. Di kanan atas ada tombol **Kembali**, **Unduh PDF**, dan, menurut status dan izin, **Ubah** dan **Unduh kuitansi**.

   ![Detail tagihan dengan kartu Detail, Ringkasan, dan Aksi](~/assets/guide/web/invoices-show.webp)
3. Angka tampil sebagai rupiah penuh, misalnya Rp 120.000. Tanggal mengikuti format tanggal perusahaan, dan kolom **Dibayar pada** memakai jam 24 jam.
4. **Jenis** dan **Sumber** menunjukkan asal tagihan. Jenis Berlangganan dengan sumber Langganan adalah tagihan bulanan. Jenis Sekali bayar dengan sumber SPK adalah tagihan dari SPK. Jenis Sekali bayar dengan sumber Manual dibuat lewat **Buat tagihan**.
5. Klik **Unduh PDF** untuk mengunduh berkas yang dinamai nomor tagihan, misalnya `<nomor>.pdf`. Berkas terbuka di tab baru. PDF memuat nama dan alamat perusahaan, "TAGIHAN" dan nomornya, tanggal, jatuh tempo, periode (tagihan bulanan), status dalam huruf kapital, "Kepada:" diikuti pelanggan, alamat, "NPWP:" (bila ada), dan kode langganan dengan nama paket, tabel item, Subtotal, PPN dan Diskon (bila bernilai), Total, Terbayar dan Sisa (bila sudah ada pembayaran aktif), "Terbilang:", dan bagian "Pembayaran:" dengan isi **Rekening pembayaran** dari Pengaturan Perusahaan ([bagian 8.1](/docs/guides/web/administration/company/)) bila terisi. Tanggal di PDF ditulis hari/bulan/tahun. Tagihan yang sudah terbit mencetak nama, alamat, NPWP, dan paket seperti saat terbit, walau pelanggan atau paketnya sudah diganti nama atau dipindah. Di halaman detail, blok **Detail** menulis Pelanggan, Alamat, NPWP, dan Paket yang sama, dengan "(saat terbit)" di samping nama bila nama pelanggan sekarang berbeda. Draf mengikuti data yang berlaku.
6. Pada tagihan **Lunas**, klik **Unduh kuitansi** (izin `billing.pdf.view`). Berkas `Kuitansi-<nomor>.pdf` terbuka di tab baru. Kuitansi memuat nama dan alamat perusahaan, "KUITANSI PEMBAYARAN", "No. KWT/&lt;nomor tagihan&gt;", tanggal pelunasan, "Lunas", "Telah diterima dari:" diikuti pelanggan, alamat, dan "NPWP:" (bila ada), "Untuk pembayaran tagihan &lt;nomor&gt;" dengan periode dan kode langganan bila ada, tabel pembayaran aktif (**Tanggal bayar**, **Metode**, **Referensi**, **Jumlah**), "Total dibayar", dan "Terbilang:". Kuitansi tidak punya blok rekening pembayaran, tidak memuat pembayaran yang dibatalkan, dan hanya mencetak order ID pada pembayaran online: **Referensi** yang Anda ketik sendiri tidak dicetak. Tagihan yang belum lunas ditolak dengan "Kuitansi hanya untuk tagihan yang sudah lunas." Kuitansi yang diunduh pelanggan dari aplikasi memakai berkas yang sama.
7. Kartu **Pembayaran online** muncul bila pembayaran online Midtrans aktif atau tagihan sudah punya percobaan bayar. Tabelnya memuat **Status**, **Jumlah**, **Metode**, **ID transaksi**, **Dibuat**, dan **Selesai**. **Metode** ditulis seperti staf menyebutnya, misalnya `VA BCA`, `Kartu •••• 1114`, `GoPay`, atau `QRIS`, dan kosong sampai pelanggan memilih metode. Pelanggan membayar lewat aplikasi pelanggan, lalu pembayaran masuk ke tagihan setelah Midtrans mengonfirmasi. Percobaan berstatus Menunggu, Lunas, Gagal, Kedaluwarsa, Perlu dicek, atau Ditutup. **Ditutup** berarti Inbils sendiri menutup halaman bayar karena tagihannya sudah dibayar (tunai atau transfer yang Anda catat, juga sebagian, sebab jumlah di halaman itu tidak lagi sama dengan sisa) atau dibatalkan selagi halaman masih terbuka. Alasannya tertulis "Tagihan dibayar atau dibatalkan saat halaman pembayaran masih terbuka." Inbils lalu meminta Midtrans membatalkan transaksinya dari antrean, jadi pembayaran tunai Anda tetap tercatat meski Midtrans sedang tidak terjangkau. Pelanggan yang masih punya sisa menekan **Bayar** lagi untuk mendapat halaman baru. Bila uang tetap masuk lewat halaman yang sudah Ditutup dan tagihan tidak bisa menerimanya lagi (misalnya sudah lunas), percobaan itu menjadi Perlu dicek. Percobaan yang gagal dibukukan (misalnya nominal berbeda atau refund) berstatus Perlu dicek, dengan "Alasan:" di bawah lencananya, dan tidak dibalik otomatis. Alasan itu berbahasa Indonesia, misalnya `Ditolak sistem deteksi penipuan`, `Ditolak bank: ...`, `Dibatalkan di Midtrans`, `Gagal diproses Midtrans`, atau `Halaman bayar kedaluwarsa sebelum pelanggan memilih metode`. Pengguna dengan izin `billing.payment.reverse` membatalkan pembayaran yang sudah tercatat bila uang memang kembali.
8. Di bawah tiap percobaan, klik **Riwayat notifikasi Midtrans** untuk membuka sampai lima panggilan terakhir dari Midtrans untuk halaman bayar itu, yang terbaru di atas. Setiap baris menulis `Diterima <tanggal dan jam> · <status transaksi> · dijawab <kode>`, dengan kode jawaban Inbils. Bila ada lima baris, tertulis "Notifikasi yang lebih lama tidak ditampilkan." Percobaan yang belum menerima panggilan menulis "Tidak ada notifikasi tercatat." Pakai riwayat ini untuk memeriksa apakah Midtrans sudah memberi kabar tentang pembayaran pelanggan.
9. Percobaan berstatus **Menunggu** punya tombol **Batalkan di Midtrans** (izin `billing.payment.record`). Dialog **Batalkan pembayaran online?** menulis "Halaman bayar ini ditutup dan Midtrans diminta membatalkan transaksinya. Pelanggan tidak bisa lagi membayar lewat halaman itu, tetapi bisa membuka halaman bayar baru dari aplikasi." dan menyebut **Jumlah**, **Dibuat**, dan **Metode**. Klik **Batalkan di Midtrans** untuk melanjutkan. Toast "Pembatalan dikirim ke Midtrans." muncul. Bila halaman bayar sudah tidak menunggu saat Anda mengklik, dialog menulis "Hanya pembayaran yang masih menunggu yang bisa dibatalkan."

## Menerbitkan tagihan bulanan

Izin yang dibutuhkan: `billing.create`. Sistem juga menjadwalkan penerbitan yang sama untuk bulan sebelumnya setiap hari pukul 02:00 UTC (09:00 WIB). Jendela ini dapat dipakai untuk memeriksa dan menerbitkan periode pilihan.

1. Klik **Buat tagihan bulanan**. Jendela **Buat tagihan bulanan** terbuka.
2. Isi **Periode** dengan bulan yang ditagih. Isian ini sudah terisi bulan lalu. Ketik bulannya (misalnya `Oktober 2026`, `10/2026`, atau `2026-10`) atau klik **Buka pilihan bulan** dan pilih dari 12 bulan dalam satu tahun. Tombol **Hapus bulan** mengosongkan isian.

   ![Jendela Buat tagihan bulanan dengan isian Periode dan tombol Batal dan Lihat pratinjau](~/assets/guide/web/invoices-generate.webp)
3. Klik **Lihat pratinjau**. Jendela menulis `<n> tagihan akan dibuat, <m> dilewati.` dan menampilkan tabel **Pelanggan**, **Paket**, **Hari aktif**, dan **Total**. **Hari aktif** adalah hari aktif dibanding jumlah hari dalam bulan (misalnya 15/30), dan nilai di bawah penuh berarti tagihan prorata. **Total** sudah termasuk PPN.
4. Periksa tabel. Bila Anda mengganti **Periode**, pratinjau terhapus dan Anda perlu klik **Lihat pratinjau** lagi. Tombol **Batal** menutup jendela tanpa membuat tagihan.
5. Klik **Buat &lt;n&gt; tagihan**. Tombol ini hanya ada bila pratinjau memuat tagihan baru. Bila tidak ada, tabel menulis "Tidak ada tagihan baru untuk periode ini."
6. Toast `Tagihan <periode>: <n> dibuat, <m> dilewati.` muncul (periode ditulis seperti `2026-06`) dan jendela tertutup.

Yang dibuat dan dilewati:

- Ikut ditagih: langganan Aktif atau Berhenti yang sudah aktif pada akhir periode dan belum berhenti sebelum awal periode. Langganan Menunggu dan Ditangguhkan tidak ikut.
- Nominal: MRC langganan. Langganan yang mulai aktif atau berhenti di tengah bulan ditagih prorata menurut hari aktif.
- Dilewati: langganan yang sudah punya tagihan bulanan untuk periode itu, **dalam status apa pun, termasuk Dibatalkan**, dan langganan bernominal 0. Periode yang tagihannya Anda batalkan tidak diterbitkan ulang oleh jadwal harian maupun tombol ini. Bila pelanggan memang harus ditagih untuk periode itu, buat tagihan manual (**Buat tagihan**). Menjalankan ulang periode yang sama tidak membuat tagihan ganda, juga bila dua proses berjalan bersamaan. Satu langganan yang gagal diproses tidak menghentikan yang lain: toast menambahkan ", &lt;n&gt; gagal" dan jadwal harian memberi tahu admin perusahaan.
- Setiap tagihan baru memakai nomor otomatis ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)), berjenis Berlangganan, bersumber Langganan, dan langsung berstatus **Belum dibayar**. Tidak ada tahap **Draf**, jadi pratinjau adalah satu-satunya pemeriksaan.
- **Tanggal terbit** adalah hari ini. **Jatuh tempo** adalah hari ini ditambah isian **Jatuh tempo tagihan** (bawaan 14 hari). PPN memakai isian **Tarif PPN** (bawaan 11). Keduanya diatur di Pengaturan Perusahaan ([bagian 8.1](/docs/guides/web/administration/company/)).
- Satu item bertulis `MRC <nama paket> <tanggal awal> s/d <tanggal akhir>`, ditambah ` (prorata <hari aktif>/<hari dalam bulan> hari)` bila prorata. Tanggal di teks item ditulis tahun-bulan-tanggal.

## Membuat tagihan manual

Izin yang dibutuhkan: `billing.create`. Pakai tagihan manual untuk biaya di luar langganan bulanan. Data tagihan dan itemnya diisi dalam satu form.

1. Klik **Buat tagihan**. Halaman **Buat tagihan** terbuka dengan kartu **Data tagihan** dan kartu **Item**.
2. Di kartu **Data tagihan**, isi:
   - **Pelanggan**: wajib. Kotak cari ("Cari nama atau kode pelanggan"): ketik minimal 2 huruf, lalu pilih dari hasil. Hasilnya hanya pelanggan aktif, paling banyak 20.
   - **Langganan (opsional)**: kotak cari ("Cari kode langganan"). Pilih **Pelanggan** lebih dulu. Daftar lalu hanya memuat langganan Menunggu dan Aktif milik pelanggan itu, dan daftar kosong bila pelanggan itu tidak punya langganan seperti itu. Bila pelanggan hanya punya satu langganan seperti itu, langganan itu terpilih sendiri. Ketik minimal 2 huruf kode langganan atau nama pelanggan, lalu pilih. Nama pelanggan tampil di bawah kode langganan. Bila Anda mengganti **Pelanggan**, isian ini dikosongkan dan daftar berganti ke langganan pelanggan baru. Sebelum **Pelanggan** dipilih, daftar memuat langganan semua pelanggan. Server menolak langganan milik pelanggan lain.
   - **Tanggal terbit**: opsional, pemilih tanggal. Ketik tanggal dalam format tanggal perusahaan atau klik **Buka kalender** (**Pilih tanggal**, **Hari ini**, **Hapus tanggal**). Kosong berarti hari ini.
   - **Jatuh tempo**: sudah terisi sebanyak isian **Jatuh tempo tagihan** di Pengaturan Perusahaan (0 sampai 365 hari, bawaan 14, [bagian 8.1](/docs/guides/web/administration/company/)) sesudah tanggal terbit, atau sesudah hari ini bila **Tanggal terbit** kosong. Petunjuk di bawah isian menulis "Otomatis {n} hari setelah tanggal terbit. Ubah jika perlu." Selama Anda belum mengubahnya sendiri, **Jatuh tempo** ikut bergeser bila Anda mengganti **Tanggal terbit**. Di bawahnya ada **Pilihan cepat**: **7 hari**, **14 hari**, dan **Akhir bulan**. Ketiganya dihitung dari tanggal terbit (hari ini bila kosong). **Jatuh tempo** tidak boleh sebelum tanggal terbit.
   - **Catatan**: opsional, maksimal 5000 karakter.

   ![Form Buat tagihan dengan kartu Data tagihan berisi Pelanggan, Langganan (opsional), Tanggal terbit, Jatuh tempo, dan Catatan, serta kartu Item](~/assets/guide/web/invoices-create.webp)
3. Di kartu **Item**, isi baris pertama. Kartu menulis "Setiap baris dikenai PPN {n}% sesuai pengaturan perusahaan, dihitung per baris dan dibulatkan ke rupiah." Tidak ada isian pajak atau diskon per baris.
   - **Deskripsi**: wajib bila baris terisi, maksimal 500 karakter.
   - **Kuantitas**: angka dari 0,01 sampai 100000 dengan paling banyak dua angka di belakang koma. Terisi 1 sejak awal.
   - **Harga satuan**: nominal rupiah, 0 atau lebih.
   - **Total baris**: terhitung sendiri dari kuantitas kali harga, dibulatkan ke rupiah.
4. Klik **Tambah item** untuk baris berikutnya (paling banyak 20 item per tagihan), atau **Hapus** pada sebuah baris untuk membuangnya. Baris yang **Deskripsi** dan **Harga satuan**-nya kosong tidak ikut disimpan. Setelah ada item, kanan bawah kartu menulis **Subtotal**, **PPN** dengan tarifnya, dan **Total**. Tanpa item, kartu menulis "Belum ada item terisi. Tagihan tetap bisa disimpan sebagai draf kosong, tetapi baru bisa dikirim setelah punya item."
5. Klik **Simpan**. Toast "Tagihan dibuat." muncul dan Anda kembali ke daftar. Tagihan baru berstatus **Draf**, berjenis Sekali bayar, bersumber Manual, dengan total dari item (0 bila tanpa item) dan nomor otomatis dari **Penomoran** ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)). **Batal** dan **Kembali** menutup form tanpa menyimpan.
6. Cari tagihan itu lewat **Cari tagihan** atau filter **Pelanggan**, lalu klik **Lihat** untuk memeriksa, mengubah, atau mengirimnya.

## Mengubah tagihan draf, menambah item, dan mengirim

Izin yang dibutuhkan: `billing.update`, atau `billing.create` bagi pembuat draf itu, untuk **Ubah** dan **Tambah item**, serta `billing.send` untuk **Kirim tagihan**. Hanya tagihan **Draf** yang bisa diubah atau diberi item.

1. Buka detail tagihan **Draf**. Klik **Ubah** di kanan atas bila jatuh tempo, diskon, atau catatan perlu berubah (langkah di bawah). Klik **Tambah item** di kartu **Aksi** bila item perlu ditambah.
2. Isi jendela **Tambah item**:
   - **Deskripsi**: wajib, maksimal 500 karakter.
   - **Kuantitas**: wajib, angka minimal 0,01. Terisi 1 sejak awal.
   - **Harga satuan**: wajib, angka minimal 0.
   - **Diskon**: opsional, nominal rupiah per baris (bukan persen), minimal 0. Terisi 0 sejak awal.
   - Di bawah isian, jendela menulis "Pajak PPN {n}% mengikuti pengaturan perusahaan, dihitung per baris." Tidak ada isian pajak.
3. Klik **Simpan**. Toast "Item ditambahkan." muncul, lalu tabel **Item** dan kartu **Ringkasan** terhitung ulang. Ulangi untuk item berikutnya. Isian yang ditolak diberi pesan merah di bawahnya, misalnya "Deskripsi wajib diisi.", "Kuantitas wajib diisi.", atau "Harga satuan wajib diisi.".
4. Periksa **Total** di kartu **Ringkasan**, lalu klik **Kirim tagihan**. Dialog **Kirim tagihan {nomor}?** menyebut pelanggan, jumlah, dan jatuh tempo, serta bahwa pelanggan menerima notifikasi di aplikasi (dan WhatsApp bila aktif) dan item tidak bisa diubah lagi. Klik **Kirim tagihan** di dialog. Toast "Tagihan dikirim." muncul dan status menjadi **Belum dibayar**.

Per baris, **Total baris** adalah **Kuantitas** kali **Harga satuan** dikurangi **Diskon**. Pajak baris adalah **Total baris** kali tarif PPN perusahaan dibagi 100. **Total** adalah jumlah **Total baris** ditambah jumlah pajak, dikurangi diskon tagihan bila ada.

- Pajak tidak diisi per baris. Setiap baris, juga pada tagihan bulanan dan tagihan dari SPK, memakai **Tarif PPN** di Pengaturan Perusahaan (0 sampai 100, [bagian 8.1](/docs/guides/web/administration/company/)). Tarif yang berlaku saat baris dibuat tersimpan di baris itu dan tampil di kolom **Pajak** tabel **Item**, jadi mengubah tarif perusahaan tidak mengubah baris lama.
- Item draf tidak bisa diubah. Klik **Hapus** di tabel **Item**, konfirmasi **Hapus item {deskripsi}?** ("Total tagihan dihitung ulang tanpa item ini."), lalu tambahkan lagi dengan nilai yang benar. Toast "Item dihapus." muncul. Setelah **Kirim tagihan**, item tidak bisa ditambah. Server menolak dengan "Hanya tagihan draf yang bisa diberi item." Bila isi tagihan terkirim salah, batalkan tagihan itu (lihat di bawah) dan buat ulang.
- **Kirim tagihan** nonaktif selama draf belum punya item atau totalnya Rp 0. Petunjuknya menulis "Tambahkan minimal satu item sebelum mengirim." Server juga menolak keadaan itu dengan "Tagihan tanpa item atau bernilai Rp 0 tidak bisa dikirim."
- Setelah **Kirim tagihan**, pelanggan melihat tagihan di aplikasi pelanggan. Pelanggan juga menerima WhatsApp "Tagihan terbit" bila WhatsApp aktif di Pengaturan Perusahaan ([bagian 8.1](/docs/guides/web/administration/company/)), jenis pesan itu dicentang, dan pelanggan sudah menyetujui pesan WhatsApp.

Untuk mengubah data draf:

1. Klik **Ubah** di halaman detail draf. Halaman **Ubah tagihan {nomor}** terbuka. Kartu **Draf saat ini** menulis Pelanggan, Langganan, Tanggal terbit, Total saat ini, dan tabel item (**Deskripsi**, **Jml**, **Total baris**) yang hanya dibaca. Tautan **Kelola item di halaman tagihan** kembali ke detail.

   ![Halaman Ubah tagihan dengan kartu Draf saat ini dan kartu Yang bisa diubah berisi Jatuh tempo, Diskon, dan Catatan](~/assets/guide/web/invoices-edit.webp)

2. Di kartu **Yang bisa diubah**, isi:
   - **Jatuh tempo**: tidak boleh sebelum tanggal terbit ("Jatuh tempo tidak boleh sebelum tanggal terbit.").
   - **Diskon**: nominal rupiah untuk seluruh tagihan. Petunjuknya: "Dikurangkan dari subtotal ditambah pajak. Total dihitung ulang saat disimpan." Diskon tidak boleh melebihi subtotal ditambah pajak ("Diskon tidak boleh melebihi subtotal ditambah pajak."). Isian yang dikosongkan dihitung 0.
   - **Catatan**: opsional, maksimal 5000 karakter.
3. Klik **Simpan**. Toast "Tagihan diperbarui." muncul dan Anda kembali ke daftar. **Batal** kembali ke halaman detail tanpa menyimpan.

Pelanggan, langganan, dan tanggal terbit tidak bisa diubah. Bila tagihan bukan draf, halaman detail muncul dengan pesan "Hanya tagihan draf yang bisa diubah." Bila orang lain menyimpan draf yang sama lebih dulu, halaman menampilkan peringatan dengan "Muat ulang halaman untuk melihat data terbaru, lalu ulangi perubahan Anda." dan tombol **Muat ulang**.

## Mencatat pembayaran

Izin yang dibutuhkan: `billing.payment.record`. Hanya tagihan **Belum dibayar**, **Dibayar sebagian**, dan **Lewat jatuh tempo** yang punya sisa dan menerima pembayaran.

1. Buka detail tagihan, lalu klik **Catat pembayaran**. Jendela menulis "Sisa tagihan:" diikuti sisa tagihan.

   ![Jendela Catat pembayaran dengan sisa tagihan dan isian Jumlah, Metode, Referensi, dan Catatan](~/assets/guide/web/invoices-payment.webp)
2. Isi form:
   - **Jumlah**: wajib, angka lebih dari nol dan tidak lebih besar dari sisa. Pembayaran sebagian boleh. Isian ini terisi sisa tagihan sejak awal, dengan petunjuk "Sisa tagihan: Rp ...". Bila Anda mengubahnya, tombol **Lunas penuh** muncul untuk mengembalikan jumlah ke sisa.
   - **Tanggal bayar**: terisi hari ini. Ubah bila uang diterima sebelum hari ini. Tanggal tidak boleh setelah hari ini ("Tanggal bayar tidak boleh setelah hari ini.") dan tidak boleh sebelum tanggal terbit tagihan ("Tanggal bayar tidak boleh sebelum tanggal terbit tagihan."). Pembayaran bertanggal mundur masuk ke laporan hari yang Anda pilih, dengan jam saat Anda mencatat.
   - **Metode**: pilih **Tunai**, **Transfer**, **Cek**, atau **Lainnya**. Awalnya metode yang terakhir Anda pakai di browser ini, atau **Tunai** bila belum ada. Metode Midtrans hanya ditulis sistem untuk pembayaran online dan tidak ada di pilihan ini.
   - **Referensi**: opsional, maksimal 255 karakter (nomor transfer atau cek). Tidak boleh sama dengan referensi pembayaran aktif lain di perusahaan.
   - **Catatan**: opsional, maksimal 500 karakter.
3. Klik **Simpan**. Toast "Pembayaran dicatat." muncul dan pembayaran masuk ke tabel **Pembayaran** dengan status **Aktif**.

Tabel **Pembayaran** menyimpan riwayat pembayaran: **Jumlah**, **Metode**, **Referensi**, **Dibayar pada**, dan **Status**. Pembayaran yang dibatalkan tetap tampil dengan status **Dibatalkan**.

Pencatat tersimpan otomatis. Status menjadi **Lunas** bila jumlah pembayaran aktif sudah menyamai **Total**, selain itu **Dibayar sebagian**. Pembayaran tidak bisa diubah atau dihapus. Koreksi salah catat dengan **Batalkan pembayaran**, lalu catat ulang. Pelanggan juga menerima WhatsApp "Pembayaran diterima" dengan tiga syarat yang sama seperti "Tagihan terbit" di atas. Setiap pembayaran yang Anda catat, juga yang sebagian, menutup halaman pembayaran online yang masih terbuka (status **Ditutup**), karena jumlah di halaman itu tidak lagi sama dengan sisa. Bila ada halaman online yang masih terbuka, jendela **Catat pembayaran** lebih dulu menulis peringatan "Ada pembayaran online yang masih terbuka" yang menyebut nomor order dan waktunya, serta bahwa halaman itu akan ditutup. Bila pelanggan tetap membayar lewat halaman itu, uangnya masuk ke daftar **Perlu dicek** di Tunggakan ([bagian 7.2](/docs/guides/web/finance-and-reports/arrears/)). Pelanggan yang masih punya sisa membuka halaman baru dengan **Bayar**.

## Membatalkan pembayaran

Izin yang dibutuhkan: `billing.payment.reverse`. Pembatalan ini juga disebut membalik pembayaran. Pencatat pembayaran tidak boleh membatalkannya sendiri. Pengguna lain dengan izin yang sama yang membatalkan.

1. Di tabel **Pembayaran**, klik **Batalkan pembayaran** pada baris pembayaran berstatus **Aktif**. Tombol tidak tampil tanpa izin.
2. Baca penjelasan di jendela **Batalkan pembayaran**: "Membatalkan pembayaran mengurangi jumlah terbayar pada tagihan dan menghitung ulang statusnya. Pembayaran ditandai dibatalkan beserta pelakunya." Isi **Alasan**: wajib, maksimal 500 karakter.
3. Klik **Konfirmasi pembatalan**. Toast "Pembayaran dibatalkan." muncul dan baris itu berstatus **Dibatalkan**. Tombol **Kembali** menutup jendela tanpa membatalkan.

Setelah pembatalan, tagihan menjadi **Belum dibayar** bila tidak ada pembayaran aktif tersisa, **Lunas** bila pembayaran aktif masih menutup **Total**, dan **Dibayar sebagian** selain itu. Pembayaran Midtrans dicatat oleh sistem, bukan oleh pengguna, jadi siapa pun dengan izin dapat membatalkannya.

Untuk tagihan **Lunas**, tombol **Batalkan tagihan** tidak ada. Batalkan pembayarannya sampai status kembali **Belum dibayar**, lalu batalkan tagihannya bila memang perlu.

## Membatalkan tagihan

Izin yang dibutuhkan: `billing.cancel`. Pembatalan tidak bisa dibatalkan lagi.

1. Buka detail tagihan, lalu klik **Batalkan tagihan** di kartu **Aksi**. Tombol tidak ada untuk tagihan **Lunas** dan **Dibatalkan**. Tombol ini tampil juga untuk tagihan **Dibayar sebagian**, tetapi server menolaknya (lihat di bawah).
2. Di jendela **Batalkan tagihan**, isi **Alasan**: wajib, maksimal 500 karakter.
3. Klik **Konfirmasi pembatalan**. Toast "Tagihan dibatalkan." muncul, status menjadi **Dibatalkan**, dan alasan tampil di kartu **Detail** sebagai **Alasan pembatalan**. Tombol **Kembali** menutup jendela tanpa membatalkan.

Sistem menolak pembatalan bila tagihan masih punya pembayaran aktif ("Tagihan yang punya pembayaran aktif tidak bisa dibatalkan. Batalkan pembayarannya dulu."). Batalkan semua pembayarannya dulu, termasuk pada tagihan **Lunas**. Sistem juga menolak bila Anda pembuat tagihan itu ("Tagihan yang Anda buat sendiri tidak bisa Anda batalkan.").

- Pembuat tagihan manual adalah pengguna yang mengklik **Simpan** di form **Buat tagihan**.
- Pembuat tagihan dari SPK adalah penyetuju SPK.
- Tagihan hasil **Buat tagihan bulanan** tidak punya pembuat, jadi siapa pun dengan izin dapat membatalkannya.
- Tagihan bulanan yang dibatalkan mengunci periodenya: penerbitan berikutnya untuk periode itu, dari jadwal harian maupun **Buat tagihan bulanan**, melewatinya dan tidak membuat tagihan baru. Tagihan yang dibatalkan karena salah harus diganti dengan tagihan manual (**Buat tagihan**).
- Membatalkan tagihan juga menutup halaman pembayaran online yang masih terbuka (status **Ditutup** di kartu **Pembayaran online**). Membatalkan **Draf** membekukan nama pelanggan, alamat, NPWP, dan paket yang berlaku saat itu, seperti tagihan yang dikirim.

## Halaman setelah pembayaran online

Pelanggan yang membayar dari aplikasi pelanggan dikembalikan ke halaman publik `/pembayaran/selesai` setelah Midtrans selesai. Halaman ini tidak memuat nomor order, jumlah, atau nama, dan tidak mengubah tagihan: yang menentukan status tetap tagihan di aplikasi dan di Inbils. Judulnya mengikuti status transaksi yang dibawa alamat dari Midtrans:

- **Pembayaran berhasil**: "Tagihan ditandai lunas begitu Midtrans mengonfirmasi pembayaran. Lihat statusnya di aplikasi Inbils."
- **Menunggu pembayaran**: "Selesaikan pembayaran lewat metode yang Anda pilih. Tagihan ditandai lunas setelah pembayaran diterima."
- **Pembayaran tidak berhasil**: "Coba lagi dari aplikasi." Ini berlaku untuk pembayaran yang ditolak, dibatalkan, kedaluwarsa, atau gagal.
- **Pembayaran sedang diproses**: "Silakan kembali ke aplikasi Inbils untuk melihat status tagihan." Halaman ini muncul bila alamat tidak membawa status yang dikenal.

Tombol **Buka aplikasi Inbils** tampil bila operator platform sudah mengisi tautan Play Store aplikasi pelanggan, atau bila halaman dibuka di ponsel Android. Pelanggan yang bertanya apakah pembayarannya masuk perlu melihat tagihan di aplikasi, atau Anda cek **Riwayat notifikasi Midtrans** di detail tagihan.

![Halaman setelah pembayaran online dengan judul Pembayaran berhasil dan keterangan di bawahnya](~/assets/guide/web/payment-finished.webp)

## Melihat tagihan dari SPK

Tagihan sekali bayar dibuat hanya dari persetujuan SPK **Instalasi** yang punya biaya untuk ditagih.

1. Setujui SPK **Instalasi** yang menunggu review. Status SPK menjadi **Selesai**.
2. Sistem membuat tagihan bila langganan punya biaya pemasangan lebih dari Rp 0, atau bila **Tagihkan bahan terpakai** aktif dan SPK punya bahan terpakai. Biaya paket menjadi baris **Biaya pemasangan**. Setiap bahan menjadi **Bahan terpakai: {nama barang}**.
3. Bila **Kirim tagihan pemasangan otomatis** aktif, tagihan langsung menjadi **Belum dibayar**. Bila mati, tagihan tetap **Draf**, staf penagihan menerima notifikasi, dan kartu **Tagihan draf menunggu dikirim** muncul di Dasbor Keuangan.
4. Untuk draf, buka **Tagihan**, periksa item, tambahkan atau hapus item bila perlu, lalu klik **Kirim tagihan**. Draf tanpa item atau dengan total Rp 0 tidak dapat dikirim.

Satu SPK paling banyak punya satu tagihan. SPK **Perawatan**, **Peningkatan layanan**, dan **Pindah lokasi** tidak membuat tagihan melalui alur pemasangan ini.

## Memantau jatuh tempo dan isolir otomatis

- Setiap hari pukul 03:00 UTC (10:00 WIB), tagihan **Belum dibayar** dan **Dibayar sebagian** yang jatuh temponya sudah lewat dan masih ada sisa menjadi **Lewat jatuh tempo**.
- Bila WhatsApp aktif, pelanggan menerima pengingat 3 hari dan 1 hari sebelum jatuh tempo, dan 1 hari sesudahnya. Pesan ini bernama "Pengingat jatuh tempo (H-3, H-1, H+1)" di Pengaturan Perusahaan dan dikirim setiap hari pukul 01:00 UTC (08:00 WIB). Staf juga bisa mengirim pengingat kapan saja lewat **Kirim pengingat** di Tunggakan ([bagian 7.2](/docs/guides/web/finance-and-reports/arrears/)), paling banyak sekali sehari untuk satu tagihan.
- Isolir otomatis mati sampai admin menyalakan saklar **Tangguhkan langganan yang menunggak** di kartu **Penangguhan otomatis** di Pengaturan Perusahaan ([bagian 8.1](/docs/guides/web/administration/company/)). **Batas keterlambatan** menentukan batas hari (bawaan 7, isian 1 sampai 60).
- Setiap hari pukul 08:00 UTC (15:00 WIB), langganan Aktif yang punya tagihan belum lunas dengan jatuh tempo lebih dari batas hari lalu diisolir (status Ditangguhkan, sumber tunggakan). Tepat pada batas hari belum diisolir, satu hari lebih lama sudah. Alasan isolir yang sistem tulis sendiri berbahasa Inggris ("Automatic isolir: an invoice is more than N days past due.").
- Pelanggan kehilangan layanannya. Akun jaringan yang disinkronkan ke RADIUS masuk grup isolir perusahaan dan sesinya diputus ([bab 5](/docs/guides/web/network/locations/)). Langganan Ditangguhkan tidak ditagih bulanan lagi.
- Pembayaran membuka isolir otomatis bila saklar **Aktifkan kembali saat tagihan lunas** menyala (bawaan menyala), langganan itu Ditangguhkan dengan sumber tunggakan, tagihannya yang sudah jatuh tempo saat isolir sudah lunas, dan tidak ada tagihan yang melewati batas hari. Pembayaran sebagian belum cukup, dan proses berjalan lewat antrean.
- Isolir manual tidak dibuka otomatis. Blokir juga tidak dicabut oleh pembayaran ([bagian 7.2](/docs/guides/web/finance-and-reports/arrears/)).
- Pengiriman, perubahan draf, pembayaran, pembatalan pembayaran, pengingat manual, pembatalan di Midtrans, dan pembatalan tagihan tercatat di Log Audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)).

## Kesalahan umum

- Staf menekan **Tambah item**, **Ubah**, atau **Batalkan tagihan** dan ditolak (403). Tindakan itu perlu `billing.update` (kecuali pada draf buatan sendiri, yang cukup dengan `billing.create`) dan `billing.cancel`. Minta admin atau manajer melakukannya.
- Toast "Data gagal disimpan. Periksa input." di jendela **Tambah item**, **Catat pembayaran**, **Batalkan tagihan**, atau **Batalkan pembayaran** berarti satu isian ditolak. Pesan merahnya tampil di bawah isian itu, misalnya "Alasan pembatalan wajib diisi." atau "Jumlah wajib diisi.". Perbaiki isiannya lalu simpan lagi.
- **Jumlah** lebih besar dari sisa ditolak (galat 422, "Jumlah pembayaran melebihi sisa tagihan."). **Referensi** yang sama dengan pembayaran aktif lain juga ditolak ("Referensi pembayaran sudah ada."). Perbaiki isiannya. Tagihan yang statusnya tidak menerima pembayaran ditolak dengan "Tagihan tidak menerima pembayaran pada statusnya saat ini."
- Pembatalan atau pembatalan pembayaran oleh pembuatnya ditolak ("Tagihan yang Anda buat sendiri tidak bisa Anda batalkan.", "Pembayaran yang Anda catat sendiri tidak bisa Anda batalkan."). Minta pengguna lain dengan izin yang sama.
- Pembatalan tagihan ditolak bila ada pembayaran aktif ("Tagihan yang punya pembayaran aktif tidak bisa dibatalkan. Batalkan pembayarannya dulu."). Batalkan pembayarannya dulu. Bila tagihan atau pembayaran sudah dibatalkan, server menjawab "Tagihan sudah dibatalkan." atau "Pembayaran sudah dibatalkan.".
- Draf tanpa item atau dengan **Total** Rp 0 tidak bisa dikirim. Tambahkan item bernilai lebih dari Rp 0 sebelum **Kirim tagihan**.
- Periode tagihan bulanan tidak boleh melewati bulan berjalan. Untuk bulan berjalan, pratinjau menampilkan peringatan dan tombol pembuatan baru aktif setelah Anda mencentang **Saya mengerti, buat tagihan periode berjalan**. Bulan depan ditolak dengan "Periode tagihan paling lambat bulan berjalan.".
- **Langganan (opsional)** kosong lagi setelah Anda mengganti **Pelanggan**. Ini disengaja karena daftar langganan mengikuti pelanggan. Pilih langganannya lagi. Bila server menolak simpan dengan pesan merah "langganan yang dipilih tidak sesuai dengan pelanggan yang dipilih.", langganan itu milik pelanggan lain: pilih pelanggan yang benar atau kosongkan isiannya. Pesan "Langganan yang dipilih tidak ditemukan." berarti langganan itu bukan milik perusahaan ini atau sudah dihapus.
- Halaman **Ubah** tidak bisa dibuka untuk tagihan yang sudah dikirim: halaman detail muncul dengan pesan "Hanya tagihan draf yang bisa diubah." Untuk tagihan terkirim, hanya pembatalan yang tersedia.
- Simpan di halaman **Ubah** ditolak dengan "Diskon tidak boleh melebihi subtotal ditambah pajak." bila diskon lebih besar dari subtotal ditambah pajak. Kurangi diskon, atau tambah item lebih dulu.
- **Jatuh tempo** tagihan manual terisi dari isian **Jatuh tempo tagihan** di Pengaturan Perusahaan, dihitung dari **Tanggal terbit**. Tanggal itu tidak boleh sebelum tanggal terbit ("Jatuh tempo tidak boleh sebelum tanggal terbit.").
- Tagihan bulanan memakai isian **Jatuh tempo tagihan** di Pengaturan Perusahaan ([bagian 8.1](/docs/guides/web/administration/company/)). Awalan nomor tagihan diatur di **Penomoran** ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)).
