---
title: "2. Home and Jobs"
description: "Use the Beranda tab for today's visits and urgent tickets, and the Pekerjaan tab for the full list of work orders and tickets assigned to you."
---

There are five tabs at the bottom of the screen: **Beranda** (Home) shows today's work, **Pekerjaan** (Jobs) holds the full list of work orders (SPK) and tickets assigned to you.


## Home


![The Beranda tab](~/assets/guide/technician/redesign/beranda-teal-light.webp)

Beranda is the first tab and the screen that opens after you sign in. From top to bottom it contains:

1. **ISP header**: the company logo (or the blue Inbils circle if there is no logo yet or the logo failed to load), the company name and today's date. Below it is the greeting "Halo, nama depan Anda" (Hello, your first name). The app colours follow the ISP brand colour, so the look can differ between ISPs.
2. **Urgent ticket card**: your ticket whose first response deadline is nearest, above the visit card. The text reads "Tiket mendesak · respons sebelum 21:17 (sisa 41 menit)" (Urgent ticket · respond before 21:17 (41 minutes left)), with the ticket code and title below it. The icon turns yellow when 30 minutes or less remain and red after the deadline has passed ("lewat 12 menit" (12 minutes overdue)). Tap the card to open the ticket. The countdown updates every 30 seconds. The card does not appear if no ticket is waiting for a first response. A first response means you press **Mulai** (Start) on the ticket or send a comment that the customer can read.
3. **Visit card**: the work order you need to go to now. The app picks the work order that is **Dikerjakan** (In progress) (titled **Sedang dikerjakan** (In progress)), or, if there is none, the **Ditugaskan** (Assigned) work order with the earliest schedule (titled **Kunjungan berikutnya** (Next visit)). Work orders without a schedule come last. Tickets are not visits and do not appear on this card. The card contains:
   - the schedule: **Hari ini** (Today), **Besok** (Tomorrow) or the date. A schedule that has already passed reads "Terlambat, jadwal {tanggal}" (Late, scheduled {date}) and the card changes to a warning colour;
   - the work order title and code, the customer name and the installation address;
   - the distance ("850 m dari lokasi Anda" (850 m from your location) or "3,4 km dari lokasi Anda" (3.4 km from your location)), only if the work order has coordinates and the phone has allowed location. Beranda does not ask for location permission; the permission is requested when you start the work order;
   - the **Navigasi** (Navigate) button, which opens the phone map app to the customer location if the work order location is known, and the **Buka SPK** (Open work order) button, which opens the work order details ([chapter 3](/docs/guides/technician/work-orders/)).
4. If no work order is waiting, the visit card is replaced by the card "Tidak ada kunjungan SPK yang menunggu. Penugasan baru muncul di sini." (No work order visits are waiting. New assignments appear here.)
5. **Pekerjaan saya** (My work): four number tiles, **Ditugaskan**, **Dikerjakan**, **Menunggu tindakan** (Awaiting action) and **Total**. Tap a tile to open the **Pekerjaan** tab with that status filter. The **Total** tile opens the list without a filter.

Pull the screen down to refresh. The same pull tries to send the photo evidence waiting in the queue (see [chapter 3](/docs/guides/technician/work-orders/)). The app also refreshes by itself, without a pull: when you reopen the app from the background, when you switch tabs (immediately), and when a new notification arrives (about 1 second after the last notification in a burst). While data reloads, a thin line runs above the list and the old content stays readable. If one section fails to load, that section shows an error message and a **Coba lagi** (Try again) button; the other sections stay visible. The offline banner and the unsent photos banner (see "Common errors" below) also appear on Beranda.

The app picks the visit from the 10 newest work orders that the server sends. A technician with more than 10 open work orders may see a visit that is later than the earliest one. The urgent ticket card picks from the first page of your ticket list. Open the **Pekerjaan** tab for the full list.


## Job list


![The Pekerjaan tab](~/assets/guide/technician/redesign/pekerjaan-teal-light.webp)

The **Pekerjaan** tab holds the work orders and tickets assigned to you. From top to bottom the screen shows:

- The type selector: **Semua** (All), **SPK** or **Tiket** (Tickets).
- The status filter: **Ditugaskan**, **Dikerjakan** and **Menunggu tindakan**. Tap one to filter, tap it again to remove the filter. The tiles on Beranda select one of them.
- Job cards. Each card shows a type icon, the type and code, the title, the customer name, the status and a date: **Jadwal** (Schedule) for a work order, **Batas** (Deadline) for a ticket. For a work order, the type uses the work order type name from the office, for example `Instalasi · SPK-0021`, not just the word "SPK". Tickets with **Mendesak** (Urgent) (red) or **Tinggi** (High) (yellow) priority carry a priority label, and a ticket waiting for its first response reads "Respons sebelum 21:17 · sisa 41 mnt" (Respond before 21:17 · 41 min left) (or "lewat 12 mnt" (12 min overdue) after the deadline). A ticket that has passed its service deadline carries the **SLA terlewat** (SLA missed) label.

How to use it:

1. Choose **Semua**, **SPK** or **Tiket**.
2. If needed, tap the **Ditugaskan**, **Dikerjakan** or **Menunggu tindakan** filter.
3. Tap a row to open the work order details or the ticket details.
4. Scroll the list down to the end. The app loads the next page by itself.

Pull the screen down (pull-to-refresh) to refresh the list. The same pull also tries to send the photo evidence waiting in the queue (see [chapter 3](/docs/guides/technician/work-orders/)). The list also reloads by itself when the app is reopened and when you switch tabs (immediately), and about 1 second after the last notification in a burst.

If there is no job, the screen reads "Tidak ada pekerjaan untuk filter ini." (No jobs for this filter.)


## Common errors


- **Banner "Data offline · diperbarui HH:mm" (Offline data · updated HH:mm).** The phone has no internet, and the app shows the last copy. New jobs and changes from the office do not appear until the internet returns. Pull the screen down after the signal recovers.
- **Banner "Anda sedang luring. Aksi disimpan dan dikirim otomatis saat online." (You are offline. Actions are saved and sent automatically when online.)** It appears on the work order, ticket and material return screens after a request fails because there is no signal. The action you tapped stays saved and is sent by itself when the signal returns (see "Without signal: actions waiting to send" in [chapter 3](/docs/guides/technician/work-orders/)). Tap **Coba lagi** in the banner to check the signal and send right away.
- **Banner "N foto belum terkirim" (N photos not sent yet).** There are photo evidence files in the upload queue. Tap it to open them.
- **Red notice "N aksi gagal dikirim" (N actions failed to send).** There are saved actions that the server rejected or that may not have been sent. Tap **Lihat aksi** (View actions) to retry or discard them.
- **A job does not appear.** Only jobs assigned to you with the status Ditugaskan and Dikerjakan appear. If you are sure something is missing, ask the office to check the assignment.
