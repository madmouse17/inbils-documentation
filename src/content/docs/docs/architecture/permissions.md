---
title: "Roles and permissions"
description: "How Inbils authorises: one permission catalogue, roles owned by each company, role templates, audience markers, policies, separation of duties and the audit log."
---

Inbils checks permissions, never role names. The permissions are one catalogue kept in code. Each company owns its roles and composes them from that catalogue. This page describes the model, the guards around role administration and how a new permission reaches existing companies.

## The permission catalogue

All permissions are listed in `App\Support\PermissionCatalogue::ALL`. Names follow `<area>.<action>`, for example `customer.view`, `network_asset.install`, `inventory.stock.adjust.request`, `billing.payment.record` and `report.consolidated.view`. The catalogue covers application access (`app.web`, `app.technician`), company administration (`users.manage`, `roles.manage`, `company.manage`, `company.integrations.manage`, `company.switch`, `system.setting`), and the business areas: customers, service packages, network and RADIUS, IPAM and ODN, inventory, SPK, billing, tickets, evaluations, the customer portal and reports.

A company never creates a permission. It only decides which ones each of its roles holds. The catalogue is seeded on a fresh install by `RolePermissionSeeder`.

## Roles belong to a company

- A role is a row of `roles` with `company_id` (NOT NULL, foreign key) and an optional `template_key` that records which template it was copied from.
- `App\Models\Role` extends the Spatie model and uses `BelongsToCompany`, so role queries are scoped by the active company and match nothing without one.
- Spatie runs with `teams=false`. Isolation comes from the scoped model, not from Spatie teams. Teams mode was rejected because a role with a null team would be global and one stray row could cross tenants.
- A user holds roles per company: Admin in company A and Teknisi in company B is possible. Roles of one company never reach another.
- Business rules never call `hasRole`, `hasAnyRole`, `->role()` or filter on role names. The architecture test `RoleNameChecksArchitectureTest` scans `app/` and `Modules/` and fails the suite on a violation. Renaming or deleting a role therefore breaks no feature.

### Role templates

The platform keeps starter roles in `role_templates` and `role_template_has_permissions`. They have no `company_id`. When a company is created (setup wizard, platform provisioning or a new subsidiary) the templates are copied into it once. After that the company owns its roles. A deploy never resyncs them, and editing a template changes only companies created afterwards. The `admin` and `customer` templates cannot be deleted, and the `admin` template must keep `roles.manage` and `app.web`.

| Template key | Role name | Purpose |
| --- | --- | --- |
| `admin` | Admin | Every catalogue permission except the markers of other audiences. |
| `manager` | Manajer | Operational controller: approver, reviewer, auditor. |
| `noc` | NOC & Layanan Pelanggan | Customer registration, complaint intake, tickets, outage announcements, network view. No delete, no billing write, no user or role administration. |
| `technician` | Teknisi | Execution of assigned work, evidence submission. |
| `warehouse` | Gudang | Stock and inventory request execution. |
| `finance` | Keuangan | Invoices, payments, refund marking, billing reports. |
| `staff` | Staf | Operational operator: intake, creation, execution, dispatch, collection. |
| `customer` | Pelanggan | External portal user: ticketing and evaluation submission only. |

### Audience markers

Some permissions classify a person instead of opening a feature. They decide which app someone belongs to:

| Marker | Meaning |
| --- | --- |
| `app.web` | Back-office access. A login without it is sent to the `/app-only` page. |
| `app.technician` | Field technician. Subject of the technician report, and the page names the technician app. |
| `portal.access` | Customer account. Works together with the `customers.user_id` link. |
| `evaluation.evaluable` | An employee who can be evaluated. |
| `report.technician.team` | Scope of the technician report: the manager's own organisation unit and below. |
| `roles.manage` | Company administrator. |

No role may hold `portal.access` together with `app.web`. A company administrator is an active member who holds `roles.manage`.

### Default roles

The table shows a few menu entries and what the Admin, Manajer and Staf templates open by default, from the web user guide (appendix 10.1). Companies can edit their copies, so a real company can differ. UI labels are Indonesian.

| Menu or capability | Permission that opens it | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- |
| Dasbor | `dashboard.view` | yes | yes | yes |
| Penugasan | `ticket.assign`, `ticket.reassign`, `spk.assign` or `spk.reassign` | yes | yes | no |
| Persetujuan | `spk.approve`, `spk.reject`, `inventory.request.approve` or `inventory.request.reject` | yes | yes | no |
| SPK | `spk.view` | yes | yes | yes |
| Tiket | `ticket.view` | yes | yes | yes |
| Pelanggan | `customer.view` | yes | yes | yes |
| Tagihan | `billing.view` | yes | yes | yes |
| KPI Penjualan | `report.sales.view` | yes | yes | no |
| Metrik Konsolidasi | `report.consolidated.view` (active company must be a head) | if head | no | no |
| Perusahaan | `company.manage` | yes | no | no |
| Pengguna | `users.manage` | yes | no | no |
| Peran | `roles.manage` | yes | no | no |

## Policies per record

Permissions answer "may this person do this kind of thing". Policies answer "may they do it to this record". The route checks `can:<permission>`, the form request authorises, and a policy runs for every record action. A record that does not exist, belongs to another company or is hidden by its policy answers the same 404. A missing permission on a record the user can see answers 403. Pages and shared props also hide what the user cannot do (`usePermission`), but the server check is the control.

Code that runs without a signed-in user of the company (mobile login, jobs, commands, webhooks) checks permissions inside `CompanyService::runAs($companyId, fn)` or with `User::withPermissionIn($permissions, $companyId)`. Notification audiences come from `StaffRecipients::holding($companyId, $permission)`, never from role names.

## Separation of duties

`App\Support\SodConflicts` declares permission pairs that no role may hold together, unless the role also holds `roles.manage` (the break-glass administrator set).

| Control side | Execution side |
| --- | --- |
| `inventory.request.approve` or `reject` | `inventory.request.prepare` or `issue`, `inventory.stock.receive`, `issue` or `transfer` |
| `inventory.stock.adjust.approve` | `inventory.stock.adjust.request`, `inventory.stock.receive`, `issue` or `transfer` |

The check runs when a role is saved and when roles are assigned to a user, where the permissions of all the user's roles in that company are merged. Same-actor guards in the services and policies bind everyone, administrators included: an SPK approver must not be its creator or assigned technician, an inventory request approver must not be the requester, a stock adjustment decider must not be the requester, an invoice canceller must not be its creator and a payment reverser must not be its recorder.

## Role administration guards

Holders of `roles.manage` administer roles in **Administrasi > Peran**. `CompanyRoleService` performs every write in one transaction that first locks the company row. The guards:

| Guard | Rule |
| --- | --- |
| Hold it yourself | You cannot grant a guarded permission you do not hold. Only `app.technician`, `evaluation.evaluable`, `portal.access`, `portal.invoice.view` and `portal.invoice.pay` are unguarded. |
| Edit scope | You cannot edit or delete a role, or change the roles of a user, who is richer than you. |
| SoD on save | A role with SoD violations is refused unless it holds `roles.manage`. |
| Stacked SoD | The merged permissions of a user's roles must have no violation. |
| Last administrator | At least one active member keeps `roles.manage` and `app.web`. |
| Portal role | The role copied from the `customer` template cannot be deleted. |
| Moving users | Deleting a role with users needs `move_to`, another role of the same company. |
| Stale edit | An edit on an outdated copy is refused with 409. |

A role of another company in a URL answers 404 or a validation error, never data. The platform edits templates in `/platform/role-templates` and can repair one company's roles at `/platform/companies/{company}/roles` as an audited support action. Platform admins never hold tenant roles.

## Audit log

Role writes go to the `security` log through `AuditService`: `role.created`, `role.updated` (with permissions added and removed) and `role.deleted` (with moved users), plus `role.attached` and `role.detached` for assignments. Platform template and repair actions go to the `platform` log, and repairs also write tenant-visible `support` rows. Retention is 365 days, and 730 days for `security`, `platform` and `support`. Audit rows hide personal data such as customer fields and e-mail addresses.

## Shipping a new permission

A deploy never runs `db:seed` for roles. To add a permission:

1. Add it to `PermissionCatalogue::ALL` and to the relevant `templates()` entries.
2. Ship a migration that calls `PermissionCatalogue::release($permission, $templateKeys)`. An example is `database/migrations/2026_11_02_100700_release_ticket_reopen_to_templates.php`.

`release()` creates the permission, adds it to the named templates and to every company role whose `template_key` matches. It never removes anything and never resyncs. Custom roles do not receive it: the company administrator adds it in **Administrasi > Peran**.

Known residual: direct permissions given to a single user are not company-scoped and are not checked by the SoD rules. No application code writes them.
