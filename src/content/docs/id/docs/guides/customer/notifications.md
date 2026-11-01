---
title: "7. Notifikasi"
description: "Ketuk ikon lonceng di pojok kanan atas Beranda. Angka merah di ikon adalah jumlah notifikasi yang belum dibaca."
---

Ketuk ikon **lonceng** di pojok kanan atas Beranda. Angka merah di ikon adalah jumlah notifikasi yang belum dibaca.

![Notifikasi](~/assets/guide/customer/notifikasi.webp)

1. Notifikasi yang belum dibaca tampil dengan huruf tebal.
2. Ketuk satu notifikasi untuk menandainya sudah dibaca. Bila terkait tagihan, tiket, atau kunjungan teknisi, aplikasi langsung membuka tagihan, tiket, atau kunjungan itu.
3. Ketuk **Tandai semua dibaca** untuk menandai semuanya sekaligus.
4. Tarik layar ke bawah untuk memuat ulang; gulir untuk memuat yang lebih lama. Kosong: "Belum ada notifikasi".

   ![Dua notifikasi Teknisi dalam perjalanan yang belum dibaca](~/assets/guide/customer/redesign/kunjungan-notifikasi.webp)

Jenis notifikasi untuk pelanggan:

| Judul | Muncul saat | Push |
| --- | --- | --- |
| Tagihan baru | Tagihan terbit. | Ya |
| Tagihan segera jatuh tempo | Tagihan jatuh tempo besok atau dalam 3 hari. | Ya |
| Tagihan sudah jatuh tempo | Tagihan lewat jatuh tempo. | Ya |
| Pengingat jatuh tempo | Hanya pada notifikasi lama, sebelum pengingat dipisah menjadi dua judul di atas. | Tidak |
| Pembayaran diterima | Pembayaran tercatat. | Ya |
| Tiket dibuat | Tiket Anda tercatat. | Tidak |
| Tiket mulai ditangani | Tiket diserahkan ke petugas. | Tidak |
| Tiket selesai | Petugas menyelesaikan tiket. | Tidak |
| Jadwal kunjungan teknisi | Kunjungan teknisi dijadwalkan. | Tidak |
| Teknisi dalam perjalanan | Teknisi menekan **Saya berangkat** di aplikasinya. Isinya "Teknisi {nama depan} sedang menuju lokasi Anda." Ketuk untuk membuka detail kunjungannya. Pesan ini hanya muncul di aplikasi, tidak di WhatsApp. | Ya |
| Kunjungan teknisi selesai | Teknisi selesai mengerjakan kunjungan di alamat Anda. Isinya "Kunjungan teknisi untuk layanan Anda sudah selesai." Ketuk untuk membuka detail kunjungannya. | Ya |
| Pengumuman baru | ISP menerbitkan pengumuman Gangguan atau Pemeliharaan untuk area atau paket Anda. Isi notifikasi adalah judul pengumuman. Ketuk untuk membuka pengumumannya. | Ya |
| Notifikasi uji | Anda mengetuk **Kirim notifikasi uji** di **Akun** → **Notifikasi uji** (bagian berikut). Isinya "Notifikasi uji dari {nama ISP}." Tidak membuka layar apa pun. | Ya, hanya ke ponsel yang mengirimnya |

Kolom **Push** menunjukkan notifikasi yang juga masuk ke layar ponsel (bagian berikut). Semua notifikasi, termasuk yang tidak dikirim sebagai push, tetap ada di daftar lonceng.

Judul dan isi notifikasi menyebut hal yang penting, tidak hanya jenisnya: nomor tagihan, jumlah, dan jatuh tempo ("Tagihan INV-012", "INV-012 jatuh tempo besok", "Rp 154.600 untuk INV-012 sudah kami terima"), kode tiket, dan cuplikan catatan penyelesaian dengan "Sudah beres?" (ketuk untuk membuka tiket dan menutupnya). Petugas yang membuka kembali tiket Anda juga memberi tahu lewat notifikasi "Tiket {kode} dibuka kembali dan akan ditangani lagi." Notifikasi yang dibuat sebelum pembaruan ini tetap memakai teks umum.


## Notifikasi di layar ponsel (push)


Aplikasi bisa memunculkan notifikasi di layar ponsel Android Anda, juga saat aplikasi tertutup. Isinya sama dengan yang ada di daftar lonceng.

1. Setelah Anda masuk, aplikasi dapat meminta izin notifikasi lewat kotak dialog sistem Android. Pertanyaan ini hanya muncul di Android 13 ke atas dan hanya sekali, selama Anda belum memutuskannya.
2. Pilih izinkan. Aplikasi lalu mendaftarkan ponsel ini ke Inbils, dan notifikasi di kolom **Push** pada tabel di atas masuk ke ponsel.
3. Ketuk notifikasi di layar ponsel. Aplikasi terbuka langsung di tagihan, kunjungan, atau pengumuman terkait. Untuk pesan yang tidak punya layar tujuan, aplikasi membuka daftar notifikasi. Notifikasi itu ditandai sudah dibaca.
4. Saat aplikasi sedang terbuka, notifikasi tampil sebagai banner singkat di atas layar.
5. Bila beberapa notifikasi menunggu, Android menumpuknya dalam satu kelompok dengan satu baris ringkasan, "{n} notifikasi baru", yang memuat sampai lima judul (judul saja, tanpa isi pesan). Ketuk ringkasan itu untuk membuka daftar notifikasi, dan ketuk satu notifikasi untuk membuka layar tujuannya. Bila layar itu sudah terbuka, isinya langsung dimuat ulang supaya yang Anda lihat adalah data terbaru.

Bila Anda menolak izinnya, aplikasi tetap berfungsi dan lonceng tetap menerima semua notifikasi. Untuk mengaktifkan push kemudian, nyalakan notifikasi aplikasi Inbils di pengaturan Android (**Pengaturan > Aplikasi**), lalu buka aplikasi lagi. Aplikasi memeriksa izinnya setiap kali dibuka dan mendaftarkan ponsel saat izin sudah menyala.

Saat **Keluar**, aplikasi menghapus pendaftaran ponsel ini, sehingga tidak ada push lagi sampai Anda masuk kembali, dan semua notifikasi aplikasi ini dihapus dari bayangan notifikasi, juga bila ponsel sedang offline. Aplikasi yang tidak punya sesi masuk tidak memunculkan notifikasi apa pun. Ponsel yang dikeluarkan dari daftar **Perangkat** ([bab 8](/docs/guides/customer/account/)), kata sandi yang diganti, atau akun yang dinonaktifkan juga berhenti menerima push. Push tidak bergantung pada WhatsApp dan tidak membutuhkan persetujuan WhatsApp.

Di layar ponsel, nama ISP tampil sebagai teks kecil di notifikasi, bukan di judulnya. Daftar di lonceng mempertahankan posisi gulir Anda saat isinya diperbarui.

Bila push tidak muncul, pastikan izin notifikasi menyala, ponsel punya internet dan Anda masih masuk di aplikasi ini. ISP juga harus sudah mengaktifkan push di servernya. Bila ISP belum mengaktifkannya, notifikasi tetap muncul di lonceng. Aplikasi sendiri yang menggambar notifikasi, juga saat tertutup. Beberapa merek ponsel (misalnya Xiaomi dan Oppo) menghemat baterai dengan menahan aplikasi yang tertutup. Bila notifikasi datang terlambat atau tidak datang saat aplikasi tertutup, buka pengaturan baterai untuk aplikasi Inbils dan pilih **Tanpa pembatasan** (atau matikan optimalisasi baterai, dan izinkan mulai otomatis bila ponsel memintanya).


## Notifikasi uji


Layar **Notifikasi uji** memeriksa apakah ponsel ini bisa menerima push dari ISP Anda, dan bila tidak, apa yang harus diperbaiki. Pakai saat notifikasi tagihan atau kunjungan tidak muncul di layar ponsel, atau sesudah masuk di ponsel baru.

1. Buka tab **Akun**, lalu ketuk **Notifikasi uji**. Layar ini butuh internet.
2. Baca tiga pemeriksaan dari atas ke bawah. Tiap pemeriksaan punya ikon dan teks hasil, jadi tidak bergantung pada warna:
   - **Izin notifikasi**: **Diizinkan**, **Belum ditanyakan** (ketuk **Izinkan** untuk memunculkan pertanyaan Android), atau **Diblokir di pengaturan HP** (ketuk **Buka pengaturan**, lalu nyalakan notifikasi aplikasi Inbils). Bila pengaturan tidak terbuka, aplikasi menulis "Pengaturan tidak bisa dibuka. Buka Pengaturan HP, lalu Aplikasi, Inbils, Notifikasi." Aplikasi memeriksa izin lagi saat Anda kembali dari pengaturan.
   - **Token terdaftar di server**: awalnya **Belum diperiksa**. Hasilnya **Terdaftar** diikuti nama ponsel ini, atau **Belum terdaftar** (ketuk **Daftarkan ulang**, lalu kirim notifikasi uji lagi). Bila server belum memasang Firebase, hasilnya "Notifikasi push belum aktif di server" dengan saran **Perbaiki** "Hubungi admin ISP Anda: Firebase server belum dipasang."
   - **Pesan diterima**: **Belum dikirim**, lalu "Menunggu pesan… N dtk" dengan hitungan mundur 30 detik, lalu "Diterima dalam N dtk" atau "Pesan tidak datang dalam 30 detik".
3. Ketuk **Kirim notifikasi uji**. Tombol aktif bila izin sudah **Diizinkan**, token tidak **Belum terdaftar**, dan tidak ada pengiriman yang sedang berjalan. Aplikasi memeriksa izin dan token, lalu meminta server mengirim satu pesan ke ponsel ini saja, bukan ke ponsel lain di akun Anda.
4. Tetap di layar ini selama hitungan mundur. Pesan uji muncul sebagai banner di atas layar dan pemeriksaan **Pesan diterima** menjadi hijau dengan lama kedatangannya. Pesan yang sama tersimpan di daftar lonceng dengan judul "Notifikasi uji".

Bila **Pesan diterima** gagal, baca saran **Perbaiki** di bawahnya: "Periksa internet dan mode hemat baterai, lalu coba lagi. Bila tetap gagal, minta admin memeriksa status Firebase di Pengaturan → Integrasi." Hubungi ISP Anda untuk langkah terakhir itu: admin ISP melihat status Firebase di halaman web **Integrasi**. Mode hemat baterai di beberapa ponsel menahan push untuk aplikasi yang tertutup. Keluarkan Inbils dari pembatasan baterai di pengaturan Android bila itu terjadi.

Kesalahan umum:

- "Terlalu banyak percobaan. Coba lagi dalam N detik.": satu akun boleh mengirim 3 notifikasi uji per menit. Tombol aktif lagi setelah hitungan itu.
- Tombol **Kirim notifikasi uji** tidak bisa diketuk: lihat pemeriksaan **Izin notifikasi** dan **Token terdaftar di server**. Selesaikan saran di bawahnya.
- "Tidak ada koneksi internet. Periksa sinyal, lalu coba lagi.": ponsel tidak punya internet, jadi server tidak bisa menjawab. Nyalakan internet, lalu kirim lagi.


## Notifikasi WhatsApp


Selain di aplikasi, ISP dapat mengirim pesan WhatsApp untuk kejadian yang sama. Pesan WhatsApp hanya dikirim bila **semua** syarat ini terpenuhi:

- ISP mengaktifkan WhatsApp untuk perusahaannya.
- Anda sudah **menyetujui** WhatsApp. Persetujuan dicatat oleh petugas ISP; tanpa itu tidak ada pesan, dan notifikasi di aplikasi tetap muncul.
- Nomor telepon Anda adalah nomor seluler Indonesia yang valid. Nomor telepon rumah atau nomor asing dilewati.

Pesan yang dikirim: tagihan terbit, pengingat jatuh tempo (3 hari dan 1 hari sebelum, serta 1 hari sesudah jatuh tempo), pembayaran diterima, tiket dibuat, tiket mulai ditangani, tiket selesai, dan jadwal kunjungan teknisi. Pesan tagihan dan pengingat ditahan di jam tenang (bawaan 21.00-07.00); pesan kejadian lain dikirim segera. Isi pesan memakai templat tetap yang disetujui Meta.

Untuk berhenti, balas pesan dari ISP dengan **STOP** atau **BERHENTI**. Setelah itu tidak ada pesan lagi dari ISP yang Anda balas sampai petugasnya mencatat persetujuan baru. Balasan itu hanya berlaku untuk ISP pemilik nomor WhatsApp yang mengirim pesannya, bukan untuk ISP lain yang melayani Anda. Tautan atau kata sandi tidak pernah dikirim lewat WhatsApp.

Nomor yang dipakai adalah nomor telepon di profil Anda. Anda bisa mengubahnya di **Ubah profil** ([bab 8](/docs/guides/customer/account/)); persetujuan WhatsApp tetap tercatat pada data pelanggan.
