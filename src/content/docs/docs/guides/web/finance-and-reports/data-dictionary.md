---
title: "7.8 Data dictionary (Kamus Data)"
description: "Look up the meaning, formula, unit, source columns, scope and limits of every report figure when two numbers look different or you need to check a formula."
---

Kamus Data (Data dictionary) explains the meaning, formula, unit, source columns, scope and limitations of every report figure. Open this page when two figures look different or when you need to check the formula used.

Roles that can use it: admin, manager, staff. Permissions: `report.dictionary.view`. This page has no filters, charts, lists behind the figures, or export.

## Reading the data dictionary

1. Open **Laporan** (Reports), then click **Kamus Data**.

   ![Data dictionary page with the opening note, the list of report links, and the metric definition cards](~/assets/guide/web/reports-dictionary.webp)

2. Read the opening note. Report figures are limited to your company. Deleted data is not counted unless the important note of a figure says otherwise.
3. Under the opening note is a list of links, one per report, for example **Metrik Bisnis** (Business metrics) followed by the number of definitions in brackets. Click the report name to jump to its section.
4. Read the header of each section. The header contains the report title, **Versi rumus** (Formula version) and its version number, the permission required (**Memerlukan** (Requires) followed by the permission name), and the description of the report.
5. Read the metric cards:
   - The card title is the name of the figure in the report.
   - The small line under the title shows the key and version, for example `mrr` and `v1`.
   - The sentence below it is the definition of the figure.
   - **Rumus** (Formula) explains the calculation the code runs.
   - **Satuan** (Unit) can be Nilai uang (Money value), Jumlah (Count), Persen (Percent), Menit (Minutes), Penilaian (Rating), Kuantitas (Quantity), Rincian (Breakdown) (count per group), or Catatan (Records) (ledger rows).
   - **Dasar tanggal** (Date basis) states Posisi saat ini (Current position) or Per periode (Per period), including the date column for per-period figures.
   - **Status** lists the data statuses that are counted, as stored codes such as `active` or `sent`. This line exists only when statuses are relevant.
   - **Sumber data** (Data source) lists the table and column pairs.
   - **Cakupan** (Scope) states the company or technician boundary.
   - **Catatan penting** (Important notes) records exceptions and behaviour of that formula version. This line exists only when there is a note.

The dictionary contains Metrik Bisnis, KPI Penjualan (Sales KPIs), Kinerja Teknisi (Technician performance), Pemanfaatan Aset (Asset utilisation), Kepatuhan SLA (SLA compliance) and Kartu Stok (Stock card). Version v1 records the formulas that actually run today, including behaviour that is not yet ideal.

## Common errors

- Metrik Konsolidasi (Consolidated metrics) has no section of its own. That report uses the Metrik Bisnis definitions.
- Log Audit (Audit log) and Kamus Data have no metrics in the registry, so neither appears as a dictionary section.
- A chart title can differ from the metric name. The chart **Aset jaringan menurut status** (Network assets by status) uses the definition **Sebaran status** (Status distribution), while the chart **Aset jaringan per lokasi** (Network assets per location) uses **Aset per lokasi** (Assets per location).
- Formulas and notes in the dictionary, and in the **Rumus dan sumber data** (Formula and data sources) details on the report cards, name the date limits with the words Dari (From) and Sampai (Until). They mean the start and end of the **Periode** (Period) field.
- A similar name does not always follow the same rule. Read **Dasar tanggal** and **Catatan penting** before comparing two reports.
- This page does not show company values. It contains only static definitions that are the same for all companies.
