---
title: "7.1 Invoices (Tagihan)"
description: "Issue monthly invoices, create manual ones, send them, record or reverse payments, download PDFs and cancel invoices for the active company."
---

This menu holds the customer invoices of the active company: monthly invoices from subscriptions, one-off invoices from work orders (SPK), and manual invoices. Open it to issue monthly invoices, send invoices, record or reverse payments, and cancel invoices.

Roles that can use it: admin, manager and staff. Base permission: `billing.view`. Technicians and customers have no web access. Invoices of other companies do not appear and cannot be opened (404 error). Each action has its own permission:

| Action | Permission | Default roles |
| --- | --- | --- |
| View the list and details, download the PDF | `billing.view` | admin, manager, staff |
| **Buat tagihan bulanan** (Create monthly invoices), **Buat tagihan** (Create invoice) | `billing.create` | admin, manager, staff |
| **Tambah item** (Add item), **Ubah** (Edit) (draft) | `billing.update`, or `billing.create` for the creator of that draft | admin, manager (draft creator: staff too) |
| **Kirim tagihan** (Send invoice) | `billing.send` | admin, manager, staff |
| **Catat pembayaran** (Record payment) | `billing.payment.record` | admin, manager, staff |
| **Batalkan pembayaran** (Cancel payment) | `billing.payment.reverse` | admin, manager |
| **Batalkan tagihan** (Cancel invoice) | `billing.cancel` | admin, manager |
| **Ekspor** (Export) | `billing.export` | admin, manager |
| **Unduh kuitansi** (Download receipt) (paid invoice) | `billing.pdf.view` | admin, manager |
| **Batalkan di Midtrans** (Cancel at Midtrans) | `billing.payment.record` | admin, manager, staff |

The **Buat tagihan bulanan**, **Buat tagihan** and **Ekspor** buttons appear only for holders of their permissions. At the top right of the detail page, **Unduh PDF** (Download PDF) is always there, **Ubah** appears on drafts for those allowed to edit them, and **Unduh kuitansi** appears on **Lunas** (Paid) invoices for holders of `billing.pdf.view`. The **Aksi** (Actions) card shows **Kirim tagihan**, **Catat pembayaran**, **Tambah item** and **Batalkan tagihan** according to the invoice status, not according to the user's permissions. The **Batalkan pembayaran** button in the **Pembayaran** (Payments) table and **Batalkan di Midtrans** in the **Pembayaran online** (Online payments) card also check permission before they appear. The server checks all permissions when the action is saved and rejects actions without permission (403 error).

## Opening and reading the list

1. In the sidebar, open the **Keuangan & Laporan** (Finance and reports) group, then click **Tagihan** (Invoices).
2. Above the list there are four filters: the **Cari tagihan** (Search invoices) box ("Nomor tagihan atau pelanggan" (Invoice number or customer)), the **Status** choice, the **Pelanggan** (Customer) choice, and **Periode** (Period). The list updates each time you change a filter.
   - **Status** contains Semua status (All statuses), Draf (Draft), Belum dibayar (Unpaid), Dibayar sebagian (Partially paid), Lunas (Paid), Lewat jatuh tempo (Overdue), Dibatalkan (Cancelled), Dihapus (Deleted), and Semua, termasuk dihapus (All, including deleted). Without a special choice, deleted invoices do not appear. This filter reads the stored status, so **Lewat jatuh tempo** only contains invoices after the daily check has marked them.
   - **Pelanggan** is a search box ("Semua pelanggan" (All customers)): type at least 2 letters of the customer name or code, then choose from the results (at most 20). The **Hapus pilihan: Pelanggan** (Clear selection: Customer) button empties it again.
   - **Periode** filters by **Tanggal terbit** (Issue date), not by due date. Type a date range in the company date format or click **Buka kalender** (Open calendar). The quick choices are **Hari ini** (Today), **7 hari terakhir** (Last 7 days), **30 hari terakhir** (Last 30 days), **Bulan ini** (This month), **Bulan lalu** (Last month), and **Tahun ini** (This year). The **Hapus rentang tanggal** (Clear date range) button empties it. The end date must not be before the start date.
   - The **Pembayaran online tertunda > 1 jam** (Online payment pending > 1 hour) chip appears when the list is opened from the Dasbor (Dashboard) card of the same name. The list only holds invoices whose online payment page has been open for more than one hour and has not expired. Click the remove mark on the chip to see all invoices again. This filter is carried into the export file.
   - The **Jatuh tempo ≤ 3 hari** (Due in ≤ 3 days) chip appears when the list is opened from the Dashboard card **Jatuh tempo ≤ 3 hari**. The list only holds **Belum dibayar** or **Dibayar sebagian** invoices that still have a remaining balance and whose due date falls from today up to 3 days ahead, by company date. Click the remove mark on the chip to see all invoices again. This filter is carried into the export file.

   ![Invoice list with the Cari tagihan box, the Status, Pelanggan and Periode filters, and the Ekspor, Buat tagihan bulanan and Buat tagihan buttons](~/assets/guide/web/invoices-index.webp)
3. List columns: **Nomor tagihan** (Invoice number) (link to the detail), **Pelanggan** (name and code), **Status** (coloured badge), **Tanggal terbit**, **Jatuh tempo** (Due date), **Total**, **Sisa** (Remaining) (the unpaid part), and **Aksi**. The **Status** badge reads the due date: an **Belum dibayar** or **Dibayar sebagian** invoice whose due date has passed shows **Lewat jatuh tempo** at once, without waiting for the daily check. The list is sorted by **Tanggal terbit**, newest first. The **Nomor tagihan**, **Status**, **Tanggal terbit**, **Jatuh tempo** and **Total** columns can be sorted. Pages, row count and sorting work as in [section 1.5](/docs/guides/web/introduction/know-the-screen/).
4. Click the invoice number or the **Lihat** (View) button in the **Aksi** column to open the detail. Rows have no **Ubah** or **Hapus** (Delete) button. A deleted **Draf** invoice appears in the **Status** filter **Dihapus**; its row has no button and the **Aksi lainnya** (More actions) menu holds **Pulihkan** (Restore) (permission `billing.delete`), which brings the draft back with its original status. See [section 1.5](/docs/guides/web/introduction/know-the-screen/).
5. When there is no result, the list shows "Tidak ada tagihan yang cocok" (No matching invoices) with a **Reset filter** (Reset filters) button. When the company has no invoices yet, the list shows "Belum ada tagihan" (No invoices yet) with a **Buat tagihan** button (for holders of `billing.create`).
6. The **Ekspor** button offers **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF). The file holds the columns Nomor tagihan, Pelanggan, Status, Total, Tanggal terbit, Jatuh tempo and Dibuat (Created), according to the currently active filters. The Status column in the file holds the status code (for example `sent`), not the badge label.

The system uses six invoice statuses. The badge in the list and in the detail shows its label:

| Status | Meaning | Next step |
| --- | --- | --- |
| **Draf** | Just created, not sent yet. The customer cannot see it yet. The due date, discount and notes can be changed, and items can be added or deleted. | **Kirim tagihan**, **Ubah**, or **Batalkan tagihan** |
| **Belum dibayar** | Sent, no payment yet. The customer sees it in the customer app. | **Catat pembayaran**, or **Batalkan tagihan** |
| **Dibayar sebagian** | Partly paid. | **Catat pembayaran** for the remainder, or **Batalkan pembayaran** |
| **Lewat jatuh tempo** | Past the due date and not fully paid. | **Catat pembayaran**, or **Batalkan tagihan** |
| **Lunas** | Fully paid. | **Batalkan pembayaran** if the payment is wrong |
| **Dibatalkan** | Cancelled with a reason. | None |

An **Belum dibayar** or **Dibayar sebagian** invoice is stored as **Lewat jatuh tempo** by the daily check when the due date has passed and a balance remains. The **Tagihan** and **Tunggakan** (Arrears) lists already show **Lewat jatuh tempo** from the day the date passes, but the detail page and the **Status** filter only follow after the daily check has run. A partial payment on a **Lewat jatuh tempo** invoice returns it to **Dibayar sebagian** until the next check. An invoice never returns to **Draf**.

For overdue invoices, click the **Tagihan jatuh tempo** (Overdue invoices) card on the Dashboard ([chapter 2](/docs/guides/web/dashboard/queue-cards/)): the list opens with the **Status** filter **Lewat jatuh tempo**. The card number is calculated from the due date and the invoice balance, so it can be larger than the list until the daily check has run.

## Opening the detail and downloading the PDF

1. Click the invoice number or **Lihat** in the list.
2. The **Tagihan &lt;nomor&gt;** (Invoice &lt;number&gt;) page holds the **Detail** (Details) card (Pelanggan, Langganan (Subscription), Tanggal terbit, Jatuh tempo, Jenis (Type), Sumber (Source), Catatan (Notes)), the **Ringkasan** (Summary) card (Status, Subtotal, Pajak (Tax), Diskon (Discount), Total, Terbayar (Paid), Sisa), the **Aksi** card, the **Item** (Items) table (columns **Deskripsi** (Description), **Jml** (Qty), **Harga satuan** (Unit price), **Diskon**, **Pajak**, **Total baris** (Line total)), and the **Pembayaran** table. At the top right there are the **Kembali** (Back), **Unduh PDF** and, according to status and permission, **Ubah** and **Unduh kuitansi** buttons.

   ![Invoice detail with the Detail, Ringkasan and Aksi cards](~/assets/guide/web/invoices-show.webp)
3. Numbers appear as full rupiah, for example Rp 120.000. Dates follow the company date format, and the **Dibayar pada** (Paid at) column uses the 24-hour clock.
4. **Jenis** and **Sumber** show where the invoice comes from. Type Berlangganan (Subscription) with source Langganan is a monthly invoice. Type Sekali bayar (One-off) with source SPK is an invoice from a work order. Type Sekali bayar with source Manual is created with **Buat tagihan**.
5. Click **Unduh PDF** to download a file named after the invoice number, for example `<nomor>.pdf`. The file opens in a new tab. The PDF holds the company name and address, "TAGIHAN" (INVOICE) and its number, the date, due date, period (monthly invoices), the status in capitals, "Kepada:" (To:) followed by the customer, address, "NPWP:" (tax ID) (if any), and the subscription code with the package name, the item table, Subtotal, PPN (VAT) and Diskon (if not zero), Total, Terbayar and Sisa (if an active payment exists), "Terbilang:" (In words:), and the "Pembayaran:" (Payment:) section with the content of **Rekening pembayaran** (Payment account) from Company settings ([section 8.1](/docs/guides/web/administration/company/)) if filled in. Dates in the PDF are written day/month/year. An invoice that has been issued prints the name, address, NPWP and package as they were at issue, even if the customer or package has since been renamed or moved. On the detail page, the **Detail** block shows the same Pelanggan, Alamat (Address), NPWP and Paket (Package), with "(saat terbit)" (at issue) next to the name if the current customer name differs. A draft follows the current data.
6. On a **Lunas** invoice, click **Unduh kuitansi** (permission `billing.pdf.view`). The file `Kuitansi-<nomor>.pdf` opens in a new tab. The receipt holds the company name and address, "KUITANSI PEMBAYARAN" (PAYMENT RECEIPT), "No. KWT/&lt;nomor tagihan&gt;" (No. KWT/&lt;invoice number&gt;), the settlement date, "Lunas", "Telah diterima dari:" (Received from:) followed by the customer, address, and "NPWP:" (if any), "Untuk pembayaran tagihan &lt;nomor&gt;" (For payment of invoice &lt;number&gt;) with the period and subscription code if any, the table of active payments (**Tanggal bayar** (Payment date), **Metode** (Method), **Referensi** (Reference), **Jumlah** (Amount)), "Total dibayar" (Total paid), and "Terbilang:". The receipt has no payment account block, does not include cancelled payments, and prints the order ID only for online payments: a **Referensi** that you typed yourself is not printed. An invoice that is not fully paid is rejected with "Kuitansi hanya untuk tagihan yang sudah lunas." (Receipts are only for invoices that are fully paid.) A receipt that the customer downloads from the app uses the same file.
7. The **Pembayaran online** card appears when Midtrans online payment is active or the invoice already has a payment attempt. Its table holds **Status**, **Jumlah**, **Metode**, **ID transaksi** (Transaction ID), **Dibuat**, and **Selesai** (Completed). **Metode** is written as staff call it, for example `VA BCA`, `Kartu •••• 1114`, `GoPay`, or `QRIS`, and is empty until the customer chooses a method. The customer pays through the customer app, and the payment reaches the invoice after Midtrans confirms it. An attempt has the status Menunggu (Pending), Lunas, Gagal (Failed), Kedaluwarsa (Expired), Perlu dicek (Needs checking), or Ditutup (Closed). **Ditutup** means Inbils itself closed the payment page because the invoice was already paid (cash or a transfer that you recorded, also partial, because the amount on that page no longer equals the balance) or was cancelled while the page was still open. The reason reads "Tagihan dibayar atau dibatalkan saat halaman pembayaran masih terbuka." (The invoice was paid or cancelled while the payment page was still open.) Inbils then asks Midtrans from a queue to cancel the transaction, so your cash payment stays recorded even when Midtrans is unreachable. A customer who still has a balance presses **Bayar** (Pay) again to get a new page. If money still arrives through a page that is already Ditutup and the invoice can no longer accept it (for example it is already paid), that attempt becomes Perlu dicek. An attempt that could not be booked (for example a different amount or a refund) has the status Perlu dicek, with "Alasan:" (Reason:) under its badge, and is not reversed automatically. The reason is in Indonesian, for example `Ditolak sistem deteksi penipuan` (Rejected by the fraud detection system), `Ditolak bank: ...` (Rejected by the bank: ...), `Dibatalkan di Midtrans` (Cancelled at Midtrans), `Gagal diproses Midtrans` (Failed to be processed by Midtrans), or `Halaman bayar kedaluwarsa sebelum pelanggan memilih metode` (Payment page expired before the customer chose a method). Users with the permission `billing.payment.reverse` cancel a payment that has already been recorded if the money really came back.
8. Under each attempt, click **Riwayat notifikasi Midtrans** (Midtrans notification history) to open up to the last five calls from Midtrans for that payment page, newest on top. Each row reads `Diterima <tanggal dan jam> · <status transaksi> · dijawab <kode>` (Received <date and time> · <transaction status> · answered <code>), with the answer code of Inbils. When there are five rows, it says "Notifikasi yang lebih lama tidak ditampilkan." (Older notifications are not shown.) An attempt that has received no call says "Tidak ada notifikasi tercatat." (No notifications recorded.) Use this history to check whether Midtrans has reported the customer's payment.
9. An attempt with the status **Menunggu** has the **Batalkan di Midtrans** button (permission `billing.payment.record`). The dialog **Batalkan pembayaran online?** (Cancel online payment?) says "Halaman bayar ini ditutup dan Midtrans diminta membatalkan transaksinya. Pelanggan tidak bisa lagi membayar lewat halaman itu, tetapi bisa membuka halaman bayar baru dari aplikasi." (This payment page is closed and Midtrans is asked to cancel its transaction. The customer can no longer pay through that page, but can open a new payment page from the app.) and shows **Jumlah**, **Dibuat** and **Metode**. Click **Batalkan di Midtrans** to continue. The toast "Pembatalan dikirim ke Midtrans." (Cancellation sent to Midtrans.) appears. If the payment page is no longer pending when you click, the dialog says "Hanya pembayaran yang masih menunggu yang bisa dibatalkan." (Only payments that are still pending can be cancelled.)

## Issuing monthly invoices

Permissions required: `billing.create`. The system also schedules the same issuing for the previous month every day at 02:00 UTC (09:00 WIB). This window can be used to check and issue a period of your choice.

1. Click **Buat tagihan bulanan**. The **Buat tagihan bulanan** window opens.
2. Fill in **Periode** with the month to invoice. This field is already filled with last month. Type the month (for example `Oktober 2026`, `10/2026`, or `2026-10`) or click **Buka pilihan bulan** (Open month picker) and choose from the 12 months of a year. The **Hapus bulan** (Clear month) button empties the field.

   ![Create monthly invoices window with the Periode field and the Batal and Lihat pratinjau buttons](~/assets/guide/web/invoices-generate.webp)
3. Click **Lihat pratinjau** (Preview). The window says `<n> tagihan akan dibuat, <m> dilewati.` (<n> invoices will be created, <m> skipped.) and shows a table with **Pelanggan**, **Paket** (Package), **Hari aktif** (Active days), and **Total**. **Hari aktif** is the active days compared with the number of days in the month (for example 15/30), and a value below the full month means a prorated invoice. **Total** already includes VAT.
4. Check the table. If you change **Periode**, the preview is cleared and you need to click **Lihat pratinjau** again. The **Batal** (Cancel) button closes the window without creating invoices.
5. Click **Buat &lt;n&gt; tagihan** (Create &lt;n&gt; invoices). This button exists only when the preview holds new invoices. If there are none, the table says "Tidak ada tagihan baru untuk periode ini." (No new invoices for this period.)
6. The toast `Tagihan <periode>: <n> dibuat, <m> dilewati.` (Invoices <period>: <n> created, <m> skipped.) appears (the period is written like `2026-06`) and the window closes.

What is created and what is skipped:

- Invoiced: subscriptions that are Aktif (Active) or Berhenti (Terminated) that were active at the end of the period and did not terminate before the start of the period. Menunggu and Ditangguhkan (Suspended) subscriptions are not included.
- Amount: the MRC of the subscription. A subscription that starts or ends in the middle of the month is invoiced pro rata by active days.
- Skipped: subscriptions that already have a monthly invoice for that period, **in any status, including Dibatalkan**, and subscriptions with an amount of 0. A period whose invoice you cancelled is not issued again, either by the daily schedule or by this button. If the customer really must be invoiced for that period, create a manual invoice (**Buat tagihan**). Running the same period again does not create duplicate invoices, even when two processes run at the same time. One subscription that fails to be processed does not stop the others: the toast adds ", &lt;n&gt; gagal" (, &lt;n&gt; failed) and the daily schedule notifies the company admin.
- Each new invoice uses an automatic number ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)), has type Berlangganan, source Langganan, and gets the status **Belum dibayar** at once. There is no **Draf** stage, so the preview is the only check.
- **Tanggal terbit** is today. **Jatuh tempo** is today plus the **Jatuh tempo tagihan** (Invoice due days) field (default 14 days). VAT uses the **Tarif PPN** (VAT rate) field (default 11). Both are set in Company settings ([section 8.1](/docs/guides/web/administration/company/)).
- One item reads `MRC <nama paket> <tanggal awal> s/d <tanggal akhir>` (MRC <package name> <start date> to <end date>), plus ` (prorata <hari aktif>/<hari dalam bulan> hari)` ( (pro rata <active days>/<days in month> days)) when prorated. Dates in the item text are written year-month-day.

## Creating a manual invoice

Permissions required: `billing.create`. Use a manual invoice for charges outside the monthly subscription. The invoice data and its items are filled in on one form.

1. Click **Buat tagihan**. The **Buat tagihan** page opens with the **Data tagihan** (Invoice data) card and the **Item** card.
2. In the **Data tagihan** card, fill in:
   - **Pelanggan**: required. Search box ("Cari nama atau kode pelanggan" (Search customer name or code)): type at least 2 letters, then choose from the results. The results are active customers only, at most 20.
   - **Langganan (opsional)** (Subscription (optional)): search box ("Cari kode langganan" (Search subscription code)). Choose **Pelanggan** first. The list then holds only the Menunggu and Aktif subscriptions of that customer, and the list is empty if that customer has no such subscription. If the customer has only one such subscription, it is selected automatically. Type at least 2 letters of the subscription code or customer name, then choose. The customer name appears under the subscription code. If you change **Pelanggan**, this field is cleared and the list changes to the subscriptions of the new customer. Before **Pelanggan** is chosen, the list holds the subscriptions of all customers. The server rejects a subscription that belongs to another customer.
   - **Tanggal terbit**: optional, date picker. Type the date in the company date format or click **Buka kalender** (**Pilih tanggal** (Choose date), **Hari ini**, **Hapus tanggal** (Clear date)). Empty means today.
   - **Jatuh tempo**: already filled with as many days as the **Jatuh tempo tagihan** field in Company settings (0 to 365 days, default 14, [section 8.1](/docs/guides/web/administration/company/)) after the issue date, or after today if **Tanggal terbit** is empty. The hint under the field says "Otomatis {n} hari setelah tanggal terbit. Ubah jika perlu." (Automatic {n} days after the issue date. Change if needed.) As long as you have not changed it yourself, **Jatuh tempo** shifts when you change **Tanggal terbit**. Below it there is **Pilihan cepat** (Quick choices): **7 hari** (7 days), **14 hari** (14 days), and **Akhir bulan** (End of month). All three are counted from the issue date (today if empty). **Jatuh tempo** must not be before the issue date.
   - **Catatan**: optional, at most 5000 characters.

   ![Create invoice form with the Data tagihan card holding Pelanggan, Langganan (opsional), Tanggal terbit, Jatuh tempo and Catatan, and the Item card](~/assets/guide/web/invoices-create.webp)
3. In the **Item** card, fill in the first row. The card says "Setiap baris dikenai PPN {n}% sesuai pengaturan perusahaan, dihitung per baris dan dibulatkan ke rupiah." (Every row is charged {n}% VAT according to the company settings, calculated per row and rounded to the rupiah.) There is no tax or discount field per row.
   - **Deskripsi**: required when the row is filled, at most 500 characters.
   - **Kuantitas** (Quantity): a number from 0,01 to 100000 with at most two digits after the decimal comma. It starts at 1.
   - **Harga satuan**: a rupiah amount, 0 or more.
   - **Total baris**: calculated automatically as quantity times price, rounded to the rupiah.
4. Click **Tambah item** for the next row (at most 20 items per invoice), or **Hapus** on a row to remove it. A row whose **Deskripsi** and **Harga satuan** are empty is not saved. Once there are items, the bottom right of the card shows **Subtotal**, **PPN** with its rate, and **Total**. Without items, the card says "Belum ada item terisi. Tagihan tetap bisa disimpan sebagai draf kosong, tetapi baru bisa dikirim setelah punya item." (No items filled in yet. The invoice can still be saved as an empty draft, but it can only be sent after it has items.)
5. Click **Simpan** (Save). The toast "Tagihan dibuat." (Invoice created.) appears and you return to the list. The new invoice has the status **Draf**, type Sekali bayar, source Manual, with the total of its items (0 without items) and an automatic number from **Penomoran** (Numbering) ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)). **Batal** and **Kembali** close the form without saving.
6. Find that invoice with **Cari tagihan** or the **Pelanggan** filter, then click **Lihat** to check, edit or send it.

## Editing a draft invoice, adding items and sending

Permissions required: `billing.update`, or `billing.create` for the creator of that draft, for **Ubah** and **Tambah item**, and `billing.send` for **Kirim tagihan**. Only **Draf** invoices can be edited or given items.

1. Open the detail of a **Draf** invoice. Click **Ubah** at the top right if the due date, discount or notes need to change (steps below). Click **Tambah item** in the **Aksi** card if items need to be added.
2. Fill in the **Tambah item** window:
   - **Deskripsi**: required, at most 500 characters.
   - **Kuantitas**: required, a number of at least 0,01. It starts at 1.
   - **Harga satuan**: required, a number of at least 0.
   - **Diskon**: optional, a rupiah amount per row (not a percentage), at least 0. It starts at 0.
   - Under the fields, the window says "Pajak PPN {n}% mengikuti pengaturan perusahaan, dihitung per baris." (VAT tax {n}% follows the company settings, calculated per row.) There is no tax field.
3. Click **Simpan**. The toast "Item ditambahkan." (Item added.) appears, then the **Item** table and the **Ringkasan** card are recalculated. Repeat for the next item. A rejected field gets a red message under it, for example "Deskripsi wajib diisi." (Description is required.), "Kuantitas wajib diisi." (Quantity is required.), or "Harga satuan wajib diisi." (Unit price is required.).
4. Check the **Total** in the **Ringkasan** card, then click **Kirim tagihan**. The dialog **Kirim tagihan {nomor}?** (Send invoice {number}?) shows the customer, the amount and the due date, and says the customer receives a notification in the app (and WhatsApp if active) and the items can no longer be changed. Click **Kirim tagihan** in the dialog. The toast "Tagihan dikirim." (Invoice sent.) appears and the status becomes **Belum dibayar**.

Per row, **Total baris** is **Kuantitas** times **Harga satuan** minus **Diskon**. The row tax is **Total baris** times the company VAT rate divided by 100. **Total** is the sum of **Total baris** plus the sum of the tax, minus the invoice discount if any.

- Tax is not filled in per row. Every row, also on monthly invoices and invoices from work orders, uses the **Tarif PPN** in Company settings (0 to 100, [section 8.1](/docs/guides/web/administration/company/)). The rate in force when the row is created is stored on that row and appears in the **Pajak** column of the **Item** table, so changing the company rate does not change old rows.
- Draft items cannot be edited. Click **Hapus** in the **Item** table, confirm **Hapus item {deskripsi}?** (Delete item {description}?) ("Total tagihan dihitung ulang tanpa item ini." (The invoice total is recalculated without this item.)), then add it again with the correct values. The toast "Item dihapus." (Item deleted.) appears. After **Kirim tagihan**, items cannot be added. The server rejects it with "Hanya tagihan draf yang bisa diberi item." (Only draft invoices can be given items.) If the content of a sent invoice is wrong, cancel that invoice (see below) and create it again.
- **Kirim tagihan** is disabled while the draft has no items or its total is Rp 0. The hint says "Tambahkan minimal satu item sebelum mengirim." (Add at least one item before sending.) The server also rejects that state with "Tagihan tanpa item atau bernilai Rp 0 tidak bisa dikirim." (An invoice without items or worth Rp 0 cannot be sent.)
- After **Kirim tagihan**, the customer sees the invoice in the customer app. The customer also receives the WhatsApp message "Tagihan terbit" (Invoice issued) if WhatsApp is active in Company settings ([section 8.1](/docs/guides/web/administration/company/)), that message type is ticked, and the customer has consented to WhatsApp messages.

To change the data of a draft:

1. Click **Ubah** on the draft detail page. The **Ubah tagihan {nomor}** (Edit invoice {number}) page opens. The **Draf saat ini** (Current draft) card shows Pelanggan, Langganan, Tanggal terbit, Total saat ini (Current total), and an item table (**Deskripsi**, **Jml**, **Total baris**) that is read-only. The **Kelola item di halaman tagihan** (Manage items on the invoice page) link returns to the detail.

   ![Edit invoice page with the Draf saat ini card and the Yang bisa diubah card holding Jatuh tempo, Diskon and Catatan](~/assets/guide/web/invoices-edit.webp)

2. In the **Yang bisa diubah** (What can be changed) card, fill in:
   - **Jatuh tempo**: must not be before the issue date ("Jatuh tempo tidak boleh sebelum tanggal terbit." (The due date must not be before the issue date.)).
   - **Diskon**: a rupiah amount for the whole invoice. The hint: "Dikurangkan dari subtotal ditambah pajak. Total dihitung ulang saat disimpan." (Deducted from the subtotal plus tax. The total is recalculated on save.) The discount must not exceed the subtotal plus tax ("Diskon tidak boleh melebihi subtotal ditambah pajak." (The discount must not exceed the subtotal plus tax.)). A field that is emptied counts as 0.
   - **Catatan**: optional, at most 5000 characters.
3. Click **Simpan**. The toast "Tagihan diperbarui." (Invoice updated.) appears and you return to the list. **Batal** returns to the detail page without saving.

The customer, subscription and issue date cannot be changed. If the invoice is not a draft, the detail page appears with the message "Hanya tagihan draf yang bisa diubah." (Only draft invoices can be edited.) If someone else saves the same draft first, the page shows a warning with "Muat ulang halaman untuk melihat data terbaru, lalu ulangi perubahan Anda." (Reload the page to see the latest data, then repeat your changes.) and a **Muat ulang** (Reload) button.

## Recording a payment

Permissions required: `billing.payment.record`. Only **Belum dibayar**, **Dibayar sebagian** and **Lewat jatuh tempo** invoices have a balance and accept payments.

1. Open the invoice detail, then click **Catat pembayaran**. The window says "Sisa tagihan:" (Invoice balance:) followed by the balance.

   ![Record payment window with the invoice balance and the Jumlah, Metode, Referensi and Catatan fields](~/assets/guide/web/invoices-payment.webp)
2. Fill in the form:
   - **Jumlah**: required, a number greater than zero and not greater than the balance. A partial payment is allowed. This field starts with the invoice balance, with the hint "Sisa tagihan: Rp ..." (Invoice balance: Rp ...). If you change it, the **Lunas penuh** (Paid in full) button appears to set the amount back to the balance.
   - **Tanggal bayar**: filled with today. Change it if the money was received before today. The date must not be after today ("Tanggal bayar tidak boleh setelah hari ini." (The payment date must not be after today.)) and must not be before the invoice issue date ("Tanggal bayar tidak boleh sebelum tanggal terbit tagihan." (The payment date must not be before the invoice issue date.)). A back-dated payment goes into the report of the day you choose, with the time at which you record it.
   - **Metode**: choose **Tunai** (Cash), **Transfer**, **Cek** (Cheque), or **Lainnya** (Other). It starts with the method you last used in this browser, or **Tunai** if there is none. Midtrans methods are written only by the system for online payments and are not in this choice.
   - **Referensi**: optional, at most 255 characters (transfer or cheque number). It must not equal the reference of another active payment in the company.
   - **Catatan**: optional, at most 500 characters.
3. Click **Simpan**. The toast "Pembayaran dicatat." (Payment recorded.) appears and the payment enters the **Pembayaran** table with the status **Aktif**.

The **Pembayaran** table keeps the payment history: **Jumlah**, **Metode**, **Referensi**, **Dibayar pada** and **Status**. A cancelled payment still appears, with the status **Dibatalkan**.

The recorder is saved automatically. The status becomes **Lunas** when the sum of active payments equals **Total**, otherwise **Dibayar sebagian**. A payment cannot be edited or deleted. Correct a wrong entry with **Batalkan pembayaran**, then record it again. The customer also receives the WhatsApp message "Pembayaran diterima" (Payment received) under the same three conditions as "Tagihan terbit" above. Every payment you record, also a partial one, closes the online payment page that is still open (status **Ditutup**), because the amount on that page no longer equals the balance. If an online page is still open, the **Catat pembayaran** window first shows the warning "Ada pembayaran online yang masih terbuka" (There is an online payment that is still open) that states the order number and its time, and that the page will be closed. If the customer still pays through that page, the money goes into the **Perlu dicek** list in Arrears ([section 7.2](/docs/guides/web/finance-and-reports/arrears/)). A customer who still has a balance opens a new page with **Bayar**.

## Cancelling a payment

Permissions required: `billing.payment.reverse`. This cancellation is also called reversing a payment. The recorder of a payment may not cancel it. Another user with the same permission cancels it.

1. In the **Pembayaran** table, click **Batalkan pembayaran** on the row of a payment with the status **Aktif**. The button does not appear without the permission.
2. Read the explanation in the **Batalkan pembayaran** window: "Membatalkan pembayaran mengurangi jumlah terbayar pada tagihan dan menghitung ulang statusnya. Pembayaran ditandai dibatalkan beserta pelakunya." (Cancelling a payment reduces the paid amount on the invoice and recalculates its status. The payment is marked as cancelled together with who did it.) Fill in **Alasan** (Reason): required, at most 500 characters.
3. Click **Konfirmasi pembatalan** (Confirm cancellation). The toast "Pembayaran dibatalkan." (Payment cancelled.) appears and that row has the status **Dibatalkan**. The **Kembali** button closes the window without cancelling.

After the cancellation, the invoice becomes **Belum dibayar** if no active payment remains, **Lunas** if the active payments still cover **Total**, and **Dibayar sebagian** otherwise. A Midtrans payment is recorded by the system, not by a user, so anyone with the permission can cancel it.

For a **Lunas** invoice, the **Batalkan tagihan** button is not there. Cancel its payments until the status returns to **Belum dibayar**, then cancel the invoice if it is really needed.

## Cancelling an invoice

Permissions required: `billing.cancel`. A cancellation cannot be undone.

1. Open the invoice detail, then click **Batalkan tagihan** in the **Aksi** card. The button is not there for **Lunas** and **Dibatalkan** invoices. It also appears for **Dibayar sebagian** invoices, but the server rejects it (see below).
2. In the **Batalkan tagihan** window, fill in **Alasan**: required, at most 500 characters.
3. Click **Konfirmasi pembatalan**. The toast "Tagihan dibatalkan." (Invoice cancelled.) appears, the status becomes **Dibatalkan**, and the reason appears in the **Detail** card as **Alasan pembatalan** (Cancellation reason). The **Kembali** button closes the window without cancelling.

The system rejects the cancellation if the invoice still has an active payment ("Tagihan yang punya pembayaran aktif tidak bisa dibatalkan. Batalkan pembayarannya dulu." (An invoice that has an active payment cannot be cancelled. Cancel its payments first.)). Cancel all its payments first, also on a **Lunas** invoice. The system also rejects it if you are the creator of that invoice ("Tagihan yang Anda buat sendiri tidak bisa Anda batalkan." (You cannot cancel an invoice that you created yourself.)).

- The creator of a manual invoice is the user who clicked **Simpan** on the **Buat tagihan** form.
- The creator of an invoice from a work order is the approver of the work order.
- An invoice produced by **Buat tagihan bulanan** has no creator, so anyone with the permission can cancel it.
- A cancelled monthly invoice locks its period: the next issuing for that period, from the daily schedule or from **Buat tagihan bulanan**, skips it and does not create a new invoice. An invoice cancelled by mistake must be replaced with a manual invoice (**Buat tagihan**).
- Cancelling an invoice also closes the online payment page that is still open (status **Ditutup** in the **Pembayaran online** card). Cancelling a **Draf** freezes the customer name, address, NPWP and package in force at that time, like a sent invoice.

## The page after an online payment

A customer who pays from the customer app is returned to the public page `/pembayaran/selesai` after Midtrans finishes. This page does not show the order number, amount or name, and does not change the invoice: the status is still decided by the invoice in the app and in Inbils. Its title follows the transaction status carried by the address from Midtrans:

- **Pembayaran berhasil** (Payment successful): "Tagihan ditandai lunas begitu Midtrans mengonfirmasi pembayaran. Lihat statusnya di aplikasi Inbils." (The invoice is marked paid as soon as Midtrans confirms the payment. See its status in the Inbils app.)
- **Menunggu pembayaran** (Waiting for payment): "Selesaikan pembayaran lewat metode yang Anda pilih. Tagihan ditandai lunas setelah pembayaran diterima." (Complete the payment with the method you chose. The invoice is marked paid after the payment is received.)
- **Pembayaran tidak berhasil** (Payment unsuccessful): "Coba lagi dari aplikasi." (Try again from the app.) This applies to payments that were rejected, cancelled, expired or failed.
- **Pembayaran sedang diproses** (Payment is being processed): "Silakan kembali ke aplikasi Inbils untuk melihat status tagihan." (Please return to the Inbils app to see the invoice status.) This page appears when the address carries no known status.

The **Buka aplikasi Inbils** (Open the Inbils app) button appears when the platform operator has filled in the Play Store link of the customer app, or when the page is opened on an Android phone. A customer who asks whether the payment arrived needs to look at the invoice in the app, or you check the **Riwayat notifikasi Midtrans** in the invoice detail.

![Page after an online payment with the title Pembayaran berhasil and a note below it](~/assets/guide/web/payment-finished.webp)

## Viewing invoices from work orders (SPK)

One-off invoices are created only from the approval of an **Instalasi** (Installation) work order (SPK) that has a charge to invoice.

1. Approve an **Instalasi** work order that is awaiting review. The work order status becomes **Selesai**.
2. The system creates an invoice if the subscription has an installation fee greater than Rp 0, or if **Tagihkan bahan terpakai** (Invoice used materials) is active and the work order has used materials. The package fee becomes the row **Biaya pemasangan** (Installation fee). Each material becomes **Bahan terpakai: {nama barang}** (Used material: {item name}).
3. If **Kirim tagihan pemasangan otomatis** (Send installation invoice automatically) is active, the invoice becomes **Belum dibayar** at once. If it is off, the invoice stays **Draf**, billing staff receive a notification, and the card **Tagihan draf menunggu dikirim** (Draft invoices waiting to be sent) appears on the Finance Dashboard.
4. For a draft, open **Tagihan**, check the items, add or delete items if needed, then click **Kirim tagihan**. A draft without items or with a total of Rp 0 cannot be sent.

One work order has at most one invoice. **Perawatan** (Maintenance), **Peningkatan layanan** (Service upgrade) and **Pindah lokasi** (Relocation) work orders do not create an invoice through this installation flow.

## Monitoring due dates and automatic isolir

- Every day at 03:00 UTC (10:00 WIB), **Belum dibayar** and **Dibayar sebagian** invoices whose due date has passed and still have a balance become **Lewat jatuh tempo**.
- When WhatsApp is active, the customer receives reminders 3 days and 1 day before the due date, and 1 day after it. This message is named "Pengingat jatuh tempo (H-3, H-1, H+1)" (Due date reminder (D-3, D-1, D+1)) in Company settings and is sent every day at 01:00 UTC (08:00 WIB). Staff can also send a reminder at any time with **Kirim pengingat** (Send reminder) in Arrears ([section 7.2](/docs/guides/web/finance-and-reports/arrears/)), at most once a day for one invoice.
- Automatic isolir (internet blocked while the account is suspended) stays off until an admin turns on the **Tangguhkan langganan yang menunggak** (Suspend subscriptions in arrears) switch in the **Penangguhan otomatis** (Automatic suspension) card in Company settings ([section 8.1](/docs/guides/web/administration/company/)). **Batas keterlambatan** (Lateness limit) sets the day limit (default 7, field 1 to 60).
- Every day at 08:00 UTC (15:00 WIB), Active subscriptions that have an unpaid invoice with a due date more than the day limit ago are put under isolir (status Ditangguhkan, source arrears). Exactly at the day limit is not yet isolir, one day longer is. The isolir reason that the system writes itself is in English ("Automatic isolir: an invoice is more than N days past due.").
- The customer loses their service. A network account synchronised to RADIUS enters the isolir group of the company and its session is disconnected ([chapter 5](/docs/guides/web/network/locations/)). A Ditangguhkan subscription is no longer invoiced monthly.
- A payment lifts the automatic isolir when the switch **Aktifkan kembali saat tagihan lunas** (Reactivate when invoice is paid) is on (default on), that subscription is Ditangguhkan with source arrears, its invoices that were overdue at the time of isolir are paid, and no invoice is past the day limit. A partial payment is not enough, and the process runs through a queue.
- Manual isolir is not lifted automatically. A block is also not lifted by a payment ([section 7.2](/docs/guides/web/finance-and-reports/arrears/)).
- Sending, draft changes, payments, payment cancellations, manual reminders, cancellations at Midtrans and invoice cancellations are recorded in the Log Audit (Audit log) ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)).

## Common errors

- Staff press **Tambah item**, **Ubah** or **Batalkan tagihan** and are rejected (403). Those actions need `billing.update` (except on a draft they created themselves, where `billing.create` is enough) and `billing.cancel`. Ask an admin or manager to do it.
- The toast "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.) in the **Tambah item**, **Catat pembayaran**, **Batalkan tagihan** or **Batalkan pembayaran** window means a field was rejected. Its red message appears under that field, for example "Alasan pembatalan wajib diisi." (A cancellation reason is required.) or "Jumlah wajib diisi." (Amount is required.). Correct the field and save again.
- A **Jumlah** greater than the balance is rejected (422 error, "Jumlah pembayaran melebihi sisa tagihan." (The payment amount exceeds the invoice balance.)). A **Referensi** equal to that of another active payment is also rejected ("Referensi pembayaran sudah ada." (The payment reference already exists.)). Correct the field. An invoice whose status does not accept payments is rejected with "Tagihan tidak menerima pembayaran pada statusnya saat ini." (The invoice does not accept payments in its current status.)
- A cancellation or payment cancellation by its creator is rejected ("Tagihan yang Anda buat sendiri tidak bisa Anda batalkan.", "Pembayaran yang Anda catat sendiri tidak bisa Anda batalkan." (You cannot cancel a payment that you recorded yourself.)). Ask another user with the same permission.
- Cancelling an invoice is rejected if there is an active payment ("Tagihan yang punya pembayaran aktif tidak bisa dibatalkan. Batalkan pembayarannya dulu."). Cancel its payments first. If the invoice or payment is already cancelled, the server answers "Tagihan sudah dibatalkan." (The invoice is already cancelled.) or "Pembayaran sudah dibatalkan." (The payment is already cancelled.).
- A draft without items or with a **Total** of Rp 0 cannot be sent. Add items worth more than Rp 0 before **Kirim tagihan**.
- The monthly invoice period must not go past the current month. For the current month, the preview shows a warning and the create button becomes active after you tick **Saya mengerti, buat tagihan periode berjalan** (I understand, create invoices for the current period). Next month is rejected with "Periode tagihan paling lambat bulan berjalan." (The invoice period can be at most the current month.).
- **Langganan (opsional)** is empty again after you change **Pelanggan**. This is intentional because the subscription list follows the customer. Choose the subscription again. If the server rejects saving with the red message "langganan yang dipilih tidak sesuai dengan pelanggan yang dipilih." (the chosen subscription does not match the chosen customer.), that subscription belongs to another customer: choose the right customer or empty the field. The message "Langganan yang dipilih tidak ditemukan." (The chosen subscription was not found.) means that subscription does not belong to this company or has been deleted.
- The **Ubah** page cannot be opened for an invoice that has been sent: the detail page appears with the message "Hanya tagihan draf yang bisa diubah." For a sent invoice, only cancellation is available.
- Saving on the **Ubah** page is rejected with "Diskon tidak boleh melebihi subtotal ditambah pajak." if the discount is larger than the subtotal plus tax. Reduce the discount, or add items first.
- The **Jatuh tempo** of a manual invoice is filled from the **Jatuh tempo tagihan** field in Company settings, counted from **Tanggal terbit**. That date must not be before the issue date ("Jatuh tempo tidak boleh sebelum tanggal terbit.").
- Monthly invoices use the **Jatuh tempo tagihan** field in Company settings ([section 8.1](/docs/guides/web/administration/company/)). The invoice number prefix is set in **Penomoran** ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)).
