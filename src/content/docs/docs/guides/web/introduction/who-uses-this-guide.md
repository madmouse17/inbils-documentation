---
title: "1.1 Who uses this guide"
description: "Find out which Inbils web screens apply to admins, managers and staff, and where technicians and customers go instead."
---

This guide is for office users of the Inbils web app: admins, managers and staff. All three open the same web address. What differs is the menus and buttons they see, because Inbils shows only what your role is allowed to do.

- Admins hold all permissions except the customer portal permission. Admins manage users, roles, companies and system settings.
- Managers approve work orders (SPK) and item requests, monitor reports, manage customers, services, the network and invoices, and may cancel invoices and payments.
- Staff do the daily work: editing customer data, creating work orders, tickets and invoices, recording payments, and processing stock in and out of the warehouse.

The detailed split of permissions is in [section 10.1](/docs/guides/web/appendix/roles-and-permissions-summary/). Roles belong to your company: a company admin can create other roles and change what a role contains ([section 8.6](/docs/guides/web/administration/roles/)), so the menu list for each person in your company may differ from the description above. The platform operator is the Inbils team that runs the whole installation through `/platform`, and is not a company admin. Their work is covered separately in the [Inbils Operator Panel Guide](/docs/guides/platform/).

Technicians and customers do not use the web. An account that does not hold the web access permission (`app.web`) is redirected to the **Gunakan aplikasi Inbils** (Use the Inbils app) page, which names the Android app to use: Inbils Teknisi (Inbils Technician) or Inbils Pelanggan (Inbils Customer). That page has the buttons **Buka Play Store** (Open Play Store; shown when the Play Store link has been set), **Kelola akun & 2FA** (Manage account and 2FA) and **Keluar** (Sign out). Technician work (starting and handing over work orders, handling tickets, returning material) and customer work (viewing and paying invoices, creating tickets) is done in the respective apps, with separate guides: [Technician App Guide](/docs/guides/technician/) and [Customer App Guide](/docs/guides/customer/). On the web they only open the sign-in page, forgot password, profile (including 2FA) and the payment result pages. On the profile page, the **Kembali ke halaman aplikasi** (Back to the app page) link takes them back. An account that also holds another role with web access permission, for example Admin, Manager or Staff, is not redirected. An account that holds no role in the company, or whose roles contain neither technician nor customer access, opens the **Akun ini belum punya akses aplikasi web** (This account has no web app access yet) page with the note "Minta admin perusahaan Anda memberi peran yang memuat akses web." (Ask your company admin to give you a role that includes web access.)

If the Play Store link for that app has not been set, the **Gunakan aplikasi Inbils** page shows "Minta tautan aplikasi ke admin ISP Anda." (Ask your ISP admin for the app link.) where the **Buka Play Store** button would be.

## How to read the guide

- Menu names, buttons, tabs and fields are written in bold exactly as they appear on screen. All Inbils screens are in Indonesian. The following abbreviations and product names are not translated: SPK, ODN, ODP, OLT, PON, NAS, IP, CIDR, MAC, VLAN, SLA, MRR, KPI, SKU, RADIUS, Midtrans, WhatsApp, 2FA and Email.
- The images come from the sample data "Inbils Demo Company" with an admin login. The data and buttons on your screen can differ, especially if your role is not admin.
- Each menu starts with its purpose and the roles that can use it, followed by numbered steps and a list of common errors.
- [Chapter 9](/docs/guides/web/workflows/new-customer-to-payment/) arranges workflows that pass through several menus. [Chapter 10](/docs/guides/web/appendix/roles-and-permissions-summary/) contains the tables of roles and terms.

If a menu named in this guide is not in your sidebar, your role does not have its permission yet. Ask the company admin to add it to your role in the Peran (Roles) menu, or to give you another role in the Pengguna (Users) menu ([section 8.5](/docs/guides/web/administration/users/) and [8.6](/docs/guides/web/administration/roles/)). If you open a page you are not allowed to see, Inbils shows the **Akses ditolak** (Access denied) page with the message "Anda tidak punya izin untuk membuka halaman ini. Hubungi administrator jika Anda memerlukan aksesnya." (You do not have permission to open this page. Contact the administrator if you need access.) Click **Ke dasbor** (To dashboard) to go back.
