---
title: "4. Membuat perusahaan"
description: "Bila kode saran sudah dipakai perusahaan lain, pesan \"Kode sudah dipakai\" tampil di bawah isian Kode perusahaan."
---

## 4.1 Mengisi data perusahaan dan admin pertama


Peran yang dapat memakai: semua operator platform.

1. Klik **Perusahaan baru**.
2. Pada kartu **Data perusahaan**, isi:
   - **Nama perusahaan**, wajib, paling banyak 255 karakter;
   - **Kode perusahaan**, wajib, unik, paling banyak 50 karakter. Gunakan huruf, angka, strip, atau garis bawah. Karakter pertama harus huruf atau angka. Kode yang hanya berbeda huruf besar-kecil dengan kode lain ditolak ("kode sudah digunakan."). Kode terisi sendiri dari nama (huruf besar, tanpa aksen, kata dipisah strip, misalnya "Nusa Net" menjadi `NUSA-NET`) sampai Anda mengetik kode sendiri. Bila Anda mengosongkan isian, kode kembali mengikuti nama begitu nama diubah lagi. Sesaat setelah Anda berhenti mengetik, Inbils memeriksa kodenya. Bila sudah ada, "Kode sudah dipakai" tampil di bawah isian. Pemeriksaan ini hanya untuk kode berformat benar dan tidak menggantikan pemeriksaan saat **Buat perusahaan**;
   - **Zona waktu**, wajib. Ketik untuk mencari, lalu pilih;
   - **Mata uang**, wajib: IDR, USD, SGD, atau EUR;
   - **Logo**, opsional, paling besar 10 MB. Gunakan JPG, PNG, atau WebP. Form juga menulis SVG, tetapi aturan server menolak SVG, jadi jangan memakainya.

   ![Form Perusahaan baru dengan data perusahaan dan admin pertama](~/assets/guide/web/platform-company-create.webp)

   Bila kode saran sudah dipakai perusahaan lain, pesan "Kode sudah dipakai" tampil di bawah isian **Kode perusahaan**.

   ![Isian Kode perusahaan menampilkan "Kode sudah dipakai" setelah nama Demo diketik](~/assets/guide/web/platform-company-create-code-taken.webp)

3. Kode perusahaan tidak dapat diubah setelah dibuat. Kode dipakai untuk mengonfirmasi penangguhan, ekspor, pengajuan hapus, dan mode ubah dukungan. Admin tenant juga hanya dapat membacanya di menu Perusahaan.
4. Logo diubah menjadi WebP dan diperkecil bila sisi terpanjang melebihi 512 piksel.
5. Pada kartu **Admin pertama**, isi **Nama admin** dan **Email admin**. Email harus valid, unik pada seluruh pengguna instalasi, dan paling banyak 255 karakter.

Inbils membuat akun admin dengan kata sandi acak 32 karakter yang tidak diketahui siapa pun. Email akun langsung dianggap terverifikasi. Admin masuk melalui tautan undangan untuk menetapkan kata sandinya sendiri.


## 4.2 Memilih isi awal


Pilih satu nilai pada **Isi awal**:

- **Katalog awal** adalah pilihan standar. Perusahaan mendapat satuan barang, kategori paket, kategori tiket, tiga tingkat SLA, struktur lokasi contoh, profil bandwidth dan kecepatan, delapan paket, serta kategori dan barang inventaris. Tidak ada stok dan tidak ada aset jaringan.
- **Kosong** hanya mengisi satuan barang, kategori paket, dan kategori tiket. Kategori tiket tetap dibuat karena pelanggan tidak dapat membuka tiket tanpa kategori.

Kartu **Data contoh** mempunyai kotak **Isi data contoh**. Gunakan hanya untuk uji coba atau pelatihan.

![Bagian Isi awal dan Data contoh pada form perusahaan dengan Katalog awal dan Kosong](~/assets/guide/web/platform-company-create-demo.webp)

Bila **Isi data contoh** dicentang:

- Inbils memilih dan mengunci **Katalog awal**;
- alert menulis "Data contoh memakai Katalog awal, jadi pilihan Kosong tidak tersedia.";
- job antrean menambah pelanggan, tagihan, SPK, tiket, stok, aset jaringan, organisasi, karyawan, kendaraan, evaluasi, notifikasi, IPAM, dan ODN contoh;
- akun contoh memakai kata sandi acak yang tidak diberitahukan kepada siapa pun;
- data contoh tidak membuat router NAS, akun jaringan, atau pesan WhatsApp.


## 4.3 Membuat tenant dan mengirim undangan


1. Periksa kembali nama dan kode. Perubahan kode tidak tersedia setelah pembuatan.
2. Klik **Buat perusahaan**.
3. Bila berhasil, Inbils membuka halaman tenant dan menulis "Perusahaan dibuat. Undangan dikirim ke admin pertama."
4. Perusahaan langsung aktif. Inbils menyalin templat peran ke perusahaan itu, memberi admin pertama peran **Admin**, lalu menyiapkan keanggotaan bawaan, penomoran, dan pengaturan dasar. Setelah disalin, peran itu milik perusahaan: perubahan templat berikutnya tidak mengubahnya ([bab 8](/docs/guides/platform/role-templates/)).
5. Email undangan memakai subjek **Undangan admin {nama perusahaan} di Inbils** dan tombol **Atur kata sandi**. Tautan berlaku 60 menit.
6. Minta admin menetapkan kata sandi, lalu masuk melalui halaman web tenant.

Email yang membawa tautan kredensial selalu memakai mailer platform (`MAIL_*`), bukan SMTP milik perusahaan. Email dari platform memakai nama Inbils di kepala dan kaki email. Job data contoh memakai antrean `platform`. Tanpa worker `platform`, job tetap menunggu. Detail worker ada di [bagian 11.2](/docs/guides/platform/console-tasks-and-queues/).

Kolom **Masuk terakhir** pada halaman tenant menunjukkan posisi undangan selama admin belum masuk:

- **Antre sejak {waktu}**: notifikasi menunggu antrean;
- **Terkirim {waktu}**: email terkirim dan tautan masih berlaku;
- **Tautan kedaluwarsa**: tautan melewati 60 menit;
- **Gagal terkirim {waktu}**: email gagal setelah seluruh percobaan;
- **Belum pernah**: pengguna belum pernah masuk dan tidak mempunyai status undangan.

### Kesalahan umum

- "Perusahaan belum dapat dibuat. Periksa isian yang ditandai.": baca pesan di bawah setiap isian.
- "kode sudah digunakan.": pilih kode lain. Kode unik pada seluruh perusahaan.
- "Kode sudah dipakai" di bawah isian **Kode perusahaan**: kode itu sudah ada pada perusahaan lain. Ubah kode saran sebelum klik **Buat perusahaan**.
- "Format kode tidak valid.": pakai huruf, angka, strip, atau garis bawah, dan mulai dengan huruf atau angka.
- "email admin sudah digunakan.": akun dengan email itu sudah ada. Jangan membuat akun kedua untuk orang yang sama.
- "Data contoh butuh Katalog awal.": pilih **Katalog awal** atau matikan **Isi data contoh**.
- Logo SVG ditolak dengan "logo harus berupa gambar.": unggah JPG, PNG, atau WebP.
- Perusahaan dibuat tetapi data contoh tidak muncul: pastikan worker `platform` berjalan. Baca **Job gagal** dan **Audit terbaru** untuk kegagalan `tenant.demo_data_failed`.
- Email undangan tidak sampai: periksa status undangan, lalu pakai **Kirim ulang undangan** pada [bagian 5.5](/docs/guides/platform/company-page-and-support-tools/).
