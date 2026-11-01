---
title: "4.6 Announcements and promos (Pengumuman & Promo)"
description: "Publish announcements about outages and maintenance, and promo banners with links, targeted to all customers or to chosen locations."
---

This menu manages two kinds of content for customers: **announcements** (information, outage, maintenance) and **promo banners** (an image with a link). Open this menu when there is an outage or a maintenance schedule to announce, or when the ISP has a promo for customers. The content can be aimed at all customers or narrowed by location and package category.

Roles that can use it: admin and manager in the built-in roles, not staff. Permission: `announcement.manage` (**Kelola pengumuman dan banner promo** (Manage announcements and promo banners)). Without this permission the **Pengumuman & Promo** (Announcements & Promos) menu does not show in the sidebar, and the address `/admin/announcements` is rejected with the **Akses ditolak** (Access denied) page. The menu is at the very bottom of the group **Pelanggan & Layanan** (Customers & Services), below **Kategori Tiket** (Ticket categories). All content applies to the company that is currently active ([section 1.6](/docs/guides/web/introduction/switch-company/)).

The customer app draws the announcement card above the service card (Outage and Maintenance) or below the In progress section (Info), and the banner carousel below it. The preview on this screen imitates that view.

## Opening and reading the list

1. In the sidebar, open the group **Pelanggan & Layanan**, then click **Pengumuman & Promo**.
2. Choose the tab **Pengumuman** (Announcements) or **Banner promo** (Promo banners). The number in brackets is the count of all its content in this company, whatever the status.
3. Read the list. The **Cari** (Search) box (field "Judul" (Title)) searches titles, and the **Status** filter holds **Semua status** (All statuses), **Draf** (Draft), **Terjadwal** (Scheduled), **Tayang** (Live), **Selesai** (Completed) and **Nonaktif** (Inactive). Switching tabs clears the search and the filter. The list shows 10 rows per page.
   - **Pengumuman** tab: the columns **Pengumuman** (the title and the first two lines of the content), **Jenis** (Type), **Status**, **Periode** (Period), **Sasaran** (Target) and **Aksi** (Actions).
   - **Banner promo** tab: the columns **Banner** (a small image, the title, and the link destination), **Status**, **Periode**, **Sasaran**, **Urutan** (Order), **Ketukan** (Taps) and **Aksi**. The list is sorted by **Urutan**, then newest first.
   - The **Aksi** column shows only for holders of `announcement.manage`.

   ![Pengumuman & Promo screen with the tabs Pengumuman and Banner promo, the Cari box, the Status filter and the Buat Pengumuman button](~/assets/guide/web/announcements.webp)

The status is calculated by the server from the publish time, the active switch and the display period:

| Status | Meaning | Shown to customers |
| --- | --- | --- |
| Draf | Saved, not yet published. | No |
| Terjadwal | Already published, but **Mulai tayang** (Start showing) has not yet arrived. | No, until the schedule arrives |
| Tayang | Already published and inside the period. | Yes |
| Selesai | Already published and **Selesai tayang** (Stop showing) has passed. It stays as history. | No |
| Nonaktif | Published, then deactivated. It stays as history. | No |

The **Sasaran** column shows **Semua pelanggan** (All customers), or **Pelanggan tertentu** (Specific customers) followed by the list of locations and categories ("Lokasi: A, B dan 2 lainnya" (Location: A, B and 2 others)). A specific target whose list has become empty shows "Sasaran kosong, tidak tampil ke siapa pun." (Empty target, shown to nobody.)

## Creating an announcement

1. In the **Pengumuman** tab, click **Buat Pengumuman** (Create Announcement). The **Buat Pengumuman** dialog opens with the form on the left and **Pratinjau di aplikasi pelanggan** (Preview in the customer app) on the right (below it on a narrow screen).
2. Fill in the form:
   - **Jenis**: **Informasi** (Information), **Gangguan** (Outage) or **Pemeliharaan** (Maintenance). The remark below the field explains the effect. **Gangguan** and **Pemeliharaan** are designed to show at the very top with a warning tone and to send a notification to the targeted customers. **Informasi** only shows.
   - **Judul**: required, up to 120 characters.
   - **Isi** (Content): required, up to 2000 characters. Plain text, new lines are shown.
   - **Sasaran**, **Mulai tayang** and **Selesai tayang**: see "Sasaran dan jadwal" (Targets and schedule) below.
3. Click **Simpan** (Save). The announcement is saved as **Draf** (toast "Pengumuman disimpan sebagai draf." (Announcement saved as a draft.)) and customers cannot see it yet. Check its preview, then publish it from the list (see "Menerbitkan, mengubah, dan menonaktifkan" (Publishing, editing and deactivating)). The remark below the dialog title states this choice: "Simpan sebagai draf, atau pakai Simpan & Terbitkan setelah dicek di pratinjau." (Save as a draft, or use Simpan & Terbitkan after checking in the preview.)
4. To save and publish in one step, click **Simpan & Terbitkan** (Save & Publish). This button exists on a new announcement and on a draft, not on an announcement that is already published. The screen first counts the recipients, then opens the dialog **Terbitkan untuk {n} pelanggan?** (Publish for {n} customers?) with the announcement title, the effect of publishing by **Jenis**, and the sentence "Setelah terbit, pengumuman tidak bisa dihapus, hanya dinonaktifkan." (Once published, the announcement cannot be deleted, only deactivated.) {n} is the number of targeted customers who have an active sign-in account, the same as the number of recipients of the **Gangguan** and **Pemeliharaan** notification. Click **Simpan & Terbitkan** in that dialog to continue, or **Kembali ke formulir** (Back to the form) to check again. The toast "Pengumuman disimpan dan diterbitkan." (Announcement saved and published.) appears.

   ![Terbitkan untuk n pelanggan? dialog above the Buat Pengumuman form, with the buttons Kembali ke formulir and Simpan & Terbitkan](~/assets/guide/web/announcements-publish-confirm.webp)

5. If publishing is rejected (for example **Selesai tayang** has already passed), the announcement is not saved either, so there is no duplicate draft. Correct the form, then submit again. If counting the recipients fails, the form says "Jumlah penerima gagal dihitung. Coba lagi." (The number of recipients could not be counted. Try again.) If a specific **Sasaran** has no location or category yet, the button submits the form straight away without counting, and the rejection message shows below **Sasaran**.

![Buat Pengumuman dialog with the fields Jenis, Judul, Isi, Sasaran, Mulai tayang and Selesai tayang on the left, and the phone preview on the right](~/assets/guide/web/announcements-create.webp)

## Creating a promo banner

1. In the **Banner promo** tab, click **Buat Banner Promo** (Create Promo Banner). The **Buat Banner Promo** dialog opens.
2. Fill in the form:
   - **Gambar** (Image): required for a new banner. Drag a file into the box or click to choose. Use JPG, PNG or WebP, at most 2 MB, with a width to height ratio of 2:1 (1200 x 600 pixels is recommended). The ratio may be off by at most 5%. The screen checks the size as soon as the file is chosen and rejects a mismatch, for example "Gambar ini 1000 x 600 piksel. Rasio harus 2:1 dengan selisih paling banyak 5%, misalnya 1200 x 600." (This image is 1000 x 600 pixels. The ratio must be 2:1 with a difference of at most 5%, for example 1200 x 600.) The server repeats the same check. On an existing banner, leave **Gambar** empty to keep the old image.
   - **Judul**: required, up to 80 characters. It shows as a caption below the image.
   - **Teks alternatif** (Alternative text): required, up to 200 characters. It is read aloud by screen readers. Describe what is in the image, for example "Diskon 20% pemasangan baru sampai 31 Oktober" (20% discount on new installation until 31 October).
   - **Saat banner diketuk** (When the banner is tapped): **Tanpa tautan** (No link), **Halaman di aplikasi** (Page in the app) or **Tautan web** (Web link). For **Halaman di aplikasi**, choose one of **Tagihan** (Invoices), **Langganan** (Subscriptions), **Buat tiket** (Create ticket) or **Kunjungan** (Visits). For **Tautan web**, fill in **Alamat tautan** (Link address) starting with `https://` (up to 500 characters). The web address opens in the phone's browser.
   - **Urutan**: a number from 0 to 65535, default 0. A banner with a small number shows first. The same number is sorted newest first.
   - **Sasaran**, **Mulai tayang** and **Selesai tayang**: see the next section.
3. Click **Simpan**. The banner is saved as **Draf** (toast "Banner promo disimpan sebagai draf." (Promo banner saved as a draft.)). While the image uploads, the bar **Mengunggah gambar** (Uploading image) shows progress. The banner image is private: only customers of the same company who match the target can load it through the app.

The customer app receives at most 5 live banners, sorted by **Urutan** then newest first. The carousel is designed to change slide every 5 seconds. The server does not reject a sixth banner: a banner outside the top 5 simply does not show, and the banner dialog writes the warning "Dengan urutan ini banner tidak masuk 5 banner pertama, jadi belum tampil di aplikasi." (With this order the banner is not in the first 5 banners, so it does not show in the app yet.) Deactivate an old banner or give a smaller **Urutan** if you want the new banner to show.

## Targets and schedule

**Sasaran** decides which customers receive the content:

- **Semua pelanggan**: all customers of the active company.
- **Pelanggan tertentu**: the choices **Lokasi** (Locations) and **Kategori paket** (Package category) appear. Type a location name in **Lokasi** then choose it to add it. A chosen location also includes all locations below it, so choosing an area covers all POPs inside it. Choose categories in **Kategori paket**, for example **Rumahan** (Residential) or **Bisnis** (Business) ([section 4.2](/docs/guides/web/customers-and-services/service-packages/)). The cross button next to each choice removes it. A specific target must have at least one location or one category. Otherwise the server rejects it with "Pilih minimal satu lokasi atau kategori paket." (Choose at least one location or package category.)

A customer matches when one of their subscriptions has the status **Aktif** (Active) or **Ditangguhkan** (Suspended) and meets all the lists that are filled in. Within one list, one matching choice is enough. Example: **Lokasi** holds two areas and **Kategori paket** holds **Bisnis**, so the match is a customer with a Bisnis package subscription served by a POP in one of those areas. If a target location or category is later deleted from the data until its list is empty, that item does not become visible to everyone. It matches nobody.

**Mulai tayang** is required and **Selesai tayang** may be empty. Both are chosen with a date and time picker, in the company's time zone. **Mulai tayang** defaults to the moment the dialog is opened. A start time in the future gives the item the status **Terjadwal** after publishing. An empty **Selesai tayang** means it shows until deactivated ("Kosongkan agar tayang sampai dinonaktifkan." (Leave empty to show until deactivated.)). If filled in, it must be after **Mulai tayang**.

## Phone preview

The panel **Pratinjau di aplikasi pelanggan** is a phone frame that follows the form fields as you type, without saving anything. The panel has its own **Terang** (Light) and **Gelap** (Dark) switch that at first follows the web page theme.

- Announcement: one card with an icon, title, content and period. **Gangguan** and **Pemeliharaan** use a warning tone, **Informasi** uses an info tone.
- Banner: a 2:1 image carousel with a caption, page dots, and previous or next buttons. The banner you are creating shows among the banners that are already live, in the order the app uses.

The preview uses the colours and layout designed for the app, not a screenshot of the installed app.

## Publishing, editing and deactivating

The **Aksi** column holds buttons according to the row status:

| Status | Buttons |
| --- | --- |
| Draf | **Ubah** (Edit), **Terbitkan** (Publish), **Hapus** (Delete) |
| Terjadwal, Tayang | **Ubah**, **Nonaktifkan** (Deactivate) |
| Selesai, Nonaktif | **Ubah** |

1. **Terbitkan**: for an announcement, the dialog **Terbitkan untuk {n} pelanggan?** holds the announcement title, the effect of publishing by **Jenis**, and the sentence "Setelah terbit, pengumuman tidak bisa dihapus, hanya dinonaktifkan." {n} is the number of targeted customers who have an active sign-in account, that is, the same recipients as the **Gangguan** and **Pemeliharaan** notification (section "Notifikasi Gangguan dan Pemeliharaan" (Outage and Maintenance notifications)). This number is calculated for the draft on the page that is currently open. For a banner, the dialog is titled **Terbitkan banner {judul}?** (Publish banner {title}?) and explains the effect. Click **Terbitkan**. The toast "Pengumuman diterbitkan." (Announcement published.) or "Banner promo diterbitkan." (Promo banner published.) appears. Once published, an item cannot be deleted, only deactivated. A banner without an image cannot be published ("Gambar banner wajib tersedia." (The banner image is required.)). An announcement whose **Selesai tayang** has passed is also rejected ("Periode pengumuman sudah berakhir." (The announcement period has ended.)). Change the date first.
2. **Ubah**: the dialog **Ubah Pengumuman** (Edit Announcement) or **Ubah Banner Promo** (Edit Promo Banner). The remark below the dialog title states the effect of saving by status. A draft is saved as a draft, or published at the same time through **Simpan & Terbitkan** (announcements only). An item that is already published, whether **Terjadwal** or **Tayang**, takes effect as soon as it is saved. A **Selesai** item shows again if **Selesai tayang** is changed to a future time. A **Nonaktif** item can be saved, but does not show again.
3. **Nonaktifkan**: the dialog **Nonaktifkan pengumuman {judul}?** (Deactivate announcement {title}?) says "Tidak tampil lagi di aplikasi pelanggan. Riwayatnya tetap tersimpan, tetapi pengumuman ini tidak bisa diaktifkan lagi. Buat pengumuman baru bila perlu." (No longer shown in the customer app. Its history stays saved, but this announcement cannot be activated again. Create a new announcement if needed.) Click **Nonaktifkan** to continue. There is no button to reactivate, so create a new item if needed.
4. **Hapus** (drafts only): the dialog **Hapus draf pengumuman {judul}?** (Delete announcement draft {title}?) says "Draf dihapus permanen." (The draft is deleted permanently.) Click **Hapus draf** (Delete draft). An item that has ever been published cannot be deleted, so that the history and notification links stay valid. The server rejects it with "Pengumuman terbit hanya dapat dinonaktifkan." (A published announcement can only be deactivated.) or "Banner terbit hanya dapat dinonaktifkan." (A published banner can only be deactivated.)

Creating, editing, publishing, deactivating and deleting are recorded in the Log audit (Audit log, [section 7.12](/docs/guides/web/finance-and-reports/audit-log/)) with the module `announcement`, holding only the item number. Banner images that finished showing more than 180 days ago are deleted automatically every day. The banner row and its tap count stay.

## Outage and Maintenance notifications

Announcements of the types **Gangguan** and **Pemeliharaan** send one notification to the app of each targeted customer who has an active sign-in account. The notification shows in the app bell with the title "Pengumuman baru" (New announcement) and the announcement title as its content.

- If you publish after **Mulai tayang** has arrived, the notification is sent at that moment.
- If **Mulai tayang** is still ahead (status **Terjadwal**), the notification is sent when the schedule arrives. The scheduler checks every minute, so the notification can be about one minute late.
- Each customer receives one notification per announcement. Editing the announcement afterwards does not send a notification again.
- **Informasi** and promo banners never send a notification. There is no WhatsApp for announcements.
- Sending uses the queue. The queue and the scheduler must run on the server. Contact the server administrator if the notification does not appear.

## Banner tap count

The **Ketukan** column in the **Banner promo** tab counts how many times customers tapped the banner. One customer is counted once per banner per day, however many times they tap. The app does not record how many times a banner was seen, so this number is not the number of impressions.

## Common errors

- The message "Pilih minimal satu lokasi atau kategori paket." below **Sasaran**: you chose **Pelanggan tertentu** without adding a location or category. Add at least one, or switch to **Semua pelanggan**.
- The message "Rasio gambar banner harus 2:1 dengan toleransi 5%." (The banner image ratio must be 2:1 with a 5% tolerance.) or the text "Gambar ini ... piksel" below **Gambar**: the image size is not close to 2:1. Crop the image to 1200 x 600 pixels. A file larger than 2 MB, or other than JPG, PNG and WebP, is also rejected in the same box.
- The message "Tujuan tautan wajib diisi." (The link destination is required.) or "Tautan harus memakai HTTPS." (The link must use HTTPS.): choose a page in the app or fill in an address starting with `https://`. The message "Tujuan tautan harus kosong tanpa tautan." (The link destination must be empty when there is no link.) means **Saat banner diketuk** is still **Tanpa tautan** while an address is filled in.
- The message "selesai harus berupa tanggal setelah mulai." (the end must be a date after the start.) below **Selesai tayang**: choose a time after **Mulai tayang**, or leave it empty.
- Customers do not see content that has the status **Tayang**: check **Sasaran** (the customer must have an **Aktif** or **Ditangguhkan** subscription in that location or category). For a banner, also check its order: only the top 5 are sent to the app.
- A banner or announcement cannot be activated again after **Nonaktifkan**. This rule is intentional. Create a new item.
- The **Gangguan** notification does not arrive: the customer must have an active sign-in account that matches the target, and the queue and scheduler must run.
