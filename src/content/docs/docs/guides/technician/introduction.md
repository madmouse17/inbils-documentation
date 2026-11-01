---
title: "1. Introduction"
description: "Install the Inbils Technician Android app, sign in with two-step verification, reset a forgotten password and manage your sessions."
---

The **Inbils Teknisi** (Inbils Technician) app is an Android app for field technicians. With it you receive the work orders (SPK) and tickets assigned to you, start and complete them, send photo evidence of your work, record materials and request items from the warehouse. Technician accounts no longer use the Inbils website for daily work.

This guide follows the order of the screens in the app. There are five tabs at the bottom of the screen: **Beranda** (Home), **Pekerjaan** (Jobs), **Material** (Materials), **Notifikasi** (Notifications), **Akun** (Account).


## Installing the app


1. Ask the Inbils office for the Play Store link of the Inbils Teknisi app. The same link appears as the **Buka Play Store** (Open Play Store) button when your technician account opens the Inbils website.
2. Open the link on an Android phone, then install the app.
3. Open the **Inbils Teknisi** app.

The app is only available for Android.


## Account


The Inbils admin creates the account. You cannot register yourself in the app. The admin gives you an email address and an initial password, and activates your account as a technician with an active employee profile.

The app uses the **same email and password as the Inbils website**. Changing the password in the app changes it on the web, and the other way round.


## Opening the app


![Splash screen with the Inbils logo and the text Aplikasi teknisi (Technician app)](~/assets/guide/technician/splash.webp)

When the app opens, the screen shows the Inbils logo with a glint of light passing over it, then the text "Aplikasi teknisi" (Technician app) appears below it. The screen disappears by itself as soon as the app is ready, usually within about one second. If the signal is slow, a small indicator appears under the text until the app is ready. If you open the app from a notification, the splash screen goes straight to the job the notification refers to.


## Signing in


![The Masuk (Sign in) screen](~/assets/guide/technician/masuk.webp)

1. Type your **Email**.
2. Type your **Kata sandi** (Password). Tap the eye icon to show or hide it.
3. Tap **Masuk** (Sign in).
4. If your account uses two-step verification, the app opens the code screen (see the next section). If not, you go straight to the **Beranda** tab.

After you sign in, the app remembers your session on this phone. You do not need to sign in every time you open the app.

### Common errors when signing in

- **"Email atau kata sandi salah." (Wrong email or password.)** Check the spelling of the email and the upper and lower case of the password.
- **"Akun ini tidak terdaftar sebagai teknisi." (This account is not registered as a technician.)** Your account has not been given technician rights, or your employee profile is not active. Contact the Inbils office.
- **"Akun Anda dinonaktifkan. Hubungi kantor Inbils." (Your account has been deactivated. Contact the Inbils office.)** The admin deactivated your account.
- **"Terlalu banyak percobaan. Coba lagi dalam N detik." (Too many attempts. Try again in N seconds.)** Wait for the countdown, then try again.
- **"Tidak ada koneksi internet." (No internet connection.)** Signing in always needs internet.


## Two-step verification


If two-step verification is active on your account, the app opens the **Verifikasi dua langkah** (Two-step verification) screen after you enter the correct email and password.

![The Verifikasi dua langkah screen](~/assets/guide/technician/verifikasi-dua-langkah.webp)

1. Open the authenticator app on your phone.
2. Type the **Kode 6 digit** (6-digit code) shown for Inbils.
3. Tap **Verifikasi** (Verify).
4. If your authenticator phone is lost, tap **Pakai kode pemulihan** (Use a recovery code), type one of your recovery codes, then tap **Verifikasi**. Each recovery code works only once. Tap **Pakai kode autentikator** (Use an authenticator code) to go back to the 6-digit code.

Two-step verification is switched on, switched off and managed on the Inbils **website** (the profile page), not in the app. Every time that setting changes, all phones that are signed in are signed out automatically and you sign in again.

### Common errors with two-step verification

- **"Kode salah. Periksa lalu coba lagi." (Wrong code. Check it and try again.)** Make sure the phone clock is accurate and that you use the latest code from the authenticator app.
- **"Kode verifikasi kedaluwarsa. Silakan masuk lagi." (The verification code has expired. Please sign in again.)** You stayed too long on this screen. The app returns to the **Masuk** screen; start again from the beginning.
- The number of attempts is limited. After several wrong attempts, wait before trying again.


## Forgotten password


![The Lupa kata sandi (Forgot password) screen](~/assets/guide/technician/lupa-kata-sandi.webp)

1. On the **Masuk** screen, tap **Lupa kata sandi?** (Forgot password?). If you have already typed your email, the app carries it over to this screen.
2. Type your account email, then tap **Kirim link** (Send link).
3. The app answers "Jika email itu terdaftar, link atur ulang kata sandi sudah kami kirim." (If that email is registered, we have sent a password reset link.) This answer is the same for any email, so it does not reveal which emails are registered.
4. Open your email and tap the link in it. The link opens an Inbils **web page** where you type a new password. The password is not reset inside the app.
5. Go back to the app and sign in with the new password.

If an account still uses an old password that must be changed, the app shows an **Atur ulang kata sandi** (Reset password) sheet with the message "Demi keamanan, atur ulang kata sandi lewat link yang kami kirim ke email Anda." (For security, reset your password through the link we sent to your email.) Tap **Kirim link** and follow steps 4 and 5.

Common error: the email does not arrive. Check the spam folder, then wait one minute before requesting the link again. Link requests are limited per minute.


## Devices and signing out


One app session applies to one phone. You can view other phones and sign them out in **Akun > Perangkat** (Account > Devices) (see [chapter 7](/docs/guides/technician/account/)).

To sign out of the app: **Akun > Keluar** (Account > Sign out), then confirm. If photo evidence or actions have not been sent yet, the app warns you that all of them will be deleted (see [chapter 3](/docs/guides/technician/work-orders/)).


## Session expiry


A technician app session lasts 30 days from sign-in. The app renews the session when less than 7 days of its validity remain. If the session runs out, or your password is changed, or the account is deactivated, the app opens the **Masuk** screen with the message "Sesi Anda berakhir. Silakan masuk lagi." (Your session has ended. Please sign in again.) Sign in again with your email and password.
