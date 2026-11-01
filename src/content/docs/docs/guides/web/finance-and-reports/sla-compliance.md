---
title: "7.6 SLA compliance (Kepatuhan SLA)"
description: "Measure completed tickets against SLA limits, first response speed, resolution time and customer ratings, with breakdowns by category and technician."
---

Kepatuhan SLA (SLA compliance) counts completed tickets, tickets that met the SLA limit, breaches, first response speed, resolution time, breakdowns by category, technician, priority and target source, and customer ratings. The source data comes from Tiket (Tickets) ([section 3.4](/docs/guides/web/operations/tickets/)).

Roles that can use it: admin, manager, staff. Permissions: `report.sla.view`. The **Ekspor** (Export) button requires `report.export`.

## Opening and reading the report

1. Open **Laporan** (Reports), then click **Kepatuhan SLA**. The report shows at once for all dates.
2. Select a **Periode** (Period), then click **Tampilkan** (Show). The screen has no extra filters. The header shows **Versi rumus** (Formula version) `sla.v1`.

   ![SLA compliance page with figure cards, tables by category, technician, priority and target source, and the Oldest breaches table](~/assets/guide/web/reports-sla.webp)

3. Read the six cards:
   - **Tiket selesai** (Completed tickets) counts tickets that have a completion time within the **Periode**, whatever their current status.
   - **Tingkat kepatuhan SLA** (SLA compliance rate) is the percentage of completed tickets that were completed no later than the SLA limit.
   - **Tingkat respons** (Response rate) is the percentage of completed tickets whose first response came no later than the response target. Only tickets that have been assessed are counted: tickets that have a response target and a first response record. Under the figure is written `N tepat waktu, N terlambat, N tanpa target respons` (N on time, N late, N without response target). An empty figure shows as **-**.
   - **Pelanggaran SLA** (SLA breaches) counts completed tickets that were completed after the SLA limit.
   - **Rata-rata waktu penyelesaian** (Average resolution time) is the average number of minutes from creation to completion. An empty value shows as **- menit** (- minutes).
   - **Kepuasan pelanggan** (Customer satisfaction) is the average of the 1 to 5 ratings customers gave on tickets rated within the **Periode**, written for example `4,3 dari 5` (4.3 out of 5). Below it is written `{n} penilaian` ({n} ratings). With no ratings in that period, the figure is **-** and the remark is "Belum ada penilaian pada periode ini." (No ratings in this period yet.) Tickets that have not been rated are not counted and are not treated as zero. This card follows the rating day, not the day the ticket was completed.
4. Read the chart **Tiket selesai menurut SLA** (Completed tickets by SLA). The slices **Sesuai SLA** (Within SLA) and **Melewati SLA** (Beyond SLA) use the number of tickets within SLA and the **Pelanggaran SLA** figure.
5. Read the chart **Tiket selesai per kategori** (Completed tickets per category). The chart compares **Total selesai** (Total completed) and **Sesuai SLA** for each category.
6. Read the table **Tiket selesai per kategori** with the columns **Kategori** (Category), **Total**, **Sesuai SLA** and **Persentase** (Percentage). Click **Lihat data** (View data) on Total to open the tickets of that category.
7. Read the three detail tables, which follow the **Periode**: **Tiket selesai per teknisi** (Completed tickets per technician) (first column **Teknisi**), **Tiket selesai per prioritas** (Completed tickets per priority) (**Prioritas**, from Mendesak (Urgent) to Rendah (Low)), and **Tiket selesai per sumber target** (Completed tickets per target source) (**Sumber target**). The target source is written `Tingkat SLA {nama}` (SLA tier {name}) for tickets whose subscription has an SLA tier, and `Target kategori tiket` (Ticket category target) for tickets without a subscription. The columns in all tables are **Tiket selesai**, **Sesuai SLA**, **Melanggar** (Breached), **Persentase** and **Respons pertama** (First response) (an average, written for example `2 jam 15 menit` (2 hours 15 minutes), or **-** if there is none). Tickets that have no handler become one row **Belum ditugaskan** (Unassigned).
   - Users who do not hold `report.manage` see only the names of technicians within their Kinerja Teknisi (Technician performance) scope ([section 7.9](/docs/guides/web/finance-and-reports/technician-performance/)). Other handlers are merged into one row **Penangan lain** (Other handlers), so the number of rows stays the same as **Tiket selesai**.
   - Tickets that are already closed use the name of the handler at the time of closing.
8. Read the table **Pelanggaran terlama** (Oldest breaches): the ten completed tickets that exceeded the SLA limit by the longest time in that period. The columns are **Tiket** (Ticket) (link to the ticket), **Judul** (Title), **Kategori**, **Penangan** (Handler), **Prioritas** and **Terlambat** (Late) (for example `2 jam 15 menit`). Click **Lihat semua pelanggaran** (View all breaches) to open the list behind **Pelanggaran SLA**. This table shows only for accounts that may open the ticket list, and a handler without the permission to assign sees only their own tickets. With no breaches, the table writes "Tidak ada tiket yang melanggar SLA pada periode ini." (No tickets breached the SLA in this period.)
9. Click **Ekspor** to download a CSV or PDF. The file contains all metrics of this report: Tiket selesai, Sesuai SLA, Tingkat kepatuhan SLA, Pelanggaran SLA, Respons tepat waktu, Respons terlambat, Tanpa target respons, Tingkat respons, Rata-rata waktu penyelesaian, Rata-rata respons pertama, Kepuasan pelanggan and Jumlah penilaian pelanggan. The category breakdown is written as three rows per category: total, within SLA and percentage. The breakdowns by technician, priority and target source are written as four rows per entry: total, within SLA, percentage and average first response (if any).

## Common errors

- The chart and the category table ignore **Periode**. They can differ from the cards and other detail tables for the same range.
- The number of tickets within SLA plus **Pelanggaran SLA** can be smaller than **Tiket selesai**. Tickets without an SLA limit count in Tiket selesai, but are treated as neither compliant nor breached.
- **Tingkat kepatuhan SLA** is 0 when there are no completed tickets. **Rata-rata waktu penyelesaian** is empty in the same case.
- **Tingkat respons** is empty (**-**) when no ticket has been assessed. Old tickets created before response targets existed have no response target. Those tickets count in the **tanpa target respons** figure and are not in the denominator. Tickets that have a target but no first response record are also not assessed.
- The full definitions of the response figures are in the Kamus Data (Data dictionary) ([section 7.8](/docs/guides/web/finance-and-reports/data-dictionary/)): **Respons tepat waktu**, **Respons terlambat**, **Tanpa target respons** and **Tingkat respons**. The ticket list opened through **Lihat data** and its export contain the columns **Target respons** and **Respons**. The **Respons** column contains Tepat waktu (On time), Terlambat, Tanpa target or Belum ada respons (No response yet). The **SLA** column contains Tepat waktu, Terlambat or Tanpa batas (No limit).
- Categories with the same name merge into one row.
- The server accepts the parameter `category_id`, but this screen has no category selector.
- The **Kepuasan pelanggan** card differs from the **Tiket selesai** count: it counts tickets by rating day. A ticket completed before the period but rated within it is counted.
- The **Pelanggaran terlama** table is missing: your account may not open the ticket list ([section 3.4](/docs/guides/web/operations/tickets/)).
- The **Penangan lain** row appears in the per-technician table when you do not hold `report.manage` and some tickets are handled by technicians outside your scope.
