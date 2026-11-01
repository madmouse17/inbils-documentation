---
title: "2.1 Queue cards"
description: "Read the Dashboard queue cards that show today's tickets, work orders, approvals, stock and invoices, and open each queue with its filter."
---

The Dashboard is the first page after you sign in. It shows the queues and exceptions you need to handle today. Each card shows a live number for the company that is currently active. Clicking a card opens its target menu with the filter already applied. In Tickets and Stock, that filter is not shown on screen (see Common errors below).

Roles that can use it: all web accounts with the permission `dashboard.view` (**Lihat dasbor** (View dashboard); admin, manager, staff). A card appears only if your role may work that queue. A card that is not shown means the queue is not your task, not that its number is zero.

## Reading the cards

1. Click **Dasbor** (Dashboard) in the sidebar. The Dashboard also opens automatically after you sign in.

   ![Admin Dashboard with the title Dasbor, queue cards on the left including the card Jatuh tempo ≤ 3 hari (Due in ≤ 3 days), and the Notifikasi (Notifications) panel on the right](~/assets/guide/web/dashboard.webp)

2. Read the cards group by group: **Operasional** (Operations), **Persetujuan** (Approvals), **Gudang** (Warehouse), **Keuangan** (Finance). Groups that are not relevant for your role are not shown.
3. Look at the marker at the top right of a card. **Perlu tindakan** (Needs action) (yellow) and **Segera tangani** (Handle now) (red) appear only if the number is above zero, and only on cards that flag exceptions. The **Pekerjaan saya** (My work) and **Antrean permintaan gudang** (Warehouse request queue) cards have no marker. A zero is shown in grey with the text "Tidak ada yang perlu ditangani." (Nothing needs handling.)
4. Click a card to open its target menu.
5. On the **SLA terlampaui** (SLA exceeded) card, look at the list of up to five tickets under the number. Each row holds the ticket code, a priority badge (**Mendesak** (Urgent), **Tinggi** (High), **Sedang** (Medium), **Rendah** (Low)), the title, and "Batas SLA" (SLA limit) with a date and time. The ticket with the oldest SLA limit is shown at the top. If there are more than five tickets, Inbils writes "Menampilkan 5 dari N tiket, batas SLA terlama lebih dulu." (Showing 5 of N tickets, oldest SLA limit first.) Click a row to open its ticket.

## List of cards

| Card | What is counted | Opens to | Appears for |
| --- | --- | --- | --- |
| Pekerjaan saya (My work) | Work orders (SPK) and tickets assigned to you. Breakdown: **Belum dimulai** (Not started), **Dikerjakan** (In progress), **Menunggu tindakan** (Awaiting action) | **Pekerjaan Saya** (My Work) (3.6) | Holders of a field work permission (**Mulai SPK** (Start work order), **Kirim SPK untuk ditinjau** (Submit work order for review), **Mulai menangani tiket** (Start handling ticket), **Selesaikan tiket** (Complete ticket), or **Tutup tiket** (Close ticket)) who have an active employee profile |
| Belum ditugaskan (Unassigned) | Tickets and work orders with no assignee. Breakdown: **Tiket** (Tickets), **SPK** | **Penugasan** (Dispatch) (3.1), with **Status penugasan** (Dispatch status) set to **Belum ditugaskan** | Active users with the permission **Tugaskan tiket** (Assign ticket), **Tugaskan ulang tiket** (Reassign ticket), **Tugaskan SPK** (Assign work order), or **Tugaskan ulang SPK** (Reassign work order) |
| SLA terlampaui (SLA exceeded) | Unfinished tickets that are past their SLA limit | **Tiket** (Tickets) (3.4), the list contains only tickets past the SLA limit. The Tickets screen has no chip for this | Holders of `ticket.view` who also assign, work, or report on ticket SLA |
| Menunggu persetujuan saya (Awaiting my approval) | Work orders and item requests waiting for your decision. If you are the creator of a work order awaiting review, the grey line under the number writes "{n} SPK menunggu admin (Anda pembuatnya)" ({n} work orders awaiting an admin (you created them)), because those work orders are not counted | **Persetujuan** (Approvals) (3.2) | Holders of the permission **Setujui SPK** (Approve work order), **Tolak SPK** (Reject work order), **Setujui permintaan barang** (Approve item request), or **Tolak permintaan barang** (Reject item request) |
| Antrean permintaan gudang (Warehouse request queue) | Item requests in the warehouse queue that you can act on now: approve, prepare or hand over. Breakdown: **Seluruh antrean** (Whole queue), the total of the whole warehouse queue | **Permintaan Barang** (Item requests) (6.1), tab **Persiapan & Antrean Gudang** (Preparation and Warehouse Queue) | Holders of `inventory.request.view.all` who may also approve, prepare or issue item requests |
| Antrean retur material (Material return queue) | Material returns waiting to be processed. Breakdown: **Pengecualian** (Exceptions) | **Permintaan Barang**, tab **Antrean Pengembalian** (Returns Queue) (6.8) | Holders of `inventory.return.view.all` who may also receive or settle returns, and may open Item requests |
| Stok di bawah minimum (Stock below minimum) | Stock rows (one item at one location) whose quantity is equal to or below the minimum stock | **Stok** (Stock) (6.5), the list contains only low-stock rows. The Stock screen has no filter control for this | Holders of `inventory.view` |
| Tagihan jatuh tempo (Invoices past due) | Open invoices past their due date that still have a balance. Breakdown: **Terutang** (Outstanding) | **Tagihan** (Invoices) (7.1), with **Status** set to **Lewat jatuh tempo** (Overdue) | Holders of `billing.view` |
| Jatuh tempo ≤ 3 hari (Due in ≤ 3 days) | **Belum dibayar** (Unpaid) or **Dibayar sebagian** (Partially paid) invoices that still have a balance and are due from today up to 3 days ahead, by the company calendar | **Tagihan** (7.1), with the filter chip **Jatuh tempo ≤ 3 hari** switched on | Holders of `billing.view` |
| Tagihan draf menunggu dikirim (Draft invoices waiting to be sent) | The company's draft invoices and their total value | **Tagihan** (7.1), with **Status** set to **Draf** (Draft) | Holders of `billing.send` |
| Hampir terlampaui (≤ 30 menit) (Almost exceeded, ≤ 30 minutes) | Unfinished tickets whose response target (if not yet answered) or resolution target falls due within the next 30 minutes | **Tiket** (3.4), chip **Hampir terlampaui** switched on | Same as the **SLA terlampaui** card |
| Pelanggan membalas (Customer replied) | Unfinished tickets whose last reply (not an internal note) was written by the customer, so no staff member has answered yet | **Tiket**, chip **Pelanggan membalas** switched on | Same as the **SLA terlampaui** card |
| Pembayaran online bermasalah (Problem online payments) | Online payments whose money has reached Midtrans but could not be booked, or that were refunded. The number equals the red warning in Arrears | **Tunggakan** (Arrears) (7.2), section **Pembayaran online yang perlu dicek** (Online payments to check) | Holders of `billing.view` and `billing.payment.record` |
| Pembayaran online tertunda > 1 jam (Online payments pending > 1 hour) | Invoices whose online payment page was opened more than an hour ago, has not expired, and is unpaid. One invoice is counted once | **Tagihan** (7.1), chip **Pembayaran online tertunda > 1 jam** switched on | Holders of `billing.view` and `billing.payment.record` |

## The "Mulai dari sini" checklist

A company admin (holder of `company.manage`) sees the **Mulai dari sini** (Start here) card above all queue cards as long as steps remain unfinished. The card has a progress bar "{n} dari {total} langkah selesai" ({n} of {total} steps done) and one row per step:

| Step | Done when | Opens to |
| --- | --- | --- |
| Lengkapi profil perusahaan (Complete the company profile) | the company address and phone are filled in | Company profile (8.1) |
| Atur wilayah peta (Set the map area) | the city or map point in Settings is filled in | Settings, section **Peta** (Map) |
| Tambah POP (Add a POP) | there is an active POP location | Locations (5.1) |
| Atur paket layanan (Set up service packages) | there is an active service package | Service packages (4.2) |
| Tambahkan pengguna (Add users) | there is more than one active user who is not a customer app account | Users (8.5) |
| Daftarkan pelanggan pertama (Register the first customer) | there is one customer | Add customer (4.1) |
| Atur penagihan otomatis (Set up automatic billing) | Company settings have been saved once since automatic invoices were offered | Settings, section **Tagihan** (Invoices) |

A finished step is shown with a tick. An unfinished step is a link to the page that does it. Inbils ticks from the stored data, so there is no button to tick or hide a step. A step whose page you may not open is not shown. The card disappears by itself once all steps are done.

This card also writes one line about document code prefixes, for example "Kode dokumen dimulai dengan Tiket TKT, Tagihan INV, SPK SPK." (Document codes start with Ticket TKT, Invoice INV, SPK SPK.) That line shows the prefixes your company currently uses for tickets, invoices and work orders, before the first record is created. Prefixes are changed in Numbering ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)).

## Common errors

- A card number differs from the list in the target menu: check the active company ([section 1.6](/docs/guides/web/introduction/switch-company/)). The card and the list use the same counting rules for the active company, except the **Tagihan jatuh tempo** card (bullet below).
- A Tickets or Stock list opened from a card contains only some of the rows, and the screen does not show the active filter. Open that menu from the sidebar to see all rows.
- The **Tagihan jatuh tempo** card is counted from the due date and the remaining balance. The **Lewat jatuh tempo** filter in Invoices uses the invoice status, which is updated automatically every day at 03:00 UTC (10:00 WIB). Until that update runs, the list can hold fewer invoices than the card.
- The **Menunggu persetujuan saya** card does not count work orders you created or assigned to yourself, nor item requests you submitted yourself. The separation of duties rule forbids you from approving them ([section 3.2](/docs/guides/web/operations/approvals/)). For work orders you created yourself, the card writes the grey line "{n} SPK menunggu admin (Anda pembuatnya)", so a 0 does not make you think nothing is waiting.
- The **Antrean permintaan gudang** card number is smaller than the number of rows in the **Persiapan & Antrean Gudang** tab: the card counts only requests you can act on now, and does not count those waiting for someone else or forbidden by the separation of duties rule (a requester does not decide or hand over their own request, and an approver does not prepare or hand it over). The **Seluruh antrean** row on the card writes the total of the whole queue.
- The **SLA terlampaui** number is smaller than you expect: holders of the permission to work tickets who may not assign count only the tickets assigned to them.
- The **Pekerjaan saya** card is missing although you have the permission: your account needs an active employee profile in this company ([section 8.3](/docs/guides/web/administration/employees/)).
- An empty Dashboard with the title "Belum ada antrean untuk akun Anda" (There are no queues for your account yet): your role has no permission for any queue yet. Contact an admin to add permissions.
- The **Akses ditolak** (Access denied) page when opening the Dashboard: your role does not hold the permission `dashboard.view`.
