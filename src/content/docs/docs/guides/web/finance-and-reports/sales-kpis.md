---
title: "7.10 Sales KPIs (KPI Penjualan)"
description: "Compare salespeople on new customers, activated subscriptions, MRR, invoiced and collected amounts, receivables and collection rate."
---

KPI Penjualan (Sales KPIs) breaks down customer acquisition, subscription activation, MRR, invoices, payments, receivables and collection rate by the salesperson of the customer. A salesperson is the user recorded in the field **Diperoleh oleh** (Acquired by) in Pelanggan (Customers) ([section 4.1](/docs/guides/web/customers-and-services/customers/)).

Roles that can use it: admin and manager. Permissions: `report.sales.view`. Staff do not hold this permission in the built-in role. The report has no **Ekspor** (Export) button and no **Lihat data** (View data) links.

## Opening and reading the report

1. In the sidebar, open **Keuangan & Laporan** (Finance and Reports), then click **KPI Penjualan**. You can also open **Laporan** (Reports) and click the link **KPI Penjualan**.

   ![Sales KPIs with the Period, Salesperson and Package category filters, the total cards, and the salesperson table](~/assets/guide/web/reports-sales.webp)

2. Fill in **Periode** (Period) as in Kinerja Teknisi (Technician performance) ([section 7.9](/docs/guides/web/finance-and-reports/technician-performance/)): type a range, or open the calendar and use the quick choices. With no choice, the caption line writes **Periode: semua waktu** (Period: all time).
3. Select a **Petugas penjualan** (Salesperson). Click the box to open the list, type to filter, then select one name. An empty field (**Semua petugas** (All salespeople)) shows all salespeople and the row **Tanpa petugas** (No salesperson). The names of inactive users are marked "(nonaktif)" (inactive). Click **Hapus pilihan: Petugas penjualan** (Clear selection: Salesperson) to empty it.

   Also select a **Kategori paket** (Package category): **Semua kategori** (All categories) or one category ([section 4.2](/docs/guides/web/customers-and-services/service-packages/)). An inactive category stays in the list with the text "(nonaktif)", because history still uses it. With one category, **Langganan diaktifkan**, **MRR aktif**, **Ditagihkan**, **Terkumpul**, **Piutang** and **Tingkat penagihan** count only the subscriptions on packages of that category together with their invoices and payments. The help text under the field writes "Pelanggan baru tidak terpengaruh." (New customers are not affected.) because **Pelanggan baru** is not filtered.

4. Click **Tampilkan** (Show). The header shows **Versi rumus sales.v1** (Formula version sales.v1).
5. Read the seven total cards:
   - **Pelanggan baru** (New customers) counts customers who are currently credited to the salesperson and were created within the **Periode**. Customers that were soft-deleted are not included.
   - **Langganan diaktifkan** (Subscriptions activated) counts subscriptions of the salesperson's customers that have an activation date within the **Periode**, whatever their current status.
   - **MRR aktif** (Active MRR) adds up the monthly fee of subscriptions that currently have the status Aktif (Active). This figure is the current position.
   - **Ditagihkan** (Invoiced) adds up the total of invoices with the status Belum dibayar (Unpaid), Dibayar sebagian (Partially paid), Lunas (Paid) or Lewat jatuh tempo (Overdue), by issue date within the **Periode**.
   - **Terkumpul** (Collected) adds up payments that are not cancelled, by payment date within the **Periode**.
   - **Piutang** (Receivables) adds up the remaining amount of invoices with the status Belum dibayar, Dibayar sebagian or Lewat jatuh tempo. This figure is the current position.
   - **Tingkat penagihan** (Collection rate) is Terkumpul divided by Ditagihkan, written with a decimal comma and at most two decimal digits, for example `95,5%`. The value shows as a hyphen (-) when Ditagihkan is 0.

   Money cards show a short figure, for example "Rp 1,2 jt" (Rp 1.2 million). Hover the pointer over the figure to see the full rupiah amount. The table below always shows the full amount. Each card also contains a short definition, the remark **Per periode** (Per period) or **Posisi saat ini** (Current position), and a section **Rumus dan sumber data** (Formula and data sources) that you can open.
6. Read the charts:
   - **Pelanggan baru per hari** (New customers per day), **Pelanggan baru per minggu** (per week) or **Pelanggan baru per bulan** (per month) use the customer creation date. The unit still in progress today is marked "(berjalan)" (in progress).
   - **Pelanggan baru per petugas penjualan** (New customers per salesperson) compares Pelanggan baru.
   - **Pembayaran diterima per petugas penjualan** (Payments received per salesperson) compares Terkumpul. Its caption writes "Semua pembayaran yang tidak dibatalkan, menurut tanggal bayar." (All payments that are not cancelled, by payment date.)
7. Read the salesperson table. The first column, **Petugas penjualan**, contains the name and a badge **Nonaktif** (Inactive). The seven metric columns and the name column can be sorted by clicking the column heading. The table uses the default paging (10, 25 or 50 rows per page).
8. Look at the row **Tanpa petugas** for customers without a valid salesperson. The row **Total** adds up all salespeople and No salesperson. Selecting one salesperson hides the No salesperson row.

## Common errors

- Correcting **Diperoleh oleh** moves the whole history of the customer to the new salesperson. Figures for old periods can change.
- **Pelanggan baru** uses the customer creation date, not the date the salesperson was assigned.
- **Terkumpul** uses the payment date and includes partial payments that are not cancelled. Its value is not the same as **Pendapatan terbayar** (Paid revenue) in Metrik Bisnis (Business metrics) ([section 7.4](/docs/guides/web/finance-and-reports/business-metrics/)).
- **Tingkat penagihan** can exceed 100 percent because Terkumpul uses the payment date, while Ditagihkan uses the issue date.
- The Piutang value of all salespeople plus No salesperson must equal Piutang in Business metrics for the same company.
- The message **Belum ada petugas penjualan** (No salespeople yet) means no employee can receive acquisition credit yet. Fill in **Diperoleh oleh** in the customer data to start.
- Rows with **Tingkat penagihan** marked with a hyphen (-) are always placed last when that column is sorted.
- An address with an `acquirer_id` of a user outside the active company, or one that does not exist, is rejected with "Petugas penjualan tidak ditemukan." (Salesperson not found.) under **Petugas penjualan**. A user of the active company who is not in the salesperson list opens the **Akses ditolak** (Access denied) page. The selector cannot produce either.
- **Tanggal akhir tidak boleh sebelum tanggal mulai.** (The end date must not be before the start date.) appears under **Periode** when the range is reversed.
