---
title: "6.4 Units (Satuan)"
description: "Define the units of measure for items, such as pcs, metre or box. Create, edit, deactivate, delete and restore units used by categories."
---

**Satuan** (Units) are the units of measure of items, for example pcs, metre or box. The unit is chosen on the category, and items follow the unit of their category. Open this menu when you need a new unit that does not exist yet.

Roles that can use it and permissions: the same as [section 6.3](/docs/guides/web/inventory/categories/).

## Opening and reading the list

1. In the sidebar, open the group **Inventaris** (Inventory), then click **Satuan**.
2. Read the list. The columns are **Nama** (Name), **Simbol** (Symbol; both can be sorted), **Status**, and **Aksi** (Actions; the button **Ubah** (Edit) and the menu **Aksi lainnya** (More actions) containing **Nonaktifkan** (Deactivate) or **Aktifkan** (Activate), and **Hapus permanen** (Delete permanently) if the unit was never used). The list has a **Status** filter and has no search box or detail page. The button **Ekspor** (Export; holders of `inventory.export`) offers **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF) with the columns Name and Symbol, and the button **Buat Satuan** (Create unit) appears for holders of `inventory.create`. If there are no units yet, the list shows **Tidak ada data.** (No data.) with the remark **Buat satuan lebih dulu, lalu pakai satuan itu pada kategori barang.** (Create a unit first, then use it on an item category.) and the button **Buat Satuan**.

   ![Units list with the columns Name and Symbol](~/assets/guide/web/units.webp)

## Creating a unit

1. Click **Buat Satuan**. The dialog **Buat Satuan** opens.
2. Fill in the form:
   - Fill in **Nama**. This field is required, at most 100 characters, and not yet used by another unit in this company. Example: `box`.
   - Fill in **Simbol**. This field is required, at most 20 characters, and not yet used by another unit in this company. Example: `box`.
3. Click **Buat** (Create), or **Batal** (Cancel). The dialog closes and the toast `Satuan berhasil dibuat.` appears.

## Deactivating, permanently deleting and restoring units

1. Click **Ubah**, change the fields in the dialog **Ubah Satuan** (Edit unit), then click **Simpan** (Save). The toast `Satuan berhasil diubah.` appears.
2. To stop using a unit, open the menu **Aksi lainnya** and choose **Nonaktifkan**. The toast `Satuan dinonaktifkan.` appears. An inactive unit does not appear in the **Satuan** choice when you create or edit a category, but categories and items that already use it stay intact. **Aktifkan** uses it again.
3. **Hapus permanen** exists only if no item or item category has ever used the unit. The toast `Satuan dihapus permanen.` appears. The unit of an item follows its category, so first change the **Satuan** on the category concerned ([section 6.3](/docs/guides/web/inventory/categories/)) if you want to delete the old unit.
4. The list has a **Status** column and a **Status** filter (**Aktif** (Active), **Nonaktif** (Inactive), **Dihapus** (Deleted), **Semua, termasuk dihapus** (All, including deleted)). Deleted rows have **Pulihkan** (Restore).

## Common errors

- Saving is refused with the message `nama sudah digunakan.` or `simbol sudah digunakan.`: **Nama** and **Simbol** must be unique per company, including those of deleted units.
- **Hapus permanen** is not in the unit menu: the unit is still used by items or item categories (the numbers are shown in the **Nonaktifkan** dialog). Check the column **Satuan** in the Categories list ([section 6.3](/docs/guides/web/inventory/categories/)) and choose another unit on that category, or simply **Nonaktifkan** the unit.
- Staff or a manager chooses **Hapus** (Delete) and the page **Akses ditolak** (Access denied; error 403) appears: see [section 6.2](/docs/guides/web/inventory/items/).
