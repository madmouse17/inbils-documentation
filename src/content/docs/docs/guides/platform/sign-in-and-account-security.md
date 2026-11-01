---
title: "2. Signing in and operator account security"
description: "Create operator accounts, enrol 2FA, sign in, manage recovery codes and confirm your password for sensitive actions in the Inbils operator panel."
---

## 2.1 Creating an operator account


Roles that can use it: the server team with terminal access. The panel has no button to create, edit, deactivate or delete operator accounts.

Run this interactive command:

```bash
php artisan inbils:platform:admin-create
```

With Sail:

```bash
./vendor/bin/sail artisan inbils:platform:admin-create
```

The command asks for **Name**, **Email**, **Password** and **Confirm Password**. The rules:

- the name is required, at most 255 characters;
- the email is required, valid, at most 255 characters, and not yet used by another operator;
- the password has at least 12 characters and contains letters and digits;
- the password confirmation must match.

The command writes the audit entry **Operator dibuat** (Operator created). On success, the terminal states that the platform admin was created and asks the person to sign in at `/platform/login` and enrol 2FA straight away.

Create the account only when the future operator is ready to enrol an authenticator app. The first sign-in uses a trust-on-first-use pattern. A person who knows the password before enrolment is complete can enrol their own authenticator first.

There is no command to reset the 2FA of an operator. If an operator loses the authenticator app and all recovery codes, the server team must create a new operator account with a different email. Deactivate the old account through a server procedure controlled by the installation owner. The panel does not offer this action.


## 2.2 First sign-in and enrolling 2FA


Roles that can use it: a new operator whose account has no 2FA yet.

1. Open `/platform`. Fill in **Email** and **Kata sandi** (Password), then click **Masuk** (Sign in).

   ![Sign-in page of the operator panel with the inbils logo, and the Email and Password fields](~/assets/guide/web/platform-login.webp)

2. Inbils opens the **Autentikasi dua langkah** (Two-step authentication) page. The badge is **Nonaktif** (Inactive) at first. Click **Mulai pengaturan** (Start setup).

   ![Operator two-step authentication page before enrolment, with the Inactive badge and the Start setup button](~/assets/guide/web/platform-two-factor-setup.webp)

3. Scan the QR code with an authenticator app. If scanning fails, enter the setup key shown below the QR code.
4. Fill in **Kode autentikasi** (Authentication code) with the 6-digit code from the app, then click **Konfirmasi dan aktifkan** (Confirm and activate).
5. If the code is correct, the page shows **Kode pemulihan Anda** (Your recovery codes). There are 8 codes. Each code can be used only once and is not shown again after you leave the page.
6. Click **Salin** (Copy) or **Unduh sebagai teks** (Download as text). The download is named `kode-pemulihan-platform-inbils.txt`.
7. Store the codes in a password manager or another safe place. Click **Saya sudah menyimpan kode ini** (I have saved these codes) to open the **Dasbor** (Dashboard).

The authenticator account uses the application name with the suffix `Platform`, and the operator email as the account name. The code changes every 30 seconds. The code used to finish enrolment is counted as used straight away and cannot be used again at the next sign-in.

The QR code is shown only once. If you close the page before confirming, the badge becomes **Belum selesai** (Incomplete). The alert **Pengaturan belum selesai** (Setup not finished) reads "Kode QR hanya tampil sekali. Mulai lagi untuk mendapat kode baru." (The QR code is shown only once. Start again to get a new code.) Click **Mulai lagi** (Start again).

Until 2FA is active, the operator can only open the 2FA setup page and sign out. Other panel routes send the operator back to this page.

### Common errors

- The message "Kode autentikasi dua langkah tidak valid." (The two-step authentication code is not valid.) means the code is wrong, already used, or outside its time window. Use the latest code and check the device clock.
- Enrolment is finished, but the same code is refused at the next sign-in: wait for the app to show the next code. Inbils refuses reuse of a single code.
- The page shows **Pengaturan belum selesai**: click **Mulai lagi**. The old QR code cannot be shown again.
- The QR code cannot be scanned: enter the setup key shown below the QR code by hand.


## 2.3 Signing in afterwards


Roles that can use it: an operator with 2FA active.

1. Fill in **Email** and **Kata sandi** on the **Masuk ke panel operator** (Sign in to the operator panel) page, then click **Masuk**.
2. On the **Autentikasi dua langkah** page, fill in **Kode autentikasi** with the 6-digit code, then click **Masuk**.
3. If the authenticator app is not available, click **Pakai kode pemulihan** (Use a recovery code). Fill in **Kode pemulihan** (Recovery code), then click **Masuk**.
4. Click **Pakai kode autentikasi** (Use an authentication code) to go back to the 6-digit code. Click **Kembali ke halaman masuk** (Back to the sign-in page) to cancel the sign-in.

A sign-in that waits for a code is valid for 10 minutes after the password is accepted. After that, Inbils sends the operator back to the sign-in page. Each browser session must pass its own challenge. A sign-in in a second browser does not reuse the verification from the first browser.

Inbils accepts a TOTP code in the current time step, one step before, or one step after, to tolerate differences in the device clock. The anti-replay guard still refuses a step that has been used.

### Attempt limits

- Five failures in one minute for one email and IP address hold the sign-in from that pair.
- Twenty failures in one hour for one email hold that account from all addresses.
- Twenty failures in one minute from one IP address hold that address, even if the email tried changes.
- The 2FA challenge accepts at most 5 attempts per minute for one operator and address, and 10 attempts per 15 minutes for that operator from all addresses.

When limited, Inbils shows "Terlalu banyak percobaan. Coba lagi dalam N menit." (Too many attempts. Try again in N minutes.) N is rounded up to a whole minute. A correct code or password is still refused until the waiting time ends. An inactive operator account gets the same wrong-credentials message so that others cannot guess the account status.


## 2.4 Managing recovery codes


Roles that can use it: an operator, for their own account.

1. Click the operator menu at the top right, then **Autentikasi dua langkah**.
2. The alert **Autentikasi dua langkah aktif** (Two-step authentication active) shows **Sisa kode pemulihan** (Recovery codes left).

   ![Operator two-step authentication page when active, with the number of recovery codes and the Generate new recovery codes button](~/assets/guide/web/platform-two-factor-status.webp)

3. Click **Buat kode pemulihan baru** (Generate new recovery codes) when few codes are left or the copy is no longer safe.
4. The dialog **Buat kode pemulihan baru?** (Generate new recovery codes?) states that the old codes stop working at once. Fill in **Kata sandi operator** (Operator password) if the dialog asks for it ([section 2.5](/docs/guides/platform/sign-in-and-account-security/)), then click **Buat kode baru** (Generate new codes).
5. Store the 8 new codes before you leave the page.

A recovery code that is used is recorded in the **Audit platform** (Platform audit) as **Kode pemulihan dipakai** (Recovery code used). Regenerating the codes is recorded as **Kode pemulihan dibuat ulang** (Recovery codes regenerated).

The operator panel has no button to turn off 2FA. The 2FA reset on a company page applies only to tenant users, not to operators.


## 2.5 Password confirmation for sensitive actions


The platform password confirmation is separate from the password confirmation of tenant users. One confirmation is valid for 5 minutes in the operator session and covers all sensitive actions, not only the dialog where you typed the password.

A dialog that asks for **Kata sandi operator** asks for it once. After it succeeds, the next sensitive dialogs within 5 minutes do not show that field and show "Terkonfirmasi sampai HH.mm" (Confirmed until HH.mm) (the time in your browser). If the 5 minutes run out while a dialog is open, the field appears again. The server checks this limit on every action, so hiding the field only saves typing.

For actions without that field, for example **Mode ubah** (Edit mode) on the support banner, the server opens the **Konfirmasi kata sandi** (Confirm password) page when the last confirmation is more than 5 minutes old. Fill in **Kata sandi**, then click **Konfirmasi** (Confirm). Inbils returns to the page you opened before you were asked to confirm, or to the **Dasbor** if that page is not part of the panel. From the support banner, Inbils returns to the same tenant page. Click **Mode ubah** again.

A wrong password shows "Kata sandi tidak sesuai." (The password does not match.) Five failures per operator and address within one minute hold the next attempts with "Terlalu banyak percobaan. Coba lagi dalam N menit." The password is sent only in the request body. Inbils does not store it in the URL, the audit, Inertia props or the browser history.

A summary of the actions is in [section 13.1](/docs/guides/platform/appendix/).


## 2.6 Session and signing out


The operator session ends after 30 minutes without activity. Requests received during **Akses dukungan** (Support access) renew the platform activity, but a support session still has an absolute limit of 30 minutes from its start.

If the operator session ends because of inactivity, Inbils opens the sign-in page with the message "Sesi Anda telah berakhir. Silakan masuk kembali." (Your session has ended. Please sign in again.) and records **Sesi operator berakhir** (Operator session ended). An operator account that is deactivated is also signed out with the same message, but without an audit row.

To sign out, click the operator menu, then **Keluar** (Sign out). If **Akses dukungan** is active, signing out the operator also ends that access.
