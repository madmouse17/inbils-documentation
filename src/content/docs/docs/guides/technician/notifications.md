---
title: "6. Notifications"
description: "Read in-app notifications, understand push messages on your phone, and use the test notification screen to fix push delivery problems."
---

The **Notifikasi** (Notifications) tab is the inbox for notices from Inbils, for example a new work order assigned, a ticket assigned, a material declaration, and an item request ready for pickup. The red number on the tab icon shows how many are unread.

![The Notifikasi tab](~/assets/guide/technician/notifikasi.webp)

How to use it:

1. Open the **Notifikasi** tab. Unread notifications have a blue dot.
2. Tap a notification. The app marks it as read and opens the related screen: a work order, a ticket, a material return, or the **Material** tab for an item request.
3. Tap the double tick icon (**Tandai semua dibaca** (Mark all as read)) at the top right to read everything at once.
4. Pull the screen down to refresh the list. The list also refreshes when the app is reopened from the background.

The list loads the next page as you scroll. If it is empty, the app writes "Belum ada notifikasi" (No notifications yet). A notification about something this app does not manage stays in the list and does not open any screen.

Common error: the list does not grow when the signal is poor. Pull the screen down after the internet returns.


## Notification types


| Title | Appears when | Push |
| --- | --- | --- |
| SPK baru ditugaskan (New work order assigned) | The office assigns a work order (SPK) to you. Tap to open the work order. | Yes |
| SPK disetujui (Work order approved) | The office approves a work order that you sent for review. The text mentions the work order code. | Yes |
| SPK ditolak (Work order rejected) | The office rejects your work order. The text mentions the work order code and the reason. Fix the work after the work order is reassigned to you. | Yes |
| Tiket ditugaskan (Ticket assigned) | A ticket is handed to you. The title contains the code and priority, for example "Tiket TKT-0031 · Tinggi" (Ticket TKT-0031 · High), and the text is the ticket title and "Respons sebelum {jam}" (Respond before {time}). | Yes |
| Respons pertama segera jatuh tempo (First response due soon) | An assigned ticket must be answered within 30 minutes. A response means you press **Mulai** (Start) on that ticket or send a comment that the customer can read. | Yes |
| Batas respons pertama terlewat (First response deadline missed) | The first response time of the ticket has passed. | Yes |
| SLA tiket terlampaui (Ticket SLA exceeded) | The ticket has passed its SLA limit. | Yes |
| Permintaan barang siap diambil (Item request ready for pickup) | The warehouse has prepared the items you requested. Tap to open the **Material** tab. | Yes |
| Notifikasi uji (Test notification) | You tap **Kirim notifikasi uji** (Send test notification) in **Akun** (Account) → **Notifikasi uji** (the next sections). The text reads "Notifikasi uji dari {nama ISP}." (Test notification from {ISP name}.) It does not open any screen. | Yes, only to the phone that sent it |

The **Push** column shows the notifications that also arrive on the phone screen. Other notifications, for example a material return, exist only in this list.


## Notifications on the phone screen (push)


The app can show notifications on the screen of your Android phone, also when the app is closed, so that a new work order or a ticket close to missing its SLA is not overlooked. The content is the same as in the **Notifikasi** tab. The app itself draws the notification, whether it is open, in the background or closed, so it looks the same in every situation.

1. After you sign in, the app may ask for notification permission through the Android system dialogue. This question only appears on Android 13 and later, and only once, as long as you have not decided.
2. Choose allow. The app then registers this phone with Inbils.
3. Tap the notification on the phone screen. The app opens the related screen (a work order, a ticket, or the **Material** tab), or the **Notifikasi** tab if the message has no target screen, and marks it as read.
4. While the app is open, the notification appears as a short banner at the top of the screen.
5. If several notifications are waiting, Android stacks them in one group with a single summary line, "{n} notifikasi baru" ({n} new notifications), which contains up to five titles (titles only, without the message text). Tap that summary to open the **Notifikasi** tab. Tap one notification to open its target screen. If that screen is already open, its content is reloaded straight away so that what you see is the latest data, with a thin line above it while it loads.
6. The ISP name appears as small text in the notification, not in its title. A message that has neither a title nor text is not shown on the phone screen, but the list in the **Notifikasi** tab is still updated. The list in the **Notifikasi** tab keeps your scroll position when its content is updated.

If you refuse the permission, the app still works and the **Notifikasi** tab still receives everything. To switch on push later, turn on the notifications of the Inbils app in the Android settings (**Pengaturan > Aplikasi** (Settings > Apps)), then open the app again. The app checks the permission every time it opens and registers the phone once the permission is on.

When you **Keluar** (Sign out), the app removes the registration of this phone, so there is no more push until you sign in again, and all notifications of this app are removed from the notification shade, also if the phone is offline. An app without a signed-in session shows no notifications at all. A phone that is removed from **Perangkat** (Devices) ([chapter 7](/docs/guides/technician/account/)), a changed password, or a deactivated account also stops receiving push.

If push does not appear, make sure the notification permission is on, the phone has internet and you are still signed in to this app. The ISP must also have enabled push on its server; if not, notifications still appear in the **Notifikasi** tab. Some phone brands (for example Xiaomi and Oppo) save battery by holding back closed apps. If notifications arrive late or do not arrive while the app is closed, open the battery settings for the Inbils app and choose **Tanpa pembatasan** (No restrictions) (or turn off battery optimisation, and allow auto-start if the phone asks for it).


## Test notification


The **Notifikasi uji** screen checks whether this phone can receive push from your ISP and, if not, what to fix. Use it when push does not appear, after changing phones or battery settings, or after signing in on a new phone.

1. Open the **Akun** tab, then tap **Notifikasi uji**. This screen needs internet.
2. Read the three checks from top to bottom. Each check has an icon and a result text, so it does not depend on colour:
   - **Izin notifikasi** (Notification permission): **Diizinkan** (Allowed), **Belum ditanyakan** (Not asked yet) (tap **Izinkan** (Allow) to bring up the Android question), or **Diblokir di pengaturan HP** (Blocked in the phone settings) (tap **Buka pengaturan** (Open settings), then turn on the notifications of the Inbils app). If the settings do not open, the app writes "Pengaturan tidak bisa dibuka. Buka Pengaturan HP, lalu Aplikasi, Inbils, Notifikasi." (The settings cannot be opened. Open the phone Settings, then Apps, Inbils, Notifications.) The app checks the permission again when you return from the settings.
   - **Token terdaftar di server** (Token registered on the server): at first **Belum diperiksa** (Not checked yet). The result is **Terdaftar** (Registered) followed by the name of this phone, or **Belum terdaftar** (Not registered) (tap **Daftarkan ulang** (Register again), then send the test notification again). If the server has not installed Firebase, the result is "Notifikasi push belum aktif di server" (Push notifications are not active on the server yet) with the **Perbaiki** (Fix) suggestion "Hubungi admin ISP Anda: Firebase server belum dipasang." (Contact your ISP admin: Firebase has not been installed on the server.)
   - **Pesan diterima** (Message received): **Belum dikirim** (Not sent yet), then "Menunggu pesan… N dtk" (Waiting for the message… N s) with a 30 second countdown, then "Diterima dalam N dtk" (Received in N s) or "Pesan tidak datang dalam 30 detik" (The message did not arrive within 30 seconds).
3. Tap **Kirim notifikasi uji**. The button is active when the permission is **Diizinkan**, the token is not **Belum terdaftar**, and no sending is in progress. The app checks the permission and the token, then asks the server to send one message to this phone only, not to other phones on your account.
4. Stay on this screen during the countdown. The test message appears as a banner at the top of the screen and the **Pesan diterima** check turns green with the time it took to arrive. The same message is saved in the **Notifikasi** tab with the title "Notifikasi uji".

If **Pesan diterima** fails, read the **Perbaiki** suggestion below it: "Periksa internet dan mode hemat baterai, lalu coba lagi. Bila tetap gagal, minta admin memeriksa status Firebase di Pengaturan → Integrasi." (Check the internet and battery saver mode, then try again. If it still fails, ask the admin to check the Firebase status in Settings → Integrations.) The ISP admin sees the Firebase status on the web page **Integrasi** (the **Notifikasi aplikasi (Firebase)** (App notifications (Firebase)) card: **Kredensial server** (Server credentials) and **Pengiriman terakhir berhasil** (Last delivery succeeded)). Battery saver mode on some phones holds back push for closed apps. Take Inbils out of the battery restrictions in the Android settings if that happens.

Common errors:

- "Terlalu banyak percobaan. Coba lagi dalam N detik." (Too many attempts. Try again in N seconds.): one account may send 3 test notifications per minute. The button is active again after that countdown.
- The **Kirim notifikasi uji** button cannot be tapped: look at the **Izin notifikasi** and **Token terdaftar di server** checks. Follow the suggestion below them.
- "Tidak ada koneksi internet. Periksa sinyal, lalu coba lagi." (No internet connection. Check the signal, then try again.): the phone has no internet, so the server cannot answer. Turn on the internet, then send again.
