---
title: "8.2 Organisation (Organisasi)"
description: "Build and maintain the organisation tree of branches, areas, units and teams, and place employees and managers in it."
---

Organisation stores the company structure as a tree of units: branches, areas, units and teams. Open this menu when you set up a new structure, move a unit to another parent, or prepare a unit before placing employees in it ([section 8.3](/docs/guides/web/administration/employees/)).

Roles that can use it: admin. Permissions: `organization.view` opens the menu and the list, `organization.manage` allows adding, editing and deleting units, `organization.export` shows the **Ekspor** (Export) button. In the default roles only the admin holds all three. Managers, staff and technicians do not see this menu, unless an admin gives the permissions to a custom role ([section 8.6](/docs/guides/web/administration/roles/) and [8.7](/docs/guides/web/administration/permissions/)). The list holds the units of the active company ([section 1.6](/docs/guides/web/introduction/switch-company/)).

## Opening and reading the list

1. In the sidebar, open the **Administrasi** (Administration) group, then click **Organisasi** (Organisation).
2. Read the list. This screen is a table, not a tree view: the **Jalur** (Path) column shows where the unit sits in the tree. How search, sorting, row buttons, pages and the delete dialog work is explained in [section 1.5](/docs/guides/web/introduction/know-the-screen/).

   - The **Cari** (Search) box (hint text "Kode, nama, atau jalur" (Code, name or path)) searches in the code, name and path.
   - Columns: **Kode** (Code), **Nama** (Name), **Jenis** (Type), **Jalur**, **Sub-unit** (Sub-units), **Status** and **Aksi** (Actions). **Kode**, **Nama** and **Jenis** can be sorted; the initial order is by **Kode**.
   - Below the unit name is written "Induk: &lt;nama induk&gt;" (Parent: &lt;parent name&gt;), or "Unit utama" (Top unit) for the topmost unit.
   - **Jenis** and **Status** are coloured badges: **Perusahaan** (Company), **Cabang** (Branch), **Area**, **Unit** or **Tim** (Team) for the type, and **Aktif** (Active) or **Nonaktif** (Inactive) for the status.
   - **Jalur** writes the unit codes from the topmost one down to that unit, separated by `>`. The topmost unit shows only its own code.
   - **Sub-unit** counts the direct child units, for example "1 sub-unit" or "2 sub-unit".
   - The **Buat Unit** (Create unit) button, **Ubah** (Edit) and the **Aksi lainnya** (More actions) menu (which holds **Nonaktifkan** (Deactivate) or **Aktifkan** (Activate), and **Hapus permanen** (Delete permanently) if the unit has never been used) appear for all holders of `organization.view`. The server refuses actions from users without `organization.manage`. This screen has no **Lihat** (View) or **Lihat detail** (View details) button. The **Status** filter has **Aktif**, **Nonaktif**, **Dihapus** (Deleted), and **Semua, termasuk dihapus** (All, including deleted).
   - If there are no units yet, the screen writes "Belum ada unit organisasi" (No organisation units yet) with the **Buat Unit** button. If a search finds nothing, the screen writes "Tidak ada unit organisasi yang cocok" (No matching organisation units) with the **Reset filter** (Reset filters) button.

   ![Organisation list, still empty in the demo company: the Search box, the Export and Create unit buttons, and the message No organisation units yet](~/assets/guide/web/organizations.webp)

## Adding a unit

1. Click **Buat Unit**.
2. Fill in the form in the **Buat Unit** dialog:
   - **Kode**: required, 50 characters at most. While **Kode** is empty and **Nama** is filled in, a suggestion button "Gunakan: &lt;kode&gt;" (Use: &lt;code&gt;) appears below the field, for example "Gunakan: CABANG-BANDUNG" for the name "Cabang Bandung". The suggested code is upper-case letters and digits, with words separated by `-`. Click the button to fill it in, then change it if needed. The button disappears as soon as you type a code of your own. The code must not equal the code of another unit in the same company, including a deleted unit, and the server still checks it. The code is part of the **Jalur**.
   - **Nama**: required, 255 characters at most.
   - **Jenis**: required. Pick **Perusahaan**, **Cabang**, **Area**, **Unit** or **Tim**. The initial value is **Cabang**. The system does not check that the level fits its parent.
   - **Induk** (Parent): optional. Type to search, then pick a unit in the list (hint "Cari unit induk" (Search parent unit)). The list holds only active units, written "kode - nama" (code - name) with the unit path below it, and filters by what you type. The choice stays until you pick another unit or click the cross button ("Hapus pilihan: Induk" (Clear selection: Parent)). Typing in the box does not change the choice. Clear the field to make the unit a topmost unit, as the help text "Kosongkan untuk unit utama." (Leave empty for a top unit.) says. This field is disabled with the text "Belum ada unit lain" (No other units yet) while there is no active unit.
   - **Telepon** (Phone): optional, 50 characters at most.
   - **Email**: optional, must be in email format, 255 characters at most.
   - **Alamat** (Address): optional, free text.
   - **Aktif**: switch, on by default.
3. Click **Buat** (Create). The dialog closes and the toast "Unit organisasi dibuat." (Organisation unit created.) appears. The system fills in **Jalur** automatically.

## Editing and moving a unit

1. Click **Ubah** on the unit row. The **Ubah Unit** (Edit unit) dialog opens with the unit data.
2. Change the fields. To move the unit, pick a new **Induk**, or click the cross button on **Induk** to make the unit a topmost unit.
3. Click **Simpan** (Save). The toast "Unit organisasi diperbarui." (Organisation unit updated.) appears.

Changing **Kode** or **Induk** recalculates the **Jalur** of that unit and all units below it. The unit you are editing does not appear in the **Induk** choices. This screen has no move button or drag-and-drop.

## Deactivating, deleting permanently and restoring a unit

1. Click **Aksi lainnya** on the unit row. It holds **Nonaktifkan** (or **Aktifkan**) and **Hapus permanen**. The **Nonaktifkan** dialog writes what uses the unit, for example "dipakai 2 sub-unit, 5 karyawan, 12 SPK selesai" (used by 2 sub-units, 5 employees, 12 completed work orders (SPK)). The toast "Unit organisasi dinonaktifkan." (Organisation unit deactivated.) appears. An inactive unit does not appear in the **Induk** and **Organisasi** choices and is not counted for the manager's Technician Performance (Kinerja Teknisi), and the sub-units, employees and work orders that already use it stay intact.
2. **Hapus permanen** exists only if the unit has no sub-units (the **Sub-unit** column is 0), no employees in it, and no completed work order that records that unit. The dialog "Hapus permanen &lt;nama unit&gt;?" (Delete &lt;unit name&gt; permanently?) writes "Unit organisasi "&lt;nama unit&gt;" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan." (The organisation unit "&lt;unit name&gt;" has never been used by other data. Permanent deletion cannot be undone.) Click **Hapus permanen**. The toast "Unit organisasi dihapus permanen." (Organisation unit permanently deleted.) appears.
3. If the unit starts being used after you opened the menu, the dialog stays open, and red text writes the reason, for example "Unit organisasi masih dipakai 1 karyawan. Nonaktifkan saja." (The organisation unit is still used by 1 employee. Deactivate it instead.) Click **Batal** (Cancel), then move the employee ([section 8.3](/docs/guides/web/administration/employees/)) or deactivate the unit.
4. The **Status** filter has **Aktif**, **Nonaktif**, **Dihapus**, and **Semua, termasuk dihapus**. Deleted rows have **Pulihkan** (Restore). A sub-unit cannot be restored while its parent is still deleted. A restored unit recalculates its **Jalur** from its current parent.

## Placing employees and managers in a unit

A unit is used through the **Organisasi** field on the employee profile ([section 8.3](/docs/guides/web/administration/employees/)). This screen has no unit head field. A manager is linked to a unit only through the **Organisasi** field on their own employee profile.

- In Technician Performance ([section 7.9](/docs/guides/web/finance-and-reports/technician-performance/)), a manager (role `manager` with the permission `report.technician`) sees the technicians placed in their own unit and in all units below it. An admin (permission `report.manage`) sees all technicians of the company.
- Requirements for a manager: their employee profile has the status **Aktif** and their unit is active. If not, the **Kinerja Teknisi** menu does not appear. A technician without a unit or in an inactive unit is not visible to the manager.
- On the work order (SPK) page ([section 3.3](/docs/guides/web/operations/work-orders/)), the **Teknisi** (Technician) list in the assignment dialog shows the employee number, unit name and phone number below the technician's name. The unit does not limit the choice: Dispatch (Penugasan) ([section 3.1](/docs/guides/web/operations/dispatch/)) and the work order page offer all active technicians in the company.

## Exporting the list

1. Fill in the **Cari** box if you need only some of the units.
2. Click **Ekspor**, then choose **Ekspor CSV** (Export CSV) or **Ekspor PDF** (Export PDF).

The file is named `organizations-export-<tanggal>-<jam>.csv` or `.pdf` and contains the columns Kode, Nama, Jenis, Jalur, Sub-unit and Status. The **Ekspor** button appears only for holders of `organization.export`.

## Common errors

- "Unit tidak bisa dipindahkan ke bawah dirinya sendiri atau sub-unitnya." (A unit cannot be moved under itself or its own sub-units.) appears below **Induk**: the parent you picked is a sub-unit of the unit itself. Pick another unit, or move its child unit first.
- Saving fails with the toast "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.): read the red message below the field. **Kode** writes "kode wajib diisi." (the code is required.) or "kode sudah digunakan." (the code is already used.), **Email** writes "email harus berupa alamat email yang valid." (the email must be a valid email address.) and **Telepon** rejects more than 50 characters.
- **Hapus permanen** is not in the unit menu while the unit has child units, employees, or a completed work order that records that unit (see "Menonaktifkan, menghapus permanen, dan memulihkan unit" (Deactivating, deleting permanently and restoring a unit)). Move the employees to another unit ([section 8.3](/docs/guides/web/administration/employees/)), or simply **Nonaktifkan** the unit.
- A deactivated unit (the **Aktif** switch off) does not appear in the **Induk** and **Organisasi** choices, and is not counted for the manager's Technician Performance. Turn it on again through **Ubah**.
