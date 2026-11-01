---
title: "3.6 My Work (Pekerjaan Saya)"
description: "See the tickets and work orders assigned to your own account and start, complete or submit them from one page."
---

**Pekerjaan Saya** (My Work) holds the tickets and work orders (SPK) assigned to your own account, with the buttons to work on them. Technicians do the same tasks in the technician app, so this page is for web users (admin, manager, staff) who receive assignments.

Roles that can use it: users who meet two conditions. First, the account is active and holds at least one work permission: `ticket.start`, `ticket.resolve`, `ticket.close`, `spk.start`, or `spk.submit`. Second, the account is linked to an employee profile with the status `active` in the current company ([section 8.3](/docs/guides/web/administration/employees/)). Built-in roles that can meet this: admin (all permissions), staff (`spk.start`, `spk.submit`), and manager (`ticket.close`). The ticket permissions show tickets, the SPK permissions show work orders.

## Opening and reading the list

1. In the sidebar, open the **Operasional** (Operations) group, then click **Pekerjaan Saya**. The number next to the menu is the count of your tasks.
2. When the conditions are not met, the menu does not appear. Opening its address directly shows the **Akses ditolak** (Access denied) page, with the text "Anda tidak punya izin untuk membuka halaman ini. Hubungi administrator jika Anda memerlukan aksesnya." (You do not have permission to open this page. Contact the administrator if you need access.) and "Kode galat 403" (Error code 403). The server refuses with the reason "Anda tidak memiliki izin operasional untuk domain apa pun." (You do not have operational permission for any domain.), but the screen does not show that sentence. Ask an admin to create an active employee profile for your account in the Karyawan (Employees) menu ([section 8.3](/docs/guides/web/administration/employees/)). The demo admin account has no employee profile, so this page refuses it.

   ![The Access denied page with error code 403 and the To dashboard button, for an account that does not meet the conditions](~/assets/guide/web/my-work.webp)

3. Read the row of count buttons above the list. Click a button to filter the list, and click **Semua tugas** (All tasks) to show everything again.
   - **Semua tugas** counts all tickets and work orders assigned to you in statuses related to your permissions.
   - **Belum dimulai** (Not started) counts tasks with the status **Ditugaskan** (Assigned).
   - **Sedang dikerjakan** (In progress) counts **Dikerjakan** (In progress) tickets and **Dikerjakan** work orders.
   - **Menunggu tindakan** (Awaiting action) counts **Diselesaikan** (Resolved) tickets and **Dikerjakan** work orders. A work order in progress is counted in the last two buttons, so the sum of the last three buttons can exceed **Semua tugas**. The counts do not change when you use other filters.
4. Narrow the list with the filters. Filters run by themselves a moment after you type or choose:
   - The **Pencarian** (Search) box searches the code, title, and the customer name and code (the field reads "Cari kode, judul, atau nama pelanggan..." (Search code, title, or customer name...)).
   - The **Jenis** (Type) list (**Semua jenis** (All types), **Tiket** (Tickets), **SPK**) appears when you hold both a ticket permission and an SPK permission.
   - The **Status** list holds **Semua status** (All statuses), **Belum dimulai**, **Sedang dikerjakan**, and **Menunggu tindakan**. **Menunggu tindakan** shows **Diselesaikan** tickets and **Dikerjakan** work orders.
   - The **Prioritas** (Priority) list (**Semua prioritas** (All priorities), **Rendah** (Low), **Sedang** (Medium), **Tinggi** (High), **Mendesak** (Urgent)) and the **Periode** (Period) field (the field reads "Semua tanggal" (All dates), with a calendar and quick choices) work as in Penugasan (Dispatch) ([section 3.1](/docs/guides/web/operations/dispatch/)). The **Cari** (Search) button runs the same search. The **Reset filter** (Reset filters) button appears when a filter is active and empties all of them.
5. Read the table columns: **Kode** (Code) (a link to the details and a **Tiket** or **SPK** badge), **Judul dan pelanggan** (Title and customer) (a ticket past its SLA gets the red text "SLA terlampaui" (SLA exceeded)), **Prioritas dan umur** (Priority and age) (the priority badge and how long the task has existed), **Status** (the status badge and one "Berikutnya:" (Next:) line that names the next status), **Batas atau jadwal** (Limit or schedule) ("SLA:" with the deadline for a ticket, "Jadwal:" (Schedule:) with the date for a work order), and **Tindakan** (Actions). The column headings **Kode**, **Judul dan pelanggan**, **Prioritas dan umur**, and **Status** can be sorted. The **Kode** link is active only on rows you may open.
6. When your account also holds an assignment permission, two tabs appear above the counts: **Pekerjaan Saya** and **Antrean Penugasan** (Dispatch queue). The **Antrean Penugasan** tab opens the Penugasan page ([section 3.1](/docs/guides/web/operations/dispatch/)).

An empty list reads **Belum ada tugas untuk Anda** (No tasks for you yet). When the filters find nothing, the list reads **Tidak ada tugas yang cocok** (No matching tasks) with a **Reset filter** button.

The buttons in the **Tindakan** column follow the task status:

| Status | Type | Button | Condition |
|---|---|---|---|
| **Ditugaskan** | Ticket and work order | **Mulai** (Start) | `ticket.start` or `spk.start` |
| **Dikerjakan** | Ticket | **Selesaikan** (Complete) | `ticket.resolve` |
| **Dikerjakan** | Work order | **Ajukan review** (Submit for review) | `spk.submit` |
| **Diselesaikan** | Ticket | No button | You resolved this ticket yourself, so you must not close it |

## Starting work

1. On a task with the status **Ditugaskan**, click **Mulai**.
2. The dialog asks for confirmation with the title "Mulai pengerjaan Tiket" (Start work on Ticket) or "Mulai pengerjaan SPK" (Start work on SPK) followed by the task code and a question mark. Its text reads "Status akan menjadi Dikerjakan. Waktu mulai pengerjaan tercatat di jejak audit." (The status will become In progress. The start time is recorded in the audit trail.) Click **Mulai kerja** (Start work). Click **Batal** (Cancel) to close without starting.
3. The status changes to **Dikerjakan** and the start time is recorded in the audit. The toast "Tiket mulai dikerjakan." (Work on the ticket has started.) or "SPK mulai dikerjakan." (Work on the work order has started.) appears. On a ticket, this step also records the first response time when there is none yet. That figure is copied into Evaluasi (Evaluations) ([section 3.5](/docs/guides/web/operations/evaluations/)).

## Completing a ticket

1. On a ticket with the status **Dikerjakan**, click **Selesaikan**.
2. In the "Selesaikan tiket" (Complete ticket) dialog followed by the ticket code, fill in **Catatan penyelesaian** (Resolution note). This field is required and 1000 characters at most. The dialog also shows the ticket title and the customer name. The note is saved in the ticket audit history and is read at closing.
3. Click **Selesaikan tiket**. The status becomes **Diselesaikan** and the toast "Tiket diselesaikan." (Ticket resolved.) appears. The system queues a WhatsApp message to the ticket customer. Click **Batal** to close the dialog without saving.

## Submitting a work order for review

Condition: the work order has at least one piece of evidence, and the leftover material from item requests that were handed over has been declared by the technician ([section 6.1](/docs/guides/web/inventory/item-requests/) and [6.8](/docs/guides/web/inventory/material-returns/)).

1. On a work order with the status **Dikerjakan**, click **Ajukan review**.
2. The dialog is titled "Ajukan SPK" (Submit SPK) followed by the work order code and "untuk review?" (for review?). Read its text saying that the field work and the material declaration enter the approval queue and the work items cannot be changed until the review is done, then click **Ajukan review**.
3. The work order has the status **Menunggu review** (Awaiting review) and the toast "SPK diajukan untuk review." (Work order submitted for review.) appears. The work order leaves this list and enters the **Persetujuan** (Approvals) queue of other users ([section 3.2](/docs/guides/web/operations/approvals/)). You do not see it there yourself because you are the assigned technician.

## Common errors

- The **Item sudah berubah** (The item has changed) alert in the dialog, with the **Muat ulang pekerjaan** (Reload work) button: the task status was changed elsewhere, for example the technician started it in the app. Click **Muat ulang pekerjaan**. The dialog loads the latest data, or closes when its button no longer applies. A failed reload writes "Gagal memuat ulang pekerjaan." (Failed to reload work.) with the cause.
- The message "Catatan resolusi/penanganan wajib diisi." (The resolution/handling note is required.) in the **Selesaikan tiket** dialog: fill in **Catatan penyelesaian** with text other than spaces. A note over 1000 characters is refused with "catatan penyelesaian tidak boleh lebih dari 1000 karakter." (the resolution note must not exceed 1000 characters.) in the **Gagal menyimpan** (Failed to save) alert.
- The server refuses a work order submission with "Bukti pekerjaan wajib diunggah sebelum SPK diajukan." (Work evidence must be uploaded before the work order is submitted.) when the work order has no evidence. Upload evidence on the work order details page ([section 3.3](/docs/guides/web/operations/work-orders/)), then submit again.
- The server refuses a work order submission with "Seluruh sisa material dari permintaan barang harus dideklarasikan terlebih dahulu sebelum SPK diajukan." (All leftover material from the item request must be declared first before the work order is submitted.) when the leftover material declaration is not complete. Complete the declaration ([section 6.1](/docs/guides/web/inventory/item-requests/) and [6.8](/docs/guides/web/inventory/material-returns/)), then submit again.
- The **Tutup** (Close) button never appears on this page: the list holds only tickets assigned to you, and the person in charge of a ticket must not close a ticket they resolved. Another user who holds `ticket.close` closes it from the ticket details page ([section 3.4](/docs/guides/web/operations/tickets/)).
- A newly assigned task does not appear: the list holds only tasks assigned to your account, and only in statuses that match your permissions. For example, a new **Ditugaskan** ticket appears only when you hold `ticket.start`.
