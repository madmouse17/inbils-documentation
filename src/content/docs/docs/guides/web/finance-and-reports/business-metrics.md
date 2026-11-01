---
title: "7.4 Business metrics (Metrik Bisnis)"
description: "Check recurring revenue, paid invoice revenue, receivables, subscriptions and SLA compliance, and trace each figure to its source records."
---

Metrik Bisnis (Business metrics) summarises recurring revenue, paid invoice revenue, receivables, subscriptions and SLA compliance. Open this report to check the state of the active company's business and trace the source records.

Roles that can use it: admin, manager, staff. Permissions: `report.business.view`. The **Ekspor** (Export) button requires `report.export`.

## Opening and reading the report

1. Open **Laporan** (Reports), then click **Metrik Bisnis**. The report shows at once for all dates and all categories.
2. Select a **Periode** (Period), then click **Tampilkan** (Show). The header shows **Versi rumus** (Formula version) `business.v1`.

   ![Business metrics page with Formula version, Period and Package category fields, the Show button, and the MRR, Paid revenue and Receivables cards](~/assets/guide/web/reports-business.webp)

   Also select a **Kategori paket** (Package category): leave it empty for **Semua kategori** (All categories), or click the field and select one category ([section 4.2](/docs/guides/web/customers-and-services/service-packages/)). You can filter the list by typing. The **Hapus pilihan: Kategori paket** (Clear selection: Package category) button returns to all categories. This choice limits MRR, revenue, receivables, subscription counts, installations, and the invoice and MRR charts to the packages of that category. An inactive category shows with the text `(nonaktif)` (inactive). Assets and SLA are not affected. One-off invoices without a subscription belong to no category. The **Lihat data** (View data) links and the export file follow the selected category.

3. Read the six cards. Money cards write the figure in short form, and hovering the pointer shows the exact rupiah amount.
   - **MRR** adds up the monthly fee of all subscriptions that currently have the status Aktif (Active). This figure is the **Posisi saat ini** (Current position).
   - **Pendapatan terbayar** (Paid revenue) adds up the paid amount of invoices with the status Lunas (Paid), by issue date within the **Periode**. Invoices that are only partly paid are not included.
   - **Piutang** (Receivables) adds up the total minus the paid amount on invoices with the status Belum dibayar (Unpaid), Dibayar sebagian (Partially paid) or Lewat jatuh tempo (Overdue). This figure is the **Posisi saat ini**.
   - **Langganan aktif** (Active subscriptions) counts subscriptions that currently have the status Aktif.
   - **Langganan ditangguhkan** (Suspended subscriptions) counts subscriptions that currently have the status Ditangguhkan (Suspended).
   - **Kepatuhan SLA** (SLA compliance) counts the percentage of tickets that have a completion time and were completed no later than the SLA limit. This figure uses all time and ignores the **Periode**.
4. Click **Lihat data** to open the subscriptions, invoices or tickets behind a card. The links follow the permissions of the source module.
5. Read the chart **Pendapatan terbayar dan MRR per hari** (Paid revenue and MRR per day), **per minggu** (per week) or **per bulan** (per month). The lines are named **Pendapatan terbayar** and **MRR (akhir periode)** (MRR (end of period)). Revenue uses the issue date of paid invoices. MRR shows the position at the end of each time group. The group still in progress is marked **(berjalan)** (in progress).
6. Read the chart **Tagihan menurut status** (Invoices by status). The chart uses the issue date and separates the statuses present in the data: Draf (Draft), Belum dibayar, Dibayar sebagian, Lunas, Lewat jatuh tempo and Dibatalkan (Cancelled).
7. Click **Ekspor** to download a CSV or PDF. The file contains all 13 Business metrics, including Langganan berhenti, Langganan baru, Churn, Pendapatan berulang, Pendapatan sekali bayar, Sebaran aset and Pemasangan selesai, which do not show as cards.

## Common errors

- Of the six cards, **Periode** changes only **Pendapatan terbayar**. The other five cards are the **Posisi saat ini** or an all-time figure.
- Paid revenue can be smaller than the money received. This metric uses invoices that are already Lunas and the issue date, while **Terkumpul** (Collected) in Sales KPIs uses payments that are not reversed and the payment date.
- **Piutang** can differ from Tunggakan (Arrears). Click **Lihat data** on this card to see the **Rekonsiliasi** (Reconciliation) card against **Tunggakan**.
- **Kepatuhan SLA** can differ from **Tingkat kepatuhan SLA** (SLA compliance rate) in [section 7.6](/docs/guides/web/finance-and-reports/sla-compliance/). Business metrics uses all tickets that have a completion time, with no period filter.
- Without a **Periode**, Langganan baru and Churn in the export file are 0. The other period metrics use all matching records.
- The chart shows **Tidak ada data pada periode ini** (No data in this period) when there is no value to draw. The cards still show 0 or the **Posisi saat ini** value.
