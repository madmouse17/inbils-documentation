---
title: "6.3 Categories (Kategori)"
description: "Group items into categories and set the unit for each one. Create, edit, deactivate, delete and restore categories before you add new items."
---

**Kategori** (Categories) groups items and determines their unit. Every category has one unit, and all items in it use that unit. Open this menu before you create an item whose category does not exist yet.

Roles that can use it: the same as [section 6.2](/docs/guides/web/inventory/items/). Permissions: `inventory.view` opens the list, `inventory.create` creates categories, `inventory.update` edits them, `inventory.delete` deletes them, `inventory.export` exports the list.

## Opening and reading the list

1. In the sidebar, open the group **Inventaris** (Inventory), then click **Kategori**.
2. Read the list.

   - The field **Cari kategori** (Search categories) searches the category name and code. Click **Filter** (or press Enter) to apply.
   - Columns: **Kode** (Code), **Nama** (Name), **Satuan** (Unit; name and symbol of the unit), **Sub-kategori** (Subcategories; number of child categories), **Status** (**Aktif** (Active) or **Nonaktif** (Inactive)) and **Aksi** (Actions). **Kode** and **Nama** can be sorted, the initial order is by name.
   - Each row has the button **Ubah** (Edit) and the menu **Aksi lainnya** (More actions) containing **Nonaktifkan** (Deactivate) or **Aktifkan** (Activate), and **Hapus permanen** (Delete permanently) if the category was never used. There is no detail page, and **Ubah** opens a dialog. The filter **Status** has **Aktif**, **Nonaktif**, **Dihapus** (Deleted), and **Semua, termasuk dihapus** (All, including deleted).
   - The button **Ekspor** (Export; holders of `inventory.export`) offers **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF) with the columns Code, Name, Unit (unit name) and Subcategories. The button **Buat Kategori** (Create category) appears for holders of `inventory.create`.
   - If there are no categories yet, the list shows **Tidak ada data.** (No data.) with the remark **Buat kategori lebih dulu, lalu pilih kategori itu saat membuat barang.** (Create a category first, then choose it when you create an item.) and the button **Buat Kategori**.

   ![Categories list with the columns Code, Name, Unit, Subcategories and Status](~/assets/guide/web/categories.webp)

## Creating a category

1. Click **Buat Kategori**. The dialog **Buat Kategori** opens.
2. Fill in the form:
   - Fill in **Nama**. This field is required, at most 255 characters. Example: `Connector`.
   - Fill in **Kode**. This field is required, at most 100 characters, and not yet used by another category in this company. Example: `CON`.
   - Choose **Satuan**: type to search, then choose a unit, for example `pcs (pcs)`. This field is required. Units are created in the Units menu ([section 6.4](/docs/guides/web/inventory/units/)).
   - Choose **Induk** (Parent) if this category is a child of another category: type to search, then choose the category (shown as code and name). The list contains all categories. Leave it empty (**Tanpa induk (kategori utama)**, No parent (main category)) for a main category. Click **Hapus pilihan: Induk** (Clear selection: Parent) to empty the choice.
   - The switch **Aktif** is on by default.
   - The field **Deskripsi** (Description) is optional and accepts free text.
3. Click **Buat** (Create), or **Batal** (Cancel). The dialog closes and the toast `Kategori berhasil dibuat.` appears.

## Editing, deactivating, permanently deleting and restoring categories

1. Click **Ubah**, change the fields in the dialog **Ubah Kategori** (Edit category), then click **Simpan** (Save). The toast `Kategori berhasil diubah.` appears. The choice **Induk** does not offer the category that is being edited.
2. To stop using a category, open the menu **Aksi lainnya** and choose **Nonaktifkan**. The toast `Kategori barang dinonaktifkan.` appears. An inactive category does not appear in the **Kategori** choice when you create a new item, but items that already use it stay intact. **Aktifkan** uses it again.
3. **Hapus permanen** exists only if the category was never used: it has no child categories and no items in it (including deleted ones). The toast `Kategori barang dihapus permanen.` appears.
4. The filter **Status** has **Aktif**, **Nonaktif**, **Dihapus**, and **Semua, termasuk dihapus**. Deleted rows have **Pulihkan** (Restore). A child category cannot be restored while its parent is still deleted ("Kategori barang tidak bisa dipulihkan karena induknya, `<nama>`, masih dihapus. Pulihkan induknya dulu." (The item category cannot be restored because its parent, `<nama>`, is still deleted. Restore the parent first.)).

Changing the **Satuan** of a category also changes the unit of all items in that category. Item stock quantities are not converted. The unit chosen for a category must be active.

## Common errors

- The code is refused with the message `kode sudah digunakan.`: the code must be unique per company, including the code of deleted categories. Use another code.
- **Hapus permanen** is not in the category menu: the category still has child categories or items (the numbers are shown in the **Nonaktifkan** dialog). Move the items to another category through **Ubah** in the Items menu ([section 6.2](/docs/guides/web/inventory/items/)), and empty **Induk** on the child categories. Or simply **Nonaktifkan** the category.
- The unit of items changed by accident: you changed the **Satuan** of the category. Choose the original unit again through **Ubah**.
- Staff or a manager chooses **Hapus** and the page **Akses ditolak** (Access denied; error 403) appears: the permission `inventory.delete` is held only by the admin in the built-in roles ([section 6.2](/docs/guides/web/inventory/items/)).
