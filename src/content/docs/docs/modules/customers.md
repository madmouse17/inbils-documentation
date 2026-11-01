---
title: "Customers and subscriptions"
description: "How Inbils models customers, addresses, contacts and subscriptions, the subscription lifecycle, isolir, plan changes, termination and onboarding."
---

A customer in Inbils is the person or business that buys internet from your ISP. A subscription is the internet service that customer has, tied to a service package and an installation address. Customer and subscription are the central records of the product: work orders (SPK), tickets, invoices, network assets and reports all point at them. This page describes how they behave. For step-by-step screens, see the [Customers chapter of the web guide](/docs/guides/web/customers-and-services/customers/).

## Key concepts

| Concept | What it is |
|---|---|
| Customer | An `Individual` or a `Company`. The code is unique per company (format `CUS-{YEAR}-{NNNNN}`). A `Company` customer must have a tax id (NPWP) and a contact person. Soft deleted. |
| Address | A customer can have several addresses (home, office, branch). At most one is the installation point, where the service is delivered. Setting a new installation point clears the old one. Latitude and longitude are stored. |
| Contact | A person to call about the customer. Several per customer, one can be primary. Optional for individuals. |
| Documents | Files attached to a customer. A daily command, `customers:document-expiry`, notifies staff who may update the customer when a document is about to expire (30 days ahead). |
| Subscription | One internet service of a customer (code format `SUB-{YEAR}-{NNNNN}`). It links a [service package](/docs/modules/service-catalogue/), an installation address, an optional ONT asset and an optional serving POP. It also holds the billing fields, so there is no separate billing subscription. |
| Customer status | A rollup of the customer's subscriptions, never edited by hand (see below). |
| Account switch | `is_active` on the customer, shown as **Account** in the UI. A manual switch, separate from the status. |
| Acquired by | The staff member credited with winning the customer. Attribution only, not commission. |

Customer codes and subscription codes are generated under a lock per year, so two concurrent creations never get the same code.

## Subscription lifecycle

`SubscriptionService` is the only code that changes a subscription's status. Every transition writes an audit entry and recalculates the customer status in the same transaction.

| From | To | Trigger | What happens |
|---|---|---|---|
| (new) | `pending` | Create subscription | `mrc_amount` is copied from the package price and can be overridden. `billing_day` is 1 to 28. |
| `pending` | `active` | Activate: the installation work order is completed, or manually | `activation_date` is set, the ONT asset is linked, `next_invoice_date` becomes the next billing day. |
| `active` | `suspended` | Suspend (manual, or isolir for overdue invoices) | `suspension_source` is `manual` or `overdue`. Recurring invoice generation skips the subscription. |
| `suspended` | `active` | Reactivate (manual, or automatically after payment) | `suspension_source` is cleared and recurring invoices resume. |
| `active` or `suspended` | `terminated` | Terminate with a reason and optional ONT release | `terminated_at` and `terminated_reason` are set, recurring billing stops, the ONT can return to `available`. |

Invalid transitions are refused with a 422, for example suspending a subscription that is already suspended.

### Isolir (suspension for non-payment)

Isolir means moving a customer to a restricted network until they pay. There are two sources:

- **Manual**: staff suspend from the subscription page. A manual suspension is never reopened automatically.
- **Overdue**: staff press **Isolir** on the receivables screen ([Arrears in the web guide](/docs/guides/web/finance-and-reports/arrears/)), or the scheduled command `billing:suspend-overdue` runs daily at 08:00. The command only acts for companies that turned on `auto_suspend_enabled`. The grace period is `auto_suspend_overdue_days` (default 7 days).

After a payment is recorded, the subscription reactivates by itself when the company setting `auto_reactivate_on_payment` is on (default on), the suspension source is `overdue`, and no invoice of that subscription is still past the grace period.

A suspended subscription is moved to the isolir group in RADIUS and its sessions are redirected to the public isolir page. See [Network, RADIUS and IPAM](/docs/modules/network/).

### Block and unblock

Block is a manual network isolation that is not a status. It works on `pending`, `active` or `suspended` subscriptions, needs a reason (up to 500 characters) and leaves billing untouched. It is refused for terminated subscriptions and for subscriptions that are already blocked. Unblocking a `suspended` subscription leaves it suspended, so the network stays isolated until it is reactivated. Terminating clears the block.

## Customer status

`customers.customer_status` is derived from the customer's non-deleted subscriptions by `CustomerStatusRecalculator`. The first matching rule wins:

| Rule | Status |
|---|---|
| Any subscription is `active` | `active` |
| Any subscription is `suspended` | `suspended` |
| No subscriptions, or all `pending` | `prospective` |
| All `terminated` | `terminated` |
| Anything else (for example `terminated` plus `pending`) | `inactive` |

Direct database writes (seeders, tinker) skip the recalculation. Repair them with:

```bash
php artisan customers:recalculate-status {--company=} {--dry-run}
```

## Plan changes

**Ganti paket** on the subscription page moves a subscription to the latest version of a package. It needs `customer.subscription.manage` and is not available for terminated subscriptions. The monthly fee defaults to the new version's price and can be overridden. The installation fee follows the new version only while the subscription is still `pending`. Invoices already issued do not change and there is no proration. The speed profile (and so the RADIUS group) and the SLA tier of the new version apply, and each change is audited as `package_changed`. Editing a subscription no longer changes its package.

## Termination impact

The terminate dialog shows what will happen before staff confirm:

- The PPPoE or Hotspot account is removed from RADIUS and the session is disconnected (only when RADIUS is enabled and an account exists).
- A static IP address returns to the IPAM pool and the ODN drop port is released. Both are always released on terminate, in the same transaction.
- Monthly billing runs up to the termination day and then stops.
- The ONT asset returns to `available` if staff chose to release it.

## Onboarding a new customer

Registering a customer goes through one action, `CreateCustomerOnboardingAction`, in a single transaction: customer, address, subscription and installation work order. If an optional ODN drop port is chosen (only for users who hold `odn.assign`) and it is occupied, belongs to another company or is outside the serving POP, the whole onboarding is refused and nothing is created.

When a customer is created, a portal user is created with a random 32-character sign-in secret that is never shown. A queued notification emails the customer a link to choose their own, valid for 60 minutes. Staff can resend it with `POST /admin/customers/{customer}/access-link` (permission `customer.update`, throttled to 3 per minute). If the customer agreed to WhatsApp, one WhatsApp message only says that the link was emailed. The link itself is never sent over WhatsApp.

### WhatsApp consent

Inbils sends WhatsApp messages only to customers who opted in. Only staff actions write the consent (from onboarding or customer edit), and a customer reply of `STOP` or `BERHENTI` records an opt-out. Numbers must be Indonesian mobile numbers. WhatsApp Cloud API credentials are stored per company, see [Integrations](/docs/getting-started/integrations/).

## Sales attribution

`acquired_by_user_id` credits a staff member. Eligible people are active users of the same company with an active employee profile who hold `customer.create`. `customer.sales.assign` fills an unassigned customer, `customer.sales.correct` changes or clears it and requires a reason (up to 500 characters). Users without either permission never see the column, and the filter is ignored for them. A user who has ever been an acquirer cannot be deleted, only deactivated.

## What staff do

| Task | Where |
|---|---|
| List, filter (type, area, status, account, acquirer), export | **Pelanggan** under **Pelanggan & Layanan** |
| Create customer and first subscription | Create form (onboarding) |
| Manage addresses, contacts, documents | Customer detail |
| Activate, suspend, reactivate, block, terminate, change plan | Subscription detail |
| Isolir overdue customers | Receivables, see [Billing](/docs/modules/billing/) |

The full walkthrough is in the [web guide](/docs/guides/web/customers-and-services/customers/).

## API and apps

The customer app calls `GET api/v1/customer/profile`, `GET api/v1/customer/subscriptions` and `GET api/v1/customer/subscriptions/{id}`. Staff features use the web routes under `/admin/customers` and `/admin/subscriptions/{sub}`. See [API conventions](/docs/api/conventions/).

## Permissions

| Key | Allows | Default templates |
|---|---|---|
| `customer.view` | See customers, addresses, contacts | Admin, Manajer, NOC & Layanan Pelanggan, Teknisi, Keuangan, Staf |
| `customer.create` | Create customers (onboarding) | Admin, Manajer, NOC & Layanan Pelanggan |
| `customer.update` | Edit customers, resend access link | Admin, Manajer, NOC & Layanan Pelanggan, Staf |
| `customer.delete` | Delete a customer (refused while a subscription is active) | Admin |
| `customer.address.manage` | Address and contact changes | Admin, Manajer, NOC & Layanan Pelanggan, Staf |
| `customer.subscription.view` | See subscriptions | Admin, Manajer, NOC & Layanan Pelanggan, Keuangan, Staf |
| `customer.subscription.manage` | Create and edit subscriptions, change plan | Admin, Manajer, NOC & Layanan Pelanggan |
| `customer.subscription.activate` | Activate | Admin, Manajer |
| `customer.subscription.suspend` | Suspend | Admin, Manajer |
| `customer.subscription.reactivate` | Reactivate | Admin, Manajer |
| `customer.subscription.block` | Block and unblock | Admin, Manajer, NOC & Layanan Pelanggan |
| `customer.subscription.terminate` | Terminate | Admin, Manajer |
| `customer.sales.assign` | Set the acquirer from unassigned | Admin, Manajer, NOC & Layanan Pelanggan, Staf |
| `customer.sales.correct` | Change or clear the acquirer | Admin, Manajer |
| `customer.export` | Export customers | Admin, Manajer |
| `customer.manage` | Super permission | Admin, Manajer |

Roles belong to each company and can be renamed or changed, so the real rights are the permissions a role holds. The table shows the templates copied to a new company. See [Permissions](/docs/architecture/permissions/).

## Invariants

- A customer code is unique per company, and so is a subscription code.
- At most one installation address per customer.
- A customer with an active subscription cannot be deleted.
- A subscription keeps its own copy of the price, so changing a package never reprices existing subscriptions.
- `billing_day` is between 1 and 28.
- Only `SubscriptionService` writes status, suspension source and block columns.
- Customer status, block columns and WhatsApp consent are not mass assignable.
- Everything is scoped by company. A customer of another company answers 404.
