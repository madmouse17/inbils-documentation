---
title: "7. Notifications"
description: "Read the notification bell, set up phone push notifications, run the test notification, and learn when ISPs send WhatsApp messages."
---

Tap the **bell** icon at the top right of Home. The red number on the icon is the count of unread notifications.

![Notifications](~/assets/guide/customer/notifikasi.webp)

1. Unread notifications appear in bold.
2. Tap a notification to mark it as read. When it relates to an invoice, a ticket, or a technician visit, the app opens that invoice, ticket, or visit at once.
3. Tap **Tandai semua dibaca** (Mark all as read) to mark them all at once.
4. Pull the screen down to refresh; scroll to load older ones. When empty: "Belum ada notifikasi" (No notifications yet).

   ![Two unread Teknisi dalam perjalanan notifications](~/assets/guide/customer/redesign/kunjungan-notifikasi.webp)

Notification types for customers:

| Title | Appears when | Push |
| --- | --- | --- |
| Tagihan baru (New invoice) | An invoice is issued. | Yes |
| Tagihan segera jatuh tempo (Invoice due soon) | An invoice is due tomorrow or within 3 days. | Yes |
| Tagihan sudah jatuh tempo (Invoice past due) | An invoice is past its due date. | Yes |
| Pengingat jatuh tempo (Due date reminder) | Only on old notifications, from before the reminder was split into the two titles above. | No |
| Pembayaran diterima (Payment received) | A payment is recorded. | Yes |
| Tiket dibuat (Ticket created) | Your ticket is recorded. | No |
| Tiket mulai ditangani (Ticket being handled) | The ticket is handed to staff. | No |
| Tiket selesai (Ticket completed) | Staff resolve the ticket. | No |
| Jadwal kunjungan teknisi (Technician visit schedule) | A technician visit is scheduled. | No |
| Teknisi dalam perjalanan (Technician on the way) | The technician taps **Saya berangkat** (I'm on my way) in their app. The text is "Teknisi {nama depan} sedang menuju lokasi Anda." (Technician {first name} is on the way to your location.) Tap it to open the visit details. This message only appears in the app, not on WhatsApp. | Yes |
| Kunjungan teknisi selesai (Technician visit completed) | The technician has finished the visit at your address. The text is "Kunjungan teknisi untuk layanan Anda sudah selesai." (The technician visit for your service is complete.) Tap it to open the visit details. | Yes |
| Pengumuman baru (New announcement) | The ISP publishes a Gangguan (Outage) or Pemeliharaan (Maintenance) announcement for your area or package. The notification text is the announcement title. Tap it to open the announcement. | Yes |
| Notifikasi uji (Test notification) | You tap **Kirim notifikasi uji** (Send test notification) in **Akun** (Account) → **Notifikasi uji** (next section). The text is "Notifikasi uji dari {nama ISP}." (Test notification from {ISP name}.) It does not open any screen. | Yes, only to the phone that sent it |

The **Push** column shows the notifications that also reach the phone screen (next section). All notifications, including those not sent as push, stay in the bell list.

The title and text of a notification name what matters, not only the type: the invoice number, the amount, and the due date ("Tagihan INV-012" (Invoice INV-012), "INV-012 jatuh tempo besok" (INV-012 is due tomorrow), "Rp 154.600 untuk INV-012 sudah kami terima" (We have received Rp 154.600 for INV-012)), the ticket code, and an excerpt of the resolution notes with "Sudah beres?" (Solved?) (tap to open the ticket and close it). When staff reopen your ticket, they also tell you through the notification "Tiket {kode} dibuka kembali dan akan ditangani lagi." (Ticket {code} has been reopened and will be handled again.) Notifications created before this update still use the generic text.


## Notifications on the phone screen (push)


The app can show notifications on your Android phone screen, also when the app is closed. The content is the same as in the bell list.

1. After you sign in, the app can ask for notification permission through an Android system dialog. This question only appears on Android 13 and above and only once, as long as you have not decided.
2. Choose allow. The app then registers this phone with Inbils, and the notifications in the **Push** column of the table above reach the phone.
3. Tap a notification on the phone screen. The app opens directly on the related invoice, visit, or announcement. For messages with no target screen, the app opens the notification list. That notification is marked as read.
4. While the app is open, a notification appears as a short banner at the top of the screen.
5. When several notifications are waiting, Android stacks them in one group with one summary line, "{n} notifikasi baru" ({n} new notifications), which lists up to five titles (titles only, without the message text). Tap the summary to open the notification list, and tap one notification to open its target screen. When that screen is already open, its content is reloaded at once so that you see the latest data.

When you deny the permission, the app still works and the bell still receives all notifications. To turn push on later, switch on notifications for the Inbils app in Android settings (**Pengaturan > Aplikasi** (Settings > Apps)), then open the app again. The app checks the permission every time it opens and registers the phone once the permission is on.

When you **Keluar** (Sign out), the app removes this phone's registration, so there is no more push until you sign in again, and all notifications of this app are cleared from the notification shade, also when the phone is offline. An app with no signed-in session shows no notifications at all. A phone removed from the **Perangkat** (Devices) list ([chapter 8](/docs/guides/customer/account/)), a changed password, or a deactivated account also stops receiving push. Push does not depend on WhatsApp and does not need WhatsApp consent.

On the phone screen, the ISP name appears as small text in the notification, not in the title. The list on the bell keeps your scroll position when its content updates.

When push does not appear, make sure the notification permission is on, the phone has internet, and you are still signed in to this app. The ISP must also have enabled push on its server. When the ISP has not enabled it, notifications still appear on the bell. The app itself draws the notification, also when closed. Some phone brands (for example Xiaomi and Oppo) save battery by holding closed apps. When notifications arrive late or not at all while the app is closed, open the battery settings for the Inbils app and choose **Tanpa pembatasan** (No restrictions) (or turn off battery optimisation, and allow auto-start when the phone asks for it).


## Test notification


The **Notifikasi uji** screen checks whether this phone can receive push from your ISP, and if not, what to fix. Use it when invoice or visit notifications do not appear on the phone screen, or after signing in on a new phone.

1. Open the **Akun** tab, then tap **Notifikasi uji**. This screen needs internet.
2. Read the three checks from top to bottom. Each check has an icon and a result text, so it does not depend on colour:
   - **Izin notifikasi** (Notification permission): **Diizinkan** (Allowed), **Belum ditanyakan** (Not asked yet) (tap **Izinkan** (Allow) to bring up the Android question), or **Diblokir di pengaturan HP** (Blocked in phone settings) (tap **Buka pengaturan** (Open settings), then switch on notifications for the Inbils app). When settings do not open, the app says "Pengaturan tidak bisa dibuka. Buka Pengaturan HP, lalu Aplikasi, Inbils, Notifikasi." (Settings could not be opened. Open phone Settings, then Apps, Inbils, Notifications.) The app checks the permission again when you come back from settings.
   - **Token terdaftar di server** (Token registered on the server): at first **Belum diperiksa** (Not checked yet). The result is **Terdaftar** (Registered) followed by the name of this phone, or **Belum terdaftar** (Not registered) (tap **Daftarkan ulang** (Register again), then send the test notification again). When the server has no Firebase installed, the result is "Notifikasi push belum aktif di server" (Push notifications are not active on the server yet) with the **Perbaiki** (Fix) advice "Hubungi admin ISP Anda: Firebase server belum dipasang." (Contact your ISP admin: Firebase is not installed on the server.)
   - **Pesan diterima** (Message received): **Belum dikirim** (Not sent yet), then "Menunggu pesan… N dtk" (Waiting for the message… N s) with a 30-second countdown, then "Diterima dalam N dtk" (Received in N s) or "Pesan tidak datang dalam 30 detik" (The message did not arrive within 30 seconds).
3. Tap **Kirim notifikasi uji**. The button is active when the permission is **Diizinkan**, the token is not **Belum terdaftar**, and no sending is in progress. The app checks the permission and the token, then asks the server to send one message to this phone only, not to other phones on your account.
4. Stay on this screen during the countdown. The test message appears as a banner at the top of the screen and the **Pesan diterima** check turns green with the time it took to arrive. The same message is saved in the bell list with the title "Notifikasi uji".

When **Pesan diterima** fails, read the **Perbaiki** advice below it: "Periksa internet dan mode hemat baterai, lalu coba lagi. Bila tetap gagal, minta admin memeriksa status Firebase di Pengaturan → Integrasi." (Check the internet and battery saver mode, then try again. If it still fails, ask the admin to check the Firebase status in Settings → Integrations.) Contact your ISP for that last step: the ISP admin sees the Firebase status on the **Integrasi** (Integrations) web page. Battery saver mode on some phones holds push for closed apps. Take Inbils out of battery restrictions in Android settings when that happens.

Common errors:

- "Terlalu banyak percobaan. Coba lagi dalam N detik." (Too many attempts. Try again in N seconds.): one account may send 3 test notifications per minute. The button becomes active again after that count.
- The **Kirim notifikasi uji** button cannot be tapped: look at the **Izin notifikasi** and **Token terdaftar di server** checks. Complete the advice below them.
- "Tidak ada koneksi internet. Periksa sinyal, lalu coba lagi." (No internet connection. Check your signal, then try again.): the phone has no internet, so the server cannot answer. Turn on internet, then send again.


## WhatsApp notifications


Besides the app, the ISP can send WhatsApp messages for the same events. A WhatsApp message is only sent when **all** these conditions are met:

- The ISP has enabled WhatsApp for its company.
- You have **given consent** to WhatsApp. Consent is recorded by ISP staff; without it there is no message, and the notification in the app still appears.
- Your phone number is a valid Indonesian mobile number. Landline numbers and foreign numbers are skipped.

Messages that are sent: invoice issued, due date reminders (3 days and 1 day before, and 1 day after the due date), payment received, ticket created, ticket being handled, ticket completed, and technician visit schedule. Invoice and reminder messages are held during quiet hours (default 21.00-07.00); messages for other events are sent at once. The message text uses fixed templates approved by Meta.

To stop, reply to the ISP's message with **STOP** or **BERHENTI**. After that, there are no more messages from the ISP you replied to until its staff record new consent. The reply only applies to the ISP that owns the WhatsApp number that sent the message, not to other ISPs that serve you. Links or passwords are never sent through WhatsApp.

The number used is the phone number in your profile. You can change it in **Ubah profil** (Edit profile) ([chapter 8](/docs/guides/customer/account/)); the WhatsApp consent stays recorded on the customer record.
