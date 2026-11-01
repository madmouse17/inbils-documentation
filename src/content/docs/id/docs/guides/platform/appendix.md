---
title: "13. Lampiran"
description: "Tanda \"Ya\" pada kolom Kata sandi operator berarti dialog meminta kata sandi hanya bila konfirmasi terakhir sudah lewat 5 menit (bagian 2.5)."
---

## 13.1 Konfirmasi tindakan sensitif


| Tindakan | Alasan | Ketik kode perusahaan | Kata sandi operator |
| --- | --- | --- | --- |
| Tangguhkan tenant | Ya | Ya | Ya |
| Aktifkan kembali | Ya | Tidak | Tidak |
| Ajukan hapus | Tidak | Ya | Ya |
| Minta ekspor | Tidak | Ya | Ya |
| Masuk sebagai pengguna | Ya | Tidak | Ya |
| Aktifkan mode ubah | Tidak | Ya | Bila konfirmasi lebih dari 5 menit |
| Kembali ke mode baca | Tidak | Tidak | Tidak |
| Buka kunci masuk | Tidak | Tidak | Tidak |
| Atur ulang 2FA pengguna | Tidak | Tidak | Ya |
| Kirim ulang undangan | Tidak | Tidak | Tidak |
| Buat, ubah, atau hapus templat peran; perbaiki peran perusahaan | Tidak | Tidak | Ya |
| Buat kode pemulihan operator baru | Tidak | Tidak | Ya |
| Tambah anak perusahaan | Tidak | Tidak | Tidak |
| Buat perusahaan | Tidak | Tidak | Tidak |
| Buat anak perusahaan dari permintaan tenant | Tidak | Tidak | Tidak |
| Tolak permintaan anak perusahaan | Ya | Tidak | Ya |

Tanda "Ya" pada kolom **Kata sandi operator** berarti dialog meminta kata sandi hanya bila konfirmasi terakhir sudah lewat 5 menit ([bagian 2.5](/docs/guides/platform/sign-in-and-account-security/)).


## 13.2 Batas penting


| Batas | Nilai |
| --- | --- |
| Sesi operator tanpa aktivitas | 30 menit |
| Sesi akses dukungan | paling lama 30 menit sejak dimulai |
| Konfirmasi kata sandi operator | 5 menit, berlaku untuk semua tindakan sensitif |
| Login yang menunggu kode 2FA | 10 menit |
| Kode TOTP | berubah setiap 30 detik, satu kali pakai |
| Kode pemulihan baru | 8 kode, masing-masing satu kali pakai |
| Alasan tindakan | 5 sampai 200 karakter |
| Tautan undangan admin | 60 menit |
| Pengiriman ulang undangan | 6 kali per menit per pengguna |
| Penangguhan sebelum pengajuan hapus | 30 hari |
| Arsip ekspor siap diunduh | 24 jam sejak selesai |
| Build ekspor dianggap macet | 2 jam |
| Job gagal pada halaman tenant | 7 hari ringkas, 30 hari lengkap |
| Audit platform dan dukungan | 730 hari |


## 13.3 Istilah


| Istilah | Arti |
| --- | --- |
| 2FA | Autentikasi dua langkah: kata sandi ditambah kode autentikator atau kode pemulihan. |
| Akses dukungan | Sesi saat operator masuk sebagai pengguna tenant untuk memeriksa layar dan izin pengguna itu. |
| Admin perusahaan | Pengguna tenant yang memegang hak `roles.manage` di perusahaan asalnya, biasanya lewat peran Admin. Bukan operator platform. |
| Anak perusahaan | Perusahaan satu tingkat di bawah perusahaan induk. Data tetap terpisah. |
| Audit platform | Log internal operator dan akses dukungan pada seluruh instalasi. |
| Head | Perusahaan induk paling atas pada satu tenant. |
| Isi awal | Pilihan Katalog awal atau Kosong saat perusahaan dibuat. |
| Katalog awal | Data master standar tanpa stok dan aset jaringan. |
| Kode perusahaan | Kode tetap yang mengonfirmasi tindakan sensitif. Saat konfirmasi harus diketik persis; dua perusahaan tidak bisa memakai kode yang hanya berbeda huruf besar-kecil. |
| Kode pemulihan | Kode satu kali pakai untuk login bila aplikasi autentikator tidak tersedia. |
| Mode baca | Mode awal akses dukungan yang menolak perubahan. |
| Mode ubah | Mode akses dukungan yang mengizinkan perubahan sesuai izin target. |
| Operator platform | Akun terpisah di `platform_admins` yang mengelola seluruh instalasi. |
| Pengajuan hapus | Penanda bahwa tenant siap dipurge setelah syarat terpenuhi. Tidak menghapus data dari web. |
| Permintaan anak perusahaan | Permintaan admin perusahaan induk agar operator membuat anak perusahaan. Terbuka sampai operator membuat anak perusahaan atau menolaknya. Satu tenant hanya punya satu yang terbuka. |
| Templat peran | Peran awal yang disalin ke perusahaan baru saat dibuat. Mengubahnya tidak mengubah perusahaan yang sudah ada. |
| Platform queue | Antrean khusus untuk data contoh dan ekspor tenant. |
| Purge | Penghapusan permanen tenant melalui konsol server. |
| Step-up | Konfirmasi ulang kata sandi operator untuk tindakan sensitif. Berlaku 5 menit dan dipakai bersama oleh semua dialog. |
| Tenant | Satu perusahaan induk beserta anak perusahaannya. |
| Undangan admin | Email bertaut 60 menit agar admin pertama menetapkan kata sandi. |
