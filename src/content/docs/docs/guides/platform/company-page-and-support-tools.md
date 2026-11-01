---
title: "5. Company page and support tools"
description: "Open a tenant page to read its profile, admins and integrations, add subsidiaries, unlock users, reset 2FA, resend invitations and review failures."
---

## 5.1 Profile, summary and status


Roles that can use it: all platform operators.

Click a tenant name on the Dashboard. The top of the page contains:

- the company name as the title and **Kode {kode}** (Code {code}) as the subtitle;
- a status badge and the lifecycle buttons;
- the **Permintaan anak perusahaan** (Subsidiary requests) card, only if this tenant has an open request ([section 5.3](/docs/guides/platform/company-page-and-support-tools/));
- the **Profil perusahaan** (Company profile) card;
- the **Ringkasan** (Summary) card;
- the **Status perusahaan** (Company status) card.

![Operator tenant page with company profile, summary and status](~/assets/guide/web/platform-company-show.webp)

**Profil perusahaan** is read-only. It contains: Kode, Email, Telepon, Situs web, Alamat, Zona waktu, Mata uang, Dibuat, Ditangguhkan and Pengajuan hapus (Code, Email, Phone, Website, Address, Time zone, Currency, Created, Suspended and Deletion request). A tenant admin changes the profile and operational settings from the company web.

**Ringkasan** repeats the tenant figures from the dashboard: Anak perusahaan, Pengguna, Pelanggan, Masuk terakhir, Penyimpanan, Job gagal 7 hari and WhatsApp gagal 7 hari (Subsidiaries, Users, Customers, Last sign-in, Storage, Failed jobs 7 days and WhatsApp failures 7 days).

**Status perusahaan** shows the current status and, if present, the list **Syarat pengajuan hapus** (Deletion request conditions). The lifecycle actions are covered in [chapter 6](/docs/guides/platform/suspend-reactivate-delete/).


## 5.2 Company admins and integrations


The **Admin perusahaan** (Company admins) card shows at most 25 users who hold the `roles.manage` permission through their role in their home company, sorted by name. The role name can be anything. The columns:

- **Admin**: name and email;
- **Perusahaan** (Company): code of the home company;
- **Status**: active, inactive and the sign-in lock badge;
- **2FA**: **Aktif** (Active) or **Nonaktif** (Inactive);
- **Masuk terakhir** (Last sign-in): sign-in time or invitation status.

The **Integrasi** (Integrations) card contains Midtrans, WhatsApp, Email and RADIUS for the parent and each subsidiary. The columns:

- **Perusahaan**;
- **Layanan** (Service);
- **Status**: **Tidak diisi** (Not filled in), **Terisi** (Filled in), **Terverifikasi** (Verified) or **Galat** (Error);
- **Aktif**: Ya (Yes) or Tidak (No);
- **Terakhir diuji** (Last tested), or **Belum pernah** (Never).

The operator sees only the status and the test time. The panel does not send credential contents or secrets to the operator's browser. The admin of each company fills in and tests their own integrations in the **Integrasi** menu. See **Inbils Web Guide [section 8.9](/docs/guides/platform/role-templates/)**.


## 5.3 Adding a subsidiary


The **Anak perusahaan** (Subsidiaries) card shows Name and Code, Status, Currency, Time zone and the number of Users.

![Subsidiaries section of the operator tenant page](~/assets/guide/web/platform-company-subsidiaries.webp)

1. Make sure the parent company has the status **Aktif**.
2. Click **Tambah anak perusahaan** (Add subsidiary).
3. Fill in **Nama** (Name) and **Kode** (Code). The code rules are the same as for a parent company, and the code must be unique across the whole installation.
4. In the **Akses admin** (Admin access) section, tick the admins who may switch to the new subsidiary. This list uses the admins shown on the **Admin perusahaan** card.
5. Click **Tambah anak perusahaan**.

Creating a subsidiary does not ask for **Kata sandi operator** (Operator password).

A subsidiary follows the currency and time zone of the parent. Inbils fills in the Starter catalogue, not sample data, and copies the role templates to that subsidiary. A ticked user receives a membership without changing their home company, and receives a role in the subsidiary that comes from the same template as their role in the home company, as long as the content of that role does not exceed the permissions they hold in the home company. A member who holds only a role created by their company receives no role. The toast "Anak perusahaan dibuat." (Subsidiary created.) then adds "Anggota ini belum punya peran di anak perusahaan baru dan perlu diberi peran di Pengguna:" (This member has no role in the new subsidiary yet and needs to be given a role in Users:) followed by their name, and for a broader role "Peran ini lebih luas daripada yang dipegang anggotanya di perusahaan asal, jadi tidak disalin dan perlu diberikan sendiri di Pengguna:" (This role is broader than the one the member holds in the home company, so it is not copied and must be given separately in Users:) followed by the member and the role. Ask the company admin to give the role in the **Pengguna** menu.

The seeder creates an internal account `system-seed-...@inbils.internal` if the subsidiary has no home user when the catalogue is filled in. The account uses a random password and can be visible in the **Pengguna** table. It is not a platform operator.

### Subsidiary requests from a tenant

The admin of a parent company does not create subsidiaries themselves. An admin with the `company.manage` permission asks through the **Minta anak perusahaan** (Request subsidiary) button on the **Anak perusahaan** card on the **Perusahaan** page of the tenant web. The admin fills in **Nama**, **Kode usulan** (Suggested code, may be empty) and **Catatan** (Notes, at most 500 characters). A tenant may have only one open request. A subsidiary cannot submit a request, only the parent company can.

When a request arrives:

- Inbils sends an email with the subject **Permintaan anak perusahaan dari {nama perusahaan}** (Subsidiary request from {company name}) to every active platform operator, through the platform mailer. The email contains the requested name, the suggested code, the notes and the requester. The button **Tinjau permintaan** (Review request) opens the tenant page with the request dialog already open.
- The **Permintaan anak perusahaan** card appears on the **Dasbor** (the requests of all tenants, oldest at the top) and on the tenant page. Each row shows the name, "Kode usulan: {kode}" (Suggested code: {code}) if present, "Diminta oleh {nama}, {waktu}" (Requested by {name}, {time}), and the notes. On the Dasbor the row also shows "Untuk {perusahaan} ({kode})" (For {company} ({code})).
- The platform audit records **Anak perusahaan diminta** (Subsidiary requested) (`tenant.subsidiary_requested`).
- An email that fails to be queued does not cancel the request. The request still appears on the card.

Creating a subsidiary from a request:

1. Click **Buat anak perusahaan** (Create subsidiary) on the request row. On the Dasbor, this button opens the tenant page with its dialog. On the tenant page, this button is inactive while the tenant is not **Aktif**.
2. The dialog **Buat anak perusahaan dari permintaan** (Create subsidiary from request) shows the requester's name and notes. **Nama** and **Kode** are already filled in from the request. If the request carries no code, Inbils suggests one from the name. The name and code may be changed.
3. Choose **Akses admin** as in a normal addition, then click **Buat anak perusahaan**.

The toast reads "Anak perusahaan dibuat. Permintaannya ditutup." (Subsidiary created. Its request is closed.) Creating a subsidiary does not ask for the operator password, also when it comes from a request. The platform audit records **Anak perusahaan dibuat** (Subsidiary created) and **Permintaan anak perusahaan {nama} dibuat** (Subsidiary request {name} created) (`tenant.subsidiary_request_closed`, result `created`). Inbils does not send an email to the requester when the subsidiary is created.

Rejecting a request:

1. Click **Tolak** (Reject) on the request row.
2. The dialog **Tolak permintaan {nama}?** (Reject request {name}?) states that the reason is recorded in the audit and sent by email to the requester.
3. Fill in **Alasan** (Reason), 5 to 200 characters. Write it in sentences the company admin can understand. Fill in **Kata sandi operator** if asked.
4. Click **Tolak permintaan** (Reject request).

Inbils sends the email **Permintaan anak perusahaan ditolak** (Subsidiary request rejected) to the requester with the request name and your reason. The toast reads "Permintaan ditolak. Alasannya dikirim ke pemohon lewat email." (Request rejected. The reason was sent to the requester by email.) If the requester is already inactive or their email cannot be queued, the toast reads "Permintaan ditolak. Pemohon tidak bisa dikirimi email, jadi sampaikan alasannya langsung." (Request rejected. The requester cannot be emailed, so give the reason in person.) The platform audit records **Permintaan anak perusahaan {nama} ditolak** (Subsidiary request {name} rejected) with the reason. The tenant can submit a new request after the request is closed. The **Tolak** button stays active on a suspended tenant, and the card reads "Aktifkan kembali perusahaan sebelum membuat anak perusahaan. Permintaan masih bisa ditolak." (Reactivate the company before creating a subsidiary. The request can still be rejected.)

### Common errors

- The button is inactive and the text reads "Aktifkan kembali perusahaan sebelum menambah anak perusahaan." (Reactivate the company before adding a subsidiary.): reactivate the tenant first.
- "Perusahaan sedang ditangguhkan: aktifkan kembali sebelum menambah anak perusahaan." (The company is suspended: reactivate it before adding a subsidiary.): the status changed after the page was opened. Reload, then reactivate.
- The admin you look for is missing: the **Admin perusahaan** card shows only the first 25 admins. Use the membership command in [section 11.1](/docs/guides/platform/console-tasks-and-queues/) if server handling is needed.
- "Permintaan ini sudah ditutup. Muat ulang halaman untuk melihat yang terbaru." (This request is already closed. Reload the page to see the latest.) or "Permintaan tidak ditemukan atau sudah ditutup." (The request was not found or is already closed.): another operator has already created a subsidiary from that request or rejected it. Reload the page.
- The **Permintaan anak perusahaan** card does not appear: there is no open request for that tenant.


## 5.4 Reading the users table


The **Pengguna** card combines the accounts of the parent company and all subsidiaries. Use **Cari** for a name or email and **Status** for **Aktif** or **Nonaktif**.

![Tenant Users section with company, role, status, 2FA, last sign-in and actions](~/assets/guide/web/platform-company-users.webp)

Columns:

| Column | Meaning |
| --- | --- |
| **Pengguna** | Name and email. |
| **Perusahaan** | Home company of the user. |
| **Peran** (Role) | The role the account holds in its home company. If the account is also a member of another company, its role there does not appear in this column. |
| **Status** | Active or Inactive, plus the sign-in lock if present. |
| **2FA** | Active or Inactive. |
| **Masuk terakhir** | Time of the last sign-in or the invitation status. |
| **Aksi** (Actions) | **Masuk sebagai** (Sign in as) and the **Aksi lain** (More actions) menu. |

The lock badge reads **Terkunci N mnt** (Locked N min) or **Terkunci < 1 mnt** (Locked < 1 min). Point at the badge to read the reason: too many wrong passwords or too many wrong 2FA codes. Minutes are rounded up.

**Masuk sebagai** appears only for active users who can enter an active company in that tenant. The user's permissions still apply during access. The operator gets no extra permissions.


## 5.5 Unlocking a sign-in lock


1. On the user row, open **Aksi lain**.
2. Click **Buka kunci masuk** (Unlock sign-in).
3. The dialog explains that the lock caused by wrong passwords and wrong 2FA codes will be removed.
4. Click **Buka kunci masuk**. This action does not ask for the operator password.

Inbils clears the sign-in budget for every address recorded as failing for that user in the last 15 minutes, and the account-level 2FA budget. The budget of an address that matches no account stays. Other users on the same address are not unlocked.

The success toast reads "Kunci masuk pengguna dibuka." (The user's sign-in lock was removed.) The action is recorded as **Kunci masuk dibuka** (Sign-in lock removed) in the platform audit and as a support team action in the company's Audit log.


## 5.6 Resetting a user's 2FA


**Atur ulang 2FA** (Reset 2FA) appears only if the user has 2FA.

1. Open **Aksi lain**, then click **Atur ulang 2FA**.
2. The dialog states that the user's 2FA is turned off and the user must activate it again. About sessions: on a deployment with database sessions, the dialog reads "Semua sesi masuknya berakhir." (All their sign-in sessions end.) With another session driver, the dialog reads "Sesi yang sedang berjalan berakhir sendiri setelah N menit tanpa dipakai." (Running sessions end by themselves after N minutes without use.), with N taken from the application session lifetime (`SESSION_LIFETIME`).
3. Fill in **Kata sandi operator** if the dialog asks for it.
4. Click **Atur ulang 2FA**.

Inbils deletes the user's secret and recovery codes, rotates the **Ingat saya** (Remember me) token, and revokes app tokens. On a deployment with database sessions, Inbils also deletes all web sessions of the user. With another session driver, running web sessions are not deleted and end after the session lifetime runs out without use. The user signs in again with their password and enrols 2FA themselves.

The action applies only to users who originate from that tenant, not to people from another tenant who merely hold an extra membership. 2FA applies to the whole user account.


## 5.7 Resending an invitation


**Kirim ulang undangan** (Resend invitation) appears only for active admins who have never signed in.

1. Open **Aksi lain**, then click **Kirim ulang undangan**.
2. The dialog names the destination email address and the limit of 6 per minute for that user.
3. Click **Kirim ulang undangan**. This action does not ask for the operator password.

Inbils creates a new password setup link and sends the email through the platform mailer. The link is valid for 60 minutes. The **Masuk terakhir** status again follows the latest invitation state.

If there are too many requests, the toast reads "Terlalu banyak percobaan. Coba lagi dalam N detik." (Too many attempts. Try again in N seconds.) or "Terlalu banyak percobaan. Coba lagi nanti." (Too many attempts. Try again later.)


## 5.8 Failed jobs, WhatsApp failures and latest audit


The tenant page shows two failure cards:

- **Job gagal** (Failed jobs): Time, Job, Queue and Error;
- **WhatsApp gagal** (WhatsApp failures): Time, Event, Template, Error code, Recipient and Company.

The initial view holds at most 10 failures from 7 days. Click **Lihat 30 hari terakhir** (View the last 30 days) to open a paginated 30-day list. The button changes to **Kembali ke ringkasan** (Back to summary). If the list fails to load, click **Coba lagi** (Try again).

The **Audit terbaru** (Latest audit) card shows the 10 latest activities on the parent and subsidiaries. Its columns are Time, Activity, Source, Actor and Reason. **Kegiatan** (Activity) holds the activity sentence without details, the same as on the **Audit platform** page ([section 10.1](/docs/guides/platform/platform-audit/)). Click **Lihat semua audit** (View all audit) to open the **Audit platform** with the filter for that company. **Sumber** (Source) on that page starts as **Platform**.

### Common errors

- **Masuk sebagai** does not appear: the user or tenant is inactive, or the user has no active company they can enter in that tenant.
- **Atur ulang 2FA** does not appear: the user's 2FA is not active yet.
- **Kirim ulang undangan** does not appear: the user is not an active admin, or has already signed in.
- "Undangan hanya dapat dikirim kepada admin aktif yang belum pernah masuk." (An invitation can only be sent to active admins who have never signed in.): the data changed after the page was opened. Reload.
- The 30-day list shows an error: check the connection, then click **Coba lagi**.
