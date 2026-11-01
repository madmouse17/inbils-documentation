---
title: "1.5 Getting to know the screen"
description: "Learn the layout shared by almost every Inbils menu: sidebar, lists, filters, export, forms, messages, date fields and error pages."
---

Almost every menu uses the same layout. This section explains that layout once. Later chapters mention only what is specific to each menu.

## Sidebar and top bar

- The sidebar on the left holds the company logo, the company name, the **Ganti perusahaan** (Switch company) button if present ([section 1.6](/docs/guides/web/introduction/switch-company/)), **Dasbor** (Dashboard), and six menu groups: **Operasional** (Operations), **Pelanggan & Layanan** (Customers and Services), **Jaringan** (Network), **Inventaris** (Inventory), **Keuangan & Laporan** (Finance and Reports), **Administrasi** (Administration). If the company has not uploaded a logo, the logo box shows the Inbils mark (a blue circle). Click a group title to open or close it. The group that contains the active page opens by itself.
- Only the menus allowed for your role are shown. A group without menus is not shown.
- The small number next to **Pekerjaan Saya** (My Work), **Penugasan** (Dispatch) and **Persetujuan** (Approvals) shows the number of queued items waiting.
- On a narrow screen, the sidebar is hidden. Click the three-line button at the top left (**Menu navigasi** (Navigation menu)) to open it. The Esc key closes it.
- In the top bar, the page name is on the left. The bell on the right opens the **Notifikasi** (Notifications) page ([section 2.2](/docs/guides/web/dashboard/notifications/)). The red number on the bell is the unread count, written 99+ when it is more than 99.
- Click your name at the top right to open a menu with your name and email, followed by **Profil** (Profile), **Mode gelap** (Dark mode) (or **Mode terang** (Light mode)) and **Keluar** (Sign out). The theme choice is saved in the browser.
- When a new page opens, press Tab once: the **Langsung ke konten** (Skip to content) link appears at the top left. Press Enter to jump to the page content without passing through the whole menu.

## Lists and tables

- The page title and a one-sentence description are at the top left. The buttons at the top right are usually **Ekspor** (Export) and a data creation button whose name starts with **Buat** (Create), for example **Buat Pelanggan** (Create Customer).
- The **Cari** (Search) box searches the columns named in its hint text, for example "Nama, kode, atau telepon" (Name, code, or phone). Some pages give it another name, for example **Cari stok** (Search stock), **Cari permintaan** (Search requests) or **Pencarian** (Search) (Dispatch, Approvals and My Work). The list updates by itself shortly after you stop typing. In Dispatch and My Work, the **Cari** button applies it immediately.
- The select boxes next to the search filter the list, for example by status or type. Their first option clears the filter, for example "Semua status" (All statuses). Changing a filter always returns to the first page. The **Reset filter** (Reset filters) button (next to the filters, or in a table with no results) clears the search and all filters.
- Click a column title that has an arrow to sort. Click again to reverse the order.
- Below the table, Inbils writes the range of rows shown and the total (starting with "Menampilkan" (Showing)), the **Baris per halaman** (Rows per page) selector (10, 25 or 50), the **Sebelumnya** (Previous) and **Berikutnya** (Next) buttons, and the page number (for example Halaman 1 dari 3 (Page 1 of 3)). This part is not shown if the table is empty, or if all rows fit on one page and the page has no row count selector.
- The **Aksi** (Actions) column holds the row name as a link to the detail page, one main button (**Ubah** (Edit), or **Lihat** (View) if you cannot edit the row), and a three-dot menu **Aksi lainnya** (More actions) containing **Lihat detail** (View details) and **Hapus** (Delete). On master data, that menu contains **Nonaktifkan** (Deactivate), **Aktifkan** (Activate) or **Hapus permanen** (Delete permanently) instead of **Hapus** (see "Deactivate, Delete permanently, the Status filter and Restore" below). A button is shown only if you have its permission.
- **Hapus** (on data that is not master data) always opens a confirmation dialog. Its title names the data being deleted. If the page gives no name, the title is "Hapus data ini?" (Delete this data?). The buttons are **Batal** (Cancel) and **Hapus**, and both are inactive while the request runs. The dialog closes by itself if the deletion succeeds.
- Data that is still in use cannot be deleted. On many pages, the sentence under the dialog title states the rule, for example "Tiket hanya bisa dihapus saat berstatus ditutup." (A ticket can only be deleted when its status is closed.) If the server rejects it, the dialog stays open and the red toast "Data gagal disimpan. Periksa input." (The data could not be saved. Check the input.) appears. In Users and Organisation, the reason for the rejection also appears in a red box above the list.
- If a filter or search finds nothing, the table writes "Tidak ada &lt;item&gt; yang cocok" (No matching &lt;item&gt;) with a **Reset filter** button. If there is no data yet, the table writes "Belum ada &lt;item&gt; yang tercatat." (No &lt;item&gt; has been recorded yet.) or an explanation specific to that page, with a creation button if you may create it.
- The **Ekspor** button opens the **Ekspor CSV** (Export CSV) menu and, in lists that offer it, **Ekspor PDF** (Export PDF). The result follows the active filters. One export is limited to 5,000 rows. If it is truncated, the last CSV row contains "# Ekspor dipotong pada 5000 baris. Persempit filter untuk mengekspor sisa barisnya." (# Export truncated at 5000 rows. Narrow the filter to export the remaining rows.) A PDF holds at most 1,500 cells (rows times columns), so a PDF with many columns is truncated earlier than 5,000 rows. If a PDF is truncated, under its title it says "dibatasi sampai" (limited to) followed by the limit and "PDF dibatasi N baris. Untuk data lengkap, unduh CSV atau persempit periode." (The PDF is limited to N rows. For complete data, download the CSV or narrow the period.) Narrow the filter or download the CSV, then export again. Every export is recorded in the **Log Audit** (Audit log) ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)).

## Deactivate, Delete permanently, the Status filter and Restore

Master data (bandwidth profiles, speed profiles, SLA tiers, packages, items, item categories, units, locations, customers, document types, vehicles and organisation units) does not use the plain **Hapus**. Data that other data already uses must not disappear, because old invoices, work orders (SPK) and tickets still need it. The **Aksi lainnya** menu on a master row contains:

- **Nonaktifkan**, on an active row (edit permission). Inactive data does not appear in the choices of new forms, but everything that already uses it stays intact, and forms that already hold it still show it. The dialog writes "Nonaktifkan `<nama>`?" (Deactivate `<nama>`?) followed, if the data is already in use, by a sentence such as `Paket layanan "<nama>" dipakai 12 langganan, jadi tidak bisa dihapus permanen. Setelah dinonaktifkan, data ini tidak muncul di pilihan baru dan riwayatnya tetap utuh.` (Service package "<nama>" is used by 12 subscriptions, so it cannot be deleted permanently. Once deactivated, this data does not appear in new choices and its history stays intact.) The green toast writes "`<Jenis>` dinonaktifkan." (`<Type>` deactivated.) (for example "Profil bandwidth dinonaktifkan." (Bandwidth profile deactivated.)).
- **Aktifkan**, on an inactive row (edit permission). The data appears again in new choices. The toast says "`<Jenis>` diaktifkan." (`<Type>` activated.)
- **Hapus permanen**, only if no other data points to the row (delete permission). The dialog writes `<Jenis> "<nama>" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan.` (`<Type>` "<nama>" has never been used by other data. Permanent deletion cannot be undone.) The button is red. The toast says "`<Jenis>` dihapus permanen." (`<Type>` deleted permanently.) Permanently deleted data cannot be restored and does not appear again, not even under **Dihapus** (Deleted) or **Semua, termasuk dihapus** (All, including deleted).

The usage count ("dipakai 3 paket, 12 langganan" (used by 3 packages, 12 subscriptions)) counts every row of other data that points to this data, including history and rows that have been deleted. While any count is above zero, the menu does not offer **Hapus permanen**: the only choice is **Nonaktifkan**. If the data starts being used after you open the menu, the server rejects the deletion. The dialog stays open and writes the reason in red text, for example "Profil bandwidth masih dipakai 1 paket. Nonaktifkan saja." (The bandwidth profile is still used by 1 package. Just deactivate it.)

The **Status** filter in these lists has these options, in order:

1. **Semua status** (default). Shows data that is not deleted.
2. **Aktif** (Active) and **Nonaktif** (Inactive), only in master lists that can be deactivated.
3. The statuses of that page (for example **Terbuka** (Open), **Lunas** (Paid) or **Dikerjakan** (In progress)).
4. **Dihapus**. Only deleted data.
5. **Semua, termasuk dihapus**.

A deleted row is shown with the status **Dihapus**, its name as plain text (it cannot be opened), and no **Ubah** or **Lihat** button. The **Aksi lainnya** menu contains only **Pulihkan** (Restore) (the same permission as delete). The dialog writes "Pulihkan `<nama>`?" (Restore `<nama>`?) and the toast "`<Jenis>` dipulihkan." (`<Type>` restored.) The data returns to the list with its original status. Restore is rejected with red text in the dialog if:

- its parent is still deleted (locations, organisation units, item categories): "`<Jenis>` tidak bisa dipulihkan karena induknya, `<nama induk>`, masih dihapus. Pulihkan induknya dulu." (`<Type>` cannot be restored because its parent, `<parent name>`, is still deleted. Restore the parent first.) Restore the parent first;
- its code or name is already used by other data: "`<Jenis>` tidak bisa dipulihkan karena kode atau namanya sudah dipakai data lain. Ubah data itu dulu." (`<Type>` cannot be restored because its code or name is already used by other data. Change that data first.)

A restored location or organisation unit recalculates its path from its current parent, so its path name follows a parent that may have been renamed or moved while the data was deleted.

Codes and names stay reserved. Inactive or deleted data still holds its code and name, so creating new data with the same code or name is rejected with the field message "sudah digunakan" (already in use). Open the **Nonaktif** or **Dihapus** filter to find the holder, then **Aktifkan** or **Pulihkan** that data, or use another code.

Employees, evaluations, network assets, tickets, work orders and invoices do not have **Nonaktifkan**. Their delete rules do not change (for example a ticket can only be deleted when **Ditutup** (Closed) and an invoice only when **Draf** (Draft)), but their lists have a **Dihapus** filter and a **Pulihkan** action with the same rules.

Documents that have been issued do not change if the original name is changed: see the section "Frozen names on documents" below.

## Frozen names on documents

Renaming a customer, package, ticket category or technician does not rewrite documents that have been issued. Invoices, work orders and tickets keep the name at the deciding moment:

- **Tagihan** (Invoices) keep the customer name, address, tax number (NPWP) and package name at the moment they leave **Draf** (when sent, when created automatically, and when the draft is cancelled). The PDF, the invoice detail and the customer app use that name.
- **SPK** keep the technician name and location code when approved as **Selesai** (Completed).
- **Tiket** (Tickets) keep the category name and the staff name when **Ditutup**.

If the current name differs, the detail page writes the frozen name, followed by "(saat terbit)" (at issue), "(saat selesai)" (at completion) or "(saat ditutup)" (at closing) beside it. Drafts, unfinished work orders and unclosed tickets still follow the current name. Old data issued before this feature was filled in once with the name at that time.

## Forms and messages

- Required fields are marked with a red star after their name and must be filled in before saving. A red message under the field explains what is wrong. If the form uses browser validation, a small bubble in Indonesian appears at the problem field, for example "Wajib diisi." (Required.), "Format tidak sesuai." (Format does not match.), "Nilai paling kecil 1." (Minimum value is 1.), "Nilai paling besar 5." (Maximum value is 5.) or "Paling sedikit 5 karakter." (At least 5 characters.) At the top right of the screen, the red toast "Data gagal disimpan. Periksa input." marks that saving failed.
- A green toast marks a successful save. Its text is in Indonesian and comes from the server, for example "Pelanggan dihapus." (Customer deleted.) A toast disappears by itself after about 4 seconds. Click the x button on the toast to close it sooner. If the support access banner or the subsidiary ribbon ([section 1.6](/docs/guides/web/introduction/switch-company/)) is shown at the top of the page, the toast appears just below it, so it does not cover the buttons in that banner.
- A button that is processing shows a spinner and cannot be clicked twice.
- Rupiah are now calculated as whole rupiah with half-up rounding. Screens, apps and PDFs show the full value such as `Rp 147.702`. Old data that still has cents is shown without losing its value, for example `Rp 147.701,62`. Percentages and decimal numbers use a decimal comma, for example `63,6%` and `4,8`. The date format follows the company settings, and times use the 24-hour format.

## Conflict messages

These four messages mean the server rejected your save because the state of the data has changed, and nothing was saved. The message appears as a red toast at the top right.

- "Permintaan yang sama baru saja dikirim." (The same request was just sent.): you sent exactly the same input to the same page twice within 10 seconds, for example by a double click or two tabs. The first request stays in effect, so just check the result in the list. Input rejected because it was wrong is not counted, so after correcting it you can send again immediately. If you really need to send two identical inputs, wait 10 seconds between them.
- "Data diubah pengguna lain; muat ulang." (The data was changed by another user; reload.): someone else saved the same data since you opened the edit form. A banner titled with that message, the note "Muat ulang halaman untuk melihat data terbaru, lalu ulangi perubahan Anda." (Reload the page to see the latest data, then repeat your changes.) and a **Muat ulang** (Reload) button appears above the form. Click **Muat ulang** to reopen the page with the latest data, then repeat your changes. The fields you already typed are lost. This message applies to **Ubah Pelanggan** (Edit Customer), **Ubah Barang** (Edit Item), **Ubah Paket Layanan** (Edit Service Package), **Ubah SPK** (Edit Work Order), the **Ubah Karyawan** (Edit Employee) dialog, and **Pengaturan Perusahaan** (Company settings).
- "Perusahaan aktif berubah di tab lain." (The active company changed in another tab.): see [section 1.6](/docs/guides/web/introduction/switch-company/), **Common errors**.
- "Stok berubah sejak dihitung; hitung ulang." (Stock has changed since it was calculated; recalculate.): only when approving a stock adjustment, see [section 6.5](/docs/guides/web/inventory/stock/).

## Select fields, dates and times

- A field that selects other data (customer, location, item, user and so on) is a search box: click the field, type part of a name or code, then click the result, or press the arrow keys and Enter. No field asks you to type an ID. When the list opens, the option already chosen is highlighted and scrolled into view.
- In large tables (for example customers, subscriptions and items), the list is loaded from the server. As soon as you open a field that is still empty, the list shows at most the 10 latest items under the heading **Terakhir dipakai** (Recently used). After you type at least 2 letters, the search runs on the server and the list shows at most 20 results. With 1 letter the list writes "Ketik minimal 2 huruf untuk mencari." (Type at least 2 letters to search.), while searching it writes "Mencari..." (Searching...), and if nothing matches it writes "Tidak ada hasil." (No results.) or a sentence specific to that field. The search adds nothing to the page address, so copying the address or reloading the page does not bring back the word you searched for.
- The chosen option stays while you type. The choice changes only if you choose another result or click the x button (**Hapus pilihan** (Clear selection)).
- A date field accepts the company format and the numeric formats `20/10/2026`, `20-10-2026` or `2026-10-20`. Press Enter or move to another field to set it. You can also click the calendar icon (**Buka kalender** (Open calendar)), pick a day, or click **Hari ini** (Today). The x button (**Hapus tanggal** (Clear date)) empties the field. An empty field shows a hint such as "Pilih tanggal" (Choose a date). Text that is not a date is rejected with the message "Format tanggal tidak valid." (Invalid date format.) followed by an example, and the form cannot be sent until the date is corrected.
- Date and time fields ("Pilih tanggal dan jam" (Choose date and time)), month fields ("Pilih bulan" (Choose month)) and time fields ("Pilih jam" (Choose time)) work the same way: type, or open the picker. Times are chosen from a list in 30-minute steps or typed in 24-hour format. In date and time fields, a day chosen without a time starts at 00:00, and a time without a day uses today.

## Error pages

If you open a page that is not allowed or does not exist, or if a fault occurs, Inbils shows a page with a title, an explanation and the text "Kode galat" (Error code) followed by its number:

- **Akses ditolak** (Access denied) (403): your role has no permission for that page.
- **Halaman tidak ditemukan** (Page not found) (404): the address does not exist or has been moved.
- **Sesi berakhir** (Session expired) (419): the page was open too long and expired. Reload the page, then repeat your steps.
- **Terjadi kesalahan di server** (A server error occurred) (500): the request could not be processed. Try again shortly. If the problem continues, contact the administrator.
- **Layanan sedang tidak tersedia** (Service temporarily unavailable) (503): the application is under maintenance. Try again in a little while.

The **Ke dasbor** (To dashboard) button (if you are signed in) or **Masuk** (Sign in) takes you out of the error page. The 419, 500 and 503 pages also have a **Muat ulang halaman** (Reload page) button. If one page fails to display because of an error in the browser, Inbils shows **Halaman tidak dapat ditampilkan** (The page cannot be displayed) with a **Muat ulang halaman** button.

Error pages also write "ID permintaan:" (Request ID:) followed by a long code if the server provides one. Quote that code (double-click to select it, then copy) when you report to the administrator: the server maintainer uses the code to find all records of your request.

## Data links use random codes

The address of a single record (customer, work order, invoice and so on) now contains a random 26-character code, not a sequence number. Old addresses with a sequence number answer "tidak ditemukan" (not found), so old bookmarks must be reopened from the list and then saved again. The codes you read and search, such as `CUS-00001` or `INV-2026-00001`, do not change. A wrong address, another company's data, and data you may not see all give the same answer: "tidak ditemukan". Too many wrong addresses in a short time show "Terlalu banyak permintaan" (Too many requests); wait about 10 minutes and then open the record from the list.
