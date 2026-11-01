---
title: "Architecture overview"
description: "How Inbils is built: the stack, the layered request flow, Inertia pages, the repository map, transactions, integrity rules, caching and queues."
---

Inbils is one Laravel application that serves many ISPs (tenants). It renders its screens with Inertia and React, keeps business rules in service classes, and splits domain code into nwidart modules. This page gives the overall shape. The other architecture pages go deeper: [Multi-tenancy](/docs/architecture/multi-tenancy/), [Roles and permissions](/docs/architecture/permissions/), [Data model](/docs/architecture/data-model/), [Service layer and frontend](/docs/architecture/service-layer/) and [Modules and boundaries](/docs/architecture/modules/).

## Stack

| Layer | Technology |
| --- | --- |
| Runtime | PHP `^8.4` in `composer.json`. The Sail and production images run PHP 8.5.12 or newer. FrankenPHP serves production. |
| Framework | Laravel `^13.0`, Inertia Laravel `^2.0` |
| Modules | `nwidart/laravel-modules ^12.0`, with the composer merge plugin reading `Modules/*/composer.json` |
| Auth | Laravel Sanctum `^4.0` for mobile tokens, session guards for the web, Breeze scaffolding for the login screens |
| Packages | `spatie/laravel-permission`, `spatie/laravel-medialibrary`, `spatie/laravel-activitylog`, `spatie/laravel-query-builder`, `tightenco/ziggy`, `barryvdh/laravel-dompdf`, `kreait/laravel-firebase`, `laravolt/indonesia`, `mlocati/ip-lib`, `pragmarx/google2fa` |
| Database | MySQL 8.4 |
| Cache and queue | Redis 7.4 for the cache. The queue driver is `database` in the documented setups. |
| Frontend | React `^18.2`, TypeScript `^5`, `@inertiajs/react ^2`, Vite `^7`, Tailwind CSS `^4.3` (CSS-first, no `tailwind.config.js`), Radix UI primitives, `lucide-react`, `@tanstack/react-table`, `recharts`, `leaflet` |
| Tests | PHPUnit 11 (no Pest), Playwright for end-to-end |

Older notes in the repository still mention Tailwind v3 or Laravel 11. They are out of date.

## Layered backend flow

A request passes through the same layers on every write:

```
Route -> middleware (auth, company, can:) -> Controller (thin)
      -> FormRequest (validation + authorize) -> Policy (per record)
      -> Service (business rules, DB::transaction) [-> Action when it spans services]
      -> Model (relations, scopes, casts(), factory; no business logic)
      -> API Resource / Inertia props
```

| Layer | Job |
| --- | --- |
| Route and middleware | Authenticate, resolve the active company, check the route permission (`can:<permission>`). |
| Controller | Parse the request, call one service, return an Inertia page, a resource or a redirect. No business logic. |
| Form request | Validate every write and authorise it. |
| Policy | Decide per record. A scope denial answers a uniform 404, a missing permission on a visible record answers 403. |
| Service | Own the business rules and the database transaction. Write audit events through `AuditService`. |
| Action | Orchestrate a process that spans several services. Named `{Verb}{Entity}Action`. |
| Model | Relations, scopes, casts and factories only. A model never calls a service. |
| Resource | Shape the output. Related records are embedded as short summaries, never whole models. |

Authorisation is checked at the route, in the form request and in a policy for each record action. Hiding a button in the UI is a convenience, not a control.

## Inertia pages

Laravel owns routing, authentication, permissions and workflow. Each route renders one React page under `resources/js/Pages/**`. There is no single-page-app router, no Redux and no React Query. Server state arrives as Inertia props, and forms use `useForm` from `@inertiajs/react`. Details are in [Service layer and frontend](/docs/architecture/service-layer/).

## Repository map

```
app/                 Shared core: companies, users, auth, audit, customers, subscriptions, locations, platform
  Actions/           Multi-service orchestration
  Http/Controllers/  Admin/ (tenant back office), Api/V1/ (mobile), Auth/, Platform/, Setup/
  Http/Middleware/   ResolveActiveCompany, HandleInertiaRequests, Api/*, Platform/*, ...
  Http/Requests/     Form requests
  Models/            Core models, Role, RoleTemplate, PlatformAdmin
  Policies/          Core policies
  Queries/           Read-heavy query classes
  Services/          Core services, Platform/, Push/, WhatsApp/
  Support/           PermissionCatalogue, PublicId, OptimisticLock, Money, SodConflicts, ...
  Traits/            BelongsToCompany, HasPublicId, HasLifecycle
Modules/<Name>/      Domain code, namespace Modules\<Name>\
bootstrap/app.php    Middleware groups and aliases, exception rendering, routing
config/              platform.php, security.php, sanctum.php, modules.php, ...
database/            Core migrations, seeders, factories
resources/js/        Frontend: Pages, Components/ui, Components/composite, Layouts, hooks, lib, types
routes/              web.php, admin.php, api.php, webhooks.php, platform.php, console.php
tests/               Feature, Unit, shared builders, Playwright specs
```

| Route file | Content |
| --- | --- |
| `routes/web.php` | `/`, `/ready`, `/app-only`, the one-shot `/setup` wizard, the profile. |
| `routes/admin.php` | Tenant back office. Prefix `admin`, route names `admin.*`. |
| `routes/platform.php` and `routes/platform/*.php` | Operator panel under `/platform`. Every file in the folder is loaded automatically. |
| `routes/api.php` | Mobile API under `api/v1`, route names `api.v1.*`. |
| `routes/webhooks.php` | Server-to-server callbacks such as WhatsApp. Throttled, no session or CSRF. |
| `routes/console.php` | The scheduler. |

Each module also has its own `routes/web.php`, `api.php` and `webhook.php`, mapped by the module's `RouteServiceProvider`.

## Request flow of one screen

The network asset screens show the whole chain:

1. `GET /admin/network-assets` passes the group middleware `auth`, `verified`, `redirect.app.only` and `require.has.company`.
2. `NetworkAssetController::index` authorises `viewAny` on the model, runs a query class and returns an Inertia page with resources as props.
3. React renders the page inside `AdminLayout`. The user opens an asset and installs it.
4. The page sends `POST /admin/network-assets/{asset}/install`. The ULID in the URL is checked by `whereUlid` before any query runs.
5. `InstallNetworkAssetRequest` validates the input. The controller authorises `network_asset.install`.
6. `NetworkAssetService::install` writes in a transaction. It refuses to run without a company context.
7. The controller redirects back with a flash message, which the page shows as a toast.

## Transactions and integrity

- A write that touches several tables runs inside `DB::transaction()` in a service.
- Foreign keys are mandatory. `ON DELETE RESTRICT` protects parent records, `ON DELETE CASCADE` removes child line items such as `invoice_items`, `work_order_items` and `ticket_comments`.
- Business codes are unique per company, for example `(company_id, sku)`. Unique indexes and check constraints in the database win over application validation.
- Soft deletes exist only for historical entities. `StockMovement`, `NetworkAssetInstallation` and `Payment` are append-only.
- Forms send `expected_updated_at`. A stale edit is refused with 409 (`App\Support\OptimisticLock`).
- An identical `admin.*` write by the same user within 10 seconds is refused (`PreventDuplicateWebSubmit`).
- Counters and code generation use `lockForUpdate`. Money goes through `App\Support\Money`, and numbers through `NumberSequenceService`.

See [Data model](/docs/architecture/data-model/) for the full list of invariants.

## Caching and queues

- The cache holds scalars and arrays only: `config/cache.php` sets `serializable_classes` to `false`, so a model, collection or Carbon object would come back broken. Cache keys carry a version such as `v2` so a deploy or rollback never reads an old shape.
- The Spatie permission cache is one global key that holds every company's roles. It is flushed after every role write.
- Fast-changing business data such as stock and asset status is not cached.
- Slow or bulk work (mail, PDF, exports, imports, external APIs) runs in queued jobs. Platform long jobs use their own `platform` queue. See [Queues and scheduler](/docs/operations/queues-and-scheduler/).
- The scheduler lives in `routes/console.php`: billing runs, `tickets:sla`, `midtrans:reconcile`, `network:sync`, heartbeats, prunes and reminders.
