---
title: "8.9 Integrations (Integrasi)"
description: "Connect your company's own Midtrans, WhatsApp, SMTP email and RADIUS accounts, test each connection and read the app notification status."
---

The **Integrasi** (Integrations) menu stores the service accounts of the active company: Midtrans for online invoice payment, WhatsApp for automatic messages, Email (SMTP) for email to customers and staff, and RADIUS for customer network accounts. Each company uses its own accounts, so the payments, messages, email and network accounts of one ISP do not go through another ISP's accounts. Other screens call it Pengaturan → Integrasi (Settings → Integrations), for example the link in the **WhatsApp** card in **Pengaturan Perusahaan** (Company settings).

Roles that can use it: admin. Permissions: `company.integrations.manage`. Managers and staff do not hold it, so the **Integrasi** item does not appear in their sidebar and the screen address is refused. Changes apply to the active company ([section 1.6](/docs/guides/web/introduction/switch-company/)). A subsidiary fills in its own accounts: nothing is inherited from the parent company.

## Opening and reading the page

1. In the sidebar, open the **Administrasi** (Administration) group, then click **Integrasi**. The page holds four cards in order: **Midtrans**, **WhatsApp**, **Email** and **RADIUS**, then the read-only card **Notifikasi aplikasi (Firebase)** (App notifications (Firebase)).

   ![Integrations page: the two-step authentication banner and the Midtrans card with the status badge, the Active switch, Server key, Mode, Notification URL, and the Save and Test connection buttons](~/assets/guide/web/company-integrations.webp)

2. Read the status line below each card's title. The badges:
   - **Tidak diisi** (Not filled in): the card has no data, or the stored secret can no longer be read (see Common errors). The text next to it: "Belum dikonfigurasi" (Not configured).
   - **Terisi** (Filled in): data is saved but has not been tested since it was last changed. Text: "Belum pernah diuji" (Never tested).
   - **Terverifikasi** (Verified): the last connection test succeeded. Text: "Terakhir diuji" (Last tested) followed by the date and time.
   - **Galat** (Error): the last connection test failed. A red box inside the card writes the reason.
3. While Midtrans, WhatsApp or RADIUS is not filled in and enabled for this company, that service is off for this company only: the customer app does not offer online payment, WhatsApp messages are recorded as skipped, and network accounts are not written to RADIUS. There is no fallback to another company's account. Only Email has a fallback, the platform sender (see the Email section below).

## Saving a card

Each card has an **Aktif** (Active) switch, fields, a **Simpan** (Save) button, and a **Uji koneksi** (Test connection) button. Secrets (server key, access token, app secret, verify token, password) can only be replaced, not read again.

1. Fill in or change the fields. A secret box shows its state inside the field: "Belum diisi" (Not filled in), "tersimpan" (saved), or "tersimpan (••••1234)" (saved (••••1234)) which shows the last four characters of a long secret. The help text "Kosongkan bila tidak diganti." (Leave empty if not replaced.) means an empty box keeps the stored secret. A secret you type replaces the old one.
2. Click **Simpan**. The **Konfirmasi dengan kode autentikasi** (Confirm with authentication code) dialog opens. Fill in **Kode autentikasi** (Authentication code) with the 6-digit code from the authenticator app, or one recovery code, then click **Simpan** in the dialog. The **Batal** (Cancel) button closes the dialog without saving.
3. The green toast "Integrasi Midtrans disimpan." (Midtrans integration saved.) appears (the card name changes with the card). The secret boxes are emptied again.
4. Click **Uji koneksi** to check the newly saved data. The badge moves from **Terisi** to **Terverifikasi** or **Galat**.

Saving rules:

- Two-step authentication on your account must be on ([section 1.4](/docs/guides/web/introduction/two-factor-authentication/)). If not, the yellow banner "Aktifkan autentikasi dua langkah di Profil untuk menyimpan perubahan." (Enable two-step authentication in Profile to save changes.) appears with the **Buka Profil** (Open Profile) button, and **Simpan** cannot be clicked.
- Every save asks for a code, including when you only turn off the **Aktif** switch. A code is valid only once and changes every 30 seconds, so two saves in a row within one 30-second window need a second code. The message "Kode autentikasi salah atau sudah dipakai." (The authentication code is wrong or already used.) means the code has been used or is wrong. Field errors are refused first and do not use up the code.
- Changing a field or secret removes the **Terverifikasi** status: the card returns to **Terisi** until you test again. Saving without changing anything does not remove it.
- Every save is recorded in the audit with the names of the fields that changed, never with their values.
- A card that is **Aktif** must be complete. A required secret that is empty is refused with "Wajib diisi untuk mengaktifkan integrasi ini." (Required to enable this integration.) A card that is not active may be saved half filled in.

## Midtrans

Online invoice payments go into this company's Midtrans account.

- **Server key**: secret. It must start with `Mid-server-` (production) or `SB-Mid-server-` (sandbox). Required when **Aktif**.
- **Mode**: **Sandbox** (initial value) or **Produksi** (Production). The mode must match the key. A sandbox key with **Produksi** is refused with "Server key sandbox (SB-Mid-server-) tidak bisa dipakai di mode produksi." (A sandbox server key (SB-Mid-server-) cannot be used in production mode.), and a production key with **Sandbox** is refused with "Server key produksi (Mid-server-) tidak bisa dipakai di mode sandbox." (A production server key (Mid-server-) cannot be used in sandbox mode.)
- **URL notifikasi** (Notification URL): read-only, with a copy button. Its form is `<alamat aplikasi>/webhooks/midtrans/<kode acak perusahaan>`. Inbils sends this URL to Midtrans with every payment if the app address uses https, so the Midtrans dashboard does not need to be changed. Fill in **Payment Notification URL** in the Midtrans dashboard with this URL if you want the dashboard to match what the app sends. Each company has its own URL, and Midtrans is accepted only if it is signed with that company's server key. The old URL `<alamat aplikasi>/webhooks/midtrans` still works for payments already in progress during the transition period.
- **Uji koneksi** asks Midtrans for the status of a sample order. If Midtrans answers "tidak ditemukan" (not found), the key is accepted. Possible error messages: "Server key ditolak Midtrans. Periksa key dan mode: sandbox memakai awalan SB-Mid-server-, produksi Mid-server-." (The server key was rejected by Midtrans. Check the key and mode: sandbox uses the prefix SB-Mid-server-, production Mid-server-.) and "Midtrans tidak dapat dihubungi dalam 5 detik." (Midtrans could not be reached within 5 seconds.)
- On a production host, a sandbox key does not accept payments unless the server administrator specifically approved it when importing from `.env`. The reason: a test payment would be recorded as a real payment.

## WhatsApp

WhatsApp notifications are sent from this company's own number.

- **ID nomor (phone_number_id)** (Number ID (phone_number_id)): 5 to 30 digits from Meta. Required when **Aktif**.
- **Access token**, **App secret** and **Verify token webhook** (Webhook verify token): secrets, all three required when **Aktif**. **Verify token webhook** is at least 16 characters.
- **URL webhook** (Webhook URL): read-only, with a copy button. One and the same address (`<alamat aplikasi>/webhooks/whatsapp`) applies to all companies. Paste it in Meta App → WhatsApp → Configuration together with this company's verify token. Inbils routes every call to the company that owns that **ID nomor** and checks the signature with that company's **App secret**. Several companies in one group may use the same number, and each company still uses its own app secret and verify token.
- A `STOP` or `BERHENTI` reply from a customer only revokes the customer's consent in the company that owns that number ([section 4.1](/docs/guides/web/customers-and-services/customers/)). Other companies with the same customer phone number are not affected.
- **Uji koneksi** fetches the number profile from Meta. Possible error messages: "Access token ditolak Meta (kedaluwarsa atau dicabut)." (The access token was rejected by Meta (expired or revoked).), "phone_number_id tidak ditemukan atau bukan milik token ini." (The phone_number_id was not found or does not belong to this token.), and "Token tidak punya izin whatsapp_business_messaging untuk nomor ini." (The token does not have the whatsapp_business_messaging permission for this number.) The connection test cannot check the **App secret**. A wrong app secret only shows as a rejected webhook call (code 403) in the server log, so ask the server administrator to check that log if message statuses never change.
- Other rules do not move here: the switch, message types, quiet hours and monthly limit stay in **Pengaturan Perusahaan** ([section 8.1](/docs/guides/web/administration/company/)).

## Email

Email to customers and staff is sent from this company's SMTP server.

- **Host SMTP** (SMTP host) and **Alamat pengirim** (Sender address): required when **Aktif**. **Port** (1 to 65535, initial value 587), **Enkripsi** (Encryption) (**STARTTLS** or **TLS**), **Nama pengguna** (Username), **Kata sandi** (Password) and **Nama pengirim** (Sender name) are optional.
- While the card is inactive, or has never been filled in, email is sent from the platform sender. The card writes its address: "Selama nonaktif, email dikirim dari pengirim platform …" (While inactive, email is sent from the platform sender …). Email never fails to send just because the card is empty. The server address stays the platform's, but the sender name uses your company's name, and the email header and footer mention your company (with the logo if the logo is stored as a public file).
- Email that contains a credential link (password reset, email verification, company admin invitation, staff invitation, new customer access link) always goes out through the platform sender, not through this company's SMTP, and uses the name Inbils as the sender. Its content may mention your company's name. One account can be registered in several companies, and one company's SMTP operator must not read links that open an account in another company.
- **Uji koneksi** sends a test email to your account's email address, with the subject "Email uji Inbils" (Inbils test email). Check your inbox and spam folder. Possible error messages: "Login SMTP ditolak. Periksa nama pengguna dan kata sandi." (SMTP login was rejected. Check the username and password.), "Gagal membuka TLS ke server SMTP. Periksa enkripsi dan port." (Failed to open TLS to the SMTP server. Check the encryption and port.), and "Server SMTP menolak alamat pengirim …" (The SMTP server rejected the sender address …).

## RADIUS

Customer network accounts are written to this company's FreeRADIUS database. Each ISP uses its own FreeRADIUS database.

- **Host**, **Database** (letters, digits and underscores) and **Nama pengguna**: required when **Aktif**. **Port** (initial value 3306) and **Kata sandi** are optional.
- While the card is inactive, nothing is read from or written to the RADIUS database, and no disconnect-session request is sent. Network accounts stay **Menunggu** (Pending) with the reason ([section 4.1](/docs/guides/web/customers-and-services/customers/), **Mengelola akun jaringan** (Managing network accounts)), and the **Router NAS** (NAS routers) and **Akses jaringan** (Network access) screens show the warning "RADIUS belum dikonfigurasi untuk perusahaan ini." (RADIUS is not configured for this company.)
- **Uji koneksi** opens a connection to the database, runs a simple check, then confirms that the six FreeRADIUS tables exist: `radcheck`, `radreply`, `radusergroup`, `radgroupreply`, `nas` and `radacct`. Possible error messages: "Login database RADIUS ditolak. Periksa nama pengguna dan kata sandi." (RADIUS database login was rejected. Check the username and password.), "Database … tidak ada di server RADIUS." (Database … does not exist on the RADIUS server.), and "Tabel FreeRADIUS tidak lengkap: …" (FreeRADIUS tables are incomplete: …).
- The router shared secret (RADIUS secret) is not filled in here. It stays on the **Router NAS** screen ([section 5.3](/docs/guides/web/network/nas-routers/)).

## Host address restrictions

The **Host SMTP** and the RADIUS **Host** refuse addresses that point to Inbils' own server or to cloud metadata services. The message "Host tidak diizinkan: alamat lokal, alamat metadata, atau nama host yang tidak valid." (Host not allowed: local address, metadata address, or invalid host name.) appears for loopback addresses (`127.x`, `localhost`), link-local addresses (`169.254.x`, `fe80::`), unspecified addresses, and multicast. ISP local network addresses such as `10.x`, `172.16.x` and `192.168.x` are allowed because that is where RADIUS and SMTP servers usually are. The connection test checks the host name once more after it is resolved to an address, and refuses a name that now points to a forbidden address.

This check is repeated every time Inbils opens a connection to that server, not only at **Simpan**. On a production server, a host equal to Inbils' own database, Redis or SMTP (or a name that points there) is also refused. A refused host makes the card behave as if it were not filled in: email goes out through the platform sender and RADIUS is not used. The red box on the card writes "Host … tidak diizinkan (alamat lokal atau metadata)." (Host … is not allowed (local or metadata address).) for all those causes, so the screen does not say which address belongs to the platform. If your RADIUS really is on a server with the same name as Inbils' database, ask the server administrator to give it another name or address.

## Connection test

1. Click **Uji koneksi** on the card. The button is active if the card is not **Tidak diisi**. If nothing is saved yet, the server answers "Simpan pengaturan Midtrans dulu." (Save the Midtrans settings first.) (the service name matches the card).
2. The button changes to **Menguji…** (Testing…) and the status line shows a spinner. The connection test runs in the background queue, not on the page, so the page does not wait for the service provider. The page checks the result every 2 seconds.
3. When the result arrives, the badge changes to **Terverifikasi** or **Galat**, and the status line writes the time of the last test.
4. The connection test always uses the data that is already saved, not what you are typing. Save first, then test.
5. One card runs only one test at a time: a second click while a test runs shows the toast "Uji koneksi Midtrans sedang berjalan." (The Midtrans connection test is running.) The click limit is 5 per minute per user. The result is recorded in the audit with its message only.
6. If there is no result after 30 seconds, the blue banner "Uji koneksi masih berjalan; muat ulang halaman nanti." (The connection test is still running; reload the page later.) appears and the page stops checking. Reload the page later. A test stopped by the queue writes "Uji koneksi terhenti sebelum selesai." (The connection test stopped before it finished.) and the badge becomes **Galat**.

## App notifications (Firebase)

The last card shows the state of notification delivery to the technician app and the customer app. One Firebase project is owned by the platform and used by all companies, so this card is read-only and has no fields.

![App notifications (Firebase) card with the Server credentials row and the Last delivery succeeded row](~/assets/guide/web/company-integrations-firebase.webp)

- **Kredensial server** (Server credentials): **Terpasang** (Installed) or **Belum terpasang** (Not installed). **Terpasang** means the credential file path has been set on the server, not proof that Firebase accepts messages. The server administrator installs it, not this screen (see [`docs/operations/push-notifications.md`](https://github.com/madmouse17/isp_inbils/blob/main/docs/operations/push-notifications.md)).
- **Pengiriman terakhir berhasil** (Last delivery succeeded): the date and time of the last notification Firebase accepted for this platform, or **Belum ada** (None yet). Only this row proves Firebase works.
- Test from a phone: in the app, open **Akun** (Account) → **Notifikasi uji** (Test notification) and tap **Kirim notifikasi uji** (Send test notification) (technician guide [chapter 6](/docs/guides/web/inventory/item-requests/) and customer guide [chapter 7](/docs/guides/web/finance-and-reports/invoices/)). The result shows whether that phone receives notifications, and suggests a fix if not.

## After the update: import from .env

Before this feature, Midtrans, WhatsApp and RADIUS used one account for the whole installation from the `.env` file on the server. Now `.env` is only an import source. After the update is installed, the server administrator runs once per company:

```bash
php artisan inbils:integrations:import-env --company=<kode perusahaan>
```

The command copies the `MIDTRANS_*`, `WHATSAPP_*` and `RADIUS_*` values to that company's cards, enables them, and prints the masked values. Email is not imported: the `.env` sender stays the platform sender. Before the import is run, or before an admin fills in the cards, Midtrans and WhatsApp are off for that company. After the import, click **Uji koneksi** on each card to confirm the result.

## Common errors

- **Simpan** cannot be clicked and the yellow banner asks for two-step authentication: turn on 2FA in **Profil** (Profile) ([section 1.4](/docs/guides/web/introduction/two-factor-authentication/)).
- "Kode autentikasi salah atau sudah dipakai.": wait for the next code in the authenticator app, or use one recovery code. A phone clock that drifts from the real time also gets codes refused.
- A card is labelled **Tidak diisi** although it was saved before, and the secret box says "Belum diisi": the server lost the application encryption key (`APP_KEY`) or the key was changed without `APP_PREVIOUS_KEYS`, so the stored secrets cannot be read. Fill in all that card's secrets again, then **Simpan**. That save replaces the old data. The server administrator keeps `APP_KEY` with a separate backup, and when rotating it puts the old key in `APP_PREVIOUS_KEYS` so secrets stay readable.
- A red message below a field at **Simpan**: read its text. Common ones are "Wajib diisi untuk mengaktifkan integrasi ini.", the Midtrans key and mode rules above, and "Host tidak diizinkan: ...".
- Status **Galat** after a test: read the red box on the card. Fix the fields, **Simpan**, then **Uji koneksi** again.
- WhatsApp is **Terverifikasi** but message statuses do not move from **Antrean** (Queued) or **Terkirim** (Sent): the connection test does not check the **App secret** and **URL webhook**. Make sure both match what is in the Meta App, and ask the server administrator to check the webhook log.
- The **Integrasi** page refuses with the note "Konteks perusahaan diperlukan." (A company context is required.): there is no active company. Choose a company ([section 1.6](/docs/guides/web/introduction/switch-company/)).
