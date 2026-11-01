---
title: "Backup dan restore"
description: "Cara mem-backup database dan media Inbils, restore ke target terisolasi, menjalankan restore drill, dan rollback setelah insiden."
---

Backup baru terbukti bila Anda sudah me-restore-nya. Script di `scripts/operations/` membuat arsip, menghitung checksum, dan me-restore ke target terisolasi, tetapi tidak pernah mengklaim bahwa arsip sudah sampai di penyimpanan off-host Anda. Langkah itu tugas Anda.

:::note
Target yang terdokumentasi (RPO 24 jam, RTO 4 jam, backup harian, retensi 30 hari, drill bulanan) bersifat sementara sampai pemilik instalasi menyetujuinya.
:::

## Yang dicakup

- Database MySQL, di-dump dengan `--single-transaction --routines --triggers`.
- File media. `BACKUP_MEDIA_DIR` harus mencakup `storage/app/private` (lampiran tiket, bukti SPK, dokumen pelanggan). `storage/app/public` hanya berisi logo perusahaan. Mengarahkannya ke `storage/app` mencakup keduanya.
- `APP_KEY`, disimpan bersama secret Anda: semua secret integrasi per perusahaan dienkripsi dengannya.

## Aturan yang ditegakkan script

- Kredensial berasal dari secret yang disediakan deployment, tidak pernah dari `.env` atau repositori. Kredensial sampai ke klien MySQL lewat `defaults-extra-file` (mode 600, diutamakan) atau variabel environment, dan tidak pernah dicatat di log.
- Argumen sumber dan tujuan eksplisit. Path kosong, lokasi terlindungi, dan output backup yang sudah ada ditolak.
- Manifes SHA-256 ditulis untuk setiap set backup dan diverifikasi sebelum dump apa pun diterapkan. Ketidakcocokan menghentikan restore.
- Restore tidak pernah menimpa database terlindungi yang mirip produksi tanpa kedua flag produksi. Restore Python juga menolak direktori media target yang tidak kosong dan database target yang bernama sama dengan sumber.

## Backup

```bash
bash scripts/operations/backup.sh --database <name> --output-dir <dir> [--media-dir <path>] [--dry-run]
```

| Flag atau variabel | Arti |
|---|---|
| `--database NAME` | Database MySQL sumber (wajib). |
| `--output-dir DIR` | Direktori tujuan, dibuat bila belum ada (wajib). |
| `--media-dir PATH` | Sekaligus mem-tar direktori media ke output. |
| `--dry-run` | Hanya mencetak tindakan. |
| `MYSQL_DEFAULTS_EXTRA_FILE` | File kredensial yang diutamakan (mode 600). |
| `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD` | Kredensial alternatif; utamakan file. |
| `MYSQL_DUMP_BIN` | Mengganti path `mysqldump`. |
| `BACKUP_ENCRYPTION_KEY_FILE` | Bila diatur, arsip dienkripsi dengan `openssl enc`. |

Output masuk ke `inbils-backup-<database>-<UTC timestamp>/` berisi `<database>.sql`, file `.sha256` untuk tiap artefak, dan `media.tar.gz` bila diminta. Script diakhiri dengan mencetak `EXTERNAL_EVIDENCE_REQUIRED`.

Varian Python, `scripts/operations/backup.py`, membaca variabel `BACKUP_*` (`BACKUP_DB_HOST`, `BACKUP_DB_PORT`, `BACKUP_DB_USER`, `BACKUP_DB_PASSWORD_FILE`, `BACKUP_DB_NAME`, `BACKUP_MEDIA_DIR`, `BACKUP_DEST_DIR`, `BACKUP_ENCRYPTION_KEY_FILE`) atau flag yang setara, dan menambah `--tier daily|monthly` serta `--retain-days` (default 30) untuk pemangkasan retensi yang deterministik.

### Setelah backup

1. Salin arsip ke tujuan off-host dan pastikan sudah sampai (pengambilan dari penyedia, checksum cocok).
2. Catat itu di log operasional atau catatan drill Anda.
3. Catat kesegaran backup agar `/ready` bisa melaporkannya:

   ```bash
   php artisan ops:backup-heartbeat
   ```

   Lebih tua dari 25 jam, `/ready` melaporkan backup `fail` (degraded). Belum pernah diatur, melaporkan `unknown`.

### Alert hook

Atur `OPS_ALERT_HOOK` di environment operator berupa perintah shell yang menerima `<event> <message>` saat terjadi kegagalan. Secret (misalnya URL webhook) tetap di environment, tidak pernah di script.

```bash
export OPS_ALERT_HOOK='curl -fsS -m 10 -d "event=$1&message=$2" "$MY_WEBHOOK_URL"'
```

Bila hook gagal terkirim, script menyatakannya dan tetap keluar dengan kode bukan nol.

## Restore

```bash
bash scripts/operations/restore.sh --input <dump.sql> --checksum-file <dump.sql>.sha256 --database inbils_restore_drill_<ts> --create-database
```

| Flag | Arti |
|---|---|
| `--input FILE` | Dump `.sql`, atau `.sql.enc` bila terenkripsi (memerlukan `BACKUP_ENCRYPTION_KEY_FILE`). |
| `--database NAME` | Database target. Utamakan `inbils_restore_drill_*`. |
| `--checksum-file FILE` | Manifes SHA-256; default ke `<input>.sha256`. |
| `--create-database` | `CREATE DATABASE IF NOT EXISTS` untuk target. |
| `--i-understand-production-restore` | Wajib untuk target yang namanya bukan `inbils_restore_drill_*`. |
| `--allow-protected` | Mengizinkan nama terlindungi yang mirip produksi; memerlukan flag di atas juga. |
| `--dry-run` | Hanya mencetak tindakan. |

Restore produksi yang sebenarnya karena itu memerlukan `--i-understand-production-restore` dan `--allow-protected` sekaligus. Lakukan ke target baru lebih dulu, validasi, dan alihkan traffic hanya setelah disetujui.

## Restore drill

`scripts/operations/restore-drill.sh --database SOURCE --output-dir DIR [--dry-run] [--skip-restore]` menjalankan backup, me-restore ke skema sekali pakai `inbils_restore_drill_<timestamp>`, lalu menghapus skema itu dan membuang artefak dump, juga saat gagal. Script menolak mulai bila skema drill sudah ada. Pakai database sekali pakai dan direktori kosong sekali pakai, tidak pernah nama produksi.

Restore Python menambah file bukti dan restore media:

```bash
python scripts/operations/restore.py \
  --db-archive <backup>.sql.gz.enc \
  --media-archive <backup>.media.tar.gz.enc \
  --checksum-file <backup>.sha256 \
  --target-db-name restore_inbils_<date> \
  --source-db-name inbils \
  --target-media-dir /tmp/inbils-restore-drill \
  --db-host "$BACKUP_DB_HOST" \
  --db-port "$BACKUP_DB_PORT" \
  --db-user "$BACKUP_DB_USER" \
  --db-password-file "$BACKUP_DB_PASSWORD_FILE" \
  --encryption-key-file "$BACKUP_ENCRYPTION_KEY_FILE" \
  --cleanup-after-verify \
  --proof-file <backup>.restore-proof.json
```

### Checklist drill

Sebelum: arsip ada di off-host, kredensial berasal dari secret, nama database target berbeda dari sumber, dan direktori media target kosong atau belum ada.

Sesudah, semuanya harus benar:

- [ ] Restore berhasil ke target terisolasi.
- [ ] Checksum tervalidasi sebelum restore.
- [ ] Artefak restore sementara dihapus.
- [ ] File bukti mencatat hasil pembersihan.
- [ ] Direktori target kosong lagi setelah pembersihan.

Restore berhenti secara sengaja bila direktori target tidak kosong, database target sama dengan sumber, file checksum hilang atau salah, file arsip tidak ada, atau database target adalah database sistem yang dilindungi. Pisahkan output drill dari storage live.

Jalankan self-check yang tidak merusak lebih dulu:

```bash
python scripts/operations/verify-backup-restore.py --self-check
bash scripts/operations/self-check.sh
```

## Insiden dan rollback

- Rollback rilis aplikasi lebih dulu bila masalahnya hanya di kode. Jangan rollback migration database secara membabi buta.
- Simpan artefak dan backup terakhir yang diketahui baik sampai insiden ditutup. Jangan pernah menghapus backup tanpa persetujuan eksplisit.
- Masalah queue atau scheduler: restart proses yang diawasi sebelum tindakan yang lebih berat.

| Situasi | Tindakan |
|---|---|
| Deploy buruk, tanpa perubahan skema | Kembali ke rilis sebelumnya dan restart worker. |
| Perubahan skema yang bisa dibalik | Rollback rilis; terapkan migration kebalikannya hanya bila aman dan sudah diuji. |
| Migration destruktif atau satu arah | Berhenti. Restore dari backup ke target baru lebih dulu. |

Checklist: pastikan cakupan dan versi yang terdampak; simpan log dan output `/ready`; bekukan deploy baru; kembali ke rilis sebelumnya; jalankan `php artisan queue:restart`; cek ulang `/ready` dan smoke check bisnis minimum. Bila database harus di-restore, buat target baru, verifikasi, lalu arahkan traffic ke sana.

Migration tidak aman dibalik bila menghapus atau menimpa data, mem-backfill ke skema yang tidak bisa dibalik, atau mengubah constraint sehingga rilis lama terblokir. Lihat juga [Merilis versi baru](/docs/operations/deployment/).
