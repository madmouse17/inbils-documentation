---
title: "Billing and payments"
description: "How Inbils issues invoices, records and collects payments, tracks arrears, isolates overdue accounts and sends WhatsApp reminders, with states, jobs and permissions."
---

The Billing module handles the money side of an ISP: the monthly invoice for each subscription, one-time installation invoices from approved work orders, manual and online payments (Midtrans), receivables, and automatic isolir of accounts that stay unpaid. A subscription is also the billing subscription: there is no separate billing entity, and the recurring job reads the billing fields on the subscription directly.

## Key concepts

- **Invoice**: type `recurring` (monthly charge, MRC) or `one_time` (installation, upgrade, relocation fee). Source is `subscription`, `spk` or `manual`.
- **Invoice item**: a line with description, quantity, unit price, discount and tax rate. A product is optional, so a free-text line such as an installation fee is fine.
- **Payment**: a received amount with a method (`cash`, `transfer`, `cheque`, `other`, or `midtrans` for the gateway). Payments are immutable: there is no delete.
- **Payment attempt**: one online payment page opened for an invoice through Midtrans Snap.
- **Whole rupiah**: all new amounts are rounded half up to a whole rupiah per line, so subtotal, tax and total of a new invoice end in `.00`. A difference of a few rupiah against rounding the grand total is intended.
- **Tax (PPN)**: the default rate is the setting `tax.ppn_rate` (11), overridable per line.
- **Numbering**: invoices are numbered `INV-{YEAR}-{NNNNN}`, allocated under a lock so concurrent creation never duplicates a number.

## Invoice lifecycle

| Status | Meaning | How it moves on |
|---|---|---|
| `draft` | Being prepared. Editable and deletable (soft delete, restorable). | Send, or cancel. |
| `sent` | Issued to the customer. | Full payment makes it `paid`, partial payment `partial`, a passed due date `overdue`. |
| `partial` | Part of the total is paid. | Remaining payment makes it `paid`. |
| `overdue` | Due date passed and still unpaid. Set by a daily job. | Payment makes it `paid` or `partial`. |
| `paid` | Fully paid. | Final. |
| `cancelled` | Cancelled with a reason. | Final. |

Only `sent`, `partial` and `overdue` invoices accept payments. Paying more than the remaining balance is rejected with 422, and cancelling an invoice that has payments is rejected until the payment is reversed.

## Recurring invoices

`billing:generate` runs daily at 02:00 (`withoutOverlapping(120)`). Without `--period` it bills the previous month. It accepts `--period=YYYY-MM`, `--dry-run` and `--company=`. Staff with `billing.create` can run a chosen period from the **Buat tagihan bulanan** dialog, which shows a preview first. Both call `BillingService::generateForPeriod`.

- Billed: subscriptions that are `active` or `terminated`, activated on or before the end of the period, and, if terminated, not terminated before the period starts. `pending` and `suspended` subscriptions are not billed, so isolir also stops their invoices.
- One invoice per subscription per period. A period counts as issued when an invoice for it exists in any status, including `cancelled`. A cancelled period is never re-issued by the schedule; bill a disputed period manually as a one-time invoice.
- The check repeats under a row lock, and a database unique key on `(company_id, subscription_id, active_recurring_period)` is the backstop against two racing processes.
- The invoice is created directly as `sent`. Due date is today plus the company setting `invoice_due_days` (default 14). The single item reads "MRC {package name} {start} s/d {end}", with a pro-rata note when the subscription started or stopped mid-period. The price is the subscription `mrc_amount`, not the live package price.
- One failing subscription is reported and counted in `failed`; the others are still billed. The command returns `FAILURE` and only the active admins of that company are notified (`BillingScheduleFailedNotification`).

The customer name, address, tax id and package name are frozen on the invoice when it leaves draft, so renaming a customer later does not change an issued invoice. The customer app never receives the tax id.

## Installation invoices from work orders

Approving an `installation` work order (SPK) builds the invoice lines without touching the database first, then creates a `one_time` invoice with `source=spk`. Only one invoice per work order is possible.

- The line **Biaya pemasangan** comes from `subscription.otc_installation_fee`.
- When the setting `bill_installation_materials` is on, each used material becomes a line **Bahan terpakai: {item name}** at the product sale price.
- If no line is worth more than Rp 0, no invoice is created.
- The invoice starts as `draft`. With `auto_send_installation_invoice` on it is sent inside the approval transaction. Holders of `billing.send` get a bell and push notification, and the finance dashboard counts the draft.

## Payments

### Manual

Staff record a payment on the invoice page with an amount, method (`cash`, `transfer`, `cheque`, `other`), reference and an optional `paid_at` date. The date cannot be after today in the company time zone or before the invoice issue date. The form pre-fills the remaining balance. Manual payments accept whole rupiah only.

A payment cannot be edited or deleted. To correct one, reverse it (cancel with a reason, needs `billing.payment.reverse`) and record a new one.

### Online with Midtrans

Each company uses its own Midtrans account. The server key and mode are stored encrypted and set by an admin under **Pengaturan**, **Integrasi** (`company.integrations.manage`). A company without an active Midtrans integration has no online payment. The pilot runs in sandbox mode; production go-live needs a separate approval.

1. The customer opens an invoice in the customer app and taps **Bayar**.
2. Inbils reuses an open pending attempt or creates a new one for the full remaining balance and asks Midtrans Snap for a payment page. Invoices in `draft`, `paid` or `cancelled` are refused.
3. The browser goes to the Midtrans page and returns to `/portal/payments/return`, which shows the status from the database and ignores the query string.
4. Midtrans calls `POST /webhooks/midtrans/<company public_id>` (a legacy `POST /webhooks/midtrans` still works during the transition). Inbils checks the signature `sha512(order_id + status_code + gross_amount + server key)`, asks the Midtrans Status API for the real state, and records the payment through the same `BillingService::recordPayment` as manual payments.

`midtrans:reconcile` runs every 15 minutes (`withoutOverlapping(10)`) and asks Midtrans about attempts still `pending` after ten minutes, so a lost notification does not lose a payment.

Attempt statuses: `pending`, `paid`, `failed`, `expired`, `exception`, `cancelled_locally` (label **Ditutup**) and `refunded` (label **Dikembalikan**).

:::caution
Anything that Inbils cannot book automatically becomes an `exception`: a different amount, an invoice that no longer accepts payments, a duplicate reference, a `refund` or `chargeback`. There is no automatic reversal. Holders of `billing.payment.record` get a notification, and the **Tunggakan** page shows a red box with the open exceptions. Staff either record the payment with the order id as reference or refund in Midtrans, and then mark the attempt **Tandai dikembalikan** (`billing.payment.reverse`).
:::

When a payment is recorded or an invoice is cancelled while a payment page is still open, Inbils closes that page (`cancelled_locally`) and cancels the transaction at Midtrans from a queued job.

### Receipts and PDF

Staff download the invoice PDF at `GET /admin/invoices/{invoice}/pdf`. The customer app downloads a receipt at `GET /api/v1/customer/invoices/{id}/receipt` for paid invoices of that customer only.

## Receivables, isolir and reminders

The **Tunggakan** page lists unpaid invoices with ageing buckets and can export CSV or PDF (`billing.export`). See the user guide on [Arrears](/docs/guides/web/finance-and-reports/arrears/) and [Invoices](/docs/guides/web/finance-and-reports/invoices/).

| Job | Schedule | What it does |
|---|---|---|
| `billing:generate` | daily 02:00 | Recurring invoices for the previous month. |
| `billing:check-overdue` | daily 03:00 | `sent` or `partial` invoices past due date become `overdue`. |
| `billing:suspend-overdue` | daily 08:00 | Automatic isolir, only for companies with `auto_suspend_enabled` (default off). |
| `billing:whatsapp-reminders` | daily 01:00 | WhatsApp and app reminders at H-3, H-1 and H+1 around the due date. |
| `midtrans:reconcile` | every 15 minutes | Catches lost Midtrans notifications. |

- **Automatic isolir**: an `active` subscription is suspended when one of its own invoices is unpaid and its `due_date` is more than `auto_suspend_overdue_days` days ago (default 7: exactly 7 days is not enough, 8 is). The rule reads `due_date`, not `status`. The source is stored as `overdue`; a manual suspend stores `manual`.
- **Automatic reactivation**: any payment, manual or Midtrans, fires `PaymentRecorded`. A queued listener reactivates a subscription that is `suspended` with source `overdue`, when `auto_reactivate_on_payment` is on (default on) and no invoice of it still meets the isolir rule. A partial payment may not be enough. A `manual` suspension is never reopened automatically, and a block is never lifted by payment.
- **WhatsApp**: messages `invoice_issued`, `invoice_reminder` and `payment_received` go only to customers who opted in, when the company enabled WhatsApp and the event. Each message is deduplicated per invoice, stage and due date, and a failure to queue a message never fails the invoice or the payment. The same reminders also appear as bell and push notifications in the customer app.

## Package changes

Billing reads `mrc_amount` from the subscription, so editing a package does not change existing subscriptions. **Ganti paket** (`POST /admin/subscriptions/{subscription}/change-package`, permission `customer.subscription.manage`) moves a subscription to the latest version of a package without proration and without changing invoices already issued.

## Permissions

| Key | Allows |
|---|---|
| `billing.view` | See invoices, receivables and subscription billing status. |
| `billing.create` | Create draft invoices and run the monthly generation. |
| `billing.update` | Edit draft invoices and their lines. |
| `billing.delete` | Delete draft invoices. |
| `billing.send` | Send a draft invoice. |
| `billing.payment.record` | Record a manual payment; receives online payment exception alerts. |
| `billing.payment.reverse` | Reverse a payment and mark an online attempt refunded. |
| `billing.cancel` | Cancel an invoice. |
| `billing.suspend` | Suspend a subscription. |
| `billing.reactivate` | Reactivate a subscription. |
| `billing.pdf.view` | Open the invoice PDF. |
| `billing.export` | Export invoices and receivables. |
| `billing.manage` | Super permission for the module. |

The customer role has no web back office. Customers use `portal.invoice.view` and `portal.invoice.pay` in the Android app, see the [customer guide](/docs/guides/customer/invoices/).

## Invariants

- A payment is never deleted or edited; corrections are reverse plus new payment.
- `paid_amount` never exceeds `total`, and only `BillingService::recordPayment` does invoice maths.
- One active recurring invoice per subscription and period, enforced by a database key.
- One invoice per work order.
- Draft invoices are the only ones that can be deleted.
- Webhooks are idempotent: a payment attempt that already has a payment changes nothing.
- Jobs and webhooks run inside the tenant of the invoice (`CompanyService::runAs`).

See also [Multi-tenancy](/docs/architecture/multi-tenancy/), [Queues and scheduler](/docs/operations/queues-and-scheduler/) and [Integrations](/docs/getting-started/integrations/).
