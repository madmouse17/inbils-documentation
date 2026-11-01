---
title: "6.6 Find items (Cari Barang)"
description: "Search consumable items by name or SKU and see how much of each is stocked at every location, so you know where an item is available."
---

**Cari Barang** (Find items) answers the question: where is this item and how many are there? Type part of a name or SKU, then read the quantity at each location. Open this menu when you need to know at which location a consumable item is available.

Roles that can use it: admin, manager, staff. Permissions: `inventory.view` (View items). There is no extra permission, and this menu does not change data.

## Opening and reading the results

1. In the sidebar, open the group **Inventaris** (Inventory), then click **Cari Barang**. The table at first shows the text `Ketik nama atau SKU di kolom atas, lalu klik Cari.` (Type a name or SKU in the box above, then click Search.) because there is no search yet.

   ![Find items page before a search, with the Name or SKU box, the Search button, and a table with the columns Item, SKU, Location, Path, Available, Quantity, Reserved](~/assets/guide/web/inventory-find.webp)

2. Type part of a name or SKU in the box **Nama atau SKU** (Name or SKU; example text: `Contoh: kabel`), then click **Cari** (Search) or press Enter. An empty box returns nothing.
3. Read the results. Each row is one item at one location, with the columns **Barang** (Item), **SKU**, **Lokasi** (Location), **Jalur** (Path; location path), **Tersedia** (Available; the quantity that can be used), **Jumlah** (Quantity; physical quantity) and **Dicadangkan** (Reserved; the reserved quantity). Results are not split into pages and cannot be sorted.

   ![Search results in Find items with the columns Item, SKU, Location, Path, Available, Quantity and Reserved](~/assets/guide/web/inventory-find-result.webp)

The subtitle on the screen reads `Cari barang habis pakai berdasarkan nama atau SKU, lalu lihat jumlahnya di setiap lokasi.` (Search consumable items by name or SKU, then see their quantity at each location.) The search indeed includes only items of the type **Habis pakai** (Consumable). Items of the type **Aset** (Asset) or **Layanan** (Service) are not shown, while inactive items are still shown if their name or SKU matches.

## Common errors

- `Tidak ada barang habis pakai yang cocok dengan "<kata>". Coba potongan nama atau SKU yang lain.` appears (No consumable items match "<word>". Try another part of the name or SKU.): the search matches only parts of the name or SKU, not the category or description. Items of the type **Aset** or **Layanan** are never shown here either. Type an exact part.
- An item appears as one row with the text `Belum ada stok di lokasi mana pun.` (There is no stock at any location yet.): the item has never been received at any location. Record its receipt with **Terima Barang** (Receive items) in Stock ([section 6.5](/docs/guides/web/inventory/stock/)).
- **Tersedia** is smaller than **Jumlah**: the difference is the **Dicadangkan** quantity, for example for an approved item request.
