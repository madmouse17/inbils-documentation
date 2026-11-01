---
title: "8.4 Vehicles (Kendaraan)"
description: "Add, edit, deactivate and export the vehicles technicians use: licence plate, type, make, model, purchase date and active status."
---

Vehicles records the technicians' operational vehicles: licence plate, type, make, model, purchase date and active status. Open this menu when the company adds, replaces or retires a vehicle. Who uses a vehicle is recorded in the employee profile ([section 8.3](/docs/guides/web/administration/employees/)), not on this screen.

Roles that can use it: admin. Permissions: `vehicle.view` opens the menu and the list, `vehicle.manage` allows adding, editing and deleting, `vehicle.export` shows the **Ekspor** (Export) button. In the default roles only the admin holds the vehicle permissions. The **Buat Kendaraan** (Create vehicle) button and the **Aksi** (Actions) column (**Ubah** (Edit) and **Hapus** (Delete)) appear only for holders of `vehicle.manage`; the server also refuses actions from users without that permission.

## Opening and reading the list

1. In the sidebar, open the **Administrasi** (Administration) group, then click **Kendaraan** (Vehicles).
2. Read the list. The **Cari** (Search) box (hint text "Nomor polisi, jenis, merek, atau model" (Licence plate, type, make or model)) searches those four columns. The **Status** filter has **Semua status** (All statuses), **Aktif** (Active), **Nonaktif** (Inactive), **Dihapus** (Deleted), and **Semua, termasuk dihapus** (All, including deleted). The columns are **Nomor polisi** (Licence plate), **Jenis** (Type), **Merek** (Make), **Model**, **Status** and **Aksi**. **Nomor polisi**, **Jenis**, **Merek** and **Model** can be sorted. The initial order shows the newest vehicle at the top. An empty cell contains `-`, and the **Status** badge shows **Aktif**, **Nonaktif** or **Dihapus**. The list uses pages: see the text "Menampilkan" (Showing) with the row range and the total, the "Baris per halaman" (Rows per page) choice and the previous and next page buttons below the table ([section 1.5](/docs/guides/web/introduction/know-the-screen/)). If there is no vehicle yet, the screen writes "Belum ada kendaraan" (No vehicles yet).

   ![Vehicles list, still empty in the demo company, with the Search box and the Create vehicle button](~/assets/guide/web/vehicles.webp)

## Adding a vehicle

1. Click **Buat Kendaraan**.
2. Fill in the form in the **Buat Kendaraan** dialog:
   - **Nomor polisi**: required, 20 characters at most. The number must not equal that of another vehicle in the same company, including a vehicle that has been deleted.
   - **Jenis**: optional. Pick **Motor** (Motorbike), **Mobil** (Car) or **Pikap** (Pickup) from the list, or leave "Pilih jenis" (Pick a type) if the type does not need to be recorded. An older vehicle whose type was saved with other text still shows that text in the choice list under **Ubah**, so saving again does not delete it.
   - **Merek**: optional, 100 characters at most.
   - **Model**: optional, 100 characters at most.
   - **Tanggal pembelian** (Purchase date): optional. Type a date in the company's date format, or click the field to open the calendar ("Pilih tanggal" (Pick a date)) and pick a day, or click **Hari ini** (Today). The button "Hapus tanggal" (Clear date) empties the field.
   - **Aktif**: switch, on by default. Only active vehicles appear in the **Kendaraan** choices on the employee profile.
   - **Catatan** (Notes): optional, free text.
3. Click **Buat** (Create). The toast "Kendaraan dibuat." (Vehicle created.) appears.

## Editing a vehicle

1. Click **Ubah** on the vehicle row. The **Ubah Kendaraan** (Edit vehicle) dialog opens with all the saved data, including **Tanggal pembelian** and **Catatan**.
2. Change the fields you need. Emptying **Tanggal pembelian** deletes the saved date.
3. Click **Simpan** (Save). The toast "Kendaraan diperbarui." (Vehicle updated.) appears.

## Deactivating, deleting permanently and restoring a vehicle

1. Click **Aksi lainnya** (More actions) on the vehicle row. It holds **Nonaktifkan** (Deactivate) (or **Aktifkan** (Activate)) and **Hapus permanen** (Delete permanently). The **Nonaktifkan** dialog writes how many employees use that vehicle, for example "dipakai 1 karyawan" (used by 1 employee). The toast "Kendaraan dinonaktifkan." (Vehicle deactivated.) appears. An inactive vehicle does not appear in the **Kendaraan** choices on the employee form, and employees who already use it stay recorded.
2. **Hapus permanen** exists only if no employee uses that vehicle. The dialog "Hapus permanen &lt;nomor polisi&gt;?" (Delete &lt;licence plate&gt; permanently?) writes "Kendaraan "&lt;nomor polisi&gt;" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan." (The vehicle "&lt;licence plate&gt;" has never been used by other data. Permanent deletion cannot be undone.) The toast "Kendaraan dihapus permanen." (Vehicle permanently deleted.) appears.
3. The **Status** filter has **Aktif**, **Nonaktif**, **Dihapus**, and **Semua, termasuk dihapus**. Deleted rows have **Pulihkan** (Restore).

A vehicle that an employee still uses cannot be deleted permanently: the dialog writes "Kendaraan masih dipakai 1 karyawan. Nonaktifkan saja." (The vehicle is still used by 1 employee. Deactivate it instead.)

## Exporting the list

1. Fill in the **Cari** box if you need only some of the vehicles.
2. Click **Ekspor**, then choose **Ekspor CSV** (Export CSV) or **Ekspor PDF** (Export PDF).

The file is named `vehicles-export-<tanggal>-<jam>.csv` or `.pdf` and contains the columns Nomor polisi, Jenis, Merek, Model and Status. The **Ekspor** button appears only for holders of `vehicle.export`.

## Common errors

- The message "nomor polisi sudah digunakan." (the licence plate is already used.) below **Nomor polisi**: that number is already used by another vehicle, including an inactive or deleted (**Dihapus**) vehicle. The number stays reserved, so for a vehicle that is no longer used pick **Nonaktifkan**, not delete, or **Pulihkan** the old vehicle from the **Status** filter **Dihapus**.
- Saving fails with the toast "Data gagal disimpan. Periksa input." (Data could not be saved. Check the input.): read the red message below the field. **Nomor polisi** writes "nomor polisi wajib diisi." (the licence plate is required.) if empty, and **Merek** and **Model** reject text over their length limit.
- The **Buat Kendaraan**, **Ubah** or **Hapus** button does not appear, or the server refuses it: your role does not yet hold `vehicle.manage`. Ask the company admin to add it to a role in the Roles (Peran) menu ([section 8.6](/docs/guides/web/administration/roles/)), or to give you a role that holds it ([section 8.7](/docs/guides/web/administration/permissions/)).
