---
title: "8.5 Users (Pengguna)"
description: "Create and manage back-office login accounts: invitations, roles, activation, two-step authentication resets and deletion."
---

This menu manages the login accounts of back-office employees: name, email, active status, roles and the invitation to set a password. Open it when a new person joins, when a role changes, when an account must be deactivated, or when someone loses their two-step authentication device.

Roles that can use it: holders of `users.manage` (list, add, edit, delete, export, and set roles), which is Admin in the default templates, and `users.two_factor.reset` (reset 2FA, Admin only). The list holds the members of the active company: users who belong to this company, and users from other companies who were given membership here.

## Opening and reading the list

1. In the sidebar, open the **Administrasi** (Administration) group, then click **Pengguna** (Users).
2. Read the screen:
   - **Cari** (Search) (hint "Nama atau email" (Name or email)) searches the name and email. **Status** filters **Semua status** (All statuses), **Aktif** (Active) or **Nonaktif** (Inactive).
   - Columns: **Nama** (Name) (a link to the detail page) and **Email** (both can be sorted), **Peran** (Roles) (one badge per role of the user in this company; "Belum ada peran" (No role yet) if empty), **Status** (can be sorted; badge **Aktif** or **Nonaktif**), **2FA** (badge **Aktif** or **Nonaktif**) and **Aksi** (Actions).
   - The **Aksi** column holds the **Atur peran** (Set roles) button (if you may set that user's roles), the **Ubah** (Edit) button, and the **Aksi lainnya** (More actions) menu with **Lihat detail** (View details) and **Hapus** (Delete).
   - A user who belongs to another company appears with the **Anggota** (Member) badge next to their name and without a link to the detail page. Their login is changed in their home company. Here you only set their roles in this company through **Atur peran**.
   - **Hapus** does not appear on your own account row, on the row of a user who holds permissions you do not hold, on the row of a member from another company, and on the row of a user who has also joined another company that you do not belong to.
   - **Ekspor** (Export) offers **Ekspor CSV** (Export CSV) and **Ekspor PDF** (Export PDF) with the columns Nama, Email, Peran and Status (**Aktif** or **Nonaktif**). The result follows the active search and filters, with at most 5000 rows (the default limit). If there are more, the CSV file ends with the line "# Ekspor dipotong pada 5000 baris. Persempit filter untuk mengekspor sisa barisnya." (# Export cut at 5000 rows. Narrow the filter to export the remaining rows.) and the PDF marks the cut. Narrow the filter when that happens.
   - If there are no rows, the screen shows "Belum ada pengguna" (No users yet), or "Tidak ada pengguna yang cocok" (No matching users) with the **Reset filter** (Reset filters) button when a filter is active.

   ![Users list with the Search box, the Status filter, the columns Name, Email, Roles, Status, 2FA and Actions, and the Export and Create user buttons](~/assets/guide/web/users.webp)

## Creating a user

1. Click **Buat Pengguna** (Create user).

   ![Create user form with the Name and Email fields, the Active switch and the list of Roles](~/assets/guide/web/users-create.webp)

2. Fill in the **Data akun** (Account data) card. The form subtitle reads "Akun menerima undangan lewat email untuk mengatur kata sandi. Peran menentukan hak aksesnya." (The account receives an invitation by email to set a password. Roles determine its permissions.) The form has no **Kata sandi** (Password) field: the admin does not type a password for the new account, and the person sets it through the invitation in step 4.
   - **Nama**: required, 255 characters at most.
   - **Email**: required, a valid email, 255 characters at most, not yet used by another account in the system (any company). The invitation is sent to this address.
   - **Aktif**: switch, on by default. Turn it off if the new account must not sign in yet. The value is saved, so the account immediately has the status **Nonaktif**. The invitation is still sent, but an inactive account cannot sign in until you activate it through **Ubah**.
   - **Peran**: one checkbox per role of this company, labelled with the role name. You may choose more than one; read "Aturan saat memberi peran" (Rules when giving roles) below. Customer account roles are not offered here. A role box that holds permissions you do not hold cannot be ticked and carries the note "Peran ini memuat hak akses yang tidak Anda pegang" (This role holds permissions you do not hold). If the company has no roles yet, the screen writes "Perusahaan ini belum punya peran yang bisa diberikan di sini." (This company has no roles that can be given here yet.) with the link **Buat peran** (Create role), or "Minta admin perusahaan membuat peran." (Ask the company admin to create a role.) if you may not create roles.
3. If you hold `employee.manage`, the **Profil karyawan** (Employee profile) card appears below **Data akun**. Turn on the **Buat profil karyawan untuk pengguna ini** (Create an employee profile for this user) switch if the person works in the field or needs an employee profile. The fields that appear:
   - **Telepon** (Phone): optional, 50 characters at most.
   - **Tanggal masuk** (Start date): optional, picked from the browser calendar.
   - **Status karyawan** (Employee status): **Aktif** (initial value) or **Nonaktif**. The status **Berhenti** (Terminated) exists only on the Employees screen ([section 8.3](/docs/guides/web/administration/employees/)).
   - **Catatan** (Notes): optional, 2000 characters at most.

   The employee number is created automatically, and **Organisasi** (Organisation) and **Kendaraan** (Vehicles) are filled in later on the Employees screen. Without `employee.manage`, this card does not appear, and the server refuses a form that still carries employee data.
4. Click **Kirim undangan** (Send invitation). You return to the list and the toast "Pengguna dibuat. Undangan dikirim ke &lt;email&gt;." (User created. Invitation sent to &lt;email&gt;.) appears. **Batal** (Cancel) returns to the list without saving. The user receives the email "Undangan staf &lt;nama perusahaan&gt; di Inbils" (Staff invitation to &lt;company name&gt; on Inbils) with the **Atur kata sandi** (Set password) button. The link is valid for 60 minutes. The user clicks that button, chooses a password, then signs in with their email. The invitation email always goes out through the platform sender, not through the company's SMTP ([section 8.9](/docs/guides/web/administration/integrations/)). The sending is recorded in the security log.

A new account belongs to the active company and its email is verified immediately. Until the person sets a password through the invitation, the account cannot sign in. An account that holds only roles for the apps (Technician or Customer) is redirected on the web to the page "Gunakan aplikasi Inbils" (Use the Inbils app); a ticked back-office role removes that redirect. An account without any role sees "Akun ini belum punya akses aplikasi web" (This account does not have web app access yet) until it is given a role. A customer login is created automatically when the customer is created ([chapter 4](/docs/guides/web/customers-and-services/customers/)), so do not create it here. A technician also needs an active employee profile ([section 8.3](/docs/guides/web/administration/employees/)), which you can create in the **Profil karyawan** card above.

## Resending the invitation

Use this when the invitation email is lost or the link is older than 60 minutes.

1. Open the user detail page (section "Melihat detail pengguna" (Viewing user details)).
2. Click **Kirim ulang undangan** (Resend invitation) at the top right. The button appears only if the account is active and has never signed in (**Terakhir masuk** (Last sign-in) is empty), you hold `users.manage`, and you may edit that account.
3. The toast "Undangan dikirim ulang ke &lt;email&gt;." (Invitation resent to &lt;email&gt;.) appears, and the user receives the same email with a new link. The resending is recorded in the security log.

Resending is limited to six times per minute for one account, with the message "Terlalu banyak pengiriman undangan. Coba lagi nanti." (Too many invitation sends. Try again later.) An account that has already signed in does not have this button: that user uses **Lupa kata sandi** (Forgot password) on the sign-in page ([section 1.3](/docs/guides/web/introduction/forgot-password/)). An inactive account does not have this button either, so activate it first through **Ubah**. If the server refuses, the red box above the card writes "Undangan hanya dapat dikirim kepada pengguna aktif yang belum pernah masuk." (The invitation can only be sent to active users who have never signed in.)

## Rules when giving roles

The refusal message appears in red below the **Peran** list, together with the toast "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.) The rules apply per company.

- You can only give roles whose permissions you hold in full. A role more powerful than you cannot be ticked. If it is sent anyway, the message is "Anda tidak dapat memberi hak akses yang tidak Anda miliki:" (You cannot give permissions you do not have:) followed by the permission name.
- You can only open **Ubah** for, delete, reset 2FA for, or set roles of an account whose permissions you hold in full. The admin holds everything, so is not restricted. The page of an account more powerful than you answers **Akses ditolak** (Access denied).
- If the person saving does not hold `roles.manage`, the combined permissions of all ticked roles must not contain a conflicting pair under the separation of duties (the list of pairs is in [section 8.6](/docs/guides/web/administration/roles/)). Example: **Manajer** (Manager) and **Staf** (Staff) on one account are refused, because a manager approves item requests while staff prepare and issue them. The message has the form "Pemisahan tugas (persetujuan permintaan barang vs pelaksanaan gudang): ... tidak boleh digabung dengan ..." (Separation of duties (item request approval vs warehouse execution): ... must not be combined with ...), followed by the conflicting permission codes. Holders of `roles.manage` are excepted as an emergency route.
- The company must keep at least one active admin, meaning an active user who holds `roles.manage` and web access permission. Removing that last role, deactivating, or deleting the last admin is refused with "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage." (The company must keep at least one active admin who holds roles.manage.) Appoint another admin first.
- If the user has also joined another company that you do not belong to, the detail page, **Ubah** and **Hapus** are refused (403, "Akses ditolak"). Setting their role in this company is still allowed if they are a member of this company.

## Setting a member's roles

Use **Atur peran** to change someone's roles in this company without opening the **Ubah** form, especially for members from another company (the **Anggota** badge). A user can hold different roles in each company, for example Admin in one company and Technician in another.

1. On the user row, click **Atur peran**. The dialog is titled "Atur peran" followed by the user's name.
2. Read the note: "Peran ini berlaku hanya di perusahaan ini. Pengguna tanpa peran tidak bisa membuka menu apa pun." (These roles apply only in this company. A user without a role cannot open any menu.)
3. Tick the roles that apply, then click **Simpan peran** (Save roles). **Batal** closes the dialog without saving. The toast "Peran pengguna diperbarui." (User roles updated.) appears.

Customer account roles cannot be added or removed here. If the user holds one, it appears as a badge with the note "Peran pelanggan dikelola dari data pelanggan." (Customer roles are managed from the customer data.) and stays after saving. The rules in "Aturan saat memberi peran" above apply in the same way.

## Editing a user

1. In the list, click **Ubah** on the user row, or click **Ubah** on the detail page.
2. Change the fields in the **Ubah Pengguna** (Edit user) form. The fields are the same as in the creation form, without the **Profil karyawan** card (the profile is changed on the Employees screen, [section 8.3](/docs/guides/web/administration/employees/)), with the following differences:
   - **Email**: must still be unique. Changing it here does not reset the email verification status.
   - **Kata sandi**: this field exists only in the **Ubah** form, to replace the password of an existing account. Leave it empty to keep the old password (hint "Kosongkan untuk mempertahankan kata sandi saat ini." (Leave empty to keep the current password.)). If filled in, at least 8 characters.
   - **Peran**: the result is exactly the roles that are ticked. Roles that are not ticked are removed. A customer account role that the user holds does not change.
3. Click **Simpan** (Save). You return to the list and the toast "Pengguna diperbarui." (User updated.) appears. **Batal** returns to the list without saving. The **Kembali** (Back) button at the top right opens that user's detail page.

Deactivating an account or changing its password immediately revokes all of that user's app tokens, so the Android app asks to sign in again on its next call. An inactive user can no longer sign in, and the sign-in refuses them with the same message as a wrong password ("Email atau kata sandi salah." (Wrong email or password.)). A web session that is already open is not closed automatically and runs until the session expires. Work order (SPK) and ticket assignment refuse inactive users ([chapter 3](/docs/guides/web/operations/dispatch/)).

## Viewing user details

1. Click the user's name in the list, or **Lihat detail** in the **Aksi lainnya** menu.
2. The page title holds the name and email, with the buttons **Kembali**, **Log audit** (Audit log), **Kirim ulang undangan** (only for an account that has never signed in, see "Mengirim ulang undangan" (Resending the invitation)) and **Ubah**. **Log audit** appears only if you hold `report.audit.view` (default: admin). That button opens the audit log already filtered for this user. The **Data pengguna** (User data) card shows **Status**, **Dibuat** (Created), **Terakhir masuk** (date and time use the company format), **Pelanggan** (Customers) (code and name, if the account is linked to a customer) and **Peran di perusahaan ini** (Roles in this company) ("Belum ada peran di perusahaan ini" (No role in this company yet) if empty). The **Autentikasi dua langkah** (Two-step authentication (2FA)) card shows the badge **Aktif** or **Nonaktif**.

   ![User detail page with the User data card, the Two-step authentication card and the history tabs](~/assets/guide/web/users-show.webp)

3. Below it, history tabs appear according to your permissions: **Riwayat tagihan (n)** (Invoice history (n)) (`billing.view`), **Riwayat tiket (n)** (Ticket history (n)) (`ticket.view`) and **Riwayat SPK (n)** (Work order (SPK) history (n)) (`spk.view`). Each tab holds at most the 50 newest rows and a **Lihat** (View) button to the document. Without any of those permissions, the tabs do not appear.
   - **Riwayat tagihan**: invoices created by that user or belonging to the linked customer. Columns Nomor (Number), Status, Tanggal terbit (Issue date), Jatuh tempo (Due date), Total, Dibayar (Paid) and Aksi.
   - **Riwayat tiket**: tickets created by or assigned to them, or belonging to the linked customer. Columns Kode (Code), Judul (Title), Prioritas (Priority), Status, Dibuat, Diselesaikan (Resolved) and Aksi.
   - **Riwayat SPK**: work orders created by or assigned to them, or belonging to the linked customer. Columns Kode, Judul, Jenis (Type), Prioritas, Status, Jadwal (Schedule), Selesai (Completed) and Aksi.
   - A tab without content shows "Belum ada riwayat tagihan" (No invoice history yet), "Belum ada riwayat tiket" (No ticket history yet) or "Belum ada riwayat SPK" (No work order history yet).

## Resetting two-step authentication

Use this when a user loses their authenticator device and recovery codes. A user who still holds a recovery code can use it themselves ([section 1.4](/docs/guides/web/introduction/two-factor-authentication/)). The button appears only if the user's 2FA status is **Aktif**, you hold `users.two_factor.reset` (default: admin only), it is not your own account, you hold all permissions of that account, and you belong to all companies of that user.

1. Open the user detail page (section "Melihat detail pengguna").
2. On the **Autentikasi dua langkah** card, click **Atur ulang 2FA** (Reset 2FA).
3. Read the dialog titled "Atur ulang autentikasi dua langkah untuk" (Reset two-step authentication for) followed by the user's name and a question mark. It says: the user can sign in with only a password until they set it up again, and their recovery codes no longer apply. First make sure the person asking is really that user, then click **Atur ulang** (Reset). **Batal** closes the dialog.
4. The toast "Autentikasi dua langkah direset." (Two-step authentication reset.) appears, followed by the user's name and a note that they can sign in with only a password, then set it up again. The badge changes to **Nonaktif** and the button disappears.

The reset deletes the authenticator secret and recovery codes, ends the user's other logins ("Ingat saya" (Remember me) cookie, app tokens, and other web sessions if the server uses database sessions) and is recorded in the security log together with the id of the admin who did it.

## Deleting a user

1. Click the **Aksi lainnya** menu on the user row, choose **Hapus**, then click **Hapus** in the confirmation dialog. The dialog title reads "Hapus" followed by the user's name and a question mark, with the note "Pengguna yang tercatat pada pelanggan atau penyesuaian stok tidak bisa dihapus. Nonaktifkan akunnya." (A user recorded on a customer or a stock adjustment cannot be deleted. Deactivate the account.)
2. The toast "Pengguna dihapus." (User deleted.) appears. Deletion is permanent and cannot be undone. All of that user's app tokens are revoked too.

Deletion is refused if the user is credited as the acquirer of a customer ([chapter 4](/docs/guides/web/customers-and-services/customers/)), or has ever submitted or reviewed a stock adjustment ([chapter 6](/docs/guides/web/inventory/item-requests/)). The dialog stays open, a red box above the list shows the reason, and the toast "Data gagal disimpan. Periksa input." appears. The reason reads "Pengguna yang dicatat memperoleh pelanggan tidak bisa dihapus. Nonaktifkan akunnya." (A user recorded as having acquired a customer cannot be deleted. Deactivate the account.) or "Pengguna yang pernah mengajukan atau memeriksa penyesuaian stok tidak bisa dihapus. Nonaktifkan akunnya." (A user who has submitted or checked a stock adjustment cannot be deleted. Deactivate the account.) Click **Batal**, then deactivate the account through **Ubah**.

## Common errors

- Saving is refused with the toast "Data gagal disimpan. Periksa input.": read the red message below the field or below **Peran**. Common causes: a combination of roles or a role whose permissions you do not hold (see "Aturan saat memberi peran"), "email sudah digunakan." (the email is already used.) if the email is used by another account, and a **Telepon**, **Tanggal masuk** or **Catatan** field in the **Profil karyawan** card that is over its limit. In **Ubah**, a **Kata sandi** of fewer than 8 characters is refused with "kata sandi minimal 8 karakter." (the password must be at least 8 characters.)
- A new user does not receive the invitation: check the address in **Email**, the spam folder, and the Email integration ([section 8.9](/docs/guides/web/administration/integrations/)). An account that is active and has never signed in can be resent the invitation from its detail page. A link older than 60 minutes can no longer be used, so resend the invitation.
- The **Profil karyawan** card does not appear in the **Buat Pengguna** form: your role does not yet hold `employee.manage`. Ask someone who may do so to create the profile through the Employees screen ([section 8.3](/docs/guides/web/administration/employees/)).
- A new account should be inactive but appears **Aktif**: the **Aktif** switch in the creation form was still on when you saved. Turn that switch off, or change the account through **Ubah**.
- A technician or customer sees the page "Gunakan aplikasi Inbils": this is normal behaviour for an account whose roles do not include web access. Give a back-office role if the person must use the web.
- A user has been deactivated but can still work on the web: the session that was already open has not ended. Their app tokens have been revoked.
- The **Atur ulang 2FA** button is missing: the user has not enabled 2FA, the account is your own, or the account holds permissions you do not hold.
- **Hapus** is missing on the user row: that row is your own account, an account that holds permissions you do not hold, a member from another company, or the user belongs to a company you do not belong to.
- A sole admin who loses their 2FA device cannot be reset from this screen because there is no other admin. The server administrator turns off their 2FA through a server command.
