---
title: "Model data"
description: "Tabel utama Inbils dan relasinya per area, beserta invarian yang ditegakkan skema: ledger tak berubah, kode per perusahaan, ULID publik, dan optimistic locking."
---

Inbils menyimpan semuanya di MySQL 8.4. Charset-nya `utf8mb4` dengan collation `utf8mb4_unicode_ci`. Halaman ini merangkum tabel per area dan aturan yang diikuti setiap tabel. Perilaku per modul dan state machine dibahas di halaman modul di bawah [Modul](/docs/modules/).

## Konvensi yang diikuti setiap tabel

| Aturan | Rincian |
| --- | --- |
| Kolom tenant | Setiap tabel master dan transaksi punya `company_id` (foreign key ke `companies.id`, NOT NULL) dan memakai trait `BelongsToCompany`. Lihat [Multi-tenancy](/docs/architecture/multi-tenancy/). |
| Tabel global | `companies`, `users` (`company_id`-nya adalah perusahaan asal yang nullable), `permissions`, `role_templates`, dan `activity_log`. `roles` dimiliki tenant dan membawa `company_id`. |
| Kode bisnis | Unik per perusahaan: `(company_id, code)`, `(company_id, sku)`, `(company_id, serial_number)`, `(company_id, number)`. Tidak pernah unik global, kecuali `companies.code`. |
| Index | Composite index diawali `company_id`. MySQL membatasi nama index 64 karakter, jadi nama yang panjang dipendekkan manual. |
| Foreign key | Wajib. `RESTRICT` untuk master induk, `CASCADE` untuk baris anak. |
| Uang dan kuantitas | `decimal(15,2)`. |
| Kolom mirip enum | Enum MySQL, misalnya `work_orders.status`, `network_assets.status`, `tickets.status`, `invoices.status`. |
| Referensi polimorfik | Tipe string ditambah id bigint, tanpa foreign key database dan validasi di aplikasi. Contoh: `stock_movements.reference_type` dan `reference_id`. |
| Nama tabel | Tanpa prefiks modul (`products`, bukan `inventory_products`). Tabel pivot berurutan alfabet. |

## Tabel per area

### Core

| Tabel | Isi |
| --- | --- |
| `companies` | Tenant. `parent_company_id` membentuk perusahaan induk dan anak perusahaannya. `settings` berupa JSON. |
| `users` | Staf, teknisi, dan akun pelanggan. Secret two-factor dienkripsi dan tidak pernah fillable. |
| `company_user` | Keanggotaan pengguna di perusahaan. Unik `(company_id, user_id)`, dengan satu baris default (asal) per pengguna. |
| `roles`, `permissions`, `role_templates` | Peran per perusahaan, katalog izin global, dan templat platform. Lihat [Peran dan izin](/docs/architecture/permissions/). |
| `locations` | Pohon yang merujuk dirinya sendiri: region, area, POP, rack, dan site, dengan `path` terhitung. |
| `customers` | `customer_addresses`, `customer_contacts`, dan `service_subscriptions` bergantung pada pelanggan. Soft delete. |
| `service_subscriptions` | Paket yang dijual ke pelanggan. Status, tanggal aktivasi dan penangguhan, hari tagihan, dan tautan ke aset ONT. |
| `employee_evaluations` | Evaluasi, yang merujuk tiket atau SPK secara polimorfik. |
| `activity_log` | Jejak audit (Spatie). Global dan polimorfik. |

### Katalog layanan

`service_packages`, `bandwidth_profiles`, `speed_profiles`, dan `sla_tiers` adalah master dengan `is_active` dan soft delete. `service_package_versions` bersifat append-only: setiap perubahan harga, profil, tingkat SLA, atau kategori menambah versi n+1, dan setiap langganan menunjuk versi saat dijual (`service_subscriptions.service_package_version_id`, NOT NULL, `RESTRICT`). Batas kecepatan RADIUS, tingkat SLA tiket, dan ketentuan paket langganan mengikuti versi, bukan paket yang berlaku sekarang.

### Jaringan

| Tabel | Isi |
| --- | --- |
| `network_assets` | Perangkat dengan nomor seri, MAC, status (`available`, `installed`, `maintenance`, `damaged`, `retired`), lokasi, pelanggan, dan langganan. Unik `(company_id, serial_number)`. |
| `network_asset_installations` | Riwayat pemasangan yang append-only. |
| `nas_devices`, `network_accounts` | Klien RADIUS (router) dan akun RADIUS milik langganan. |
| `vlans`, `ip_prefixes`, `ip_addresses` | Register IPAM. Prefiks membentuk pohon lewat `parent_id`. |
| `odn_splitters`, `odn_ports`, `asset_ports` | Register jaringan optik dan port perangkat. |
| `port_templates` | Data referensi bersama untuk tampilan muka perangkat. Tanpa `company_id` dan tanpa `public_id`. |

### Inventaris

`categories`, `units`, dan `products` adalah master. `stocks` menyimpan kuantitas per produk dan lokasi, unik per `(company_id, product_id, location_id)`. `stock_movements` adalah ledger yang tidak bisa diubah: setiap baris punya tipe (`receive`, `issue`, `transfer`, `adjustment`, `reserve`, `release`, `return`), kuantitas, dan referensi polimorfik. Permintaan ada di `inventory_requests` dan `inventory_request_items`, penyesuaian yang disetujui di `stock_adjustment_requests`, dan pengembalian material di `material_return_cases`, `material_return_lines`, dan `material_return_events`.

### SPK (perintah kerja)

`work_orders` punya kode, tipe (`installation`, `maintenance`, `upgrade_service`, `relocation`), status (`draft`, `generated`, `assigned`, `in_progress`, `waiting_review`, `completed`, `rejected`, `cancelled`), pelanggan, langganan, lokasi, dan penerima tugas. `work_order_items` (satu baris per produk, dengan kuantitas dicadangkan dan terpakai) ikut terhapus bersama SPK. `work_order_assignments` bersifat append-only. `work_order_evidence` menyimpan berkas bukti.

### Billing

`invoices` (tipe `one_time` dan `recurring`; status `draft`, `sent`, `partial`, `paid`, `overdue`, `cancelled`), `invoice_items` (cascade), dan `payments` (append-only). `payment_attempts` mencatat percobaan pembayaran online. Kolom STORED generated `active_recurring_period`, bersama unique index pada `(company_id, subscription_id, active_recurring_period)`, mencegah dua invoice berulang aktif untuk satu langganan dan periode. Invoice yang dibatalkan atau dihapus serta invoice sekali bayar membiarkannya NULL, sehingga tidak pernah bentrok.

### Ticketing

`ticket_categories`, `tickets` (status `open`, `assigned`, `on_progress`, `resolved`, `closed`; unik `(company_id, code)`), `ticket_comments` (cascade, dengan penanda internal), dan `ticket_attachments`.

### Relasi utama

```
companies 1-N companies (parent_company_id: head company to subsidiaries)
companies N-N users (company_user)
customers 1-N customer_addresses, customer_contacts, service_subscriptions
service_packages 1-N service_package_versions 1-N service_subscriptions
network_assets N-1 locations, customers, service_subscriptions
customers / service_subscriptions 1-N work_orders 1-N work_order_items, assignments, evidence
customers / service_subscriptions 1-N invoices 1-N invoice_items, payments
customers 1-N tickets 1-N ticket_comments, ticket_attachments
```

Satu pengecualian terdokumentasi pada arah dependensi: `service_subscriptions.ont_asset_id` menunjuk dari core ke `network_assets`. Ini tautan balik yang didenormalisasi tanpa foreign key database, dan model core `ServiceSubscription` meng-import `NetworkAsset` untuk relasinya.

## Invarian

### Ledger yang tidak bisa diubah

`StockMovement`, `NetworkAssetInstallation`, `Payment`, `work_order_assignments`, `service_package_versions`, dan activity log bersifat append-only. `StockMovement` melempar galat saat update atau delete, dan `ServicePackageVersion` melempar galat saat update. Koreksi adalah baris baru, misalnya mutasi penyeimbang. Hanya service dan action Inventory yang mengubah stok.

### Soft delete hanya untuk riwayat

Pelanggan, alamat, SPK, invoice, tiket, produk, aset jaringan, dan langganan memakai soft delete. Ledger tidak. Tidak ada unique index yang menyertakan `deleted_at`, jadi baris di tempat sampah tetap mencadangkan kodenya. Halaman riwayat membaca relasi dengan `withTrashed()`, sehingga dokumen tetap menyebut induk yang sudah dihapus.

### Nonaktifkan sebelum hapus

Master punya `is_active`. Master dinonaktifkan selama masih ada yang merujuknya, dan dihapus permanen hanya bila tidak pernah ada yang merujuk. `LifecycleService` menjalankan `deactivate`, `activate`, `destroyIfUnreferenced`, dan `restore`, dan semuanya diaudit. Sebuah tes gagal bila foreign key yang membatasi ke tabel lifecycle tidak dideklarasikan di daftar referensinya.

### Kolom snapshot

Kolom `_snapshot` yang nullable menyimpan nama sebagaimana adanya saat dokumen mencapai status akhir, misalnya `invoices.customer_name_snapshot`, `work_orders.technician_name_snapshot`, dan `tickets.category_name_snapshot`. Pembaca memakai `snapshot ?? nilai live`.

### Identifier ULID publik

Setiap tabel yang barisnya disebut oleh URL, path API, atau payload punya `public_id char(26)`, unik dan NOT NULL, berupa ULID huruf kecil. Id integer tetap menjadi primary key dan semua foreign key, dan tidak pernah keluar dari server. Model memakai `HasPublicId`, route memakai `whereUlid`, dan penulisan massal memakai `PublicId::new()`. Sebuah tes mendaftar tabel yang tercakup dan gagal untuk model tenant baru tanpa trait itu.

### Optimistic locking

Form edit mengirim `expected_updated_at`. `App\Support\OptimisticLock` membandingkannya dengan baris dan menolak edit basi dengan 409. Penghitung dan pembuatan kode memakai `lockForUpdate`.

### Migration

Migration bersifat aditif dan reversibel pada database bersama. Migration baru harus terurut setelah migration terbaru yang sudah dikirim, atau ia berjalan di luar urutan pada database yang sudah melewatinya. Migration tabel tenant menambahkan `company_id` dan unique index per perusahaan. Seed hanya memasang katalog izin, templat peran, dan nilai bawaan pengaturan sistem. Data master per perusahaan (satuan, kategori tiket, tingkat SLA, lokasi contoh) dibuat saat perusahaan dibuat.
