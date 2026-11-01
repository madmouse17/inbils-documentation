---
title: "7.2 Arrears (Tunggakan)"
description: "See unpaid invoice balances grouped by age, per invoice or per customer, send reminders, and put a customer's subscription under isolir or block it."
---

This page adds up the unpaid balances of invoices and groups them by the age of the due date, per invoice or per customer. Open it to see who is in arrears and for how long, to send reminders, and then to put that customer's subscription under isolir (internet blocked while the account is suspended) or to block it.

Roles that can use it: admin, manager and staff. Permissions: `billing.view`. **Kirim pengingat** (Send reminder) needs `billing.send` (admin, manager, staff), **Ekspor** (Export) needs `billing.export` (admin, manager). The **Isolir** button needs `customer.subscription.suspend`, the **Blokir** (Block) and **Buka blokir** (Unblock) buttons need `customer.subscription.block`. Admin and manager hold both, so staff do not see the isolir and block buttons. Data comes only from the active company.

## Opening and reading the list

1. In the sidebar, open the **Keuangan & Laporan** (Finance and reports) group, then click **Tunggakan** (Arrears). The page says "Pantau umur piutang pelanggan dan tindakan isolir." (Monitor the age of customer receivables and isolir actions.)
2. The six cards at the top add up all customers, not only the page that is shown: **Belum jatuh tempo** (Not yet due), three age ranges (**1-30 hari** (1-30 days), **31-60 hari** (31-60 days) and **61-90 hari** (61-90 days)), **>90 hari** (>90 days), and **Total piutang** (Total receivables). A card without a value says Rp 0.
3. Below the cards there are two tabs: **Per tagihan** (Per invoice) (opens first) and **Per pelanggan** (Per customer). The chosen tab is carried in the page address, so a link to a specific tab can be shared.

   ![Arrears page with six receivable age cards and the Per tagihan tab holding the Cari tagihan, Umur and Jatuh tempo filters, the Ekspor button and the table of open invoices](~/assets/guide/web/receivables.webp)
4. The **Per tagihan** tab holds one row per invoice that still has a balance, the oldest due date on top, 25 rows per page. Its columns are **Tagihan** (Invoice) (number, link to the detail), **Pelanggan** (Customer) (name and code), **Jatuh tempo** (Due date), **Umur** (Age) (`Lewat {n} hari` (Overdue {n} days) in red, or `Belum jatuh tempo`), **Status**, **Total**, **Sisa** (Remaining), and **Aksi** (Actions). The **Status** badge reads the due date, as in the **Tagihan** list ([section 7.1](/docs/guides/web/finance-and-reports/invoices/)). Above the table there are:
   - **Cari tagihan** (Search invoices) (hint `Nomor tagihan atau pelanggan` (Invoice number or customer)): searches the invoice number and the customer name and code.
   - **Umur**: **Semua umur** (All ages), **Belum jatuh tempo**, **1-30 hari**, **31-60 hari**, **61-90 hari**, or **>90 hari**. The groups are the same as the cards above.
   - **Jatuh tempo**: a date range. The end date must not be before the start date ("Jatuh tempo akhir tidak boleh sebelum jatuh tempo awal." (The end due date must not be before the start due date.)).
   - **Ekspor** (holders of `billing.export`): **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF) of the search and filters in force. Its columns are Nomor tagihan (Invoice number), Pelanggan, Kode pelanggan (Customer code), Tanggal terbit (Issue date), Jatuh tempo, Lewat jatuh tempo (hari) (Overdue (days)), Umur, Total, Terbayar (Paid), Sisa, and Status (written as a label, for example Belum dibayar (Unpaid)). The file format is covered in [section 7.3](/docs/guides/web/finance-and-reports/reports/).
   - When there are no rows, the table says "Tidak ada tagihan terbuka" (No open invoices) and "Tagihan yang belum lunas muncul di sini, yang paling lama jatuh tempo lebih dulu." (Invoices that are not fully paid appear here, the longest overdue first.) When the filters are too narrow, the **Reset filter** (Reset filters) button empties them.
5. The **Per pelanggan** tab holds one row per customer: **Pelanggan** (name and number of open invoices, for example "(1 tagihan)" ((1 invoice))), **Belum jatuh tempo**, three age range columns, **>90 hari** (red), **Total**, and **Aksi** (isolir and block buttons). A cell without a value shows a hyphen. All columns except **Aksi** can be sorted, and the initial order is **Pelanggan** from A to Z. Pages, row count and sorting work as in [section 1.5](/docs/guides/web/introduction/know-the-screen/). This tab has no search box, filter or export button: use **Per tagihan** for those. When there are no arrears, the table says "Tidak ada tunggakan" (No arrears) and "Tagihan yang belum lunas di perusahaan ini akan muncul di sini." (Invoices that are not fully paid in this company will appear here.)

   ![The Per pelanggan tab on the Arrears page with the receivable age table and the isolir and block buttons](~/assets/guide/web/receivables-customers.webp)

6. In the **Per pelanggan** tab, click a customer name to open **Tagihan** with the **Pelanggan** filter already filled with that name, all statuses including paid ones. Click **Hapus pilihan: Pelanggan** (Clear selection: Customer) to see all invoices again.

What is counted:

- Invoices with the status **Belum dibayar**, **Dibayar sebagian** (Partially paid) or **Lewat jatuh tempo** (Overdue) that still have a balance. The value is **Total** minus the paid amount. **Draf** (Draft), **Lunas** (Paid) and **Dibatalkan** (Cancelled) invoices are not counted.
- The column is decided by the due date and today, not by the status. An invoice that is due today or not yet past due goes into **Belum jatuh tempo**. An invoice that is 1 to 30 days past due goes into the first column, and so on up to **>90 hari**.
- A customer whose invoices are all paid does not appear.

Difference from **Tagihan** ([section 7.1](/docs/guides/web/finance-and-reports/invoices/)): **Tagihan** holds every invoice, all statuses, with full filters and export. **Tunggakan** holds only the balance that is still open: the **Per tagihan** tab one row per invoice, the **Per pelanggan** tab summed per customer.

## Sending a reminder

Permissions required: `billing.send`. Use this when a customer needs to be reminded now, without waiting for the automatic reminder ([section 7.1](/docs/guides/web/finance-and-reports/invoices/)).

1. In the **Per tagihan** tab, click **Kirim pengingat** on the invoice row.
2. Read the dialog **Kirim pengingat untuk {nomor}?** (Send reminder for {number}?): "Pelanggan menerima pengingat di aplikasi Inbils, juga lewat WhatsApp bila aktif. Satu tagihan hanya bisa diingatkan sekali per hari." (The customer receives the reminder in the Inbils app, and also by WhatsApp if active. One invoice can only be reminded once per day.) The dialog shows **Pelanggan**, **Sisa** and **Jatuh tempo**.
3. Click **Kirim pengingat**. The toast "Pengingat dikirim untuk {nomor}." (Reminder sent for {number}.) appears.

One invoice can only be reminded once in one calendar day of the company, by anyone. After that, the **Aksi** column on that row says "Pengingat terkirim hari ini" (Reminder sent today). If someone else sent it first while your dialog was open, the toast "Pengingat untuk {nomor} sudah dikirim hari ini." (The reminder for {number} has already been sent today.) appears and no second message is sent. The **Aksi** column is empty if you do not hold `billing.send` or the customer of that invoice has been deleted. The server also rejects an invoice that is already paid or cancelled ("Hanya tagihan yang belum lunas yang bisa diingatkan." (Only invoices that are not fully paid can be reminded.)). A reminder that was sent is recorded in the Log Audit (Audit log) ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)).

## Online payments that need checking

When Midtrans receives money that Inbils cannot record by itself, a red alert appears above the six cards with the title "&lt;n&gt; pembayaran online perlu dicek" (&lt;n&gt; online payments need checking). Examples are an invoice that was already paid or cancelled when the customer paid, an amount that differs from the invoice, or money that Midtrans took back. This alert does not appear when there are no open cases.

- The number in the title counts all cases that are still open. The list below it holds at most the ten newest cases. Each row holds the invoice number (link to the invoice detail), the amount, the Midtrans order ID, and the reason if there is one.
- The text below the list: "Catat pembayarannya dengan referensi order ID tersebut, atau refund di Midtrans." (Record the payment with that order ID as the reference, or refund it in Midtrans.) To record it, open the invoice, click **Catat pembayaran** (Record payment), then fill in **Referensi** (Reference) with that order ID ([section 7.1](/docs/guides/web/finance-and-reports/invoices/)).
- Holders of the permission `billing.payment.record` in that company also receive the notification "Pembayaran online perlu dicek" (Online payment needs checking) in the bell and, if their device is registered, as a push notification.
- A case disappears from the alert after its payment is recorded with that order ID, or after the money that was taken back has been cancelled in Inbils.

## Putting a subscription under isolir

Permissions required: `customer.subscription.suspend`. In the **Per pelanggan** tab, the **Aksi** column shows a button for every Aktif (Active) subscription of the customer in that row, including subscriptions whose invoice is not yet due.

1. Open the **Per pelanggan** tab. In the **Aksi** column, click the **Isolir** button followed by the right subscription code.
2. Fill in **Alasan isolir (wajib)** (Isolir reason (required)) in the window `Isolir langganan <kode>?` (Isolir subscription <code>?). The **Isolir** button becomes active once the reason is filled in. The reason is at most 500 characters, and the server rejects a longer one. The **Batal** (Cancel) button closes the window.
3. Click **Isolir**. The toast "Langganan ditangguhkan." (Subscription suspended.) appears, and the subscription has the status Ditangguhkan (Suspended) with source arrears.

Isolir from this page counts as isolir because of arrears, so a payment can lift it automatically under the conditions in [section 7.1](/docs/guides/web/finance-and-reports/invoices/) ("Memantau jatuh tempo dan isolir otomatis" (Monitoring due dates and automatic isolir)). A Ditangguhkan subscription no longer has an **Isolir** button on this page. Reactivate it manually with the **Aktifkan kembali** (Reactivate) button on the subscription page, which is opened from the customer page ([section 4.1](/docs/guides/web/customers-and-services/customers/)). If the subscription status has changed before you save, the server rejects it with "Langganan harus berstatus Aktif untuk ditangguhkan." (The subscription must be Active to be suspended.)

## Blocking or unblocking

Permissions required: `customer.subscription.block`. A block puts the customer under isolir without changing the subscription status, and a payment does not lift it.

1. Open the **Per pelanggan** tab, then click the **Blokir** button followed by the right subscription code. A subscription that is already blocked shows the **Diblokir** (Blocked) badge and the **Buka blokir** button followed by its code. A Ditangguhkan subscription appears on this page only while it is blocked.
2. Read the explanation in the window `Blokir internet <kode>?` (Block internet <code>?) or `Buka blokir internet <kode>?` (Unblock internet <code>?). A block puts the customer under isolir and disconnects them, while billing continues and a payment does not lift the block. Unblock restores normal service when the router reconnects. If the subscription is still Ditangguhkan, the service stays under isolir until the subscription is reactivated.
3. Fill in **Alasan** (Reason) (required, at most 500 characters) for a block, or **Catatan (opsional)** (Notes (optional)) for an unblock. The **Batal** button closes the window.
4. Click **Blokir internet** (Block internet) or **Buka blokir**. The toast "Internet langganan diblokir." (Subscription internet blocked.) or "Blokir internet langganan dibuka." (Subscription internet block lifted.) appears. The **Blokir internet** button becomes active once the reason is filled in.

## Common errors

- The amount in **Tunggakan** differs from the amount in **Tagihan**. **Tunggakan** counts the balance, not **Total**, and only **Belum dibayar**, **Dibayar sebagian** and **Lewat jatuh tempo** invoices. Compare with the **Sisa** and **Status** columns in the invoice list of that customer.
- The **Isolir** button appears for every active subscription of that customer, not only the one in arrears. Match the subscription code with the invoice in arrears before you click.
- A Ditangguhkan subscription without a block has no button on this page. Reactivate it from the subscription page ([section 4.1](/docs/guides/web/customers-and-services/customers/)).
- The server rejects a block if the subscription has already terminated ("Langganan yang sudah berhenti tidak bisa diblokir." (A subscription that has terminated cannot be blocked.)) or is already blocked ("Internet langganan sudah diblokir." (The subscription internet is already blocked.)), and an unblock if the subscription is not blocked ("Internet langganan tidak sedang diblokir." (The subscription internet is not blocked.)).
- Staff do not see the isolir or block buttons. Those buttons appear only for holders of the permission `customer.subscription.suspend` or `customer.subscription.block`. Staff still see **Kirim pengingat** if they hold `billing.send`.
- The **Tunggakan** page opens on **Per pelanggan**, not **Per tagihan**: the address you opened carries the sorting or page of the customer table. Click the **Per tagihan** tab.
- The **Ekspor** button is not there: your role does not hold `billing.export`.
