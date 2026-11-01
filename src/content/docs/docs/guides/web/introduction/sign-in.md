---
title: "1.2 Signing in"
description: "Sign in to the Inbils web app, understand what happens after you sign in, and complete the first-time company setup wizard."
---

Accounts are created by an admin in the Pengguna (Users) menu ([section 8.5](/docs/guides/web/administration/users/)). The web does not offer self-registration. The admin does not type a password for a staff account: Inbils sends an invitation email to the account address, and the account owner sets the password with the **Atur kata sandi** (Set password) button in that email. The invitation link is valid for 60 minutes. If the invitation is lost or expired, the admin uses **Kirim ulang undangan** (Resend invitation) on the user detail page ([section 8.5](/docs/guides/web/administration/users/)), or the account owner uses **Lupa kata sandi?** (Forgot password?) ([section 1.3](/docs/guides/web/introduction/forgot-password/)).

Roles that can use it: all users with an active account. An inactive account is rejected with the same message as a wrong password.

1. Open the Inbils address in a browser. Your admin or IT team gives you the address.
2. Fill in **Email** and **Kata sandi** (Password).

   ![Inbils sign-in page with the inbils logo, the title Masuk (Sign in), the Email and Kata sandi (Password) fields, the Ingat saya (Remember me) checkbox, the Lupa kata sandi? (Forgot password?) link, and the Masuk (Sign in) button](~/assets/guide/web/login.webp)

3. Tick **Ingat saya** (Remember me) if you use a personal device. Without this tick, the session ends after 120 minutes without activity (a default setting that the server admin can change).
4. Click **Masuk** (Sign in).

After you click **Masuk**, there are several possible outcomes:

- Success: Inbils opens the page you were heading to earlier, or **Dasbor** (Dashboard) ([chapter 2](/docs/guides/web/dashboard/queue-cards/)).
- The account uses 2FA: Inbils opens the **Autentikasi dua langkah** (Two-step authentication) page ([section 1.4](/docs/guides/web/introduction/two-factor-authentication/)).
- The account has no web access permission: Inbils opens the **Gunakan aplikasi Inbils** (Use the Inbils app) page for technicians and customers, or **Akun ini belum punya akses aplikasi web** (This account has no web app access yet) for accounts with no access at all ([section 1.1](/docs/guides/web/introduction/who-uses-this-guide/)).
- New installation without a company: Inbils opens the **Pengaturan awal** (Initial setup) page (described below). The wizard does not appear again once a company exists.

To sign out, click your name at the top right, then **Keluar** (Sign out).

## Initial setup on a new installation

The **Buat perusahaan Anda** (Create your company) card has four steps: **Data perusahaan** (Company data), **Pengaturan sistem** (System settings), **Admin pertama** (First admin) and **Konfirmasi** (Confirmation). The Enter key in steps 1 to 3 moves you to the next step, the same as **Lanjut** (Continue). An empty required field is rejected with a red message above the form before you move to the next step.

1. In **Data perusahaan**, fill in **Nama perusahaan** (Company name) and **Kode perusahaan** (Company code), which are required. **Email**, **Telepon** (Phone), **Website**, **Logo** and **Alamat** (Address) may be left empty. Click **Lanjut**.
2. In **Pengaturan sistem**, choose **Mata uang** (Currency) (IDR, USD, SGD or EUR) and **Zona waktu** (Time zone) (type to search, then choose). Fill in **Format tanggal** (Date format) (for example d M Y or d/m/Y) and **Format tanggal dan jam** (Date and time format) (for example d M Y H:i). All four are pre-filled with default values and all are required. Click **Lanjut**.
3. In **Admin pertama**, fill in **Nama admin** (Admin name). **Email admin** (Admin email) is filled in automatically with your account email and cannot be changed. Click **Lanjut**.
4. In **Konfirmasi**, check the summary, then click **Selesaikan** (Complete). Click **Kembali** (Back) to correct an earlier step.

Inbils shows a green toast "Pengaturan awal selesai." (Initial setup complete.) and opens **Dasbor**. The account that completes the wizard becomes the new company admin. The name, code, contact, logo and address can be changed again in the **Perusahaan** (Company) menu, and the date formats in **Pengaturan Perusahaan** (Company settings) ([section 8.1](/docs/guides/web/administration/company/)). The web screens do not provide a way to change **Mata uang** and **Zona waktu**, so check both before you click **Selesaikan**.

## Common errors

- The message "Email atau kata sandi salah." (Wrong email or password.) means the email or password is wrong, or your account is inactive. Check how you typed the email, then ask the admin to check the account status if the password is correct.
- The message "Terlalu banyak percobaan. Coba lagi dalam N menit." (Too many attempts. Try again in N minutes.) appears after five failed attempts from the same address and email. Wait until those minutes pass, then try again.
- The message "Akun perusahaan Anda sedang ditangguhkan. Hubungi dukungan." (Your company account is suspended. Contact support.) appears when the email and password are correct, but every company you may enter is suspended. Contact the server admin. The same message appears under **Email** if your company is suspended while you are working and there is no other company you can enter: Inbils signs you out and opens the sign-in page.
- The **Sesi berakhir** (Session expired) page appears when the sign-in page has been open too long. Click **Muat ulang halaman** (Reload page), then sign in again.
- In **Pengaturan awal**, an incomplete step is rejected with a red message, for example "Nama dan kode perusahaan wajib diisi." (Company name and code are required.) In the **Konfirmasi** step, if the server rejects the data (for example the company code is already in use), the message "Data belum bisa disimpan:" (The data cannot be saved yet:) appears followed by the reason. Click **Kembali** to go to the step concerned and correct it.
