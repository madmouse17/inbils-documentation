---
title: "3. Invoices"
description: "View your invoices, understand each status, pay the remaining amount through Midtrans and see what to do when a payment fails or stays pending."
---

## Invoice list


Tap the **Tagihan** (Invoices) tab.

![Invoice list](~/assets/guide/customer/tagihan.webp)

1. Choose a filter above the list: **Belum dibayar** (Unpaid), **Lunas** (Paid), or **Semua** (All).
2. Each row shows the invoice number, the issue date, the due date, and the amount left to pay.
3. Tap a row to open its details.
4. Scroll down to load the next invoices. When this fails, "Gagal memuat tagihan berikutnya." (Could not load the next invoices.) appears with a button to try again.

An empty list shows "Tidak ada tagihan yang belum dibayar." (There are no unpaid invoices.), "Belum ada tagihan lunas." (There are no paid invoices yet.), or "Belum ada tagihan." (There are no invoices yet.) depending on the filter.


## Invoice statuses


| Status in the app | Meaning |
| --- | --- |
| Belum dibayar (Unpaid) | The invoice has been issued and no payment has been made. |
| Dibayar sebagian (Partially paid) | A payment has been made, but an amount is still left. |
| Lewat jatuh tempo (Overdue) | The due date has passed and an amount is still left. |
| Lunas (Paid) | The whole invoice has been paid. |
| Dibatalkan (Cancelled) | The ISP cancelled the invoice; you do not need to pay it. |

An invoice that is still a draft at the ISP does not appear in the app.


## Invoice details


![Invoice details](~/assets/guide/customer/detail-tagihan.webp)

The details screen shows, from top to bottom:

- The issue and due dates, and the **Periode tagihan** (Invoice period) when the ISP has filled it in.
- The **Sisa yang harus dibayar** (Amount left to pay) with the invoice status.
- Subtotal, Diskon (Discount), Pajak (Tax), **Total**, and **Sudah dibayar** (Already paid).
- The **Bayar** (Pay) button with a note about the Midtrans page (see below). An invoice that is not paid in full but cannot be paid in the app shows a **Hubungi ISP** (Contact your ISP) button, which opens the ISP contact sheet, so you are never stuck.
- **Pembayaran online terakhir** (Last online payment) and the reason when the last payment attempt did not succeed (see below).
- **Rincian tagihan** (Invoice details): each line with quantity × unit price.
- **Pembayaran** (Payment): the payments already recorded on this invoice, each with the method, date and time, reference number ("Ref. ...") when there is one, and the amount, plus a **Lihat riwayat pembayaran** (View payment history) link.
- A **Lunas** invoice has an **Unduh bukti bayar** (Download payment receipt) button. The app prepares a PDF ("Menyiapkan bukti bayar…" (Preparing the payment receipt…)), then opens the Android share sheet: save it, send it, or open it with a PDF reader app. When this fails, it says "Bukti bayar tidak bisa diunduh. Coba lagi." (The payment receipt could not be downloaded. Try again.)

![Invoice details for an invoice that cannot be paid in the app: Hubungi ISP button](~/assets/guide/customer/detail-tagihan-tidak-bisa-dibayar.webp)

Pull the screen down to refresh.


## Paying through Midtrans


Online payment is made on a page owned by Midtrans, not inside the app. You pay the **whole remaining amount** of the invoice, not part of it.

1. Open an invoice that is unpaid, overdue, or partially paid.
2. Tap **Bayar**. The app asks "Bayar tagihan sekarang?" (Pay the invoice now?) and explains that you will be sent to a payment page. Tap **Lanjut bayar** (Continue to pay).
3. The **Menyiapkan pembayaran** (Preparing payment) screen appears briefly with the amount to pay, the due date, and a progress bar, while the app requests the payment page. The back button is held during this screen, for about 30 seconds at most.
4. The Midtrans payment page opens in the in-app browser (or in the phone browser when needed).
5. Choose a payment method on that page and follow its instructions to the end. The methods shown depend on Midtrans and the ISP's merchant account settings; the app does not limit or choose them for you.
6. When you have finished, go back to the Inbils app.

A payment page that has already been created is reused as long as it has not expired (24 hours) and the amount still equals the remaining amount of the invoice. So tapping **Bayar** twice does not create two payment requests.

While a created payment page is still valid, the **Pembayaran online terakhir** section says **Menunggu pembayaran** (Waiting for payment) and "Bayar sebelum 08.30 besok" (Pay before 08.30 tomorrow) (the deadline, written the way people say the time). After it passes, it says **Kedaluwarsa** (Expired); tap **Bayar** to create a new page.

### After paying

When you return to the app, the details screen refreshes the invoice status by itself, and once more about 10 seconds later, because some methods are confirmed slowly. The status is always taken from the server, not from the Midtrans page.

- The **Pembayaran diterima** (Payment received) banner means the invoice has been recorded. The status becomes **Lunas** and the payment appears in the **Pembayaran** section and in Payment history.
- The **Menunggu konfirmasi pembayaran** (Waiting for payment confirmation) banner means the payment has not reached the system yet. Tap **Periksa status** (Check status) a little later. The system also checks Midtrans regularly, so a successful payment is still recorded even if the app was closed.
- A payment that takes longer to confirm (for example a bank transfer) can be checked again later from the **Tagihan** tab.

### When the last payment did not succeed

When the last payment attempt did not finish, the invoice details give the reason in a banner above **Rincian tagihan**, with the next step:

| Banner | Meaning | Button |
| --- | --- | --- |
| "Pembayaran ditolak. Coba lagi, metode lain bisa dipilih di halaman bayar." (Payment declined. Try again; you can choose another method on the payment page.) | The bank or method provider declined the payment. | **Bayar lagi** (Pay again) |
| "Pembayaran dibatalkan." (Payment cancelled.) | The payment was cancelled on the payment page before it finished. | **Bayar lagi** |
| "Waktu bayar habis." (Payment time ran out.) | The payment page expired before it finished. | **Bayar lagi** |
| "Pembayaran Anda sedang diperiksa ISP. Hubungi ISP bila saldo Anda sudah terpotong." (Your payment is being checked by the ISP. Contact the ISP if your balance has already been deducted.) | The money arrived but the system could not record it on this invoice yet. The ISP is checking it. | **Hubungi ISP** |
| "Halaman bayar ditutup karena tagihan sudah dibayar atau berubah." (The payment page was closed because the invoice has been paid or changed.) | The ISP recorded another payment or changed the invoice, so the old page was closed. | **Bayar lagi**, only when the invoice can still be paid |
| "Pembayaran online Anda sudah dikembalikan ISP." (Your online payment has been refunded by the ISP.) | The ISP refunded your online payment. | **Hubungi ISP** |

**Bayar lagi** opens the same Midtrans payment page as the **Bayar** button, and all methods are available there. **Hubungi ISP** opens the contact sheet. The "declined", "cancelled" and "time ran out" banners do not appear on an invoice that is already paid or can no longer be paid.

When the ISP has enabled WhatsApp and you have given consent, the "payment received" message is also sent to WhatsApp. See [chapter 7](/docs/guides/customer/notifications/).

When online payment is not available, the invoice details show "Pembayaran online belum tersedia. Hubungi kami untuk membayar tagihan ini." (Online payment is not available yet. Contact us to pay this invoice.) with a **Hubungi ISP** button. Pay at the ISP office or bank account; staff record it and the invoice changes in the app. A paid or cancelled invoice has no **Bayar** button.

Do not pay twice. When you are unsure whether a payment has arrived, check the invoice status and Payment history first.
