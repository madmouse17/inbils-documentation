---
title: "Work orders (SPK)"
description: "How Inbils runs field jobs as SPK work orders: types, the state machine, evidence, materials, approval effects, permissions and the technician app."
---

A work order, called an SPK (Surat Perintah Kerja) in Inbils, is one job for a field technician: install a new customer, repair a fault, change a package or move a service to a new address. The SPK module (`Modules/SPK`) tracks the job from creation to office approval. Approval is the step that has side effects in other modules: stock, network asset, subscription, PPPoE account and installation invoice.

## Types

| Type | Key | What approval does besides stock |
|---|---|---|
| Installation | `installation` | Installs the serialised network assets chosen on the SPK lines, activates the subscription if it is pending, makes sure the PPPoE account exists, creates the installation invoice if there are lines. |
| Maintenance | `maintenance` | Consumes spare parts. Does not activate a subscription or bill an installation fee. |
| Service upgrade | `upgrade_service` | Consumes the materials used, like any other type. It does not change the package or swap the asset by itself: staff do that by hand. |
| Relocation | `relocation` | Consumes the materials used, like any other type. It does not move the asset or change the installation address by itself: staff do that by hand. |

Installation, upgrade and relocation SPK need a customer and a subscription. A maintenance SPK may be internal (for example a POP asset) and have neither. Every SPK has a unique code per company in the form `SPK-{YEAR}-{NNNNN}`, created race-safe.

An SPK is created in three ways, stored in `source`: `manual` (staff), `subscription` (adding a new customer with a subscription spawns an installation SPK), and `ticket` (a ticket that needs field work spawns a maintenance SPK, permission `ticket.spawn_spk`, see [Ticketing](/docs/modules/ticketing/)). A `monitoring` source exists as a value but staff create those jobs by hand.

## Lifecycle

| From | To | Action | Effect |
|---|---|---|---|
| `draft` | `generated` | generate | Marks the plan as ready for dispatch. The code is already set when the SPK is created. SPK spawned from a ticket or a new customer start in `generated`. |
| `draft`, `generated`, `rejected` | `assigned` | assign | Sets the technician, adds an assignment history row, no stock is reserved. For an installation SPK the PPPoE account is created once, if the company has an active RADIUS integration. |
| `assigned` | `assigned` | en route | Sets `en_route_at` once and notifies the customer. |
| `assigned` | `in_progress` | start | Sets `started_at`, records the check-in (see below). |
| `assigned`, `in_progress` | `assigned` | reassign | New technician, old assignment closed, visit times cleared. Needs `spk.reassign`. Picking the same technician on `in_progress` keeps progress. |
| `in_progress` | `waiting_review` | submit | Needs at least one evidence file, and every material return of item requests linked to the SPK must be declared. |
| `waiting_review` | `completed` | approve | Runs `CompleteSpkAction`: stock, asset, subscription, PPPoE account, installation invoice. |
| `waiting_review` | `rejected` | reject | Stores the reason, the job goes back to be reworked. |
| any except `completed`, `cancelled` | `cancelled` | cancel | Needs a reason. No stock moves. |

The technician starts and submits only the jobs assigned to them. Office staff assign, approve, reject and cancel. An approval of an SPK that is not in `waiting_review` is refused with 422. The person who created the SPK and its assigned technician cannot approve or reject it, and approval waits until every material return of the SPK is reconciled or resolved. An SPK can be deleted (soft delete) only in `draft` or `cancelled`.

### Visit timeline

The web SPK page, the technician app and the customer app show the same four visit steps, decided by the server: `assigned`, `en_route`, `in_progress` and `installed` (labelled "Selesai dipasang" for installation, "Selesai dikerjakan" for other types). A rejected SPK goes back to step three. A reassignment to another technician clears the en route and submitted times, because a trip belongs to one technician.

## Dispatch and approval

Office staff work from two queues in the web UI: **Penugasan** (dispatch) and **Persetujuan** (the approval inbox). Dispatch lists technicians with the work they hold now and suggests the one with the least, and the dispatcher makes the final choice. An assigned SPK shows an "Dalam perjalanan" badge once the technician is on the way. The approval inbox shows evidence, the technician, the check-in result and the material used next to the decision.

The approve dialog lists exactly what approval will do, in order, and only what really happens: the customer and subscription becoming active, the installation invoice (sent at once or kept as a draft, depending on the company setting `auto_send_installation_invoice`), the PPPoE account that will be created, and the quantities leaving stock. After an installation SPK is completed, a "Langkah berikut" card lists the invoice and PPPoE steps the current user may see or do.

## Evidence and the check-in distance rule

Evidence is a photo or document attached to the SPK. At least one is required before submit. The technician app uploads evidence while the job is in progress and may delete the technician's own files then.

When a technician starts a job, the app sends a `check_in` with the phone position. The server measures the distance to the customer installation address (the subscription installation address; for an SPK without a subscription, the SPK location). The POP coordinates are never used instead of the customer address.

- The company limit is the setting `checkin_max_distance_m`, 500 metres by default, between 50 and 100000.
- Farther than the limit: the start is refused with 422 on `check_in.far_reason` until the technician writes a reason. The check-in is then stored as `far` with that reason.
- No GPS fix (permission denied, location off, timeout) or an address without coordinates: the start is allowed, the distance is `null` and the check-in is never `far`.

## Materials

Material lines (`work_order_items`) hold consumables: one line per product, with the quantity used. Equipment that stays at the customer is a network asset; it appears only as a serialised asset line that the office manages and the technician app cannot add.

- Lines can be added, changed and deleted until the SPK enters review: in `draft`, `generated`, `assigned`, `in_progress` and `rejected`. In `waiting_review`, `completed` and `cancelled` the server answers 422.
- The SPK itself does not reserve stock. Stock leaves the warehouse at approval through `StockService::issue`.
- A technician may first take material with an item request linked to the SPK. At approval, whatever was already handed over through an `issued` request for that SPK is not issued again. Only the rest is issued, from the request source location for requested products and from the SPK location for the others. See [Inventory](/docs/modules/inventory/).
- After an item request is handed over, the technician declares leftovers and the warehouse receives them (material returns, also described in [Inventory](/docs/modules/inventory/)).

## What approval does

`SpkService::approve` calls `CompleteSpkAction`, which orchestrates four other domains in one operation:

1. Stock: issues the used quantities that no item request already covered.
2. Network asset: for an installation, installs the serialised assets chosen on the SPK lines.
3. Subscription: activates it when it is pending. Package and address changes are not done by the SPK. See [Customers](/docs/modules/customers/).
4. Billing: for an installation only, creates an invoice with the installation fee and, if the company bills materials, the materials used, sent or kept as a draft by the company setting. See [Billing](/docs/modules/billing/).

For an installation, approval also checks that the PPPoE account exists. A network configuration failure does not cancel the assignment or the approval. Cancelling an installation SPK of a `pending` subscription disables the PPPoE account in RADIUS and rotates its secret when no other installation is running.

## Technician app and API

The technician app uses `api/v1/technician/work-orders/{wo}` with `start`, `en-route`, `submit`, `evidence`, `items` and `network-credentials`. Another technician's SPK answers 404. The PPPoE secret is shown only while the SPK is `assigned` or `in_progress`, through an audited endpoint limited to 5 requests per minute. The customer app reads its own SPK through `api/v1/customer/work-orders`.

Start, "Saya berangkat" (en route) and submit for review wait in the app outbox when there is no signal and are sent later. Revealing the PPPoE secret, adding or deleting material and deleting a sent photo need a connection. See the [technician guide](/docs/guides/technician/work-orders/).

## Staff guide pages

- [Dispatch](/docs/guides/web/operations/dispatch/)
- [Approvals](/docs/guides/web/operations/approvals/)
- [Work orders (SPK)](/docs/guides/web/operations/work-orders/)
- [Ticket to work order](/docs/guides/web/workflows/ticket-to-work-order/)

## Permissions

| Key | Meaning | Default holders |
|---|---|---|
| `spk.view` | See SPK | manager, NOC, technician, warehouse, staff |
| `spk.create` | Create SPK | manager, NOC, staff |
| `spk.update` | Edit header (draft, generated) | manager |
| `spk.delete` | Delete draft or cancelled | admin |
| `spk.assign`, `spk.reassign` | Assign and reassign | manager |
| `spk.start`, `spk.submit` | Start and submit own job | technician, staff |
| `spk.approve`, `spk.reject` | Review submitted work | manager |
| `spk.cancel` | Cancel | manager |
| `spk.evidence.upload`, `spk.evidence.view` | Evidence | technician |
| `spk.export` | Export list | manager |
| `spk.manage` | Super permission | manager |

Roles are per company, so a company may change these defaults (see [Permissions](/docs/architecture/permissions/)).

## Invariants

- An SPK belongs to one company, and its code is unique inside it.
- Assignment history is append-only and has exactly one active row.
- At most one active technician per SPK, and only that technician starts and submits.
- The header changes only in `draft` and `generated`. A save with an outdated `expected_updated_at` is refused with 409.
- Status changes read the status again under a lock, so two people cannot both move the same job.
- Stock is issued only at approval, never at assignment or cancellation.
