---
title: "10. Platform audit"
description: "Learn how to filter and read the platform audit, open activity details, find which actions are recorded, and see what tenants can view."
---

## 10.1 Filtering and reading the audit


Roles that can use it: all platform operators.

Click **Audit platform** (Platform audit). The page lists operator activity across all tenants and, if you choose it, the copies that tenants see as support access.

![Platform audit page with filters and the list of operator activity](~/assets/guide/web/platform-audit.webp)

Filters:

- **Cari** (Search): a word from the activity sentence as shown in the table (for example "ditangguhkan"), the activity code, the operator's name or email, or the company name or code, at most 100 characters;
- **Perusahaan** (Company): one tenant, including its subsidiaries;
- **Operator**: one platform admin;
- **Kegiatan** (Activity): one activity from all that are recorded. The options use the same sentences as the table, with the activity code below them;
- **Sumber** (Source): **Platform** (the default), **Akses dukungan** (Support access), or **Semua sumber** (All sources);
- **Rentang tanggal** (Date range): start and end dates in UTC.

**Platform** is the operator's own log, one row per action. **Akses dukungan** is the copy that the tenant sees. One action that is also reported to the tenant, for example a suspension, is recorded as one **Platform** row and one **Akses dukungan** copy for each affected company, all with the same group code. **Semua sumber** shows both, but hides the copies that repeat a **Platform** row, so one action appears once.

The table contains:

| Column | Meaning |
| --- | --- |
| **Waktu** (Time) | The time in the browser's time zone. |
| **Kegiatan** | The activity sentence, for example "Perusahaan ditangguhkan" (Company suspended), and the activity code below it. |
| **Sumber** | **Platform** or **Akses dukungan**. |
| **Pelaku** (Actor) | The operator or user name, or **Sistem** (System). |
| **Perusahaan** | The tenant name and code. Click the name if the tenant still exists. |
| **Subjek** (Subject) | The model type and public id when available. |
| **Rincian** (Details) | The **Lihat** (View) button. |

The filter range is counted by UTC day. The times in the table follow the browser clock. The page shows 10 rows per page by default.

A filter that cannot be used does not reject the page. The page still opens with the other valid filters, and a message appears under the faulty field, for example "Tanggal akhir tidak boleh sebelum tanggal mulai." (The end date must not be before the start date.) or "Sumber tidak dikenal. Pilih Platform, Akses dukungan, atau Semua sumber." (Unknown source. Choose Platform, Support access or All sources.) An error in the page number or the number of rows appears as a yellow alert above the table, for example "Pilih 10, 25, atau 50 baris per halaman." (Choose 10, 25 or 50 rows per page.) A page number beyond the last page shows the last page, not an empty table.


## 10.2 Reading activity details


Click **Lihat** in the **Rincian** column.

![Platform audit details dialog with actor, company, activity code, group and properties](~/assets/guide/web/platform-audit-detail.webp)

The dialog contains:

- Time;
- Source;
- Actor;
- Company;
- Subject;
- Activity code;
- Activity group;
- Recorded properties.

The **activity group** is a UUID that links the rows that belong to one action: a **Platform** row with its **Akses dukungan** copy, or all rows of one support session. **Subjek** shows the record type and its name or code if there is one, for example `PlatformAdmin` with the operator's name. Without a name or code, the dialog shows the type and the id. The dialog title uses the activity sentence. Scalar properties are shown as they are, booleans as Ya/Tidak (Yes/No), and arrays as compact JSON. Internal integer id properties are hidden from the display. Masked personal values still show `[disembunyikan]` (hidden).

After a permanent purge, the platform audit remains. The company column shows the name and code stored in the properties, but it is no longer a link.


## 10.3 Recorded activities


Main labels:

| Group | Example labels |
| --- | --- |
| Operator account | **Operator dibuat** (Operator created), **Operator masuk** (Operator signed in), **Operator keluar** (Operator signed out), **Sesi operator berakhir** (Operator session ended), **Operator gagal masuk** (Operator failed to sign in), **Masuk operator diblokir** (Operator sign-in blocked) |
| Operator 2FA | **Pendaftaran 2FA dimulai** (2FA enrolment started), **2FA diaktifkan** (2FA activated), **Kode 2FA benar** (2FA code correct), **Kode 2FA salah** (2FA code wrong), **Kode pemulihan dipakai** (Recovery code used), **Kode pemulihan dibuat ulang** (Recovery codes regenerated) |
| Roles | **Peran dibuat** (Role created), **Peran diubah** (Role changed), **Peran dihapus** (Role deleted) (company role repair), **Templat peran dibuat** (Role template created), **Templat peran diubah** (Role template changed), **Templat peran dihapus** (Role template deleted) |
| Tenant | **Perusahaan dibuat** (Company created), **Anak perusahaan dibuat** (Subsidiary created), **Anak perusahaan {nama} diminta** (Subsidiary {name} requested) (`tenant.subsidiary_requested`), **Permintaan anak perusahaan {nama} dibuat** (Subsidiary {name} request created) or **ditolak** (rejected) (`tenant.subsidiary_request_closed`, with the rejection reason), **Perusahaan ditangguhkan** (Company suspended), **Perusahaan diaktifkan kembali** (Company reactivated), **Permintaan hapus data dicatat** (Data deletion request recorded) |
| Sample data | **Data contoh terisi** (Sample data filled), **Data contoh gagal diisi** (Sample data failed to fill) |
| Export | **Ekspor data diminta** (Data export requested), **Ekspor data selesai** (Data export completed), **Ekspor data gagal** (Data export failed), **Ekspor data kedaluwarsa** (Data export expired), **Ekspor data diunduh** (Data export downloaded) |
| Purge | **Penghapusan data dimulai** (Data deletion started), **Penghapusan data gagal** (Data deletion failed), **Penghapusan data selesai** (Data deletion completed) |
| User support | **2FA pengguna diatur ulang** (User 2FA reset), **Undangan dikirim ulang** (Invitation resent), **Kunci masuk dibuka** (Sign-in lock released), **Undangan gagal terkirim** (Invitation failed to send) |
| Support access | **Akses dukungan dimulai** (Support access started), **Mode akses dukungan diubah** (Support access mode changed), **Data diubah saat akses dukungan** (Data changed during support access), **Akses dukungan berakhir** (Support access ended) |

The IP and user agent columns are kept for server investigation and do not appear as columns on this page. Operator sign-in and sign-out rows record the IP in **Properti tercatat** (Recorded properties). Passwords, tokens, QR secrets, recovery codes, request bodies and stack traces do not enter the audit properties.


## 10.4 What the company can see


Internal audit rows with the **Platform** source do not appear in the tenant's Log Audit (Audit log). Actions that must be transparent to the company are written again with the **Akses dukungan** source, for example:

- suspension and reactivation;
- deletion requests;
- export requests, completion and downloads;
- lock release, 2FA reset and invitation resend;
- the whole lifecycle of a support access session.

The tenant sees the actor as **Tim dukungan Inbils** (Inbils support team), without the operator's email or internal id. The `platform`, `support` and `security` logs are kept for 730 days. The scheduler runs `inbils:activity-log:prune` every day.

Subsidiary requests from a tenant and their closure are recorded only with the **Platform** source. The tenant sees its request while it is still open on the **Perusahaan** (Company) page, and receives an email if the operator rejects it.

### Common errors

- The search finds no rows: search with a word from the activity sentence (for example "ditangguhkan") or with the activity code, for example `tenant.export_requested`. Also check **Sumber**. The default source is **Platform**, so **Akses dukungan** rows appear only when you choose **Akses dukungan** or **Semua sumber**.
- A deleted company still appears without a link: this is intended audit behaviour.
- The selected dates seem shifted: the filter uses UTC days, while the table uses the browser clock.
- The tenant audit does not show normal operator sign-ins: only the **Akses dukungan** source is visible to the tenant.
- A red message under one filter: that field is not used, and the page shows the results of the other filters. Correct the field.
- A yellow alert above the table about the page number or the number of rows: the page number starts at 1, and the number of rows is 10, 25 or 50.
