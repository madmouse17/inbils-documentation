---
title: "Reporting"
description: "What the read-only Inbils reporting module computes, how figures are defined and drilled into, how CSV and PDF export work, and who may see which report."
---

The Reporting module turns the history held by every other module into reports for managers, NOC and finance. It is strictly read-only: it has query classes and one read-only model, writes nothing, and stores no computed performance values. Every figure is computed live from the source records, so the same report for another period simply gives another result.

## Reports

| Report | Answers | Main sources |
|---|---|---|
| Business | MRR, active subscriptions, churn, new subscriptions, revenue, outstanding, suspend rate, installation throughput, asset utilisation. | Subscriptions, invoices, payments, work orders. |
| Sales | Customers, subscriptions, invoiced, collected and outstanding money per acquirer (the user credited on the customer). | Customers, invoices, payments. |
| Technician | Completed SPK and tickets, average completion times, SLA compliance, customer rating, first response time, workload, breakdowns by SPK type and ticket category, and a ranking of all technicians. | Work orders, tickets, evaluations. |
| Asset | Status distribution, assets per location, installation history, downtime, customer-linked assets, retired assets. | Network assets and installations. |
| SLA compliance | Share of tickets resolved within SLA (overall and per category), resolution and first response times, breaches and trend, breakdowns by handler, priority and target source, customer satisfaction (CSAT), the ten longest violators. | Tickets. |
| Stock card | Stock movement history per product and location with the balance after each movement. | Stock movements. |
| Audit log | Activity entries with who, what and before and after values. | Activity log. |
| Data dictionary | The definition of every figure. | Metric registry (static text). |

A technician report with "Semua teknisi" selected shows the table **Peringkat teknisi** for all technicians the user may choose, ordered by completed SPK plus completed tickets. The stock card without a product chosen lists the eight products that moved most recently. The audit log writes support actions of the Inbils team as one sentence per code.

See the user guide on [Reports](/docs/guides/web/finance-and-reports/reports/) and [SLA compliance](/docs/guides/web/finance-and-reports/sla-compliance/).

## Metric registry and data dictionary

`MetricRegistry` is a code-defined, versioned catalogue of every figure: its definition, unit, formula and which date filter it follows. It records each formula exactly as the query implements it today, quirks included, so a number can be traced to the definition that produced it. Correcting a quirk means shipping a new version of the metric, never editing an existing entry. The **data dictionary** page prints this registry. It contains static text and reads no company data.

Some figures are snapshots and ignore the period filter. The dictionary and the export both state which ones.

## Drill-down

Aggregate figures of the Business, SLA, Asset and Technician reports link to the rows behind them. `DrillRegistry` lists one source per figure, and the page and the drill list read the same query builders, so a figure and its source rows cannot disagree. A drill list is allowed only with the report's own permission and the permission of the module that owns the rows, and it can be sorted, paginated and exported.

## Export

All exports go through `App\Support\ExportQuery`. The permission is `report.export` together with the permission of the report itself.

- **CSV**: UTF-8 with a byte order mark, one row of column headers and then the raw data.
- **PDF**: A4 landscape with a header (company logo and name, report title, "Periode", "Filter", "Dicetak {date} oleh {name}") and "Halaman {n} dari {total}" in every footer. Values are written as on screen, for example "Rp 1.250.000" or "18 Okt 2026".
- The row limit follows `config('exports.max_rows')` (default 5000, set by `EXPORTS_MAX_ROWS`). A PDF also stops at 1500 cells, so a wide table gets fewer rows. A PDF that was cut says "PDF dibatasi {n} baris. Untuk data lengkap, unduh CSV atau persempit periode."
- Receivables have their own export in [Billing](/docs/modules/billing/), and the ticket list in [Ticketing](/docs/modules/ticketing/).

## Consolidated report

The consolidated Business report adds the figures of a head company over its subsidiaries. It exists only on the head company. A holder of `report.consolidated.view` who opens it from a subsidiary is redirected to the Reports page with a warning, and with a button to switch to the head company when the user may. Without the permission the answer stays 403.

## Permissions

| Key | Allows |
|---|---|
| `report.view` | Open the report list. |
| `report.business.view` | Business report. |
| `report.sales.view` | Sales report. |
| `report.technician` | Technician report (a technician sees only their own). |
| `report.technician.team` | Technician report for the user's organisation subtree. |
| `report.asset.view` | Asset report. |
| `report.sla.view` | SLA compliance report. |
| `report.stock_card.view` | Stock card. |
| `report.audit.view` | Audit log report. |
| `report.dictionary.view` | Data dictionary. |
| `report.export` | CSV and PDF export of any report the user can open. |
| `report.manage` | Super permission; sees all handler names in the SLA breakdown. |
| `report.consolidated.view` | Consolidated head-company report (admin only). |

Handler names in the SLA breakdown by technician are shown in full only to `report.manage` holders. Other users read the names inside their own Technician report scope, and every handler outside it is merged into one row "Penangan lain".

## Invariants

- Reporting never writes data and keeps no static performance tables.
- Every figure is traceable to a registry definition and, for aggregates, to its source rows.
- Reports follow the current company. A technician cannot open another technician's report (403).
- Reporting reads other modules' tables directly. This is the one documented exception to the module boundary rule, see [Modules architecture](/docs/architecture/modules/).

See also the [Technician performance](/docs/modules/technician-performance/) module and the [data model](/docs/architecture/data-model/).
