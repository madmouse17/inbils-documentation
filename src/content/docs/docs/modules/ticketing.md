---
title: "Ticketing and SLA"
description: "How Inbils handles customer and NOC tickets: SLA targets, breach alerts, comments, attachments, customer rating and work orders spawned from tickets."
---

The Ticketing module is the service desk of an ISP. A ticket records a complaint or a fault, ties it to the customer, subscription, network asset and location involved, tracks who handles it, measures it against an SLA, and can spawn a field work order (SPK) when someone has to go on site.

## Key concepts

- **Source**: `customer`, `noc` (monitoring) or `internal`. A ticket with source `customer` must name a customer.
- **Category**: the type of fault. Seeded categories are `no_internet` (4 h, urgent), `slow_connection` (8 h, high), `packet_loss` (8 h, high), `device_issue` (12 h, medium) and `fiber_issue` (12 h, high). Each carries a default SLA in calendar hours and a default priority. Staff with `ticket.category.manage` can add their own.
- **Priority**: `low`, `medium`, `high`, `urgent`.
- **Code**: tickets are numbered `TKT-{YEAR}-{NNNNN}`, race-safe.
- **SLA tier**: a tier sold with a service package version, with a first-response target and a resolution target. See [SLA tiers](/docs/guides/web/customers-and-services/sla-tiers/).
- **Comments**: public or internal. Internal comments are staff-only.
- **Attachments**: jpg, jpeg, png or pdf up to 10 MB, with an optional caption.

## Ticket lifecycle

| From | To | Trigger | Effect |
|---|---|---|---|
| `open` | `assigned` | Assign a handler | `assigned_to` set, audit entry, handler notified. |
| `assigned` | `on_progress` | **Mulai** (start work) | First response is stamped (source `start`) if still empty. |
| any open state | same | First public staff reply | First response is stamped (source `reply`). Internal notes and customer replies do not count. |
| `on_progress` | `resolved` | Resolve with a resolution note | `resolved_at` and `resolution_note` set. |
| `resolved` | `assigned` or `open` | Customer reply | Ticket reopens to `assigned` if it still has a handler, otherwise `open`. Deadlines are not recalculated. |
| `resolved` or `closed` | `assigned` or `open` | Staff with `ticket.reopen` and a reason (5 to 500 characters) | Same as above, plus `closed_at` cleared. The reason and actor go to the audit log. |
| `resolved` | `closed` | Close | `closed_at` set. Category and handler names are frozen. |

A `closed` ticket refuses staff comments (422) and customer replies or attachments (API 422 `ticket_closed`). Soft delete applies to `closed` tickets only, and staff can restore a deleted ticket with the same permission as delete.

## SLA

When a ticket is created, two deadlines are computed from `created_at`: `response_deadline` (first response) and `sla_deadline` (resolution).

1. If the ticket has a subscription, the targets come from the SLA tier of the package version that subscription uses.
2. Otherwise they come from the ticket category (`default_response_hours` and `default_sla_hours`).
3. Priority `urgent` halves both targets, rounded up.

Targets count calendar hours (24 h a day), unless the tier uses the `business` calendar and the company has filled in `service_hours`. Then only opening minutes count, in the company time zone, and a ticket received after hours starts counting at the next opening. Deadlines are recomputed only when a ticket is created or when the priority of an `open` ticket changes. The ticket page states where the target came from, and the new-ticket form previews it (`GET admin.tickets.sla-preview`).

An SLA breach is a computed badge (deadline passed and ticket not `resolved` or `closed`), not a status.

### Breach check job

`tickets:sla` runs every 15 minutes (`withoutOverlapping(10)`) and queues `CheckTicketSlaBreachesJob` for each active company. The job claims its notification markers under a row lock so alerts are not sent twice.

- A warning goes out up to 30 minutes before the response deadline: to the handler of an `assigned` ticket, or to holders of `ticket.assign` for an `open` one.
- A breach of the response or resolution target notifies the handler and the holders of `ticket.assign`, deduplicated. The creator is not notified just for creating the ticket.
- SLA alerts use the in-app bell and push. There is no SLA email.

## What staff do

Staff work in the **Tiket** menu, see the user guide on [tickets](/docs/guides/web/operations/tickets/), and the workflow in [Ticket to work order](/docs/guides/web/workflows/ticket-to-work-order/).

- **Queues**: filters for unassigned, due soon (within 30 minutes), awaiting staff reply, and "Tiket saya". Export is a CSV or PDF of the same filter.
- **Assign**: **Tugaskan tiket** shows each candidate's active workload and marks the one with the least work. **Tugaskan ke saya** self-assigns an unassigned ticket; if someone was faster the answer is 409.
- **Spawn SPK**: for tickets that need field work, `TicketService::spawnSpk` creates a `maintenance` work order with `source=ticket`, pre-filled with customer, subscription and location, and sets `spawned_spk_id` on the ticket. The new SPK starts as `generated`, waiting for a technician to be assigned. See [Work orders](/docs/modules/work-orders/).
- **Check-in distance**: when a technician starts a ticket or SPK far from the customer site (default limit `checkin_max_distance_m` 500 m, set in company settings), a reason is required.
- **Reports**: closed tickets feed [SLA compliance](/docs/guides/web/finance-and-reports/sla-compliance/) and technician performance, see [Reporting](/docs/modules/reporting/).

## Customer rating

Customers answer "Masalah sudah beres?" in the app with a rating from 1 to 5 and an optional comment (`POST /api/v1/customer/tickets/{ticket}/confirmation`, permission `evaluation.customer.submit`, `Idempotency-Key` supported). A `resolved` ticket is closed by the answer. A `closed` ticket that is not yet rated only receives the rating. A ticket is rated once, the rating survives reopening, and an empty rating is not counted as zero. The SLA compliance report computes customer satisfaction (CSAT) from it.

## Apps and API

- **Customer app** (`api/v1/customer/tickets`): create tickets, list and read them, reply (a reply to a `resolved` ticket reopens it), attach files and confirm. Responses add `can_reply`, `reopened_at`, `rating`, `can_confirm` and `can_rate`. The customer guide is [Help and tickets](/docs/guides/customer/help-and-tickets/).
- **Technician app**: technicians see tickets assigned to them in "my work", with `response_due_at` for a countdown, start, resolve, comment and attach. See the [technician guide](/docs/guides/technician/tickets/).
- **Web back office**: `/admin/tickets` and friends, including `assign`, `assign-self`, `start`, `resolve`, `close`, `reopen`, `comments`, `attachments`, `spawn-spk`, `export` and `ticket-categories`.

## Notifications

In-app bell and push notify handlers and dispatchers of assignment, reopen and SLA events. WhatsApp messages go to the ticket customer, only if the customer opted in and the company enabled the event:

| Event | Trigger |
|---|---|
| `ticket_created` | Ticket created with a customer. |
| `ticket_assigned` | First assignment only. |
| `ticket_resolved` | Ticket resolved. |

## Permissions

| Key | Allows |
|---|---|
| `ticket.view` | See tickets (technicians see their own). |
| `ticket.create` | Create tickets. |
| `ticket.update` | Edit an open ticket. |
| `ticket.delete` | Delete and restore closed tickets. |
| `ticket.assign` | Assign handlers; receives SLA alerts. |
| `ticket.reassign` | Change the handler. |
| `ticket.start` | Start work. |
| `ticket.resolve` | Resolve a ticket. |
| `ticket.close` | Close a resolved ticket. |
| `ticket.reopen` | Reopen a resolved or closed ticket with a reason. |
| `ticket.comment.create` | Write public comments. |
| `ticket.comment.internal` | Write staff-only comments. |
| `ticket.attachment.upload` | Upload attachments. |
| `ticket.attachment.view` | Open attachments. |
| `ticket.spawn_spk` | Spawn a work order from a ticket. |
| `ticket.export` | Export the ticket list. |
| `ticket.manage` | Super permission for the module. |
| `ticket.category.manage` | Manage ticket categories. |

## Invariants

- Tickets move only along the lifecycle above. Resolve needs an assigned or started ticket, and close needs a resolved one.
- Customer data is never exposed beyond id, code and name to users without `customer.view`.
- Closing freezes the category and handler names, so later renames do not rewrite history. Reopening clears them again.
- Tenant isolation applies to every ticket, comment and attachment.

See also [Service catalogue](/docs/modules/service-catalogue/) for SLA tiers and [Queues and scheduler](/docs/operations/queues-and-scheduler/).
