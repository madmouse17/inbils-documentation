---
title: "Peran dan izin"
description: "Cara Inbils mengotorisasi: satu katalog izin, peran milik tiap perusahaan, templat peran, penanda audiens, policy per record, pemisahan tugas, dan audit log."
---

Inbils memeriksa izin, tidak pernah nama peran. Izin adalah satu katalog yang disimpan di kode. Setiap perusahaan memiliki perannya sendiri dan menyusunnya dari katalog itu. Halaman ini menjelaskan modelnya, guard di sekitar administrasi peran, dan cara izin baru sampai ke perusahaan yang sudah ada.

## Katalog izin

Semua izin terdaftar di `App\Support\PermissionCatalogue::ALL`. Penamaannya `<area>.<action>`, misalnya `customer.view`, `network_asset.install`, `inventory.stock.adjust.request`, `billing.payment.record`, dan `report.consolidated.view`. Katalog mencakup akses aplikasi (`app.web`, `app.technician`), administrasi perusahaan (`users.manage`, `roles.manage`, `company.manage`, `company.integrations.manage`, `company.switch`, `system.setting`), dan area bisnis: pelanggan, paket layanan, jaringan dan RADIUS, IPAM dan ODN, inventaris, SPK, billing, tiket, evaluasi, portal pelanggan, dan laporan.

Perusahaan tidak pernah membuat izin. Perusahaan hanya menentukan izin mana yang dipegang tiap perannya. Katalog di-seed pada instalasi baru oleh `RolePermissionSeeder`.

## Peran dimiliki perusahaan

- Peran adalah baris `roles` dengan `company_id` (NOT NULL, foreign key) dan `template_key` opsional yang mencatat templat asal salinannya.
- `App\Models\Role` memperluas model Spatie dan memakai `BelongsToCompany`, sehingga query peran di-scope oleh perusahaan aktif dan tidak mencocokkan apa pun tanpa perusahaan.
- Spatie berjalan dengan `teams=false`. Isolasi berasal dari model ber-scope, bukan dari Spatie teams. Mode teams ditolak karena peran dengan team null bersifat global dan satu baris nyasar bisa melintasi tenant.
- Pengguna memegang peran per perusahaan: Admin di perusahaan A dan Teknisi di perusahaan B dimungkinkan. Peran satu perusahaan tidak pernah sampai ke perusahaan lain.
- Aturan bisnis tidak pernah memanggil `hasRole`, `hasAnyRole`, `->role()` atau memfilter nama peran. Tes arsitektur `RoleNameChecksArchitectureTest` memindai `app/` dan `Modules/` dan menggagalkan suite bila ada pelanggaran. Karena itu mengganti nama atau menghapus peran tidak merusak fitur apa pun.

### Templat peran

Platform menyimpan peran awal di `role_templates` dan `role_template_has_permissions`. Tabel ini tidak punya `company_id`. Saat perusahaan dibuat (wizard setup, provisioning platform, atau anak perusahaan baru), templat disalin sekali ke perusahaan itu. Setelah itu perusahaan memiliki perannya sendiri. Deploy tidak pernah menyinkronkan ulang, dan mengubah templat hanya memengaruhi perusahaan yang dibuat sesudahnya. Templat `admin` dan `customer` tidak bisa dihapus, dan templat `admin` wajib tetap memuat `roles.manage` dan `app.web`.

| Kunci templat | Nama peran | Tujuan |
| --- | --- | --- |
| `admin` | Admin | Semua izin katalog kecuali penanda audiens lain. |
| `manager` | Manajer | Pengendali operasional: penyetuju, peninjau, auditor. |
| `noc` | NOC & Layanan Pelanggan | Registrasi pelanggan, penerimaan keluhan, tiket, pengumuman gangguan, melihat jaringan. Tanpa hapus, tanpa tulis billing, tanpa administrasi pengguna atau peran. |
| `technician` | Teknisi | Menjalankan pekerjaan yang ditugaskan, mengirim bukti. |
| `warehouse` | Gudang | Menjalankan stok dan permintaan barang. |
| `finance` | Keuangan | Invoice, pembayaran, penandaan refund, laporan billing. |
| `staff` | Staf | Operator operasional: penerimaan, pembuatan, pelaksanaan, dispatch, penagihan. |
| `customer` | Pelanggan | Pengguna portal eksternal: hanya tiket dan pengiriman evaluasi. |

### Penanda audiens

Sebagian izin mengklasifikasikan seseorang, bukan membuka fitur. Izin ini menentukan seseorang termasuk aplikasi yang mana:

| Penanda | Arti |
| --- | --- |
| `app.web` | Akses back office. Login tanpa izin ini dialihkan ke halaman `/app-only`. |
| `app.technician` | Teknisi lapangan. Subjek laporan teknisi, dan halaman itu menyebut aplikasi teknisi. |
| `portal.access` | Akun pelanggan. Bekerja bersama tautan `customers.user_id`. |
| `evaluation.evaluable` | Karyawan yang dapat dievaluasi. |
| `report.technician.team` | Cakupan laporan teknisi: unit organisasi manajer sendiri dan di bawahnya. |
| `roles.manage` | Administrator perusahaan. |

Tidak ada peran yang boleh memegang `portal.access` bersama `app.web`. Administrator perusahaan adalah anggota aktif yang memegang `roles.manage`.

### Peran bawaan

Tabel berikut menunjukkan beberapa menu dan apa yang dibuka templat Admin, Manajer, dan Staf secara bawaan, dari panduan pengguna web (lampiran 10.1). Perusahaan dapat mengubah salinannya, jadi perusahaan nyata bisa berbeda. Label UI berbahasa Indonesia.

| Menu atau kemampuan | Izin yang membukanya | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- |
| Dasbor | `dashboard.view` | ya | ya | ya |
| Penugasan | `ticket.assign`, `ticket.reassign`, `spk.assign` atau `spk.reassign` | ya | ya | tidak |
| Persetujuan | `spk.approve`, `spk.reject`, `inventory.request.approve` atau `inventory.request.reject` | ya | ya | tidak |
| SPK | `spk.view` | ya | ya | ya |
| Tiket | `ticket.view` | ya | ya | ya |
| Pelanggan | `customer.view` | ya | ya | ya |
| Tagihan | `billing.view` | ya | ya | ya |
| KPI Penjualan | `report.sales.view` | ya | ya | tidak |
| Metrik Konsolidasi | `report.consolidated.view` (perusahaan aktif harus berupa Head) | bila Head | tidak | tidak |
| Perusahaan | `company.manage` | ya | tidak | tidak |
| Pengguna | `users.manage` | ya | tidak | tidak |
| Peran | `roles.manage` | ya | tidak | tidak |

## Policy per record

Izin menjawab "bolehkah orang ini melakukan jenis tindakan ini". Policy menjawab "bolehkah ia melakukannya pada record ini". Route memeriksa `can:<permission>`, form request mengotorisasi, dan policy berjalan untuk setiap aksi pada record. Record yang tidak ada, milik perusahaan lain, atau disembunyikan oleh policy dijawab dengan 404 yang sama. Izin yang kurang pada record yang terlihat dijawab 403. Halaman dan shared props juga menyembunyikan apa yang tidak boleh dilakukan pengguna (`usePermission`), tetapi pemeriksaan server adalah kontrolnya.

Kode yang berjalan tanpa pengguna perusahaan yang login (login mobile, job, perintah, webhook) memeriksa izin di dalam `CompanyService::runAs($companyId, fn)` atau dengan `User::withPermissionIn($permissions, $companyId)`. Audiens notifikasi berasal dari `StaffRecipients::holding($companyId, $permission)`, tidak pernah dari nama peran.

## Pemisahan tugas

`App\Support\SodConflicts` mendeklarasikan pasangan izin yang tidak boleh dipegang bersama oleh satu peran, kecuali peran itu juga memegang `roles.manage` (set administrator break-glass).

| Sisi kontrol | Sisi eksekusi |
| --- | --- |
| `inventory.request.approve` atau `reject` | `inventory.request.prepare` atau `issue`, `inventory.stock.receive`, `issue` atau `transfer` |
| `inventory.stock.adjust.approve` | `inventory.stock.adjust.request`, `inventory.stock.receive`, `issue` atau `transfer` |

Pemeriksaan berjalan saat peran disimpan dan saat peran diberikan ke pengguna, di mana izin semua peran pengguna di perusahaan itu digabung. Guard pelaku-sama di service dan policy berlaku untuk semua orang, termasuk administrator: penyetuju SPK tidak boleh pembuat atau teknisi yang ditugaskan, penyetuju permintaan barang tidak boleh pemohon, pemutus penyesuaian stok tidak boleh pemohon, pembatal invoice tidak boleh pembuatnya, dan pembalik pembayaran tidak boleh pencatatnya.

## Guard administrasi peran

Pemegang `roles.manage` mengelola peran di **Administrasi > Peran**. `CompanyRoleService` melakukan setiap penulisan dalam satu transaksi yang lebih dulu mengunci baris perusahaan. Guard-nya:

| Guard | Aturan |
| --- | --- |
| Pegang sendiri | Anda tidak bisa memberi izin ber-guard yang tidak Anda pegang. Penanda tidak di-guard. |
| Cakupan edit | Anda tidak bisa mengubah atau menghapus peran, atau mengubah peran pengguna, yang lebih kaya dari Anda. |
| SoD saat simpan | Peran dengan pelanggaran SoD ditolak kecuali memegang `roles.manage`. |
| SoD bertumpuk | Gabungan izin peran pengguna tidak boleh punya pelanggaran. |
| Administrator terakhir | Minimal satu anggota aktif tetap memegang `roles.manage` dan `app.web`. |
| Peran portal | Peran hasil salinan templat `customer` tidak bisa dihapus. |
| Memindahkan pengguna | Menghapus peran yang punya pengguna membutuhkan `move_to`, peran lain di perusahaan yang sama. |
| Edit basi | Edit pada salinan yang usang ditolak dengan 409. |

Peran perusahaan lain di URL dijawab 404 atau galat validasi, tidak pernah data. Platform mengedit templat di `/platform/role-templates` dan dapat memperbaiki peran satu perusahaan di `/platform/companies/{company}/roles` sebagai aksi dukungan yang diaudit. Admin platform tidak pernah memegang peran tenant.

## Audit log

Penulisan peran masuk ke log `security` lewat `AuditService`: `role.created`, `role.updated` (dengan izin yang ditambah dan dicabut) dan `role.deleted` (dengan pengguna yang dipindah), ditambah `role.attached` dan `role.detached` untuk penugasan. Aksi templat dan perbaikan platform masuk ke log `platform`, dan perbaikan juga menulis baris `support` yang terlihat tenant. Retensinya 365 hari, dan 730 hari untuk `security`, `platform`, dan `support`. Baris audit menyembunyikan data pribadi seperti field pelanggan dan alamat email.

## Mengirim izin baru

Deploy tidak pernah menjalankan `db:seed` untuk peran. Untuk menambah izin:

1. Tambahkan ke `PermissionCatalogue::ALL` dan ke entri `templates()` yang relevan.
2. Kirim migration yang memanggil `PermissionCatalogue::release($permission, $templateKeys)`. Contohnya `database/migrations/2026_11_02_100700_release_ticket_reopen_to_templates.php`.

`release()` membuat izin, menambahkannya ke templat yang disebut dan ke setiap peran perusahaan yang `template_key`-nya cocok. Fungsi ini tidak pernah menghapus apa pun dan tidak pernah menyinkronkan ulang. Peran buatan sendiri tidak menerimanya: administrator perusahaan menambahkannya di **Administrasi > Peran**.

Sisa risiko yang diketahui: izin langsung yang diberikan ke satu pengguna tidak ter-scope per perusahaan dan tidak diperiksa oleh aturan SoD. Tidak ada kode aplikasi yang menulisnya.
