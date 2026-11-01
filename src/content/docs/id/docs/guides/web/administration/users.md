---
title: "8.5 Pengguna"
description: "Menu ini mengelola akun login karyawan back-office: nama, e-mail, status aktif, peran dan undangan untuk mengatur kata sandi."
---

Menu ini mengelola akun login karyawan back-office: nama, e-mail, status aktif, peran dan undangan untuk mengatur kata sandi. Buka saat ada orang baru, saat peran berubah, saat akun perlu dinonaktifkan, atau saat seseorang kehilangan perangkat autentikasi dua langkah.

Peran yang dapat memakai: pemegang `users.manage` (daftar, tambah, ubah, hapus, ekspor, dan atur peran), yaitu Admin pada templat bawaan, dan `users.two_factor.reset` (atur ulang 2FA, hanya Admin). Daftar memuat anggota perusahaan yang sedang aktif: pengguna yang berasal dari perusahaan ini, dan pengguna dari perusahaan lain yang diberi keanggotaan di sini.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Administrasi**, lalu klik **Pengguna**.
2. Baca layar:
   - **Cari** (petunjuk "Nama atau email") mencari di nama dan e-mail. **Status** menyaring **Semua status**, **Aktif** atau **Nonaktif**.
   - Kolom: **Nama** (tautan ke halaman detail) dan **Email** (keduanya bisa diurutkan), **Peran** (satu lencana per peran pengguna di perusahaan ini; "Belum ada peran" bila kosong), **Status** (bisa diurutkan; lencana **Aktif** atau **Nonaktif**), **2FA** (lencana **Aktif** atau **Nonaktif**) dan **Aksi**.
   - Kolom **Aksi** berisi tombol **Atur peran** (bila Anda boleh mengatur peran pengguna itu), tombol **Ubah**, dan menu **Aksi lainnya** dengan **Lihat detail** dan **Hapus**.
   - Pengguna yang berasal dari perusahaan lain tampil dengan lencana **Anggota** di samping namanya dan tanpa tautan ke halaman detail. Login mereka diubah di perusahaan asal. Di sini Anda hanya mengatur peran mereka di perusahaan ini lewat **Atur peran**.
   - **Hapus** tidak muncul di baris akun Anda sendiri, di baris pengguna yang memegang hak akses yang tidak Anda pegang, di baris anggota dari perusahaan lain, dan di baris pengguna yang juga tergabung di perusahaan lain yang tidak Anda ikuti.
   - **Ekspor** menawarkan **Ekspor CSV** dan **Ekspor PDF** dengan kolom Nama, Email, Peran dan Status (**Aktif** atau **Nonaktif**). Hasilnya mengikuti pencarian dan filter yang aktif, paling banyak 5000 baris (batas bawaan). Bila lebih, berkas CSV berakhir dengan baris "# Ekspor dipotong pada 5000 baris. Persempit filter untuk mengekspor sisa barisnya." dan PDF menandai pemotongan itu. Persempit filter bila itu terjadi.
   - Bila tidak ada baris, layar menampilkan "Belum ada pengguna", atau "Tidak ada pengguna yang cocok" dengan tombol **Reset filter** saat filter aktif.

   ![Daftar Pengguna dengan kotak Cari, filter Status, kolom Nama, Email, Peran, Status, 2FA dan Aksi, serta tombol Ekspor dan Buat Pengguna](~/assets/guide/web/users.webp)

## Membuat pengguna

1. Klik **Buat Pengguna**.

   ![Form Buat Pengguna dengan isian Nama, Email, saklar Aktif dan daftar Peran](~/assets/guide/web/users-create.webp)

2. Isi kartu **Data akun**. Subjudul form berbunyi "Akun menerima undangan lewat email untuk mengatur kata sandi. Peran menentukan hak aksesnya." Form tidak punya isian **Kata sandi**: admin tidak mengetik kata sandi untuk akun baru, dan orang itu mengaturnya sendiri lewat undangan di langkah 4.
   - **Nama**: wajib, paling banyak 255 karakter.
   - **Email**: wajib, e-mail yang valid, paling banyak 255 karakter, belum dipakai akun lain di sistem (perusahaan mana pun). Undangan dikirim ke alamat ini.
   - **Aktif**: saklar, bawaan hidup. Matikan bila akun baru belum boleh masuk. Nilainya tersimpan, jadi akun itu langsung berstatus **Nonaktif**. Undangan tetap terkirim, tetapi akun nonaktif tidak bisa masuk sampai Anda mengaktifkannya lewat **Ubah**.
   - **Peran**: satu kotak centang per peran perusahaan ini, berlabel nama peran. Boleh memilih lebih dari satu; baca "Aturan saat memberi peran" di bawah. Peran akun pelanggan tidak ditawarkan di sini. Kotak peran yang memuat hak akses yang tidak Anda pegang tidak bisa dicentang dan diberi keterangan "Peran ini memuat hak akses yang tidak Anda pegang". Bila perusahaan belum punya peran, layar menulis "Perusahaan ini belum punya peran yang bisa diberikan di sini." dengan tautan **Buat peran**, atau "Minta admin perusahaan membuat peran." bila Anda tidak boleh membuat peran.
3. Bila Anda memegang `employee.manage`, kartu **Profil karyawan** tampil di bawah **Data akun**. Nyalakan saklar **Buat profil karyawan untuk pengguna ini** bila orang itu bekerja di lapangan atau perlu profil karyawan. Isian yang muncul:
   - **Telepon**: opsional, paling banyak 50 karakter.
   - **Tanggal masuk**: opsional, dipilih dari kalender peramban.
   - **Status karyawan**: **Aktif** (isian awal) atau **Nonaktif**. Status **Berhenti** hanya ada di layar Karyawan ([bagian 8.3](/docs/guides/web/administration/employees/)).
   - **Catatan**: opsional, paling banyak 2000 karakter.

   Nomor karyawan dibuat otomatis, dan **Organisasi** serta **Kendaraan** diisi kemudian di layar Karyawan. Tanpa `employee.manage`, kartu ini tidak tampil, dan server menolak form yang tetap membawa data karyawan.
4. Klik **Kirim undangan**. Anda kembali ke daftar dan toast "Pengguna dibuat. Undangan dikirim ke &lt;email&gt;." muncul. **Batal** kembali ke daftar tanpa menyimpan. Pengguna menerima e-mail "Undangan staf &lt;nama perusahaan&gt; di Inbils" dengan tombol **Atur kata sandi**. Tautannya berlaku 60 menit. Pengguna mengeklik tombol itu, memilih kata sandi, lalu masuk dengan e-mailnya. E-mail undangan selalu keluar lewat pengirim platform, bukan lewat SMTP perusahaan ([bagian 8.9](/docs/guides/web/administration/integrations/)). Pengiriman tercatat di log keamanan.

Akun baru berasal dari perusahaan yang sedang aktif dan e-mailnya langsung terverifikasi. Sampai orangnya mengatur kata sandi lewat undangan, akun itu belum bisa masuk. Akun yang hanya memegang peran untuk aplikasi (Teknisi atau Pelanggan) dialihkan di web ke halaman "Gunakan aplikasi Inbils"; peran back-office yang ikut dicentang menghilangkan pengalihan itu. Akun tanpa peran apa pun melihat "Akun ini belum punya akses aplikasi web" sampai diberi peran. Login pelanggan dibuat otomatis saat pelanggan dibuat ([bab 4](/docs/guides/web/customers-and-services/customers/)), jadi jangan membuatnya di sini. Teknisi juga memerlukan profil karyawan aktif ([bagian 8.3](/docs/guides/web/administration/employees/)), yang bisa Anda buat di kartu **Profil karyawan** di atas.

## Mengirim ulang undangan

Pakai fitur ini bila e-mail undangan hilang atau tautannya sudah lewat 60 menit.

1. Buka halaman detail pengguna (bagian "Melihat detail pengguna").
2. Klik **Kirim ulang undangan** di kanan atas. Tombol hanya tampil bila akun itu aktif dan belum pernah masuk (**Terakhir masuk** kosong), Anda memegang `users.manage`, dan Anda boleh mengubah akun itu.
3. Toast "Undangan dikirim ulang ke &lt;email&gt;." muncul, dan pengguna menerima e-mail yang sama dengan tautan baru. Pengiriman ulang tercatat di log keamanan.

Pengiriman ulang dibatasi enam kali per menit untuk satu akun, dengan pesan "Terlalu banyak pengiriman undangan. Coba lagi nanti." Akun yang sudah pernah masuk tidak punya tombol ini: pengguna itu memakai **Lupa kata sandi** di halaman masuk ([bagian 1.3](/docs/guides/web/introduction/forgot-password/)). Akun nonaktif juga tidak punya tombol ini, jadi aktifkan dulu lewat **Ubah**. Bila server menolak, kotak merah di atas kartu menulis "Undangan hanya dapat dikirim kepada pengguna aktif yang belum pernah masuk."

## Aturan saat memberi peran

Pesan penolakan muncul dalam warna merah di bawah daftar **Peran**, disertai toast "Data gagal disimpan. Periksa input." Aturannya berlaku per perusahaan.

- Anda hanya dapat memberi peran yang hak aksesnya Anda pegang semuanya. Peran yang lebih berkuasa dari Anda tidak bisa dicentang. Bila tetap terkirim, pesannya "Anda tidak dapat memberi hak akses yang tidak Anda miliki:" diikuti nama hak aksesnya.
- Anda hanya dapat membuka **Ubah**, menghapus, mengatur ulang 2FA, atau mengatur peran akun yang hak aksesnya Anda pegang semuanya. Admin memegang semuanya, jadi tidak dibatasi. Halaman akun yang lebih berkuasa dari Anda menjawab **Akses ditolak**.
- Bila yang menyimpan tidak memegang `roles.manage`, izin gabungan dari semua peran yang dicentang tidak boleh memuat pasangan yang bertentangan menurut pemisahan tugas (daftar pasangan ada di [bagian 8.6](/docs/guides/web/administration/roles/)). Contoh: **Manajer** dan **Staf** pada satu akun ditolak, karena manajer menyetujui permintaan barang sedangkan staf menyiapkan dan mengeluarkannya. Pesannya berbentuk "Pemisahan tugas (persetujuan permintaan barang vs pelaksanaan gudang): ... tidak boleh digabung dengan ...", diikuti kode izin yang bertabrakan. Pemegang `roles.manage` dikecualikan sebagai jalan darurat.
- Perusahaan harus tetap punya minimal satu admin aktif, yaitu pengguna aktif yang memegang `roles.manage` dan izin akses web. Melepas peran terakhir itu, menonaktifkan, atau menghapus admin terakhir ditolak dengan "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage." Angkat admin lain dulu.
- Bila pengguna juga tergabung di perusahaan lain yang tidak Anda ikuti, halaman detail, **Ubah** dan **Hapus** ditolak (403, "Akses ditolak"). Mengatur perannya di perusahaan ini tetap boleh bila ia anggota perusahaan ini.

## Mengatur peran anggota

Pakai **Atur peran** untuk mengganti peran seseorang di perusahaan ini tanpa membuka form **Ubah**, terutama untuk anggota dari perusahaan lain (lencana **Anggota**). Seorang pengguna dapat memegang peran berbeda di tiap perusahaan, misalnya Admin di satu perusahaan dan Teknisi di perusahaan lain.

1. Di baris pengguna, klik **Atur peran**. Dialog berjudul "Atur peran" diikuti nama pengguna.
2. Baca keterangannya: "Peran ini berlaku hanya di perusahaan ini. Pengguna tanpa peran tidak bisa membuka menu apa pun."
3. Centang peran yang berlaku, lalu klik **Simpan peran**. **Batal** menutup dialog tanpa menyimpan. Toast "Peran pengguna diperbarui." muncul.

Peran akun pelanggan tidak bisa ditambah atau dilepas di sini. Bila pengguna memegangnya, peran itu tampil sebagai lencana dengan keterangan "Peran pelanggan dikelola dari data pelanggan." dan tetap setelah disimpan. Aturan "Aturan saat memberi peran" di atas berlaku sama.

## Mengubah pengguna

1. Di daftar, klik **Ubah** pada baris pengguna, atau klik **Ubah** di halaman detail.
2. Ubah isian di form **Ubah Pengguna**. Isiannya sama dengan form pembuatan, tanpa kartu **Profil karyawan** (profil diubah di layar Karyawan, [bagian 8.3](/docs/guides/web/administration/employees/)), dengan perbedaan berikut:
   - **Email**: tetap harus unik. Mengubahnya di sini tidak mereset status verifikasi e-mail.
   - **Kata sandi**: isian ini hanya ada di form **Ubah**, untuk mengganti kata sandi akun yang sudah ada. Kosongkan untuk mempertahankan kata sandi lama (petunjuk "Kosongkan untuk mempertahankan kata sandi saat ini."). Bila diisi, paling sedikit 8 karakter.
   - **Peran**: hasilnya persis peran yang tercentang. Peran yang tidak dicentang dilepas. Peran akun pelanggan yang dipegang tidak ikut berubah.
3. Klik **Simpan**. Anda kembali ke daftar dan toast "Pengguna diperbarui." muncul. **Batal** kembali ke daftar tanpa menyimpan. Tombol **Kembali** di kanan atas membuka halaman detail pengguna itu.

Menonaktifkan akun atau mengganti kata sandinya langsung mencabut semua token aplikasi pengguna itu, sehingga aplikasi Android meminta masuk ulang pada panggilan berikutnya. Pengguna nonaktif tidak dapat masuk lagi, dan login menolaknya dengan pesan yang sama seperti kata sandi salah ("Email atau kata sandi salah."). Sesi web yang sudah terbuka tidak ditutup otomatis dan berjalan sampai sesinya berakhir. Penugasan SPK dan tiket menolak pengguna nonaktif ([bab 3](/docs/guides/web/operations/dispatch/)).

## Melihat detail pengguna

1. Klik nama pengguna di daftar, atau **Lihat detail** di menu **Aksi lainnya**.
2. Judul halaman memuat nama dan e-mail, dengan tombol **Kembali**, **Log audit**, **Kirim ulang undangan** (hanya untuk akun yang belum pernah masuk, lihat "Mengirim ulang undangan") dan **Ubah**. **Log audit** hanya tampil bila Anda memegang `report.audit.view` (bawaan: admin). Tombol itu membuka log audit yang sudah disaring untuk pengguna ini. Kartu **Data pengguna** menampilkan **Status**, **Dibuat**, **Terakhir masuk** (tanggal dan jam memakai format perusahaan), **Pelanggan** (kode dan nama, bila akun tertaut ke pelanggan) dan **Peran di perusahaan ini** ("Belum ada peran di perusahaan ini" bila kosong). Kartu **Autentikasi dua langkah** menampilkan lencana **Aktif** atau **Nonaktif**.

   ![Halaman detail pengguna dengan kartu Data pengguna, kartu Autentikasi dua langkah dan tab riwayat](~/assets/guide/web/users-show.webp)

3. Di bawahnya muncul tab riwayat sesuai izin Anda: **Riwayat tagihan (n)** (`billing.view`), **Riwayat tiket (n)** (`ticket.view`) dan **Riwayat SPK (n)** (`spk.view`). Tiap tab memuat paling banyak 50 baris terbaru dan tombol **Lihat** ke dokumennya. Tanpa satu pun izin itu, tab tidak tampil.
   - **Riwayat tagihan**: tagihan yang dibuat pengguna itu atau milik pelanggan yang tertaut. Kolom Nomor, Status, Tanggal terbit, Jatuh tempo, Total, Dibayar dan Aksi.
   - **Riwayat tiket**: tiket yang dibuat oleh atau ditugaskan kepadanya, atau milik pelanggan yang tertaut. Kolom Kode, Judul, Prioritas, Status, Dibuat, Diselesaikan dan Aksi.
   - **Riwayat SPK**: SPK yang dibuat oleh atau ditugaskan kepadanya, atau milik pelanggan yang tertaut. Kolom Kode, Judul, Jenis, Prioritas, Status, Jadwal, Selesai dan Aksi.
   - Tab tanpa isi menampilkan "Belum ada riwayat tagihan", "Belum ada riwayat tiket" atau "Belum ada riwayat SPK".

## Mengatur ulang autentikasi dua langkah

Pakai fitur ini bila pengguna kehilangan perangkat autentikator dan kode pemulihannya. Pengguna yang masih memegang kode pemulihan dapat memakainya sendiri ([bagian 1.4](/docs/guides/web/introduction/two-factor-authentication/)). Tombol hanya tampil bila pengguna berstatus 2FA **Aktif**, Anda memegang `users.two_factor.reset` (bawaan: admin saja), ini bukan akun Anda sendiri, Anda memegang semua hak akses akun itu, dan Anda tergabung di semua perusahaan pengguna itu.

1. Buka halaman detail pengguna (bagian "Melihat detail pengguna").
2. Pada kartu **Autentikasi dua langkah**, klik **Atur ulang 2FA**.
3. Baca dialog berjudul "Atur ulang autentikasi dua langkah untuk" diikuti nama pengguna dan tanda tanya. Isinya: pengguna bisa masuk hanya dengan kata sandi sampai ia mengaturnya lagi, dan kode pemulihannya tidak berlaku. Pastikan dulu bahwa yang meminta benar orangnya, lalu klik **Atur ulang**. **Batal** menutup dialog.
4. Toast "Autentikasi dua langkah direset." muncul, disusul nama pengguna dan keterangan bahwa ia bisa masuk hanya dengan kata sandi, lalu mengaturnya lagi. Lencana berubah menjadi **Nonaktif** dan tombolnya hilang.

Reset menghapus rahasia autentikator dan kode pemulihan, mengakhiri login lain pengguna itu (cookie "Ingat saya", token aplikasi, dan sesi web lainnya bila server memakai sesi database) dan tercatat di log keamanan bersama id admin yang melakukannya.

## Menghapus pengguna

1. Klik menu **Aksi lainnya** pada baris pengguna, pilih **Hapus**, lalu klik **Hapus** di dialog konfirmasi. Judul dialog berbunyi "Hapus" diikuti nama pengguna dan tanda tanya, dengan keterangan "Pengguna yang tercatat pada pelanggan atau penyesuaian stok tidak bisa dihapus. Nonaktifkan akunnya."
2. Toast "Pengguna dihapus." muncul. Penghapusan bersifat permanen dan tidak bisa dibatalkan. Semua token aplikasi pengguna itu ikut dicabut.

Penghapusan ditolak bila pengguna dikreditkan sebagai pembawa pelanggan ([bab 4](/docs/guides/web/customers-and-services/customers/)), atau pernah mengajukan atau meninjau penyesuaian stok ([bab 6](/docs/guides/web/inventory/item-requests/)). Dialog tetap terbuka, kotak merah di atas daftar menampilkan alasannya, dan toast "Data gagal disimpan. Periksa input." muncul. Alasan itu berbunyi "Pengguna yang dicatat memperoleh pelanggan tidak bisa dihapus. Nonaktifkan akunnya." atau "Pengguna yang pernah mengajukan atau memeriksa penyesuaian stok tidak bisa dihapus. Nonaktifkan akunnya." Klik **Batal**, lalu nonaktifkan akunnya lewat **Ubah**.

## Kesalahan umum

- Simpan ditolak dengan toast "Data gagal disimpan. Periksa input.": baca pesan merah di bawah isian atau di bawah **Peran**. Penyebab umum: kombinasi peran atau peran yang tidak Anda pegang hak aksesnya (lihat "Aturan saat memberi peran"), "email sudah digunakan." bila e-mail dipakai akun lain, dan isian **Telepon**, **Tanggal masuk** atau **Catatan** di kartu **Profil karyawan** yang melewati batasnya. Di **Ubah**, **Kata sandi** yang diisi kurang dari 8 karakter ditolak dengan "kata sandi minimal 8 karakter."
- Pengguna baru tidak menerima undangan: periksa alamat di **Email**, folder spam, dan integrasi Email ([bagian 8.9](/docs/guides/web/administration/integrations/)). Akun yang aktif dan belum pernah masuk bisa dikirimi ulang dari halaman detailnya. Tautan yang sudah lewat 60 menit tidak bisa dipakai lagi, jadi kirim ulang undangannya.
- Kartu **Profil karyawan** tidak tampil di form **Buat Pengguna**: peran Anda belum memegang `employee.manage`. Minta orang yang berhak membuat profilnya lewat layar Karyawan ([bagian 8.3](/docs/guides/web/administration/employees/)).
- Akun baru seharusnya nonaktif tetapi tampil **Aktif**: saklar **Aktif** di form pembuatan masih hidup saat Anda menyimpan. Matikan saklar itu, atau ubah akunnya lewat **Ubah**.
- Teknisi atau pelanggan melihat halaman "Gunakan aplikasi Inbils": itu perilaku normal untuk akun yang perannya tidak memuat akses web. Beri peran back-office bila orangnya memang harus memakai web.
- Pengguna sudah dinonaktifkan tetapi masih bisa bekerja di web: sesi yang sudah terbuka belum berakhir. Token aplikasinya sudah dicabut.
- Tombol **Atur ulang 2FA** tidak ada: pengguna belum mengaktifkan 2FA, akun itu milik Anda sendiri, atau akun itu memegang hak akses yang tidak Anda pegang.
- **Hapus** tidak ada di baris pengguna: baris itu akun Anda sendiri, akun yang memegang hak akses yang tidak Anda pegang, anggota dari perusahaan lain, atau pengguna itu tergabung di perusahaan yang tidak Anda ikuti.
- Admin tunggal yang kehilangan perangkat 2FA tidak dapat diatur ulang dari layar ini karena tidak ada admin lain. Pengelola server mematikan 2FA-nya lewat perintah server.
