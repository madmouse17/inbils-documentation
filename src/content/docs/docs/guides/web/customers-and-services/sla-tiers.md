---
title: "4.5 SLA tiers (Tingkat SLA)"
description: "Create and edit SLA tiers that set the response and resolution deadlines for tickets of a package, and read the 30-day results."
---

Tingkat SLA (SLA tiers) record the service targets of a package: the response time limit and the resolution time limit of tickets. These targets are used when a ticket from a subscription of that package is created. The results are not filled in by hand: the system measures them from tickets. Open this menu when you add a new service tier, for example for a business package.

Roles that can use it: the same as [section 4.2](/docs/guides/web/customers-and-services/service-packages/). Permissions: `service.view` or `service.manage` opens the menu, and `service.create`, `service.update`, `service.delete` and `service.export` cover their own actions.

## Opening and reading the list

1. In the sidebar, open the group **Pelanggan & Layanan** (Customers & Services), then click **Tingkat SLA**.
2. Read the list. The columns are **Nama** (Name), **Target respons (jam)** (Response target (hours)), **Target penyelesaian (jam)** (Resolution target (hours)), **Hitungan tenggat** (Deadline clock) (**24 jam** (24 hours) or **Jam layanan** (Service hours)), **Respons tepat waktu (30 hari)** (On-time responses (30 days)), **Penyelesaian tepat waktu (30 hari)** (On-time resolutions (30 days)), **Tiket (30 hari)** (Tickets (30 days)), **Dibuat** (Created), **Status** and **Aksi** (Actions). The **Cari** (Search) box (field "Nama tingkat" (Tier name)) searches the tier name. The three 30-day columns cannot be sorted and are calculated from tickets created in the last 30 days on subscriptions whose package version uses that tier. The percentage column uses a decimal comma with at most one digit after it (for example `83,3%`) and shows `-` when no ticket can be assessed yet. The tier name and the **Ubah** (Edit) button open the edit form, and the **Aksi lainnya** (More actions) menu holds **Nonaktifkan** (Deactivate) or **Aktifkan** (Activate), and **Hapus permanen** (Delete permanently) when the tier has never been used. The **Ekspor** (Export) button (holders of `service.export`) produces CSV or PDF (PDF title **Tingkat SLA**) with the columns Nama, Target respons (jam), Target penyelesaian (jam), Hitungan tenggat (**24 jam** or **Jam layanan**) and Status (**Aktif** (Active) or **Nonaktif** (Inactive)).

   ![SLA tier list with the columns Nama, Target respons (jam), Target penyelesaian (jam), Hitungan tenggat, Respons tepat waktu (30 hari), Penyelesaian tepat waktu (30 hari), Tiket (30 hari), Dibuat and Aksi](~/assets/guide/web/sla-tiers.webp)

## Creating an SLA tier

1. Click **Buat Tingkat SLA** (Create SLA Tier). The page opens with the title **Buat Tingkat SLA** and the card **Target layanan** (Service targets).
2. Fill in the form:
   - **Nama**: required, up to 255 characters, unique per company. Example: `Silver`.
   - **Target respons (jam)**: required, a whole number from 1 to 720. The time limit until the technician presses **Mulai** (Start) on the ticket. The value must not exceed the resolution target.
   - **Target penyelesaian (jam)**: required, a whole number from 1 to 720. The time limit until the ticket is resolved.
   - **Aktif**: a switch, on by default.
   - **Hitungan tenggat**: choose **24 jam** (default) or **Jam layanan**. **24 jam** counts every hour, day and night. **Jam layanan** counts only the company's opening hours, which are filled in under **Jam layanan** in Pengaturan Perusahaan (Company settings, [section 8.1](/docs/guides/web/administration/company/)): a ticket that arrives outside opening hours starts counting at the next opening. If the service hours are not yet filled in, the form says "Jam layanan belum diisi; tenggat dihitung 24 jam." (Service hours are not filled in yet; the deadline is counted over 24 hours.) and the deadline stays at 24 hours until you fill them in. Holders of Kelola perusahaan (Manage company, `company.manage`) see the link **Isi di Pengaturan Perusahaan** (Fill in under Company settings) in that warning, other users read "Minta admin mengisinya di Pengaturan Perusahaan." (Ask an admin to fill it in under Company settings.)
3. Click **Simpan** (Save). The toast `Tingkat SLA dibuat.` (SLA tier created.) appears.

To edit, click **Ubah** (the **Ubah Tingkat SLA** page), change the fields, then click **Simpan** (toast `Tingkat SLA diperbarui.` (SLA tier updated.)). A change to the hours and to **Hitungan tenggat** applies only to tickets created afterwards. Existing tickets are not recalculated. **Warning:** the SLA tier is changed in place, so a change to the hours applies to all package versions and subscriptions that use that tier. To change the targets only for new sales, create a new tier and choose it in the package (new version). To stop using a tier, open **Aksi lainnya** and click **Nonaktifkan** (toast `Tingkat SLA dinonaktifkan.` (SLA tier deactivated.)). **Hapus permanen** exists only when the tier has never been used by any package or package version (toast `Tingkat SLA dihapus permanen.` (SLA tier permanently deleted.)). The **Status** filter has **Aktif**, **Nonaktif**, **Dihapus** (Deleted) and **Semua, termasuk dihapus** (All, including deleted). **Pulihkan** (Restore) is in the menu of a deleted row ([section 1.5](/docs/guides/web/introduction/know-the-screen/)).

A tier affects tickets like this:

- A ticket that has a **Langganan** (Subscription) takes both its targets from the SLA tier of the **package version** used by that subscription. The tier stays in force even when it is **Nonaktif**: deactivating only stops new sales and does not change the tickets of subscriptions already sold. Moving a subscription through **Ganti paket** (Change package) changes its tier to match the new version. A ticket without a subscription uses **Kategori Tiket** (Ticket categories) ([section 3.4](/docs/guides/web/operations/tickets/)).
- A ticket with the priority **Mendesak** (Urgent) uses half of both targets, rounded up.
- **Hitungan tenggat** decides which hours are counted. A **24 jam** tier counts every hour, day and night. A **Jam layanan** tier counts only the company's opening hours, and counts 24 hours while the company's service hours are not filled in. **Kategori Tiket** always counts 24 hours.
- The results appear in the 30-day columns of this list and in the Kepatuhan SLA (SLA compliance) report ([section 7.6](/docs/guides/web/finance-and-reports/sla-compliance/)). The system does not use this tier to calculate uptime or invoice credit. Those two fields have been removed from the SLA tier.

## Common errors

- The tier does not appear in the package form: the **Aktif** switch is off. Turn it on in **Ubah**.
- The response or resolution target is rejected: enter a whole number of hours between 1 and 720. Decimal numbers are not accepted.
- The response target is rejected with the message `Target respons tidak boleh lebih lama dari target penyelesaian.` (The response target must not be longer than the resolution target.): lower the response target or raise the resolution target.
- Saving is rejected with the message `nama sudah digunakan.` (the name is already used.): **Nama** is already used by another tier in this company.
- The tier row menu does not offer **Hapus permanen**: the tier is still used by a package or package version (the numbers show in the **Nonaktifkan** dialog). Choose **Nonaktifkan**. An inactive tier does not appear in the package form, but subscriptions already sold with that tier keep using it.
