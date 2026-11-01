---
title: "3.1 Penugasan"
description: "Penugasan adalah antrean tiket dan SPK yang menunggu petugas. Buka menu ini untuk memilih petugas bagi item baru atau untuk mengganti petugas yang sudah"
---

Penugasan adalah antrean tiket dan SPK yang menunggu petugas. Buka menu ini untuk memilih petugas bagi item baru atau untuk mengganti petugas yang sudah dipilih.

Peran yang dapat memakai: admin dan manajer pada peran bawaan, staf tidak. Izin: `ticket.assign` dan `spk.assign` untuk menugaskan item yang belum punya petugas, `ticket.reassign` dan `spk.reassign` untuk mengganti petugas. Menu tampil bila akun Anda aktif dan memegang salah satu dari keempat izin itu. Izin tiket menampilkan tiket di daftar, izin SPK menampilkan SPK.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Operasional**, lalu klik **Penugasan**. Angka di samping menu adalah jumlah tiket dan SPK yang belum ditugaskan dan boleh Anda tugaskan. Angka tidak tampil bila hasilnya 0.

   ![Halaman Penugasan dengan chip ringkasan, filter pencarian, jenis, status penugasan, prioritas, dan periode, serta tabel antrean](~/assets/guide/web/dispatch.webp)

2. Baca deretan chip di atas daftar. Setiap chip memuat nama dan jumlah. Jumlahnya menghitung seluruh antrean perusahaan dan tidak berubah saat Anda memakai filter.
   - Chip **Belum ditugaskan** menghitung tiket dan SPK yang menunggu petugas. Angkanya sama dengan angka di sidebar.
   - Chip **Tiket belum ditugaskan** dan **SPK belum ditugaskan** memecah angka itu per jenis. Chip suatu jenis hanya tampil bila Anda memegang izin untuk jenis itu.
   - Chip **Sudah ditugaskan** menghitung item yang sudah punya petugas dan masih berada di antrean penugasan.
3. Klik sebuah chip untuk mengisi filter. Chip yang aktif berwarna penuh. Chip **Belum ditugaskan**, **Tiket belum ditugaskan**, dan **SPK belum ditugaskan** memilih **Belum ditugaskan** di **Status penugasan**, dan dua chip yang terakhir itu sekaligus mengisi **Jenis**. Chip **Sudah ditugaskan** memilih **Sudah ditugaskan**.
4. Persempit daftar dengan filter di atas tabel:
   - Kotak **Pencarian** ("Cari kode, judul, atau nama pelanggan...") mencari kode, judul, serta nama dan kode pelanggan. Pencarian berjalan sendiri sesaat setelah Anda berhenti mengetik. Tombol **Cari** menjalankan pencarian yang sama.
   - Pilihan **Jenis** berisi **Semua jenis**, **Tiket**, dan **SPK**. Pilihan ini hanya tampil bila Anda memegang izin tiket dan izin SPK.
   - Pilihan **Status penugasan** berisi **Belum ditugaskan**, **Sudah ditugaskan**, dan **Semua status**.
   - Pilihan **Prioritas** berisi **Semua prioritas**, **Rendah**, **Sedang**, **Tinggi**, dan **Mendesak**.
   - Isian **Periode** menyaring tanggal tiket atau SPK dibuat. Isian kosong tertulis "Semua tanggal". Ketik rentang tanggal, atau klik tombol **Buka kalender** lalu pilih tanggal mulai dan tanggal akhir. Popover kalender punya pilihan cepat: **Hari ini**, **7 hari terakhir**, **30 hari terakhir**, **Bulan ini**, **Bulan lalu**, dan **Tahun ini**. Tombol **Hapus rentang tanggal** mengosongkan isian. Tanggal akhir tidak boleh sebelum tanggal awal: pesannya "Tanggal akhir tidak boleh sebelum tanggal awal."
   - Tombol **Reset filter** muncul saat ada filter aktif. Tombol ini mengosongkan filter dan memilih **Belum ditugaskan**.
5. Saat menu baru dibuka, pilihan **Status penugasan** tampak **Belum ditugaskan** (begitu pula chipnya) tetapi belum menyaring apa pun bagi pemegang izin assign dan reassign (admin dan manajer). Daftar memuat item yang belum dan sudah ditugaskan sekaligus. Pilih statusnya sendiri bila ingin menyaring.
6. Baca tabel antrean.
   - Antrean memuat tiket berstatus **Terbuka** dan **Ditugaskan**, serta SPK berstatus **Draf**, **Menunggu penugasan**, **Dikembalikan**, dan **Ditugaskan**. Tiket dan SPK yang sudah dikerjakan tidak ada di sini.
   - Kolom: **Kode** (kode sebagai tautan ke detail bila Anda boleh membukanya, dengan lencana **Tiket** atau **SPK** di bawahnya), **Judul dan kebutuhan** (judul, lalu "Kategori: ..." untuk tiket atau "Jenis: ..." untuk SPK, dan tanda "SLA terlampaui" bila batas SLA lewat), **Pemohon atau pelanggan** (nama dan kode pelanggan; SPK tanpa pelanggan menampilkan pembuatnya), **Prioritas dan umur** (lencana prioritas dan umur item, misalnya "5 jam lalu"), **Batas atau jadwal** ("SLA: ..." untuk tiket, "Jadwal: ..." untuk SPK), **Petugas saat ini** (nama petugas, atau tulisan "Belum ditugaskan"; SPK berstatus **Ditugaskan** yang teknisinya sudah menekan **Saya berangkat** di aplikasi menampilkan lencana **Dalam perjalanan** di bawah nama teknisi), dan **Tindakan** (tombol **Tugaskan** atau **Ganti petugas**).
   - Lencana **Dalam perjalanan** bukan status dan bukan filter. SPK tetap berstatus **Ditugaskan** dan tetap ada di antrean sampai teknisi menekan **Mulai**. Lencana hilang bila SPK dipindah ke teknisi lain, atau dikembalikan lalu ditugaskan lagi.
   - Judul kolom **Kode**, **Judul dan kebutuhan**, dan **Prioritas dan umur** bisa diurutkan. Urutan awal: terbaru di atas.
   - Tanpa data, tabel menampilkan "Tidak ada antrean penugasan" dan "Semua tiket dan SPK sudah punya petugas.". Bila filter aktif, tabel menampilkan "Tidak ada antrean yang cocok" dengan tombol **Reset filter**.
7. Bila akun Anda juga memenuhi syarat **Pekerjaan Saya** ([bagian 3.6](/docs/guides/web/operations/my-work/)), dua tab muncul di atas chip: **Antrean Penugasan** dan **Pekerjaan Saya**. Tab **Pekerjaan Saya** membuka daftar tugas Anda di halaman yang sama.

## Menugaskan atau mengganti petugas

1. Di baris yang dituju, klik **Tugaskan** (item belum punya petugas) atau **Ganti petugas** (item sudah punya petugas). **Tugaskan** butuh `ticket.assign` atau `spk.assign`. **Ganti petugas** butuh `ticket.reassign` atau `spk.reassign`.

   ![Dialog Tugaskan SPK dengan ringkasan item, baris Alasan, Dampak, dan Berikutnya, isian Pilih teknisi lapangan, isian Tanggal kunjungan, serta tombol Batal dan Simpan penugasan](~/assets/guide/web/dispatch-assign.webp)

2. Baca dialog **Tugaskan Tiket** atau **Tugaskan SPK**, yang diikuti kode item. Bagian atas memuat **Judul**, **Pemohon**, **Prioritas**, **Umur antrean**, dan **Batas SLA** (tiket) atau **Jadwal kerja** (SPK). Bila SLA sudah lewat, tampil "SLA sudah terlampaui." Baris **Alasan**, **Dampak**, dan **Berikutnya** menjelaskan akibat penugasan.
3. Pilih petugas di isian **Pilih petugas tiket** (tiket) atau **Pilih teknisi lapangan** (SPK). Isian ini wajib. Ketik untuk mencari, lalu pilih: pencarian memeriksa nama. Tiap pilihan menulis nama petugas disusul jumlah pekerjaan aktifnya, misalnya "{nama} · 2 pekerjaan aktif", dan daftar terurut dari yang paling sedikit. Pekerjaan aktif adalah tiket **Ditugaskan** atau **Dikerjakan** ditambah SPK **Ditugaskan** atau **Dikerjakan** yang dipegang orang itu. Bila jumlahnya berbeda antarpetugas, petugas dengan pekerjaan paling sedikit diberi catatan "Paling sedikit pekerjaan" di bawah namanya. Itu hanya saran: Anda yang memilih. Tombol **Hapus pilihan** di isian mengosongkannya. Saat mengganti petugas, isian sudah berisi petugas lama.
   - Pilihan untuk tiket: pengguna aktif di perusahaan Anda yang memegang `ticket.start`, `ticket.resolve`, atau `ticket.close`.
   - Pilihan untuk SPK: pengguna aktif di perusahaan Anda yang memegang `spk.start` atau `spk.submit` dan punya profil karyawan berstatus Aktif di perusahaan itu.
4. Untuk SPK, isi **Tanggal kunjungan** bila perlu. Isian ini opsional, dengan petunjuk "Opsional. Kosong berarti jadwal SPK tidak berubah." Isian sudah berisi jadwal SPK bila tanggalnya belum lewat, dan kosong bila SPK belum berjadwal atau jadwalnya sudah lewat. Tanggal sebelum hari ini (menurut zona waktu perusahaan) ditolak dengan pesan "Tanggal kunjungan tidak boleh sebelum hari ini." di bawah isian. Tiket tidak punya isian ini.
5. Klik **Simpan penugasan**. Dialog tertutup, daftar dimuat ulang, dan toast hijau muncul dengan bentuk "{kode} ditugaskan ke {nama petugas}." Klik **Batal** untuk menutup dialog tanpa menyimpan.

Setelah penugasan tersimpan:

- Tiket berstatus **Ditugaskan**. Petugas menerima email dan notifikasi Inbils. Sistem mengantrekan pesan WhatsApp ke pelanggan hanya pada penugasan pertama, bukan pada pergantian petugas.
- SPK berstatus **Ditugaskan**. Riwayat penugasan mencatat petugas baru. Saat mengganti petugas, riwayat juga menutup penugasan lama. Sistem mengantrekan pesan WhatsApp ke teknisi yang baru ditunjuk (kode, judul, tanggal kunjungan, tautan SPK), dan satu pesan ke pelanggan pada penugasan pertama bila SPK punya pelanggan dan tanggal kunjungan.
- Item pindah dari **Belum ditugaskan** ke **Sudah ditugaskan**. Teknisi mengerjakannya di aplikasi teknisi. Pengguna web yang ditunjuk membukanya di **Pekerjaan Saya** ([bagian 3.6](/docs/guides/web/operations/my-work/)).

## Menugaskan ulang SPK yang dikembalikan

SPK yang ditolak peninjau di **Persetujuan** ([bagian 3.2](/docs/guides/web/operations/approvals/)) berstatus **Dikembalikan** dan kembali ke antrean ini.

1. Pilih **Sudah ditugaskan** di **Status penugasan**, lalu cari kode SPK itu di kotak **Pencarian**.
2. Klik **Ganti petugas** (butuh `spk.reassign`), pilih teknisi (boleh teknisi yang sama), lalu klik **Simpan penugasan**.
3. SPK kembali berstatus **Ditugaskan**, dan teknisi dapat mengerjakannya lagi.

## Kesalahan umum

- Baris tidak punya tombol **Tugaskan** atau **Ganti petugas**: izin Anda tidak cocok dengan keadaan item. Item tanpa petugas butuh `ticket.assign` atau `spk.assign`, item yang sudah punya petugas butuh `ticket.reassign` atau `spk.reassign`.
- Isian petugas kosong dan **Simpan penugasan** tidak bisa diklik, dengan pesan "Tidak ada petugas tiket aktif yang punya izin menangani jenis ini." (untuk SPK: "teknisi lapangan"): tidak ada pengguna yang memenuhi syarat pada langkah 3. Aktifkan akun di Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)), tambahkan izin lewat Peran ([bagian 8.6](/docs/guides/web/administration/roles/)), dan untuk SPK pastikan profil karyawan aktif di Karyawan ([bagian 8.3](/docs/guides/web/administration/employees/)).
- Pesan merah "Pilih petugas tiket penerima penugasan." (SPK: "Pilih teknisi lapangan penerima penugasan."): isian belum dipilih. Pilih satu nama, lalu simpan lagi.
- Alert **Data berubah** dengan pesan "Konflik penugasan: tiket ini sudah ditugaskan oleh pengguna lain." (SPK: "Konflik penugasan: SPK ini sudah ditugaskan oleh pengguna lain."): pengguna lain mengubah item saat dialog terbuka. Klik **Muat ulang antrean**. Dialog memuat data terbaru, atau menutup bila item tidak bisa ditugaskan lagi. Bila pemuatan ulang gagal, alert **Muat ulang belum berhasil** menjelaskan sebabnya.
- Alert **Terjadi kesalahan** memuat pesan dari server, misalnya bila pengguna yang dipilih bukan petugas perusahaan Anda.
- Penolakan server "Tiket harus berstatus terbuka atau ditugaskan untuk bisa ditugaskan." atau "SPK harus berstatus draf, menunggu penugasan, ditolak, ditugaskan, atau dikerjakan untuk bisa ditugaskan.": status item sudah berubah dan tidak menerima penugasan. Muat ulang halaman.
- Penolakan server "Kebijakan perusahaan melarang menugaskan diri sendiri.": perusahaan Anda melarang menugaskan item ke akun sendiri. Pilih orang lain. Pengaturan larangan ini tidak ada di layar **Pengaturan Perusahaan**.
- Pesan merah "Tanggal kunjungan tidak boleh sebelum hari ini." di bawah **Tanggal kunjungan**: pilih hari ini atau sesudahnya, atau kosongkan isian agar jadwal SPK tidak berubah.
