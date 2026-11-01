---
title: "7.7 Stock card (Kartu Stok)"
description: "Follow every movement of one item with the quantity moved and the location balance right after it, filtered by location and period, and export the ledger."
---

Kartu Stok (Stock card) is the movement ledger of one item. This report shows the quantity of each movement and the location balance right after each movement, without recalculating stock.

Roles that can use it: admin, manager, staff. Permissions: `report.stock_card.view`. The **Ekspor** (Export) button requires `report.export`. The buttons to stock and to all movements also require `inventory.view`.

## Opening and reading the stock card

1. Open **Laporan** (Reports), then click **Kartu Stok**.
2. Select an **Barang** (Item) (required, marked with an asterisk). Type a name or SKU in the field that reads **Cari nama atau SKU...** (Search name or SKU...), then select an item from the list. The list appears only after you type at least two letters. The server searches the items of the active company and shows at most 20 results, with the SKU under the name. Items that have been deleted can still be selected, because the ledger keeps their movements. The selection stays while you type and changes only when you select another item or click **Hapus pilihan: Barang** (Clear selection: Item).
3. If needed, select a **Lokasi** (Location) in the same way (search the location name or code). The empty field reads **Semua lokasi** (All locations). With a location selected, the report contains only movements that use that location as origin or destination.
4. Select a **Periode** (Period), then click **Tampilkan** (Show). This button is inactive until an item is selected. Before you apply an item, the page shows "Pilih barang lalu tekan Tampilkan untuk melihat pergerakan stok." (Select an item and press Show to see stock movements.) Under that sentence, the section **Barang terakhir bergerak** (Recently moved items) shows up to 8 items whose stock moved most recently, each with its name, SKU and date of the last movement. Click one of them to open the card of that item without typing. This section does not show if the company has no stock movements yet.

   ![Stock card page before an item is selected, with the Recently moved items section](~/assets/guide/web/reports-stock-card.webp)

5. Read the table:
   - The column **Jenis** (Type) shows the movement type as a badge: Masuk (In), Keluar (Out), Transfer, Penyesuaian (Adjustment), Dicadangkan (Reserved), Cadangan dilepas (Reservation released) or Pengembalian (Return).
   - The column **Jumlah** (Amount) shows the signed quantity as recorded by Inventaris (Inventory).
   - The column **Saldo** (Balance) shows the balance of the stock row touched, right after the movement.
   - The columns **Dari** (From) and **Ke** (To) show the origin and destination locations. An empty cell is written **-**.
   - The column **Catatan** (Notes) shows the notes of the movement.
   - The column **Referensi** (Reference) shows the work order (SPK) or item request that caused the movement, for example "SPK" followed by the SPK code. That text becomes a link if the account may open it. Other sources show as plain text.
   - The column **Tanggal** (Date) shows the time the movement was recorded, in the company format.
6. Sort by the column headings **Jumlah**, **Saldo** or **Tanggal**. The default order uses the latest time. Under the table, select **Baris per halaman** (Rows per page) (10, 25 or 50 per page) and move between pages with **Sebelumnya** (Previous) and **Berikutnya** (Next).
7. Use **Lihat stok** (View stock) to open Stok (Stock) ([section 6.5](/docs/guides/web/inventory/stock/)), or **Semua pergerakan** (All movements) to open Mutasi Stok (Stock movements) ([section 6.7](/docs/guides/web/inventory/stock-movements/)). The buttons appear only after an item is applied, and carry the same item and location.
8. Read the card **Definisi** (Definitions) under the table for the definitions of **Pergerakan stok** (Stock movement), **Jumlah** and **Saldo**.
9. Click **Ekspor** to download the whole matching ledger as CSV or PDF. The file contains Tanggal, Barang, Jenis, Jumlah, Saldo setelah (Balance after), Dari, Ke, Referensi and Catatan. The Jenis column is written with the same labels as on screen (Masuk, Keluar, Pengembalian and so on). The Tanggal column uses the company clock, and the PDF writes date, time, quantity and balance as on screen. The PDF writes the selected item and location in the header, on the **Filter** line.

## Common errors

- **Barang** is required. The **Tampilkan** button stays inactive until you select an item.
- An item or location does not appear in the list: the list contains only data of the active company. Check the company selector in the sidebar. Locations that have been deleted are also not offered. A page address that carries an item or location of another company, or one that does not exist, is rejected by the server with the validation error "Barang tidak ditemukan." (Item not found.) or "Lokasi tidak ditemukan." (Location not found.) The selectors cannot produce this error. Kartu Stok does not write that message near the field. Only the notice "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.) shows if the server returns you to the screen.
- The message **Tidak ada pergerakan stok** (No stock movements) means there are no movements for that item and period. Change the filter, then click **Tampilkan** again.
- **Saldo** is not a combined running balance of all locations or all rows in the filtered result. Its value is a snapshot of one stock row at the time the movement was recorded.
- The report does not create an opening balance row. For the current balance, click **Lihat stok**.
- The **Ekspor** button appears only after an item is applied and the account holds `report.export`.
