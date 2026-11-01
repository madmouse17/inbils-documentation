---
title: "1. Introduction"
description: "Learn who the operator panel guide is for, how tenants and companies relate, and how to read the screens of the Inbils /platform panel."
---

## 1.1 Who uses this guide


This guide is for Inbils operators, also called superadmins. Operators run one Inbils installation for many ISP companies. Operators use the `/platform` panel to create companies, check tenant health, answer requests from subsidiaries, help users, maintain role templates and repair company roles, request data exports, and read the cross-company audit.

Roles that can use it: all platform operators with an active account. The operator panel does not divide operators into different roles or permissions. Access is full once the operator passes two-step authentication (2FA) in that session.

An operator account is separate from a company account. It is stored as `PlatformAdmin` in the `platform_admins` table, uses the `platform` guard, and has no home company, membership, company role, app token or **Ingat saya** (Remember me) feature. An operator account also does not appear in a company's **Pengguna** (Users) menu.

A company admin differs from an operator:

| Item | Platform operator | Company admin |
| --- | --- | --- |
| Sign-in address | `/platform` or a dedicated platform host | Inbils web sign-in page |
| Scope | all tenants on one installation | the companies that account may enter |
| 2FA | required | set by the user, or required by company policy |
| Idle session limit | 30 minutes | 120 minutes by default |
| Roles | maintains templates for new companies and repairs company roles as a logged support action | creates, edits and deletes the roles of their own company in the **Peran** (Roles) menu |
| Tenant operational data | opened through **Akses dukungan** (Support access) as a tenant user | opened directly according to the user's permissions |
| Forgotten password | no self-service recovery | reset link by email |

Company admins, managers and staff follow the **Inbils Web Guide**. Technicians and customers follow the guide for their own app.


## 1.2 Companies, subsidiaries and tenants


One row on the operator dashboard represents one tenant. A tenant consists of one top-level company and all its subsidiaries. This guide calls the top-level company the parent company or Head.

The operator opens a tenant page through its parent company. A subsidiary has no tenant page of its own in the operator panel. When the operator suspends, reactivates, exports or deletes a tenant, the action covers the parent company and its subsidiaries according to the rules in [chapter 6](/docs/guides/platform/suspend-reactivate-delete/) and [9](/docs/guides/platform/company-data-export/).

The data of each company stays separate. Users, customers, subscriptions, invoices, inventory, network and audit of a tenant are always read by the company that owns them. The figures on the parent company row of the dashboard add up the data of the parent and its subsidiaries.


## 1.3 How to read the guide


- Menu names, buttons, badges and fields are written in bold exactly as they appear on screen.
- Error messages are written in quotation marks.
- Route names, commands, role codes and permission codes are written as `code`.
- **Peran yang dapat memakai** (Roles that can use it) explains who performs the step. Most screens are used by all operators. Console commands are run only by the server team, who have terminal access.
- Images are taken from the E2E database with an operator account and sample companies. The names, amounts, statuses and times on your installation will differ.
- Sections that describe company screens refer to the **Inbils Web Guide** when the operator needs to understand what tenant users see.

The panel is normally opened at `/platform` on the application host. When the server team sets `PLATFORM_DOMAIN`, the platform routes are available only on that host. The dedicated host still uses the `/platform` path and must share the session with the application so that **Akses dukungan** can switch to the tenant screens.


## 1.4 Getting to know the screen


The operator panel uses the same frame on every page:

- The coloured band at the top shows **Panel operator** (Operator panel) and "Akses lintas perusahaan tercatat di audit." (Cross-company access is recorded in the audit.)
- The sidebar called **Inbils Platform** contains **Dasbor** (Dashboard), **Perusahaan baru** (New company), **Templat peran** (Role templates), **Ekspor** (Export) and **Audit platform** (Platform audit).
- On a narrow screen, click the **Menu navigasi** (Navigation menu) button to open the sidebar.
- The top bar shows the page title and the operator menu. The menu contains the name, email, **Autentikasi dua langkah** (Two-step authentication), **Mode gelap** (Dark mode) or **Mode terang** (Light mode), and **Keluar** (Sign out).
- The **Lewati ke konten utama** (Skip to main content) link appears when it receives keyboard focus.
- A green toast marks a successful action. A red toast shows a refusal or failure.
- Choose the number of rows in the "10 / halaman" (10 / page) box (10, 25 or 50). The **Sebelumnya** (Previous) and **Berikutnya** (Next) buttons change the page.

Sensitive actions open a dialog. The fields that may appear:

- **Alasan** (Reason), 5 to 200 characters. The note below it says that the reason is recorded in the audit.
- **Ketik {kode} untuk melanjutkan** (Type {code} to continue). Upper and lower case must match.
- **Kata sandi operator** (Operator password). Use the password of the operator account, not of a company account. This field appears only when the last password confirmation was more than 5 minutes ago. While the confirmation is still valid, the dialog shows "Terkonfirmasi sampai HH.mm" (Confirmed until HH.mm) ([section 2.5](/docs/guides/platform/sign-in-and-account-security/)).

The action button stays inactive until all required fields are valid.
