---
title: "7.13 Numbering (Penomoran)"
description: "Set the prefix, format and counter of automatic numbers for invoices, tickets, work orders and other records, and preview the next code before saving."
---

Penomoran (Numbering) sets the prefix, format and counter of automatic numbers for invoices and other records. This menu is in the group **Administrasi** (Administration), but it is covered here because it determines invoice numbers and the numbers of other documents.

Roles that can use it: users with the permission `system.setting`, which is the admin in the built-in roles. Managers and staff do not see this menu, and the address is rejected directly with the **Akses ditolak** (Access denied) page (error 403). This permission can be given to a custom role in **Peran** (Roles) ([section 8.6](/docs/guides/web/administration/roles/)). Each company has its own counter, and the screen shows the counter of the active company.

## Opening and reading the list

1. In the sidebar, open the group **Administrasi**, then click **Penomoran**.
2. The yellow note at the top writes "Perubahan format hanya berlaku untuk data baru. Kode yang sudah dibuat tidak berubah." (Format changes apply only to new data. Codes that have been created do not change.) Under it is one row for each numbered entity, sorted by name.

   ![Numbering list with the columns Entity, Format, Next code, Reset, Manual input, and the Edit button](~/assets/guide/web/number-sequences.webp)
3. The columns: **Entitas** (Entity), **Format** (the pattern used), **Kode berikutnya** (Next code) (the code that will come out now), **Reset** (badge **Tidak pernah** (Never), **Setiap tahun** (Every year), **Setiap bulan** (Every month) or **Setiap hari** (Every day)), **Input manual** (Manual input) (**Boleh** (Allowed) or **Tidak** (Not allowed)), and **Aksi** (Actions) with the button **Ubah** (Edit). **Kode berikutnya** is only an estimate, because another creation at the same moment can take that number.
4. The entities that can be set (the initial values are visible on screen):
   - Aset Jaringan (Network assets): network asset code ([section 5.2](/docs/guides/web/network/network-assets/)).
   - Barang (SKU) (Items (SKU)): item SKU ([section 6.2](/docs/guides/web/inventory/items/)). Manual input is **Boleh** initially.
   - Karyawan (Employees): employee number ([section 8.3](/docs/guides/web/administration/employees/)).
   - Langganan (Subscriptions): subscription code ([section 4.1](/docs/guides/web/customers-and-services/customers/)).
   - Pelanggan (Customers): customer code ([section 4.1](/docs/guides/web/customers-and-services/customers/)).
   - Permintaan Barang (Item requests): item request code ([section 6.1](/docs/guides/web/inventory/item-requests/)). The initial format is `{PREFIX}-{YYYY}-{SEQ:5}` and the reset is **Setiap tahun**, so the first number of 2026 looks like `REQ-2026-00001`. The old initial format was daily (`REQ-20261020-0003`). Companies that still use that default daily format are moved to the yearly format and the counter starts from 1 again. Old codes stay, and a format you changed yourself is not touched.
   - SPK: work order (SPK) code ([section 3.3](/docs/guides/web/operations/work-orders/)).
   - Tagihan (Invoices): invoice number ([section 7.1](/docs/guides/web/finance-and-reports/invoices/)). The initial format is `{PREFIX}-{YYYY}-{SEQ:5}` and it never resets, so the first number of 2026 looks like `INV-2026-00001`.
   - Tiket (Tickets): ticket code ([section 3.4](/docs/guides/web/operations/tickets/)). The initial reset is **Setiap tahun**.

Invoice numbers from all sources (**Buat tagihan** (Create invoice), **Buat tagihan bulanan** (Create monthly invoices) and invoices from SPK) use one **Tagihan** counter.

## Changing the numbering

1. Click **Ubah** on the entity row. The window **Ubah penomoran &lt;entitas&gt;** (Edit numbering &lt;entity&gt;) opens and warns "Hanya kode yang dibuat setelah ini yang memakai format baru." (Only codes created after this use the new format.)

   ![Edit numbering window for Customers with the fields Prefix, Next number, Format, the token buttons, Reset numbering, and Preview of the next code](~/assets/guide/web/number-sequences-edit.webp)

2. Fill in the form:
   - **Awalan** (Prefix): required, 1 to 20 characters, only letters, digits, `-` and `_`.
   - **Nomor berikutnya** (Next number): required, a whole number of at least 1, not larger than the largest number that fits in `{SEQ:n}` (99999 for `{SEQ:5}`).
   - **Format**: required, at most 100 characters. Type text and tokens, or click a token button under the field (`{PREFIX}`, `{YYYY}`, `{YY}`, `{MM}`, `{DD}`, `{COMPANY}`, `{SEQ:5}`) to insert it at the cursor position. Each button has a short description beside it.
   - **Reset nomor** (Reset numbering): select **Tidak pernah**, **Setiap tahun**, **Setiap bulan** or **Setiap hari**.
   - **Izinkan input kode manual** (Allow manual code input): a switch. When off, the code field in the form is locked and always generated automatically. The help text under it writes "Jika mati, kolom kode di formulir dikunci dan selalu dibuat otomatis." (When off, the code field in the form is locked and always generated automatically.)
3. Read **Pratinjau kode berikutnya** (Preview of the next code). The preview changes as you type and uses the company time zone. If the **Format** has a problem, a red message appears directly under the field before you save.
4. Click **Simpan** (Save), or **Batal** (Cancel) to close without saving. After **Simpan**, the notification "Penomoran diperbarui." (Numbering updated.) appears, the window closes, and the **Kode berikutnya** column changes.

Rules for **Format**:

- Known tokens: `{PREFIX}` (the content of **Awalan**), `{YYYY}` (4-digit year), `{YY}` (2-digit year), `{MM}` (month), `{DD}` (date), `{COMPANY}` (company code), and `{SEQ:n}` (sequence number with leading zeros, n is the number of digits from 1 to 10). Exactly one `{SEQ:n}` is required.
- Besides tokens, only letters, digits, `-`, `_`, `/` and `.` are allowed.
- **Setiap tahun** requires `{YYYY}` or `{YY}`. **Setiap bulan** also requires `{MM}`, and **Setiap hari** also requires `{MM}` and `{DD}`. The counter returns to 1 at the start of a new period.
- The longest possible code must not exceed 255 characters.

After **Simpan**:

- Only numbers created afterwards change. Old numbers stay.
- The counter continues from the **Nomor berikutnya** you saved. A new format or reset starts counting in the period in which you save.
- The system skips numbers already used by the data of that entity, including deleted data, so numbers are never duplicated. If 1000 consecutive numbers are already used, creating the record fails and the message asks you to raise **Nomor berikutnya**.
- The change is recorded in the Audit log ([section 7.12](/docs/guides/web/finance-and-reports/audit-log/)) with the module **Penomoran**.

## Common errors

- Old numbers do not change after **Simpan**. This is deliberate: only new numbers use the new format.
- "Reset berkala memerlukan {YYYY} atau {YY}." (Periodic reset requires {YYYY} or {YY}.), "Reset bulanan atau harian memerlukan {MM}." (Monthly or daily reset requires {MM}.) and "Reset harian memerlukan {DD}." (Daily reset requires {DD}.) appear when **Format** lacks a token for the selected **Reset nomor**. Add that token or select **Tidak pernah**.
- "Format harus memuat tepat satu {SEQ:n}, n antara 1 dan 10." (Format must contain exactly one {SEQ:n}, n between 1 and 10.) appears when **Format** has no `{SEQ:n}` or has more than one.
- "Token {X} tidak dikenal." (Token {X} is not recognised.) appears when **Format** contains a token outside the list or `{SEQ:n}` with n outside 1 to 10. "Gunakan huruf, angka, tanda - _ / . dan token di dalam kurung kurawal." (Use letters, digits, the signs - _ / . and tokens inside curly brackets.) appears when there is any other character outside tokens.
- "Awalan hanya boleh berisi huruf, angka, - dan _ (maksimal 20 karakter)." (Prefix may contain only letters, digits, - and _ (at most 20 characters).) appears when **Awalan** contains a space or another sign. "Awalan wajib diisi." (Prefix is required.) appears when it is empty.
- "Nomor berikutnya maksimal 99999 untuk {SEQ:5}." (Next number is at most 99999 for {SEQ:5}.) (the figure follows n) appears when **Nomor berikutnya** is too large. Increase n or reduce the number.
- "Format menghasilkan kode lebih dari 255 karakter." (Format produces a code longer than 255 characters.) or, in the preview, "Kode terlalu panjang: n dari maksimal 255 karakter." (Code too long: n of at most 255 characters.) appears when the longest possible code passes the limit. Shorten **Awalan** or **Format**.
- The **Input manual** setting on **Tagihan** has no effect, because the invoice form has no number field and the number is always automatic.
- Lowering **Nomor berikutnya** does not reuse old numbers. The system skips numbers that already exist.
- The company setting keys `invoice_prefix`, `spk_prefix` and `ticket_prefix` (filled in by the initial wizard) are not used by the system and do not show on screen. Prefixes are set only in **Penomoran**.
