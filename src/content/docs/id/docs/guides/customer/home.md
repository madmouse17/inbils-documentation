---
title: "2. Beranda"
description: "Beranda adalah tab pertama. Navigasi bawah punya empat tab: Beranda, Tagihan, Bantuan, dan Akun."
---

Beranda adalah tab pertama. Navigasi bawah punya empat tab: **Beranda**, **Tagihan**, **Bantuan**, dan **Akun**.

![Beranda](~/assets/guide/customer/redesign/beranda-blue-light.webp)

Warna aplikasi mengikuti warna merek ISP Anda, dan logo ISP tampil di kiri atas bila ISP sudah mengunggahnya (tanpa logo, tampil bulatan biru Inbils). Isi layar dari atas ke bawah:

1. **Kepala**: logo dan nama ISP di kiri, **ikon lonceng** di kanan. Angka merah di lonceng menunjukkan notifikasi yang belum dibaca. Lihat [bab 7](/docs/guides/customer/notifications/).
2. **Sapaan** "Halo, nama Anda".
3. **Kartu layanan**: satu kartu per langganan Anda. Bila Anda punya lebih dari satu langganan yang berjalan, geser kartu ke samping. Titik di bawahnya menunjukkan posisi kartu. Kartu memuat:
   - **Status** layanan: **Aktif**, **Diisolir**, **Ditangguhkan**, atau **Menunggu**. Ketuk nama paket untuk membuka rincian langganan ([bab 5](/docs/guides/customer/subscriptions/)).
   - Satu baris koneksi, **Online sejak 08.12** atau **Offline, terakhir online 07.55**, pada layanan Aktif, Diisolir, dan Ditangguhkan. Baris ini hanya tampil bila server bisa membaca status koneksi layanan itu.
   - **Tagihan**: "Sisa yang harus dibayar" dengan jumlahnya, tanggal jatuh tempo, dan nomor tagihan. Bila tidak ada tagihan terbuka, kartu menulis "Semua tagihan lunas" dan "Tagihan berikutnya {tanggal}". Warna kartu mengikuti keadaan: warna merek ISP bila aman, warna peringatan bila jatuh tempo dalam 1 sampai 7 hari ("Jatuh tempo 7 hari lagi") atau hari ini ("Jatuh tempo hari ini"), dan merah bila terlambat ("Lewat 3 hari") atau layanan diisolir. Teks dan ikon di dalam kartu menyampaikan hal yang sama, jadi warna bukan satu-satunya petunjuk. Aplikasi menampilkan tagihan terbuka yang paling awal pada semua kartu layanan, lengkap dengan nomornya.
   - Tombol besar **Bayar** membuka tagihan itu (tombolnya **Lihat tagihan** bila tagihan tidak bisa dibayar online). Di bawahnya tertulis QRIS, VA bank, e-wallet, dan minimarket sebagai metode yang bisa muncul di halaman pembayaran. Metode yang benar-benar tersedia ditentukan oleh Midtrans dan ISP.
   - Layanan **Diisolir** karena tunggakan menampilkan semua tagihan yang masih menahan reaktivasi di bawah judul **Lunasi tagihan berikut agar layanan aktif kembali**. Setiap baris memuat nomor, jumlah, dan jatuh tempo, lalu **Total**. Satu tagihan memakai tombol **Bayar**. Dua tagihan atau lebih memakai **Bayar semua (Rp {total})**. Layanan **Ditangguhkan** karena alasan lain menulis "Layanan Anda sedang ditangguhkan. Hubungi {nama ISP} untuk informasi lebih lanjut." dengan tombol **Hubungi ISP**. Layanan **Menunggu** menulis "Layanan Anda belum aktif."
4. **Aksi cepat**: **Bayar**, **Lapor masalah**, **Riwayat pembayaran**, dan **Hubungi ISP**. **Bayar** membuka tagihan paling awal yang belum dibayar, atau tab **Tagihan** bila tidak ada. **Lapor masalah** membuka layar **Ada masalah?** dengan jenis masalah dan langkah cepat ([bab 6](/docs/guides/customer/help-and-tickets/)). **Hubungi ISP** membuka lembar kontak dengan WhatsApp, telepon, email, situs web, dan jam layanan yang diisi ISP. Ketuk satu baris untuk membukanya. Bila ISP belum mengisi kontak, lembar itu mengarahkan Anda ke tab **Bantuan**.
5. **Sedang berjalan**: kunjungan teknisi yang berikutnya, lalu sampai tiga tiket aktif Anda. Kartu kunjungan memuat nomor SPK, jenis kunjungan (misalnya **Instalasi** atau **Perawatan**), tahap sekarang (**Ditugaskan**, **Dalam perjalanan**, atau **Sedang dikerjakan**), dan tanggal jadwal bila ada. Ketuk kartu itu untuk membuka detail kunjungan (bagian **Kunjungan teknisi** di [bab 5](/docs/guides/customer/subscriptions/)). Kartu tiket menampilkan statusnya; ketuk satu tiket untuk membukanya, atau **Lihat semua** untuk ke tab **Bantuan**. Bila tidak ada kunjungan dan tidak ada tiket, tertulis "Tidak ada tiket aktif".

   ![Beranda dengan kartu kunjungan SPK pada bagian Sedang berjalan, tahap Dalam perjalanan](~/assets/guide/customer/redesign/kunjungan-beranda-dalam-perjalanan.webp)

Tarik layar ke bawah untuk memuat ulang. Aplikasi juga memuat ulang sendiri saat Anda membuka kembali aplikasi dari latar belakang dan saat Anda berpindah tab (langsung), serta sekitar 1 detik setelah notifikasi terakhir dalam satu rentetan, jadi kartu kunjungan dan angka di lonceng ikut berubah tanpa tarikan. Selama data dimuat ulang, garis tipis berjalan di atas daftar dan isi lama tetap terbaca. Bila satu bagian gagal dimuat, bagian itu menampilkan "Data tidak dapat dimuat." dan tombol **Coba lagi**; bagian lain tetap tampil.

Beranda juga memuat informasi dari ISP:

- **Pengumuman gangguan atau pemeliharaan** tampil sebagai kartu bernada peringatan di atas kartu layanan, selama masa tayangnya. Ketuk kartu untuk membaca isi lengkapnya. Anda juga menerima notifikasi di lonceng (lihat [bab 7](/docs/guides/customer/notifications/)).
- **Pengumuman informasi** dan **banner promo** tampil di bawah bagian Sedang berjalan. Banner bergeser otomatis setiap 5 detik, berhenti saat disentuh, dan punya titik penanda halaman. Ketuk banner untuk membuka tautannya; promo tidak pernah dikirim sebagai notifikasi.
