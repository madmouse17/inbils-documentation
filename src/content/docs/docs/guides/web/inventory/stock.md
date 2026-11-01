---
title: "6.5 Stock (Stok)"
description: "Check item quantities per location, receive items, transfer stock between locations, and request or approve stock count adjustments."
---

**Stok** (Stock) shows the quantity of every item at every location. From here you record incoming items, move stock between locations, request corrections after a physical count, and approve those corrections. Open this menu to check availability or record a receipt.

Roles that can use it: admin, manager, staff. Permissions: `inventory.view` opens the list, `inventory.export` shows **Ekspor** (Export), `inventory.stock.receive` shows **Terima Barang** (Receive items), `inventory.stock.transfer` shows **Pindahkan stok** (Move stock), `inventory.stock.adjust.request` shows **Ajukan Penyesuaian** (Request adjustment), `inventory.stock.adjust.approve` shows **Setujui** (Approve) and **Tolak** (Reject). With the built-in roles, the admin holds all of them, staff hold `inventory.view`, `inventory.stock.receive`, `inventory.stock.transfer` and `inventory.stock.adjust.request`, and the manager holds `inventory.view`, `inventory.export` and `inventory.stock.adjust.approve`.

A role without `roles.manage` cannot hold the approve permission together with the permission to request, receive, issue or move stock (separation of duties). If you save a role with such a pair ([section 8.6](/docs/guides/web/administration/roles/)), the system refuses with a message such as `Pemisahan tugas (persetujuan penyesuaian stok vs operasi stok): inventory.stock.adjust.approve tidak boleh digabung dengan inventory.stock.adjust.request.` A requester also cannot decide on their own request, including the admin.

## Opening and reading the list

1. In the sidebar, open the group **Inventaris** (Inventory), then click **Stok**.
2. Read the list.

   - One row is one item at one location. The system creates a row at the first stock operation, for example a receipt, an incoming transfer or an adjustment.
   - Columns: **Barang** (Item; name and SKU), **Lokasi** (Location; location code and name), **Jumlah** (Quantity; physical quantity at the location, including what is already reserved), **Dicadangkan** (Reserved; the reserved quantity, for example by an approved item request) and **Tersedia** (Available; **Jumlah** minus **Dicadangkan**). **Jumlah** and **Dicadangkan** can be sorted, and the newest rows are shown at the top.
   - The field **Cari stok** (Search stock) searches the item name and SKU and the location name and code. The filters **Lokasi** (if empty it shows **Semua lokasi**, All locations) and **Barang** (if empty it shows **Semua barang**, All items) are search fields: type at least 2 letters, then choose. At most 20 choices are shown, only active locations and items, and your choice stays visible until you choose another or click **Hapus pilihan: Lokasi** or **Hapus pilihan: Barang** (Clear selection: Location or Item). There is no **Filter** button: the list reloads by itself when you type or choose.
   - The button **Ekspor** (holders of `inventory.export`) offers **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF) for the current search and filters. The columns are Item, Location (location code), Quantity, Reserved and Available.
   - If no row matches, the list shows **Tidak ada stok yang cocok** (No matching stock) with the button **Reset filter** (Reset filters). If there is no stock at all, the list shows **Belum ada stok** (No stock yet) and **Stok muncul setelah barang diterima di sebuah lokasi.** (Stock appears after items are received at a location.), with the button **Terima Barang** for holders of `inventory.stock.receive`.

   ![Stock list per item and location with the buttons Receive items and Request adjustment](~/assets/guide/web/stocks.webp)

3. To see low stock, click the card **Stok di bawah minimum** (Stock below minimum) on the Dashboard ([chapter 2](/docs/guides/web/dashboard/queue-cards/)).

   - The Stock page opens with the low stock filter: only rows whose **Jumlah** is equal to or below the **Stok Minimum** (Minimum stock) of the item ([section 6.2](/docs/guides/web/inventory/items/)).
   - The comparison is done per row (one location), not against the total of all locations, and inactive items are counted too.
   - This filter has no box or mark on the screen, and stays active when you search or change another filter. The button **Reset filter** also removes it, but that button appears only if no row matches. Open **Stok** again from the sidebar to see all rows.

## Receiving items

Use this when items arrive at a location, for example from a purchase.

1. Click **Terima Barang**. The dialog **Terima Barang** opens.

   ![Receive items dialog with the fields Item, Location, Quantity, Supplier, Invoice no., Unit price and Notes](~/assets/guide/web/stocks-receive.webp)

2. Fill in the form:
   - Choose **Barang**: type at least 2 letters of the name or SKU, then choose. This field is required and offers only active items. Each choice shows the SKU, the name, and the unit in brackets, with the category name below.
   - Choose **Lokasi**: type at least 2 letters of the location code or name, then choose. This field is required and offers only active locations. Each choice shows the code and name, with the location path below. Locations are created in the Locations menu ([section 5.1](/docs/guides/web/network/locations/)).
   - Fill in **Jumlah**. This field is required, must be more than 0, and its initial value is `1`.
   - **Pemasok** (Supplier) is optional, at most 150 characters. Write the name of the item supplier.
   - **No. faktur** (Invoice no.) is optional, at most 100 characters. Write the number of the invoice or receiving document.
   - **Harga satuan** (Unit price) is optional: the price of one unit of the item in rupiah (hint `Rupiah per satuan barang.`), 0 or more, with at most two decimal digits.
   - **Catatan** (Notes) is optional and accepts at most 500 characters.
3. Click **Simpan** (Save), or **Batal** (Cancel). The dialog closes and the toast `Barang berhasil diterima.` appears.

The **Jumlah** of the item at that location increases by the received quantity, and the stock row is created if it does not exist yet. One movement of the type **Masuk** (In) is recorded ([section 6.7](/docs/guides/web/inventory/stock-movements/)). **Pemasok**, **No. faktur** and **Harga satuan** are saved on that movement and shown in the column **Catatan** of Stock movements as `Pemasok: ...`, `No. faktur: ...` and `Harga satuan: Rp ...`. All three are receipt remarks only and do not change the stock quantity. A receipt takes effect at once, without approval.

## Requesting a stock adjustment

Use this when the physical count differs from the figure in the system. Stock changes only after another user approves.

1. Click **Ajukan Penyesuaian**. The dialog **Ajukan Penyesuaian Stok** (Request stock adjustment) opens.
2. Fill in the form:
   - Choose **Barang** and **Lokasi**, as for a receipt. Both are required.
   - Fill in **Jumlah baru (hasil hitung fisik)** (New quantity (physical count result)) with a number of 0 or more. This field is required. Enter the total of the count, not the difference.
   - Fill in **Alasan** (Reason). This field is required, at most 500 characters. The reason becomes the movement note when the request is approved.
   - After **Barang** and **Lokasi** are chosen, the dialog shows **Stok sistem: {jumlah} {satuan}** (System stock: {quantity} {unit}), plus `({jumlah} dicadangkan)` (({quantity} reserved)) if there is a reservation. Compare that figure with your count before you fill in **Jumlah baru (hasil hitung fisik)**. While the figure is loading, the dialog shows `Memuat stok...` (Loading stock...).
3. Click **Ajukan** (Submit), or **Batal**. The dialog closes and the toast `Permintaan penyesuaian stok diajukan dan menunggu persetujuan.` appears. Stock has not changed yet, and the request appears in the panel **Penyesuaian stok menunggu persetujuan** (Stock adjustments awaiting approval) above the list.

## Approving or rejecting an adjustment

The panel **Penyesuaian stok menunggu persetujuan** appears when there are requests waiting, with a remark that the stock change takes effect only after approval by someone other than the requester. A requester sees only their own requests, while holders of `inventory.stock.adjust.approve` see all of them (at most 50, oldest on top). The columns are **Barang**, **Lokasi**, **Stok** (the quantity at submission, an arrow, and the new quantity), **Selisih** (Difference; the new quantity minus the quantity at submission, with a plus or minus sign), **Alasan**, **Pemohon** (Requester), **Status** (badge **Menunggu** (Pending)) and **Aksi** (Actions).

1. On the request row, click **Setujui** or **Tolak**. Both buttons appear only for holders of `inventory.stock.adjust.approve` who are not the requester. For other users, the column **Aksi** contains a hyphen.
2. To approve, check the item, location, quantity and the requester's reason in the dialog **Setujui Penyesuaian Stok** (Approve stock adjustment), then click **Setujui**. The toast `Penyesuaian stok disetujui.` appears.
3. To reject, fill in **Alasan penolakan** (Rejection reason) in the dialog **Tolak Penyesuaian Stok** (Reject stock adjustment) (required, 3 to 500 characters), then click **Tolak**. The toast `Penyesuaian stok ditolak.` appears.

When approved, the stock is set to **Jumlah baru** at once and one movement of the type **Penyesuaian** (Adjustment) is recorded with the **Alasan** as its note. The difference on the movement is calculated from the stock recorded at submission, and approval proceeds only if the stock at that moment is still equal to that figure. If the stock has changed, approval is refused (see **Common errors** below). When rejected, stock does not change.

The system sends no notification for submission, approval or rejection. A request that has been decided disappears from the panel, and the rejection reason is recorded in the audit trail ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)), not on the Stock page. Tell the requester in person.

## Moving stock

Permission: `inventory.stock.transfer`. Use this when items move from one location to another, for example from the central warehouse to a branch warehouse. A transfer takes effect at once, without approval.

1. Click **Pindahkan stok** at the top right of the Stock page. The dialog **Pindahkan stok** opens.

   ![Move stock dialog with the fields From, To, Item, Quantity and Notes](~/assets/guide/web/stocks-transfer.webp)

2. Fill in the form:
   - Choose **Dari** (From): the source location. Type at least 2 letters of the location code or name, then choose. This field is required.
   - Choose **Ke** (To): the destination location, in the same way. This field is required and must differ from **Dari**.
   - Choose **Barang**: type at least 2 letters of the name or SKU, then choose. This field is required.
   - After **Barang** and **Dari** are chosen, the dialog shows **Tersedia di lokasi asal: {jumlah} {satuan}** (Available at the source location: {quantity} {unit}). The quantity you move must not exceed this figure.
   - Fill in **Jumlah**. This field is required and must be more than 0.
   - **Catatan** is optional and accepts at most 500 characters.
3. Click **Pindahkan** (Move), or **Batal**. The dialog closes and the toast `Stok berhasil ditransfer.` appears.

Stock at the source location decreases and stock at the destination location increases by the same quantity. Stock movements record two rows of the type **Transfer** ([section 6.7](/docs/guides/web/inventory/stock-movements/)).

## Direct issues and adjustments

The permissions for these two operations exist, but the Stock page does not provide their buttons:

- An issue (`inventory.stock.issue`, held by admin, staff and technician) needs an item, a location, a quantity above 0 and an optional note. Stock must not decrease beyond **Tersedia**. On the web, stock goes out through Item requests when the items are handed over ([section 6.1](/docs/guides/web/inventory/item-requests/)), and through work orders (SPK) when the work order is approved and becomes `completed` ([section 3.3](/docs/guides/web/operations/work-orders/)).
- A direct or break-glass adjustment (`inventory.stock.adjust`, admin only) uses an item, a location, a new quantity of 0 or more and a required reason. The change takes effect at once and the audit gives it the marker `break_glass`, but there is no button for it. Stock corrections from the screen always go through the request and approval above.

## Common errors

- The dialog **Terima Barang** refuses with `Barang, lokasi, dan jumlah (lebih dari 0) wajib diisi.`: choose an item and a location, then fill in a quantity above 0.
- The item is not in the **Barang** choice: the item is **Nonaktif** (Inactive), or you have not typed at least 2 letters (the field shows **Ketik minimal 2 huruf untuk mencari.** (Type at least 2 letters to search.)). Activate it in the Items menu ([section 6.2](/docs/guides/web/inventory/items/)). To see the stock of an inactive item, use the **Cari stok** box. Inactive locations are not offered either ([section 5.1](/docs/guides/web/network/locations/)).
- The button **Terima Barang** or **Ajukan Penyesuaian** is missing: your role does not hold the permission. The manager deliberately does not hold them because of separation of duties. Ask the admin to set up the role ([section 8.6](/docs/guides/web/administration/roles/) and [8.7](/docs/guides/web/administration/permissions/)).
- The buttons **Setujui** and **Tolak** are missing on your own request: a requester must not decide on their own request, including the admin. Ask another user who holds `inventory.stock.adjust.approve`.
- The decision dialog shows `Permintaan penyesuaian stok tidak dapat disetujui karena status telah berubah atau Anda tidak berwenang.` (or `... tidak dapat ditolak ...`): another user decided first, or your permissions changed. Close the dialog and reload the page.
- A red toast `Stok berubah sejak dihitung; hitung ulang.` (Stock changed since it was counted; count again.) on **Setujui**: the stock of that item at that location changed (incoming, outgoing, or another adjustment) between submission and approval. Stock does not change and the request stays pending. Ask the approver to reject it, then submit again with the new count. A direct adjustment by the admin does not go through this check.
- **Jumlah baru (hasil hitung fisik)** was filled in wrongly: this figure is the total of the physical count, not the difference, and must not be negative. A requester cannot edit or cancel a request that is already submitted. Ask the approver to reject it, then submit again.
- Approval of an adjustment fails with the message `Stok {barang} di {lokasi} tidak bisa diturunkan ke {jumlah} {satuan}, karena {jumlah} {satuan} sudah dicadangkan.` if the **Jumlah baru** is smaller than the **Dicadangkan** quantity. Reject the request, wait for the reservation to finish, then submit again.
- The dialog **Pindahkan stok** refuses with `Dari, ke, barang, dan jumlah (lebih dari 0) wajib diisi.` if a field is empty, and with `Lokasi tujuan harus berbeda dari lokasi asal.` if **Dari** equals **Ke**. If the quantity exceeds **Tersedia** at the source location, the message is `Stok {barang} di {lokasi} tidak cukup: tersedia {jumlah} {satuan}, diminta {jumlah} {satuan}.` Choose two different locations and reduce the quantity.
- The button **Pindahkan stok** is missing: your role does not hold `inventory.stock.transfer`. Ask the admin to set up the role ([section 8.6](/docs/guides/web/administration/roles/) and [8.7](/docs/guides/web/administration/permissions/)).
