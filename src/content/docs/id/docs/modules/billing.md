---
title: "Penagihan dan pembayaran"
description: "Cara Inbils menerbitkan tagihan, mencatat pembayaran, memantau tunggakan, mengisolir akun menunggak, dan mengirim pengingat WhatsApp."
---

Modul Billing menangani sisi uang sebuah ISP: tagihan bulanan untuk setiap langganan, tagihan pemasangan sekali bayar dari SPK yang disetujui, pembayaran manual dan online (Midtrans), tunggakan, dan isolir otomatis untuk akun yang tetap belum membayar. Langganan sekaligus menjadi langganan penagihan: tidak ada entitas penagihan terpisah, dan job berulang membaca kolom penagihan pada langganan secara langsung.

## Konsep utama

- **Invoice (tagihan)**: tipe `recurring` (biaya bulanan, MRC) atau `one_time` (biaya pemasangan, upgrade, relokasi). Sumbernya `subscription`, `spk`, atau `manual`.
- **Item tagihan**: satu baris berisi deskripsi, jumlah, harga satuan, diskon, dan tarif pajak. Produk bersifat opsional, jadi baris teks bebas seperti biaya pemasangan boleh dipakai.
- **Pembayaran**: jumlah yang diterima dengan metode (`cash`, `transfer`, `cheque`, `other`, atau `midtrans` untuk gateway). Pembayaran tidak bisa diubah: tidak ada penghapusan.
- **Percobaan pembayaran (payment attempt)**: satu halaman pembayaran online yang dibuka untuk sebuah tagihan lewat Midtrans Snap.
- **Rupiah penuh**: semua nominal baru dibulatkan setengah ke atas ke rupiah penuh per baris, sehingga subtotal, pajak, dan total tagihan baru berakhiran `.00`. Selisih beberapa rupiah terhadap pembulatan total akhir memang disengaja.
- **Pajak (PPN)**: tarif bawaan adalah setting perusahaan `tax_ppn_rate` (11), bisa diubah per baris.
- **Penomoran**: tagihan bernomor `INV-{YEAR}-{NNNNN}`, dialokasikan dengan kunci sehingga pembuatan bersamaan tidak menghasilkan nomor ganda.

## Siklus hidup tagihan

| Status | Arti | Perpindahan berikutnya |
|---|---|---|
| `draft` | Sedang disiapkan. Bisa diubah dan dihapus (soft delete, bisa dipulihkan). | Kirim, atau batalkan. |
| `sent` | Sudah diterbitkan ke pelanggan. | Pembayaran penuh menjadi `paid`, pembayaran sebagian menjadi `partial`, jatuh tempo terlewat menjadi `overdue`. |
| `partial` | Sebagian total sudah dibayar. | Pembayaran sisanya menjadi `paid`. |
| `overdue` | Jatuh tempo terlewat dan belum lunas. Diatur oleh job harian. | Pembayaran menjadi `paid` atau `partial`. |
| `paid` | Lunas. | Final. |
| `cancelled` | Dibatalkan dengan alasan. | Final. |

Hanya tagihan `sent`, `partial`, dan `overdue` yang menerima pembayaran. Membayar lebih dari sisa ditolak dengan 422, dan membatalkan tagihan yang sudah punya pembayaran ditolak sampai pembayarannya dibalik (reverse).

## Tagihan berulang

`billing:generate` berjalan harian pukul 02:00 (`withoutOverlapping(120)`). Tanpa `--period` perintah menagih bulan sebelumnya. Opsinya `--period=YYYY-MM`, `--dry-run`, dan `--company=`. Staf dengan `billing.create` bisa menjalankan periode pilihan dari jendela **Buat tagihan bulanan**, yang menampilkan pratinjau lebih dulu. Keduanya memanggil `BillingService::generateForPeriod`.

- Yang ditagih: langganan `active` atau `terminated`, yang aktivasinya tidak lewat dari akhir periode, dan bila sudah berhenti, belum berhenti sebelum awal periode. Langganan `pending` dan `suspended` tidak ditagih, jadi isolir juga menghentikan tagihannya.
- Satu tagihan per langganan per periode. Periode dianggap sudah terbit bila tagihan untuk periode itu ada dalam status apa pun, termasuk `cancelled`. Periode yang dibatalkan tidak diterbitkan ulang oleh jadwal; tagih periode yang disengketakan secara manual sebagai tagihan sekali bayar.
- Pengecekan diulang di bawah kunci baris, dan unique key database pada `(company_id, subscription_id, active_recurring_period)` menjadi pengaman bila dua proses berlomba.
- Tagihan langsung dibuat dengan status `sent`. Jatuh tempo adalah hari ini ditambah setting perusahaan `invoice_due_days` (bawaan 14). Item tunggalnya berbunyi "MRC {nama paket} {awal} s/d {akhir}", dengan catatan prorata bila langganan mulai atau berhenti di tengah periode. Harganya adalah `mrc_amount` langganan, bukan harga paket yang berlaku sekarang.
- Satu langganan yang gagal dilaporkan dan dihitung di `failed`; langganan lain tetap ditagih. Perintah mengembalikan `FAILURE` dan hanya admin aktif perusahaan itu yang diberi tahu (`BillingScheduleFailedNotification`).

Nama pelanggan, alamat, NPWP, dan nama paket dibekukan pada tagihan saat keluar dari draf, sehingga mengganti nama pelanggan kemudian tidak mengubah tagihan yang sudah terbit. NPWP tidak pernah dikirim ke aplikasi pelanggan.

## Tagihan pemasangan dari SPK

Persetujuan SPK `installation` membangun baris tagihan tanpa menulis database lebih dulu, lalu membuat tagihan `one_time` dengan `source=spk`. Satu SPK hanya bisa punya satu tagihan.

- Baris **Biaya pemasangan** berasal dari `subscription.otc_installation_fee`.
- Bila setting `bill_installation_materials` menyala, setiap bahan terpakai menjadi baris **Bahan terpakai: {nama barang}** dengan harga jual produk.
- Bila tidak ada baris bernilai lebih dari Rp 0, tidak ada tagihan yang dibuat.
- Tagihan dimulai sebagai `draft`. Dengan `auto_send_installation_invoice` menyala, tagihan dikirim di dalam transaksi persetujuan. Pemegang `billing.send` menerima lonceng dan push, dan dashboard keuangan menghitung drafnya.

## Pembayaran

### Manual

Staf mencatat pembayaran di halaman tagihan dengan jumlah, metode (`cash`, `transfer`, `cheque`, `other`), referensi, dan tanggal `paid_at` opsional. Tanggal tidak boleh setelah hari ini menurut zona waktu perusahaan dan tidak boleh sebelum tanggal terbit tagihan. Form mengisi sisa tagihan sebagai jumlah. Pembayaran manual hanya menerima rupiah penuh.

Pembayaran tidak bisa diubah atau dihapus. Untuk mengoreksi, balik pembayarannya (batalkan dengan alasan, butuh `billing.payment.reverse`) lalu catat pembayaran baru.

### Online dengan Midtrans

Setiap perusahaan memakai akun Midtrans sendiri. Server key dan mode disimpan terenkripsi dan diatur admin di **Pengaturan**, **Integrasi** (`company.integrations.manage`). Perusahaan tanpa integrasi Midtrans aktif tidak punya pembayaran online. Pilot berjalan dalam mode sandbox; go-live produksi butuh persetujuan terpisah.

1. Pelanggan membuka tagihan di aplikasi pelanggan dan menekan **Bayar**.
2. Inbils memakai ulang percobaan pending yang masih terbuka atau membuat yang baru untuk sisa tagihan penuh, lalu meminta halaman pembayaran ke Midtrans Snap. Tagihan `draft`, `paid`, atau `cancelled` ditolak.
3. Browser menuju halaman Midtrans dan kembali ke `/portal/payments/return`, yang menampilkan status dari database dan mengabaikan query string.
4. Midtrans memanggil `POST /webhooks/midtrans/<company public_id>` (`POST /webhooks/midtrans` versi lama masih hidup selama masa peralihan). Inbils memeriksa signature `sha512(order_id + status_code + gross_amount + server key)`, menanyakan keadaan sebenarnya ke Status API Midtrans, lalu mencatat pembayaran lewat `BillingService::recordPayment` yang sama dengan pembayaran manual.

`midtrans:reconcile` berjalan tiap 15 menit (`withoutOverlapping(10)`) dan menanyakan ke Midtrans soal percobaan yang masih `pending` setelah sepuluh menit, sehingga notifikasi yang hilang tidak menghilangkan pembayaran.

Status percobaan: `pending`, `paid`, `failed`, `expired`, `exception`, `cancelled_locally` (label **Ditutup**), dan `refunded` (label **Dikembalikan**).

:::caution
Apa pun yang tidak bisa dibukukan otomatis oleh Inbils menjadi `exception`: nominal berbeda, tagihan yang tidak lagi menerima pembayaran, referensi ganda, `refund`, atau `chargeback`. Tidak ada reversal otomatis. Pemegang `billing.payment.record` menerima notifikasi, dan halaman **Tunggakan** menampilkan kotak merah berisi exception yang masih terbuka. Staf mencatat pembayaran dengan order id sebagai referensi atau refund di Midtrans, lalu menandai percobaan lewat **Tandai dikembalikan** (`billing.payment.reverse`).
:::

Saat pembayaran dicatat atau tagihan dibatalkan sementara halaman pembayaran masih terbuka, Inbils menutup halaman itu (`cancelled_locally`) dan membatalkan transaksinya di Midtrans lewat job antrean.

### Kwitansi dan PDF

Staf mengunduh PDF tagihan di `GET /admin/invoices/{invoice}/pdf`. Aplikasi pelanggan mengunduh kwitansi di `GET /api/v1/customer/invoices/{id}/receipt` hanya untuk tagihan lunas milik pelanggan itu.

## Tunggakan, isolir, dan pengingat

Halaman **Tunggakan** menampilkan tagihan yang belum lunas dengan kelompok umur dan bisa mengekspor CSV atau PDF (`billing.export`). Lihat panduan pengguna tentang [Tunggakan](/docs/guides/web/finance-and-reports/arrears/) dan [Tagihan](/docs/guides/web/finance-and-reports/invoices/).

| Job | Jadwal | Fungsi |
|---|---|---|
| `billing:generate` | harian 02:00 | Tagihan berulang untuk bulan sebelumnya. |
| `billing:check-overdue` | harian 03:00 | Tagihan `sent` atau `partial` yang lewat jatuh tempo menjadi `overdue`. |
| `billing:suspend-overdue` | harian 08:00 | Isolir otomatis, hanya untuk perusahaan dengan `auto_suspend_enabled` (bawaan mati). |
| `billing:whatsapp-reminders` | harian 01:00 | Pengingat WhatsApp dan aplikasi pada H-3, H-1, dan H+1 di sekitar jatuh tempo. |
| `midtrans:reconcile` | tiap 15 menit | Menangkap notifikasi Midtrans yang hilang. |

- **Isolir otomatis**: langganan `active` di-suspend bila salah satu tagihannya belum lunas dan `due_date`-nya lebih dari `auto_suspend_overdue_days` hari lalu (bawaan 7: tepat 7 hari belum, 8 hari ya). Aturan membaca `due_date`, bukan `status`. Sumbernya disimpan sebagai `overdue`; suspend manual menyimpan `manual`.
- **Aktivasi ulang otomatis**: setiap pembayaran, manual maupun Midtrans, memicu `PaymentRecorded`. Listener antrean mengaktifkan kembali langganan yang `suspended` dengan sumber `overdue`, bila `auto_reactivate_on_payment` menyala (bawaan menyala) dan tidak ada tagihannya yang masih memenuhi aturan isolir. Pembayaran sebagian bisa saja belum cukup. Suspend `manual` tidak pernah dibuka otomatis, dan block tidak pernah dicabut oleh pembayaran.
- **WhatsApp**: pesan `invoice_issued`, `invoice_reminder`, dan `payment_received` hanya dikirim ke pelanggan yang sudah setuju, bila perusahaan mengaktifkan WhatsApp dan eventnya. Setiap pesan dideduplikasi per tagihan, tahap, dan jatuh tempo, dan kegagalan mengantrekan pesan tidak pernah menggagalkan tagihan atau pembayaran. Pengingat yang sama juga muncul sebagai lonceng dan push di aplikasi pelanggan.

## Ganti paket

Billing membaca `mrc_amount` dari langganan, jadi mengedit paket tidak mengubah langganan yang ada. **Ganti paket** (`POST /admin/subscriptions/{subscription}/change-package`, izin `customer.subscription.manage`) memindahkan langganan ke versi terbaru sebuah paket tanpa prorata dan tanpa mengubah tagihan yang sudah terbit.

## Izin

| Kunci | Mengizinkan |
|---|---|
| `billing.view` | Melihat tagihan, tunggakan, dan status penagihan langganan. |
| `billing.create` | Membuat draf tagihan dan menjalankan pembuatan tagihan bulanan. |
| `billing.update` | Mengubah draf tagihan dan barisnya. |
| `billing.delete` | Menghapus draf tagihan. |
| `billing.send` | Mengirim draf tagihan. |
| `billing.payment.record` | Mencatat pembayaran manual; menerima peringatan exception pembayaran online. |
| `billing.payment.reverse` | Membalik pembayaran dan menandai percobaan online sebagai dikembalikan. |
| `billing.cancel` | Membatalkan tagihan. |
| `billing.suspend` | Cadangan: tidak diperiksa oleh aksi mana pun. Isolir manual memerlukan `customer.subscription.suspend`. |
| `billing.reactivate` | Cadangan: tidak diperiksa oleh aksi mana pun. Aktivasi ulang manual memerlukan `customer.subscription.reactivate`. |
| `billing.pdf.view` | Membuka PDF kwitansi tagihan lunas. PDF tagihan mengikuti akses ke tagihan (`billing.view`). |
| `billing.export` | Mengekspor tagihan dan tunggakan. |
| `billing.manage` | Cadangan: tidak diperiksa oleh aksi mana pun. |

Peran pelanggan tidak punya back office web. Pelanggan memakai `portal.invoice.view` dan `portal.invoice.pay` di aplikasi Android, lihat [panduan pelanggan](/docs/guides/customer/invoices/).

## Invarian

- Pembayaran tidak pernah dihapus atau diubah; koreksi berarti reverse ditambah pembayaran baru.
- `paid_amount` tidak pernah melebihi `total`, dan hanya `BillingService::recordPayment` yang menghitung matematika tagihan.
- Satu tagihan berulang aktif per langganan dan periode, dipaksakan oleh key database.
- Satu tagihan per SPK.
- Hanya draf tagihan yang bisa dihapus.
- Webhook bersifat idempoten: percobaan pembayaran yang sudah punya pembayaran tidak mengubah apa pun.
- Job dan webhook berjalan di dalam tenant milik tagihan (`CompanyService::runAs`).

Lihat juga [Multi-tenancy](/docs/architecture/multi-tenancy/), [Queue dan scheduler](/docs/operations/queues-and-scheduler/), dan [Integrasi](/docs/getting-started/integrations/).
