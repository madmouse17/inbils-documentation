---
title: "3.1 Dispatch (Penugasan)"
description: "Use the dispatch queue to pick who handles new tickets and work orders, or to replace the person already assigned to an item."
---

**Penugasan** (Dispatch) is the queue of tickets and work orders (SPK) that wait for an assignee. Open it to choose an assignee for a new item or to replace the one already chosen.

Roles that can use it: admin and manager in the built-in roles, not staff. Permissions: `ticket.assign` and `spk.assign` to assign items that have no assignee, `ticket.reassign` and `spk.reassign` to replace the assignee. The menu appears when your account is active and holds any of these four permissions. The ticket permissions show tickets in the list, the SPK permissions show work orders.

## Opening and reading the list

1. In the sidebar, open the **Operasional** (Operations) group, then click **Penugasan**. The number next to the menu is the count of tickets and work orders that are unassigned and that you may assign. The number does not appear when the result is 0.

   ![The Dispatch page with summary chips, filters for search, type, assignment status, priority and period, and the queue table](~/assets/guide/web/dispatch.webp)

2. Read the row of chips above the list. Each chip shows a name and a count. The count covers the whole company queue and does not change when you use filters.
   - The **Belum ditugaskan** (Unassigned) chip counts the tickets and work orders that wait for an assignee. The number is the same as the one in the sidebar.
   - The **Tiket belum ditugaskan** (Unassigned tickets) and **SPK belum ditugaskan** (Unassigned work orders) chips split that number by type. A chip for a type appears only when you hold the permission for that type.
   - The **Sudah ditugaskan** (Already assigned) chip counts the items that already have an assignee and are still in the dispatch queue.
3. Click a chip to fill in the filter. The active chip is solid in colour. The **Belum ditugaskan**, **Tiket belum ditugaskan** and **SPK belum ditugaskan** chips select **Belum ditugaskan** in **Status penugasan** (Assignment status), and the last two chips also fill in **Jenis** (Type). The **Sudah ditugaskan** chip selects **Sudah ditugaskan**.
4. Narrow the list with the filters above the table:
   - The **Pencarian** (Search) box ("Cari kode, judul, atau nama pelanggan..." (Search code, title or customer name...)) searches the code, the title, and the customer name and code. The search runs by itself a moment after you stop typing. The **Cari** (Search) button runs the same search.
   - The **Jenis** list holds **Semua jenis** (All types), **Tiket** (Tickets), and **SPK**. This list appears only when you hold both a ticket permission and an SPK permission.
   - The **Status penugasan** list holds **Belum ditugaskan**, **Sudah ditugaskan**, and **Semua status** (All statuses).
   - The **Prioritas** (Priority) list holds **Semua prioritas** (All priorities), **Rendah** (Low), **Sedang** (Medium), **Tinggi** (High), and **Mendesak** (Urgent).
   - The **Periode** (Period) field filters by the date the ticket or work order was created. When empty it reads "Semua tanggal" (All dates). Type a date range, or click the **Buka kalender** (Open calendar) button and pick the start date and the end date. The calendar popover has quick choices: **Hari ini** (Today), **7 hari terakhir** (Last 7 days), **30 hari terakhir** (Last 30 days), **Bulan ini** (This month), **Bulan lalu** (Last month), and **Tahun ini** (This year). The **Hapus rentang tanggal** (Clear date range) button empties the field. The end date must not be before the start date: the message is "Tanggal akhir tidak boleh sebelum tanggal awal." (The end date must not be before the start date.)
   - The **Reset filter** (Reset filters) button appears when a filter is active. It clears the filters and selects **Belum ditugaskan**.
5. When the menu has just been opened, the **Status penugasan** list shows **Belum ditugaskan** (and so does its chip) but does not filter anything yet for holders of the assign and reassign permissions (admin and manager). The list holds unassigned and assigned items together. Select the status yourself if you want to filter.
6. Read the queue table.
   - The queue holds tickets with the status **Terbuka** (Open) and **Ditugaskan** (Assigned), and work orders with the status **Draf** (Draft), **Menunggu penugasan** (Awaiting assignment), **Dikembalikan** (Returned), and **Ditugaskan**. Tickets and work orders that are already in progress are not here.
   - Columns: **Kode** (Code) (the code as a link to the details when you may open them, with a **Tiket** or **SPK** badge below it), **Judul dan kebutuhan** (Title and need) (the title, then "Kategori: ..." (Category: ...) for a ticket or "Jenis: ..." (Type: ...) for a work order, and the mark "SLA terlampaui" (SLA exceeded) when the SLA limit has passed), **Pemohon atau pelanggan** (Requester or customer) (customer name and code; a work order without a customer shows its creator), **Prioritas dan umur** (Priority and age) (the priority badge and the age of the item, for example "5 jam lalu" (5 hours ago)), **Batas atau jadwal** (Limit or schedule) ("SLA: ..." for a ticket, "Jadwal: ..." (Schedule: ...) for a work order), **Petugas saat ini** (Current assignee) (the name of the assignee, or the text "Belum ditugaskan"; a work order with the status **Ditugaskan** whose technician has pressed **Saya berangkat** (I'm on my way) in the app shows an **Dalam perjalanan** (On the way) badge below the technician name), and **Tindakan** (Actions) (the **Tugaskan** (Assign) or **Ganti petugas** (Change assignee) button).
   - The **Dalam perjalanan** badge is not a status and not a filter. The work order keeps the status **Ditugaskan** and stays in the queue until the technician presses **Mulai** (Start). The badge disappears when the work order is moved to another technician, or returned and then assigned again.
   - The column headings **Kode**, **Judul dan kebutuhan**, and **Prioritas dan umur** can be sorted. The default order is newest first.
   - Without data, the table shows "Tidak ada antrean penugasan" (No dispatch queue) and "Semua tiket dan SPK sudah punya petugas." (All tickets and work orders already have an assignee.). When a filter is active, the table shows "Tidak ada antrean yang cocok" (No matching queue) with a **Reset filter** button.
7. When your account also qualifies for **Pekerjaan Saya** (My Work) ([section 3.6](/docs/guides/web/operations/my-work/)), two tabs appear above the chips: **Antrean Penugasan** (Dispatch queue) and **Pekerjaan Saya**. The **Pekerjaan Saya** tab opens your own task list on the same page.

## Assigning or replacing the assignee

1. On the row you want, click **Tugaskan** (the item has no assignee) or **Ganti petugas** (the item already has an assignee). **Tugaskan** needs `ticket.assign` or `spk.assign`. **Ganti petugas** needs `ticket.reassign` or `spk.reassign`.

   ![The Assign work order dialog with the item summary, the Reason, Impact and Next rows, the Choose field technician field, the Visit date field, and the Cancel and Save assignment buttons](~/assets/guide/web/dispatch-assign.webp)

2. Read the **Tugaskan Tiket** (Assign ticket) or **Tugaskan SPK** (Assign work order) dialog, followed by the item code. The top part holds **Judul** (Title), **Pemohon** (Requester), **Prioritas**, **Umur antrean** (Queue age), and **Batas SLA** (SLA limit) (ticket) or **Jadwal kerja** (Work schedule) (work order). When the SLA has passed, "SLA sudah terlampaui." (The SLA has been exceeded.) appears. The **Alasan** (Reason), **Dampak** (Impact), and **Berikutnya** (Next) rows explain what the assignment does.
3. Choose the assignee in the **Pilih petugas tiket** (Choose ticket assignee) field (ticket) or the **Pilih teknisi lapangan** (Choose field technician) field (work order). This field is required. Type to search, then choose: the search checks names. Each choice shows the name of the assignee followed by the count of active jobs, for example "{nama} · 2 pekerjaan aktif" ({name} · 2 active jobs), and the list is sorted from the fewest. Active jobs are the tickets **Ditugaskan** or **Dikerjakan** (In progress) plus the work orders **Ditugaskan** or **Dikerjakan** that the person holds. When the counts differ between assignees, the assignee with the fewest jobs gets the note "Paling sedikit pekerjaan" (Fewest jobs) below the name. This is only a suggestion: you choose. The **Hapus pilihan** (Clear selection) button in the field empties it. When you replace an assignee, the field already holds the previous assignee.
   - Choices for a ticket: active users in your company who hold `ticket.start`, `ticket.resolve`, or `ticket.close`.
   - Choices for a work order: active users in your company who hold `spk.start` or `spk.submit` and have an employee profile with the status Active in that company.
4. For a work order, fill in **Tanggal kunjungan** (Visit date) if needed. This field is optional, with the hint "Opsional. Kosong berarti jadwal SPK tidak berubah." (Optional. Empty means the work order schedule does not change.) The field already holds the work order schedule when the date has not passed, and is empty when the work order has no schedule or its schedule has passed. A date before today (in the company time zone) is rejected with the message "Tanggal kunjungan tidak boleh sebelum hari ini." (The visit date must not be before today.) below the field. A ticket does not have this field.
5. Click **Simpan penugasan** (Save assignment). The dialog closes, the list reloads, and a green toast appears in the form "{kode} ditugaskan ke {nama petugas}." ({code} assigned to {assignee name}.) Click **Batal** (Cancel) to close the dialog without saving.

After the assignment is saved:

- The ticket gets the status **Ditugaskan**. The assignee receives an email and an Inbils notification. The system queues a WhatsApp message to the customer only on the first assignment, not when the assignee is replaced.
- The work order gets the status **Ditugaskan**. The assignment history records the new assignee. When you replace an assignee, the history also closes the old assignment. The system queues a WhatsApp message to the newly assigned technician (code, title, visit date, work order link), and one message to the customer on the first assignment when the work order has a customer and a visit date.
- The item moves from **Belum ditugaskan** to **Sudah ditugaskan**. The technician works on it in the technician app. A web user who is assigned opens it in **Pekerjaan Saya** ([section 3.6](/docs/guides/web/operations/my-work/)).

## Reassigning a returned work order

A work order that a reviewer rejected in **Persetujuan** (Approvals) ([section 3.2](/docs/guides/web/operations/approvals/)) gets the status **Dikembalikan** and returns to this queue.

1. Select **Sudah ditugaskan** in **Status penugasan**, then search for the work order code in the **Pencarian** box.
2. Click **Ganti petugas** (needs `spk.reassign`), choose a technician (the same technician is allowed), then click **Simpan penugasan**.
3. The work order has the status **Ditugaskan** again, and the technician can work on it again.

## Common errors

- The row has no **Tugaskan** or **Ganti petugas** button: your permissions do not match the state of the item. An item without an assignee needs `ticket.assign` or `spk.assign`, an item that already has an assignee needs `ticket.reassign` or `spk.reassign`.
- The assignee field is empty and **Simpan penugasan** cannot be clicked, with the message "Tidak ada petugas tiket aktif yang punya izin menangani jenis ini." (No active ticket assignee has permission to handle this type.) (for a work order: "teknisi lapangan" (field technician)): no user meets the conditions in step 3. Activate the account in Pengguna (Users) ([section 8.5](/docs/guides/web/administration/users/)), add permissions through Peran (Roles) ([section 8.6](/docs/guides/web/administration/roles/)), and for a work order make sure the employee profile is active in Karyawan (Employees) ([section 8.3](/docs/guides/web/administration/employees/)).
- The red message "Pilih petugas tiket penerima penugasan." (Choose the ticket assignee who receives the assignment.) (work order: "Pilih teknisi lapangan penerima penugasan." (Choose the field technician who receives the assignment.)): the field has not been chosen. Choose one name, then save again.
- The **Data berubah** (Data changed) alert with the message "Konflik penugasan: tiket ini sudah ditugaskan oleh pengguna lain." (Assignment conflict: this ticket was already assigned by another user.) (work order: "Konflik penugasan: SPK ini sudah ditugaskan oleh pengguna lain."): another user changed the item while the dialog was open. Click **Muat ulang antrean** (Reload queue). The dialog loads the latest data, or closes when the item can no longer be assigned. When the reload fails, the **Muat ulang belum berhasil** (Reload did not succeed) alert explains the cause.
- The **Terjadi kesalahan** (An error occurred) alert holds a message from the server, for example when the chosen user is not an assignee of your company.
- Server rejection "Tiket harus berstatus terbuka atau ditugaskan untuk bisa ditugaskan." (The ticket must be open or assigned to be assigned.) or "SPK harus berstatus draf, menunggu penugasan, ditolak, ditugaskan, atau dikerjakan untuk bisa ditugaskan." (The work order must be draft, awaiting assignment, rejected, assigned or in progress to be assigned.): the item status has changed and no longer accepts assignment. Reload the page.
- Server rejection "Kebijakan perusahaan melarang menugaskan diri sendiri." (Company policy forbids assigning to yourself.): your company forbids assigning items to your own account. Choose another person. The setting for this ban is not on the **Pengaturan Perusahaan** (Company settings) screen.
- The red message "Tanggal kunjungan tidak boleh sebelum hari ini." below **Tanggal kunjungan**: choose today or later, or empty the field so the work order schedule does not change.
