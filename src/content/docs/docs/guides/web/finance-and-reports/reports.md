---
title: "7.3 Reports (Laporan)"
description: "Open the reports hub, pick a period, read charts and figures, drill down to source records, and export reports as CSV or PDF."
---

Reports calculate figures directly from the history of subscriptions, invoices, tickets, work orders (SPK), assets, stock and evaluations. All report screens are read-only. These screens offer no button to add, edit or delete the source data.

Roles that can use the hub: admin, manager and staff with the permission `report.view`. Each report still needs its own permission. Figures cover only the active company, except Metrik Konsolidasi (Consolidated metrics).

| Report in the hub | Permission to open | Default roles |
| --- | --- | --- |
| Metrik Bisnis (Business metrics) | `report.business.view` | admin, manager, staff |
| Pemanfaatan Aset (Asset utilisation) | `report.asset.view` | admin, manager, staff |
| Kepatuhan SLA (SLA compliance) | `report.sla.view` | admin, manager, staff |
| Kartu Stok (Stock card) | `report.stock_card.view` | admin, manager, staff |
| Kamus Data (Data dictionary) | `report.dictionary.view` | admin, manager, staff |
| Kinerja Teknisi (Technician performance) | `report.technician` and the technician access rule | admin, manager |
| KPI Penjualan (Sales KPIs) | `report.sales.view` | admin, manager |
| Log Audit (Audit log) | `report.audit.view` | admin |
| Metrik Konsolidasi | `report.consolidated.view` and the active company is a Head | admin |

An admin with `report.manage` can choose any active technician in the company. A manager must have an active employee profile in the active organisation unit. The technician choice is limited to that unit and the units below it. The rule for a technician viewing their own data is in the server, but technician accounts use the Android app, not the web.

The **Metrik Konsolidasi** report appears only when the active company is a Head, that is, a company without a parent that has active subsidiaries. The export button needs `report.export` in addition to the permission of the report. The default admin and manager roles hold the export permission, while staff do not.

## Opening the report list

1. In the sidebar, open the **Keuangan & Laporan** (Finance and reports) group, then click **Laporan** (Reports).
2. Read the list that appears. Each row holds the report title as a link and one sentence of description.

   ![Reports page with the title, subtitle, and list of report links with their short descriptions](~/assets/guide/web/reports.webp)

3. Click the title of the report you need. The hub shows only the reports allowed for your account.
4. **Kinerja Teknisi**, **KPI Penjualan** and **Metrik Konsolidasi** also have their own menu in the sidebar. Their titles in the hub are the same as the menu names.

When no report is allowed, the hub shows **Belum ada laporan yang bisa dibuka** (No reports can be opened yet) with the note "Peran Anda belum punya akses laporan. Minta administrator memberi akses." (Your role has no report access yet. Ask an administrator to grant access.) An admin can add permissions through Peran (Roles) ([section 8.6](/docs/guides/web/administration/roles/)) and Hak Akses (Permissions) ([section 8.7](/docs/guides/web/administration/permissions/)).

If you open the address of Metrik Konsolidasi while working in a subsidiary, the hub opens with a card that points to the parent company and a **Pindah ke** (Switch to) button followed by the name of the parent ([section 7.11](/docs/guides/web/finance-and-reports/consolidated-metrics/)).

## Choosing the Periode

1. Click the **Periode** (Period) field, which is empty at first and reads **Semua tanggal** (All dates), or click the **Buka kalender** (Open calendar) button.
2. Choose one of the buttons in the quick choice group: **Hari ini** (Today), **7 hari terakhir** (Last 7 days), **30 hari terakhir** (Last 30 days), **Bulan ini** (This month), **Bulan lalu** (Last month), or **Tahun ini** (This year). Running ranges such as **Bulan ini** and **Tahun ini** end today by company time. A quick choice fills the field at once and closes the calendar.
3. For another range, click the start date and then the end date. The text under the calendar guides you ("Pilih tanggal mulai, lalu tanggal akhir." (Choose the start date, then the end date.) and "Pilih tanggal akhir." (Choose the end date.)). The calendar closes after the end date is chosen. The calendar shows two months on a wide screen and one month on a narrow screen.
4. You can also type a range in the company date format. Separate the two dates with a hyphen that has a space on both sides. A single date without a separator means that one day. A hyphen at the end of the text leaves the end date empty. The year must use four digits. The text is accepted when you press Enter or move away from the field.
5. Click **Tampilkan** (Show). The Log Audit uses the **Terapkan filter** (Apply filters) button. The new choice does not affect the figures until this button is clicked.
6. To return to all dates, click **Hapus rentang tanggal** (Clear date range), then click **Tampilkan** again.

Both date limits are inclusive. For time columns, Inbils uses the start of the day of the start date up to the end of the day of the end date, by the company time zone. Calendar columns such as the invoice issue date are compared as dates without time zone conversion.

A range may have only a start date or only an end date. The end date must not be earlier than the start date. The field shows "Tanggal akhir tidak boleh sebelum tanggal mulai." (The end date must not be before the start date.) when the order is reversed. When the text cannot be read, the field shows "Format tanggal tidak valid." (Invalid date format.) together with an example date in the company format.

The code does not limit the number of days in one range. A long range only changes the grouping of the charts. After you click **Tampilkan**, `date_from` and `date_to` are stored in the URL, so the filter is restored when the page is reloaded or shared.

## Reading the charts

Metrik Bisnis, Pemanfaatan Aset, Kepatuhan SLA, Kinerja Teknisi and KPI Penjualan use these charts:

- A line chart shows change over time.
- A bar chart compares categories, locations, or sales staff.
- A donut chart divides one total by status or SLA result. Status slices use the same colours as the status badges in tables and lists.

Time charts use daily groups for ranges up to 31 days, weekly up to 184 days, then monthly. Weeks start on Monday. Without a start date, the chart uses monthly groups from the oldest data until today, with at most 36 month groups. Older months are merged into the first group. Without an end date, the chart ends today.

A time group that is still running, that is, one that contains today, gets the text **(berjalan)** (running) after its label. The figure of that group is not complete yet, so a low figure there is not necessarily a decline.

Point at a point, bar or slice to see the series name and the full value. The axis may abbreviate numbers, while the tooltip uses the full value. A donut chart writes the amount and percentage in the legend.

Certain bar and donut charts, for example **Aset jaringan per lokasi** (Network assets per location), show at most ten rows. When there is more data, the nine largest rows are shown and the rest are merged as **Lainnya** (Other). When all values are zero, the chart area shows **Tidak ada data pada periode ini** (No data in this period).

## Reading the figures and their definitions

Many figure cards have a definition sentence, then one line that reads **Per periode** (Per period) or **Posisi saat ini** (Current position), followed by a version of the formula. **Per periode** means the source date must fall within the **Periode**. **Posisi saat ini** means the figure reflects the current state and ignores **Periode**. Money cards in Metrik Bisnis and KPI Penjualan write the figure in short form, for example "Rp 1,2 jt" (Rp 1.2 million). Point at that figure to see the exact rupiah amount.

Click **Rumus dan sumber data** (Formula and data source) to open the details **Rumus** (Formula), **Satuan** (Units), **Dasar tanggal** (Date basis), **Status**, **Sumber data** (Data source), **Cakupan** (Scope), and **Catatan penting** (Important notes). The report header holds **Versi rumus** (Formula version) followed by the version number, for example `business.v1`. Open Kamus Data ([section 7.8](/docs/guides/web/finance-and-reports/data-dictionary/)) to read all definitions on one page. Kinerja Teknisi does not show these details on its cards, but its definitions are still in Kamus Data.

## Exporting the report

1. Run the filters you need with **Tampilkan**.
2. Click **Ekspor** (Export). The Log Audit uses the **Ekspor log** (Export log) button.
3. Choose **Ekspor CSV** (Export CSV) or **Ekspor PDF** (Export PDF). The report export menu offers only these two formats.

The summary export uses the columns Metrik (Metric), Rincian (Details), Nilai (Value), Satuan (Unit), Cakupan (Scope), Filter, and Versi (Version). Rincian and Satuan use the same words as on screen: asset status and SPK type as labels (for example `Tersedia` (Available), `Instalasi` (Installation)), priority as a label (`Mendesak` (Urgent)), technicians by name, and the units `Rupiah`, `Jumlah` (Amount), `Persen` (Percent), `Menit` (Minutes), `Nilai (1-5)` (Score (1-5)), `Kuantitas` (Quantity), `Rincian`, or `Baris` (Rows). The Filter column writes names, not IDs, for example `Teknisi: Budi Santoso` (Technician: Budi Santoso) or `Kategori: Internet mati` (Category: Internet down). The Cakupan column says whether the figure applies to the period or the current position. In the lists behind the figures, status, invoice or SPK type, and asset type are also written as labels. Kartu Stok and Log Audit export all rows that match the filter, not only the table page that is currently visible.

The CSV keeps raw numbers so they can be calculated in a spreadsheet: money without the text Rp, date and time as they are, and durations in minutes. The PDF is written to be read by people. All PDF exports in Inbils, including Tagihan (Invoices), Tunggakan (Arrears), Stok (Stock) and Mutasi Stok (Stock movements), use the same layout on landscape A4 paper:

- The heading holds the company logo (if any), the company name, and at the top right `Dicetak {tanggal dan jam} oleh {nama pengguna}` (Printed {date and time} by {user name}) by company time and date format.
- Below the heading: the report title, `Periode:` (Period:) (in the company date format), `Filter:` (one phrase per filter, separated by semicolons), and `Baris:` (Rows:) the number of rows. Periode and Filter appear only when the export has them.
- Number columns are right-aligned and written as on screen: money `Rp 1.250.000`, date `18 Okt 2026`, duration `2 j 15 m`, percentage `63,6%`, numbers with a decimal comma.
- Each page is marked `Halaman 2 dari 5` (Page 2 of 5) at the bottom right.

KPI Penjualan and Kamus Data offer no export. Metrik Konsolidasi offers only CSV. Row exports (Kartu Stok, Log Audit, and the lists behind the figures) are limited to 5.000 rows. In a truncated CSV, the last row reads "# Ekspor dipotong pada 5000 baris. Persempit filter untuk mengekspor sisa barisnya." (# Export truncated at 5000 rows. Narrow the filters to export the remaining rows.) The PDF holds fewer rows: its limit is 1.500 cells divided by the number of columns, so a wide table is truncated earlier, and below the PDF title it says "PDF dibatasi N baris. Untuk data lengkap, unduh CSV atau persempit periode." (PDF limited to N rows. For complete data, download the CSV or narrow the period.) This limit is also explained in [section 1.5](/docs/guides/web/introduction/know-the-screen/).

## Viewing the data behind a figure

1. Click **Lihat data** (View data) under a figure or detail row. The link appears only if your account may also open the source module.
2. Read the **Kecocokan dengan laporan** (Match with the report) card. This card compares the number of rows or the sum of rows with the figure in the report. It shows **Baris ditampilkan** (Rows shown), the column sum when the figure is money (written with its column name, for example `Σ MRC`, and for receivables the total minus paid), **Tepat waktu** (On time) when the figure is a percentage, and **Angka di** (Figure in) followed by the report title.
3. Read the result badge:
   - **Cocok** (Match) means the rows equal the report figure.
   - **Berbeda** (Different) means the list and the report figure differ.
   - **Tidak bisa dicocokkan per baris** (Cannot be matched per row) appears for averages or lists limited by user access.
4. Click the value in the first column to open the source record, for example an invoice, ticket, work order, subscription, asset, or evaluation.
5. Use the **Kembali ke** (Back to) button followed by the report title to go back. The **Ekspor** menu on this page downloads the source list as CSV or PDF. This menu appears if your account holds `report.export`.

Source links need the permission of the related module: `customer.subscription.view`, `billing.view`, `ticket.view`, `spk.view`, `network_asset.view`, or `evaluation.view` or `evaluation.view.own`. A user who may work on tickets or work orders but may not assign them sees only the rows assigned to them. The list page states this with "Anda hanya melihat baris yang ditugaskan kepada Anda, jadi ini sebagian dari angka." (You only see the rows assigned to you, so this is part of the figure.)

The list behind **Piutang** (Receivables) can show the **Rekonsiliasi** (Reconciliation) card and the **Buka Tunggakan** (Open Arrears) button. This card shows the difference from Tunggakan because the two screens have their own inclusion rules. This card does not appear when **Kategori paket** (Package category) is chosen or your account may not open the invoice list.

## Common errors

- A report is not in the hub: your role does not hold the permission of that report. Ask an admin to check Peran and Hak Akses.
- The **Ekspor** button is not there: the account does not hold `report.export`, the report does not support export, or Kartu Stok has not yet applied an item.
- The **Lihat data** link is not there: the account may see the aggregate figure but may not open its source list.
- The figure does not change after choosing dates: click **Tampilkan** or **Terapkan filter**. Exports and the lists behind figures use the filter that has already been applied.
- A **Posisi saat ini** figure does not change when **Periode** changes. This is the behaviour of the formula, not a filter failure.
- The figure changes after switching company: all ordinary reports follow the active company. Check the company selector in the sidebar, see [section 1.6](/docs/guides/web/introduction/switch-company/).
