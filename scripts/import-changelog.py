#!/usr/bin/env python3
"""Write the changelog pages (English and Indonesian) from CHANGELOG.md of the application repository.

    python3 scripts/import-changelog.py ../inbils [entries]       # default: the 10 newest entries

An entry is a `### Added|Changed|Fixed|Removed - ...` heading and what follows it. Entry headings become H2 on
the page (their wording and dates are kept) and the subsections inside an entry become H3. Two things are taken
out: bullets about the maintainers' own tooling, and pointers to internal planning folders. The entries are in
English in the source, so the Indonesian page carries the same entries under an Indonesian introduction.
Run it again after the changelog changes and commit the result.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENTRY = re.compile(r"^### (Added|Changed|Fixed|Removed|Security|Deprecated)\b")
CHANGELOG_URL = "https://github.com/madmouse17/isp_inbils/blob/main/CHANGELOG.md"


def clean(line: str) -> str | None:
    if re.search(r"AGENTS\.md|CLAUDE\.md|\.opencode/|docs/plans/|docs/agents/", line):
        return None
    # "(`.scratch/x/design.md`, ADR-004)" keeps what follows the internal path; a lone path disappears.
    line = re.sub(r"`\.scratch/[^`]*`,?\s*", "", line)
    line = re.sub(r"\s*\(\s*\)", "", line)
    line = re.sub(r"\(\s*,\s*", "(", line)
    return line


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    repo = Path(sys.argv[1])
    count = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    lines = (repo / "CHANGELOG.md").read_text(encoding="utf-8-sig").split("\n")
    starts = [i for i, line in enumerate(lines) if ENTRY.match(line)]
    if len(starts) <= count:
        sys.exit(f"only {len(starts)} entries in the changelog")
    chunk = lines[starts[0] : starts[count]]
    out, fence = [], False
    for line in chunk:
        if line.startswith("```"):
            fence = not fence
        if not fence:
            if ENTRY.match(line):
                line = line[1:]
            kept = clean(line)
            if kept is None:
                continue
            line = kept
        out.append(line)
    body = "\n".join(out).strip()
    body = re.sub(r"\n{3,}", "\n\n", body)
    # the entry headings are "Changed - Title (date)": the leading verb is the category, keep it as written

    pages = {
        "docs/changelog.md": (
            "Changelog",
            "The latest changes to Inbils: new features, fixes and upgrades, newest first, with the full history linked.",
            "What changed in Inbils, newest first. This page carries the latest entries of the project's "
            f"[CHANGELOG.md]({CHANGELOG_URL}); the full history is in the repository. The entries are written for "
            'engineers and ISP operators. Names such as "Buka kembali" are the Indonesian labels of the web app and '
            "the apps.",
        ),
        "id/docs/changelog.md": (
            "Catatan perubahan",
            "Perubahan terbaru Inbils: fitur baru, perbaikan, dan peningkatan, dari yang terbaru, dengan tautan ke riwayat lengkap.",
            "Perubahan pada Inbils, dari yang terbaru. Halaman ini memuat entri terbaru "
            f"[CHANGELOG.md]({CHANGELOG_URL}) proyek; riwayat lengkapnya ada di repositori. Entri ditulis dalam bahasa "
            "Inggris untuk engineer dan operator ISP. Nama seperti \"Buka kembali\" adalah label berbahasa Indonesia "
            "di aplikasi web dan kedua aplikasi.",
        ),
    }
    for rel, (title, description, intro) in pages.items():
        path = ROOT / "src/content/docs" / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(
            f'---\ntitle: "{title}"\ndescription: "{description}"\n---\n\n{intro}\n\n{body}\n',
            encoding="utf-8",
        )
    print(f"wrote {count} entries ({len(body)} characters) to both changelog pages")


if __name__ == "__main__":
    main()
