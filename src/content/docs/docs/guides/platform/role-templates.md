---
title: "8. Role templates and company role repair"
description: "Learn how roles work per company, how to manage role templates for new companies, and how to repair the roles of an existing company."
---

## 8.1 How roles work per company


Roles belong to the company. Each company has its own roles, names and permission sets, and one user can hold different roles in each company where they are a member. Permissions come from one catalogue in the code. A company builds its roles from that catalogue and cannot create new permissions.

The operator does two things:

- **Role templates**: the list of starting roles copied into every **new** company when it is created (including subsidiaries). The built-in templates are Admin, Manajer (Manager), NOC & Layanan Pelanggan (NOC and Customer Service), Teknisi (Technician), Gudang (Warehouse), Keuangan (Finance), Staf (Staff) and Pelanggan (Customer). Changing a template does not change existing companies, and a deploy does not synchronise company roles.
- **Company role repair**: changing the roles of one company on the tenant page, for example when the company admin deleted their own role or there is no admin left. This action is recorded in the platform audit and in the company audit (support).

Company admins manage their own company's roles in the **Peran** (Roles) menu, described in the **Inbils Web Guide [section 8.6](/docs/guides/platform/role-templates/)**. The operator does not need to step in under normal conditions.


## 8.2 Reading the template list


Roles that can use it: all platform operators.

Click **Templat peran** (Role templates) in the sidebar. The page is titled **Templat peran** with the description "Titik awal peran untuk perusahaan baru. Setiap perusahaan memiliki salinannya sendiri." (Starting point of roles for new companies. Each company has its own copy.)

![Role templates list with permission counts and the Edit and Delete buttons](~/assets/guide/web/platform-role-templates.webp)

The **Templat** (Templates) card shows "Perubahan templat hanya berlaku untuk perusahaan baru; peran perusahaan yang sudah ada tidak berubah. Templat Admin dan Pelanggan tidak dapat dihapus." (Template changes apply only to new companies; existing company roles do not change. The Admin and Pelanggan templates cannot be deleted.) and contains:

- the columns **Nama** (Name, a link to the edit form, with a "Kunci" (Key) line below it), **Hak akses** (Permissions, the number of permissions) and **Aksi** (Actions);
- the **Ubah** (Edit) button on all templates;
- the **Hapus** (Delete) button on all templates except Admin and Pelanggan;
- the **Buat templat** (Create template) button.

The template key stays the same even if the name is changed. A company role that comes from a template stores that key, so the company is still recognised as a copy of Admin even if the role is renamed "Pemilik" (Owner).


## 8.3 Creating a template


1. Click **Buat templat**.
2. Fill in **Nama**. The name is required, unique among templates and at most 255 characters. It must contain letters or digits. Inbils builds the key from that name, and the key cannot be changed later.
3. Choose permissions with **Cari hak akses** (Search permissions), the category list on the left, and the category checkbox to select or clear all permissions shown in that category.
4. Click **Buat templat**.
5. The dialog **Konfirmasi perubahan templat** (Confirm template change) opens. Fill in **Kata sandi operator** (Operator password) if the dialog asks for it, then click **Buat templat**.

The toast shows "Templat dibuat." (Template created.) The platform audit stores the key, the name and the list of permissions. The role from the new template appears in companies created afterwards. For existing companies, add it from the template ([section 8.6](/docs/guides/platform/role-templates/)).


## 8.4 Editing a template


Click the template name or **Ubah**. The page is titled "Ubah templat" (Edit template) followed by the template name, with the subtitle "Kunci {kunci}. Perusahaan yang sudah ada tidak ikut berubah." (Key {key}. Existing companies do not change.) The alert **Berlaku untuk perusahaan baru** (Applies to new companies) repeats that rule.

Change the name or permissions, click **Simpan templat** (Save template), then confirm with the operator password if the dialog asks for it. The toast shows "Templat diperbarui. Peran perusahaan yang sudah ada tidak berubah." (Template updated. Existing company roles do not change.)

The Admin template must keep `roles.manage` and `app.web`. Without both, new companies have no admin, and the form refuses with "Templat Admin harus tetap memuat roles.manage dan app.web, kalau tidak perusahaan baru tidak punya admin." (The Admin template must keep roles.manage and app.web, otherwise new companies have no admin.)

### Separation of duties

A template that does not contain `roles.manage` must not combine approval permissions with execution permissions that check each other. The form refuses combinations such as:

- approving or rejecting item requests together with preparing, handing over, receiving, issuing or moving stock;
- approving stock adjustments together with submitting adjustments, receiving, issuing or moving stock.

The message starts with "Pemisahan tugas (...)" (Separation of duties (...)) and names the conflicting permissions. The emergency permission `inventory.stock.adjust` may only be in a template that also contains `roles.manage`; other templates are refused with "Hanya administrator yang boleh memberikan hak akses darurat inventory.stock.adjust." (Only an administrator may grant the emergency permission inventory.stock.adjust.) The full list is in the **Inbils Web Guide [section 10.1](/docs/guides/platform/platform-audit/)**. The same rules apply when the operator repairs a company role.


## 8.5 Deleting a template


1. On a template other than Admin and Pelanggan, click **Hapus**.
2. The dialog **Hapus templat {nama}?** (Delete template {name}?) shows "Perusahaan baru tidak lagi mendapat peran ini. Peran yang sudah disalin ke perusahaan tidak berubah." (New companies no longer get this role. Roles already copied to companies do not change.) Fill in **Kata sandi operator** if the dialog asks for it.
3. Click **Hapus templat**.

The toast shows "Templat dihapus." (Template deleted.) The Admin and Pelanggan templates have no **Hapus** button. Admin is used as the first admin role, and Pelanggan is used for new customer accounts. The server refuses with "Templat ini dipakai saat perusahaan dibuat." (This template is used when a company is created.)


## 8.6 Repairing the roles of a company


Roles that can use it: all platform operators.

Open the tenant page, then scroll to the **Peran** card, after the **Pengguna** card. Its description reads: "Setiap perusahaan mengelola perannya sendiri. Perbaikan oleh operator tercatat di audit perusahaan (support)." (Each company manages its own roles. Operator repairs are recorded in the company audit (support).)

![Roles card on the tenant page with one table per company](~/assets/guide/web/platform-company-roles.webp)

The card has one section per company in the tenant, the parent company first. Each section shows the company name and "Kode {kode}" (Code {code}), then a table with the columns **Nama**, **Templat** (Template), **Hak akses**, **Pengguna** and **Aksi**. The **Templat** column shows "Dari templat {nama templat}" (From template {template name}) for copied roles, or "Dibuat perusahaan" (Created by the company) for roles the company made itself. An empty table shows "Belum ada peran" (No roles yet).

**Add a role from a template**

1. In the section of the target company, choose a template in **Templat untuk {kode}** (Template for {code}).
2. Click **Tambah dari templat** (Add from template). The **Tambah peran** (Add role) page opens with the name and permissions filled in from the template.
3. Change the fields if needed, then click **Tambah peran**.
4. The dialog **Konfirmasi perbaikan peran** (Confirm role repair) opens. Fill in **Kata sandi operator** if the dialog asks for it, then click **Tambah peran**.

The toast shows "Peran dibuat." (Role created.) You can also use this method for an older company that lost its Admin role.

**Repair a role**

1. Click **Perbaiki** (Repair) on the role row. The page is titled "Perbaiki peran" (Repair role) followed by the role name, with the company name and code and the number of users who hold it.
2. The alert **Perbaikan oleh operator** (Repair by operator) shows "Perbaikan oleh operator tercatat di audit perusahaan (support)." (Operator repairs are recorded in the company audit (support).) Change **Nama** (the name must be unique in that company) and the permissions.
3. Click **Simpan peran** (Save role), then fill in **Kata sandi operator** in the dialog **Konfirmasi perbaikan peran** if the dialog asks for it.

The toast shows "Peran diperbarui." (Role updated.) The change takes effect immediately for the users of that company, and only in that company.

**Delete a role**

1. On the **Perbaiki peran** page, scroll to the **Hapus peran** (Delete role) card.
2. If users hold the role, choose a replacement role in **Pindahkan {n} pengguna ke** (Move {n} users to). Users who do not yet hold that role receive it.
3. Click **Hapus peran**, then confirm in the dialog **Hapus peran {nama}?** (Delete role {name}?) with the operator password if the dialog asks for it.

The toast shows "Peran dihapus." (Role deleted.) The Pelanggan role (from the `customer` template) cannot be deleted.

The same safeguards apply as in the company web app:

- A company must keep at least one active admin who holds `roles.manage` and `app.web`. Otherwise the server refuses with "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage." (The company must keep at least one active admin who holds roles.manage.) A company that already has no admin can still be repaired.
- Separation of duties ([section 8.4](/docs/guides/platform/role-templates/)) applies to the permissions of a role and to roles stacked on one user when users are moved. The operator gets no exception for stacked roles.
- Two operators or admins editing the same role: the one who saves later sees a warning and the **Muat ulang** (Reload) button, "Muat ulang halaman untuk melihat data terbaru, lalu ulangi perubahan Anda." (Reload the page to see the latest data, then repeat your change.)
- The tenant page only opens roles of the parent company and its subsidiaries. Roles of another tenant are refused as missing data (404).

The operator does not hold a company role. A repair changes only roles, not other users, apart from the move when a role is deleted.

### Common errors

- "Nama templat sudah dipakai." (The template name is already in use.): use another name, or the name produces the same key as an existing template.
- "Nama templat harus memuat huruf atau angka." (The template name must contain letters or digits.): the name contains only symbols.
- "Nama peran sudah dipakai di perusahaan ini." (The role name is already in use in this company.): choose another name; names are unique per company.
- "Pilih peran tujuan untuk memindahkan pengguna." (Choose a target role to move the users.): users still hold the role, so choose **Pindahkan ... pengguna ke**. "Pilih peran lain sebagai tujuan." (Choose another role as the target.) appears when the target is the same as the role being deleted.
- "Peran akun pelanggan tidak bisa menjadi tujuan." (The customer account role cannot be the target.): choose a back-office role as the replacement.
- The alert **Templat belum dapat disimpan** (Template cannot be saved yet) or **Peran belum dapat disimpan** (Role cannot be saved yet): check the name and the permission combinations that are marked.
- A user lost access after a role was deleted: give another role in the **Pengguna** menu of the company web app, or choose a replacement role when deleting.
