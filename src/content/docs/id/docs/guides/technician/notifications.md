---
title: "6. Notifikasi"
description: "Tab Notifikasi adalah kotak masuk pemberitahuan dari Inbils, misalnya SPK baru ditugaskan, tiket ditugaskan, deklarasi material, dan permintaan barang yang"
---

Tab **Notifikasi** adalah kotak masuk pemberitahuan dari Inbils, misalnya SPK baru ditugaskan, tiket ditugaskan, deklarasi material, dan permintaan barang yang siap diambil. Angka merah di ikon tab menunjukkan jumlah yang belum dibaca.

![Tab Notifikasi](~/assets/guide/technician/notifikasi.webp)

Cara memakai:

1. Buka tab **Notifikasi**. Notifikasi yang belum dibaca bertitik biru.
2. Ketuk notifikasi. Aplikasi menandainya sudah dibaca dan membuka layar terkait: SPK, tiket, pengembalian material, atau tab **Material** untuk permintaan barang.
3. Ketuk ikon centang ganda (**Tandai semua dibaca**) di kanan atas untuk membaca semuanya sekaligus.
4. Tarik layar ke bawah untuk memperbarui daftar. Daftar juga diperbarui saat aplikasi dibuka kembali dari latar belakang.

Daftar memuat halaman berikutnya saat Anda menggulir. Bila kosong, aplikasi menulis "Belum ada notifikasi". Notifikasi untuk hal yang tidak dikelola aplikasi ini tetap di daftar dan tidak membuka layar apa pun.

Kesalahan umum: daftar tidak bertambah saat sinyal buruk. Tarik layar ke bawah setelah internet kembali.


## Jenis notifikasi


| Judul | Muncul saat | Push |
| --- | --- | --- |
| SPK baru ditugaskan | Kantor menugaskan SPK kepada Anda. Ketuk untuk membuka SPK. | Ya |
| SPK disetujui | Kantor menyetujui SPK yang Anda kirim untuk review. Isinya menyebut kode SPK. | Ya |
| SPK ditolak | Kantor menolak SPK Anda. Isinya menyebut kode SPK dan alasannya. Perbaiki pekerjaan setelah SPK ditugaskan ulang kepada Anda. | Ya |
| Tiket ditugaskan | Sebuah tiket diserahkan kepada Anda. Judulnya memuat kode dan prioritas, misalnya "Tiket TKT-0031 · Tinggi", dan isinya judul tiket serta "Respons sebelum {jam}". | Ya |
| Respons pertama segera jatuh tempo | Tiket yang ditugaskan perlu direspons dalam 30 menit. Respons berarti Anda menekan **Mulai** pada tiket itu atau mengirim komentar yang bisa dibaca pelanggan. | Ya |
| Batas respons pertama terlewat | Waktu respons pertama tiket sudah lewat. | Ya |
| SLA tiket terlampaui | Tiket melewati batas SLA. | Ya |
| Permintaan barang siap diambil | Gudang menyiapkan barang yang Anda minta. Ketuk untuk membuka tab **Material**. | Ya |
| Notifikasi uji | Anda mengetuk **Kirim notifikasi uji** di **Akun** → **Notifikasi uji** (bagian berikut). Isinya "Notifikasi uji dari {nama ISP}." Tidak membuka layar apa pun. | Ya, hanya ke ponsel yang mengirimnya |

Kolom **Push** menunjukkan notifikasi yang juga masuk ke layar ponsel. Notifikasi lain, misalnya pengembalian material, hanya ada di daftar ini.


## Notifikasi di layar ponsel (push)


Aplikasi bisa memunculkan notifikasi di layar ponsel Android Anda, juga saat aplikasi tertutup, sehingga SPK baru atau tiket yang hampir lewat SLA tidak terlewat. Isinya sama dengan yang ada di tab **Notifikasi**. Aplikasi sendiri yang menggambar notifikasi itu, baik saat terbuka, di latar belakang, maupun tertutup, jadi tampilannya sama di semua keadaan.

1. Setelah Anda masuk, aplikasi dapat meminta izin notifikasi lewat kotak dialog sistem Android. Pertanyaan ini hanya muncul di Android 13 ke atas dan hanya sekali, selama Anda belum memutuskannya.
2. Pilih izinkan. Aplikasi lalu mendaftarkan ponsel ini ke Inbils.
3. Ketuk notifikasi di layar ponsel. Aplikasi membuka layar terkait (SPK, tiket, atau tab **Material**), atau tab **Notifikasi** bila pesan tidak punya layar tujuan, dan menandainya sudah dibaca.
4. Saat aplikasi sedang terbuka, notifikasi tampil sebagai banner singkat di atas layar.
5. Bila beberapa notifikasi menunggu, Android menumpuknya dalam satu kelompok dengan satu baris ringkasan, "{n} notifikasi baru", yang memuat sampai lima judul (judul saja, tanpa isi pesan). Ketuk ringkasan itu untuk membuka tab **Notifikasi**. Ketuk satu notifikasi untuk membuka layar tujuannya. Bila layar itu sudah terbuka, isinya langsung dimuat ulang supaya yang Anda lihat adalah data terbaru, dengan garis tipis di atasnya selama memuat.
6. Nama ISP tampil sebagai teks kecil di notifikasi, bukan di judulnya. Pesan yang tidak punya judul maupun isi tidak ditampilkan di layar ponsel, tetapi daftar di tab **Notifikasi** tetap diperbarui. Daftar di tab **Notifikasi** mempertahankan posisi gulir Anda saat isinya diperbarui.

Bila Anda menolak izinnya, aplikasi tetap berfungsi dan tab **Notifikasi** tetap menerima semuanya. Untuk mengaktifkan push kemudian, nyalakan notifikasi aplikasi Inbils di pengaturan Android (**Pengaturan > Aplikasi**), lalu buka aplikasi lagi. Aplikasi memeriksa izinnya setiap kali dibuka dan mendaftarkan ponsel saat izin sudah menyala.

Saat **Keluar**, aplikasi menghapus pendaftaran ponsel ini, sehingga tidak ada push lagi sampai Anda masuk kembali, dan semua notifikasi aplikasi ini dihapus dari bayangan notifikasi, juga bila ponsel sedang offline. Aplikasi yang tidak punya sesi masuk tidak memunculkan notifikasi apa pun. Ponsel yang dikeluarkan dari **Perangkat** ([bab 7](/docs/guides/technician/account/)), kata sandi yang diganti, atau akun yang dinonaktifkan juga berhenti menerima push.

Bila push tidak muncul, pastikan izin notifikasi menyala, ponsel punya internet dan Anda masih masuk di aplikasi ini. ISP juga harus sudah mengaktifkan push di servernya; bila belum, notifikasi tetap muncul di tab **Notifikasi**. Beberapa merek ponsel (misalnya Xiaomi dan Oppo) menghemat baterai dengan menahan aplikasi yang tertutup. Bila notifikasi datang terlambat atau tidak datang saat aplikasi tertutup, buka pengaturan baterai untuk aplikasi Inbils dan pilih **Tanpa pembatasan** (atau matikan optimalisasi baterai, dan izinkan mulai otomatis bila ponsel memintanya).


## Notifikasi uji


Layar **Notifikasi uji** memeriksa apakah ponsel ini bisa menerima push dari ISP Anda, dan bila tidak, apa yang harus diperbaiki. Pakai saat push tidak muncul, sesudah ganti ponsel atau mengubah pengaturan baterai, atau sesudah masuk di ponsel baru.

1. Buka tab **Akun**, lalu ketuk **Notifikasi uji**. Layar ini butuh internet.
2. Baca tiga pemeriksaan dari atas ke bawah. Tiap pemeriksaan punya ikon dan teks hasil, jadi tidak bergantung pada warna:
   - **Izin notifikasi**: **Diizinkan**, **Belum ditanyakan** (ketuk **Izinkan** untuk memunculkan pertanyaan Android), atau **Diblokir di pengaturan HP** (ketuk **Buka pengaturan**, lalu nyalakan notifikasi aplikasi Inbils). Bila pengaturan tidak terbuka, aplikasi menulis "Pengaturan tidak bisa dibuka. Buka Pengaturan HP, lalu Aplikasi, Inbils, Notifikasi." Aplikasi memeriksa izin lagi saat Anda kembali dari pengaturan.
   - **Token terdaftar di server**: awalnya **Belum diperiksa**. Hasilnya **Terdaftar** diikuti nama ponsel ini, atau **Belum terdaftar** (ketuk **Daftarkan ulang**, lalu kirim notifikasi uji lagi). Bila server belum memasang Firebase, hasilnya "Notifikasi push belum aktif di server" dengan saran **Perbaiki** "Hubungi admin ISP Anda: Firebase server belum dipasang."
   - **Pesan diterima**: **Belum dikirim**, lalu "Menunggu pesan… N dtk" dengan hitungan mundur 30 detik, lalu "Diterima dalam N dtk" atau "Pesan tidak datang dalam 30 detik".
3. Ketuk **Kirim notifikasi uji**. Tombol aktif bila izin sudah **Diizinkan**, token tidak **Belum terdaftar**, dan tidak ada pengiriman yang sedang berjalan. Aplikasi memeriksa izin dan token, lalu meminta server mengirim satu pesan ke ponsel ini saja, bukan ke ponsel lain di akun Anda.
4. Tetap di layar ini selama hitungan mundur. Pesan uji muncul sebagai banner di atas layar dan pemeriksaan **Pesan diterima** menjadi hijau dengan lama kedatangannya. Pesan yang sama tersimpan di tab **Notifikasi** dengan judul "Notifikasi uji".

Bila **Pesan diterima** gagal, baca saran **Perbaiki** di bawahnya: "Periksa internet dan mode hemat baterai, lalu coba lagi. Bila tetap gagal, minta admin memeriksa status Firebase di Pengaturan → Integrasi." Admin ISP melihat status Firebase di halaman web **Integrasi** (kartu **Notifikasi aplikasi (Firebase)**: **Kredensial server** dan **Pengiriman terakhir berhasil**). Mode hemat baterai di beberapa ponsel menahan push untuk aplikasi yang tertutup. Keluarkan Inbils dari pembatasan baterai di pengaturan Android bila itu terjadi.

Kesalahan umum:

- "Terlalu banyak percobaan. Coba lagi dalam N detik.": satu akun boleh mengirim 3 notifikasi uji per menit. Tombol aktif lagi setelah hitungan itu.
- Tombol **Kirim notifikasi uji** tidak bisa diketuk: lihat pemeriksaan **Izin notifikasi** dan **Token terdaftar di server**. Selesaikan saran di bawahnya.
- "Tidak ada koneksi internet. Periksa sinyal, lalu coba lagi.": ponsel tidak punya internet, jadi server tidak bisa menjawab. Nyalakan internet, lalu kirim lagi.
