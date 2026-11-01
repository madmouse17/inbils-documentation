---
title: "Service layer dan frontend"
description: "Di mana Inbils menaruh aturan bisnis (service, action, query class, resource) dan cara halaman React bekerja sebagai island Inertia dengan route Ziggy dan primitif UI bersama."
---

Inbils menaruh setiap jenis kode di satu tempat. Controller tipis, service memegang aturan bisnis dan transaksi, action menggabungkan service, query class menangani pembacaan berat, dan resource membentuk apa yang keluar dari server. Frontend mengikuti disiplin yang sama: Laravel memegang routing, auth, dan alur kerja, dan setiap halaman adalah island React yang kecil. Halaman ini membahas kedua sisinya.

## Pola backend

```
Route -> middleware (auth, company, can:) -> Controller (thin)
      -> FormRequest (validation + authorize) -> Policy (per record)
      -> Service (business rules, DB::transaction) [-> Action when it spans services]
      -> Model (relations, scopes, casts(), factory; NO business logic, NO service call)
      -> API Resource / Inertia props
```

### Controller

Controller membaca request, memanggil satu service, dan mengembalikan halaman Inertia, resource, atau redirect. Controller tidak memuat logika bisnis.

### Form request

Setiap penulisan punya form request. Form request memvalidasi input dan mengotorisasi aksi, dengan `$fillable` yang eksplisit (tidak pernah `Model::guarded([])`). Request yang menyebut record menerima ULID publik dan memetakannya ke key integer di dalam perusahaan (`ResolvesPublicIds`, `PublicIdExists`).

### Policy

Policy memutuskan per record. Lihat [Peran dan izin](/docs/architecture/permissions/) untuk aturan 404 versus 403.

### Service

Service memegang aturan bisnis: create, update, delete, dan transisi status. Service membungkus penulisan lintas beberapa tabel dalam `DB::transaction()` dan menulis audit lewat `AuditService`. Service tidak boleh:

- menangani request atau response HTTP (tugas controller),
- memanggil `request()->input()` (data tervalidasi dikirim masuk),
- merender view,
- memanggil `env()` (pakai `config()`).

Service dinamai `{Domain}Service`, misalnya `SubscriptionService`, `CompanyService`, dan `CompanyRoleService` di shared core, serta `NetworkAssetService` di sebuah modul.

### Action

Action mengorkestrasi proses yang melibatkan beberapa service, sehingga tidak ada satu service pun yang perlu mengenal yang lain. Action dinamai `{Verb}{Entity}Action`. Yang ada di core `app/Actions/` adalah `CreateCustomerOnboardingAction`, `CreateInvoiceFromSpkAction`, `SetCustomerWhatsAppConsentAction`, dan `AssignCustomerAcquirerAction`. Provisioning platform punya `ProvisionTenantAction` dan `AddTenantSubsidiaryAction`. Modul punya folder `Actions/` sendiri.

### Query class

Query class memegang pembacaan yang kompleks: lebih dari sekitar 30 baris, atau dipakai dua controller atau lebih. Letaknya di `app/Queries/` dan `Modules/<Name>/Queries/`, bersifat read-only, dan mengembalikan data untuk halaman Inertia, seperti dasbor, kotak persetujuan, antrean dispatch, atau "Pekerjaan Saya".

### Resource

Setiap respons API dan Inertia dibentuk oleh Eloquent resource, sehingga kontrak frontend tetap stabil. Resource menyematkan record terkait sebagai ringkasan pendek (`{id, code, name}`), bukan model utuh, dan mengeluarkan `public_id` sebagai `id`. Resource untuk aplikasi mobile ada di `app/Http/Resources/Api/V1/` dan berupa allow-list, terpisah dari resource admin.

### Penamaan

| Artefak | Pola |
| --- | --- |
| Service | `{Domain}Service` |
| Action | `{Verb}{Entity}Action` |
| Policy | `{Model}Policy` |
| Resource | `{Model}Resource` |
| Nama route | `admin.<area>.<action>` |
| Izin | `<area>.<action>` |
| Foreign key | `{singular}_id` |

### Helper integritas

Guard yang sudah ada adalah `OptimisticLock` (edit basi menghasilkan 409), `PreventDuplicateWebSubmit` (penulisan identik dalam 10 detik ditolak), pemeriksaan `X-Inbils-Company` di `ResolveActiveCompany`, `DetectRecordEnumeration` (429 setelah banyak 404 record), dan `lockForUpdate` untuk penghitung dan pembuatan kode. Uang memakai `App\Support\Money`. Penomoran memakai `NumberSequenceService` dengan templat per perusahaan, tidak pernah kode yang dirangkai manual.

## Frontend: halaman Inertia sebagai island

Setiap route merender satu halaman React dari `resources/js/Pages/**`. Tidak ada router sisi klien, tidak ada Redux atau Zustand, dan tidak ada React Query. State server datang sebagai props Inertia. State UI lokal (modal, tab, draf filter) memakai `useState`. Aksi yang menyimpan data (simpan, hapus) adalah kunjungan Inertia.

```
resources/js/
  app.tsx                Inertia bootstrap, ToastProvider, ErrorBoundary, X-Inbils-Company interceptor
  Components/ui/         Primitives: Button, Input, Table, Card, Modal, Dialog, Badge, EmptyState, Skeleton, Toast, ...
  Components/composite/  Business patterns: DataTable, PageHeader, FormField, FormSection, ConfirmDialog, MoneyInput, StatusFilter, ...
  Layouts/               AdminLayout, GuestLayout, SetupLayout, PlatformLayout, PlatformAuthLayout
  Pages/                 Admin/<Domain>/, Platform/, Portal/, Auth/, Profile/, Setup/, Isolir/
  hooks/                 usePermission, useCompany, useInertiaForm, useToast, useServerTable, ...
  lib/                   utils, format, dateFormat, filters, ...
  types/                 TypeScript interfaces that mirror the resources
```

### Aturan halaman

- Halaman menyusun `Components/ui/*` dan `Components/composite/*`. `<button>`, `<input>`, `<table>`, dan `<select>` mentah tidak muncul di halaman. Primitif yang belum ada ditambahkan dulu ke `Components/ui/`, hanya dengan props (tanpa fetch).
- Varian hidup di komponen (dengan `class-variance-authority`), bukan di override class tingkat halaman.
- Form memakai `useForm` dari `@inertiajs/react`, atau pembungkus toast-nya `useInertiaForm`. Galat validasi kembali di `errors`. Form edit mengirim `expected_updated_at`.
- `usePermission()` membaca `auth.user.permissions` dari shared props untuk menyembunyikan atau menonaktifkan kontrol. Server tetap yang menegakkan.
- Paginasi, pengurutan, dan filter digerakkan server (`useServerTable` dan `DataTable`), bukan di sisi klien atas daftar penuh.
- Daftar dan tabel butuh status loading, kosong, dan galat. Deferred props butuh skeleton.
- `axios` hanya untuk beberapa helper JSON seperti dialog pembuatan cepat. Header `X-Inbils-Company`-nya ditambahkan oleh interceptor di `app.tsx`.

### Route Ziggy

Halaman bernavigasi dengan `<Link>` dan `router` dari Inertia serta `route('admin.x.y')` dari Ziggy. `@routes` di `app.blade.php` memuat satu grup route untuk shell tenant dan satu lagi untuk shell platform, sehingga berpindah di antara keduanya adalah pemuatan halaman penuh. Tidak ada URL yang ditulis langsung. `resources/js/ziggy.js` dihasilkan otomatis dan diabaikan git.

### Primitif UI bersama dan gaya

- TypeScript ketat tanpa `any`. Komponen adalah function component dengan props eksplisit.
- Ikon hanya dari `lucide-react`.
- Tailwind CSS v4 dikonfigurasi di CSS (`resources/css/app.css`, `@theme`), dengan token terang dan gelap. Komponen memakai token semantik (`brand`, `surface`, `success`, `warning`, `danger`, `--status-*`) dan tidak pernah hex mentah. Mode gelap adalah class di `<html>`.
- Teks dan tautan berwarna brand atau merah memakai `text-primary-text` dan `text-destructive-text`, bukan `text-primary` atau `text-destructive`, untuk menjaga kontras 4,5:1 untuk teks dan 3:1 untuk border dan ikon di kedua tema.
- `Button` punya varian `primary` (satu aksi utama), `outline` dan `secondary`, `destructive-outline`, `destructive` (hanya untuk konfirmasi), dan `ghost` (toolbar khusus ikon).
- Kontrol setinggi 44 px di bawah breakpoint `sm` dan pada pointer kasar. Teks tidak pernah di bawah 12 px. Elemen interaktif menampilkan status fokus, hover, active, dan disabled yang terlihat.
- Temanya datar. Fontnya Figtree, di-host sendiri.
- Nilai kosong memakai `<EmptyCell />`. Teks UI berbahasa Indonesia, sentence case, tanpa em dash.
- Kode diformat dengan Prettier (4 spasi, tanda kutip tunggal, lebar 100) dan diperiksa dengan ESLint dan `tsc`.
