---
title: "7.12 Audit log (Log Audit)"
description: "Trace company activity by time, module, actor, subject and changed data, find who did an action, and export the log to CSV or PDF."
---

Log audit (Audit log) traces company activity by time, module, actor, subject and change data. Each row is written as one Indonesian sentence, for example "Pembayaran dicatat" (Payment recorded) or "Tiket dibuka kembali oleh staf" (Ticket reopened by staff). Open this report when you need to know who performed an action or which value changed.

Roles that can use it: admin. Permissions: `report.audit.view`. The **Ekspor log** (Export log) button requires `report.export` in addition to the audit permission.

## Filtering and reading the log

1. Open **Laporan** (Reports), then click the link **Log Audit**. The page title is **Log audit**.

   ![Audit log page with the Log filters card and the company activity table](~/assets/guide/web/reports-audit-log.webp)

2. Fill in the filters you need:
   - **Pencarian teks** (Text search) searches the **Deskripsi** (Description) sentence (in Indonesian words, for example `ditugaskan`, `dibuka kembali` or `Pembayaran dicatat`), the stored module name (for example `customer`), the stored action code, and the actor's name or email. What is searched is the base sentence of each activity type: the extra remark at the end of a sentence, such as a role name or supplier name, is not searched. This field does not search the module label shown in the badge and does not search the **Subjek** (Subject) column.
   - **Modul** (Module) selects one module from the list, for example Pelanggan (Customers), Tagihan (Invoices), Inventaris (Inventory), SPK, Tiket (Tickets), Pengguna (Users) or Autentikasi (Authentication). Click the box, type to filter, then select. An empty field shows **Semua modul** (All modules).
   - **Pengguna** (User) selects the actor. Type at least 2 letters of the name or email ("Cari nama atau email..." (Search name or email...)), wait for the list, then select. The list contains only members of the active company: users of that company and users of other companies who have been given access to the active company. Inactive accounts are included in the list. Click **Hapus pilihan: Pengguna** (Clear selection: User) to empty it.
   - **Periode** (Period) limits the event time by calendar day. Type a range, or open the calendar and use the quick choices, as in [section 7.9](/docs/guides/web/finance-and-reports/technician-performance/). Audit log always has a period: if the start date is empty, the page uses 7 days up to the end date (or up to today in the company time zone if the end date is also empty) and fills that start date into the field. The period is at most 92 days. Under the field is written "Paling lama 92 hari. Tanpa tanggal mulai, 7 hari terakhir." (At most 92 days. Without a start date, the last 7 days.)
3. Click **Terapkan filter** (Apply filters). Click **Reset filter** (Reset filters) to remove all filters and return to the latest-time order. The filter card also writes "Menampilkan n dari m log" (Showing n of m logs).
4. Click **Muat ulang** (Reload) at the top right to fetch the latest data without changing the filters.
5. Read the table:
   - **Waktu** (Time) shows the date and time of the event in the company format and time zone. There is no second clock: all dates and times on this page, in the details dialog and in the export use the company time zone.
   - **Modul** shows the module as a badge, for example Pelanggan or Tagihan. A log without a module shows as **Umum** (General).
   - **Deskripsi** writes the activity as one sentence, for example "Permintaan barang disetujui dan stok dicadangkan" (Item request approved and stock reserved), "Pembayaran online lunas" (Online payment paid), or "Teknisi check-in di lokasi SPK" (Technician checked in at the work order location). Some sentences carry a short remark, for example "Stok diterima dari {pemasok}" (Stock received from {supplier}) or "Peran Admin ditambahkan ke pengguna" (Role Admin added to user). A module and action pair that has no sentence yet shows as `modul: aksi` with underscores read as spaces.
   - **Pelaku** (Actor) contains the name and email, the text "Pengguna #" (User #) followed by the ID, or **Sistem** (System). Actions of the Inbils support team use the name **Tim dukungan Inbils** (Inbils support team) (see below).
   - **Subjek** names the data affected with the name or code people use, for example `REQ-2026-00001` or a customer name, not the data type and ID. A row that has no subject writes **-**. For stock rows, the subject is the item name.
   - **Detail** (Details) opens the log details dialog. A small dot on the button means that log has property changes.
6. Sort by **Waktu** or **Modul**. **Deskripsi**, **Pelaku** and **Subjek** cannot be sorted. The **Aksi** (Action) column is no longer in the table: the stored action code shows only in the CSV.
7. Under the table, set **Baris per halaman** (Rows per page) to 10, 15, 25, 50 or 100. The default value on this page is 25. Move between pages with **Sebelumnya** (Previous) and **Berikutnya** (Next).

On screens narrower than 768 pixels, the table becomes cards. The button **Lihat detail properti** (View property details) replaces the **Detail** column.

## Security rows, exports and personal data

Besides data changes, the Audit log contains your company's security trail in the module **Keamanan** (Security). The **Deskripsi** column writes the following sentences:

- "Masuk ke akun" (Signed in to account) and "Keluar dari akun" (Signed out of account): sign-in and sign-out through the web. Sign-in through the app is recorded as "Token aplikasi seluler dibuat" (Mobile app token created).
- "Percobaan masuk gagal" (Failed sign-in attempt): wrong password. Only one row per account and IP address within 15 minutes. The property `failures` counts the attempts, so one guessing attack does not fill the log. The password and email typed are not stored. The email is stored only as a hash (`email_hash`) that cannot be read back. An attempt with an unregistered email has no company, so it does not show on this page.
- "Masuk dikunci sementara karena terlalu banyak percobaan" (Sign-in temporarily locked because of too many attempts): Inbils refuses because of too many attempts. One row per route and IP address within 15 minutes.
- "Tautan atur ulang kata sandi diminta" (Password reset link requested) (only for existing accounts), "Kata sandi diatur ulang" (Password reset), and "Kata sandi diubah" (Password changed) (by any means). The rows do not contain the password.
- "Kode 2FA benar" (2FA code correct) for a correct authenticator code, and "Kode pemulihan 2FA dipakai" (2FA recovery code used) for a recovery code.
- "Peran {nama} ditambahkan ke pengguna" (Role {name} added to user) and "Peran {nama} dicabut dari pengguna" (Role {name} revoked from user). The property `roles` names the role.

Actions of the Inbils support team on your company show in the module **Akses dukungan** (Support access), with **Deskripsi** as one sentence, for example "Tim dukungan Inbils mengatur ulang 2FA Budi Santoso" (Inbils support team reset the 2FA of Budi Santoso), "Tim dukungan Inbils membuka kunci masuk Budi Santoso" (Inbils support team unlocked sign-in for Budi Santoso), "Tim dukungan Inbils masuk sebagai Budi Santoso" (Inbils support team signed in as Budi Santoso), or "Tim dukungan Inbils menangguhkan perusahaan ini" (Inbils support team suspended this company). The same sentence is used in the **Pencarian teks** box and in the export file: search "kunci masuk" or the name of the user handled to find the row. Support actions that have no sentence yet show as "Akses dukungan oleh tim Inbils" (Support access by the Inbils team).

Every CSV or PDF export is recorded in the module **Ekspor** (Export) as "Data diekspor ke CSV" (Data exported to CSV) or "Data diekspor ke PDF" (Data exported to PDF), with the report, filters, row count and a truncation flag. The row is written after the file has been delivered, so an interrupted download is not recorded.

Personal data values are not stored in the log. Changes to a customer (email, phone, tax ID (NPWP), contact, notes), customer contacts and addresses, employee profiles (phone, notes), and company payment accounts write **[disembunyikan]** (hidden) as the old and new value. Only which column changed is visible. Rows written before this update still keep their original values until they are deleted automatically.

Technician positions are also hidden. The rows "Teknisi check-in di lokasi tiket" (Technician checked in at the ticket location), "Teknisi check-in di lokasi SPK" and "Teknisi berangkat ke lokasi SPK" (Technician left for the work order location) store where the technician is. In the **Detail** dialog and in the export, the coordinates (`lat` and `lng`) are written **[disembunyikan]**. The distance to the customer location (`distance_m`), whether it is too far (`far`), and the reason (`far_reason`) stay visible. The real position stays stored in the database.

Inbils also stores the request ID, IP address and (for security rows) the browser type in the database for tracing by the server administrators. This page does not show them and the log export does not contain them.

Rows are deleted automatically every day: after 365 days, and after 730 days for the module **Keamanan**.

## Reading change details

1. Click **Detail** on a log row. A dialog titled **Detail log aktivitas #&lt;ID&gt;** (Activity log details #&lt;ID&gt;) opens.
2. Read the **Ringkasan** (Summary): event Waktu (company time zone), Modul, Pelaku, Subjek and Deskripsi.
3. Read the section **Properti dan perubahan nilai** (Properties and value changes):
   - A model change shows as a table with the columns **Kolom** (Column), **Nilai lama** (Old value) and **Nilai baru** (New value).
   - Click **Lihat JSON lengkap** (View full JSON) to see all the properties of the model change.
   - Activities with another structure show JSON directly.
   - If there are no properties, the screen writes "Tidak ada perubahan properti yang dicatat untuk aktivitas ini." (No property changes were recorded for this activity.)
   - An account without `report.audit.view` sees the warning **Akses properti dibatasi** (Property access restricted) instead of the properties.
4. Click **Salin JSON** (Copy JSON) to copy the property data. The button changes to **Tersalin** (Copied) after success. This button exists only if the log has properties.
5. Click **Tutup** (Close) to close the dialog.

## Exporting the log

1. Apply the filters and order you need, then click **Terapkan filter**.
2. Click **Ekspor log**.
3. Select **Ekspor CSV** (Export CSV) or **Ekspor PDF** (Export PDF).

Both files contain Waktu, Modul, Deskripsi, Pelaku and Subjek, with **Modul** written as a label (for example Tagihan, Permintaan barang (Item requests)) and **Deskripsi** as the same sentence as on screen. The CSV contains more columns: ID, Waktu, Modul, Aksi, Deskripsi, Pelaku, ID pelaku (Actor ID), Subjek, Jenis subjek (Subject type), ID subjek (Subject ID) and Properti (JSON) (Properties (JSON)). The columns Aksi, ID and Properti exist only in the CSV. The PDF deliberately omits ID, codes and Properti: the people who read it do not need them, and the PDF header writes the period and filters (Pengguna, Modul, Pencarian) in words. The time in both files uses the company time zone.

The export uses the same period as the page, at most 92 days. The CSV contains up to 5,000 rows. The PDF contains at most 300 rows, because the limit is 1,500 cells divided by five columns, and under its title is written "PDF dibatasi 300 baris. Untuk data lengkap, unduh CSV atau persempit periode." (PDF limited to 300 rows. For the full data, download the CSV or narrow the period.) If more rows match, download the CSV or narrow the period.

## Common errors

- The audit log shows only rows of the active company. Old rows without `company_id` are not shown.
- The **Pengguna** list contains only members of the active company, that is, users of that company and users of other companies who have been given access to the active company. Users without access to the active company cannot be selected. An address with the `user_id` of such a user, or one that does not exist, is rejected with the validation error "Pengguna tidak ditemukan." (User not found.) Audit log does not write that message near the field. Only the notice "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.) shows if the server returns you to the screen.
- **Pencarian teks** does not search the **Subjek** column. Use **Modul**, **Pengguna** or a word from **Deskripsi** to narrow the results.
- The filter fields do not take effect until **Terapkan filter** is clicked. **Ekspor log** uses the filters applied last.
- The time in **Waktu** uses the company time zone, not your browser clock, and is the same zone the date filter uses.
- The CSV contains Properti, while the PDF does not, and the PDF is limited to 300 rows. Open the **Detail** dialog or use the CSV when the old and new values are needed.
- When there are no results, the table writes **Tidak ada log aktivitas** (No activity logs) and the button **Reset filter**.
- The **Akses ditolak** (Access denied) page means the account does not hold `report.audit.view`. The built-in manager and staff roles do not have this permission.
- **Tanggal akhir tidak boleh sebelum tanggal mulai.** (The end date must not be before the start date.) appears under **Periode** when the range is reversed.
- **Periode log audit paling lama 92 hari. Persempit periode.** (The audit log period is at most 92 days. Narrow the period.) appears under **Periode** when the range is longer than 92 days. The table still shows the previous results, and **Ekspor log** uses the last valid period.
- The page opens the last 7 days without you selecting dates: that is the default. Change **Periode** to see older rows. Rows past the retention period (365 days, 730 days for **Keamanan**) have been deleted and cannot be searched.
