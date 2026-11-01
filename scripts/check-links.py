#!/usr/bin/env python3
"""Check every internal link, image and #fragment in the built site.

    npm run build && python3 scripts/check-links.py

Reads dist/. A link to a page of the site (it starts with the base, /inbils-documentation/) must point at a file
that exists, and a #fragment must be the id of an element on that page. Images and files (src, srcset, icons, the
social cards) must exist too. External links are not fetched. Exit code 1 when something is broken.
"""

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urldefrag

DIST = Path(__file__).resolve().parent.parent / "dist"
BASE = "/inbils-documentation/"
ATTR = re.compile(r'\b(?:href|src|content)="([^"]+)"|\bsrcset="([^"]+)"')
ID = re.compile(r'\bid="([^"]+)"')


def target(url: str) -> Path | None:
    path = unquote(url[len(BASE) - 1 :].split("?")[0])
    if path.endswith("/"):
        path += "index.html"
    elif "." not in path.rsplit("/", 1)[-1]:
        path += "/index.html"
    return DIST / path.lstrip("/")


def main() -> None:
    pages = sorted(DIST.rglob("*.html"))
    ids: dict[Path, set[str]] = {}
    broken: list[str] = []
    checked = 0
    for page in pages:
        html = page.read_text(encoding="utf-8")
        for m in ATTR.finditer(html):
            values = [m.group(1)] if m.group(1) else [s.split()[0] for s in m.group(2).split(",")]
            for value in values:
                if not value or not value.startswith(BASE):
                    continue
                checked += 1
                url, fragment = urldefrag(value)
                file = target(url)
                if file is None or not file.exists():
                    broken.append(f"{page.relative_to(DIST)}: {value}")
                    continue
                if fragment and file.suffix == ".html":
                    if file not in ids:
                        ids[file] = set(ID.findall(file.read_text(encoding="utf-8")))
                    if unquote(fragment) not in ids[file]:
                        broken.append(f"{page.relative_to(DIST)}: {value} (no such id)")
    for line in broken[:60]:
        print(line)
    print(f"{len(pages)} pages, {checked} internal references, {len(broken)} broken")
    sys.exit(1 if broken else 0)


if __name__ == "__main__":
    main()
