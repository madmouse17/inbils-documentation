---
title: "4.1 Pelanggan"
description: "Menu Pelanggan menyimpan identitas pelanggan, alamat, kontak, pemeroleh pelanggan (Diperoleh oleh), langganan, dan riwayat layanan."
---

Menu **Pelanggan** menyimpan identitas pelanggan, alamat, kontak, pemeroleh pelanggan (**Diperoleh oleh**), langganan, dan riwayat layanan. Gunakan menu ini untuk onboarding pelanggan baru dan meninjau seluruh hubungan pelanggan.

Peran yang dapat membuka daftar: admin, manajer, dan staf. Izin dasar: Lihat pelanggan (`customer.view`). Peran bawaan memiliki batas berikut:

| Tindakan | Izin | Peran bawaan |
|---|---|---|
| Melihat pelanggan | Lihat pelanggan (`customer.view`) | Admin, manajer, staf |
| Onboarding lengkap | Buat pelanggan (`customer.create`), Kelola alamat pelanggan (`customer.address.manage`), Kelola langganan (`customer.subscription.manage`), Buat SPK (`spk.create`) | Admin, manajer |
| Menugaskan teknisi saat mendaftarkan pelanggan | Tugaskan SPK (`spk.assign`) | Admin, manajer |
| Mengubah pelanggan, mengirim link akses, serta mengunggah dan menghapus dokumen pelanggan | Ubah pelanggan (`customer.update`) | Admin, manajer, staf |
| Mengelola alamat dan kontak | Kelola alamat pelanggan (`customer.address.manage`) | Admin, manajer, staf |
| Menghapus pelanggan | Hapus pelanggan (`customer.delete`) | Admin |
| Mengekspor pelanggan | Ekspor pelanggan (`customer.export`) | Admin, manajer |
| Menetapkan **Diperoleh oleh** | Tetapkan pemeroleh pelanggan (`customer.sales.assign`) | Admin, manajer, staf |
| Mengoreksi **Diperoleh oleh** | Koreksi pemeroleh pelanggan (`customer.sales.correct`) | Admin, manajer |
| Melihat langganan | Lihat langganan (`customer.subscription.view`) | Admin, manajer, staf |
| Membuat dan menjalankan siklus langganan | Kelola langganan (`customer.subscription.manage`) dan izin aksi terkait | Admin, manajer |
| Melihat, mengelola, dan membuka kata sandi akun jaringan | Lihat akun jaringan (`network_asset.account.view`), Kelola akun jaringan (`network_asset.account.manage`), Tampilkan kata sandi akun jaringan (`network_asset.account.reveal`) | Admin, manajer, staf |

Admin dapat mengubah susunan izin melalui **Peran** dan **Hak Akses**. Tombol yang terlihat pada peran khusus dapat berbeda dari tabel ini.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Pelanggan & Layanan**, lalu klik **Pelanggan**.
2. Ketik nama, kode, atau nomor telepon di kotak **Cari**. Daftar menyesuaikan beberapa saat setelah Anda berhenti mengetik. Filter berlaku begitu Anda memilihnya, tanpa tombol **Filter** di layar lebar:
   - **Tipe**: **Semua tipe**, **Perorangan**, atau **Perusahaan**.
   - **Status**: **Semua status**, **Prospek**, **Aktif**, **Nonaktif**, **Ditangguhkan**, atau **Berhenti**.
   - **Akun**: **Semua akun**, **Aktif**, atau **Nonaktif**. Filter ini menyaring saklar manual **Akun aktif** pada data pelanggan. Nilainya berbeda dari status layanan.
   - **Diperoleh oleh**: kotak cari, ketik untuk mencari, lalu pilih. Pilihannya **Belum ditentukan** atau nama pegawai. Pegawai yang sudah nonaktif tertulis dengan "(nonaktif)". Klik **Hapus pilihan** untuk mengosongkan filter. Filter ini hanya terlihat dengan Tetapkan pemeroleh pelanggan atau Koreksi pemeroleh pelanggan.
   - **Reset filter** muncul bila ada pencarian atau filter aktif. Klik untuk mengosongkan semuanya.
3. Di layar sempit (ponsel), daftar tampil sebagai kartu dan nama pelanggan tetap menjadi link ke detail. Filter pindah ke tombol **Filter**, yang menambahkan jumlah pilihan aktif dalam tanda kurung bila ada. Tombol itu membuka lembar **Filter pelanggan** dengan tombol **Reset filter** dan **Lihat hasil**.
4. Baca kolom **Kode**, **Nama**, **Tipe**, **Telepon**, **Status**, **Diperoleh oleh**, **Alamat**, **Langganan**, dan **Aksi**. Kolom **Alamat** dan **Langganan** berisi jumlah. Kolom kode, nama, tipe, telepon, dan status dapat diurutkan. Urutan awal memakai kode dari kecil ke besar.

   ![Daftar pelanggan dengan kotak Cari, filter Tipe, Status, Akun, dan Diperoleh oleh, tombol Ekspor dan Buat Pelanggan, serta kolom Kode sampai Aksi](~/assets/guide/web/customers-index.webp)

5. Nama pelanggan adalah link ke detail. Kolom **Aksi** berisi tombol **Ubah** (dengan Ubah pelanggan; tanpa izin itu tombolnya **Lihat**) dan menu **Aksi lainnya** dengan **Lihat detail** serta **Hapus** (dengan Hapus pelanggan).
6. Gunakan **Ekspor** untuk mengunduh **Ekspor CSV** atau **Ekspor PDF** dengan filter aktif. Menu ini muncul dengan Ekspor pelanggan. Ekspor memuat maksimal 5.000 baris secara bawaan. Persempit filter bila hasil dipotong.
7. Di bawah tabel, baca ringkasan jumlah baris dan pilih **Baris per halaman** (10, 25, atau 50). Pindah halaman dengan **Sebelumnya** dan **Berikutnya**. Bila tidak ada hasil, daftar menulis **Belum ada pelanggan** (tanpa filter) atau **Tidak ada pelanggan yang cocok** (dengan filter) beserta tombol **Reset filter**.
8. Bedakan dua indikator berikut:

   | Indikator | Nilai | Arti |
   |---|---|---|
   | Filter **Akun** dan lencana **Akun nonaktif** di kolom **Status** | **Aktif**, **Nonaktif** | Saklar manual **Akun aktif** pada data pelanggan. Lencana **Akun nonaktif** hanya tampil bila saklar mati. |
   | **Status** | **Prospek** | Belum ada langganan atau semua masih **Menunggu** |
   | **Status** | **Aktif** | Ada langganan **Aktif** |
   | **Status** | **Ditangguhkan** | Tidak ada yang **Aktif**, tetapi ada yang **Ditangguhkan** |
   | **Status** | **Berhenti** | Semua langganan **Berhenti** |
   | **Status** | **Nonaktif** | Kombinasi lain, misalnya **Menunggu** dan **Berhenti** |

   Status layanan dihitung otomatis dari langganan. Anda tidak mengisinya dengan tangan.

## Menambah pelanggan baru

1. Klik **Buat Pelanggan**. Tombol hanya muncul bila semua izin onboarding lengkap tersedia. Isian wajib bertanda bintang (*).

   ![Form Buat Pelanggan pada tab Data pelanggan, dengan tab Alamat, Kontak, dan Langganan & SPK](~/assets/guide/web/customers-create.webp)

2. Pada tab **Data pelanggan**, isi data identitas:
   - **Kode**: sistem membuat kode saat disimpan. Pada penomoran otomatis, kotak terkunci dan menulis perkiraan kode. Jika penomoran manual diaktifkan pada Penomoran ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)), isian boleh dikosongkan untuk kode otomatis atau diisi maksimal 50 karakter. Kode harus unik dalam perusahaan.
   - **Nama**: wajib, maksimal 255 karakter.
   - **Tipe**: pilih **Perorangan** atau **Perusahaan**. Nilai awalnya **Perorangan**.
   - **Email**: wajib, format e-mail, maksimal 255 karakter, dan harus unik di seluruh akun pengguna. E-mail ini menjadi e-mail masuk pelanggan.
   - **Telepon**: wajib, maksimal 50 karakter. Kolom hanya menerima angka serta karakter `(`, `)`, `+`, dan `-`. Karakter lain hilang saat diketik. Kolom ini menampilkan petunjuk bahwa link untuk mengatur kata sandi dikirim ke e-mail pelanggan.
   - **NPWP**: wajib untuk **Perusahaan**, opsional untuk **Perorangan**, maksimal 100 karakter.
   - **Narahubung**: wajib untuk **Perusahaan**, opsional untuk **Perorangan**, maksimal 255 karakter. Nilai ini menjadi nama akun masuk. Jika kosong, sistem memakai **Nama**.
   - **Akun aktif**: menyala secara bawaan. Jika dimatikan, sistem tetap membuat akun masuk dalam keadaan nonaktif dan tidak mengirim link akses.
   - **Catatan**: opsional.
3. Tentukan persetujuan dan pemeroleh pada tab yang sama:
   - **Pelanggan setuju menerima notifikasi WhatsApp**: tidak dicentang secara bawaan. Centang hanya setelah pelanggan menyetujui tagihan terbit, pengingat jatuh tempo, pembayaran diterima, status tiket, dan jadwal kunjungan teknisi. Pengiriman tetap memerlukan fitur WhatsApp perusahaan yang aktif dan nomor seluler Indonesia yang valid.
   - **Diperoleh oleh**: muncul dengan Tetapkan pemeroleh pelanggan. Ketik untuk mencari karyawan, lalu pilih, atau biarkan kosong (**Belum ditentukan**). Klik **Hapus pilihan** untuk mengosongkannya lagi. Pilihan hanya memuat akun aktif dalam perusahaan yang memiliki profil karyawan aktif dan memegang Buat pelanggan. Bila pembuat memenuhi syarat, namanya terisi sebagai nilai awal. Bila tidak ada karyawan yang cocok, kotak menulis **Tidak ada karyawan yang memenuhi syarat.**
4. Buka tab **Alamat**. Sediakan sedikitnya satu alamat dan pilih tepat satu alamat utama serta satu alamat pemasangan. Alamat pertama sudah menjadi keduanya. Setiap alamat adalah kartu bernomor (judul **Alamat** diikuti nomor urut):
   - **Label**: wajib, maksimal 100 karakter, dan tidak boleh sama dengan label alamat lain milik pelanggan ini. Contoh pada kolom: Rumah / Kantor / Pemasangan.
   - Peta: klik peta, geser pin merah, atau pakai kotak pencarian di atas peta. Tombol **Alamat** mencari lokasi lewat teks dan membutuhkan sedikitnya 3 karakter. Klik **Cari**, lalu pilih salah satu hasil. Bila isian **Alamat** (jalan) di kartu yang sama masih kosong, atau masih berisi jalan dari hasil pencarian sebelumnya, hasil yang Anda pilih mengisinya dengan nama jalan dan nomor rumah (bila OpenStreetMap punya jalan itu). Alamat yang Anda ketik sendiri tidak ditimpa. Tombol **Lintang / Bujur** membuka dua kotak untuk mengetik koordinat. Klik **Cari** untuk menaruh pin. Tombol **Lokasi saat ini** memakai lokasi perangkat Anda. Bila hasil pencarian kosong, peta menulis **Lokasi tidak ditemukan. Coba alamat yang lebih spesifik.**
   - **Lintang** dan **Bujur**: wajib dan terisi oleh peta, tidak dapat diketik langsung pada kotaknya. Lintang harus antara -90 sampai 90. Bujur harus antara -180 sampai 180.
   - **Provinsi**, **Kota / Kabupaten**, **Kecamatan**, dan **Kelurahan / Desa**: wajib. Tiap kotak adalah kotak cari (ketik untuk mencari, lalu pilih). Pilih berurutan. Kotak berikutnya baru aktif setelah kotak di atasnya dipilih. Kombinasinya harus membentuk hierarki wilayah yang valid. Memilih hasil pencarian peta ikut mengisi wilayah dan kode pos.
   - **Alamat**: wajib. **Kode pos** dan **Catatan** opsional.
   - **Alamat utama** dan **Alamat pemasangan**: pilih satu kartu untuk masing-masing penanda. Menyalakan penanda pada satu kartu memindahkannya dari kartu lama.
   - Klik **Tambah alamat** untuk menambah kartu. Tombol **Hapus** pada kartu tidak aktif bila hanya ada satu alamat. Menghapus kartu yang membawa penanda memindahkan penanda ke alamat pertama yang tersisa.
5. Buka tab **Kontak**. Sediakan sedikitnya satu kontak dan pilih tepat satu kontak utama. Kartu kontak utama (judul **Kontak** diikuti nomor urut) diawali saklar **Sama dengan data pelanggan**, yang menyala secara awal. Selama menyala, kontak utama memakai narahubung (atau **Nama** bila narahubung kosong), **Telepon**, dan **Email** dari tab **Data pelanggan**, jadi data yang sama tidak diketik dua kali. Mengubah isian kartu itu, memilih kontak utama lain, atau menghapus kontak utama mematikan saklar. Isian yang sudah tersalin tetap ada untuk Anda ubah. Menyalakan saklar lagi membuat data pelanggan menggantikan isian itu.
   - **Nama**: wajib, maksimal 255 karakter.
   - **Jabatan**: opsional, maksimal 255 karakter.
   - **Telepon**: wajib pada onboarding, maksimal 50 karakter, dengan format angka serta `(`, `)`, `+`, atau `-`.
   - **Email**: wajib pada onboarding, format e-mail, maksimal 255 karakter.
   - **Catatan**: opsional.
   - **Kontak utama**: pilih satu kartu. Klik **Tambah kontak** untuk menambah kontak. Tombol **Hapus** tidak aktif bila hanya ada satu kontak.
6. Buka tab **Langganan & SPK**:
   - **Paket layanan**: wajib. Kotak cari (ketik untuk mencari, lalu pilih). Pilihan hanya memuat paket aktif dari kategori aktif, dikelompokkan dengan judul nama kategori. Tiap pilihan menulis nama paket dan keterangan kode paket serta harga per bulan. Mengganti **Tipe** menata ulang kelompok: **Perorangan** menampilkan **Rumahan** paling atas, **Perusahaan** menampilkan **Bisnis** lalu **Korporat**. Semua paket tetap bisa dipilih untuk tipe apa pun. Memilih paket mengisi **Biaya bulanan**, **Biaya pemasangan**, dan **Masa kontrak (bulan)** dengan nilai paket. Anda boleh mengubahnya.
   - **POP pelayan**: wajib. Kotak cari. Pilihan hanya memuat lokasi aktif dalam perusahaan, ditulis dengan kode dan nama lokasi.
   - **Port drop (ODP)**: opsional dan hanya muncul dengan Tetapkan port ODN (`odn.assign`). Kotak ini baru aktif setelah **POP pelayan** dipilih (sebelum itu tertulis **Pilih POP layanan untuk melihat port kosongnya.**). Ketik minimal 2 huruf kode ODP atau label splitter, lalu pilih port bebas di bawah POP tersebut. Tiap pilihan menulis kode ODP, rasio atau label splitter, dan nomor port, dengan baris keterangan berisi nama ODP, jumlah port kosong dari seluruh port ODP itu (misalnya "5/8 port kosong"), jarak ODP dari alamat pemasangan ("850 m" atau "1,4 km"), dan jalur lokasi ODP. Bila alamat bertanda pemasangan sudah punya koordinat, ODP terdekat tampil paling atas. Tanpa koordinat, jarak tidak tertulis dan urutannya mengikuti kode ODP. Bila tidak ada port, kotak menulis **Tidak ada port kosong yang cocok di bawah POP ini.** Mengganti POP mengosongkan pilihan port.
   - **Tanggal tagihan (1-28)**: wajib, bilangan bulat 1 sampai 28. Nilai awal 1.
   - **Masa kontrak (bulan)**: opsional, bilangan bulat minimal 1. Kosongkan untuk memakai masa minimum paket.
   - **Biaya bulanan** dan **Biaya pemasangan**: opsional, angka minimal 0. Kosongkan untuk memakai harga paket.
   - **Catatan langganan**: opsional.
   - Periksa ringkasan di bagian bawah: **Alamat pemasangan** (label alamat yang bertanda pemasangan) dan **Status SPK setelah dibuat**, yaitu **Menunggu penugasan**, atau **Ditugaskan** bila Anda memilih teknisi di blok berikut.
   - **Tugaskan sekarang**: blok di kartu ringkasan yang sama, dengan keterangan "Opsional. Isi bila pemasangan sudah disepakati; kosongkan untuk menugaskan nanti dari antrean Penugasan." Dengan Tugaskan SPK (`spk.assign`), blok memuat **Teknisi** dan **Tanggal kunjungan**, keduanya opsional. **Teknisi** adalah kotak cari (**Cari teknisi**) berisi teknisi aktif. Tiap pilihan menulis nama dan jumlah pekerjaan aktifnya ("... · 2 pekerjaan aktif"), dan teknisi dengan pekerjaan paling sedikit diberi keterangan **Paling sedikit pekerjaan**. Bila tidak ada yang cocok, kotak menulis "Tidak ada teknisi aktif yang cocok." **Tanggal kunjungan** tidak boleh sebelum hari ini dan menjadi jadwal SPK pemasangan. Tanpa Tugaskan SPK, blok berjudul **Jadwal kunjungan** dengan keterangan "Opsional. Kosongkan bila belum disepakati." dan hanya memuat **Tanggal kunjungan**. Teknisi yang dipilih ditugaskan dalam transaksi yang sama dengan pembuatan pelanggan, jadi bila penugasan ditolak, tidak ada pelanggan yang tersimpan. Bila **Teknisi** kosong, tugaskan nanti lewat antrean Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)).

   ![Tab Langganan & SPK pada form Buat Pelanggan, dengan ringkasan Status SPK setelah dibuat dan blok Tugaskan sekarang](~/assets/guide/web/customers-create-assign.webp)

7. Klik **Buat pelanggan dan SPK**. Bila validasi gagal, layar berpindah ke tab yang berisi masalah dan toast **Data gagal disimpan. Periksa input.** muncul. Pesan tiap isian tampil di bawah isiannya. Klik **Batal** untuk kembali ke daftar tanpa menyimpan.
8. Sistem menyimpan seluruh onboarding dalam satu transaksi:
   - pelanggan, alamat, kontak, persetujuan WhatsApp, dan pemeroleh;
   - akun pengguna berperan `customer`, tergabung pada perusahaan, e-mail sudah ditandai terverifikasi, dan terhubung ke pelanggan;
   - langganan baru berstatus **Menunggu**, port ODP bila dipilih, serta SPK pemasangan berstatus **Menunggu penugasan** (atau **Ditugaskan** bila Anda memilih teknisi) dengan prioritas **Sedang** dan jadwal kunjungan bila diisi. Judul SPK berbentuk **Pemasangan** diikuti kode langganan dan nama pelanggan;
   - catatan audit onboarding.
9. Tidak ada isian kata sandi pada form. Sistem membuat kata sandi acak 32 karakter yang tidak pernah ditampilkan. Nomor telepon bukan kata sandi.
10. Jika **Akun aktif** menyala, sistem mengantrekan e-mail berjudul **Akun pelanggan Anda sudah dibuat** setelah transaksi selesai. Tombol **Atur kata sandi** berlaku 60 menit. Pelanggan mengatur kata sandi melalui link itu, lalu masuk ke aplikasi Inbils Pelanggan memakai e-mail tersebut.
11. Setelah berhasil, layar membuka detail pelanggan baru. Toast menulis "Pelanggan, langganan, dan SPK pemasangan dibuat", lalu "dan ditugaskan ke {nama teknisi}." bila Anda memilih teknisi, atau sekadar titik bila tidak. Bila **Akun aktif** menyala, toast menambah "Tautan akses akan dikirim ke &lt;email&gt;." Kalimat itu berupa janji: e-mail masuk antrean dan terkirim saat pekerja antrean memprosesnya. Kode pelanggan dan langganan mengikuti pengaturan Penomoran ([bagian 7.13](/docs/guides/web/finance-and-reports/numbering/)).
12. SPK pemasangan tercatat dibuat oleh Anda. Sistem melarang pembuat SPK menyetujuinya sendiri (pesan **Pembuat SPK tidak boleh menyetujui SPK sendiri.**). Minta orang lain yang berwenang menyetujui SPK ini pada SPK ([bagian 3.3](/docs/guides/web/operations/work-orders/)).

## Membuka detail pelanggan

1. Pada daftar, klik nama pelanggan atau pilih **Aksi lainnya**, lalu **Lihat detail**. Tombol **Kembali** di pojok atas membawa Anda ke daftar.

   ![Detail pelanggan dengan tombol Kembali, Kirim ulang link akses, dan Ubah, serta kartu Data pelanggan, Status, dan WhatsApp](~/assets/guide/web/customers-show.webp)

2. Baca kartu **Data pelanggan** untuk e-mail, telepon, NPWP, narahubung, **Diperoleh oleh**, dan catatan. Catatan hanya tampil bila terisi. Kartu **Status** menampilkan tipe, status layanan, dan status **Akun** (**Aktif** atau **Nonaktif**).
3. Baca kartu **WhatsApp**. Lencana menampilkan **Setuju sejak** (dengan tanggal), **Berhenti sejak** (dengan tanggal), atau **Belum setuju**. Bila nomor telepon bukan nomor seluler Indonesia yang valid, kartu menampilkan peringatan **Nomor telepon pelanggan bukan nomor seluler Indonesia yang valid.** Tabel memuat 20 pesan terbaru dengan kolom **Pesan**, **Subjek**, **Status**, **Keterangan**, **Nomor**, dan **Waktu**. Nomor hanya menampilkan empat digit terakhir. Status pesan berupa lencana **Antrean**, **Terkirim**, **Diterima**, **Dibaca**, **Gagal**, atau **Dilewati**. Pesan yang dilewati menulis alasannya di **Keterangan**, misalnya **Pelanggan belum setuju**.
4. Buka tab **Alamat**, **Kontak**, **Langganan**, dan **Dokumen** (masing-masing diikuti jumlah) untuk ringkasan data terkait. Tab **Tagihan**, **SPK**, dan **Tiket** muncul bila pengguna memiliki izin modul terkait. Riwayat tagihan, SPK, dan tiket masing-masing menampilkan maksimal 50 data terbaru. Tab **Dokumen** dijelaskan di bagian berikut.
5. Tab **Langganan** pada detail berupa ringkasan (**Kode**, **Paket**, **Status**, **Biaya bulanan**, **Tanggal tagih**). Pengguna dengan Lihat langganan (`customer.subscription.view`) juga melihat kolom **Aksi** berisi link **Kelola langganan**, dan kode langganan menjadi link. Keduanya membuka detail langganan (lihat "Mengelola langganan pelanggan"). Tanpa izin itu kode hanya teks. Tab **Alamat** dan **Kontak** hanya baca. Tambahkan atau ubah datanya lewat **Ubah**.
6. Tombol **Ubah** selalu tampil di detail. Tanpa Ubah pelanggan, klik tombol itu membuka halaman **Akses ditolak**.

## Mengelola dokumen pelanggan

Tab **Dokumen** menyimpan berkas milik pelanggan, misalnya KTP atau kontrak. Judul tabnya diikuti jumlah berkas, misalnya **Dokumen (2)**. Semua pengguna yang bisa membuka detail pelanggan melihat daftarnya. Formulir unggah dan tombol **Hapus** hanya ada dengan Ubah pelanggan (`customer.update`).

1. Buka detail pelanggan, lalu klik tab **Dokumen**. Bila belum ada berkas, tab menulis **Belum ada dokumen. Unggah KTP atau kontrak pelanggan.**

   ![Tab Dokumen pada detail pelanggan dengan isian Jenis dokumen, Berkas, dan tombol Unggah](~/assets/guide/web/customers-show-documents.webp)

2. Pilih **Jenis dokumen** (pilihan awal **Pilih jenis**). Pilihannya jenis dokumen aktif yang dibuat di **Jenis Dokumen** ([bagian 8.8](/docs/guides/web/administration/documents/)) dan berlaku untuk pelanggan, yaitu kolom **Berlaku untuk**-nya kosong, **Customer**, atau **Pelanggan**. Jenis yang punya masa berlaku ditulis dengan jumlah harinya, yaitu nama jenis diikuti jumlah hari dalam kurung.
3. Pilih **Berkas**. Formatnya PDF, JPG, atau PNG dengan ukuran paling besar 10 MB (petunjuk "PDF, JPG, atau PNG. Maksimum 10 MB."). Tombol **Unggah** aktif setelah jenis dan berkas dipilih.
4. Klik **Unggah**. Toast **Dokumen diunggah.** muncul dan berkas masuk ke tabel. Bila jenisnya punya masa berlaku, tanggal berlaku adalah hari unggah menurut kalender perusahaan ditambah jumlah hari jenis itu.
5. Baca tabel dengan kolom **Dokumen** (nama jenis, dengan nama berkas di bawahnya), **Berlaku**, **Diunggah** (tanggal dan jam), dan **Aksi**. Kolom **Berlaku** menulis **Berlaku sampai {tanggal}**, atau **Tanpa masa berlaku** bila jenisnya tidak punya masa berlaku. Lencana **Segera habis** muncul bila tanggal berlakunya jatuh dalam 30 hari ke depan, dan lencana **Kedaluwarsa** bila tanggalnya sudah lewat.
6. Klik **Lihat** untuk membuka berkas di tab baru. Klik **Hapus** untuk menghapusnya: dialog **Hapus {nama berkas}?** menulis "Berkas ini akan dihapus permanen dari data pelanggan." Klik **Hapus dokumen**, dan toast **Dokumen dihapus.** muncul. Unggah dan hapus tercatat di Log Audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)).

Setiap hari pukul 00:30 UTC, penjadwal mencari dokumen yang berlaku sampai hari ini hingga 30 hari ke depan, dengan hari menurut kalender tiap perusahaan. Untuk tiap dokumen, semua pengguna aktif perusahaan itu yang memegang Ubah pelanggan menerima satu notifikasi di lonceng berjudul "Dokumen {jenis} {nama pelanggan} segera habis" dengan isi "Berlaku sampai {tanggal}." Pengingat dikirim sekali untuk tiap tanggal berlaku, jadi dokumen yang sama tidak diingatkan lagi tiap hari. Antrean dan penjadwal harus berjalan di server. Hubungi pengelola server bila pengingat tidak muncul.

## Mengirim ulang link akses

1. Buka detail pelanggan, lalu klik **Kirim ulang link akses**. Tombol membutuhkan Ubah pelanggan (`customer.update`).
2. Pastikan pelanggan memiliki akun masuk dengan e-mail. Pastikan status pelanggan dan akun pengguna sama-sama aktif. Bila tidak, toast merah muncul dengan salah satu pesan: **Customer belum punya akun portal beremail, tautan akses tidak dikirim.** atau **Customer atau akun portalnya nonaktif, tautan akses tidak dikirim.**
3. Sistem mengantrekan e-mail berisi link ke e-mail akun masuk dan menampilkan toast **Tautan akses akan dikirim ke &lt;email&gt;.** E-mail terkirim saat pekerja antrean memprosesnya. Batasnya 3 permintaan per menit. Permintaan keempat ditolak dengan HTTP 429.
4. Link baru membatalkan link lama. Link berlaku 60 menit. Setelah mengatur kata sandi, pelanggan memakai aplikasi Inbils Pelanggan.
5. Jika pelanggan sudah menyetujui WhatsApp, sistem juga mengantrekan pemberitahuan bahwa link ada di e-mail. Pesan WhatsApp tidak membawa link atau token. Pemberitahuan ini dibatasi satu kali per akun setiap jam. Pesan itu tampil di tabel WhatsApp pada detail sebagai **Info link akses portal**.

## Mengubah pelanggan, alamat, dan kontak

1. Dari detail, klik **Ubah**. Anda juga dapat mengklik **Ubah** pada baris daftar. Halaman **Ubah Pelanggan** punya tiga tab: **Data pelanggan**, **Alamat**, dan **Kontak**. Dua tab terakhir diikuti jumlah datanya. Tab **Data pelanggan** memakai isian yang sama dengan form tambah. **Kode** terkunci ("Dibuat otomatis dan tidak dapat diubah.") kecuali penomoran manual aktif. Pada penomoran manual, kode wajib dan harus unik.

   ![Halaman Ubah Pelanggan dengan tab Data pelanggan, Alamat, dan Kontak serta isian data pelanggan](~/assets/guide/web/customers-edit.webp)

2. Ubah tab **Data pelanggan**, lalu klik **Simpan pelanggan**. Toast **Pelanggan diperbarui.** muncul dan layar kembali ke daftar pelanggan. Klik **Batal** untuk membuang perubahan dan kembali ke detail. Tombol **Kembali** di pojok atas juga kembali ke detail. Tab **Alamat** dan **Kontak** menyimpan datanya sendiri, jadi perubahan yang belum disimpan pada tab **Data pelanggan** tidak ikut tersimpan atau hilang saat Anda mengelola alamat dan kontak.
3. Pengguna dengan Ubah pelanggan dapat mengubah kotak centang **Pelanggan setuju menerima notifikasi WhatsApp**. Di bawahnya tertulis **Tercatat:** diikuti **Setuju sejak** (dengan tanggal), **Berhenti sejak** (dengan tanggal), atau **Belum ada persetujuan tercatat**. Mencentang mencatat waktu, sumber `staff`, dan pengguna pencatat. Melepas centang mencatat waktu berhenti. Sistem hanya mengirim persetujuan bila Anda mengubahnya.
4. Jika nomor tidak dapat dinormalisasi sebagai nomor seluler Indonesia, layar menampilkan peringatan **Nomor pelanggan ini bukan nomor seluler Indonesia yang valid**. Pesan WhatsApp dilewati sampai nomor diperbaiki.
5. Pelanggan dapat membalas `STOP` atau `BERHENTI`, tanpa membedakan huruf besar atau kecil. Sistem mencabut persetujuan pelanggan dengan nomor cocok hanya di perusahaan pemilik nomor WhatsApp pengirim itu (lihat **Integrasi**, [bagian 8.9](/docs/guides/web/administration/integrations/)). Perusahaan lain yang memakai nomor pengirim berbeda tidak terpengaruh, walau pelanggannya punya nomor telepon yang sama. Staf dapat mencentang kembali setelah memperoleh persetujuan baru.
6. Pada tab **Alamat**, setiap alamat tampil sebagai baris dengan tanda **(utama)** atau **(pemasangan)**, tombol **Ubah**, dan tombol **Hapus**. Tombol **Tambah alamat** mengosongkan formulir di bawah daftar. Formulir itu berjudul **Tambah Alamat** (tombol **Tambah**) atau **Ubah Alamat** (tombol **Simpan**), dengan isian yang sama seperti pada tab **Alamat** di form tambah: peta, wilayah berjenjang, **Alamat**, **Kode pos**, **Catatan**, dan dua penanda. Klik **Batal** untuk mengosongkan formulir. Toast: **Alamat ditambahkan.**, **Alamat diperbarui.**, atau **Alamat dihapus permanen.** Alamat pertama selalu menjadi utama dan pemasangan. Sistem mempertahankan tepat satu alamat utama dan satu alamat pemasangan. Menghapus alamat yang membawa penanda memindahkan penanda ke alamat tertua yang tersisa.
7. Alamat yang dipakai oleh langganan tidak dapat dihapus. Tombol **Hapus** pada alamat membuka dialog "Hapus alamat" dengan teks "Alamat yang belum pernah dipakai langganan dihapus permanen." Bila alamat sudah dipakai, dialog tetap terbuka dan menulis alasannya dalam teks merah, misalnya "Alamat masih dipakai 1 langganan, jadi tidak bisa dihapus." Mengubah penanda pemasangan tidak mengubah alamat pemasangan pada langganan lama. Alamat yang dihapus permanen tidak bisa dipulihkan.
8. Pada tab **Kontak**, formulir bekerja sama: **Tambah kontak**, **Ubah**, atau **Hapus**, formulir **Tambah Kontak** atau **Ubah Kontak**, dan toast **Kontak ditambahkan.**, **Kontak diperbarui.**, atau **Kontak dihapus.** **Nama** dan **Telepon** bertanda wajib. **Jabatan**, **Email**, dan **Catatan** opsional. Kartu kontak yang utama bertanda **(utama)**. Jika kontak utama dihapus, sistem memilih kontak tertua yang tersisa sebagai kontak utama.
9. Pengguna tanpa Kelola alamat pelanggan hanya melihat daftar alamat dan kontak, tanpa tombol dan formulir.
10. E-mail dan status pelanggan pada halaman ini tidak disinkronkan ke akun masuk yang dibuat saat onboarding. Admin mengubah e-mail atau status akun pengguna pada Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)). **Kirim ulang link akses** selalu memakai e-mail akun pengguna.

## Mengelola atribusi penjualan

1. **Diperoleh oleh** terlihat pada daftar, filter, detail, halaman ubah, dan ekspor hanya dengan Tetapkan pemeroleh pelanggan atau Koreksi pemeroleh pelanggan.
2. Untuk pelanggan yang **Belum ditentukan**, pengguna dengan Tetapkan pemeroleh pelanggan dapat memilih pegawai yang memenuhi syarat pada halaman **Ubah Pelanggan**. Ketik untuk mencari, lalu pilih.
3. Untuk pelanggan yang sudah memiliki pemeroleh, perubahan atau pengosongan membutuhkan Koreksi pemeroleh pelanggan. Pengguna tanpa izin itu hanya melihat nama pemeroleh sebagai teks.
4. Isi **Alasan koreksi** saat mengoreksi. Kotak ini muncul begitu pilihan berubah. Alasannya wajib, maksimal 500 karakter, dan masuk Log Audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)) bersama nilai lama dan baru.
5. Pemeroleh lama yang menjadi nonaktif tetap tampil dengan lencana **Nonaktif**. Ia tidak tersedia sebagai pilihan baru. Halaman ubah menulis **Saat ini diperoleh oleh:** diikuti namanya dan menjelaskan bahwa Anda perlu memilih karyawan yang memenuhi syarat atau mengosongkan isian untuk mengoreksi.
6. Server menolak pemeroleh yang tidak memenuhi syarat dengan pesan **Pilih karyawan aktif yang berhak membuat pelanggan.**

## Mengelola langganan pelanggan

1. Halaman daftar langganan pelanggan berada di `/admin/customers/<id>/subscriptions`. Dari detail pelanggan, link **Kelola langganan** di tab **Langganan** membuka detail satu langganan, bukan daftar ini. Daftar terbuka lewat tombol **Kembali** di detail langganan.
2. Halaman **Langganan** menulis kode dan nama pelanggan di bawah judul. Halaman menyediakan kotak **Cari** (kode atau nama paket), filter **Paket** (kotak cari, pilihan awal **Semua paket**) dan **Status** (**Semua status**, **Menunggu**, **Aktif**, **Ditangguhkan**, **Berhenti**), **Reset filter**, serta kolom **Kode**, **Paket**, **Status**, **Biaya bulanan**, **Tanggal tagihan**, dan **Aksi** (tombol **Lihat**). Kode langganan adalah link ke detail. Kolom kode dan status dapat diurutkan. Menu **Ekspor** muncul dengan Ekspor langganan (`customer.subscription.export`). Tombol **Kembali** membuka detail pelanggan.
3. Klik **Buat Langganan**. Tombol tampil untuk semua pengguna halaman ini, tetapi server hanya menerima simpanan dengan Kelola langganan (`customer.subscription.manage`). Dialog **Buat Langganan** meminta:
   - **Paket layanan** dan **Alamat pemasangan**: wajib. Keduanya kotak cari (ketik untuk mencari, lalu pilih).
   - **Paket layanan** berisi paket aktif dari kategori aktif, dikelompokkan dengan judul nama kategori. Kategori yang cocok dengan tipe pelanggan tampil paling atas: pelanggan **Perorangan** melihat **Rumahan** dulu, pelanggan **Perusahaan** melihat **Bisnis**, lalu **Korporat**. Kategori lain mengikuti urutannya di **Kategori Paket**. Tiap pilihan menulis nama paket dan keterangan kode paket serta harga per bulan.
   - **Alamat pemasangan** memuat alamat milik pelanggan ini. Alamat utama sudah terpilih, atau satu-satunya alamat bila pelanggan hanya punya satu. Anda tetap bisa memilih yang lain. Bila belum ada alamat, kotak menulis **Pelanggan ini belum punya alamat.** Pilihan di luar alamat pelanggan ditolak dengan pesan **Pilih salah satu alamat milik pelanggan ini.**
   - **Tanggal tagihan (1-28)**: wajib. Nilai awal 1.
   - **Biaya bulanan**, **Biaya pemasangan**, dan **Masa kontrak (bulan)**: opsional. **Biaya bulanan** kosong memakai harga paket (tertulis **Otomatis dari paket**). **Biaya pemasangan** bernilai awal 0. **Masa kontrak (bulan)** kosong memakai masa minimum paket bila paket memilikinya.
4. Klik **Buat**. Sistem membuat kode langganan dan status **Menunggu**, lalu toast **Langganan dibuat.** muncul. Jalur ini tidak membuat SPK pemasangan dan tidak meminta POP pelayan. Buat SPK pemasangan pada SPK ([bagian 3.3](/docs/guides/web/operations/work-orders/)) bila pekerjaan lapangan diperlukan. Klik **Batal** untuk menutup dialog.
5. Buka langganan melalui kode langganan atau tombol **Lihat** pada halaman tersebut, melalui kode langganan atau link **Kelola langganan** di tab **Langganan** pada detail pelanggan, melalui link kode langganan di ODN, atau dari Aset Jaringan yang terpasang.

   ![Halaman detail langganan dengan kartu Rincian langganan dan Status](~/assets/guide/web/subscriptions-show.webp)

6. Detail langganan memuat kartu **Rincian langganan** (**Pelanggan**, **Alamat pemasangan**, **POP pelayan**, **Biaya bulanan**, **Biaya pemasangan**, **Tanggal tagihan**, **Masa kontrak**, dan **Catatan** bila terisi), kartu **Paket** (nama paket, versi, dan syaratnya, lihat langkah 14), dan kartu **Status** (**Status**, **Tanggal aktivasi**, **Tanggal berakhir**, **Tagihan berikutnya**, **Berhenti pada**, dan **Alasan berhenti** bila ada). Untuk langganan yang diblokir, kartu **Status** menambah **Internet**, **Alasan blokir**, dan **Diblokir oleh**. Panel **Alamat IP** dan **Port drop** muncul bagi pengguna dengan izin lihat IPAM dan ODN. Pengisiannya dijelaskan di Alamat IP ([bagian 5.4](/docs/guides/web/network/ip-addresses/)) dan ODN ([bagian 5.5](/docs/guides/web/network/odn/)).

   Pada kartu **Rincian langganan**, nama pelanggan adalah link ke detail pelanggan bagi pengguna dengan Lihat pelanggan (`customer.view`).

7. Gunakan kartu **Aksi langganan** sesuai status dan izin:

   | Tombol | Syarat | Izin | Efek |
   |---|---|---|---|
   | **Aktifkan** | **Menunggu** | Aktifkan langganan (`customer.subscription.activate`) | Menjadi **Aktif**, mengisi tanggal aktivasi dan tanggal tagihan berikutnya |
   | **Tangguhkan** | **Aktif** | Tangguhkan langganan (`customer.subscription.suspend`) | Dialog **Tangguhkan Langganan** meminta **Alasan** (wajib, maksimal 500 karakter). Menjadi **Ditangguhkan** dan akses jaringan terisolir |
   | **Aktifkan kembali** | **Ditangguhkan** | Aktifkan kembali langganan (`customer.subscription.reactivate`) | Menjadi **Aktif** dan menghitung ulang tanggal tagihan berikutnya |
   | **Blokir internet** | Belum **Berhenti** dan belum diblokir | Blokir langganan (`customer.subscription.block`) | Dialog berjudul "Blokir internet" diikuti kode langganan meminta **Alasan** (wajib, maksimal 500 karakter). Status tetap, penagihan lanjut, jaringan terisolir |
   | **Buka blokir** | Sedang diblokir | Blokir langganan (`customer.subscription.block`) | Dialog berjudul "Buka blokir" diikuti kata internet dan kode langganan, dengan **Catatan (opsional)**. Jika masih **Ditangguhkan**, jaringan tetap terisolir |
   | **Hentikan** | **Aktif** atau **Ditangguhkan** | Hentikan langganan (`customer.subscription.terminate`) | Dialog **Hentikan Langganan** meminta **Alasan** (wajib, maksimal 500 karakter). Menjadi **Berhenti**, melepas IP statis dan port drop, menghapus blok |

   Toast hasilnya: **Langganan diaktifkan.**, **Langganan ditangguhkan.**, **Langganan diaktifkan kembali.**, **Internet langganan diblokir.**, **Blokir internet langganan dibuka.**, dan **Langganan dihentikan.**
8. Persetujuan SPK pemasangan yang berstatus **Menunggu review** juga mengaktifkan langganan **Menunggu**. Persetujuan membuat tagihan pemasangan bila ada biaya yang dapat ditagih. **Kirim tagihan pemasangan otomatis** menentukan apakah tagihan langsung dikirim atau tetap **Draf**. **Tagihkan bahan terpakai** menentukan apakah bahan menjadi baris terpisah. Lihat SPK ([bagian 3.3](/docs/guides/web/operations/work-orders/)) dan Tagihan ([bagian 7.1](/docs/guides/web/finance-and-reports/invoices/)).
9. Aktivasi tidak langsung membuat tagihan bulanan. Proses Tagihan membuat invoice pascabayar per periode dan menghitung prorata sejak tanggal aktivasi. Langganan **Ditangguhkan** tidak masuk tagihan berkala. Langganan **Berhenti** dapat ditagih prorata sampai tanggal terminasi.
10. Penangguhan manual tidak dibuka otomatis setelah pembayaran. Penangguhan dengan sumber tunggakan dapat kembali aktif setelah seluruh syarat pembayaran terpenuhi dan pengaturan reaktivasi otomatis menyala.
11. **Blokir internet** berbeda dari penangguhan. Pembayaran tidak menghapus blokir. Gunakan **Buka blokir** secara terpisah.
12. **Hentikan** tidak dapat dibatalkan. Dialog **Hentikan langganan {kode}?** memuat daftar akibatnya, hanya baris yang berlaku untuk langganan itu: "Akun PPPoE {nama pengguna} dicabut dari RADIUS dan sesi yang tersambung diputus", "Alamat IP statis {alamat} kembali ke pool IPAM", "Port drop {nomor} di {ODP} dibebaskan", dan "Tagihan bulanan dihitung sampai hari berhenti, setelah itu tidak dibuat lagi". Nama pengguna, alamat, dan port hanya tertulis bagi pengguna yang boleh melihat akun jaringan, alamat IP, dan port drop. Layar saat ini tidak menyediakan pilihan melepas ONT pada saat penghentian.
13. Tombol siklus muncul menurut status, bukan menurut izin Anda. Server memeriksa izin saat tombol ditekan. Server juga menolak aksi pada status yang tidak cocok, misalnya **Langganan harus berstatus Menunggu untuk diaktifkan.**, **Langganan harus berstatus Aktif untuk ditangguhkan.**, atau **Langganan harus berstatus Ditangguhkan untuk diaktifkan kembali.** Muat ulang halaman bila status sudah berubah.
14. **Ganti paket** memindahkan langganan ke versi terbaru sebuah paket. Tombolnya ada di kartu **Paket**, hanya dengan Kelola langganan (`customer.subscription.manage`), dan tidak ada untuk langganan **Berhenti**. Kartu **Paket** menulis nama paket, "Versi `<n>` sejak `<tanggal>`", dan syarat versi itu (**Kategori**, **Harga bulanan**, **Harga pemasangan**, **Profil bandwidth**, **Profil kecepatan**, **Tingkat SLA**). Lencana **Versi terbaru tersedia** muncul bila paketnya sudah punya versi lebih baru. Edit paket tidak mengubah langganan yang ada (lihat [bagian 4.2](/docs/guides/web/customers-and-services/service-packages/)): langganan tetap di versinya sampai Anda memindahkannya.
    - Klik **Ganti paket**. Jendela memuat kotak cari **Paket** (paket aktif saja, awalnya paket saat ini) dan **Biaya bulanan**. Biaya bulanan yang kosong berarti harga bulanan versi terbaru paket itu ("Otomatis dari harga paket"). Isi angka untuk memakai biaya lain.
    - Klik **Pindahkan**. Toast **Langganan dipindahkan ke versi terbaru paket.** muncul. Langganan memakai profil kecepatan (RADIUS) dan tingkat SLA versi barunya, dan **Biaya bulanan** menjadi nilai di jendela itu. **Biaya pemasangan** ikut harga versi baru hanya bila langganan masih **Menunggu**; selain itu tidak berubah.
    - Tagihan yang sudah terbit tidak berubah. Tagihan berikutnya memakai **Biaya bulanan** yang baru, tanpa prorata antara paket lama dan baru.
    - Penolakan: "Langganan sudah memakai versi terbaru paket ini." (tombol **Pindahkan** nonaktif bila paket yang dipilih adalah paket saat ini dan sudah di versi terbaru), "Langganan yang sudah berhenti tidak bisa pindah paket.", dan "Pilih paket layanan yang masih aktif." di bawah isian **Paket**.
    - Mengubah data langganan tidak lagi memindahkan paket: **Ganti paket** adalah satu-satunya cara. Tiap perpindahan tercatat di log audit (`package_changed`, dengan paket, versi, dan biaya sebelum dan sesudah).

## Mengelola akun jaringan

Bagian ini merangkum akun jaringan dari sisi langganan. Rincian lengkap ada di Router NAS ([bagian 5.3](/docs/guides/web/network/nas-routers/)).

1. Pada detail langganan, klik **Akses jaringan**. Tombol membutuhkan Lihat akun jaringan.
2. Halaman **Akses jaringan** menampilkan kartu **Langganan** (langganan, status, pelanggan, profil kecepatan, POP layanan, dan **Status yang diharapkan**: **Aktif**, **Diisolir**, atau **Dihapus**) dan, setelah akun ada, kartu **Akun jaringan** (jenis layanan, nama pengguna, status sinkronisasi, grup RADIUS, **Online**, alamat, NAS, sesi mulai, dan pemakaian **Bulan ini**).
3. Bila belum ada akun dan pengguna memiliki Kelola akun jaringan, isi kartu **Buat akun jaringan**:
   - **Jenis layanan**: wajib, **PPPoE** atau **Hotspot**.
   - **Nama pengguna**: wajib. Isi bagian sebelum realm dengan 3 sampai 40 huruf kecil, angka, titik, tanda hubung, atau garis bawah. Nama lengkap harus unik lintas perusahaan. Bila bentrok, muncul **Nama pengguna ini tidak tersedia.**
   - **Kata sandi**: opsional, 6 sampai 64 karakter tanpa spasi. Kosongkan agar sistem membuat 12 karakter.
4. Klik **Buat akun jaringan**. Toast **Akun jaringan dibuat.** muncul. Kata sandi buatan sistem hanya tampil sekali di kotak **Kata sandi hanya tampil sekali**. Klik **Salin kata sandi** sebelum menekan **Tutup** atau meninggalkan halaman.
5. Gunakan kartu **Ubah akun jaringan** untuk mengganti jenis layanan, nama pengguna, atau kata sandi, lalu klik **Simpan perubahan**. Kata sandi kosong mempertahankan nilai lama. Langganan **Berhenti** tidak dapat memiliki akun jaringan.
6. Klik **Tampilkan kata sandi** dengan Tampilkan kata sandi akun jaringan. Dialog **Tampilkan kata sandi?** menjelaskan bahwa kata sandi tampil sekali dan pengungkapannya dicatat di log audit. Rute dibatasi 10 permintaan per menit.
7. Klik **Sinkron ulang** dengan Kelola akun jaringan untuk mengantrekan penulisan ulang ke RADIUS dan pemutusan sesi. Toast **Sinkron ulang dijadwalkan.** muncul. Rute dibatasi 6 permintaan per menit.
8. Bila RADIUS belum dikonfigurasi atau tidak terjangkau, perubahan tetap tersimpan. Halaman menulis **RADIUS belum dikonfigurasi untuk perusahaan ini. Perubahan disimpan tetapi tidak dikirim ke FreeRADIUS.** bila perusahaan belum mengisi dan mengaktifkan kartu **RADIUS** di **Integrasi** ([bagian 8.9](/docs/guides/web/administration/integrations/)), dengan tombol **Atur di Pengaturan → Integrasi** untuk admin. Status online dan pemakaian tidak tersedia sampai RADIUS kembali tersedia.

## Menonaktifkan, menghapus permanen, dan memulihkan pelanggan

1. Pada daftar, klik menu **Aksi lainnya** pada baris pelanggan. Isinya **Nonaktifkan** (atau **Aktifkan** bila pelanggan sudah nonaktif) dengan izin Ubah pelanggan (`customer.update`), dan **Hapus permanen** dengan izin Hapus pelanggan (`customer.delete`). **Nonaktifkan** mematikan **Akun** pelanggan (filter **Akun** di daftar). Status pelanggan (**Prospek**, **Aktif**, **Nonaktif**, **Ditangguhkan**, **Berhenti**) tidak berubah.
2. **Hapus permanen** hanya ada bila tidak ada langganan, tagihan, SPK, tiket, aset jaringan, atau riwayat pemasangan yang menunjuk ke pelanggan itu, dalam status apa pun. Angkanya tampil di dialog **Nonaktifkan**, misalnya "dipakai 1 langganan, 3 tagihan". Dialog menulis "Hapus permanen `<nama>`?" dan "Pelanggan "`<nama>`" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan." Alamat dan kontak pelanggan ikut terhapus. Toast **Pelanggan dihapus permanen.** muncul.
3. Toast **Pelanggan dinonaktifkan.** atau **Pelanggan diaktifkan.** muncul setelah **Nonaktifkan** atau **Aktifkan**. Pelanggan **Berhenti** tetap bisa dinonaktifkan.
4. Filter **Status** punya **Dihapus** dan **Semua, termasuk dihapus**. Baris pelanggan yang dihapus punya menu **Pulihkan** (toast **Pelanggan dipulihkan.**).

## Kesalahan umum

- Tombol **Buat Pelanggan** tidak muncul pada staf bawaan karena onboarding juga memerlukan Kelola langganan. Gunakan admin atau manajer, atau ubah izin peran.
- Pesan **email sudah digunakan.** berarti e-mail sudah dipakai akun pengguna mana pun. Periksa Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)) atau gunakan e-mail lain.
- Kesalahan alamat muncul bila koordinat belum dipilih (misalnya **lintang alamat wajib diisi.**), hierarki wilayah tidak cocok (**Provinsi, kota/kabupaten, kecamatan, dan kelurahan/desa tidak saling cocok.**), atau jumlah penanda salah (**Pilih tepat satu alamat utama.** atau **Pilih tepat satu alamat pemasangan.**). Lengkapi peta dan pilih satu kartu untuk tiap penanda. Kontak punya pesan serupa, **Pilih tepat satu kontak utama.**
- Label alamat harus unik untuk pelanggan, termasuk label alamat yang sudah dihapus. Form tidak memeriksanya lebih dulu. Gunakan label berbeda untuk rumah, kantor, atau titik pemasangan.
- Pembuatan **Perusahaan** gagal tanpa **NPWP** dan **Narahubung** (pesan **NPWP wajib diisi.** dan **narahubung wajib diisi.**). Isi keduanya sebelum menyimpan.
- Port ODP yang sudah dipakai atau berada di luar POP pelayan menolak seluruh onboarding dengan pesan seperti **Port ini sudah dipakai.** atau **ODP ini tidak berada di bawah POP layanan langganan**. Pilih port bebas di bawah POP yang benar.
- Toast onboarding menulis "Tautan akses akan dikirim ke &lt;email&gt;." hanya bila **Akun aktif** menyala. Bila dimatikan, toast tidak menyebut tautan dan sistem tidak mengirim e-mail. Aktifkan akun, lalu gunakan **Kirim ulang link akses**.
- Mengubah e-mail atau **Akun aktif** pada pelanggan tidak mengubah akun pengguna. Perbarui akun pada Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)).
- Permintaan **Kirim ulang link akses** keempat dalam satu menit menghasilkan HTTP 429. Tunggu sampai jendela satu menit berlalu.
- Tombol siklus langganan mengikuti status, tetapi server tetap memeriksa izin. Halaman **Akses ditolak** (kode 403) berarti peran tidak memegang izin aksi itu.
- Alamat yang dipakai langganan tidak bisa dihapus. Dialog **Hapus alamat** menulis alasannya dalam teks merah, misalnya "Alamat masih dipakai 1 langganan, jadi tidak bisa dihapus." Pilih alamat lain pada langganan yang sesuai sebelum mencoba lagi.
- Pelanggan yang sudah punya langganan, tagihan, SPK, tiket, aset, atau riwayat pemasangan, dalam status apa pun termasuk **Berhenti**, tidak bisa dihapus permanen. Dialog menulis, misalnya, "Pelanggan masih dipakai 1 langganan, 3 tagihan. Nonaktifkan saja." Pakai **Nonaktifkan** ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/)). Pelanggan nonaktif tidak muncul di pilihan baru dan semua riwayatnya tetap utuh.
- Pesan "Tanggal kunjungan tidak boleh sebelum hari ini." di bawah **Tanggal kunjungan**: pilih hari ini atau sesudahnya, atau kosongkan isian itu.
- Pesan "Kebijakan perusahaan melarang menugaskan diri sendiri." di bawah **Teknisi**: perusahaan Anda melarang penugasan ke akun sendiri (lihat Penugasan, [bagian 3.1](/docs/guides/web/operations/dispatch/)), padahal teknisi yang dipilih adalah Anda. Pilih teknisi lain, atau kosongkan isian itu dan tugaskan nanti. Pelanggan tidak dibuat selama pesan ini muncul.
- Tab **Dokumen** tidak punya formulir unggah dan tombol **Hapus**: keduanya hanya ada dengan Ubah pelanggan (`customer.update`). Tombol **Unggah** tidak aktif sampai **Jenis dokumen** dan **Berkas** dipilih. Berkas selain PDF, JPG, atau PNG, atau lebih dari 10 MB, ditolak. Bila pilihan **Jenis dokumen** kosong, belum ada jenis dokumen aktif untuk pelanggan. Buat di **Jenis Dokumen** ([bagian 8.8](/docs/guides/web/administration/documents/)).
