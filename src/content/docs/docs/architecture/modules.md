---
title: "Modules and boundaries"
description: "The nine Inbils modules, what each owns, the dependencies they declare, how modules talk to each other, the shared core in app/ and the known quirks."
---

Inbils splits domain code into nine nwidart modules and keeps cross-cutting code in a shared core under `app/`. Modules are generated with `sail artisan module:make <Name>`. Code lives in `Modules/<Name>/app/` under the namespace `Modules\<Name>\`, next to `database/{migrations,factories,seeders}`, `routes/`, `tests/` and `module.json`.

## The nine modules

| Module | Owns | Declared dependencies | Page |
| --- | --- | --- | --- |
| Billing | Invoice, InvoiceItem, Payment, payment attempts, Midtrans, receivables | Inventory, SPK, Service | [Billing](/docs/modules/billing/) |
| Customer | A shell with providers and a scaffold controller, switched off in `modules_statuses.json`. The customer model and service live in `app/`. | none | [Customers](/docs/modules/customers/) |
| Inventory | Product, Category, Unit, Stock, StockMovement, requests, adjustments, material returns | none | [Inventory](/docs/modules/inventory/) |
| Ipam | IP prefixes, VLANs, addresses | NetworkAsset | [Network](/docs/modules/network/) |
| NetworkAsset | NetworkAsset, installations, NAS devices, RADIUS sync, ODN | Service, Ipam | [Network](/docs/modules/network/) |
| Reporting | Read-only report queries, registry, drill-down, exports | Billing, Inventory, NetworkAsset, SPK, Ticketing | [Reporting](/docs/modules/reporting/) |
| SPK | WorkOrder, items, assignments, evidence | Inventory, NetworkAsset | [Work orders](/docs/modules/work-orders/) |
| Service | Service packages, bandwidth and speed profiles, SLA tiers, announcements, promo banners | none | [Service catalogue](/docs/modules/service-catalogue/) |
| Ticketing | Ticket, categories, comments, attachments, SLA | SPK, NetworkAsset | [Ticketing](/docs/modules/ticketing/) |

The dependencies are the `dependencies` array in each module's `module.json`. The technician report is described on [Technician performance](/docs/modules/technician-performance/). Landing page for all modules: [Modules](/docs/modules/).

## The shared core

Cross-cutting code stays in `app/`: companies, users, auth, audit, settings, customers and subscriptions. These shared models live in `app/Models/Core/` and any module may import them: `Customer`, `CustomerAddress`, `CustomerContact`, `ServiceSubscription`, `Location` and `EmployeeEvaluation`. They are shared, not owned by one module.

## Boundary rules

These rules are the standard for new code:

- Domain logic belongs in `Modules/<Name>/`, not in `app/`.
- Do not import another module's `Models` from a controller or service. Go through the other module's service, a cross-module action in `app/Actions/`, or an event and listener.
- Declare a new dependency in the module's `module.json`.
- Tables are not prefixed by module.
- Inventory is the source of truth for stock. Other modules change stock only through Inventory actions and services.
- Reporting is the one allowed read-only exception that reads every module.
- A shared core model must not hold a foreign key to a module model, apart from the exception below.
- A UI primitive in `Components/ui/*` must not import from `Components/composite/*`.

### Allowed directions

```
SPK         issues stock from      Inventory
SPK         installs assets in     NetworkAsset
SPK         activates              the subscription (core)
SPK         triggers an invoice in Billing
Ticketing   spawns a work order in SPK
Ticketing   links to               customer, subscription, asset (shared core and NetworkAsset)
Billing     suspends               the subscription (core)
Billing     issues stock from      Inventory (rare)
NetworkAsset links to              customer, subscription, location (shared core)
Reporting   reads                  all modules, never writes
```

Inventory and NetworkAsset must not import SPK or Billing models. The reverse direction goes through a polymorphic reference or a shared core model.

## How modules talk to each other

1. **Service contract or service call.** Module A calls a service of module B. Example: NetworkAsset writes asset IP addresses through `Modules\Ipam\Services\IpAssignmentService`.
2. **Action class.** A cross-module process lives in an action in `app/Actions/`. Example: `CreateInvoiceFromSpkAction`.
3. **Events and listeners.** Loose coupling for non-critical effects. Example: IPAM dispatches `IpAssignmentChanged` after the transaction commits, and NetworkAsset listens with `QueueAccountOnIpAssignmentChange` to queue a RADIUS account update. NetworkAsset also has `ServiceSubscriptionNetworkObserver`, which queues the router apply job when a subscription changes, so the core never calls the module.
4. **Polymorphic references.** Stock links use the string `stock_movements.reference` and a reference id, not a hard foreign key.

## Documented exception

`service_subscriptions.ont_asset_id` is a column on the core table that points to `network_assets` (no database foreign key), which inverts the normal direction. It is tolerated because the ONT link is essential to an ISP. It is a denormalised back-link, and the core `ServiceSubscription` model imports `NetworkAsset` for the relation.

## Quirks

Do not "fix" these without a reason:

- The code is ahead of the older rule documents. In code, modules import each other's models in places (for example Inventory reads SPK and Ticketing models, and Reporting reads several modules), and `module.json` does not list every such dependency. The boundary rules are the standard for new code. Existing code is not mass-refactored.
- The core also reaches into modules in places. `SubscriptionService` in `app/Services/Core/` calls `IpAssignmentService`, `NetworkAssetService` and `OdnService`, for example to release a terminated subscription's static address and drop port in the same transaction.
- `Ipam` and `NetworkAsset` list each other as dependencies. Older notes list Ipam with no dependencies.
- `Modules/Service` keeps `Models/`, `Http/` and `Policies/` at the module root and maps them in its own `composer.json` PSR-4 block. Other modules use `app/`.
- `Modules/Ipam` has no `tests/` folder.
- The `Customer` module is an empty shell and is set to `false` in `modules_statuses.json`, so it is not loaded. Customer code lives in `app/`.
- `Reporting` has no migrations and no writes. One read-only model, `SalesCustomer` on the `customers` table, declares the Billing relations that the sales KPI aggregates, so the core `Customer` never depends on Billing. It refuses to save or delete.
- Older architecture notes describe a previous layout (`Entities/` folders, a different `Http/Requests` placement). Trust `Modules/` itself.

## Tests and routes per module

Each module's tests live in `Modules/<Name>/tests/{Feature,Unit}`, and the PHPUnit suite named `Modules` picks up `*Test.php` files there. Each module's `RouteServiceProvider` maps the route files the module has: `routes/web.php` (web group) and `routes/api.php` (same `api/v1` prefix and `api.v1.` names). Only Billing has `routes/webhook.php`, throttled for Midtrans.
