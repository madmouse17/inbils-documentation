---
title: "6.7 Stock movements (Mutasi Stok)"
description: "Trace why an item's stock changed using the read-only history of receipts, issues, adjustments, reservations and returns, with search, filters and export."
---

**Mutasi Stok** (Stock movements) is the history of all stock changes: items in, items out, corrections and reservations. Open this menu to trace why the stock quantity of an item changed. This screen is read-only, and a movement that has been recorded cannot be changed or deleted by anyone.

Roles that can use it: admin, manager, staff. Permissions: `inventory.view` (View items) opens the list, and `inventory.export` (Export items) shows **Ekspor** (Export). With the built-in roles, the admin and manager can export, staff cannot.

## Opening and reading the list

1. In the sidebar, open the group **Inventaris** (Inventory), then click **Mutasi Stok**.
2. Read the list.

   - Columns: **Jenis** (Type; coloured badge), **Barang** (Item; name with the SKU below it), **Jumlah** (Quantity; with a minus sign if stock decreases), **Saldo setelah** (Balance after; the physical stock of the item at that location after the movement), **Dari** (From), **Ke** (To), **Oleh** (By; the user who recorded the movement), **Catatan** (Notes) and **Waktu** (Time; date and time in the company format). **Jenis**, **Jumlah** and **Waktu** can be sorted, and the newest movements are shown at the top. An empty cell is shown as a hyphen (`-`). A movement created automatically by the system can be empty in the column **Oleh**. On a **Masuk** (In) movement that records **Pemasok**, **No. faktur** or **Harga satuan** ([section 6.5](/docs/guides/web/inventory/stock/)), all three are shown below the note, as `Pemasok: ...`, `No. faktur: ...` and `Harga satuan: Rp ...`.
   - The box **Cari mutasi** (Search movements; hint `Barang, SKU, lokasi, atau catatan`) searches the item name or SKU, the name or code of the source and destination locations, the notes, and the movement type code in English (for example `receive`, not the label **Masuk**). The list reloads by itself shortly after you stop typing.
   - The filter **Jenis** contains **Semua jenis** (All types) and seven movement types: **Masuk**, **Keluar** (Out), **Transfer**, **Penyesuaian** (Adjustment), **Dicadangkan** (Reserved), **Cadangan dilepas** (Reservation released) and **Pengembalian** (Return).
   - The filters **Barang** (hint `Semua barang`) and **Lokasi** (hint `Semua lokasi`) are select boxes with search: type to search, then choose. Type at least 2 letters. The list shows at most 20 results from active items or active locations, in the form `SKU - name (unit)` and `code - name`. Your choice stays visible while you type and changes only when you choose another or click **Hapus pilihan** (Clear selection). The filter **Lokasi** matches movements whose **Dari** or **Ke** location is that location.
   - All filters take effect at once without a button. There is no date filter. For a date range and the balance at the start and end of a period, use the Stock card report ([section 7.7](/docs/guides/web/finance-and-reports/stock-card/)).
   - The menu **Ekspor** (holders of `inventory.export`) contains **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF) for the current search and filters. The columns are Type, Item, From, To, Quantity, Balance, Notes and Date. The column **Oleh** and the receipt remarks are not exported. The file formats are described in [section 7.3](/docs/guides/web/finance-and-reports/reports/).
   - The button **Stok** (Stock) opens the Stock page ([section 6.5](/docs/guides/web/inventory/stock/)).

   ![Stock movements list with the Search movements box, the Type, Item and Location filters, the Export menu, and the movement table](~/assets/guide/web/stock-movements.webp)

3. To see one item, open the item details in the Items menu ([section 6.2](/docs/guides/web/inventory/items/)). The card **Mutasi Terbaru** (Latest movements) there contains the movements of that item, newest on top. Click **Lihat semua mutasi** (View all movements). Stock movements opens with the filter **Barang** already filled with that item. Click **Hapus pilihan** on the filter **Barang** to see all items again.
4. If there are no rows, the table shows `Belum ada mutasi stok` (No stock movements yet; there are no movements at all) or `Tidak ada mutasi yang cocok` (No matching movements) with the button **Reset filter** (Reset filters) (the search or filters are too narrow).

## Movement types

The column **Jenis** shows one of these seven labels.

| Type | Meaning | Quantity | From and To |
|---|---|---|---|
| **Masuk** | Items come into a location from **Terima Barang** (Receive items; a purchase or other receipt) | Plus | Only **Ke** is filled |
| **Keluar** | Items go out of a location, when an item request is handed over or a work order (SPK) is approved | Minus | Only **Dari** is filled |
| **Transfer** | A move between locations, recorded as two rows: out of the source location, into the destination location | Minus on the source row, plus on the destination row | **Dari** on the out row, **Ke** on the in row |
| **Penyesuaian** | A stock correction to the approved physical count | The difference, plus or minus | **Dari** and **Ke** are the same |
| **Dicadangkan** | Stock is reserved for an approved item request, the physical quantity does not change | Plus | Only **Ke** is filled |
| **Cadangan dilepas** | A reservation is released, the physical quantity does not change | Minus | Only **Ke** is filled |
| **Pengembalian** | Items return to a location, from the physical receipt of a material return ([section 6.8](/docs/guides/web/inventory/material-returns/)) | Plus | Only **Ke** is filled |

One item request leaves a sequential trail: **Dicadangkan** when approved, then **Cadangan dilepas** and **Keluar** when the items are handed over. A work order does not create **Dicadangkan** or **Cadangan dilepas** movements. The movement note contains the source code: `Penyerahan Permintaan Barang: <kode>` for a handover, `SPK <kode>` for usage on a work order (with the addition `(partial IR covered <jumlah>)` if part of the quantity already went out through an item request), and `Penerimaan Fisik Pengembalian Material: <kode permintaan>` for a received material return (the code of the original item request; without an original request, the note is only `Penerimaan Fisik Pengembalian Material`). Search for that code in the box **Cari mutasi** to trace one request or work order.

The physical receipt of a material return is recorded as **Pengembalian**, not **Masuk**, so items coming back from the field are kept separate from items that were purchased. Return receipt movements recorded before this change keep the type **Masuk**.

## Common errors

- Searching movements by date: this screen has no date filter. Use the Stock card report ([section 7.7](/docs/guides/web/finance-and-reports/stock-card/)), which has the field **Periode** (Period) and the column **Saldo** (Balance).
- A wrongly recorded movement cannot be changed or deleted: correct it with **Ajukan Penyesuaian** (Request adjustment) in Stock ([section 6.5](/docs/guides/web/inventory/stock/)). After approval, the correction adds a new **Penyesuaian** movement and does not delete the old one.
- The physical quantity does not change after an item request is approved: the **Dicadangkan** row only raises **Dicadangkan** in Stock. The physical quantity decreases when the items are handed over (**Keluar**).
- The list contains only one item: the filter **Barang** is filled, for example because you came from the link **Lihat semua mutasi**. Click **Hapus pilihan** on that filter.
- Typing **Masuk** in **Cari mutasi** does not find that type: the search box reads the type code in English. Use the filter **Jenis**.
- The menu **Ekspor** is missing: your role does not hold `inventory.export`, and the built-in staff role does not hold it.
