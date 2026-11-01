---
title: "Arsitektur multi-tenant"
description: "Cara satu instalasi Inbils memisahkan banyak ISP: scoping perusahaan, perusahaan aktif, panel operator platform, impersonation, ekspor, purge, dan peran per perusahaan."
---

Satu instalasi Inbils menampung banyak ISP. Tenant adalah satu perusahaan tingkat atas beserta anak perusahaannya (bila ada). Setiap record tenant membawa `company_id`, dan aplikasi menyaringnya otomatis serta menolak bila konteksnya tidak ada (fail closed). Halaman ini menjelaskan cara isolasi bekerja dan apa yang boleh serta tidak boleh dilakukan operator platform.

## Apa itu tenant

- `companies.parent_company_id` bernilai null untuk perusahaan tingkat atas. Anak perusahaan menunjuk ke induknya. Hierarkinya satu tingkat: perusahaan induk (head), lalu anak perusahaan. `CompanyHierarchyService` menolak induk ke diri sendiri dan tingkat yang lebih dalam.
- `Company::isHead()` bernilai true untuk perusahaan tingkat atas yang punya anak perusahaan aktif.
- Perusahaan induk hanya melihat anak perusahaannya di laporan konsolidasi yang read-only (izin `report.consolidated.view`, dan mata uangnya harus sama). Menulis data di anak perusahaan berarti berpindah ke perusahaan itu.
- Identitas perusahaan (nama, logo, mata uang, zona waktu) ada di database (`companies` dan `companies.settings`), tidak pernah di `.env`. Rahasia dan infrastruktur tetap di `.env`. Akun Midtrans, WhatsApp, RADIUS, dan email disimpan per perusahaan di pengaturan integrasi.
- Hanya operator platform yang membuat tenant dan anak perusahaan. Registrasi publik dinonaktifkan. Perintah CLI `inbils:company:create-subsidiary` tersedia untuk operasional.

## Cara scoping ditegakkan

Setiap model master dan transaksi memakai trait `App\Traits\BelongsToCompany`:

| Aturan | Rincian |
| --- | --- |
| Global scope | Global scope bernama `company` menambahkan `<table>.company_id = CompanyService::currentId()` ke setiap query. |
| Create | Hook `creating` mengisi `company_id` dari sumber yang sama. |
| Fail closed | Tanpa konteks perusahaan, scope tidak mencocokkan apa pun, dan pembuatan record dijawab 403. |
| Model yang dikecualikan | `User`, `Permission`, `ActivityLog`, `Company`, `PlatformAdmin`, dan `TenantExport`. Keanggotaan adalah batas tenant mereka. |

Peran tidak lagi menjadi pengecualian: `App\Models\Role` juga memakai trait ini (lihat [Peran dan izin](/docs/architecture/permissions/)).

### Perusahaan aktif

`CompanyService` menentukan tenant:

- `currentId()` mengembalikan id perusahaan efektif, atau null bila tidak ada pengguna atau konteks.
- `idFor($user)` mengembalikan perusahaan efektif untuk pengguna tertentu. `current()` mengembalikan `Company`. `setting($key)` membaca pengaturan per perusahaan.
- Perusahaan efektif adalah nilai session `active_company_id`, yang divalidasi ulang terhadap tabel keanggotaan `company_user` dan status perusahaan aktif pada setiap pembacaan, atau jika tidak ada, perusahaan asal (home) pengguna.
- `users.company_id` hanya perusahaan asal, tempat pengguna masuk saat login. Kolom ini tidak pernah berarti "tenant".
- Berpindah ke perusahaan lain membutuhkan izin `company.switch` ditambah keanggotaan di perusahaan tujuan. Kembali ke perusahaan asal pengguna hanya membutuhkan keanggotaan.

Kode yang berjalan tanpa pengguna yang login (perintah Artisan, job queue, listener, webhook, seeder) membungkus pekerjaannya dengan `CompanyService::runAs($companyId, fn () => ...)`. Pemanggilan ini bisa bersarang dan memulihkan scope sebelumnya.

Melintasi perusahaan jarang terjadi dan harus eksplisit. `Model::withoutCompany()` dan `Model::forCompany($id)` dicadangkan untuk kode platform, perintah, job, dan seeder, dan tenant selalu disebut namanya. Controller tenant tidak mendapat pengecualian itu.

### Keamanan antar tab

Frontend mengirim header `X-Inbils-Company` pada setiap kunjungan non-GET. Jika tab browser lain sudah berpindah perusahaan, `ResolveActiveCompany` menjawab 409, sehingga form tidak pernah tersimpan ke perusahaan yang salah.

### Kode unik per perusahaan

Tabel tenant punya `company_id` (unsigned bigint, foreign key ke `companies.id`, NOT NULL) dan unique index per perusahaan: `(company_id, sku)` dan bukan `sku`, `(company_id, code)` untuk pelanggan, SPK, dan tiket, `(company_id, number)` untuk invoice. Composite index diawali `company_id`. Satu-satunya kode bisnis yang unik secara global adalah `companies.code`.

### Perusahaan yang ditangguhkan

Perusahaan dengan `is_active` false ditolak di semua tempat penggunanya beraksi. Login web dan mobile menjawab 422 dengan pesan penangguhan bila perusahaan asal pengguna ditangguhkan dan tidak ada keanggotaan aktif lain. `ResolveActiveCompany` memindahkan session ke keanggotaan aktif pertama atau mengeluarkannya. Pembaruan perusahaan mencabut token API para penggunanya.

## Panel operator platform

Operator instalasi bekerja di panel `/platform`. Panel ini adalah bidang identitas yang terpisah:

| Aspek | Aturan |
| --- | --- |
| Identitas | Tabel `platform_admins`, model `PlatformAdmin`, session guard `platform`. Admin platform tidak pernah berupa `User`. |
| Tanpa ikatan tenant | Tanpa `company_id`, tanpa keanggotaan perusahaan, tanpa peran tenant, tanpa token Sanctum, tanpa remember-me. |
| Bukan pengecualian | Admin platform tidak pernah melewati policy tenant. |
| Pembuatan | Dari konsol dengan `php artisan inbils:platform:admin-create`. |
| Login | TOTP wajib. Login pertama hanya bisa mencapai pendaftaran TOTP, yang menampilkan 8 kode pemulihan satu kali. |
| Throttle | 5 kegagalan per menit per email dan IP, serta 20 per jam per email. |
| Session | Batas idle 30 menit. |

Panel dilayani di `/platform` pada host aplikasi. Atur `PLATFORM_DOMAIN` (config `platform.domain`) untuk mengikat route platform ke host khusus. Host itu lalu ditambahkan ke trusted hosts. Host yang bukan host aplikasi maupun subdomainnya membutuhkan rencana session dan cookie sendiri, karena impersonation berbagi satu session.

Route ada di `routes/platform.php` dan setiap file di bawah `routes/platform/`. Layout dan grup route Ziggy dipisah dari shell tenant, sehingga berpindah di antara keduanya adalah pemuatan halaman penuh.

### Konfirmasi step-up

Aksi platform yang sensitif membutuhkan konfirmasi kata sandi yang baru, berlaku 5 menit dan dibatasi 5 percobaan per menit per admin dan IP. Menangguhkan perusahaan, mengajukan penghapusan, meminta ekspor, dan mengubah impersonation ke mode tulis juga mewajibkan mengetik ulang kode perusahaan yang persis sama.

### Penangguhan dan penghapusan

- Penangguhan berlaku pada akar tenant dan anak perusahaannya yang aktif. Pembaruan perusahaan mencabut token API, dan pengguna tenant ditolak saat login dan pada setiap request.
- Mengaktifkan kembali hanya mengaktifkan baris yang sempat ditangguhkan dan membatalkan permintaan penghapusan yang tertunda.
- Permintaan penghapusan baru boleh diajukan 30 hari setelah penangguhan, dan hanya setelah ada ekspor yang selesai sesudah penangguhan.
- Panel web tidak pernah melakukan purge data. Purge hanya berjalan lewat `php artisan inbils:platform:purge-company {code}`, secara interaktif, dengan kode diketik ulang dan preflight yang mencetak jumlah baris dan file.

### Ekspor data

Permintaan ekspor membutuhkan kata sandi platform dan kode perusahaan. Job berjalan di queue `platform` dan memasuki setiap perusahaan lewat `CompanyService::runAs`. Hasilnya berupa ZIP berisi file CSV tenant dan folder media. Kata sandi, hash, secret TOTP, dan kode pemulihan tidak disertakan, dan manifest mencantumkan kolom yang dihilangkan. Arsip disimpan di disk privat, dan unduhan membutuhkan session platform aktif, two-factor, dan signed URL yang berlaku paling lama 24 jam.

## Impersonation (akses dukungan)

Akses dukungan memungkinkan operator melihat apa yang dilihat pengguna tenant.

- Hanya web. Session menyimpan admin platform, pengguna target, tenant, alasan 5 sampai 200 karakter, waktu mulai, batch UUID, dan mode.
- Target harus pengguna aktif dari tenant yang aktif.
- Mode bawaan adalah baca: hanya request GET dan HEAD serta pergantian perusahaan yang diizinkan. Mode tulis membutuhkan kata sandi platform dan kode perusahaan sekali lagi.
- Batas keras 30 menit, diperiksa server pada setiap request. Banner hanya indikator.
- Admin platform tetap menjadi pelaku sebenarnya di activity log, sedangkan pengguna yang diimpersonasi menjadi identitas yang bertindak untuk policy dan kolom bisnis seperti `created_by`. Semua aktivitas satu session berbagi `batch_uuid`.
- Mulai, perubahan mode, setiap penulisan, dan akhir dicatat di log platform dan log tenant. Baris yang terlihat tenant memakai nama log `support` dan menampilkan nama tim dukungan yang netral, tidak pernah email atau id internal operator.
- Dilarang selama impersonation: halaman profil dan keamanan milik operator sendiri, mengubah kata sandi, email, atau two-factor target, membaca secret, kode pemulihan, atau token, menerbitkan token API, dan mengakses tenant yang ditangguhkan.

## Peran per perusahaan (ADR-004)

Peran dimiliki perusahaan. `roles.company_id` NOT NULL, dan `App\Models\Role` memakai `BelongsToCompany`, sehingga setiap query peran di-scope seperti tabel tenant lain. Izin tetap satu katalog di kode. Platform menyimpan templat peran dan menyalinnya ke perusahaan satu kali, saat perusahaan dibuat. Pengguna yang bekerja untuk dua perusahaan dapat memegang peran berbeda di masing-masing. Alasan keputusan, alternatif yang ditolak, dan guard administrasinya ada di [Peran dan izin](/docs/architecture/permissions/).

## Instalasi pertama

`inbils:setup` membuat pengguna bootstrap tanpa perusahaan. Setelah login, wizard `/setup` sekali pakai membuat perusahaan pertama dan menyalin templat peran. Wizard menjawab 403 setelah ada perusahaan. Instalasi hanya melakukan seed katalog izin, templat peran, dan nilai bawaan pengaturan sistem.
