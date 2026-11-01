---
title: "Backup and restore"
description: "How to back up the Inbils database and media, restore into an isolated target, run a restore drill and roll back after an incident."
---

A backup is only proven when you have restored it. The scripts in `scripts/operations/` make archives, checksum them and restore into an isolated target, but they never claim that the archive reached your off-host storage. That step is yours.

:::note
The documented targets (RPO 24 hours, RTO 4 hours, daily backups, 30-day retention, monthly drill) are provisional until the owner of the installation approves them.
:::

## What is covered

- The MySQL database, dumped with `--single-transaction --routines --triggers`.
- Media files. `BACKUP_MEDIA_DIR` must cover `storage/app/private` (ticket attachments, SPK evidence, customer documents). `storage/app/public` holds only the company logo. Pointing it at `storage/app` covers both.
- `APP_KEY`, kept with your secret material: every integration secret stored per company is encrypted with it.

## Rules the scripts enforce

- Credentials come from deployment-provided secret material, never from `.env` or the repository. Credentials reach the MySQL client through a `defaults-extra-file` (mode 600, preferred) or environment variables, and are never logged.
- Explicit source and destination arguments. Blank paths, protected locations and existing backup outputs are refused.
- A SHA-256 manifest is written for every backup set and verified before any dump is applied. A mismatch stops the restore.
- A restore never overwrites a protected production-like database without both production flags. The Python restore also refuses a non-empty target media directory and a target database named like the source.

## Backup

```bash
bash scripts/operations/backup.sh --database <name> --output-dir <dir> [--media-dir <path>] [--dry-run]
```

| Flag or variable | Meaning |
|---|---|
| `--database NAME` | Source MySQL database (required). |
| `--output-dir DIR` | Destination directory, created if missing (required). |
| `--media-dir PATH` | Also tar the media directory into the output. |
| `--dry-run` | Print the actions only. |
| `MYSQL_DEFAULTS_EXTRA_FILE` | Preferred credentials file (mode 600). |
| `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD` | Alternative credentials; prefer the file. |
| `MYSQL_DUMP_BIN` | Override the `mysqldump` path. |
| `BACKUP_ENCRYPTION_KEY_FILE` | When set, the archives are encrypted with `openssl enc`. |

The output goes to `inbils-backup-<database>-<UTC timestamp>/` with `<database>.sql`, a `.sha256` file for each artefact and `media.tar.gz` when requested. The script ends by printing `EXTERNAL_EVIDENCE_REQUIRED`.

A Python variant, `scripts/operations/backup.py`, reads the `BACKUP_*` variables (`BACKUP_DB_HOST`, `BACKUP_DB_PORT`, `BACKUP_DB_USER`, `BACKUP_DB_PASSWORD_FILE`, `BACKUP_DB_NAME`, `BACKUP_MEDIA_DIR`, `BACKUP_DEST_DIR`, `BACKUP_ENCRYPTION_KEY_FILE`) or the matching flags, and adds `--tier daily|monthly` and `--retain-days` (default 30) for deterministic retention pruning.

### After the backup

1. Copy the archive to the off-host destination and confirm it arrived (provider retrieval, checksum match).
2. Record that in your operations log or the drill record.
3. Stamp backup freshness so `/ready` can report it:

   ```bash
   php artisan ops:backup-heartbeat
   ```

   Older than 25 hours, `/ready` reports backup `fail` (degraded). Never set, it reports `unknown`.

### Alert hook

Set `OPS_ALERT_HOOK` in the operator environment to a shell command that receives `<event> <message>` on a failure. The secret (for example a webhook URL) stays in the environment, never in the scripts.

```bash
export OPS_ALERT_HOOK='curl -fsS -m 10 -d "event=$1&message=$2" "$MY_WEBHOOK_URL"'
```

If the hook fails to deliver, the script says so and still exits non-zero.

## Restore

```bash
bash scripts/operations/restore.sh --input <dump.sql> --checksum-file <dump.sql>.sha256 --database inbils_restore_drill_<ts> --create-database
```

| Flag | Meaning |
|---|---|
| `--input FILE` | The `.sql` dump, or `.sql.enc` when encrypted (needs `BACKUP_ENCRYPTION_KEY_FILE`). |
| `--database NAME` | Target database. Prefer `inbils_restore_drill_*`. |
| `--checksum-file FILE` | SHA-256 manifest; defaults to `<input>.sha256`. |
| `--create-database` | `CREATE DATABASE IF NOT EXISTS` for the target. |
| `--i-understand-production-restore` | Required for any target not named `inbils_restore_drill_*`. |
| `--allow-protected` | Allows a protected production-like name; needs the flag above too. |
| `--dry-run` | Print the actions only. |

A real production restore therefore needs both `--i-understand-production-restore` and `--allow-protected`. Do it into a fresh target first, validate it, and cut traffic over only after sign-off.

## Restore drill

`scripts/operations/restore-drill.sh --database SOURCE --output-dir DIR [--dry-run] [--skip-restore]` runs the backup, restores into a disposable `inbils_restore_drill_<timestamp>` schema, then drops that schema and removes the dump artefacts, also on failure. It refuses to start if the drill schema already exists. Use a throwaway database and an empty throwaway directory, never production names.

The Python restore adds a proof file and media restore:

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

### Drill checklist

Before: the archives exist off-host, credentials come from secret material, the target database name differs from the source, and the target media directory is empty or absent.

After, all must be true:

- [ ] The restore succeeded into the isolated target.
- [ ] Checksums validated before the restore.
- [ ] Temporary restore artefacts were removed.
- [ ] The proof file records the cleanup result.
- [ ] The target directory is empty again after cleanup.

The restore stops by design when the target directory is not empty, the target database equals the source, the checksum file is missing or wrong, an archive file does not exist, or the target database is a protected system database. Keep drill output apart from live storage.

Run the non-destructive self-check first:

```bash
python scripts/operations/verify-backup-restore.py --self-check
bash scripts/operations/self-check.sh
```

## Incident and rollback

- Roll back the application release first when the problem is code-only. Do not roll back a database migration blindly.
- Keep the last known-good artefact and backup until the incident is closed. Never delete backups without explicit approval.
- A queue or scheduler problem: restart the supervised processes before anything heavier.

| Situation | Action |
|---|---|
| Bad deploy, no schema change | Switch back to the previous release and restart workers. |
| Reversible schema change | Roll back the release; apply the inverse migration only if safe and tested. |
| Destructive or one-way migration | Stop. Restore from backup into a new target first. |

Checklist: confirm the scope and the affected version; capture the logs and the `/ready` output; freeze new deploys; switch to the previous release; run `php artisan queue:restart`; re-check `/ready` and the minimum business smoke checks. If the database must be restored, create a fresh target, verify it, then point traffic at it.

A migration is not safely reversible when it deletes or overwrites data, backfills into a schema that cannot be reversed, or changes constraints in a way that blocks the old release. See also [Deploying a release](/docs/operations/deployment/).
