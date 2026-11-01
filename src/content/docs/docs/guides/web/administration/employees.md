---
title: "8.3 Employees (Karyawan)"
description: "Create and edit employee profiles linked to user accounts, set unit, vehicle and status, and prepare technicians for field work."
---

Employees stores the employee profile linked to one user account: employee number, unit, vehicle, phone number, start date, status and notes. A user account alone is not enough for field work, because field features also require a profile with the status **Aktif** (Active). Open this menu after you invite a new account in Users ([section 8.5](/docs/guides/web/administration/users/)). A holder of `employee.manage` can also create the profile at the same time in the **Buat Pengguna** (Create user) form. That form holds only phone, start date, status and notes, so unit and vehicle are still filled in on this screen.

Roles that can use it: admin. Permissions: `employee.view` opens the menu and the list, `employee.manage` shows the **Buat Karyawan** (Create employee) and **Ubah** (Edit) buttons, `employee.export` shows the **Ekspor** (Export) button. In the default roles only the admin holds all three. This screen has no **Lihat** (View) and **Hapus** (Delete) buttons.

## Opening and reading the list

1. In the sidebar, open the **Administrasi** (Administration) group, then click **Karyawan** (Employees).
2. Read the list. How search, sorting and pages work is explained in [section 1.5](/docs/guides/web/introduction/know-the-screen/).

   - The **Cari** (Search) box (hint text "Nomor, nama, email, atau telepon" (Number, name, email or phone)) searches the employee number, phone, and the user's name and email.
   - The **Organisasi** (Organisation) filter is a search box: type, then pick an active unit (hint "Semua organisasi" (All organisations)). The cross button ("Hapus pilihan: Organisasi" (Clear selection: Organisation)) resets it to all units. The **Status** filter contains **Semua status** (All statuses), **Aktif**, **Nonaktif** (Inactive), **Berhenti** (Terminated), **Dihapus** (Deleted) and **Semua, termasuk dihapus** (All, including deleted).
   - Columns: **Nomor karyawan** (Employee number), **Nama** (Name) (the user account name, with the email below it), **Organisasi**, **Kendaraan** (Vehicles) (licence plate), **Status** and **Aksi** (Actions). **Nomor karyawan** and **Status** can be sorted; the initial order is newest employee first. An empty cell contains `-`.
   - The **Status** badge is green for **Aktif** and grey for **Nonaktif** and **Berhenti**.
   - The **Buat Karyawan** button and the **Ubah** button on each row appear only for holders of `employee.manage`. A row has no **Aksi lainnya** (More actions) menu, except the row of a deleted employee: its menu holds **Pulihkan** (Restore) (permission `employee.manage`), and the toast "Karyawan dipulihkan." (Employee restored.) appears. A restored employee comes back with their original status.
   - If there is no profile yet, the screen writes "Belum ada karyawan" (No employees yet). If the filters find nothing, the screen writes "Tidak ada karyawan yang cocok" (No matching employees) with the **Reset filter** (Reset filters) button.

   ![Employees list in the demo company: three employees with the status Active without organisation and vehicle, with the Organisation and Status filters](~/assets/guide/web/employees.webp)

## Adding an employee profile

1. Make sure the employee's user account exists and is active ([section 8.5](/docs/guides/web/administration/users/)). An account created together with a profile in the **Buat Pengguna** form already has a profile, so complete its **Organisasi** and **Kendaraan** through **Ubah** on that employee's row.
2. Click **Buat Karyawan**.
3. Fill in the form in the **Buat Karyawan** dialog:
   - **Pengguna** (User): required. Type a name or email, then pick the account (hint "Cari nama atau email" (Search name or email)). The server searches after you type at least 2 characters and shows at most 20 results. The list holds only active users who do not yet have an employee profile in this company, both accounts owned by this company and accounts given access to this company, as the help text "Hanya pengguna aktif yang belum punya profil karyawan." (Only active users who do not yet have an employee profile.) says. If nothing matches, the screen writes "Tidak ada pengguna aktif yang cocok dan belum punya profil." (No active user matches and has no profile yet.) One account can have only one profile. The choice changes only when you pick another account or click the cross button ("Hapus pilihan: Pengguna" (Clear selection: User)).
   - **Nomor karyawan**: filled in automatically and locked while Numbering (Penomoran) ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)) does not allow manual input. The field shows an estimate of the next number, initially `EMP-0001`, with the text "Dibuat otomatis saat disimpan, perkiraan: &lt;nomor&gt;" (Created automatically when saved, estimate: &lt;number&gt;). If manual input is allowed, you can type a number (50 characters at most, unique per company) or leave it empty so that it is created automatically ("Kosongkan untuk dibuat otomatis" (Leave empty to create automatically)).
   - **Organisasi**: optional. Type to search, then pick an active unit (hint "Cari organisasi" (Search organisation)). The list is written "kode - nama" (code - name).
   - **Kendaraan**: optional. Type to search, then pick an active vehicle by licence plate (hint "Cari nomor polisi" (Search licence plate)).
   - **Telepon** (Phone): optional, 50 characters at most. The system uses this number for WhatsApp work order (SPK) scheduling messages if the company's WhatsApp is active. The system skips numbers that are not an Indonesian mobile number starting with `08` or `+62`.
   - **Tanggal masuk** (Start date): optional. Type a date in the company's date format, or click the field to open the calendar ("Pilih tanggal" (Pick a date)) and pick a day, or click **Hari ini** (Today). The button "Hapus tanggal" (Clear date) empties the field.
   - **Status**: pick **Aktif**, **Nonaktif** or **Berhenti**. The initial value is **Aktif**.
   - **Catatan** (Notes): optional, free text.
4. Click **Buat** (Create). The toast "Karyawan dibuat." (Employee created.) appears.

   ![Create employee dialog with the User, Employee number, Organisation, Vehicle, Phone, Start date, Status and Notes fields](~/assets/guide/web/employees-create.webp)

## Editing an employee profile

1. Click **Ubah** on the employee row. The **Ubah Karyawan** (Edit employee) dialog opens with all the saved profile data: organisation, vehicle, phone, start date, status and notes are already filled in.
2. Change the fields you need. **Pengguna** appears as read-only text, with the note "Pengguna tidak bisa diganti." (The user cannot be changed.) **Nomor karyawan** is read-only (note "Dibuat otomatis dan tidak dapat diubah." (Created automatically and cannot be changed.)) while manual input is not allowed; if it is allowed, the field is required and unique per company.
3. Click **Simpan** (Save). The toast "Karyawan diperbarui." (Employee updated.) appears.

To remove an employee's field access, change **Status** to **Nonaktif** or **Berhenti**. This screen has no button to delete a profile.

## Preparing employees for field work

- My Work (Pekerjaan Saya) ([section 3.6](/docs/guides/web/operations/my-work/)) appears in the sidebar only for active users who hold a work permission (`ticket.start`, `ticket.resolve`, `ticket.close`, `spk.start` or `spk.submit`) and have an **Aktif** profile in the active company.
- The technician app uses the same requirements, plus a verified user email. The app checks this at sign-in and on every later request. Technicians do their tasks in that app, not on the web.
- The technician choice for work orders, in Dispatch (Penugasan) ([section 3.1](/docs/guides/web/operations/dispatch/)) and on the work order page ([section 3.3](/docs/guides/web/operations/work-orders/)), holds only active users with an **Aktif** profile and the permission `spk.start` or `spk.submit`.
- The ticket recipient choice in Dispatch does not require a profile. A ticket assigned to a user without an **Aktif** profile does not appear in My Work.
- The **Diperoleh oleh** (Acquired by) field on a customer ([section 4.1](/docs/guides/web/customers-and-services/customers/)) offers only active users with an **Aktif** profile who hold `customer.create`. An admin without a profile is not offered.
- Evaluations (Evaluasi) ([section 3.5](/docs/guides/web/operations/evaluations/)) rate the user account. That evaluation score goes into the average score and customer rating in Technician Performance ([section 7.9](/docs/guides/web/finance-and-reports/technician-performance/)).
- Technician Performance holds only technicians with an **Aktif** profile.

## Exporting the list

1. Set the **Cari** box, the **Organisasi** filter and the **Status** filter to match the data you need.
2. Click **Ekspor**, then choose **Ekspor CSV** (Export CSV) or **Ekspor PDF** (Export PDF).

The file `employees-export-<tanggal>-<jam>.csv` or `.pdf` contains Nomor karyawan, Nama, Email, Organisasi, Kendaraan, Status and Telepon. The **Ekspor** button appears only for holders of `employee.export`.

## Common errors

- The account is not in the **Pengguna** choices: the list holds only active users in this company who do not yet have a profile, and searches only after you type 2 characters. Create or activate the account in Users ([section 8.5](/docs/guides/web/administration/users/)). An account that already has a profile cannot be chosen again.
- A new account already has an employee profile but **Organisasi** and **Kendaraan** are still empty: the **Profil karyawan** (Employee profile) card in the **Buat Pengguna** form holds only phone, start date, status and notes. Open **Ubah** on that employee's row to fill in the unit and vehicle.
- A user appears in the choices but is rejected with "Pengguna ini sudah punya profil karyawan." (This user already has an employee profile.): that account already has a profile in another company, or its old profile was deleted and still holds the account. One account may have only one employee profile, across all companies. The web screen has no step to fix this.
- My Work or the technician app does not open for an employee who already has a profile: check the account is active, the email is verified, the profile is **Aktif** (the **Status** column) and the work permissions on its role.
- A technician does not appear in the work order choices: their role does not yet hold `spk.start` or `spk.submit`, or their profile is not yet **Aktif**.
- The start date is rejected with "Format tanggal tidak valid. Contoh: &lt;tanggal&gt;." (Invalid date format. Example: &lt;date&gt;.) below the field: write the date as in that example, or pick it from the calendar.
- The employee number is rejected with "nomor karyawan sudah digunakan." (the employee number is already used.) (only when manual input is allowed): pick another number or leave the field empty in the **Buat Karyawan** dialog.
- This screen has no job title field and no **Hapus** button. To remove field access, change the profile **Status**, or turn off the **Aktif** switch on the person's account in Users ([section 8.5](/docs/guides/web/administration/users/)).
