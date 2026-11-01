---
title: "6.2 Items (Barang)"
description: "Maintain the item catalogue used by stock, item requests and work orders: add items, change prices and minimum stock, and deactivate or restore them."
---

**Barang** (Items) is the catalogue used by stock, item requests and work orders (SPK). Every item has a SKU, a category, a unit, a price and a minimum stock limit, and its data applies per active company. Open this menu when you add a new item, change its price, or stop using it.

Roles that can use it: admin, manager, staff. Permissions: `inventory.view` opens the list and details, `inventory.create` creates items, `inventory.update` edits items, `inventory.delete` deletes items, `inventory.export` exports the list. With the built-in roles, the admin holds all of them, the manager holds all except `inventory.delete`, and staff hold only `inventory.view`, `inventory.create` and `inventory.update`.

## Opening and reading the list

1. In the sidebar, open the group **Inventaris** (Inventory), then click **Barang**.
2. Read the list.

   - The field **Cari barang** (Search items) searches the SKU and the item name.
   - The filter **Kategori** (Category): type to search, then choose an active category (shown as code and name). If empty, it shows **Semua kategori** (All categories). The filter **Status** contains **Semua status** (All statuses), **Aktif** (Active) and **Nonaktif** (Inactive). Click **Filter** (or press Enter in the search box) to apply the choices. Click **Hapus pilihan: Kategori** (Clear selection: Category) to empty the category.
   - Columns: **SKU**, **Nama** (Name), **Kategori**, **Satuan** (Unit; name and symbol), **Harga Jual** (Selling price), **Status** (badge **Aktif** or **Nonaktif**) and **Aksi** (Actions). **SKU** and **Nama** can be sorted, and the newest items are shown at the top.
   - Cost price and minimum stock are not in the list. Both are visible in the details and in the edit form.
   - The button **Ekspor** (Export; holders of `inventory.export`) offers **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF) for the current search and filters. The columns are SKU, Name, Category, Unit (symbol), Selling price, Cost price, Minimum stock and Active (`Ya` or `Tidak`). One file contains at most 5000 rows, the same limit as for all exports in this chapter.
   - The button **Buat Barang** (Create item) appears for holders of `inventory.create`.
   - Each row has a link on the item name, the button **Ubah** (Edit), and the menu **Aksi lainnya** (More actions) containing **Lihat detail** (View details) and **Hapus** (Delete).
   - If no row matches, the list shows **Tidak ada barang yang cocok** (No matching items) with the button **Reset filter** (Reset filters). If there are no items at all, the list shows **Tidak ada data.** (No data.) with the remark **Barang yang dibuat muncul di sini, lengkap dengan kategori dan satuannya.** (Items you create appear here, with their category and unit.) and the button **Buat Barang**.

   ![Items list with the Search items box, the Category and Status filters, and the columns SKU to Actions](~/assets/guide/web/products.webp)

3. Click the item name, or choose **Lihat detail** in the menu **Aksi lainnya**, to open the item details. This page has the buttons **Kembali** (Back) and **Ubah**, and the badge **Aktif** or **Nonaktif**.

   - The card **Rincian Barang** (Item details) contains **Kategori**, **Satuan**, **Harga Jual**, **Harga Pokok** (Cost price), **Stok Minimum** (Minimum stock), **Lacak Stok** (Track stock) and **Deskripsi** (Description).
   - The card **Stok per Lokasi** (Stock per location) contains the columns **Lokasi** (Location), **Jalur** (Aisle), **Jumlah** (Quantity), **Dicadangkan** (Reserved) and **Tersedia** (Available). An item that has never had a stock operation at a location shows **Belum ada stok barang ini di lokasi mana pun. Catat penerimaannya di halaman Stok.** (There is no stock of this item at any location yet. Record its receipt on the Stock page.)
   - The card **Mutasi Terbaru** (Latest movements) contains the last 20 stock movements of that item, newest on top, with the columns **Jenis** (Type; badges such as **Masuk** (In), **Keluar** (Out), **Penyesuaian** (Adjustment)), **Jumlah**, **Saldo** (Balance), **Catatan** (Notes) and **Waktu** (Time). An item without movements shows **Belum ada mutasi stok untuk barang ini.** (There are no stock movements for this item yet.) The link **Lihat semua mutasi** (View all movements) below it opens Stock movements filtered to that item ([section 6.7](/docs/guides/web/inventory/stock-movements/)).

   ![Item detail page scrolled to the Latest movements card, with the stock movement table of that item](~/assets/guide/web/products-show.webp)

The buttons **Ubah** and **Hapus** appear for everyone who can see the list, and the server refuses the action of a user without the matching permission with the page **Akses ditolak** (Access denied; error 403). How the buttons and the delete dialog work is described in [section 1.5](/docs/guides/web/introduction/know-the-screen/).

## Creating an item

First prepare the units ([section 6.4](/docs/guides/web/inventory/units/)) and categories ([section 6.3](/docs/guides/web/inventory/categories/)). The unit of an item is not chosen separately because it follows the category.

1. Click **Buat Barang**.
2. Fill in the form in the card **Data Barang** (Item data):
   - The field **SKU** is optional. Leave it empty so the system creates a sequential code, by default starting with `PRD-` followed by five digits, and the expected next code is shown in the field as an example. Fill it in yourself if you have your own code: at most 100 characters and not yet used by another item in this company. Example: `PTC-SC-3M`.
   - Fill in **Nama**. This field is required, at most 255 characters. Example: `Patch Cord SC/APC 3m`.
   - Choose **Kategori**: type to search, then choose an active category. This field is required. Each choice shows its unit.
   - **Satuan** cannot be filled in. This field shows the unit of the category you chose, for example `meter (m)`, or `Pilih kategori dulu` (Choose a category first) before there is a choice.
   - **Harga Jual** and **Harga Pokok** are optional. Both accept a number of 0 or more with two decimals.
   - **Stok Minimum** is optional and accepts a number of 0 or more. An empty field is saved as `0`. This value becomes the limit of the low stock filter in Stock ([section 6.5](/docs/guides/web/inventory/stock/)).
   - The switch **Lacak stok** (Track stock) is on by default. Its value is only saved and shown in the details (**Lacak Stok**), and no stock rule reads it.
   - The switch **Aktif** is on by default.
   - The field **Deskripsi** is optional and accepts free text.
3. Click **Simpan** (Save), or **Batal** (Cancel) to go back to the list. After **Simpan**, you return to the list and the toast `Barang berhasil dibuat.` appears.

If the admin switches off **Izinkan input kode manual** (Allow manual code input) for **Barang (SKU)** in Numbering ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)), the field **SKU** is locked and shows only the expected code with the remark **Dibuat otomatis saat disimpan, perkiraan:** (Created automatically on save, expected:) followed by the code.

The form has no item type field. An item you create here is always of the consumable type (`consumable`). The server also knows the serial asset type (installed per unit through a work order by choosing a network asset, [section 3.3](/docs/guides/web/operations/work-orders/) and [5.2](/docs/guides/web/network/network-assets/)) and the service type, but the screen does not offer them and does not show the item type.

## Editing an item

1. In the list, click **Ubah**, or open the item details and click **Ubah**.
2. Change the fields on the page **Ubah Barang** (Edit item). The rules are the same as in the create form, except **SKU**: this field must be filled in and may be changed as long as manual codes are allowed. If locked, the field shows `Dibuat otomatis dan tidak dapat diubah.`
3. Click **Simpan**, or **Batal** to discard the changes. After **Simpan**, you return to the list and the toast `Barang berhasil diubah.` appears.

Changing the **Kategori** also changes the **Satuan** of the item to the unit of the new category. Stock quantities are not converted.

## Deactivating, permanently deleting and restoring items

1. To stop using an item, open the menu **Aksi lainnya** on the item row and choose **Nonaktifkan** (Deactivate) (or switch off the **Aktif** switch through **Ubah**). The toast `Barang dinonaktifkan.` appears. The item stays in the list with the badge **Nonaktif**, and no longer appears in the **Barang** choice on the Stock and Stock movements pages. **Aktifkan** (Activate) uses it again.
2. **Hapus permanen** (Delete permanently) exists only if no other data has ever used the item: stock movements, item requests, material returns, stock adjustments, work order items, network assets, or invoice items. Confirm in the dialog **Hapus permanen &lt;nama barang&gt;?** The toast `Barang dihapus permanen.` appears.
3. An item that was never used but whose stock at one of the locations is still more than 0 cannot be deleted permanently. The dialog stays open and shows "Barang masih punya stok." (The item still has stock.) Empty the stock through an adjustment ([section 6.5](/docs/guides/web/inventory/stock/)), or simply deactivate the item.
4. The filter **Status** has **Aktif**, **Nonaktif**, **Dihapus** (Deleted), and **Semua, termasuk dihapus** (All, including deleted). Deleted rows have **Pulihkan** (Restore).

An item that is deleted permanently cannot be restored. The SKU of an inactive or deleted item (**Dihapus**) stays in use, so a new item cannot use the same SKU.

## Common errors

- The SKU is refused with the message `SKU sudah digunakan.`: the SKU must be unique per company, including the SKU of items that were deleted. Use another SKU, or leave the field empty so the system creates a code.
- The category you look for is not in the choices: only **Aktif** categories are shown. Activate the category in the Category menu ([section 6.3](/docs/guides/web/inventory/categories/)).
- The field **Satuan** cannot be typed in: the unit follows the category. Choose another category, or change the unit of the category ([section 6.3](/docs/guides/web/inventory/categories/)).
- The item is not in the **Barang** choice in Stock: the **Aktif** switch of the item is off.
- **Hapus permanen** is not in the item menu: the item is already used by other data (stock movements, item requests, material returns, stock adjustments, work order items, network assets, or invoice items) and the numbers are shown in the **Nonaktifkan** dialog. Use **Nonaktifkan**. An item that was never used but still has stock at one location refuses **Hapus permanen** with "Barang masih punya stok." Check the card **Stok per Lokasi** in the details.
- Staff or a manager chooses **Hapus** and the page **Akses ditolak** (error 403) appears: in the built-in roles, the permission `inventory.delete` is held only by the admin. Ask the company admin to add it to the role in the Roles menu ([section 8.6](/docs/guides/web/administration/roles/)), or to give you a role that holds it ([section 8.7](/docs/guides/web/administration/permissions/)).
- The button **Ekspor** is missing: staff do not hold `inventory.export`.
