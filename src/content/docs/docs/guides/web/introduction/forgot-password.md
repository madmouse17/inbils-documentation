---
title: "1.3 Forgot password"
description: "Reset a forgotten password with an emailed link, and fix the usual problems such as expired links or missing emails."
---

Roles that can use it: all users. Inbils sends a link to the account email, so the email on your account must still be active.

1. On the sign-in page, click **Lupa kata sandi?** (Forgot password?).
2. Fill in your account **Email**, then click **Kirim tautan** (Send link).

   ![Forgot password page with the Email field, the Kirim tautan (Send link) button, and the Kembali ke halaman masuk (Back to the sign-in page) link](~/assets/guide/web/forgot-password.webp)

3. Read the green message that appears: "Jika ada akun dengan alamat email tersebut, kami telah mengirim tautan pengaturan ulang kata sandi." (If an account with that email address exists, we have sent a password reset link.) The message is the same for registered and unregistered emails, so nobody can guess which accounts exist.
4. Open the email with the subject **Pengaturan Ulang Kata Sandi** (Password Reset) and click the **Atur Ulang Kata Sandi** (Reset Password) button. The link is valid for 60 minutes.
5. On the **Atur ulang kata sandi** (Reset password) page, the **Email** field is already filled in. Fill in **Kata sandi baru** (New password) and **Ulangi kata sandi baru** (Repeat new password) with the same password (at least 8 characters), then click **Simpan kata sandi** (Save password).
6. Inbils takes you to the sign-in page with the green message "Kata sandi Anda telah diatur ulang." (Your password has been reset.) Sign in with the new password.

Customer accounts live in the app, not on the web. If you set a password from the link in a customer account email, Inbils takes you to the sign-in page with the message "Kata sandi tersimpan. Masuk lewat aplikasi Inbils." (Password saved. Sign in through the Inbils app.) and **Email** already filled in. The **Buka aplikasi Inbils** (Open the Inbils app) button above the field opens the customer app: through the Play Store link if the company has set one, or, if not, directly to the app on the Android phone (if the app is not installed, Chrome opens its Play Store page). On a computer without a Play Store link, the button is not shown.

## Common errors

- The message "Token pengaturan ulang kata sandi tidak valid." (The password reset token is not valid.) under **Email** means the link is older than 60 minutes or has already been used. Repeat from step 1 and use the link from the latest email.
- An address in the **Email** field that has no account gets the same message as a wrong link, "Token pengaturan ulang kata sandi tidak valid.", so this page does not reveal which addresses have an account. Make **Email** match the address that received the link, or ask for a new link.
- The message "kata sandi minimal 8 karakter." (the password must be at least 8 characters.) or "Konfirmasi kata sandi tidak cocok." (The password confirmation does not match.) appears under **Kata sandi baru**. Make the password longer, or make both fields the same.
- The email does not arrive: wait a few minutes, check the spam folder, then request it again. A second request within 60 seconds does not send a new email, but the screen still shows the same message. One IP address is limited to six requests per minute.
- After the password changes, the Android app login of the same account ends. Sign in again in the app with the new password.
