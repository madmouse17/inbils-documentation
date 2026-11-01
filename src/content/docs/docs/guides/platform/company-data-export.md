---
title: "9. Company data export"
description: "Learn how to request a tenant data export, track its status, download the ZIP archive, and understand what the archive contains and leaves out."
---

## 9.1 Requesting an export


Roles that can use it: all platform operators.

1. Open the tenant page.
2. Scroll to the **Ekspor data** (Data export) card.
3. Click **Minta ekspor** (Request export).
4. The dialog explains that the archive is built in the background, is available for 24 hours, and only one export may run for a company.
5. Type the parent code and fill in **Kata sandi operator** (Operator password) if the dialog asks for it.
6. Click **Minta ekspor**.

The toast shows "Ekspor data dijadwalkan." (Data export scheduled.) The job runs on the `platform` queue, one job per tenant, one attempt, with a timeout of one hour.


## 9.2 Tracking and downloading


Click **Ekspor** (Export) in the sidebar or **Semua ekspor** (All exports) on the tenant card.

![Operator Data export page with a status filter and the list of exports](~/assets/guide/web/platform-exports.webp)

Statuses:

- **Antrean** (Queued): the worker has not picked up the job yet;
- **Berjalan** (Running): the builder is creating the CSV and files;
- **Siap diunduh** (Ready to download): the archive is complete and the **Unduh** (Download) button is available;
- **Gagal** (Failed): the **Catatan** (Notes) column holds the class and a summary of the error;
- **Kedaluwarsa** (Expired): the download period is over and the archive has been deleted.

The table has **Perusahaan** (Company), **Status**, **Diminta** (Requested), **Ukuran** (Size), **Baris** (Rows), **Berlaku sampai** (Valid until), **Catatan** and **Unduh**. **Diminta** shows the operator's name and the time. Use the **Status** filter. When the page is opened from one tenant, a company filter badge appears together with the **Tampilkan semua perusahaan** (Show all companies) button.

The page reloads its data every 5 seconds while a visible row is still **Antrean** or **Berjalan**.

Click **Unduh** on an export that is **Siap diunduh**. The signed URL is valid until **Berlaku sampai**, at most 24 hours after completion, and still requires an active operator session with 2FA. The file name is `{kode-lowercase}-tenant-export.zip`. The response uses `private, no-store`.

The **Ekspor data** card on the tenant page also has a **Unduh** column. Its columns are Dibuat (Created), Status, Diminta oleh (Requested by), Ukuran, Baris, Selesai (Completed), Kedaluwarsa, Catatan and Unduh. The **Unduh** button appears while the export is **Siap diunduh** and its validity has not passed. For other exports the column is empty. The button uses the same signed URL and rules as the **Ekspor** page, and every download is recorded as **Ekspor data diunduh** (Data export downloaded).


## 9.3 Archive contents and excluded data


The ZIP contains:

- the `data/` folder with one CSV per tenant table;
- `companies.csv` for the parent company and subsidiaries;
- `media.csv` and the media files in `files/{disk}/companies/{id}/...`;
- `roles.csv`, the tenant's company roles, and `user_roles.csv` (columns `user_public_id`, `company_code`, `role_name`, `template_key`), which shows who holds which role, including members who come from other companies. The permissions of each role are not part of the export;
- `manifest.json` with the creation time, companies, row counts, CSV format, media count per disk, and the omitted columns.

The CSV files use UTF-8 BOM, comma as delimiter, double quotes, and an empty string for null values.

Inbils does not export:

- passwords and password hashes;
- TOTP secrets, recovery codes and the last TOTP step;
- tokens, API keys, passwords and other integration credentials (the `credentials` column). Integration settings that are not secret are still included, for example the mail or RADIUS host and username;
- RADIUS, NAS, PPPoE and network account secrets;
- tokens and sensitive content of payment attempts;
- IP addresses and user agents in the audit;
- internal `platform` audit rows.

`support` audit rows are still included because the company is entitled to receive the support trail. A media file without a physical file is still recorded in `media.csv`, but a missing file cannot be added. A media path that points outside the tenant folder fails the whole export.


## 9.4 Validity and clean-up


The command `inbils:platform:exports:prune` runs every hour:

- an export that is **Siap diunduh** and past its validity becomes **Kedaluwarsa** and the ZIP file is deleted;
- an export that is **Antrean** or **Berjalan** and older than 2 hours becomes **Gagal**.

**Kedaluwarsa** rows are kept. Such a row can serve as proof that an export was completed after suspension, for the deletion request requirements.

### Common errors

- "Ekspor perusahaan ini masih diproses." (This company's export is still being processed.): wait for the active export to finish or fail. Only one build runs per tenant.
- A status stuck in **Antrean**: the `platform` worker is not running. Check [section 11.2](/docs/guides/platform/console-tasks-and-queues/).
- Status **Gagal**: read **Catatan**, **Audit platform** (Platform audit) and `failed_jobs`. After the cause is fixed, request a new export.
- The **Unduh** button is missing on the **Ekspor** page or on the **Ekspor data** card on the tenant page: the export is not ready or has expired. Reload the page if the export has just finished.
- The download returns 403: the URL has expired or its signature is invalid. The download returns 404: the export is not ready or the physical file is missing. Request a new export.
