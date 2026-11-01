---
title: "3. Dashboard and company list"
description: "Read the operator dashboard cards, then search, filter and read the tenant table to check company status, usage and failures across the installation."
---

## 3.1 Reading the dashboard summary


Roles that can use it: all platform operators.

The dashboard is the first page after sign-in. The four cards at the top summarise the top-level tenants:

- **Perusahaan aktif** (Active companies): active tenants with no deletion request;
- **Ditangguhkan** (Suspended): inactive tenants with no deletion request;
- **Pengajuan hapus** (Deletion requests): tenants that have requested deletion;
- **Job gagal tanpa perusahaan** (Failed jobs without a company): jobs that failed in the last 7 days and carry no company id.

![Operator dashboard with summary cards, the company filter and the tenant table](~/assets/guide/web/platform-dashboard.webp)

If there are failed jobs without a company, a yellow alert explains that these jobs do not appear in any company row. The server team needs to read `failed_jobs` and the application log to find their origin.

If a tenant has asked for a subsidiary, the **Permintaan anak perusahaan** (Subsidiary requests) card appears above the tenant table. The card exists only while a request is open. How to respond is in [section 5.3](/docs/guides/platform/company-page-and-support-tools/).


## 3.2 Searching and reading companies


The filters above the table:

- **Cari** (Search) looks for a company name or code, at most 100 characters;
- **Status** chooses **Semua status** (All statuses), **Aktif** (Active), **Ditangguhkan** (Suspended) or **Pengajuan hapus** (Deletion request).

Click the **Perusahaan** (Company) or **Kode** (Code) heading to sort. The table contains:

| Column | Meaning |
| --- | --- |
| **Perusahaan** | Name of the parent company. Click it to open the tenant page. |
| **Kode** | Fixed code of the tenant. Two codes that differ only in upper and lower case cannot be used together; at confirmation, the code must be typed exactly. |
| **Status** | **Aktif**, **Ditangguhkan** or **Pengajuan hapus**. |
| **Anak perusahaan** (Subsidiaries) | Number of subsidiaries, active and inactive. |
| **Pengguna** (Users) | Number of users on the parent and its subsidiaries. |
| **Pelanggan** (Customers) | Number of customers that are not deleted across the whole tenant. |
| **Job gagal 7 hari** (Failed jobs, 7 days) | Failed jobs that carry the id of one of the tenant's companies. |
| **WhatsApp gagal 7 hari** (WhatsApp failures, 7 days) | WhatsApp messages with the failed status in the last 7 days. |
| **Masuk terakhir** (Last sign-in) | Latest sign-in of a tenant user on the parent or a subsidiary. |
| **Penyimpanan** (Storage) | Total size of media that has company metadata. |

The **Penyimpanan** figure can be lower than the real folder size if old files have no `company_id` metadata. Use this figure as the size of recorded media data, not as a check of the server disk.

Click **Reset filter** (Reset filters) in the empty state to clear the search and status. Click **Perusahaan baru** (New company) at the top right or in the sidebar to create a tenant.

### Common errors

- A company is not found: clear the **Status** filter, check the spelling of the code, then click **Reset filter**.
- A subsidiary does not appear as its own row: this page shows parent companies only. The figures are added to the parent.
- The number of failed jobs differs from the server page: the panel counts only the last 7 days and only jobs that carry `companyId`.
- The storage figure looks small: old media may not have company metadata yet.
