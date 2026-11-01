---
title: "3.4 Tickets (Tiket)"
description: "Log customer complaints and service faults, assign handlers, track SLA deadlines, and raise a repair work order when a visit is needed."
---

A ticket records a complaint or service fault, from a customer, from the NOC (network monitoring), or from an internal report. Open this menu to log a report, assign a handler, track SLA deadlines, and raise a repair work order (SPK) when needed. Field staff work on tickets in the technician app.

Roles that can use it: admin, manager, staff. The permission `ticket.view` opens the menu, `ticket.create` creates tickets, `ticket.export` exports the list. With the built-in roles:

- Admin holds all ticket permissions.
- Manager holds `ticket.view`, `ticket.create`, `ticket.update`, `ticket.assign`, `ticket.reassign`, `ticket.close`, `ticket.reopen`, `ticket.spawn_spk`, `ticket.export`, `ticket.manage`, and `ticket.category.manage`.
- Staff hold `ticket.view`, `ticket.create`, `ticket.comment.create`, and `ticket.attachment.upload`.

A user who holds `ticket.start`, `ticket.resolve`, or `ticket.close` but not `ticket.assign` sees only the tickets assigned to them.

## Opening and reading the list

1. In the sidebar, open the **Operasional** (Operations) group, then click **Tiket**.
2. Read the ticket list.

   - The **Cari** (Search) box searches ticket numbers and titles (the field reads "Nomor atau judul..." (Number or title...)). Filters and search run by themselves a moment after you type or choose. The list has no search button.
   - The **Prioritas** (Priority) filter holds **Semua prioritas** (All priorities), **Rendah** (Low), **Sedang** (Medium), **Tinggi** (High), and **Mendesak** (Urgent). The **Status** filter holds **Semua status** (All statuses), **Terbuka** (Open), **Ditugaskan** (Assigned), **Dikerjakan** (In progress), **Diselesaikan** (Resolved), **Ditutup** (Closed), **Dihapus** (Deleted), and **Semua, termasuk dihapus** (All, including deleted).
   - Columns: **Nomor** (Number) (link to the details), **Judul** (Title), **Prioritas** (coloured badge), **Status** (coloured badge), **Pelanggan** (Customer), **Petugas** (Handler), **Respons sebelum** (Respond before), **Dibuat** (Created) (date and time, in the company date format). **Petugas** shows the name of the handler, or a yellow **Belum ditugaskan** (Unassigned) badge on **Terbuka** tickets without a handler. **Respons sebelum** shows a countdown ("sisa 41 mnt" (41 min left), "sisa 2 j 5 mnt" (2 h 5 min left), or "lewat 12 mnt" (12 min overdue)) above the date and time of the response target. The badge turns yellow when 30 minutes or less remain and red once the time has passed, and the countdown updates by itself every 30 seconds without reloading the page. A ticket that has been answered shows "Sudah dijawab" (Already answered), and a **Diselesaikan** or **Ditutup** ticket shows only the date. All columns except **Pelanggan** and **Petugas** can be sorted, and the default order puts the newest tickets on top. Sort **Respons sebelum** to put the nearest deadline on top.
   - Four chips above the table filter the work queue: **Belum ditugaskan** (unfinished tickets without a handler), **Hampir terlampaui** (Almost exceeded) (the response or resolution target is due within 30 minutes), **Pelanggan membalas** (Customer replied) (the last reply was written by the customer and the handler has not answered yet), and **Tiket saya** (My tickets) (assigned to you). Click a chip to switch it on or off. Chips are saved in the page address, so the queue can be shared as a link. Chips can be combined with search and other filters. Ticket holders without `ticket.assign` see only the tickets assigned to them, so **Belum ditugaskan** is empty for them.
   - The **Ekspor** (Export) button (holders of `ticket.export`) opens a menu with **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF). The file holds the columns Kode (Code), Judul, Prioritas, Status, Pelanggan, Petugas, Respons sebelum, and Dibuat according to the search and active filters, including chips. The Prioritas and Status columns in that file hold codes (for example `medium` and `on_progress`), not the on-screen labels.
   - The **Buat tiket** (Create ticket) button (holders of `ticket.create`) opens the create form.
   - Below the table are the **Baris per halaman** (Rows per page) list and the **Sebelumnya** (Previous) and **Berikutnya** (Next) buttons.

   ![The ticket list with the Export and Create ticket buttons, the Search box, the Priority and Status filters, and the ticket table](~/assets/guide/web/tickets-index.webp)

3. Click the ticket number to open the details. Rows do not have a **Lihat** (View), **Ubah** (Edit), or **Hapus** (Delete) button, and no **Aksi lainnya** (More actions) menu, except the row of a deleted ticket: its menu holds **Pulihkan** (Restore) (permission `ticket.delete`), its number is plain text, and the ticket returns with its previous status (toast "Tiket dipulihkan." (Ticket restored.)).

An empty list reads **Belum ada tiket** (No tickets yet) with a **Buat tiket** button. When the search or filters find nothing, the list reads **Tidak ada tiket yang cocok** (No matching tickets) with a **Reset filter** (Reset filters) button.

The **SLA terlampaui** (SLA exceeded) card on the Dasbor (Dashboard) ([section 2.1](/docs/guides/web/dashboard/queue-cards/)) opens this list with a hidden filter `sla_breached`. The list holds only tickets that are past **Target penyelesaian** (Resolution target) and not yet **Diselesaikan** or **Ditutup**. The screen does not show that filter, and other filters you change still carry it. **Reset filter** does not remove it either. Click **Tiket** in the sidebar to see all tickets again. The **Hampir terlampaui (≤ 30 menit)** (Almost exceeded (≤ 30 minutes)) and **Pelanggan membalas** cards open this list with the same chip switched on, and that chip can be switched off.

## Ticket statuses

| Status | Meaning | Next step | Who |
|---|---|---|---|
| **Terbuka** | New ticket, no handler yet | **Tugaskan** (Assign), or **Tugaskan ke saya** (Assign to me) | `ticket.assign` |
| **Ditugaskan** | A handler is assigned | **Mulai** (Start) | The handler of that ticket, permission `ticket.start` |
| **Dikerjakan** | The handler is working. **Respons pertama** (First response) is filled in when the handler first presses **Mulai** or sends a public reply | **Selesaikan** (Complete) with a note | The handler of that ticket, permission `ticket.resolve` |
| **Diselesaikan** | Done, awaiting check. A customer reply reopens the ticket, and the customer can close it in the app by giving a rating | **Tutup** (Close), **Buka kembali** (Reopen), or wait for a customer reply | **Tutup**: a holder of `ticket.close` who is not the handler of that ticket. **Buka kembali**: a holder of `ticket.reopen` |
| **Ditutup** | Done and closed. New comments and attachments are refused | **Buka kembali** if the problem returns, or create a new ticket | A holder of `ticket.reopen` |

Replacing the handler of an **Ditugaskan** ticket uses `ticket.reassign` through Penugasan (Dispatch) ([section 3.1](/docs/guides/web/operations/dispatch/)), because the **Tugaskan** button on the ticket page appears only on **Terbuka** tickets. A customer reply on a **Diselesaikan** ticket reopens it as **Ditugaskan** when it still has a handler, or **Terbuka** when it does not. A **Ditutup** ticket cannot be answered by staff or customers. Staff with `ticket.reopen` can reopen a **Diselesaikan** or **Ditutup** ticket by writing a reason (section "Reopening a ticket"). Without that permission, a problem that returns is logged as a new ticket.

## Creating a ticket

1. In the ticket list, click **Buat tiket**.

   ![The Create Ticket form with the Data tiket card](~/assets/guide/web/tickets-create.webp)

2. Fill in the **Data tiket** (Ticket data) card:
   - **Judul**: required, 255 characters at most. It is filled with the category name as soon as you choose a **Kategori** (Category), and does not change again after you write your own title.
   - **Sumber** (Source): required. Choose **Pelanggan** (the default), **NOC**, or **Internal**.
   - **Kategori**: required. Type to search, then choose. The list holds the active categories of the company. The category becomes the source of the targets only when the ticket has no **Langganan** (Subscription), or its subscription has no SLA tier. When the ticket has a subscription with an SLA tier, the SLA tier of that subscription's package version is used and the category does not decide the hours.
   - **Prioritas**: **Rendah**, **Sedang** (the default), **Tinggi**, or **Mendesak**. Choosing a **Kategori** fills in the default priority of that category and writes "Bawaan kategori {nama kategori}." (Category default {category name}.) below the field. Once you choose a priority yourself, the category no longer changes it. The **Mendesak** priority cuts the targets in half (section "SLA and deadlines").
   - **Pelanggan**: optional in the form. Type the customer name or code (at least 2 letters), then choose. The list holds active customers, 20 results at most. Fill it in for tickets from customers, because the customer receives WhatsApp only when the ticket has a **Pelanggan**.
   - **Langganan**: optional. Type the subscription code, then choose. The list holds subscriptions with the status `active` and `suspended`. After you choose a customer, the list holds only the subscriptions of that customer, and when that customer has only one subscription, **Langganan** is filled in by itself.
   - **Aset jaringan** (Network asset): optional. Type the asset code or name, then choose. The list does not hold `retired` or `decommissioned` assets. An asset already linked to a customer or subscription appears only when it matches your choice, while an asset without a link appears for anyone.
   - **Lokasi** (Location): optional. Type the location code or name, then choose. The list holds active locations, written as the code, a hyphen, and the name.
   - **Deskripsi** (Description): optional.

   Changing **Pelanggan** empties the **Langganan** and **Aset jaringan** choices, and changing **Langganan** empties **Aset jaringan**, so the choices do not contradict each other. To empty a field, click the **Hapus pilihan** (Clear selection) button next to it.

   As soon as a **Kategori** is chosen, one target line appears below **Deskripsi**: "Target respons {tanggal dan jam}, selesai {tanggal dan jam}" (Response target {date and time}, resolved {date and time}), or "Tanpa target respons, selesai {tanggal dan jam}" (No response target, resolved {date and time}) when there is no response target. That line is recalculated every time you change the category, subscription, or priority, with the same source and calculation as the ticket that will be saved (section "SLA and deadlines"). The new deadline is fixed when the ticket is saved.

   ![The Create Ticket form after a category is chosen, with the title filled with the category name, the category default priority, and the Response and resolution target line](~/assets/guide/web/tickets-create-target.webp)

3. Click **Simpan** (Save). The ticket list opens with the toast "Tiket berhasil dibuat." (Ticket created successfully.) The new ticket has the status **Terbuka**, an automatic number, and **Target respons** (Response target) and **Target penyelesaian** already filled in (section "SLA and deadlines" below). When the ticket has a **Pelanggan**, the customer receives a WhatsApp message that the ticket was created, when the company WhatsApp is active. Click **Batal** (Cancel) or **Kembali** (Back) to leave without saving.

## Opening the ticket details

1. In the list, click the ticket number.

   ![Ticket details with the status Open, the Details card, the Status card, and the Actions card with the Assign, Assign to me, and Add comment buttons](~/assets/guide/web/tickets-show.webp)

2. Read the page from top to bottom. The page heading is the ticket title, with the ticket number below it. When the page opens, keyboard focus is on that heading.
   - The **Rincian** (Details) card holds **Kategori**, **Sumber** (**Pelanggan**, **NOC**, or **Internal** badge), **Pelanggan**, **Telepon** (Phone), **Alamat** (Address), **Langganan**, **Aset jaringan**, **Lokasi**, **Petugas**, and **Deskripsi**. **Pelanggan** becomes a link to the customer page, and **Alamat** appears, only for holders of `customer.view`. **Telepon** is a phone link that can be tapped on a mobile phone. Users without `customer.view` do not see the customer email, NPWP, or notes on the ticket page. **Catatan penyelesaian** (Resolution note) appears after the ticket is resolved. An empty field appears as `-`. A **Ditutup** ticket keeps the category name and the handler name at the time it was closed: renaming the category or the handler account afterwards does not change that ticket, and when the current name is different the page writes the frozen name followed by "(saat ditutup)" (at closing). A ticket that is not closed follows the current names.
   - When the customer has rated the ticket in the app, the **Rincian** card adds a **Penilaian pelanggan** (Customer rating) row, written "4 dari 5" (4 out of 5) with the customer comment below it when there is one. The rating stays even when the ticket is reopened.
   - The **Status** card holds **Kode**, **Status**, **Prioritas**, **Target respons**, **Respons pertama**, **Target penyelesaian**, **Check-in**, **Diselesaikan**, and **Ditutup**. **Target respons** and **Target penyelesaian** hold the deadline time and its source in brackets. While the target still applies, a countdown badge ("sisa 2 j 5 mnt", yellow when 30 minutes or less, "lewat 12 mnt" red) appears next to it, and one small line below it explains the calculation, for example "Dihitung sejak tiket dibuat: 6 jam ÷ 2 karena Mendesak = 3 jam" (Counted from ticket creation: 6 hours ÷ 2 because Urgent = 3 hours). **Respons pertama** states **lewat balasan** (via reply) or **lewat tombol Mulai** (via the Start button). A reopened ticket shows the **Dibuka kembali {waktu}** (Reopened {time}) badge. All times appear in the company date format followed by the hour.
   - The small line below the target writes "Dihitung sejak tiket dibuat: 6 jam" (Counted from ticket creation: 6 hours) for an SLA tier or category counted in 24 hours, and "Dihitung sejak tiket dibuat, dalam jam layanan: 6 jam" (Counted from ticket creation, within service hours: 6 hours) for a tier counted in **Jam layanan** (Service hours) (section "SLA and deadlines").
   - **Check-in** holds the location note from the technician app when the ticket was started: the distance from the location and its accuracy, for example "820 m dari lokasi (akurasi ±12 m)" (820 m from the location (accuracy ±12 m)), or the reason the location is not available. A distance of 1 km or more is written in km, for example "119,3 km". When the technician started farther away than the company distance limit, the reason is added: "Jauh dari lokasi: {alasan}" (Far from the location: {reason}) ([section 3.3](/docs/guides/web/operations/work-orders/), "Check-in distance at start"). Without a note, it reads "Belum ada check-in" (No check-in yet).
   - The **Tindakan** (Actions) card shows only the actions allowed for the account and the current status. A **Ditutup** ticket does not show **Tambah komentar** (Add comment) and writes "Tiket sudah ditutup. Komentar baru tidak bisa ditambahkan." (The ticket is closed. New comments cannot be added.). A **Ditutup** ticket that has a handler shows the **Evaluasi teknisi** (Technician evaluation) button for users who may create an evaluation ([section 3.5](/docs/guides/web/operations/evaluations/)).
   - The **Tindakan** card also holds **Tugaskan ke saya** (**Terbuka** ticket) and **Buka kembali** (**Diselesaikan** or **Ditutup** ticket) for holders of the permission. Both are explained below.
   - The **Komentar** (Comments) and **Lampiran** (Attachments) cards. Every comment and attachment carries a **Pelanggan** badge (written by a customer app account) or a **Petugas** badge, so it is clear who answered. The author of a comment appears only as a name.

## Assigning a handler

Permission: `ticket.assign` for **Terbuka** tickets. The **Tugaskan ke saya** button uses the same permission (see below).

1. Open a ticket with the status **Terbuka**.
2. Click **Tugaskan**. The **Tugaskan tiket** (Assign ticket) dialog opens.
3. Fill in **Petugas** (required). Type to search, then choose. Each row shows the name of the handler followed by the count of active jobs, for example "{nama} · 2 pekerjaan aktif" ({name} · 2 active jobs), sorted from the fewest. When the counts differ between handlers, the handler with the fewest jobs gets the note "Paling sedikit pekerjaan" (Fewest jobs) as a suggestion. The list holds active users of the company who hold `ticket.start`, `ticket.resolve`, or `ticket.close`. When nothing matches, the list reads "Tidak ada petugas yang cocok." (No matching handler.)
4. Click **Tugaskan**. The toast "Tiket berhasil ditugaskan." (Ticket assigned successfully.) appears, the status becomes **Ditugaskan**, and **Petugas** is filled in. Click **Batal** to close the dialog without assigning.

The handler must be an active user of this company who holds `ticket.start`, `ticket.resolve`, or `ticket.close`, through any role, including a custom role. The handler receives an email titled "Tiket {kode} ditugaskan kepada Anda" (Ticket {code} has been assigned to you) that holds the ticket title, customer, priority, response limit, and a **Buka tiket** (Open ticket) button, and a bell notification ([section 2.2](/docs/guides/web/dashboard/notifications/)). On the first assignment, the ticket customer receives a WhatsApp message that the ticket is being handled, when the company WhatsApp is active.

When the dialog shows **Tiket sudah berubah** (The ticket has changed), another user changed the ticket first: click **Muat ulang tiket** (Reload ticket), then repeat from step 2.

**Tugaskan ke saya** assigns a **Terbuka** ticket to you with one click, without a dialog. The button appears for holders of `ticket.assign` who themselves hold `ticket.start`, `ticket.resolve`, or `ticket.close`, unless the company forbids assigning to yourself ([section 3.1](/docs/guides/web/operations/dispatch/)). The toast "Tiket {kode} ditugaskan ke Anda." (Ticket {code} assigned to you.) appears. When someone else took the ticket first, the red toast "Tiket gagal ditugaskan." (The ticket could not be assigned.) states the reason, and the page reloads so **Petugas** shows who holds it.

## Working on and closing a ticket

Handlers start and resolve tickets in the technician app. On the web, the same steps are on the ticket page and in Pekerjaan Saya (My Work) ([section 3.6](/docs/guides/web/operations/my-work/)).

1. Open a ticket with the status **Ditugaskan**, then click **Mulai**. The toast "Tiket mulai dikerjakan." (Work on the ticket has started.) appears, the status becomes **Dikerjakan**, and **Respons pertama** is filled in when it has never been recorded. The first public reply from staff can also fill in **Respons pertama** with the source **lewat balasan**. Internal notes and customer replies are not counted. Permission `ticket.start`.
2. On a **Dikerjakan** ticket, click **Selesaikan**. The **Selesaikan tiket** (Complete ticket) dialog opens.
3. Fill in **Catatan penyelesaian** (required, 1000 characters at most).
4. Click **Selesaikan**. The toast "Tiket diselesaikan." (Ticket resolved.) appears, the status becomes **Diselesaikan**, and the note appears in **Catatan penyelesaian**. Permission `ticket.resolve`.
5. On a **Diselesaikan** ticket, click **Tutup**. The dialog "Tutup tiket {kode}?" (Close ticket {code}?) opens with the text "Pelanggan tidak bisa membalas lagi; tiket masuk laporan." (The customer can no longer reply; the ticket enters the reports.)
6. Click **Tutup tiket** (Close ticket). The toast "Tiket ditutup." (Ticket closed.) appears, the status becomes **Ditutup**, and **Ditutup** is filled in. Permission `ticket.close`.

Only the handler assigned to the ticket may start and resolve it, including when you are an admin. When the ticket is resolved, the ticket customer receives a WhatsApp message that the ticket is done.

The customer can also close a **Diselesaikan** ticket in the customer app: they answer that the problem is solved and give a rating from 1 to 5, with a comment if they want. The ticket becomes **Ditutup** at once, and the rating appears in the **Rincian** card as **Penilaian pelanggan**. A ticket that is already **Ditutup** but not yet rated can also be rated in the app. One ticket is rated once.

**Selesaikan** also appears on **Ditugaskan** tickets, but the server refuses it with the **Akses ditolak** (Access denied) page until the handler presses **Mulai**. The handler of a ticket must not close their own ticket, so another holder of `ticket.close` closes it.

When a handler starts a ticket in the technician app and is far from the customer address, the app asks for a reason first (the check-in distance rule, [section 3.3](/docs/guides/web/operations/work-orders/)). That reason appears in the **Check-in** row of the **Status** card.

## Reopening a ticket

Permission: `ticket.reopen`. Admin, Manager, and the NOC role hold it. A custom role gets it through the Peran (Roles) menu ([section 8.6](/docs/guides/web/administration/roles/)).

1. Open a ticket with the status **Diselesaikan** or **Ditutup**.
2. Click **Buka kembali** in the **Tindakan** card. The dialog "Buka kembali tiket {kode}?" (Reopen ticket {code}?) opens with the text "Tiket kembali ditangani, pelanggan diberi tahu, dan target waktunya tidak dihitung ulang." (The ticket is handled again, the customer is informed, and its time targets are not recalculated.)
3. Fill in **Alasan** (Reason) (required, 5 to 500 characters). The hint below the field: "Tulis apa yang masih bermasalah, paling sedikit 5 karakter." (Write what is still wrong, at least 5 characters.)
4. Click **Buka kembali**. The toast "Tiket {kode} dibuka kembali." (Ticket {code} reopened.) appears.

The ticket status becomes **Ditugaskan** when the ticket still has a handler, or **Terbuka** when it does not. The **Status** card shows the **Dibuka kembali {waktu}** badge, and **Diselesaikan**, **Ditutup**, and **Catatan penyelesaian** are emptied on the page (the old note stays in the Log Audit (Audit log)). The time targets are not recalculated, and the customer's rating stays. A reopened **Ditutup** ticket uses the current category name and handler again. The handler of the ticket, or holders of `ticket.assign` when the ticket has no active handler, receive the notification "Tiket {kode} dibuka kembali" (Ticket {code} reopened) with the message "Oleh {nama}: {alasan}" (By {name}: {reason}), except the person who reopened the ticket. The customer receives the notification "Tiket {kode} dibuka kembali dan akan ditangani lagi." (Ticket {code} has been reopened and will be handled again.)

## Comments and attachments

1. On a ticket that is not yet **Ditutup**, click **Tambah komentar** in the **Tindakan** card.
2. Fill in **Komentar** (required, 2000 characters at most), then choose **Terlihat oleh** (Visible to): **Semua, termasuk pelanggan** (Everyone, including the customer) or **Internal saja** (Internal only).
3. Click **Kirim komentar** (Send comment). The first public comment from staff fills in **Respons pertama** when it is not yet filled, and the customer receives a bell and push notification. An internal comment is not counted as the first response and is not visible to the customer.

Permission `ticket.comment.create`. Comments cannot be edited or deleted. The server refuses comments on **Ditutup** tickets with "Tiket sudah ditutup." (The ticket is closed.). A customer reply on a **Diselesaikan** ticket reopens the ticket and notifies the handler and holders of `ticket.assign`.

4. To attach a file, click **telusuri** (browse) in the area "Seret berkas ke sini atau telusuri" (Drag a file here or browse) in the **Lampiran** card, or drag one file into that area.
5. Fill in **Keterangan (opsional)** (Remarks (optional)) if needed, 200 characters at most. The text below that field reminds "Terlihat oleh pelanggan" (Visible to the customer).
6. Click **Unggah** (Upload). The **Mengunggah lampiran** (Uploading attachment) bar shows the progress, then the toast "Lampiran berhasil diunggah." (Attachment uploaded successfully.) appears.

Permission `ticket.attachment.upload`. The file may be `jpg`, `jpeg`, `png`, or `pdf`, 10 MB at most. The upload area refuses other types on the spot, and the server checks the file content too. When the upload fails, the red toast "Lampiran gagal diunggah." (Attachment upload failed.) states the reason, or "Berkas harus JPG, PNG, atau PDF dengan ukuran paling besar 10 MB." (The file must be JPG, PNG, or PDF with a maximum size of 10 MB.) On a **Ditutup** ticket, the **Lampiran** card has no upload area and writes "Tiket sudah ditutup. Lampiran baru tidak bisa ditambahkan." (The ticket is closed. New attachments cannot be added.) A file appears with its name, a **Pelanggan** or **Petugas** badge, the remarks when there are any, the time, a **Unduh** (Download) button, and **Buka** (Open) for images.

## Creating a work order from a ticket

Permission: `ticket.spawn_spk` (admin, manager). Use it when the fault needs a technician visit.

1. Open a ticket with the status **Ditugaskan** or **Dikerjakan** that has no resolution note yet.
2. Click **Buat SPK** (Create work order). The **Buat SPK dari tiket** (Create work order from ticket) dialog opens.
3. Click **Buat SPK**. Inbils opens the details of the new work order with the toast "SPK berhasil dibuat dari tiket." (Work order created from the ticket successfully.)

The new work order has the type **Perawatan** (Maintenance), the status **Menunggu penugasan** (Awaiting assignment), and the title "SPK dari tiket &lt;kode tiket&gt;" (Work order from ticket &lt;ticket code&gt;). **Pelanggan**, **Langganan**, **Lokasi**, **Prioritas**, and the description are copied from the ticket. The network asset of the ticket is not copied.

You are the creator of that work order, so you cannot approve it ([section 3.3](/docs/guides/web/operations/work-orders/)). Assign a technician from that work order page or from Penugasan ([section 3.1](/docs/guides/web/operations/dispatch/)).

One ticket may spawn only one work order. The ticket page does not show a link to that work order, and the ticket is not completed when the work order is completed: resolve and close the ticket yourself. Find the work order in the work order list with the ticket code in the **Cari** box.

## SLA and deadlines

Every new ticket gets two deadlines when it is created. Both are calculated from the creation time, in calendar hours or in the company service hours (see "Deadline clock" below):

- **Target respons**: the time limit until the handler sends the first public reply or presses **Mulai**.
- **Target penyelesaian**: the time limit until the ticket is resolved through **Selesaikan**.

The source of both targets:

1. A ticket that has a **Langganan** takes its targets from the SLA tier of the **package version** that the subscription uses ([section 4.5](/docs/guides/web/customers-and-services/sla-tiers/)). That tier still applies even when the package has changed version or the tier has been deactivated: deactivating only stops new sales. The ticket page writes `(Target <nama tingkat>)` (Target <tier name>) next to the deadline.
2. A ticket without a **Langganan** takes its targets from the chosen **Kategori Tiket** (Ticket categories) (see below). The ticket page writes `(Target kategori <nama kategori>)` (Target category <category name>).

The deadlines are calculated when the ticket is created, and recalculated only when the priority of a **Terbuka** ticket is changed. An existing ticket does not change when the package or SLA tier of its subscription is changed later.

The **Mendesak** priority cuts both targets in half, rounded up, whatever the source. Example: 5 hours becomes 3 hours. Default categories of a new company: **Internet mati** (Internet down) 4 hours resolution and 2 hours response, **Koneksi lambat** (Slow connection) 8 and 4, **Koneksi putus-sambung** (Intermittent connection) 8 and 4, **Masalah perangkat** (Device problem) 12 and 6, **Kabel fiber bermasalah** (Fibre cable problem) 12 and 6. Older companies that have not renamed their categories also use these Indonesian names after the system update (previously **No Internet**, **Slow Connection**, **Packet Loss**, **Device Issue**, and **Fiber Issue**). The default response target is half of the resolution target, rounded up.

The deadlines are stored on the ticket when the ticket is created. Changing the tier, category, or priority afterwards does not recalculate an existing ticket. A ticket created before response targets existed keeps its resolution deadline and has no response target: the page writes "Tanpa target respons" (No response target).

**Deadline clock.** An SLA tier has a **Hitungan tenggat** (Deadline clock) field ([section 4.5](/docs/guides/web/customers-and-services/sla-tiers/)). **24 jam** (24 hours) counts every hour, day and night. **Jam layanan** counts only the opening hours of the company: a ticket that arrives outside opening hours starts counting at the next opening, and its deadline falls within opening hours. Opening hours are filled in per day, with a **Tutup** (Closed) choice, in **Pengaturan Perusahaan** (Company settings), the **Jam layanan** card ([section 8.1](/docs/guides/web/administration/company/)). While service hours are not filled in, a tier that uses **Jam layanan** is counted as 24 hours, and **Pengaturan Perusahaan** writes "Jam layanan belum diisi; tenggat dihitung 24 jam." (Service hours have not been filled in; deadlines are counted as 24 hours.) A category is always counted as 24 hours. The **Status** card on the ticket page and the target line in the create ticket form use the same calculation.

The ticket page marks breaches with two badges:

- **Respons terlambat** (Response late): the first response came after **Target respons**, or there is no response yet and the target has passed. A ticket without a response target never gets this badge.
- **Penyelesaian terlambat** (Resolution late): the ticket is past **Target penyelesaian** and not yet **Diselesaikan** or **Ditutup**.

Every 15 minutes the system checks the response and resolution targets. Warnings that a response is nearing its limit are sent to the handler of the ticket, or to holders of `ticket.assign` when the ticket is not yet assigned. Breaches of the response and resolution targets are sent through bell and push notifications to the active handler and holders of `ticket.assign`, without email and not to the ticket creator just because they are the creator.

## Ticket categories (Kategori Tiket)

Ticket categories keep the fallback targets for tickets without a **Langganan**. A ticket that has a subscription uses the SLA tier of its package version, active or not. A category also keeps **Saran untuk pelanggan** (Advice for the customer), text that the customer reads in the app before creating a ticket. Open this screen when you want to change the target hours of a category, rename it, deactivate it, or write advice for it.

Roles that can use it: admin and manager in the built-in roles, not staff. Permission: `ticket.category.manage`. Without this permission the menu does not appear and the address `/admin/ticket-categories` is refused with the **Akses ditolak** page.

1. In the sidebar, open the **Pelanggan & Layanan** (Customers and Services) group, then click **Kategori Tiket** (below **Tingkat SLA** (SLA tiers)).
2. Read the list. The subheading states that these targets are a fallback for tickets without a subscription or without an active SLA tier, and that urgent tickets use half of the target (rounded up). The columns are **Kode**, **Nama** (Name), **Target respons (jam)** (Response target (hours)), **Target penyelesaian (jam)** (Resolution target (hours)), **Status** (**Aktif** (Active) or **Nonaktif** (Inactive) badge), and **Aksi** (Actions) (only for permission holders). An empty list reads "Belum ada kategori tiket untuk perusahaan ini." (There are no ticket categories for this company yet.)

   ![The Edit category dialog above the Ticket categories list, with the Name, Response target (hours), Resolution target (hours), Active switch, Advice for the customer, Customer sees box, and the Cancel and Save buttons](~/assets/guide/web/ticket-categories-edit.webp)

3. Click **Ubah** on a row. The **Ubah kategori** (Edit category) dialog, followed by the category code, opens with these fields:
   - **Nama**: required.
   - **Target respons (jam)**: required, a whole number from 1 to 720, must not exceed the resolution target.
   - **Target penyelesaian (jam)**: required, a whole number from 1 to 720. The hint below the field reads "Hanya berlaku untuk tiket baru." (Applies only to new tickets.)
   - **Aktif**: a switch. An inactive category does not appear in the **Kategori** choice on the ticket form.
   - **Saran untuk pelanggan**: optional, free text of 500 characters at most with a counter in the hint ("Tampil di aplikasi pelanggan saat memilih kategori ini. Kosongkan jika tidak perlu." (Shown in the customer app when this category is chosen. Leave empty if not needed.)). Write short steps the customer can try before creating a ticket, for example how to check the modem lights. New lines are shown too. Below the field, the **Pelanggan melihat:** (Customer sees:) box shows the advice exactly as the customer reads it and changes as you type. Default categories already hold advice, for example **Internet mati**: "Periksa lampu modem. Cabut adaptor 10 detik lalu pasang lagi. Bila lampu LOS merah, kirim laporan ini." (Check the modem lights. Unplug the adapter for 10 seconds and plug it in again. If the LOS light is red, send this report.) Emptying the field removes the advice, and the app then shows three general steps: check the modem lights, unplug the modem power for 30 seconds, check the cable at the modem.
4. Click **Simpan**. The toast "Kategori tiket diperbarui." (Ticket category updated.) appears. Click **Batal** to close the dialog without saving.

This screen has no button to add or delete categories, and the category code cannot be changed. The message "Target respons tidak boleh lebih lama dari target penyelesaian." (The response target must not be longer than the resolution target.) appears when the response target is larger than the resolution target. The message "saran untuk pelanggan tidak boleh lebih dari 500 karakter." (advice for the customer must not exceed 500 characters.) below **Saran untuk pelanggan** means the text is too long. The list columns do not show the advice: open **Ubah** to read it.

## Common errors

- **Tugaskan** shows "penangani wajib diisi." (the handler is required.): choose a handler from the list, then click **Tugaskan**. The message "penangani yang dipilih harus berupa pengguna aktif dengan hak akses yang sesuai." (the chosen handler must be an active user with suitable permissions.) appears when the chosen handler is inactive or does not hold `ticket.start`, `ticket.resolve`, or `ticket.close`.
- The **Tiket sudah berubah** alert with the text "Konflik penugasan: tiket ini sudah ditugaskan oleh pengguna lain." (Assignment conflict: this ticket was already assigned by another user.) (or "Konflik: status tiket sudah diubah oleh pengguna lain." (Conflict: the ticket status was already changed by another user.) on **Selesaikan** and **Tutup**): click **Muat ulang tiket**. On **Mulai**, a similar status change shows the toast "Tiket gagal dimulai." (The ticket could not be started.) with the same text.
- **Selesaikan** is refused on a **Ditugaskan** ticket: the button appears, but only **Dikerjakan** tickets can be resolved. The handler clicks **Mulai** first.
- **Mulai** or **Selesaikan** is refused for you with the **Akses ditolak** page: only the handler assigned to the ticket may do it, and the built-in manager or staff roles hold neither `ticket.start` nor `ticket.resolve`. Assign the ticket to an authorised user, or let the technician work on it in the app.
- **Tutup** does not appear: the ticket is not yet **Diselesaikan**, you do not hold `ticket.close`, or you are the handler of that ticket. The server also refuses closing by the handler of that ticket with the **Akses ditolak** page. Ask another holder of `ticket.close` to close it.
- "catatan penyelesaian wajib diisi." (the resolution note is required.) or "catatan penyelesaian tidak boleh lebih dari 1000 karakter." (the resolution note must not exceed 1000 characters.) in the **Selesaikan tiket** dialog: fill in or shorten the note.
- **Buat SPK** does not appear or is refused: the ticket must be **Ditugaskan** or **Dikerjakan**, have no resolution note, and never have spawned a work order. The server refuses with "SPK sudah dibuat dari tiket ini." (A work order was already created from this ticket.) when a work order already exists. You also need `ticket.spawn_spk`.
- **Tambah komentar** or an attachment upload is refused for the built-in Manager (the **Akses ditolak** page): that role holds neither `ticket.comment.create` nor `ticket.attachment.upload`. Ask the company admin to add them to the role in the Peran menu ([section 8.6](/docs/guides/web/administration/roles/)), or to give you a role that already holds them.
- An empty comment or one over 2000 characters shows "isi pesan wajib diisi." (the message body is required.) or "isi pesan tidak boleh lebih dari 2000 karakter." (the message body must not exceed 2000 characters.) below **Komentar**.
- "judul wajib diisi." (the title is required.) at **Judul** or "kategori wajib diisi." (the category is required.) at **Kategori** in the create form: fill in both.
- The message "Langganan bukan milik pelanggan yang dipilih." (The subscription does not belong to the chosen customer.) at **Langganan**, or "Aset jaringan bukan milik pelanggan yang dipilih." (The network asset does not belong to the chosen customer.) and "Aset jaringan bukan milik langganan yang dipilih." (The network asset does not belong to the chosen subscription.) at **Aset jaringan**: the choices do not match each other. The choice lists are already narrowed by the customer and subscription you chose, so these messages rarely appear. Choose a subscription and asset that belong to the same customer.
- The toast "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.) appears together with messages below the fields: read the message below each field that has a problem.
- The ticket list looks cut off after being opened from the Dasbor: the `sla_breached` filter is still active. Click **Tiket** in the sidebar.
- The title or priority of a ticket is wrong: the web has no edit screen, **Ubah**, or **Hapus** for tickets. The server only changes **Terbuka** tickets (permission `ticket.update`) and deletes **Ditutup** tickets (permission `ticket.delete`), but no screen calls it. Write the correction as a comment. A ticket deleted through another route appears in the **Status** filter **Dihapus** and can be restored with **Pulihkan** (permission `ticket.delete`).
- **Buka kembali** does not appear: the ticket is not yet **Diselesaikan** or **Ditutup**, or you do not hold `ticket.reopen`. The message "Hanya tiket yang diselesaikan atau ditutup yang bisa dibuka kembali." (Only resolved or closed tickets can be reopened.) in the dialog means someone else has already changed the ticket: close the dialog and reload the page. The message "alasan wajib diisi." (the reason is required.) or "alasan minimal 5 karakter." (the reason must be at least 5 characters.) below **Alasan**: write a reason of at least 5 characters.
- **Tugaskan ke saya** does not appear: the ticket already has a handler, you do not hold `ticket.assign`, you yourself do not hold `ticket.start`, `ticket.resolve`, or `ticket.close`, or the company forbids assigning to yourself. The red toast "Tiket gagal ditugaskan." means someone else took the ticket first.
