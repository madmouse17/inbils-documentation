---
title: "5.3 NAS routers (Router NAS)"
description: "Register MikroTik routers as RADIUS clients, check their FreeRADIUS status, manage customer network accounts and handle isolir."
---

NAS routers (**Router NAS**) is the list of company routers that ask FreeRADIUS to check customer logins before opening the internet. Open this menu when you register a new router, change its address or secret, or see the customers currently online on a router.

Roles that can use it: admin, manager and staff to view, only admin to manage. Permissions: `network_asset.nas.view` opens the menu, the list and the details. `network_asset.nas.manage` registers, edits and deletes routers. With the built-in roles, the admin holds both, while the manager and staff hold only `network_asset.nas.view`. A router can be registered only from an asset of type Router that has a **IP manajemen** (Management IP) ([section 5.2](/docs/guides/web/network/network-assets/)), or be created together with its registration by a user who also holds Create network asset (`network_asset.create`). The company code must contain 1 to 24 letters, digits or hyphens, because that code becomes the RADIUS realm.

## Opening and reading the list

1. In the sidebar, open the **Jaringan** (Network) group, then click **Router NAS**.
2. Read the list.

   - The **Cari** (Search) box (hint `Kode, nama, atau alamat NAS` (Code, name, or NAS address)) searches the NAS address, and the code, name and **IP manajemen** of the router asset.
   - Columns: **Router** (asset code with the name below it, a link to the details, sortable), **Lokasi** (Location), **Alamat NAS** (NAS address), **Port CoA** (CoA port), **RADIUS** and **Aksi** (Actions).
   - The badge in the **RADIUS** column shows the result of writing the router to FreeRADIUS: **Tertulis ke RADIUS** (Written to RADIUS), **Menunggu ditulis** (Waiting to be written) (no success or failure recorded yet) or **Gagal ditulis** (Write failed) (the attempt failed, the reason is in the details). The list does not check router traffic, so **Tertulis ke RADIUS** only means the row has been written. Whether FreeRADIUS already serves that router is visible in the badge on the details page.
   - Holders of `network_asset.nas.manage` see the **Ubah** (Edit) button on each row, with the **Aksi lainnya** (More actions) menu that holds **Lihat detail** (View details), and the **Daftarkan router** (Register router) button at the top right. Holders of only `network_asset.nas.view` see the **Lihat** (View) button.
   - An empty list shows `Belum ada router NAS` (No NAS routers yet), or `Tidak ada router NAS yang cocok` (No matching NAS routers) with the **Reset filter** (Reset filters) button if the search finds nothing.

   ![The NAS routers list with the Search box and the RADIUS column](~/assets/guide/web/nas-devices.webp)

3. Click the router code or **Lihat** (or **Lihat detail** in the **Aksi lainnya** menu) to open the details.

## Registering a router

First prepare an asset of type Router with a **IP manajemen** in Network assets (**Aset Jaringan**) ([section 5.2](/docs/guides/web/network/network-assets/)), or create the asset directly from this form (see step 2). Also prepare the same secret as the one installed on the router.

1. Click **Daftarkan router**.
2. Choose **Aset router** (Router asset): type the code, name or management IP (at least 2 letters), then choose. The choices hold Router assets with a management IP that are not registered yet, written as `kode - nama - lokasi` (`code - name - location`) with the management IP on the line below. The list shows 20 results at most. If there is no asset to choose and you do not hold Create network asset (`network_asset.create`), the page shows `Belum ada aset router yang tersedia. Minta pengelola aset menambahkan aset bertipe Router dengan IP manajemen di Aset Jaringan lebih dulu.` (No router assets are available yet. Ask the asset manager to add an asset of type Router with a management IP in Network assets first.) with the **Aset Jaringan** button.

   If the router is not recorded as an asset yet, a holder of Create network asset can create it from this form:

   - Click **Router belum terdaftar? Buat aset router di sini** (Router not registered? Create a router asset here). The **Aset router** choice is replaced by two required fields, **Nama router baru** (New router name) and **IP manajemen** (hint: "Alamat router di jaringan Anda. Dipakai sebagai alamat NAS dan target CoA." (The address of the router on your network. Used as the NAS address and CoA target.)), and the note "Asetnya dibuat bersama pendaftaran ini, dengan kode otomatis." (The asset is created together with this registration, with an automatic code.) If there is no router asset at all, the form uses these two fields directly.
   - Typing the **IP manajemen** fills in the **Alamat NAS** too, as long as you have not typed in that field yourself. The **IP manajemen** must be an IPv4 address.
   - Click **Pilih dari daftar aset** (Choose from the asset list) to go back to choosing an existing asset. This button exists only if there are router assets that can be chosen.
   - The asset and its registration are created in one step, so if one of them is refused, neither is saved. The new asset has the status Tersedia (Available), no location, and its management IP is recorded in the IP addresses (**Alamat IP**) register ([section 5.4](/docs/guides/web/network/ip-addresses/)). An address that is already used is refused with a message such as `<alamat> sudah dipakai aset <kode>.` (`<address>` is already used by asset `<code>`.) below **IP manajemen**.
   - The server requires Manage NAS routers (`network_asset.nas.manage`) and, for a new asset, Create network asset (`network_asset.create`).
3. Fill in the form on the **Router** card:
   - **Alamat NAS**: required, the IPv4 address that FreeRADIUS sees as the origin of the router requests. It fills in automatically from the management IP of the asset you chose and you can change it. The address must be unique in the whole system, not only in your company.
   - **Port CoA**: required, an integer from 1 to 65535, initial value `1700`. This is the `/radius incoming` port on MikroTik.
   - **Secret RADIUS**: required, 8 to 60 printable ASCII characters without spaces, the same as the secret on the router. Click **Buat secret acak** (Generate random secret) to fill in 32 random letters and digits created in your browser, then **Salin secret** (Copy secret) to take it to the router. A generated secret exists only in the form until you save, so copy it before you click **Daftarkan router**.
   - **Realm**: read only. It holds the company code in lowercase. Customers sign in with the username `nama@realm`.

   The **Perintah RouterOS** (RouterOS commands) card below the form builds the commands to paste in the router terminal: `/radius add ...`, `/radius incoming set accept=yes port=...` and `/ppp aaa set use-radius=yes accounting=yes interim-update=5m`, with the secret and **Alamat NAS** from the form. Fill in **Alamat FreeRADIUS dari router** (FreeRADIUS address from the router) (the address the router uses to reach FreeRADIUS) once. Inbils does not store it on the server and only remembers it in this browser. Click **Salin perintah** (Copy commands).
4. Click **Daftarkan router**. Inbils opens the router details and the toast "Router NAS didaftarkan." (NAS router registered.) appears. Click **Batal** (Cancel) to return to the list without saving.

   ![The Register NAS router form with the fields New router name and Management IP, replacing the Router asset choice](~/assets/guide/web/nas-devices-create-asset.webp)

If RADIUS is not configured for this company yet (the **RADIUS** card in **Integrasi** (Integrations), [section 8.9](/docs/guides/web/administration/integrations/)) or its database cannot be reached, the router is still saved and a warning toast appears: `Tersimpan, tetapi RADIUS belum diperbarui: <alasan> Sinkronisasi mencoba lagi setiap 15 menit.` (Saved, but RADIUS has not been updated: `<reason>` Synchronisation retries every 15 minutes.) The **RADIUS** badge becomes **Menunggu ditulis** or **Gagal ditulis** until the write succeeds.

## Reading the router details page

The page title `Router NAS` is followed by the asset code, with the asset name and NAS address below it. The **Kembali** (Back) button always appears. **Ubah** and **Hapus router** (Delete router) appear only for holders of `network_asset.nas.manage`.

- The warning `RADIUS belum dikonfigurasi untuk perusahaan ini. Perubahan disimpan tetapi tidak dikirim ke FreeRADIUS.` (RADIUS is not configured for this company. Changes are saved but not sent to FreeRADIUS.) appears if the **RADIUS** card in **Integrasi** ([section 8.9](/docs/guides/web/administration/integrations/)) has not been filled in and activated. An admin who may open **Integrasi** sees the button **Atur di Pengaturan → Integrasi** (Set up in Settings → Integrations) in that warning. Each company fills in its own FreeRADIUS database, so this switch no longer exists in the server settings.
- The notice `Mulai ulang FreeRADIUS setelah menambah NAS ini atau mengganti secret-nya.` (Restart FreeRADIUS after adding this NAS or changing its secret.) always appears. FreeRADIUS reads the router list only at start, so the manager of the FreeRADIUS server restarts it. There is no button for it in Inbils.
- The **Status** card holds **Klien RADIUS** (RADIUS client) (badge), **Terakhir ditulis** (Last written) (time or `Belum pernah` (Never)), **Alamat NAS**, **Target CoA** (CoA target), **Realm** and **Secret RADIUS** (`Tersimpan` (Saved) or `Belum diisi` (Not filled in)). **Target CoA** is `IP manajemen:Port CoA`, the destination of session disconnect requests. Changing the **IP manajemen** of the asset changes the **Target CoA** but not the **Alamat NAS**. If the last write failed, the **Kesalahan terakhir** (Last error) box holds the reason.
- The **Perintah RouterOS** card shows the same commands as in the registration form, with the text "(secret yang Anda simpan)" (the secret you saved) in place of the secret. The secret is visible only when it is created or replaced in **Ubah**, so replace that marker with the secret you saved before pasting.
- The **Halaman isolir** (Isolir page) card holds the address of the company isolir page and the **Salin URL** (Copy URL) button, which changes to **Tersalin** (Copied) for a moment after it is clicked (see the section Automatic isolir and the isolir page).
- The **Sesi terbuka** (Open sessions) card shows up to 100 open sessions through this router, with the columns **Nama pengguna** (Username), **Alamat**, **Mulai** (Start) and **Terakhir terlihat** (Last seen) (the time of the last packet of that session). **Nama pengguna** becomes a link to the **Akses jaringan** (Network access) page if Inbils recognises the subscription. A session that has sent no packet for more than 15 minutes is not shown in this table. If empty, it says `Tidak ada sesi terbuka` (No open sessions).
- For a router that already has a model, the details also hold the **Panel router** (Router panel) card with a picture of the ports of that router ([section 5.6](/docs/guides/web/network/device-panel/)).

The **Klien RADIUS** badge on the **Status** card checks router traffic, not only the writing of its row:

| Badge | Meaning |
|---|---|
| **Aktif** | The router has sent accounting packets after its row was written, so FreeRADIUS serves it. Below the badge it says **Paket terakhir** (Last packet) followed by the date and time. |
| **Menunggu restart FreeRADIUS** | The row has been written, but the router has not sent a packet since. FreeRADIUS reads its client list only at start, so it does not know this router yet. The remark: **Menunggu FreeRADIUS dimulai ulang. Router belum mengirim paket sejak ditulis; setelah dimulai ulang, pilih Uji koneksi.** (Waiting for FreeRADIUS to restart. The router has not sent a packet since it was written; after the restart, choose Test connection.) |
| **Menunggu ditulis** | The row has never been written to RADIUS and no failure is recorded. |
| **Gagal ditulis** | The last write failed. The reason is in **Kesalahan terakhir**. |
| **Tertulis ke RADIUS** | The row has been written, but RADIUS did not answer when the page was opened, so router traffic cannot be checked. |
| **RADIUS belum dikonfigurasi** | The company has not filled in and activated the **RADIUS** card in **Integrasi**. |

The age of packets and sessions is calculated with the clock of the RADIUS database server, not the application clock. A RADIUS server in another time zone does not make packets look old or sessions look stale.

  ![The NAS router details page with the Status and Isolir page cards](~/assets/guide/web/nas-devices-show.webp)

Two buttons on this page work while RADIUS is on. **Uji koneksi** (Test connection) is on the **Status** card and appears for all holders of `network_asset.nas.view`. That button rereads the **Klien RADIUS** badge, the last packet and the **Sesi terbuka** table from RADIUS without reloading the whole page, then writes **Diperiksa** (Checked) followed by the time. **Sinkronkan ke RADIUS** (Synchronise to RADIUS) is at the top right and appears for holders of `network_asset.nas.manage`. That button queues a job that writes this router to RADIUS now, without waiting for the sweep every 15 minutes, and the toast **Sinkronisasi ke RADIUS dijadwalkan.** (Synchronisation to RADIUS scheduled.) appears. The result shows in **Terakhir ditulis** or **Kesalahan terakhir** after the queue worker finishes, so click **Uji koneksi** a moment later. A double click queues only one job, and the button is limited to 6 times per minute. A failed write is still retried by itself every 15 minutes while RADIUS is on. Inbils does not restart FreeRADIUS.

## Editing a router

1. Click **Ubah** on the list row or on the details page.
2. Change the fields on the **Ubah Router NAS** (Edit NAS Router) page. **Aset router** and **Realm** appear as text and cannot be replaced. **Alamat NAS** and **Port CoA** (required) use the same rules as the registration form. Leave **Secret RADIUS** empty to keep the stored secret, which is marked by the hint `Secret sudah tersimpan. Kosongkan untuk mempertahankannya.` (The secret is already stored. Leave empty to keep it.) To replace the secret, type a new secret or click **Buat secret acak**, then make the router match. The **Perintah RouterOS** card adjusts too.
3. Click **Simpan router** (Save router). You return to the details with the toast "Router NAS diperbarui." (NAS router updated.) Inbils rewrites to RADIUS only if the **Alamat NAS** or the secret changed. Click **Batal** to leave without saving.

## Deleting a router

1. On the details page, click **Hapus router**.
2. Read the dialog `Hapus router NAS ini?` (Delete this NAS router?), then click **Hapus** (Delete). Click **Batal** to cancel.
3. You return to the list and the toast "Router NAS dihapus." (NAS router deleted.) appears.

The deletion still goes ahead even if the router has open sessions or network accounts, because the router ends its own sessions. The Router asset in Network assets is not deleted with it. If the client row in FreeRADIUS cannot be deleted, the warning `Baris klien RADIUS tidak dapat dihapus (RADIUS dimatikan atau tidak terjangkau). Hapus dari tabel nas secara manual.` (The RADIUS client row cannot be deleted (RADIUS is off or unreachable). Delete it from the nas table manually.) appears. The server manager deletes that row from the `nas` table.

## Secrets and the audit record

- Inbils stores the router **Secret RADIUS** encrypted. The column is masked, and no page shows it: the details only write `Tersimpan` or `Belum diisi`. If the secret is forgotten, enter a new secret through **Ubah** and make the router match.
- After you submit the form, Inbils empties the secret field, also when there is a validation error. Enter the secret again on the next attempt.
- The audit log (**Log Audit**, [section 7.12](/docs/guides/web/finance-and-reports/audit-log/)) records the module **Perangkat NAS** (NAS devices): creation (`created`), changes (`updated`, with the names of the fields that changed), secret replacement (`secret_changed`), **Sinkronkan ke RADIUS** requests (`sync_requested`, with the asset code), deletion (`deleted`), and failures to write to RADIUS (`radius_failed`). The secret content is never recorded.

## Customer network accounts

A network account is the username and password that one subscription uses to sign in through a company router. One subscription has one account. The account is not tied to one router: a customer may sign in through any NAS router of the company.

Permissions: `network_asset.account.view` opens the account page, `network_asset.account.manage` creates, edits and runs **Sinkron ulang** (Resynchronise), and `network_asset.account.reveal` reveals the password. The built-in admin, manager and staff hold all three.

1. Open the subscription page ([section 4.1](/docs/guides/web/customers-and-services/customers/)), then click **Akses jaringan** on the **Aksi langganan** (Subscription actions) card. This button appears only for holders of `network_asset.account.view`. From the router details, click **Nama pengguna** on the **Sesi terbuka** card to open the same page.
2. Read the **Akses jaringan** page.

   - The **Langganan** (Subscription) card holds **Langganan**, **Status**, **Pelanggan** (Customer), **Profil kecepatan** (Speed profile) (with the RADIUS group name), **POP layanan** (Service POP) and **Status yang diharapkan** (Expected status).
   - **Status yang diharapkan** Aktif (Active) means the account exists in RADIUS with the speed group of the package. Diisolir (Isolated) means the account is in the company isolir group and its session is disconnected. The reason is written below it: `Diisolir karena ditangguhkan.` (Isolated because it is suspended.), `Diisolir karena diblokir.` (Isolated because it is blocked.), or `Diisolir karena ditangguhkan dan diblokir.` (Isolated because it is suspended and blocked.) Dihapus (Deleted) means the account is deleted from RADIUS.
   - The **Akun jaringan** (Network account) card, after the account is created, holds **Jenis layanan** (Service type), **Nama pengguna**, **Status sinkronisasi** (Synchronisation status) (Menunggu (Pending), Tersinkron (Synchronised) or Gagal (Failed), with the last reason), **Grup RADIUS** (RADIUS group), **Online**, **Alamat**, **NAS**, **Sesi mulai** (Session start), **Terakhir terlihat** and **Bulan ini** (This month) (upload and download of the current month). The rows **Alamat** to **Terakhir terlihat** appear only if RADIUS has an open session row for that account. **Terakhir terlihat** writes the time if the last packet of that session came today, or the date and time if it was longer ago. If the last packet was more than 15 minutes ago, that row writes **Data sesi lebih dari 15 menit** (Session data older than 15 minutes), and **Online** becomes **Offline**: that session is not counted as alive, for example because the router was switched off or restarted without closing its session.
   - The warning `RADIUS belum dikonfigurasi untuk perusahaan ini. Perubahan disimpan tetapi tidak dikirim ke FreeRADIUS.` appears if the **RADIUS** card in **Integrasi** ([section 8.9](/docs/guides/web/administration/integrations/)) has not been filled in and activated. Online status and usage are not available until that is done.
   - A subscription that has no account yet shows `Langganan ini belum punya akun jaringan.` (This subscription has no network account yet.) to users without `network_asset.account.manage`.

## Creating a network account

The subscription must not have the status Berhenti (Terminated), and the speed profile of its package must have a **Nama profil RADIUS** (RADIUS profile name) ([section 4.4](/docs/guides/web/customers-and-services/speed-profiles/)). Without that, the page shows the warning `Profil kecepatan paket ini belum punya nama profil RADIUS. Isi dulu di profil kecepatan sebelum membuat akun jaringan.` (The speed profile of this package has no RADIUS profile name yet. Fill it in on the speed profile before creating a network account.) and the server refuses.

1. On the **Akses jaringan** page of a subscription that has no account yet, fill in the **Buat akun jaringan** (Create network account) card:
   - **Jenis layanan**: **PPPoE** (initial value) or **Hotspot**.
   - **Nama pengguna**: required, 3 to 40 lowercase letters, digits, dots, hyphens or underscores. Inbils appends `@realm` to it, and the realm shows next to the field. The full name must be unique in the whole system. If there is a clash, `Nama pengguna ini tidak tersedia.` (This username is not available.) appears.
   - **Kata sandi** (Password): optional, 6 to 64 characters without spaces. Leave empty so that Inbils creates a 12-character password.
2. Click **Buat akun jaringan**. The toast "Akun jaringan dibuat." (Network account created.) appears.
3. If Inbils created the password, the **Kata sandi hanya tampil sekali** (Password shown only once) box shows it with the buttons **Salin kata sandi** (Copy password) and **Tutup** (Close). Copy it now: the password disappears from the screen after you click **Tutup** or leave the page.

## Editing the account, resynchronising and revealing the password

- To edit the account, fill in the **Ubah akun jaringan** (Edit network account) card: **Jenis layanan**, **Nama pengguna** (local part) and **Kata sandi**. Leave **Kata sandi** empty to keep the old one. Click **Simpan perubahan** (Save changes) (toast "Akun jaringan diperbarui." (Network account updated.)). This card is inactive if the subscription is Berhenti, with the warning `Langganan yang sudah berhenti tidak dapat punya akun jaringan.` (A terminated subscription cannot have a network account.)
- To rewrite the account to RADIUS and disconnect its open session, click **Sinkron ulang** at the top right (toast "Sinkron ulang dijadwalkan." (Resynchronisation scheduled.)). Use this button if the package speed has changed and the old session has not changed over. After the router confirms the disconnection, the page writes **Sesi diputus {jam}, menunggu router menyambung ulang.** (Session disconnected {time}, waiting for the router to reconnect.) and checks itself every 5 seconds until a new session appears. This note shows for up to 30 minutes after the disconnection. The automatic check stops after 5 minutes, and the note adds the sentence **Pembaruan otomatis berhenti; muat ulang halaman untuk memeriksa lagi.** (Automatic updates have stopped; reload the page to check again.) The check every 5 seconds also runs while the disconnection is still pending (warning **Router belum menjawab sejak {jam}. Pemutusan sesi dicoba lagi otomatis.** (The router has not answered since {time}. The session disconnection is retried automatically.)). {jam} is a time (for example `14:05`) if the event happened today, or the date and time if it was longer ago.
- The **Alamat** row on the **Akun jaringan** card holds the badge **Statis** (Static) if the subscription has a static address in IP addresses (**Alamat IP**) ([section 5.4](/docs/guides/web/network/ip-addresses/)), or **Dinamis** (Dynamic) if the router hands out the address. For a static subscription, the row **IP statis diharapkan** (Expected static IP) writes its IPAM address and prefix. If the session that is online uses another address, the warning "Sesi memakai {alamat sesi}, bukan alamat statis {alamat}. Sinkron ulang agar router memberi alamat yang benar." (The session uses {session address}, not the static address {address}. Resynchronise so that the router gives the right address.) appears. Holders of `network_asset.account.manage` see the button **Sinkron ulang dan putuskan sesi** (Resynchronise and disconnect session) in that warning, which opens the same **Sinkron ulang** confirmation.
- To see the account password, click **Tampilkan kata sandi** (Show password) at the top right. The dialog `Tampilkan kata sandi?` (Show password?) states that the password shows once and that the reveal is recorded in the audit log. Click **Tampilkan** (Show), then copy the password from the **Kata sandi hanya tampil sekali** box. Inbils records a `secret_revealed` entry in the module **Akun jaringan** before showing the password.

## Automatic isolir and the isolir page

Isolir (internet blocked while the account is suspended) stops the customer's internet service temporarily: Inbils moves the account to the isolir group in RADIUS and disconnects its session. A router that has been set up redirects isolir customers to the company isolir page. That redirect setting is done on the router, not in Inbils.

Automatic isolir runs if an admin switches on **Tangguhkan langganan yang menunggak** (Suspend overdue subscriptions) in the **Penangguhan otomatis** (Automatic suspension) section of **Pengaturan Perusahaan** (Company settings) (menu **Perusahaan** (Company), button **Pengaturan** (Settings), [section 8.1](/docs/guides/web/administration/company/)). This setting is off initially. **Batas keterlambatan** (Lateness limit) (1 to 60 days, initial value 7) sets the day limit, and **Aktifkan kembali saat tagihan lunas** (Reactivate when the invoice is paid) (initially on) sets the automatic reopening after payment.

Every day at 08:00 UTC (15:00 WIB), Inbils isolirs Aktif subscriptions that have an unpaid invoice that is more than the day limit overdue. An invoice due exactly at the limit is not enough. The subscription becomes Ditangguhkan (Suspended) with the source `overdue`, the **Log Audit** records the reason `Automatic isolir: an invoice is more than <N> days past due.`, and that subscription receives no new recurring invoice while it is Ditangguhkan.

The address of the isolir page is on the **Halaman isolir** card in the router details, and its form is `/isolir/` followed by the company code. This page is public, without login and without customer data. A wrong code or an inactive company gives a 404 page. The page shows both of the following possibilities because the URL carries no customer identity:

- Invoice section: "Ada tagihan yang belum dibayar? Bayar lewat aplikasi {nama ISP}. Layanan aktif kembali otomatis setelah pembayaran diterima." (Is there an unpaid invoice? Pay through the {ISP name} app. The service becomes active again automatically after the payment is received.)
- Other restriction section: "Dibatasi oleh {nama ISP} karena alasan lain? Hubungi kami." (Restricted by {ISP name} for another reason? Contact us.)
- The buttons **Telepon** (Phone), **WhatsApp**, and **Buka aplikasi {nama ISP}** (Open the {ISP name} app). Each button appears only if its number or app link is available. The page has no web sign-in button.

The name, phone and WhatsApp come from the company profile. The app link comes from the Play Store address of the customer app in the system settings.

## Reactivating a subscription

A Ditangguhkan subscription becomes Aktif again by one of these routes:

- Automatically after payment, from a manual invoice or from Midtrans. The conditions: **Aktifkan kembali saat tagihan lunas** is on, the isolir source is `overdue`, every invoice due on the isolir day at the latest is paid, and there is no unpaid invoice past the day limit. A partial payment is not enough. A `manual` isolir is never opened automatically.
- Manually: on the subscription page, **Aksi langganan** card, click **Aktifkan kembali** (Reactivate). This action does not ask for a reason, needs the permission `customer.subscription.reactivate` (admin and manager), and shows the toast "Langganan diaktifkan kembali." (Subscription reactivated.) If the subscription is not Ditangguhkan, the server refuses with "Langganan harus berstatus Ditangguhkan untuk diaktifkan kembali." (The subscription must have the status Suspended to be reactivated.)

## Isolating and blocking manually

An admin and a manager can isolir or block without waiting for the schedule.

- Isolir because of arrears: open **Tunggakan** (Arrears) ([section 7.2](/docs/guides/web/finance-and-reports/arrears/)), then click the **Isolir** button followed by the subscription code on the customer row. This button appears for Aktif subscriptions for holders of `customer.subscription.suspend`. In the dialog `Isolir langganan <kode>?` (Isolir subscription `<code>`?), fill in **Alasan isolir (wajib)** (Isolir reason (required)) then click **Isolir**. The toast "Langganan ditangguhkan." (Subscription suspended.) appears. The source is `overdue`, so a payment can open it automatically.
- Ordinary suspension: on the subscription page, click **Tangguhkan** (Suspend), fill in **Alasan** (Reason) in the **Tangguhkan Langganan** (Suspend Subscription) dialog, then click **Tangguhkan**. The source is `manual`, so only **Aktifkan kembali** opens it.
- Block internet on a subscription that is not yet Berhenti: click **Blokir internet** (Block internet) on the subscription page, or the **Blokir** (Block) button followed by the subscription code on the **Tunggakan** row. In the dialog `Blokir internet <kode>?` (Block internet `<code>`?), fill in **Alasan** (required, 500 characters at most), then click **Blokir internet**. The toast "Internet langganan diblokir." (Subscription internet blocked.) appears. This button needs the permission `customer.subscription.block`.
- Unblock: click **Buka blokir** (Unblock) on the subscription page, or the **Buka blokir** button followed by the subscription code on the **Tunggakan** row. In the dialog `Buka blokir internet <kode>?` (Unblock internet `<code>`?), **Catatan (opsional)** (Notes (optional)) may be empty. Click **Buka blokir**. The toast "Blokir internet langganan dibuka." (Subscription internet unblocked.) appears.

A block is not a status. The **Status** card on the subscription page shows the row **Internet** with the badge **Diblokir** (Blocked), **Alasan blokir** (Block reason) and **Diblokir oleh** (Blocked by), and the **Akses jaringan** page writes `Diisolir karena diblokir.` The subscription row in **Tunggakan** also holds the badge **Diblokir**. Invoices keep running and payment does not lift the block. **Buka blokir** on a Ditangguhkan subscription does not restore service: the dialog says `Langganan sedang ditangguhkan, jadi layanan tetap diisolir sampai diaktifkan kembali.` (The subscription is suspended, so the service stays isolated until it is reactivated.) and the subscription stays isolir until **Aktifkan kembali**.

The server refuses with "Internet langganan sudah diblokir." (The subscription internet is already blocked.) if the subscription is already blocked, "Internet langganan tidak sedang diblokir." (The subscription internet is not blocked.) if you unblock one that does not exist, and "Langganan yang sudah berhenti tidak bisa diblokir." (A terminated subscription cannot be blocked.) if the subscription is Berhenti. A suspension of a subscription that is not Aktif is refused with "Langganan harus berstatus Aktif untuk ditangguhkan." (The subscription must have the status Active to be suspended.)

## Common errors

- The **Aset router** choice is empty or the router you look for is missing: the asset must be of type Router, have an **IP manajemen** and not be registered yet. The matching server messages: `Pilih aset router milik perusahaan ini yang punya IP manajemen.` (Choose a router asset of this company that has a management IP.) and `Aset router ini sudah terdaftar sebagai router NAS.` (This router asset is already registered as a NAS router.) Fix the asset through **Ubah** ([section 5.2](/docs/guides/web/network/network-assets/)).
- The warning `Kode perusahaan tidak dapat dipakai sebagai realm RADIUS (huruf kecil, angka, dan tanda hubung, maksimal 24 karakter). Ubah kode perusahaan sebelum mendaftarkan router.` (The company code cannot be used as a RADIUS realm (lowercase letters, digits and hyphens, 24 characters at most). Change the company code before registering a router.) makes the registration form not appear: the company code must be 1 to 24 letters, digits or hyphens. An admin changes the **Kode** in the company profile ([section 8.1](/docs/guides/web/administration/company/)). The address of the isolir page holds this code, so copy the address again if the code changes.
- `Alamat ini tidak tersedia.` (This address is not available.): the **Alamat NAS** is already used by another router in the system. Fill in the address that really is the origin of the router requests.
- A router secret is refused with `Gunakan karakter yang dapat dicetak, tanpa spasi.` (Use printable characters, without spaces.): use 8 to 60 printable ASCII characters, without spaces.
- The **Gagal ditulis** or **Menunggu ditulis** badge does not change: Inbils has not managed to write the router to RADIUS yet. Read **Kesalahan terakhir** in the details and make sure RADIUS is on at the server. After it is written, ask the server manager to restart FreeRADIUS.
- The **Klien RADIUS** badge says **Menunggu restart FreeRADIUS**: the row has been written to RADIUS, but the router has not sent a packet since. Ask the server manager to restart FreeRADIUS, then click **Uji koneksi** in the router details. The badge becomes **Aktif** after the router sends a packet. **Sinkronkan ke RADIUS** does not replace that step, because the button only rewrites the row.
- A manager or staff member does not see **Daftarkan router**, **Ubah** and **Hapus router**: only the admin has `network_asset.nas.manage`. The server also refuses with a 403 error.
- A network account is refused with `Profil kecepatan paket ini belum punya nama profil RADIUS.` (The speed profile of this package has no RADIUS profile name yet.): fill in **Nama profil RADIUS** on the speed profile of the package ([section 4.4](/docs/guides/web/customers-and-services/speed-profiles/)). The message `Langganan yang sudah berhenti tidak dapat punya akun jaringan.` means the subscription is already Berhenti, and `Langganan ini sudah punya akun jaringan.` (This subscription already has a network account.) means the account already exists.
- An account password is refused with `Kata sandi tidak boleh berisi spasi.` (The password must not contain spaces.): use 6 to 64 characters without spaces. A username is refused with `Gunakan 3 sampai 40 huruf kecil, angka, titik, tanda hubung, atau garis bawah.` (Use 3 to 40 lowercase letters, digits, dots, hyphens, or underscores.): use only those characters.
- **Tampilkan kata sandi** and **Sinkron ulang** return an error after repeated use: the server limits **Tampilkan kata sandi** to 10 times per minute and **Sinkron ulang** to 6 times per minute.
- A customer has paid but stays isolir: check the isolir source. A `manual` isolir and a block are not opened by payment. Also check whether **Aktifkan kembali saat tagihan lunas** is on, there is no unpaid invoice past the day limit, and every invoice due on the isolir day at the latest is paid.
- A customer who is blocked manually sees one page that explains the possible arrears and other restrictions. The page does not know the cause of the customer's isolir. Ask the customer to use **Telepon** or **WhatsApp** if the problem is not an invoice.
