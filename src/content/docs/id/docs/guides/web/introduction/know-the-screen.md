---
title: "1.5 Mengenal layar"
description: "Hampir semua menu memakai kerangka yang sama. Bagian ini menjelaskan kerangka itu sekali. Bab berikutnya hanya menyebut hal yang khusus untuk menu tersebut."
---

Hampir semua menu memakai kerangka yang sama. Bagian ini menjelaskan kerangka itu sekali. Bab berikutnya hanya menyebut hal yang khusus untuk menu tersebut.

## Sidebar dan bilah atas

- Sidebar di kiri memuat logo perusahaan, nama perusahaan, tombol **Ganti perusahaan** bila ada ([bagian 1.6](/docs/guides/web/introduction/switch-company/)), **Dasbor**, dan enam grup menu: **Operasional**, **Pelanggan & Layanan**, **Jaringan**, **Inventaris**, **Keuangan & Laporan**, **Administrasi**. Bila perusahaan belum mengunggah logo, kotak logo menampilkan tanda Inbils (bulatan biru). Klik judul grup untuk membuka atau menutupnya. Grup yang berisi halaman aktif terbuka sendiri.
- Hanya menu yang diizinkan untuk peran Anda yang tampil. Grup tanpa menu tidak tampil.
- Angka kecil di samping **Pekerjaan Saya**, **Penugasan**, dan **Persetujuan** menunjukkan jumlah antrean yang menunggu.
- Di layar sempit, sidebar tersembunyi. Klik tombol tiga garis di kiri atas (**Menu navigasi**) untuk membukanya. Tombol Esc menutupnya.
- Di bilah atas, nama halaman tampil di kiri. Lonceng di kanan membuka halaman **Notifikasi** ([bagian 2.2](/docs/guides/web/dashboard/notifications/)). Angka merah pada lonceng adalah jumlah yang belum dibaca, ditulis 99+ bila lebih dari 99.
- Klik nama Anda di kanan atas untuk membuka menu dengan nama dan email Anda, disusul **Profil**, **Mode gelap** (atau **Mode terang**), dan **Keluar**. Pilihan tema disimpan di browser.
- Saat halaman baru dibuka, tekan Tab sekali: tautan **Langsung ke konten** muncul di kiri atas. Tekan Enter untuk melompat ke isi halaman tanpa melewati seluruh menu.

## Daftar dan tabel

- Judul halaman dan satu kalimat penjelasnya ada di kiri atas. Tombol di kanan atas biasanya **Ekspor** dan tombol pembuatan data yang namanya diawali **Buat**, misalnya **Buat Pelanggan**.
- Kotak **Cari** mencari pada kolom yang disebut di teks petunjuknya, misalnya "Nama, kode, atau telepon". Beberapa halaman memberi nama lain, misalnya **Cari stok**, **Cari permintaan**, atau **Pencarian** (Penugasan, Persetujuan, dan Pekerjaan Saya). Daftar diperbarui sendiri sebentar setelah Anda berhenti mengetik. Di Penugasan dan Pekerjaan Saya, tombol **Cari** menerapkannya seketika.
- Kotak pilihan di samping pencarian menyaring daftar, misalnya status atau jenis. Pilihan pertamanya menghapus saringan, misalnya "Semua status". Mengubah filter selalu kembali ke halaman pertama. Tombol **Reset filter** (di samping filter, atau di tabel yang hasilnya kosong) mengosongkan pencarian dan semua filter.
- Klik judul kolom yang berpanah untuk mengurutkan. Klik lagi untuk membalik urutan.
- Di bawah tabel, Inbils menulis rentang baris yang tampil dan totalnya (diawali "Menampilkan"), pemilih **Baris per halaman** (10, 25, atau 50), tombol **Sebelumnya** dan **Berikutnya**, dan nomor halaman (misalnya Halaman 1 dari 3). Bagian ini tidak tampil bila tabel kosong, atau bila semua baris muat dalam satu halaman dan halaman itu tidak punya pemilih jumlah baris.
- Kolom **Aksi** memuat nama baris sebagai tautan ke halaman detail, satu tombol utama (**Ubah**, atau **Lihat** bila baris tidak bisa Anda ubah), dan menu tiga titik **Aksi lainnya** berisi **Lihat detail** dan **Hapus**. Pada data master, menu itu berisi **Nonaktifkan**, **Aktifkan**, atau **Hapus permanen** sebagai ganti **Hapus** (lihat "Nonaktifkan, Hapus permanen, filter Status, dan Pulihkan" di bawah). Tombol hanya tampil bila Anda punya izinnya.
- **Hapus** (pada data yang bukan master) selalu membuka dialog konfirmasi. Judulnya menyebut data yang dihapus. Bila halaman tidak menyebut nama, judulnya "Hapus data ini?". Tombolnya **Batal** dan **Hapus**, dan keduanya nonaktif selama permintaan berjalan. Dialog menutup sendiri bila penghapusan berhasil.
- Data yang masih dipakai tidak bisa dihapus. Pada banyak halaman, kalimat di bawah judul dialog menyebut aturannya, misalnya "Tiket hanya bisa dihapus saat berstatus ditutup." Bila server menolak, dialog tetap terbuka dan toast merah "Data gagal disimpan. Periksa input." muncul. Di Pengguna dan Organisasi, alasan penolakan juga tampil dalam kotak merah di atas daftar.
- Bila filter atau pencarian tidak menemukan apa pun, tabel menulis "Tidak ada &lt;item&gt; yang cocok" dengan tombol **Reset filter**. Bila belum ada data, tabel menulis "Belum ada &lt;item&gt; yang tercatat." atau penjelasan khusus halaman itu, dengan tombol pembuatan data bila Anda boleh membuatnya.
- Tombol **Ekspor** membuka menu **Ekspor CSV** dan, di daftar yang menyediakannya, **Ekspor PDF**. Hasilnya mengikuti filter yang sedang aktif. Satu ekspor dibatasi 5.000 baris. Bila terpotong, baris terakhir CSV berisi "# Ekspor dipotong pada 5000 baris. Persempit filter untuk mengekspor sisa barisnya." PDF memuat paling banyak 1.500 sel (jumlah baris dikali jumlah kolom), jadi PDF dengan banyak kolom terpotong lebih awal dari 5.000 baris. Bila PDF terpotong, di bawah judulnya tertulis "dibatasi sampai" disusul batasnya dan "PDF dibatasi N baris. Untuk data lengkap, unduh CSV atau persempit periode." Persempit filter atau unduh CSV, lalu ekspor lagi. Setiap ekspor tercatat di Log Audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)).

## Nonaktifkan, Hapus permanen, filter Status, dan Pulihkan

Data master (profil bandwidth, profil kecepatan, tingkat SLA, paket, barang, kategori barang, satuan, lokasi, pelanggan, jenis dokumen, kendaraan, dan unit organisasi) tidak memakai **Hapus** biasa. Data yang sudah dipakai data lain tidak boleh hilang, karena tagihan, SPK, dan tiket lama tetap membutuhkannya. Menu **Aksi lainnya** pada baris master berisi:

- **Nonaktifkan**, pada baris yang aktif (izin ubah). Data nonaktif tidak muncul di pilihan formulir baru, tetapi semua yang sudah memakainya tetap utuh, dan formulir yang sudah memegangnya tetap menampilkannya. Dialog menulis "Nonaktifkan `<nama>`?" disusul, bila data sudah dipakai, kalimat seperti `Paket layanan "<nama>" dipakai 12 langganan, jadi tidak bisa dihapus permanen. Setelah dinonaktifkan, data ini tidak muncul di pilihan baru dan riwayatnya tetap utuh.` Toast hijau menulis "`<Jenis>` dinonaktifkan." (misalnya "Profil bandwidth dinonaktifkan.").
- **Aktifkan**, pada baris yang nonaktif (izin ubah). Data kembali muncul di pilihan baru. Toast "`<Jenis>` diaktifkan."
- **Hapus permanen**, hanya bila tidak ada data lain yang menunjuk ke baris itu (izin hapus). Dialog menulis `<Jenis> "<nama>" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan.` Tombolnya merah. Toast "`<Jenis>` dihapus permanen." Data yang dihapus permanen tidak bisa dipulihkan dan tidak muncul lagi, juga tidak di **Dihapus** atau **Semua, termasuk dihapus**.

Angka pemakai ("dipakai 3 paket, 12 langganan") menghitung setiap baris data lain yang menunjuk ke data ini, termasuk riwayat dan baris yang sudah dihapus. Selama satu angka di atas nol, menu tidak menawarkan **Hapus permanen**: pilihan satu-satunya adalah **Nonaktifkan**. Bila data baru dipakai setelah Anda membuka menu, server menolak penghapusan. Dialog tetap terbuka dan menulis alasannya dalam teks merah, misalnya "Profil bandwidth masih dipakai 1 paket. Nonaktifkan saja."

Filter **Status** di daftar ini punya pilihan, berurutan:

1. **Semua status** (bawaan). Menampilkan data yang tidak dihapus.
2. **Aktif** dan **Nonaktif**, hanya di daftar master yang bisa dinonaktifkan.
3. Status milik halaman itu (misalnya **Terbuka**, **Lunas**, atau **Dikerjakan**).
4. **Dihapus**. Hanya data yang dihapus.
5. **Semua, termasuk dihapus**.

Baris yang dihapus tampil dengan status **Dihapus**, namanya berupa teks biasa (tidak bisa dibuka), dan tidak punya tombol **Ubah** atau **Lihat**. Menu **Aksi lainnya** hanya berisi **Pulihkan** (izin yang sama dengan hapus). Dialog menulis "Pulihkan `<nama>`?" dan toast "`<Jenis>` dipulihkan." Data kembali ke daftar dengan statusnya semula. Pulihkan ditolak dengan teks merah di dialog bila:

- induknya masih dihapus (lokasi, unit organisasi, kategori barang): "`<Jenis>` tidak bisa dipulihkan karena induknya, `<nama induk>`, masih dihapus. Pulihkan induknya dulu." Pulihkan induknya lebih dulu;
- kode atau namanya sudah dipakai data lain: "`<Jenis>` tidak bisa dipulihkan karena kode atau namanya sudah dipakai data lain. Ubah data itu dulu."

Lokasi dan unit organisasi yang dipulihkan menghitung ulang jalurnya dari induknya yang sekarang, sehingga nama jalurnya mengikuti induk yang mungkin sudah diganti nama atau dipindah selama data itu dihapus.

Kode dan nama tetap terpesan. Data nonaktif atau dihapus masih memegang kode dan namanya, jadi membuat data baru dengan kode atau nama yang sama ditolak dengan pesan isian "sudah digunakan". Buka filter **Nonaktif** atau **Dihapus** untuk menemukan pemegangnya, lalu **Aktifkan** atau **Pulihkan** data itu, atau pakai kode lain.

Karyawan, evaluasi, aset jaringan, tiket, SPK, dan tagihan tidak punya **Nonaktifkan**. Aturan hapusnya tidak berubah (misalnya tiket hanya dihapus saat **Ditutup** dan tagihan hanya saat **Draf**), tetapi daftarnya punya filter **Dihapus** dan aksi **Pulihkan** dengan aturan yang sama.

Dokumen yang sudah terbit tidak berubah bila nama aslinya diganti: lihat bagian "Nama beku pada dokumen" di bawah.

## Nama beku pada dokumen

Mengganti nama pelanggan, paket, kategori tiket, atau teknisi tidak menulis ulang dokumen yang sudah terbit. Tagihan, SPK, dan tiket menyimpan nama pada saat yang menentukan:

- **Tagihan** menyimpan nama pelanggan, alamat, NPWP, dan nama paket pada saat keluar dari **Draf** (saat dikirim, saat dibuat otomatis, dan saat draf dibatalkan). PDF, detail tagihan, dan aplikasi pelanggan memakai nama itu.
- **SPK** menyimpan nama teknisi dan kode lokasi saat disetujui menjadi **Selesai**.
- **Tiket** menyimpan nama kategori dan nama petugas saat **Ditutup**.

Bila nama saat ini berbeda, halaman detail menulis nama yang beku, disusul "(saat terbit)", "(saat selesai)", atau "(saat ditutup)" di sampingnya. Draf, SPK yang belum selesai, dan tiket yang belum ditutup masih mengikuti nama yang berlaku. Data lama yang sudah terbit sebelum fitur ini diisi sekali dengan nama saat itu.

## Formulir dan pesan

- Isian wajib ditandai bintang merah di belakang namanya dan harus terisi sebelum menyimpan. Pesan merah di bawah isian menjelaskan apa yang salah. Bila formulir memakai pemeriksaan browser, gelembung kecil berbahasa Indonesia muncul di isian yang bermasalah, misalnya "Wajib diisi.", "Format tidak sesuai.", "Nilai paling kecil 1.", "Nilai paling besar 5." atau "Paling sedikit 5 karakter." Di kanan atas layar, toast merah "Data gagal disimpan. Periksa input." menandai bahwa penyimpanan gagal.
- Toast hijau menandai penyimpanan berhasil. Teksnya berbahasa Indonesia dan datang dari server, misalnya "Pelanggan dihapus." Toast hilang sendiri setelah sekitar 4 detik. Klik tombol x di toast untuk menutupnya lebih cepat. Bila banner akses dukungan atau pita anak perusahaan ([bagian 1.6](/docs/guides/web/introduction/switch-company/)) tampil di atas halaman, toast muncul tepat di bawahnya, jadi tidak menutup tombol di banner itu.
- Tombol yang sedang memproses menampilkan indikator putar dan tidak bisa diklik dua kali.
- Rupiah baru dihitung sebagai rupiah penuh dengan pembulatan setengah ke atas. Layar, aplikasi, dan PDF menampilkan nilai penuh seperti `Rp 147.702`. Data lama yang masih punya sen tetap tampil tanpa kehilangan nilainya, misalnya `Rp 147.701,62`. Persentase dan angka desimal memakai koma desimal, misalnya `63,6%` dan `4,8`. Format tanggal mengikuti pengaturan perusahaan, dan jam memakai format 24 jam.

## Pesan benturan

Empat pesan ini berarti server menolak penyimpanan Anda karena keadaan data sudah berubah, dan tidak ada yang tersimpan. Pesannya tampil sebagai toast merah di kanan atas.

- "Permintaan yang sama baru saja dikirim.": Anda mengirim isian yang persis sama ke halaman yang sama dua kali dalam 10 detik, misalnya karena klik ganda atau dua tab. Permintaan pertama tetap berlaku, jadi cukup periksa hasilnya di daftar. Isian yang ditolak karena salah tidak dihitung, jadi setelah memperbaikinya Anda bisa mengirim lagi langsung. Bila Anda memang perlu mengirim dua isian yang sama persis, tunggu 10 detik di antaranya.
- "Data diubah pengguna lain; muat ulang.": orang lain menyimpan data yang sama sejak Anda membuka formulir ubah. Banner dengan judul pesan itu, keterangan "Muat ulang halaman untuk melihat data terbaru, lalu ulangi perubahan Anda." dan tombol **Muat ulang** tampil di atas formulir. Klik **Muat ulang** untuk membuka ulang halaman dengan data terbaru, lalu ulangi perubahan Anda. Isian yang sudah Anda ketik hilang. Pesan ini berlaku di **Ubah Pelanggan**, **Ubah Barang**, **Ubah Paket Layanan**, **Ubah SPK**, dialog **Ubah Karyawan**, dan **Pengaturan Perusahaan**.
- "Perusahaan aktif berubah di tab lain.": lihat [bagian 1.6](/docs/guides/web/introduction/switch-company/), **Kesalahan umum**.
- "Stok berubah sejak dihitung; hitung ulang.": hanya saat menyetujui penyesuaian stok, lihat [bagian 6.5](/docs/guides/web/inventory/stock/).

## Isian pilihan, tanggal, dan jam

- Isian yang memilih data lain (pelanggan, lokasi, barang, pengguna, dan sebagainya) adalah kotak pencarian: klik isian, ketik sebagian nama atau kode, lalu klik hasilnya, atau tekan tombol panah dan Enter. Tidak ada isian yang meminta Anda mengetik ID. Saat daftar dibuka, pilihan yang sudah dipilih tersorot dan tergulir ke dalam tampilan.
- Pada tabel besar (misalnya pelanggan, langganan, dan barang), daftar dimuat dari server. Begitu Anda membuka isian yang masih kosong, daftar menampilkan paling banyak 10 data terbaru di bawah judul **Terakhir dipakai**. Setelah Anda mengetik minimal 2 huruf, pencarian berjalan di server dan daftar menampilkan paling banyak 20 hasil. Dengan 1 huruf daftar menulis "Ketik minimal 2 huruf untuk mencari.", selama mencari menulis "Mencari...", dan bila tidak ada yang cocok menulis "Tidak ada hasil." atau kalimat khusus isian itu. Pencarian tidak menambahkan apa pun ke alamat halaman, jadi menyalin alamat atau memuat ulang halaman tidak membawa kata yang Anda cari.
- Pilihan yang sudah dipilih tetap ada selama Anda mengetik. Pilihan berubah hanya bila Anda memilih hasil lain atau mengklik tombol x (**Hapus pilihan**).
- Isian tanggal menerima format perusahaan dan format angka `20/10/2026`, `20-10-2026`, atau `2026-10-20`. Tekan Enter atau pindah ke isian lain untuk menetapkannya. Anda juga dapat klik ikon kalender (**Buka kalender**), pilih hari, atau klik **Hari ini**. Tombol x (**Hapus tanggal**) mengosongkan isian. Isian kosong menampilkan petunjuk seperti "Pilih tanggal". Tulisan yang bukan tanggal ditolak dengan pesan "Format tanggal tidak valid." disusul contoh, dan formulir tidak dapat dikirim sampai tanggal diperbaiki.
- Isian tanggal dan jam ("Pilih tanggal dan jam"), bulan ("Pilih bulan"), dan jam ("Pilih jam") bekerja dengan cara yang sama: ketik, atau buka pemilihnya. Jam dipilih dari daftar per 30 menit atau diketik dalam format 24 jam. Pada tanggal dan jam, hari yang dipilih tanpa jam dimulai pukul 00:00, dan jam tanpa hari memakai hari ini.

## Halaman galat

Bila Anda membuka halaman yang tidak diizinkan atau tidak ada, atau bila terjadi gangguan, Inbils menampilkan halaman dengan judul, penjelasan, dan tulisan "Kode galat" disusul nomornya:

- **Akses ditolak** (403): peran Anda tidak punya izin untuk halaman itu.
- **Halaman tidak ditemukan** (404): alamat tidak ada atau sudah dipindahkan.
- **Sesi berakhir** (419): halaman terbuka terlalu lama dan kedaluwarsa. Muat ulang halaman, lalu ulangi langkah Anda.
- **Terjadi kesalahan di server** (500): permintaan tidak dapat diproses. Coba lagi sebentar lagi. Bila masalah berlanjut, hubungi administrator.
- **Layanan sedang tidak tersedia** (503): aplikasi sedang dalam pemeliharaan. Coba lagi beberapa saat lagi.

Tombol **Ke dasbor** (bila Anda sudah masuk) atau **Masuk** membawa Anda keluar dari halaman galat. Halaman 419, 500, dan 503 juga punya tombol **Muat ulang halaman**. Bila satu halaman gagal tampil karena kesalahan di browser, Inbils menampilkan **Halaman tidak dapat ditampilkan** dengan tombol **Muat ulang halaman**.

Halaman galat juga menulis "ID permintaan:" disusul kode panjang bila server memberinya. Sebut kode itu (klik dua kali untuk memilihnya, lalu salin) saat Anda melapor ke administrator: pengelola server mencari semua catatan permintaan Anda dengan kode itu.

## Tautan data memakai kode acak

Alamat satu data (pelanggan, SPK, tagihan, dan seterusnya) kini memuat kode acak 26 karakter, bukan nomor urut. Alamat lama dengan nomor urut menjawab "tidak ditemukan", jadi penanda (bookmark) lama harus dibuka ulang dari daftarnya, lalu disimpan lagi. Kode yang Anda baca dan cari, seperti `CUS-00001` atau `INV-2026-00001`, tidak berubah. Alamat salah, data perusahaan lain, dan data yang tidak boleh Anda lihat memberi jawaban yang sama: "tidak ditemukan". Terlalu banyak alamat salah dalam waktu singkat menampilkan "Terlalu banyak permintaan"; tunggu sekitar 10 menit lalu buka dari daftar.
