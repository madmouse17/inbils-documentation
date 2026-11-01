---
title: "Technician performance"
description: "How Inbils scores field staff: evaluations of SPK and tickets, the technician report metrics, how each is computed and who may see which technicians."
---

Technician performance has two parts. Evaluations are records that a person with the right permission writes about one SPK or one ticket. The technician report reads finished work, tickets and those evaluations and turns them into figures and a ranking. The evaluation is a shared core entity (`app/Models/Core/EmployeeEvaluation.php`), and the report lives in the Reporting module, see [Reporting](/docs/modules/reporting/).

## Evaluations

An evaluation rates one employee for one job. It is written by hand: nothing creates it automatically when a job closes.

| Field | Rule |
|---|---|
| Employee | An active user of the company who holds the permission `evaluation.evaluable` (technician and staff roles by default). |
| Reference | One `WorkOrder` ([SPK](/docs/modules/work-orders/)) or one `Ticket` ([Ticketing](/docs/modules/ticketing/)) of the same company. Any other type is refused with 422. |
| `score` | Required, from 1.0 to 5.0 (database check). |
| `customer_rating` | Optional, from 1.0 to 5.0, entered by staff on behalf of the customer. |
| `comment` | Optional, up to 1000 characters. |
| Evaluator | The user who writes it. One evaluator can evaluate a reference once. |

Evaluations also keep a snapshot of first response and resolution minutes for tickets, so later edits of a ticket (reopen, reassign) do not change the history. Evaluations use soft delete. Staff write and review them in [Evaluations](/docs/guides/web/operations/evaluations/).

## The technician report

The report is the page **Kinerja Teknisi** (route `reports/technician`, permission `report.technician`), described in [Technician performance (guide)](/docs/guides/web/finance-and-reports/technician-performance/). For one technician and a date range it shows:

| Metric | How it is computed |
|---|---|
| SPK completed | Count of the technician's SPK in status `completed`, filtered by `completed_at`. |
| Tickets resolved | Count of tickets with status `resolved` or `closed`, filtered by `resolved_at`. |
| Average SPK duration | Average minutes between `started_at` and `completed_at`, over SPK that have a start time. |
| Average ticket resolution | Average minutes between ticket creation and `resolved_at`. |
| SLA compliance | Share of resolved tickets with `resolved_at` on or before the SLA deadline, as a percentage with one decimal. |
| Average first response (FRT) | Average minutes between ticket creation and `first_response_at`, over tickets that have one. |
| Average score | Average `score` of evaluations in the period (by `evaluated_at`). |
| Average customer rating | Average `customer_rating`, only over evaluations that have one. |
| Active workload | SPK in `assigned` or `in_progress` plus tickets in `open`, `assigned` or `on_progress`. |
| SPK by type, tickets by category | Counts for the breakdown tables. |

A chart shows SPK completed per time bucket, a bucket being a calendar day in the company timezone. The ranking lists every technician the viewer may see, ordered by SPK completed plus tickets resolved in the period. Technicians with the same total share a rank, and ties are ordered by name. In the ranking a technician without resolved tickets has no SLA rate (empty), not 0.

Only active technicians count: an active user with the permission `app.technician` and an active employee profile in the company.

## Who sees whom

The report shows a different set of technicians depending on the permissions of the viewer.

| Viewer holds | Sees |
|---|---|
| `report.manage` (administrators) | All active technicians of the company. |
| `report.technician.team` and `report.technician` | Technicians whose employee profile sits in the viewer's own organisation unit or in a unit below it. A viewer without an active profile in an active unit sees nobody. |
| `app.technician` and `report.technician` | Only themselves. |
| Anything else | Nobody. |

Choosing a technician outside this set is refused (403). The Technician page therefore works as a self view for a technician and a team view for a manager.

## Permissions

| Key | Meaning | Default holders |
|---|---|---|
| `evaluation.view` | See all evaluations | manager, staff |
| `evaluation.create` | Write an evaluation | manager, staff |
| `evaluation.update` | Edit any evaluation (an evaluator may always edit their own) | manager, staff |
| `evaluation.delete` | Delete an evaluation | admin |
| `evaluation.view.own` | See only evaluations about oneself (another person's evaluation answers 404) | technician |
| `evaluation.customer.submit` | Customer rating | customer |
| `evaluation.evaluable` | Can be evaluated | technician, staff |
| `evaluation.export`, `evaluation.manage` | Export, super permission | admin |
| `report.technician` | Open the technician report | technician, manager, admin |
| `report.technician.team` | Team scope of the report | manager |

Roles are per company, see [Permissions](/docs/architecture/permissions/).

## Invariants

- The report never shows a technician outside the scope of the viewer, and the target is checked again when a page loads one technician.
- Scores and ratings stay within 1.0 to 5.0.
- An evaluation always points to an existing SPK or ticket of the same company.
- Averages are empty rather than zero when there is no data, except the single-technician SLA rate, which reads 0 without resolved tickets.
