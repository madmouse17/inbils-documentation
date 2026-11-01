---
title: "Inventory"
description: "Cara Inbils melacak stok consumable: barang, lokasi, mutasi yang tidak bisa diubah, permintaan barang dengan reservasi, penyesuaian, dan retur material."
---

Modul Inventory (`Modules/Inventory`) adalah sumber kebenaran stok consumable: kabel, konektor, suku cadang. Modul ini menyimpan katalog barang, jumlah tiap barang di tiap lokasi, dan log mutasi yang tidak bisa diubah. Perangkat tetap yang dilacak (router, OLT, ONU) bukan stok di sini: itu aset jaringan, lihat [Network](/docs/modules/network/).

## Konsep utama

| Konsep | Arti |
|---|---|
| Product (barang) | Consumable dengan SKU unik per perusahaan, kategori, satuan, stok minimum (`min_stock`), dan penanda aktif. |
| Category (kategori) | Pohon kategori (induk dan anak), misalnya Kabel, Konektor, Suku cadang. |
| Unit (satuan) | Satuan ukur dengan nama dan simbol (pcs, meter, roll). |
| Location (lokasi) | Stok berada di lokasi topologi (POP, rak, site), bukan di tabel gudang terpisah. Gudang yang ditampilkan aplikasi adalah sebuah lokasi. |
| Stock (stok) | Satu baris per barang dan lokasi dengan `quantity` dan `reserved_quantity`. Stok tersedia adalah `quantity - reserved_quantity`. |
| Stock movement (mutasi stok) | Satu baris append-only per perubahan, dengan cuplikan saldo sesudah perubahan. Tidak pernah diubah atau dihapus. |

Stok dijaga oleh pemeriksaan database: `quantity >= 0`, `reserved_quantity >= 0`, dan `reserved_quantity <= quantity`. Barang yang masih punya stok tidak bisa dihapus (422).

## Mutasi stok

| Tipe | Efek |
|---|---|
| `receive` | Menambah jumlah di sebuah lokasi. |
| `issue` | Mengurangi jumlah dari sebuah lokasi. |
| `transfer` | Dua baris: issue di sumber dan receive di tujuan. |
| `adjustment` | Menetapkan jumlah hasil hitung, dengan catatan wajib. |
| `reserve` | Hanya menaikkan `reserved_quantity` (permintaan barang disetujui). |
| `release` | Menurunkan `reserved_quantity` (permintaan barang diserahkan), lalu `issue` menyusul. |
| `return` | Menambahkan jumlah kembali (retur material). |

Reserve atau issue yang melebihi stok tersedia melempar `InsufficientStockException`. Pesan yang sama dipakai API, validasi web, dan toast: `Stok {item} di {location} tersisa {available} {unit}, dibutuhkan {requested} {unit}.` Saat `quantity <= min_stock`, barang menampilkan lencana stok menipis dan widget dasbor.

## Permintaan barang

Teknisi atau staf meminta material lewat permintaan barang. Alurnya memisahkan tugas: pemohon tidak bisa menyetujui, penyetuju tidak bisa menyiapkan, dan pemohon maupun penyetuju tidak bisa menyerahkan.

| Status | Arti |
|---|---|
| `draft` | Sedang ditulis, bisa dibatalkan. |
| `submitted` | Menunggu persetujuan, bisa dibatalkan, bisa ditolak. |
| `approved_reserved` | Disetujui. Jumlah yang disetujui (tidak melebihi yang diminta) direservasi di lokasi sumber. |
| `preparing` | Gudang menyiapkan barang. |
| `ready_for_pickup` | Barang siap diambil. |
| `issued` | Diserahkan: reservasi dilepas, lalu stok dikeluarkan. |
| `rejected`, `cancelled` | Ditutup tanpa pergerakan stok. |

Permintaan boleh menyebut sumber: SPK (`source_type=work_order`) atau tiket. Dari aplikasi teknisi, `POST /api/v1/technician/inventory-requests` menerima `work_order_id` opsional, dan SPK itu harus milik teknisi sendiri dengan status `assigned` atau `in_progress`. Serah terima ditolak bila SPK sumber sudah `completed` atau `cancelled`. Lihat [Work orders](/docs/modules/work-orders/) untuk cara persetujuan SPK menghindari pengeluaran material yang sama dua kali.

Sebelum menyetujui, dialog menampilkan "Tersedia: n" per item. Pesan server tetap menjadi rujukan akhir.

## Retur material

Saat permintaan diserahkan, sebuah kasus retur dibuat untuk teknisi. Material yang tidak terpakai kembali ke gudang.

| Status | Arti |
|---|---|
| `awaiting_declaration` | Teknisi harus mendeklarasikan jumlah terpakai, kembali baik, dan selisih. |
| `awaiting_receipt` | Gudang harus memeriksa barang secara fisik. |
| `correction_required` | Gudang menolak serah terima dengan alasan, teknisi mendeklarasikan ulang. |
| `reconciled` | Jumlah cocok. |
| `exception_open` | Selisih (`damaged`, `lost`, atau `other`) perlu keputusan. |
| `resolved` | Keputusan beserta catatan sudah dicatat. |

Aturan tiap baris: dikeluarkan = terpakai + baik + rusak + hilang + lainnya. Teknisi tidak bisa menerima retur miliknya sendiri, dan penerima tidak bisa menyelesaikan pengecualiannya.

## Penyesuaian

Staf menghitung stok dan mengajukan permintaan penyesuaian. Permintaan berstatus `pending` dan stok tidak berubah. Orang lain yang memegang `inventory.stock.adjust.approve` menyetujui atau menolaknya, dan pemohon tidak pernah bisa menyetujui permintaannya sendiri. Permintaan menyimpan `old_quantity`. Jika stok berubah sejak dihitung, persetujuan menjawab 409 `Stok berubah sejak dihitung; hitung ulang.` dan permintaan tetap `pending`. Administrator boleh menyesuaikan langsung (break-glass), dan log audit menandainya `break_glass`.

## Yang dikerjakan staf

- [Barang](/docs/guides/web/inventory/items/), [kategori](/docs/guides/web/inventory/categories/), dan [satuan](/docs/guides/web/inventory/units/): katalog.
- [Stok](/docs/guides/web/inventory/stock/): terima, keluarkan, transfer, dan penyesuaian.
- [Permintaan barang](/docs/guides/web/inventory/item-requests/) dan [pengembalian barang](/docs/guides/web/inventory/material-returns/).
- [Cari barang](/docs/guides/web/inventory/find-items/): mencari consumable dan melihat jumlah per lokasi.
- [Mutasi stok](/docs/guides/web/inventory/stock-movements/): riwayat mutasi dengan filter.
- [Kartu stok](/docs/guides/web/finance-and-reports/stock-card/): laporan mutasi satu barang (`report.stock_card.view`).
- [Permintaan barang sampai pengeluaran stok](/docs/guides/web/workflows/item-request-to-stock-issue/): seluruh alurnya.

## Aplikasi dan notifikasi

Aplikasi teknisi memakai endpoint `api/v1/technician/` untuk `products`, `warehouses`, `inventory-requests` (daftar, buat, batalkan), dan `material-returns` (daftar, detail, declare). Item permintaan mengembalikan `quantity` (diminta), `quantity_approved`, dan `quantity_issued`. Permintaan diajukan, disetujui, ditolak, atau siap, serta retur dideklarasikan atau ditolak, memberi tahu lewat lonceng, dan teknisi juga mendapat push. Tidak ada kejadian inventaris yang mengirim email. Pengguna dengan izin persetujuan atau retur inventaris boleh menyalakan ringkasan email harian di profil. Perintah terjadwal `inventory:send-digest` berjalan pukul 00:00 UTC dan hanya mengirim bila ada antrean yang dilaporkan.

## Izin

| Kunci | Arti | Pemegang bawaan |
|---|---|---|
| `inventory.view`, `inventory.create`, `inventory.update` | Layar katalog dan stok | manager, warehouse, staff (technician: hanya lihat) |
| `inventory.delete` | Menghapus barang | admin |
| `inventory.export`, `inventory.manage` | Ekspor, izin super | manager (warehouse: ekspor) |
| `inventory.stock.receive`, `inventory.stock.transfer` | Terima dan transfer | warehouse, staff |
| `inventory.stock.issue` | Mengeluarkan stok | warehouse, staff, technician |
| `inventory.stock.adjust.request` | Mengajukan penyesuaian | warehouse, staff |
| `inventory.stock.adjust.approve` | Menyetujui atau menolak penyesuaian | manager |
| `inventory.stock.adjust` | Penyesuaian langsung | admin |
| `inventory.request.create`, `.cancel.own`, `.view.own` | Permintaan barang sendiri | technician |
| `inventory.request.view.all` | Melihat semua permintaan | manager, warehouse, staff |
| `inventory.request.approve`, `.reject`, `.audit` | Memutuskan permintaan | manager |
| `inventory.request.prepare`, `.issue` | Menyiapkan dan menyerahkan | warehouse, staff |
| `inventory.return.declare`, `.view.own` | Mendeklarasikan sisa sendiri | technician |
| `inventory.return.view.all`, `.receive` | Memeriksa retur di meja gudang | manager, warehouse, staff |
| `inventory.return.resolve` | Menyelesaikan selisih | manager |

Peran bersifat per perusahaan, lihat [Permissions](/docs/architecture/permissions/).

## Invarian

- Mutasi tidak pernah diubah atau dihapus, dan masing-masing membawa saldo sesudahnya.
- Hanya permintaan barang yang mereservasi stok. SPK tidak pernah mereservasi.
- Menyetujui, menyiapkan, dan menyerahkan butuh orang yang berbeda (maker dan checker).
- Baris stok tidak bisa di bawah nol atau mereservasi lebih dari yang dimilikinya.
- Hitungan yang usang ditolak dengan 409, bukan menimpa stok yang lebih baru.
