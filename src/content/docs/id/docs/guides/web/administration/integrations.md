---
title: "8.9 Integrasi (Pengaturan → Integrasi)"
description: "Menu Integrasi menyimpan akun layanan milik perusahaan yang sedang aktif."
---

Menu **Integrasi** menyimpan akun layanan milik perusahaan yang sedang aktif: Midtrans untuk pembayaran tagihan online, WhatsApp untuk pesan otomatis, Email (SMTP) untuk email ke pelanggan dan staf, dan RADIUS untuk akun jaringan pelanggan. Setiap perusahaan memakai akunnya sendiri, jadi pembayaran, pesan, email, dan akun jaringan satu ISP tidak lewat akun ISP lain. Layar lain menyebutnya Pengaturan → Integrasi, misalnya tautan di kartu **WhatsApp** pada **Pengaturan Perusahaan**.

Peran yang dapat memakai: admin. Izin: `company.integrations.manage`. Manajer dan staf tidak memegangnya, jadi item **Integrasi** tidak tampil di sidebar mereka dan alamat layarnya ditolak. Pengubahan berlaku untuk perusahaan yang sedang aktif ([bagian 1.6](/docs/guides/web/introduction/switch-company/)). Anak perusahaan mengisi akunnya sendiri: tidak ada pewarisan dari perusahaan induk.

## Membuka dan membaca halaman

1. Di sidebar, buka grup **Administrasi**, lalu klik **Integrasi**. Halaman memuat empat kartu berurutan: **Midtrans**, **WhatsApp**, **Email**, dan **RADIUS**, lalu kartu **Notifikasi aplikasi (Firebase)** yang hanya dibaca.

   ![Halaman Integrasi: banner autentikasi dua langkah dan kartu Midtrans dengan lencana status, saklar Aktif, Server key, Mode, URL notifikasi, tombol Simpan dan Uji koneksi](~/assets/guide/web/company-integrations.webp)

2. Baca baris status di bawah judul tiap kartu. Lencananya:
   - **Tidak diisi**: kartu belum punya data, atau rahasia yang tersimpan tidak bisa dibaca lagi (lihat Kesalahan umum). Teks di sebelahnya: "Belum dikonfigurasi".
   - **Terisi**: data tersimpan tetapi belum diuji sejak terakhir diubah. Teks: "Belum pernah diuji".
   - **Terverifikasi**: uji koneksi terakhir berhasil. Teks: "Terakhir diuji" disusul tanggal dan jam.
   - **Galat**: uji koneksi terakhir gagal. Kotak merah di dalam kartu menulis alasannya.
3. Selama Midtrans, WhatsApp, atau RADIUS belum diisi dan diaktifkan untuk perusahaan ini, layanan itu mati untuk perusahaan ini saja: aplikasi pelanggan tidak menawarkan bayar online, pesan WhatsApp tercatat dilewati, dan akun jaringan tidak ditulis ke RADIUS. Tidak ada cadangan dari akun perusahaan lain. Hanya Email yang punya cadangan, yaitu pengirim platform (lihat bagian Email di bawah).

## Menyimpan sebuah kartu

Setiap kartu punya saklar **Aktif**, isian, tombol **Simpan**, dan tombol **Uji koneksi**. Rahasia (server key, access token, app secret, verify token, kata sandi) hanya bisa diganti, tidak bisa dibaca lagi.

1. Isi atau ubah isian. Kotak rahasia menampilkan keadaannya di dalam isian: "Belum diisi", "tersimpan", atau "tersimpan (••••1234)" yang menunjukkan empat karakter terakhir rahasia yang panjang. Teks bantuan "Kosongkan bila tidak diganti." berarti kotak kosong mempertahankan rahasia yang tersimpan. Rahasia yang Anda ketik menggantikan yang lama.
2. Klik **Simpan**. Dialog **Konfirmasi dengan kode autentikasi** terbuka. Isi **Kode autentikasi** dengan kode 6 digit dari aplikasi autentikator, atau satu kode pemulihan, lalu klik **Simpan** di dialog. Tombol **Batal** menutup dialog tanpa menyimpan.
3. Toast hijau "Integrasi Midtrans disimpan." muncul (nama kartunya berganti sesuai kartu). Kotak rahasia dikosongkan lagi.
4. Klik **Uji koneksi** untuk memeriksa data yang baru disimpan. Lencana pindah dari **Terisi** ke **Terverifikasi** atau **Galat**.

Aturan penyimpanan:

- Autentikasi dua langkah di akun Anda harus menyala ([bagian 1.4](/docs/guides/web/introduction/two-factor-authentication/)). Bila belum, banner kuning "Aktifkan autentikasi dua langkah di Profil untuk menyimpan perubahan." tampil dengan tombol **Buka Profil**, dan **Simpan** tidak bisa diklik.
- Setiap penyimpanan meminta kode, termasuk saat Anda hanya mematikan saklar **Aktif**. Satu kode hanya berlaku sekali dan berganti setiap 30 detik, jadi dua penyimpanan berurutan dalam satu jendela 30 detik butuh kode kedua. Pesan "Kode autentikasi salah atau sudah dipakai." berarti kodenya sudah terpakai atau salah. Kesalahan isian ditolak lebih dulu dan tidak menghabiskan kode.
- Mengubah isian atau rahasia menghapus status **Terverifikasi**: kartu kembali **Terisi** sampai Anda menguji lagi. Menyimpan tanpa mengubah apa pun tidak menghapusnya.
- Setiap penyimpanan tercatat di audit dengan nama isian yang berubah, tidak pernah dengan nilainya.
- Kartu yang **Aktif** harus lengkap. Rahasia wajib yang kosong ditolak dengan "Wajib diisi untuk mengaktifkan integrasi ini." Kartu yang tidak aktif boleh tersimpan setengah terisi.

## Midtrans

Pembayaran tagihan online masuk ke akun Midtrans perusahaan ini.

- **Server key**: rahasia. Harus berawalan `Mid-server-` (produksi) atau `SB-Mid-server-` (sandbox). Wajib saat **Aktif**.
- **Mode**: **Sandbox** (isian awal) atau **Produksi**. Mode harus cocok dengan key. Key sandbox dengan **Produksi** ditolak dengan "Server key sandbox (SB-Mid-server-) tidak bisa dipakai di mode produksi.", dan key produksi dengan **Sandbox** ditolak dengan "Server key produksi (Mid-server-) tidak bisa dipakai di mode sandbox."
- **URL notifikasi**: hanya dibaca, dengan tombol salin. Bentuknya `<alamat aplikasi>/webhooks/midtrans/<kode acak perusahaan>`. Inbils mengirim URL ini ke Midtrans pada setiap pembayaran bila alamat aplikasi memakai https, jadi dashboard Midtrans tidak perlu diubah. Isi **Payment Notification URL** di dashboard Midtrans dengan URL ini bila Anda ingin dashboard sama dengan yang dikirim aplikasi. Setiap perusahaan punya URL sendiri, dan Midtrans hanya diterima bila ditandatangani dengan server key perusahaan itu. URL lama `<alamat aplikasi>/webhooks/midtrans` masih bekerja untuk pembayaran yang sudah berjalan selama masa peralihan.
- **Uji koneksi** menanyakan ke Midtrans status sebuah pesanan contoh. Midtrans yang menjawab "tidak ditemukan" berarti key diterima. Pesan galat yang mungkin: "Server key ditolak Midtrans. Periksa key dan mode: sandbox memakai awalan SB-Mid-server-, produksi Mid-server-." dan "Midtrans tidak dapat dihubungi dalam 5 detik."
- Pada host produksi, key sandbox tidak menerima pembayaran kecuali pengelola server menyetujuinya secara khusus saat mengimpor dari `.env`. Alasannya: pembayaran uji akan tercatat sebagai pembayaran sungguhan.

## WhatsApp

Notifikasi WhatsApp dikirim dari nomor milik perusahaan ini.

- **ID nomor (phone_number_id)**: 5 sampai 30 digit dari Meta. Wajib saat **Aktif**.
- **Access token**, **App secret**, dan **Verify token webhook**: rahasia, ketiganya wajib saat **Aktif**. **Verify token webhook** minimal 16 karakter.
- **URL webhook**: hanya dibaca, dengan tombol salin. Satu alamat yang sama (`<alamat aplikasi>/webhooks/whatsapp`) berlaku untuk semua perusahaan. Tempel di Meta App → WhatsApp → Configuration bersama verify token perusahaan ini. Inbils mengarahkan setiap panggilan ke perusahaan pemilik **ID nomor** itu dan memeriksa tanda tangan dengan **App secret** perusahaan tersebut. Beberapa perusahaan dalam satu grup boleh memakai nomor yang sama, dan tiap perusahaan tetap memakai app secret dan verify token sendiri.
- Balasan `STOP` atau `BERHENTI` dari pelanggan hanya mencabut persetujuan pelanggan di perusahaan pemilik nomor itu ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)). Perusahaan lain dengan nomor telepon pelanggan yang sama tidak terpengaruh.
- **Uji koneksi** mengambil profil nomor dari Meta. Pesan galat yang mungkin: "Access token ditolak Meta (kedaluwarsa atau dicabut).", "phone_number_id tidak ditemukan atau bukan milik token ini.", dan "Token tidak punya izin whatsapp_business_messaging untuk nomor ini." Uji koneksi tidak bisa memeriksa **App secret**. App secret yang salah baru terlihat sebagai panggilan webhook yang ditolak (kode 403) di log server, jadi minta pengelola server memeriksa log itu bila status pesan tidak pernah berubah.
- Aturan lain tidak berpindah ke sini: saklar, jenis pesan, jam tenang, dan batas bulanan tetap di **Pengaturan Perusahaan** ([bagian 8.1](/docs/guides/web/administration/company/)).

## Email

Email ke pelanggan dan staf dikirim dari server SMTP perusahaan ini.

- **Host SMTP** dan **Alamat pengirim**: wajib saat **Aktif**. **Port** (1 sampai 65535, isian awal 587), **Enkripsi** (**STARTTLS** atau **TLS**), **Nama pengguna**, **Kata sandi**, dan **Nama pengirim** opsional.
- Selama kartu nonaktif, atau belum pernah diisi, email dikirim dari pengirim platform. Kartu menulis alamatnya: "Selama nonaktif, email dikirim dari pengirim platform …". Email tidak pernah gagal terkirim hanya karena kartu kosong. Alamat server tetap milik platform, tetapi nama pengirim memakai nama perusahaan Anda, dan kepala serta kaki email menyebut perusahaan Anda (dengan logo bila logonya tersimpan sebagai berkas publik).
- Email yang berisi tautan kredensial (atur ulang kata sandi, verifikasi email, undangan administrator perusahaan, undangan staf, tautan akses pelanggan baru) selalu keluar lewat pengirim platform, bukan lewat SMTP perusahaan ini, dan memakai nama Inbils sebagai pengirim. Isinya boleh menyebut nama perusahaan Anda. Satu akun bisa terdaftar di beberapa perusahaan, dan operator SMTP satu perusahaan tidak boleh membaca tautan yang membuka akun di perusahaan lain.
- **Uji koneksi** mengirim email uji ke alamat email akun Anda, dengan subjek "Email uji Inbils". Periksa kotak masuk Anda dan folder spam. Pesan galat yang mungkin: "Login SMTP ditolak. Periksa nama pengguna dan kata sandi.", "Gagal membuka TLS ke server SMTP. Periksa enkripsi dan port.", dan "Server SMTP menolak alamat pengirim …".

## RADIUS

Akun jaringan pelanggan ditulis ke database FreeRADIUS perusahaan ini. Setiap ISP memakai database FreeRADIUS sendiri.

- **Host**, **Database** (huruf, angka, dan garis bawah), dan **Nama pengguna**: wajib saat **Aktif**. **Port** (isian awal 3306) dan **Kata sandi** opsional.
- Selama kartu nonaktif, tidak ada yang dibaca dari atau ditulis ke database RADIUS, dan tidak ada permintaan putus sesi yang dikirim. Akun jaringan tetap **Menunggu** dengan alasannya ([bagian 4.1](/docs/guides/web/customers-and-services/customers/), **Mengelola akun jaringan**), dan layar **Router NAS** dan **Akses jaringan** menampilkan peringatan "RADIUS belum dikonfigurasi untuk perusahaan ini."
- **Uji koneksi** membuka koneksi ke database, menjalankan pemeriksaan sederhana, lalu memastikan keenam tabel FreeRADIUS ada: `radcheck`, `radreply`, `radusergroup`, `radgroupreply`, `nas`, dan `radacct`. Pesan galat yang mungkin: "Login database RADIUS ditolak. Periksa nama pengguna dan kata sandi.", "Database … tidak ada di server RADIUS.", dan "Tabel FreeRADIUS tidak lengkap: …".
- Rahasia bersama router (RADIUS secret) tidak diisi di sini. Itu tetap di layar **Router NAS** ([bagian 5.3](/docs/guides/web/network/nas-routers/)).

## Pembatasan alamat host

**Host SMTP** dan **Host** RADIUS menolak alamat yang menuju ke server Inbils sendiri atau layanan metadata cloud. Pesan "Host tidak diizinkan: alamat lokal, alamat metadata, atau nama host yang tidak valid." muncul untuk alamat loopback (`127.x`, `localhost`), alamat tautan lokal (`169.254.x`, `fe80::`), alamat tidak ditentukan, dan multicast. Alamat jaringan lokal ISP seperti `10.x`, `172.16.x`, dan `192.168.x` diizinkan karena di situlah server RADIUS dan SMTP biasanya berada. Uji koneksi memeriksa nama host sekali lagi setelah diterjemahkan ke alamat, dan menolak nama yang kini menuju alamat terlarang.

Pemeriksaan ini diulang setiap kali Inbils membuka koneksi ke server itu, tidak hanya saat **Simpan**. Di server produksi, host yang sama dengan database, Redis, atau SMTP milik Inbils sendiri (atau nama yang menuju ke sana) juga ditolak. Host yang ditolak membuat kartu bersikap seolah belum diisi: email keluar lewat pengirim platform dan RADIUS tidak dipakai. Kotak merah di kartu menulis "Host … tidak diizinkan (alamat lokal atau metadata)." untuk semua sebab itu, supaya layar tidak menyebut alamat mana yang milik platform. Bila RADIUS Anda memang berada di server yang namanya sama dengan database Inbils, minta pengelola server memberinya nama atau alamat lain.

## Uji koneksi

1. Klik **Uji koneksi** pada kartu. Tombol aktif bila kartu bukan **Tidak diisi**. Bila belum ada yang tersimpan, server menjawab "Simpan pengaturan Midtrans dulu." (nama layanannya sesuai kartu).
2. Tombol berubah menjadi **Menguji…** dan baris status menampilkan spinner. Uji koneksi berjalan di antrean latar, bukan di halaman, jadi halaman tidak menunggu penyedia layanan. Halaman memeriksa hasilnya setiap 2 detik.
3. Setelah hasil masuk, lencana berubah menjadi **Terverifikasi** atau **Galat**, dan baris status menulis waktu uji terakhir.
4. Uji koneksi selalu memakai data yang sudah tersimpan, bukan yang sedang Anda ketik. Simpan dulu, lalu uji.
5. Satu kartu hanya menjalankan satu uji pada satu waktu: klik kedua saat uji berjalan memunculkan toast "Uji koneksi Midtrans sedang berjalan." Batas klik adalah 5 per menit per pengguna. Hasil tercatat di audit dengan pesannya saja.
6. Bila setelah 30 detik hasil belum ada, banner biru "Uji koneksi masih berjalan; muat ulang halaman nanti." muncul dan halaman berhenti memeriksa. Muat ulang halaman nanti. Uji yang terhenti oleh antrean menulis "Uji koneksi terhenti sebelum selesai." dan lencana menjadi **Galat**.

## Notifikasi aplikasi (Firebase)

Kartu terakhir menunjukkan keadaan pengiriman notifikasi ke aplikasi teknisi dan aplikasi pelanggan. Satu proyek Firebase dimiliki platform dan dipakai semua perusahaan, jadi kartu ini hanya dibaca dan tidak punya isian.

![Kartu Notifikasi aplikasi (Firebase) dengan baris Kredensial server dan Pengiriman terakhir berhasil](~/assets/guide/web/company-integrations-firebase.webp)

- **Kredensial server**: **Terpasang** atau **Belum terpasang**. **Terpasang** berarti jalur berkas kredensial sudah diisi di server, bukan bukti bahwa Firebase menerima pesan. Pengelola server yang memasangnya, bukan layar ini (lihat [`docs/operations/push-notifications.md`](https://github.com/madmouse17/isp_inbils/blob/main/docs/operations/push-notifications.md)).
- **Pengiriman terakhir berhasil**: tanggal dan jam notifikasi terakhir yang diterima Firebase untuk platform ini, atau **Belum ada**. Hanya baris ini yang membuktikan Firebase berfungsi.
- Uji dari ponsel: di aplikasi, buka **Akun** → **Notifikasi uji** dan ketuk **Kirim notifikasi uji** (panduan teknisi [bab 6](/docs/guides/web/inventory/item-requests/) dan panduan pelanggan [bab 7](/docs/guides/web/finance-and-reports/invoices/)). Hasilnya menunjukkan apakah ponsel itu menerima notifikasi, dan saran perbaikan bila tidak.

## Setelah pembaruan: impor dari .env

Sebelum fitur ini, Midtrans, WhatsApp, dan RADIUS memakai satu akun untuk seluruh instalasi dari file `.env` di server. Sekarang `.env` hanya menjadi sumber impor. Setelah pembaruan terpasang, pengelola server menjalankan sekali per perusahaan:

```bash
php artisan inbils:integrations:import-env --company=<kode perusahaan>
```

Perintah menyalin nilai `MIDTRANS_*`, `WHATSAPP_*`, dan `RADIUS_*` ke kartu perusahaan itu, mengaktifkannya, dan mencetak nilai yang disamarkan. Email tidak diimpor: pengirim `.env` tetap menjadi pengirim platform. Sebelum impor dijalankan, atau sebelum admin mengisi kartunya, Midtrans dan WhatsApp mati untuk perusahaan itu. Setelah impor, klik **Uji koneksi** pada tiap kartu untuk memastikan hasilnya.

## Kesalahan umum

- **Simpan** tidak bisa diklik dan banner kuning meminta autentikasi dua langkah: nyalakan 2FA di **Profil** ([bagian 1.4](/docs/guides/web/introduction/two-factor-authentication/)).
- "Kode autentikasi salah atau sudah dipakai.": tunggu kode berikutnya di aplikasi autentikator, atau pakai satu kode pemulihan. Jam ponsel yang menyimpang dari waktu sebenarnya juga menolak kode.
- Kartu berlabel **Tidak diisi** padahal pernah disimpan, dan kotak rahasia berisi "Belum diisi": server kehilangan kunci enkripsi aplikasi (`APP_KEY`) atau kuncinya diganti tanpa `APP_PREVIOUS_KEYS`, sehingga rahasia yang tersimpan tidak terbaca. Isi ulang semua rahasia kartu itu lalu **Simpan**. Penyimpanan itu menggantikan data lama. Pengelola server menyimpan `APP_KEY` dengan cadangan terpisah, dan saat memutarnya memasang kunci lama di `APP_PREVIOUS_KEYS` supaya rahasia tetap terbaca.
- Pesan merah di bawah isian saat **Simpan**: baca teksnya. Yang umum adalah "Wajib diisi untuk mengaktifkan integrasi ini.", aturan key dan mode Midtrans di atas, dan "Host tidak diizinkan: ...".
- Status **Galat** sesudah uji: baca kotak merah di kartu. Perbaiki isian, **Simpan**, lalu **Uji koneksi** lagi.
- WhatsApp **Terverifikasi** tetapi status pesan tidak berubah dari **Antrean** atau **Terkirim**: uji koneksi tidak memeriksa **App secret** dan **URL webhook**. Pastikan keduanya sama dengan yang ada di Meta App, dan minta pengelola server memeriksa log webhook.
- Halaman **Integrasi** menolak dengan keterangan "Konteks perusahaan diperlukan.": tidak ada perusahaan aktif. Pilih perusahaan ([bagian 1.6](/docs/guides/web/introduction/switch-company/)).
