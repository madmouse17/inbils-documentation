---
title: "3.4 Tiket"
description: "Tiket mencatat keluhan atau gangguan layanan, dari pelanggan, dari NOC (pemantau jaringan), atau dari laporan internal."
---

Tiket mencatat keluhan atau gangguan layanan, dari pelanggan, dari NOC (pemantau jaringan), atau dari laporan internal. Buka menu ini untuk mencatat laporan, menugaskan petugas, memantau tenggat SLA, dan menerbitkan SPK perbaikan bila perlu. Petugas lapangan mengerjakan tiket di aplikasi teknisi.

Peran yang dapat memakai: admin, manajer, staf. Izin `ticket.view` membuka menu, `ticket.create` membuat tiket, `ticket.export` mengekspor daftar. Dengan peran bawaan:

- Admin memegang semua izin tiket.
- Manajer memegang `ticket.view`, `ticket.create`, `ticket.update`, `ticket.assign`, `ticket.reassign`, `ticket.close`, `ticket.reopen`, `ticket.spawn_spk`, `ticket.export`, `ticket.manage`, dan `ticket.category.manage`.
- Staf memegang `ticket.view`, `ticket.create`, `ticket.comment.create`, dan `ticket.attachment.upload`.

Pengguna yang memegang `ticket.start`, `ticket.resolve`, atau `ticket.close` tetapi tidak `ticket.assign` hanya melihat tiket yang ditugaskan kepadanya.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Operasional**, lalu klik **Tiket**.
2. Baca daftar tiket.

   - Kotak **Cari** mencari pada nomor dan judul tiket (isian bertuliskan "Nomor atau judul..."). Filter dan pencarian jalan sendiri sesaat setelah Anda mengetik atau memilih. Daftar tidak punya tombol cari.
   - Filter **Prioritas** berisi **Semua prioritas**, **Rendah**, **Sedang**, **Tinggi**, dan **Mendesak**. Filter **Status** berisi **Semua status**, **Terbuka**, **Ditugaskan**, **Dikerjakan**, **Diselesaikan**, **Ditutup**, **Dihapus**, dan **Semua, termasuk dihapus**.
   - Kolom: **Nomor** (tautan ke detail), **Judul**, **Prioritas** (lencana berwarna), **Status** (lencana berwarna), **Pelanggan**, **Petugas**, **Respons sebelum**, **Dibuat** (tanggal dan jam, dalam format tanggal perusahaan). **Petugas** menulis nama petugas, atau lencana kuning **Belum ditugaskan** pada tiket **Terbuka** tanpa petugas. **Respons sebelum** menulis hitungan mundur ("sisa 41 mnt", "sisa 2 j 5 mnt", atau "lewat 12 mnt") di atas tanggal dan jam target respons. Lencana berubah kuning bila sisa waktu 30 menit atau kurang dan merah setelah lewat, dan hitungannya bergerak sendiri tiap 30 detik tanpa memuat ulang halaman. Tiket yang sudah dijawab menulis "Sudah dijawab", dan tiket **Diselesaikan** atau **Ditutup** hanya menulis tanggalnya. Semua kolom kecuali **Pelanggan** dan **Petugas** bisa diurutkan, dan urutan awal menaruh tiket terbaru di atas. Urutkan **Respons sebelum** untuk menaruh tenggat terdekat di atas.
   - Empat chip di atas tabel menyaring antrean kerja: **Belum ditugaskan** (tiket belum selesai tanpa petugas), **Hampir terlampaui** (target respons atau penyelesaian jatuh tempo dalam 30 menit), **Pelanggan membalas** (balasan terakhir ditulis pelanggan dan belum dijawab petugas), dan **Tiket saya** (ditugaskan kepada Anda). Klik chip untuk menyalakan atau mematikannya. Chip tersimpan di alamat halaman, jadi antrean bisa dibagikan sebagai tautan. Chip bisa digabung dengan pencarian dan filter lain. Pemegang tiket tanpa `ticket.assign` hanya melihat tiket yang ditugaskan kepadanya, jadi **Belum ditugaskan** kosong bagi mereka.
   - Tombol **Ekspor** (pemegang `ticket.export`) membuka menu **Ekspor CSV** dan **Ekspor PDF**. Berkas memuat kolom Kode, Judul, Prioritas, Status, Pelanggan, Petugas, Respons sebelum, dan Dibuat sesuai pencarian dan filter aktif, termasuk chip. Kolom Prioritas dan Status di berkas itu berisi kode (misalnya `medium` dan `on_progress`), bukan label di layar.
   - Tombol **Buat tiket** (pemegang `ticket.create`) membuka form buat.
   - Di bawah tabel ada pilihan **Baris per halaman** serta tombol **Sebelumnya** dan **Berikutnya**.

   ![Daftar tiket dengan tombol Ekspor dan Buat tiket, kotak Cari, filter Prioritas dan Status, serta tabel tiket](~/assets/guide/web/tickets-index.webp)

3. Klik nomor tiket untuk membuka detail. Baris tidak punya tombol **Lihat**, **Ubah**, atau **Hapus**, dan tidak punya menu **Aksi lainnya**, kecuali baris tiket yang dihapus: menunya berisi **Pulihkan** (izin `ticket.delete`), nomornya berupa teks biasa, dan tiket kembali dengan statusnya semula (toast "Tiket dipulihkan.").

Daftar yang kosong menulis **Belum ada tiket** dengan tombol **Buat tiket**. Bila pencarian atau filter tidak menemukan apa pun, daftar menulis **Tidak ada tiket yang cocok** dengan tombol **Reset filter**.

Kartu **SLA terlampaui** di Dasbor ([bagian 2.1](/docs/guides/web/dashboard/queue-cards/)) membuka daftar ini dengan filter tersembunyi `sla_breached`. Daftar hanya memuat tiket yang lewat **Target penyelesaian** dan belum **Diselesaikan** atau **Ditutup**. Layar tidak menampilkan filter itu, dan filter lain yang Anda ubah tetap membawanya. **Reset filter** juga tidak mencabutnya. Klik **Tiket** di sidebar untuk melihat semua tiket lagi. Kartu **Hampir terlampaui (≤ 30 menit)** dan **Pelanggan membalas** membuka daftar ini dengan chip yang sama menyala, dan chip itu bisa dimatikan.

## Status tiket

| Status | Arti | Langkah berikut | Siapa |
|---|---|---|---|
| **Terbuka** | Tiket baru, belum ada petugas | **Tugaskan**, atau **Tugaskan ke saya** | `ticket.assign` |
| **Ditugaskan** | Petugas sudah ditunjuk | **Mulai** | Petugas tiket itu, izin `ticket.start` |
| **Dikerjakan** | Petugas bekerja. **Respons pertama** terisi saat petugas pertama kali menekan **Mulai** atau mengirim balasan publik | **Selesaikan** dengan catatan | Petugas tiket itu, izin `ticket.resolve` |
| **Diselesaikan** | Selesai, menunggu pemeriksaan. Balasan pelanggan membuka tiket kembali, dan pelanggan bisa menutupnya sendiri di aplikasi dengan memberi nilai | **Tutup**, **Buka kembali**, atau tunggu balasan pelanggan | **Tutup**: pemegang `ticket.close` yang bukan petugas tiket itu. **Buka kembali**: pemegang `ticket.reopen` |
| **Ditutup** | Selesai dan ditutup. Komentar serta lampiran baru ditolak | **Buka kembali** bila masalah muncul lagi, atau buat tiket baru | Pemegang `ticket.reopen` |

Mengganti petugas tiket **Ditugaskan** memakai `ticket.reassign` lewat Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)), karena tombol **Tugaskan** di halaman tiket hanya tampil pada tiket **Terbuka**. Balasan pelanggan pada tiket **Diselesaikan** membuka tiket menjadi **Ditugaskan** bila masih punya petugas, atau **Terbuka** bila tidak. Tiket **Ditutup** tidak dapat dibalas oleh staf atau pelanggan. Staf dengan `ticket.reopen` bisa membuka kembali tiket **Diselesaikan** atau **Ditutup** dengan menulis alasannya (bagian "Membuka kembali tiket"). Tanpa izin itu, masalah yang muncul lagi dicatat sebagai tiket baru.

## Membuat tiket

1. Di daftar tiket, klik **Buat tiket**.

   ![Form Buat Tiket dengan kartu Data tiket](~/assets/guide/web/tickets-create.webp)

2. Isi kartu **Data tiket**:
   - **Judul**: wajib, maksimal 255 karakter. Terisi nama kategori begitu Anda memilih **Kategori**, dan tidak berganti lagi setelah Anda menulis judul sendiri.
   - **Sumber**: wajib. Pilih **Pelanggan** (isian awal), **NOC**, atau **Internal**.
   - **Kategori**: wajib. Ketik untuk mencari, lalu pilih. Daftar memuat kategori aktif perusahaan. Kategori menjadi sumber target hanya bila tiket tidak punya **Langganan**, atau langganannya tidak punya tingkat SLA. Bila tiket punya langganan dengan tingkat SLA, tingkat SLA versi paket langganan itu dipakai dan kategori tidak menentukan jam.
   - **Prioritas**: **Rendah**, **Sedang** (isian awal), **Tinggi**, atau **Mendesak**. Memilih **Kategori** mengisi prioritas bawaan kategori itu dan menulis "Bawaan kategori {nama kategori}." di bawah isian. Begitu Anda memilih prioritas sendiri, kategori tidak mengubahnya lagi. Prioritas **Mendesak** memotong target menjadi separuh (bagian "SLA dan tenggat").
   - **Pelanggan**: opsional di form. Ketik nama atau kode pelanggan (minimal 2 huruf), lalu pilih. Daftar memuat pelanggan aktif, paling banyak 20 hasil. Isi untuk tiket dari pelanggan, karena pelanggan hanya menerima WhatsApp bila tiket punya **Pelanggan**.
   - **Langganan**: opsional. Ketik kode langganan, lalu pilih. Daftar memuat langganan berstatus `active` dan `suspended`. Setelah Anda memilih pelanggan, daftar hanya memuat langganan milik pelanggan itu, dan bila pelanggan itu hanya punya satu langganan, **Langganan** terisi sendiri.
   - **Aset jaringan**: opsional. Ketik kode atau nama aset, lalu pilih. Daftar tidak memuat aset `retired` atau `decommissioned`. Aset yang sudah terkait pelanggan atau langganan hanya muncul bila cocok dengan pilihan Anda, sedangkan aset tanpa keterkaitan muncul untuk siapa pun.
   - **Lokasi**: opsional. Ketik kode atau nama lokasi, lalu pilih. Daftar memuat lokasi aktif, ditulis sebagai kode, tanda hubung, dan nama.
   - **Deskripsi**: opsional.

   Mengganti **Pelanggan** mengosongkan pilihan **Langganan** dan **Aset jaringan**, dan mengganti **Langganan** mengosongkan **Aset jaringan**, supaya pilihan tidak saling bertentangan. Untuk mengosongkan sebuah isian, klik tombol **Hapus pilihan** di sebelahnya.

   Begitu **Kategori** terpilih, di bawah **Deskripsi** tampil satu baris target: "Target respons {tanggal dan jam}, selesai {tanggal dan jam}", atau "Tanpa target respons, selesai {tanggal dan jam}" bila tidak ada target respons. Baris itu dihitung ulang setiap kali Anda mengganti kategori, langganan, atau prioritas, dengan sumber dan hitungan yang sama seperti tiket yang akan disimpan (bagian "SLA dan tenggat"). Tenggat baru tetap saat tiket disimpan.

   ![Form Buat Tiket setelah memilih kategori, dengan judul terisi nama kategori, prioritas bawaan kategori, dan baris Target respons dan selesai](~/assets/guide/web/tickets-create-target.webp)

3. Klik **Simpan**. Daftar tiket terbuka dengan toast "Tiket berhasil dibuat." Tiket baru berstatus **Terbuka**, bernomor otomatis, dan **Target respons** serta **Target penyelesaian** sudah terisi (bagian "SLA dan tenggat" di bawah). Bila tiket punya **Pelanggan**, pelanggan menerima WhatsApp bahwa tiketnya dibuat, bila WhatsApp perusahaan aktif. Klik **Batal** atau **Kembali** untuk keluar tanpa menyimpan.

## Membuka detail tiket

1. Di daftar, klik nomor tiket.

   ![Detail tiket berstatus Terbuka dengan kartu Rincian, kartu Status, dan kartu Tindakan berisi tombol Tugaskan, Tugaskan ke saya, dan Tambah komentar](~/assets/guide/web/tickets-show.webp)

2. Baca halaman dari atas ke bawah. Judul halaman adalah judul tiket, dengan nomor tiket di bawahnya. Saat halaman terbuka, fokus keyboard berada di judul itu.
   - Kartu **Rincian** memuat **Kategori**, **Sumber** (lencana **Pelanggan**, **NOC**, atau **Internal**), **Pelanggan**, **Telepon**, **Alamat**, **Langganan**, **Aset jaringan**, **Lokasi**, **Petugas**, dan **Deskripsi**. **Pelanggan** menjadi tautan ke halaman pelanggan, dan **Alamat** tampil, hanya bagi pemegang `customer.view`. **Telepon** berupa tautan telepon yang bisa diketuk di ponsel. Pengguna tanpa `customer.view` tidak melihat email, NPWP, atau catatan pelanggan di halaman tiket. **Catatan penyelesaian** muncul setelah tiket diselesaikan. Isian kosong tampil sebagai `-`. Tiket **Ditutup** menyimpan nama kategori dan nama petugas saat ditutup: mengganti nama kategori atau akun petugas sesudahnya tidak mengubah tiket itu, dan bila nama sekarang berbeda halaman menulis nama beku disusul "(saat ditutup)". Tiket yang belum ditutup mengikuti nama yang berlaku.
   - Bila pelanggan sudah menilai tiket di aplikasi, kartu **Rincian** menambah baris **Penilaian pelanggan**, ditulis "4 dari 5" dengan komentar pelanggan di bawahnya bila ada. Nilai itu tetap ada walau tiket dibuka kembali.
   - Kartu **Status** memuat **Kode**, **Status**, **Prioritas**, **Target respons**, **Respons pertama**, **Target penyelesaian**, **Check-in**, **Diselesaikan**, dan **Ditutup**. **Target respons** dan **Target penyelesaian** memuat waktu tenggat dan sumbernya dalam tanda kurung. Selama target masih berlaku, lencana hitungan mundur ("sisa 2 j 5 mnt", kuning bila 30 menit atau kurang, "lewat 12 mnt" merah) tampil di sampingnya, dan satu baris kecil di bawahnya menjelaskan hitungannya, misalnya "Dihitung sejak tiket dibuat: 6 jam ÷ 2 karena Mendesak = 3 jam". **Respons pertama** menyebut **lewat balasan** atau **lewat tombol Mulai**. Tiket yang dibuka kembali menampilkan lencana **Dibuka kembali {waktu}**. Semua waktu tampil dalam format tanggal perusahaan diikuti jam.
   - Baris kecil di bawah target menulis "Dihitung sejak tiket dibuat: 6 jam" untuk tingkat SLA atau kategori yang dihitung 24 jam, dan "Dihitung sejak tiket dibuat, dalam jam layanan: 6 jam" untuk tingkat yang dihitung dalam **Jam layanan** (bagian "SLA dan tenggat").
   - **Check-in** memuat catatan lokasi dari aplikasi teknisi saat tiket dimulai: jarak dari lokasi dan akurasinya, misalnya "820 m dari lokasi (akurasi ±12 m)", atau alasan lokasi tidak tersedia. Jarak 1 km atau lebih ditulis dalam km, misalnya "119,3 km". Bila teknisi memulai lebih jauh dari batas jarak perusahaan, alasannya ditambahkan: "Jauh dari lokasi: {alasan}" ([bagian 3.3](/docs/guides/web/operations/work-orders/), "Jarak check-in saat memulai"). Tanpa catatan, tertulis "Belum ada check-in".
   - Kartu **Tindakan** hanya menampilkan tindakan yang diizinkan untuk akun dan status saat ini. Tiket **Ditutup** tidak menampilkan **Tambah komentar** dan menulis "Tiket sudah ditutup. Komentar baru tidak bisa ditambahkan.". Tiket **Ditutup** yang punya petugas menampilkan tombol **Evaluasi teknisi** bagi pengguna yang boleh membuat evaluasi ([bagian 3.5](/docs/guides/web/operations/evaluations/)).
   - Kartu **Tindakan** juga memuat **Tugaskan ke saya** (tiket **Terbuka**) dan **Buka kembali** (tiket **Diselesaikan** atau **Ditutup**) bagi pemegang izinnya. Keduanya dijelaskan di bawah.
   - Kartu **Komentar** dan **Lampiran**. Setiap komentar dan lampiran membawa lencana **Pelanggan** (ditulis akun aplikasi pelanggan) atau **Petugas**, supaya jelas siapa yang menjawab. Penulis komentar hanya tampil sebagai nama.

## Menugaskan petugas

Izin: `ticket.assign` untuk tiket **Terbuka**. Tombol **Tugaskan ke saya** memakai izin yang sama (lihat di bawah).

1. Buka tiket berstatus **Terbuka**.
2. Klik **Tugaskan**. Dialog **Tugaskan tiket** terbuka.
3. Isi **Petugas** (wajib). Ketik untuk mencari, lalu pilih. Setiap baris menampilkan nama petugas disusul jumlah pekerjaan aktifnya, misalnya "{nama} · 2 pekerjaan aktif", terurut dari yang paling sedikit. Bila jumlahnya berbeda antarpetugas, petugas dengan pekerjaan paling sedikit diberi catatan "Paling sedikit pekerjaan" sebagai saran. Daftar memuat pengguna aktif perusahaan yang memegang `ticket.start`, `ticket.resolve`, atau `ticket.close`. Bila tidak ada yang cocok, daftar menulis "Tidak ada petugas yang cocok."
4. Klik **Tugaskan**. Muncul toast "Tiket berhasil ditugaskan.", status menjadi **Ditugaskan**, dan **Petugas** terisi. Klik **Batal** untuk menutup dialog tanpa menugaskan.

Petugas harus pengguna aktif perusahaan ini yang memegang `ticket.start`, `ticket.resolve`, atau `ticket.close`, lewat peran apa pun, termasuk peran buatan sendiri. Petugas menerima email berjudul "Tiket {kode} ditugaskan kepada Anda" yang memuat judul tiket, pelanggan, prioritas, batas respons, dan tombol **Buka tiket**, serta notifikasi di lonceng ([bagian 2.2](/docs/guides/web/dashboard/notifications/)). Pada penugasan pertama, pelanggan tiket menerima WhatsApp bahwa tiketnya ditangani, bila WhatsApp perusahaan aktif.

Bila dialog menampilkan **Tiket sudah berubah**, pengguna lain mengubah tiket lebih dulu: klik **Muat ulang tiket**, lalu ulangi dari langkah 2.

**Tugaskan ke saya** menugaskan tiket **Terbuka** kepada Anda dengan satu klik, tanpa dialog. Tombolnya tampil bagi pemegang `ticket.assign` yang sendiri memegang `ticket.start`, `ticket.resolve`, atau `ticket.close`, kecuali perusahaan melarang menugaskan diri sendiri ([bagian 3.1](/docs/guides/web/operations/dispatch/)). Muncul toast "Tiket {kode} ditugaskan ke Anda." Bila orang lain lebih dulu mengambil tiket itu, toast merah "Tiket gagal ditugaskan." menulis alasannya, dan halaman memuat ulang supaya **Petugas** menunjukkan siapa yang memegangnya.

## Mengerjakan dan menutup tiket

Petugas memulai dan menyelesaikan tiket di aplikasi teknisi. Di web, langkah yang sama ada di halaman tiket dan di Pekerjaan Saya ([bagian 3.6](/docs/guides/web/operations/my-work/)).

1. Buka tiket berstatus **Ditugaskan**, lalu klik **Mulai**. Muncul toast "Tiket mulai dikerjakan.", status menjadi **Dikerjakan**, dan **Respons pertama** terisi bila belum pernah tercatat. Balasan publik pertama dari staf juga dapat mengisi **Respons pertama** dengan sumber **lewat balasan**. Catatan internal dan balasan pelanggan tidak dihitung. Izin `ticket.start`.
2. Pada tiket **Dikerjakan**, klik **Selesaikan**. Dialog **Selesaikan tiket** terbuka.
3. Isi **Catatan penyelesaian** (wajib, maksimal 1000 karakter).
4. Klik **Selesaikan**. Muncul toast "Tiket diselesaikan.", status menjadi **Diselesaikan**, dan catatan tampil di **Catatan penyelesaian**. Izin `ticket.resolve`.
5. Pada tiket **Diselesaikan**, klik **Tutup**. Dialog "Tutup tiket {kode}?" terbuka dengan keterangan "Pelanggan tidak bisa membalas lagi; tiket masuk laporan."
6. Klik **Tutup tiket**. Muncul toast "Tiket ditutup.", status menjadi **Ditutup**, dan **Ditutup** terisi. Izin `ticket.close`.

Hanya petugas yang ditunjuk pada tiket yang boleh memulai dan menyelesaikan, termasuk bila Anda admin. Saat tiket diselesaikan, pelanggan tiket menerima WhatsApp bahwa tiketnya selesai.

Pelanggan juga bisa menutup tiket **Diselesaikan** sendiri di aplikasi pelanggan: ia menjawab bahwa masalahnya sudah beres dan memberi nilai 1 sampai 5, dengan komentar bila mau. Tiket langsung **Ditutup**, dan nilainya tampil di kartu **Rincian** sebagai **Penilaian pelanggan**. Tiket yang sudah **Ditutup** tetapi belum dinilai juga bisa dinilai di aplikasi. Satu tiket dinilai sekali.

**Selesaikan** juga tampil pada tiket **Ditugaskan**, tetapi server menolaknya dengan halaman **Akses ditolak** sampai petugas menekan **Mulai**. Petugas tiket tidak boleh menutup tiketnya sendiri, jadi pemegang `ticket.close` lain yang menutupnya.

Bila petugas memulai tiket di aplikasi teknisi dan berada jauh dari alamat pelanggan, aplikasi meminta alasan lebih dulu (aturan jarak check-in, [bagian 3.3](/docs/guides/web/operations/work-orders/)). Alasan itu tampil di baris **Check-in** pada kartu **Status**.

## Membuka kembali tiket

Izin: `ticket.reopen`. Admin, Manajer, dan peran NOC memegangnya. Peran buatan sendiri mendapatkannya lewat menu Peran ([bagian 8.6](/docs/guides/web/administration/roles/)).

1. Buka tiket berstatus **Diselesaikan** atau **Ditutup**.
2. Klik **Buka kembali** di kartu **Tindakan**. Dialog "Buka kembali tiket {kode}?" terbuka dengan keterangan "Tiket kembali ditangani, pelanggan diberi tahu, dan target waktunya tidak dihitung ulang."
3. Isi **Alasan** (wajib, 5 sampai 500 karakter). Petunjuk di bawah isian: "Tulis apa yang masih bermasalah, paling sedikit 5 karakter."
4. Klik **Buka kembali**. Muncul toast "Tiket {kode} dibuka kembali."

Status tiket menjadi **Ditugaskan** bila tiket masih punya petugas, atau **Terbuka** bila tidak. Kartu **Status** menampilkan lencana **Dibuka kembali {waktu}**, dan **Diselesaikan**, **Ditutup**, dan **Catatan penyelesaian** dikosongkan di halaman (catatan lama tetap ada di Log Audit). Target waktu tidak dihitung ulang, dan nilai dari pelanggan tetap ada. Tiket **Ditutup** yang dibuka kembali memakai lagi nama kategori dan petugas yang berlaku. Petugas tiket, atau pemegang `ticket.assign` bila tiket tidak punya petugas aktif, menerima notifikasi "Tiket {kode} dibuka kembali" dengan pesan "Oleh {nama}: {alasan}", kecuali orang yang membuka kembali tiket itu. Pelanggan menerima notifikasi "Tiket {kode} dibuka kembali dan akan ditangani lagi."

## Komentar dan lampiran

1. Pada tiket yang belum **Ditutup**, klik **Tambah komentar** di kartu **Tindakan**.
2. Isi **Komentar** (wajib, maksimal 2000 karakter), lalu pilih **Terlihat oleh**: **Semua, termasuk pelanggan** atau **Internal saja**.
3. Klik **Kirim komentar**. Komentar publik pertama dari staf mengisi **Respons pertama** bila belum ada, dan pelanggan menerima lonceng serta push. Komentar internal tidak dihitung sebagai respons pertama dan tidak terlihat oleh pelanggan.

Izin `ticket.comment.create`. Komentar tidak bisa diubah atau dihapus. Server menolak komentar pada tiket **Ditutup** dengan "Tiket sudah ditutup.". Balasan pelanggan pada tiket **Diselesaikan** membuka tiket kembali dan memberi tahu petugas serta pemegang `ticket.assign`.

4. Untuk melampirkan berkas, klik **telusuri** pada area "Seret berkas ke sini atau telusuri" di kartu **Lampiran**, atau seret satu berkas ke area itu.
5. Isi **Keterangan (opsional)** bila perlu, maksimal 200 karakter. Teks di bawah isian itu mengingatkan "Terlihat oleh pelanggan".
6. Klik **Unggah**. Bilah **Mengunggah lampiran** menunjukkan kemajuan, lalu muncul toast "Lampiran berhasil diunggah."

Izin `ticket.attachment.upload`. Berkas boleh `jpg`, `jpeg`, `png`, atau `pdf`, maksimal 10 MB. Area unggah menolak jenis lain di tempat, dan server memeriksa isi berkas juga. Bila unggahan gagal, toast merah "Lampiran gagal diunggah." menulis alasannya, atau "Berkas harus JPG, PNG, atau PDF dengan ukuran paling besar 10 MB." Pada tiket **Ditutup**, kartu **Lampiran** tidak punya area unggah dan menulis "Tiket sudah ditutup. Lampiran baru tidak bisa ditambahkan." Berkas tampil dengan nama, lencana **Pelanggan** atau **Petugas**, keterangan bila ada, waktu, tombol **Unduh**, dan **Buka** untuk gambar.

## Membuat SPK dari tiket

Izin: `ticket.spawn_spk` (admin, manajer). Pakai bila gangguan butuh kunjungan teknisi.

1. Buka tiket berstatus **Ditugaskan** atau **Dikerjakan** yang belum punya catatan penyelesaian.
2. Klik **Buat SPK**. Dialog **Buat SPK dari tiket** terbuka.
3. Klik **Buat SPK**. Inbils membuka detail SPK baru dengan toast "SPK berhasil dibuat dari tiket."

SPK baru berjenis **Perawatan**, berstatus **Menunggu penugasan**, dan berjudul "SPK dari tiket &lt;kode tiket&gt;". **Pelanggan**, **Langganan**, **Lokasi**, **Prioritas**, dan deskripsi disalin dari tiket. Aset jaringan tiket tidak disalin.

Pembuat SPK itu adalah Anda, jadi Anda tidak bisa menyetujuinya ([bagian 3.3](/docs/guides/web/operations/work-orders/)). Tugaskan teknisi dari halaman SPK itu atau dari Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)).

Satu tiket hanya boleh melahirkan satu SPK. Halaman tiket tidak menampilkan tautan ke SPK itu, dan tiket tidak ikut selesai saat SPK selesai: selesaikan dan tutup tiket sendiri. Cari SPK-nya di daftar SPK dengan kode tiket di kotak **Cari**.

## SLA dan tenggat

Setiap tiket baru mendapat dua tenggat saat dibuat. Keduanya dihitung dari waktu pembuatan, dalam jam kalender atau dalam jam layanan perusahaan (lihat "Hitungan tenggat" di bawah):

- **Target respons**: batas waktu sampai petugas mengirim balasan publik pertama atau menekan **Mulai**.
- **Target penyelesaian**: batas waktu sampai tiket diselesaikan lewat **Selesaikan**.

Sumber kedua target:

1. Tiket yang punya **Langganan** mengambil target dari tingkat SLA **versi paket** yang dipakai langganan itu ([bagian 4.5](/docs/guides/web/customers-and-services/sla-tiers/)). Tingkat itu tetap berlaku walau paketnya sudah berganti versi atau tingkatnya dinonaktifkan: menonaktifkan hanya menghentikan penjualan baru. Halaman tiket menulis `(Target <nama tingkat>)` di samping tenggat.
2. Tiket tanpa **Langganan** mengambil target dari **Kategori Tiket** yang dipilih (lihat di bawah). Halaman tiket menulis `(Target kategori <nama kategori>)`.

Tenggat dihitung saat tiket dibuat, dan dihitung ulang hanya saat prioritas tiket **Terbuka** diubah. Tiket yang sudah ada tidak berubah bila paket atau tingkat SLA langganannya diganti kemudian.

Prioritas **Mendesak** memotong kedua target menjadi separuh, dibulatkan ke atas, apa pun sumbernya. Contoh: 5 jam menjadi 3 jam. Kategori bawaan perusahaan baru: **Internet mati** 4 jam penyelesaian dan 2 jam respons, **Koneksi lambat** 8 dan 4, **Koneksi putus-sambung** 8 dan 4, **Masalah perangkat** 12 dan 6, **Kabel fiber bermasalah** 12 dan 6. Perusahaan lama yang belum mengganti nama kategorinya ikut memakai nama Indonesia ini setelah pembaruan sistem (sebelumnya **No Internet**, **Slow Connection**, **Packet Loss**, **Device Issue**, dan **Fiber Issue**). Target respons bawaan adalah separuh target penyelesaian, dibulatkan ke atas.

Tenggat tersimpan di tiket saat tiket dibuat. Mengubah tingkat, kategori, atau prioritas sesudahnya tidak menghitung ulang tiket yang sudah ada. Tiket yang dibuat sebelum target respons ada tetap memakai tenggat penyelesaiannya dan tidak punya target respons: halaman menulis "Tanpa target respons".

**Hitungan tenggat.** Tingkat SLA punya isian **Hitungan tenggat** ([bagian 4.5](/docs/guides/web/customers-and-services/sla-tiers/)). **24 jam** menghitung setiap jam, siang dan malam. **Jam layanan** hanya menghitung jam buka perusahaan: tiket yang masuk di luar jam buka mulai dihitung saat buka berikutnya, dan tenggatnya jatuh di dalam jam buka. Jam buka diisi per hari, dengan pilihan **Tutup**, di **Pengaturan Perusahaan**, kartu **Jam layanan** ([bagian 8.1](/docs/guides/web/administration/company/)). Selama jam layanan belum diisi, tingkat yang memakai **Jam layanan** dihitung 24 jam, dan **Pengaturan Perusahaan** menulis "Jam layanan belum diisi; tenggat dihitung 24 jam." Kategori selalu dihitung 24 jam. Kartu **Status** di halaman tiket dan baris target di form buat tiket memakai hitungan yang sama.

Halaman tiket menandai pelanggaran dengan dua lencana:

- **Respons terlambat**: respons pertama datang setelah **Target respons**, atau belum ada respons dan targetnya sudah lewat. Tiket tanpa target respons tidak pernah mendapat lencana ini.
- **Penyelesaian terlambat**: tiket lewat **Target penyelesaian** dan belum **Diselesaikan** atau **Ditutup**.

Setiap 15 menit sistem memeriksa target respons dan penyelesaian. Peringatan respons yang mendekati batas dikirim kepada petugas tiket, atau kepada pemegang `ticket.assign` bila tiket belum ditugaskan. Pelanggaran target respons dan penyelesaian dikirim lewat lonceng dan push kepada petugas aktif serta pemegang `ticket.assign`, tanpa email dan tidak kepada pembuat tiket hanya karena ia pembuatnya.

## Kategori Tiket

Kategori Tiket menyimpan target cadangan untuk tiket tanpa **Langganan**. Tiket yang punya langganan memakai tingkat SLA versi paketnya, aktif atau tidak. Kategori juga menyimpan **Saran untuk pelanggan**, teks yang dibaca pelanggan di aplikasi sebelum ia membuat tiket. Buka layar ini saat Anda ingin mengubah jam target kategori, mengganti namanya, menonaktifkannya, atau menulis saran untuknya.

Peran yang dapat memakai: admin dan manajer pada peran bawaan, staf tidak. Izin: `ticket.category.manage`. Tanpa izin ini menu tidak tampil dan alamat `/admin/ticket-categories` ditolak dengan halaman **Akses ditolak**.

1. Di sidebar, buka grup **Pelanggan & Layanan**, lalu klik **Kategori Tiket** (di bawah **Tingkat SLA**).
2. Baca daftar. Subjudulnya menyebut bahwa target ini cadangan untuk tiket tanpa langganan atau tanpa tingkat SLA aktif, dan bahwa tiket urgent memakai setengah dari target (dibulatkan ke atas). Kolomnya **Kode**, **Nama**, **Target respons (jam)**, **Target penyelesaian (jam)**, **Status** (lencana **Aktif** atau **Nonaktif**), dan **Aksi** (hanya bagi pemegang izin). Daftar kosong menulis "Belum ada kategori tiket untuk perusahaan ini."

   ![Dialog Ubah kategori di atas daftar Kategori Tiket, dengan isian Nama, Target respons (jam), Target penyelesaian (jam), saklar Aktif, Saran untuk pelanggan, kotak Pelanggan melihat, serta tombol Batal dan Simpan](~/assets/guide/web/ticket-categories-edit.webp)

3. Klik **Ubah** pada sebuah baris. Dialog **Ubah kategori** diikuti kode kategori terbuka dengan isian berikut:
   - **Nama**: wajib.
   - **Target respons (jam)**: wajib, bilangan bulat 1 sampai 720, tidak boleh melebihi target penyelesaian.
   - **Target penyelesaian (jam)**: wajib, bilangan bulat 1 sampai 720. Keterangan di bawah isian menulis "Hanya berlaku untuk tiket baru."
   - **Aktif**: saklar. Kategori nonaktif tidak muncul di pilihan **Kategori** pada form tiket.
   - **Saran untuk pelanggan**: opsional, teks bebas maksimal 500 karakter dengan penghitung di keterangan ("Tampil di aplikasi pelanggan saat memilih kategori ini. Kosongkan jika tidak perlu."). Tulis langkah singkat yang bisa dicoba pelanggan sebelum membuat tiket, misalnya cara memeriksa lampu modem. Baris baru ikut tampil. Di bawah isian, kotak **Pelanggan melihat:** menampilkan saran persis seperti yang dibaca pelanggan dan berubah saat Anda mengetik. Kategori bawaan sudah berisi saran, misalnya **Internet mati**: "Periksa lampu modem. Cabut adaptor 10 detik lalu pasang lagi. Bila lampu LOS merah, kirim laporan ini." Mengosongkan isian menghapus saran, dan aplikasi lalu menampilkan tiga langkah umum: cek lampu modem, cabut listrik modem 30 detik, cek kabel di modem.
4. Klik **Simpan**. Muncul toast "Kategori tiket diperbarui." Klik **Batal** untuk menutup dialog tanpa menyimpan.

Layar ini tidak punya tombol untuk menambah atau menghapus kategori, dan kode kategori tidak bisa diubah. Pesan "Target respons tidak boleh lebih lama dari target penyelesaian." muncul bila target respons lebih besar dari target penyelesaian. Pesan "saran untuk pelanggan tidak boleh lebih dari 500 karakter." di bawah **Saran untuk pelanggan** berarti isinya kepanjangan. Kolom daftar tidak menampilkan saran: buka **Ubah** untuk membacanya.

## Kesalahan umum

- **Tugaskan** menampilkan "penangani wajib diisi.": pilih petugas dari daftar, lalu klik **Tugaskan**. Pesan "penangani yang dipilih harus berupa pengguna aktif dengan hak akses yang sesuai." muncul bila petugas yang dipilih tidak aktif atau tidak memegang `ticket.start`, `ticket.resolve`, atau `ticket.close`.
- Alert **Tiket sudah berubah** dengan keterangan "Konflik penugasan: tiket ini sudah ditugaskan oleh pengguna lain." (atau "Konflik: status tiket sudah diubah oleh pengguna lain." pada **Selesaikan** dan **Tutup**): klik **Muat ulang tiket**. Pada **Mulai**, perubahan status serupa menampilkan toast "Tiket gagal dimulai." dengan keterangan yang sama.
- **Selesaikan** ditolak pada tiket **Ditugaskan**: tombolnya tampil, tetapi hanya tiket **Dikerjakan** yang bisa diselesaikan. Petugas klik **Mulai** dulu.
- **Mulai** atau **Selesaikan** ditolak untuk Anda dengan halaman **Akses ditolak**: hanya petugas yang ditunjuk pada tiket yang boleh, dan peran manajer atau staf bawaan tidak memegang `ticket.start` maupun `ticket.resolve`. Tugaskan tiket ke pengguna yang berhak, atau biarkan teknisi mengerjakannya di aplikasi.
- **Tutup** tidak tampil: tiket belum **Diselesaikan**, Anda tidak memegang `ticket.close`, atau Anda petugas tiket itu. Server juga menolak penutupan oleh petugas tiket itu dengan halaman **Akses ditolak**. Minta pemegang `ticket.close` lain menutupnya.
- "catatan penyelesaian wajib diisi." atau "catatan penyelesaian tidak boleh lebih dari 1000 karakter." di dialog **Selesaikan tiket**: isi atau ringkas catatannya.
- **Buat SPK** tidak tampil atau ditolak: tiket harus **Ditugaskan** atau **Dikerjakan**, belum punya catatan penyelesaian, dan belum pernah melahirkan SPK. Server menolak dengan "SPK sudah dibuat dari tiket ini." bila SPK sudah ada. Anda juga butuh `ticket.spawn_spk`.
- **Tambah komentar** atau unggah lampiran ditolak untuk Manajer bawaan (halaman **Akses ditolak**): peran itu tidak memegang `ticket.comment.create` dan `ticket.attachment.upload`. Minta admin perusahaan menambahkannya ke peran di menu Peran ([bagian 8.6](/docs/guides/web/administration/roles/)), atau memberi Anda peran yang sudah memegangnya.
- Komentar kosong atau lebih dari 2000 karakter menampilkan "isi pesan wajib diisi." atau "isi pesan tidak boleh lebih dari 2000 karakter." di bawah **Komentar**.
- "judul wajib diisi." di **Judul** atau "kategori wajib diisi." di **Kategori** pada form buat: isi keduanya.
- Pesan "Langganan bukan milik pelanggan yang dipilih." di **Langganan**, atau "Aset jaringan bukan milik pelanggan yang dipilih." dan "Aset jaringan bukan milik langganan yang dipilih." di **Aset jaringan**: pilihan tidak cocok satu sama lain. Daftar pilihan sudah dipersempit menurut pelanggan dan langganan yang Anda pilih, jadi pesan ini jarang muncul. Pilih langganan dan aset milik pelanggan yang sama.
- Toast "Data gagal disimpan. Periksa input." muncul bersama pesan di bawah isian: baca pesan di bawah setiap isian yang bermasalah.
- Daftar tiket tampak terpotong setelah dibuka dari Dasbor: filter `sla_breached` masih aktif. Klik **Tiket** di sidebar.
- Judul atau prioritas tiket salah: web tidak punya layar ubah, **Ubah**, maupun **Hapus** untuk tiket. Server hanya mengubah tiket **Terbuka** (izin `ticket.update`) dan menghapus tiket **Ditutup** (izin `ticket.delete`), tetapi tidak ada layar yang memanggilnya. Tulis koreksi sebagai komentar. Tiket yang dihapus lewat jalur lain tampil di filter **Status** **Dihapus** dan bisa dikembalikan dengan **Pulihkan** (izin `ticket.delete`).
- **Buka kembali** tidak tampil: tiket belum **Diselesaikan** atau **Ditutup**, atau Anda tidak memegang `ticket.reopen`. Pesan "Hanya tiket yang diselesaikan atau ditutup yang bisa dibuka kembali." di dialog berarti orang lain sudah mengubah tiket: tutup dialog dan muat ulang halaman. Pesan "alasan wajib diisi." atau "alasan minimal 5 karakter." di bawah **Alasan**: tulis alasan paling sedikit 5 karakter.
- **Tugaskan ke saya** tidak tampil: tiket sudah punya petugas, Anda tidak memegang `ticket.assign`, Anda sendiri tidak memegang `ticket.start`, `ticket.resolve`, atau `ticket.close`, atau perusahaan melarang menugaskan diri sendiri. Toast merah "Tiket gagal ditugaskan." berarti orang lain lebih dulu mengambil tiket itu.
