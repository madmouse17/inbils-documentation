---
title: "2.3 Administration summary"
description: "Use the Administration region at the bottom of the Dashboard to check user counts, company details, recent audit activity and module shortcuts."
---

At the bottom of the Dashboard, the **Administrasi** (Administration) region summarises the state of the company for people who manage users, roles or the company.

Roles that can use it: users with the permission `users.manage` (**Kelola pengguna** (Manage users)), `roles.manage` (**Kelola peran dan hak akses** (Manage roles and permissions)), or `company.manage` (**Kelola perusahaan** (Manage company)); admins in the default setup. This region is not shown for other accounts.

1. Open **Dasbor** (Dashboard) then scroll down to the title **Administrasi**.
2. Read the four number cards: **Pengguna** (Users) (active company users), **Pengguna aktif** (Active users), **Peran** (Roles), and **Izin akses** (Access permissions). The **Peran** and **Izin akses** numbers cover the whole system, not one company.
3. Look at the **Perusahaan** (Company) card: **Nama** (Name), **Kode** (Code), **Mata uang** (Currency) and **Zona waktu** (Time zone) of the active company.
4. Look at **Aktivitas terbaru** (Recent activity): the last ten audit records in the active company. Each row has one short sentence from the server that names the object and the event, for example "Tiket ditugaskan" (Ticket assigned), followed by its time. That sentence uses the same dictionary as the **Log audit** (Audit log) page ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)). An event that has no Indonesian sentence yet is written as "objek: kejadian" (object: event) with the underscores replaced by spaces. If there are no records yet, the card writes "Belum ada aktivitas. Setiap perubahan data di perusahaan ini akan tercatat di sini." (No activity yet. Every data change in this company will be recorded here.) For a full trace, open the **Log audit** page ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)).
5. In the **Modul** (Modules) card, click one module (Customers, Services, Inventory, Network assets, SPK, Invoices, Tickets) to open its menu. Each module box says "Buka modul" (Open module). The number in the badge is the amount of data in that module in the active company. A module whose menu you may not open is not shown.

## Common errors

- The **Administrasi** region is missing: your account does not have the permission `users.manage`, `roles.manage` or `company.manage`.
- The **Pengguna** number is smaller than you expect: it counts users whose home company is the active company. Switch company ([section 1.6](/docs/guides/web/introduction/switch-company/)) to see another company.
