---
title: "8.7 Permissions (Hak Akses)"
description: "Look up the read-only catalogue of permission codes, their meaning and their groups before you build or change a role."
---

This menu is the catalogue of permission codes the system knows, read-only. Open it when you need to confirm the exact permission code or its group, for example before building or changing a role ([section 8.6](/docs/guides/web/administration/roles/)). The catalogue is the same for all companies.

Roles that can use it: admin. Permissions: `roles.manage`, the same as the **Peran** (Roles) menu. This screen has no add, edit, delete or export button.

## Opening and reading the list

1. In the sidebar, open the **Administrasi** (Administration) group, then click **Hak Akses** (Permissions).
2. Read the screen (subtitle "Semua hak akses yang bisa diberikan ke peran. Daftar ini hanya untuk dibaca." (All permissions that can be given to roles. This list is read-only.)):
   - **Cari** (Search) (hint "Kode hak akses, mis. billing.view" (Permission code, e.g. billing.view)) searches part of the permission code. The search does not read the **Fungsi** (Function) column.
   - **Kode** (Code) (can be sorted): the permission code, in the pattern `<area>.<action>` or `<area>.<object>.<action>`, for example `billing.payment.record`.
   - **Fungsi**: what the permission allows, as an Indonesian sentence, for example "Catat pembayaran" (Record payment). This text is the same as the permission label on the role detail page ([section 8.6](/docs/guides/web/administration/roles/)).
   - **Kelompok** (Group): a badge with the Indonesian name of the code prefix before the first dot, for example **Tagihan** (Invoices) for `billing`. This group is the same as the category on the role detail page.
   - Below the table are a note with the number of rows shown, the "Baris per halaman" (Rows per page) picker (10, 25 or 50), and the **Sebelumnya** (Previous) and **Berikutnya** (Next) buttons with the note "Halaman n dari m" (Page n of m). The default catalogue holds 173 permissions.
   - If there are no rows, the screen shows "Belum ada hak akses" (No permissions yet) (note "Hak akses dibuat bersama pembaruan sistem." (Permissions are created together with system updates.)), or "Tidak ada hak akses yang cocok" (No matching permissions) with the **Reset filter** (Reset filters) button when a search is active.

   ![Permissions list with the Search box and the columns Code, Function and Group](~/assets/guide/web/permissions.webp)

3. Use this catalogue as a dictionary. Search for part of a code, for example `export` for export permissions or `approve` for approval permissions, then check whether your role holds it on the role detail page ([section 8.6](/docs/guides/web/administration/roles/)). A summary of permissions per role is in appendix 10.1.

Group names in the **Kelompok** column and in the permission picker:

| Code prefix | Name on screen |
|---|---|
| `billing` | Tagihan (Invoices) |
| `company` | Perusahaan (Company) |
| `customer` | Pelanggan (Customers) |
| `dashboard` | Dasbor (Dashboard) |
| `developer` | Pengembang (Developer) |
| `employee` | Karyawan (Employees) |
| `evaluation` | Evaluasi (Evaluations) |
| `inventory` | Inventaris (Inventory) |
| `ipam` | IPAM |
| `location` | Lokasi (Locations) |
| `network_asset` | Aset jaringan (Network assets) |
| `odn` | ODN |
| `organization` | Organisasi (Organisation) |
| `portal` | Portal pelanggan (Customer portal) |
| `report` | Laporan (Reports) |
| `roles` | Peran (Roles) |
| `service` | Paket layanan (Service packages) |
| `spk` | SPK |
| `system` | Sistem (System) |
| `ticket` | Tiket (Tickets) |
| `users` | Pengguna (Users) |
| `vehicle` | Kendaraan (Vehicles) |

This screen does not show which role holds a given permission. For that, open **Ubah** (Edit) on the role concerned.

## Common errors

- The **Hak Akses** item does not appear in the sidebar: your account does not hold `roles.manage`.
- The permission you are looking for is not in the list: the catalogue holds only permissions created by the system. An admin cannot add permissions from this screen.
- A search with an Indonesian phrase, for example "Catat pembayaran", finds nothing: the **Cari** box on this screen matches only codes. Search with part of a code, or use the **Cari hak akses** (Search permissions) box in the role form, which also reads the Indonesian labels.
- A permission exists but has no effect on someone: the permission must be held by that person's role ([section 8.6](/docs/guides/web/administration/roles/)) and that role must be given to the user ([section 8.5](/docs/guides/web/administration/users/)).
