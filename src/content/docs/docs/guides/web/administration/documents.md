---
title: "8.8 Documents (Dokumen)"
description: "Manage customer document types such as ID card or contract: name, code, scope, required flag and validity period."
---

This menu is called **Jenis Dokumen** (Document types) in the sidebar. It manages customer document types, that is file categories with a name, code, the object they cover, a required flag and a validity period, for example ID card (KTP) or contract. Open this menu when you add or change a document type. This page manages only the types: customer files are uploaded in the **Dokumen** (Documents) tab on the customer detail page ([section 4.1](/docs/guides/web/customers-and-services/customers/); a summary is in "Berkas dokumen pelanggan" (Customer document files) below). Ticket attachments and work order (SPK) evidence are managed on the ticket page ([section 3.4](/docs/guides/web/operations/tickets/)) and the work order page ([section 3.3](/docs/guides/web/operations/work-orders/)).

Roles that can use it: admin. Permissions: `system.setting` opens the menu and allows all actions (view, add, edit, delete), `system.document.export` shows the **Ekspor** (Export) button. In the default roles only the admin holds both. The permission `system.setting` also opens the Numbering menu ([section 7.13](/docs/guides/web/finance-and-reports/numbering/)).

## Opening and reading the list

1. In the sidebar, open the **Administrasi** (Administration) group, then click **Jenis Dokumen**. The screen title reads **Jenis Dokumen** with the subtitle "Jenis dokumen pelanggan beserta status wajib dan masa berlakunya. Berkasnya diunggah di tab Dokumen pada halaman pelanggan." (Customer document types with their required status and validity period. The files are uploaded in the Documents tab on the customer page.)
2. Read the list. How search, sorting, row buttons and the delete dialog work is explained in [section 1.5](/docs/guides/web/introduction/know-the-screen/).

   - The **Cari** (Search) box (hint "Nama, kode, atau berlaku untuk" (Name, code or applies to)) searches the name, code and **Berlaku untuk** (Applies to).
   - Columns: **Nama** (Name), **Kode** (Code), **Berlaku untuk**, **Wajib** (Required), **Masa berlaku** (Validity period), **Status** and **Aksi** (Actions). **Nama**, **Kode** and **Berlaku untuk** can be sorted.
   - **Wajib** holds "Ya" (Yes) or "Tidak" (No). **Masa berlaku** holds a number of days followed by the word "hari" (days) (for example "30 hari"), or the sign "-". An empty **Berlaku untuk** appears as "-". **Status** holds the badge **Aktif** (Active) or **Nonaktif** (Inactive).
   - The list shows 10 rows per page. The "Baris per halaman" (Rows per page) picker offers 10, 25 and 50, and the **Sebelumnya** (Previous) and **Berikutnya** (Next) buttons with the note "Halaman n dari m" (Page n of m) are below the table.
   - The **Buat Jenis Dokumen** (Create document type) button, **Ubah** (Edit) and the **Aksi lainnya** (More actions) menu (**Nonaktifkan** (Deactivate) or **Aktifkan** (Activate), and **Hapus permanen** (Delete permanently) if the type has not been used) appear for everyone who can open this page. The **Status** filter has **Aktif**, **Nonaktif**, **Dihapus** (Deleted), and **Semua, termasuk dihapus** (All, including deleted).
   - If there are no rows, the screen shows "Belum ada jenis dokumen" (No document types yet) with the **Buat Jenis Dokumen** button, or "Tidak ada jenis dokumen yang cocok" (No matching document types) with the **Reset filter** (Reset filters) button when a search is active.

   ![Document types list, still empty in the demo company, with the message No document types yet, the Export button and the Create document type button](~/assets/guide/web/documents.webp)

## Adding a document type

1. Click **Buat Jenis Dokumen**.
2. Fill in the form in the **Buat Jenis Dokumen** dialog:
   - **Nama**: required, 255 characters at most.
   - **Kode**: required, 50 characters at most (hint "Unik di perusahaan ini dan tidak bisa diubah nanti." (Unique in this company and cannot be changed later.)). The code must not equal the code of another type in the same company, including a deleted type. If it does, the message "kode sudah digunakan." (the code is already used.) appears below the field. The code cannot be changed after saving.
   - **Berlaku untuk**: optional, free text of 100 characters at most. Hint "Mis. pelanggan" (E.g. customer). The system does not check its content, but the **Dokumen** tab on the customer page offers only active types whose **Berlaku untuk** is empty, `Customer` or `Pelanggan`. A type with any other value does not appear in that choice.
   - **Masa berlaku (hari)** (Validity period (days)): optional, a whole number of 1 or more. Empty means this type has no validity period. A customer file uploaded with this type is valid until the upload date plus that number of days.
   - **Wajib**: switch, off by default. This switch is only a marker shown in the **Wajib** column and in the export. No other screen uses it to refuse or remind anything.
   - **Aktif**: switch, on by default. The value is saved: turn it off if the new type is not in use yet.
3. Click **Buat** (Create). The toast "Jenis dokumen dibuat." (Document type created.) appears. **Batal** (Cancel) closes the dialog without saving.

## Editing a document type

1. Click **Ubah** on the document type row. The **Ubah Jenis Dokumen** (Edit document type) dialog opens with the data of that type.
2. Change **Nama**, **Berlaku untuk**, **Masa berlaku (hari)**, **Wajib** or **Aktif**. The **Kode** field appears grey and read-only, with the note "Kode tidak bisa diubah setelah jenis dokumen dibuat." (The code cannot be changed after the document type is created.)
3. Click **Simpan** (Save). The toast "Jenis dokumen diperbarui." (Document type updated.) appears.

## Deactivating, deleting permanently and restoring a document type

1. Click the **Aksi lainnya** menu on the document type row. It holds **Nonaktifkan** (or **Aktifkan**) and **Hapus permanen**. The **Nonaktifkan** dialog writes how many documents use that type, for example "dipakai 3 dokumen" (used by 3 documents). The toast "Jenis dokumen dinonaktifkan." (Document type deactivated.) appears.
2. **Hapus permanen** exists only if no document uses that type yet. The dialog "Hapus permanen" followed by the name writes "Jenis dokumen "&lt;nama&gt;" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan." (The document type "&lt;name&gt;" has never been used by other data. Permanent deletion cannot be undone.) The toast "Jenis dokumen dihapus permanen." (Document type permanently deleted.) appears.
3. The **Status** filter has **Semua status** (All statuses), **Aktif**, **Nonaktif**, **Dihapus**, and **Semua, termasuk dihapus**. Deleted rows have **Pulihkan** (Restore).

The code of an inactive or deleted (**Dihapus**) type still counts as used. For a type that is no longer used, pick **Nonaktifkan**.

## Customer document files

Customer files are uploaded, opened and deleted in the **Dokumen (n)** tab on the customer detail page, not in the **Jenis Dokumen** menu. How it relates to this menu:

- That tab shows the upload form only to holders of `customer.update`, not `system.setting`. The same permission is needed to delete a file. A file is linked only to a customer of the active company.
- The form asks for **Jenis dokumen** (Document type) (required, from the active types according to the **Berlaku untuk** rule above) and **Berkas** (File). The server accepts only PDF, JPG and PNG, 10240 KB (10 MB) at most.
- The validity date is calculated when the file is uploaded, from the type's **Masa berlaku (hari)** at that moment. The file list writes "Berlaku sampai {tanggal}" (Valid until {date}) or "Tanpa masa berlaku" (No validity period). The badge **Segera habis** (Expiring soon) appears 30 days before that date, and **Kedaluwarsa** (Expired) after it. Changing the type's validity period later does not move the date of files that already exist.
- Every day in the early morning Inbils places a reminder in the bell of holders of `customer.update`, once for each file that enters that 30-day window. The title is "Dokumen {jenis} {nama pelanggan} segera habis" (Document {type} {customer name} expires soon) with the body "Berlaku sampai {tanggal}." (Valid until {date}.), and tapping it opens that customer's page. Uploading and deleting files is recorded in the customer's Audit log (Log Audit).

## Exporting the list

1. Fill in the **Cari** box if you need only some of the types.
2. Click **Ekspor**, then choose **Ekspor CSV** (Export CSV) or **Ekspor PDF** (Export PDF).

The file `document-types-export-<tanggal>-<jam>.csv` (or `.pdf`, titled "Jenis dokumen") contains the columns Kode, Nama, Berlaku untuk, Wajib ("Ya" or "Tidak"), Masa berlaku (hari) and Status (**Aktif** or **Nonaktif**). Empty columns contain "-". The **Ekspor** button appears only for holders of `system.document.export`.

## Common errors

- The message "kode sudah digunakan." below **Kode**: this company already has a type with that code, including one that has been deleted. Use another code, or change the old type through **Ubah**.
- You change **Kode** in **Ubah Jenis Dokumen**: that field is read-only. For another code, create a new type.
- Saving fails with the toast "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.): read the red message below the field. Check **Masa berlaku (hari)** (a whole number of 1 or more) and the length of **Berlaku untuk** (100 characters at most).
- You look for a button to upload a file: this page does not have it. Open the **Dokumen** tab on the customer detail page ([section 4.1](/docs/guides/web/customers-and-services/customers/)). The type you look for does not appear there: check that the type is **Aktif** and its **Berlaku untuk** is empty, `Customer` or `Pelanggan`.
