---
title: "7.12 Log Audit"
description: "Log audit menelusuri aktivitas perusahaan menurut waktu, modul, pelaku, subjek, dan data perubahan."
---

Log audit menelusuri aktivitas perusahaan menurut waktu, modul, pelaku, subjek, dan data perubahan. Setiap baris ditulis sebagai satu kalimat berbahasa Indonesia, misalnya "Pembayaran dicatat" atau "Tiket dibuka kembali oleh staf". Buka laporan ini saat Anda perlu mengetahui siapa melakukan suatu tindakan atau nilai apa yang berubah.

Peran yang dapat memakai: admin. Izin: `report.audit.view`. Tombol **Ekspor log** memerlukan `report.export` selain izin audit.

## Menyaring dan membaca log

1. Buka **Laporan**, lalu klik tautan **Log Audit**. Judul halamannya **Log audit**.

   ![Halaman Log audit dengan kartu Filter log dan tabel aktivitas perusahaan](~/assets/guide/web/reports-audit-log.webp)

2. Isi filter yang diperlukan:
   - **Pencarian teks** mencari pada kalimat **Deskripsi** (dalam kata Indonesia, misalnya `ditugaskan`, `dibuka kembali`, atau `Pembayaran dicatat`), pada nama modul tersimpan (misalnya `customer`), pada kode aksi tersimpan, serta pada nama atau email pelaku. Yang dicari adalah kalimat dasar tiap jenis aktivitas: keterangan tambahan di ujung kalimat, seperti nama peran atau nama pemasok, tidak ikut dicari. Isian ini tidak mencari pada label modul yang tampil di lencana dan tidak mencari pada kolom **Subjek**.
   - **Modul** memilih satu modul dari daftar, misalnya Pelanggan, Tagihan, Inventaris, SPK, Tiket, Pengguna, atau Autentikasi. Klik kotaknya, ketik untuk menyaring, lalu pilih. Isian kosong menampilkan **Semua modul**.
   - **Pengguna** memilih pelaku. Ketik minimal 2 huruf nama atau email ("Cari nama atau email..."), tunggu daftar, lalu pilih. Daftar hanya memuat anggota perusahaan aktif: pengguna perusahaan itu dan pengguna perusahaan lain yang diberi akses ke perusahaan aktif. Akun nonaktif ikut dalam daftar. Klik **Hapus pilihan: Pengguna** untuk mengosongkan.
   - **Periode** membatasi waktu kejadian menurut hari kalender. Ketik rentang, atau buka kalender dan pakai pilihan cepat, seperti pada [bagian 7.9](/docs/guides/web/finance-and-reports/technician-performance/). Log Audit selalu punya periode: bila tanggal mulai kosong, halaman memakai 7 hari sampai tanggal akhir (atau sampai hari ini menurut zona waktu perusahaan bila tanggal akhir juga kosong) dan mengisi tanggal mulai itu di isian. Periode paling lama 92 hari. Di bawah isian tertulis "Paling lama 92 hari. Tanpa tanggal mulai, 7 hari terakhir."
3. Klik **Terapkan filter**. Klik **Reset filter** untuk menghapus semua filter dan mengembalikan urutan waktu terbaru. Kartu filter juga menulis "Menampilkan n dari m log".
4. Klik **Muat ulang** di kanan atas untuk mengambil data terbaru tanpa mengubah filter.
5. Baca tabel:
   - **Waktu** menampilkan tanggal dan jam kejadian dalam format dan zona waktu perusahaan. Tidak ada jam kedua: semua tanggal dan jam di halaman ini, di dialog rincian, dan di ekspor memakai zona waktu perusahaan.
   - **Modul** menampilkan modul sebagai lencana, misalnya Pelanggan atau Tagihan. Log tanpa modul tampil sebagai **Umum**.
   - **Deskripsi** menulis aktivitasnya sebagai satu kalimat, misalnya "Permintaan barang disetujui dan stok dicadangkan", "Pembayaran online lunas", atau "Teknisi check-in di lokasi SPK". Sebagian kalimat membawa satu keterangan singkat, misalnya "Stok diterima dari {pemasok}" atau "Peran Admin ditambahkan ke pengguna". Pasangan modul dan aksi yang belum punya kalimat tampil sebagai `modul: aksi` dengan garis bawah dibaca spasi.
   - **Pelaku** memuat nama dan email, tulisan "Pengguna #" diikuti ID, atau **Sistem**. Tindakan tim dukungan Inbils memakai nama **Tim dukungan Inbils** (lihat di bawah).
   - **Subjek** menyebut data yang terkena dengan nama atau kode yang dipakai orang, misalnya `REQ-2026-00001` atau nama pelanggan, bukan jenis data dan ID. Baris yang tidak punya subjek menulis **-**. Untuk baris stok, subjeknya nama barang.
   - **Detail** membuka dialog rincian log. Titik kecil pada tombol berarti log itu mempunyai perubahan properti.
6. Urutkan lewat **Waktu** atau **Modul**. **Deskripsi**, **Pelaku**, dan **Subjek** tidak dapat diurutkan. Kolom **Aksi** tidak ada lagi di tabel: kode aksi tersimpan hanya tampil di CSV.
7. Di bawah tabel, atur **Baris per halaman** menjadi 10, 15, 25, 50, atau 100. Nilai awal dari halaman ini adalah 25. Pindah halaman dengan **Sebelumnya** dan **Berikutnya**.

Pada layar yang lebih sempit dari 768 piksel, tabel berubah menjadi kartu. Tombol **Lihat detail properti** menggantikan kolom **Detail**.

## Baris keamanan, ekspor, dan data pribadi

Selain perubahan data, Log Audit memuat jejak keamanan perusahaan Anda di modul **Keamanan**. Kolom **Deskripsi** menulis kalimat berikut:

- "Masuk ke akun" dan "Keluar dari akun": masuk dan keluar lewat web. Masuk lewat aplikasi tercatat sebagai "Token aplikasi seluler dibuat".
- "Percobaan masuk gagal": kata sandi salah. Hanya satu baris per akun dan alamat IP dalam 15 menit. Properti `failures` menghitung percobaannya, jadi satu serangan tebak tidak memenuhi log. Kata sandi dan email yang diketik tidak disimpan. Email hanya tersimpan sebagai sidik (`email_hash`) yang tidak bisa dibaca kembali. Percobaan dengan email yang tidak terdaftar tidak punya perusahaan, jadi tidak tampil di halaman ini.
- "Masuk dikunci sementara karena terlalu banyak percobaan": Inbils menolak karena terlalu banyak percobaan. Satu baris per rute dan alamat IP dalam 15 menit.
- "Tautan atur ulang kata sandi diminta" (hanya untuk akun yang ada), "Kata sandi diatur ulang", dan "Kata sandi diubah" (lewat cara apa pun). Barisnya tidak memuat kata sandi.
- "Kode 2FA benar" untuk kode autentikator yang benar, dan "Kode pemulihan 2FA dipakai" untuk kode pemulihan.
- "Peran {nama} ditambahkan ke pengguna" dan "Peran {nama} dicabut dari pengguna". Properti `roles` menyebut nama perannya.

Tindakan tim dukungan Inbils pada perusahaan Anda tampil di modul **Akses dukungan**, dengan **Deskripsi** berupa satu kalimat, misalnya "Tim dukungan Inbils mengatur ulang 2FA Budi Santoso", "Tim dukungan Inbils membuka kunci masuk Budi Santoso", "Tim dukungan Inbils masuk sebagai Budi Santoso", atau "Tim dukungan Inbils menangguhkan perusahaan ini". Kalimat yang sama dipakai di kotak **Pencarian teks** dan di berkas ekspor: cari "kunci masuk" atau nama pengguna yang ditangani untuk menemukan barisnya. Tindakan dukungan yang belum punya kalimat tampil sebagai "Akses dukungan oleh tim Inbils".

Setiap ekspor CSV atau PDF tercatat di modul **Ekspor** sebagai "Data diekspor ke CSV" atau "Data diekspor ke PDF", dengan laporan, filter, jumlah baris, dan tanda terpotong. Barisnya ditulis setelah berkas selesai dikirim, jadi unduhan yang terputus tidak tercatat.

Nilai data pribadi tidak tersimpan di log. Perubahan pelanggan (email, telepon, NPWP, kontak, catatan), kontak dan alamat pelanggan, profil karyawan (telepon, catatan), dan rekening pembayaran perusahaan menulis **[disembunyikan]** sebagai nilai lama dan baru. Yang terlihat hanya kolom apa yang berubah. Baris yang ditulis sebelum pembaruan ini masih menyimpan nilai aslinya sampai dihapus otomatis.

Posisi teknisi juga disembunyikan. Baris "Teknisi check-in di lokasi tiket", "Teknisi check-in di lokasi SPK", dan "Teknisi berangkat ke lokasi SPK" menyimpan di mana teknisi berada. Di dialog **Detail** dan di ekspor, koordinatnya (`lat` dan `lng`) tertulis **[disembunyikan]**. Jarak ke lokasi pelanggan (`distance_m`), apakah itu terlalu jauh (`far`), dan alasannya (`far_reason`) tetap terlihat. Posisi aslinya tetap tersimpan di database.

Inbils juga menyimpan ID permintaan, alamat IP, dan (untuk baris keamanan) jenis browser di database untuk penelusuran oleh pengelola server. Halaman ini tidak menampilkannya dan ekspor log tidak memuatnya.

Baris dihapus otomatis setiap hari: setelah 365 hari, dan setelah 730 hari untuk modul **Keamanan**.

## Membaca detail perubahan

1. Klik **Detail** pada baris log. Dialog berjudul **Detail log aktivitas #&lt;ID&gt;** terbuka.
2. Baca **Ringkasan**: Waktu kejadian (zona waktu perusahaan), Modul, Pelaku, Subjek, dan Deskripsi.
3. Baca bagian **Properti dan perubahan nilai**:
   - Perubahan model tampil sebagai tabel dengan kolom **Kolom**, **Nilai lama**, dan **Nilai baru**.
   - Klik **Lihat JSON lengkap** untuk melihat seluruh properti pada perubahan model.
   - Aktivitas dengan struktur lain menampilkan JSON langsung.
   - Bila tidak ada properti, layar menulis "Tidak ada perubahan properti yang dicatat untuk aktivitas ini."
   - Akun tanpa `report.audit.view` melihat peringatan **Akses properti dibatasi** sebagai pengganti properti.
4. Klik **Salin JSON** untuk menyalin data properti. Tombol berubah menjadi **Tersalin** setelah berhasil. Tombol ini hanya ada bila log mempunyai properti.
5. Klik **Tutup** untuk menutup dialog.

## Mengekspor log

1. Terapkan filter dan urutan yang diperlukan, lalu klik **Terapkan filter**.
2. Klik **Ekspor log**.
3. Pilih **Ekspor CSV** atau **Ekspor PDF**.

Kedua file memuat Waktu, Modul, Deskripsi, Pelaku, dan Subjek, dengan **Modul** ditulis sebagai label (misalnya Tagihan, Permintaan barang) dan **Deskripsi** sebagai kalimat yang sama seperti di layar. CSV memuat lebih banyak kolom: ID, Waktu, Modul, Aksi, Deskripsi, Pelaku, ID pelaku, Subjek, Jenis subjek, ID subjek, dan Properti (JSON). Kolom Aksi, ID, dan Properti hanya ada di CSV. PDF sengaja tidak memuat ID, kode, dan Properti: orang yang membacanya tidak membutuhkannya, dan kop PDF menulis periode serta filter (Pengguna, Modul, Pencarian) dalam kata. Waktu di kedua file memakai zona waktu perusahaan.

Ekspor memakai periode yang sama dengan halaman, paling lama 92 hari. CSV memuat sampai 5.000 baris. PDF memuat paling banyak 300 baris, karena batasnya 1.500 sel dibagi lima kolom, dan di bawah judulnya tertulis "PDF dibatasi 300 baris. Untuk data lengkap, unduh CSV atau persempit periode." Bila baris yang cocok lebih banyak, unduh CSV atau persempit periode.

## Kesalahan umum

- Log audit hanya menampilkan baris milik perusahaan aktif. Baris lama tanpa `company_id` tidak ditampilkan.
- Daftar **Pengguna** hanya berisi anggota perusahaan aktif, yaitu pengguna perusahaan itu dan pengguna perusahaan lain yang diberi akses ke perusahaan aktif. Pengguna tanpa akses ke perusahaan aktif tidak dapat dipilih. Alamat dengan `user_id` pengguna seperti itu, atau yang tidak ada, ditolak dengan kesalahan validasi "Pengguna tidak ditemukan." Log Audit tidak menulis pesan itu di dekat isian. Yang tampil hanya pemberitahuan "Data gagal disimpan. Periksa input." bila server mengembalikan Anda ke layar.
- **Pencarian teks** tidak mencari kolom **Subjek**. Gunakan **Modul**, **Pengguna**, atau kata dari **Deskripsi** untuk mempersempit hasil.
- Isian filter belum berlaku sebelum **Terapkan filter** diklik. **Ekspor log** memakai filter yang terakhir diterapkan.
- Jam di **Waktu** memakai zona waktu perusahaan, bukan jam browser Anda, dan sama dengan zona yang dipakai filter tanggal.
- CSV memuat Properti, sedangkan PDF tidak, dan PDF dibatasi 300 baris. Buka dialog **Detail** atau gunakan CSV bila nilai lama dan baru diperlukan.
- Bila tidak ada hasil, tabel menulis **Tidak ada log aktivitas** dan tombol **Reset filter**.
- Halaman **Akses ditolak** berarti akun tidak memegang `report.audit.view`. Peran bawaan manajer dan staf tidak mempunyai izin ini.
- **Tanggal akhir tidak boleh sebelum tanggal mulai.** muncul di bawah **Periode** bila rentang terbalik.
- **Periode log audit paling lama 92 hari. Persempit periode.** muncul di bawah **Periode** bila rentangnya lebih dari 92 hari. Tabel tetap menampilkan hasil sebelumnya, dan **Ekspor log** memakai periode terakhir yang sah.
- Halaman membuka 7 hari terakhir tanpa Anda memilih tanggal: itu nilai awalnya. Ubah **Periode** untuk melihat baris yang lebih lama. Baris yang melewati masa simpan (365 hari, 730 hari untuk **Keamanan**) sudah terhapus dan tidak bisa dicari.
