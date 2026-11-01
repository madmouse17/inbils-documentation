---
title: "Modul dan batasnya"
description: "Sembilan modul Inbils, apa yang dimiliki masing-masing, dependensi yang dideklarasikan, cara modul saling berbicara, shared core di app/, dan keanehan yang diketahui."
---

Inbils membagi kode domain ke sembilan modul nwidart dan menaruh kode lintas bidang di shared core di bawah `app/`. Modul dibuat dengan `sail artisan module:make <Name>`. Kode berada di `Modules/<Name>/app/` dengan namespace `Modules\<Name>\`, di samping `database/{migrations,factories,seeders}`, `routes/`, `tests/`, dan `module.json`.

## Sembilan modul

| Modul | Memiliki | Dependensi yang dideklarasikan | Halaman |
| --- | --- | --- | --- |
| Billing | Invoice, InvoiceItem, Payment, percobaan pembayaran, Midtrans, piutang | Inventory, SPK, Service | [Billing](/docs/modules/billing/) |
| Customer | Cangkang tipis (provider dan resource). Model dan service pelanggan ada di `app/`. | tidak ada | [Pelanggan](/docs/modules/customers/) |
| Inventory | Product, Category, Unit, Warehouse, Stock, StockMovement, permintaan, penyesuaian | tidak ada | [Inventaris](/docs/modules/inventory/) |
| Ipam | Prefiks IP, VLAN, alamat | NetworkAsset | [Jaringan](/docs/modules/network/) |
| NetworkAsset | NetworkAsset, instalasi, perangkat NAS, sinkronisasi RADIUS, ODN | Service, Ipam | [Jaringan](/docs/modules/network/) |
| Reporting | Query laporan read-only, registry, drill-down, ekspor | Billing, Inventory, NetworkAsset, SPK, Ticketing | [Pelaporan](/docs/modules/reporting/) |
| SPK | WorkOrder, item, penugasan, bukti | Inventory, NetworkAsset | [SPK (perintah kerja)](/docs/modules/work-orders/) |
| Service | Paket layanan, profil bandwidth dan kecepatan, tingkat SLA, pengumuman, banner promo | tidak ada | [Katalog layanan](/docs/modules/service-catalogue/) |
| Ticketing | Ticket, kategori, komentar, lampiran, SLA | SPK, NetworkAsset | [Ticketing](/docs/modules/ticketing/) |

Dependensi adalah array `dependencies` di `module.json` tiap modul. Laporan teknisi dijelaskan di [Kinerja teknisi](/docs/modules/technician-performance/). Halaman utama semua modul: [Modul](/docs/modules/).

## Shared core

Kode lintas bidang tetap di `app/`: perusahaan, pengguna, auth, audit, pengaturan, pelanggan, dan langganan. Model bersama ini berada di `app/Models/Core/` dan modul mana pun boleh meng-import-nya: `Customer`, `CustomerAddress`, `CustomerContact`, `ServiceSubscription`, `Location`, dan `EmployeeEvaluation`. Model-model ini bersama, bukan milik satu modul.

## Aturan batas

Aturan ini adalah standar untuk kode baru:

- Logika domain berada di `Modules/<Name>/`, bukan di `app/`.
- Jangan meng-import `Models` modul lain dari controller atau service. Lewati service modul lain, action lintas modul di `app/Actions/`, atau event dan listener.
- Deklarasikan dependensi baru di `module.json` modul.
- Tabel tidak diberi prefiks modul.
- Inventory adalah sumber kebenaran stok. Modul lain mengubah stok hanya lewat action dan service Inventory.
- Reporting adalah satu-satunya pengecualian read-only yang boleh membaca semua modul.
- Model shared core tidak boleh punya foreign key ke model modul, selain pengecualian di bawah.
- Primitif UI di `Components/ui/*` tidak boleh meng-import dari `Components/composite/*`.

### Arah yang diizinkan

```
SPK         issues stock from      Inventory
SPK         installs assets in     NetworkAsset
SPK         activates              the subscription (core)
SPK         triggers an invoice in Billing
Ticketing   spawns a work order in SPK
Ticketing   links to               customer, subscription, asset (shared core and NetworkAsset)
Billing     suspends               the subscription (core)
Billing     issues stock from      Inventory (rare)
NetworkAsset links to              customer, subscription, location (shared core)
Reporting   reads                  all modules, never writes
```

Inventory dan NetworkAsset tidak boleh meng-import model SPK atau Billing. Arah sebaliknya lewat referensi polimorfik atau model shared core.

## Cara modul saling berbicara

1. **Kontrak service atau pemanggilan service.** Modul A memanggil service modul B. Contoh: NetworkAsset menulis alamat IP aset lewat `Modules\Ipam\Services\IpAssignmentService`.
2. **Kelas action.** Proses lintas modul berada di action di `app/Actions/`. Contoh: `CreateInvoiceFromSpkAction`.
3. **Event dan listener.** Kopling longgar untuk efek yang tidak kritis. Contoh: IPAM mengirim `IpAssignmentChanged` setelah transaksi commit, dan NetworkAsset mendengarkannya dengan `QueueAccountOnIpAssignmentChange` untuk mengantrekan pembaruan akun RADIUS. NetworkAsset juga punya `ServiceSubscriptionNetworkObserver`, yang mengantrekan job penerapan ke router saat langganan berubah, sehingga core tidak pernah memanggil modul.
4. **Referensi polimorfik.** Tautan stok memakai string `stock_movements.reference` dan id referensi, bukan foreign key keras.

## Pengecualian terdokumentasi

`service_subscriptions.ont_asset_id` adalah foreign key dari core ke `network_assets`, yang membalik arah normal. Ini ditoleransi karena tautan ONT penting bagi ISP. Ini tautan balik yang didenormalisasi, dan kode core tidak meng-import model aset untuk keperluan itu.

## Keanehan

Jangan "memperbaiki" hal-hal ini tanpa alasan:

- Kode lebih maju daripada dokumen aturan yang lama. Di kode, modul di beberapa tempat meng-import model satu sama lain (misalnya Inventory membaca model SPK dan Ticketing, dan Reporting membaca beberapa modul), dan `module.json` tidak mencantumkan setiap dependensi seperti itu. Aturan batas adalah standar untuk kode baru. Kode yang sudah ada tidak direfaktor massal.
- Core juga menjangkau modul di beberapa tempat. `SubscriptionService` di `app/Services/Core/` memanggil `IpAssignmentService`, `NetworkAssetService`, dan `OdnService`, misalnya untuk melepas alamat statis dan port drop langganan yang diberhentikan dalam transaksi yang sama.
- `Ipam` dan `NetworkAsset` saling mencantumkan sebagai dependensi. Catatan lama mencantumkan Ipam tanpa dependensi.
- `Modules/Service` menaruh `Models/`, `Http/`, dan `Policies/` di root modul dan memetakannya di blok PSR-4 `composer.json`-nya sendiri. Modul lain memakai `app/`.
- `Modules/Ipam` tidak punya folder `tests/`.
- Modul `Customer` adalah cangkang kosong. Kode pelanggan ada di `app/`.
- `Reporting` tidak punya migration dan tidak menulis data. Satu model read-only, `SalesCustomer` pada tabel `customers`, mendeklarasikan relasi Billing yang diagregasi KPI penjualan, sehingga `Customer` core tidak pernah bergantung pada Billing. Model itu menolak save atau delete.
- Catatan arsitektur lama menggambarkan tata letak sebelumnya (folder `Entities/`, penempatan `Http/Requests` yang berbeda). Percayai `Modules/` itu sendiri.

## Tes dan route per modul

Tes tiap modul berada di `Modules/<Name>/tests/{Feature,Unit}`, dan suite PHPUnit bernama `Modules` mengambil file `*Test.php` di sana. `RouteServiceProvider` tiap modul memetakan `routes/web.php` (grup web), `routes/api.php` (prefiks `api/v1` dan nama `api.v1.` yang sama), dan `routes/webhook.php`.
