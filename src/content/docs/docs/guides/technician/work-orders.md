---
title: "3. Work orders (SPK)"
description: "Follow a work order (SPK) from assignment to review: travel, start, photo evidence, materials, offline actions and what to do when the office returns it."
---

A work order (SPK, surat perintah kerja) is an installation or repair job at the customer's location. The flow is: **Ditugaskan** (Assigned) → you set off (**Saya berangkat** (I'm on my way)) → you start → **Dikerjakan** (In progress) → you send it for review → **Menunggu review** (Awaiting review) → the office approves it (**Selesai** (Completed)) or returns it (**Dikembalikan** (Returned)). On screen, this flow appears as four **Progres kunjungan** (Visit progress) steps: **Ditugaskan**, **Dalam perjalanan** (On the way), **Sedang dikerjakan** (In progress) and **Selesai dipasang** (Installed) (**Selesai dikerjakan** (Work completed) on work orders that are not installations).


## Work order details and visit progress


Tap a work order row in the **Pekerjaan** (Jobs) tab.

![Work order details with the Ditugaskan status: Progres kunjungan, the Pelanggan card, and the Saya berangkat and Mulai buttons](~/assets/guide/technician/redesign/spk-step-1-ditugaskan.webp)

The work order details show the title, status, type and priority, schedule, code of the originating ticket (if any), **Progres kunjungan**, **Pelanggan** (Customer), **POP / gudang** (POP / warehouse), **Deskripsi** (Description), **Material** and **Bukti kerja** (Work evidence). While the work order has the **Dikerjakan** status, **Bukti kerja** and **Material** move up directly below **Progres kunjungan**, because that is what you work on at the site; **Pelanggan**, **POP / gudang** and **Deskripsi** move below them. In other statuses the order is as listed above. If the office returns the work order, the **Dikembalikan ke kantor** (Returned to the office) box and **Alasan dikembalikan** (Reason for return) appear at the top (see "Work order returned to the office" below).

**Progres kunjungan** shows the same four steps that the office and the customer see. A tick means the step has been passed, with its time under the step name. A circle with a dot and a bold name is the step in progress. An empty circle is a step not yet reached. The button at the bottom of the screen follows that step: **Saya berangkat**, **Mulai** (Start), then **Selesai dipasang · kirim untuk ditinjau** (Installed · send for review). On work orders that are not installations (maintenance, service upgrade, relocation), the last step is named **Selesai dikerjakan** and the button is **Pekerjaan selesai · kirim untuk ditinjau** (Work completed · send for review). The work order type on screen is written with the name from the office, for example Instalasi (Installation) or Perawatan (Maintenance).

**Dalam perjalanan** is not a work order status. The status stays **Ditugaskan** until you start working. This step only tells the office and the customer that you are heading to the site.

### Customer, installation address and POP

Scroll down to read the **Pelanggan** and **POP / gudang** cards.

![The Pelanggan card with Alamat pemasangan, and the POP / gudang card, each with a Buka di Maps button](~/assets/guide/technician/redesign/spk-step-1-pelanggan-pop.webp)

- The **Pelanggan** card shows the name, the subscription code and package, and the customer phone number. Tap **Telepon** (Phone) to open the dialler. Tap **WhatsApp** to open a conversation with that number. The **WhatsApp** button only appears if the number is an Indonesian mobile number.
- Below it, **Alamat pemasangan** (Installation address) shows the address name, street and city of the customer's home. Tap **Buka di Maps** (Open in Maps) to open directions to the coordinates of that address. If the address has no coordinates yet, the map app searches for the address text.
- The **POP / gudang** card shows the POP or warehouse recorded on the work order, with its own **Buka di Maps** button. Use this button to go to the POP or warehouse, not to the customer's home.
- A work order without a subscription uses a single **Lokasi kerja** (Work location) card with a **Buka di Maps** button.

### PPPoE account for installation

An assigned **Instalasi** work order shows the **Akun PPPoE** (PPPoE account) card if the office has already created the subscription's network account.

- **Nama pengguna** (Username) is always visible and can be copied.
- **Kata sandi** (Password) is masked. Tap **Tampilkan** (Show) to fetch it from the server. The password stays visible for 60 seconds or until you close the screen, then it is masked again. Tap **Salin** (Copy) while it is still visible.
- Revealing needs internet, is limited to 5 times per minute, and every successful attempt is recorded in the audit log. The app does not keep the password in the offline cache or in logs.
- The status **Menunggu ditulis ke router** (Waiting to be written to the router), **Siap dipakai** (Ready to use) or **Belum tertulis, hubungi kantor** (Not written yet, contact the office) shows the synchronisation state.
- The text **Akun PPPoE belum dibuat. Hubungi kantor.** (The PPPoE account has not been created. Contact the office.) means the account is not available yet. This also happens if the company has not enabled RADIUS: the account is not created automatically without RADIUS. Contact the office with the button provided.

Only the technician currently assigned to an **Instalasi** work order with the **Ditugaskan** or **Dikerjakan** status can show the password. If the work order is moved to another technician, the password is replaced: the one you saw is no longer valid and you cannot show it again. Without internet, the app writes "Butuh koneksi internet untuk menampilkan kata sandi." (An internet connection is needed to show the password.) Too many requests show the rate limit message from the server.

### Saya berangkat

Use **Saya berangkat** when you set off for the customer's location.

1. Open a work order with the **Ditugaskan** status.
2. Tap **Saya berangkat** at the bottom.
3. The app asks "Berangkat ke lokasi?" (Set off for the location?) and explains that the customer will be notified in their app. Tap **Saya berangkat**.

![The Berangkat ke lokasi? dialogue](~/assets/guide/technician/redesign/spk-step-2-berangkat-konfirmasi.webp)

The **Dalam perjalanan** step is ticked with its time, and the **Saya berangkat** button disappears. **Mulai** becomes the main button. The customer receives the notification "Teknisi dalam perjalanan" (Technician on the way) containing your first name. Your phone number is not sent.

![Visit progress at the Dalam perjalanan step](~/assets/guide/technician/redesign/spk-step-2-dalam-perjalanan.webp)

Like **Mulai**, the app asks for location permission and records your position. The distance is calculated to the customer's installation address. If you refuse the permission, GPS is off, or the GPS signal cannot be read within 15 seconds, the step is still recorded without a position. Without internet, **Saya berangkat** is saved on the phone and sent automatically when the signal returns (see "Without signal: actions waiting to send"). The customer is notified only when that action has been sent.

You may skip this step. If you are already at the site, tap **Mulai** directly: the **Dalam perjalanan** step still counts as passed, without a time, and the customer does not receive a notification.

### Mulai

To start the job:

1. Open a work order with the **Ditugaskan** status.
2. Tap **Mulai** at the bottom. This button is there both before and after **Saya berangkat**.
3. The app asks "Mulai SPK ini?" (Start this work order?). Tap **Mulai**. The status changes to **Dikerjakan**, the **Sedang dikerjakan** step is ticked with its time, and the office can see it.

![Work order after Mulai: Bukti kerja and the Foto 0/1 chip at the top, before Pelanggan](~/assets/guide/technician/detail-spk-dikerjakan-tanpa-foto.webp)

When you start, the app asks for location permission and records your position as proof of arrival at the site. If you refuse the permission, GPS is off, or the GPS signal cannot be read within 15 seconds, the work order is still started without a position. After the work order starts, the app writes the check-in result at the bottom of the screen: "Check-in tercatat, 120 m dari lokasi" (Check-in recorded, 120 m from the location) (the distance is calculated from your position), or "Mulai tercatat tanpa lokasi" (Start recorded without location) if the position is not available.

Without internet, **Mulai** does not fail: the app saves it on the phone with the **Menunggu kirim** (Waiting to send) mark and sends it when the signal returns (see "Without signal: actions waiting to send"). The send-for-review button is already available while **Mulai** is waiting.

### Far from the customer's location

The office sets the greatest distance between your position and the customer's location when you press **Mulai** (default 500 m). If you are further away, the app opens the **Jauh dari lokasi pelanggan** (Far from the customer's location) window with the distance, for example "Anda berjarak 3,2 km dari lokasi pelanggan. Tulis alasannya untuk melanjutkan." (You are 3.2 km from the customer's location. Write the reason to continue.)

![The Jauh dari lokasi pelanggan window with the Alasan field](~/assets/guide/technician/detail-spk-jauh-dari-lokasi.webp)

1. Type the **Alasan** (Reason) (required, 300 characters at most).
2. Tap **Mulai**. Tap **Batal** (Cancel) if you decide not to start.

The reason is saved on the work order and shown to the office as "Jauh dari lokasi: {alasan}" (Far from the location: {reason}). This window does not appear if your position cannot be read, or if the customer's address has no coordinates yet. The same rule applies to **Mulai** on a ticket. **Saya berangkat** does not ask for a reason.


## Photo evidence and the upload queue


Photo evidence is required before a work order is sent for review. Photos are taken while the work order has the **Dikerjakan** status. During that time, **Bukti kerja** is near the top of the screen and its title includes a photo count chip, for example **Foto 0/1** (Photo 0/1): the photos already sent or still in the queue, out of the minimum needed before the work order can be sent. The chip is in a warning colour while photos are missing and green when there are enough; the numbers themselves already convey the state.

1. In the **Bukti kerja** section, tap **Ambil foto** (Take photo).
2. Choose the source in the **Ambil foto dari** (Take photo from) sheet: **Kamera** (Camera) or **Galeri** (Gallery).
3. Take a photo, or choose one or more photos from the gallery. No question window follows: each photo goes straight into the queue.
4. The app writes "Foto masuk antrean unggah." (Photo added to the upload queue.) (or "N foto masuk antrean unggah." (N photos added to the upload queue.) for several photos from the gallery) and tries to send. For a camera photo, that message has an **Ambil lagi** (Take another) button that opens the camera for the next photo.
5. If you need a caption, type it in the **Keterangan (opsional)** (Remarks (optional)) field on the waiting photo card (255 characters at most). Each new photo is held for 6 seconds before sending so that the caption is sent with it, and each keystroke gives you another 6 seconds. Tap **Kirim sekarang** (Send now), pull the screen down, or reopen the app to send without waiting. Once a photo starts to send, its caption is read-only.

The app shrinks photos before sending: JPEG format, longest side at most 1920 pixels, and the EXIF data (including the photo's GPS location) is removed. The resulting file size is far below the 10 MB server limit.

Photos are not lost when the signal is poor. Each photo goes into the **antrean unggah** (upload queue) on the phone first and is sent one at a time, oldest first. Photos not yet sent appear in the **Bukti kerja** section and in the **N foto belum terkirim** banner.

![The Antrean unggah screen](~/assets/guide/technician/antrean-unggah.webp)

Tap the banner to open **Antrean unggah**. Each photo has a status:

- **Menunggu** (Pending): not sent yet, the app will retry by itself.
- **Mengunggah** (Uploading): being sent.
- **Gagal** (Failed): the server rejected the photo, or the photo file is missing from the phone.

The buttons on this screen:

- **Kirim sekarang**: send all waiting photos without waiting for the automatic pause.
- **Coba lagi** (Try again) (Gagal photo): put the photo back in the queue and send it.
- **Hapus** (Delete): remove the photo from the queue. This photo has not been sent and is lost from the phone.

To delete a photo that has already been sent: tap the photo in **Bukti kerja**, then **Hapus** and confirm "Hapus foto ini?" (Delete this photo?). You can only delete photos that you uploaded yourself, while the work order is still **Dikerjakan**. This button needs internet.

### Common errors with photos

- **"Foto tidak dapat diproses. Coba lagi." (The photo cannot be processed. Try again.)** The chosen file is not an image that can be read. Take the photo again.
- **"Server menolak foto ini." (The server rejected this photo.)** The photo does not meet the server rules (JPG or PNG, 10 MB at most) or the work order no longer accepts evidence. Delete it from the queue and take a new photo, or contact the office.
- **"Berkas foto hilang dari ponsel." (The photo file is missing from the phone.)** The file was deleted from the phone storage. Delete the row and take the photo again.
- **A photo was interrupted because Android closed the app.** When the app is opened again, it restores that photo to the queue and writes "Foto yang terputus dipulihkan dan masuk antrean unggah." (The interrupted photo was restored and added to the upload queue.)
- **Signing out while photos or actions are still in the queue.** The app warns "N bukti atau aksi belum terkirim akan dihapus. Keluar?" (N evidence files or actions not yet sent will be deleted. Sign out?). Send them first so they are not lost.


## Material on a work order


The **Material** section in the work order details shows the work order materials: **Dialokasikan** (Allocated) and **Terpakai** (Used). **Dialokasikan** is only filled on old work orders, because the office no longer writes planned quantities; on new work orders the number is 0. While the work order is **Dikerjakan**, you can record usage yourself. While the work order is **Ditugaskan** or **Dikerjakan**, the **Minta material** (Request material) button opens an item request for that work order (the New item request section).

![Work order with the Dikerjakan status and the Tambah material button](~/assets/guide/technician/detail-spk-material.webp)

### Add or change usage

1. In the **Material** section, tap **Tambah material** (Add material).
2. On the **Pilih material** (Choose material) screen, type the name or code in **Cari material** (Search material), then tap the material that was used. A material that does not appear is not in the company's active material list, or is a serial-numbered device managed by the office.

   ![The Pilih material screen](~/assets/guide/technician/pilih-material.webp)

3. In the **Catat pemakaian** (Record usage) window, fill in **Jumlah** (Quantity) (more than 0, at most two decimal digits; a comma or a full stop is the same), then tap **Simpan** (Save).
4. The app writes "Material dicatat." (Material recorded.)

If that material is already on the work order, the **Terpakai** quantity is replaced with the new number. To change the quantity, repeat the steps above and enter the correct number. The **Dialokasikan** quantity from the office does not change.

### Delete usage

1. On the material row, tap **Hapus**.
2. Confirm "Hapus pemakaian material ini?" (Delete this material usage?). The used quantity of that material on the work order becomes 0.

A row planned by the office stays visible with **Terpakai** 0, only your usage is deleted. A row without usage from you has no **Hapus** button. If the server refuses, the row writes "Baris ini tidak bisa diubah dari aplikasi" (This row cannot be changed from the app) and the button disappears.

Adding, changing and deleting material needs internet.


## Sending for review


When the job is finished, send the work order to the office to be checked.

![Work order with two photo evidence files and the Selesai dipasang · kirim untuk ditinjau button now active](~/assets/guide/technician/detail-spk-dikerjakan-2-foto.webp)

The **Selesai dipasang · kirim untuk ditinjau** button (on installation work orders) or **Pekerjaan selesai · kirim untuk ditinjau** (other types) at the bottom of the work order details is active only when all these conditions are met:

- At least **one photo evidence** file has been sent. Without a photo, the app writes "Belum ada foto bukti" (No photo evidence yet). The **Foto n/1** chip in the **Bukti kerja** title shows the count.
- No photo is still in the queue. The app writes "Tunggu N foto terkirim" (Wait for N photos to be sent).
- All material declarations have been sent (see [chapter 5](/docs/guides/technician/materials-and-item-requests/)). The app writes "Deklarasikan material dulu" (Declare the materials first) while something still needs to be declared.

Internet is no longer a requirement. Without signal, the tap on the send button is saved on the phone as "Kirim SPK untuk ditinjau" (Send work order for review), marked **Menunggu kirim**, and sent by itself after its photos have arrived.

Steps:

1. Make sure the conditions above are met and the red text below the button has disappeared.
2. Tap that send button.
3. The work order status changes to **Menunggu review**, and the **Selesai dipasang** (or **Selesai dikerjakan**) step is ticked with its time.

![Complete visit progress: all four steps ticked and the Menunggu review status](~/assets/guide/technician/redesign/spk-step-4-selesai-dipasang.webp)

The office then approves the work order (**Selesai**) or returns it (**Dikembalikan**) with an **Alasan dikembalikan**. You receive a notification for both ([chapter 6](/docs/guides/technician/notifications/)). A returned work order does not appear in the job list until the office assigns it again. After that the work order appears again as **Ditugaskan**, the **Alasan dikembalikan** box appears at the top, and **Progres kunjungan** starts from the beginning with the new assignment time.

### Work order returned to the office

If the office does not approve the work, the work order status becomes **Dikembalikan**. The work order details show the **Dikembalikan ke kantor** box with the text "Menunggu penugasan ulang." (Waiting for reassignment.) below the title card, then the **Alasan dikembalikan** box containing the reason from the office. While it waits, you cannot work on that work order.

- **Telepon kantor** (Call the office) opens the dialler to the company's phone number.
- **WhatsApp kantor** (WhatsApp the office) opens a conversation with the company's WhatsApp number.

A button whose number the ISP has not filled in does not appear. If the ISP fills in both, both are there. A returned work order does not appear in the **Pekerjaan** tab; open it from the notification "SPK ditolak" (Work order rejected).

### Common errors with work orders

- **The send-for-review button is inactive.** Read the red text below it, that is the condition not yet met.
- **A message from the server on Mulai or send.** If the work order status has already changed (for example it was cancelled or reassigned by the office), the app shows the reason from the server and reloads the work order.
- **"Data sudah berubah. Kami memuat ulang." (The data has changed. We are reloading.)** Someone else changed the work order while you had it open. Check the new content of the screen, then repeat the action.
- **"Anda tidak punya akses untuk tindakan ini." (You do not have access for this action.)** The work order was reassigned to another technician or its status does not allow that action.
- **Saved action "Gagal dikirim: {alasan}" (Failed to send: {reason}).** The server rejected an action that was waiting for signal, for example the work order was already reassigned. Tap **Coba lagi** or **Buang** (Discard) (see the next section).


## Without signal: actions waiting to send


These actions do not fail when the signal is lost: **Saya berangkat**, **Mulai** (work orders and tickets), sending a work order for review, **Selesaikan** (Complete) on a ticket, ticket comments, material declarations and item requests. The app saves them on the phone and sends them by itself when the signal returns, one at a time in the order you tapped them, per work order or ticket. A resend caused by a lost signal uses the same key, so the server does not record it twice.

![A work order whose Mulai is saved: the offline banner and the Menunggu kirim mark](~/assets/guide/technician/detail-spk-menunggu-kirim.webp)

1. Tap the action and confirm as usual.
2. Without signal, the screen writes the banner "Anda sedang luring. Aksi disimpan dan dikirim otomatis saat online." (You are offline. Actions are saved and sent automatically when online.) The action appears above the button, marked **Menunggu kirim**. The button for the same action is no longer offered.
3. When the signal returns, the mark changes to **Mengirim** (Sending), then disappears if the server accepts it. Tap **Coba lagi** in the banner to check the signal and send right away.

If the server rejects the action, the mark becomes **Gagal dikirim: {alasan}** with two buttons:

- **Coba lagi** sends the action again. For a **Mulai** that was rejected because you were far from the location, the app asks for the **Alasan** first.
- **Buang** deletes the action from the phone after you confirm "Buang aksi ini?" (Discard this action?). A discarded action is never sent.

A rejected action holds back the actions behind it for the same work order or ticket until you decide on it. On any screen, the red notice "N aksi gagal dikirim" (N actions failed to send) with the **Lihat aksi** (View actions) button opens the **Aksi belum terkirim** (Actions not yet sent) sheet, which lists all waiting actions from all work orders and tickets ("Semua aksi sudah terkirim." (All actions have been sent.) when empty).

### Not certain to have been sent

Sometimes an action has reached the server, but the answer did not reach the phone, for example the signal dropped just as the server answered. The app tries again several times, then stops after about 30 minutes without a clear answer. That action appears with the text "Belum pasti terkirim. Aksi ini mungkin sudah sampai, dan mengirim ulang tidak membuatnya ganda." (Not certain to have been sent. This action may have arrived, and sending again does not make it a duplicate.) Time with no signal at all is not counted.

- First check the status of the work order or ticket on screen. The app reloads it when the action stops.
- **Coba lagi** sends the same action one more time. The server recognises an action it has already received and does not record it twice, so a comment or item request does not become a duplicate.
- **Buang** stops the sending after you confirm "{aksi} belum pasti terkirim dan mungkin sudah sampai. Bila dibuang, aplikasi berhenti mengirimnya. Periksa statusnya di layar dulu." ({action} is not certain to have been sent and may have arrived. If discarded, the app stops sending it. Check its status on screen first.) An action that has arrived stays recorded at the office.

Some things still need internet and their buttons are inactive with the text "Butuh koneksi internet" (An internet connection is needed): showing the PPPoE password, adding, changing and deleting material on a work order, ticket attachments, deleting a photo that has already been sent, cancelling an item request, the test notification, and signing in.
