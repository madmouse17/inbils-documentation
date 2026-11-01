---
title: "4. Tickets"
description: "Open, start, comment on, attach photos to and complete a customer ticket in the technician app, including quick replies and offline behaviour."
---

A ticket is a fault report or service request from a customer. Tickets assigned to you appear in the **Pekerjaan** (Jobs) tab with the **Tiket** (Tickets) label.


## Ticket details and Mulai


Tap a ticket row in the **Pekerjaan** tab.

![Ticket details](~/assets/guide/technician/detail-tiket.webp)

The ticket details open with a title card that shows the code, title, status, **Prioritas** (Priority) (for example "Prioritas mendesak" (Urgent priority)), **Kategori** (Category), and the deadlines: "Respons sebelum 21:17 · sisa 41 mnt" (Respond before 21:17 · 41 min left) while the ticket waits for its first response (red if overdue), and "Batas {tanggal}" (Deadline {date}) for the resolution deadline. Below it, in this order:

1. **Pelanggan** (Customer): name, phone number with the **Telepon** (Phone) and **WhatsApp** buttons (WhatsApp only appears if the number is an Indonesian mobile number), then the address you must go to, with a **Buka di Maps** (Open in Maps) button. For a customer, this is the **Alamat pemasangan** (Installation address); a ticket without a customer uses the ticket **Lokasi** (Location). If the address is not filled in, the app writes "Alamat pelanggan belum diisi. Hubungi kantor." (The customer address has not been filled in. Contact the office.)
2. **POP**: the POP or warehouse recorded on the ticket, with its own **Buka di Maps** button. This card only appears if the address above is the installation address, so the two are not confused.
3. **Deskripsi** (Description), **Lampiran** (Attachments) and **Komentar** (Comments). After the ticket is completed, **Catatan penyelesaian** (Completion notes) also appears.

To start:

1. Open a ticket with the **Ditugaskan** (Assigned) status.
2. Tap **Mulai** (Start).
3. The app asks "Mulai tiket ini?" (Start this ticket?) and explains that the status changes to **Dikerjakan** (In progress) and the office can see it. Tap **Mulai**.
4. After the ticket starts, the app writes the check-in result at the bottom of the screen: "Check-in tercatat, 120 m dari lokasi" (Check-in recorded, 120 m from the location) (the distance is calculated from your position), or "Mulai tercatat tanpa lokasi" (Start recorded without location) if the position is not available.

As with work orders (SPK), the app records your position if location permission is granted. Without permission, the ticket is still started. If you are further from the customer's location than the office limit, the app asks for the **Alasan** (Reason) first (see "Far from the customer's location" in [chapter 3](/docs/guides/technician/work-orders/)). Without internet, **Mulai** is saved and sent when the signal returns.


## Comments and internal comments


At the bottom of the **Komentar** list there is a comment box.

1. Type in the **Tulis komentar** (Write a comment) field (2000 characters at most).
2. For a note that only staff may read, switch on **Catatan internal** (Internal note). The text reads: "Hanya staf yang melihatnya, pelanggan tidak." (Only staff can see it, the customer cannot.) Leave it off for a comment that the customer may read.
3. Tap **Kirim komentar** (Send comment).

Your comment is labelled **Anda** (You), a staff comment is labelled **Staf** (Staff), and an internal comment is labelled **Internal**. The send button is inactive when the field is empty and when the text is longer than 2000 characters. Without internet, the comment is not lost: it appears above the field with the **Menunggu kirim** (Waiting to send) mark and is sent by itself when the signal returns, while the field is already free for the next comment.

### Quick replies

On a ticket that is still being worked on, while the comment field is empty and **Catatan internal** is off, the **Balasan cepat** (Quick replies) section appears above the field. One tap sends a customer-readable comment straight away, without confirmation:

- "Laporan diterima. Saya menuju lokasi." (Report received. I am heading to the location.)
- "Laporan diterima. Saya periksa dari jaringan dulu." (Report received. I will check from the network first.)
- "Mohon nyalakan ulang modem, lalu kabari hasilnya di sini." (Please restart the modem, then tell us the result here.)

A quick reply counts as the first response, the same as a comment you type. The buttons are inactive while a comment is being saved. Starting to type, or switching on **Catatan internal**, hides them.


## Attachments


Attach photos that help the office, for example a photo of the modem or of the indicator lights.

![Ticket with a photo attachment](~/assets/guide/technician/detail-tiket-lampiran.webp)

1. In the **Lampiran** section, tap **Tambah lampiran** (Add attachment).
2. Choose **Kamera** (Camera) or **Galeri** (Gallery), then take or choose a photo.
3. In the **Keterangan foto** (Photo caption) window, type a caption (optional, 255 characters at most), then tap **Simpan** (Save).
4. The app uploads and writes "Lampiran ditambahkan." (Attachment added.)

Attachment photos are processed the same way as SPK photo evidence: JPEG, longest side at most 1920 pixels, no EXIF. The server accepts JPG, PNG and PDF files up to 10 MB; the app only sends photos.

Ticket attachments do **not** use the upload queue. The **Tambah lampiran** button is inactive without internet. If an upload fails halfway, the photo stays below the list with the **Kirim ulang** (Resend) and **Buang** (Discard) options.

A PDF attachment from the office or the customer appears with its name ("Buka PDF {nama}" (Open PDF {name})). Tap it to download it: the app writes "Membuka PDF" (Opening PDF), then opens the Android share sheet where you choose a PDF reader app. If it fails, the app writes "PDF tidak bisa dibuka. Coba lagi." (The PDF cannot be opened. Try again.)

To delete an attachment: tap **Hapus** (Delete) on its row, then confirm "Hapus lampiran ini?" (Delete this attachment?). The **Hapus** button only appears on attachments that you uploaded, while the ticket is not yet completed. Attachments can be added until the ticket is closed.


## Completing a ticket


![The Selesaikan tiket sheet](~/assets/guide/technician/selesaikan-tiket.webp)

1. Open a ticket with the **Dikerjakan** status.
2. Tap **Selesaikan** (Complete).
3. In the **Selesaikan tiket** (Complete ticket) sheet, fill in **Catatan penyelesaian**: what you found and did. The note is required, 1000 characters at most.
4. Tap **Selesaikan tiket**.

After success, the action buttons disappear from the ticket screen and **Catatan penyelesaian** appears in the details. If sending fails, the note you typed stays saved in the sheet as long as you do not leave the ticket screen. Without internet, **Selesaikan tiket** is saved with the **Menunggu kirim** mark and sent when the signal returns; the ticket immediately appears as **Diselesaikan** (Resolved).

### Common errors with tickets

- **"Isi catatan penyelesaian." (Fill in the completion note.)** The note is empty. The **Selesaikan tiket** button is inactive until the note is filled in.
- **"Maksimal 1000 karakter." (Maximum 1000 characters.)** or **"Maksimal 2000 karakter." (Maximum 2000 characters.)** Shorten the text.
- **"Data tidak ditemukan atau sudah dihapus." (Data not found or already deleted.)** The ticket was reassigned to someone else or deleted. The app closes the ticket screen.
- **"Butuh koneksi internet." (An internet connection is needed.)** Attachments and deleting attachments need internet. Start, Complete and comments do not: all three wait to send. The screen can still be read from the last copy.
