---
title: "SPK (surat perintah kerja)"
description: "Cara Inbils menjalankan pekerjaan lapangan sebagai SPK: jenis, state machine, bukti, material, efek persetujuan, izin, dan aplikasi teknisi."
---

Work order, disebut SPK (Surat Perintah Kerja) di Inbils, adalah satu pekerjaan untuk teknisi lapangan: memasang pelanggan baru, memperbaiki gangguan, mengganti paket, atau memindahkan layanan ke alamat baru. Modul SPK (`Modules/SPK`) melacak pekerjaan dari pembuatan sampai persetujuan kantor. Persetujuan adalah langkah yang berdampak ke modul lain: stok, aset jaringan, langganan, akun PPPoE, dan tagihan pemasangan.

## Jenis

| Jenis | Kunci | Yang dilakukan persetujuan selain stok |
|---|---|---|
| Instalasi | `installation` | Memasang aset jaringan berserial yang dipilih pada baris SPK, mengaktifkan langganan bila masih pending, memastikan akun PPPoE ada, membuat tagihan pemasangan bila ada baris. |
| Maintenance | `maintenance` | Mengonsumsi suku cadang. Tidak mengaktifkan langganan dan tidak menagih biaya pemasangan. |
| Upgrade layanan | `upgrade_service` | Mengonsumsi material terpakai seperti jenis lain. Tidak mengganti paket atau menukar aset secara otomatis: staf melakukannya dengan tangan. |
| Relokasi | `relocation` | Mengonsumsi material terpakai seperti jenis lain. Tidak memindahkan aset atau mengubah alamat pemasangan secara otomatis: staf melakukannya dengan tangan. |

SPK instalasi, upgrade, dan relokasi membutuhkan pelanggan dan langganan. SPK maintenance boleh internal (misalnya aset POP) dan tidak punya keduanya. Setiap SPK punya kode unik per perusahaan dengan bentuk `SPK-{YEAR}-{NNNNN}`, dibuat aman dari balapan.

SPK dibuat dengan tiga cara, disimpan di `source`: `manual` (staf), `subscription` (menambah pelanggan baru beserta langganannya melahirkan SPK instalasi), dan `ticket` (tiket yang butuh kerja lapangan melahirkan SPK maintenance, izin `ticket.spawn_spk`, lihat [Ticketing](/docs/modules/ticketing/)). Sumber `monitoring` ada sebagai nilai, tetapi staf membuat pekerjaan itu dengan tangan.

## Siklus hidup

| Dari | Ke | Aksi | Efek |
|---|---|---|---|
| `draft` | `generated` | generate | Menandai rencana siap ditugaskan. Kode sudah terisi saat SPK dibuat. SPK yang lahir dari tiket atau pelanggan baru langsung berstatus `generated`. |
| `draft`, `generated`, `rejected` | `assigned` | assign | Mengisi teknisi, menambah riwayat penugasan, tanpa reservasi stok. Untuk SPK instalasi, akun PPPoE dibuat sekali bila perusahaan punya integrasi RADIUS aktif. |
| `assigned` | `assigned` | en route | Mengisi `en_route_at` sekali dan memberi tahu pelanggan. |
| `assigned` | `in_progress` | start | Mengisi `started_at`, mencatat check-in (lihat di bawah). |
| `assigned`, `in_progress` | `assigned` | reassign | Teknisi baru, penugasan lama ditutup, waktu kunjungan dikosongkan. Butuh `spk.reassign`. Memilih teknisi yang sama pada `in_progress` mempertahankan progres. |
| `in_progress` | `waiting_review` | submit | Butuh minimal satu bukti, dan semua sisa material dari permintaan barang yang ditautkan ke SPK harus sudah dideklarasikan. |
| `waiting_review` | `completed` | approve | Menjalankan `CompleteSpkAction`: stok, aset, langganan, akun PPPoE, tagihan pemasangan. |
| `waiting_review` | `rejected` | reject | Menyimpan alasan, pekerjaan kembali untuk diperbaiki. |
| semua kecuali `completed`, `cancelled` | `cancelled` | cancel | Butuh alasan. Tidak ada stok bergerak. |

Teknisi hanya memulai dan mengirim pekerjaan yang ditugaskan kepadanya. Staf kantor menugaskan, menyetujui, menolak, dan membatalkan. Menyetujui SPK yang tidak berstatus `waiting_review` ditolak dengan 422. Pembuat SPK dan teknisi yang ditugaskan tidak boleh menyetujui atau menolaknya, dan persetujuan menunggu sampai semua retur material SPK berstatus reconciled atau resolved. SPK hanya bisa dihapus (soft delete) pada status `draft` atau `cancelled`.

### Timeline kunjungan

Halaman SPK web, aplikasi teknisi, dan aplikasi pelanggan menampilkan empat tahap kunjungan yang sama, diputuskan oleh server: `assigned`, `en_route`, `in_progress`, dan `installed` (berlabel "Selesai dipasang" untuk instalasi, "Selesai dikerjakan" untuk jenis lain). SPK yang ditolak kembali ke tahap ketiga. Penugasan ulang ke teknisi lain mengosongkan waktu berangkat dan waktu kirim, karena satu perjalanan milik satu teknisi.

## Penugasan dan persetujuan

Staf kantor bekerja dari dua antrean di web: **Penugasan** (dispatch) dan **Persetujuan** (inbox persetujuan). Penugasan menampilkan teknisi beserta pekerjaan yang sedang mereka pegang dan menyarankan yang paling sedikit, lalu petugas memilih secara final. SPK yang sudah ditugaskan menampilkan lencana "Dalam perjalanan" setelah teknisi berangkat. Inbox persetujuan menampilkan bukti, teknisi, hasil check-in, dan material terpakai di samping keputusan.

Dialog Setujui menulis apa yang akan dilakukan persetujuan, berurutan, dan hanya yang benar-benar terjadi: pelanggan dan langganan menjadi aktif, tagihan pemasangan (langsung dikirim atau disimpan sebagai draf, menurut setting perusahaan `auto_send_installation_invoice`), akun PPPoE yang akan dibuat, dan jumlah yang keluar dari stok. Setelah SPK instalasi selesai, kartu "Langkah berikut" mencantumkan langkah tagihan dan PPPoE yang boleh dilihat atau dikerjakan pengguna.

## Bukti dan aturan jarak check-in

Bukti adalah foto atau dokumen yang dilampirkan ke SPK. Minimal satu wajib ada sebelum submit. Aplikasi teknisi mengunggah bukti selagi pekerjaan berstatus `in_progress` dan boleh menghapus berkas miliknya sendiri saat itu.

Saat teknisi memulai pekerjaan, aplikasi mengirim `check_in` berisi posisi ponsel. Server mengukur jarak ke alamat pemasangan pelanggan (alamat pemasangan langganan; untuk SPK tanpa langganan, lokasi SPK). Koordinat POP tidak pernah dipakai sebagai pengganti alamat pelanggan.

- Batas perusahaan adalah setting `checkin_max_distance_m`, bawaan 500 meter, antara 50 dan 100000.
- Lebih jauh dari batas: start ditolak dengan 422 pada `check_in.far_reason` sampai teknisi menulis alasan. Check-in lalu disimpan sebagai `far` beserta alasannya.
- Tidak ada GPS (izin ditolak, lokasi mati, timeout) atau alamat tanpa koordinat: start diizinkan, jarak `null`, dan check-in tidak pernah `far`.

## Material

Baris material (`work_order_items`) berisi consumable: satu baris per barang, dengan jumlah terpakai. Perangkat yang tetap di pelanggan adalah aset jaringan; ia hanya muncul sebagai baris aset berserial yang dikelola kantor dan tidak bisa ditambah dari aplikasi teknisi.

- Baris bisa ditambah, diubah, dan dihapus sampai SPK masuk review: pada `draft`, `generated`, `assigned`, `in_progress`, dan `rejected`. Pada `waiting_review`, `completed`, dan `cancelled` server menjawab 422.
- SPK sendiri tidak mereservasi stok. Stok keluar dari gudang saat persetujuan lewat `StockService::issue`.
- Teknisi boleh lebih dulu mengambil material dengan permintaan barang yang ditautkan ke SPK. Saat persetujuan, bagian yang sudah diserahkan lewat permintaan `issued` untuk SPK itu tidak dikeluarkan lagi. Hanya sisanya yang dikeluarkan, dari lokasi sumber permintaan untuk barang yang diminta dan dari lokasi SPK untuk barang lain. Lihat [Inventory](/docs/modules/inventory/).
- Setelah permintaan barang diserahkan, teknisi mendeklarasikan sisa dan gudang menerimanya (retur material, juga dijelaskan di [Inventory](/docs/modules/inventory/)).

## Yang dilakukan persetujuan

`SpkService::approve` memanggil `CompleteSpkAction`, yang mengorkestrasi empat domain lain dalam satu operasi:

1. Stok: mengeluarkan jumlah terpakai yang belum tercakup permintaan barang.
2. Aset jaringan: untuk instalasi, memasang aset berserial yang dipilih pada baris SPK.
3. Langganan: mengaktifkannya bila masih pending. Perubahan paket dan alamat tidak dilakukan oleh SPK. Lihat [Customers](/docs/modules/customers/).
4. Billing: khusus instalasi, membuat tagihan berisi biaya pemasangan dan, bila perusahaan menagih material, material terpakai, dikirim atau disimpan sebagai draf menurut setting perusahaan. Lihat [Billing](/docs/modules/billing/).

Untuk instalasi, persetujuan juga memastikan akun PPPoE ada. Kegagalan konfigurasi jaringan tidak membatalkan penugasan maupun persetujuan. Membatalkan SPK instalasi untuk langganan `pending` menonaktifkan akun PPPoE di RADIUS dan mengganti secretnya bila tidak ada instalasi lain yang berjalan.

## Aplikasi teknisi dan API

Aplikasi teknisi memakai `api/v1/technician/work-orders/{wo}` dengan `start`, `en-route`, `submit`, `evidence`, `items`, dan `network-credentials`. SPK teknisi lain dijawab 404. Secret PPPoE hanya tampil saat SPK `assigned` atau `in_progress`, lewat endpoint beraudit yang dibatasi 5 permintaan per menit. Aplikasi pelanggan membaca SPK miliknya lewat `api/v1/customer/work-orders`.

Mulai, "Saya berangkat" (en route), dan kirim untuk review menunggu di outbox aplikasi saat tidak ada sinyal dan dikirim kemudian. Menampilkan secret PPPoE, menambah atau menghapus material, dan menghapus foto yang sudah terkirim butuh koneksi. Lihat [panduan teknisi](/docs/guides/technician/work-orders/).

## Halaman panduan untuk staf

- [Penugasan](/docs/guides/web/operations/dispatch/)
- [Persetujuan](/docs/guides/web/operations/approvals/)
- [SPK](/docs/guides/web/operations/work-orders/)
- [Tiket sampai SPK](/docs/guides/web/workflows/ticket-to-work-order/)

## Izin

| Kunci | Arti | Pemegang bawaan |
|---|---|---|
| `spk.view` | Melihat SPK | manager, NOC, technician, warehouse, staff |
| `spk.create` | Membuat SPK | manager, NOC, staff |
| `spk.update` | Mengubah header (draft, generated) | manager |
| `spk.delete` | Menghapus draft atau cancelled | admin |
| `spk.assign`, `spk.reassign` | Menugaskan dan menugaskan ulang | manager |
| `spk.start`, `spk.submit` | Memulai dan mengirim pekerjaan sendiri | technician, staff |
| `spk.approve`, `spk.reject` | Meninjau pekerjaan yang dikirim | manager |
| `spk.cancel` | Membatalkan | manager |
| `spk.evidence.upload`, `spk.evidence.view` | Bukti | technician |
| `spk.export` | Ekspor daftar | manager |
| `spk.manage` | Izin super | manager |

Peran bersifat per perusahaan, jadi perusahaan boleh mengubah bawaan ini (lihat [Permissions](/docs/architecture/permissions/)).

## Invarian

- SPK milik satu perusahaan, dan kodenya unik di dalamnya.
- Riwayat penugasan hanya bertambah (append-only) dan punya tepat satu baris aktif.
- Paling banyak satu teknisi aktif per SPK, dan hanya teknisi itu yang memulai dan mengirim.
- Header hanya berubah pada `draft` dan `generated`. Penyimpanan dengan `expected_updated_at` yang usang ditolak dengan 409.
- Perubahan status membaca ulang status di bawah kunci, jadi dua orang tidak bisa memindahkan pekerjaan yang sama.
- Stok hanya dikeluarkan saat persetujuan, tidak pernah saat penugasan atau pembatalan.
