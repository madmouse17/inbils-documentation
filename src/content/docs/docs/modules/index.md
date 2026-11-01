---
title: "Modules"
description: "Overview of the nine Inbils product modules and what each one owns: customers, catalogue, network, work orders, inventory, performance, billing, ticketing and reporting."
---

Inbils is split into domain modules. Each page below describes one module as the people who run an ISP see it: what it is for, the states its records move through, who can do what, and which jobs run in the background. For how the code is cut up, see [Module boundaries](/docs/architecture/modules/).

## Customers and subscriptions

Owns customers, their addresses, contacts and documents, and the subscription lifecycle: `pending`, `active`, `suspended`, `terminated`. It also covers isolir (the page a suspended customer sees). The subscription is also the billing subscription. In the code this lives in the shared core rather than a separate module package. See [Customers](/docs/modules/customers/).

## Service catalogue

Owns service packages and their versions, bandwidth and speed profiles, SLA tiers, announcements and promo banners. A package version freezes the price and profile that a subscription was sold with. See [Service catalogue](/docs/modules/service-catalogue/).

## Network, RADIUS and IPAM

Owns network assets and their installation history, NAS devices, RADIUS accounts and disconnects, IP address management (prefixes, VLANs, addresses) and ODN topology. See [Network](/docs/modules/network/).

## Work orders

Owns SPK work orders for field technicians: the state machine, assignment, evidence, the check-in distance rule and the dispatch queue. An approved installation SPK triggers the installation invoice in Billing. See [Work orders](/docs/modules/work-orders/).

## Inventory

Owns products, categories, units, warehouses, stock, immutable stock movements, item requests, adjustments with approval and material returns. Other modules change stock only through Inventory. See [Inventory](/docs/modules/inventory/).

## Technician performance

Covers the evaluation of employees, including technicians: scores and ratings recorded against work orders and tickets. The performance figures themselves are computed by Reporting. See [Technician performance](/docs/modules/technician-performance/).

## Billing

Owns invoices, payments, payment attempts, Midtrans online payment, receivables, automatic isolir for overdue accounts and the billing WhatsApp reminders. See [Billing and payments](/docs/modules/billing/).

## Ticketing

Owns tickets, categories, comments, attachments, SLA deadlines and breach checks, and the customer rating. A ticket can spawn a maintenance work order. See [Ticketing and SLA](/docs/modules/ticketing/).

## Reporting

A read-only layer over all other modules: report registry, drill-down, CSV and PDF export, the data dictionary and the consolidated head-company report. It writes nothing. See [Reporting](/docs/modules/reporting/).

## How the modules connect

| Module | Reads or calls |
|---|---|
| Billing | Subscriptions (suspend and reactivate), work orders (installation invoice), Inventory (product lines). |
| Ticketing | Customers and subscriptions, network assets, work orders (spawn SPK). |
| Work orders | Inventory (materials), network assets (installed devices). |
| Reporting | Billing, Inventory, Network, work orders and Ticketing, read-only. |

Every module is tenant scoped: records belong to a company, and jobs run inside the company they act on. Read [Multi-tenancy](/docs/architecture/multi-tenancy/) and [Permissions](/docs/architecture/permissions/) first if you are new.
