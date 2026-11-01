---
title: "1.7 Profile and password"
description: "Change your name, email and password, manage email notifications, and delete your own account from the Profile page."
---

Profile holds the data of your own account. This page is the same for all roles.

1. Click your name at the top right, then **Profil** (Profile).

   ![Profile page with the sections Data akun (Account data), Ganti kata sandi (Change password) and Autentikasi dua langkah (Two-step authentication)](~/assets/guide/web/profile.webp)

2. To change your name or email, change the **Nama** (Name) or **Email** field in the **Data akun** section, then click **Simpan** (Save). The text "Tersimpan." (Saved.) appears next to the button.
3. To change your password, fill in **Kata sandi saat ini** (Current password), **Kata sandi baru** (New password) and **Ulangi kata sandi baru** (Repeat new password) in the **Ganti kata sandi** section, then click **Simpan**. The new password must be at least 8 characters. All three fields are empty again after saving.
4. The **Autentikasi dua langkah** section is explained in [section 1.4](/docs/guides/web/introduction/two-factor-authentication/).
5. The **Notifikasi email** (Email notifications) section is shown only if your duties include approving, preparing or handing over item requests, receiving returns, or settling differences. Turn on **Ringkasan harian permintaan barang dan retur** (Daily summary of item requests and returns) to receive one email every morning about the queues waiting for you. If the switch is off, per-event notifications still appear in the bell, and notifications for technicians also use push. There is no per-event email.
6. The **Hapus akun** (Delete account) section deletes your account, and you cannot restore a deleted account yourself. Click **Hapus akun**, fill in **Kata sandi** (Password) in the **Hapus akun Anda?** (Delete your account?) dialog, then click **Hapus akun** once more. Click **Batal** (Cancel) to cancel. Do not do this unless an admin asks for it. To close access, it is safer to ask an admin to deactivate the account ([section 8.5](/docs/guides/web/administration/users/)).

## Common errors

- The message "Kata sandi saat ini salah." (The current password is wrong.) means the old password you typed is wrong. The same message appears in the **Hapus akun Anda?** dialog if the password is wrong.
- The message "Konfirmasi kata sandi tidak cocok." (The password confirmation does not match.) under **Kata sandi baru** means **Kata sandi baru** and **Ulangi kata sandi baru** differ. The message "kata sandi minimal 8 karakter." (the password must be at least 8 characters.) means the new password is too short.
- The message "email sudah digunakan." (the email is already in use.) or "email harus berupa huruf kecil." (the email must be lowercase.) under **Email** means the address is already used by another account, or is written with capital letters.
- Changing the password ends the Android app logins of your account. Sign in again in the app.
- **Hapus akun** is rejected if the account has ever submitted or checked a stock adjustment ("Pengguna yang pernah mengajukan atau memeriksa penyesuaian stok tidak bisa dihapus. Nonaktifkan akunnya." (A user who has submitted or checked a stock adjustment cannot be deleted. Deactivate the account.)), or is recorded as having acquired a customer ("Pengguna yang dicatat memperoleh pelanggan tidak bisa dihapus. Nonaktifkan akunnya." (A user recorded as having acquired a customer cannot be deleted. Deactivate the account.)). The Profile screen does not show these reasons: the dialog stays open and only the red toast "Data gagal disimpan. Periksa input." (The data could not be saved. Check the input.) appears. Ask an admin to deactivate that account.
- Changing the email does not change the password, but the new email is used to sign in and to receive forgot-password links. Make sure the new address is correct.
