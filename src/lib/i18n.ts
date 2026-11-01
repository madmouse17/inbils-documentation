import { withBase } from './site';

export type Lang = 'en' | 'id';
export const LANGS: readonly Lang[] = ['en', 'id'];

/** Every visible string of the landing page, the contact page and the site chrome. Product names, file names,
 *  commands, paths and figures stay as they are; only the words around them change. */
const en = {
  // Chrome
  skip: 'Skip to content',
  'brand.home': 'Inbils, home',
  'nav.site': 'Site',
  'nav.siteSmall': 'Site, small screens',
  'nav.footer': 'Footer',
  'nav.menu': 'Menu',
  language: 'Language',
  'nav.product': 'Product',
  'nav.docs': 'Documentation',
  'nav.developers': 'Developers',
  'nav.lifecycle': 'From signup to payment',
  'nav.network': 'Network and RADIUS',
  'nav.field': 'Field work',
  'nav.billing': 'Billing',
  'nav.office': 'Inventory, tickets, reports',
  'nav.platform': 'Many ISPs, one install',
  'nav.apps': 'Android apps',
  'nav.docsHome': 'Overview',
  'nav.gettingStarted': 'Getting started',
  'nav.guides': 'User guides',
  'nav.modules': 'Product modules',
  'nav.architecture': 'Architecture',
  'nav.operations': 'Operations',
  'nav.api': 'Mobile API',
  'nav.apiReference': 'API reference',
  'nav.changelog': 'Changelog',
  'nav.source': 'Source on GitHub',
  'nav.contact': 'Contact',

  // Footer
  'footer.tagline':
    'Multi-tenant ISP management software. These pages are its public documentation.',
  'footer.contactLead': 'Interested in Inbils for your ISP?',
  'footer.contactLink': 'Contact me on GitHub.',
  'footer.rights': 'Inbils is proprietary software. All rights reserved.',

  // Landing: page
  'home.title': 'Inbils: ISP management software, billing and RADIUS',
  'home.description':
    'Inbils is multi-tenant ISP management software: customers, subscriptions, RADIUS and MikroTik, work orders, inventory, Midtrans billing and ticketing with SLA.',
  'og.alt':
    'The Inbils wordmark with the line ISP management software, from signup to payment, over a drawing of a network of nodes.',

  // Hero
  'hero.title': 'ISP management software, from signup to payment.',
  'hero.lede':
    'Inbils runs customers and subscriptions, RADIUS and MikroTik, work orders for technicians, inventory, billing with Midtrans and ticketing with SLA in one multi-tenant system. Your technicians and your customers each get an Android app.',
  'hero.contact': 'Contact me on GitHub',
  'hero.guides': 'Read the user guides',
  'hero.shotAlt':
    'The Inbils web dashboard, with its Indonesian interface: a setup checklist, the notifications panel and the first operations queue.',
  'hero.netPause': 'Pause network animation',
  'hero.netPlay': 'Play network animation',

  // Lifecycle
  'life.title': 'What happens when a customer signs up.',
  'life.lede':
    'One record follows the customer from the first visit to the monthly invoice. Each station below is a menu in the web app and a chapter of the user guide.',
  'life.nav': 'Stations from signup to support',
  'life.customer': 'Customer',
  'life.customerBody':
    'Register the customer and choose a service package. The subscription starts as pending and carries the package’s bandwidth profile, speed profile and SLA tier.',
  'life.order': 'Work order',
  'life.orderBody':
    'Dispatch an installation work order (SPK). The technician starts the visit in the app, which records the position against the customer’s address, then uploads photo evidence and the material used.',
  'life.network': 'Network',
  'life.networkBody':
    'With RADIUS enabled for the company, the first installation dispatch creates the PPPoE account in the FreeRADIUS database. The MikroTik router authenticates the customer against it.',
  'life.billing': 'Billing',
  'life.billingBody':
    'Approving the work order activates the subscription, deducts the stock and creates the installation invoice. Monthly invoices follow, and customers pay through Midtrans.',
  'life.support': 'Support',
  'life.supportBody':
    'Customers report problems from the app. A ticket runs against the targets of its SLA tier and can turn into a work order.',
  'life.read': 'Read the chapter',

  // Network
  'net.title': 'RADIUS and MikroTik, tied to the customer record.',
  'net.lede':
    'MikroTik routers authenticate subscribers against FreeRADIUS. Inbils keeps the RADIUS database in step with the customer record: users, speed groups and NAS clients. It does not push configuration to routers over the RouterOS API.',
  'net.b1': 'PPPoE and Hotspot accounts per subscription, with static addresses taken from IPAM.',
  'net.b2':
    'A running session can be disconnected with a CoA Disconnect-Request (RFC 5176), so a change of package or address applies at once.',
  'net.b3':
    'Optional automatic isolir: overdue customers move to an isolir group and see the isolir page until they pay.',
  'net.b4':
    'IPAM for prefixes, VLANs and addresses, an ODN register for the passive fibre plant, and network assets with their installation history.',
  'net.b5': 'Each ISP enters its own RADIUS database in the app. The password is stored encrypted.',
  'net.link': 'NAS routers in the user guide',
  'net.shotAlt':
    'A NAS router page in Inbils: RADIUS client status, the CoA target, the isolir page address and the RouterOS commands card.',

  // Field work
  'field.title': 'Work orders for technicians, with or without signal.',
  'field.lede':
    'Dispatch, the visit and approval run as one flow. The technician app lists the day’s work orders and tickets and follows the same four steps the office and the customer see.',
  'field.b1':
    'Starting a visit records the position as the arrival. If the technician is farther from the customer than the office allows (500 m by default), the app asks for a written reason.',
  'field.b2':
    'Photo evidence, material declarations and status changes wait on the phone when there is no signal and send when it returns. A retry never creates a duplicate.',
  'field.b3':
    'Approval is a gate: the office reviews the evidence and the material before the subscription turns active and the stock is deducted.',
  'field.b4':
    'Technicians request items from the warehouse and return what is left, and every change lands in an immutable stock ledger.',
  'field.link': 'Work orders in the technician guide',
  'field.shotAlt':
    'The Inbils Teknisi app: a work order in progress with the four steps of the visit and the customer card.',
  'field.shotAlt2':
    'The Inbils Teknisi app: the list of work orders and tickets assigned to the technician.',

  // Billing
  'bill.title': 'ISP billing system with Midtrans.',
  'bill.lede':
    'Monthly invoices are generated from active subscriptions and prorated from the activation date. Customers pay online through Midtrans, and the office records cash and bank transfers.',
  'bill.b1':
    'The payment methods a customer sees (QRIS, bank virtual accounts, e-wallets, convenience stores) depend on what your Midtrans account enables.',
  'bill.b2':
    'WhatsApp reminders and app notifications for invoices that are due or overdue, sent through the WhatsApp Cloud API account of your own company.',
  'bill.b3':
    'Optional automatic isolir: set a grace period and subscriptions with an overdue invoice are isolated. A subscription isolated for arrears can reopen when the invoice is paid. A manual suspension never reopens by itself.',
  'bill.b4':
    'Receivables, arrears, receipts and cancellations with an audit trail. Payments are append-only.',
  'bill.link': 'Invoices in the user guide',
  'bill.shotAlt':
    'The Inbils invoice list: invoice number, customer, status, issue date, due date, total and balance, with filters above it.',

  // Office trio
  'office.title': 'The rest of the office, in the same system.',
  'office.inventoryTitle': 'Inventory',
  'office.inventoryBody':
    'Products, warehouses and stock with an immutable movement ledger. Technicians request items and declare what they used, managers approve, and leftovers come back as material returns.',
  'office.ticketsTitle': 'Ticketing and SLA',
  'office.ticketsBody':
    'Tickets carry first-response and resolution targets from an SLA tier, and a scheduled check flags breaches every 15 minutes. Comments, internal comments, attachments and a customer rating when the ticket is solved.',
  'office.reportsTitle': 'Reports',
  'office.reportsBody':
    'Read-only reports with drill-down and CSV or PDF export: business metrics, SLA compliance, stock card, technician performance, sales KPIs and a consolidated view for head companies.',

  // Platform
  'plat.title': 'One installation, many ISPs.',
  'plat.lede':
    'Inbils is multi-tenant. A tenant is an ISP company with optional subsidiaries, and its data, roles and integrations belong to that company.',
  'plat.b1':
    'Roles belong to each company and start from templates the operator keeps, so every ISP shapes its own admin, manager and staff.',
  'plat.b2':
    'The operator panel at /platform has its own login with two-step authentication. Operators create, suspend and reactivate tenants, export a company’s data and read the platform audit.',
  'plat.b3':
    'Support access lets an operator enter a tenant as one of its users, with a banner, a time limit, a read or write mode and an audit entry.',
  'plat.b4': 'Each ISP enters its own Midtrans, WhatsApp, RADIUS and mail settings.',
  'plat.link': 'The operator panel guide',
  'plat.shotAlt':
    'The operator panel page of one company: profile, a seven-day summary of its health, and the status with the Suspend button.',

  // Apps
  'apps.title': 'Two Android apps, one documented API.',
  'apps.lede':
    'Inbils Teknisi is for field technicians and Inbils Pelanggan is for customers. Both use api/v1, whose OpenAPI contract is published in these docs.',
  'apps.b1':
    'Customers see their service status, invoices and technician visits, pay with Midtrans and open tickets.',
  'apps.b2': 'Push notifications go out through Firebase when the platform operator has set it up.',
  'apps.b3':
    'A token belongs to one app install and one role. Writes carry an Idempotency-Key, so a retry after a dropped connection is safe.',
  'apps.guideCustomer': 'Customer app guide',
  'apps.guideTechnician': 'Technician app guide',
  'apps.guideApi': 'Mobile API',
  'apps.shotAlt':
    'The Inbils Pelanggan app: the home screen with the service card, the amount to pay and the quick actions.',

  // Docs map
  'docs.title': 'Read the documentation.',
  'docs.lede': 'English and Indonesian, with the screenshots of the real interface.',
  'docs.gettingStartedTitle': 'Getting started',
  'docs.gettingStartedBody':
    'Run Inbils on your machine with Laravel Sail and Docker, then seed it and sign in.',
  'docs.guidesTitle': 'User guides',
  'docs.guidesBody': 'Step by step for ISP staff, platform operators, technicians and customers.',
  'docs.architectureTitle': 'Architecture',
  'docs.architectureBody': 'Modules, tenancy, permissions and the data model.',
  'docs.apiTitle': 'Mobile API',
  'docs.apiBody': 'Authentication, conventions and a reference generated from the OpenAPI file.',

  // Closing
  'closing.title': 'Interested in Inbils for your ISP? Contact me on GitHub.',
  'closing.body': 'Tell me about your network and your team. A few lines are enough.',
  'closing.cta': 'Open my GitHub profile',

  // Contact page
  'contact.title': 'Contact | Inbils',
  'contact.description':
    'Interested in Inbils for your ISP? Contact me on GitHub and tell me about your network, your billing and your field team.',
  'contact.h1': 'Contact',
  'contact.lead': 'Interested in Inbils for your ISP? Contact me on GitHub.',
  'contact.body':
    'Tell me what you run today: how many customers, which routers and RADIUS server, how your customers pay, and whether your technicians need the app. A few lines are enough.',
  'contact.cta': 'Open my GitHub profile',
  'contact.readTitle': 'Before you write',
  'contact.readBody':
    'The user guides show every screen of the web app and both Android apps, so you can judge the fit without a demo.',
  'contact.readLink': 'Read the user guides',
};

export type Key = keyof typeof en;

const id: Record<Key, string> = {
  skip: 'Langsung ke isi halaman',
  'brand.home': 'Inbils, beranda',
  'nav.site': 'Situs',
  'nav.siteSmall': 'Situs, layar kecil',
  'nav.footer': 'Kaki halaman',
  'nav.menu': 'Menu',
  language: 'Bahasa',
  'nav.product': 'Produk',
  'nav.docs': 'Dokumentasi',
  'nav.developers': 'Pengembang',
  'nav.lifecycle': 'Dari pasang baru sampai bayar',
  'nav.network': 'Jaringan dan RADIUS',
  'nav.field': 'Kerja lapangan',
  'nav.billing': 'Billing',
  'nav.office': 'Inventaris, tiket, laporan',
  'nav.platform': 'Banyak ISP, satu instalasi',
  'nav.apps': 'Aplikasi Android',
  'nav.docsHome': 'Ikhtisar',
  'nav.gettingStarted': 'Memulai',
  'nav.guides': 'Panduan pengguna',
  'nav.modules': 'Modul produk',
  'nav.architecture': 'Arsitektur',
  'nav.operations': 'Operasional',
  'nav.api': 'API mobile',
  'nav.apiReference': 'Referensi API',
  'nav.changelog': 'Catatan perubahan',
  'nav.source': 'Kode sumber di GitHub',
  'nav.contact': 'Hubungi',

  'footer.tagline':
    'Aplikasi manajemen ISP multi-tenant. Halaman-halaman ini adalah dokumentasi publiknya.',
  'footer.contactLead': 'Tertarik memakai Inbils untuk ISP Anda?',
  'footer.contactLink': 'Hubungi saya lewat GitHub.',
  'footer.rights': 'Inbils adalah perangkat lunak proprietary. Hak cipta dilindungi.',

  'home.title': 'Inbils: aplikasi manajemen ISP, billing dan RADIUS',
  'home.description':
    'Inbils adalah aplikasi manajemen ISP multi-tenant: pelanggan, langganan, RADIUS dan MikroTik, SPK, inventaris, billing Midtrans, serta tiket dengan SLA.',
  'og.alt':
    'Logotipe Inbils dengan tulisan aplikasi manajemen ISP, dari pasang baru sampai pembayaran, di atas gambar jaringan simpul.',

  'hero.title': 'Aplikasi manajemen ISP, dari pasang baru sampai pembayaran.',
  'hero.lede':
    'Inbils mengelola pelanggan dan langganan, RADIUS dan MikroTik, SPK teknisi, inventaris, billing Midtrans, serta tiket dengan SLA dalam satu sistem multi-tenant untuk ISP dan operator RT/RW net. Teknisi dan pelanggan Anda masing-masing memakai aplikasi Android.',
  'hero.contact': 'Hubungi saya lewat GitHub',
  'hero.guides': 'Baca panduan pengguna',
  'hero.shotAlt':
    'Dasbor web Inbils dengan antarmuka berbahasa Indonesia: daftar langkah awal, panel notifikasi, dan antrean operasional pertama.',
  'hero.netPause': 'Jeda animasi jaringan',
  'hero.netPlay': 'Putar animasi jaringan',

  'life.title': 'Apa yang terjadi saat pelanggan baru mendaftar.',
  'life.lede':
    'Satu data mengikuti pelanggan dari kunjungan pertama sampai tagihan bulanan. Setiap tahap di bawah adalah menu di aplikasi web dan satu bab di panduan pengguna.',
  'life.nav': 'Tahap dari pasang baru sampai bantuan',
  'life.customer': 'Pelanggan',
  'life.customerBody':
    'Daftarkan pelanggan dan pilih paket layanan. Langganan dimulai dengan status Menunggu dan membawa profil bandwidth, profil kecepatan, dan tingkat SLA dari paketnya.',
  'life.order': 'SPK pasang baru (PSB)',
  'life.orderBody':
    'Tugaskan SPK Instalasi ke teknisi. Teknisi memulai kunjungan di aplikasi, yang mencatat posisinya terhadap alamat pelanggan, lalu mengunggah foto bukti dan material yang terpakai.',
  'life.network': 'Jaringan',
  'life.networkBody':
    'Bila RADIUS aktif untuk perusahaan, penugasan pertama SPK Instalasi membuat akun PPPoE di database FreeRADIUS. Router MikroTik mengautentikasi pelanggan ke database itu.',
  'life.billing': 'Billing',
  'life.billingBody':
    'Persetujuan SPK mengaktifkan langganan, mengurangi stok, dan membuat tagihan pemasangan. Tagihan bulanan menyusul, dan pelanggan membayar lewat Midtrans.',
  'life.support': 'Bantuan',
  'life.supportBody':
    'Pelanggan melaporkan masalah dari aplikasi. Tiket berjalan menurut target tingkat SLA-nya dan bisa menjadi SPK.',
  'life.read': 'Baca babnya',

  'net.title': 'RADIUS dan MikroTik, terhubung ke data pelanggan.',
  'net.lede':
    'Router MikroTik mengautentikasi pelanggan ke FreeRADIUS. Inbils menjaga database RADIUS selaras dengan data pelanggan: user, grup kecepatan, dan klien NAS. Inbils tidak mendorong konfigurasi ke router lewat RouterOS API.',
  'net.b1': 'Akun PPPoE dan Hotspot per langganan, dengan IP statis dari IPAM.',
  'net.b2':
    'Sesi yang sedang berjalan bisa diputus dengan CoA Disconnect-Request (RFC 5176), sehingga perubahan paket atau alamat berlaku seketika.',
  'net.b3':
    'Isolir otomatis (opsional): pelanggan yang menunggak pindah ke grup isolir dan melihat halaman isolir sampai membayar.',
  'net.b4':
    'IPAM untuk prefix, VLAN, dan alamat, register ODN untuk jaringan serat pasif, serta aset jaringan beserta riwayat pemasangannya.',
  'net.b5':
    'Setiap ISP mengisi database RADIUS-nya sendiri di aplikasi. Kata sandinya disimpan terenkripsi.',
  'net.link': 'Router NAS di panduan pengguna',
  'net.shotAlt':
    'Halaman router NAS di Inbils: status klien RADIUS, target CoA, alamat halaman isolir, dan kartu perintah RouterOS.',

  'field.title': 'SPK teknisi, dengan atau tanpa sinyal.',
  'field.lede':
    'Penugasan, kunjungan, dan persetujuan berjalan dalam satu alur. Aplikasi teknisi menampilkan SPK dan tiket hari ini dan mengikuti empat langkah yang sama dengan yang dilihat kantor dan pelanggan.',
  'field.b1':
    'Memulai kunjungan mencatat posisi sebagai tanda tiba. Bila teknisi lebih jauh dari pelanggan daripada batas kantor (bawaan 500 m), aplikasi meminta alasan tertulis.',
  'field.b2':
    'Foto bukti, deklarasi material, dan perubahan status menunggu di ponsel saat tidak ada sinyal dan terkirim saat sinyal kembali. Mencoba ulang tidak membuat data ganda.',
  'field.b3':
    'Persetujuan adalah gerbang: kantor memeriksa bukti dan material sebelum langganan menjadi aktif dan stok dikurangi.',
  'field.b4':
    'Teknisi meminta barang ke gudang dan mengembalikan sisanya, dan setiap perubahan tercatat di buku stok yang tidak bisa diubah.',
  'field.link': 'SPK di panduan teknisi',
  'field.shotAlt':
    'Aplikasi Inbils Teknisi: SPK yang sedang dikerjakan dengan empat langkah kunjungan dan kartu pelanggan.',
  'field.shotAlt2': 'Aplikasi Inbils Teknisi: daftar SPK dan tiket yang ditugaskan kepada teknisi.',

  'bill.title': 'Billing ISP dengan Midtrans.',
  'bill.lede':
    'Tagihan bulanan dibuat dari langganan aktif dan dihitung prorata sejak tanggal aktivasi. Pelanggan membayar online lewat Midtrans, dan kantor mencatat pembayaran tunai dan transfer bank.',
  'bill.b1':
    'Metode pembayaran yang dilihat pelanggan (QRIS, VA bank, e-wallet, minimarket) bergantung pada yang diaktifkan di akun Midtrans Anda.',
  'bill.b2':
    'Pengingat WhatsApp dan notifikasi aplikasi untuk tagihan yang akan dan sudah jatuh tempo, lewat akun WhatsApp Cloud API milik perusahaan Anda sendiri.',
  'bill.b3':
    'Isolir otomatis (opsional): atur masa tenggang, dan langganan dengan tagihan lewat jatuh tempo diisolir. Langganan yang diisolir karena tunggakan bisa aktif kembali saat tagihan dibayar. Penangguhan manual tidak pernah dibuka sendiri.',
  'bill.b4':
    'Piutang, tunggakan, kuitansi, dan pembatalan dengan jejak audit. Pembayaran hanya bisa ditambah, tidak diubah.',
  'bill.link': 'Tagihan di panduan pengguna',
  'bill.shotAlt':
    'Daftar tagihan Inbils: nomor tagihan, pelanggan, status, tanggal terbit, jatuh tempo, total, dan sisa, dengan filter di atasnya.',

  'office.title': 'Sisa pekerjaan kantor, di sistem yang sama.',
  'office.inventoryTitle': 'Inventaris',
  'office.inventoryBody':
    'Barang, gudang, dan stok dengan buku mutasi yang tidak bisa diubah. Teknisi meminta barang dan mendeklarasikan yang terpakai, manajer menyetujui, dan sisa kembali sebagai pengembalian barang.',
  'office.ticketsTitle': 'Tiket dan SLA',
  'office.ticketsBody':
    'Tiket membawa target respons pertama dan penyelesaian dari tingkat SLA, dan pemeriksaan terjadwal menandai pelanggaran tiap 15 menit. Komentar, komentar internal, lampiran, dan penilaian pelanggan saat tiket selesai.',
  'office.reportsTitle': 'Laporan',
  'office.reportsBody':
    'Laporan baca-saja dengan drill-down dan ekspor CSV atau PDF: metrik bisnis, kepatuhan SLA, kartu stok, kinerja teknisi, KPI penjualan, dan tampilan konsolidasi untuk perusahaan induk.',

  'plat.title': 'Satu instalasi, banyak ISP.',
  'plat.lede':
    'Inbils bersifat multi-tenant. Tenant adalah perusahaan ISP dengan anak perusahaan opsional, dan data, peran, serta integrasinya milik perusahaan itu.',
  'plat.b1':
    'Peran dimiliki tiap perusahaan dan berawal dari templat yang dipegang operator, sehingga setiap ISP membentuk sendiri admin, manajer, dan stafnya.',
  'plat.b2':
    'Panel operator di /platform punya login sendiri dengan autentikasi dua langkah. Operator membuat, menangguhkan, dan mengaktifkan kembali tenant, mengekspor data perusahaan, dan membaca audit platform.',
  'plat.b3':
    'Akses dukungan membuat operator masuk ke tenant sebagai salah satu penggunanya, dengan banner, batas waktu, mode baca atau ubah, dan catatan audit.',
  'plat.b4': 'Setiap ISP mengisi sendiri pengaturan Midtrans, WhatsApp, RADIUS, dan email.',
  'plat.link': 'Panduan panel operator',
  'plat.shotAlt':
    'Halaman panel operator untuk satu perusahaan: profil, ringkasan kondisi tujuh hari, dan status dengan tombol Tangguhkan.',

  'apps.title': 'Dua aplikasi Android, satu API terdokumentasi.',
  'apps.lede':
    'Inbils Teknisi untuk teknisi lapangan dan Inbils Pelanggan untuk pelanggan. Keduanya memakai api/v1, yang kontrak OpenAPI-nya diterbitkan di dokumentasi ini.',
  'apps.b1':
    'Pelanggan melihat status layanan, tagihan, dan kunjungan teknisi, membayar lewat Midtrans, dan membuka tiket.',
  'apps.b2': 'Notifikasi push dikirim lewat Firebase bila operator platform sudah mengaturnya.',
  'apps.b3':
    'Token dimiliki satu pemasangan aplikasi dan satu peran. Penulisan data membawa Idempotency-Key, sehingga mencoba ulang setelah koneksi putus aman.',
  'apps.guideCustomer': 'Panduan aplikasi pelanggan',
  'apps.guideTechnician': 'Panduan aplikasi teknisi',
  'apps.guideApi': 'API mobile',
  'apps.shotAlt':
    'Aplikasi Inbils Pelanggan: layar beranda dengan kartu layanan, jumlah yang harus dibayar, dan aksi cepat.',

  'docs.title': 'Baca dokumentasinya.',
  'docs.lede': 'Dalam bahasa Inggris dan Indonesia, dengan tangkapan layar antarmuka asli.',
  'docs.gettingStartedTitle': 'Memulai',
  'docs.gettingStartedBody':
    'Jalankan Inbils di komputer Anda dengan Laravel Sail dan Docker, lalu isi data awal dan masuk.',
  'docs.guidesTitle': 'Panduan pengguna',
  'docs.guidesBody':
    'Langkah demi langkah untuk staf ISP, operator platform, teknisi, dan pelanggan.',
  'docs.architectureTitle': 'Arsitektur',
  'docs.architectureBody': 'Modul, tenancy, izin, dan model data.',
  'docs.apiTitle': 'API mobile',
  'docs.apiBody': 'Autentikasi, konvensi, dan referensi yang dibuat dari berkas OpenAPI.',

  'closing.title': 'Tertarik memakai Inbils untuk ISP Anda? Hubungi saya lewat GitHub.',
  'closing.body': 'Ceritakan jaringan dan tim Anda. Beberapa baris saja sudah cukup.',
  'closing.cta': 'Buka profil GitHub saya',

  'contact.title': 'Hubungi | Inbils',
  'contact.description':
    'Tertarik memakai Inbils untuk ISP Anda? Hubungi saya lewat GitHub dan ceritakan jaringan, billing, dan tim lapangan Anda.',
  'contact.h1': 'Hubungi',
  'contact.lead': 'Tertarik memakai Inbils untuk ISP Anda? Hubungi saya lewat GitHub.',
  'contact.body':
    'Ceritakan yang Anda jalankan sekarang: jumlah pelanggan, router dan server RADIUS, cara pelanggan membayar, dan apakah teknisi Anda memerlukan aplikasinya. Beberapa baris saja sudah cukup.',
  'contact.cta': 'Buka profil GitHub saya',
  'contact.readTitle': 'Sebelum menulis',
  'contact.readBody':
    'Panduan pengguna memperlihatkan setiap layar aplikasi web dan kedua aplikasi Android, sehingga Anda bisa menilai kecocokannya tanpa demo.',
  'contact.readLink': 'Baca panduan pengguna',
};

const dictionaries: Record<Lang, Record<Key, string>> = { en, id };

/** The string for `key` in `lang`. */
export const t = (lang: Lang, key: Key): string => dictionaries[lang][key];

/** The API reference is generated from the English OpenAPI file and exists in English only: links to it never carry `/id`. */
export const ENGLISH_ONLY = '/docs/api/reference/';

/** Site path (starting with `/`) in `lang`, without the base: `/docs/` becomes `/id/docs/` in Indonesian. */
export const sitePath = (lang: Lang, path: string): string =>
  lang === 'id' && !path.startsWith(ENGLISH_ONLY) ? `/id${path}` : path;

/** `sitePath` with the Astro base, for links and assets. */
export const href = (lang: Lang, path: string): string => withBase(sitePath(lang, path));

/** The same page in the other language, from a site path that already carries its language prefix. */
export function twinPath(path: string): { lang: Lang; path: string } {
  return path === '/id/' || path.startsWith('/id/')
    ? { lang: 'en', path: path.slice(3) || '/' }
    : { lang: 'id', path: `/id${path}` };
}
