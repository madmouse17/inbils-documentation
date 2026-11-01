---
title: "7.11 Consolidated metrics (Metrik Konsolidasi)"
description: "Compare Business metrics for the Head company and each active subsidiary, with a group total, without switching between companies one by one."
---

Metrik Konsolidasi (Consolidated metrics) compares the Metrik Bisnis (Business metrics) of the Head company and each active subsidiary, then adds them up. Use this report to see figures per company and the group total without switching companies one at a time.

Roles that can use it: admin. Permissions: `report.consolidated.view`. The active company must also be a Head, that is, a company without a parent that has active subsidiaries. The **Ekspor** (Export) menu requires `report.export`.

## Opening and reading the consolidation

1. Make sure the active company in the sidebar is the Head, see [section 1.6](/docs/guides/web/introduction/switch-company/).
2. In the sidebar, open **Keuangan & Laporan** (Finance and Reports), then click **Metrik Konsolidasi**. You can also open **Laporan** (Reports) and click the link **Metrik Konsolidasi**.

   ![Consolidated metrics with the Period filter, the Figures per company table, and the Consolidated total row](~/assets/guide/web/reports-consolidated.webp)

3. Read the subtitle. The screen writes the Head name, the number of subsidiaries and the currency used, for example "Metrik bisnis gabungan &lt;nama Head&gt; dan 1 anak perusahaan. Nilai dalam IDR." (Combined business metrics of &lt;Head name&gt; and 1 subsidiary. Values in IDR.) The header shows **Versi rumus business.v1** (Formula version business.v1).
4. Fill in **Periode** (Period) as in Kinerja Teknisi (Technician performance) ([section 7.9](/docs/guides/web/finance-and-reports/technician-performance/)), then click **Tampilkan** (Show). The caption line under the filter writes the range in effect, or "Periode: semua waktu. Pilih rentang tanggal untuk membatasi periode." (Period: all time. Select a date range to limit the period.) when empty. The text below it explains that the report covers the Head and active subsidiaries, and each company uses calendar days in its own time zone.
5. Read the section **Angka per perusahaan** (Figures per company):
   - The column **Perusahaan** (Company) contains the name, the code and time zone, and a badge **Induk** (Parent) on the Head company.
   - The columns **MRR**, **Pendapatan terbayar** (Paid revenue), **Piutang** (Receivables), **Langganan aktif** (Active subscriptions), **Langganan ditangguhkan** (Suspended subscriptions) and **Kepatuhan SLA** (SLA compliance) use the Business metrics definitions ([section 7.4](/docs/guides/web/finance-and-reports/business-metrics/)). The SLA compliance cell also writes "n dari m tepat waktu" (n of m on time).
   - Each company has one row. The row **Total konsolidasi** (Consolidated total) is at the bottom.
   - On screens narrower than 1200 pixels, the table becomes one card per company with the same figures, and the **Total konsolidasi** card at the end.
6. Read the SLA note under the table. Consolidated SLA compliance combines all on-time tickets and divides them by all completed tickets. Inbils does not average the percentages of the companies.
7. Read the section **Cara menghitung setiap angka** (How each figure is calculated) for the definitions of the six columns. Click **Rumus dan sumber data** (Formula and data sources) on one figure to see its formula and source.
8. Click **Ekspor**, then **Ekspor CSV** (Export CSV). This menu offers only CSV. The file contains all Business metrics per company, followed by the Total konsolidasi row, with the columns Perusahaan, Metrik, Rincian, Nilai, Satuan, Cakupan, Filter and Versi.

## Common errors

- The menu is missing: the active company is not a Head, has no active subsidiaries, or the account does not hold `report.consolidated.view`.
- Switching to a subsidiary hides the menu. If your account holds `report.consolidated.view` and you open the Consolidated metrics address from a subsidiary, Inbils opens the **Laporan** page with the warning "Metrik Konsolidasi hanya tersedia di perusahaan induk {nama}. Ganti perusahaan lewat pemilih di menu samping." (Consolidated metrics are available only in the parent company {name}. Switch company with the selector in the side menu.) and the card "Metrik Konsolidasi ada di perusahaan induk {nama}." (Consolidated metrics are in the parent company {name}.) Click **Pindah ke {nama}** (Switch to {name}) on that card to move to the parent, the same as through the company selector in the sidebar ([section 1.6](/docs/guides/web/introduction/switch-company/)). The button does not show if your account may not switch to the parent. Without that report permission, the address is rejected directly with the **Akses ditolak** (Access denied) page.
- SLA compliance is written with a decimal comma, for example `63,6%`, as in Kepatuhan SLA (SLA compliance) and Kinerja Teknisi.
- If the companies' currencies differ, the screen shows the warning **Perusahaan ini tidak bisa dikonsolidasikan** (These companies cannot be consolidated) with the message "Laporan konsolidasi ditolak: perusahaan yang dipilih memakai mata uang berbeda" (Consolidated report rejected: the selected companies use different currencies) followed by the list of currencies. Align the companies' currencies before adding up money values. If your account may open Business metrics, the warning contains a link **Metrik Bisnis** to see the figures of each company. The **Ekspor** menu does not appear while the warning shows.
- **MRR**, **Piutang**, subscriptions and SLA compliance are the current position. **Periode** mainly changes Pendapatan terbayar and the other period metrics in the export file.
- Each company reads day boundaries in its own time zone. Records near midnight can fall on a different day in two companies.
- The report has no **Lihat data** (View data) links. Open Business metrics after switching to the company you want to check.
- **Tanggal akhir tidak boleh sebelum tanggal mulai.** (The end date must not be before the start date.) appears under **Periode** when the range is reversed.
