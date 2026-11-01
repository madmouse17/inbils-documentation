---
title: "1. Introduction"
description: "Install the Inbils Customer app, sign in with the account your ISP created, reset a forgotten password and use two-step verification."
---

The **Inbils Pelanggan** (Inbils Customer) Android app lets you view and pay invoices, check your internet service, and contact your service provider (ISP) through tickets. Customers no longer use the website for these tasks. The customer login on the website only shows the page "Gunakan aplikasi Inbils" (Use the Inbils app).


## Installing the app


1. Open the **Inbils Pelanggan** app page on the Google Play Store. Your ISP gives you the address; the "Gunakan aplikasi Inbils" page on the website also has a **Buka Play Store** (Open Play Store) button when the ISP has filled it in.
2. Tap **Pasang** (Install), then open the app.

The app runs on Android phones and needs an internet connection. When the connection drops, the app shows the message "Anda sedang offline. Data yang tampil mungkin belum terbaru." (You are offline. The data shown may be out of date.)


## The ISP creates your account


You do not register yourself. ISP staff create the customer record and the login account, then the system sends an email to the customer's email address with a **password setup link**.

1. Open the email from your ISP.
2. Tap the link in it. The link opens a web page for setting the password.
3. Enter a new password and save.
4. Go back to the app and sign in with that email and password.

The link is valid for 60 minutes. If it has expired or you cannot find the email, use **Lupa kata sandi** (Forgot password) (section "Forgot password" below) or ask the ISP to resend the link. The password is never sent through WhatsApp; at most, WhatsApp only tells you that the link is in your email.

Old accounts whose password was still the phone number have been disabled. The owner of such an account must first set a new password through the email link. See "Common errors".


## Opening the app


![Splash screen with the Inbils logo and the text Aplikasi pelanggan (Customer app)](~/assets/guide/customer/splash.webp)

When the app opens, the screen shows the Inbils logo with a shine of light passing across it, then the text "Aplikasi pelanggan" (Customer app) appears below it. This screen disappears by itself once the app is ready, usually within about one second. When the signal is slow, a small indicator appears below the text until the app is ready. If your phone is set to reduce animations, the logo appears without the shine and the screen changes as soon as the app is ready.


## Signing in


![Sign-in screen](~/assets/guide/customer/masuk.webp)

1. Open the app.
2. Fill in **Email** with the email your ISP uses for your account. This address appears in the Akun (Account) menu as "Email untuk masuk" (Email for signing in).
3. Fill in **Kata sandi** (Password). Tap the eye icon to show or hide the password.
4. Tap **Masuk** (Sign in).

When the email or password is wrong, "Email atau kata sandi salah." (Wrong email or password.) appears directly below the **Email** field, and the message disappears as soon as you change the email. Other messages from the server appear in the same place, for example "Akun perusahaan Anda sedang ditangguhkan. Hubungi dukungan." (Your company account is suspended. Contact support.) After several wrong attempts, the app shows "Terlalu banyak percobaan" (Too many attempts); wait for the time shown.

You stay signed in on this phone until you sign out, change your password, or the session expires (up to 90 days; the app renews the session by itself while you use it). See "Common errors".

The sign-in screen also has a **Tentang aplikasi** (About the app) button (app and server version) that you can open before signing in.

![About the app before signing in](~/assets/guide/customer/tentang-aplikasi-before-login.webp)


## Two-step verification


Two-step verification is optional. When you turn it on, the app shows the **Verifikasi dua langkah** (Two-step verification) screen after the password is correct.

![Two-step verification](~/assets/guide/customer/verifikasi-dua-langkah.webp)

1. Open the authenticator app on your phone.
2. Enter the **Kode 6 digit** (6-digit code) shown, then tap **Verifikasi** (Verify).
3. If the authenticator phone is lost, tap **Pakai kode pemulihan** (Use a recovery code) and enter one of your recovery codes. Each code works only once.
4. To go back to the authenticator code, tap **Pakai kode autentikator** (Use authenticator code).

Turning it on, turning it off, and regenerating recovery codes can **not** be done in the app. Do it on the Inbils website: sign in with your account, then on the "Gunakan aplikasi Inbils" page tap **Kelola akun & 2FA** (Manage account & 2FA). Ask the ISP for the website address.

A wrong code shows "Kode salah. Periksa lalu coba lagi." (Wrong code. Check and try again.) If you stay too long on this screen, "Kode verifikasi kedaluwarsa. Silakan masuk lagi." (The verification code has expired. Please sign in again.) appears. Go back to the sign-in screen and start again. If the recovery codes are used up and the phone is lost, ask the ISP administrator to reset two-step verification for your account.


## Forgot password


![Forgot password](~/assets/guide/customer/lupa-kata-sandi.webp)

1. On the sign-in screen, tap **Lupa kata sandi?** (Forgot password?)
2. Enter your account email and tap **Kirim link** (Send link).
3. The app answers "Jika email itu terdaftar, link atur ulang kata sandi sudah kami kirim. Periksa kotak masuk Anda." (If that email is registered, we have sent a password reset link. Check your inbox.) The answer is the same for every address, so that nobody can guess which emails are registered.
4. Open the email, tap the link, and set a new password on the web page that opens.
5. Go back to the app and sign in with the new password.

The reset is always completed on the web page through the email link, not in the app. A badly formatted email is rejected with "Format email tidak valid." (Invalid email format.) The **Kembali ke halaman masuk** (Back to the sign-in page) button cancels.
