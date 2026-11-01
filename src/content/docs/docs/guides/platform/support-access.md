---
title: "7. Support access"
description: "Learn how to open the tenant web app as a target user, read the support banner and time limit, use edit mode, and see what the audit records."
---

## 7.1 Starting access as a user


Roles that can use it: all platform operators. The target must be an active user in an active tenant.

Support access opens the tenant web app exactly as the target user sees it. The policies and permissions stay those of that user.

1. Open the tenant page, then the **Pengguna** (Users) section.
2. Click **Masuk sebagai** (Sign in as) on the user you want to help.
3. The dialog **Masuk sebagai {nama}?** (Sign in as {name}?) opens. Fill in **Alasan** (Reason), 5 to 200 characters.
4. Fill in **Kata sandi operator** (Operator password) if the dialog asks for it.
5. Click **Mulai akses dukungan** (Start support access).

![Sign in as user dialog with reason and operator password](~/assets/guide/web/platform-support-dialog.webp)

Inbils opens the tenant dashboard and starts the session in read mode. This silent sign-in does not change the target's **Masuk terakhir** (Last sign-in) or **Ingat saya** (Remember me) token.


## 7.2 Reading the banner and the time limit


The **Akses dukungan** (Support access) banner appears at the top of every tenant page:

"Anda masuk sebagai {pengguna} ({perusahaan}) · superadmin {operator} · mode Baca · sisa mm:ss" (You are signed in as {user} ({company}) · superadmin {operator} · Read mode · mm:ss left)

![Tenant dashboard with the Support access banner in Read mode](~/assets/guide/web/platform-support-banner.webp)

A session lasts at most 30 minutes from the start and cannot be extended. The browser countdown is only an indicator. The server checks the time on every request. The session also ends when:

- the operator clicks **Keluar** (Sign out) on the banner;
- the target signs out of the web app;
- the platform session ends;
- the operator or target account is deactivated;
- the tenant is suspended;
- the target no longer has an active company in the tenant.

When the 30-minute limit runs out and the platform session is still active, Inbils returns to the tenant page in the operator panel.


## 7.3 Read mode and edit mode


The starting mode is **Baca** (Read). GET and HEAD requests still work. Switching company within the same tenant's parent and subsidiaries is still allowed. Every other change is refused with:

"Mode baca saja: perubahan tidak diizinkan selama akses dukungan. Aktifkan mode ubah dari banner untuk melanjutkan." (Read mode only: changes are not allowed during support access. Turn on edit mode from the banner to continue.)

To change data:

1. Click **Mode ubah** (Edit mode) on the banner.
2. The dialog **Aktifkan mode ubah** (Turn on edit mode) explains that changes affect real data and are recorded in the audit.
3. Fill in **Ketik {kode} untuk melanjutkan** (Type {code} to continue) with the code of the parent company.

   ![Turn on edit mode dialog on the Support access banner](~/assets/guide/web/platform-support-write-dialog.webp)

4. Click **Aktifkan mode ubah**.
5. If the platform password confirmation is older than 5 minutes, Inbils opens **Konfirmasi kata sandi** (Confirm password). After it succeeds, Inbils returns to the tenant page. Click **Mode ubah** and type the code again.
6. The banner changes to **mode Ubah** (Edit mode). Click **Mode baca** (Read mode) to return to the safe mode.

Every change request in Edit mode records the route, HTTP method, path and response status as **Data diubah saat akses dukungan** (Data changed during support access).


## 7.4 Actions that stay forbidden


Edit mode does not bypass the target's permissions. If the target has no right to change something, the operator has none either.

The following actions are always refused, in both Read and Edit mode:

- the target's profile, email, password, 2FA and account verification;
- viewing the secrets of a customer's network account;
- changing, deleting or resetting the 2FA of the target user from the **Pengguna** menu;
- creating or changing a user while setting a sign-in password;
- switching to a company outside the tenant;

A refusal of personal settings shows "Pengaturan akun pribadi tidak tersedia selama akses dukungan." (Personal account settings are not available during support access.) A switch outside the tenant shows "Perpindahan ke perusahaan di luar tenant tidak diizinkan selama akses dukungan." (Switching to a company outside the tenant is not allowed during support access.)


## 7.5 Audit and company visibility


One session uses one group code (`batch_uuid`). The platform audit records:

- **Akses dukungan dimulai** (Support access started);
- **Mode akses dukungan diubah** (Support access mode changed);
- **Data diubah saat akses dukungan** for every change;
- **Akses dukungan berakhir** (Support access ended), the end reason and the duration.

The tenant sees rows of the **Akses dukungan** module in the **Log Audit** (Audit log). The operator's name and email are not shown. The descriptions use sentences such as:

- "Tim dukungan Inbils masuk sebagai Budi Santoso" (Inbils support team signed in as Budi Santoso);
- "Tim dukungan Inbils mengubah mode akses saat masuk sebagai Budi Santoso" (Inbils support team changed the access mode while signed in as Budi Santoso);
- "Tim dukungan Inbils mengubah data saat masuk sebagai Budi Santoso" (Inbils support team changed data while signed in as Budi Santoso);
- "Tim dukungan Inbils keluar dari akun Budi Santoso" (Inbils support team signed out of Budi Santoso's account).

See the **Inbils Web Guide [section 7.12](/docs/guides/platform/support-access/)** for the tenant view.

### Common errors

- **Masuk sebagai** does not appear: the target or tenant is inactive, or the target has no active company in the tenant.
- "Akhiri sesi pengguna yang sedang aktif sebelum memulai akses dukungan." (End the active user session before starting support access.): the browser has a normal web sign-in or another support session. Sign out of that session, then try again.
- "Perusahaan sedang ditangguhkan." (The company is suspended.): reactivate the tenant if support is still needed.
- "Pengguna tidak aktif." (The user is not active.): activate the user from the tenant web app with an authorised account, not through the operator panel.
- "Kode perusahaan yang diketik tidak sesuai." (The company code you typed does not match.): use the parent code shown on the tenant page.
- The banner runs out and the page returns to the panel: the 30-minute limit was reached. Start a new session with a new reason if you still need it.
