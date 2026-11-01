---
title: "4. Creating a company"
description: "Create a new tenant in the operator panel: fill in company data and the first admin, choose the starting content, and send the admin invitation."
---

## 4.1 Entering company data and the first admin


Roles that can use it: all platform operators.

1. Click **Perusahaan baru** (New company).
2. On the **Data perusahaan** (Company data) card, fill in:
   - **Nama perusahaan** (Company name), required, at most 255 characters;
   - **Kode perusahaan** (Company code), required, unique, at most 50 characters. Use letters, digits, hyphens or underscores. The first character must be a letter or digit. A code that differs from another code only in upper and lower case is refused ("kode sudah digunakan." (the code is already in use.)). The code fills in by itself from the name (upper case, no accents, words separated by hyphens, for example "Nusa Net" becomes `NUSA-NET`) until you type your own code. If you empty the field, the code follows the name again as soon as the name is edited. A moment after you stop typing, Inbils checks the code. If it already exists, "Kode sudah dipakai" (Code already in use) appears below the field. This check is only for correctly formatted codes and does not replace the check at **Buat perusahaan** (Create company);
   - **Zona waktu** (Time zone), required. Type to search, then choose;
   - **Mata uang** (Currency), required: IDR, USD, SGD or EUR;
   - **Logo**, optional, at most 10 MB. Use JPG, PNG or WebP. The form also lists SVG, but the server rules refuse SVG, so do not use it.

   ![New company form with company data and the first admin](~/assets/guide/web/platform-company-create.webp)

   If the suggested code is already used by another company, the message "Kode sudah dipakai" appears below the **Kode perusahaan** field.

   ![The Company code field showing "Kode sudah dipakai" after the name Demo is typed](~/assets/guide/web/platform-company-create-code-taken.webp)

3. The company code cannot be changed after creation. The code is used to confirm suspension, export, deletion requests and the support edit mode. A tenant admin can only read it in the Perusahaan menu.
4. The logo is converted to WebP and reduced if its longest side exceeds 512 pixels.
5. On the **Admin pertama** (First admin) card, fill in **Nama admin** (Admin name) and **Email admin** (Admin email). The email must be valid, unique among all users of the installation, and at most 255 characters.

Inbils creates the admin account with a random 32-character password that nobody knows. The account email is treated as verified straight away. The admin signs in through an invitation link to set their own password.


## 4.2 Choosing the starting content


Choose one value for **Isi awal** (Starting content):

- **Katalog awal** (Starter catalogue) is the default choice. The company receives item units, package categories, ticket categories, three SLA tiers, a sample location structure, bandwidth and speed profiles, eight packages, and inventory categories and items. There is no stock and there are no network assets.
- **Kosong** (Empty) fills in only item units, package categories and ticket categories. Ticket categories are still created because customers cannot open a ticket without a category.

The **Data contoh** (Sample data) card has the **Isi data contoh** (Fill with sample data) box. Use it only for trials or training.

![The Starting content and Sample data sections of the company form with Starter catalogue and Empty](~/assets/guide/web/platform-company-create-demo.webp)

If **Isi data contoh** is ticked:

- Inbils selects and locks **Katalog awal**;
- the alert reads "Data contoh memakai Katalog awal, jadi pilihan Kosong tidak tersedia." (Sample data uses the Starter catalogue, so the Empty option is not available.);
- a queue job adds sample customers, invoices, work orders (SPK), tickets, stock, network assets, organisation, employees, vehicles, evaluations, notifications, IPAM and ODN;
- the sample accounts use a random password that is not told to anyone;
- the sample data does not create NAS routers, network accounts or WhatsApp messages.


## 4.3 Creating the tenant and sending the invitation


1. Check the name and code again. Changing the code is not available after creation.
2. Click **Buat perusahaan**.
3. If it succeeds, Inbils opens the tenant page and shows "Perusahaan dibuat. Undangan dikirim ke admin pertama." (Company created. Invitation sent to the first admin.)
4. The company is active at once. Inbils copies the role templates to that company, gives the first admin the **Admin** role, then prepares the default membership, numbering and basic settings. After the copy, the roles belong to the company: later template changes do not change them ([chapter 8](/docs/guides/platform/role-templates/)).
5. The invitation email has the subject **Undangan admin {nama perusahaan} di Inbils** (Invitation for admin of {company name} on Inbils) and the button **Atur kata sandi** (Set password). The link is valid for 60 minutes.
6. Ask the admin to set the password, then sign in through the tenant web page.

An email that carries a credential link always uses the platform mailer (`MAIL_*`), not the company's own SMTP. Email from the platform uses the Inbils name in the email header and footer. The sample data job uses the `platform` queue. Without a `platform` worker, the job keeps waiting. Worker details are in [section 11.2](/docs/guides/platform/console-tasks-and-queues/).

The **Masuk terakhir** (Last sign-in) column on the tenant page shows the invitation state while the admin has not signed in:

- **Antre sejak {waktu}** (Queued since {time}): the notification is waiting in the queue;
- **Terkirim {waktu}** (Sent {time}): the email was sent and the link is still valid;
- **Tautan kedaluwarsa** (Link expired): the link passed 60 minutes;
- **Gagal terkirim {waktu}** (Failed to send {time}): the email failed after all attempts;
- **Belum pernah** (Never): the user has never signed in and has no invitation status.

### Common errors

- "Perusahaan belum dapat dibuat. Periksa isian yang ditandai." (The company cannot be created yet. Check the marked fields.): read the message below each field.
- "kode sudah digunakan.": choose another code. The code is unique across all companies.
- "Kode sudah dipakai" below the **Kode perusahaan** field: that code already exists on another company. Change the suggested code before you click **Buat perusahaan**.
- "Format kode tidak valid." (The code format is not valid.): use letters, digits, hyphens or underscores, and start with a letter or digit.
- "email admin sudah digunakan." (The admin email is already in use.): an account with that email already exists. Do not create a second account for the same person.
- "Data contoh butuh Katalog awal." (Sample data needs the Starter catalogue.): choose **Katalog awal** or turn off **Isi data contoh**.
- An SVG logo is refused with "logo harus berupa gambar." (The logo must be an image.): upload JPG, PNG or WebP.
- The company is created but the sample data does not appear: make sure the `platform` worker is running. Read **Job gagal** (Failed jobs) and **Audit terbaru** (Latest audit) for `tenant.demo_data_failed` failures.
- The invitation email does not arrive: check the invitation status, then use **Kirim ulang undangan** (Resend invitation) in [section 5.5](/docs/guides/platform/company-page-and-support-tools/).
