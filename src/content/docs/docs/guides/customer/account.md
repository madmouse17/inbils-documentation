---
title: "8. Account"
description: "Use the Account tab to check your profile, switch the app theme, contact your ISP, change your password, manage devices and sign out."
---

The **Akun** (Account) tab shows who you are, the app appearance, how to contact the ISP, the customer profile, then the account management menu.

![Account](~/assets/guide/customer/redesign/akun-teal-light.webp)

The screen contains, from top to bottom:

1. **Profile header**: initials, name, customer code, and customer status (Aktif (Active), Ditangguhkan (Suspended), and so on).
2. **Tampilan** (Appearance): choose **Sistem** (System) (follows the phone setting), **Terang** (Light), or **Gelap** (Dark). The choice is saved on this phone and applies at once.
3. The **Hubungi {nama ISP}** (Contact {ISP name}) card: the ISP contacts filled in on the company profile. The possible rows are: **WhatsApp**, **Telepon** (Phone), **Email**, **Situs web** (Website), and **Jam layanan** (Service hours). Tap **WhatsApp** to open the conversation in WhatsApp, **Telepon** to open the dialler, **Email** to write an email, and **Situs web** to open the browser. **Jam layanan** is text only, for example "Senin sampai Sabtu 08.00 sampai 20.00" (Monday to Saturday 08.00 to 20.00). A part the ISP has not filled in does not appear, and the card disappears when the ISP has filled in none. When the phone has no app for that link, "Tidak bisa membuka WhatsApp." (Cannot open WhatsApp.) (or the name of another channel) appears.
4. **Profil pelanggan** (Customer profile) (read-only): email for signing in, email, phone, and contact person. Empty data is written as "Belum diisi" (Not filled in). It says "Hubungi CS untuk mengubah data." (Contact customer service to change the data.)
5. **Alamat** (Address) with the markers "Utama" (Main) and "Titik pemasangan" (Installation point). The invoice name, address, and email can only be changed by the ISP.
6. Menu rows: **Langganan** (Subscriptions), **Riwayat pembayaran** (Payment history), **Kunjungan teknisi** (Technician visit), then **Ubah profil** (Edit profile), **Ganti kata sandi** (Change password), **Perangkat** (Devices), **Notifikasi uji** (Test notification), **Tentang aplikasi** (About the app), and **Keluar** (Sign out).

The app colours follow the ISP brand colour, so each ISP can look different. The colour is sent from the server when the app loads the account data.


## Edit profile


1. Tap **Ubah profil**.
2. Change **Nama** (Name) (required) or **Telepon**.
3. Tap **Simpan** (Save). "Profil diperbarui." (Profile updated.) appears.

The login email cannot be changed in the app; contact the ISP when you need to change it. This change alters the login account name (shown in the Home greeting) and the contact phone number. The billing name and address on the customer record do not change.


## Change password


1. Tap **Ganti kata sandi**.
2. Fill in **Kata sandi saat ini** (Current password), **Kata sandi baru** (New password) (at least 8 characters), and **Ulangi kata sandi baru** (Repeat the new password).
3. Tap **Ganti kata sandi**.
4. All devices that are signed in, including this phone, are signed out. The app returns to the sign-in screen with the message "Kata sandi sudah diganti. Masuk lagi dengan kata sandi baru." (The password has been changed. Sign in again with the new password.) Sign in again with the new password.

A wrong current password shows "Kata sandi saat ini salah." (The current password is wrong.) After 5 wrong attempts within a minute, the app rejects further attempts until the pause has passed. A different repeat is rejected with "Ulangan kata sandi baru tidak sama." (The repeated new password does not match.)


## Devices


![Devices](~/assets/guide/customer/perangkat.webp)

The list of phones that are signed in to your account: device name, when it signed in, and when it was last used; the phone you are holding is marked "Perangkat ini" (This device).

To sign a device out (for example a lost phone):

1. Tap the **Keluarkan** (Sign out) button on that device.
2. Confirm in "Keluarkan perangkat?" (Sign out this device?).
3. That device is signed out of the account and must sign in again with the password.

When the device you sign out is this phone itself, you leave the app. When a phone is lost, also change the password so that all sessions end.


## About the app


![About the app](~/assets/guide/customer/tentang-aplikasi.webp)

It shows the app version, the app ID, the environment, the server, and the open-source licences. Quote this version when you contact the ISP about an app problem.


## Sign out


1. Tap **Keluar**.
2. Confirm in "Keluar dari akun?" (Sign out of the account?). The app signs out at once, even when the phone is offline.

You must sign in again to use the app.
