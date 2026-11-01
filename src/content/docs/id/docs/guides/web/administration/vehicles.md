---
title: "8.4 Kendaraan"
description: "Kendaraan mencatat kendaraan operasional teknisi: nomor polisi, jenis, merek, model, tanggal pembelian dan status aktif."
---

Kendaraan mencatat kendaraan operasional teknisi: nomor polisi, jenis, merek, model, tanggal pembelian dan status aktif. Buka menu ini saat perusahaan menambah, mengganti atau menghentikan kendaraan. Siapa yang memakai kendaraan dicatat di profil karyawan ([bagian 8.3](/docs/guides/web/administration/employees/)), bukan di layar ini.

Peran yang dapat memakai: admin. Izin: `vehicle.view` membuka menu dan daftar, `vehicle.manage` mengizinkan tambah, ubah dan hapus, `vehicle.export` menampilkan tombol **Ekspor**. Pada peran bawaan hanya admin yang memegang izin kendaraan. Tombol **Buat Kendaraan** dan kolom **Aksi** (**Ubah** dan **Hapus**) hanya tampil bagi pemegang `vehicle.manage`; server juga menolak aksi dari pengguna tanpa izin itu.

## Membuka dan membaca daftar

1. Di sidebar, buka grup **Administrasi**, lalu klik **Kendaraan**.
2. Baca daftar. Kotak **Cari** (teks petunjuk "Nomor polisi, jenis, merek, atau model") mencari di empat kolom itu. Filter **Status** punya **Semua status**, **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. Kolomnya **Nomor polisi**, **Jenis**, **Merek**, **Model**, **Status** dan **Aksi**. **Nomor polisi**, **Jenis**, **Merek** dan **Model** bisa diurutkan. Urutan awal menunjukkan kendaraan terbaru di atas. Sel kosong berisi `-`, dan lencana **Status** berisi **Aktif**, **Nonaktif**, atau **Dihapus**. Daftar memakai halaman: lihat teks "Menampilkan" dengan rentang baris dan jumlah total, pilihan "Baris per halaman" serta tombol halaman sebelumnya dan berikutnya di bawah tabel ([bagian 1.5](/docs/guides/web/introduction/know-the-screen/)). Bila belum ada kendaraan, layar menulis "Belum ada kendaraan".

   ![Daftar Kendaraan yang masih kosong pada perusahaan demo, dengan kotak Cari dan tombol Buat Kendaraan](~/assets/guide/web/vehicles.webp)

## Menambah kendaraan

1. Klik **Buat Kendaraan**.
2. Isi form pada dialog **Buat Kendaraan**:
   - **Nomor polisi**: wajib, maksimal 20 karakter. Nomor tidak boleh sama dengan kendaraan lain di perusahaan yang sama, termasuk kendaraan yang sudah dihapus.
   - **Jenis**: opsional. Pilih **Motor**, **Mobil** atau **Pikap** dari daftar, atau biarkan "Pilih jenis" bila jenisnya belum perlu dicatat. Kendaraan lama yang jenisnya tersimpan dengan tulisan lain tetap menampilkan tulisan itu di daftar pilihan saat **Ubah**, jadi menyimpan ulang tidak menghapusnya.
   - **Merek**: opsional, maksimal 100 karakter.
   - **Model**: opsional, maksimal 100 karakter.
   - **Tanggal pembelian**: opsional. Ketik tanggal dalam format tanggal perusahaan, atau klik isian untuk membuka kalender ("Pilih tanggal") lalu pilih hari, atau klik **Hari ini**. Tombol "Hapus tanggal" mengosongkan isian.
   - **Aktif**: saklar, aktif secara awal. Hanya kendaraan aktif yang muncul di pilihan **Kendaraan** pada profil karyawan.
   - **Catatan**: opsional, teks bebas.
3. Klik **Buat**. Muncul toast "Kendaraan dibuat."

## Mengubah kendaraan

1. Klik **Ubah** pada baris kendaraan. Dialog **Ubah Kendaraan** terbuka dengan semua data yang tersimpan, termasuk **Tanggal pembelian** dan **Catatan**.
2. Ubah isian yang perlu. Mengosongkan **Tanggal pembelian** menghapus tanggal yang tersimpan.
3. Klik **Simpan**. Muncul toast "Kendaraan diperbarui."

## Menonaktifkan, menghapus permanen, dan memulihkan kendaraan

1. Klik **Aksi lainnya** pada baris kendaraan. Isinya **Nonaktifkan** (atau **Aktifkan**) dan **Hapus permanen**. Dialog **Nonaktifkan** menulis berapa karyawan yang memakai kendaraan itu, misalnya "dipakai 1 karyawan". Toast "Kendaraan dinonaktifkan." muncul. Kendaraan nonaktif tidak muncul di pilihan **Kendaraan** pada form karyawan, dan karyawan yang sudah memakainya tetap tercatat.
2. **Hapus permanen** hanya ada bila tidak ada karyawan yang memakai kendaraan itu. Dialog "Hapus permanen &lt;nomor polisi&gt;?" menulis "Kendaraan "&lt;nomor polisi&gt;" belum pernah dipakai data lain. Penghapusan permanen tidak bisa dibatalkan." Muncul toast "Kendaraan dihapus permanen."
3. Filter **Status** punya **Aktif**, **Nonaktif**, **Dihapus**, dan **Semua, termasuk dihapus**. Baris yang dihapus punya **Pulihkan**.

Kendaraan yang masih dipakai karyawan tidak bisa dihapus permanen: dialog menulis "Kendaraan masih dipakai 1 karyawan. Nonaktifkan saja."

## Mengekspor daftar

1. Isi kotak **Cari** bila Anda hanya butuh sebagian kendaraan.
2. Klik **Ekspor**, lalu pilih **Ekspor CSV** atau **Ekspor PDF**.

Berkas bernama `vehicles-export-<tanggal>-<jam>.csv` atau `.pdf` dan berisi kolom Nomor polisi, Jenis, Merek, Model dan Status. Tombol **Ekspor** hanya tampil bagi pemegang `vehicle.export`.

## Kesalahan umum

- Pesan "nomor polisi sudah digunakan." di bawah **Nomor polisi**: nomor itu sudah dipakai kendaraan lain, termasuk kendaraan yang nonaktif atau sudah dihapus (**Dihapus**). Nomor tetap terpesan, jadi untuk kendaraan yang berhenti dipakai pilih **Nonaktifkan**, bukan hapus, atau **Pulihkan** kendaraan lama dari filter **Status** **Dihapus**.
- Penyimpanan gagal dengan toast "Data gagal disimpan. Periksa input.": baca pesan merah di bawah isian. **Nomor polisi** menulis "nomor polisi wajib diisi." bila kosong, dan **Merek** serta **Model** menolak teks yang melewati batas panjangnya.
- Tombol **Buat Kendaraan**, **Ubah** atau **Hapus** tidak tampil, atau server menolaknya: peran Anda belum memegang `vehicle.manage`. Minta admin perusahaan menambahkannya ke peran di menu Peran ([bagian 8.6](/docs/guides/web/administration/roles/)), atau memberi Anda peran yang memegangnya ([bagian 8.7](/docs/guides/web/administration/permissions/)).
