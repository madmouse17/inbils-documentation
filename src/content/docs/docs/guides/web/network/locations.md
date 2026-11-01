---
title: "5.1 Locations (Lokasi)"
description: "Create and manage the tree of physical network sites in Inbils: regions, areas, POPs, racks and sites, with map and table views."
---

Locations is the list of physical network places in one tree: regions, areas, POPs, racks and sites. Network assets, stock, VLANs and IP prefixes pick their location from this list, so fill in this tree first. Open this menu to add, edit, move or delete locations.

Roles that can use it: admin (all actions), manager (add, edit and move, no delete), staff (view only). Permissions: `location.view` to open the menu, `location.create` for **Buat Lokasi** (Create Location), `location.update` for **Ubah** (Edit), `location.move` for **Pindahkan** (Move), `location.delete` for **Hapus** (Delete). The list and location codes apply per active company ([section 1.6](/docs/guides/web/introduction/switch-company/)).

A company created with **Katalog awal** (Starter catalogue) starts with three nested locations: the region **Wilayah Utama** (Main Region, code `REG-01`), the area **Area Utama** (Main Area, `AREA-01`) and the POP **POP Utama** (Main POP, `POP-01`). Rename them with **Ubah** and add more POPs to match your network. A company created before this change keeps its old names (`Default Region`, `Default Area`, `Default POP`) until you rename them.

## Opening and reading the list

1. In the sidebar, open the **Jaringan** (Network) group, then click **Lokasi** (Locations).
2. The page opens on the **Peta** (Map) tab. If no location has coordinates yet, the page opens on the **Tabel** (Table) tab, because an empty map shows nothing. Every location with coordinates appears as a marker. The box at the top left of the map filters the markers: type part of a code or name in the search box, then choose a type (**Semua tipe** (All types), Wilayah, Area, POP, Rak, or Site) and a status (**Semua status** (All statuses), Aktif, or Nonaktif) from the two selectors below it. A **Nonaktif** (Inactive) location uses a different marker colour.

   The same box shows the number of locations displayed, for example `3 lokasi`, and the **Tampilkan semua** (Show all) button, which centres the map on all markers that pass the filter. The **Legenda** (Legend) at the bottom left explains the marker shape of each type and the **Nonaktif** marker. Click its button to hide or show that list. The zoom buttons are at the bottom right.

   If some locations have no coordinates yet, one line above the tabs says `{n} lokasi belum punya koordinat. Titik muncul di peta setelah lintang dan bujurnya diisi.` (`{n}` locations have no coordinates yet. The point appears on the map once its latitude and longitude are filled in.) The number counts all locations in the tree whose latitude or longitude is empty.

   ![The Map tab of the Locations menu with a search box, type and status selectors, location count, Show all button and Legend](~/assets/guide/web/locations.webp)

3. Click a marker to open its card. The card shows the code, name, type, the **Nonaktif** badge (if the location is inactive) and the coordinates, plus the **Ubah** and **Hapus** buttons according to your permissions.
4. Click the **Tabel** tab to see all locations, including those without coordinates. The columns are **Kode** (Code), **Nama** (Name), **Tipe** (Type), **Jalur** (Path), **Status**, **Koordinat** (Coordinates) and **Aksi** (Actions). Type and status appear as badges. The **Aksi** column holds the **Pindahkan** and **Ubah** buttons, and the **Aksi lainnya** (More actions) menu for **Nonaktifkan** (Deactivate) and **Hapus permanen** (Delete permanently) (see the sections below).

   The **Cari** (Search) box (hint `Kode, nama, jalur, atau alamat` (Code, name, path, or address)) searches code, name, path and address, while **Tipe** and **Status** filter the list. The default order follows **Jalur**, so child locations sit near their parent. Search, order and pages work as on other screens ([section 1.5](/docs/guides/web/introduction/know-the-screen/)). An empty list shows `Belum ada lokasi` (No locations yet), and a filter that finds nothing shows `Tidak ada lokasi yang cocok` (No matching locations) with the **Reset filter** (Reset filters) button.

   ![The Table tab of the Locations menu with the Search box, Type and Status filters, and the columns Code to Actions](~/assets/guide/web/locations-table.webp)

## Adding a location

1. Click **Buat Lokasi** at the top right of the page.
   - Alternative: on the **Peta** tab, click an empty point. A temporary pin appears and can be dragged. The pin card is titled `Buat lokasi baru di sini` (Create a new location here). Choose **Tambah POP** (Add POP) or **Tambah Site** (Add Site) on that card, and the dialog opens with **Tipe**, **Lintang** (Latitude) and **Bujur** (Longitude) already filled in. **Batal** (Cancel) on the pin card discards the pin.
2. Fill in the form in the **Buat Lokasi** dialog:
   - **Kode**: required, 50 characters at most, unique in the company, and without the `>` sign (this sign separates the levels in the path).
   - **Nama**: required, 255 characters at most.
   - **Tipe**: required. The choices are Wilayah, Area, POP, Rak and Site. The initial value is POP.
   - **Induk** (Parent): the parent of the location. Type to search a code or path, then choose a location whose type is allowed as a parent (rules below). The choices hold all locations of the company. For Wilayah leave it empty, as the hint says: `Kosongkan untuk lokasi bertipe Wilayah.` (Leave empty for a location of type Wilayah.)
   - **Alamat** (Address): optional.
   - **Lintang** and **Bujur**: optional, but fill in both or leave both empty. Latitude -90 to 90, longitude -180 to 180. Type the numbers, or use the map below the two fields.
   - **Peta** (hint "Klik peta atau seret penanda untuk mengatur koordinat." (Click the map or drag the marker to set the coordinates.)): click the map or drag the marker, and **Lintang** and **Bujur** fill in by themselves. The **Gunakan lokasi saya** (Use my location) button uses the location of your device. Without coordinates, the marker stands at the centre of the default map and fills in nothing until you click the map or drag the marker. The dialog holds the map, so a short screen scrolls inside the dialog.
3. Click **Simpan** (Save). The toast "Lokasi dibuat." (Location created.) appears and the location shows in the list. A location with coordinates also shows on the map. Click **Batal** to close the dialog without saving.

   ![The Create Location dialog with the fields Code, Name, Type, Parent, Address, Latitude, Longitude, and a map to mark the coordinates](~/assets/guide/web/locations-create.webp)

Each type has specific parents:

- Wilayah: no parent.
- Area: its parent is a Wilayah.
- POP: its parent is an Area.
- Rak: its parent is a POP.
- Site: its parent is a Rak, POP or Area. A small company that does not use racks may put a site directly under a POP or an Area.

The **Jalur** is built from the parent path, the sign ` > ` and the location code, for example `REG-01 > AREA-01 > POP-01`.

## Editing a location

1. On the **Tabel** tab, click **Ubah** on the location row. From the **Peta** tab, click the marker, then click **Ubah** on its card.
2. Change the fields in the **Ubah** dialog, which holds the location code in its title. The fields are the same as in the add dialog. The dialog has no field to change the **Aktif** (Active) or **Nonaktif** status: use **Nonaktifkan** or **Aktifkan** (Activate) in the **Aksi lainnya** menu (see below).
   - Changing the **Kode** or **Induk** updates the **Jalur** of that location and of all locations under it.
   - Changing the **Tipe** is accepted only if all sub-locations still match the new type.
   - If **Lintang** or **Bujur** changes, the **Koordinat berubah** (Coordinates changed) box shows the **Lama** (Old) and **Baru** (New) values, and the save button becomes **Simpan dan konfirmasi koordinat** (Save and confirm coordinates).
3. Click **Simpan**. The toast "Lokasi diperbarui." (Location updated.) appears.

## Moving a location

1. On the **Tabel** tab, click **Pindahkan** on the location row. This button is not on the marker card.
2. In the **Pindahkan** dialog, which holds the location code in its title, choose **Induk baru** (New parent). This field is required: type to search a code or path, then choose. The **Pindahkan** button becomes active only after you choose.
3. Click **Pindahkan**. The toast "Lokasi dipindahkan." (Location moved.) appears, and the **Jalur** of the location and of all locations under it changes too.

The new parent must have a type allowed for that location (the list is in the section "Adding a location"), as when adding. A location of type Wilayah cannot be moved. The system also refuses to move a location under itself or its descendants, with the message "Lokasi tidak dapat dipindahkan ke bawah dirinya sendiri." (A location cannot be moved under itself.) below **Induk baru**.

## Deactivating, permanently deleting and restoring a location

1. On the **Tabel** tab, open **Aksi lainnya** on the location row. It holds **Nonaktifkan** (or **Aktifkan**) with `location.update`, and **Hapus permanen** with `location.delete`. The **Nonaktifkan** dialog lists what uses the location, for example "dipakai 2 lokasi turunan, 3 aset jaringan, 1 stok" (used by 2 child locations, 3 network assets, 1 stock). An inactive location does not appear in the choices for new locations, and all data that uses it stays intact.
2. **Hapus permanen** exists only if no other data has ever pointed to the location: child locations, customers, subscriptions, stock, stock movements, item requests, material returns, stock adjustments, VLANs, IP prefixes, network assets, installation history, work orders (SPK), tickets, announcements or promo banners, including those already deleted. The dialog `Hapus permanen <kode>?` (Permanently delete `<code>`?) states that the deletion cannot be undone. The toast "Lokasi dihapus permanen." (Location permanently deleted.) appears on success.
3. On the **Peta** tab, the **Hapus** button on the marker card opens the same `Hapus permanen <kode>?` dialog. That dialog writes the reason for refusal in red text, for example "Lokasi masih dipakai 1 lokasi turunan. Nonaktifkan saja." (The location is still used by 1 child location. Just deactivate it.) A location that is already in use is deactivated from the **Tabel** tab.
4. The **Status** filter on the **Tabel** tab has **Aktif**, **Nonaktif**, **Dihapus** (Deleted) and **Semua, termasuk dihapus** (All, including deleted). The row of a deleted location has **Pulihkan** (Restore). A child location cannot be restored while its parent is still deleted ("Lokasi tidak bisa dipulihkan karena induknya, `<nama>`, masih dihapus. Pulihkan induknya dulu." (The location cannot be restored because its parent, `<name>`, is still deleted. Restore the parent first.)). A restored location recalculates its **Jalur** from its current parent.

A permanently deleted location cannot be brought back. The code of a location that is deleted but not permanently (**Dihapus**) or that is inactive stays reserved and cannot be used by another location.

## Common errors

- "Induk lokasi wajib diisi untuk lokasi selain Wilayah." (The parent location is required for any location other than Wilayah.) appears at **Induk** when adding a location if **Tipe** is still POP (the initial value) and **Induk** is empty. Choose a parent, or change **Tipe** to Wilayah if this is the top location.
- "Lokasi POP harus punya induk Area." (A POP location must have an Area parent.) means the parent has the wrong type. Replace **Induk** with a location of the type the message asks for. The message holds the location type name and the allowed parent types, for example "Lokasi Site harus punya induk Rak, POP atau Area." (A Site location must have a Rak, POP or Area parent.)
- "Lokasi Wilayah tidak boleh punya induk." (A Wilayah location must not have a parent.) means the **Tipe** is Wilayah but **Induk** is filled in. Empty **Induk**.
- "Lintang dan bujur harus diisi bersamaan." (Latitude and longitude must be filled in together.) means only one coordinate is filled in. Fill in both or leave both empty.
- "kode sudah digunakan." (the code is already in use.) means another location in the company uses that code, including locations that are already deleted. `Kode tidak boleh memuat tanda ">".` (The code must not contain the sign ">".) means the code contains the `>` sign. Use another code.
- A **Tipe** change is refused with `Lokasi <tipe> tidak dapat punya induk <tipe baru>.` (A `<type>` location cannot have a `<new type>` parent.) if some sub-location does not match the new type. Move or delete that sub-location first.
- Empty map or missing markers: a location without coordinates has no marker, so look for it on the **Tabel** tab. The **Cari**, **Tipe** and **Status** fields on the **Tabel** tab also filter the map, so empty those fields (**Reset filter**). The type and status selectors in the map box filter only the markers.
- "Lapisan peta tidak dapat dimuat" (The map layer cannot be loaded) means the OpenStreetMap base map cannot be reached from your browser. Click **Coba lagi** (Try again). The markers and the **Tabel** tab remain usable.
