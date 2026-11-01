---
title: "5.5 ODN"
description: "Track the passive fibre network in Inbils: PON ports on OLTs, splitters on ODCs and ODPs, and the drop port each subscription uses."
---

ODN is a passive register of the fibre optic network: PON ports on OLTs, splitters on ODCs and ODPs, and the drop port each subscription uses. The register only records and does not contact devices. Open this menu to see how full each ODP is, who is behind each PON port, and which active subscriptions do not have a drop port yet.

The OLT, ODC and ODP themselves are registered in **Aset Jaringan** (Network assets) ([section 5.2](/docs/guides/web/network/network-assets/)), with the **Tipe aset** (Asset type) OLT, ODC or ODP.

The device panel (**Panel perangkat**) ([section 5.6](/docs/guides/web/network/device-panel/)) draws the OLT, ODC and ODP as they look in real life and opens a port sheet with the same ODN actions. The fibre path of a customer is also drawn there.

Roles that can use it: admin and manager (all actions), staff (view and set drop ports, without managing PON ports and splitters). Permissions: `odn.view` to open the menu and the ODN pages, `odn.manage` to add and delete PON ports and splitters and to connect splitters, `odn.assign` to record and release drop ports. The data applies per active company ([section 1.6](/docs/guides/web/introduction/switch-company/)).

## Opening and reading the list

1. In the sidebar, open the **Jaringan** (Network) group, then click **ODN**.
2. Set up the list with three filters above the table: **Cari** (Search), **POP**, and **ODP minimal terpakai (%)** (ODP minimum used (%)) (enter 0 to 100). **Cari** searches the code and name of an ODP or OLT, the label of a PON port, or the subscription code and customer name in the **Langganan tanpa port drop** (Subscriptions without a drop port) tab. **POP**: type to search, then choose, and the **Hapus pilihan** (Clear selection) button empties it. In the ODP and **Port PON** (PON ports) tabs, **POP** keeps the assets whose location is under that POP. In the **Langganan tanpa port drop** tab, this filter matches the serving POP of the subscription. **ODP minimal terpakai (%)** applies only in the ODP tab and keeps the ODPs that are used by that much or more. A new filter always starts each tab from the first page. If the filters find nothing, the tab writes "Tidak ada ODP yang cocok" (No matching ODPs) (or "Tidak ada port PON yang cocok" (No matching PON ports), "Tidak ada langganan yang cocok" (No matching subscriptions)) with the **Reset filter** (Reset filters) button.

   ![The ODN page with three filters and the tabs ODP, PON ports, and Subscriptions without a drop port, each with its row count](~/assets/guide/web/odn.webp)

3. Read the **ODP** tab. Its name is followed by the number of ODPs in brackets. The **ODP** column holds the ODP code, and clicking that code opens the ODP page. The **Nama** (Name) and **Lokasi** (Location) columns hold the ODP name and its location path. The **Kapasitas** (Capacity) column counts the output ports of all splitters in that ODP, with the badge **Tanpa splitter** (No splitter) if the ODP has no splitter yet. The **Terpakai** (Used) column counts the outputs held by a subscription or feeding another splitter. The **Kosong** (Free) column is the remainder, with the badge **Penuh** (Full) when none are left. The **Pemakaian** (Utilisation) column shows a bar and the utilisation percentage with the same colours as in IP addresses.
4. Read the **Port PON** tab. Each row is one PON port of an OLT, written "PON" followed by the number and the label if there is one. The **Pelanggan** (Customers) column counts the subscriptions behind that port through all splitter levels. Click the code in the **OLT** column to open the OLT page.
5. Read the **Langganan tanpa port drop** tab. This tab lists subscriptions with the status Aktif (Active) that have no drop port yet, as a list for completing the data. Its columns are **Langganan** (Subscription), **Pelanggan** (Customer), **POP layanan** (Service POP), and **Status**. Click the code in the **Langganan** column to open the subscription page. Subscriptions with another status do not appear. If all active subscriptions already have a drop port, the tab writes "Semua langganan aktif punya port drop" (All active subscriptions have a drop port).

   If there is no ODP at all yet, the **ODP** tab writes **Belum ada ODP** (No ODPs yet) with the remark "ODP adalah aset jaringan bertipe ODP. Daftarkan satu, lalu tambahkan splitter agar punya port." (An ODP is a network asset of type ODP. Register one, then add a splitter so that it has ports.) Holders of Create network asset (`network_asset.create`) also see the **Daftarkan ODP** (Register ODP) button. That button opens the **Buat Aset Jaringan** (Create Network Asset) form with **Tipe aset** already set to ODP ([section 5.2](/docs/guides/web/network/network-assets/)).

Each tab shows 25 rows per page, with **Sebelumnya** (Previous) and **Berikutnya** (Next) if there is more than one page.

## Opening the OLT, ODC, or ODP page

1. From the **ODP** tab, click the ODP code. From the **Port PON** tab, click the OLT code.
2. For an ODC, or an OLT that has no PON port yet, open **Aset Jaringan** ([section 5.2](/docs/guides/web/network/network-assets/)), open that asset, then click **Port ODN** (ODN ports). This button appears for assets of type OLT, ODC, and ODP for holders of `odn.view`.
3. Read the page. Its title is the asset code, with its name, type, and location path below it. The **ODN** button returns to the list, and **Data aset** (Asset data) opens the asset in Network assets (needs `network_asset.view`). Holders of `odn.manage` also see **Tambah port PON** (Add PON port) on an OLT, or **Tambah splitter** (Add splitter) on an ODC and ODP. An ODC or ODP without a splitter writes "Belum ada splitter di" (No splitter yet in) followed by the asset type.

   ![The ODP page: the ODN, Asset data, and Add splitter buttons, and the splitter card with its output ports](~/assets/guide/web/odn-asset.webp)

## Adding PON ports to an OLT

1. Open the OLT page, then click **Tambah port PON**.
2. Fill in **Jumlah port** (Number of ports) in the **Tambah port PON ke** (Add PON ports to) dialog followed by the OLT code: required, an integer from 1 to 64, initial value 1. New ports are numbered after the highest existing number.
3. Click **Tambah port** (Add ports). The toast `<jumlah> port PON dibuat di <kode OLT>.` (`<number>` PON ports created in `<OLT code>`.) appears.

The **Port PON** card on the OLT page holds the columns **Port PON** (written "PON" followed by the number), **Splitter** (**Belum terhubung** (Not connected), or "Splitter #" followed by the internal number of the connected splitter), **Pelanggan**, and **Aksi** (Actions) for holders of `odn.manage`. That internal number is not the same as the ratio or label of the splitter. To find the splitter, open the ODC or ODP page and match it through the **Masukan** (Input) row on the splitter card.

## Adding a splitter to an ODC or ODP

1. Open the ODC or ODP page, then click **Tambah splitter**.
2. Fill in the form in the **Tambah splitter ke** (Add splitter to) dialog followed by the asset code:
   - **Rasio** (Ratio): required. The choices are 1:2, 1:4, 1:8, 1:16, 1:32, and 1:64, initial value 1:8. The ratio sets the number of output ports created.
   - **Port masukan** (Input port): optional. Type the asset code, splitter label, or port label (at least 2 letters), then choose. The list shows 20 free ports at most, that is, PON ports of an OLT or output ports of another splitter in this company, written like "OLT-1 · PON 3" or "ODC-2 · 1:4 · keluaran 2" (output 2). The **Hapus pilihan** button empties the field, and an empty field means it is connected later. If there is no result, the list writes "Tidak ada port kosong yang cocok." (No matching free ports.)
   - **Label**: optional, 100 characters at most. The label helps to recognise the splitter on the card and in the input port list.
3. Click **Tambah splitter**. The toast `Splitter 1:<jumlah> ditambahkan ke <kode aset>.` (Splitter 1:`<number>` added to `<asset code>`.) appears, and the splitter card shows on the page.

The splitter card title reads "Splitter 1:8", followed by the sign "-" and the label if there is one. Below it is the **Masukan** row with the upstream port (or "belum terhubung" (not connected)) and the number of outputs used. Holders of `odn.manage` see the **Port masukan** field with the **Simpan sambungan** (Save connection) button, and the **Hapus** (Delete) button. Below that is one box per output port. A port box says **Kosong**, "Menyuplai splitter" (Feeding splitter) followed by the internal number of its downstream splitter, or the code of the subscription that holds the port (click to open the subscription) with the customer name and the **Lepas** (Release) button for holders of `odn.assign`.

## Connecting or disconnecting a splitter

1. On the splitter card, choose a port in **Port masukan**: type to search, then choose. An empty field (**Belum terhubung**) disconnects it, and the **Hapus pilihan** button empties it.
2. Click **Simpan sambungan**. This button becomes active after the choice changes. The toast "Splitter diperbarui." (Splitter updated.) appears.

The upstream port must be free, that is, not held by a subscription and not the input of another splitter. A splitter must not be connected to its own output or to its downstream, and the chain upwards is at most 8 splitters.

## Deleting a PON port or splitter

1. For a PON port, click **Hapus** on its row in the **Port PON** card, then click **Hapus port** (Delete port) in the **Hapus PON** (Delete PON) dialog followed by its number. This button exists only on ports that are **Belum terhubung**. The numbers of other ports do not change. The toast "Port PON dihapus." (PON port deleted.) appears.
2. For a splitter, click **Hapus** on its card, then click **Hapus splitter** (Delete splitter). Its output ports are deleted with it. The toast "Splitter dihapus." (Splitter deleted.) appears.

This deletion needs `odn.manage`. A splitter that still has drops or downstream splitters is refused with a red message in the dialog: "Masih ada yang terhubung ke keluarannya. Lepas port drop dan putuskan splitter hilir lebih dulu." (Something is still connected to its outputs. Release the drop ports and disconnect the downstream splitters first.)

## Recording and releasing a customer drop port

Record the drop port from the new customer form, from the subscription page, or from the port sheet of an ODP in the device panel (**Pasang pelanggan** (Connect customer), [section 5.6](/docs/guides/web/network/device-panel/)), not from the ODN list page. The ODN page only shows who holds a port and offers the **Lepas** button. All these steps need `odn.assign`.

1. In the new customer form, open the **Langganan & SPK** (Subscription and work order) tab, choose **POP pelayan** (Serving POP), then fill in **Port drop (ODP)** (Drop port (ODP)). This field is optional and appears only for holders of `odn.assign`. Before a POP is chosen, the field is inactive with the hint "Pilih POP layanan untuk melihat port kosongnya." (Choose the service POP to see its free ports.) Each port is written with the ODP name, the number of free ports, and the distance of the ODP from the installation address ([section 4.1](/docs/guides/web/customers-and-services/customers/)).
2. On the subscription page, open the **Port drop** card, then click **Atur port drop** (Set drop port). If the subscription already has a port, the button is **Pindahkan port drop** (Move drop port). The card writes "Belum ada port drop tercatat." (No drop port recorded yet.) if there is no port.
3. In the **Atur port drop** dialog followed by the subscription code, fill in **Port drop (ODP)**: type the ODP code or splitter label (at least 2 letters), then choose. The list shows 20 free ODP output ports at most under the serving POP of the subscription, written `<kode ODP> · <rasio atau label splitter> · port <nomor>` (`<ODP code> · <ratio or splitter label> · port <number>`) with the location path below it. An ODP that is already full is not offered. The old choice stays valid while you type. The choice changes only if you choose another port or press **Hapus pilihan**.
4. Click **Atur port drop**, or **Pindahkan port drop** if moving. This button becomes active only after you choose a port. The toast "Port drop dicatat." (Drop port recorded.) appears, and the old port is freed when moving.
5. To release, click **Lepas** on the **Port drop** card, then click **Lepas port drop** (Release drop port) in the confirmation dialog. Or click **Lepas** on a port in the splitter card. The subscription stays subscribed and the port becomes free. The toast "Port drop dilepas." (Drop port released.) appears.

A drop port must be a free ODP output port, and the ODP must be under the serving POP of the subscription. The subscription must have the status Menunggu (Pending), Aktif, or Ditangguhkan (Suspended). When a subscription is terminated, the system releases its drop port by itself.

## Common errors

- The **Port masukan** or **Port drop (ODP)** field shows no list: you have not typed 2 letters yet (the field writes `Ketik minimal 2 huruf untuk mencari.` (Type at least 2 letters to search.)), or no free port matches. Add PON ports or a splitter, or release a port that is not used. Each search shows 20 ports at most, so type more letters if the port you look for does not appear.
- An ODP does not appear in the **ODP** tab if its asset is not of type ODP, has been deleted, or (when the **POP** filter is used) is placed directly at the location of that POP. The **POP** filter matches only locations under the POP, that is, a Rack or a Site. Fix it in Network assets ([section 5.2](/docs/guides/web/network/network-assets/)).
- `ODP ini tidak berada di bawah POP layanan langganan <kode>.` (This ODP is not under the service POP of subscription `<code>`.) means the ODP location is outside the serving POP of the subscription. Change the ODP location in Network assets to a location under that POP, or change the serving POP of the subscription.
- "Langganan ini belum punya POP layanan, jadi belum ada port yang bisa ditawarkan." (This subscription has no service POP yet, so no ports can be offered yet.) means the subscription has no serving POP. Fill in the serving POP first.
- "Tidak ada port kosong yang cocok di bawah POP ini." (No matching free ports under this POP.) means no free ODP output port under the serving POP matches the typed word.
- "Port ini sudah dipakai." (This port is already in use.) means the port is already held by a subscription or is the input of a splitter. Reopen the page and choose another port.
- "Splitter tidak dapat dihubungkan ke keluarannya sendiri atau ke apa pun di hilirnya." (A splitter cannot be connected to its own output or to anything downstream of it.) refuses a connection that forms a loop. Choose an upstream port outside the downstream of that splitter.
- `Rantai fiber di atas port ini lebih dari 8 splitter.` (The fibre chain above this port is longer than 8 splitters.) refuses a splitter chain that is too deep. Connect to a port closer to the OLT.
- `Langganan <kode> tidak dalam layanan, jadi tidak dapat memakai port drop.` (Subscription `<code>` is not in service, so it cannot use a drop port.) means only subscriptions with the status Menunggu, Aktif, or Ditangguhkan may hold a drop port.
- "Masih ada yang terhubung ke keluarannya. Lepas port drop dan putuskan splitter hilir lebih dulu." refuses the deletion of a splitter. Release all drop ports and disconnect the downstream splitters first.
- "Sebuah splitter terhubung ke port PON ini. Putuskan lebih dulu." (A splitter is connected to this PON port. Disconnect it first.) refuses the deletion of a PON port that was just connected. Disconnect the splitter, then delete the port.
- The buttons **Tambah port PON**, **Tambah splitter**, **Simpan sambungan**, and **Hapus** do not appear without `odn.manage`. Staff have only `odn.view` and `odn.assign`.
