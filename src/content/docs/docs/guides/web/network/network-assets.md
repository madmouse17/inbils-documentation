---
title: "5.2 Network assets (Aset Jaringan)"
description: "Record network devices such as routers, OLTs, ONTs and ODPs, track their lifecycle status and find any device by serial, MAC or IP address."
---

Network assets (**Aset Jaringan**) holds one row for each network device of the company, for example a router, OLT, ONU/ONT, ODP or rack. Open this menu when you record a new device, change its usage status (install, remove, maintain, mark faulty, retire) or look for a device by serial, MAC or IP address.

Roles that can use it: admin, manager, staff. Permissions: `network_asset.view` opens the menu, the list, the details and **Lacak Aset** (Trace Asset). Other actions have their own permissions: `network_asset.create`, `network_asset.update`, `network_asset.delete`, `network_asset.export`, `network_asset.install`, `network_asset.remove`, `network_asset.maintenance`, `network_asset.repair` and `network_asset.retire`. With the built-in roles, the admin holds all of them, the manager holds all except `network_asset.delete`, and staff hold only `network_asset.view`. The list holds only the assets of the company that is currently selected.

## Opening and reading the list

1. In the sidebar, open the **Jaringan** (Network) group, then click **Aset Jaringan**.
2. Read the list.

   - The **Cari** (Search) box searches part of the code, name, serial, MAC and IP address, even though its hint says only `Kode, nama, atau nomor seri` (Code, name, or serial number).
   - The **Tipe** (Type) filter holds **Semua tipe** (All types) and 12 asset types (the list is in the create form). The **Status** filter holds **Semua status** (All statuses), five statuses (Tersedia (Available), Terpasang (Installed), Perawatan (Maintenance), Rusak (Faulty) and Dipensiunkan (Retired); see the table in the section Changing the asset status), **Dihapus** (Deleted) and **Semua, termasuk dihapus** (All, including deleted).
   - Columns: **Kode** (Code, a link to the details), **Nama** (Name), **Tipe**, **Nomor seri** (Serial number), **Status**, **Lokasi** (Location), **Dibuat** (Created) and **Aksi** (Actions). Type and status appear as badges, for example ONU/ONT and Tersedia. The columns **Kode**, **Nama**, **Tipe**, **Status** and **Dibuat** can be sorted, and the initial order is newest asset first.
   - The **Dibuat** column holds `-` in all rows, because the server does not send the creation date to this page.
   - The **Ekspor** (Export) button (holders of `network_asset.export`) opens the menu **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF). The file holds the columns Kode, Nama, Tipe, Nomor seri, Status and Kepemilikan (Ownership) of the currently filtered result. The contents of the columns Tipe, Status and Kepemilikan in the file are raw codes, for example `onu_ont`, `available` and `owned`.
   - The **Buat Aset Jaringan** (Create Network Asset) button (holders of `network_asset.create`) opens the create form. The list rows have only the **Lihat** (View) button, without **Ubah** (Edit) and **Hapus** (Delete). A deleted asset appears in the **Status** filter **Dihapus**: its row has no button, its name is plain text, and the **Aksi lainnya** (More actions) menu holds **Pulihkan** (Restore) (permission `network_asset.delete`). The asset returns with its original status (toast "Aset jaringan dipulihkan." (Network asset restored.)).
   - An empty list shows `Belum ada aset jaringan` (No network assets yet), and a filter that finds nothing shows `Tidak ada aset jaringan yang cocok` (No matching network assets) with the **Reset filter** (Reset filters) button.

   ![The Network assets list with the Search box, Type and Status filters, and the Export and Create Network Asset buttons](~/assets/guide/web/network-assets.webp)

3. Click the asset code or the **Lihat** button to open the details page.

## Reading the details page

The page title holds the asset name, with its code below it. The buttons at the top right are **Kembali** (Back), **Ubah** and, for an OLT, ODC or ODP asset for holders of `odn.view`, **Port ODN** (ODN Ports) (see [section 5.5](/docs/guides/web/network/odn/)).

- For routers, switches, OLTs, ONU/ONTs, ODCs, ODPs and racks, the **Panel perangkat** (Device panel) card draws the device as it looks in real life, with its ports, connections and rack position. This card is above the **Detail aset** (Asset details) card and is explained in [section 5.6](/docs/guides/web/network/device-panel/).
- The **Detail aset** card holds Status, Tipe, Produk (Product), Kepemilikan, Nomor seri, Alamat MAC (MAC address), Alamat IP (IP address), IP manajemen (Management IP), Vendor, Model, Lokasi, Jalur lokasi (Location path), Pelanggan (Customer), Langganan (Subscription), Dipasang (Installed), Dipensiunkan and Catatan (Notes) (if filled in). Status, Tipe and Kepemilikan appear as badges. Pelanggan and Langganan are links to the customer and subscription pages. The purchase date, purchase price and warranty period are visible only in the **Ubah** form.
- The **Siklus hidup** (Lifecycle) card holds the status change buttons.
- The **Riwayat pemasangan** (Installation history) card records each installation with the columns **Lokasi**, **Dipasang**, **Dilepas** (Removed) and **Alasan** (Reason). An asset that has never been installed shows `Belum ada riwayat pemasangan. Riwayat tercatat setiap kali aset dipasang dan dilepas.` (No installation history yet. History is recorded each time the asset is installed and removed.)

  ![The network asset details page with the Asset details and Lifecycle cards](~/assets/guide/web/network-assets-show.webp)

## Creating an asset

1. Click **Buat Aset Jaringan**.
2. Fill in the form on the **Detail** (Details) card:
   - **Nama**: required, 255 characters at most. Example: `OLT Huawei MA5800`.
   - **Produk**: optional. Type the SKU or product name (at least 2 letters), then choose an active product from the item catalogue ([section 6.2](/docs/guides/web/inventory/items/)). The list shows 20 results at most. A work order (SPK) uses this link to offer the asset (see the section Installing an asset through an installation work order).
   - **Tipe aset** (Asset type): required. A search box with the hint **Cari tipe aset** (Search asset type): type to search, then choose Router, Switch, OLT, ONU/ONT (initial value), Radio, Antena (Antenna), Fiber, ODP, ODC, Rak (Rack), Perangkat daya (Power device) or Lainnya (Other). If nothing matches, the box says **Tidak ada tipe aset yang cocok.** (No matching asset type.) The **Daftarkan ODP** (Register ODP) button on the ODN page ([section 5.5](/docs/guides/web/network/odn/)) opens this form with the ODP type already chosen.
   - **Nomor seri**: optional, 255 characters at most, must not equal the serial of another asset in this company. Example: `HW-MA5800-002`.
   - **Alamat MAC**: optional, 255 characters at most. The format is not checked.
   - **Alamat IP** and **IP manajemen**: optional, must be a valid IP address (IPv4 or IPv6). Hint of **Alamat IP**: "Alamat perangkat itu sendiri, bila tetap. Boleh kosong." (The address of the device itself, if fixed. May be empty.) Hint of **IP manajemen**: "Alamat untuk mengelola perangkat. Router NAS memakainya sebagai alamat NAS dan target CoA." (The address used to manage the device. A NAS router uses it as the NAS address and CoA target.) Inbils also records both in the IP addresses (**Alamat IP**) register ([section 5.4](/docs/guides/web/network/ip-addresses/)). Fill in **IP manajemen** if the router will be registered as a NAS router (**Router NAS**) ([section 5.3](/docs/guides/web/network/nas-routers/)). A router can also be created directly from the NAS router registration form.
   - **Lokasi**: optional. Type the location code, name or path, then choose. Only active locations appear ([section 5.1](/docs/guides/web/network/locations/)). Leave empty if the asset is in the warehouse, as the hint says: `Kosongkan jika aset masih di gudang.` (Leave empty if the asset is still in the warehouse.)
   - **Kepemilikan**: Milik sendiri (Owned, initial value), Sewa (Rented) or Milik pelanggan (Customer-owned).
   - **Vendor** and **Model**: optional, 255 characters at most.
   - **Tanggal pembelian** (Purchase date) and **Tanggal garansi berakhir** (Warranty end date): optional. Type the date in the company date format, or open the calendar with **Pilih tanggal** (Pick a date). **Hari ini** (Today) fills in today's date and **Hapus tanggal** (Clear date) empties the field.
   - **Harga beli** (Purchase price): optional, a number of 0 or more.
   - **Catatan**: optional, free text.
3. Click **Simpan** (Save). You return to the list and the toast "Aset jaringan dibuat." (Network asset created.) appears. The new asset has the status Tersedia. Inbils creates its code itself, with the format set in Penomoran (Numbering) ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)). Click **Batal** (Cancel) to return to the list without saving.

## Editing an asset

1. On the details page, click **Ubah**.
2. Change the fields on the **Ubah Aset Jaringan** (Edit Network Asset) page. The rules are the same as in the create form. The current product and location stay shown in their choices, and dates already recorded are already filled in. The code and status are not in this form.
3. Click **Simpan**. You return to the list and the toast "Aset jaringan diperbarui." (Network asset updated.) appears. Click **Batal** to leave without saving.

## Changing the asset status

The status changes only through the buttons on the **Siklus hidup** card. The buttons shown follow the asset status:

| Status | Meaning | Buttons shown |
| --- | --- | --- |
| Tersedia | Not installed. Initial status of a new asset. | **Pasang aset** (Install asset), **Pensiunkan aset** (Retire asset) |
| Terpasang | Installed at a location. | **Lepas aset** (Remove asset), **Masukkan ke perawatan** (Put into maintenance), **Tandai rusak** (Mark faulty), **Pensiunkan aset** |
| Perawatan | Installed, under maintenance. | **Selesaikan perawatan** (Complete maintenance), **Tandai rusak**, **Pensiunkan aset** |
| Rusak | Faulty, waiting for repair. | **Selesai diperbaiki** (Repair completed), **Pensiunkan aset** |
| Dipensiunkan | Final status. | None |

Each button has its own permission and fields:

| Button | Becomes | Fields | Permission |
| --- | --- | --- | --- |
| **Pasang aset** | Terpasang | **Lokasi** (required) | `network_asset.install` |
| **Lepas aset** | Tersedia | **Alasan** (required) | `network_asset.remove` |
| **Masukkan ke perawatan** | Perawatan | **Alasan** (required) | `network_asset.maintenance` |
| **Selesaikan perawatan** | Terpasang | No fields | `network_asset.maintenance` |
| **Tandai rusak** | Rusak | **Alasan** (required) | `network_asset.repair` |
| **Selesai diperbaiki** | Tersedia | No fields | `network_asset.repair` |
| **Pensiunkan aset** | Dipensiunkan | **Alasan** (required) | `network_asset.retire` |

1. On the details page, click a button on the **Siklus hidup** card. The window that opens has the same title as the button, with the sentence `Status aset menjadi <status>.` (The asset status becomes `<status>`.)
2. Fill in **Lokasi** (for **Pasang aset**: type a code, name or path, then choose an active location) or **Alasan** (for the other buttons that ask for it). **Alasan** is 500 characters at most. The **Pasang** (Install) button becomes active only after you choose a location. A field error appears below that field.
3. Click the confirmation button: **Pasang**, **Lepas** (Remove), **Mulai perawatan** (Start maintenance), **Selesai perawatan** (Maintenance completed), **Tandai rusak**, **Selesai diperbaiki** or **Pensiunkan** (Retire), according to the button you opened. Click **Batal** to close the window. One of these toasts appears: "Aset dipasang." (Asset installed.), "Aset dilepas." (Asset removed.), "Aset masuk perawatan." (Asset put into maintenance.), "Aset kembali terpasang." (Asset installed again.), "Aset ditandai rusak." (Asset marked faulty.), "Aset diperbaiki." (Asset repaired.) or "Aset dipensiunkan." (Asset retired.)

The **Pasang aset** button only records the location. The Pelanggan and Langganan rows on the **Detail aset** card are filled in when the installation work order is approved.

**Lepas aset** and **Selesai diperbaiki** empty the location, customer, subscription and installation date of the asset, then close the active row in **Riwayat pemasangan**. **Selesai diperbaiki** records the reason `repair`.

**Pensiunkan aset** closes the active row with the reason you enter and fills in the **Dipensiunkan** date. The last location, customer and subscription stay written on the asset, and there is no button to bring back a Dipensiunkan asset.

## Installing an asset through an installation work order

A technician installs an asset at the customer's home, for example an ONT, through a work order of type **Instalasi** (Installation) in the technician app. On the web, you prepare the work order items and approve the result ([section 3.3](/docs/guides/web/operations/work-orders/)).

1. Make sure the asset has the status Tersedia and its **Produk** field is filled in. Make sure the work order has a **Lokasi**, **Pelanggan** and **Langganan**.
2. On the work order page, in the **Item** (Items) card, click **Tambah item** (Add item). Choose a **Barang** (Item) of type Aset (Asset). The **Aset jaringan** (Network asset) field appears, is required, and offers only Tersedia assets with the same product. Type the asset code or name, then choose.
3. After the technician sends the work result, a holder of the permission `spk.approve` (admin or manager) clicks **Setujui** (Approve) on the work order with the status Menunggu review (Awaiting review), then **Setujui** again in the **Setujui SPK** (Approve work order) dialog. The creator of the work order and the assigned technician must not approve the work order themselves. The server refuses with "Pembuat SPK tidak boleh menyetujui SPK sendiri." (The work order creator must not approve their own work order.) or "Teknisi yang ditugaskan tidak boleh menyetujui SPK sendiri." (The assigned technician must not approve their own work order.)
4. At that point Inbils installs every asset in the work order items. The asset status becomes Terpasang, the location, customer and subscription are taken from the work order, and one new row appears in **Riwayat pemasangan**. Inbils also activates the subscription with the status Menunggu (Pending).

If the asset is no longer Tersedia or its product does not match, the approval is refused with a message such as "Aset jaringan yang dipilih harus berstatus tersedia." (The chosen network asset must have the status available.) or "Aset jaringan yang dipilih harus sesuai dengan barang pada item SPK." (The chosen network asset must match the item on the work order item.)

## Tracing an asset with Lacak Aset

The **Lacak Aset** page looks for an asset by serial, MAC, IP address or code, then shows its status, location and customer in one table. Use this page when you hold only the serial on a device or an IP address and need to know where the asset is installed. The permission is `network_asset.view`.

1. Open the address `/admin/network-assets/trace` in the browser. This page has no link in the sidebar or in the list.
2. Fill in **Cari** (hint `Nomor seri, MAC, IP, atau kode` (Serial number, MAC, IP, or code)), then click **Lacak** (Trace).
3. Read the result table with the columns **Nama**, **Kode**, **Tipe**, **Nomor seri**, **Status**, **Lokasi**, **Jalur** (Path), **Pelanggan** and **Langganan**. The **Jalur** column holds the location path from the parent to the asset location. Before you search, the table shows `Masukkan nomor seri, MAC, IP, atau kode, lalu pilih Lacak.` (Enter a serial number, MAC, IP or code, then choose Trace.) If nothing matches, the table shows `Tidak ada aset yang cocok dengan "<kata>". Periksa penulisannya atau coba kata kunci lain.` (No asset matches "`<word>`". Check the spelling or try another keyword.)

The search matches part of the text, but does not search the asset name. The results are not split into pages and the rows are not links, so open the asset details through the **Cari** box in the list.

## Common errors

- An asset does not appear in the **Aset jaringan** field on a work order: its status is not Tersedia, or its **Produk** differs from the product of the work order item. Fix the **Produk** through **Ubah**, or return the asset to Tersedia with **Lepas aset** or **Selesai diperbaiki**.
- The installation work order is approved but the asset stays Tersedia: Inbils installs the asset only if the work order is of type **Instalasi**, has a **Lokasi**, and the work order item uses a product of type Aset. Complete the work order before approval.
- A serial is refused with `nomor seri sudah digunakan.` (the serial number is already in use.): the serial must be unique in the company, including against Dipensiunkan assets. Look for the serial with **Cari** in the list.
- An IP address is refused with a message such as `<alamat> sudah dipakai aset <kode>.` (`<address>` is already used by asset `<code>`.): the address is already recorded in the IP addresses register under another holder. Other messages for other holders read `<alamat> sudah dipakai langganan <kode>.` (`<address>` is already used by subscription `<code>`.) or `<alamat> sudah dicadangkan (<catatan>).` (`<address>` is already reserved (`<notes>`).) Release that holder first or use another address ([section 5.4](/docs/guides/web/network/ip-addresses/)). An address that is not an IP is refused with `alamat IP harus berupa alamat IP yang valid.` (the IP address must be a valid IP address.)
- The **Ubah** button or a button in **Siklus hidup** is refused with a 403 error: the button appears for all holders of `network_asset.view`, but the server checks the permission of each action. Staff have only `network_asset.view`. Ask an admin to add the permission or change their role ([section 8.6](/docs/guides/web/administration/roles/) and [8.7](/docs/guides/web/administration/permissions/)).
- The button you look for does not appear in **Siklus hidup**: the buttons follow the status. For example **Pasang aset** appears only when the status is Tersedia, and **Selesaikan perawatan** only when it is Perawatan.
- A status action is refused with a message such as "Aset harus berstatus tersedia untuk dipasang." (The asset must be available to be installed.), "Aset harus terpasang untuk dilepas." (The asset must be installed to be removed.), "Aset harus dalam perawatan untuk dilanjutkan." (The asset must be under maintenance to be continued.) or "Aset sudah dipensiunkan." (The asset is already retired.): the asset status has changed since the page was opened. Reload the details page and read the latest status.
- A network asset has no **Hapus** button, neither in the list nor in the details. The delete endpoint accepts only an admin with `network_asset.delete`, and refuses an asset that is Terpasang or Perawatan with the message "Aset yang terpasang atau dalam perawatan tidak dapat dihapus. Lepas dulu." (An installed asset or an asset under maintenance cannot be deleted. Remove it first.) That endpoint also permanently deletes only assets never used by other data (installation history, work order items, tickets, splitters or ODN ports, NAS devices, subscription ONTs, device ports, or devices in a rack), with a message such as "Aset jaringan masih dipakai 1 riwayat pemasangan, jadi tidak bisa dihapus." (The network asset is still used by 1 installation history entry, so it cannot be deleted.) Use **Lepas aset** first if deletion is really needed. To stop using an asset while keeping its history, use **Pensiunkan aset**.
