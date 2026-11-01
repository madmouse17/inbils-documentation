---
title: "6.1 Permintaan Barang"
description: "Permintaan Barang mengatur pengambilan material dari gudang untuk pekerjaan lapangan: pengajuan, persetujuan, penyiapan, sampai serah terima barang."
---

Permintaan Barang mengatur pengambilan material dari gudang untuk pekerjaan lapangan: pengajuan, persetujuan, penyiapan, sampai serah terima barang. Buka menu ini untuk mengajukan barang, memutuskan pengajuan, atau memproses barang di gudang.

Peran yang dapat memakai: admin (semua langkah), manajer (melihat semua, menyetujui, menolak, membatalkan), dan staf (melihat semua, menyiapkan, menyerahkan). Izin: `inventory.request.view.own`, `inventory.request.view.all`, `inventory.request.create`, `inventory.request.cancel.own`, `inventory.request.approve`, `inventory.request.reject`, `inventory.request.prepare`, `inventory.request.issue`. Peran khusus dapat diberi izin ini di [bagian 8.6](/docs/guides/web/administration/roles/) (Peran).

Menu tampil di sidebar bagi pemegang `inventory.request.view.own` atau `inventory.request.view.all`. Pemegang `view.own` hanya melihat permintaan buatannya, sedangkan pemegang `view.all` melihat semua permintaan di perusahaan aktif ([bagian 1.6](/docs/guides/web/introduction/switch-company/)). Pada peran bawaan hanya admin yang memegang `inventory.request.create`, jadi hanya admin yang melihat tombol **Buat Permintaan Barang** di web.

Teknisi membuat permintaan di aplikasi teknisi, dan permintaan itu langsung berstatus **Menunggu persetujuan** tanpa tahap draf.

Pemisahan tugas berlaku untuk semua pengguna, termasuk admin. Pemohon tidak boleh menyetujui, menolak, atau menyerahkan permintaannya sendiri, dan penyetuju tidak boleh menyiapkan atau menyerahkan barang yang ia setujui. Tombol langkah yang dilarang itu tidak tampil. Peran yang tidak memuat `roles.manage` juga tidak boleh memegang izin setujui atau tolak bersama izin siapkan, serahkan, terima, keluarkan, atau pindahkan stok. Bila Anda menyimpan peran dengan pasangan izin seperti itu ([bagian 8.6](/docs/guides/web/administration/roles/)), sistem menolak dengan pesan seperti `Pemisahan tugas (persetujuan permintaan barang vs pelaksanaan gudang): inventory.request.approve tidak boleh digabung dengan inventory.request.prepare.`

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Inventaris**, lalu klik **Permintaan Barang**.
2. Lihat tab di atas daftar:
   - **Permintaan Saya**: permintaan yang Anda buat. Lencana angka menghitung permintaan Anda yang masih **Draf** atau sudah **Siap diambil**.
   - **Persiapan & Antrean Gudang**: permintaan berstatus **Menunggu persetujuan**, **Disetujui**, **Disiapkan**, atau **Siap diambil**. Tab ini tampil bagi pemegang izin setujui, siapkan, atau serahkan. Lencana angkanya hanya menghitung permintaan yang bisa Anda proses sekarang: yang menunggu keputusan Anda, yang siap disiapkan, atau yang siap diserahkan. Permintaan yang menunggu orang lain, atau yang tidak boleh Anda proses karena pemisahan tugas, tidak dihitung, jadi lencana bisa lebih kecil daripada jumlah baris di tab.
   - **Semua Permintaan**: semua permintaan perusahaan dalam semua status. Tab ini tampil bagi pemegang `inventory.request.view.all`.
   - **Pengembalian material**: berkas pengembalian material, dibahas di [bagian 6.8](/docs/guides/web/inventory/material-returns/).

   ![Daftar Permintaan Barang dengan tab, kolom Cari permintaan, filter Status permintaan dan Tanggal Dibutuhkan, serta tabel permintaan](~/assets/guide/web/inventory-requests.webp)

3. Klik tab yang Anda perlukan, juga bila tab itu sudah tampak aktif. Saat halaman baru dibuka, daftar belum disaring menurut tab: pemegang `inventory.request.view.all` melihat semua permintaan sampai mengklik sebuah tab. Kartu **Antrean permintaan gudang** di Dasbor ([bagian 2.1](/docs/guides/web/dashboard/queue-cards/)) membuka tab **Persiapan & Antrean Gudang** dengan penyaringan yang sudah aktif.
4. Baca kolom: **No. Permintaan** (kode dan umur permintaan, klik untuk membuka; kode ditulis dalam satu baris), **Status**, **Pemohon** (nama dan email), **Lokasi Gudang**, **Barang & Jumlah** (barang pertama dengan jumlahnya, lalu jumlah barang lain), **Tanggal Dibutuhkan**, **Rujukan** (jenis dan kode pekerjaan, misalnya `SPK SPK-2026-00012`; menjadi tautan ke SPK atau tiket itu bila akun Anda boleh membukanya, selain itu teks biasa), **Aksi Berikutnya** (langkah yang menunggu) dan **Aksi** (tombol **Detail**). Kolom **Lokasi Gudang** berisi tanda hubung bila permintaan tidak punya lokasi.
5. Cari dan saring:
   - Isi **Cari permintaan** untuk mencari kode permintaan, alasan, atau nama pemohon.
   - Pilih **Status permintaan**. Pilihannya **Semua status** dan semua nama status pada tabel di bawah, sama dengan lencana di daftar.
   - Isi **Tanggal Dibutuhkan** sebagai rentang: ketik tanggal dalam format tanggal perusahaan, atau klik **Buka kalender** lalu pilih tanggal awal dan tanggal akhir. Klik **Hapus rentang tanggal** untuk mengosongkannya.
   - Tombol **Reset filter** muncul bila pencarian, status, atau rentang tanggal aktif. Bila tidak ada baris yang cocok, daftar menulis **Tidak ada permintaan yang cocok** dan juga menawarkan **Reset filter**. Bila belum ada permintaan sama sekali, daftar menulis **Belum ada permintaan barang** dengan keterangan **Permintaan muncul di sini setelah dibuat, sesuai tab dan filter yang dipilih.**
6. Di bawah tabel, pilih **Baris per halaman** dan pindah halaman dengan **Sebelumnya** dan **Berikutnya**.

## Status permintaan

Lencana di daftar, di filter, dan di halaman detail memakai nama berikut.

| Status | Arti dan efek pada stok | Tombol berikut di halaman detail | Pelaksana (peran bawaan) |
|---|---|---|---|
| **Draf** | Tersimpan, belum diajukan. Stok tidak berubah. | **Ajukan ke Gudang** | Pemohon |
| **Menunggu persetujuan** | Menunggu keputusan penyetuju. Stok tidak berubah. | **Setujui & Reservasi Stok** atau **Tolak Permintaan** | Manajer atau admin, bukan pemohon |
| **Disetujui** | Stok direservasi di gudang sumber. | **Siapkan barang** | Staf atau admin, bukan penyetuju |
| **Disiapkan** | Status lama. Hanya permintaan yang sudah berada di sini sebelum penyiapan dijadikan satu langkah. Reservasi tetap. | **Siapkan barang** | Staf atau admin |
| **Siap diambil** | Barang siap di meja serah terima. Reservasi tetap. | **Serah terima** | Staf atau admin, bukan pemohon dan bukan penyetuju |
| **Diserahkan** | Reservasi dilepas dan stok fisik berkurang. | Berkas pengembalian dibuat ([bagian 6.8](/docs/guides/web/inventory/material-returns/)) | Teknisi dan gudang |
| **Ditolak** | Ditolak dengan alasan. Stok tidak berubah. | Status akhir | Tidak ada |
| **Dibatalkan** | Dibatalkan sebelum disetujui. Stok tidak berubah. | Status akhir | Tidak ada |

Kolom **Aksi Berikutnya** di daftar menulis langkah yang menunggu: **Ajukan Permintaan** (draf), **Setujui permintaan** (menunggu persetujuan, bagi yang boleh memutuskan) atau **Menunggu persetujuan Manajer/Admin** (menunggu persetujuan, bagi pengguna lain), **Siapkan barang** (disetujui atau disiapkan), **Serah terima** (siap diambil), **Selesai (Deklarasi Pemakaian / Pengembalian)** (diserahkan), dan **Tidak Ada** (ditolak atau dibatalkan).

Stok yang direservasi atau dikurangi adalah stok di lokasi **Gudang Tujuan**. Di menu Stok ([bagian 6.5](/docs/guides/web/inventory/stock/)), persetujuan menambah kolom **Dicadangkan** dan mengurangi **Tersedia**, sedangkan serah terima mengurangi **Jumlah**. Mutasi Stok ([bagian 6.7](/docs/guides/web/inventory/stock-movements/)) mencatat baris berjenis **Dicadangkan**, **Cadangan dilepas**, dan **Keluar**.

## Membaca halaman detail

Klik kode permintaan atau tombol **Detail** untuk membuka halaman detail. Halaman itu memuat:

- Judul **Permintaan Barang** dengan kode permintaan (satu baris), keterangan siapa yang mengajukan dan kapan, tombol **Kembali**, dan tombol langkah yang boleh Anda lakukan pada status saat ini.
- Pada status **Menunggu persetujuan**, pengguna yang tidak boleh memutuskan melihat kotak **Menunggu persetujuan Manajer/Admin** di bawah judul, sebagai ganti tombol.
- Banner **Permintaan Barang Ditolak** (dengan **Alasan Penolakan**) atau **Permintaan Dibatalkan** (dengan **Alasan Pembatalan**).
- Kartu **Alur & Jejak Status Permintaan**. Permintaan yang berjalan normal menampilkan enam langkah: **Draf**, **Diajukan**, **Disetujui & Direservasi**, **Disiapkan**, **Siap diambil**, dan **Diserahkan**. Langkah yang sudah dilewati memuat nama pelaksana dan tanggalnya. Permintaan yang ditolak atau dibatalkan berhenti di langkah **Ditolak** atau **Dibatalkan**, dengan nama pengambil keputusan dan tanggalnya, dan langkah yang tidak pernah dicapai tidak tampil.
- Kartu **Daftar Barang yang Diminta** dengan kolom **Barang**, **Jumlah Diminta**, **Jumlah Disetujui**, **Jumlah Diserahkan**, dan **Catatan**. Selama status **Disetujui**, **Disiapkan**, atau **Siap diambil**, ada kolom **Ambil dari** di sebelah **Barang** yang menulis lokasi tempat tiap barang diambil, sebagai daftar kumpul untuk gudang.
- Kartu **Detail Permohonan** dengan **Status**, **Gudang Penyedia**, **Tanggal Dibutuhkan**, **Rujukan** (misalnya `SPK SPK-2026-00012`, dengan aturan tautan yang sama seperti di daftar), **Alasan Permintaan**, dan **Catatan Persetujuan** bila ada.
- Kartu **Pelaporan Pemakaian Aktual & Pengembalian Material**, hanya setelah status **Diserahkan** ([bagian 6.8](/docs/guides/web/inventory/material-returns/)).

![Halaman detail permintaan barang berstatus Draf dengan kartu Alur & Jejak Status Permintaan, Daftar Barang yang Diminta, dan Detail Permohonan](~/assets/guide/web/inventory-requests-show.webp)

Setiap perubahan status juga tercatat di Log Audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)) dengan modul `inventory_request`.

## Membuat permintaan barang

Izin: `inventory.request.create`. Sistem memberi nomor permintaan otomatis, berbentuk `REQ-2026-00001`: awalan, tahun, lalu nomor urut lima angka yang mulai dari 1 lagi setiap tahun. Bentuk ini dapat diubah di menu Penomoran ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)).

1. Klik **Buat Permintaan Barang** di kanan atas halaman daftar.

   ![Form Buat Permintaan Barang dengan kartu Informasi Pengajuan dan Daftar Barang yang Diminta](~/assets/guide/web/inventory-requests-create.webp)

2. Di kartu **Informasi Pengajuan**, isi:
   - **Gudang Tujuan**: ketik untuk mencari, lalu pilih lokasi yang menyimpan barang, ditulis kode dan nama (contoh: `AREA-01 - Default Area`). Daftar memuat semua lokasi aktif perusahaan, dan lokasi pertama sudah terpilih. Stok direservasi dan dikurangi dari lokasi ini, jadi jangan dikosongkan.
   - **Tanggal Dibutuhkan**: opsional. Ketik tanggal dalam format tanggal perusahaan, atau klik **Buka kalender** lalu pilih tanggal.
   - **Rujukan (opsional)**: pilih **SPK** atau **Tiket** untuk mengaitkan permintaan dengan pekerjaan. Biarkan **Tanpa rujukan** bila tidak ada. Mengganti pilihan ini mengosongkan pilihan pekerjaan di bawahnya.
   - **SPK** atau **Tiket**: muncul setelah Anda memilih rujukan, dan wajib diisi. Ketik minimal 2 huruf kode atau judul pekerjaan, lalu pilih. Hasil ditulis kode dan judul dengan nama pelanggan di bawahnya, paling banyak 20 hasil. Anda hanya ditawari pekerjaan yang boleh Anda buka: tanpa izin lihat SPK atau lihat tiket daftarnya kosong, dan teknisi atau penangani tanpa izin menugaskan hanya melihat pekerjaan yang ditugaskan kepadanya.
   - **Alasan Kebutuhan Barang**: wajib, maksimal 2000 karakter. Contoh: Kebutuhan penarikan kabel dropcore pelanggan baru di Perum Grihi Asri.
3. Di kartu **Daftar Barang yang Diminta**, isi baris pertama:
   - **Barang 1**: ketik minimal 2 huruf nama atau SKU, lalu pilih barang. Pilihan ditulis SKU, nama, dan satuan dalam kurung, dengan nama kategori di bawahnya. Daftar memuat barang aktif selain aset serial.
   - **Jumlah**: wajib, harus lebih besar dari 0, nilai awalnya `1`.
   - **Catatan**: opsional, maksimal 255 karakter.
4. Klik **Tambah Barang** untuk menambah baris (**Barang 2**, dan seterusnya). Satu barang hanya boleh muncul satu kali. Klik ikon tempat sampah (**Hapus barang 1**, **Hapus barang 2**, dan seterusnya) untuk menghapus baris; baris terakhir tidak dapat dihapus.
5. Klik **Simpan sebagai Draf** untuk menyimpan tanpa mengajukan, atau **Ajukan ke Antrean Gudang** untuk menyimpan sekaligus mengajukan.

Halaman detail permintaan baru terbuka dengan pesan `Permintaan barang berhasil dibuat.` Statusnya **Draf** atau **Menunggu persetujuan**. Pada pilihan kedua, pemegang `inventory.request.approve` menerima pemberitahuan di lonceng. Email hanya tersedia melalui ringkasan harian yang dinyalakan sendiri di Profil.

## Mengajukan draf ke gudang

Hanya pembuat permintaan, dengan izin `inventory.request.create`, yang dapat mengajukan draf.

1. Buka halaman detail permintaan berstatus **Draf**.
2. Klik **Ajukan ke Gudang**.
3. Klik **Ya, Ajukan** pada dialog **Ajukan Permintaan ke Antrean Gudang?**, atau **Batal** bila Anda tidak jadi.

Muncul pesan `Permintaan barang berhasil diajukan ke antrean gudang.` dan status menjadi **Menunggu persetujuan**.

## Menyetujui permintaan

Izin: `inventory.request.approve`. Permintaan harus berstatus **Menunggu persetujuan**, dan Anda bukan pemohonnya. Pengajuan yang menunggu Anda juga muncul di menu Persetujuan ([bagian 3.2](/docs/guides/web/operations/approvals/)), tetapi di sana jumlah yang disetujui selalu sama dengan jumlah diminta.

1. Buka halaman detail permintaan.
2. Klik **Setujui & Reservasi Stok**.
3. Di dialog **Setujui Permintaan & Reservasi Stok**, isi:
   - **Jumlah yang disetujui**: satu isian per barang, awalnya sama dengan **Jumlah Diminta**. Di bawah nama barang tertulis "Tersedia: {jumlah} {satuan}", yaitu stok di gudang yang akan dicek sistem (jumlah dikurangi dicadangkan). Ubah bila gudang hanya dapat memenuhi sebagian. Jumlah harus lebih besar dari 0 dan tidak boleh melebihi jumlah diminta. Jumlah yang melebihi stok tersedia ditandai merah dengan tulisan "Melebihi stok tersedia". Selama ada jumlah seperti itu, tombol **Setujui & Reservasi** nonaktif dan dialog menulis "Kurangi jumlah yang melebihi stok."
   - **Catatan Persetujuan (opsional)**: maksimal 1000 karakter. Catatan tampil di kartu **Detail Permohonan**.
4. Klik **Setujui & Reservasi**, atau **Batal**.

Sistem memeriksa stok tersedia (**Jumlah** dikurangi **Dicadangkan**) di Gudang Tujuan untuk setiap barang. Bila semuanya cukup, stok direservasi, status menjadi **Disetujui**, kolom **Jumlah Disetujui** terisi, pemohon menerima lonceng dan push, dan muncul pesan `Permintaan barang disetujui dan stok berhasil direservasi.` Bila satu barang kurang, tidak ada stok yang direservasi, dialog tetap terbuka dan menampilkan pesan kesalahan yang menyebut nama barang, gudang, jumlah tersedia, dan jumlah dibutuhkan.

Dialog persetujuan belum punya pilihan gudang. Permintaan yang disimpan tanpa **Gudang Tujuan** karena itu tidak dapat disetujui dari web (lihat Kesalahan umum).

## Menolak permintaan

Izin: `inventory.request.reject`. Syaratnya sama dengan persetujuan.

1. Buka halaman detail permintaan.
2. Klik **Tolak Permintaan**.
3. Isi **Alasan Penolakan** di dialog **Tolak Permintaan Barang**. Wajib, 3 sampai 1000 karakter. Tombol **Tolak Permintaan** di dialog baru aktif setelah alasan berisi minimal 3 karakter.
4. Klik **Tolak Permintaan** pada dialog, atau **Batal**.

Status menjadi **Ditolak**, banner **Permintaan Barang Ditolak** memuat alasannya, pemohon menerima lonceng serta push, dan muncul pesan `Permintaan barang telah ditolak.` Stok tidak berubah, dan penolakan tidak dapat dibatalkan.

## Menyiapkan dan menyerahkan barang

Izin: `inventory.request.prepare` untuk langkah 1, `inventory.request.issue` untuk langkah 2. Langkah gudang ini dilakukan pada halaman detail permintaan.

1. Pada status **Disetujui**, klik **Siapkan barang**. Tidak ada dialog konfirmasi. Gunakan kolom **Ambil dari** di kartu **Daftar Barang yang Diminta** untuk mengumpulkan barangnya. Muncul pesan `Barang disiapkan dan siap diambil.`, status langsung menjadi **Siap diambil**, dan pemohon menerima lonceng serta push. Alur status mencatat langkah **Disiapkan** dan **Siap diambil** dengan pelaksana dan tanggalnya. Permintaan yang tertinggal di status **Disiapkan** diselesaikan dengan tombol yang sama.
2. Saat pemohon menerima barang fisik, klik **Serah terima**, lalu klik **Konfirmasi serah terima** di dialog **Konfirmasi serah terima barang?**. Status menjadi **Diserahkan** dan muncul pesan `Barang berhasil diserahterimakan dan stok berkurang.`

Bila server menolak **Siapkan barang**, alasannya tampil di kotak merah di bawah judul halaman, karena tidak ada dialog yang menampungnya.

Serah terima bersifat permanen. Reservasi dilepas, stok fisik berkurang sebesar jumlah disetujui, kolom **Jumlah Diserahkan** terisi, dan sistem membuka berkas pengembalian untuk pemohon ([bagian 6.8](/docs/guides/web/inventory/material-returns/)). Stok dikurangi sekali, saat serah terima: persetujuan SPK terkait tidak mengurangi lagi jumlah yang sudah diserahkan lewat permintaan ini.

## Membatalkan permintaan

Permintaan hanya dapat dibatalkan saat **Draf** atau **Menunggu persetujuan**. Izin `inventory.request.cancel.own` membatasi pembatalan ke permintaan buatan sendiri, sedangkan tanpa izin itu pemegang `inventory.request.approve` dapat membatalkan permintaan siapa pun. Pada peran bawaan, admin hanya dapat membatalkan permintaannya sendiri, dan manajer dapat membatalkan permintaan siapa pun.

1. Buka halaman detail permintaan.
2. Klik **Batalkan Permintaan**.
3. Isi **Alasan Pembatalan (opsional)** di dialog **Batalkan Permintaan Barang?** bila perlu, maksimal 1000 karakter.
4. Klik **Batalkan Permintaan** pada dialog, atau klik **Tutup** bila Anda tidak jadi membatalkan.

Muncul pesan `Permintaan barang berhasil dibatalkan.` Status menjadi **Dibatalkan**, banner **Permintaan Dibatalkan** memuat alasannya (atau `Dibatalkan oleh pemohon.` bila alasan kosong), dan stok tidak berubah karena belum ada reservasi.

## Kesalahan umum

- Tombol **Setujui & Reservasi Stok**, **Tolak Permintaan**, **Siapkan barang**, atau **Serah terima** tidak muncul. Cek status permintaan, izin peran Anda, dan apakah Anda pemohon atau penyetuju permintaan itu. Bila ya, minta pengguna lain yang berhak melanjutkan. Pada status **Menunggu persetujuan**, kotak **Menunggu persetujuan Manajer/Admin** menandakan bahwa Anda tidak boleh memutuskan permintaan itu.
- Dialog persetujuan menampilkan `Permintaan barang tidak dapat disetujui karena status telah berubah atau Anda tidak berwenang.` (atau `... tidak dapat ditolak ...` pada dialog penolakan): pengguna lain sudah memutuskan lebih dulu, atau izin Anda berubah. Tutup dialog dan muat ulang halaman.
- Dialog persetujuan menampilkan `Stok {nama barang} di {nama gudang} tidak cukup: tersedia {tersedia} {satuan}, diminta {diminta} {satuan}.` Kurangi jumlah di dialog atau tambah stok lebih dulu ([bagian 6.5](/docs/guides/web/inventory/stock/)), lalu setujui lagi. Bila tidak dapat dipenuhi, tolak permintaan dengan alasan.
- Dialog persetujuan menolak jumlah 0 dengan pesan `jumlah disetujui harus lebih besar dari 0.`, dan menolak jumlah di atas permintaan dengan pesan `Jumlah barang yang disetujui (<jumlah>) tidak boleh melampaui jumlah yang diminta (<jumlah>).` Setiap barang harus disetujui lebih dari 0, jadi barang tidak dapat dicoret sebagian. Bila sebagian tidak dapat dipenuhi, tolak permintaan dan minta pemohon membuat ulang.
- Pesan `Lokasi gudang sumber wajib ditentukan untuk reservasi.` muncul di dialog persetujuan bila **Gudang Tujuan** dikosongkan saat membuat permintaan. Dialog persetujuan tidak punya pilihan lokasi, jadi tolak permintaan itu dan buat ulang dengan lokasi terpilih.
- Draf tidak dapat diubah setelah disimpan. Batalkan draf yang salah dan buat permintaan baru.
- Permintaan yang sudah disetujui tidak dapat dibatalkan dari layar ini, karena tombol **Batalkan Permintaan** hanya ada pada status **Draf** dan **Menunggu persetujuan**.
- Kotak merah **Terdapat kesalahan pengisian formulir:** muncul di atas form pembuatan dan mendaftar tiap isian yang salah. Penyebab umum: `alasan wajib diisi.`, `jumlah diminta harus lebih besar dari 0.`, `barang memiliki nilai ganda.` (barang yang sama dipilih dua kali), dan `Tanggal dibutuhkan harus berupa tanggal yang valid.` Perbaiki isian itu, lalu simpan lagi.
- Pesan `rujukan wajib diisi jika jenis rujukan terisi.` muncul di bawah isian **SPK** atau **Tiket** bila Anda memilih jenis rujukan tetapi belum memilih pekerjaannya. Pilih pekerjaan, atau ubah **Rujukan (opsional)** ke **Tanpa rujukan**.
- Pesan `SPK yang dipilih tidak valid untuk perusahaan ini.` atau `Tiket yang dipilih tidak valid untuk perusahaan ini.` berarti server menolak pekerjaan yang dipilih: pekerjaan itu bukan milik perusahaan aktif, atau akun Anda tidak boleh membukanya (tanpa izin lihat SPK atau lihat tiket, atau pekerjaan itu ditugaskan kepada orang lain dan Anda teknisi atau penangani tanpa izin menugaskan). Pilih ulang dari daftar.
- Isian **SPK** atau **Tiket** tidak menampilkan pekerjaan yang Anda cari: akun Anda tidak memegang izin lihat SPK atau lihat tiket, atau pekerjaan itu tidak ditugaskan kepada Anda (teknisi dan penangani tanpa izin menugaskan hanya melihat pekerjaan miliknya). Ketik minimal 2 huruf kode atau judul.
