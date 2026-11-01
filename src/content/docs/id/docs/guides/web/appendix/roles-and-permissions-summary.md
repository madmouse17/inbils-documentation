---
title: "10.1 Peran dan izin ringkas"
description: "Inbils menyalin delapan templat peran ke setiap perusahaan saat perusahaan dibuat."
---

Inbils menyalin delapan templat peran ke setiap perusahaan saat perusahaan dibuat: Admin, Manajer, NOC & Layanan Pelanggan, Teknisi, Gudang, Keuangan, Staf, dan Pelanggan. Setelah itu peran-peran itu milik perusahaan Anda. Admin perusahaan dapat mengganti nama, mengubah isi, menghapus, dan menambah peran di menu Peran ([bagian 8.6](/docs/guides/web/administration/roles/)), dan pembaruan sistem tidak mengubahnya. Perusahaan lain mempunyai peran sendiri, jadi isinya bisa berbeda. Satu peran adalah kumpulan izin, dan izin adalah hak untuk satu tindakan, misalnya `spk.approve`. Daftar izin ada di Hak Akses ([bagian 8.7](/docs/guides/web/administration/permissions/)), dan peran diberikan ke pengguna di menu Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)). Istilah "bawaan" di panduan ini merujuk ke templat itu. Peran Pelanggan tidak bisa dihapus.

Tabel di bagian ini menggambarkan templat Admin, Manajer, dan Staf. Peran yang diubah atau dibuat perusahaan Anda dapat berbeda, dan satu pengguna dapat memegang lebih dari satu peran. Bila tabel dan layar Anda tidak cocok, cek peran pengguna itu di menu Pengguna ([bagian 8.5](/docs/guides/web/administration/users/)) dan isi perannya di menu Peran ([bagian 8.6](/docs/guides/web/administration/roles/)).

Teknisi dan pelanggan memakai aplikasi Android, bukan web. Akun yang tidak memegang izin akses web (`app.web`) dialihkan ke halaman **Gunakan aplikasi Inbils** ([bagian 1.1](/docs/guides/web/introduction/who-uses-this-guide/)). Akun yang juga memegang peran dengan akses web, misalnya Admin, Manajer, atau Staf, tidak dialihkan.

## Menu yang tampil di sidebar

Kolom izin menyebut izin yang membuka menu: satu saja sudah cukup. Menu hanya menentukan apakah tautannya tampil. Setiap layar tetap memeriksa izin untuk setiap tindakan.

| Grup | Menu | Izin yang membuka | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- | --- |
| Tanpa grup | Dasbor | `dashboard.view` | ya | ya | ya |
| Operasional | Pekerjaan Saya | izin kerja lapangan dan profil karyawan aktif | bila profil aktif | bila profil aktif | bila profil aktif |
| Operasional | Penugasan | `ticket.assign` atau `ticket.reassign` atau `spk.assign` atau `spk.reassign` | ya | ya | tidak |
| Operasional | Persetujuan | `spk.approve` atau `spk.reject` atau `inventory.request.approve` atau `inventory.request.reject` | ya | ya | tidak |
| Operasional | SPK | `spk.view` | ya | ya | ya |
| Operasional | Tiket | `ticket.view` | ya | ya | ya |
| Operasional | Evaluasi | `evaluation.view` atau `evaluation.view.own` | ya | ya | ya |
| Pelanggan & Layanan | Pelanggan | `customer.view` | ya | ya | ya |
| Pelanggan & Layanan | Paket Layanan | `service.view` atau `service.manage` | ya | ya | ya |
| Pelanggan & Layanan | Kategori Paket | `service.view` atau `service.manage` | ya | ya | ya |
| Pelanggan & Layanan | Profil Bandwidth | `service.view` atau `service.manage` | ya | ya | ya |
| Pelanggan & Layanan | Profil Kecepatan | `service.view` atau `service.manage` | ya | ya | ya |
| Pelanggan & Layanan | Tingkat SLA | `service.view` atau `service.manage` | ya | ya | ya |
| Pelanggan & Layanan | Kategori Tiket | `ticket.category.manage` | ya | ya | tidak |
| Pelanggan & Layanan | Pengumuman & Promo | `announcement.manage` | ya | ya | tidak |
| Jaringan | Lokasi | `location.view` | ya | ya | ya |
| Jaringan | Aset Jaringan | `network_asset.view` | ya | ya | ya |
| Jaringan | Router NAS | `network_asset.nas.view` | ya | ya | ya |
| Jaringan | Alamat IP | `ipam.view` | ya | ya | ya |
| Jaringan | ODN | `odn.view` | ya | ya | ya |
| Inventaris | Permintaan Barang | `inventory.request.view.own` atau `inventory.request.view.all` | ya | ya | ya |
| Inventaris | Barang | `inventory.view` | ya | ya | ya |
| Inventaris | Kategori | `inventory.view` | ya | ya | ya |
| Inventaris | Satuan | `inventory.view` | ya | ya | ya |
| Inventaris | Stok | `inventory.view` | ya | ya | ya |
| Inventaris | Cari Barang | `inventory.view` | ya | ya | ya |
| Inventaris | Mutasi Stok | `inventory.view` | ya | ya | ya |
| Keuangan & Laporan | Tagihan | `billing.view` | ya | ya | ya |
| Keuangan & Laporan | Tunggakan | `billing.view` | ya | ya | ya |
| Keuangan & Laporan | Laporan | `report.view` | ya | ya | ya |
| Keuangan & Laporan | Kinerja Teknisi | `report.technician`, lalu aturan akses laporan teknisi | ya | bila profil aktif dan ditempatkan di organisasi aktif | tidak |
| Keuangan & Laporan | KPI Penjualan | `report.sales.view` | ya | ya | tidak |
| Keuangan & Laporan | Metrik Konsolidasi | `report.consolidated.view`, perusahaan aktif berupa Head | bila Head | tidak | tidak |
| Administrasi | Perusahaan | `company.manage` | ya | tidak | tidak |
| Administrasi | Integrasi | `company.integrations.manage` | ya | tidak | tidak |
| Administrasi | Organisasi | `organization.view` | ya | tidak | tidak |
| Administrasi | Karyawan | `employee.view` | ya | tidak | tidak |
| Administrasi | Kendaraan | `vehicle.view` | ya | tidak | tidak |
| Administrasi | Pengguna | `users.manage` | ya | tidak | tidak |
| Administrasi | Peran | `roles.manage` | ya | tidak | tidak |
| Administrasi | Hak Akses | `roles.manage` | ya | tidak | tidak |
| Administrasi | Jenis Dokumen | `system.setting` | ya | tidak | tidak |
| Administrasi | Penomoran | `system.setting` | ya | tidak | tidak |

Catatan untuk menu bersyarat dan angka:

- **Pekerjaan Saya** tampil bagi pengguna yang memegang izin kerja lapangan (`spk.start`, `spk.submit`, `ticket.start`, `ticket.resolve`, atau `ticket.close`) dan punya profil karyawan yang aktif di perusahaan aktif ([bagian 3.6](/docs/guides/web/operations/my-work/) dan [8.3](/docs/guides/web/administration/employees/)).
- **Penugasan** juga mensyaratkan pengguna yang aktif.
- **Kinerja Teknisi** tampil bagi admin, dan bagi manajer yang berizin `report.technician`, punya profil karyawan aktif, dan ditempatkan di organisasi aktif ([bagian 7.9](/docs/guides/web/finance-and-reports/technician-performance/)).
- **Metrik Konsolidasi** tampil hanya saat perusahaan aktif berupa Head dan akun memegang `report.consolidated.view` ([bagian 1.6](/docs/guides/web/introduction/switch-company/) dan [7.11](/docs/guides/web/finance-and-reports/consolidated-metrics/)).
- **Pekerjaan Saya**, **Penugasan**, dan **Persetujuan** menampilkan angka jumlah antrean di sebelah namanya bila ada isinya.
- Menu **Komponen** di grup **Administrasi** hanya muncul di lingkungan pengembangan dan tidak dibahas di panduan ini.
- Menu **Dasbor** terbuka untuk semua peran bawaan.

## Kemampuan: Operasional

| Kemampuan | Izin | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- |
| Menugaskan tiket dan SPK | `ticket.assign`, `spk.assign` | ya | ya | tidak |
| Menugaskan ulang tiket dan SPK | `ticket.reassign`, `spk.reassign` | ya | ya | tidak |
| Mengubah nama, target, dan status Kategori Tiket | `ticket.category.manage` | ya | ya | tidak |
| Membuat SPK | `spk.create` | ya | ya | ya |
| Mengubah SPK (item, bukti) | `spk.update` | ya | ya | tidak |
| Menyetujui dan menolak SPK | `spk.approve`, `spk.reject` | ya | ya | tidak |
| Membatalkan SPK | `spk.cancel` | ya | ya | tidak |
| Memulai dan mengajukan SPK | `spk.start`, `spk.submit` | ya | tidak | ya |
| Mengekspor SPK | `spk.export` | ya | ya | tidak |
| Membuat tiket | `ticket.create` | ya | ya | ya |
| Membuat SPK dari tiket | `ticket.spawn_spk` | ya | ya | tidak |
| Menutup tiket | `ticket.close` | ya | ya | tidak |
| Membuka kembali tiket (dengan alasan) | `ticket.reopen` | ya | ya | tidak |
| Memulai dan menyelesaikan tiket | `ticket.start`, `ticket.resolve` | ya | tidak | tidak |
| Komentar dan lampiran tiket | `ticket.comment.create`, `ticket.attachment.upload` | ya | tidak | ya |
| Mengekspor tiket | `ticket.export` | ya | ya | tidak |
| Melihat dan membuat evaluasi | `evaluation.view`, `evaluation.create`, `evaluation.update` | ya | ya | ya |

## Kemampuan: Pelanggan dan layanan

| Kemampuan | Izin | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- |
| Melihat pelanggan | `customer.view` | ya | ya | ya |
| Membuat dan mengubah pelanggan, alamat, kontak | `customer.create`, `customer.update`, `customer.address.manage` | ya | ya | ya |
| Mengekspor pelanggan | `customer.export` | ya | ya | tidak |
| Mengunggah dan menghapus dokumen pelanggan (tab Dokumen) | `customer.update` | ya | ya | ya |
| Menghapus pelanggan | `customer.delete` | ya | tidak | tidak |
| Melihat langganan | `customer.subscription.view` | ya | ya | ya |
| Membuat, mengaktifkan, dan menangguhkan langganan | `customer.subscription.manage`, `customer.subscription.activate`, `customer.subscription.suspend` | ya | ya | tidak |
| Mengaktifkan kembali, memblokir, dan menghentikan langganan | `customer.subscription.reactivate`, `customer.subscription.block`, `customer.subscription.terminate` | ya | ya | tidak |
| Menetapkan Diperoleh oleh | `customer.sales.assign` | ya | ya | ya |
| Mengoreksi Diperoleh oleh | `customer.sales.correct` | ya | ya | tidak |
| Melihat paket, kategori paket, dan profil layanan | `service.view` atau `service.manage` | ya | ya | ya |
| Membuat dan mengubah paket, kategori paket, dan profil layanan | `service.create`, `service.update`, atau `service.manage` | ya | ya | tidak |
| Menghapus paket, kategori paket, dan profil layanan | `service.delete` atau `service.manage` | ya | ya | tidak |
| Mengekspor paket dan profil layanan | `service.export` | ya | tidak | tidak |
| Membuat, menerbitkan, dan menonaktifkan pengumuman dan banner promo | `announcement.manage` | ya | ya | tidak |

## Kemampuan: Jaringan

| Kemampuan | Izin | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- |
| Melihat aset jaringan | `network_asset.view` | ya | ya | ya |
| Membuat, mengubah, memasang, dan melepas aset | `network_asset.create`, `network_asset.update`, `network_asset.install`, `network_asset.remove` | ya | ya | tidak |
| Pemeliharaan, perbaikan, dan pensiun aset | `network_asset.maintenance`, `network_asset.repair`, `network_asset.retire` | ya | ya | tidak |
| Menghapus aset | `network_asset.delete` | ya | tidak | tidak |
| Melihat Router NAS | `network_asset.nas.view` | ya | ya | ya |
| Mengelola Router NAS | `network_asset.nas.manage` | ya | tidak | tidak |
| Melihat, mengelola, dan menampilkan kata sandi akun jaringan | `network_asset.account.view`, `network_asset.account.manage`, `network_asset.account.reveal` | ya | ya | ya |
| Melihat Alamat IP | `ipam.view` | ya | ya | ya |
| Mengelola prefiks dan VLAN | `ipam.manage` | ya | ya | tidak |
| Mencatat alamat IP statis | `ipam.assign` | ya | ya | tidak |
| Melihat ODN | `odn.view` | ya | ya | ya |
| Mengelola port PON dan splitter | `odn.manage` | ya | ya | tidak |
| Mencatat port drop | `odn.assign` | ya | ya | ya |
| Melihat lokasi | `location.view` | ya | ya | ya |
| Membuat, mengubah, dan memindahkan lokasi | `location.create`, `location.update`, `location.move` | ya | ya | tidak |
| Menghapus lokasi | `location.delete` | ya | tidak | tidak |

## Kemampuan: Inventaris

| Kemampuan | Izin | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- |
| Melihat barang, stok, dan mutasi | `inventory.view` | ya | ya | ya |
| Membuat dan mengubah barang, kategori, satuan | `inventory.create`, `inventory.update` | ya | ya | ya |
| Menghapus barang, kategori, satuan | `inventory.delete` | ya | tidak | tidak |
| Mengekspor data inventaris | `inventory.export` | ya | ya | tidak |
| Menerima dan memindahkan stok | `inventory.stock.receive`, `inventory.stock.transfer` | ya | tidak | ya |
| Mengeluarkan stok | `inventory.stock.issue` | ya | tidak | ya |
| Mengajukan penyesuaian stok | `inventory.stock.adjust.request` | ya | tidak | ya |
| Menyetujui penyesuaian stok | `inventory.stock.adjust.approve` | ya | ya | tidak |
| Penyesuaian stok langsung (break-glass) | `inventory.stock.adjust` | ya | tidak | tidak |
| Melihat semua permintaan barang | `inventory.request.view.all` | ya | ya | ya |
| Membuat permintaan barang | `inventory.request.create` | ya | tidak | tidak |
| Menyetujui dan menolak permintaan barang | `inventory.request.approve`, `inventory.request.reject` | ya | ya | tidak |
| Menyiapkan dan menyerahkan barang | `inventory.request.prepare`, `inventory.request.issue` | ya | tidak | ya |
| Melihat semua pengembalian barang | `inventory.return.view.all` | ya | ya | ya |
| Menerima pengembalian fisik | `inventory.return.receive` | ya | ya | ya |
| Menyelesaikan selisih pengembalian | `inventory.return.resolve` | ya | ya | tidak |

Layar web **Stok** hanya menyediakan **Terima Barang**, **Ajukan Penyesuaian**, dan persetujuan penyesuaian. Izin memindahkan stok, mengeluarkan stok, dan penyesuaian langsung ada di server, tetapi layar webnya belum ada ([bagian 6.5](/docs/guides/web/inventory/stock/)).

## Kemampuan: Keuangan dan laporan

| Kemampuan | Izin | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- |
| Melihat tagihan dan tunggakan | `billing.view` | ya | ya | ya |
| Membuat dan mengirim tagihan, mencatat pembayaran | `billing.create`, `billing.send`, `billing.payment.record` | ya | ya | ya |
| Menambah item tagihan | `billing.update` | ya | ya | tidak |
| Membatalkan pembayaran dan membatalkan tagihan | `billing.payment.reverse`, `billing.cancel` | ya | ya | tidak |
| Mengekspor tagihan | `billing.export` | ya | ya | tidak |
| Mengunduh PDF dan kuitansi tagihan | `billing.pdf.view` | ya | ya | tidak |
| Laporan (daftar), Metrik Bisnis, Pemanfaatan Aset | `report.view`, `report.business.view`, `report.asset.view` | ya | ya | ya |
| Kepatuhan SLA, Kartu Stok, Kamus Data | `report.sla.view`, `report.stock_card.view`, `report.dictionary.view` | ya | ya | ya |
| KPI Penjualan | `report.sales.view` | ya | ya | tidak |
| Kinerja Teknisi | `report.technician` | ya | ya | tidak |
| Mengekspor laporan | `report.export` | ya | ya | tidak |
| Log audit | `report.audit.view` | ya | tidak | tidak |
| Metrik Konsolidasi | `report.consolidated.view` | ya | tidak | tidak |

## Kemampuan: Administrasi

| Kemampuan | Izin | Admin | Manajer | Staf |
| --- | --- | --- | --- | --- |
| Melihat Dasbor | `dashboard.view` | ya | ya | ya |
| Mengelola pengguna | `users.manage` | ya | tidak | tidak |
| Mengatur ulang 2FA pengguna lain | `users.two_factor.reset` | ya | tidak | tidak |
| Mengelola peran dan melihat Hak Akses | `roles.manage` | ya | tidak | tidak |
| Mengelola profil dan pengaturan perusahaan | `company.manage` | ya | tidak | tidak |
| Mengelola akun Midtrans, WhatsApp, Email, dan RADIUS perusahaan (Integrasi) | `company.integrations.manage` | ya | tidak | tidak |
| Berpindah perusahaan (juga butuh keanggotaan di perusahaan tujuan) | `company.switch` | ya | ya | tidak |
| Mengelola organisasi | `organization.manage` | ya | tidak | tidak |
| Mengelola karyawan | `employee.manage` | ya | tidak | tidak |
| Mengelola kendaraan | `vehicle.manage` | ya | tidak | tidak |
| Mengelola jenis dokumen dan penomoran | `system.setting` | ya | tidak | tidak |

Nilai "ya" berarti peran memegang semua izin di baris itu. Bila izin dipisah dengan kata atau, satu izin saja sudah cukup. Kolom itu menggambarkan templat bawaan. Izin yang dirilis sesudah perusahaan Anda dibuat, seperti `ticket.reopen`, hanya masuk ke peran yang disalin dari templat tertentu ([bagian 8.6](/docs/guides/web/administration/roles/)).

## Teknisi dan pelanggan

Dua templat ini bekerja di aplikasi. Izin templat Teknisi:

- `app.technician`, `evaluation.evaluable`
- `customer.view`
- `dashboard.view`
- `evaluation.view.own`
- `inventory.request.cancel.own`, `inventory.request.create`, `inventory.request.view.own`, `inventory.return.declare`, `inventory.return.view.own`, `inventory.stock.issue`, `inventory.view`
- `ipam.view`
- `location.view`
- `network_asset.view`
- `odn.view`
- `report.technician`
- `spk.evidence.upload`, `spk.evidence.view`, `spk.start`, `spk.submit`, `spk.view`
- `ticket.attachment.upload`, `ticket.comment.create`, `ticket.create`, `ticket.resolve`, `ticket.start`, `ticket.view`

Izin templat Pelanggan:

- `portal.access`
- `dashboard.view`
- `evaluation.customer.submit`
- `portal.invoice.pay`, `portal.invoice.view`
- `ticket.attachment.upload`, `ticket.comment.create`, `ticket.create`, `ticket.view`

`app.technician` menandai karyawan lapangan, `evaluation.evaluable` menandai karyawan yang bisa dinilai di Evaluasi, dan `portal.access` menandai akun pelanggan (bersama tautan ke data pelanggan). Ketiganya tidak membuka menu web.

## Pemisahan tugas

Beberapa keputusan tidak boleh diambil oleh orang yang sama dengan yang membuat atau mengajukannya. Server memeriksa aturan ini untuk semua pengguna, termasuk admin. Di sebagian layar tombolnya disembunyikan bagi orang yang dilarang. Di layar lain tombolnya tetap tampil, dan server menolak tindakannya dengan pesan di kolom terakhir tabel ini. Layar **Persetujuan**, dialog permintaan barang, dan dialog pengembalian menampilkan pesan itu. Di layar lain, misalnya halaman SPK, Anda bisa hanya melihat toast "Data gagal disimpan. Periksa input." atau galat umum.

| Tindakan | Tidak boleh dilakukan oleh | Bagian | Pesan penolakan |
| --- | --- | --- | --- |
| Menyetujui atau menolak SPK | Pembuat SPK dan teknisi yang ditugaskan | 3.3 | "Pembuat SPK tidak boleh menyetujui SPK sendiri." atau "Teknisi yang ditugaskan tidak boleh menyetujui SPK sendiri." Saat menolak, katanya menolak. |
| Menyetujui atau menolak permintaan barang | Pemohon | 6.1 | "Maker-checker: pemohon tidak boleh menyetujui permintaan sendiri." Saat menolak, katanya menolak. |
| Menyiapkan barang untuk permintaan | Penyetuju permintaan | 6.1 | "Maker-checker: penyetujui tidak boleh menyiapkan barang." |
| Menyerahkan barang untuk permintaan | Pemohon dan penyetuju | 6.1 | "Maker-checker: pemohon tidak boleh melakukan serah terima barang kepada dirinya sendiri." atau "Maker-checker: penyetujui tidak boleh melakukan serah terima barang." |
| Menyetujui atau menolak penyesuaian stok | Pemohon penyesuaian | 6.5 | "Maker-checker: pemohon tidak boleh menyetujui permintaan penyesuaian stoknya sendiri." Saat menolak, katanya menolak. |
| Membatalkan tagihan | Pembuat tagihan | 7.1 | "Tagihan yang Anda buat sendiri tidak bisa Anda batalkan." |
| Membatalkan pembayaran | Pencatat pembayaran | 7.1 | "Pembayaran yang Anda catat sendiri tidak bisa Anda batalkan." |
| Menutup tiket | Petugas tiket itu | 3.4 | "Tiket yang Anda selesaikan tidak bisa Anda tutup sendiri." |
| Menerima atau menolak berkas pengembalian | Pemilik berkas | 6.8 | "Maker-checker: teknisi pemilik barang tidak boleh menerima fisiknya sendiri di gudang." atau "Maker-checker: teknisi tidak boleh menolak serah terima barangnya sendiri." |
| Menyelesaikan selisih pengembalian | Pemilik berkas dan orang yang menerima fisik barangnya | 6.8 | "Teknisi tidak berhak menyelesaikan selisih barangnya sendiri." atau "Penerima fisik gudang tidak boleh menyelesaikan selisih yang ia terima sendiri." |
| Mengatur ulang 2FA sebuah akun | Pemilik akun itu sendiri, dan pengguna yang tidak memegang semua hak akses akun itu | 1.4 dan 8.5 | Tombolnya tidak tampil. |
| Memberi hak akses yang tidak Anda pegang, mengubah atau menghapus peran atau pengguna yang lebih berkuasa dari Anda | Semua pengguna, termasuk admin untuk hak akses yang tidak dipegangnya | 8.5 dan 8.6 | Memberi hak akses yang tidak Anda pegang ditolak dengan pesan "Anda tidak dapat memberi hak akses yang tidak Anda miliki: &lt;hak akses&gt;." Mengubah atau menghapus yang lebih berkuasa ditolak dengan halaman **Akses ditolak**. |
| Melepas atau menonaktifkan admin terakhir perusahaan | Semua pengguna | 8.5 dan 8.6 | "Perusahaan harus tetap punya minimal satu admin aktif yang memegang roles.manage." |

Selain itu, peran yang tidak memuat `roles.manage` tidak boleh memegang pasangan izin yang berbenturan. Izin menyetujui atau menolak permintaan barang tidak boleh bersama izin menyiapkan atau menyerahkan barang, atau menerima, mengeluarkan, dan memindahkan stok. Izin menyetujui penyesuaian stok tidak boleh bersama izin mengajukan penyesuaian, atau menerima, mengeluarkan, dan memindahkan stok. Izin darurat `inventory.stock.adjust` hanya boleh dimuat peran yang juga memuat `roles.manage`. Pemeriksaan ini berjalan per perusahaan saat peran atau pengguna disimpan, termasuk saat dua peran digabung di satu akun, misalnya Manajer dan Staf bawaan. Bila yang menyimpan tidak memegang `roles.manage`, Inbils menolak penyimpanan yang melanggar dengan pesan seperti "Pemisahan tugas (persetujuan permintaan barang vs pelaksanaan gudang): &lt;izin&gt; tidak boleh digabung dengan &lt;izin&gt;." atau "Hanya administrator yang boleh memberikan hak akses darurat &lt;izin&gt;." Pemegang `roles.manage` dikecualikan dari pemeriksaan ini.
