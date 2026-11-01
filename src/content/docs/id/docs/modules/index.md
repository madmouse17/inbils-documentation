---
title: "Modul"
description: "Ikhtisar sembilan modul produk Inbils dan apa yang dimiliki masing-masing: pelanggan, katalog, jaringan, SPK, inventaris, kinerja, penagihan, tiket, dan pelaporan."
---

Inbils dibagi menjadi modul-modul domain. Setiap halaman di bawah menjelaskan satu modul sebagaimana dilihat orang yang menjalankan ISP: untuk apa modul itu, status yang dilalui catatannya, siapa boleh melakukan apa, dan job apa yang berjalan di latar belakang. Untuk cara kode dipotong, lihat [Batas modul](/docs/architecture/modules/).

## Pelanggan dan langganan

Memiliki pelanggan, alamat, kontak, dan dokumennya, serta siklus hidup langganan: `pending`, `active`, `suspended`, `terminated`. Modul ini juga mencakup isolir (halaman yang dilihat pelanggan yang di-suspend). Langganan sekaligus menjadi langganan penagihan. Di kode, bagian ini berada di core bersama dan bukan paket modul terpisah. Lihat [Pelanggan](/docs/modules/customers/).

## Katalog layanan

Memiliki paket layanan beserta versinya, profil bandwidth dan kecepatan, tingkat SLA, pengumuman, dan banner promo. Versi paket membekukan harga dan profil yang dipakai saat langganan dijual. Lihat [Katalog layanan](/docs/modules/service-catalogue/).

## Jaringan, RADIUS, dan IPAM

Memiliki aset jaringan beserta riwayat pemasangannya, perangkat NAS, akun RADIUS dan pemutusan koneksi, manajemen alamat IP (prefix, VLAN, alamat), dan topologi ODN. Lihat [Jaringan](/docs/modules/network/).

## SPK

Memiliki SPK untuk teknisi lapangan: state machine, penugasan, bukti kerja, aturan jarak check-in, dan antrean penugasan. SPK pemasangan yang disetujui memicu tagihan pemasangan di Billing. Lihat [SPK](/docs/modules/work-orders/).

## Inventaris

Memiliki produk, kategori, satuan, gudang, stok, pergerakan stok yang tidak bisa diubah, permintaan barang, penyesuaian dengan persetujuan, dan pengembalian material. Modul lain mengubah stok hanya lewat Inventory. Lihat [Inventaris](/docs/modules/inventory/).

## Kinerja teknisi

Mencakup evaluasi karyawan, termasuk teknisi: nilai dan rating yang dicatat terhadap SPK dan tiket. Angka kinerjanya sendiri dihitung oleh Reporting. Lihat [Kinerja teknisi](/docs/modules/technician-performance/).

## Penagihan

Memiliki tagihan, pembayaran, percobaan pembayaran, pembayaran online Midtrans, tunggakan, isolir otomatis untuk akun menunggak, dan pengingat WhatsApp tagihan. Lihat [Penagihan dan pembayaran](/docs/modules/billing/).

## Tiket

Memiliki tiket, kategori, komentar, lampiran, tenggat SLA dan pengecekan pelanggaran, serta penilaian pelanggan. Tiket bisa melahirkan SPK maintenance. Lihat [Tiket dan SLA](/docs/modules/ticketing/).

## Pelaporan

Lapisan read-only di atas semua modul lain: registry laporan, drill-down, ekspor CSV dan PDF, kamus data, dan laporan konsolidasi perusahaan induk. Modul ini tidak menulis apa pun. Lihat [Pelaporan](/docs/modules/reporting/).

## Bagaimana modul saling terhubung

| Modul | Membaca atau memanggil |
|---|---|
| Billing | Langganan (suspend dan aktivasi ulang), SPK (tagihan pemasangan), Inventory (baris produk). |
| Ticketing | Pelanggan dan langganan, aset jaringan, SPK (membuat SPK). |
| SPK | Inventory (material), aset jaringan (perangkat terpasang). |
| Reporting | Billing, Inventory, Network, SPK, dan Ticketing, hanya baca. |

Setiap modul dibatasi per tenant: catatan milik sebuah perusahaan, dan job berjalan di dalam perusahaan yang ditanganinya. Baca [Multi-tenancy](/docs/architecture/multi-tenancy/) dan [Izin](/docs/architecture/permissions/) lebih dulu bila Anda baru.
