---
title: "Service layer and frontend"
description: "Where Inbils puts business rules (services, actions, query classes, resources) and how React pages work as Inertia islands with Ziggy routes and shared UI primitives."
---

Inbils keeps each kind of code in one place. Controllers are thin, services own the business rules and the transaction, actions combine services, query classes handle heavy reads, and resources shape what leaves the server. The frontend follows the same discipline: Laravel owns routing, auth and workflow, and each page is a small React island. This page covers both halves.

## Backend pattern

```
Route -> middleware (auth, company, can:) -> Controller (thin)
      -> FormRequest (validation + authorize) -> Policy (per record)
      -> Service (business rules, DB::transaction) [-> Action when it spans services]
      -> Model (relations, scopes, casts(), factory; NO business logic, NO service call)
      -> API Resource / Inertia props
```

### Controllers

A controller parses the request, calls one service and returns an Inertia page, a resource or a redirect. It holds no business logic.

### Form requests

Every write has a form request. It validates the input and authorises the action, using `$fillable` explicitly (never `Model::guarded([])`). Requests that name records accept public ULIDs and map them to integer keys within the company (`ResolvesPublicIds`, `PublicIdExists`).

### Policies

A policy decides per record. See [Roles and permissions](/docs/architecture/permissions/) for the 404 versus 403 rule.

### Services

A service holds the business rules: create, update, delete and state transitions. It wraps writes across several tables in `DB::transaction()` and writes audit events through `AuditService`. A service must not:

- handle the HTTP request or response (the controller's job),
- call `request()->input()` (the validated data is passed in),
- render a view,
- call `env()` (use `config()`).

Services are named `{Domain}Service`, for example `SubscriptionService`, `CompanyService` and `CompanyRoleService` in the shared core, and `NetworkAssetService` in a module.

### Actions

An action orchestrates a process that spans several services, so no single service has to know the others. Actions are named `{Verb}{Entity}Action`. The core ones in `app/Actions/` are `CreateCustomerOnboardingAction`, `CreateInvoiceFromSpkAction`, `SetCustomerWhatsAppConsentAction` and `AssignCustomerAcquirerAction`. Platform provisioning has `ProvisionTenantAction` and `AddTenantSubsidiaryAction`. Modules have their own `Actions/` folders.

### Query classes

A query class holds a complex read: more than about 30 lines, or used by two or more controllers. They live in `app/Queries/` and `Modules/<Name>/Queries/`, are read-only and return data for an Inertia page, such as the dashboard, the approval inbox, the dispatch queue or "Pekerjaan Saya".

### Resources

Every API and Inertia response is shaped by an Eloquent resource, so the frontend contract stays stable. A resource embeds related records as short summaries (`{id, code, name}`), never whole models, and emits `public_id` as `id`. The mobile app resources live in `app/Http/Resources/Api/V1/` and are allow-lists, separate from the admin ones.

### Naming

| Artifact | Pattern |
| --- | --- |
| Service | `{Domain}Service` |
| Action | `{Verb}{Entity}Action` |
| Policy | `{Model}Policy` |
| Resource | `{Model}Resource` |
| Route name | `admin.<area>.<action>` |
| Permission | `<area>.<action>` |
| Foreign key | `{singular}_id` |

### Integrity helpers

The guards that already exist are `OptimisticLock` (stale edit gives 409), `PreventDuplicateWebSubmit` (identical write within 10 seconds is refused), the `X-Inbils-Company` check in `ResolveActiveCompany`, `DetectRecordEnumeration` (429 after many record 404s) and `lockForUpdate` for counters and code generation. Money uses `App\Support\Money`. Numbering uses `NumberSequenceService` with templates per company, never hand-built codes.

## Frontend: Inertia pages as islands

Each route renders one React page from `resources/js/Pages/**`. There is no client router, no Redux or Zustand and no React Query. Server state arrives as Inertia props. Local UI state (a modal, a tab, a filter draft) uses `useState`. Persistent actions (save, delete) are Inertia visits.

```
resources/js/
  app.tsx                Inertia bootstrap, ToastProvider, ErrorBoundary, X-Inbils-Company interceptor
  Components/ui/         Primitives: Button, Input, Table, Card, Modal, Dialog, Badge, EmptyState, Skeleton, Toast, ...
  Components/composite/  Business patterns: DataTable, PageHeader, FormField, FormSection, ConfirmDialog, MoneyInput, StatusFilter, ...
  Layouts/               AdminLayout, GuestLayout, SetupLayout, PlatformLayout, PlatformAuthLayout
  Pages/                 Admin/<Domain>/, Platform/, Portal/, Auth/, Profile/, Setup/, Isolir/
  hooks/                 usePermission, useCompany, useInertiaForm, useToast, useServerTable, ...
  lib/                   utils, format, dateFormat, filters, ...
  types/                 TypeScript interfaces that mirror the resources
```

### Page rules

- Pages compose `Components/ui/*` and `Components/composite/*`. Raw `<button>`, `<input>`, `<table>` and `<select>` do not appear in pages. A missing primitive is added to `Components/ui/` first, with props only (no fetching).
- Variants live on the component (with `class-variance-authority`), not in page-level class overrides.
- Forms use `useForm` from `@inertiajs/react`, or its toast wrapper `useInertiaForm`. Validation errors return in `errors`. Edit forms send `expected_updated_at`.
- `usePermission()` reads `auth.user.permissions` from the shared props to hide or disable controls. The server still enforces.
- Pagination, sorting and filters are server driven (`useServerTable` and `DataTable`), not client-side over a full list.
- Lists and tables need loading, empty and error states. Deferred props need a skeleton.
- `axios` is only for a few JSON helpers such as quick-create dialogs. Its `X-Inbils-Company` header is added by the interceptor in `app.tsx`.

### Ziggy routes

Pages navigate with `<Link>` and `router` from Inertia and with `route('admin.x.y')` from Ziggy. `@routes` in `app.blade.php` loads one route group for the tenant shell and another for the platform shell, so moving between them is a full page load. There are no hardcoded URLs. `resources/js/ziggy.js` is generated and git-ignored.

### Shared UI primitives and styling

- TypeScript is strict with no `any`. Components are function components with explicit props.
- Icons come from `lucide-react` only.
- Tailwind CSS v4 is configured in CSS (`resources/css/app.css`, `@theme`), with light and dark tokens. Components use semantic tokens (`brand`, `surface`, `success`, `warning`, `danger`, `--status-*`) and never raw hex. Dark mode is a class on `<html>`.
- Text and links in the brand or red colour use `text-primary-text` and `text-destructive-text`, not `text-primary` or `text-destructive`, to keep contrast at 4.5:1 for text and 3:1 for borders and icons in both themes.
- `Button` has variants `primary` (the one main action), `outline` and `secondary`, `destructive-outline`, `destructive` (confirmation only) and `ghost` (icon-only toolbars).
- Controls are 44 px high below the `sm` breakpoint and on coarse pointers. Text is never below 12 px. Interactive elements show visible focus, hover, active and disabled states.
- The theme is flat. The font is Figtree, self-hosted.
- Empty values use `<EmptyCell />`. UI copy is Indonesian, in sentence case, with no em dash.
- Code is formatted with Prettier (4 spaces, single quotes, width 100) and checked with ESLint and `tsc`.
