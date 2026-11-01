---
title: "1.7 Profil dan kata sandi"
description: "Profil memuat data akun Anda sendiri. Halaman ini sama untuk semua peran."
---

Profil memuat data akun Anda sendiri. Halaman ini sama untuk semua peran.

1. Klik nama Anda di kanan atas, lalu **Profil**.

   ![Halaman Profil dengan bagian Data akun, Ganti kata sandi, dan Autentikasi dua langkah](~/assets/guide/web/profile.webp)

2. Untuk mengubah nama atau email, ubah isian **Nama** atau **Email** di bagian **Data akun**, lalu klik **Simpan**. Tulisan "Tersimpan." muncul di samping tombol.
3. Untuk mengganti kata sandi, isi **Kata sandi saat ini**, **Kata sandi baru**, dan **Ulangi kata sandi baru** di bagian **Ganti kata sandi**, lalu klik **Simpan**. Kata sandi baru minimal 8 karakter. Ketiga isian kosong lagi setelah tersimpan.
4. Bagian **Autentikasi dua langkah** dijelaskan di [bagian 1.4](/docs/guides/web/introduction/two-factor-authentication/).
5. Bagian **Notifikasi email** hanya tampil bila tugas Anda mencakup persetujuan, persiapan, penyerahan permintaan barang, penerimaan retur, atau penyelesaian selisih. Nyalakan **Ringkasan harian permintaan barang dan retur** untuk menerima satu email setiap pagi tentang antrean yang menunggu Anda. Bila saklar mati, pemberitahuan per kejadian tetap muncul di lonceng, dan pemberitahuan untuk teknisi juga memakai push. Tidak ada email per kejadian.
6. Bagian **Hapus akun** menghapus akun Anda, dan akun yang dihapus tidak bisa Anda pulihkan sendiri. Klik **Hapus akun**, isi **Kata sandi** di dialog **Hapus akun Anda?**, lalu klik **Hapus akun** sekali lagi. Klik **Batal** untuk membatalkan. Jangan lakukan ini kecuali admin memintanya. Untuk menutup akses, lebih aman minta admin menonaktifkan akun ([bagian 8.5](/docs/guides/web/administration/users/)).

## Kesalahan umum

- Pesan "Kata sandi saat ini salah." berarti kata sandi lama yang Anda ketik salah. Pesan yang sama muncul di dialog **Hapus akun Anda?** bila kata sandinya salah.
- Pesan "Konfirmasi kata sandi tidak cocok." di bawah **Kata sandi baru** berarti **Kata sandi baru** dan **Ulangi kata sandi baru** berbeda. Pesan "kata sandi minimal 8 karakter." berarti kata sandi baru terlalu pendek.
- Pesan "email sudah digunakan." atau "email harus berupa huruf kecil." di bawah **Email** berarti alamat itu sudah dipakai akun lain, atau ditulis dengan huruf besar.
- Mengganti kata sandi mengakhiri login aplikasi Android milik akun Anda. Masuk lagi di aplikasi.
- **Hapus akun** ditolak bila akun pernah mengajukan atau memeriksa penyesuaian stok ("Pengguna yang pernah mengajukan atau memeriksa penyesuaian stok tidak bisa dihapus. Nonaktifkan akunnya."), atau tercatat memperoleh pelanggan ("Pengguna yang dicatat memperoleh pelanggan tidak bisa dihapus. Nonaktifkan akunnya."). Layar Profil tidak menampilkan alasan ini: dialog tetap terbuka dan hanya toast merah "Data gagal disimpan. Periksa input." muncul. Minta admin menonaktifkan akun itu.
- Mengubah email tidak mengubah kata sandi, tetapi email baru dipakai untuk masuk dan menerima tautan lupa kata sandi. Pastikan alamat baru benar.
