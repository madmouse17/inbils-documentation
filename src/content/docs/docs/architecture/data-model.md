---
title: "Data model"
description: "The main Inbils tables and relations by area, plus the invariants the schema enforces: immutable ledgers, per-company codes, public ULIDs and optimistic locking."
---

Inbils stores everything in MySQL 8.4. Charset is `utf8mb4` with the `utf8mb4_unicode_ci` collation. This page summarises the tables by area and the rules that every table follows. Per-module behaviour and state machines are described on the module pages under [Modules](/docs/modules/).

## Conventions every table follows

| Rule | Detail |
| --- | --- |
| Tenant column | Every master and transaction table has `company_id` (foreign key to `companies.id`, NOT NULL) and uses the `BelongsToCompany` trait. See [Multi-tenancy](/docs/architecture/multi-tenancy/). |
| Global tables | `companies`, `users` (its `company_id` is the nullable home company), `permissions`, `role_templates` and `activity_log`. `roles` is tenant-owned and carries `company_id`. |
| Business codes | Unique per company: `(company_id, code)`, `(company_id, sku)`, `(company_id, serial_number)`, `(company_id, number)`. Never globally unique, except `companies.code`. |
| Indexes | A composite index starts with `company_id`. MySQL limits index names to 64 characters, so long names are shortened by hand. |
| Foreign keys | Mandatory. `RESTRICT` for parent masters, `CASCADE` for child line items. |
| Money and quantity | `decimal(15,2)`. |
| Enum-like columns | A MySQL enum plus a `CHECK` constraint, for example `work_orders.status`, `network_assets.status`, `tickets.status`, `invoices.status`. |
| Polymorphic references | A string type plus a bigint id, with no database foreign key and validation in the application. Example: `stock_movements.reference_type` and `reference_id`. |
| Table names | Not prefixed by module (`products`, not `inventory_products`). Pivot tables are alphabetical. |

## Tables by area

### Core

| Table | What it holds |
| --- | --- |
| `companies` | Tenants. `parent_company_id` makes a head company and its subsidiaries. `settings` is JSON. |
| `users` | Staff, technicians and customer accounts. Two-factor secrets are encrypted and never fillable. Soft delete. |
| `company_user` | Membership of a user in a company. Unique `(company_id, user_id)`, with one default (home) row per user. |
| `roles`, `permissions`, `role_templates` | Per-company roles, the global permission catalogue and the platform templates. See [Roles and permissions](/docs/architecture/permissions/). |
| `locations` | A self-referencing tree of region, area, POP, rack and site, with a computed `path`. |
| `customers` | `customer_addresses`, `customer_contacts` and `service_subscriptions` hang off a customer. Soft delete. |
| `service_subscriptions` | A package sold to a customer. Status, activation and suspension dates, billing day, and a link to the ONT asset. |
| `employee_evaluations` | Evaluations, referencing a ticket or SPK polymorphically. |
| `activity_log` | The audit trail (Spatie). Global and polymorphic. |

### Service catalogue

`service_packages`, `bandwidth_profiles`, `speed_profiles` and `sla_tiers` are masters with `is_active` and soft delete. `service_package_versions` is append-only: each change of price, profile, SLA tier or category appends version n+1, and every subscription points at the version it was sold under (`service_subscriptions.service_package_version_id`, NOT NULL, `RESTRICT`). RADIUS rate limits, the ticket SLA tier and the subscription's package terms follow the version, not the live package.

### Network

| Table | What it holds |
| --- | --- |
| `network_assets` | Devices with a serial number, MAC, status (`in_stock`, `installed`, `maintenance`, `retired`), location, customer and subscription. Unique `(company_id, serial_number)`. |
| `network_asset_installations` | Append-only installation history. |
| `nas_devices`, `network_accounts` | RADIUS clients (routers) and the RADIUS accounts of subscriptions. |
| `vlans`, `ip_prefixes`, `ip_addresses` | The IPAM register. Prefixes form a tree through `parent_id`. |
| `odn_splitters`, `odn_ports`, `asset_ports` | The optical network register and device ports. |
| `port_templates` | Shared reference data for device faces. It has no `company_id` and no `public_id`. |

### Inventory

`categories`, `units` and `products` are masters. `stocks` holds the quantity per product and location, unique per `(company_id, product_id, location_id)`. `stock_movements` is the immutable ledger: each row has a type (`receive`, `issue`, `transfer`, `adjust`, `return`), a quantity and a polymorphic reference. Requests live in `inventory_requests` and `inventory_request_items`, approved adjustments in `stock_adjustment_requests`, and material returns in `material_return_cases`, `material_return_lines` and `material_return_events`.

### SPK (work orders)

`work_orders` has a code, type (`install`, `maintain`, `upgrade`, `relocate`), status (`pending`, `assigned`, `in_progress`, `completed`, `cancelled`), customer, subscription, location and assignee. `work_order_items` (issue or return lines) cascade with the order. `work_order_assignments` is append-only. `work_order_evidence` holds the files.

### Billing

`invoices` (types `mrc`, `otc`, `adjustment`; statuses `draft`, `sent`, `paid`, `overdue`, `cancelled`), `invoice_items` (cascade) and `payments` (append-only). `payment_attempts` tracks online payment tries. A STORED generated column, `active_recurring_period`, together with a unique index on `(company_id, subscription_id, active_recurring_period)`, stops two active recurring invoices for one subscription and period. Cancelled or deleted invoices and manual or one-time invoices leave it NULL, so they never collide.

### Ticketing

`ticket_categories`, `tickets` (status `open`, `assigned`, `in_progress`, `resolved`, `closed`; unique `(company_id, code)`), `ticket_comments` (cascade, with an internal flag) and `ticket_attachments`.

### Main relations

```
companies 1-N companies (parent_company_id: head company to subsidiaries)
companies N-N users (company_user)
customers 1-N customer_addresses, customer_contacts, service_subscriptions
service_packages 1-N service_package_versions 1-N service_subscriptions
network_assets N-1 locations, customers, service_subscriptions
customers / service_subscriptions 1-N work_orders 1-N work_order_items, assignments, evidence
customers / service_subscriptions 1-N invoices 1-N invoice_items, payments
customers 1-N tickets 1-N ticket_comments, ticket_attachments
```

One documented exception to the dependency direction: `service_subscriptions.ont_asset_id` points from the core to `network_assets`. It is a denormalised back-link, and core code does not import the asset model.

## Invariants

### Immutable ledgers

`StockMovement`, `NetworkAssetInstallation`, `Payment`, `work_order_assignments`, `service_package_versions` and the activity log are append-only. `StockMovement` throws on update or delete, and `ServicePackageVersion` throws on update. A correction is a new row, such as a compensating movement. Only Inventory services and actions change stock.

### Soft deletes only for history

Customers, addresses, work orders, invoices, tickets, products, network assets and subscriptions use soft delete. Ledgers do not. No unique index includes `deleted_at`, so a trashed row keeps its code reserved. History pages read relations with `withTrashed()`, so a document still names a parent that was deleted.

### Deactivate before delete

Masters have `is_active`. A master is deactivated while anything refers to it and hard-deleted only when nothing ever did. `LifecycleService` performs `deactivate`, `activate`, `destroyIfUnreferenced` and `restore`, and each is audited. A test fails when a restricting foreign key to a lifecycle table is not declared in its reference list.

### Snapshot columns

Nullable `_snapshot` columns keep a name as it was when a document reached its final state, for example `invoices.customer_name_snapshot`, `work_orders.technician_name_snapshot` and `tickets.category_name_snapshot`. Readers use `snapshot ?? live value`.

### Public ULID identifiers

Every table whose rows a URL, API path or payload names has `public_id char(26)`, unique and NOT NULL, a lowercase ULID. The integer `id` stays the primary key and every foreign key, and never leaves the server. Models use `HasPublicId`, routes use `whereUlid`, and bulk writes use `PublicId::new()`. A test lists the covered tables and fails for a new tenant model without the trait.

### Optimistic locking

Edit forms send `expected_updated_at`. `App\Support\OptimisticLock` compares it with the row and refuses a stale edit with 409. Counters and code generation use `lockForUpdate`.

### Migrations

Migrations are additive and reversible on shared databases. A new migration must sort after the newest shipped one, or it runs out of order on databases that already migrated past it. A tenant table migration adds `company_id` and per-company unique indexes. A seed installs only the permission catalogue, the role templates and system setting defaults. Per-company master data (units, ticket categories, SLA tiers, sample locations) is created when a company is created.
