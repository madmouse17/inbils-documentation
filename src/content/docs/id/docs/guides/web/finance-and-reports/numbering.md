---
title: "7.13 Penomoran"
description: "Penomoran mengatur awalan, format, dan hitungan nomor otomatis untuk tagihan dan data lain."
---

Penomoran mengatur awalan, format, dan hitungan nomor otomatis untuk tagihan dan data lain. Menu ini ada di grup **Administrasi**, tetapi dibahas di sini karena menentukan nomor tagihan dan nomor dokumen lain.

Peran yang dapat memakai: pengguna dengan izin `system.setting`, yaitu admin pada peran bawaan. Manajer dan staf tidak melihat menu ini, dan alamatnya langsung ditolak dengan halaman **Akses ditolak** (galat 403). Izin ini bisa diberikan ke peran buatan sendiri di **Peran** ([bagian 8.6](/docs/guides/web/administration/roles/)). Tiap perusahaan punya hitungan sendiri, dan layar menampilkan hitungan perusahaan aktif.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Administrasi**, lalu klik **Penomoran**.
2. Catatan kuning di atas menulis "Perubahan format hanya berlaku untuk data baru. Kode yang sudah dibuat tidak berubah." Di bawahnya ada satu baris untuk tiap entitas bernomor, diurutkan menurut nama.

   ![Daftar Penomoran dengan kolom Entitas, Format, Kode berikutnya, Reset, Input manual, dan tombol Ubah](~/assets/guide/web/number-sequences.webp)
3. Kolom: **Entitas**, **Format** (pola yang dipakai), **Kode berikutnya** (kode yang akan keluar sekarang), **Reset** (lencana **Tidak pernah**, **Setiap tahun**, **Setiap bulan**, atau **Setiap hari**), **Input manual** (**Boleh** atau **Tidak**), dan **Aksi** dengan tombol **Ubah**. **Kode berikutnya** hanya perkiraan, karena pembuatan lain pada saat yang sama dapat mengambil nomor itu.
4. Entitas yang diatur (nilai awalnya terlihat di layar):
   - Aset Jaringan: kode aset jaringan ([bagian 5.2](/docs/guides/web/network/network-assets/)).
   - Barang (SKU): SKU barang ([bagian 6.2](/docs/guides/web/inventory/items/)). Input manual awalnya **Boleh**.
   - Karyawan: nomor karyawan ([bagian 8.3](/docs/guides/web/administration/employees/)).
   - Langganan: kode langganan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)).
   - Pelanggan: kode pelanggan ([bagian 4.1](/docs/guides/web/customers-and-services/customers/)).
   - Permintaan Barang: kode permintaan barang ([bagian 6.1](/docs/guides/web/inventory/item-requests/)). Format awalnya `{PREFIX}-{YYYY}-{SEQ:5}` dan reset **Setiap tahun**, jadi nomor pertama tahun 2026 berbentuk `REQ-2026-00001`. Format awal yang lama bersifat harian (`REQ-20261020-0003`). Perusahaan yang masih memakai format harian bawaan itu dipindah ke format tahunan dan hitungannya mulai dari 1 lagi. Kode lama tetap, dan format yang pernah Anda ubah sendiri tidak disentuh.
   - SPK: kode SPK ([bagian 3.3](/docs/guides/web/operations/work-orders/)).
   - Tagihan: nomor tagihan ([bagian 7.1](/docs/guides/web/finance-and-reports/invoices/)). Format awalnya `{PREFIX}-{YYYY}-{SEQ:5}` dan tidak pernah reset, jadi nomor pertama tahun 2026 berbentuk `INV-2026-00001`.
   - Tiket: kode tiket ([bagian 3.4](/docs/guides/web/operations/tickets/)). Reset awalnya **Setiap tahun**.

Nomor tagihan dari semua sumber (**Buat tagihan**, **Buat tagihan bulanan**, dan tagihan dari SPK) memakai satu hitungan **Tagihan**.

## Mengubah penomoran

1. Klik **Ubah** pada baris entitas. Jendela **Ubah penomoran &lt;entitas&gt;** terbuka dan mengingatkan "Hanya kode yang dibuat setelah ini yang memakai format baru."

   ![Jendela Ubah penomoran Pelanggan dengan isian Awalan, Nomor berikutnya, Format, tombol token, Reset nomor, dan Pratinjau kode berikutnya](~/assets/guide/web/number-sequences-edit.webp)

2. Isi form:
   - **Awalan**: wajib, 1 sampai 20 karakter, hanya huruf, angka, `-`, dan `_`.
   - **Nomor berikutnya**: wajib, bilangan bulat minimal 1, tidak lebih besar dari angka terbesar yang muat di `{SEQ:n}` (99999 untuk `{SEQ:5}`).
   - **Format**: wajib, maksimal 100 karakter. Ketik teks dan token, atau klik tombol token di bawah isian (`{PREFIX}`, `{YYYY}`, `{YY}`, `{MM}`, `{DD}`, `{COMPANY}`, `{SEQ:5}`) untuk menyisipkannya di posisi kursor. Setiap tombol punya keterangan singkat di sampingnya.
   - **Reset nomor**: pilih **Tidak pernah**, **Setiap tahun**, **Setiap bulan**, atau **Setiap hari**.
   - **Izinkan input kode manual**: saklar. Bila mati, kolom kode di formulir dikunci dan selalu dibuat otomatis. Teks bantu di bawahnya menulis "Jika mati, kolom kode di formulir dikunci dan selalu dibuat otomatis."
3. Baca **Pratinjau kode berikutnya**. Pratinjau berubah saat Anda mengetik dan memakai zona waktu perusahaan. Bila **Format** bermasalah, pesan merah muncul langsung di bawah isian sebelum Anda menyimpan.
4. Klik **Simpan**, atau **Batal** untuk menutup tanpa menyimpan. Setelah **Simpan**, notifikasi "Penomoran diperbarui." muncul, jendela tertutup, dan kolom **Kode berikutnya** berubah.

Aturan **Format**:

- Token yang dikenal: `{PREFIX}` (isi **Awalan**), `{YYYY}` (tahun 4 digit), `{YY}` (tahun 2 digit), `{MM}` (bulan), `{DD}` (tanggal), `{COMPANY}` (kode perusahaan), dan `{SEQ:n}` (nomor urut dengan nol di depan, n adalah jumlah digit dari 1 sampai 10). `{SEQ:n}` wajib ada tepat satu.
- Selain token, hanya huruf, angka, `-`, `_`, `/`, dan `.` yang boleh.
- **Setiap tahun** memerlukan `{YYYY}` atau `{YY}`. **Setiap bulan** memerlukan `{MM}` juga, dan **Setiap hari** memerlukan `{MM}` dan `{DD}` juga. Hitungan kembali ke 1 pada awal periode baru.
- Kode terpanjang yang mungkin tidak boleh melebihi 255 karakter.

Setelah **Simpan**:

- Hanya nomor yang dibuat sesudahnya yang berubah. Nomor lama tetap.
- Hitungan melanjutkan dari **Nomor berikutnya** yang Anda simpan. Format atau reset baru mulai dihitung pada periode saat Anda menyimpan.
- Sistem melewati nomor yang sudah dipakai data entitas itu, termasuk data yang sudah dihapus, jadi nomor tidak pernah ganda. Bila 1000 nomor berturut-turut sudah terpakai, pembuatan data gagal dan pesannya meminta **Nomor berikutnya** dinaikkan.
- Perubahan tercatat di Log audit ([bagian 7.12](/docs/guides/web/finance-and-reports/audit-log/)) dengan modul **Penomoran**.

## Kesalahan umum

- Nomor lama tidak berubah setelah **Simpan**. Itu disengaja: hanya nomor baru yang memakai format baru.
- "Reset berkala memerlukan {YYYY} atau {YY}.", "Reset bulanan atau harian memerlukan {MM}.", dan "Reset harian memerlukan {DD}." muncul bila **Format** kurang token untuk **Reset nomor** yang dipilih. Tambahkan token itu atau pilih **Tidak pernah**.
- "Format harus memuat tepat satu {SEQ:n}, n antara 1 dan 10." muncul bila **Format** tidak punya `{SEQ:n}` atau punya lebih dari satu.
- "Token {X} tidak dikenal." muncul bila **Format** memuat token di luar daftar atau `{SEQ:n}` dengan n di luar 1 sampai 10. "Gunakan huruf, angka, tanda - _ / . dan token di dalam kurung kurawal." muncul bila ada karakter lain di luar token.
- "Awalan hanya boleh berisi huruf, angka, - dan _ (maksimal 20 karakter)." muncul bila **Awalan** memuat spasi atau tanda lain. "Awalan wajib diisi." muncul bila kosong.
- "Nomor berikutnya maksimal 99999 untuk {SEQ:5}." (angkanya mengikuti n) muncul bila **Nomor berikutnya** terlalu besar. Perbesar n atau kecilkan nomornya.
- "Format menghasilkan kode lebih dari 255 karakter." atau, pada pratinjau, "Kode terlalu panjang: n dari maksimal 255 karakter." muncul bila kode terpanjang yang mungkin melewati batas. Pendekkan **Awalan** atau **Format**.
- Pengaturan **Input manual** pada **Tagihan** tidak berpengaruh, karena formulir tagihan tidak punya kolom nomor dan nomornya selalu otomatis.
- Menurunkan **Nomor berikutnya** tidak memakai ulang nomor lama. Sistem melewati nomor yang sudah ada.
- Kunci pengaturan perusahaan `invoice_prefix`, `spk_prefix`, dan `ticket_prefix` (diisi oleh wizard awal) tidak dipakai sistem dan tidak tampil di layar. Awalan hanya diatur di **Penomoran**.
