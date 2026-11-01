---
title: "1.6 Switching company"
description: "Switch between a parent company and its subsidiaries, and learn what changes when you do, from data scope to the consolidated menu."
---

One Inbils installation can hold more than one company, for example a parent company (Head) and its subsidiaries. The data of each company is separate: customers, invoices, stock and reports belong only to the company that is currently active.

Roles that can use it: admins and managers (permission `company.switch`, **Ganti perusahaan** (Switch company)), and only if the account has access to more than one company. The switch button is not shown for other accounts.

1. Look at the top of the sidebar. The button under the company name shows the active company name and the text **Ganti perusahaan**.
2. Click that button. The **Ganti perusahaan** menu opens with the name and code of each company. Your account's home company is marked with the word "bawaan" (default) after its code.
3. Choose the target company. Inbils opens the **Dasbor** (Dashboard) of that company and shows the green toast "Sekarang bekerja di" (Now working in) followed by the company name.
4. To go back, repeat steps 1 to 3 and choose the home company, or click **Kembali ke induk** (Back to parent) in the ribbon if you are in a subsidiary (see below).

The switch lasts for the sign-in session. Each new sign-in starts again in the home company. Your role and permissions do not change when you switch. On a narrow screen, the sidebar closes by itself after the switch.

While a switch is running, the switch button is inactive and shows a spinner, so a second click does not start another switch. When it finishes, keyboard focus returns to that button.

In a subsidiary, the ribbon at the very top of the page writes "Sedang di anak perusahaan {nama}" (Currently in subsidiary {name}). The **Kembali ke induk** button in that ribbon moves you to the parent company (Head) without opening the menu, then the toast "Sekarang bekerja di" followed by the parent name appears. The button is shown only if your account may switch to that parent (permission `company.switch` and access to the parent company). The ribbon is not shown in the Head or in a stand-alone company.

Access to other companies and subsidiaries is created by the server administrator with the commands `inbils:company:grant-membership` and `inbils:company:create-subsidiary`, not through the web screens.

The parent company (Head) is a company with no parent that has at least one active subsidiary. Only when you work in the Head and your account has the permission `report.consolidated.view` (**Lihat laporan konsolidasi** (View consolidated reports), admin), the **Metrik Konsolidasi** (Consolidated metrics) menu appears in the **Keuangan & Laporan** (Finance and Reports) group ([section 7.11](/docs/guides/web/finance-and-reports/consolidated-metrics/)).

## Common errors

- The numbers on screen suddenly differ: check the active company name in the sidebar button. You may still be in another company.
- The switch button is missing: your account has only one company, or its role does not have the permission `company.switch`. Ask the server administrator to add access.
- The **Metrik Konsolidasi** menu is missing in a subsidiary. Switch to the Head first.
- The red toast "Perusahaan aktif berubah di tab lain." (The active company changed in another tab.) when saving: you switched company in another tab, then saved from a tab that still shows the previous company. Inbils rejects that save and reopens the page in the company that is now active. Check the company name in the sidebar button, then repeat ([section 1.5](/docs/guides/web/introduction/know-the-screen/), **Conflict messages**).
