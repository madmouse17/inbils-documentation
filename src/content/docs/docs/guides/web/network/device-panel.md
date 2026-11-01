---
title: "5.6 Device panel (Panel perangkat)"
description: "Read port status on routers, switches, OLTs, ODCs, ODPs and racks, connect ports, mount devices in racks and trace a customer's fibre path."
---

The device panel (**Panel perangkat**) draws routers, switches, OLTs, ONU/ONTs, ODCs, ODPs and racks as the real device face looks: each port is where that port really is, and its colour shows its status. Open the panel when you need to know which port is free or used, which device is connected to a port, who the customer behind that port is, and through which OLT, ODC and ODP a customer's fibre runs. The panel only reads and records data in Inbils. Inbils does not contact the devices, so link lights and traffic per port are not here.

Roles that can use it: admin, manager and staff see the panel, and only admin and manager change it. Permissions: `network_asset.view` opens the panel, and `odn.view` adds the ODN data in it (PON ports, splitters, customers on ports, fibre path). `network_asset.update` allows choosing a model, labelling, connecting ports, and mounting devices in a rack. Choosing or replacing an OLT and ODP model also needs `odn.manage`. Connecting a customer to an ODP port and releasing a drop port needs `odn.assign`, which the built-in staff role also holds. The panel adds no new permission. The pictures in this section are taken from sample data without RADIUS, so customer ports are coloured **Terpakai** (In use), not **Online** or **Offline** (see "Reading the port colours").

## Opening the panel

1. In the sidebar, open the **Jaringan** (Network) group, click **Aset Jaringan** (Network assets), then click the asset code ([section 5.2](/docs/guides/web/network/network-assets/)). The **Panel perangkat** card is above the **Detail aset** (Asset details) card, and exists only for assets of type Router, Switch, OLT, ONU/ONT, ODC, ODP and Rack.
2. The same panel shows in three other places: the **Panel router** (Router panel) card in the **Router NAS** (NAS routers) details (for the router asset that belongs to that NAS, [section 5.3](/docs/guides/web/network/nas-routers/)), the **Panel perangkat** card on the OLT, ODC and ODP pages in **ODN** ([section 5.5](/docs/guides/web/network/odn/)), and the fibre path in **Lacak Aset** (Trace Asset) (see "Tracing the fibre path").
3. Wait for the picture to appear. While data loads, the card shows grey areas, and the rest of the page can already be read.
4. Read the remark below the card title: the model name and its unit height (for example "MikroTik CCR2004-16G-2S+ · 1U"), "Susunan manual" (Manual layout) followed by the number of ports if the ports are arranged by hand, or, on a rack, the rack height and the number of devices ("42U · 2 perangkat" (devices)). ODCs and ODPs have no remark, because their picture follows the splitters.
5. Read the picture like the real unit. Port numbers are printed above or below the port, block names ("Slot 1", "Ethernet 1-8", "Uplink") are below the block, and the power, console, USB, WLAN and reset symbols are only pictures that cannot be clicked.

   ![The device panel of an OLT: eight slot rows holding 16 PON ports and four uplink ports, the In use and Free legend, and the tooltip of port gpon-olt_1/1/1](~/assets/guide/web/panel-olt.webp)

## Choosing the device model

A newly created Router, Switch, OLT and ONU/ONT asset has no picture until you choose its model. A user without `network_asset.update` only reads "Model perangkat belum dipilih. Minta admin memilih model agar panel tampil." (No device model chosen yet. Ask an admin to choose a model so that the panel shows.)

1. Open the asset details. In the **Panel perangkat** card, read the title **Pilih model perangkat** (Choose a device model) and the sentence "Panel digambar dari model perangkat. Pilih dari katalog atau susun port sendiri." (The panel is drawn from the device model. Choose from the catalogue or arrange the ports yourself.)
2. Fill in **Model perangkat** (Device model) (required). This field is a search box with the hint "Cari vendor atau model" (Search vendor or model): type part of the vendor or model, then click the result. If the **Vendor** and **Model** fields on the asset hold the name of a catalogue model, Inbils has already chosen it and writes "Disarankan dari vendor dan model aset ini." (Suggested from the vendor and model of this asset.) For example the vendor MikroTik with the model "hAP ac2 RBD52G-5HacD2HnD" suggests "MikroTik hAP ac² (RBD52G-5HacD2HnD)". The choices hold only models for that asset type, and rack units show their height (for example 1U) as a remark.
3. Click **Terapkan model** (Apply model). The toast "Model perangkat diterapkan." (Device model applied.) appears and the picture shows. All its new ports are **Kosong** (Free).

   ![The Device panel card on a router without a model: the Device model box with the MikroTik hAP ac² suggestion, and the Apply model and Arrange manually buttons](~/assets/guide/web/panel-picker.webp)

The catalogue holds 14 models:

| Type | Models in the choice |
| --- | --- |
| Router | MikroTik hAP ac² (RBD52G-5HacD2HnD), MikroTik RB4011iGS+RM, MikroTik CCR2004-16G-2S+ |
| Switch | MikroTik CRS326-24G-2S+RM, MikroTik CRS317-1G-16S+RM, Umum Switch 8 port, Umum Switch 24 port + 2 SFP, Umum Switch 48 port + 4 SFP |
| OLT | ZTE ZXA10 C320 · 2× GTGH (32 PON), ZTE ZXA10 C320 · 2× GTGO (16 PON), Huawei SmartAX MA5608T · 2× GPFD (32 PON) |
| ONU/ONT | Umum ONT 1 PON · 4 LAN · 2 POTS · WLAN |
| ODP | Umum ODP 1:8, Umum ODP 1:16 |

An OLT model also registers PON ports in ODN: a model with 32 PON slots creates the PON ports that do not exist yet in the register ([section 5.5](/docs/guides/web/network/odn/)). The port names follow the names on the real unit, for example `gpon-olt_1/2/1` on a ZTE C320 or `0/1/0` on a Huawei MA5608T. The **Di register ODN** (In the ODN register) row on the port sheet (see "Connecting a port") still writes the PON number as in the ODN table ("PON 17").

For a unit that is not in the catalogue, arrange the ports yourself:

1. Click **Susun manual** (Arrange manually). One row of fields appears: **Jenis port** (Port type), **Jumlah** (Number), and **Awalan nama** (Name prefix).
2. Choose the **Jenis port**: **RJ45 (kabel LAN)** (RJ45 (LAN cable)) or **SFP / SFP+ (fiber)**, and for an ONU/ONT also **SC (fiber)** and **RJ11 (telepon)** (RJ11 (telephone)). Fill in **Jumlah** (1 to 64) and, if needed, **Awalan nama** (20 characters at most). An empty prefix uses the default of the type: ether, sfp, PON, TEL, or LAN for RJ45 on an ONU/ONT. A port is named with the prefix followed by its number, for example ether1.
3. Click **Tambah baris** (Add row) for the next group of ports (8 rows at most), or the trash can icon button **Hapus baris N** (Delete row N) to remove one row. The text "Total N port (paling banyak 256)" (Total N ports (256 at most)) counts all rows. A row with 13 ports or more is drawn in two levels.
4. Click **Terapkan model**. Click **Pilih dari katalog** (Choose from the catalogue) to return to the model list.

A manual layout has no PON blocks. On an OLT, PON ports that already exist in ODN are drawn in an extra row **Port PON di luar model** (PON ports outside the model), without a name from the real unit. Choose a catalogue model if there is one, so that PON ports are drawn in their place.

To replace the model:

1. Click **Ganti model** (Replace model) at the top right of the card. This button exists on a Router, Switch, OLT and ONU/ONT that already has a model, for holders of `network_asset.update`.
2. Read the **Ganti model perangkat** (Replace device model) dialog: "Port yang bernama sama tetap menyimpan label, catatan, dan sambungannya. Port yang tidak ada di model baru dihapus; port yang masih terhubung menahan penggantian." (Ports with the same name keep their label, notes and connection. Ports that are not in the new model are deleted; ports that are still connected block the replacement.) A port is considered the same if its group and number are the same in the old and new model, for example ether1 to ether5 in two router models.
3. Choose the new model, or click **Susun manual**, then click **Terapkan model**. If some ports are still connected and are not in the new model, a red message in the dialog names those ports. Release their connections first (see "Connecting a port").

ODCs and ODPs do not use a model of their own: their picture follows the splitters in ODN, one row per splitter, with the **Masuk** (In) port (the splitter input) and its output ports. An ODC or ODP without a splitter writes "Belum ada splitter. Tambah splitter di halaman ODN." (No splitter yet. Add a splitter on the ODN page.) with the **Buka halaman ODN** (Open the ODN page) button (for holders of `odn.manage`). On an ODP without a splitter, choosing Umum ODP 1:8 or Umum ODP 1:16 (needs `odn.manage`) creates its first splitter at the same time.

## Reading the port colours

The legend above the picture holds only the statuses that are present in that panel, with the number of ports beside it (for example "Terpakai 2" and "Kosong 130"). Each status has a mark besides its colour, so the picture stays readable for people who find it hard to tell colours apart:

| Status | Port appearance | Meaning |
| --- | --- | --- |
| **Kosong** | outline without fill | According to Inbils data, no device is connected and there is no customer. |
| **Terpakai** | blue fill | The port is connected to another device, feeds a splitter, or is held by a customer whose online status is unknown. |
| **Online** | green fill with a dot in the hole | The customer on that port, or one of the customers behind it, has an open RADIUS session. |
| **Offline** | grey fill with a short line in the hole | There is a customer on that port or behind it, but none has an open RADIUS session. |
| **Diisolir** | orange fill with diagonal hatching | The subscription that holds the port has the status Ditangguhkan (Suspended) or is blocked. |
| **Dinonaktifkan** | red fill with a cross | Someone marked the port inactive in the panel (the **Nonaktifkan port** (Deactivate port) switch). This is only a marker, the device settings do not change. |
| **Belum terdaftar** | dashed outline | The port exists in the model, but the register has no row for it yet. On an OLT, this means its PON port row does not exist yet in ODN. |

The statuses **Online** and **Offline** appear only if RADIUS is on. The legend writes "Online = sesi RADIUS terbuka, diperbarui paling lama tiap 15 detik." (Online = open RADIUS session, updated every 15 seconds at most.) A session that gives no news for 15 minutes is not counted. If RADIUS is inactive or unreachable, the legend writes "Status online tidak tersedia: RADIUS nonaktif." (Online status is not available: RADIUS is inactive.) or "Status online tidak tersedia: RADIUS tidak dapat dihubungi." (Online status is not available: RADIUS cannot be reached.), and customer ports show **Terpakai**. The page stays open.

A port that feeds a splitter (a PON port, and an ODC output that feeds an ODP) lights up according to the customers behind it: one online customer is enough to make it **Online**, and its tooltip writes the number of customers and how many are online.

To read one port:

- Point at the port, or focus it with the keyboard, to see the tooltip: the port name and status, the number in ODN ("PON 1 di ODN" (PON 1 in ODN)), the label, the connection destination ("ke E2E-PANEL-ODC · 1:8" (to E2E-PANEL-ODC · 1:8)), the customer, and "2 pelanggan · 0 online" (2 customers · 0 online). On a touch screen there is no tooltip: tap the port to open the port sheet, which holds everything in the tooltip.
- Click the port, press Enter, or press Space to open the port sheet (see "Connecting a port").
- Tab enters the panel at one port only, and the next Tab leaves the panel. The arrow keys move focus between ports, Home and End go to the first and last port, and Escape closes the port sheet with focus returning to that port.
- A screen reader announces the name, label, status and destination of a port, for example "ether3, cadangan: Dinonaktifkan" (ether3, backup: Deactivated).

## Connecting a port

Click a port to open the port sheet, which opens at the right side of the screen (from the bottom on a phone). Its title is the port name and its label (for example "sfp-sfpplus1 · ke OLT" (to OLT)), and below it the port group and the asset code are written ("Ethernet 1-8 · E2E-PANEL-RTR"). The top part of the sheet holds **Status**, **Kecepatan** (Speed), **Terhubung ke** (Connected to) (a link to the destination device page), **Di register ODN** (a PON port), **Pelanggan di bawah** (Customers below) (a port that feeds a splitter), and **Catatan** (Notes). The part below follows the port type.

To connect a router, switch, OLT uplink, or ONU/ONT port to a port of another device (needs `network_asset.update`):

1. Click a port with the status **Kosong**, then click **Hubungkan ke port lain** (Connect to another port) in the **Sambungan** (Connection) section.
2. Fill in **Perangkat tujuan** (Destination device): type the device code or name, then click the result. The list holds only routers, switches, OLTs and ONU/ONTs that already have a model, except this asset itself. If nothing matches, the list writes "Tidak ada perangkat berpanel yang cocok." (No matching devices with a panel.)
3. Fill in **Port tujuan** (Destination port). Before a device is chosen, this field writes "Pilih perangkat tujuan dulu" (Choose the destination device first). Afterwards, the field offers the free ports of that device, written with its name and its label if there is one. If that device has no free port, the list writes "Perangkat itu tidak punya port kosong." (That device has no free port.)
4. Click **Hubungkan** (Connect). The toast "Port dihubungkan." (Port connected.) appears, and both ports change to **Terpakai**. The **Terhubung ke** section writes a link to the destination device, for example "E2E-PANEL-OLT · UP2". On the destination device panel, its port is also **Terpakai** and points back to this port.

   ![The port sheet of ether2 on a router: the Connection section with Destination device E2E-PANEL-OLT and Destination port UP2, then the Label and notes section](~/assets/guide/web/panel-router-portsheet.webp)

To release a connection, open the port at either end, click **Lepas sambungan** (Release connection), then click **Lepas sambungan** again in the dialog "Lepas sambungan ether2?" (Release the connection of ether2?), which explains "Port ether2 dan port UP2 di E2E-PANEL-OLT menjadi kosong." (Port ether2 and port UP2 on E2E-PANEL-OLT become free.) The toast "Sambungan port dilepas." (Port connection released.) appears, and both ports return to **Kosong**.

The **Label dan catatan** (Label and notes) section on the same sheet stores the port remarks:

1. Fill in **Label** (64 characters at most, for example "ke CCR-INTI") and **Catatan** (255 characters at most, for example "VLAN 100 · ke ODC barat." (VLAN 100 · to the west ODC.)). The label shows in the tooltip and in the sheet title.
2. Switch on **Nonaktifkan port** if the port is deliberately switched off on its unit, and you want the panel to show it. The panel writes "Hanya penanda di panel. Pengaturan perangkatnya tidak berubah." (Only a marker in the panel. The device settings do not change.)
3. Click **Simpan port** (Save port). This button becomes active after there is a change. The toast "Port diperbarui." (Port updated.) appears and "Tersimpan." (Saved.) shows beside the button.

An ODN port has its own sheet contents:

- A PON port of an OLT and an output of an ODC or ODP write where it is connected and how many customers are behind it. The **Buka halaman ODN** button opens the page of that splitter or asset (needs `odn.view`). Connections of splitters, PON ports and splitters are managed in ODN ([section 5.5](/docs/guides/web/network/odn/)), not from the panel.
- An ODP port held by a customer shows a **Pelanggan** (Customer) section with **Langganan** (Subscription) (code and status), **Pelanggan**, **Paket** (Package), and **Sesi** (Session) ("Online sejak" (Online since) followed by the date and time, "Offline", or "Status online tidak tersedia."). Its buttons are **Buka langganan** (Open subscription) (needs `customer.subscription.view`), **Buka pelanggan** (Open customer) (needs `customer.view`), **Lacak jalur** (Trace path), **Blokir internet** (Block internet) or **Buka blokir** (Unblock) (needs `customer.subscription.block`, the dialog is the same as in [section 5.3](/docs/guides/web/network/nas-routers/)), and **Lepas port drop** (Release drop port) (needs `odn.assign`). The dialog "Lepas ... dari port ...?" (Release ... from port ...?) explains "Port menjadi kosong. Langganannya sendiri tidak berubah." (The port becomes free. The subscription itself does not change.) Click **Lepas port drop** to continue.
- A free ODP output port shows **Pasang pelanggan** (Connect customer) (needs `odn.assign`). Fill in **Langganan**: type the subscription code or customer name, then click the result. The list holds only subscriptions that have no drop port yet and are served by the POP above that ODP ("Hanya langganan yang belum punya port drop dan dilayani POP di atas ODP ini." (Only subscriptions that have no drop port yet and are served by the POP above this ODP.)). Click **Pasang pelanggan**, and the toast "Port drop dicatat." (Drop port recorded.) appears. This is the third way to record a drop port, besides the customer form and the subscription page ([section 5.5](/docs/guides/web/network/odn/)).
- A port that exists in the OLT model but not yet in ODN writes "Port ini ada di model, tetapi belum terdaftar di ODN." (This port is in the model, but is not registered in ODN yet.) The **Masuk** port on a splitter writes whether its input is already connected to an upstream port, and its connection is managed on the ODN page.
- An ONU/ONT port that faces the fibre (**PON SC/APC**) shows the customer of that ONU/ONT subscription, with the destination at its ODP output port. Its sheet has **Lacak jalur** but no **Lepas port drop**, because the ODP holds the drop. The LAN and POTS ports of an ONU/ONT work like router ports.

## The panel on a phone

On a narrow screen (width below 640 pixels), the panel picture does not shrink. The picture stays large, and each port is at least 44 pixels so it is easy to tap on a touch screen. The picture scrolls sideways inside the card, and the page does not scroll with it. The legend is outside the scrolling part and sticks below the top bar when the page is scrolled, so the legend is always readable. Tap a port to open the port sheet, which rises from the bottom of the screen and holds everything that is in the tooltip.

![The router panel on a phone screen: the legend In use, Free, and Deactivated above a picture that scrolls sideways, with large ports and one red port marked with a cross](~/assets/guide/web/panel-phone.webp)

## Mounting devices in a rack

A rack here is an asset of type Rack, not a location of type Rack in the location tree ([section 5.1](/docs/guides/web/network/locations/)). Create an asset of type Rack in Network assets ([section 5.2](/docs/guides/web/network/network-assets/)) and open its details.

1. In the **Panel perangkat** card, read the title **Tentukan ukuran rak** (Set the rack size). Fill in **Tinggi rak (U)** (Rack height (U)) (1 to 52, initial value 42), then click **Simpan** (Save). The toast "Ukuran rak disimpan." (Rack size saved.) appears and the rack is drawn from U1 at the bottom to the top U above. A user without `network_asset.update` reads "Ukuran rak belum ditentukan. Minta admin menentukannya agar isi rak tampil." (The rack size is not set yet. Ask an admin to set it so that the rack contents show.)
2. An empty rack writes "Rak masih kosong. Pilih slot U untuk memasang perangkat." (The rack is still empty. Choose a U slot to mount a device.) Each empty slot has a plus sign, and its name ("U12 kosong, pasang perangkat" (U12 empty, mount a device)) is read by screen readers. Click an empty slot.
3. In the **Pasang perangkat di U12** (Mount a device at U12) dialog (the number follows the slot you clicked), read "E2E-PANEL-RACK, 42U. U1 ada di bagian bawah rak." (E2E-PANEL-RACK, 42U. U1 is at the bottom of the rack.) Fill in **Perangkat** (Device): type the asset code or name, then click the result. The list holds all assets except racks. Check **Mulai di U** (Start at U) (filled in from the slot you clicked) and **Tinggi (U)** (Height (U)) (1 to 10, initial value 1).
4. Click **Pasang di rak** (Mount in rack). The toast "Posisi rak disimpan." (Rack position saved.) appears. The device shows as a bar labelled with its code and name, with a small picture of its face, and the number of devices in the card remark goes up by one (for example "42U · 3 perangkat").

   ![A rack with U numbers on the left side: a router at U13, an OLT at U10 and U11, and a plus sign in every empty slot](~/assets/guide/web/panel-rack.webp)

To move or remove a device, click its bar. The dialog titled "{kode perangkat} di {kode rak}" ({device code} in {rack code}) holds the **Buka halaman aset** (Open asset page) link and the fields **Mulai di U** and **Tinggi (U)**. Change the numbers then click **Simpan posisi** (Save position), or click **Lepas dari rak** (Remove from rack) (toast "Perangkat dilepas dari rak." (Device removed from the rack.)). To change the rack size, click **Ubah ukuran** (Change size) at the top right of the card. A rack cannot be made smaller than the highest occupied U. A user without `network_asset.update` does not see clickable empty slots, and a click on a bar opens its asset page.

## Tracing the fibre path

The fibre path shows through which devices a customer's fibre runs, from the OLT to the ONU/ONT at their home. The path needs a drop port that is already recorded ([section 5.5](/docs/guides/web/network/odn/)) and `odn.view`. There are two entry points:

1. Open the port sheet that belongs to the customer (the ODP output port held by the customer, or the PON port of their ONU/ONT), then click **Lacak jalur**.
2. Or open **Lacak Aset** ([section 5.2](/docs/guides/web/network/network-assets/)), search for the ONU/ONT by its code, then click **Jalur fiber** (Fibre path) in the **Langganan** column on the row that has a subscription.

The **Lacak Aset** page shows the **Jalur fiber** card followed by the subscription code, with the customer name below it. The legend above the picture holds the path status. The picture below holds one card per point, from the OLT on the left to the customer on the right. Each card writes its asset code, and below the small picture of the device is written the port the path passes through: the PON port for an OLT (for example `gpon-olt_1/1/1`), the output port for an ODC and ODP ("KODE · 1:8 · 1" ("CODE · 1:8 · 1")), and the customer name for an ONU/ONT. If the subscription has no ONU/ONT, the last card is titled **Pelanggan** and only writes the customer name. The port the path passes through is circled, and the connecting line uses the colour of the drop status. Click a card to open its asset page.

![The fibre path E2E-PANEL-SUB from the OLT through the ODC and ODP to the customer ONT, with the In use legend and the Trace Asset result table below it](~/assets/guide/web/panel-trace.webp)

A subscription without a drop port writes "Belum ada port drop tercatat untuk {kode}. Atur di halaman langganan." (No drop port recorded yet for {code}. Set it on the subscription page.), with the **Buka langganan** button. Record its drop port first ([section 5.5](/docs/guides/web/network/odn/)).

## Common errors

- The **Panel perangkat** card is not in the asset details: the asset type is not Router, Switch, OLT, ONU/ONT, ODC, ODP, or Rack, or your account does not have `network_asset.view`.
- The card only writes "Model perangkat belum dipilih. Minta admin memilih model agar panel tampil.": the asset has no model yet and your account does not have `network_asset.update`.
- The card writes "Port PON dan splitter tampil untuk pengguna dengan akses ODN." (PON ports and splitters show for users with ODN access.) and the PON or splitter block is not drawn: your account does not have `odn.view`.
- **Terapkan model** on an OLT or ODP is refused with a 403 error, even though the model choice shows: the server also requires `odn.manage`. Ask an admin to add that permission.
- "OLT ini sudah punya 32 port PON terdaftar; model ini hanya 16." (This OLT already has 32 PON ports registered; this model has only 16.) (the numbers follow your OLT and model): the OLT has more PON ports in ODN than slots in the model. Choose a model with that many PON slots, or delete the unused PON ports in ODN ([section 5.5](/docs/guides/web/network/odn/)).
- "Port ether3 dan ether4 masih terhubung. Lepas sambungannya dulu." (Ports ether3 and ether4 are still connected. Release their connections first.) in the **Ganti model perangkat** dialog: the new model does not have those ports. Release their connections, then apply again.
- "Port UP2 di E2E-PANEL-OLT sudah terhubung." (Port UP2 on E2E-PANEL-OLT is already connected.) below **Port tujuan**: someone else took that port while your form was open. Choose another free port.
- The **Perangkat tujuan** field does not find the device you look for: the list holds only routers, switches, OLTs and ONU/ONTs that already have a model. Choose the model of that device first.
- A customer port shows **Terpakai**, not **Online** or **Offline**: RADIUS is not on or is unreachable, and the legend names the reason ([section 5.3](/docs/guides/web/network/nas-routers/)).
- "U13 sudah terisi E2E-PANEL-RTR." (U13 is already occupied by E2E-PANEL-RTR.) in the rack dialog: another device holds that U. Choose another U or reduce **Tinggi (U)**. The message "Posisi melewati tinggi rak (42U)." (The position goes beyond the rack height (42U).) means the device goes past the top of the rack, and "Rak belum punya ukuran." (The rack has no size yet.) means the rack size has not been filled in.
- "Rak berisi perangkat sampai U13; ukurannya tidak boleh lebih kecil." (The rack holds devices up to U13; its size must not be smaller.) in the **Ubah ukuran rak** (Change rack size) dialog: remove the devices at higher U first, or enter a larger size.
- The buttons **Ganti model**, **Hubungkan ke port lain**, **Simpan port**, or **Ubah ukuran**, and the clickable rack slots, do not show: your account does not have `network_asset.update`.
- The **Jalur fiber** button in **Lacak Aset** does not show: that button needs `odn.view`, and only rows with a subscription have it.
