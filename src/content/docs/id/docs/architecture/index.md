---
title: "Ikhtisar arsitektur"
description: "Cara Inbils dibangun: stack, alur request berlapis, halaman Inertia, peta repositori, transaksi, aturan integritas, caching, dan queue."
---

Inbils adalah satu aplikasi Laravel yang melayani banyak ISP (tenant). Aplikasi ini merender layar dengan Inertia dan React, menaruh aturan bisnis di kelas service, dan membagi kode domain ke modul nwidart. Halaman ini memberi gambaran umum. Halaman arsitektur lain membahas lebih dalam: [Multi-tenancy](/docs/architecture/multi-tenancy/), [Peran dan izin](/docs/architecture/permissions/), [Model data](/docs/architecture/data-model/), [Service layer dan frontend](/docs/architecture/service-layer/) dan [Modul dan batasnya](/docs/architecture/modules/).

## Stack

| Lapisan | Teknologi |
| --- | --- |
| Runtime | PHP `^8.4` di `composer.json`. Image Sail dan produksi memakai PHP 8.5.12 atau lebih baru. FrankenPHP melayani produksi. |
| Framework | Laravel `^13.0`, Inertia Laravel `^2.0` |
| Modul | `nwidart/laravel-modules ^12.0`, dengan composer merge plugin yang membaca `Modules/*/composer.json` |
| Auth | Laravel Sanctum `^4.0` untuk token mobile, session guard untuk web, scaffolding Breeze untuk layar login |
| Paket | `spatie/laravel-permission`, `spatie/laravel-medialibrary`, `spatie/laravel-activitylog`, `spatie/laravel-query-builder`, `tightenco/ziggy`, `barryvdh/laravel-dompdf`, `kreait/laravel-firebase`, `laravolt/indonesia`, `mlocati/ip-lib`, `pragmarx/google2fa` |
| Database | MySQL 8.4 |
| Cache dan queue | Redis 7.4 untuk cache. Driver queue adalah `database` pada setup yang terdokumentasi. |
| Frontend | React `^18.2`, TypeScript `^5`, `@inertiajs/react ^2`, Vite `^7`, Tailwind CSS `^4.3` (CSS-first, tanpa `tailwind.config.js`), primitif Radix UI, `lucide-react`, `@tanstack/react-table`, `recharts`, `leaflet` |
| Tes | PHPUnit 11 (tanpa Pest), Playwright untuk end-to-end |

Catatan lama di repositori masih menyebut Tailwind v3 atau Laravel 11. Catatan itu sudah usang.

## Alur backend berlapis

Setiap penulisan data melewati lapisan yang sama:

```
Route -> middleware (auth, company, can:) -> Controller (thin)
      -> FormRequest (validation + authorize) -> Policy (per record)
      -> Service (business rules, DB::transaction) [-> Action when it spans services]
      -> Model (relations, scopes, casts(), factory; no business logic)
      -> API Resource / Inertia props
```

| Lapisan | Tugas |
| --- | --- |
| Route dan middleware | Mengautentikasi, menentukan perusahaan aktif, memeriksa izin route (`can:<permission>`). |
| Controller | Membaca request, memanggil satu service, mengembalikan halaman Inertia, resource, atau redirect. Tanpa logika bisnis. |
| Form request | Memvalidasi setiap penulisan dan mengotorisasinya. |
| Policy | Memutuskan per record. Penolakan karena scope dijawab 404 yang seragam, izin yang kurang pada record yang terlihat dijawab 403. |
| Service | Memegang aturan bisnis dan transaksi database. Menulis audit lewat `AuditService`. |
| Action | Mengorkestrasi proses yang melibatkan beberapa service. Dinamai `{Verb}{Entity}Action`. |
| Model | Hanya relasi, scope, cast, dan factory. Model tidak pernah memanggil service. |
| Resource | Membentuk output. Record terkait disematkan sebagai ringkasan pendek, bukan model utuh. |

Otorisasi diperiksa di route, di form request, dan di policy untuk setiap aksi pada record. Menyembunyikan tombol di UI hanya kemudahan, bukan kontrol.

## Halaman Inertia

Laravel memegang routing, autentikasi, izin, dan alur kerja. Setiap route merender satu halaman React di `resources/js/Pages/**`. Tidak ada router single-page-app, tidak ada Redux, dan tidak ada React Query. State dari server datang sebagai props Inertia, dan form memakai `useForm` dari `@inertiajs/react`. Rinciannya ada di [Service layer dan frontend](/docs/architecture/service-layer/).

## Peta repositori

```
app/                 Shared core: companies, users, auth, audit, customers, subscriptions, locations, platform
  Actions/           Multi-service orchestration
  Http/Controllers/  Admin/ (tenant back office), Api/V1/ (mobile), Auth/, Platform/, Setup/
  Http/Middleware/   ResolveActiveCompany, HandleInertiaRequests, Api/*, Platform/*, ...
  Http/Requests/     Form requests
  Models/            Core models, Role, RoleTemplate, PlatformAdmin
  Policies/          Core policies
  Queries/           Read-heavy query classes
  Services/          Core services, Platform/, Push/, WhatsApp/
  Support/           PermissionCatalogue, PublicId, OptimisticLock, Money, SodConflicts, ...
  Traits/            BelongsToCompany, HasPublicId, HasLifecycle
Modules/<Name>/      Domain code, namespace Modules\<Name>\
bootstrap/app.php    Middleware groups and aliases, exception rendering, routing
config/              platform.php, security.php, sanctum.php, modules.php, ...
database/            Core migrations, seeders, factories
resources/js/        Frontend: Pages, Components/ui, Components/composite, Layouts, hooks, lib, types
routes/              web.php, admin.php, api.php, webhooks.php, platform.php, console.php
tests/               Feature, Unit, shared builders, Playwright specs
```

| File route | Isi |
| --- | --- |
| `routes/web.php` | `/`, `/ready`, `/app-only`, wizard `/setup` sekali pakai, profil. |
| `routes/admin.php` | Back office tenant. Prefix `admin`, nama route `admin.*`. |
| `routes/platform.php` dan `routes/platform/*.php` | Panel operator di `/platform`. Setiap file di folder itu dimuat otomatis. |
| `routes/api.php` | API mobile di `api/v1`, nama route `api.v1.*`. |
| `routes/webhooks.php` | Callback server-ke-server seperti WhatsApp. Di-throttle, tanpa session atau CSRF. |
| `routes/console.php` | Scheduler. |

Setiap modul juga punya `routes/web.php`, `api.php`, dan `webhook.php` sendiri, yang dipetakan oleh `RouteServiceProvider` modul.

## Alur request satu layar

Layar aset jaringan menunjukkan seluruh rantainya:

1. `GET /admin/network-assets` melewati middleware grup `auth`, `verified`, `redirect.app.only`, dan `require.has.company`.
2. `NetworkAssetController::index` mengotorisasi `viewAny` pada model, menjalankan query class, dan mengembalikan halaman Inertia dengan resource sebagai props.
3. React merender halaman di dalam `AdminLayout`. Pengguna membuka sebuah aset lalu memasangnya.
4. Halaman mengirim `POST /admin/network-assets/{asset}/install`. ULID di URL diperiksa oleh `whereUlid` sebelum query apa pun berjalan.
5. `InstallNetworkAssetRequest` memvalidasi input. Controller mengotorisasi `network_asset.install`.
6. `NetworkAssetService::install` menulis dalam transaksi. Service menolak berjalan tanpa konteks perusahaan.
7. Controller me-redirect kembali dengan pesan flash, yang ditampilkan halaman sebagai toast.

## Transaksi dan integritas

- Penulisan yang menyentuh beberapa tabel berjalan di dalam `DB::transaction()` pada service.
- Foreign key wajib. `ON DELETE RESTRICT` melindungi record induk, `ON DELETE CASCADE` menghapus baris anak seperti `invoice_items`, `work_order_items`, dan `ticket_comments`.
- Kode bisnis unik per perusahaan, misalnya `(company_id, sku)`. Unique index dan check constraint di database lebih diutamakan daripada validasi aplikasi.
- Soft delete hanya untuk entitas historis. `StockMovement`, `NetworkAssetInstallation`, dan `Payment` bersifat append-only.
- Form mengirim `expected_updated_at`. Edit yang basi ditolak dengan 409 (`App\Support\OptimisticLock`).
- Penulisan `admin.*` yang identik oleh pengguna yang sama dalam 10 detik ditolak (`PreventDuplicateWebSubmit`).
- Penghitung dan pembuatan kode memakai `lockForUpdate`. Uang lewat `App\Support\Money`, dan nomor lewat `NumberSequenceService`.

Lihat [Model data](/docs/architecture/data-model/) untuk daftar lengkap invarian.

## Caching dan queue

- Cache hanya berisi skalar dan array: `config/cache.php` mengatur `serializable_classes` ke `false`, sehingga model, collection, atau objek Carbon akan kembali dalam keadaan rusak. Key cache membawa versi seperti `v2` supaya deploy atau rollback tidak pernah membaca bentuk lama.
- Cache izin Spatie adalah satu key global yang menyimpan peran semua perusahaan. Cache ini dibuang setelah setiap penulisan peran.
- Data bisnis yang cepat berubah seperti stok dan status aset tidak di-cache.
- Pekerjaan lambat atau massal (email, PDF, ekspor, impor, API eksternal) berjalan di job queue. Job panjang platform memakai queue `platform` sendiri. Lihat [Queue dan scheduler](/docs/operations/queues-and-scheduler/).
- Scheduler ada di `routes/console.php`: proses billing, `tickets:sla`, `midtrans:reconcile`, `network:sync`, heartbeat, prune, dan pengingat.
