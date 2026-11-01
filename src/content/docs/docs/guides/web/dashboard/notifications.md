---
title: "2.2 Notifications"
description: "Read, open and mark notifications for tickets, SLA breaches, expiring customer documents and billing failures, from the Dashboard, bell or page."
---

Notifications are messages addressed to your account, for example a ticket assigned to you, a ticket that passes its SLA limit ("SLA tiket terlampaui" (Ticket SLA exceeded)), a ticket that is reopened, a customer document that is about to expire, an item request that is ready for pickup, or a billing schedule failure ("Jadwal penagihan gagal" (Billing schedule failed)). Notifications appear in three places: the panel on the Dashboard, the number on the bell in the top bar, and the **Notifikasi** (Notifications) page. Some texts contain details so you do not need to open the page:

- Ticket assigned: the title contains the ticket code and priority, for example "Tiket {kode} · Tinggi" (Ticket {code} · High), and the message contains the ticket title and the response deadline, for example "{judul}. Respons sebelum 21.17." ({title}. Respond before 21.17.) The time is written "21.17" for today, "08.30 besok" (08.30 tomorrow) for tomorrow, and a date followed by the time for later days. A ticket without a response target does not contain the sentence "Respons sebelum".
- Ticket reopened by staff: "Tiket {kode} dibuka kembali" (Ticket {code} reopened), with the message "Oleh {nama}: {alasan}" (By {name}: {reason}). The ticket officer receives it, or the holder of `ticket.assign` if the ticket has no active officer. The person who reopened the ticket does not receive it.
- Customer document about to expire: "Dokumen {jenis} {nama pelanggan} segera habis" (Document {type} {customer name} expires soon), with the message "Berlaku sampai {tanggal}." (Valid until {date}.) Holders of `customer.update` receive it once per document, when the document enters the last 30 days of its validity. The system checks every day.

Old notifications created before these texts existed keep the generic sentence, for example "Tiket ditugaskan" (Ticket assigned). Notifications for customers (invoices, ticket completed, ticket reopened) appear in the customer app, not on this page.

Roles that can use it: all web users, for their own notifications.

1. Look at the **Notifikasi** panel on the right of the Dashboard (on a narrow screen, below the cards). The panel shows the five latest notifications, with a badge for the unread count if there is any. If there are no notifications yet, the panel writes "Belum ada notifikasi." (No notifications yet.) Click **Lihat semua notifikasi** (View all notifications) at the bottom of the panel.
2. Or click the bell icon in the top bar. The bell opens the **Notifikasi** page directly. The red number on the bell is the unread count.

   ![Notifications page with the title, the Tandai semua dibaca (Mark all as read) button, and the list of notifications](~/assets/guide/web/notifications.webp)

3. Read the list. Each notification has a title, a message and a time. An unread notification has a bold title and a faint background. The list shows 20 notifications per page.
4. Click **Lihat detail** (View details) to open the page the notification refers to: a ticket, work order (SPK), invoice or customer. An unread notification is automatically marked as read.
5. Click **Tandai dibaca** (Mark as read) on one notification to mark it without opening its page.
6. Click **Tandai semua dibaca** at the top right to mark all of them. This button is inactive if nothing is unread.
7. If the list is long, use **Sebelumnya** (Previous) and **Berikutnya** (Next) under the list.

## Common errors

- A bell without a number only means nothing is unread. Old notifications stay on the **Notifikasi** page. This screen has no delete button.
- The **Lihat detail** button exists only on notifications that have a target page: a ticket, a work order awaiting review, a draft invoice, an automatic isolir (internet blocked while the account is suspended) summary (opens **Tunggakan** (Arrears)), and a customer document about to expire (opens the customer page). The button is shown if the data exists in the active company and you may open it. Other notifications, or notifications from another company ([section 1.6](/docs/guides/web/introduction/switch-company/)), do not have that button.
- Notifications are only for your account. An admin does not see other users' notifications.
