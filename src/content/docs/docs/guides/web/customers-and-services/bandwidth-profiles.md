---
title: "4.3 Bandwidth profiles (Profil Bandwidth)"
description: "Create and edit the capacity templates chosen in a package: download and upload speed, type (shared or dedicated) and contention ratio."
---

Profil Bandwidth (Bandwidth profiles) are capacity templates chosen in a package: download and upload speed, type (shared or dedicated) and contention ratio. Open this menu before you create a new package that needs a different capacity.

Roles that can use it: the same as [section 4.2](/docs/guides/web/customers-and-services/service-packages/). Permissions: `service.view` or `service.manage` opens the menu, and `service.create`, `service.update`, `service.delete` and `service.export` cover their own actions.

## Opening and reading the list

1. In the sidebar, open the group **Pelanggan & Layanan** (Customers & Services), then click **Profil Bandwidth**.
2. Read the list. The columns are **Nama** (Name), **Unduh (Mbps)** (Download (Mbps)), **Unggah (Mbps)** (Upload (Mbps)), **Dibuat** (Created), **Status** and **Aksi** (Actions). The **Cari** (Search) box (field "Nama atau tipe" (Name or type)) searches the name and the type. For the type, type `shared` or `dedicated` (the original words in the database, not **Berbagi** (Shared) or **Dedikasi** (Dedicated)). There is no details page: the profile name and the **Ubah** (Edit) button both open the edit form, and the **Aksi lainnya** (More actions) menu holds **Nonaktifkan** (Deactivate) or **Aktifkan** (Activate), and **Hapus permanen** (Delete permanently) when the profile has never been used. The type and the ratio are visible only in the edit form. The **Ekspor** (Export) button (holders of `service.export`) produces CSV or PDF (PDF title **Profil Bandwidth**) with the columns Nama, Unduh (Mbps), Unggah (Mbps), Tipe (**Berbagi** or **Dedikasi**), Rasio berbagi and Status (**Aktif** (Active) or **Nonaktif** (Inactive)).

   ![Bandwidth profile list with the columns Nama, Unduh (Mbps), Unggah (Mbps), Dibuat and Aksi](~/assets/guide/web/bandwidth-profiles.webp)

## Creating a profile

1. Click **Buat Profil Bandwidth** (Create Bandwidth Profile). A page with the card **Data profil** (Profile data) opens.
2. Fill in the form:
   - **Nama**: required, up to 255 characters, unique per company. Example: `Home 50Mbps`.
   - **Tipe** (Type): choose **Berbagi** (default) or **Dedikasi**.
   - **Unduh (Mbps)**: required, a whole number of at least 1.
   - **Unggah (Mbps)**: required, a whole number of at least 1.
   - **Rasio kontensi** (Contention ratio): a whole number of at least 1, default `1`. Required when **Tipe** is **Berbagi**. If you choose **Dedikasi**, this field is locked with the remark `Tidak dipakai untuk profil dedikasi.` (Not used for dedicated profiles.)
   - **Aktif**: a switch, on by default.
3. Click **Simpan** (Save). The toast `Profil bandwidth dibuat.` (Bandwidth profile created.) appears.

A bandwidth profile can also be created from the package form with the **+ Baru** (+ New) button ([section 4.2](/docs/guides/web/customers-and-services/service-packages/)). That dialog writes **Tipe** as **Shared** or **Dedicated**, and **Rasio kontensi** has a default of `4`.

To edit, click **Ubah**, change the fields, then click **Simpan** (toast `Profil bandwidth diperbarui.` (Bandwidth profile updated.)). **Warning:** the profile is changed in place, so a change to the Mbps values applies to all packages, package versions and subscriptions that use that profile. To change the capacity only for new sales, create a new profile and choose it in the package (new version). To stop using a profile, open **Aksi lainnya** and click **Nonaktifkan**: the dialog says how many packages use it (for example "dipakai 1 paket" (used by 1 package)), and the toast `Profil bandwidth dinonaktifkan.` (Bandwidth profile deactivated.) appears. **Aktifkan** uses it again. **Hapus permanen** exists only when the profile has never been used by any package or package version (toast `Profil bandwidth dihapus permanen.` (Bandwidth profile permanently deleted.)). The **Status** filter has **Aktif**, **Nonaktif**, **Dihapus** (Deleted) and **Semua, termasuk dihapus** (All, including deleted). **Pulihkan** (Restore) is in the menu of a deleted row ([section 1.5](/docs/guides/web/introduction/know-the-screen/)).

## Common errors

- The profile does not appear in the package form: the **Aktif** switch is off. Turn it on in **Ubah**.
- Saving is rejected with the message `nama sudah digunakan.` (the name is already used.): **Nama** is already used by another profile in this company.
- Saving is rejected with the message `rasio kontensi wajib diisi.` (the contention ratio is required.): a profile of type **Berbagi** needs a ratio. Enter a number of at least 1.
- The profile row menu does not offer **Hapus permanen**: the profile is still used by a package or package version (the numbers show in the **Nonaktifkan** dialog). Choose **Nonaktifkan**. An inactive profile does not appear in the package form, but packages that already use it keep using it.
