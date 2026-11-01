---
title: "Jaringan, RADIUS, dan IPAM"
description: "Cara Inbils mencatat aset jaringan, lokasi, ODN, dan alamat IP, serta mengelola akun PPPoE dan Hotspot di FreeRADIUS untuk router MikroTik."
---

Modul ini mencakup semua hal fisik dan logis tentang jaringan: perangkat yang Anda miliki, letaknya, serat antara OLT dan pelanggan, rencana alamat IP, dan akun RADIUS yang membuat pelanggan bisa tersambung. Inbils adalah sumber kebenaran untuk aset dan catatan. Inbils tidak memeriksa perangkat dan tidak mengirim konfigurasi ke router. Router MikroTik mengautentikasi pelanggan ke FreeRADIUS, dan Inbils mengelola isi database RADIUS. Layar dijelaskan di [bab Jaringan di panduan web](/docs/guides/web/network/network-assets/).

## Konsep utama

| Konsep | Penjelasan |
|---|---|
| Lokasi | Pohon: `region`, `area`, `pop`, `rack`, `site`. Setiap node selain region butuh induk. Jalurnya disimpan agar cepat dibaca, pemindahan dicek terhadap siklus, dan lokasi yang punya turunan, aset, atau stok tidak bisa dihapus. Lihat [Lokasi](/docs/guides/web/network/locations/). |
| Aset jaringan | Satu perangkat yang dilacak (router, switch, OLT, ONU/ONT, radio, antena, fiber, ODP, ODC, rack, power, lainnya) dengan nomor seri (unik per perusahaan), MAC dan IP, lokasi, kepemilikan (`owned`, `leased`, `customer_provided`), dan status. Lihat [Aset Jaringan](/docs/guides/web/network/network-assets/). |
| Riwayat pemasangan | Satu baris append-only per pemasangan, pemindahan, atau pelepasan, dengan lokasi, pelanggan, langganan, dan SPK penyebabnya. Tidak pernah diubah atau dihapus. Satu aset punya paling banyak satu pemasangan aktif. |
| IPAM | Register pasif prefix IP, VLAN, dan alamat. |
| ODN | Register pasif port PON, splitter, dan port drop pelanggan. |
| Router NAS | Aset router yang didaftarkan sebagai klien RADIUS. |
| Akun jaringan | User PPPoE atau Hotspot satu langganan di RADIUS. |

## Siklus aset

| Dari | Ke | Pemicu | Efek samping |
|---|---|---|---|
| `available` | `installed` | Pasang, biasanya dari SPK pemasangan | Lokasi, pelanggan, dan langganan diisi, baris riwayat dibuka. |
| `installed` | `available` | Lepas dengan alasan | Lokasi dan tautan dikosongkan, baris riwayat ditutup. |
| `installed` | `maintenance` | Set pemeliharaan | Tetap di lokasinya, diberi tanda. Lanjutkan mengembalikannya ke `installed`. |
| `installed` atau `maintenance` | `damaged` | Tandai rusak | Perlu perbaikan sebelum menjadi `available` lagi. |
| `damaged` | `available` | Perbaikan | Tidak ada. |
| semua | `retired` | Pensiunkan dengan alasan | Final. Baris riwayat ditutup dan tautan langganan dilepas. |

Saat SPK bertipe pemasangan selesai, aset dipasang di lokasi SPK dan langganan diaktifkan (lihat [SPK](/docs/modules/work-orders/)). Halaman lacak mencari aset menurut nomor seri, MAC, IP, pelanggan, atau langganan dan menampilkan jalur lokasinya.

## IPAM

IPAM adalah register: staf mencatat apa yang ada, sistem tidak memindai. Lihat [Alamat IP](/docs/guides/web/network/ip-addresses/).

- **Prefix** adalah blok CIDR IPv4 atau IPv6, dinormalisasi saat disimpan. Prefix bersarang di prefix terkecil yang memuatnya. Duplikat dan overlap sebagian ditolak, CIDR tidak bisa diubah, dan prefix yang punya anak atau alamat tidak bisa dihapus. Penggunaannya `container`, `customer_static`, `customer_dynamic`, atau `infrastructure`, opsional terikat ke POP dan VLAN.
- **VLAN** punya `vid` dari 1 sampai 4094, per POP atau seluruh perusahaan, dan tidak bisa dihapus selama dipakai prefix.
- **Alamat** satu baris masing-masing, dipegang oleh langganan, aset jaringan, atau reservasi (gateway, loopback). Satu langganan memegang paling banyak satu alamat IPv4 dan satu IPv6.
- **Dynamic adalah bawaan.** Langganan tanpa baris alamat mendapat alamat dari pool router. **Static** mengambil alamat bebas terendah dari pool `customer_static` (IPv4, pool /16 atau lebih kecil) atau alamat yang diketik. Alamat yang sudah terpakai ditolak dengan pesan yang menyebut pemegangnya.
- Membuat, mengubah, atau menghapus aset menulis `ip_address` dan `management_ip` ke register dalam transaksi yang sama. `ipam:import-asset-ips {--company=} {--dry-run}` mendaftarkan nilai lama; jalankan dengan `--dry-run` dulu.
- Menghentikan langganan selalu melepas alamat static dan port drop-nya.

## ODN

ODC dan ODP adalah aset bertipe `odc` dan `odp`. **Splitter** (rasio 1:2 sampai 1:64) berada di ODC atau ODP dan mengambil inputnya dari port PON sebuah OLT atau dari output splitter lain. **Drop** mengikat satu langganan ke satu port output bebas sebuah ODP, dan lokasi ODP harus berada di bawah POP pelayan langganan. Perubahan graf fiber satu perusahaan dijalankan satu per satu dengan lock, dan loop ditolak. Drop bisa dipesan saat onboarding (`odn.assign`). Halaman `/admin/odn` menampilkan kapasitas ODP, port PON dengan jumlah pelanggan, dan langganan aktif tanpa drop. Lihat [ODN](/docs/guides/web/network/odn/).

Panel perangkat menggambar router, switch, OLT, ONT, ODC, ODP, dan rak seperti wajah aslinya, dari 14 model bawaan atau tata letak manual, dengan port berwarna menurut keadaan (belum terdaftar, dinonaktifkan, diisolir, online, offline, terpakai, kosong) dan jalur fiber dari port OLT sampai pelanggan. Online berarti ada sesi RADIUS terbuka yang diperbarui dalam 15 menit. Lihat [Panel perangkat](/docs/guides/web/network/device-panel/).

## Router NAS dan FreeRADIUS

Inbils tidak memprovisioning router lewat RouterOS API. Alurnya:

1. Router MikroTik mengautentikasi pelanggan PPPoE dan Hotspot ke FreeRADIUS 3.2.
2. Inbils menulis user, grup kecepatan, dan klien NAS ke database RADIUS perusahaan.
3. Saat perubahan harus berlaku seketika (grup kecepatan baru, alamat static baru, user dihapus), Inbils mengirim Disconnect-Request (RFC 5176, port CoA bawaan 1700) ke router, dan perangkat pelanggan menyambung ulang.

Setiap perusahaan punya database RADIUS sendiri. Realm adalah kode perusahaan huruf kecil, dan setiap username berbentuk `local@realm` (bagian lokal `[a-z0-9._-]`, 3 sampai 40 karakter, unik lintas perusahaan). Perusahaan yang kodenya tidak cocok `^[a-z0-9-]{1,24}$` belum bisa mendaftarkan NAS atau akun.

### Router NAS

Router NAS adalah aset `router` dengan `nasname` (IPv4 yang dilihat FreeRADIUS sebagai sumber paket, unik global), `coa_port` (bawaan 1700), dan shared secret 8 sampai 60 karakter ASCII tercetak. Secret disimpan terenkripsi, hanya bisa ditulis, dan tidak pernah muncul di resource, audit, log, atau pesan flash. Mendaftarkan NAS menulis satu baris ke tabel `nas` di database RADIUS. Menghapus NAS diizinkan walau masih ada akun atau sesi. Lihat [Router NAS](/docs/guides/web/network/nas-routers/).

### Akun jaringan dan grup kecepatan

Pelanggan boleh masuk di NAS mana pun milik perusahaannya. Kata sandi akun terenkripsi di Inbils dan hanya tampil setelah reveal yang diaudit (`network_asset.account.reveal`). Grup ditulis per perusahaan:

| Grup | Atribut |
|---|---|
| `<realm>/<radius_profile_name>` | `Mikrotik-Group`, `Mikrotik-Rate-Limit := <upload>M/<download>M`, `Acct-Interim-Interval := 300` (lihat [Katalog layanan](/docs/modules/service-catalogue/)) |
| `<realm>/isolir` | `Mikrotik-Group := isolir`, `Mikrotik-Address-List := isolir`, `Acct-Interim-Interval := 300` |

Langganan dengan alamat IPv4 static dari IPAM juga mendapat `Framed-IP-Address` di `radreply`. Tanpa alamat, pool router yang menentukan. IPv6 tidak ditulis.

**Keadaan yang diinginkan** dihitung saat job berjalan:

| Langganan | User RADIUS |
|---|---|
| `pending` atau `active`, tidak diblokir | Ada, grup kecepatan |
| `suspended`, atau status apa pun selain terminated dengan blokir | Ada, grup isolir |
| `terminated` atau dihapus | Dihapus |

Halaman akun menampilkan penyebab isolasi (`suspended`, `blocked`, atau keduanya).

### Akun PPPoE dan Hotspot

Staf membuat akun dengan tangan, dan SPK pemasangan pertama membuatnya otomatis: saat pertama kali ditugaskan, `NetworkAccountService::provisionForInstallation` membuat akun `pppoe` untuk langganan, memakai kode pelanggan sebagai bagian lokal (bentrok mendapat `-2`, `-3`), tetapi hanya bila perusahaan mengaktifkan RADIUS. Teknisi yang ditugaskan dapat membaca kredensial SPK pemasangan berstatus `assigned` atau `in_progress` dengan `POST /api/v1/technician/work-orders/{wo}/network-credentials` (5 permintaan per menit per user, tidak pernah di-cache, diaudit). Menugaskan ulang pemasangan `pending` ke teknisi lain mengganti secret.

### Job sinkronisasi dan status

| Item | Perilaku |
|---|---|
| `ApplyNetworkAccountJob` | Unik per akun sampai diproses, 5 percobaan, backoff 30, 120, 300, dan 900 detik, timeout 60 detik. Galat database RADIUS atau Disconnect yang tidak dijawab mengulang dan membiarkan akun `pending`. Input yang tidak bisa disimpan RADIUS (tanpa nama profil, realm tidak valid) langsung menandai akun `failed`. |
| Pemicu | Perubahan langganan pada status, paket, atau blokir, menyimpan atau Resync akun, perubahan profil kecepatan, dan assign atau release di IPAM. Aksi bisnis tidak pernah menunggu RADIUS. |
| `network:sync {--company=}` | Tiap 15 menit: mengantre akun yang `pending`, berutang Disconnect, gagal lebih dari sejam, atau drift, dan menulis baris NAS yang belum ada. |
| Resync | Tombol di halaman akun (`network_asset.account.manage`, dibatasi 6 per menit). |

Status online dan pemakaian bulanan dibaca langsung dari `radacct` dan tidak disalin ke Inbils. Sesi terbuka berarti tanpa waktu berhenti dan ada pembaruan dalam 15 menit. Bila RADIUS mati atau tidak terjangkau, halaman tetap tampil tanpa data sesi.

### Grup dan halaman isolir

Pelanggan yang diisolir dialihkan router ke halaman publik `GET /isolir/{kode perusahaan}`. Halaman memuat nama perusahaan, telepon, tautan WhatsApp, email, situs web, dan tautan aplikasi pelanggan, tanpa data pelanggan. Perusahaan yang tidak dikenal atau nonaktif dijawab 404, dan route ini dibatasi laju.

### Kartu perintah RouterOS

Formulir router dan halaman rincian router menampilkan kartu yang menyusun perintah RouterOS untuk router itu: `/radius add service=ppp ...`, `/radius incoming set accept=yes port=...`, dan `/ppp aaa set use-radius=yes accounting=yes interim-update=5m`. Alamat FreeRADIUS diketik sekali dan hanya disimpan di peramban. Formulir juga menawarkan **Buat secret acak** (32 karakter dibuat di peramban). Salin perintah dari kartu agar secret yang Anda simpan yang dipakai.

## Runbook untuk operator

1. Buat database RADIUS terpisah per ISP dari skema standar FreeRADIUS 3.2. User database Inbils butuh `SELECT, INSERT, UPDATE, DELETE` pada `radcheck`, `radreply`, `radusergroup`, `radgroupreply`, dan `nas`, serta `SELECT` pada `radacct` saja. Database ini berisi kata sandi cleartext, jadi batasi jaringannya dan jangan menyimpan backup tanpa enkripsi.
2. Di FreeRADIUS `mods-enabled/sql`, atur `read_clients = yes` dan `client_table = "nas"`. Klien hanya dimuat saat start: **restart FreeRADIUS** setelah mendaftarkan NAS atau mengganti secret-nya (`kill -HUP` tidak cukup).
3. Pasang kebijakan realm `inbils_realm` di `policy.d` dan panggil lebih dulu di `authorize`, menggantikan `filter_username`, supaya satu perusahaan tidak bisa mengautentikasi pelanggan perusahaan lain.
4. Di setiap MikroTik: `/radius add service=ppp,hotspot address=<IP FreeRADIUS> secret=<secret NAS>`, `/ppp aaa set use-radius=yes accounting=yes interim-update=5m`, `/radius incoming set accept=yes port=1700`, profil PPP `isolir` dengan address list `isolir` yang mengalihkan HTTP ke `/isolir/{kode perusahaan}`, dan walled garden untuk host Inbils dan Midtrans.
5. Lakukan onboarding dengan urutan ini: isi kartu RADIUS di Pengaturan, Integrasi dengan **Aktif** mati lalu tekan "Uji koneksi", daftarkan NAS, restart FreeRADIUS, buat akun, nyalakan **Aktif**, jalankan `php artisan network:sync`, dan terakhir atur `auto_suspend_enabled` per perusahaan. Worker queue dan scheduler harus berjalan, kalau tidak akun tetap `pending`. Lihat [Integrasi](/docs/getting-started/integrations/) dan [Queue dan scheduler](/docs/operations/queues-and-scheduler/).
6. Untuk rollback, matikan **Aktif** pada kartu RADIUS. RADIUS menyimpan baris terakhirnya, sesi yang berjalan tetap hidup, dan tidak ada Disconnect yang dikirim.

Bila Anda merotasi `APP_KEY`, simpan kunci lama di `APP_PREVIOUS_KEYS`, kalau tidak semua secret tersimpan tidak terbaca.

## Izin

| Kunci | Fungsi | Templat bawaan |
|---|---|---|
| `network_asset.view`, `.create`, `.update`, `.delete` | Melihat, membuat, mengubah, menghapus aset dan memakai panel perangkat | Lihat: Admin, Manajer, NOC, Teknisi, Staf. Buat dan ubah: Admin, Manajer. Hapus: Admin. |
| `network_asset.install`, `.remove`, `.maintenance`, `.repair`, `.retire` | Aksi siklus hidup | Admin, Manajer |
| `network_asset.nas.view`, `.nas.manage` | Melihat dan mengelola router NAS | Lihat: Admin, Manajer, NOC, Staf. Kelola: Admin. |
| `network_asset.account.view`, `.manage`, `.reveal` | Melihat, mengubah, dan sinkron ulang akun, membuka secret | Admin, Manajer, Staf. NOC punya lihat dan kelola. |
| `location.view`, `.create`, `.update`, `.move`, `.delete` | Pohon lokasi | Admin, Manajer (tanpa hapus) |
| `ipam.view`, `ipam.manage`, `ipam.assign` | Melihat, mengelola, memberi alamat static | Lihat: Admin, Manajer, NOC, Staf, Teknisi. Kelola dan assign: Admin, Manajer. |
| `odn.view`, `odn.manage`, `odn.assign` | Melihat, mengelola port dan splitter, memasang drop | Admin dan Manajer semuanya. NOC dan Staf lihat dan assign. Teknisi lihat. |
| `customer.subscription.block` | Isolir manual | Admin, Manajer, NOC |

Model perangkat OLT dan ODP juga butuh `odn.manage` selain `network_asset.update`. Peran per perusahaan, jadi ini hanya templat awal. Lihat [Izin](/docs/architecture/permissions/).

## Invarian

- Satu pemasangan aktif per aset, dan riwayat pemasangan tidak pernah ditulis ulang.
- Nomor seri dan kode aset unik per perusahaan.
- Satu alamat IP punya satu pemegang, dijaga oleh unique index dan transaksi.
- Satu langganan punya paling banyak satu drop dan satu alamat per keluarga IP.
- Username RADIUS unik lintas perusahaan, dan kebijakan realm perusahaan mencegahnya mengautentikasi user perusahaan lain.
- Secret RADIUS sebuah NAS dan kata sandi sebuah akun tidak pernah dicatat di log atau ditampilkan tanpa reveal yang diaudit.
- Gangguan RADIUS tidak pernah memblokir aksi bisnis: perubahan diulang oleh queue dan `network:sync`.
