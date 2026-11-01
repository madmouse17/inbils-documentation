---
title: "8.2 Organisasi"
description: "Organisasi menyimpan struktur perusahaan sebagai pohon unit: cabang, area, unit dan tim."
---

Organisasi menyimpan struktur perusahaan sebagai pohon unit: cabang, area, unit dan tim. Buka menu ini saat Anda menyusun struktur baru, memindahkan unit ke induk lain, atau menyiapkan unit sebelum menempatkan karyawan di dalamnya ([bagian 8.3](/docs/guides/web/administration/employees/)).

Peran yang dapat memakai: admin. Izin: `organization.view` membuka menu dan daftar, `organization.manage` mengizinkan tambah, ubah dan hapus unit, `organization.export` menampilkan tombol **Ekspor**. Pada peran bawaan hanya admin yang memegang ketiganya. Manajer, staf dan teknisi tidak melihat menu ini, kecuali admin memberi izinnya pada peran khusus ([bagian 8.6](/docs/guides/web/administration/roles/) dan [8.7](/docs/guides/web/administration/permissions/)). Daftar memuat unit perusahaan aktif ([bagian 1.6](/docs/guides/web/introduction/switch-company/)).

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Administrasi**, lalu klik **Organisasi**.
2. Baca daftar. Layar ini berupa tabel, bukan tampilan pohon: kolom **Jalur** menunjukkan letak unit di pohon. Cara kerja pencarian, urutan, tombol baris, halaman dan dialog hapus ada di [bagian 1.5](/docs/guides/web/introduction/know-the-screen/).

   - Kotak **Cari** (teks petunjuk "Kode, nama, atau jalur") mencari di kode, nama dan jalur.
   - Kolom: **Kode**, **Nama**, **Jenis**, **Jalur**, **Sub-unit**, **Status** dan **Aksi**. **Kode**, **Nama** dan **Jenis** bisa diurutkan; urutan awal menurut **Kode**.
   - Di bawah nama unit tertulis "Induk: &lt;nama induk&gt;", atau "Unit utama" untuk unit paling atas.
   - **Jenis** dan **Status** berupa lencana berwarna: **Perusahaan**, **Cabang**, **Area**, **Unit** atau **Tim** untuk jenis, dan **Aktif** atau **Nonaktif** untuk status.
   - **Jalur** menulis kode unit dari yang paling atas sampai unit itu, dipisah tanda `>`. Unit paling atas hanya menampilkan kodenya sendiri.
   - **Sub-unit** menghitung unit anak langsung, misalnya "1 sub-unit" atau "2 sub-unit".
   - Tombol **Buat Unit**, **Ubah** dan menu **Aksi lainnya** (isinya **Nonaktifkan** atau **Aktifkan**, dan **Hapus permanen** bila unit belum pernah dipakai) tampil untuk semua pemegang `organization.view`. Server menolak aksi dari pengguna tanpa `organization.manage`. Layar ini tidak punya tombol **Lihat** atau **Lihat detail**. Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**.
   - Bila belum ada unit, layar menulis "Belum ada unit organisasi" beserta tombol **Buat Unit**. Bila pencarian tidak menemukan apa pun, layar menulis "Tidak ada unit organisasi yang cocok" dengan tombol **Reset filter**.

   ![Daftar Organisasi yang masih kosong pada perusahaan demo: kotak Cari, tombol Ekspor dan Buat Unit, dan pesan Belum ada unit organisasi](~/assets/guide/web/organizations.webp)

## Menambah unit

1. Klik **Buat Unit**.
2. Isi form pada dialog **Buat Unit**:
   - **Kode**: wajib, maksimal 50 karakter. Selama **Kode** kosong dan **Nama** sudah terisi, tombol saran "Gunakan: &lt;kode&gt;" muncul di bawah isian, misalnya "Gunakan: CABANG-BANDUNG" untuk nama "Cabang Bandung". Kode saran berupa huruf besar dan angka, kata dipisah tanda `-`. Klik tombol itu untuk mengisinya, lalu ubah bila perlu. Tombol hilang begitu Anda mengetik kode sendiri. Kode tidak boleh sama dengan kode unit lain di perusahaan yang sama, termasuk unit yang sudah dihapus, dan server tetap memeriksanya. Kode ikut menyusun **Jalur**.
   - **Nama**: wajib, maksimal 255 karakter.
   - **Jenis**: wajib. Pilih **Perusahaan**, **Cabang**, **Area**, **Unit** atau **Tim**. Isian awalnya **Cabang**. Sistem tidak memeriksa kecocokan tingkat dengan induknya.
   - **Induk**: opsional. Ketik untuk mencari, lalu pilih unit di daftar (petunjuk "Cari unit induk"). Daftar hanya memuat unit aktif, ditulis "kode - nama" dengan jalur unit di bawahnya, dan memfilter menurut yang Anda ketik. Pilihan tetap sampai Anda memilih unit lain atau mengklik tombol silang ("Hapus pilihan: Induk"). Mengetik di kotak tidak mengubah pilihan. Kosongkan isian agar unit menjadi unit paling atas, sesuai teks bantuan "Kosongkan untuk unit utama." Isian ini nonaktif dengan teks "Belum ada unit lain" selama belum ada unit aktif.
   - **Telepon**: opsional, maksimal 50 karakter.
   - **Email**: opsional, harus berformat email, maksimal 255 karakter.
   - **Alamat**: opsional, teks bebas.
   - **Aktif**: saklar, aktif secara awal.
3. Klik **Buat**. Dialog menutup dan muncul toast "Unit organisasi dibuat." Sistem mengisi **Jalur** otomatis.

## Mengubah dan memindahkan unit

1. Klik **Ubah** pada baris unit. Dialog **Ubah Unit** terbuka dengan data unit.
2. Ubah isian. Untuk memindahkan unit, pilih **Induk** yang baru, atau klik tombol silang pada **Induk** agar unit menjadi unit paling atas.
3. Klik **Simpan**. Muncul toast "Unit organisasi diperbarui."

Mengubah **Kode** atau **Induk** menghitung ulang **Jalur** unit itu dan semua unit di bawahnya. Unit yang sedang Anda ubah tidak muncul di pilihan **Induk**. Layar ini tidak punya tombol pindah atau seret-dan-lepas.

## Menonaktifkan, menghapus permanen, dan memulihkan unit

1. Klik **Aksi lainnya** pada baris unit. Isinya **Nonaktifkan** (atau **Aktifkan**) dan **Hapus permanen**. Dialog **Nonaktifkan** menulis apa yang memakai unit itu, misalnya "dipakai 2 sub-unit, 5 karyawan, 12 SPK selesai". Toast "Unit organisasi dinonaktifkan." muncul. Unit nonaktif tidak muncul di pilihan **Induk** dan **Organisasi**, tidak dihitung untuk Kinerja Teknisi manajer, dan sub-unit, karyawan, serta SPK yang sudah memakainya tetap utuh.
2. **Hapus permanen** hanya ada bila unit tidak punya sub-unit (kolom **Sub-unit** 0), tidak ada karyawan di dalamnya, dan tidak ada SPK selesai yang mencatat unit itu. Dialog "Hapus permanen &lt;nama unit&gt;?" menulis "Unit organisasi "&lt;nama unit&gt;" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan." Klik **Hapus permanen**. Toast "Unit organisasi dihapus permanen." muncul.
3. Bila unit baru dipakai setelah Anda membuka menu, dialog tetap terbuka, dan teks merah menulis alasannya, misalnya "Unit organisasi masih dipakai 1 karyawan. Nonaktifkan saja." Klik **Batal**, lalu pindahkan karyawannya ([bagian 8.3](/docs/guides/web/administration/employees/)) atau nonaktifkan unitnya.
4. Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. Baris yang dihapus punya **Pulihkan**. Sub-unit tidak bisa dipulihkan selama induknya masih dihapus. Unit yang dipulihkan menghitung ulang **Jalur** dari induknya yang sekarang.

## Menempatkan karyawan dan manajer di unit

Unit dipakai lewat isian **Organisasi** pada profil karyawan ([bagian 8.3](/docs/guides/web/administration/employees/)). Layar ini tidak punya isian kepala unit. Seorang manajer terhubung ke unit hanya lewat isian **Organisasi** pada profil karyawannya sendiri.

- Di Kinerja Teknisi ([bagian 7.9](/docs/guides/web/finance-and-reports/technician-performance/)), manajer (peran `manager` dengan izin `report.technician`) melihat teknisi yang ditempatkan di unitnya sendiri dan di semua unit di bawahnya. Admin (izin `report.manage`) melihat semua teknisi perusahaan.
- Syarat untuk manajer: profil karyawannya berstatus **Aktif** dan unitnya aktif. Bila belum, menu **Kinerja Teknisi** tidak tampil. Teknisi tanpa unit atau di unit nonaktif tidak terlihat oleh manajer.
- Di halaman SPK ([bagian 3.3](/docs/guides/web/operations/work-orders/)), daftar **Teknisi** pada dialog penugasan menampilkan nomor karyawan, nama unit dan nomor telepon di bawah nama teknisi. Unit tidak membatasi pilihan: Penugasan ([bagian 3.1](/docs/guides/web/operations/dispatch/)) dan halaman SPK menawarkan semua teknisi aktif di perusahaan.

## Mengekspor daftar

1. Isi kotak **Cari** bila Anda hanya butuh sebagian unit.
2. Klik **Ekspor**, lalu pilih **Ekspor CSV** atau **Ekspor PDF**.

Berkas bernama `organizations-export-<tanggal>-<jam>.csv` atau `.pdf` dan berisi kolom Kode, Nama, Jenis, Jalur, Sub-unit dan Status. Tombol **Ekspor** hanya tampil bagi pemegang `organization.export`.

## Kesalahan umum

- Muncul "Unit tidak bisa dipindahkan ke bawah dirinya sendiri atau sub-unitnya." di bawah **Induk**: induk yang Anda pilih adalah sub-unit dari unit itu sendiri. Pilih unit lain, atau pindahkan dulu unit anaknya.
- Penyimpanan gagal dengan toast "Data gagal disimpan. Periksa input.": baca pesan merah di bawah isian. **Kode** menulis "kode wajib diisi." atau "kode sudah digunakan.", **Email** menulis "email harus berupa alamat email yang valid." dan **Telepon** menolak lebih dari 50 karakter.
- **Hapus permanen** tidak ada di menu unit selama unit itu punya unit anak, karyawan, atau SPK selesai yang mencatat unit itu (lihat "Menonaktifkan, menghapus permanen, dan memulihkan unit"). Pindahkan karyawan ke unit lain ([bagian 8.3](/docs/guides/web/administration/employees/)), atau cukup **Nonaktifkan** unitnya.
- Unit yang dinonaktifkan (saklar **Aktif** mati) tidak muncul di pilihan **Induk** dan **Organisasi**, dan tidak dihitung untuk Kinerja Teknisi manajer. Nyalakan lagi lewat **Ubah**.
