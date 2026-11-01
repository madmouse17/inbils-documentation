---
title: "3.5 Evaluations (Evaluasi)"
description: "Record a performance score for an employee on one ticket or work order, then edit it later. The averages feed the technician performance report."
---

An evaluation records the performance score of one employee for one ticket or one work order (SPK). The average score and the customer rating from evaluations are read by the Kinerja Teknisi (Technician performance) report ([section 7.9](/docs/guides/web/finance-and-reports/technician-performance/)). Create an evaluation after the ticket is resolved or the work order is approved, so the timing figures are filled in.

Roles that can use it: admin, manager, and staff in the built-in roles. Permissions: `evaluation.view` sees all evaluations of the company, `evaluation.create` creates, `evaluation.update` edits. The technician role holds `evaluation.view.own` and sees only evaluations about themselves, but technicians work in the app. The menu appears for holders of `evaluation.view` or `evaluation.view.own`. The permissions `evaluation.delete` and `evaluation.export` exist, but the **Evaluasi** (Evaluations) screen has no **Hapus** (Delete) or **Ekspor** (Export) button.

## Opening and reading the list

1. In the sidebar, open the **Operasional** (Operations) group, then click **Evaluasi**.

   ![The Evaluations page with the Create evaluation button, the Search box, the Employee and Reference type filters, and an empty table](~/assets/guide/web/evaluations.webp)

2. The **Buat evaluasi** (Create evaluation) button at the top right appears for holders of `evaluation.create`.
3. Fill in the filters. The list adjusts by itself a moment after you type or choose, without a filter button:
   - The **Cari** (Search) field searches employee names (the field reads "Nama karyawan" (Employee name)).
   - The **Karyawan** (Employee) field chooses one employee: type the name or email (at least 2 letters), then choose. The list holds active members of the company who hold the permission **Dapat dinilai di Evaluasi** (Can be evaluated in Evaluations) (`evaluation.evaluable`), 20 results at most. Users without `evaluation.view` get only themselves in this list. Click **Hapus pilihan** (Clear selection) to remove this filter.
   - The **Jenis referensi** (Reference type) list holds **Semua jenis** (All types), **SPK**, and **Tiket** (Tickets). The **Status** filter holds **Semua status** (All statuses), **Dihapus** (Deleted), and **Semua, termasuk dihapus** (All, including deleted).
4. Read the table. Columns: **Karyawan**, **Referensi** (Reference), **Nilai** (Score), **Penilaian pelanggan** (Customer rating), **Penilai** (Evaluator), **Tanggal** (Date), and **Aksi** (Actions). The **Referensi** column holds the type badge (**SPK** or **Tiket**) and the code of the ticket or work order. When that ticket or work order no longer exists, the column writes `#` and its internal id number. The **Tanggal** column holds the date and time in the company date format. The columns **Referensi**, **Nilai**, and **Tanggal** can be sorted. Every row has only a **Lihat** (View) button, except a deleted evaluation: its row has no button and the **Aksi lainnya** (More actions) menu holds **Pulihkan** (Restore) (permission `evaluation.delete`, toast "Evaluasi dipulihkan." (Evaluation restored.)).
5. The list holds 10 evaluations per page, newest on top. When there is more than one page, below the table appear "Menampilkan" (Showing) with the row range and the total count, the **Sebelumnya** (Previous) and **Berikutnya** (Next) buttons, and "Halaman" (Page) with the page number and the page count.

An empty list reads **Belum ada evaluasi** (No evaluations yet) with a **Buat evaluasi** button. When the filters find nothing, the list reads **Tidak ada evaluasi yang cocok** (No matching evaluations) with a **Reset filter** (Reset filters) button.

## Creating an evaluation

1. Click **Buat evaluasi**. The **Buat Evaluasi** page opens.

   ![The Create Evaluation form with the Data evaluasi card: the Employee, Reference type, Ticket, Score (1.0 to 5.0), Customer rating (optional), and Comment fields](~/assets/guide/web/evaluations-create.webp)

2. Fill in the **Data evaluasi** (Evaluation data) card. When you come from the **Evaluasi teknisi** (Technician evaluation) button on a **Ditutup** (Closed) ticket, **Karyawan**, **Jenis referensi** (**Tiket**), and **Tiket** are already filled in, and **Penilaian pelanggan** is also filled in when the customer has rated that ticket in the app. Only **Nilai** is left for you to choose:
   - **Karyawan**: required. Type the employee name or email (at least 2 letters), then choose. The list holds active members of the current company who are active and hold the permission **Dapat dinilai di Evaluasi** (`evaluation.evaluable`), 20 results at most. When nothing matches, the list writes "Tidak ada karyawan yang cocok." (No matching employee.)
   - **Jenis referensi**: required. Choose **Tiket** (the initial value) or **SPK**. Changing the type empties the reference choice.
   - **Tiket** or **SPK** (the field name follows the reference type): required. Type the code or title (at least 2 letters), then choose. The ticket field holds tickets with the status **Diselesaikan** (Resolved) or **Ditutup** that already have a handler. The SPK field holds work orders with the status **Selesai** (Completed) that already have a technician. Both are limited to the current company, 20 results at most. There is no typed ID field any more.
   - **Nilai (1,0 sampai 5,0)** (Score (1.0 to 5.0)): required. A number from 1.0 to 5.0 in steps of 0.1. This field is always empty when the form opens, because the score is your own judgement. Saving with an empty score shows "Pilih nilai 1 sampai 5." (Choose a score from 1 to 5.).
   - **Penilaian pelanggan (opsional)** (Customer rating (optional)): optional. A number from 1.0 to 5.0 in steps of 0.1. From the **Evaluasi teknisi** button on a ticket that the customer has rated in the app, this field already holds that rating and you may change it. Otherwise, fill it in when you record a rating from the customer.
   - **Komentar** (Comment): optional, 1000 characters at most.
3. Click **Simpan** (Save). The list opens and the toast "Evaluasi berhasil dibuat." (Evaluation created successfully.) appears. Click **Batal** (Cancel) or **Kembali** (Back) to return without saving.

Inbils fills in **Penilai** (your account) and the evaluation time by itself. Inbils also copies the timings from the ticket or work order when you save, and does not update them again:

- For a ticket, **Respons pertama** (First response) is the minutes from ticket creation until the handler started the ticket, and **Penyelesaian** (Resolution) is the minutes from ticket creation until it was resolved. Both are empty when the event has not happened.
- For a work order, **Penyelesaian** is the minutes from the work order starting until it was approved. **Respons pertama** is not filled in.

## Viewing and editing an evaluation

1. In the list, click **Lihat**. The details page is titled "Evaluasi" followed by the employee name, with the type, reference code, and date below it. The page holds the **Hasil penilaian** (Evaluation result) card (**Karyawan**, **Penilai**, **Nilai**, **Penilaian pelanggan**, **Respons pertama**, **Penyelesaian**, and **Komentar**) and the **Referensi** card (**Jenis** (Type), **Kode** (Code), **Judul** (Title), and **Tanggal evaluasi** (Evaluation date)). Times appear in minutes, for example "90 menit" (90 minutes). An empty value appears as a hyphen (-).
2. Click **Ubah** (Edit) to edit. The **Ubah Evaluasi** (Edit Evaluation) page shows the employee name and offers only **Nilai (1,0 sampai 5,0)**, **Penilaian pelanggan (opsional)**, and **Komentar**, with the same rules as when creating. The employee and the reference cannot be changed.
3. Click **Simpan**. The list opens and the toast "Evaluasi berhasil diubah." (Evaluation changed successfully.) appears. Click **Batal** or **Kembali** to return to the details page.

The **Ubah** button appears for everyone who can open the details page. The **Ubah Evaluasi** page opens for holders of `evaluation.update` or the evaluator of that evaluation, but saving changes needs `evaluation.update`. Without that permission, the server refuses with the **Akses ditolak** (Access denied) page.

## Common errors

- The message "referensi yang dipilih tidak valid untuk perusahaan ini." (the chosen reference is not valid for this company.) below the ticket or SPK field: that ticket or work order belongs to another company. Make sure your active company is correct ([section 1.6](/docs/guides/web/introduction/switch-company/)), then choose again from the list.
- The message "karyawan yang dipilih tidak valid." (the chosen employee is not valid.) below **Karyawan**: that employee is not an active member of the current company. Switch to the right company or choose another employee. The message "karyawan yang dipilih harus berupa pengguna aktif dengan hak akses yang sesuai." (the chosen employee must be an active user with suitable permissions.) means that employee does not hold the permission **Dapat dinilai di Evaluasi**.
- "karyawan wajib diisi." (the employee is required.), "referensi wajib diisi." (the reference is required.), or "nilai wajib diisi." (the score is required.): choose the employee and the reference, then fill in the score.
- The message "nilai harus bernilai antara 1.0 dan 5.0." (the score must be between 1.0 and 5.0.) (for **Penilaian pelanggan**: "penilaian pelanggan harus bernilai antara 1.0 dan 5.0." (the customer rating must be between 1.0 and 5.0.)): enter a number from 1.0 to 5.0.
- The message "komentar tidak boleh lebih dari 1000 karakter." (the comment must not exceed 1000 characters.): shorten the comment.
- A second evaluation by the same evaluator for the same ticket or work order is refused by the database, because one evaluator may have only one evaluation per reference. The screen does not catch this refusal as a field message, so the **Terjadi kesalahan di server** (A server error occurred) page appears. Correct the existing evaluation through **Ubah**.
- **Respons pertama** or **Penyelesaian** is empty: the ticket was not yet started or resolved, or the work order was not yet approved, when the evaluation was created. **Ubah** does not fill them in again, so create the evaluation after the work is done.
- An old evaluation is not visible on the first page: the list holds 10 rows per page. Use **Sebelumnya** and **Berikutnya**, or narrow it with **Cari**, **Karyawan**, and **Jenis referensi**.
- In **Ubah Evaluasi**, a **Nilai** or **Penilaian pelanggan** outside 1 to 5 is first refused by the Indonesian-language browser bubble, for example "Nilai paling kecil 1." (The smallest value is 1.) or "Nilai paling besar 5." (The largest value is 5.) **Buat Evaluasi** checks by itself and writes a red message below the field.
