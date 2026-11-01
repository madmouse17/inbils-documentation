---
title: "Network, RADIUS and IPAM"
description: "How Inbils tracks network assets, locations, ODN and IP addresses, and how it manages PPPoE and Hotspot accounts in FreeRADIUS for MikroTik routers."
---

This module covers everything physical and logical about the network: the equipment you own, where it sits, the fibre between the OLT and the customer, the IP address plan, and the RADIUS accounts that let customers connect. Inbils is the source of truth for assets and records. It does not poll devices or push configuration to routers. MikroTik routers authenticate subscribers against FreeRADIUS, and Inbils manages the contents of the RADIUS database. Screens are described in the [Network chapter of the web guide](/docs/guides/web/network/network-assets/).

## Key concepts

| Concept | What it is |
|---|---|
| Location | A tree: `region`, `area`, `pop`, `rack`, `site`. Each non-region node needs a parent. The path is stored for fast reading, moves are checked against cycles, and a location with children, assets or stock cannot be deleted. See [Locations](/docs/guides/web/network/locations/). |
| Network asset | One tracked piece of equipment (router, switch, OLT, ONU/ONT, radio, antenna, fibre, ODP, ODC, rack, power, other) with serial number (unique per company), MAC and IP, location, ownership (`owned`, `leased`, `customer_provided`) and status. See [Network assets](/docs/guides/web/network/network-assets/). |
| Installation history | One append-only row per install, move or removal, with the location, customer, subscription and the work order that caused it. Never edited or deleted. An asset has at most one active installation. |
| IPAM | A passive register of IP prefixes, VLANs and addresses. |
| ODN | A passive register of PON ports, splitters and customer drop ports. |
| NAS router | A router asset registered as a RADIUS client. |
| Network account | The PPPoE or Hotspot user of one subscription in RADIUS. |

## Asset lifecycle

| From | To | Trigger | Side effect |
|---|---|---|---|
| `available` | `installed` | Install, usually from the installation work order | Location, customer and subscription set, history row opened. |
| `installed` | `available` | Remove with a reason | Location and links cleared, history row closed. |
| `installed` | `maintenance` | Set maintenance | Stays at its location, flagged. Resume returns it to `installed`. |
| `installed` or `maintenance` | `damaged` | Mark damaged | Needs repair before it becomes `available` again. |
| `damaged` | `available` | Repair | None. |
| any | `retired` | Retire with a reason | Terminal. History row closed and the subscription link released. |

When a work order of type installation is completed, the asset is installed at the work order location and the subscription is activated (see [Work orders](/docs/modules/work-orders/)). The trace page finds an asset by serial, MAC, IP, customer or subscription and shows its location path.

## IPAM

IPAM is a register: staff record what exists, the system does not scan. See [IP addresses](/docs/guides/web/network/ip-addresses/).

- **Prefixes** are IPv4 or IPv6 CIDR blocks, normalised on save. A prefix nests in the smallest prefix that contains it. Duplicates and partial overlaps are refused, the CIDR cannot change, and a prefix with children or addresses cannot be deleted. Usage is `container`, `customer_static`, `customer_dynamic` or `infrastructure`, optionally tied to a POP and a VLAN.
- **VLANs** have a `vid` from 1 to 4094, per POP or company-wide, and cannot be deleted while a prefix uses them.
- **Addresses** are one row each, held by a subscription, a network asset or a reservation (gateway, loopback). A subscription holds at most one IPv4 and one IPv6 address.
- **Dynamic is the default.** A subscription without an address row gets its address from the router pool. **Static** takes the lowest free address of a `customer_static` pool (IPv4, pool of /16 or smaller) or a typed address. A taken address is refused with a message naming the holder.
- Creating, editing or deleting an asset writes its `ip_address` and `management_ip` to the register in the same transaction. `ipam:import-asset-ips {--company=} {--dry-run}` registers old values; run it with `--dry-run` first.
- Terminating a subscription always releases its static address and drop port.

## ODN

ODC and ODP are assets of type `odc` and `odp`. A **splitter** (ratio 1:2 to 1:64) sits in an ODC or ODP and takes its input from a PON port of an OLT or from another splitter's output. A **drop** ties one subscription to one free output port of an ODP, and the ODP location must lie under the serving POP of the subscription. Changes to the fibre graph of a company are serialised with a lock, and loops are refused. A drop can be reserved during onboarding (`odn.assign`). The `/admin/odn` page lists ODP capacity, PON ports with subscriber counts, and active subscriptions without a drop. See [ODN](/docs/guides/web/network/odn/).

A device panel draws routers, switches, OLTs, ONTs, ODCs, ODPs and racks like their real front, from 14 built-in models or a manual layout, with ports coloured by state (not registered, disabled, isolated, online, offline, used, empty) and a fibre path from OLT port to customer. Online means an open RADIUS session updated within 15 minutes. See [Device panel](/docs/guides/web/network/device-panel/).

## NAS routers and FreeRADIUS

Inbils does not provision routers over the RouterOS API. The flow is:

1. A MikroTik router authenticates PPPoE and Hotspot subscribers against FreeRADIUS 3.2.
2. Inbils writes users, speed groups and NAS clients into the company's RADIUS database.
3. When a change must apply at once (a new speed group, a new static address, a deleted user), Inbils sends a Disconnect-Request (RFC 5176, CoA port 1700 by default) to the router, and the customer's device redials.

Each company has its own RADIUS database. The realm is the lower-cased company code, and every username is `local@realm` (local part `[a-z0-9._-]`, 3 to 40 characters, unique across companies). A company whose code does not match `^[a-z0-9-]{1,24}$` cannot register a NAS or an account yet.

### NAS router

A NAS router is a `router` asset with `nasname` (the IPv4 FreeRADIUS sees as packet source, unique globally), `coa_port` (default 1700) and a shared secret of 8 to 60 printable ASCII characters. The secret is stored encrypted, is write-only and never appears in resources, audit, logs or flash messages. Registering writes a row into the `nas` table of the RADIUS database. Deleting a NAS is allowed even with accounts or sessions. See [NAS routers](/docs/guides/web/network/nas-routers/).

### Network account and speed groups

Subscribers can sign in on any NAS of their company. The account password is encrypted in Inbils and shown only after an audited reveal (`network_asset.account.reveal`). Groups are written per company:

| Group | Attributes |
|---|---|
| `<realm>/<radius_profile_name>` | `Mikrotik-Group`, `Mikrotik-Rate-Limit := <upload>M/<download>M`, `Acct-Interim-Interval := 300` (see [Service catalogue](/docs/modules/service-catalogue/)) |
| `<realm>/isolir` | `Mikrotik-Group := isolir`, `Mikrotik-Address-List := isolir`, `Acct-Interim-Interval := 300` |

A subscription with a static IPv4 address from IPAM also gets `Framed-IP-Address` in `radreply`. Without one, the router pool decides. IPv6 is not written.

The **desired state** is computed when the job runs:

| Subscription | RADIUS user |
|---|---|
| `pending` or `active`, not blocked | Exists, speed group |
| `suspended`, or any non-terminated status with a block | Exists, isolir group |
| `terminated` or deleted | Removed |

The account page shows why it is isolated (`suspended`, `blocked` or both).

### PPPoE and Hotspot accounts

Staff create accounts by hand, and the first installation work order creates one automatically: when it is first assigned, `NetworkAccountService::provisionForInstallation` creates a `pppoe` account for the subscription, using the customer code as the local part (a clash gets `-2`, `-3`), but only if the company has RADIUS enabled. The assigned technician can read the credentials of an `assigned` or `in_progress` installation work order with `POST /api/v1/technician/work-orders/{wo}/network-credentials` (5 requests per minute per user, never cached, audited). Reassigning a `pending` installation to another technician rotates the secret.

### Sync jobs and status

| Item | Behaviour |
|---|---|
| `ApplyNetworkAccountJob` | Unique per account until processed, 5 tries, backoff 30, 120, 300 and 900 seconds, timeout 60 seconds. A RADIUS database error or an unanswered Disconnect retries and leaves the account `pending`. Input RADIUS cannot store (no profile name, invalid realm) marks it `failed` at once. |
| Triggers | A subscription change in status, package or block, saving or resyncing an account, a speed profile change, and an IPAM assign or release. Business actions never wait for RADIUS. |
| `network:sync {--company=}` | Every 15 minutes: queues accounts that are `pending`, owe a Disconnect, failed over an hour ago or drifted, and writes missing NAS rows. |
| Resync | Button on the account page (`network_asset.account.manage`, throttled to 6 per minute). |

Online state and monthly usage are read live from `radacct` and are not copied into Inbils. An open session means no stop time and an update within 15 minutes. If RADIUS is off or unreachable, pages still load without session data.

### Isolir group and page

Isolated subscribers are redirected by the router to the public page `GET /isolir/{company code}`. It shows the company name, phone, WhatsApp link, email, website and the customer app link, never customer data. Unknown or inactive companies answer 404, and the route is throttled.

### RouterOS commands card

The router form and the router detail page show a card that builds the RouterOS commands for the router: `/radius add service=ppp ...`, `/radius incoming set accept=yes port=...` and `/ppp aaa set use-radius=yes accounting=yes interim-update=5m`. The FreeRADIUS address is typed once and kept in the browser only. The form also offers **Buat secret acak** (32 characters generated in the browser). Copy the commands from the card so that the secret you stored is the one used.

## Runbook for operators

1. Create a separate RADIUS database per ISP from the standard FreeRADIUS 3.2 schema. The Inbils database user needs `SELECT, INSERT, UPDATE, DELETE` on `radcheck`, `radreply`, `radusergroup`, `radgroupreply` and `nas`, and `SELECT` on `radacct` only. The database holds cleartext passwords, so restrict its network and never keep unencrypted backups.
2. In FreeRADIUS `mods-enabled/sql`, set `read_clients = yes` and `client_table = "nas"`. Clients load only at start: **restart FreeRADIUS** after registering a NAS or changing its secret (`kill -HUP` is not enough).
3. Install the realm policy `inbils_realm` in `policy.d` and call it first in `authorize`, replacing `filter_username`, so one company cannot authenticate another company's subscribers.
4. On each MikroTik: `/radius add service=ppp,hotspot address=<FreeRADIUS IP> secret=<NAS secret>`, `/ppp aaa set use-radius=yes accounting=yes interim-update=5m`, `/radius incoming set accept=yes port=1700`, a PPP profile `isolir` with address list `isolir` redirecting HTTP to `/isolir/{company code}`, and a walled garden for the Inbils and Midtrans hosts.
5. Onboard in this order: fill the RADIUS card in Settings, Integrations with **Aktif** off and press "Uji koneksi", register the NAS, restart FreeRADIUS, create accounts, switch **Aktif** on, run `php artisan network:sync`, and finally set `auto_suspend_enabled` per company. The queue worker and the scheduler must run, otherwise accounts stay `pending`. See [Integrations](/docs/getting-started/integrations/) and [Queues and scheduler](/docs/operations/queues-and-scheduler/).
6. To roll back, switch **Aktif** off on the RADIUS card. RADIUS keeps its last rows, running sessions stay up and no Disconnect is sent.

If you rotate `APP_KEY`, keep the old key in `APP_PREVIOUS_KEYS`, or every stored secret becomes unreadable.

## Permissions

| Keys | Allows | Default templates |
|---|---|---|
| `network_asset.view`, `.create`, `.update`, `.delete` | See, create, edit, delete assets and use the device panel | View: Admin, Manajer, NOC, Teknisi, Staf. Create and update: Admin, Manajer. Delete: Admin. |
| `network_asset.install`, `.remove`, `.maintenance`, `.repair`, `.retire` | Lifecycle actions | Admin, Manajer |
| `network_asset.nas.view`, `.nas.manage` | See and manage NAS routers | View: Admin, Manajer, NOC, Staf. Manage: Admin. |
| `network_asset.account.view`, `.manage`, `.reveal` | See, edit and resync accounts, reveal the secret | Admin, Manajer, Staf. NOC has view and manage. |
| `location.view`, `.create`, `.update`, `.move`, `.delete` | Location tree | Admin, Manajer (no delete) |
| `ipam.view`, `ipam.manage`, `ipam.assign` | See, manage, give static addresses | View: Admin, Manajer, NOC, Staf, Teknisi. Manage and assign: Admin, Manajer. |
| `odn.view`, `odn.manage`, `odn.assign` | See, manage ports and splitters, assign drops | Admin and Manajer all. NOC and Staf view and assign. Teknisi view. |
| `customer.subscription.block` | Manual isolir | Admin, Manajer, NOC |

OLT and ODP device models also need `odn.manage` besides `network_asset.update`. Roles are per company, so these are only the starting templates. See [Permissions](/docs/architecture/permissions/).

## Invariants

- One active installation per asset, and installation history is never rewritten.
- Serial number and asset code are unique per company.
- An IP address has one holder, enforced by a unique index and transactions.
- A subscription has at most one drop and at most one address per IP family.
- RADIUS usernames are unique across companies, and a company's realm policy keeps it from authenticating another company's users.
- The RADIUS secret of a NAS and the password of an account are never logged or shown without an audited reveal.
- A RADIUS outage never blocks a business action: the change is retried by the queue and `network:sync`.
