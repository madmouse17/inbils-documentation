---
title: "5.4 IP addresses (Alamat IP)"
description: "Use the passive IP address register to track prefixes, VLANs and held addresses, and to assign static IPs to subscriptions."
---

IP addresses (**Alamat IP**) is a passive register of the company IP address space: prefixes (CIDR blocks), VLANs, and addresses that are already held. The register only records. The system does not read devices and does not send configuration to routers. Open this menu to see how full each block is, register prefixes or VLANs, and see who holds a static address.

Roles that can use it: admin and manager (all actions), staff (view only). Permissions: `ipam.view` to open the prefix list, the prefix details, and VLANs, `ipam.manage` to register, edit and delete prefixes and VLANs and to add and release reservations, `ipam.assign` to give and release static addresses of subscriptions. The data applies per active company ([section 1.6](/docs/guides/web/introduction/switch-company/)).

## Opening and reading the prefix list

1. In the sidebar, open the **Jaringan** (Network) group, then click **Alamat IP**.
2. Set up the list with the five filters above the table. The list adjusts after you type or choose.
   - **Cari** (Search): prefix or remarks.
   - **Versi IP** (IP version): **IPv4 dan IPv6** (IPv4 and IPv6), **IPv4**, or **IPv6**.
   - **Peruntukan** (Purpose): **Semua peruntukan** (All purposes), **Induk** (Parent), **IP statis pelanggan** (Customer static IP), **IP dinamis pelanggan** (Customer dynamic IP), or **Infrastruktur** (Infrastructure).
   - **POP** and **VLAN**: type to search, then choose. The initial values are **Semua POP** (All POPs) and **Semua VLAN** (All VLANs). The **Hapus pilihan** (Clear selection) button at the end of the field empties it.

   A prefix that lies inside another prefix is indented below its parent. The order is IPv4 first, then IPv6, by the start address of the block. This list has no manual sort order and no pages. If the filters find nothing, the table writes "Tidak ada prefiks yang cocok" (No matching prefixes) with the **Reset filter** (Reset filters) button. If there is no prefix at all yet, the table writes "Belum ada prefiks" (No prefixes yet).

   ![The prefix list in the IP addresses menu: the VLAN and Create Prefix buttons, five filters, and the table Prefix, Purpose, POP, VLAN, Size, Used, Free, Usage](~/assets/guide/web/ipam-prefixes.webp)

3. Read the columns.

   The **Prefiks** (Prefix) column holds the CIDR block with the remarks below it, and clicking that CIDR opens the details. The **Peruntukan** column holds the purpose badge of the block. The **POP** column holds the POP code, and the **VLAN** column holds the ID and name of the bound VLAN. An empty cell holds the sign "-". The **Ukuran** (Size) column shows the number of addresses in the block.

   The **Terpakai** (Used) column adds up the addresses already given (**Dipakai** (In use)) and those reserved (**Dicadangkan** (Reserved)), and is filled in only for **IP statis pelanggan** and **Infrastruktur**. The **Kosong** (Free) column shows the remaining addresses that can be used. For IPv4 blocks other than /31 and /32, the system does not count the network and broadcast addresses.

   The **Pemakaian** (Utilisation) column shows a bar and the utilisation percentage: green below 75%, yellow from 75%, red from 90%. **IP dinamis pelanggan** has only **Ukuran**. For IPv6 blocks, **Kosong** and **Pemakaian** hold the sign "-" because IPv6 addresses are typed manually. For **Induk**, **Pemakaian** shows the part of the block already filled by prefixes inside it.

## Registering a prefix

1. Click **Buat Prefiks** (Create Prefix) at the top right of the page. This button needs `ipam.manage`.
2. Fill in the form in the **Buat Prefiks** dialog:
   - **CIDR**: required, 64 characters at most, in IPv4 or IPv6 CIDR form, for example `10.20.0.0/22` or `2001:db8::/48`. A single address, a range, and a prefix length above 32 (IPv4) or 128 (IPv6) are refused. The host part is dropped automatically, so what is stored is the start address of the block.
   - **Peruntukan**: required. Choose from the list. A short remark for each choice appears below the field.
   - **POP**: optional. Type to search, then choose the code and name of an active POP. An empty field (**Tidak terkait POP** (Not linked to a POP)) means the block is not bound to a POP.
   - **VLAN**: optional. Type to search, then choose. The choices show the ID and name of the VLAN, with the POP code or **Seluruh perusahaan** (Whole company) below. An empty field (**Tanpa VLAN** (No VLAN)) means no VLAN.
   - **Keterangan** (Remarks): optional, 255 characters at most.
3. Click **Daftarkan prefiks** (Register prefix). The list shows again with the toast `Prefiks <CIDR> didaftarkan.` (Prefix `<CIDR>` registered.) The **Batal** (Cancel) button closes the dialog without saving.

Meaning of the **Peruntukan** values:

| Peruntukan | Meaning | What is counted |
|---|---|---|
| Induk | Groups other prefixes. Holds no addresses of its own. | Utilisation: the part of the block filled by prefixes inside it. |
| IP statis pelanggan | Pool of customer static addresses, given from the subscription page. | Terpakai, then Kosong and Pemakaian for IPv4. |
| IP dinamis pelanggan | Pool handed out by the router. Only its size is recorded here. | Only Ukuran. |
| Infrastruktur | Device and management addresses, reserved manually. | Terpakai, then Kosong and Pemakaian for IPv4. |

The system automatically places a new prefix under the smallest registered prefix that contains it. Prefixes and addresses that already lie inside the new block move below it too. A CIDR block that is already registered cannot be registered again, and a block that only partly overlaps another prefix is refused.

## Opening the prefix details

1. In the list, click the CIDR of the prefix.
2. Read the details page. Its title is the CIDR of the prefix, with the remarks (or the purpose name) below it.

   The **Detail** (Details) card holds **Peruntukan**, **Di dalam** (Inside) (the parent prefix, or **Tingkat atas** (Top level)), **POP**, **VLAN**, and **Ukuran**. For **IP statis pelanggan** and **Infrastruktur**, this card also holds **Dapat dipakai** (Usable), **Dipakai**, **Dicadangkan**, and **Kosong**. Below it is the utilisation bar with one explanatory sentence.

   ![The prefix details page: the Back, Edit, Delete, and Reserve address buttons, the Details card with the utilisation bar, and the Addresses card](~/assets/guide/web/ipam-prefix-show.webp)

   The **Prefiks di dalam** (Prefixes inside) card lists the prefixes inside the block and always appears for **Induk**. The **Alamat** (Addresses) card lists the addresses recorded in the block range, including addresses in nested prefixes, 25 per page. Its columns are **Alamat**, **Status** (**Dipakai** or **Dicadangkan**), **Dipakai oleh** (Used by) (the code and name of the holding subscription or asset, empty for a reservation), **Catatan** (Notes), **Ditambahkan** (Added), and **Aksi** (Actions) for holders of `ipam.manage` or `ipam.assign`. If the block holds no addresses yet, the card writes "Belum ada alamat di blok ini" (No addresses in this block yet).
3. Click **Kembali** (Back) to return to the list.

## Editing and deleting a prefix

1. On the details page, click **Ubah** (Edit). This button needs `ipam.manage`.
2. Change **Peruntukan**, **POP**, **VLAN**, or **Keterangan** in the **Ubah** dialog followed by the prefix CIDR, then click **Simpan** (Save). The **CIDR** field is locked, with the hint "Prefiks tetap memakai CIDR-nya. Daftarkan yang baru untuk mengubahnya." (A prefix keeps its CIDR. Register a new one to change it.) The toast "Prefiks diperbarui." (Prefix updated.) appears.
3. To delete, click **Hapus** (Delete) on the same page, then click **Hapus prefiks** (Delete prefix) in the confirmation dialog. The dialog explains that a prefix can be deleted only while it holds no other prefixes and no addresses.
   - If the prefix still holds other prefixes or addresses, the dialog stays open with a red message.
   - On success, the list shows again with the toast `Prefiks <CIDR> dihapus.` (Prefix `<CIDR>` deleted.)

## Reserving an address

A reservation holds one address so that it is not given to a customer, for example a gateway or a router loopback.

1. On the prefix details page, click **Cadangkan alamat** (Reserve address). This button needs `ipam.manage`.
2. Fill in the form in the **Cadangkan alamat di** (Reserve address in) dialog followed by the prefix CIDR:
   - **Alamat**: required, a valid IP address that lies inside the prefix. Its hint: "Alamat yang dicadangkan tidak pernah diberikan ke pelanggan." (A reserved address is never given to a customer.)
   - **Catatan**: optional, 255 characters at most, for example gateway.
3. Click **Cadangkan alamat**. The toast `Alamat <alamat> dicadangkan.` (Address `<address>` reserved.) appears, and the address shows in the **Alamat** card with the status **Dicadangkan**.

The system refuses network and broadcast addresses on IPv4 blocks other than /31 and /32. An address already held by another party is refused with the holder named.

## Giving a static address to a subscription

Use the subscription page to give a static address, not the IP addresses page. A subscription with no recorded address is considered dynamic, that is, the router hands out its address. The panel writes "Dinamis (diberikan router)" (Dynamic (given by the router)).

1. Open the subscription page (see the Customers section, [section 4.1](/docs/guides/web/customers-and-services/customers/)), then find the **Alamat IP** card.
2. Click **Berikan IP statis** (Give static IP). This button needs `ipam.assign` and appears only if the subscription is not terminated and a usable pool still exists.
3. In the **Berikan IP statis ke** (Give static IP to) dialog followed by the subscription code, choose the **Pool**: required, type to search, then choose. Each choice shows the CIDR and the number of free addresses (or "IPv6, ketik alamatnya" (IPv6, type the address)). The pools offered are **IP statis pelanggan** pools that are not bound to a POP or are bound to the serving POP of the subscription. One subscription may have only one address per IP version, so pools for a version that is already filled do not appear. If there is only one pool, it is already chosen.
4. Fill in **Alamat**, or leave it empty so that the system chooses the lowest free address. Leaving it empty applies only to IPv4 pools of /16 or smaller blocks (/17 to /32). IPv6 pools and blocks larger than /16 need a typed address, and for IPv6 this field is required.
5. Click **Berikan alamat** (Give address). The toast `Alamat <alamat> diberikan ke <kode langganan>.` (Address `<address>` given to `<subscription code>`.) appears. The address shows in the **Alamat IP** card with the IP version and the CIDR of its pool, and in the **Alamat** card of the prefix. The dialog warns that if the customer is online through RADIUS, the session is disconnected briefly and then reconnects with the new address.

If the subscription is terminated while the dialog is still open, the dialog refuses with a red message at its top.

## Releasing an address

1. In the **Alamat IP** card of the subscription, click **Lepas** (Release) on the address row. Or in the **Alamat** card of the prefix details page, click **Lepas** on a **Dipakai** or **Dicadangkan** row.
2. Click **Lepas alamat** (Release address) in the **Lepas** confirmation dialog followed by the address. A subscription address needs `ipam.assign`, and a reservation needs `ipam.manage`. The toast `Alamat <alamat> dilepas.` (Address `<address>` released.) appears.

A subscription whose address is released returns to a dynamic address, and that address returns to the pool. The **Lepas alamat** confirmation also states that a customer who is online through RADIUS is disconnected briefly and then reconnects with an address from the dynamic pool. When a subscription is terminated, the system releases its static address by itself. An address owned by a network asset cannot be released here. Its row has an **Ubah aset** (Edit asset) button: click it, then change the **Alamat IP** or **IP manajemen** on the asset ([section 5.2](/docs/guides/web/network/network-assets/)).

## Managing VLANs

1. On the prefix list page, click **VLAN**.
2. Read the table: **ID VLAN**, **Nama** (Name), **POP** (POP code, or **Seluruh perusahaan**), **Prefiks** (the number of prefixes that use that VLAN), **Keterangan**, and **Aksi** for holders of `ipam.manage`. Click the number in **Prefiks** to open the prefix list filtered by that VLAN. The **Alamat IP** button returns to the prefix list. The table shows 25 VLANs per page, sorted by VLAN ID.

   ![The VLAN list: the IP addresses and Create VLAN buttons, and the table VLAN ID, Name, POP, Prefixes, Remarks, and Actions](~/assets/guide/web/ipam-vlans.webp)

3. Click **Buat VLAN** (Create VLAN), then fill in the form in the **Buat VLAN** dialog:
   - **ID VLAN**: required, an integer from 1 to 4094.
   - **Nama**: required, 64 characters at most.
   - **POP**: optional, type to search, then choose. An empty field (**Seluruh perusahaan**) means the VLAN applies to the whole company.
   - **Keterangan**: optional, 255 characters at most.
4. Click **Daftarkan VLAN** (Register VLAN). The toast `VLAN <ID> didaftarkan.` (VLAN `<ID>` registered.) appears.

The same ID may exist in several POPs, but only once per POP and only once for **Seluruh perusahaan**.

To edit a VLAN, click **Ubah** on the row, change its fields in the **Ubah VLAN** (Edit VLAN) dialog followed by the ID, then click **Simpan**. The toast "VLAN diperbarui." (VLAN updated.) appears. To delete, click **Hapus** on the row, then click **Hapus VLAN** (Delete VLAN). The toast `VLAN <ID> dihapus.` (VLAN `<ID>` deleted.) appears. A VLAN is deleted only if no prefix uses it. Release the VLAN from the prefix first with **Ubah** on the prefix and by emptying the **VLAN** field.

## Common errors

- `Masukkan prefiks IPv4 atau IPv6 dalam bentuk CIDR yang valid, misalnya 10.20.0.0/22.` (Enter an IPv4 or IPv6 prefix in valid CIDR form, for example 10.20.0.0/22.) means the **CIDR** field is not a CIDR block: a single address, a range, a prefix length above 32 (IPv4) or 128 (IPv6), or extra text. Rewrite it as a network address followed by a slash and the prefix length.
- `<CIDR> sudah terdaftar.` (`<CIDR>` is already registered.) means that block already exists. Look for it in the list with **Cari**.
- `<CIDR> tumpang tindih sebagian dengan <CIDR lain>.` (`<CIDR>` partly overlaps `<other CIDR>`.) means the new block cuts across a registered prefix without containing it or being inside it. Choose a block that is beside, larger than, or smaller than that prefix.
- A mistyped CIDR on a stored prefix cannot be fixed through **Ubah**. Register a new prefix with the correct CIDR, then delete the old prefix once it is empty.
- `<CIDR> memuat prefiks lain. Hapus dulu.` (`<CIDR>` holds other prefixes. Delete them first.) and `<CIDR> masih punya alamat. Lepas dulu.` (`<CIDR>` still has addresses. Release them first.) refuse the deletion of a prefix. Delete the prefixes inside it and release all its addresses first.
- The **Berikan IP statis** button is missing, or the **Alamat IP** card writes "Belum ada pool statis untuk POP langganan ini." (There is no static pool yet for the POP of this subscription.) There is no **IP statis pelanggan** pool that is not bound to a POP or that is bound to the serving POP of the subscription. Register a pool through **Buat Prefiks** with **Peruntukan** **IP statis pelanggan**. If the subscription has no serving POP yet, the card writes "Langganan ini belum punya POP. Pool statis per POP baru ditawarkan setelah POP layanan dipilih." (This subscription has no POP yet. Static pools per POP are offered only after the service POP is chosen.) A pool bound to a POP is offered only to a subscription that has a serving POP. If the subscription already has both an IPv4 and an IPv6 address, the button also disappears without that message.
- `<alamat> berada di luar <CIDR>.` (`<address>` is outside `<CIDR>`.) and `<alamat> adalah alamat jaringan atau broadcast dari <CIDR>.` (`<address>` is the network or broadcast address of `<CIDR>`.) mean the typed address is outside the block, or is a network or broadcast address. Choose a host address inside the block.
- `<alamat> sudah dipakai langganan <kode>.` (`<address>` is already used by subscription `<code>`.) means the address is already held. The same message with `dipakai aset <kode>` or `dicadangkan (<catatan>)` names another holder. Choose another address, or release that address first. `<alamat> baru saja diambil. Coba lagi.` (`<address>` was just taken. Try again.) means its holder just changed.
- `Langganan <kode> sudah memakai alamat IPv<versi> <alamat>. Lepas dulu.` (Subscription `<code>` already uses IPv`<version>` address `<address>`. Release it first.) means one subscription may have only one address per IP version. Release the old address first.
- "Alokasi otomatis hanya untuk pool IPv4. Ketik alamatnya." (Automatic allocation is only for IPv4 pools. Type the address.) and `<CIDR> lebih besar dari /16. Ketik alamatnya.` (`<CIDR>` is larger than /16. Type the address.) mean the **Alamat** field must not be empty for that pool. Type the address.
- `<CIDR> tidak punya alamat kosong.` (`<CIDR>` has no free addresses.) means the pool is full. Choose another pool or register a new one. `<CIDR> sedang sibuk. Coba lagi.` (`<CIDR>` is busy. Try again.) means several address assignments collided in the same pool. Repeat once more.
- `<CIDR> bukan pool statis pelanggan.` (`<CIDR>` is not a customer static pool.) and `<alamat> berada di <CIDR>, yang bukan pool statis pelanggan.` (`<address>` is in `<CIDR>`, which is not a customer static pool.) mean the pool or nested prefix that holds the address does not have the purpose **IP statis pelanggan**. Choose another pool.
- `Langganan <kode> sudah berhenti dan tidak dapat memakai alamat.` (Subscription `<code>` has terminated and cannot use an address.) means the subscription already has the status Berhenti (Terminated). It can no longer receive an address.
- `VLAN <ID> sudah terdaftar untuk seluruh perusahaan.` (VLAN `<ID>` is already registered for the whole company.) and `VLAN <ID> sudah terdaftar di POP ini.` (VLAN `<ID>` is already registered in this POP.) mean that ID is already used in the same scope. Choose another ID or another POP.
- `VLAN <ID> dipakai sebuah prefiks. Lepas dulu.` (VLAN `<ID>` is used by a prefix. Release it first.) means the VLAN is still bound to a prefix. Release it from that prefix first.
- The buttons **Buat Prefiks**, **Ubah**, **Hapus**, **Cadangkan alamat**, **Berikan IP statis**, and **Buat VLAN** do not appear if you do not hold the permission `ipam.manage` or `ipam.assign`. Staff have only `ipam.view`.
