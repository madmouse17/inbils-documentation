---
title: "6.8 Material returns (Pengembalian Barang)"
description: "Record leftover material that technicians bring back, then verify it in the warehouse so stock increases only after the items are checked."
---

**Pengembalian Barang** (Material returns) records the leftover material a technician brings home after work, and adds to warehouse stock only after warehouse staff check the items. The system opens one return file each time an item request has the status **Diserahkan** (Handed over). The technician reports in the technician app, and the warehouse verifies on the web.

Roles that can use it: admin (all steps), manager (view all, receive, resolve differences) and staff (view all, receive). Permissions: `inventory.return.view.own` (View own item returns), `inventory.return.view.all` (View all item returns), `inventory.return.declare` (Report leftover items), `inventory.return.receive` (Receive item returns), `inventory.return.resolve` (Resolve return differences).

Holders of `inventory.return.view.all` see all files in the active company, while holders of `inventory.return.view.own` see only their own files. `inventory.return.declare` allows the file owner to report usage, `inventory.return.receive` allows receiving or rejecting the physical handover, and `inventory.return.resolve` allows resolving differences.

The file owner is the requester of the request, usually a technician. The owner must not receive, reject or resolve their own file, and the person who receives the items physically must not resolve the differences of the same file.

## Opening and reading the list

Returns have no menu of their own. The list is one tab on the Item requests page.

1. In the sidebar, open the group **Inventaris** (Inventory), then click **Permintaan Barang** (Item requests).
2. Click the tab **Pengembalian material** (Material returns). This tab appears for holders of any of the return permissions above. The card **Antrean retur material** (Material return queue) on the Dashboard ([section 2.1](/docs/guides/web/dashboard/queue-cards/)) opens this tab directly at the matching queue.

   ![Material returns tab with the box Material return stock safety principle, the queue buttons, the Search returns box, and the file cards](~/assets/guide/web/inventory-returns.webp)

3. Read the top of the tab. The box **Prinsip keamanan stok pengembalian material** (Material return stock safety principle) reminds you that a technician's declaration does not change warehouse stock. Choose a queue with the buttons below it:
   - **Antrean Penerimaan Gudang** (Warehouse receipt queue): files with **Menunggu penerimaan gudang** (Awaiting warehouse receipt). Appears for holders of the receive or view all permission, and opens first for holders of `inventory.return.receive`.
   - **Antrean Selisih** (Differences queue): files with **Selisih perlu penyelesaian** (Difference needs resolution). Appears for holders of the resolve or view all permission, and opens first for holders of `inventory.return.resolve` who do not hold the receive permission.
   - **Antrean Deklarasi Teknisi** (Technician declaration queue): files with **Menunggu deklarasi teknisi** (Awaiting technician declaration). Appears for holders of the report, view own, or view all permission.
   - **Perlu Koreksi** (Needs correction): files with **Perlu koreksi**.
   - **Semua Status** (All statuses): all files.

   If you hold none of the receive, resolve or report permissions, the tab opens at **Semua Status**. The choice **Status pengembalian** (Return status) next to the buttons contains **Semua status** and six file statuses, and filters by one status.
4. After the list loads, number badges appear on the tab and on the queue buttons. The number on **Antrean Penerimaan Gudang** counts files waiting for receipt plus files with differences. The number on **Antrean Deklarasi Teknisi** counts your own files waiting for a declaration or needing correction. The box **Cari pengembalian** (Search returns; hint `Cari SPK atau teknisi`) searches the request code, the technician name and the file number, not the work order (SPK) code. The circular arrow icon button (**Muat ulang antrean pengembalian**, Reload return queue) refreshes the list.
5. Read the file card: the request code (or `Pengembalian #<nomor>` if there is no request), the status badge, **Teknisi** (Technician), **Gudang Tujuan** (Destination warehouse), **SPK**, **Tanggal Deklarasi** (Declaration date), the list **Barang Dikembalikan** (Returned items) with the quantities **Baik** (Good) and **Selisih** (Difference) from the declaration, and **Alasan Penolakan** (Rejection reason) or **Catatan Penyelesaian** (Resolution notes) if present. The badges **Anda dapat menerima** (You can receive), **Anda dapat menyelesaikan** (You can resolve) and **Anda dapat mendeklarasikan** (You can declare) mark the actions you may do on that file. Without a badge, you can only read.
6. Click the button below the card: **Buka Permintaan & Terima Barang** (Open request and receive items), **Buka & Selesaikan Selisih** (Open and resolve difference), **Buka Permintaan & Buat Deklarasi** (Open request and create declaration), or **Buka Permintaan** (Open request). All of them open the detail page of the request, where the step is done. The button name follows the file status or your permissions, so a button can appear on a file you may not yet process. The button you can click appears on the detail page. A file without a related request shows the inactive button **Tidak terkait permintaan barang** (Not linked to an item request).
7. If there are no cards, the list shows `Belum ada berkas pengembalian material` (No material return files yet; files are created automatically when items are handed over) or `Tidak ada berkas pengembalian yang cocok` (No matching return files) with the button **Reset filter** (Reset filters).

## Return file statuses

| Status | Meaning | Effect on stock | Next step |
|---|---|---|---|
| **Menunggu deklarasi teknisi** | The items have been handed over, the technician has not yet reported. | None. | The technician reports in the technician app |
| **Menunggu penerimaan gudang** | The technician has reported, the warehouse has not yet checked the items. | None. The report does not change stock. | **Terima Pengembalian Fisik** (Receive physical return) or **Tolak Fisik Barang** (Reject physical items) |
| **Perlu koreksi** | The warehouse rejected the physical handover and wrote the reason. | None. | The technician reports again |
| **Selisih perlu penyelesaian** | The warehouse received the items, but some are damaged or there is a difference. | Good items are already in stock. Damaged items are not. | **Selesaikan Selisih** (Resolve difference) |
| **Diterima** (Received) | All items match and are received. | Good items are already in stock. | Final status |
| **Selisih diselesaikan** (Difference resolved) | The resolver closed the difference with a note. | No addition. | Final status |

## Declaring usage

The technician does this in the technician app. For each item, the quantity used, the good leftover and the difference must add up to the quantity handed over. If there is a difference, the declaration must state the type of the difference. After the report is submitted, the file status becomes **Menunggu penerimaan gudang**, holders of `inventory.return.receive` receive a notification in the bell, and stock does not change yet.

On the web, the button **Laporkan Pemakaian & Ajukan Pengembalian** (Report usage and submit return) appears only for the file owner who holds `inventory.return.declare`, for example an admin who created their own request. The button appears when the file status is **Menunggu deklarasi teknisi** or **Perlu koreksi**.

1. Open the detail page of the request from the button **Buka Permintaan & Buat Deklarasi**. The card **Pelaporan Pemakaian Aktual & Pengembalian Material** (Reporting of actual usage and material returns) appears only on requests with the status **Diserahkan**.
2. Click **Laporkan Pemakaian & Ajukan Pengembalian**.
3. In the dialog **Deklarasi Pemakaian Aktual & Sisa Barang** (Declaration of actual usage and leftover items), fill in per item:
   - **Dipakai Aktual** (Actual used): the quantity used in the field, at most equal to **Diserahkan** (this figure is written on the item name row).
   - **Sisa Dikembalikan** (Leftover returned): filled in automatically as Diserahkan minus Dipakai Aktual. Change it if needed.
4. Click **Kirim Laporan Deklarasi** (Send declaration report). The dialog closes and the card shows the new status. There is no separate success message.

The web dialog has no difference field, so **Dipakai Aktual** and **Sisa Dikembalikan** must add up to **Diserahkan**. A difference already saved from an earlier report is sent as it is.

## Receiving the physical return

Permission: `inventory.return.receive`. The file must have the status **Menunggu penerimaan gudang**.

1. Click **Buka Permintaan & Terima Barang** on the file card.
2. On the card **Pelaporan Pemakaian Aktual & Pengembalian Material**, check the table with the columns **Barang** (Item), **Diserahkan**, **Dipakai Riil** (Actual used), **Sisa Diharapkan** (Expected leftover), **Diterima Fisik** (Physically received) and **Rusak / Hilang** (Damaged / Lost). Each quantity is written with the unit symbol of the item, for example `12 m`. Match **Sisa Diharapkan** with the items the technician brought.
3. Click **Terima Pengembalian Fisik**.
4. In the dialog **Terima Pengembalian Fisik Material** (Receive physical material return), fill in per item. The item name row shows **Deklarasi Sisa** (Declared leftover).
   - **Baik**: the quantity of good items you receive, which adds to stock. Initially equal to the good quantity declared by the technician.
   - **Rusak** (Damaged), **Hilang** (Lost) and **Lainnya** (Other): initially filled from the difference declared by the technician, according to the difference code (damaged, lost or other). A difference without a code goes into **Lainnya**. The rest is 0.
   - Below the item name is written "Diserahkan {jumlah} · terpakai {jumlah}" (Handed over {quantity} · used {quantity}). Below the four fields, a status line shows "Jumlah cocok" (Quantity matches; green), "Kurang {x}" (Short {x}) or "Lebih {x}" (Over {x}) (red) according to the rule below.
5. Click **Konfirmasi Penerimaan Fisik** (Confirm physical receipt). This button waits until every item matches. If not, the dialog shows "Samakan jumlah setiap barang dengan yang diserahkan." (Make the quantity of each item equal to what was handed over.)

For each item, **Dipakai Riil** plus **Baik** plus **Rusak** plus **Hilang** plus **Lainnya** must equal **Diserahkan**. Record lost items under **Hilang**, not **Rusak**, so the difference is exact.

The **Baik** quantity adds to stock in the **Gudang Tujuan** at once and is recorded in Stock movements as **Pengembalian** ([section 6.7](/docs/guides/web/inventory/stock-movements/)). If **Rusak**, **Hilang** and **Lainnya** are zero for all items, the status becomes **Diterima**. If any item has a quantity in one of those three, the status becomes **Selisih perlu penyelesaian** and holders of `inventory.return.resolve` receive a notification in the bell.

## Rejecting the physical handover

The permission and conditions are the same as for receiving. Use this step if the items have not reached the warehouse desk or do not match the declaration.

1. Click **Tolak Fisik Barang** on the card **Pelaporan Pemakaian Aktual & Pengembalian Material**.
2. Fill in **Alasan Penolakan Fisik** (Physical rejection reason) in the dialog **Tolak Penyerahan Fisik Barang** (Reject physical item handover) (hint `Jelaskan mengapa penyerahan fisik ditolak`). Required, 3 to 1000 characters. The button **Tolak Penyerahan** (Reject handover) becomes active only after the reason has 3 characters.
3. Click **Tolak Penyerahan**.

The status becomes **Perlu koreksi**, the banner **Penyerahan Fisik Ditolak Gudang** (Physical handover rejected by the warehouse) shows the reason, and stock does not change. The technician receives a bell and push notification with the reason, then reports again. After the new report is submitted, the status returns to **Menunggu penerimaan gudang**.

## Resolving differences

Permission: `inventory.return.resolve`. The file must have the status **Selisih perlu penyelesaian**. In the built-in roles, staff receive and the manager resolves.

1. Click **Buka & Selesaikan Selisih** on the file card. On the detail page, the box **Selisih material perlu diselesaikan** (Material difference needs resolution) explains the situation.
2. Review the column **Rusak / Hilang** in the table.
3. Click **Selesaikan Selisih**.
4. Fill in **Catatan Penyelesaian** in the dialog **Selesaikan Selisih Material** (Resolve material difference) (hint `Jelaskan keputusan penyelesaian selisih`). Required, 3 to 1000 characters. The button **Konfirmasi Penyelesaian** (Confirm resolution) becomes active only after the note has 3 characters.
5. Click **Konfirmasi Penyelesaian**.

The status becomes **Selisih diselesaikan** and the note appears on the file, in the box **Selisih material sudah diselesaikan** (Material difference has been resolved). Stock does not change: damaged or lost items do not enter stock because they already left at handover.

## Relationship with work orders (SPK)

If the request uses the **Rujukan (opsional)** (Reference (optional)) **SPK**, the file is linked to that work order (SPK). The technician cannot submit the work order for review while there is a file that has not been reported, that is, with the status **Menunggu deklarasi teknisi** or **Perlu koreksi**. When the file becomes **Diterima** or **Selisih diselesaikan**, the usage quantity on the work order material is adjusted to the **Dipakai Aktual** quantity ([section 3.3](/docs/guides/web/operations/work-orders/)).

## Common errors

- The tab **Pengembalian material** appears, but the list shows a red error box with the button **Coba lagi** (Try again). Your role holds the report, receive or resolve permission without `inventory.return.view.all` or `inventory.return.view.own`. Ask the company admin to add the view permission to the role in the Roles menu ([section 8.6](/docs/guides/web/administration/roles/)).
- The buttons **Terima Pengembalian Fisik** and **Tolak Fisik Barang** do not appear. The file status is not **Menunggu penerimaan gudang**, you do not hold `inventory.return.receive`, or you are the file owner yourself. Ask another user to receive it. If the page has been open for a long time, the server still refuses with a message such as `Maker-checker: teknisi pemilik barang tidak boleh menerima fisiknya sendiri di gudang.`
- The button **Selesaikan Selisih** does not appear. The file status is not **Selisih perlu penyelesaian**, you do not hold `inventory.return.resolve`, you are the file owner, or you are the one who received the items. Ask another user, for example a manager. The server refuses with `Teknisi tidak berhak menyelesaikan selisih barangnya sendiri.` or `Penerima fisik gudang tidak boleh menyelesaikan selisih yang ia terima sendiri.`
- The message `Jumlah tidak cocok untuk {nama barang}: diserahkan (...) harus sama dengan ...` appears in the red box of the dialog if the figures of one item do not match the **Diserahkan** quantity. Change the figures in the dialog until the total equals **Diserahkan**. Other rejection messages on the file also name the item, not the row code.
- The warehouse cannot receive a file that is still **Menunggu deklarasi teknisi**: the server answers `Kasus pengembalian harus berstatus menunggu penerimaan gudang untuk diterima.` Ask the technician to report in the technician app first.
- The rejection reason or resolution note has fewer than 3 characters: the dialog shows `Harap isi alasan penolakan minimal 3 karakter.` or `Catatan penyelesaian minimal 3 karakter.`
- The technician fails to submit the work order with the message `Seluruh sisa material dari permintaan barang harus dideklarasikan terlebih dahulu sebelum SPK diajukan.` Ask the technician to report in the technician app.
- The work order fails to be approved with the message `SPK belum bisa disetujui sampai seluruh retur material berstatus direkonsiliasi atau diselesaikan.` Complete the receipt or the differences of all files of that work order (status **Diterima** or **Selisih diselesaikan**), then approve again.
