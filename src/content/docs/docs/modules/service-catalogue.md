---
title: "Service catalogue"
description: "How Inbils defines internet packages, bandwidth and speed profiles, SLA tiers, announcements and promo banners, and how a speed profile reaches RADIUS."
---

The service catalogue is the list of what your ISP sells. Staff pick a package when they create a [subscription](/docs/modules/customers/), billing copies the price from it, and ticketing reads the SLA tier. The catalogue is also where the speed of a customer is defined, because the speed profile of the package becomes the rate limit that [RADIUS](/docs/modules/network/) gives to the router. This page describes the entities and rules. For screens, see the [Customers and services chapter of the web guide](/docs/guides/web/customers-and-services/service-packages/).

## Key concepts

| Entity | What it is |
|---|---|
| Service package | The thing a customer buys, for example "Home 50Mbps". It has a unique code per company, a monthly price (MRC), a one-time installation price (OTC), a minimum contract in months (0 means no contract), a category, and links to one bandwidth profile, one speed profile and one SLA tier. |
| Package category | Groups packages (the web guide describes the default categories **Rumahan**, **Bisnis** and **Korporat**). A package must have a category. Deactivating a category hides its packages from new sales. |
| Bandwidth profile | Download and upload in Mbps, and `shared` or `dedicated`. A `shared` profile must have a contention ratio (for example 8). |
| Speed profile | Maximum download and upload in Mbps, optional burst values, and the RADIUS group name `radius_profile_name`. |
| SLA tier | Response time and resolution time targets in hours, with a calendar of `24h` (every hour counts) or `business` (only the company's service hours count). |
| Announcement | A message for customers of type information, outage (**Gangguan**) or maintenance (**Pemeliharaan**). |
| Promo banner | An image with a link, shown in a carousel in the customer app. |

Every record belongs to one company (company scoped, unique names per company, soft deleted).

## Package versions and prices

A package keeps its current terms in place and appends an immutable version whenever one of these terms changes: monthly price, installation price, bandwidth profile, speed profile, SLA tier or category. Renaming a package, changing its description, its minimum contract or its active flag does not create a version.

A subscription takes a copy of the price when it is created (`mrc_amount`, plus the installation fee), and stays on the package version it was sold under. Changing a package price therefore never reprices existing subscriptions. To move a customer to the new terms, staff use **Ganti paket** on the subscription (see [Customers and subscriptions](/docs/modules/customers/)).

:::caution
Versions record which profile a package points to, not what is inside the profile. Changing the Mbps of a speed profile changes every version and every RADIUS group that uses it, including old subscriptions. To change terms for new sales only, create a new profile or SLA tier and point a package at it.
:::

## Lifecycle of a package

| State | Meaning |
|---|---|
| Active | Can be chosen for new subscriptions. |
| Inactive | Cannot be chosen for new subscriptions. Running subscriptions are not affected. Can be activated again. |
| Deleted | **Hapus permanen** is offered only for a package that no subscription ever used, in any status. Otherwise only deactivate is possible. Packages deleted the old way can be restored. |

Bandwidth profiles, speed profiles and SLA tiers follow the same pattern. A package refuses to save without its three profiles and its category, and only active profiles and tiers are offered in the form.

## How the speed profile reaches RADIUS

`speed_profiles.radius_profile_name` names the RADIUS speed group of a package. For each company and profile, Inbils writes one group into the RADIUS database, named `<realm>/<radius_profile_name>` where the realm is the lower-cased company code. The group carries:

| Attribute | Value |
|---|---|
| `Mikrotik-Group` | `<radius_profile_name>` |
| `Mikrotik-Rate-Limit` | `<upload_max>M/<download_max>M` |
| `Acct-Interim-Interval` | `300` |

Rules that matter:

- Burst values are stored but not sent to RADIUS.
- When a speed profile changes, the group is rewritten. New logins get the new rate. Online sessions keep the old rate until they reconnect or staff press **Resync**.
- A package whose speed profile has no `radius_profile_name` cannot get a network account.
- The subscription change (status, package, block) is observed by the network module, which queues `ApplyNetworkAccountJob`. The Customer side never calls the network module directly.

The same mechanism is described from the router side in [Network, RADIUS and IPAM](/docs/modules/network/).

## SLA tiers

The tier is a contract target that staff type in. The results are not typed in: the tier list shows on-time response and on-time resolution over the last 30 days, calculated from the tickets of subscriptions on packages of that tier. A tier with the `business` calendar counts only the open hours set in the company settings (`service_hours`). Ticketing reads the tier for its default SLA, see [Ticketing](/docs/modules/ticketing/).

## Announcements and promo banners

Both are managed under **Pengumuman & Promo** (last item of **Pelanggan & Layanan**) and shown in the customer app. Details are in the [announcements chapter of the web guide](/docs/guides/web/customers-and-services/announcements-and-promos/).

| Status | Meaning | Visible to customers |
|---|---|---|
| Draf | Saved, not published. Can be deleted. | No |
| Terjadwal | Published, start time not reached yet. | No, until the start time |
| Tayang | Published and inside the period. | Yes |
| Selesai | Published and the end time has passed. | No |
| Nonaktif | Published, then deactivated. Cannot be activated again. | No |

- **Targeting**: all customers, or specific locations and package categories. A customer matches when they have an active or suspended subscription whose serving POP is under a chosen location and whose package is in a chosen category (a list left empty is ignored).
- **Publishing is final**: a published item cannot be deleted, only deactivated.
- **Notifications**: an announcement of type outage or maintenance sends one app notification to each targeted customer with an active sign-in account. Information announcements and banners never notify. There is no WhatsApp message for announcements.
- **Banners**: JPG, PNG or WebP, at most 2 MB, ratio 2:1 (1200 x 600 recommended, 5% tolerance). The app receives at most 5 live banners, ordered by **Urutan** and then newest. Banner images are private to customers of the same company who match the target, and are deleted 180 days after the banner ended. Taps are counted once per customer per banner per day.
- **Jobs**: `announcements:publish-scheduled` runs every minute (so scheduled notifications can arrive up to about a minute late), and `promo-banners:cleanup-images` runs daily. Both need the scheduler and, for notifications, a queue worker. See [Queues and scheduler](/docs/operations/queues-and-scheduler/).

## What the apps expose

The customer app reads `GET api/v1/customer/home-feed`, `GET api/v1/customer/announcements/{announcement}` and sends `POST api/v1/customer/promo-banners/{banner}/tap` (throttled by `api-promo-tap`). The subscription detail in the app includes the package of the subscription. Catalogue editing is staff only, through the web routes under `/admin`: `service-packages`, `bandwidth-profiles`, `speed-profiles`, `sla-tiers` and `announcements`.

## Where new companies get their catalogue

When the operator creates a company in `/platform`, it chooses `starter` or `empty`. `empty` seeds only units, package categories and ticket categories. `starter` adds SLA tiers, default Region, Area and POP locations, bandwidth and speed profiles, packages, item categories and items, without stock or network assets. See [Multi-tenancy](/docs/architecture/multi-tenancy/).

## Permissions

| Key | Allows | Default templates |
|---|---|---|
| `service.view` | See the catalogue | Admin, Manajer, NOC & Layanan Pelanggan, Staf |
| `service.create` | Create packages and profiles | Admin, Manajer |
| `service.update` | Edit and deactivate | Admin, Manajer |
| `service.delete` | Permanent delete and restore | Admin |
| `service.export` | Export packages and profiles | Admin |
| `service.manage` | Super permission | Admin, Manajer |
| `announcement.manage` | Create, publish, deactivate announcements and banners | Admin, Manajer, NOC & Layanan Pelanggan |

Roles belong to each company, so these are the templates copied to a new company. See [Permissions](/docs/architecture/permissions/).

## Invariants

- Package code and profile names are unique per company.
- A shared bandwidth profile always has a contention ratio.
- A package always has a bandwidth profile, a speed profile, an SLA tier and a category.
- A subscription price is a copy, so package edits never change existing subscriptions.
- Deactivating a package never stops running subscriptions.
- A package that any subscription used cannot be deleted permanently.
- A published announcement or banner is deactivated, never deleted.
