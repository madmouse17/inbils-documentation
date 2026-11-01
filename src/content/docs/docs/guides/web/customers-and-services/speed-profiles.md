---
title: "4.4 Speed profiles (Profil Kecepatan)"
description: "Create and edit speed profiles with download and upload limits, optional burst rates and the RADIUS speed group name used by packages."
---

Profil Kecepatan (Speed profiles) are speed labels chosen in a package. They hold the download and upload limits, the burst speed (optional) and the name of the RADIUS speed group. Open this menu when you add a new speed label or change the speed limits of a package.

Roles that can use it: the same as [section 4.2](/docs/guides/web/customers-and-services/service-packages/). Permissions: `service.view` or `service.manage` opens the menu, and `service.create`, `service.update`, `service.delete` and `service.export` cover their own actions.

## Opening and reading the list

1. In the sidebar, open the group **Pelanggan & Layanan** (Customers & Services), then click **Profil Kecepatan**.
2. Read the list. The columns are **Nama** (Name), **Unduh maksimum (Mbps)** (Maximum download (Mbps)), **Unggah maksimum (Mbps)** (Maximum upload (Mbps)), **Dibuat** (Created), **Status** and **Aksi** (Actions). The **Cari** (Search) box (field "Nama atau profil RADIUS" (Name or RADIUS profile)) searches the profile name and the RADIUS profile name. The profile name and the **Ubah** (Edit) button open the edit form, and the **Aksi lainnya** (More actions) menu holds **Nonaktifkan** (Deactivate) or **Aktifkan** (Activate), and **Hapus permanen** (Delete permanently) when the profile has never been used, as with Profil Bandwidth. The **Ekspor** (Export) button (holders of `service.export`) produces CSV or PDF (PDF title **Profil Kecepatan**) with the columns Nama, Unduh maks (Mbps), Unggah maks (Mbps), Burst unduh (Mbps), Burst unggah (Mbps), Profil RADIUS and Status (**Aktif** (Active) or **Nonaktif** (Inactive)). An empty burst or RADIUS profile is filled with `-`.

   ![Speed profile list with the columns Nama, Unduh maksimum (Mbps), Unggah maksimum (Mbps), Dibuat and Aksi](~/assets/guide/web/speed-profiles.webp)

## Creating a profile

1. Click **Buat Profil Kecepatan** (Create Speed Profile). A page with the card **Data profil** (Profile data) opens.
2. Fill in the form:
   - **Isi dari profil bandwidth** (Fill from bandwidth profile): optional, a search box with the hint **Pilih untuk menyalin kecepatan** (Choose to copy the speed). The options are active bandwidth profiles, each with its speed as a remark (for example `50/20 Mbps`: download, then upload). Choosing one copies its numbers to **Unduh maksimum (Mbps)** and **Unggah maksimum (Mbps)**, which you can still change. This box is only a helper and is not saved.
   - **Nama**: required, up to 255 characters, unique per company. Example: `SP-Home-50`.
   - **Unduh maksimum (Mbps)**: required, a whole number of at least 1.
   - **Unggah maksimum (Mbps)**: required, a whole number of at least 1.
   - **Burst unduh (Mbps)** (Download burst (Mbps)): optional, a whole number of at least 1.
   - **Burst unggah (Mbps)** (Upload burst (Mbps)): optional, a whole number of at least 1.
   - **Nama profil RADIUS** (RADIUS profile name): optional, up to 255 characters. This is the name of the speed group in RADIUS. Fill it in if this package will be applied to customer network accounts.
   - **Aktif**: a switch, on by default.
3. Click **Simpan** (Save). The toast `Profil kecepatan dibuat.` (Speed profile created.) appears.

A speed profile can also be created from the package form with the **+ Baru** (+ New) button ([section 4.2](/docs/guides/web/customers-and-services/service-packages/)). That dialog asks only for **Nama**, **Unduh maksimum (Mbps)** and **Unggah maksimum (Mbps)**, with both numbers filled in from the bandwidth profile already chosen in the package form. Fill in the burst values and **Nama profil RADIUS** through **Ubah** on this page.

To edit, click **Ubah**, change the fields, then click **Simpan** (toast `Profil kecepatan diperbarui.` (Speed profile updated.)). **Warning:** the profile is changed in place. Changing **Unduh maksimum** or **Unggah maksimum** changes the rate of all subscriptions that use the profile through any package version, including old subscriptions (see "Hubungan dengan RADIUS", Relationship with RADIUS). To change the rate only for new sales, create a new speed profile and choose it in the package (new version). To stop using a profile, open **Aksi lainnya** and click **Nonaktifkan** (toast `Profil kecepatan dinonaktifkan.` (Speed profile deactivated.)). **Hapus permanen** exists only when the profile has never been used by any package or package version (toast `Profil kecepatan dihapus permanen.` (Speed profile permanently deleted.)). The **Status** filter has **Aktif**, **Nonaktif**, **Dihapus** (Deleted) and **Semua, termasuk dihapus** (All, including deleted). **Pulihkan** (Restore) is in the menu of a deleted row ([section 1.5](/docs/guides/web/introduction/know-the-screen/)).

## Relationship with RADIUS

When the RADIUS integration is active, Inbils writes one speed group per company and profile, named `<realm>/<Nama profil RADIUS>` (the realm is the lower-case company code). The speed limits are taken from **Unggah maksimum** and **Unduh maksimum** in the upload/download format. Burst values are not sent to RADIUS.

When you change **Nama profil RADIUS**, **Unduh maksimum** or **Unggah maksimum**, Inbils rewrites that group. New logins use the new speed straight away. Sessions that are online use the old speed until the customer reconnects or staff press **Sinkron ulang** (Sync again) on the **Akses jaringan** (Network access) page of the customer's subscription.

A package whose speed profile has no **Nama profil RADIUS** cannot be given a network account. Inbils rejects it with the message `Profil kecepatan paket ini belum punya nama profil RADIUS.` (This package's speed profile does not have a RADIUS profile name yet.)

## Common errors

- A customer's network account is rejected with the message above: fill in **Nama profil RADIUS** on the speed profile of that package.
- Saving is rejected with the message `nama sudah digunakan.` (the name is already used.): **Nama** is already used by another profile in this company.
- The profile row menu does not offer **Hapus permanen**: the profile is still used by a package or package version. Choose **Nonaktifkan**. An inactive profile does not appear in the package form, but packages that already use it keep using it.
