---
title: "7.5 Asset utilisation (Pemanfaatan Aset)"
description: "Review network asset status, asset locations, installation history, customer-linked assets and retired assets, and export the figures to CSV or PDF."
---

Pemanfaatan Aset (Asset utilisation) summarises network asset status, asset locations, installation history, assets linked to customers, and retired assets. The source data comes from Aset Jaringan (Network assets) ([section 5.2](/docs/guides/web/network/network-assets/)).

Roles that can use it: admin, manager, staff. Permissions: `report.asset.view`. The **Ekspor** (Export) button requires `report.export`.

## Opening and reading the report

1. Open **Laporan** (Reports), then click **Pemanfaatan Aset**. The report shows at once for all types and all dates.
2. Select a **Jenis aset** (Asset type): click the field and select, or type to filter the list. The choices are **Router**, **Switch**, **OLT**, **ONU/ONT**, **Radio**, **Antena** (Antenna), **Fiber**, **ODP**, **ODC**, **Rak** (Rack), **Perangkat daya** (Power equipment) and **Lainnya** (Other). An empty field means **Semua jenis** (All types). The **Hapus pilihan: Jenis aset** (Clear selection: Asset type) button empties it.
3. Select a **Periode** (Period), then click **Tampilkan** (Show). The header shows **Versi rumus** (Formula version) `asset.v1`.

   ![Asset utilisation page with Formula version, Asset type and Period fields, the Show button, and the Asset installations, Linked to customers and Retired cards](~/assets/guide/web/reports-asset.webp)

4. Read the three cards:
   - **Pemasangan aset** (Asset installations) counts asset installation records whose installation date falls within the **Periode**. This figure ignores **Jenis aset**.
   - **Terhubung ke pelanggan** (Linked to customers) counts assets that currently have a customer. This figure ignores all filters.
   - **Dipensiunkan** (Retired) counts assets that currently have the status Dipensiunkan. This figure ignores all filters.
5. Read the chart **Aset jaringan menurut status** (Network assets by status). The chart uses **Jenis aset** and shows the current state. **Periode** does not apply. The statuses are Tersedia (Available), Terpasang (Installed), Perawatan (Maintenance), Rusak (Damaged) and Dipensiunkan, as far as they exist in the data.
6. Read the chart **Aset jaringan per lokasi** (Network assets per location). The chart counts assets that have a location, without using **Jenis aset** or **Periode**.
7. Read the table **Sebaran status** (Status distribution) with the columns **Status** and **Jumlah** (Amount). Click **Lihat data** (View data) on one status to open the assets behind that count.
8. Click **Ekspor** to download a CSV or PDF. The file contains Sebaran status, Aset per lokasi, Pemasangan aset, Terhubung ke pelanggan and Dipensiunkan.

## Common errors

- **Jenis aset** affects only **Sebaran status**. The cards, the location chart and most figures do not change when you change this filter.
- **Pemasangan aset** counts asset installation records. The metric **Pemasangan selesai** (Installations completed) in Business metrics counts completed installation work orders (SPK), so the figures can differ.
- Locations with the same name merge into one bar. Assets without a location do not appear in the location chart.
- The screen has no Lokasi (Location) filter. A URL with `location_id` can limit **Sebaran status**, but that filter cannot be selected from the form. The server rejects a location that does not belong to the active company with the validation error "Lokasi tidak ditemukan." (Location not found.) This screen does not write that message.
- An empty table shows **Tidak ada data.** (No data.) An empty chart shows **Tidak ada data pada periode ini** (No data in this period).
