---
title: "12. Operator workflows"
description: "Step-by-step operator routines: onboard a new company, help a user who cannot sign in, close a tenant, and answer a subsidiary request."
---

## 12.1 From a new company to the first admin signing in


1. The operator opens **Perusahaan baru** (New company) and chooses **Katalog awal** (Starter catalogue) or **Kosong** (Empty) ([section 4.1](/docs/guides/platform/create-a-company/) to 4.2).
2. The operator fills in the first admin, then clicks **Buat perusahaan** (Create company).
3. Inbils creates the company, copies the role templates, and creates the admin account, numbering, basic settings and catalogue.
4. The platform mailer sends the invitation. If **Isi data contoh** (Fill sample data) is ticked, the `platform` worker fills in the demo data.
5. The operator opens the tenant page and watches **Masuk terakhir** (Last sign-in), **Audit terbaru** (Latest audit) and **Job gagal** (Failed jobs).
6. The admin opens the **Atur kata sandi** (Set password) button from the email within 60 minutes.
7. If the link expires or the email fails, the operator uses **Kirim ulang undangan** (Resend invitation).
8. After the admin signs in successfully, the **Masuk terakhir** column shows the time.
9. The admin fills in the profile, integrations, users and operational data through the company web app.


## 12.2 A user cannot sign in


1. The operator searches for the tenant in the Dashboard and opens the **Pengguna** (Users) section.
2. Check **Status**, the **Terkunci** (Locked) badge, **2FA** and **Masuk terakhir**.
3. If the account is locked because of wrong attempts, use **Buka kunci masuk** (Release sign-in lock).
4. If the user lost the authenticator and the recovery codes, use **Atur ulang 2FA** (Reset 2FA).
5. If the admin has never signed in and the invitation is no longer active, use **Kirim ulang undangan**.
6. If the problem can only be reproduced on the user's screen, start **Akses dukungan** (Support access) with a clear reason.
7. Check the problem in read mode. Turn on **Mode ubah** (Edit mode) only if a change is needed and approved.
8. Click **Keluar** (Sign out) as soon as the check is finished.
9. Read **Audit platform** (Platform audit) and ask the company to check its **Log Audit** (Audit log) if you need proof of the action.


## 12.3 Closing the service of one tenant


1. Make sure the tenant owner understands the impact of suspension and deletion.
2. The operator clicks **Tangguhkan** (Suspend), and fills in the reason, the code and the password.
3. The operator requests a new export after the suspension time.
4. The server team makes sure the platform worker completes the export. Hand the archive to the entitled party before the 24-hour download period ends.
5. Wait until 30 days have passed since the last suspension.
6. The operator clicks **Ajukan hapus** (Request deletion) after the requirements list is empty.
7. The server team checks for memberships of tenant users in companies outside the tenant and revokes them with `inbils:company:revoke-membership` ([section 11.1](/docs/guides/platform/console-tasks-and-queues/)); deletion is refused while such memberships exist.
8. The server team takes a backup and checks its date.
9. The server team runs `inbils:platform:purge-company {kode}`, reads the plan, then retypes the code.
10. If files remain, delete the `disk:path` shown by the terminal.
11. Check **Audit platform**. Old rows must still show the tenant name and code without a link.


## 12.4 Answering a subsidiary request


1. The operator receives the email **Permintaan anak perusahaan dari {nama perusahaan}** (Subsidiary request from {company name}), or sees the **Permintaan anak perusahaan** (Subsidiary requests) card on the **Dasbor** (Dashboard).
2. Read the requested name, the proposed code, the notes and the requester.
3. If the request is reasonable, click **Buat anak perusahaan** (Create subsidiary). Check **Nama** (Name) and **Kode** (Code) (the code must be unique), choose **Akses admin** (Admin access), then click **Buat anak perusahaan**. The request is closed. Tell the company admin, because Inbils does not email the requester when the subsidiary is created.
4. If the request cannot be met, click **Tolak** (Reject), write a clear reason, then click **Tolak permintaan** (Reject request). Inbils emails that reason to the requester.
5. If the tenant is suspended, reactivate it first to create a subsidiary. Rejecting is still possible.
6. Read **Audit platform** if you need proof: **Anak perusahaan diminta** (Subsidiary requested), **Anak perusahaan dibuat** (Subsidiary created), and **Permintaan anak perusahaan {nama} dibuat** (Subsidiary {name} request created) or **ditolak** (rejected).
