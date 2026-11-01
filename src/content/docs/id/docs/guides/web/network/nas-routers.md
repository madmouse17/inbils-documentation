---
title: "5.3 Router NAS"
description: "Router NAS adalah daftar router perusahaan yang meminta FreeRADIUS memeriksa login pelanggan sebelum membuka internet."
---

Router NAS adalah daftar router perusahaan yang meminta FreeRADIUS memeriksa login pelanggan sebelum membuka internet. Buka menu ini saat Anda mendaftarkan router baru, mengganti alamat atau secret-nya, atau melihat pelanggan yang sedang online di sebuah router.

Peran yang dapat memakai: admin, manajer dan staf untuk melihat, hanya admin untuk mengelola. Izin: `network_asset.nas.view` membuka menu, daftar dan rincian. `network_asset.nas.manage` mendaftarkan, mengubah dan menghapus router. Dengan peran bawaan, admin memegang keduanya, manajer dan staf hanya `network_asset.nas.view`. Router hanya bisa didaftarkan dari aset berjenis Router yang punya **IP manajemen** ([bagian 5.2](/docs/guides/web/network/network-assets/)), atau dibuat bersama pendaftarannya oleh pengguna yang juga memegang Buat aset jaringan (`network_asset.create`). Kode perusahaan harus berisi 1 sampai 24 huruf, angka atau strip, karena kode itu menjadi realm RADIUS.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Jaringan**, lalu klik **Router NAS**.
2. Baca daftar.

   - Kotak **Cari** (petunjuk `Kode, nama, atau alamat NAS`) mencari alamat NAS, serta kode, nama dan **IP manajemen** aset router.
   - Kolom: **Router** (kode aset dengan nama di bawahnya, tautan ke rincian, bisa diurutkan), **Lokasi**, **Alamat NAS**, **Port CoA**, **RADIUS** dan **Aksi**.
   - Lencana di kolom **RADIUS** menunjukkan hasil penulisan router ke FreeRADIUS: **Tertulis ke RADIUS**, **Menunggu ditulis** (belum tercatat berhasil atau gagal) atau **Gagal ditulis** (percobaan gagal, alasannya ada di rincian). Daftar tidak memeriksa lalu lintas router, jadi **Tertulis ke RADIUS** hanya berarti barisnya sudah ditulis. Apakah FreeRADIUS sudah melayani router itu terlihat di lencana halaman rincian.
   - Pemegang `network_asset.nas.manage` melihat tombol **Ubah** di tiap baris, dengan menu **Aksi lainnya** yang berisi **Lihat detail**, dan tombol **Daftarkan router** di kanan atas. Pemegang `network_asset.nas.view` saja melihat tombol **Lihat**.
   - Daftar kosong menampilkan `Belum ada router NAS`, atau `Tidak ada router NAS yang cocok` dengan tombol **Reset filter** bila pencarian tidak menemukan apa pun.

   ![Daftar Router NAS dengan kotak Cari dan kolom RADIUS](~/assets/guide/web/nas-devices.webp)

3. Klik kode router atau **Lihat** (atau **Lihat detail** di menu **Aksi lainnya**) untuk membuka rincian.

## Mendaftarkan router

Siapkan dulu aset berjenis Router dengan **IP manajemen** di Aset Jaringan ([bagian 5.2](/docs/guides/web/network/network-assets/)), atau buat asetnya langsung dari form ini (lihat langkah 2). Siapkan juga secret yang sama dengan yang terpasang di router.

1. Klik **Daftarkan router**.
2. Pilih **Aset router**: ketik kode, nama atau IP manajemen (sedikitnya 2 huruf), lalu pilih. Pilihan memuat aset Router ber-IP manajemen yang belum terdaftar, tertulis `kode - nama - lokasi` dengan IP manajemen di baris bawahnya. Daftar menampilkan paling banyak 20 hasil. Bila tidak ada aset yang bisa dipilih dan Anda tidak memegang Buat aset jaringan (`network_asset.create`), halaman menampilkan `Belum ada aset router yang tersedia. Minta pengelola aset menambahkan aset bertipe Router dengan IP manajemen di Aset Jaringan lebih dulu.` dengan tombol **Aset Jaringan**.

   Bila routernya belum tercatat sebagai aset, pemegang Buat aset jaringan bisa membuatnya dari form ini:

   - Klik **Router belum terdaftar? Buat aset router di sini**. Pilihan **Aset router** berganti dengan dua isian wajib, **Nama router baru** dan **IP manajemen** (petunjuk: "Alamat router di jaringan Anda. Dipakai sebagai alamat NAS dan target CoA."), serta catatan "Asetnya dibuat bersama pendaftaran ini, dengan kode otomatis." Bila belum ada aset router sama sekali, form langsung memakai kedua isian ini.
   - Mengetik **IP manajemen** mengisi **Alamat NAS** juga, selama Anda belum mengetik di isian itu sendiri. **IP manajemen** harus alamat IPv4.
   - Klik **Pilih dari daftar aset** untuk kembali memilih aset yang sudah ada. Tombol ini hanya ada bila ada aset router yang bisa dipilih.
   - Aset dan pendaftarannya dibuat dalam satu langkah, jadi bila salah satunya ditolak, keduanya tidak tersimpan. Aset baru berstatus Tersedia, tanpa lokasi, dan IP manajemennya dicatat di register Alamat IP ([bagian 5.4](/docs/guides/web/network/ip-addresses/)). Alamat yang sudah dipakai ditolak dengan pesan seperti `<alamat> sudah dipakai aset <kode>.` di bawah **IP manajemen**.
   - Server meminta Kelola router NAS (`network_asset.nas.manage`) dan, untuk aset baru, Buat aset jaringan (`network_asset.create`).
3. Isi form pada kartu **Router**:
   - **Alamat NAS**: wajib, alamat IPv4 yang dilihat FreeRADIUS sebagai asal permintaan router. Isinya terisi otomatis dari IP manajemen aset yang Anda pilih dan bisa Anda ubah. Alamat harus unik di seluruh sistem, bukan hanya di perusahaan Anda.
   - **Port CoA**: wajib, bilangan bulat 1 sampai 65535, isian awal `1700`. Ini port `/radius incoming` di MikroTik.
   - **Secret RADIUS**: wajib, 8 sampai 60 karakter ASCII tercetak tanpa spasi, sama dengan secret di router. Klik **Buat secret acak** untuk mengisi 32 huruf dan angka acak yang dibuat di browser Anda, lalu **Salin secret** untuk membawanya ke router. Secret yang dibuat hanya ada di formulir sampai Anda menyimpan, jadi salin sebelum klik **Daftarkan router**.
   - **Realm**: hanya baca. Isinya kode perusahaan dalam huruf kecil. Pelanggan masuk dengan nama pengguna `nama@realm`.

   Kartu **Perintah RouterOS** di bawah formulir menyusun perintah yang perlu ditempel di terminal router: `/radius add ...`, `/radius incoming set accept=yes port=...` dan `/ppp aaa set use-radius=yes accounting=yes interim-update=5m`, dengan secret dan **Alamat NAS** dari formulir. Isi **Alamat FreeRADIUS dari router** (alamat yang dipakai router untuk menjangkau FreeRADIUS) sekali. Inbils tidak menyimpannya di server dan hanya mengingatnya di peramban ini. Klik **Salin perintah**.
4. Klik **Daftarkan router**. Inbils membuka rincian router dan muncul toast "Router NAS didaftarkan." Klik **Batal** untuk kembali ke daftar tanpa menyimpan.

   ![Form Daftarkan Router NAS dengan isian Nama router baru dan IP manajemen, menggantikan pilihan Aset router](~/assets/guide/web/nas-devices-create-asset.webp)

Bila RADIUS belum dikonfigurasi untuk perusahaan ini (kartu **RADIUS** di **Integrasi**, [bagian 8.9](/docs/guides/web/administration/integrations/)) atau basis datanya tidak terjangkau, router tetap tersimpan dan muncul toast peringatan `Tersimpan, tetapi RADIUS belum diperbarui: <alasan> Sinkronisasi mencoba lagi setiap 15 menit.` Lencana **RADIUS** menjadi **Menunggu ditulis** atau **Gagal ditulis** sampai penulisan berhasil.

## Membaca halaman rincian router

Judul halaman `Router NAS` diikuti kode aset, dengan nama aset dan alamat NAS di bawahnya. Tombol **Kembali** selalu tampil. **Ubah** dan **Hapus router** hanya tampil bagi pemegang `network_asset.nas.manage`.

- Peringatan `RADIUS belum dikonfigurasi untuk perusahaan ini. Perubahan disimpan tetapi tidak dikirim ke FreeRADIUS.` muncul bila kartu **RADIUS** di **Integrasi** ([bagian 8.9](/docs/guides/web/administration/integrations/)) belum diisi dan diaktifkan. Admin yang boleh membuka **Integrasi** melihat tombol **Atur di Pengaturan → Integrasi** di peringatan itu. Setiap perusahaan mengisi database FreeRADIUS-nya sendiri, jadi saklar ini tidak lagi ada di pengaturan server.
- Info `Mulai ulang FreeRADIUS setelah menambah NAS ini atau mengganti secret-nya.` selalu muncul. FreeRADIUS membaca daftar router hanya saat start, jadi pengelola server FreeRADIUS yang me-restart-nya. Tidak ada tombolnya di Inbils.
- Kartu **Status** memuat **Klien RADIUS** (lencana), **Terakhir ditulis** (waktu atau `Belum pernah`), **Alamat NAS**, **Target CoA**, **Realm** dan **Secret RADIUS** (`Tersimpan` atau `Belum diisi`). **Target CoA** adalah `IP manajemen:Port CoA`, tujuan permintaan putus sesi. Mengubah **IP manajemen** aset mengubah **Target CoA** tetapi tidak mengubah **Alamat NAS**. Bila penulisan terakhir gagal, kotak **Kesalahan terakhir** memuat alasannya.
- Kartu **Perintah RouterOS** menampilkan perintah yang sama seperti di formulir daftar, dengan tulisan "(secret yang Anda simpan)" sebagai ganti secret. Secret hanya terlihat saat dibuat atau diganti di **Ubah**, jadi ganti penanda itu dengan secret yang Anda simpan sebelum menempel.
- Kartu **Halaman isolir** memuat alamat halaman isolir perusahaan dan tombol **Salin URL**, yang berubah menjadi **Tersalin** sesaat setelah diklik (lihat bagian Isolir otomatis dan halaman isolir).
- Kartu **Sesi terbuka** menampilkan sampai 100 sesi terbuka lewat router ini, dengan kolom **Nama pengguna**, **Alamat**, **Mulai** dan **Terakhir terlihat** (waktu paket terakhir sesi itu). **Nama pengguna** menjadi tautan ke halaman **Akses jaringan** bila Inbils mengenali langganannya. Sesi yang tidak mengirim paket lebih dari 15 menit tidak ditampilkan di tabel ini. Bila kosong, tertulis `Tidak ada sesi terbuka`.
- Untuk router yang sudah punya model, rincian juga memuat kartu **Panel router** dengan gambar port router itu ([bagian 5.6](/docs/guides/web/network/device-panel/)).

Lencana **Klien RADIUS** di kartu **Status** memeriksa lalu lintas router, bukan hanya penulisan barisnya:

| Lencana | Arti |
|---|---|
| **Aktif** | Router sudah mengirim paket accounting sesudah barisnya ditulis, jadi FreeRADIUS melayaninya. Di bawah lencana tertulis **Paket terakhir** diikuti tanggal dan jam. |
| **Menunggu restart FreeRADIUS** | Barisnya sudah ditulis, tetapi router belum mengirim paket sejak itu. FreeRADIUS membaca daftar kliennya hanya saat mulai, jadi ia belum mengenal router ini. Keterangannya: **Menunggu FreeRADIUS dimulai ulang. Router belum mengirim paket sejak ditulis; setelah dimulai ulang, pilih Uji koneksi.** |
| **Menunggu ditulis** | Barisnya belum pernah ditulis ke RADIUS dan belum ada kegagalan tercatat. |
| **Gagal ditulis** | Penulisan terakhir gagal. Alasannya ada di **Kesalahan terakhir**. |
| **Tertulis ke RADIUS** | Barisnya pernah ditulis, tetapi RADIUS tidak menjawab saat halaman dibuka, jadi lalu lintas router tidak dapat diperiksa. |
| **RADIUS belum dikonfigurasi** | Perusahaan belum mengisi dan mengaktifkan kartu **RADIUS** di **Integrasi**. |

Umur paket dan sesi dihitung dengan jam server database RADIUS, bukan jam aplikasi. Server RADIUS yang berada di zona waktu lain tidak membuat paket tampak lama atau sesi tampak basi.

  ![Halaman rincian Router NAS dengan kartu Status dan Halaman isolir](~/assets/guide/web/nas-devices-show.webp)

Dua tombol di halaman ini bekerja saat RADIUS menyala. **Uji koneksi** ada di kartu **Status** dan tampil bagi semua pemegang `network_asset.nas.view`. Tombol itu membaca ulang lencana **Klien RADIUS**, paket terakhir, dan tabel **Sesi terbuka** dari RADIUS tanpa memuat ulang seluruh halaman, lalu menulis **Diperiksa** diikuti jam. **Sinkronkan ke RADIUS** ada di kanan atas dan tampil bagi pemegang `network_asset.nas.manage`. Tombol itu mengantrekan pekerjaan yang menulis router ini ke RADIUS sekarang, tanpa menunggu sapuan tiap 15 menit, dan toast **Sinkronisasi ke RADIUS dijadwalkan.** muncul. Hasilnya tampil di **Terakhir ditulis** atau **Kesalahan terakhir** setelah pekerja antrean selesai, jadi klik **Uji koneksi** beberapa saat kemudian. Klik dua kali hanya mengantrekan satu pekerjaan, dan tombol dibatasi 6 kali per menit. Penulisan yang gagal tetap diulang sendiri tiap 15 menit selama RADIUS menyala. Inbils tidak memulai ulang FreeRADIUS.

## Mengubah router

1. Klik **Ubah** di baris daftar atau di halaman rincian.
2. Ubah isian di halaman **Ubah Router NAS**. **Aset router** dan **Realm** tampil sebagai teks dan tidak bisa diganti. **Alamat NAS** dan **Port CoA** (wajib) memakai aturan yang sama dengan form daftar. Kosongkan **Secret RADIUS** untuk mempertahankan secret yang tersimpan, yang ditandai petunjuk `Secret sudah tersimpan. Kosongkan untuk mempertahankannya.` Untuk mengganti secret, ketik secret baru atau klik **Buat secret acak**, lalu samakan dengan router. Kartu **Perintah RouterOS** ikut menyesuaikan.
3. Klik **Simpan router**. Anda kembali ke rincian dengan toast "Router NAS diperbarui." Inbils menulis ulang ke RADIUS hanya bila **Alamat NAS** atau secret berubah. Klik **Batal** untuk keluar tanpa menyimpan.

## Menghapus router

1. Di halaman rincian, klik **Hapus router**.
2. Baca dialog `Hapus router NAS ini?`, lalu klik **Hapus**. Klik **Batal** untuk batal.
3. Anda kembali ke daftar dan muncul toast "Router NAS dihapus."

Penghapusan tetap berjalan walau router masih punya sesi terbuka atau akun jaringan, karena router mengakhiri sesinya sendiri. Aset Router di Aset Jaringan tidak ikut terhapus. Bila baris klien di FreeRADIUS tidak bisa dihapus, muncul peringatan `Baris klien RADIUS tidak dapat dihapus (RADIUS dimatikan atau tidak terjangkau). Hapus dari tabel nas secara manual.` Pengelola server yang menghapus baris itu dari tabel `nas`.

## Rahasia dan catatan audit

- Inbils menyimpan **Secret RADIUS** router terenkripsi. Kolomnya tersamar, dan tidak ada halaman yang menampilkannya: rincian hanya menulis `Tersimpan` atau `Belum diisi`. Bila secret terlupa, isi secret baru lewat **Ubah** dan samakan dengan router.
- Setelah Anda mengirim form, Inbils mengosongkan kolom secret, juga saat ada galat validasi. Isi ulang secret pada percobaan berikutnya.
- Log audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)) mencatat modul **Perangkat NAS**: pembuatan (`created`), perubahan (`updated`, dengan nama isian yang berubah), penggantian secret (`secret_changed`), permintaan **Sinkronkan ke RADIUS** (`sync_requested`, dengan kode aset), penghapusan (`deleted`), serta kegagalan menulis ke RADIUS (`radius_failed`). Isi secret tidak pernah ikut tercatat.

## Akun jaringan pelanggan

Akun jaringan adalah nama pengguna dan kata sandi yang dipakai satu langganan untuk masuk lewat router perusahaan. Satu langganan punya satu akun. Akun tidak terikat pada satu router: pelanggan boleh masuk lewat router NAS mana pun milik perusahaan.

Izin: `network_asset.account.view` membuka halaman akun, `network_asset.account.manage` membuat, mengubah dan menjalankan **Sinkron ulang**, dan `network_asset.account.reveal` membuka kata sandi. Admin, manajer dan staf bawaan memegang ketiganya.

1. Buka halaman langganan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)), lalu klik **Akses jaringan** di kartu **Aksi langganan**. Tombol ini hanya tampil bagi pemegang `network_asset.account.view`. Dari rincian router, klik **Nama pengguna** di kartu **Sesi terbuka** untuk membuka halaman yang sama.
2. Baca halaman **Akses jaringan**.

   - Kartu **Langganan** memuat **Langganan**, **Status**, **Pelanggan**, **Profil kecepatan** (dengan nama grup RADIUS), **POP layanan** dan **Status yang diharapkan**.
   - **Status yang diharapkan** Aktif berarti akun ada di RADIUS dengan grup kecepatan paket. Diisolir berarti akun ada di grup isolir perusahaan dan sesinya diputus. Alasannya tertulis di bawahnya: `Diisolir karena ditangguhkan.`, `Diisolir karena diblokir.`, atau `Diisolir karena ditangguhkan dan diblokir.` Dihapus berarti akun dihapus dari RADIUS.
   - Kartu **Akun jaringan**, setelah akun dibuat, memuat **Jenis layanan**, **Nama pengguna**, **Status sinkronisasi** (Menunggu, Tersinkron atau Gagal, dengan alasan terakhir), **Grup RADIUS**, **Online**, **Alamat**, **NAS**, **Sesi mulai**, **Terakhir terlihat** dan **Bulan ini** (unggah dan unduh bulan berjalan). Baris **Alamat** sampai **Terakhir terlihat** hanya tampil bila RADIUS punya baris sesi terbuka untuk akun itu. **Terakhir terlihat** menulis jam bila paket terakhir sesi itu datang hari ini, atau tanggal dan jam bila lebih lama. Bila paket terakhir lebih dari 15 menit lalu, baris itu menulis **Data sesi lebih dari 15 menit**, dan **Online** menjadi **Offline**: sesi itu tidak dihitung hidup, misalnya karena router mati atau dimulai ulang tanpa menutup sesinya.
   - Peringatan `RADIUS belum dikonfigurasi untuk perusahaan ini. Perubahan disimpan tetapi tidak dikirim ke FreeRADIUS.` muncul bila kartu **RADIUS** di **Integrasi** ([bagian 8.9](/docs/guides/web/administration/integrations/)) belum diisi dan diaktifkan. Status online dan pemakaian tidak tersedia sampai itu selesai.
   - Langganan yang belum punya akun menampilkan `Langganan ini belum punya akun jaringan.` bagi pengguna tanpa `network_asset.account.manage`.

## Membuat akun jaringan

Langganan tidak boleh berstatus Berhenti, dan profil kecepatan paketnya harus punya **Nama profil RADIUS** ([bagian 4.4](/docs/guides/web/customers-and-services/speed-profiles/)). Tanpa itu halaman menampilkan peringatan `Profil kecepatan paket ini belum punya nama profil RADIUS. Isi dulu di profil kecepatan sebelum membuat akun jaringan.` dan server menolak.

1. Di halaman **Akses jaringan** langganan yang belum punya akun, isi kartu **Buat akun jaringan**:
   - **Jenis layanan**: **PPPoE** (isian awal) atau **Hotspot**.
   - **Nama pengguna**: wajib, 3 sampai 40 huruf kecil, angka, titik, strip atau garis bawah. Inbils menambahkan `@realm` di belakangnya, dan realm tampil di sebelah kolom. Nama lengkap harus unik di seluruh sistem. Bila bentrok, muncul `Nama pengguna ini tidak tersedia.`
   - **Kata sandi**: opsional, 6 sampai 64 karakter tanpa spasi. Kosongkan agar Inbils membuat kata sandi 12 karakter.
2. Klik **Buat akun jaringan**. Muncul toast "Akun jaringan dibuat."
3. Bila Inbils membuat kata sandi, kotak **Kata sandi hanya tampil sekali** menampilkannya dengan tombol **Salin kata sandi** dan **Tutup**. Salin sekarang: kata sandi hilang dari layar setelah Anda klik **Tutup** atau meninggalkan halaman.

## Mengubah akun, sinkron ulang dan membuka kata sandi

- Untuk mengubah akun, isi kartu **Ubah akun jaringan**: **Jenis layanan**, **Nama pengguna** (bagian lokal) dan **Kata sandi**. Kosongkan **Kata sandi** untuk mempertahankan yang lama. Klik **Simpan perubahan** (toast "Akun jaringan diperbarui."). Kartu ini nonaktif bila langganan Berhenti, dengan peringatan `Langganan yang sudah berhenti tidak dapat punya akun jaringan.`
- Untuk menulis ulang akun ke RADIUS dan memutus sesinya yang sedang terbuka, klik **Sinkron ulang** di kanan atas (toast "Sinkron ulang dijadwalkan."). Pakai tombol ini bila kecepatan paket berubah dan sesi lama belum berganti. Setelah router mengonfirmasi pemutusan, halaman menulis **Sesi diputus {jam}, menunggu router menyambung ulang.** dan memeriksa dirinya sendiri tiap 5 detik sampai sesi baru muncul. Catatan ini tampil sampai 30 menit setelah pemutusan. Pemeriksaan otomatis berhenti setelah 5 menit, dan catatan menambah kalimat **Pembaruan otomatis berhenti; muat ulang halaman untuk memeriksa lagi.** Pemeriksaan tiap 5 detik juga berjalan selama pemutusan masih tertunda (peringatan **Router belum menjawab sejak {jam}. Pemutusan sesi dicoba lagi otomatis.**). {jam} berupa jam (misalnya `14:05`) bila kejadiannya hari ini, atau tanggal dan jam bila lebih lama.
- Baris **Alamat** pada kartu **Akun jaringan** memuat lencana **Statis** bila langganan punya alamat statis di Alamat IP ([bagian 5.4](/docs/guides/web/network/ip-addresses/)), atau **Dinamis** bila router yang membagikan alamatnya. Untuk langganan statis, baris **IP statis diharapkan** menulis alamat dan prefiks IPAM-nya. Bila sesi yang sedang online memakai alamat lain, peringatan "Sesi memakai {alamat sesi}, bukan alamat statis {alamat}. Sinkron ulang agar router memberi alamat yang benar." muncul. Pemegang `network_asset.account.manage` melihat tombol **Sinkron ulang dan putuskan sesi** di peringatan itu, yang membuka konfirmasi **Sinkron ulang** yang sama.
- Untuk melihat kata sandi akun, klik **Tampilkan kata sandi** di kanan atas. Dialog `Tampilkan kata sandi?` menyebut bahwa kata sandi tampil satu kali dan pengungkapannya dicatat di log audit. Klik **Tampilkan**, lalu salin kata sandi dari kotak **Kata sandi hanya tampil sekali**. Inbils mencatat entri `secret_revealed` di modul **Akun jaringan** sebelum menampilkan kata sandi.

## Isolir otomatis dan halaman isolir

Isolir menghentikan layanan internet pelanggan sementara: Inbils memindahkan akunnya ke grup isolir di RADIUS dan memutus sesinya. Router yang sudah diatur mengalihkan pelanggan terisolir ke halaman isolir perusahaan. Pengaturan pengalihan itu dikerjakan di router, bukan di Inbils.

Isolir otomatis berjalan bila admin menyalakan **Tangguhkan langganan yang menunggak** di bagian **Penangguhan otomatis** pada **Pengaturan Perusahaan** (menu **Perusahaan**, tombol **Pengaturan**, [bagian 8.1](/docs/guides/web/administration/company/)). Pengaturan ini mati secara awal. **Batas keterlambatan** (1 sampai 60 hari, isian awal 7) menentukan batas hari, dan **Aktifkan kembali saat tagihan lunas** (isian awal menyala) menentukan pembukaan otomatis setelah pembayaran.

Setiap hari pukul 08:00 UTC (15:00 WIB), Inbils mengisolir langganan Aktif yang punya tagihan belum lunas dan sudah lewat lebih dari batas hari. Jatuh tempo tepat pada batas belum cukup. Langganan menjadi Ditangguhkan dengan sumber `overdue`, Log audit mencatat alasan `Automatic isolir: an invoice is more than <N> days past due.`, dan langganan itu tidak menerima tagihan berulang baru selama Ditangguhkan.

Alamat halaman isolir ada di kartu **Halaman isolir** pada rincian router, dan bentuknya `/isolir/` diikuti kode perusahaan. Halaman ini publik, tanpa login dan tanpa data pelanggan. Kode yang salah atau perusahaan nonaktif menghasilkan halaman 404. Halaman menampilkan kedua kemungkinan berikut karena URL tidak membawa identitas pelanggan:

- Bagian tagihan: "Ada tagihan yang belum dibayar? Bayar lewat aplikasi {nama ISP}. Layanan aktif kembali otomatis setelah pembayaran diterima."
- Bagian pembatasan lain: "Dibatasi oleh {nama ISP} karena alasan lain? Hubungi kami."
- Tombol **Telepon**, **WhatsApp**, dan **Buka aplikasi {nama ISP}**. Setiap tombol hanya tampil bila nomor atau tautan aplikasinya tersedia. Halaman tidak punya tombol masuk web.

Nama, telepon, dan WhatsApp berasal dari profil perusahaan. Tautan aplikasi berasal dari alamat Play Store aplikasi pelanggan pada pengaturan sistem.

## Mengaktifkan kembali langganan

Langganan Ditangguhkan kembali Aktif lewat salah satu jalur:

- Otomatis setelah pembayaran, dari tagihan manual maupun Midtrans. Syaratnya: **Aktifkan kembali saat tagihan lunas** menyala, isolir bersumber `overdue`, setiap tagihan yang jatuh tempo paling lambat pada hari isolir sudah lunas, dan tidak ada tagihan belum lunas yang lewat batas hari. Pembayaran sebagian belum cukup. Isolir `manual` tidak pernah dibuka otomatis.
- Manual: di halaman langganan, kartu **Aksi langganan**, klik **Aktifkan kembali**. Aksi ini tidak meminta alasan, perlu izin `customer.subscription.reactivate` (admin dan manajer), dan menampilkan toast "Langganan diaktifkan kembali." Bila langganan tidak Ditangguhkan, server menolak dengan "Langganan harus berstatus Ditangguhkan untuk diaktifkan kembali."

## Mengisolir dan memblokir secara manual

Admin dan manajer bisa mengisolir atau memblokir tanpa menunggu jadwal.

- Isolir karena tunggakan: buka **Tunggakan** ([bagian 7.2](/docs/guides/web/finance-and-reports/arrears/)), lalu klik tombol **Isolir** yang diikuti kode langganan pada baris pelanggan. Tombol ini tampil untuk langganan Aktif bagi pemegang `customer.subscription.suspend`. Di dialog `Isolir langganan <kode>?`, isi **Alasan isolir (wajib)** lalu klik **Isolir**. Toast "Langganan ditangguhkan." muncul. Sumbernya `overdue`, jadi pembayaran bisa membukanya otomatis.
- Penangguhan biasa: di halaman langganan, klik **Tangguhkan**, isi **Alasan** di dialog **Tangguhkan Langganan**, lalu klik **Tangguhkan**. Sumbernya `manual`, jadi hanya **Aktifkan kembali** yang membukanya.
- Blokir internet pada langganan yang belum Berhenti: klik **Blokir internet** di halaman langganan, atau tombol **Blokir** yang diikuti kode langganan di baris **Tunggakan**. Di dialog `Blokir internet <kode>?`, isi **Alasan** (wajib, maksimal 500 karakter), lalu klik **Blokir internet**. Toast "Internet langganan diblokir." muncul. Tombol ini perlu izin `customer.subscription.block`.
- Buka blokir: klik **Buka blokir** di halaman langganan, atau tombol **Buka blokir** yang diikuti kode langganan di baris **Tunggakan**. Di dialog `Buka blokir internet <kode>?`, **Catatan (opsional)** boleh kosong. Klik **Buka blokir**. Toast "Blokir internet langganan dibuka." muncul.

Blokir bukan status. Kartu **Status** di halaman langganan menampilkan baris **Internet** dengan lencana **Diblokir**, **Alasan blokir** dan **Diblokir oleh**, dan halaman **Akses jaringan** menulis `Diisolir karena diblokir.` Baris langganan di **Tunggakan** juga memuat lencana **Diblokir**. Tagihan terus berjalan dan pembayaran tidak mencabut blokir. **Buka blokir** pada langganan Ditangguhkan tidak memulihkan layanan: dialog menyebut `Langganan sedang ditangguhkan, jadi layanan tetap diisolir sampai diaktifkan kembali.` dan langganan tetap terisolir sampai **Aktifkan kembali**.

Server menolak dengan "Internet langganan sudah diblokir." bila langganan sudah diblokir, "Internet langganan tidak sedang diblokir." bila Anda membuka blokir yang tidak ada, dan "Langganan yang sudah berhenti tidak bisa diblokir." bila langganan Berhenti. Tangguhkan yang bukan dari langganan Aktif ditolak dengan "Langganan harus berstatus Aktif untuk ditangguhkan."

## Kesalahan umum

- Pilihan **Aset router** kosong atau router yang dicari tidak ada: aset harus berjenis Router, punya **IP manajemen** dan belum terdaftar. Pesan server yang sesuai: `Pilih aset router milik perusahaan ini yang punya IP manajemen.` dan `Aset router ini sudah terdaftar sebagai router NAS.` Perbaiki asetnya lewat **Ubah** ([bagian 5.2](/docs/guides/web/network/network-assets/)).
- Peringatan `Kode perusahaan tidak dapat dipakai sebagai realm RADIUS (huruf kecil, angka, dan tanda hubung, maksimal 24 karakter). Ubah kode perusahaan sebelum mendaftarkan router.` membuat form pendaftaran tidak tampil: kode perusahaan harus 1 sampai 24 huruf, angka atau strip. Admin mengubah **Kode** di profil perusahaan ([bagian 8.1](/docs/guides/web/administration/company/)). Alamat halaman isolir memuat kode ini, jadi salin ulang alamatnya bila kode berubah.
- `Alamat ini tidak tersedia.`: **Alamat NAS** sudah dipakai router lain di sistem. Isi alamat yang benar-benar menjadi asal permintaan router.
- Secret router ditolak dengan `Gunakan karakter yang dapat dicetak, tanpa spasi.`: pakai 8 sampai 60 karakter ASCII tercetak, tanpa spasi.
- Lencana **Gagal ditulis** atau **Menunggu ditulis** tidak berubah: Inbils belum berhasil menulis router ke RADIUS. Baca **Kesalahan terakhir** di rincian dan pastikan RADIUS menyala di server. Setelah tertulis, minta pengelola server me-restart FreeRADIUS.
- Lencana **Klien RADIUS** menulis **Menunggu restart FreeRADIUS**: barisnya sudah ditulis ke RADIUS, tetapi router belum mengirim paket sejak itu. Minta pengelola server memulai ulang FreeRADIUS, lalu klik **Uji koneksi** di rincian router. Lencana berubah menjadi **Aktif** setelah router mengirim paket. **Sinkronkan ke RADIUS** tidak menggantikan langkah itu, karena tombol hanya menulis ulang barisnya.
- Manajer atau staf tidak melihat **Daftarkan router**, **Ubah** dan **Hapus router**: hanya admin yang punya `network_asset.nas.manage`. Server juga menolak dengan galat 403.
- Akun jaringan ditolak dengan `Profil kecepatan paket ini belum punya nama profil RADIUS.`: isi **Nama profil RADIUS** pada profil kecepatan paket ([bagian 4.4](/docs/guides/web/customers-and-services/speed-profiles/)). Pesan `Langganan yang sudah berhenti tidak dapat punya akun jaringan.` berarti langganannya sudah Berhenti, dan `Langganan ini sudah punya akun jaringan.` berarti akunnya sudah ada.
- Kata sandi akun ditolak dengan `Kata sandi tidak boleh berisi spasi.`: pakai 6 sampai 64 karakter tanpa spasi. Nama pengguna ditolak dengan `Gunakan 3 sampai 40 huruf kecil, angka, titik, tanda hubung, atau garis bawah.`: pakai hanya karakter itu.
- **Tampilkan kata sandi** dan **Sinkron ulang** mengembalikan galat setelah dipakai berulang: server membatasi **Tampilkan kata sandi** 10 kali per menit dan **Sinkron ulang** 6 kali per menit.
- Pelanggan sudah membayar tetapi tetap terisolir: periksa sumber isolirnya. Isolir `manual` dan blokir tidak dibuka oleh pembayaran. Periksa juga apakah **Aktifkan kembali saat tagihan lunas** menyala, tidak ada tagihan belum lunas yang lewat batas hari, dan setiap tagihan yang jatuh tempo paling lambat pada hari isolir sudah lunas.
- Pelanggan yang diblokir manual melihat satu halaman yang menjelaskan kemungkinan tunggakan dan pembatasan lain. Halaman tidak mengetahui penyebab isolir pelanggan. Minta pelanggan memakai **Telepon** atau **WhatsApp** bila masalahnya bukan tagihan.
