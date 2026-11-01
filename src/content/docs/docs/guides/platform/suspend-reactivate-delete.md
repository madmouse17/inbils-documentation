---
title: "6. Suspending, reactivating and deleting a company"
description: "Suspend a tenant, reactivate it, record a deletion request, and see what the server team must run in the console to purge a company permanently."
---

## 6.1 Suspending a tenant


Roles that can use it: all platform operators.

1. Open the page of an active tenant.
2. Click **Tangguhkan** (Suspend).
3. Fill in **Alasan** (Reason), 5 to 200 characters.
4. Fill in **Ketik {kode} untuk melanjutkan** (Type {code} to continue) with the exact parent code.
5. Fill in **Kata sandi operator** (Operator password) if the dialog asks for it ([section 2.5](/docs/guides/platform/sign-in-and-account-security/)).
6. Click **Tangguhkan perusahaan** (Suspend company).

![Suspend company dialog with reason, company code and operator password](~/assets/guide/web/platform-company-suspend-dialog.webp)

Below the notes, the dialog states the effect of the suspension. The figures are counted when the tenant page loads:

- "{n} pengguna aktif tidak bisa masuk lagi." ({n} active users can no longer sign in.) counts active users on the parent and subsidiaries;
- "{n} sesi yang sedang berjalan langsung berakhir." ({n} running sessions end at once.) appears only on deployments with database sessions, and counts sessions that are still within the session lifetime;
- "{n} token aplikasi seluler berhenti berlaku." ({n} mobile app tokens stop working.) counts the app tokens of those users that have not expired;
- "{n} faktur terbuka senilai {jumlah}." ({n} open invoices worth {amount}.) counts invoices that have been sent and are not paid, including partially paid or overdue ones. The amount is the remaining balance in the currency of the parent company. If there are none, the dialog reads "Tidak ada faktur terbuka." (No open invoices.)

The dialog shows only the numbers, not a list of user names.

Suspension deactivates the parent company and the subsidiaries that are active at that time. A subsidiary that is already inactive stays inactive. No data is deleted.

A user who loses all active companies is signed out on the next request and sees "Akun perusahaan Anda sedang ditangguhkan. Hubungi dukungan." (Your company account is suspended. Contact support.) The app tokens of a user who no longer has an active company are revoked. A user with a membership in another active company moves to that company.

Inbils records the reason in the platform audit and in the support audit of each affected company.


## 6.2 Reactivating


1. Open a tenant with the status **Ditangguhkan** (Suspended) or **Pengajuan hapus** (Deletion request).
2. Click **Aktifkan kembali** (Reactivate).
3. Fill in **Alasan**, then click **Aktifkan kembali**.

Reactivation does not ask for the operator password or the company code. Inbils activates the parent and the subsidiaries that have a suspension time. A subsidiary that was already inactive before the suspension stays inactive. A deletion request that still exists is cancelled.

The toast reads "Perusahaan diaktifkan kembali." (The company was reactivated.)


## 6.3 Requesting deletion


The **Ajukan hapus** (Request deletion) button appears on an inactive tenant. The button stays inactive until all conditions are met:

1. the tenant has been suspended for 30 days;
2. there is an export with the status **Siap diunduh** (Ready to download) or **Kedaluwarsa** (Expired) that finished after the latest suspension;
3. there is no deletion request yet.

The list **Syarat pengajuan hapus** (Deletion request conditions) shows all conditions not yet met, with the UTC time when the 30-day period ends.

Once the conditions are met:

1. Click **Ajukan hapus**.
2. Type the company code with the same upper and lower case.
3. Fill in **Kata sandi operator** if the dialog asks for it.
4. Click **Ajukan hapus**.

The panel only records the request. The toast reads "Pengajuan hapus dicatat. Tidak ada data yang dihapus." (Deletion request recorded. No data was deleted.) The status changes to **Pengajuan hapus**. Reactivate the tenant to cancel the request.


## 6.4 Permanent deletion from the console


Roles that can use it: the server team with terminal access.

The web panel has no permanent delete button. Run:

```bash
php artisan inbils:platform:purge-company {kode}
```

The command refuses if:

- the code is not the exact parent code;
- the tenant or one subsidiary is still active;
- the suspension is not yet 30 days old;
- no deletion request has been made;
- there is no export finished after the suspension;
- a home user of the tenant is still a member of a company outside the tenant;
- the terminal is not interactive.

The command shows the company id, the number of users, the number of media files, and the number of rows per table. Read that plan, then type the company code again. There is no option to skip the question.

The database is deleted in a single transaction. A database failure cancels all changes. After the commit, the command deletes the media folder and the export archives. If a file cannot be deleted, the terminal lists the `disk:path` that must be cleaned by hand.

The tenant's platform audit stays stored. The company link is detached, then the tenant code and name are copied into the audit properties. The tenant's support audit is deleted together with the tenant data. There is no undo. Recovery is only from backup.

See [`docs/operations/tenant-purge.md`](https://github.com/madmouse17/isp_inbils/blob/main/docs/operations/tenant-purge.md) before running the command in production.

### Common errors

- "Kode perusahaan yang diketik tidak sesuai." (The company code you typed does not match.): match the upper and lower case with the code on the profile.
- "Perusahaan ini sudah ditangguhkan." (This company is already suspended.) or "Perusahaan ini sudah aktif." (This company is already active.): the status changed after the page was opened. Reload.
- "Perusahaan belum ditangguhkan." (The company is not suspended yet.): suspend the tenant before waiting for the deletion period.
- "Pengajuan hapus baru boleh setelah 30 hari ditangguhkan" (A deletion request is allowed only after 30 days of suspension): wait for the UTC date written in the conditions.
- "Belum ada ekspor data yang selesai setelah penangguhan." (No data export has finished since the suspension.): request a new export after the suspension time.
- "Pengajuan hapus sudah dibuat" (A deletion request has already been made): reactivate if the request must be cancelled.
