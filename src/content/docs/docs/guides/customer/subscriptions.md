---
title: "5. Subscriptions"
description: "Check your subscription details and status, restore an isolated service by paying overdue invoices, and follow a technician visit step by step."
---

A subscription is the internet service you use. Open it from the **Akun** (Account) tab → **Langganan** (Subscriptions), or tap the package name on the service card on Home.


## Subscription list


![Subscription list](~/assets/guide/customer/langganan.webp)

Each row shows the package name, the monthly fee, and the status. Tap a row to see its details. When the list is empty: "Tidak ada layanan" (No services).


## Subscription details


![Subscription details](~/assets/guide/customer/detail-langganan.webp)

| Section | Content |
| --- | --- |
| Status | The subscription status (table below). |
| Paket (Package) | The package name. |
| Kategori (Category) | The package category, for example Rumahan (Home), Bisnis (Business) or Korporat (Corporate). It appears when the ISP gave the package a category. |
| Biaya bulanan (Monthly fee) | The fee per month. |
| Tanggal aktivasi (Activation date) | The date the service became active. |
| Tanggal tagihan (Invoice date) | "Setiap tanggal N" (Every N-th day) of each month. |
| Tagihan berikutnya (Next invoice) | The date the next invoice is issued. |
| Masa kontrak (Contract term) | The length of the contract in months. |
| Berakhir (Ends) | The date the contract ends. |
| Alamat pemasangan (Installation address) | The location of the service. |

Missing data is written as "Tidak tersedia" (Not available). Subscription data is read-only; changes to the package or address go through the ISP.

The subscription details also contain a **Janji layanan** (Service promise) section ("Paket SLA {nama}" (SLA package {name}) with "Respons ≤ 4 jam, selesai ≤ 24 jam" (Response ≤ 4 hours, resolved ≤ 24 hours), when your package has an SLA), **Koneksi** (Connection) with a **Username PPPoE** that you can copy ("Username PPPoE disalin." (PPPoE username copied.)), and a map of the installation address with an **Buka di Maps** (Open in Maps) button. A suspended subscription states the cause and since when.


## Subscription statuses


| Status | Meaning |
| --- | --- |
| Menunggu (Pending) | The installation is not finished; the service is not active yet. |
| Aktif (Active) | The service is running and billed every month. |
| Ditangguhkan (Suspended) | The service is stopped temporarily (isolir, internet blocked while the account is suspended). |
| Dihentikan (Terminated) | The subscription has ended. |
| Dibatalkan (Cancelled) | The subscription was cancelled before it became active. |


## Isolir: meaning and how to recover


**Isolir** means the ISP limits the internet service temporarily. Isolir caused by arrears can recover automatically once all the invoices holding it are paid. Manual suspension and a block by staff are not lifted by payment.

How to clear an isolir caused by arrears:

1. Connect your phone through **mobile data** or another network.
2. Open Inbils Pelanggan. When the router opens the page **Layanan internet Anda sedang dibatasi** (Your internet service is being restricted), use the **Buka aplikasi {nama ISP}** (Open the {ISP name} app) button. The page also offers **Telepon** (Phone) and **WhatsApp** when the ISP has filled them in.
3. On the **Diisolir** (Isolated) service card, read the **Lunasi tagihan berikut agar layanan aktif kembali** (Pay the following invoices to reactivate your service) list. This list only contains invoices that still hold back reactivation.
4. For one invoice, tap **Bayar** (Pay). For two or more invoices, tap **Bayar semua (Rp {total})** (Pay all (Rp {total})). The app pays the invoices one at a time, starting with the oldest due date.
5. Finish paying the first invoice. When you return to the app, the step **Tagihan 1 dari N** (Invoice 1 of N) stays visible. When another invoice is still left, the sheet **Tagihan {nomor} lunas. Lanjut bayar {nomor berikut} (Rp {jumlah})** (Invoice {number} paid. Continue to pay {next number} (Rp {amount})) appears. Tap **Lanjut bayar** (Continue to pay).
6. Repeat until the app says **Semua tagihan lunas. Layanan aktif kembali dalam beberapa menit.** (All invoices paid. Your service becomes active again within a few minutes.) Do not pay the same invoice again while waiting for confirmation.

A partial payment is not enough. When one of the payments is not confirmed yet, check its status from the **Tagihan** (Invoices) tab before continuing. After all the holding invoices are recorded as paid, the system reactivates the service in the background.

Automatic recovery only applies to isolir caused by arrears and when the ISP has enabled it. For manual suspension or a block, use **Hubungi ISP** (Contact your ISP). When all holding invoices are paid but the service is not active after a few minutes, contact the ISP with the invoice numbers.


## Technician visit


A technician visit is an installation or maintenance work order (SPK) carried out at your address. The app shows how far the visit has progressed. Open it from the **Akun** tab → **Kunjungan teknisi** (Technician visit), from the visit card on **Beranda** (Home), or from the notification "Teknisi dalam perjalanan" (Technician on the way). Only visits for your subscriptions appear.

![Akun tab: the Kunjungan teknisi row between Riwayat pembayaran and Ubah profil](~/assets/guide/customer/redesign/kunjungan-akun-menu.webp)

### Visit list

![Kunjungan teknisi list: one visit Dalam perjalanan and one Selesai dipasang](~/assets/guide/customer/redesign/kunjungan-daftar.webp)

The list contains visits that are still in progress, and visits that were completed or cancelled in the last 30 days, with the newest at the top. Each card shows the SPK number, the visit type, the current stage, and the scheduled date when there is one. Pull the screen down to refresh.

### Visit details

Tap a card.

![Visit details at the Dalam perjalanan stage](~/assets/guide/customer/redesign/kunjungan-detail-dalam-perjalanan.webp)

- The top part shows the current stage, the visit type, and the SPK number.
- **Tahapan** (Stages) shows four steps: **Ditugaskan** (Assigned), **Dalam perjalanan** (On the way), **Sedang dikerjakan** (In progress), and **Selesai dipasang** (Installation completed). A tick means the step has been passed, with its time below the step name. A dotted circle with a bold name is the current step. An empty circle is the next step.
- **Rincian** (Details) shows the **Jadwal** (Schedule) ("Belum ditentukan" (Not set yet) when the ISP has not filled in a date), the **Teknisi** (Technician) (first name only), and the **Alamat pemasangan** (Installation address).
- Pull the screen down to load the latest stage.

![Visit details at the Sedang dikerjakan stage](~/assets/guide/customer/redesign/kunjungan-detail-dikerjakan.webp)

The **Selesai dipasang** stage appears as soon as the technician submits the result of the work, even though the ISP office has not checked it yet.

![Visit details for a completed installation: all four steps ticked](~/assets/guide/customer/redesign/kunjungan-detail-selesai.webp)

A cancelled visit says **Dibatalkan** (Cancelled) with no steps. The app does not show the technician's phone number. To ask a question, use **Hubungi ISP** on Home.
