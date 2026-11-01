---
title: "1.4 Two-step authentication (2FA)"
description: "Turn on, use and turn off 2FA with an authenticator app, handle recovery codes, and understand the company 2FA policy for admins."
---

2FA asks for a 6-digit code from an authenticator app on your phone after the password, so a leaked password alone is not enough to sign in. The feature is optional and each user sets it up on their own. The code changes every 30 seconds.

Roles that can use it: all users, for their own account. Technicians and customers turn it on from the web with the **Kelola akun & 2FA** (Manage account and 2FA) button on the **Gunakan aplikasi Inbils** (Use the Inbils app) page.

## Turning on 2FA

1. Click your name at the top right, then **Profil** (Profile) ([section 1.7](/docs/guides/web/introduction/profile-and-password/)).
2. In the **Autentikasi dua langkah** (Two-step authentication) section (badge **Nonaktif** (Inactive)), click **Aktifkan autentikasi dua langkah** (Activate two-step authentication).
3. If Inbils opens the **Konfirmasi kata sandi** (Confirm password) page, fill in **Kata sandi** (Password) then click **Konfirmasi** (Confirm). A wrong password is rejected with the message "Kata sandi yang Anda masukkan salah." (The password you entered is wrong.) This confirmation is valid for 3 hours, so you are not asked again while managing 2FA within that period. After the confirmation, you return to Profile. Click **Aktifkan autentikasi dua langkah** once more.
4. Scan the QR code with the authenticator app on your phone. If you cannot scan, type the setup key shown under the QR code into the app.
5. Type the 6-digit code from the app into the **Kode autentikasi** (Authentication code) field, then click **Konfirmasi dan aktifkan** (Confirm and activate). The badge changes to **Aktif** (Active), and a green toast says "Autentikasi dua langkah aktif. Simpan kode pemulihan Anda dengan aman." (Two-step authentication is active. Keep your recovery codes safe.)
6. Inbils shows **Kode pemulihan Anda** (Your recovery codes): eight codes, each valid only once. Click **Salin** (Copy) (shown if the browser supports it) or **Unduh sebagai teks** (Download as text), keep them somewhere safe such as a password manager, then click **Saya sudah menyimpan kode ini** (I have saved these codes). The codes are not shown again.

The QR code is shown only once. If you close the page before step 5, the badge becomes **Belum selesai** (Not finished) and Inbils shows **Pengaturan belum selesai** (Setup not finished). Click **Mulai lagi** (Start again) to get a new QR code, or **Batalkan pengaturan** (Cancel setup) to cancel. **Batalkan pengaturan** is also next to **Konfirmasi dan aktifkan** while the QR code is shown.

## Signing in with 2FA

1. Fill in the email and password on the sign-in page, then click **Masuk** (Sign in).
2. On the **Autentikasi dua langkah** page, fill in **Kode autentikasi** with the 6-digit code from the app, then click **Masuk**.
3. If the phone is lost or broken, click **Pakai kode pemulihan** (Use a recovery code), fill in **Kode pemulihan** (Recovery code), then click **Masuk**. Click **Pakai kode autentikasi** (Use an authentication code) to return to the normal code.

The code page is valid for 10 minutes after the password is accepted. After that Inbils returns you to the sign-in page. The **Kembali ke halaman masuk** (Back to the sign-in page) link takes you there at any time.

Profile shows "Sisa kode pemulihan:" (Remaining recovery codes:) followed by the number. Click **Buat kode pemulihan baru** (Create new recovery codes) to create a new set. The old set stops working immediately.

## Turning off 2FA

1. Open **Profil**, the **Autentikasi dua langkah** section.
2. Click **Nonaktifkan autentikasi dua langkah** (Deactivate two-step authentication).
3. In the **Nonaktifkan autentikasi dua langkah?** (Deactivate two-step authentication?) dialog, click **Nonaktifkan** (Deactivate). Click **Tetap aktif** (Keep active) to cancel. The account is protected by the password only again, and the recovery codes stop working.

## Company 2FA policy and reminder

A company admin (holder of `company.manage`) can require 2FA for all admins with the **Wajib 2FA untuk admin** (Require 2FA for admins) switch in **Pengaturan Perusahaan** (Company settings), **Keamanan** (Security) card ([section 8.1](/docs/guides/web/administration/company/)). Under this policy, an admin is a user who holds `company.manage`, `users.manage` or `roles.manage`.

- While the switch is off (the default), admins who do not yet use 2FA see the reminder "Lindungi akun admin dengan 2FA. Satu kata sandi yang bocor cukup untuk membuka data semua pelanggan." (Protect the admin account with 2FA. One leaked password is enough to open all customer data.) at the top of admin pages. **Aktifkan 2FA** (Activate 2FA) opens Profile. **Nanti saja** (Later) hides it for 7 days in that browser for that user only, so other admins on the same computer still see it.
- While the switch is on, an admin without 2FA who opens any admin page is redirected to Profile with the message "Perusahaan mewajibkan 2FA untuk admin. Aktifkan 2FA untuk melanjutkan." (The company requires 2FA for admins. Activate 2FA to continue.) Profile, the 2FA settings, the password pages and sign-out stay open, so the admin can activate it and then return to work. Users without admin permissions are not affected. API requests to admin pages are answered with 403.
- The switch can be turned on only if 2FA on your own account is already active. Inbils support staff who sign in as a user are not affected by this policy, because they already use operator 2FA.

## Common errors

- The message "Kode autentikasi dua langkah tidak valid." (The two-step authentication code is not valid.) means the code is wrong, has already changed, or has been used. Type the latest code from the app and make sure the phone clock is accurate.
- A code is accepted only once. After a code is used to sign in, wait for the next code to sign in again.
- Five wrong attempts within a minute from one address temporarily stop further attempts, even if the code typed is correct. Ten wrong attempts within 15 minutes stop them for that account from any address. Wait until the minutes in the message "Terlalu banyak percobaan. Coba lagi dalam N menit." (Too many attempts. Try again in N minutes.) pass.
- Phone lost and recovery codes used up: ask an admin to reset the 2FA of your account with the **Atur ulang 2FA** (Reset 2FA) button on the user detail page ([section 8.5](/docs/guides/web/administration/users/)). After the reset, you sign in with the password only and can register again.
- Turning on, turning off or regenerating recovery codes ends your logins on other browsers and devices, including "Ingat saya" (Remember me) logins and Android app logins. The session you are using keeps running. Sign in again in the app afterwards.
