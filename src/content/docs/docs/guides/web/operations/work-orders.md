---
title: "3.3 Work orders (SPK)"
description: "Create work orders for field technicians, assign them, check materials and evidence, then approve, reject or cancel the result."
---

A work order (SPK, Surat Perintah Kerja) is a field job order for a technician. The types are **Instalasi** (Installation, a new setup), **Perawatan** (Maintenance, a repair), **Peningkatan layanan** (Service upgrade, a package upgrade), and **Pindah lokasi** (Relocation). Open this menu to create a work order, assign a technician, check materials and work evidence, and approve the result.

Technicians work on work orders in the technician app: they set off (**Saya berangkat** (I'm on my way)), start, record materials, upload photos, and submit the result. The work order page on the web has the buttons **Mulai** (Start) and **Ajukan review** (Submit for review), but the server accepts them only from the technician assigned to that work order. **Saya berangkat** exists only in the app. The web shows it as the **Dalam perjalanan** (On the way) step in the **Tahap kunjungan** (Visit stages) card (section below) and as a badge in Penugasan (Dispatch) ([section 3.1](/docs/guides/web/operations/dispatch/)).

Roles that can use it: admin, manager, staff. The permission `spk.view` opens the menu and the list, `spk.create` creates work orders, `spk.export` exports the list. With the built-in roles:

- Admin holds all SPK permissions.
- Manager holds `spk.view`, `spk.create`, `spk.update`, `spk.assign`, `spk.reassign`, `spk.approve`, `spk.reject`, `spk.cancel`, `spk.export`, and `spk.manage`.
- Staff hold `spk.view`, `spk.create`, `spk.start`, and `spk.submit`.

A user who holds `spk.start` or `spk.submit` but not `spk.assign` (the built-in staff) sees only the work orders assigned to them.

## Opening and reading the list

1. In the sidebar, open the **Operasional** (Operations) group, then click **SPK**.
2. Read the work order list.

   - The **Cari** (Search) box searches work order numbers and titles (the field reads "Nomor atau judul..." (Number or title...)).
    - The **Jenis** (Type) list holds **Semua jenis** (All types), **Instalasi**, **Perawatan**, **Peningkatan layanan**, and **Pindah lokasi**. The **Status** list holds **Semua status** (All statuses), the eight work order statuses (**Draf** (Draft), **Menunggu penugasan** (Awaiting assignment), **Ditugaskan** (Assigned), **Dikerjakan** (In progress), **Menunggu review** (Awaiting review), **Selesai** (Completed), **Dikembalikan** (Returned), and **Dibatalkan** (Cancelled)), **Dihapus** (Deleted), and **Semua, termasuk dihapus** (All, including deleted).
   - Columns: **Nomor** (Number) (link to the details), **Judul** (Title), **Jenis**, **Status** (badge), **Pelanggan** (Customer), **Jadwal** (Schedule), **Dibuat** (Created). All columns except **Pelanggan** can be sorted, and the default order puts the newest work orders on top.
   - The **Ekspor** (Export) button (holders of `spk.export`) opens a menu with **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF). The file holds the columns Kode (Code), Judul, Tipe (Type), Status, Prioritas (Priority), Pelanggan, and Teknisi (Technician) according to the search and active filters. The columns Tipe, Status, and Prioritas hold stored values (for example `maintenance`), not the badge labels.
   - The **Buat SPK** (Create work order) button (holders of `spk.create`) opens the create form.
   - Without data, the table shows "Belum ada SPK" (No work orders yet). When a filter is active, the table shows "Tidak ada SPK yang cocok" (No matching work orders) with a **Reset filter** (Reset filters) button.

   ![The work order list with the Type and Status filters, the Export button, and the Create work order button](~/assets/guide/web/spk-index.webp)

3. Click the work order number to open the details. Rows do not have an **Ubah** (Edit), **Lihat detail** (View details), or **Hapus** (Delete) button, except the row of a deleted work order: its menu holds **Pulihkan** (Restore) (permission `spk.delete`), its number is plain text, and the work order returns with its previous status (toast "SPK dipulihkan." (Work order restored.)).

## Work order statuses

A work order from **Buat SPK** has the status **Draf** and a manual source. A work order from a new customer registration ([section 4.1](/docs/guides/web/customers-and-services/customers/)) and from a ticket ([section 3.4](/docs/guides/web/operations/tickets/)) gets the status **Menunggu penugasan** at once. When the registration uses the **Tugaskan sekarang** (Assign now) block, its work order is **Ditugaskan** at once ([section 4.1](/docs/guides/web/customers-and-services/customers/)).

| Status | Meaning | Next step | Who |
|---|---|---|---|
| **Draf** | New work order, not ready yet | **Ubah**, **Terbitkan** (Publish), or **Tugaskan** (Assign) directly | **Ubah** and **Terbitkan**: `spk.update`. **Tugaskan**: `spk.assign` |
| **Menunggu penugasan** | Ready to be assigned | **Ubah** or **Tugaskan** | **Ubah**: `spk.update`. **Tugaskan**: `spk.assign` |
| **Ditugaskan** | A technician is assigned. After the technician presses **Saya berangkat** in the app, the status stays **Ditugaskan** and the **Tahap kunjungan** card shows **Dalam perjalanan** | **Mulai** | The assigned technician |
| **Dikerjakan** | The technician is working on site | **Ajukan review** | The assigned technician |
| **Menunggu review** | The result awaits review | **Setujui** (Approve) or **Tolak** (Reject) | `spk.approve` or `spk.reject`, not the creator and not the technician of the work order |
| **Dikembalikan** | Rejected by the reviewer through **Tolak**, the reason appears in **Alasan penolakan** (Rejection reason) | **Tugaskan** again for rework | `spk.reassign` |
| **Selesai** | Approved, final | None | None |
| **Dibatalkan** | Cancelled, final | None | None |

**Terbitkan** only marks the work order as ready, so it may be skipped. **Batalkan** (Cancel) (permission `spk.cancel`) is available in all statuses except **Selesai** and **Dibatalkan**. The assigned technician means the user assigned to that work order, with an active employee status, who holds `spk.start` or `spk.submit`.

**Dikembalikan** is the on-screen name for a work order that the reviewer rejected through **Tolak**: the work order goes back to the office to be assigned again. The notification and toast for that event still read "SPK ditolak." (Work order rejected.), and the Status column in the export file holds the stored code.

A work order from a new customer registration has the type **Instalasi** and the title "Pemasangan &lt;kode langganan&gt; - &lt;nama pelanggan&gt;" (Installation &lt;subscription code&gt; - &lt;customer name&gt;). A work order from a ticket has the type **Perawatan** and the title "SPK dari tiket TKT-..." (Work order from ticket TKT-...) (the ticket code).

## Creating a work order

1. In the work order list, click **Buat SPK**.

   ![The Create work order form with the Data pekerjaan card](~/assets/guide/web/spk-create.webp)

2. Fill in the **Data pekerjaan** (Job data) card:
   - **Jenis**: required. Choose **Instalasi** (the default), **Perawatan**, **Peningkatan layanan**, or **Pindah lokasi**.
   - **Judul**: required, 255 characters at most. Example: `E2E Dispatch SPK`.
   - **Pelanggan**: required for **Instalasi**, **Peningkatan layanan**, and **Pindah lokasi**, optional for **Perawatan**. Type the customer name or code (at least 2 letters), then choose from the search results. Before you type, the list shows "Ketik minimal 2 huruf untuk mencari." (Type at least 2 letters to search.) The list holds active customers, 20 results at most.
   - **Langganan** (Subscription): the same required rules as **Pelanggan**. Type the subscription code (at least 2 letters), then choose. The list holds subscriptions that are **Menunggu** (Pending) and **Aktif** (Active), each choice shows the subscription code with the customer name below it. After you choose a customer, the list holds only the subscriptions of that customer, and the previous subscription choice is cleared. Choose the customer first.
   - **Lokasi** (Location): optional, holds active locations (code and name). Type the code or name (at least 2 letters), then choose. Fill it in when the work order uses items from stock or installs assets, because stock and assets follow this location.
   - **Prioritas**: **Rendah** (Low), **Sedang** (Medium) (the default), **Tinggi** (High), or **Mendesak** (Urgent).
   - **Tanggal jadwal** (Schedule date): optional, the visit date. When empty it reads "Pilih tanggal" (Select date). Type a date in the company date format, or click the **Buka kalender** (Open calendar) button and choose a date (the **Hari ini** (Today) button selects today, **Hapus tanggal** (Clear date) empties the field).
   - **Deskripsi** (Description): optional.
   - In the three search fields, the text you type does not choose anything yet. The choice changes only when you choose another result or click the **Hapus pilihan** (Clear selection) button.
3. Click **Simpan** (Save). The work order list opens with the toast "SPK berhasil dibuat." (Work order created successfully.) The new work order has the status **Draf** and an automatic number (numbering rules in [section 7.13](/docs/guides/web/finance-and-reports/numbering/)). **Batal** (Cancel) returns to the list without saving.

## Editing a work order

Permission: `spk.update` (admin, manager). A work order can be edited only while its status is **Draf** or **Menunggu penugasan**. After it is assigned, the edit page cannot be opened: the schedule can be changed through **Ganti teknisi** (Change technician) by filling in **Tanggal kunjungan** (Visit date) (section "Assigning a technician" below), and other fields can only be corrected by cancelling the work order and creating a new one.

1. Open the details of a work order with the status **Draf** or **Menunggu penugasan**, then click **Ubah** next to **Kembali** (Back).

   ![The Edit work order page with the Data pekerjaan card: Title, Customer, Subscription, Location, Priority, Visit date, and Description](~/assets/guide/web/spk-edit.webp)

2. Change the fields in the **Data pekerjaan** card. Under the card title are the type and status of the work order, which cannot be changed here. **Judul** is required. **Pelanggan** and **Langganan** are required for the types **Instalasi**, **Peningkatan layanan**, and **Pindah lokasi**, and are searched as in **Buat SPK**: changing **Pelanggan** empties **Langganan**, so choose the subscription again. **Lokasi**, **Prioritas**, and **Deskripsi** work as in **Buat SPK**. **Tanggal kunjungan** is optional.
3. Click **Simpan**. The work order list opens with the toast "SPK berhasil diubah." (Work order changed successfully.) Click **Batal** to return to the details without saving.

**Tanggal kunjungan** must not be before today in the company time zone: the message is "Tanggal kunjungan tidak boleh sebelum hari ini." (The visit date must not be before today.) A date already saved on the work order may stay, even if it has passed. When someone else has changed the work order since you opened the page, the banner "Data diubah pengguna lain; muat ulang." (Data was changed by another user; reload.) appears ([section 1.5](/docs/guides/web/introduction/know-the-screen/), **Pesan benturan** (Conflict message)). When the work order status has already changed, Inbils returns to the work order details with the toast "SPK hanya bisa diubah saat berstatus draf atau menunggu penugasan." (A work order can be edited only when it is draft or awaiting assignment.)

## Opening the work order details

1. In the list, click the work order number in the **Nomor** column.

   ![The work order details with the Edit button at the top right and the Details, Actions, Items, and Evidence cards](~/assets/guide/web/spk-show.webp)

2. Read the page from top to bottom:
   - The page heading holds the work order title, with the work order number below it. The **Kembali** button returns to the list. The **Ubah** button next to it appears for holders of `spk.update` while the work order has the status **Draf** or **Menunggu penugasan** (section "Editing a work order").
   - The **Rincian** (Details) card holds **Status** and **Jenis** (badges), **Prioritas** (badge), **Pelanggan**, **Langganan**, **Lokasi**, **Teknisi**, **Jadwal**, **Dimulai** (Started), **Check-in**, and **Selesai**. **Deskripsi**, **Hasil** (Result), and **Alasan penolakan** appear when filled in. On a **Selesai** work order, the **Teknisi** and **Lokasi** rows show the values at the time the work order was approved (see "What happens when a work order is approved").
   - The **Lokasi** row shows the POP or warehouse of the work order, not the customer address. The **Check-in** row shows the distance to the customer's installation address (to the **Lokasi** when the work order has no subscription) when the technician app recorded the location at start, for example "820 m dari lokasi (akurasi ±12 m)" (820 m from the location (accuracy ±12 m)). A distance of 1 km or more is written in km, for example "119,3 km". When the technician started farther away than the company distance limit, the reason is added: "Jauh dari lokasi: {alasan}" (Far from the location: {reason}) (section "Check-in distance at start" below). When the location is not available, the row states the reason. Without a record, it reads "Belum ada check-in" (No check-in yet). The **Port drop** (Drop port) row (the ODP and the port number reserved for the customer, [section 5.5](/docs/guides/web/network/odn/)) appears on **Instalasi** work orders that have a subscription, for holders of `odn.view`.
   - The **Tindakan** (Actions) card holds the next-step buttons according to the status. In the image, the work order has the status **Menunggu penugasan**, so only **Tugaskan** and **Batalkan** appear.
   - The **Tahap kunjungan** card below **Tindakan** shows the four visit steps with their times (section **Tahap kunjungan** below).
   - The **Item** (Items) card (columns **Barang** (Items), **Aset jaringan** (Network assets), **Satuan** (Units), **Terpakai** (Used), **Catatan** (Notes)), **Bukti** (Evidence), and **Riwayat penugasan** (Assignment history) (columns **Teknisi**, **Ditugaskan**, **Dicabut** (Revoked)).

The **Setujui** and **Tolak** buttons appear only for holders of `spk.approve` and `spk.reject`. The other buttons appear according to the status only, and the server checks the permission when the button is pressed.

## Visit stages

The **Tahap kunjungan** card in the right column of the work order page shows the progress of the visit in four steps, from top to bottom: **Ditugaskan**, **Dalam perjalanan**, **Sedang dikerjakan** (Being worked on), and **Selesai dipasang** (Installation completed). A technician who presses **Saya berangkat** in the app fills in the second step. This card is read-only and has no buttons.

- A step that has been passed uses a tick icon and writes its time in the company date format. The step in progress uses a dotted icon and writes "Tahap sekarang," (Current stage,) followed by its time. A step not yet reached uses an empty circle and writes "Belum dicapai" (Not reached yet). The icon and the text carry the meaning, not colour alone.
- A step that has been passed without a time writes "waktu tidak tercatat" (time not recorded). This is normal for old work orders, or when the technician pressed **Mulai** directly without **Saya berangkat**.
- **Selesai dipasang** is reached when the technician sends in the work result (status **Menunggu review**) and stays ticked after the status becomes **Selesai**. Its time is the time of the first submission in that visit.
- A **Dikembalikan** work order puts a **Perlu perbaikan** (Needs rework) badge on the **Sedang dikerjakan** step, and **Selesai dipasang** goes back to "Belum dicapai".
- When the work order is assigned again (to another technician, or after rejection), the card starts again from **Ditugaskan** with the new assignment time. The departure time and the installation completed time from the previous visit no longer appear.
- A **Dibatalkan** work order replaces the four steps with the text **Dibatalkan**. **Draf** and **Menunggu penugasan** work orders show all four steps as "Belum dicapai".

The customer sees the same steps in their app (section **Kunjungan teknisi** (Technician visit) in the customer app guide) and receives the notification "Teknisi dalam perjalanan" (The technician is on the way) when the second step is filled in.

## Assigning a technician

Permission: `spk.assign`, or `spk.reassign` when the work order already has a technician (for example after rejection).

1. Open a work order with the status **Draf**, **Menunggu penugasan**, or **Dikembalikan**.
2. Click **Tugaskan**. The **Tugaskan SPK** (Assign work order) dialog opens.
3. In **Teknisi** (required), type the name, employee number, organisation, or phone ("Cari karyawan teknisi" (Search technician employee)), then click the technician in the search results. The text you type does not choose a technician yet. While the field is empty, the suggestion button "Gunakan: {nama} (beban terendah: {n} SPK hari ini)" (Use: {name} (lowest load: {n} work orders today)) points to the technician with the fewest open work orders today. Click the button to use it, or choose someone else: the suggestion does not choose anything.
4. Fill in **Tanggal kunjungan** if needed. This optional field already holds the work order schedule when its date has not passed, and "Kosong berarti jadwal SPK tidak berubah" (Empty means the work order schedule does not change) (the hint under the field). The date rules are the same as in Penugasan ([section 3.1](/docs/guides/web/operations/dispatch/)). The **Ganti teknisi** dialog has the same field.
5. Click **Tugaskan**. The toast "{kode} ditugaskan ke {nama teknisi}." ({code} assigned to {technician name}.) appears, the status becomes **Ditugaskan**, and **Riwayat penugasan** gets one more row. **Batal** closes the dialog without saving.

On the first assignment of an **Instalasi** work order, Inbils creates the subscription PPPoE account automatically when it does not exist yet. The username comes from the customer code and is made unique. A failure because the RADIUS profile or realm is not ready does not cancel the assignment. Fix the network settings, then use the available sync process.
The assigned technician sees the **Akun PPPoE** (PPPoE account) card in the technician app. The username is always visible. The password opens only after **Tampilkan** (Show), is masked again after 60 seconds or when the screen is closed, is limited to 5 times per minute, and every disclosure is recorded in the Log Audit (Audit log). The secret is not kept in the offline cache or the app logs.

The **Teknisi** list holds active employees ([section 8.3](/docs/guides/web/administration/employees/)) whose user account is active and who hold `spk.start` or `spk.submit`, through their role or as a direct permission. Each choice shows the name, with the employee number, organisation, and phone below it. When nothing matches, it reads "Tidak ada karyawan teknisi yang cocok." (No matching technician employee.)

When the company WhatsApp is active, the technician receives a message with the number, title, visit date, and work order link. The customer receives one schedule message on the first assignment, when the work order has a **Pelanggan** and a **Jadwal**.

To replace the technician of a work order with the status **Ditugaskan** or **Dikerjakan**, click **Ganti teknisi** on the work order page or use Penugasan ([section 3.1](/docs/guides/web/operations/dispatch/)). A replacement while **Dikerjakan** returns the work order to **Ditugaskan** for the new technician and restarts the visit time. When the same technician is chosen again on a **Dikerjakan** work order, the progress is kept. When the dialog shows the **SPK sudah berubah** (The work order has changed) alert with the message "Konflik penugasan: SPK ini sudah ditugaskan oleh pengguna lain." (Assignment conflict: this work order was already assigned by another user.), another user changed the work order first. Click **Muat ulang SPK** (Reload work order), then repeat.

## Starting and submitting a work order

Technicians do these two steps in the technician app, after **Saya berangkat**, which exists only in the app. On the web, **Mulai** and **Ajukan review** are on the work order page and in Pekerjaan Saya (My Work) ([section 3.6](/docs/guides/web/operations/my-work/)).

1. Open a work order with the status **Ditugaskan**.
2. Click **Mulai**. The **Mulai SPK** (Start work order) dialog opens.
3. Click **Mulai** in the dialog. The status becomes **Dikerjakan** and **Dimulai** is filled in, with the toast "SPK mulai dikerjakan." (Work on the work order has started.) Permission `spk.start`.
4. After the work order has evidence, click **Ajukan review**. The **Ajukan SPK untuk review** (Submit work order for review) dialog opens.
5. Click **Ajukan** (Submit) in the dialog. The status becomes **Menunggu review**, with the toast "SPK diajukan untuk review." (Work order submitted for review.) Permission `spk.submit`.

The server accepts both actions only from the technician assigned to that work order. An admin who is not assigned is refused, even though the button appears.

Submission is also refused with the message "Bukti pekerjaan wajib diunggah sebelum SPK diajukan." (Work evidence must be uploaded before the work order is submitted.) when the work order has no evidence. It is also refused with the message "Seluruh sisa material dari permintaan barang harus dideklarasikan terlebih dahulu sebelum SPK diajukan." (All leftover material from the item request must be declared first before the work order is submitted.) when an item request with the status **Diserahkan** (Handed over) linked to the work order ([section 6.1](/docs/guides/web/inventory/item-requests/)) still has leftover material that has not been declared ([section 6.8](/docs/guides/web/inventory/material-returns/)).

## Check-in distance at start

When the technician presses **Mulai** in the technician app, the app sends its location. When the distance to the customer's installation address (to the **Lokasi** of the work order when it has no subscription) is farther than the company limit, the app writes "Jauh dari lokasi pelanggan" (Far from the customer location) and asks for an **Alasan** (Reason) first. Without a reason, the work order does not start. The admin sets that limit in **Pengaturan Perusahaan** (Company settings), the **Lapangan** (Field) card, the **Jarak check-in maksimal (meter)** (Maximum check-in distance (metres)) field ([section 8.1](/docs/guides/web/administration/company/)). Until it is changed, the limit is 500 metres. **Saya berangkat** is not subject to this rule, and **Mulai** from the web does not send a location, so this rule applies only in the app. The result appears in the **Check-in** row of the **Rincian** card, in the **Persetujuan** (Approvals) review panel, and on the ticket page for tickets ([section 3.4](/docs/guides/web/operations/tickets/)): the distance, followed by "Jauh dari lokasi: {alasan}". A location that is not available (permission denied, GPS off) and an address without coordinates are not counted as far.

## Managing material items

Permission: `spk.update` (admin, manager). The **Item** card records the items and devices of the work order. **Terpakai** is the quantity used, and stock is reduced only when the work order is approved, by the **Terpakai** quantity. A work order does not reserve stock.

1. In the **Item** card, click **Tambah item** (Add item). The **Tambah item** dialog opens. This button appears while the work order has the status **Draf**, **Menunggu penugasan**, **Ditugaskan**, **Dikerjakan**, or **Dikembalikan**. On work orders that are **Menunggu review**, **Selesai**, and **Dibatalkan** the button disappears and the card writes "Item dikunci selama SPK menunggu review." (Items are locked while the work order awaits review.), "SPK selesai, item tidak bisa diubah." (The work order is completed, items cannot be changed.) or "SPK dibatalkan, item tidak bisa diubah." (The work order is cancelled, items cannot be changed.) When the work order has no rows yet, the card shows "Belum ada barang di SPK ini." (No items on this work order yet.) with a hint to use **Tambah item**.

   ![The Add item dialog with the Item, Quantity used, and Notes fields](~/assets/guide/web/spk-add-item.webp)

2. Fill in the dialog:
   - **Barang**: required. Type the name or SKU (at least 2 letters), then choose an active product. Each choice reads "SKU - Nama" (SKU - Name), with the category below it.
   - **Aset jaringan**: appears and is required only when the item has the type **Aset** (Asset). Type the asset code or name (at least 2 letters), then choose. The list holds **Tersedia** (Available) assets of that item, written as "kode - nama" (code - name).
   - **Jumlah terpakai** (Quantity used): a number of 0 or more with two decimals. It may be left empty, and empty counts as 0. After an item is chosen, its label holds the item unit, for example "Jumlah terpakai - Meter (m)".
   - **Catatan**: optional, 500 characters at most.
3. Click **Tambah**. The toast "Item berhasil ditambahkan." (Item added successfully.) appears and the row appears in the table. **Batal** closes the dialog without saving. When the server rejects one field in the dialog, the dialog stays open and a red message appears below that field, for example "Aset jaringan yang dipilih sedang terpasang." (The chosen network asset is currently installed.) below **Aset jaringan**. Correct the field, then click **Tambah** again.

The **Tambah item** dialog has no reserve field, because a work order does not reserve stock. One product has only one row, so adding the same product overwrites the quantity, notes, and asset of the old row with the latest input. The web has no button to delete a row, although the server delete route requires `spk.update`.

A technician fills in **Terpakai** for a regular product in the app while the work order is **Dikerjakan**. The technician can withdraw that usage while the status is still **Dikerjakan**; a planned row stays with **Terpakai** 0, while a row without a plan or notes is deleted. A technician cannot add or delete **Aset** product rows; those rows are managed only by the office on the web.

## Uploading work evidence

Permission on the web: `spk.update` (admin, manager), while the work order is not yet **Selesai** or **Dibatalkan**. Other users do not see the upload form. The assigned technician uploads photos from the app while the work order is **Dikerjakan**.

1. In the **Bukti** card, click **telusuri** (browse) in the area "Seret berkas ke sini atau telusuri" (Drag a file here or browse) (the **Berkas bukti** (Evidence file) field, required), or drag one file into that area.
2. Fill in **Keterangan** (Remarks) if needed (optional, 255 characters at most).
3. Click **Unggah** (Upload). This button becomes active only after there is a file. The bar "Mengunggah bukti" (Uploading evidence) shows the progress, then the toast "Bukti berhasil diunggah." (Evidence uploaded successfully.) appears.

The file may be `jpg`, `jpeg`, `png`, `pdf`, `doc`, or `docx`, 10 MB at most, one file per upload. A file of a type that is not allowed is refused in the upload area with "Jenis berkas tidak diizinkan" (File type not allowed). A refusal by the server shows the toast "Bukti gagal diunggah." (Evidence upload failed.) with the note "Periksa jenis berkas yang diizinkan dan ukuran maksimal 10 MB." (Check the allowed file types and the maximum size of 10 MB.)

The evidence list shows **Foto** (Photo) or **Dokumen** (Document), the remarks (or the file name), and the upload time. Images have the buttons **Buka** (Open) (new tab) and **Unduh** (Download), while PDFs and Word documents have only **Unduh**.

The web has no button to delete evidence. The server delete route accepts only holders of `spk.update` while the work order is not yet **Selesai** or **Dibatalkan**, or the uploader themselves who holds `spk.evidence.upload` while the work order is **Dikerjakan**.

## Approving, rejecting, and cancelling a work order

Permissions: `spk.approve` for **Setujui**, `spk.reject` for **Tolak**, `spk.cancel` for **Batalkan**. The **Persetujuan** queue ([section 3.2](/docs/guides/web/operations/approvals/)) shows **Menunggu review** work orders and uses the same rules.

1. Open a work order with the status **Menunggu review**, then check the **Terpakai** quantity in the **Item** card and the files in the **Bukti** card.
2. To approve, click **Setujui**. The **Setujui SPK** (Approve work order) dialog opens and holds a list of approval impacts: the customer and subscription that become active, the installation invoice (the amount, and whether it is sent at once or becomes a draft), the PPPoE account that is created, and the number of items deducted from stock. The list holds only the steps that really happen for that work order.
3. Click **Setujui** in the dialog. The toast "SPK disetujui." (Work order approved.) appears, the status becomes **Selesai**, and **Selesai** in the **Rincian** card is filled in.
4. To reject, click **Tolak**. The **Tolak SPK** (Reject work order) dialog opens.
5. Fill in **Alasan** (required, 500 characters at most), then click **Tolak** in the dialog. The toast "SPK ditolak." appears, the status becomes **Dikembalikan**, and the reason appears in the **Alasan penolakan** row.
6. To cancel, click **Batalkan** in the **Tindakan** card. The **Batalkan SPK** (Cancel work order) dialog opens.
7. Fill in **Alasan** (required, 500 characters at most), then click **Batalkan** in the dialog. The toast "SPK dibatalkan." (Work order cancelled.) appears and the status becomes **Dibatalkan**.

The creator of the work order and the assigned technician must not approve or reject that work order, including admins. A work order from a customer registration or from the **Buat SPK** button on the ticket page is recorded as created by the person who did it, so that person needs another colleague to approve it.

Approval needs at least one piece of evidence. When the work order has an item request with the status **Diserahkan**, all its material returns must have the status **Diterima** (Received) or **Selisih diselesaikan** (Difference resolved) ([section 6.8](/docs/guides/web/inventory/material-returns/)).

Cancellation cannot be undone, and the reason is recorded only in the Log Audit ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)). Cancellation and rejection do not move stock, because a work order does not reserve stock. An item request that is already **Diserahkan** for that work order does not change.

## What happens when a work order is approved

**Setujui** runs the following steps in one transaction. When one step fails, the work order stays **Menunggu review** and nothing changes. Approval cannot be undone from the web.

- Every row with **Terpakai** above 0 reduces the product stock by **Terpakai**, with a **Keluar** (Out) movement with the note "SPK &lt;nomor SPK&gt;" (work order &lt;work order number&gt;) ([section 6.7](/docs/guides/web/inventory/stock-movements/)). The quantity already issued through an item request that is **Diserahkan** for this work order is not deducted twice. When **Terpakai** is more than the quantity handed over, the difference leaves the warehouse of that request (the source location of its row, or the **Gudang Tujuan** (Destination warehouse) of the request), not the **Lokasi** of the work order. Items that were never requested leave from the **Lokasi** of the work order.
- Without a **Lokasi**, assets are not installed, and the stock of items that were never requested through an item request does not change. Insufficient stock makes the approval fail.
- On an **Instalasi** work order, every **Aset** product row installs the chosen **Aset jaringan**: the asset gets the status **Terpasang** (Installed) at the location, customer, and subscription of the work order ([section 5.2](/docs/guides/web/network/network-assets/)). The first asset is recorded as the subscription ONT when the subscription does not have one yet.
- The subscription of the work order that is **Menunggu** becomes **Aktif**, with the activation date of that day and the next invoice date taken from the billing day of the subscription ([section 4.1](/docs/guides/web/customers-and-services/customers/)). The types **Peningkatan layanan** and **Pindah lokasi** do not change the package, address, or assets of the subscription.
- On an **Instalasi** work order, the system makes sure the subscription PPPoE account exists. The account is normally created when the work order is first assigned. Approval acts only as a safeguard when the account still does not exist.
- When an **Instalasi** work order has a billable fee, the system always creates one **Sekali bayar** (One-time) invoice. The package fee row is labelled **Biaya pemasangan** (Installation fee). Used materials are not billed by default. When **Tagihkan bahan terpakai** (Bill used materials) is on in **Pengaturan Perusahaan**, each material becomes a row **Bahan terpakai: {nama barang}** (Used material: {item name}) with its selling price.
- When **Kirim tagihan pemasangan otomatis** (Send installation invoice automatically) is on, the invoice is sent at once and the customer can see it. When the switch is off, the invoice stays **Draf**, holders of `billing.send` receive a bell and push notification, and the Finance Dashboard shows the card **Tagihan draf menunggu dikirim** (Draft invoices waiting to be sent) with their total value.
- The work order becomes **Selesai** and stores the technician name, location code, and organisation unit of the technician at that time. Renaming the technician account or the location code afterwards does not change the completed work order. When the value is now different, the **Rincian** card writes the stored value followed by "(saat selesai)" (at completion) on the **Teknisi** and **Lokasi** rows.

One work order has at most one invoice. No invoice is created when the work order has no installation fee or no material chosen to be billed.

## Next steps after an installation work order is completed

On an **Instalasi** work order with the status **Selesai**, the **Langkah berikut** (Next steps) card appears below **Tahap kunjungan**. The card holds one row for each remaining item, and only the rows you may act on:

- The invoice is still a draft: "Tagihan {nomor} Rp ... masih draf" (Invoice {number} Rp ... is still a draft), the **Kirim tagihan** (Send invoice) button (needs `billing.send`). The confirmation dialog names the customer, the amount, and the due date.
- The invoice has been sent: "Tagihan {nomor} terkirim" (Invoice {number} sent), as a link to the invoice.
- No invoice yet: "Belum ada tagihan pemasangan" (No installation invoice yet), the **Buat tagihan pemasangan** (Create installation invoice) button (needs `billing.create`). This row appears only when the work order has a billable fee.
- The PPPoE account exists: "Akun PPPoE {username} sudah dibuat" (PPPoE account {username} has been created), the **Buka akun jaringan** (Open network account) button.
- The PPPoE account does not exist yet: **Buat akun jaringan** (Create network account), which opens the network account page of the subscription. This row appears only when RADIUS is on for the company.

## Common errors

- The message "Pelanggan dan langganan wajib diisi untuk jenis SPK ini." (Customer and subscription are required for this work order type.) appears at **Pelanggan**: the types **Instalasi**, **Peningkatan layanan**, and **Pindah lokasi** need a customer and a subscription. Fill in both (choose the customer first, then the subscription), or choose **Perawatan** when the job is not linked to a subscription.
- The message "Langganan bukan milik pelanggan yang dipilih." (The subscription does not belong to the chosen customer.) appears at **Langganan**: the chosen subscription belongs to another customer. Choose the customer first, then choose a subscription from the narrowed list.
- Staff create a work order but do not see it in the list: the staff list holds only work orders assigned to them. The work order still exists and is visible to managers and admins.
- A work order field is wrong after **Simpan**: while the work order is still **Draf** or **Menunggu penugasan**, click **Ubah** on the work order page. After the work order is assigned, only its schedule can be changed, through **Ganti teknisi**. For other corrections, **Batalkan** the work order and create a new one. The server deletes only **Draf** or **Dibatalkan** work orders, for holders of `spk.delete` (admin), but no screen calls it.
- The **Mulai**, **Ajukan review**, or **Tugaskan** button appears but is refused: the buttons follow the status, while the server checks the permission and the technician assignment. Only the assigned technician may start and submit, including when you are an admin.
- **Setujui** fails and only the toast "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.) appears: the dialog on the work order page does not state the cause. Possible causes: you are the creator or the technician of that work order, there is no evidence, a material return is not yet **Diterima** or **Selisih diselesaikan**, or the stock at the **Lokasi** is too low. Open the work order from **Persetujuan** ([section 3.2](/docs/guides/web/operations/approvals/)) so the cause appears in the review panel, or ask someone else to approve it.
- The **Tambah item** button is gone and the **Item** card writes "Item dikunci selama SPK menunggu review.", "SPK selesai, item tidak bisa diubah." or "SPK dibatalkan, item tidak bisa diubah.": items can be changed only until the work order is submitted for review. A **Dikembalikan** work order can still have its items changed. When the work order changes status while the **Tambah item** dialog is open, the server refuses with "Item SPK tidak bisa diubah saat SPK menunggu review, selesai, atau dibatalkan." (Work order items cannot be changed while the work order is awaiting review, completed, or cancelled.)
- Stock does not decrease and assets are not installed after **Setujui**: the work order has no **Lokasi**. Fill in **Lokasi** through **Ubah** while the work order is still **Draf** or **Menunggu penugasan**. After the work order is assigned, **Lokasi** cannot be changed: cancel the work order and create a new one with **Lokasi** filled in.
- No invoice appears after **Setujui**: the work order is not of the type **Instalasi**, or it has no installation fee and no material enabled for billing. Check **Kirim tagihan pemasangan otomatis** to decide whether a created invoice is sent at once or stays **Draf**.
- Wrong quantity in **Tambah item**: add the same product again with the right quantity, and the old row is replaced.
- Evidence upload is refused: the file is not `jpg`, `jpeg`, `png`, `pdf`, `doc`, or `docx`, or is over 10 MB. The upload form does not appear for users without `spk.update`, or when the work order is already **Selesai** or **Dibatalkan**.
- The **Batal** button inside a dialog only closes the dialog. To cancel a work order, click **Batalkan** in the **Tindakan** card.
- The message "Tanggal kunjungan tidak boleh sebelum hari ini." in **Ubah SPK** or in the **Tugaskan** and **Ganti teknisi** dialogs: choose today or later. The **Tanggal jadwal** field in **Buat SPK** does not have this limit.
- The **Ubah** button does not appear: the work order is already **Ditugaskan** or further along, or you do not hold `spk.update`. Opening the edit address directly returns you to the work order details with the toast "SPK hanya bisa diubah saat berstatus draf atau menunggu penugasan."
