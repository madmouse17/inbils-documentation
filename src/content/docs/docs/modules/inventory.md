---
title: "Inventory"
description: "How Inbils tracks consumable stock: products, locations, immutable movements, item requests with reservation, adjustments with approval and material returns."
---

The Inventory module (`Modules/Inventory`) is the source of truth for consumable stock: cable, connectors, spare parts. It holds the product catalogue, the quantity of each product at each location, and an immutable log of every movement. Durable tracked equipment (routers, OLT, ONU) is not stock here: it is a network asset, see [Network](/docs/modules/network/).

## Key concepts

| Concept | Meaning |
|---|---|
| Product | A consumable with an SKU that is unique per company, a category, a unit, a minimum stock (`min_stock`) and an active flag. |
| Category | A tree of categories (parent and child), for example Cable, Connector, Spare part. |
| Unit | The unit of measure with a name and symbol (pcs, metre, roll). |
| Location | Stock sits at a location of the topology (POP, rack, site), not in a separate warehouse table. The warehouse the app lists is a location. |
| Stock | One row per product and location with `quantity` and `reserved_quantity`. Available stock is `quantity - reserved_quantity`. |
| Stock movement | One append-only row per change, with a snapshot of the balance after the change. Never edited or deleted. |

Stock is protected by database checks: `quantity >= 0`, `reserved_quantity >= 0` and `reserved_quantity <= quantity`. A product with stock cannot be deleted (422).

## Stock movements

| Type | Effect |
|---|---|
| `receive` | Adds quantity at a location. |
| `issue` | Removes quantity from a location. |
| `transfer` | Two `transfer` rows: a negative quantity at the source and a positive one at the target. |
| `adjustment` | Sets a counted quantity, with a mandatory note. |
| `reserve` | Raises `reserved_quantity` only (item request approved). |
| `release` | Lowers `reserved_quantity` (item request handed over), then an `issue` follows. |
| `return` | Adds quantity back (material return). |

A reserve or issue larger than the available stock raises `InsufficientStockException`. The same message is used by the API, web validation and toasts: `Stok {item} di {location} tidak cukup: tersedia {available} {unit}, diminta {requested} {unit}.` When `quantity <= min_stock` the product shows a low stock badge and a dashboard widget.

## Item requests

A technician or a staff member asks for material with an item request. The flow separates duties: the person who asks cannot approve, the approver cannot prepare, and the requester or approver cannot hand over.

| Status | Meaning |
|---|---|
| `draft` | Being written, cancellable. |
| `submitted` | Waiting for approval, cancellable, can be rejected. |
| `approved_reserved` | Approved. The approved quantity (not above the requested one) is reserved at the source location. |
| `preparing` | The warehouse is preparing the items. |
| `ready_for_pickup` | Items are ready. |
| `issued` | Handed over: the reservation is released, then the stock is issued. |
| `rejected`, `cancelled` | Closed without stock movement. |

A request may name a source: an SPK (`source_type=work_order`) or a ticket. From the technician app, `POST /api/v1/technician/inventory-requests` takes an optional `work_order_id`, and that SPK must be the technician's own and `assigned` or `in_progress`. The hand-over is refused when the source SPK is already `completed` or `cancelled`. See [Work orders](/docs/modules/work-orders/) for how approval of the SPK avoids issuing the same material twice.

Before approving, the dialog shows "Tersedia: n" per item. The server message stays the final authority.

## Material returns

When a request is issued, a return case is created for the technician. Material the technician did not use goes back to the warehouse.

| Status | Meaning |
|---|---|
| `awaiting_declaration` | The technician must declare used, good return and difference quantities. |
| `awaiting_receipt` | The warehouse must check the items physically. |
| `correction_required` | The warehouse refused the handover with a reason, the technician declares again. |
| `reconciled` | Quantities match. |
| `exception_open` | A difference (`damaged`, `lost` or `other`) needs a decision. |
| `resolved` | A decision with a note was recorded. |

The rule on every line: issued = used + good + damaged + lost + other. The technician cannot receive their own return, and the person who received it cannot resolve its exception.

## Adjustments

A staff member counts stock and submits an adjustment request. The request is `pending` and stock does not change. Another person with `inventory.stock.adjust.approve` approves or rejects it, and the requester can never approve their own request. The request stores `old_quantity`. If stock changed since the count, approval answers 409 `Stok berubah sejak dihitung; hitung ulang.` and the request stays `pending`. An administrator may adjust directly (break-glass), and the audit log marks it `break_glass`.

## What staff do

- [Items](/docs/guides/web/inventory/items/), [categories](/docs/guides/web/inventory/categories/) and [units](/docs/guides/web/inventory/units/): the catalogue.
- [Stock](/docs/guides/web/inventory/stock/): receive, issue, transfer and adjustments.
- [Item requests](/docs/guides/web/inventory/item-requests/) and [material returns](/docs/guides/web/inventory/material-returns/).
- [Find items](/docs/guides/web/inventory/find-items/): search a consumable and see quantity per location.
- [Stock movements](/docs/guides/web/inventory/stock-movements/): the movement history with filters.
- [Stock card](/docs/guides/web/finance-and-reports/stock-card/): a report of the movements of one product (`report.stock_card.view`).
- [Item request to stock issue](/docs/guides/web/workflows/item-request-to-stock-issue/): the whole flow.

## Apps and notifications

The technician app uses `api/v1/technician/` endpoints for `products`, `warehouses`, `inventory-requests` (list, create, cancel) and `material-returns` (list, show, declare). Request items return `quantity` (requested), `quantity_approved` and `quantity_issued`. A request submitted, approved, rejected or ready, and returns declared or rejected, notify through the bell, and the technician also gets a push. No inventory event sends an email. Users with an inventory approval or return permission may switch on a daily email digest in their profile. The scheduled command `inventory:send-digest` runs at 00:00 UTC and sends only when there is a queue to report.

## Permissions

| Key | Meaning | Default holders |
|---|---|---|
| `inventory.view`, `inventory.create`, `inventory.update` | Catalogue and stock screens | manager, warehouse, staff (technician: view only) |
| `inventory.delete` | Delete product | admin |
| `inventory.export`, `inventory.manage` | Export, super permission | manager (warehouse: export) |
| `inventory.stock.receive`, `inventory.stock.transfer` | Receive and transfer | warehouse, staff |
| `inventory.stock.issue` | Issue stock | warehouse, staff, technician |
| `inventory.stock.adjust.request` | Request an adjustment | warehouse, staff |
| `inventory.stock.adjust.approve` | Approve or reject an adjustment | manager |
| `inventory.stock.adjust` | Direct adjustment | admin |
| `inventory.request.create`, `.cancel.own`, `.view.own` | Own item requests | technician |
| `inventory.request.view.all` | See all requests | manager, warehouse, staff |
| `inventory.request.approve`, `.reject`, `.audit` | Decide on requests | manager |
| `inventory.request.prepare`, `.issue` | Prepare and hand over | warehouse, staff |
| `inventory.return.declare`, `.view.own` | Declare own leftovers | technician |
| `inventory.return.view.all`, `.receive` | Check returns at the desk | manager, warehouse, staff |
| `inventory.return.resolve` | Resolve a difference | manager |

Roles are per company, see [Permissions](/docs/architecture/permissions/).

## Invariants

- Movements are never changed or deleted, and each carries the balance after it.
- Only item requests reserve stock. An SPK never reserves.
- Approve, prepare and hand over need different people (maker and checker).
- A stock row cannot go below zero or reserve more than it holds.
- A stale count is rejected with 409 instead of overwriting newer stock.
