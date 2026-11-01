---
title: "6.1 Item requests (Permintaan Barang)"
description: "Create, approve, reject, prepare and hand over item requests so field work gets the right material from the warehouse, with stock tracked at each step."
---

**Permintaan Barang** (Item requests) manages how material is taken from the warehouse for field work: submission, approval, preparation and handover of the items. Open this menu to request items, decide on a request, or process items in the warehouse.

Roles that can use it: admin (all steps), manager (view all, approve, reject, cancel) and staff (view all, prepare, hand over). Permissions: `inventory.request.view.own`, `inventory.request.view.all`, `inventory.request.create`, `inventory.request.cancel.own`, `inventory.request.approve`, `inventory.request.reject`, `inventory.request.prepare`, `inventory.request.issue`. Custom roles can be given these permissions in [section 8.6](/docs/guides/web/administration/roles/) (**Peran**, Roles).

The menu appears in the sidebar for holders of `inventory.request.view.own` or `inventory.request.view.all`. Holders of `view.own` see only the requests they created, while holders of `view.all` see all requests in the active company ([section 1.6](/docs/guides/web/introduction/switch-company/)). In the built-in roles only the admin holds `inventory.request.create`, so only the admin sees the **Buat Permintaan Barang** (Create item request) button on the web.

Technicians create requests in the technician app, and such a request gets the status **Menunggu persetujuan** (Awaiting approval) at once, without a draft stage.

Separation of duties applies to all users, including the admin. A requester must not approve, reject or hand over their own request, and an approver must not prepare or hand over items they approved. The buttons for forbidden steps are not shown. A role without `roles.manage` also must not hold the approve or reject permission together with the prepare, hand over, receive, issue or move stock permission. If you save a role with such a pair of permissions ([section 8.6](/docs/guides/web/administration/roles/)), the system refuses with a message such as `Pemisahan tugas (persetujuan permintaan barang vs pelaksanaan gudang): inventory.request.approve tidak boleh digabung dengan inventory.request.prepare.`

## Opening and reading the list

1. In the sidebar, open the group **Inventaris** (Inventory), then click **Permintaan Barang**.
2. Look at the tabs above the list:
   - **Permintaan Saya** (My requests): requests you created. The number badge counts your requests that are still **Draf** (Draft) or already **Siap diambil** (Ready for pickup).
   - **Persiapan & Antrean Gudang** (Preparation and warehouse queue): requests with the status **Menunggu persetujuan**, **Disetujui** (Approved), **Disiapkan** (Prepared) or **Siap diambil**. This tab appears for holders of the approve, prepare or hand over permission. Its number badge counts only the requests you can process now: those waiting for your decision, those ready to prepare, or those ready to hand over. Requests waiting for someone else, or requests you must not process because of separation of duties, are not counted, so the badge can be smaller than the number of rows in the tab.
   - **Semua Permintaan** (All requests): all company requests in all statuses. This tab appears for holders of `inventory.request.view.all`.
   - **Pengembalian material** (Material returns): material return files, described in [section 6.8](/docs/guides/web/inventory/material-returns/).

   ![Item requests list with tabs, the search request box, the request status and required date filters, and the request table](~/assets/guide/web/inventory-requests.webp)

3. Click the tab you need, even if it already looks active. When the page is newly opened, the list is not yet filtered by tab: holders of `inventory.request.view.all` see all requests until they click a tab. The card **Antrean permintaan gudang** (Warehouse request queue) on the Dashboard ([section 2.1](/docs/guides/web/dashboard/queue-cards/)) opens the tab **Persiapan & Antrean Gudang** with the filter already active.
4. Read the columns: **No. Permintaan** (Request no.; request code and age, click to open; the code is written on one line), **Status**, **Pemohon** (Requester; name and email), **Lokasi Gudang** (Warehouse location), **Barang & Jumlah** (Items and quantity; the first item with its quantity, then the number of other items), **Tanggal Dibutuhkan** (Required date), **Rujukan** (Reference; type and code of the job, for example `SPK SPK-2026-00012`; it becomes a link to that work order (SPK) or ticket if your account may open it, otherwise plain text), **Aksi Berikutnya** (Next action; the step that is waiting) and **Aksi** (Actions; the **Detail** button). The column **Lokasi Gudang** shows a hyphen if the request has no location.
5. Search and filter:
   - Fill in **Cari permintaan** (Search requests) to search for a request code, a reason, or a requester name.
   - Choose **Status permintaan** (Request status). The choices are **Semua status** (All statuses) and all status names in the table below, the same as the badges in the list.
   - Fill in **Tanggal Dibutuhkan** as a range: type the dates in the company date format, or click **Buka kalender** (Open calendar) and pick the start date and end date. Click **Hapus rentang tanggal** (Clear date range) to empty it.
   - The button **Reset filter** (Reset filters) appears when a search, status or date range is active. If no row matches, the list shows **Tidak ada permintaan yang cocok** (No matching requests) and also offers **Reset filter**. If there are no requests at all, the list shows **Belum ada permintaan barang** (No item requests yet) with the remark **Permintaan muncul di sini setelah dibuat, sesuai tab dan filter yang dipilih.** (Requests appear here after they are created, according to the selected tab and filters.)
6. Below the table, choose **Baris per halaman** (Rows per page) and move between pages with **Sebelumnya** (Previous) and **Berikutnya** (Next).

## Request statuses

The badges in the list, in the filter and on the detail page use the following names.

| Status | Meaning and effect on stock | Next button on the detail page | Who does it (built-in roles) |
|---|---|---|---|
| **Draf** | Saved, not yet submitted. Stock does not change. | **Ajukan ke Gudang** (Submit to warehouse) | Requester |
| **Menunggu persetujuan** | Waiting for the approver's decision. Stock does not change. | **Setujui & Reservasi Stok** (Approve and reserve stock) or **Tolak Permintaan** (Reject request) | Manager or admin, not the requester |
| **Disetujui** | Stock is reserved in the source warehouse. | **Siapkan barang** (Prepare items) | Staff or admin, not the approver |
| **Disiapkan** | Old status. Only requests that were already here before preparation became a single step. The reservation stays. | **Siapkan barang** | Staff or admin |
| **Siap diambil** | Items are ready at the handover desk. The reservation stays. | **Serah terima** (Handover) | Staff or admin, not the requester and not the approver |
| **Diserahkan** (Handed over) | The reservation is released and physical stock decreases. | A return file is created ([section 6.8](/docs/guides/web/inventory/material-returns/)) | Technician and warehouse |
| **Ditolak** (Rejected) | Rejected with a reason. Stock does not change. | Final status | None |
| **Dibatalkan** (Cancelled) | Cancelled before approval. Stock does not change. | Final status | None |

The column **Aksi Berikutnya** in the list shows the waiting step: **Ajukan Permintaan** (Submit request; draft), **Setujui permintaan** (Approve request; awaiting approval, for those who may decide) or **Menunggu persetujuan Manajer/Admin** (Awaiting Manager/Admin approval; awaiting approval, for other users), **Siapkan barang** (approved or prepared), **Serah terima** (ready for pickup), **Selesai (Deklarasi Pemakaian / Pengembalian)** (Completed (Usage declaration / Return); handed over), and **Tidak Ada** (None; rejected or cancelled).

The stock that is reserved or reduced is the stock in the **Gudang Tujuan** (Destination warehouse) location. In the Stock menu ([section 6.5](/docs/guides/web/inventory/stock/)), approval increases the column **Dicadangkan** (Reserved) and decreases **Tersedia** (Available), while handover decreases **Jumlah** (Quantity). Stock movements ([section 6.7](/docs/guides/web/inventory/stock-movements/)) record rows of the types **Dicadangkan**, **Cadangan dilepas** (Reservation released) and **Keluar** (Out).

## Reading the detail page

Click the request code or the **Detail** button to open the detail page. The page contains:

- The title **Permintaan Barang** with the request code (one line), a remark on who submitted it and when, the **Kembali** (Back) button, and the buttons for the steps you may do at the current status.
- At the status **Menunggu persetujuan**, users who may not decide see the box **Menunggu persetujuan Manajer/Admin** under the title, instead of buttons.
- The banner **Permintaan Barang Ditolak** (Item request rejected; with **Alasan Penolakan**, Rejection reason) or **Permintaan Dibatalkan** (Request cancelled; with **Alasan Pembatalan**, Cancellation reason).
- The card **Alur & Jejak Status Permintaan** (Request flow and status trail). A request that runs normally shows six steps: **Draf**, **Diajukan** (Submitted), **Disetujui & Direservasi** (Approved and reserved), **Disiapkan**, **Siap diambil** and **Diserahkan**. A step that has been passed shows the name of the person who did it and the date. A rejected or cancelled request stops at the step **Ditolak** or **Dibatalkan**, with the name of the decision maker and the date, and steps that were never reached are not shown.
- The card **Daftar Barang yang Diminta** (List of requested items) with the columns **Barang** (Item), **Jumlah Diminta** (Quantity requested), **Jumlah Disetujui** (Quantity approved), **Jumlah Diserahkan** (Quantity handed over) and **Catatan** (Notes). While the status is **Disetujui**, **Disiapkan** or **Siap diambil**, there is a column **Ambil dari** (Pick from) next to **Barang** that shows the location where each item is picked, as a collection list for the warehouse.
- The card **Detail Permohonan** (Request details) with **Status**, **Gudang Penyedia** (Supplying warehouse), **Tanggal Dibutuhkan**, **Rujukan** (for example `SPK SPK-2026-00012`, with the same link rules as in the list), **Alasan Permintaan** (Request reason) and **Catatan Persetujuan** (Approval notes) if present.
- The card **Pelaporan Pemakaian Aktual & Pengembalian Material** (Reporting of actual usage and material returns), only after the status **Diserahkan** ([section 6.8](/docs/guides/web/inventory/material-returns/)).

![Item request detail page with the status Draf, showing the cards Request flow and status trail, List of requested items, and Request details](~/assets/guide/web/inventory-requests-show.webp)

Every status change is also recorded in the Audit log ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)) with the module `inventory_request`.

## Creating an item request

Permission: `inventory.request.create`. The system assigns a request number automatically, in the form `REQ-2026-00001`: prefix, year, then a five-digit sequence number that starts again from 1 every year. This form can be changed in the Numbering menu ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)).

1. Click **Buat Permintaan Barang** at the top right of the list page.

   ![Create item request form with the cards Submission information and List of requested items](~/assets/guide/web/inventory-requests-create.webp)

2. In the card **Informasi Pengajuan** (Submission information), fill in:
   - **Gudang Tujuan** (Destination warehouse): type to search, then choose the location that holds the items, shown as code and name (example: `AREA-01 - Default Area`). The list contains all active company locations, and the first location is already selected. Stock is reserved and reduced from this location, so do not leave it empty.
   - **Tanggal Dibutuhkan**: optional. Type the date in the company date format, or click **Buka kalender** and pick the date.
   - **Rujukan (opsional)** (Reference (optional)): choose **SPK** or **Tiket** (Ticket) to link the request to a job. Leave **Tanpa rujukan** (No reference) if there is none. Changing this choice empties the job selection below it.
   - **SPK** or **Tiket**: appears after you choose a reference, and is required. Type at least 2 letters of the job code or title, then choose. Results show the code and title with the customer name below, at most 20 results. You are offered only jobs you may open: without the permission to view work orders or view tickets the list is empty, and a technician or handler without the assign permission sees only the jobs assigned to them.
   - **Alasan Kebutuhan Barang** (Reason for needing the items): required, at most 2000 characters. Example: Kebutuhan penarikan kabel dropcore pelanggan baru di Perum Grihi Asri.
3. In the card **Daftar Barang yang Diminta**, fill in the first row:
   - **Barang 1** (Item 1): type at least 2 letters of the name or SKU, then choose the item. Each choice shows the SKU, the name, and the unit in brackets, with the category name below. The list contains active items other than serial assets.
   - **Jumlah** (Quantity): required, must be greater than 0, the initial value is `1`.
   - **Catatan**: optional, at most 255 characters.
4. Click **Tambah Barang** (Add item) to add a row (**Barang 2**, and so on). An item may appear only once. Click the bin icon (**Hapus barang 1** (Delete item 1), **Hapus barang 2**, and so on) to delete a row; the last row cannot be deleted.
5. Click **Simpan sebagai Draf** (Save as draft) to save without submitting, or **Ajukan ke Antrean Gudang** (Submit to warehouse queue) to save and submit at once.

The detail page of the new request opens with the message `Permintaan barang berhasil dibuat.` Its status is **Draf** or **Menunggu persetujuan**. With the second choice, holders of `inventory.request.approve` receive a notification in the bell. Email is available only through the daily summary that you switch on yourself in the Profile.

## Submitting a draft to the warehouse

Only the creator of the request, with the permission `inventory.request.create`, can submit a draft.

1. Open the detail page of a request with the status **Draf**.
2. Click **Ajukan ke Gudang**.
3. Click **Ya, Ajukan** (Yes, submit) in the dialog **Ajukan Permintaan ke Antrean Gudang?** (Submit the request to the warehouse queue?), or **Batal** (Cancel) if you change your mind.

The message `Permintaan barang berhasil diajukan ke antrean gudang.` appears and the status becomes **Menunggu persetujuan**.

## Approving a request

Permission: `inventory.request.approve`. The request must have the status **Menunggu persetujuan**, and you must not be the requester. Submissions waiting for you also appear in the Approvals menu ([section 3.2](/docs/guides/web/operations/approvals/)), but there the approved quantity is always equal to the requested quantity.

1. Open the detail page of the request.
2. Click **Setujui & Reservasi Stok**.
3. In the dialog **Setujui Permintaan & Reservasi Stok** (Approve request and reserve stock), fill in:
   - **Jumlah yang disetujui** (Approved quantity): one field per item, initially equal to **Jumlah Diminta**. Below the item name is written "Tersedia: {jumlah} {satuan}" (Available: {quantity} {unit}), which is the stock in the warehouse that the system will check (quantity minus reserved). Change it if the warehouse can fulfil only part of it. The quantity must be greater than 0 and must not exceed the requested quantity. A quantity above the available stock is marked red with the text "Melebihi stok tersedia" (Exceeds available stock). While such a quantity exists, the button **Setujui & Reservasi** (Approve and reserve) is inactive and the dialog shows "Kurangi jumlah yang melebihi stok." (Reduce the quantities that exceed stock.)
   - **Catatan Persetujuan (opsional)** (Approval notes (optional)): at most 1000 characters. The notes appear in the card **Detail Permohonan**.
4. Click **Setujui & Reservasi**, or **Batal**.

The system checks the available stock (**Jumlah** minus **Dicadangkan**) in the Destination warehouse for every item. If all are sufficient, the stock is reserved, the status becomes **Disetujui**, the column **Jumlah Disetujui** is filled, the requester receives a bell and push notification, and the message `Permintaan barang disetujui dan stok berhasil direservasi.` appears. If one item is short, no stock is reserved, the dialog stays open and shows an error message that names the item, the warehouse, the available quantity and the required quantity.

The approval dialog has no warehouse choice yet. A request saved without a **Gudang Tujuan** therefore cannot be approved from the web (see Common errors).

## Rejecting a request

Permission: `inventory.request.reject`. The conditions are the same as for approval.

1. Open the detail page of the request.
2. Click **Tolak Permintaan**.
3. Fill in **Alasan Penolakan** in the dialog **Tolak Permintaan Barang** (Reject item request). Required, 3 to 1000 characters. The button **Tolak Permintaan** in the dialog becomes active only after the reason has at least 3 characters.
4. Click **Tolak Permintaan** in the dialog, or **Batal**.

The status becomes **Ditolak**, the banner **Permintaan Barang Ditolak** shows the reason, the requester receives a bell and push notification, and the message `Permintaan barang telah ditolak.` appears. Stock does not change, and a rejection cannot be undone.

## Preparing and handing over items

Permission: `inventory.request.prepare` for step 1, `inventory.request.issue` for step 2. These warehouse steps are done on the detail page of the request.

1. At the status **Disetujui**, click **Siapkan barang**. There is no confirmation dialog. Use the column **Ambil dari** in the card **Daftar Barang yang Diminta** to collect the items. The message `Barang disiapkan dan siap diambil.` appears, the status becomes **Siap diambil** at once, and the requester receives a bell and push notification. The status flow records the steps **Disiapkan** and **Siap diambil** with the person who did them and the date. A request left at the status **Disiapkan** is completed with the same button.
2. When the requester receives the physical items, click **Serah terima**, then click **Konfirmasi serah terima** (Confirm handover) in the dialog **Konfirmasi serah terima barang?** (Confirm item handover?). The status becomes **Diserahkan** and the message `Barang berhasil diserahterimakan dan stok berkurang.` appears.

If the server refuses **Siapkan barang**, the reason is shown in a red box below the page title, because there is no dialog to hold it.

Handover is permanent. The reservation is released, physical stock decreases by the approved quantity, the column **Jumlah Diserahkan** is filled, and the system opens a return file for the requester ([section 6.8](/docs/guides/web/inventory/material-returns/)). Stock is reduced once, at handover: approval of the related work order does not reduce again the quantity already handed over through this request.

## Cancelling a request

A request can be cancelled only while it is **Draf** or **Menunggu persetujuan**. The permission `inventory.request.cancel.own` limits cancellation to your own requests, while without that permission the holder of `inventory.request.approve` can cancel anyone's request. In the built-in roles, the admin can cancel only their own requests, and the manager can cancel anyone's.

1. Open the detail page of the request.
2. Click **Batalkan Permintaan** (Cancel request).
3. If needed, fill in **Alasan Pembatalan (opsional)** (Cancellation reason (optional)) in the dialog **Batalkan Permintaan Barang?** (Cancel item request?), at most 1000 characters.
4. Click **Batalkan Permintaan** in the dialog, or click **Tutup** (Close) if you do not want to cancel.

The message `Permintaan barang berhasil dibatalkan.` appears. The status becomes **Dibatalkan**, the banner **Permintaan Dibatalkan** shows the reason (or `Dibatalkan oleh pemohon.` if the reason is empty), and stock does not change because there is no reservation yet.

## Common errors

- The button **Setujui & Reservasi Stok**, **Tolak Permintaan**, **Siapkan barang** or **Serah terima** does not appear. Check the request status, the permissions of your role, and whether you are the requester or approver of that request. If so, ask another authorised user to continue. At the status **Menunggu persetujuan**, the box **Menunggu persetujuan Manajer/Admin** shows that you may not decide on that request.
- The approval dialog shows `Permintaan barang tidak dapat disetujui karena status telah berubah atau Anda tidak berwenang.` (or `... tidak dapat ditolak ...` in the rejection dialog): another user decided first, or your permissions changed. Close the dialog and reload the page.
- The approval dialog shows `Stok {nama barang} di {nama gudang} tidak cukup: tersedia {tersedia} {satuan}, diminta {diminta} {satuan}.` Reduce the quantity in the dialog or add stock first ([section 6.5](/docs/guides/web/inventory/stock/)), then approve again. If it cannot be fulfilled, reject the request with a reason.
- The approval dialog refuses a quantity of 0 with the message `jumlah disetujui harus lebih besar dari 0.`, and refuses a quantity above the request with the message `Jumlah barang yang disetujui (<jumlah>) tidak boleh melampaui jumlah yang diminta (<jumlah>).` Every item must be approved for more than 0, so an item cannot be struck out partially. If part cannot be fulfilled, reject the request and ask the requester to create it again.
- The message `Lokasi gudang sumber wajib ditentukan untuk reservasi.` appears in the approval dialog if **Gudang Tujuan** was left empty when the request was created. The approval dialog has no location choice, so reject that request and create it again with a location selected.
- A draft cannot be edited after it is saved. Cancel the wrong draft and create a new request.
- A request that is already approved cannot be cancelled from this screen, because the button **Batalkan Permintaan** exists only at the statuses **Draf** and **Menunggu persetujuan**.
- A red box **Terdapat kesalahan pengisian formulir:** (There are form errors:) appears above the create form and lists each wrong field. Common causes: `alasan wajib diisi.`, `jumlah diminta harus lebih besar dari 0.`, `barang memiliki nilai ganda.` (the same item was chosen twice), and `Tanggal dibutuhkan harus berupa tanggal yang valid.` Correct the field, then save again.
- The message `rujukan wajib diisi jika jenis rujukan terisi.` appears under the field **SPK** or **Tiket** if you chose a reference type but did not choose the job. Choose the job, or change **Rujukan (opsional)** to **Tanpa rujukan**.
- The message `SPK yang dipilih tidak valid untuk perusahaan ini.` or `Tiket yang dipilih tidak valid untuk perusahaan ini.` means the server refused the chosen job: the job does not belong to the active company, or your account may not open it (without the permission to view work orders or view tickets, or the job is assigned to someone else and you are a technician or a handler without the assign permission). Choose again from the list.
- The field **SPK** or **Tiket** does not show the job you are looking for: your account does not hold the permission to view work orders or view tickets, or the job is not assigned to you (technicians and handlers without the assign permission see only their own jobs). Type at least 2 letters of the code or title.
