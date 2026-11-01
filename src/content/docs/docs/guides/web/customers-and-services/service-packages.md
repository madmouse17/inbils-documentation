---
title: "4.2 Service packages (Paket Layanan)"
description: "Create and edit the internet packages you sell, set prices and package versions, and manage package categories."
---

Paket Layanan (Service packages) is the catalogue of internet packages sold to customers. One package combines one bandwidth profile, one speed profile and one SLA tier, plus a monthly price and an installation price. Open this menu when you add a new package, change a price, or deactivate a package that is no longer sold.

Roles that can use it: admin, manager, staff. Permissions: `service.view` or `service.manage` opens the menu and the list, `service.create` creates packages, `service.update` edits packages, `service.delete` deletes packages, `service.export` exports the list. The permission `service.manage` already covers view, create, edit and delete, but not export. With the built-in roles: admin holds all permissions, manager holds `service.view`, `service.create`, `service.update` and `service.manage` (without export), and staff hold only `service.view`. Technicians and customers have no service permissions.

## Opening and reading the list

1. In the sidebar, open the group **Pelanggan & Layanan** (Customers & Services), then click **Paket Layanan**.
2. Read the package list.

   - The **Cari** (Search) box (field "Nama atau kode" (Name or code)) searches package codes and names.
   - The **Status** filter holds **Semua status** (All statuses), **Aktif** (Active), **Nonaktif** (Inactive), **Dihapus** (Deleted) and **Semua, termasuk dihapus** (All, including deleted) ([section 1.5](/docs/guides/web/introduction/know-the-screen/)).
   - The **Tingkat SLA** (SLA tier) filter is a search box: type to search, then choose. It holds all SLA tiers of the company. While nothing is chosen, the box shows **Semua tingkat** (All tiers). The X icon in that box clears the filter.
   - The **Kategori** (Category) filter works the same way and shows **Semua kategori** (All categories) while nothing is chosen. It holds all categories of the company. An inactive category shows with the text `(nonaktif)` (inactive).
   - The **Reset filter** (Reset filters) button appears when a filter or search is active. When no package matches, the list shows "Tidak ada paket yang cocok" (No matching packages) with the same **Reset filter** button.
   - Columns: **Nama** (Name), **Kode** (Code), **Kategori**, **Harga bulanan** (Monthly price), **Harga pemasangan** (Installation price), **Status** (badge **Aktif** or **Nonaktif**), **Dibuat** (Created) and **Aksi** (Actions). The **Kategori** and **Aksi** columns cannot be sorted, the other columns can.
   - The package name is a link to the details page.
   - The **Ekspor** (Export) button appears only for holders of `service.export`. Its menu holds **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF). The export uses the active search and filters, with the columns Kode, Nama, Bandwidth, Kecepatan, SLA, Kategori, Biaya bulanan, Biaya pemasangan and Status.
   - The **Buat Paket Layanan** (Create Service Package) button appears for holders of `service.create` or `service.manage`.

   ![Service package list with the Cari box, the Status, Tingkat SLA and Kategori filters, and the columns Nama, Kode, Kategori, Harga bulanan, Harga pemasangan, Status, Dibuat and Aksi](~/assets/guide/web/service-packages.webp)

3. Click a package name to open the details page. The card **Rincian paket** (Package details) holds the category, bandwidth profile, speed profile, SLA tier, minimum contract period and description (the description row appears only when filled in). The card **Harga dan status** (Price and status) holds the monthly price, installation price and status. A contract period of `0` shows as a hyphen. From here the **Ubah** (Edit) button opens the edit form and **Kembali** (Back) takes you to the list.

On each row, the **Ubah** button opens the edit form. The **Aksi lainnya** (More actions) menu holds **Lihat detail** (View details) and **Nonaktifkan** (Deactivate) or **Aktifkan** (Activate), and **Hapus permanen** (Delete permanently) when the package has never been used. A deleted package row has only **Pulihkan** (Restore). These buttons and menus show for everyone who can see the list. The server rejects an action from a user without the matching permission with the **Akses ditolak** (Access denied) page. How the buttons and dialogs work is in [section 1.5](/docs/guides/web/introduction/know-the-screen/).

## Preparing the package ingredients

The package form offers only bandwidth profiles, speed profiles and SLA tiers that have the active status. Create all three first, see [section 4.3](/docs/guides/web/customers-and-services/bandwidth-profiles/), [4.4](/docs/guides/web/customers-and-services/speed-profiles/) and [4.5](/docs/guides/web/customers-and-services/sla-tiers/), then create the package. Or create the missing one straight from the package form with the **+ Baru** (+ New) button (see "Membuat paket", Creating a package).

## Creating a package

1. Click **Buat Paket Layanan**. The **Buat Paket Layanan** page opens with the card **Data paket** (Package data).
2. Fill in the form:
   - **Kode**: required, up to 255 characters, must not equal the code of another package in the same company. Example: `PKG-HOME-50`. While **Kode** is empty and **Nama** is filled in, a suggestion button appears below the field, for example **Gunakan: PKG-HOME-50MBPS** (Use: PKG-HOME-50MBPS) for the name `Home 50Mbps`. Click that button to fill in the code. The suggestion is `PKG-` followed by the name in capital letters, without punctuation, with words separated by hyphens (at most 50 characters). The server still checks that the code is not yet used. The suggestion button exists only in the create form.
   - **Nama**: required, up to 255 characters. Example: `Home 50Mbps`.
   - **Kategori**: required. Type to search, then choose one of the active categories (see Kategori Paket below). In the edit form, an inactive category that the package currently uses still shows.
   - **Profil bandwidth** (Bandwidth profile): required. Type to search, then choose from the active bandwidth profiles.
   - **Profil kecepatan** (Speed profile): required. Type to search, then choose from the active speed profiles.
   - **Tingkat SLA**: required. Type to search, then choose from the active SLA tiers.
   - Below **Profil bandwidth**, **Profil kecepatan** and **Tingkat SLA** there is a **+ Baru** button. It opens a small dialog to create a new row without leaving the package form (it needs Buat layanan (Create service), `service.create`, or Kelola layanan (Manage service), `service.manage`). Click **Simpan** (Save) in the dialog: the new row is active straight away and chosen in that field, while the other package fields stay as they were. Click **Batal** (Cancel) to close the dialog. All dialog fields are required, and error messages show below the field. If the server fails, the dialog says "Gagal menyimpan. Coba lagi." (Failed to save. Try again.) A row created through the dialog is saved at that moment, even if you later cancel the package form. The edit form has the same button.
     - **Profil bandwidth baru** (New bandwidth profile): **Nama**, **Unduh (Mbps)** (Download (Mbps)), **Unggah (Mbps)** (Upload (Mbps)), **Tipe** (Type) (**Shared** or **Dedicated**, default **Shared**) and, for **Shared**, **Rasio kontensi** (Contention ratio) (default `4`).
     - **Profil kecepatan baru** (New speed profile): **Nama**, **Unduh maksimum (Mbps)** (Maximum download (Mbps)) and **Unggah maksimum (Mbps)** (Maximum upload (Mbps)). Both numbers are filled in from the bandwidth profile you already chose in the package form, and can be changed. The dialog has no burst fields and no **Nama profil RADIUS** (RADIUS profile name). Fill in both through **Ubah** in Profil Kecepatan ([section 4.4](/docs/guides/web/customers-and-services/speed-profiles/)), because a network account needs the RADIUS profile name.
     - **Tingkat SLA baru** (New SLA tier): **Nama**, **Target respons (jam)** (Response target (hours)) and **Target penyelesaian (jam)** (Resolution target (hours)). The dialog says "Target dihitung 24 jam. Ubah hitungan tenggat di halaman Tingkat SLA bila perlu." (Targets are counted over 24 hours. Change the deadline clock on the SLA tiers page if needed.) ([section 4.5](/docs/guides/web/customers-and-services/sla-tiers/)).
   - **Harga bulanan**: required, a number of 0 or more. This is the subscription price per month (MRC, Monthly Recurring Charge).
   - **Harga pemasangan**: a number of 0 or more, default `0`. This is the one-time fee for installation (OTC, One-Time Charge). Enter `0` if the package charges no installation fee. Do not leave it empty.
   - **Masa kontrak minimum (bulan)** (Minimum contract period (months)): a whole number of 0 or more, default `0`. Enter `0` if the package has no contract. Do not leave it empty.
   - **Aktif**: a switch, on by default. An inactive package does not appear in the package choices on the customer and subscription forms.
   - **Deskripsi** (Description): optional, free text.

   ![Buat Paket Layanan form with the Data paket card, and the fields Profil bandwidth, Profil kecepatan and Tingkat SLA, each with a + Baru button](~/assets/guide/web/service-packages-create.webp)

   ![Profil bandwidth baru dialog above the Buat Paket Layanan form, with the fields Nama, Unduh (Mbps), Unggah (Mbps), Tipe and Rasio kontensi](~/assets/guide/web/service-packages-quick-create.webp)

3. Click **Simpan**. You return to the list and the toast `Paket layanan dibuat.` (Service package created.) appears. The **Batal** button cancels the form.

The form has no tax field. The prices you enter are the numbers that will be copied to the subscription.

## Editing a package

1. In the list, click **Ubah** on the package row. From the details page, click **Ubah**.
2. Change the fields. The rules are the same as in the create form. This page is titled **Ubah Paket Layanan** (Edit Service Package) and holds the current content of the package, including the category and the contract period.
3. Click **Simpan**. The toast `Paket layanan diperbarui.` (Service package updated.) appears.

If the bandwidth profile, speed profile or SLA tier of that package has already been deactivated, its field looks empty because the list holds only active ones, but the old choice stays saved until you choose another.

Prices are copied to the subscription when the subscription is created or moved: the customer's **Biaya bulanan** (Monthly fee) is filled in from **Harga bulanan** and the installation fee from **Harga pemasangan**. For this reason, changing the price or other fields of a package does not change existing subscriptions. Only new subscriptions, or subscriptions that you move through **Ganti paket** (Change package) on the subscription details ([section 4.1](/docs/guides/web/customers-and-services/customers/)), use the new terms. The monthly fee of an old subscription can still be changed on its own during **Ganti paket**.

**Package versions.** Changing **Harga bulanan**, **Harga pemasangan**, **Profil bandwidth**, **Profil kecepatan**, **Tingkat SLA** or **Kategori** creates a new version of that package. The **Ubah Paket Layanan** page says this in a blue box. Changing **Kode**, **Nama**, **Deskripsi**, **Masa kontrak minimum** or **Aktif** does not create a version: the name changes in place. The package details page has a card **Versi paket** (Package versions) with the columns **Versi** (Version), **Berlaku sejak** (Valid since), **Harga bulanan**, **Harga pemasangan**, **Profil bandwidth**, **Profil kecepatan**, **Tingkat SLA**, **Kategori** and **Langganan** (Subscriptions) (the number of subscriptions on that version), and the latest version is marked **Terbaru** (Latest). New subscriptions use the latest version. Old subscriptions stay on their version, with its RADIUS speed profile, ticket SLA tier and report category, until they are moved.

**Warning: profiles, SLA tiers and categories are still changed in place.** A version records which profile the package chose, not the content of the profile. Changing the Mbps numbers of a speed profile changes all versions and RADIUS groups that use it, including old subscriptions (sessions that are online use the new rate after they reconnect or after **Sinkron ulang** (Sync again)). The same applies to bandwidth profiles and SLA tiers. To change the terms only for new sales, create a new profile (or SLA tier) and choose it in the package. That change creates a new version, and old subscriptions keep using the old profile.

## Deactivating, permanently deleting and restoring packages

1. To stop selling a package, open **Aksi lainnya** on the package row and click **Nonaktifkan**, then confirm (the dialog says how many subscriptions use it). You can also turn off the **Aktif** switch in **Ubah**. The package stays in the list with the badge **Nonaktif**, running subscriptions are not disturbed, and the package is not offered to new customers. **Aktifkan** sells the package again. To hide a whole group of packages at once, deactivate their category (the Kategori Paket section below).
2. **Hapus permanen** exists only in the menu of a package that no subscription has ever used, in any status (pending, active, suspended or terminated). The dialog **Hapus permanen `<nama paket>`?** (Delete `<package name>` permanently?) says `Paket layanan "<nama paket>" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan.` (Service package "<package name>" has never been used by other data. Permanent deletion cannot be undone.) The toast `Paket layanan dihapus permanen.` (Service package permanently deleted.) appears, and its version history is deleted with it.
3. If a new subscription uses the package after you open the menu, the server rejects it and the dialog says `Paket layanan masih dipakai 1 langganan. Nonaktifkan saja.` (The service package is still used by 1 subscription. Just deactivate it.)
4. A package deleted in the old way appears in the **Status** filter **Dihapus**. **Pulihkan** brings it back with its original status.

## Common errors

- The message `kode sudah digunakan.` (the code is already used.) below the **Kode** field: the code must be unique per company. Change the code.
- The message `harga pemasangan harus berupa angka.` (the installation price must be a number.) or `masa kontrak minimum harus berupa bilangan bulat.` (the minimum contract period must be a whole number.): the field was emptied. Enter `0`.
- A new package does not appear on the new customer form: the package **Aktif** switch is still off, or its category is inactive. Turn it on in **Ubah**.
- The profile or SLA tier choice is empty or incomplete: only active data shows. Create or activate it first in the matching menu.
- The package price has been changed but the invoice of an old customer still uses the old price: the price is stored in the subscription, not in the package, and the old subscription stays on the package version it was sold on. Move that subscription through **Ganti paket** on the subscription details ([section 4.1](/docs/guides/web/customers-and-services/customers/)).
- The package row menu does not offer **Hapus permanen**: the package has been used by a subscription, in any status including **Berhenti** (Terminated). Choose **Nonaktifkan**.
- Staff press **Ubah** or **Hapus** and are rejected: staff hold only `service.view`. Ask an admin to add the permission or change their role ([section 8.6](/docs/guides/web/administration/roles/) and [8.7](/docs/guides/web/administration/permissions/)).
- A new package cannot be saved because **Kategori** is empty (`kategori wajib diisi.` (the category is required.)): choose a category. An inactive category is not in the list. Activate it again in **Kategori Paket** or choose another category.

## Kategori Paket

Kategori Paket (Package categories) groups packages by customer segment, for example residential or business. Every package must have exactly one category. Categories are used for the filter in the package list, for the grouping in the package choices on the customer and subscription forms, and for the **Kategori paket** (Package category) filter in the Metrik Bisnis (Business metrics) and KPI Penjualan (Sales KPIs) reports ([section 7.4](/docs/guides/web/finance-and-reports/business-metrics/) and [7.10](/docs/guides/web/finance-and-reports/sales-kpis/)).

Roles and permissions are the same as for Paket Layanan: `service.view` or `service.manage` opens the page, `service.create` creates categories, `service.update` edits, `service.delete` deletes. Built-in staff can only view: the **Aksi** column does not show for them.

Every company has three built-in categories: **Rumahan** (Residential) (order 1), **Bisnis** (Business) (order 2) and **Korporat** (Corporate) (order 3), with the codes `RUMAHAN`, `BISNIS` and `KORPORAT`. A new company, including a subsidiary, gets all three automatically. Packages that existed before this feature were placed in a category by the words in their code or name: `ENT`, `Enterprise`, `Dedicated`, `Korporat` or `Corporate` go to **Korporat**, then `BIZ`, `Business`, `Bisnis`, `SOHO` or `UMKM` go to **Bisnis**, and the rest (including `Home`, `Rumah`, `Kos`, `Asrama`, `Gamer`, `Trial`, `Promo`) go to **Rumahan**. Corporate is checked first, so "Business 100Mbps Dedicated" goes to **Korporat**. Check the result in the package list and move any misplaced package through **Ubah**.

1. In the sidebar, open the group **Pelanggan & Layanan**, then click **Kategori Paket** (below **Paket Layanan**).
2. Read the list. The **Cari** box (field "Kode atau nama" (Code or name)) searches code or name, and the **Status** filter holds **Semua status**, **Aktif** and **Nonaktif**. Columns: **Kode**, **Nama**, **Urutan** (Order), **Paket** (Packages), **Status** and **Aksi**. The **Paket** column counts the packages in that category, including packages that have been deleted. The number is a link to the package list already filtered by that category. The **Kode**, **Nama**, **Urutan** and **Status** columns can be sorted.

   ![Package category list with the columns Kode, Nama, Urutan, Paket, Status and Aksi, and the Buat Kategori Paket button](~/assets/guide/web/package-categories.webp)

3. Click **Buat Kategori Paket** (Create Package Category) (holders of `service.create` or `service.manage`). The **Buat Kategori Paket** dialog opens. Fill in:
   - **Kode**: required, capital letters, digits, `_` and `-`, up to 30 characters, unique per company. The system turns lower-case letters into capitals. The code cannot be changed after the category is created, because the package choices recognise Rumahan, Bisnis and Korporat by code.
   - **Nama**: required, up to 100 characters.
   - **Urutan**: a number from 0 to 65535, default `0`. A category with a small number shows first in the list and in the package choices.
   - **Aktif**: a switch, on by default.
4. Click **Simpan**. The toast `Kategori paket dibuat.` (Package category created.) appears. To edit, click **Ubah** on the row. The **Ubah Kategori Paket** (Edit Package Category) dialog opens with **Kode** locked. Change **Nama**, **Urutan** or **Aktif**, then click **Simpan** (`Kategori paket diperbarui.` (Package category updated.)). The **Batal** button closes the dialog without saving.
5. To stop using a category, turn off the **Aktif** switch. An inactive category does not appear in the **Kategori** choices when creating a new package and does not appear in the package choices on the customer and subscription forms. Packages that already use it stay intact, and its category still shows in the edit form of that package.
6. To delete, open **Aksi lainnya** on the row (this menu exists for holders of `service.delete` or `service.manage`), then click **Hapus**. The dialog **Hapus kategori {nama}?** (Delete category {name}?) opens. It says `Kategori hanya bisa dihapus selama tidak ada paket di dalamnya. Nonaktifkan kategori jika sudah dipakai.` (A category can only be deleted while it holds no packages. Deactivate the category if it is already used.) Click **Hapus** in that dialog to delete. The toast `Kategori paket dihapus.` (Package category deleted.) appears. A category that is still used by a package cannot be deleted. Deleted packages and packages that once used that category in an old version are also counted. The dialog stays open and shows a red box `Kategori masih dipakai {n} paket. Nonaktifkan saja.` (The category is still used by {n} packages. Just deactivate it.) Click **Batal**, then deactivate the category instead. Kategori Paket uses this delete rule, not **Nonaktifkan**, **Hapus permanen** and **Pulihkan** from [section 1.5](/docs/guides/web/introduction/know-the-screen/).

Other error messages in the category dialog: an existing code shows `Kode kategori sudah dipakai.` (The category code is already used.) and a code with other characters shows `Kode hanya boleh berisi huruf, angka, tanda hubung, dan garis bawah.` (The code may only contain letters, digits, hyphens and underscores.)
