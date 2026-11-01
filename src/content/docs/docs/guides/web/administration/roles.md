---
title: "8.6 Roles (Peran)"
description: "Create, edit and delete your company's roles, read what each role permits, and understand the guard rules and separation of duties."
---

This menu manages your company's roles: sets of permissions given to users. Open it when the company needs a new job role, when the duties of a job role change, or when you need to know which permissions a role holds before you give it to someone.

Roles that can use it: holders of `roles.manage` (list, detail, create, edit and delete), which is Admin in the default templates, and `roles.export` (the **Ekspor** (Export) button). Roles belong to the company: a role's name and content apply only in the active company. A parent company and each subsidiary have their own roles, and one user can hold different roles in each company. Permissions come from one fixed catalogue ([section 8.7](/docs/guides/web/administration/permissions/)): you build roles from that catalogue and cannot create new permissions. Platform operators do not change your roles in normal circumstances. They only repair roles on request, and that repair is recorded in your audit log.

## Opening and reading the list

1. In the sidebar, open the **Administrasi** (Administration) group, then click **Peran** (Roles).
2. Read the screen:
   - The subtitle reads "Kumpulan hak akses yang diberikan ke pengguna lewat peran. Peran ini hanya berlaku di perusahaan ini." (A set of permissions given to users through roles. These roles apply only in this company.)
   - **Cari** (Search) (hint "Nama peran" (Role name)) searches the role name.
   - Columns: **Nama** (Name) (can be sorted; a link to the detail page), **Templat** (Template) (the badge "Dari templat" (From template) followed by the template name for a copied role, or "Dibuat sendiri" (Created by yourself)), **Hak akses** (Permissions) (the number of permissions), **Pengguna** (Users) (the number of users with that role in the active company) and **Aksi** (Actions).
   - **Aksi** holds the **Ubah** (Edit) and **Hapus** (Delete) buttons. If a role holds permissions you do not hold, the **Ubah** button becomes **Lihat** (View) and **Hapus** does not appear. A customer account role has no **Hapus**.
   - The **Buat peran** (Create role) button and the **Ekspor** button (**Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF); columns Name, Permissions, Users, Guard) appear at the top right, each if you may create roles or hold `roles.export`.
   - If there are no rows, the screen writes "Belum ada peran" (No roles yet) with the **Buat peran** button.

   ![Roles list with the Search box, the columns Name, Template, Permissions, Users and Actions, and the Create role and Export buttons](~/assets/guide/web/roles.webp)

3. A new company gets eight roles from the platform templates:

   | Role | Purpose |
   |---|---|
   | Admin | Full administrator and emergency route. Holds all permissions, except those only for the technician and customer apps, and always holds `roles.manage` and web access |
   | Manajer (Manager) | Controller: approves item requests, work orders (SPK) and stock adjustments, cancels invoices, cancels payments, closes and reopens tickets, views reports |
   | NOC & Layanan Pelanggan (NOC and Customer Service) | Registers customers, receives complaints and manages tickets (including reopening tickets that are completed or closed), announces outages, views and browses the network, RADIUS resync, manual internet block. No delete, no invoice writing, no user and role management |
   | Teknisi (Technician) | Field work, in the technician app |
   | Gudang (Warehouse) | Prepares and hands over items, manages stock in, out and transfer |
   | Keuangan (Finance) | Creates and sends invoices, records and cancels payments, finance reports. No invoice cancellation |
   | Staf (Staff) | Operator: records customers, creates work orders, tickets and invoices, runs stock in and out |
   | Pelanggan (Customer) | Tickets, evaluations and the invoice portal, in the customer app |

   A company that existed before per-company roles got a copy of the five old roles with Indonesian names (Admin, Manajer, Staf, Teknisi, Pelanggan), plus NOC & Layanan Pelanggan, Gudang and Keuangan without holders. The content of those copies is exactly the same as before, so nobody's access changes; the old Staf still holds the permission to register customers. After copying, everything belongs to your company, and system updates do not change it.

## Reading role details

1. In the list, click the role name, or **Lihat** if you may not edit that role. The page title reads "Peran" followed by the role name, with the subtitle "Hak akses yang dipegang peran ini. Berikan peran ke pengguna di menu Pengguna." (The permissions this role holds. Give the role to users in the Users menu.) **Kembali** (Back) opens the list, and **Ubah** appears if you may edit that role.
2. The **Ringkasan** (Summary) card holds **Nama**, **Hak akses** (the number of permissions of the role) and **Pengguna di perusahaan ini** (Users in this company), followed by the note "Peran ini hanya berlaku di perusahaan ini." (This role applies only in this company.)
3. The **Hak akses peran** (Role permissions) card groups the role's permissions by category, with Indonesian names (the list of codes is in [section 8.7](/docs/guides/web/administration/permissions/)) and a badge with the number of permissions in each category. Each permission appears as an Indonesian sentence, for example `billing.payment.record` as "Catat pembayaran" (Record payment). Hover over the sentence to see the full code. A role without permissions shows "Peran ini belum memegang hak akses apa pun. Pengguna yang hanya memegang peran ini tidak bisa membuka menu apa pun." (This role does not hold any permissions yet. A user who holds only this role cannot open any menu.)

   ![Role detail with the Summary card and the Role permissions card grouping permissions by category](~/assets/guide/web/roles-show.webp)

If a role holds permissions you do not hold, an alert writes "Anda hanya bisa melihat peran ini, karena ia memuat hak akses yang tidak Anda pegang. Hanya pemegang semua hak akses itu yang bisa mengubahnya." (You can only view this role, because it holds permissions you do not hold. Only a holder of all those permissions can change it.) The alert "Peran ini tidak bisa dihapus: setiap akun pelanggan baru mendapatkannya." (This role cannot be deleted: every new customer account gets it.) appears on the Pelanggan role.

## Creating a role

1. Click **Buat peran**. The page is titled "Buat peran" with the subtitle "Kumpulkan hak akses menjadi satu peran, lalu berikan ke pengguna lewat menu Pengguna." (Collect permissions into one role, then give it to users through the Users menu.)
2. If needed, pick **Mulai dari templat** (Start from a template). This field is optional and fills in **Nama** (if still empty) and the permissions from one of the platform templates. You can still change both. Below it the screen writes "{n} hak akses dari templat {nama} dimuat." ({n} permissions from template {name} loaded.), or "{n} hak akses tidak Anda miliki dan dilewati." ({n} permissions you do not have were skipped.) if the template holds permissions you do not hold.
3. Fill in **Nama**: required, unique in this company, 255 characters at most. A name that is already used is refused with "nama sudah digunakan." (the name is already used.)
4. Pick the permissions in the permission picker. Use **Cari hak akses** (Search permissions) to search a code or label, click a category name on the left to open that category's permissions, and tick the category box to select or clear all the permissions shown. A permission you do not hold cannot be ticked and carries the note "Anda tidak memegang hak akses ini" (You do not hold this permission).
5. Click **Buat peran**. You return to the list and the toast "Peran dibuat." (Role created.) appears. **Batal** (Cancel) returns to the list without saving.

Two notes appear below the permission picker: "Pemegang peran ini dapat mengubah semua peran perusahaan." (Holders of this role can change all company roles.) if the role holds `roles.manage`, and "Peran akun pelanggan: berlaku di aplikasi Pelanggan." (Customer account role: applies in the Customer app.) if it holds `portal.access`.

## Editing a role

1. In the list, click **Ubah** on the role row, or **Ubah** on the detail page. The page title reads "Ubah peran" (Edit role) followed by the role name, with a subtitle giving the number of users in this company who hold that role. A copied role writes "Dibuat dari templat {nama}. Perubahan templat tidak mengubah peran ini." (Created from template {name}. Changes to the template do not change this role.)
2. Change **Nama** and the permissions, then click **Simpan peran** (Save role). The toast "Peran diperbarui." (Role updated.) appears.

The change applies immediately to all holders of that role in this company. Renaming a role does not break any feature, because Inbils checks permissions, not role names. If someone else has already saved a change to the same role, the warning "Muat ulang halaman untuk melihat data terbaru, lalu ulangi perubahan Anda." (Reload the page to see the latest data, then repeat your change.) appears with the **Muat ulang** (Reload) button. You cannot add permissions you do not hold, and you cannot edit a role that holds permissions you do not hold.

## Deleting a role

1. In the list, click **Hapus** on the role row. The dialog is titled "Hapus peran" (Delete role) followed by the role name and a question mark.
2. If no user holds that role, the dialog writes "Tidak ada pengguna yang memegang peran ini. Penghapusan tidak bisa dibatalkan." (No user holds this role. Deletion cannot be undone.)
3. If some do, the dialog writes how many users hold it and asks you to pick a target role in **Pindahkan {n} pengguna ke** (Move {n} users to) (search box "Cari peran tujuan" (Search target role)). Those users get the target role and lose the deleted role. The **Hapus peran** button becomes active only after a target is chosen. The server refuses a target that holds permissions you do not hold, and a stack of user roles that breaks separation of duties.
4. Click **Hapus peran**. The toast "Peran dihapus." (Role deleted.) appears. **Batal** closes the dialog.

The Pelanggan role, copied from the Pelanggan template, cannot be deleted because every new customer account gets it. If the server refuses, the reason appears inside the dialog or below the target choice, for example "Peran ini dipakai untuk akun pelanggan baru." (This role is used for new customer accounts.) or "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage." (The company must keep at least one active admin who holds roles.manage.)

## Guard rules

These rules apply when you create, edit or delete a role, and when you give a role to a user ([section 8.5](/docs/guides/web/administration/users/)):

- **Only what you hold.** You give a permission to a role only if you hold it yourself. The message is "Anda tidak dapat memberi hak akses yang tidak Anda miliki:" (You cannot give permissions you do not have:) followed by the list of permissions. Audience marker permissions (technician app access, can be rated in Evaluations, customer account) are not limited by this rule.
- **Do not change what is more powerful.** You can only edit or delete a role whose permissions you hold in full.
- **At least one admin.** The company must keep at least one active user who holds `roles.manage` and web access. Removing that permission from the last role that holds it, deleting that role, or moving its users is refused with "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage."
- **Separation of duties** (next section).
- **A role still in use.** Delete a role only after choosing a target role for its users.
- **Recorded.** Every role creation, change and deletion goes to the Audit log (Log Audit) with the label **Peran dibuat** (Role created), **Peran diubah** (Role changed) and **Peran dihapus** (Role deleted), together with the permissions added or removed.

## Separation of duties on roles

Inbils refuses to save a role that does not hold `roles.manage` and holds one of these permission pairs:

- Item request controller (`inventory.request.approve`, `inventory.request.reject`) together with warehouse executor (`inventory.request.prepare`, `inventory.request.issue`, `inventory.stock.receive`, `inventory.stock.issue`, `inventory.stock.transfer`).
- Stock adjustment approver (`inventory.stock.adjust.approve`) together with requester or executor (`inventory.stock.adjust.request`, `inventory.stock.receive`, `inventory.stock.issue`, `inventory.stock.transfer`).
- `inventory.stock.adjust` ("Sesuaikan stok langsung" (Adjust stock directly), direct adjustment, emergency route) may only be held by a role that also holds `roles.manage`.

A role that holds `roles.manage` is excepted as an emergency route. The same rule applies when you give several roles to one user in the **Pengguna** menu ([section 8.5](/docs/guides/web/administration/users/)): the combined permissions must not hold the pairs above.

## Common errors

- The **Buat peran**, **Ubah** or **Hapus** button is missing: you may not create roles, or the role holds permissions you do not hold. Ask the company admin who holds all those permissions.
- The role you need is not in the list yet: create it yourself with **Buat peran**, or start from a template.
- The alert **Peran belum dapat disimpan** (The role cannot be saved yet): read the message below the field and inside the alert. Common causes: the name is already used, a pair of conflicting permissions, or a permission you do not hold.
- A new role does not change someone's menu: the role has not been given yet. Give it through the **Pengguna** menu ([section 8.5](/docs/guides/web/administration/users/)).
- A user does not see a menu after a permission is removed from their role: this is normal behaviour. Menus follow permissions, not role names.
- An older company does not have the new template, or one of its roles was deleted: add it with **Mulai dari templat** in **Buat peran**. An admin who lost all admin roles can be repaired by the platform operator (**Panduan Panel Operator Inbils** (Inbils Operator Panel Guide)).
- A new permission released after your company was created goes into the roles copied from a specific template, not into all roles. For example `ticket.reopen` ("Buka kembali tiket" (Reopen ticket)): that permission goes into the copied Manajer and NOC & Layanan Pelanggan roles, including ones you have renamed. A role you created yourself does not receive it. The **Buka kembali** (Reopen) button on the ticket page does not appear for that role until the Admin adds the permission through **Ubah** in the Roles menu.
- The detail page refuses with **Akses ditolak** (Access denied) (403): you do not hold `roles.manage`.
- The **Ekspor** button is missing: you do not hold `roles.export`.
