---
title: "5. Materials and item requests"
description: "Declare used and returned materials for a work order, request items from the warehouse, and track or cancel your item requests in the technician app."
---

The **Material** tab has two sections: materials that are **Perlu dideklarasi** (Need declaring) and **Permintaan barang saya** (My item requests).

![The Material tab](~/assets/guide/technician/material.webp)


## Material declaration (returns)


After the warehouse hands over items for your work order (SPK), you must report how much was used and how much came back in good condition. The remainder, which was not used and not returned, is calculated by the app as a difference (damaged or lost). Returns waiting for your report appear in the **Perlu dideklarasi** section, labelled **Perlu dideklarasi** or **Perlu koreksi** (Needs correction). While anything is not yet declared, the work order cannot be sent for review.

![The Deklarasi material (Material declaration) screen](~/assets/guide/technician/deklarasi-material.webp)

1. In the **Material** tab, tap a row in **Perlu dideklarasi**. Or tap the return notification, or the **Deklarasi** (Declaration) button on the work order.
2. For each item, the app writes **Diserahkan** (Handed over) (the quantity from the warehouse), for example "Diserahkan 10 m". If the work order has already recorded usage of that item, **Terpakai** (Used) is filled with the number from the work order record (at most the handed over quantity), **Kembali baik** (Returned in good condition) is filled with the remainder, and under **Terpakai** the text "Dari catatan SPK" (From the work order record) appears until you type another number. If the work order recorded nothing and you have not reported before, **Terpakai** equals **Diserahkan** and **Kembali baik** is 0. Change the numbers to match what happened:
   - **Terpakai**: the quantity you used.
   - **Kembali baik**: the quantity of leftovers that are still good.
   - **Selisih** (Difference): not typed. The app calculates it (Diserahkan minus Terpakai minus Kembali baik) and writes, for example, "Selisih 2 m" (Difference 2 m). A difference of zero means the numbers match.
3. If **Selisih** is more than 0, you must choose **Penyebab selisih** (Cause of difference) (**Rusak** (Damaged), **Hilang** (Lost) or **Lainnya** (Other)) and fill in **Alasan selisih** (Reason for difference). That field only appears when there is a difference.
4. Tap **Semua terpakai** (All used) if all items were used: that button fills **Terpakai** equal to **Diserahkan** and **Kembali baik** 0 for every item.
5. If needed, fill in **Alasan keseluruhan (opsional)** (Overall reason (optional)), 1000 characters at most.
6. Tap **Kirim deklarasi** (Send declaration).

Numbers must be 0 or more; a comma or a full stop is the same. If the office asks for a correction, **Alasan koreksi** (Reason for correction) appears above the form; fix the numbers and send again. A declaration that has been sent and needs no correction is read-only: "Deklarasi ini tidak dapat diubah sekarang." (This declaration cannot be changed now.)

Common errors:

- **"Isi angka 0 atau lebih." (Enter a number of 0 or more.)** A field is empty or contains text.
- **"Terpakai dan kembali melebihi yang diserahkan" (Used and returned exceed what was handed over)** appears below Selisih: the Terpakai quantity plus Kembali baik is larger than Diserahkan. Reduce one of them, because the declaration cannot be sent while the numbers exceed it.
- **"Pilih penyebab selisih." (Choose the cause of the difference.)** or **"Isi alasan selisih." (Fill in the reason for the difference.)** A difference of more than 0 needs a cause and a reason.
- **"Deklarasi sudah dikirim dengan nilai berbeda. Muat ulang." (The declaration has already been sent with a different value. Reload.)** The declaration was already sent from another device or earlier. The app reloads its data.
- Without internet, **Kirim deklarasi** saves the declaration and writes "Deklarasi disimpan. Dikirim otomatis saat online." (Declaration saved. Sent automatically when online.)


## New item request


Use this when you need items from the warehouse for a job.

![The Permintaan barang (Item request) screen with Gudang asal, SPK, Alasan and the requested items](~/assets/guide/technician/permintaan-baru.webp)

There are two ways in:

- From the work order details: in the **Material** section, tap **Minta material** (Request material). This button appears while the work order is **Ditugaskan** (Assigned) or **Dikerjakan** (In progress), and the form opens with that work order already selected.
- From the **Material** tab: tap **Permintaan baru** (New request) (the floating button at the bottom right).

Then fill in the form:

1. Choose **Gudang asal** (Source warehouse). If there is only one warehouse, it is selected automatically. If there are several, the one selected is the warehouse you used on your last request as long as it still has stock, or otherwise the warehouse with the most available items. Each warehouse in the list shows "{n} barang tersedia" ({n} items available), or "Stok kosong" (Out of stock) with a warning icon if nothing is available. Changing the warehouse reloads the availability of every item. If the list is empty, the app writes "Belum ada gudang yang bisa dipilih. Hubungi kantor." (No warehouse can be chosen yet. Contact the office.)
2. Check the **SPK** field. The choices are **Tanpa SPK** (Without a work order) and your **Ditugaskan** or **Dikerjakan** work orders, each written as "code · title". This field fills in by itself. If you came from **Minta material**, that work order is selected. If you came from the **Material** tab, the one selected is the work order you are working on, or if there is none, the **Ditugaskan** work order with the nearest schedule. Change the choice, or choose **Tanpa SPK** if the items are not for a work order.
3. Fill in **Alasan (opsional)** (Reason (optional)), 2000 characters at most. If it is left empty and a work order is selected, the reason reads "Permintaan material untuk SPK" (Material request for work order) followed by the work order number.
4. Tap **Tambah barang** (Add item). The **Pilih material** (Choose material) screen groups items by category (alphabetical, **Tanpa kategori** (No category) last). Each item shows **Stok {jumlah} {satuan}** (Stock {quantity} {unit}) for the chosen warehouse, or **Stok kosong** with a warning icon if the quantity is 0. Search for and tap an item, then fill in **Jumlah diminta** (Quantity requested). A quantity above the stock shows the warning **Melebihi stok tersedia ({jumlah} {satuan})** (Exceeds available stock ({quantity} {unit})), but it does not block the request because the warehouse can still receive stock. Tap **Tambah** (Add) and repeat for other items.
5. To remove an item row, tap the bin icon next to it.
6. Tap **Kirim permintaan** (Send request).

The app writes "Permintaan REQ-xxxx diajukan." (Request REQ-xxxx submitted.) The request goes straight into the warehouse queue, with no draft stage. Without internet, the app saves the request, closes the form and writes "Permintaan disimpan. Dikirim otomatis saat online." (Request saved. Sent automatically when online.); the new request appears in **Permintaan barang saya** after it has been sent.

A request that includes a work order becomes material of that work order. Items that the warehouse hands over for that work order are counted against the work order's usage, so when the office approves the work order, those items are not deducted from stock a second time. The warehouse cannot hand over items if the work order is already completed or cancelled.

Common errors:

- **"Pilih gudang asal." (Choose the source warehouse.)** or **"Tambahkan minimal satu barang." (Add at least one item.)** appear when that part has not been filled in.
- **"SPK harus SPK aktif (ditugaskan atau dikerjakan) milik Anda." (The work order must be one of your active work orders (assigned or in progress).)** appears below the **SPK** field: that work order has been completed, cancelled or moved to another technician since the list was loaded. Choose another work order or **Tanpa SPK**.
- Other messages from the server appear below the field concerned, and the rejected request is not saved on the phone.


## Tracking and cancelling requests


In **Permintaan barang saya**, each request shows the code, the items and quantities, the related work order (tap it to open), and the status. The item row writes how much has progressed, not only how much you requested: after the warehouse approves, "Kabel UTP: disetujui 50 dari 80" (UTP cable: approved 50 of 80), and after the items are handed over, "Kabel UTP: diserahkan 50 dari 80" (UTP cable: handed over 50 of 80). Before that the row only writes the requested quantity.

| Status | Meaning |
| --- | --- |
| Diajukan (Submitted) | Waiting for the warehouse |
| Disetujui (Approved) | The warehouse approves and allocates the items |
| Disiapkan (Prepared) | The warehouse prepares the items |
| Siap diambil (Ready for pickup) | The items are ready, collect them at the warehouse |
| Diserahkan | The items have been handed over to you |
| Ditolak (Rejected) | The warehouse rejects the request |
| Dibatalkan (Cancelled) | The request is cancelled |

To cancel a request that is still waiting for the warehouse:

1. Tap **Batalkan** (Cancel) on the request row. The button only exists while the request can still be cancelled.
2. In the window "Batalkan permintaan REQ-xxxx?" (Cancel request REQ-xxxx?), fill in a reason (optional).
3. Tap **Batalkan permintaan** (Cancel request). Tap **Kembali** (Back) to keep it.

A cancelled request cannot be restored. If the warehouse has already approved the request when you press the button, the app reloads the list and the request is not cancelled.

Pull the **Material** tab down to refresh both lists. The lists also refresh by themselves when the app is reopened, when you open the **Material** tab, and after you send a declaration (immediately), and about 1 second after the last notification in a burst.
