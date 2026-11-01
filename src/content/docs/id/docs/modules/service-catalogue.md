---
title: "Katalog layanan"
description: "Cara Inbils mendefinisikan paket internet, profil bandwidth dan kecepatan, tingkat SLA, pengumuman dan banner promo, serta jalur profil kecepatan ke RADIUS."
---

Katalog layanan adalah daftar yang dijual ISP Anda. Staf memilih paket saat membuat [langganan](/docs/modules/customers/), penagihan menyalin harga darinya, dan tiket membaca tingkat SLA-nya. Katalog juga tempat kecepatan pelanggan ditentukan, karena profil kecepatan paket menjadi batas laju yang diberikan [RADIUS](/docs/modules/network/) ke router. Halaman ini menjelaskan entitas dan aturannya. Untuk layar, lihat [bab Pelanggan & Layanan di panduan web](/docs/guides/web/customers-and-services/service-packages/).

## Konsep utama

| Entitas | Penjelasan |
|---|---|
| Paket layanan | Yang dibeli pelanggan, misalnya "Home 50Mbps". Punya kode unik per perusahaan, harga bulanan (MRC), harga pemasangan sekali bayar (OTC), kontrak minimum dalam bulan (0 berarti tanpa kontrak), kategori, dan tautan ke satu profil bandwidth, satu profil kecepatan, dan satu tingkat SLA. |
| Kategori paket | Mengelompokkan paket (panduan web menjelaskan kategori bawaan **Rumahan**, **Bisnis**, dan **Korporat**). Paket wajib punya kategori. Menonaktifkan kategori menyembunyikan paketnya dari penjualan baru. |
| Profil bandwidth | Unduh dan unggah dalam Mbps, serta `shared` atau `dedicated`. Profil `shared` wajib punya contention ratio (misalnya 8). |
| Profil kecepatan | Unduh dan unggah maksimum dalam Mbps, nilai burst opsional, dan nama grup RADIUS `radius_profile_name`. |
| Tingkat SLA | Target waktu respons dan waktu penyelesaian dalam jam, dengan kalender `24h` (setiap jam dihitung) atau `business` (hanya jam layanan perusahaan yang dihitung). |
| Pengumuman | Pesan untuk pelanggan bertipe informasi, gangguan (**Gangguan**), atau pemeliharaan (**Pemeliharaan**). |
| Banner promo | Gambar dengan tautan, tampil di carousel pada aplikasi pelanggan. |

Setiap data milik satu perusahaan (dibatasi per perusahaan, nama unik per perusahaan, memakai soft delete).

## Versi paket dan harga

Paket menyimpan syarat terkininya di tempat dan menambahkan versi yang tidak dapat diubah setiap kali salah satu syarat berikut berubah: harga bulanan, harga pemasangan, profil bandwidth, profil kecepatan, tingkat SLA, atau kategori. Mengganti nama paket, deskripsi, kontrak minimum, atau saklar aktif tidak membuat versi.

Langganan menyalin harga saat dibuat (`mrc_amount`, ditambah biaya pemasangan), dan tetap berada di versi paket yang dijual kepadanya. Karena itu mengubah harga paket tidak pernah mengubah harga langganan yang ada. Untuk memindahkan pelanggan ke syarat baru, staf memakai **Ganti paket** pada langganan (lihat [Pelanggan dan langganan](/docs/modules/customers/)).

:::caution
Versi mencatat profil mana yang dipilih paket, bukan isi profilnya. Mengubah angka Mbps sebuah profil kecepatan mengubah semua versi dan semua grup RADIUS yang memakainya, termasuk langganan lama. Untuk mengubah syarat hanya bagi penjualan baru, buat profil atau tingkat SLA baru lalu arahkan sebuah paket ke sana.
:::

## Siklus paket

| Keadaan | Arti |
|---|---|
| Aktif | Bisa dipilih untuk langganan baru. |
| Nonaktif | Tidak bisa dipilih untuk langganan baru. Langganan yang berjalan tidak terganggu. Bisa diaktifkan lagi. |
| Dihapus | **Hapus permanen** hanya ditawarkan untuk paket yang belum pernah dipakai langganan mana pun, dalam status apa pun. Selain itu hanya bisa dinonaktifkan. Paket yang dihapus dengan cara lama bisa dipulihkan. |

Profil bandwidth, profil kecepatan, dan tingkat SLA mengikuti pola yang sama. Paket tidak bisa disimpan tanpa ketiga profil dan kategorinya, dan hanya profil serta tingkat yang aktif ditawarkan di formulir.

## Jalur profil kecepatan ke RADIUS

`speed_profiles.radius_profile_name` menamai grup kecepatan RADIUS sebuah paket. Untuk setiap perusahaan dan profil, Inbils menulis satu grup ke database RADIUS, bernama `<realm>/<radius_profile_name>` dengan realm berupa kode perusahaan huruf kecil. Grup itu membawa:

| Atribut | Nilai |
|---|---|
| `Mikrotik-Group` | `<radius_profile_name>` |
| `Mikrotik-Rate-Limit` | `<upload_max>M/<download_max>M` |
| `Acct-Interim-Interval` | `300` |

Aturan yang penting:

- Nilai burst disimpan tetapi tidak dikirim ke RADIUS.
- Saat profil kecepatan berubah, grup ditulis ulang. Login baru memakai laju baru. Sesi yang online memakai laju lama sampai tersambung ulang atau staf menekan **Resync**.
- Paket yang profil kecepatannya tidak punya `radius_profile_name` tidak bisa mendapat akun jaringan.
- Perubahan langganan (status, paket, blokir) diamati oleh modul jaringan, yang mengantre `ApplyNetworkAccountJob`. Sisi Customer tidak pernah memanggil modul jaringan secara langsung.

Mekanisme yang sama dijelaskan dari sisi router di [Jaringan, RADIUS, dan IPAM](/docs/modules/network/).

## Tingkat SLA

Tingkat adalah target kontrak yang diketik staf. Hasilnya tidak diketik: daftar tingkat menampilkan respons tepat waktu dan penyelesaian tepat waktu selama 30 hari terakhir, dihitung dari tiket langganan pada paket tingkat itu. Tingkat berkalender `business` hanya menghitung jam buka yang diatur di pengaturan perusahaan (`service_hours`). Tiket membaca tingkat untuk SLA bawaannya, lihat [Tiket](/docs/modules/ticketing/).

## Pengumuman dan banner promo

Keduanya dikelola di **Pengumuman & Promo** (item terakhir di **Pelanggan & Layanan**) dan tampil di aplikasi pelanggan. Rinciannya ada di [bab pengumuman di panduan web](/docs/guides/web/customers-and-services/announcements-and-promos/).

| Status | Arti | Terlihat oleh pelanggan |
|---|---|---|
| Draf | Disimpan, belum diterbitkan. Bisa dihapus. | Tidak |
| Terjadwal | Diterbitkan, waktu mulai belum tiba. | Tidak, sampai waktu mulai |
| Tayang | Diterbitkan dan berada di dalam periode. | Ya |
| Selesai | Diterbitkan dan waktu selesai sudah lewat. | Tidak |
| Nonaktif | Diterbitkan lalu dinonaktifkan. Tidak bisa diaktifkan lagi. | Tidak |

- **Sasaran**: semua pelanggan, atau lokasi dan kategori paket tertentu. Pelanggan cocok bila punya langganan aktif atau suspended yang POP pelayannya berada di bawah lokasi terpilih dan paketnya masuk kategori terpilih (daftar yang kosong diabaikan).
- **Penerbitan bersifat final**: item yang sudah terbit tidak bisa dihapus, hanya dinonaktifkan.
- **Notifikasi**: pengumuman bertipe gangguan atau pemeliharaan mengirim satu notifikasi aplikasi ke setiap pelanggan sasaran yang punya akun masuk aktif. Pengumuman informasi dan banner tidak pernah memberi notifikasi. Tidak ada pesan WhatsApp untuk pengumuman.
- **Banner**: JPG, PNG, atau WebP, paling besar 2 MB, rasio 2:1 (disarankan 1200 x 600, toleransi 5%). Aplikasi menerima paling banyak 5 banner yang sedang tayang, diurutkan menurut **Urutan** lalu yang terbaru. Gambar banner bersifat privat bagi pelanggan perusahaan yang sama yang cocok dengan sasaran, dan dihapus 180 hari setelah banner selesai. Ketukan dihitung satu kali per pelanggan per banner per hari.
- **Job**: `announcements:publish-scheduled` berjalan tiap menit (jadi notifikasi terjadwal bisa terlambat sekitar satu menit), dan `promo-banners:cleanup-images` berjalan harian. Keduanya butuh scheduler dan, untuk notifikasi, worker queue. Lihat [Queue dan scheduler](/docs/operations/queues-and-scheduler/).

## Yang ditampilkan ke aplikasi

Aplikasi pelanggan membaca `GET api/v1/customer/home-feed`, `GET api/v1/customer/announcements/{announcement}` dan mengirim `POST api/v1/customer/promo-banners/{banner}/tap` (dibatasi oleh `api-promo-tap`). Rincian langganan di aplikasi memuat paket langganan itu. Pengeditan katalog hanya untuk staf, lewat route web di bawah `/admin`: `service-packages`, `bandwidth-profiles`, `speed-profiles`, `sla-tiers`, dan `announcements`.

## Dari mana perusahaan baru mendapat katalog

Saat operator membuat perusahaan di `/platform`, operator memilih `starter` atau `empty`. `empty` hanya mengisi satuan, kategori paket, dan kategori tiket. `starter` menambah tingkat SLA, lokasi Region, Area, dan POP bawaan, profil bandwidth dan kecepatan, paket, kategori barang, dan barang, tanpa stok dan aset jaringan. Lihat [Multi-tenancy](/docs/architecture/multi-tenancy/).

## Izin

| Kunci | Fungsi | Templat bawaan |
|---|---|---|
| `service.view` | Melihat katalog | Admin, Manajer, NOC & Layanan Pelanggan, Staf |
| `service.create` | Membuat paket dan profil | Admin, Manajer |
| `service.update` | Mengubah dan menonaktifkan | Admin, Manajer |
| `service.delete` | Hapus permanen dan pulihkan | Admin |
| `service.export` | Mengekspor paket dan profil | Admin |
| `service.manage` | Izin super | Admin, Manajer |
| `announcement.manage` | Membuat, menerbitkan, menonaktifkan pengumuman dan banner | Admin, Manajer, NOC & Layanan Pelanggan |

Peran dimiliki tiap perusahaan, jadi ini adalah templat yang disalin ke perusahaan baru. Lihat [Izin](/docs/architecture/permissions/).

## Invarian

- Kode paket dan nama profil unik per perusahaan.
- Profil bandwidth shared selalu punya contention ratio.
- Paket selalu punya profil bandwidth, profil kecepatan, tingkat SLA, dan kategori.
- Harga langganan adalah salinan, jadi perubahan paket tidak pernah mengubah langganan yang ada.
- Menonaktifkan paket tidak pernah menghentikan langganan yang berjalan.
- Paket yang pernah dipakai langganan mana pun tidak bisa dihapus permanen.
- Pengumuman atau banner yang sudah terbit dinonaktifkan, tidak pernah dihapus.
