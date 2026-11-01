---
title: "Multi-tenancy"
description: "How one Inbils installation isolates many ISPs: company scoping, the active company, the platform operator panel, impersonation, export, purge and per-company roles."
---

One Inbils installation hosts many ISPs. A tenant is one top-level company plus its optional subsidiaries. Every tenant record carries a `company_id`, and the application filters on it automatically and fails closed. This page explains how the isolation works and what the platform operators can and cannot do.

## What a tenant is

- `companies.parent_company_id` is null for a top-level company. A subsidiary points at its parent. The hierarchy has one level: head company, then subsidiaries. Self-parenting and deeper nesting are refused by `CompanyHierarchyService`.
- `Company::isHead()` is true for a top-level company that has active subsidiaries.
- A head company sees its subsidiaries only in the read-only consolidated report (permission `report.consolidated.view`, and the currencies must match). Writing in a subsidiary means switching to it.
- Company identity (name, logo, currency, timezone) lives in the database (`companies` and `companies.settings`), never in `.env`. Secrets and infrastructure stay in `.env`. Midtrans, WhatsApp, RADIUS and mail accounts are stored per company in the integrations settings.
- Only platform operators create tenants and subsidiaries. Public registration is disabled. A CLI command, `inbils:company:create-subsidiary`, exists for operations.

## How scoping is enforced

Every master and transaction model uses the `App\Traits\BelongsToCompany` trait:

| Rule | Detail |
| --- | --- |
| Global scope | A global scope named `company` adds `<table>.company_id = CompanyService::currentId()` to every query. |
| Create | The `creating` hook fills `company_id` from the same source. |
| Fail closed | Without a company context the scope matches nothing, and a create answers 403. |
| Exempt models | `User`, `Permission`, `ActivityLog`, `Company`, `PlatformAdmin` and `TenantExport`. Membership is their tenant boundary. |

Roles are no longer an exception: `App\Models\Role` uses the trait too (see [Roles and permissions](/docs/architecture/permissions/)).

### Active company

`CompanyService` resolves the tenant:

- `currentId()` returns the effective company id, or null when nobody or nothing is in scope.
- `idFor($user)` returns the effective company for a given user. `current()` returns the `Company`. `setting($key)` reads a per-company setting.
- The effective company is the `active_company_id` session value, re-validated against the `company_user` membership table and an active company on every read, or else the user's home company.
- `users.company_id` is only the home company, where the user lands at login. It is never "the tenant".
- Switching to another company needs the `company.switch` permission plus a membership of the target company. Switching back to the user's home company needs only the membership.

Code that runs without a signed-in user (Artisan commands, queue jobs, listeners, webhooks, seeders) wraps its work in `CompanyService::runAs($companyId, fn () => ...)`. Calls nest and restore the previous scope.

Crossing companies is rare and explicit. `Model::withoutCompany()` and `Model::forCompany($id)` are reserved for platform code, commands, jobs and seeders, and the tenant is always named. A tenant controller gets no such exception.

### Tab safety

The frontend sends an `X-Inbils-Company` header on every non-GET visit. If another browser tab switched company in the meantime, `ResolveActiveCompany` answers 409, so a form never saves into the wrong company.

### Company-scoped unique codes

A tenant table has `company_id` (unsigned bigint, foreign key to `companies.id`, NOT NULL) and per-company unique indexes: `(company_id, sku)` rather than `sku`, `(company_id, code)` for customers, work orders and tickets, `(company_id, number)` for invoices. Composite indexes start with `company_id`. The only globally unique business code is `companies.code`.

### Suspended companies

A company with `is_active` false is refused wherever its users act. Web and mobile login answer 422 with a suspension message when the user's home company is suspended and no other active membership exists. `ResolveActiveCompany` moves a session to the first active membership or signs it out. The company update revokes the API tokens of its users.

## Platform operator panel

Operators of the installation work in a panel at `/platform`. It is a separate identity plane:

| Aspect | Rule |
| --- | --- |
| Identity | Table `platform_admins`, model `PlatformAdmin`, session guard `platform`. A platform admin is never a `User`. |
| No tenant ties | No `company_id`, no company membership, no tenant role, no Sanctum token, no remember-me. |
| Never an exception | A platform admin never bypasses a tenant policy. |
| Creation | From the console with `php artisan inbils:platform:admin-create`. |
| Login | TOTP is mandatory. The first login can only reach enrolment, which shows 8 recovery codes once. |
| Throttle | 5 failures per minute per email and IP, and 20 per hour per email. |
| Session | Idle timeout of 30 minutes. |

The panel is served under `/platform` on the application host. Set `PLATFORM_DOMAIN` (config `platform.domain`) to bind the platform routes to a dedicated host. That host is then added to the trusted hosts. A host that is neither the application host nor one of its subdomains needs its own session and cookie plan, because impersonation shares one session.

Routes live in `routes/platform.php` and every file under `routes/platform/`. Layouts and Ziggy route groups are separate from the tenant shell, so moving between them is a full page load.

### Step-up confirmation

Sensitive platform actions need a recent re-entry of the operator's own credentials. The confirmation is valid for 5 minutes and limited to 5 attempts per minute per admin and IP. Suspending a company, requesting deletion, requesting an export and switching impersonation to write mode also require retyping the exact company code.

### Suspension and deletion

- Suspending applies to the tenant root and its active subsidiaries. The company update revokes API tokens, and the tenant's users are refused at login and on every request.
- Reactivating re-enables only rows that were suspended and cancels a pending deletion request.
- A deletion request is allowed 30 days after suspension and only after an export finished after the suspension.
- The web panel never purges data. Purging runs only through `php artisan inbils:platform:purge-company {code}`, interactively, with the code retyped and a preflight that prints row and file counts.

### Data export

An export request needs the operator's credentials and the company code. The job runs on the `platform` queue and enters each company through `CompanyService::runAs`. The result is a ZIP with the tenant's CSV files and media folder. Credential hashes, TOTP secrets and recovery codes are left out, and the manifest lists the omitted columns. The archive sits on a private disk and downloads need an active platform session, two-factor and a signed URL that lasts at most 24 hours.

## Impersonation (support access)

Support access lets an operator see what a tenant user sees.

- Web only. The session stores the platform admin, the target user, the tenant, a reason of 5 to 200 characters, the start time, a batch UUID and the mode.
- The target must be an active user of an active tenant.
- The mode is read by default: only GET and HEAD requests and the company switch are allowed. Write mode needs the operator's credentials and the company code again.
- Hard limit of 30 minutes, checked by the server on every request. The banner is only an indicator.
- The platform admin stays the real actor in the activity log, while the impersonated user is the acting identity for policies and business columns such as `created_by`. All activity of one session shares a `batch_uuid`.
- Start, mode changes, every write and the end are logged in both the platform log and the tenant log. Tenant-visible rows use the log name `support` and show a neutral support team name, never an operator email or internal id.
- Forbidden during impersonation: the operator's own profile and security pages, changing the target's sign-in secret, email or two-factor, reading secrets, recovery codes or tokens, issuing API tokens, and accessing a suspended tenant.

## Roles per company (ADR-004)

Roles belong to a company. `roles.company_id` is NOT NULL, and `App\Models\Role` uses `BelongsToCompany`, so every role query is scoped like any other tenant table. Permissions stay one catalogue in code. The platform keeps role templates and copies them into a company once, when it is created. A user who works for two companies can hold different roles in each. The reasons for the decision, the alternatives that were rejected and the administration guards are on [Roles and permissions](/docs/architecture/permissions/).

## First install

`inbils:setup` creates a bootstrap user without a company. After login the one-shot `/setup` wizard creates the first company and copies the role templates. It answers 403 once a company exists. Installing seeds only the permission catalogue, the role templates and the system setting defaults.
