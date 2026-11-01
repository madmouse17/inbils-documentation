---
title: "10.1 Roles and permissions at a glance"
description: "See which menus and actions the default Admin, Manager and Staff roles can use, and which duties must stay separate."
---

Inbils copies eight role templates into every company when the company is created: Admin, Manajer (Manager), NOC & Layanan Pelanggan (NOC & Customer Service), Teknisi (Technician), Gudang (Warehouse), Keuangan (Finance), Staf (Staff), and Pelanggan (Customer). After that, those roles belong to your company. The company admin can rename, edit, delete and add roles in the Roles menu ([section 8.6](/docs/guides/web/administration/roles/)), and system updates do not change them. Other companies have their own roles, so the contents can differ. A role is a set of permissions, and a permission is the right to one action, for example `spk.approve`. The list of permissions is in Hak Akses (Permissions) ([section 8.7](/docs/guides/web/administration/permissions/)), and roles are given to users in the Users menu ([section 8.5](/docs/guides/web/administration/users/)). The term "default" in this guide refers to those templates. The Customer role cannot be deleted.

The tables in this section describe the Admin, Manager and Staff templates. Roles that your company has changed or created can differ, and one user can hold more than one role. If a table and your screen do not match, check the user's role in the Users menu ([section 8.5](/docs/guides/web/administration/users/)) and the contents of the role in the Roles menu ([section 8.6](/docs/guides/web/administration/roles/)).

Technicians and customers use the Android apps, not the web. An account that does not hold the web access permission (`app.web`) is redirected to the page **Gunakan aplikasi Inbils** (Use the Inbils app) ([section 1.1](/docs/guides/web/introduction/who-uses-this-guide/)). An account that also holds a role with web access, for example Admin, Manager or Staff, is not redirected.

## Menus shown in the sidebar

The permission column names the permissions that open the menu: one of them is enough. The menu only decides whether the link appears. Every screen still checks the permission for each action.

| Group | Menu | Permission that opens it | Admin | Manager | Staff |
| --- | --- | --- | --- | --- | --- |
| Tanpa grup (No group) | Dasbor (Dashboard) | `dashboard.view` | yes | yes | yes |
| Operasional (Operations) | Pekerjaan Saya (My Work) | field work permissions and an active employee profile | if profile is active | if profile is active | if profile is active |
| Operasional | Penugasan (Dispatch) | `ticket.assign` or `ticket.reassign` or `spk.assign` or `spk.reassign` | yes | yes | no |
| Operasional | Persetujuan (Approvals) | `spk.approve` or `spk.reject` or `inventory.request.approve` or `inventory.request.reject` | yes | yes | no |
| Operasional | SPK (Work orders) | `spk.view` | yes | yes | yes |
| Operasional | Tiket (Tickets) | `ticket.view` | yes | yes | yes |
| Operasional | Evaluasi (Evaluations) | `evaluation.view` or `evaluation.view.own` | yes | yes | yes |
| Pelanggan & Layanan (Customers & Services) | Pelanggan (Customers) | `customer.view` | yes | yes | yes |
| Pelanggan & Layanan | Paket Layanan (Service packages) | `service.view` or `service.manage` | yes | yes | yes |
| Pelanggan & Layanan | Kategori Paket (Package categories) | `service.view` or `service.manage` | yes | yes | yes |
| Pelanggan & Layanan | Profil Bandwidth (Bandwidth profiles) | `service.view` or `service.manage` | yes | yes | yes |
| Pelanggan & Layanan | Profil Kecepatan (Speed profiles) | `service.view` or `service.manage` | yes | yes | yes |
| Pelanggan & Layanan | Tingkat SLA (SLA tiers) | `service.view` or `service.manage` | yes | yes | yes |
| Pelanggan & Layanan | Kategori Tiket (Ticket categories) | `ticket.category.manage` | yes | yes | no |
| Pelanggan & Layanan | Pengumuman & Promo (Announcements and promos) | `announcement.manage` | yes | yes | no |
| Jaringan (Network) | Lokasi (Locations) | `location.view` | yes | yes | yes |
| Jaringan | Aset Jaringan (Network assets) | `network_asset.view` | yes | yes | yes |
| Jaringan | Router NAS (NAS routers) | `network_asset.nas.view` | yes | yes | yes |
| Jaringan | Alamat IP (IP addresses) | `ipam.view` | yes | yes | yes |
| Jaringan | ODN | `odn.view` | yes | yes | yes |
| Inventaris (Inventory) | Permintaan Barang (Item requests) | `inventory.request.view.own` or `inventory.request.view.all` | yes | yes | yes |
| Inventaris | Barang (Items) | `inventory.view` | yes | yes | yes |
| Inventaris | Kategori (Category) | `inventory.view` | yes | yes | yes |
| Inventaris | Satuan (Units) | `inventory.view` | yes | yes | yes |
| Inventaris | Stok (Stock) | `inventory.view` | yes | yes | yes |
| Inventaris | Cari Barang (Find items) | `inventory.view` | yes | yes | yes |
| Inventaris | Mutasi Stok (Stock movements) | `inventory.view` | yes | yes | yes |
| Keuangan & Laporan (Finance & Reports) | Tagihan (Invoices) | `billing.view` | yes | yes | yes |
| Keuangan & Laporan | Tunggakan (Arrears) | `billing.view` | yes | yes | yes |
| Keuangan & Laporan | Laporan (Reports) | `report.view` | yes | yes | yes |
| Keuangan & Laporan | Kinerja Teknisi (Technician performance) | `report.technician`, then the technician report access rules | yes | if profile is active and placed in an active organisation | no |
| Keuangan & Laporan | KPI Penjualan (Sales KPIs) | `report.sales.view` | yes | yes | no |
| Keuangan & Laporan | Metrik Konsolidasi (Consolidated metrics) | `report.consolidated.view`, active company is a Head | if Head | no | no |
| Administrasi (Administration) | Perusahaan (Company) | `company.manage` | yes | no | no |
| Administrasi | Integrasi (Integrations) | `company.integrations.manage` | yes | no | no |
| Administrasi | Organisasi (Organisation) | `organization.view` | yes | no | no |
| Administrasi | Karyawan (Employees) | `employee.view` | yes | no | no |
| Administrasi | Kendaraan (Vehicles) | `vehicle.view` | yes | no | no |
| Administrasi | Pengguna (Users) | `users.manage` | yes | no | no |
| Administrasi | Peran (Roles) | `roles.manage` | yes | no | no |
| Administrasi | Hak Akses (Permissions) | `roles.manage` | yes | no | no |
| Administrasi | Jenis Dokumen (Document types) | `system.setting` | yes | no | no |
| Administrasi | Penomoran (Numbering) | `system.setting` | yes | no | no |

Notes for conditional menus and numbers:

- **Pekerjaan Saya** appears for users who hold a field work permission (`spk.start`, `spk.submit`, `ticket.start`, `ticket.resolve`, or `ticket.close`) and have an employee profile that is active in the active company ([section 3.6](/docs/guides/web/operations/my-work/) and [8.3](/docs/guides/web/administration/employees/)).
- **Penugasan** also requires an active user.
- **Kinerja Teknisi** appears for admins, and for managers who hold `report.technician`, have an active employee profile, and are placed in an active organisation ([section 7.9](/docs/guides/web/finance-and-reports/technician-performance/)).
- **Metrik Konsolidasi** appears only when the active company is a Head and the account holds `report.consolidated.view` ([section 1.6](/docs/guides/web/introduction/switch-company/) and [7.11](/docs/guides/web/finance-and-reports/consolidated-metrics/)).
- **Pekerjaan Saya**, **Penugasan**, and **Persetujuan** show a queue count next to their name when there is something in the queue.
- The menu **Komponen** (Components) in the group **Administrasi** appears only in the development environment and is not covered in this guide.
- The menu **Dasbor** is open to all default roles.

## Capabilities: Operations

| Capability | Permission | Admin | Manager | Staff |
| --- | --- | --- | --- | --- |
| Assigning tickets and work orders | `ticket.assign`, `spk.assign` | yes | yes | no |
| Reassigning tickets and work orders | `ticket.reassign`, `spk.reassign` | yes | yes | no |
| Changing the name, targets and status of Ticket categories | `ticket.category.manage` | yes | yes | no |
| Creating work orders | `spk.create` | yes | yes | yes |
| Editing work orders (items, evidence) | `spk.update` | yes | yes | no |
| Approving and rejecting work orders | `spk.approve`, `spk.reject` | yes | yes | no |
| Cancelling work orders | `spk.cancel` | yes | yes | no |
| Starting and submitting work orders | `spk.start`, `spk.submit` | yes | no | yes |
| Exporting work orders | `spk.export` | yes | yes | no |
| Creating tickets | `ticket.create` | yes | yes | yes |
| Creating a work order from a ticket | `ticket.spawn_spk` | yes | yes | no |
| Closing tickets | `ticket.close` | yes | yes | no |
| Reopening tickets (with a reason) | `ticket.reopen` | yes | yes | no |
| Starting and completing tickets | `ticket.start`, `ticket.resolve` | yes | no | no |
| Ticket comments and attachments | `ticket.comment.create`, `ticket.attachment.upload` | yes | no | yes |
| Exporting tickets | `ticket.export` | yes | yes | no |
| Viewing and creating evaluations | `evaluation.view`, `evaluation.create`, `evaluation.update` | yes | yes | yes |

## Capabilities: Customers and services

| Capability | Permission | Admin | Manager | Staff |
| --- | --- | --- | --- | --- |
| Viewing customers | `customer.view` | yes | yes | yes |
| Creating and editing customers, addresses, contacts | `customer.create`, `customer.update`, `customer.address.manage` | yes | yes | yes |
| Exporting customers | `customer.export` | yes | yes | no |
| Uploading and deleting customer documents (tab **Dokumen** (Documents)) | `customer.update` | yes | yes | yes |
| Deleting customers | `customer.delete` | yes | no | no |
| Viewing subscriptions | `customer.subscription.view` | yes | yes | yes |
| Creating, activating and suspending subscriptions | `customer.subscription.manage`, `customer.subscription.activate`, `customer.subscription.suspend` | yes | yes | no |
| Reactivating, blocking and terminating subscriptions | `customer.subscription.reactivate`, `customer.subscription.block`, `customer.subscription.terminate` | yes | yes | no |
| Setting **Diperoleh oleh** (Acquired by) | `customer.sales.assign` | yes | yes | yes |
| Correcting **Diperoleh oleh** | `customer.sales.correct` | yes | yes | no |
| Viewing packages, package categories and service profiles | `service.view` or `service.manage` | yes | yes | yes |
| Creating and editing packages, package categories and service profiles | `service.create`, `service.update`, or `service.manage` | yes | yes | no |
| Deleting packages, package categories and service profiles | `service.delete` or `service.manage` | yes | yes | no |
| Exporting packages and service profiles | `service.export` | yes | no | no |
| Creating, publishing and deactivating announcements and promo banners | `announcement.manage` | yes | yes | no |

## Capabilities: Network

| Capability | Permission | Admin | Manager | Staff |
| --- | --- | --- | --- | --- |
| Viewing network assets | `network_asset.view` | yes | yes | yes |
| Creating, editing, installing and removing assets | `network_asset.create`, `network_asset.update`, `network_asset.install`, `network_asset.remove` | yes | yes | no |
| Maintenance, repair and retirement of assets | `network_asset.maintenance`, `network_asset.repair`, `network_asset.retire` | yes | yes | no |
| Deleting assets | `network_asset.delete` | yes | no | no |
| Viewing NAS routers | `network_asset.nas.view` | yes | yes | yes |
| Managing NAS routers | `network_asset.nas.manage` | yes | no | no |
| Viewing, managing and revealing network account passwords | `network_asset.account.view`, `network_asset.account.manage`, `network_asset.account.reveal` | yes | yes | yes |
| Viewing IP addresses | `ipam.view` | yes | yes | yes |
| Managing prefixes and VLANs | `ipam.manage` | yes | yes | no |
| Recording static IP addresses | `ipam.assign` | yes | yes | no |
| Viewing ODN | `odn.view` | yes | yes | yes |
| Managing PON ports and splitters | `odn.manage` | yes | yes | no |
| Recording drop ports | `odn.assign` | yes | yes | yes |
| Viewing locations | `location.view` | yes | yes | yes |
| Creating, editing and moving locations | `location.create`, `location.update`, `location.move` | yes | yes | no |
| Deleting locations | `location.delete` | yes | no | no |

## Capabilities: Inventory

| Capability | Permission | Admin | Manager | Staff |
| --- | --- | --- | --- | --- |
| Viewing items, stock and movements | `inventory.view` | yes | yes | yes |
| Creating and editing items, categories, units | `inventory.create`, `inventory.update` | yes | yes | yes |
| Deleting items, categories, units | `inventory.delete` | yes | no | no |
| Exporting inventory data | `inventory.export` | yes | yes | no |
| Receiving and moving stock | `inventory.stock.receive`, `inventory.stock.transfer` | yes | no | yes |
| Issuing stock | `inventory.stock.issue` | yes | no | yes |
| Requesting stock adjustments | `inventory.stock.adjust.request` | yes | no | yes |
| Approving stock adjustments | `inventory.stock.adjust.approve` | yes | yes | no |
| Direct stock adjustment (break-glass) | `inventory.stock.adjust` | yes | no | no |
| Viewing all item requests | `inventory.request.view.all` | yes | yes | yes |
| Creating item requests | `inventory.request.create` | yes | no | no |
| Approving and rejecting item requests | `inventory.request.approve`, `inventory.request.reject` | yes | yes | no |
| Preparing and handing over items | `inventory.request.prepare`, `inventory.request.issue` | yes | no | yes |
| Viewing all material returns | `inventory.return.view.all` | yes | yes | yes |
| Receiving physical returns | `inventory.return.receive` | yes | yes | yes |
| Resolving return differences | `inventory.return.resolve` | yes | yes | no |

The web screen **Stok** offers only **Terima Barang** (Receive items), **Ajukan Penyesuaian** (Request Adjustment), and approval of adjustments. The permissions for moving stock, issuing stock and direct adjustment exist on the server, but their web screens do not exist yet ([section 6.5](/docs/guides/web/inventory/stock/)).

## Capabilities: Finance and reports

| Capability | Permission | Admin | Manager | Staff |
| --- | --- | --- | --- | --- |
| Viewing invoices and arrears | `billing.view` | yes | yes | yes |
| Creating and sending invoices, recording payments | `billing.create`, `billing.send`, `billing.payment.record` | yes | yes | yes |
| Adding invoice items | `billing.update` | yes | yes | no |
| Reversing payments and cancelling invoices | `billing.payment.reverse`, `billing.cancel` | yes | yes | no |
| Exporting invoices | `billing.export` | yes | yes | no |
| Downloading invoice PDFs and receipts | `billing.pdf.view` | yes | yes | no |
| Reports (list), Business metrics, Asset utilisation | `report.view`, `report.business.view`, `report.asset.view` | yes | yes | yes |
| SLA compliance, Stock card, Data dictionary | `report.sla.view`, `report.stock_card.view`, `report.dictionary.view` | yes | yes | yes |
| Sales KPIs | `report.sales.view` | yes | yes | no |
| Technician performance | `report.technician` | yes | yes | no |
| Exporting reports | `report.export` | yes | yes | no |
| Audit log | `report.audit.view` | yes | no | no |
| Consolidated metrics | `report.consolidated.view` | yes | no | no |

## Capabilities: Administration

| Capability | Permission | Admin | Manager | Staff |
| --- | --- | --- | --- | --- |
| Viewing the Dashboard | `dashboard.view` | yes | yes | yes |
| Managing users | `users.manage` | yes | no | no |
| Resetting 2FA for other users | `users.two_factor.reset` | yes | no | no |
| Managing roles and viewing Permissions | `roles.manage` | yes | no | no |
| Managing the company profile and settings | `company.manage` | yes | no | no |
| Managing the company's Midtrans, WhatsApp, Email and RADIUS accounts (Integrations) | `company.integrations.manage` | yes | no | no |
| Switching company (also needs membership in the target company) | `company.switch` | yes | yes | no |
| Managing the organisation | `organization.manage` | yes | no | no |
| Managing employees | `employee.manage` | yes | no | no |
| Managing vehicles | `vehicle.manage` | yes | no | no |
| Managing document types and numbering | `system.setting` | yes | no | no |

The value "yes" means the role holds all permissions in that row. If permissions are separated by the word "or", one permission is enough. That column describes the default templates. Permissions released after your company was created, such as `ticket.reopen`, enter only roles copied from a certain template ([section 8.6](/docs/guides/web/administration/roles/)).

## Technicians and customers

These two templates work in the apps. Permissions of the Technician template:

- `app.technician`, `evaluation.evaluable`
- `customer.view`
- `dashboard.view`
- `evaluation.view.own`
- `inventory.request.cancel.own`, `inventory.request.create`, `inventory.request.view.own`, `inventory.return.declare`, `inventory.return.view.own`, `inventory.stock.issue`, `inventory.view`
- `ipam.view`
- `location.view`
- `network_asset.view`
- `odn.view`
- `report.technician`
- `spk.evidence.upload`, `spk.evidence.view`, `spk.start`, `spk.submit`, `spk.view`
- `ticket.attachment.upload`, `ticket.comment.create`, `ticket.create`, `ticket.resolve`, `ticket.start`, `ticket.view`

Permissions of the Customer template:

- `portal.access`
- `dashboard.view`
- `evaluation.customer.submit`
- `portal.invoice.pay`, `portal.invoice.view`
- `ticket.attachment.upload`, `ticket.comment.create`, `ticket.create`, `ticket.view`

`app.technician` marks a field employee, `evaluation.evaluable` marks an employee who can be rated in Evaluations, and `portal.access` marks a customer account (together with the link to the customer data). None of the three opens a web menu.

## Separation of duties

Some decisions must not be taken by the same person who created or submitted the item. The server checks these rules for all users, including admins. On some screens the button is hidden from the person who is not allowed. On other screens the button stays visible, and the server refuses the action with the message in the last column of this table. The **Persetujuan** screen, the item request dialogs and the return dialogs show that message. On other screens, for example the work order page, you may see only the toast "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.) or a generic error.

| Action | Must not be done by | Section | Refusal message |
| --- | --- | --- | --- |
| Approving or rejecting a work order | The work order creator and the assigned technician | 3.3 | "Pembuat SPK tidak boleh menyetujui SPK sendiri." (The work order creator must not approve their own work order.) or "Teknisi yang ditugaskan tidak boleh menyetujui SPK sendiri." (The assigned technician must not approve their own work order.) When rejecting, the message says "menolak" (reject) instead. |
| Approving or rejecting an item request | The requester | 6.1 | "Maker-checker: pemohon tidak boleh menyetujui permintaan sendiri." (Maker-checker: the requester must not approve their own request.) When rejecting, the message says "menolak" (reject) instead. |
| Preparing items for a request | The request approver | 6.1 | "Maker-checker: penyetujui tidak boleh menyiapkan barang." (Maker-checker: the approver must not prepare the items.) |
| Handing over items for a request | The requester and the approver | 6.1 | "Maker-checker: pemohon tidak boleh melakukan serah terima barang kepada dirinya sendiri." (Maker-checker: the requester must not hand items over to themselves.) or "Maker-checker: penyetujui tidak boleh melakukan serah terima barang." (Maker-checker: the approver must not hand over the items.) |
| Approving or rejecting a stock adjustment | The adjustment requester | 6.5 | "Maker-checker: pemohon tidak boleh menyetujui permintaan penyesuaian stoknya sendiri." (Maker-checker: the requester must not approve their own stock adjustment request.) When rejecting, the message says "menolak" (reject) instead. |
| Cancelling an invoice | The invoice creator | 7.1 | "Tagihan yang Anda buat sendiri tidak bisa Anda batalkan." (You cannot cancel an invoice that you created yourself.) |
| Reversing a payment | The person who recorded the payment | 7.1 | "Pembayaran yang Anda catat sendiri tidak bisa Anda batalkan." (You cannot reverse a payment that you recorded yourself.) |
| Closing a ticket | The handler of that ticket | 3.4 | "Tiket yang Anda selesaikan tidak bisa Anda tutup sendiri." (You cannot close a ticket that you resolved yourself.) |
| Receiving or rejecting a return file | The file owner | 6.8 | "Maker-checker: teknisi pemilik barang tidak boleh menerima fisiknya sendiri di gudang." (Maker-checker: the technician who owns the items must not receive them physically at the warehouse.) or "Maker-checker: teknisi tidak boleh menolak serah terima barangnya sendiri." (Maker-checker: the technician must not reject the handover of their own items.) |
| Resolving a return difference | The file owner and the person who physically received the items | 6.8 | "Teknisi tidak berhak menyelesaikan selisih barangnya sendiri." (The technician is not allowed to resolve the difference of their own items.) or "Penerima fisik gudang tidak boleh menyelesaikan selisih yang ia terima sendiri." (The warehouse physical receiver must not resolve a difference that they received themselves.) |
| Resetting 2FA of an account | The account owner themselves, and users who do not hold all the permissions of that account | 1.4 and 8.5 | The button does not appear. |
| Granting permissions you do not hold, changing or deleting roles or users that are more powerful than you | All users, including admins for permissions they do not hold | 8.5 and 8.6 | Granting permissions you do not hold is refused with the message "Anda tidak dapat memberi hak akses yang tidak Anda miliki: &lt;hak akses&gt;." (You cannot grant permissions that you do not have: &lt;permission&gt;.) Changing or deleting a more powerful one is refused with the page **Akses ditolak** (Access denied). |
| Removing or deactivating the last company admin | All users | 8.5 and 8.6 | "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage." (The company must keep at least one active admin who holds roles.manage.) |

In addition, a role that does not contain `roles.manage` must not hold conflicting permission pairs. The permission to approve or reject item requests must not be held together with the permission to prepare or hand over items, or to receive, issue and move stock. The permission to approve stock adjustments must not be held together with the permission to request adjustments, or to receive, issue and move stock. The emergency permission `inventory.stock.adjust` may be held only by a role that also contains `roles.manage`. This check runs per company when a role or user is saved, including when two roles are combined in one account, for example the default Manager and Staff. If the person saving does not hold `roles.manage`, Inbils refuses a save that breaks the rule with a message such as "Pemisahan tugas (persetujuan permintaan barang vs pelaksanaan gudang): &lt;izin&gt; tidak boleh digabung dengan &lt;izin&gt;." (Separation of duties (item request approval vs warehouse execution): &lt;permission&gt; must not be combined with &lt;permission&gt;.) or "Hanya administrator yang boleh memberikan hak akses darurat &lt;izin&gt;." (Only an administrator may grant the emergency permission &lt;permission&gt;.) Holders of `roles.manage` are exempt from this check.
