---
title: "Pelanggan dan langganan"
description: "Cara Inbils memodelkan pelanggan, alamat, kontak, dan langganan, siklus langganan, isolir, ganti paket, penghentian, dan onboarding pelanggan."
---

Pelanggan di Inbils adalah orang atau badan usaha yang membeli internet dari ISP Anda. Langganan adalah layanan internet milik pelanggan itu, terikat pada satu paket layanan dan satu alamat pemasangan. Pelanggan dan langganan adalah catatan pusat produk ini: SPK, tiket, tagihan, aset jaringan, dan laporan semuanya merujuk ke keduanya. Halaman ini menjelaskan perilakunya. Untuk langkah demi langkah di layar, lihat [bab Pelanggan di panduan web](/docs/guides/web/customers-and-services/customers/).

## Konsep utama

| Konsep | Penjelasan |
|---|---|
| Pelanggan | `Individual` atau `Company`. Kode unik per perusahaan (format bawaan `CUS-{NNNNN}`). Pelanggan `Company` wajib punya NPWP dan contact person. Memakai soft delete. |
| Alamat | Satu pelanggan bisa punya beberapa alamat (rumah, kantor, cabang). Paling banyak satu menjadi titik pemasangan, yaitu tempat layanan diantarkan. Menetapkan titik pemasangan baru menghapus yang lama. Lintang dan bujur disimpan. |
| Kontak | Orang yang dihubungi untuk urusan pelanggan. Boleh beberapa per pelanggan, tepat satu menjadi utama. Pendaftaran butuh minimal satu. |
| Dokumen | Berkas yang dilampirkan pada pelanggan. Perintah harian `customers:document-expiry` memberi tahu staf yang boleh mengubah pelanggan saat dokumen hampir kedaluwarsa (30 hari sebelumnya). |
| Langganan | Satu layanan internet milik pelanggan (format kode `SUB-{YEAR}-{NNNNN}`). Menghubungkan [paket layanan](/docs/modules/service-catalogue/), alamat pemasangan, aset ONT opsional, dan POP pelayan opsional. Langganan juga memegang kolom penagihan, jadi tidak ada langganan penagihan terpisah. |
| Status pelanggan | Rangkuman dari langganan pelanggan, tidak pernah diubah manual (lihat di bawah). |
| Saklar akun | `is_active` pada pelanggan, tampil sebagai **Account** di UI. Saklar manual, terpisah dari status. |
| Acquired by | Staf yang dikreditkan karena mendapatkan pelanggan. Hanya atribusi, bukan komisi. |

Kode pelanggan dan kode langganan dibuat dengan lock, jadi dua pembuatan serentak tidak pernah mendapat kode yang sama.

## Siklus langganan

`SubscriptionService` adalah satu-satunya kode yang mengubah status langganan. Setiap transisi menulis audit dan menghitung ulang status pelanggan di transaksi yang sama.

| Dari | Ke | Pemicu | Yang terjadi |
|---|---|---|---|
| (baru) | `pending` | Buat langganan | `mrc_amount` disalin dari harga paket dan boleh diubah. `billing_day` bernilai 1 sampai 28. |
| `pending` | `active` | Aktivasi: SPK pemasangan selesai, atau manual | `activation_date` diisi dan `next_invoice_date` menjadi tanggal tagihan berikutnya. SPK pemasangan yang selesai juga menghubungkan aset ONT. |
| `active` | `suspended` | Suspend (manual, atau isolir karena tagihan lewat jatuh tempo) | `suspension_source` bernilai `manual` atau `overdue`. Pembuatan tagihan berulang melewati langganan ini. |
| `suspended` | `active` | Reaktivasi (manual, atau otomatis setelah pembayaran) | `suspension_source` dikosongkan dan tagihan berulang berjalan lagi. |
| `active` atau `suspended` | `terminated` | Hentikan dengan alasan dan pelepasan ONT opsional | `terminated_at` dan `terminated_reason` diisi, penagihan berulang berhenti, ONT bisa kembali ke `available`. |

Transisi yang tidak valid ditolak dengan 422, misalnya men-suspend langganan yang sudah suspended.

### Isolir (suspend karena belum bayar)

Isolir berarti memindahkan pelanggan ke jaringan terbatas sampai mereka membayar. Ada dua sumber:

- **Manual**: staf men-suspend dari halaman langganan. Suspend manual tidak pernah dibuka otomatis.
- **Overdue**: staf menekan **Isolir** di layar piutang ([Tunggakan di panduan web](/docs/guides/web/finance-and-reports/arrears/)), atau perintah terjadwal `billing:suspend-overdue` berjalan setiap hari pukul 08:00. Perintah ini hanya bekerja untuk perusahaan yang mengaktifkan `auto_suspend_enabled`. Masa tenggang adalah `auto_suspend_overdue_days` (bawaan 7 hari).

Setelah pembayaran dicatat, langganan aktif kembali sendiri bila pengaturan perusahaan `auto_reactivate_on_payment` menyala (bawaan menyala), sumber suspend adalah `overdue`, dan tidak ada tagihan langganan itu yang masih lewat masa tenggang.

Langganan yang di-suspend dipindahkan ke grup isolir di RADIUS dan sesinya dialihkan ke halaman isolir publik. Lihat [Jaringan, RADIUS, dan IPAM](/docs/modules/network/).

### Blokir dan buka blokir

Blokir adalah isolasi jaringan manual yang bukan status. Berlaku untuk langganan `pending`, `active`, atau `suspended`, wajib beralasan (maksimal 500 karakter), dan tidak mengubah penagihan. Ditolak untuk langganan yang sudah berhenti dan langganan yang sudah diblokir. Membuka blokir langganan `suspended` membiarkannya tetap suspended, jadi jaringan tetap terisolasi sampai direaktivasi. Penghentian membersihkan blokir.

## Status pelanggan

`customers.customer_status` diturunkan dari langganan pelanggan yang belum dihapus oleh `CustomerStatusRecalculator`. Aturan pertama yang cocok menang:

| Aturan | Status |
|---|---|
| Ada langganan `active` | `active` |
| Ada langganan `suspended` | `suspended` |
| Tidak ada langganan, atau semuanya `pending` | `prospective` |
| Semuanya `terminated` | `terminated` |
| Selain itu (misalnya `terminated` ditambah `pending`) | `inactive` |

Penulisan langsung ke database (seeder, tinker) melewati penghitungan ulang. Perbaiki dengan:

```bash
php artisan customers:recalculate-status {--company=} {--dry-run}
```

## Ganti paket

**Ganti paket** di halaman langganan memindahkan langganan ke versi terbaru sebuah paket. Butuh `customer.subscription.manage` dan tidak tersedia untuk langganan yang sudah berhenti. Biaya bulanan bawaannya mengikuti harga versi baru dan boleh diubah. Biaya pemasangan mengikuti versi baru hanya selama langganan masih `pending`. Tagihan yang sudah terbit tidak berubah dan tidak ada prorata. Profil kecepatan (dan karena itu grup RADIUS) serta tingkat SLA versi baru berlaku, dan tiap perubahan diaudit sebagai `package_changed`. Mengubah langganan tidak lagi memindahkan paketnya.

## Dampak penghentian

Dialog hentikan menampilkan dampaknya sebelum staf mengonfirmasi:

- Akun PPPoE atau Hotspot dicabut dari RADIUS dan sesi diputus (hanya bila RADIUS aktif dan akun ada).
- Alamat IP statis kembali ke pool IPAM dan port drop ODN dibebaskan. Keduanya selalu dilepas saat penghentian, dalam transaksi yang sama.
- Tagihan bulanan dihitung sampai hari berhenti lalu tidak dibuat lagi.
- Aset ONT kembali ke `available` bila staf memilih melepasnya.

## Onboarding pelanggan baru

Mendaftarkan pelanggan melewati satu action, `CreateCustomerOnboardingAction`, dalam satu transaksi: pelanggan, alamat, langganan, dan SPK pemasangan. Bila port drop ODN opsional dipilih (hanya oleh pengguna yang memegang `odn.assign`) dan port itu terpakai, milik perusahaan lain, atau di luar POP pelayan, seluruh onboarding ditolak dan tidak ada yang dibuat.

Saat pelanggan dibuat, pengguna portal ikut dibuat dengan rahasia masuk acak 32 karakter yang tidak pernah ditampilkan. Notifikasi antrean mengirim email berisi link agar pelanggan memilih sendiri, berlaku 60 menit. Staf dapat mengirim ulang dengan `POST /admin/customers/{customer}/access-link` (izin `customer.update`, dibatasi 3 per menit). Bila pelanggan setuju WhatsApp, satu pesan WhatsApp hanya memberi tahu bahwa link sudah dikirim ke email. Link itu sendiri tidak pernah dikirim lewat WhatsApp.

### Persetujuan WhatsApp

Inbils mengirim pesan WhatsApp hanya ke pelanggan yang setuju. Hanya aksi staf yang menulis persetujuan (dari onboarding atau edit pelanggan), dan balasan pelanggan `STOP` atau `BERHENTI` mencatat penolakan. Nomor harus nomor seluler Indonesia. Kredensial WhatsApp Cloud API disimpan per perusahaan, lihat [Integrasi](/docs/getting-started/integrations/).

## Atribusi penjualan

`acquired_by_user_id` mengkreditkan seorang staf. Yang memenuhi syarat adalah pengguna aktif di perusahaan yang sama dengan profil pegawai aktif yang memegang `customer.create`. `customer.sales.assign` mengisi pelanggan yang belum punya acquirer, `customer.sales.correct` mengubah atau mengosongkannya dan wajib disertai alasan (maksimal 500 karakter). Pengguna tanpa kedua izin tidak melihat kolomnya, dan filternya diabaikan. Pengguna yang pernah menjadi acquirer tidak bisa dihapus, hanya dinonaktifkan.

## Yang dilakukan staf

| Tugas | Lokasi |
|---|---|
| Daftar, filter (tipe, area, status, akun, acquirer), ekspor | **Pelanggan** di bawah **Pelanggan & Layanan** |
| Buat pelanggan dan langganan pertama | Formulir buat (onboarding) |
| Kelola alamat, kontak, dokumen | Rincian pelanggan |
| Aktifkan, suspend, reaktivasi, blokir, hentikan, ganti paket | Rincian langganan |
| Isolir pelanggan menunggak | Piutang, lihat [Penagihan](/docs/modules/billing/) |

Panduan lengkapnya ada di [panduan web](/docs/guides/web/customers-and-services/customers/).

## API dan aplikasi

Aplikasi pelanggan memanggil `GET api/v1/customer/profile`, `GET api/v1/customer/subscriptions`, dan `GET api/v1/customer/subscriptions/{id}`. Fitur staf memakai route web di bawah `/admin/customers` dan `/admin/subscriptions/{sub}`. Lihat [konvensi API](/docs/api/conventions/).

## Izin

| Kunci | Fungsi | Templat bawaan |
|---|---|---|
| `customer.view` | Melihat pelanggan, alamat, kontak | Admin, Manajer, NOC & Layanan Pelanggan, Teknisi, Keuangan, Staf |
| `customer.create` | Membuat pelanggan (onboarding) | Admin, Manajer, NOC & Layanan Pelanggan |
| `customer.update` | Mengubah pelanggan, kirim ulang link akses | Admin, Manajer, NOC & Layanan Pelanggan, Staf |
| `customer.delete` | Menghapus pelanggan (ditolak selama masih ada langganan, tagihan, SPK, tiket, atau aset jaringan yang merujuknya) | Admin |
| `customer.address.manage` | Perubahan alamat dan kontak | Admin, Manajer, NOC & Layanan Pelanggan, Staf |
| `customer.subscription.view` | Melihat langganan | Admin, Manajer, NOC & Layanan Pelanggan, Keuangan, Staf |
| `customer.subscription.manage` | Membuat dan mengubah langganan, ganti paket | Admin, Manajer, NOC & Layanan Pelanggan |
| `customer.subscription.activate` | Aktivasi | Admin, Manajer |
| `customer.subscription.suspend` | Suspend | Admin, Manajer |
| `customer.subscription.reactivate` | Reaktivasi | Admin, Manajer |
| `customer.subscription.block` | Blokir dan buka blokir | Admin, Manajer, NOC & Layanan Pelanggan |
| `customer.subscription.terminate` | Hentikan | Admin, Manajer |
| `customer.sales.assign` | Mengisi acquirer dari kosong | Admin, Manajer, NOC & Layanan Pelanggan, Staf |
| `customer.sales.correct` | Mengubah atau mengosongkan acquirer | Admin, Manajer |
| `customer.export` | Mengekspor pelanggan | Admin, Manajer |
| `customer.manage` | Izin super | Admin, Manajer |

Peran dimiliki tiap perusahaan dan boleh diganti nama atau diubah, jadi hak sebenarnya adalah izin yang dipegang sebuah peran. Tabel menunjukkan templat yang disalin ke perusahaan baru. Lihat [Izin](/docs/architecture/permissions/).

## Invarian

- Kode pelanggan unik per perusahaan, begitu juga kode langganan.
- Paling banyak satu alamat pemasangan per pelanggan.
- Pelanggan yang dirujuk langganan, tagihan, SPK, tiket, atau aset jaringan tidak bisa dihapus.
- Langganan menyimpan salinan harganya sendiri, jadi mengubah paket tidak pernah mengubah harga langganan yang ada.
- `billing_day` bernilai 1 sampai 28.
- Hanya `SubscriptionService` yang menulis kolom status, sumber suspend, dan blokir.
- Status pelanggan, kolom blokir, dan persetujuan WhatsApp tidak bisa diisi massal.
- Semua dibatasi per perusahaan. Pelanggan perusahaan lain dijawab 404.
