---
title: "6.8 Pengembalian Barang"
description: "Pengembalian Barang mencatat sisa material yang dibawa pulang teknisi setelah bekerja, dan menambah stok gudang hanya setelah petugas gudang memeriksa"
---

Pengembalian Barang mencatat sisa material yang dibawa pulang teknisi setelah bekerja, dan menambah stok gudang hanya setelah petugas gudang memeriksa barangnya. Sistem membuka satu berkas pengembalian setiap kali permintaan barang berstatus **Diserahkan**. Teknisi melapor di aplikasi teknisi, dan gudang memverifikasi di web.

Peran yang dapat memakai: admin (semua langkah), manajer (melihat semua, menerima, menyelesaikan selisih), dan staf (melihat semua, menerima). Izin: `inventory.return.view.own` (Lihat pengembalian barang sendiri), `inventory.return.view.all` (Lihat semua pengembalian barang), `inventory.return.declare` (Laporkan sisa barang), `inventory.return.receive` (Terima pengembalian barang), `inventory.return.resolve` (Selesaikan selisih pengembalian).

Pemegang `inventory.return.view.all` melihat semua berkas di perusahaan aktif, sedangkan pemegang `inventory.return.view.own` hanya melihat berkas miliknya. `inventory.return.declare` memungkinkan pemilik berkas melapor pemakaian, `inventory.return.receive` memungkinkan menerima atau menolak penyerahan fisik, dan `inventory.return.resolve` memungkinkan menyelesaikan selisih.

Pemilik berkas adalah pemohon permintaan, biasanya teknisi. Pemilik tidak boleh menerima, menolak, atau menyelesaikan berkasnya sendiri, dan orang yang menerima fisik tidak boleh menyelesaikan selisih berkas yang sama.

## Membuka dan membaca daftar

Pengembalian tidak punya menu sendiri. Daftarnya adalah satu tab pada halaman Permintaan Barang.

1. Di sidebar, buka grup **Inventaris**, lalu klik **Permintaan Barang**.
2. Klik tab **Pengembalian material**. Tab ini tampil bagi pemegang salah satu izin pengembalian di atas. Kartu **Antrean retur material** di Dasbor ([bagian 2.1](/docs/guides/web/dashboard/queue-cards/)) membuka tab ini langsung pada antrean yang sesuai.

   ![Tab Pengembalian material dengan kotak Prinsip keamanan stok pengembalian material, tombol antrean, kotak Cari pengembalian, dan kartu berkas](~/assets/guide/web/inventory-returns.webp)

3. Baca bagian atas tab. Kotak **Prinsip keamanan stok pengembalian material** mengingatkan bahwa deklarasi teknisi tidak mengubah stok gudang. Pilih antrean dengan tombol di bawahnya:
   - **Antrean Penerimaan Gudang**: berkas **Menunggu penerimaan gudang**. Tampil bagi pemegang izin terima atau izin lihat semua, dan terbuka lebih dulu bagi pemegang `inventory.return.receive`.
   - **Antrean Selisih**: berkas **Selisih perlu penyelesaian**. Tampil bagi pemegang izin selesaikan atau izin lihat semua, dan terbuka lebih dulu bagi pemegang `inventory.return.resolve` yang tidak memegang izin terima.
   - **Antrean Deklarasi Teknisi**: berkas **Menunggu deklarasi teknisi**. Tampil bagi pemegang izin lapor, izin lihat milik sendiri, atau izin lihat semua.
   - **Perlu Koreksi**: berkas **Perlu koreksi**.
   - **Semua Status**: semua berkas.

   Bila Anda tidak memegang izin terima, selesaikan, maupun lapor, tab terbuka pada **Semua Status**. Pilihan **Status pengembalian** di sebelah tombol memuat **Semua status** dan enam status berkas, dan menyaring menurut satu status.
4. Setelah daftar dimuat, lencana angka muncul di tab dan di tombol antrean. Angka di **Antrean Penerimaan Gudang** menghitung berkas yang menunggu penerimaan ditambah berkas selisih. Angka di **Antrean Deklarasi Teknisi** menghitung berkas Anda sendiri yang menunggu deklarasi atau perlu koreksi. Kotak **Cari pengembalian** (petunjuk `Cari SPK atau teknisi`) mencari kode permintaan, nama teknisi, dan nomor berkas, bukan kode SPK. Tombol ikon panah melingkar (**Muat ulang antrean pengembalian**) menyegarkan daftar.
5. Baca kartu berkas: kode permintaan (atau `Pengembalian #<nomor>` bila tanpa permintaan), lencana status, **Teknisi**, **Gudang Tujuan**, **SPK**, **Tanggal Deklarasi**, daftar **Barang Dikembalikan** dengan jumlah **Baik** dan **Selisih** hasil deklarasi, serta **Alasan Penolakan** atau **Catatan Penyelesaian** bila ada. Lencana **Anda dapat menerima**, **Anda dapat menyelesaikan**, dan **Anda dapat mendeklarasikan** menandai tindakan yang boleh Anda lakukan pada berkas itu. Tanpa lencana, Anda hanya dapat membaca.
6. Klik tombol di bawah kartu: **Buka Permintaan & Terima Barang**, **Buka & Selesaikan Selisih**, **Buka Permintaan & Buat Deklarasi**, atau **Buka Permintaan**. Semuanya membuka halaman detail permintaan, tempat langkah dilakukan. Nama tombol mengikuti status berkas atau izin Anda, jadi tombol bisa muncul pada berkas yang belum boleh Anda proses. Tombol yang bisa diklik muncul di halaman detail. Berkas tanpa permintaan terkait menampilkan tombol nonaktif **Tidak terkait permintaan barang**.
7. Bila tidak ada kartu, daftar menampilkan `Belum ada berkas pengembalian material` (berkas dibuat otomatis saat barang diserahkan) atau `Tidak ada berkas pengembalian yang cocok` dengan tombol **Reset filter**.

## Status berkas pengembalian

| Status | Arti | Efek pada stok | Langkah berikut |
|---|---|---|---|
| **Menunggu deklarasi teknisi** | Barang sudah diserahkan, teknisi belum melapor. | Tidak ada. | Teknisi melapor di aplikasi teknisi |
| **Menunggu penerimaan gudang** | Teknisi sudah melapor, gudang belum memeriksa barang. | Tidak ada. Laporan tidak mengubah stok. | **Terima Pengembalian Fisik** atau **Tolak Fisik Barang** |
| **Perlu koreksi** | Gudang menolak penyerahan fisik dan menulis alasannya. | Tidak ada. | Teknisi melapor ulang |
| **Selisih perlu penyelesaian** | Gudang menerima barang, tetapi ada barang rusak atau selisih. | Barang baik sudah masuk stok. Barang rusak tidak masuk. | **Selesaikan Selisih** |
| **Diterima** | Semua barang cocok dan diterima. | Barang baik sudah masuk stok. | Status akhir |
| **Selisih diselesaikan** | Penyelesai menutup selisih dengan catatan. | Tidak ada tambahan. | Status akhir |

## Mendeklarasikan pemakaian

Teknisi mengerjakannya di aplikasi teknisi. Untuk setiap barang, jumlah dipakai, sisa baik, dan selisih harus berjumlah sama dengan jumlah yang diserahkan. Jika ada selisih, deklarasi wajib menyebut jenis selisihnya. Setelah laporan masuk, status berkas menjadi **Menunggu penerimaan gudang**, pemegang `inventory.return.receive` menerima pemberitahuan di lonceng, dan stok belum berubah.

Di web, tombol **Laporkan Pemakaian & Ajukan Pengembalian** hanya muncul bagi pemilik berkas yang memegang `inventory.return.declare`, misalnya admin yang membuat permintaannya sendiri. Tombol itu muncul saat status berkas **Menunggu deklarasi teknisi** atau **Perlu koreksi**.

1. Buka halaman detail permintaan dari tombol **Buka Permintaan & Buat Deklarasi**. Kartu **Pelaporan Pemakaian Aktual & Pengembalian Material** hanya tampil pada permintaan berstatus **Diserahkan**.
2. Klik **Laporkan Pemakaian & Ajukan Pengembalian**.
3. Di dialog **Deklarasi Pemakaian Aktual & Sisa Barang**, isi per barang:
   - **Dipakai Aktual**: jumlah yang terpakai di lapangan, paling banyak sebesar **Diserahkan** (angka ini tertulis di baris nama barang).
   - **Sisa Dikembalikan**: terisi otomatis sebesar Diserahkan dikurangi Dipakai Aktual. Ubah bila perlu.
4. Klik **Kirim Laporan Deklarasi**. Dialog tertutup dan kartu memuat status baru. Tidak ada pesan sukses terpisah.

Dialog web tidak punya isian selisih, jadi **Dipakai Aktual** dan **Sisa Dikembalikan** harus berjumlah sama dengan **Diserahkan**. Selisih yang sudah tersimpan dari laporan sebelumnya ikut terkirim apa adanya.

## Menerima pengembalian fisik

Izin: `inventory.return.receive`. Berkas harus berstatus **Menunggu penerimaan gudang**.

1. Klik **Buka Permintaan & Terima Barang** pada kartu berkas.
2. Pada kartu **Pelaporan Pemakaian Aktual & Pengembalian Material**, periksa tabel dengan kolom **Barang**, **Diserahkan**, **Dipakai Riil**, **Sisa Diharapkan**, **Diterima Fisik**, dan **Rusak / Hilang**. Setiap jumlah ditulis dengan simbol satuan barang, misalnya `12 m`. Cocokkan **Sisa Diharapkan** dengan barang yang dibawa teknisi.
3. Klik **Terima Pengembalian Fisik**.
4. Di dialog **Terima Pengembalian Fisik Material**, isi per barang. Baris nama barang menampilkan **Deklarasi Sisa**.
   - **Baik**: jumlah barang baik yang Anda terima, yang menambah stok. Awalnya sama dengan jumlah baik yang dideklarasikan teknisi.
   - **Rusak**, **Hilang**, dan **Lainnya**: awalnya terisi dari selisih yang dideklarasikan teknisi, sesuai kode selisihnya (rusak, hilang, atau lainnya). Selisih tanpa kode masuk **Lainnya**. Sisanya 0.
   - Di bawah nama barang tertulis "Diserahkan {jumlah} · terpakai {jumlah}". Di bawah keempat isian, baris status menulis "Jumlah cocok" (hijau), "Kurang {x}" atau "Lebih {x}" (merah) menurut aturan di bawah.
5. Klik **Konfirmasi Penerimaan Fisik**. Tombol ini menunggu sampai setiap barang cocok. Bila belum, dialog menulis "Samakan jumlah setiap barang dengan yang diserahkan."

Pada setiap barang, **Dipakai Riil** ditambah **Baik** ditambah **Rusak** ditambah **Hilang** ditambah **Lainnya** harus sama dengan **Diserahkan**. Catat barang hilang di **Hilang**, bukan di **Rusak**, supaya selisihnya tepat.

Jumlah **Baik** langsung menambah stok di **Gudang Tujuan** dan tercatat di Mutasi Stok sebagai **Pengembalian** ([bagian 6.7](/docs/guides/web/inventory/stock-movements/)). Bila **Rusak**, **Hilang**, dan **Lainnya** nol di semua barang, status menjadi **Diterima**. Bila ada barang di salah satu dari ketiganya, status menjadi **Selisih perlu penyelesaian** dan pemegang `inventory.return.resolve` menerima pemberitahuan di lonceng.

## Menolak penyerahan fisik

Izin dan syarat sama dengan penerimaan. Pakai langkah ini bila barang belum sampai di meja gudang atau tidak sesuai deklarasi.

1. Klik **Tolak Fisik Barang** pada kartu **Pelaporan Pemakaian Aktual & Pengembalian Material**.
2. Isi **Alasan Penolakan Fisik** di dialog **Tolak Penyerahan Fisik Barang** (petunjuk `Jelaskan mengapa penyerahan fisik ditolak`). Wajib, 3 sampai 1000 karakter. Tombol **Tolak Penyerahan** baru aktif setelah alasan berisi 3 karakter.
3. Klik **Tolak Penyerahan**.

Status menjadi **Perlu koreksi**, banner **Penyerahan Fisik Ditolak Gudang** memuat alasannya, dan stok tidak berubah. Teknisi menerima lonceng serta push berisi alasan, lalu melapor ulang. Setelah laporan baru masuk, status kembali ke **Menunggu penerimaan gudang**.

## Menyelesaikan selisih

Izin: `inventory.return.resolve`. Berkas harus berstatus **Selisih perlu penyelesaian**. Pada peran bawaan, staf menerima dan manajer menyelesaikan.

1. Klik **Buka & Selesaikan Selisih** pada kartu berkas. Di halaman detail, kotak **Selisih material perlu diselesaikan** menjelaskan keadaannya.
2. Tinjau kolom **Rusak / Hilang** pada tabel.
3. Klik **Selesaikan Selisih**.
4. Isi **Catatan Penyelesaian** di dialog **Selesaikan Selisih Material** (petunjuk `Jelaskan keputusan penyelesaian selisih`). Wajib, 3 sampai 1000 karakter. Tombol **Konfirmasi Penyelesaian** baru aktif setelah catatan berisi 3 karakter.
5. Klik **Konfirmasi Penyelesaian**.

Status menjadi **Selisih diselesaikan** dan catatan tampil di berkas, dalam kotak **Selisih material sudah diselesaikan**. Stok tidak berubah: barang rusak atau hilang tidak masuk stok karena sudah keluar saat serah terima.

## Hubungan dengan SPK

Bila permintaan memakai **Rujukan (opsional)** **SPK**, berkasnya terhubung ke SPK itu. Teknisi tidak dapat mengirim SPK untuk ditinjau selama ada berkas yang belum dilaporkan, yaitu berstatus **Menunggu deklarasi teknisi** atau **Perlu koreksi**. Saat berkas menjadi **Diterima** atau **Selisih diselesaikan**, jumlah pakai pada material SPK disesuaikan dengan jumlah **Dipakai Aktual** ([bagian 3.3](/docs/guides/web/operations/work-orders/)).

## Kesalahan umum

- Tab **Pengembalian material** tampil, tetapi daftar menampilkan kotak galat merah dengan tombol **Coba lagi**. Peran Anda memegang izin lapor, terima, atau selesaikan tanpa `inventory.return.view.all` atau `inventory.return.view.own`. Minta admin perusahaan menambahkan izin lihat ke peran di menu Peran ([bagian 8.6](/docs/guides/web/administration/roles/)).
- Tombol **Terima Pengembalian Fisik** dan **Tolak Fisik Barang** tidak muncul. Status berkas bukan **Menunggu penerimaan gudang**, Anda tidak memegang `inventory.return.receive`, atau Anda sendiri pemilik berkas. Minta pengguna lain menerimanya. Bila halaman sudah lama terbuka, server tetap menolak dengan pesan seperti `Maker-checker: teknisi pemilik barang tidak boleh menerima fisiknya sendiri di gudang.`
- Tombol **Selesaikan Selisih** tidak muncul. Status berkas bukan **Selisih perlu penyelesaian**, Anda tidak memegang `inventory.return.resolve`, Anda pemilik berkas, atau Anda yang menerima fisiknya. Minta pengguna lain, misalnya manajer. Server menolak dengan `Teknisi tidak berhak menyelesaikan selisih barangnya sendiri.` atau `Penerima fisik gudang tidak boleh menyelesaikan selisih yang ia terima sendiri.`
- Pesan `Jumlah tidak cocok untuk {nama barang}: diserahkan (...) harus sama dengan ...` muncul di kotak merah dialog bila angka satu barang tidak cocok dengan jumlah **Diserahkan**. Ubah angka di dialog sampai totalnya sama dengan **Diserahkan**. Pesan penolakan lain pada berkas juga menyebut nama barang, bukan kode baris.
- Gudang tidak dapat menerima berkas yang masih **Menunggu deklarasi teknisi**: server menjawab `Kasus pengembalian harus berstatus menunggu penerimaan gudang untuk diterima.` Minta teknisi melapor di aplikasi teknisi lebih dulu.
- Alasan penolakan atau catatan penyelesaian kurang dari 3 karakter: dialog menampilkan `Harap isi alasan penolakan minimal 3 karakter.` atau `Catatan penyelesaian minimal 3 karakter.`
- Teknisi gagal mengirim SPK dengan pesan `Seluruh sisa material dari permintaan barang harus dideklarasikan terlebih dahulu sebelum SPK diajukan.` Minta teknisi melapor di aplikasi teknisi.
- SPK gagal disetujui dengan pesan `SPK belum bisa disetujui sampai seluruh retur material berstatus direkonsiliasi atau diselesaikan.` Selesaikan penerimaan atau selisih semua berkas SPK itu (status **Diterima** atau **Selisih diselesaikan**), lalu setujui lagi.
