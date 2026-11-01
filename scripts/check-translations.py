#!/usr/bin/env python3
"""Compare every Indonesian guide page with its English translation, line by line.

    python3 scripts/check-translations.py                # all guide pages
    python3 scripts/check-translations.py guides/web     # only paths that start with this prefix

The guide pages are translated one source line to one output line, so the check can be strict. For each pair it
reports: a missing English file, a different line count, and for every line a different kind (heading level,
list marker and indent, table columns, image, blank line, code fence), a different image path or link target,
an em dash or en dash, a leftover Indonesian sentence, and the front matter keys. Exit code 1 when anything
differs. Reference pages (not guides) are only checked for existence, dashes and front matter.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ID_DIR = ROOT / "src/content/docs/id/docs"
EN_DIR = ROOT / "src/content/docs/docs"

IMG = re.compile(r"!\[[^\]]*\]\(([^)\s]+)")
LINK = re.compile(r"(?<!!)\[[^\]]*\]\((/docs/[^)\s]*|https?://[^)\s]*)\)")
CODE_SPAN = re.compile(r"`[^`]*`")
BOLD = re.compile(r"\*\*[^*]+\*\*")
QUOTED = re.compile(r'"[^"]*"')
INDONESIAN = re.compile(
    r"\b(yang|dan|untuk|dengan|pada|akan|dari|atau|tidak|bila|jika|adalah|dapat|sudah|belum|karena|juga|"
    r"ini|itu|oleh|saat|setelah|sebelum|dalam|ke|di|anda|klik|buka|isi|pilih|lalu|maka|agar|hanya|setiap|semua)\b",
    re.I,
)
LABEL = re.compile(r"\*\*[^*]+\*\*|\"[^\"]*\"|`[^`]*`|\[[^\]]*\]\([^)]*\)")


def kind(line: str, in_fence: bool):
    if in_fence:
        return "code"
    if not line.strip():
        return "blank"
    if line.startswith("```"):
        return "fence"
    m = re.match(r"^(#{1,6}) ", line)
    if m:
        return f"h{len(m.group(1))}"
    if line.startswith("|"):
        cells = [c for c in re.split(r"(?<!\\)\|", line.strip().strip("|"))]
        sep = bool(re.fullmatch(r"\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*", line.strip().strip("|")))
        return f"row{len(cells)}{'s' if sep else ''}"
    m = re.match(r"^(\s*)([-*]|\d+\.) ", line)
    if m:
        return f"li{len(m.group(1))}{'o' if m.group(2)[0].isdigit() else 'u'}"
    if line.startswith(">"):
        return "quote"
    if line.startswith("![") or IMG.search(line) and line.strip().startswith("!["):
        return "img"
    return "p"


def fence_states(lines):
    state, out = False, []
    for line in lines:
        if line.startswith("```"):
            out.append(False)  # the fence line itself is classified as "fence"
            state = not state
        else:
            out.append(state)
    return out


def front_matter(lines):
    keys = {}
    if lines and lines[0] == "---":
        for line in lines[1:]:
            if line == "---":
                break
            m = re.match(r"^(\w+):\s*(.*)$", line)
            if m:
                keys[m.group(1)] = m.group(2)
    return keys


def prose_indonesian(line: str) -> int:
    stripped = LABEL.sub(" ", line)
    return len(INDONESIAN.findall(stripped))


def check_pair(rel: str, strict_lines: bool):
    id_file, en_file = ID_DIR / rel, EN_DIR / rel
    problems = []
    if not en_file.exists():
        return [f"missing English file"]
    id_lines = id_file.read_text(encoding="utf-8").split("\n")
    en_lines = en_file.read_text(encoding="utf-8").split("\n")
    text = "\n".join(en_lines)
    for ch, name in (("\u2014", "em dash"), ("\u2013", "en dash")):
        if ch in text:
            problems.append(f"{name} in text ({text.count(ch)}x)")
    if "$$" in text:
        problems.append("literal $$ token in text")
    fm = front_matter(en_lines)
    for key in ("title", "description"):
        if key not in fm or not fm[key].strip('"'):
            problems.append(f"front matter lacks {key}")
    desc = fm.get("description", "").strip('"')
    if desc and not 60 <= len(desc) <= 170:
        problems.append(f"description is {len(desc)} characters")
    if not strict_lines:
        return problems
    if len(id_lines) != len(en_lines):
        problems.append(f"line count {len(en_lines)} (source {len(id_lines)})")
    id_f, en_f = fence_states(id_lines), fence_states(en_lines)
    shown = 0
    for n, (a, b) in enumerate(zip(id_lines, en_lines), 1):
        if n <= 4:
            continue
        ka, kb = kind(a, id_f[n - 1]), kind(b, en_f[n - 1])
        msgs = []
        if ka != kb:
            msgs.append(f"kind {kb} (source {ka})")
        if IMG.findall(a) != IMG.findall(b):
            msgs.append("image path differs")
        if LINK.findall(a) != LINK.findall(b) and [t for t in LINK.findall(a)] != [t for t in LINK.findall(b)]:
            msgs.append("link target differs")
        if not id_f[n - 1] and not en_f[n - 1] and ka == kb and ka in {"p", "li0u", "li0o"} or (ka == kb and ka.startswith("li")):
            if len(a) > 60 and prose_indonesian(b) >= 4 and prose_indonesian(b) >= 0.5 * prose_indonesian(a):
                msgs.append("looks untranslated")
        if msgs and shown < 6:
            problems.append(f"line {n}: " + "; ".join(msgs))
        shown += bool(msgs)
    if shown > 6:
        problems.append(f"... and {shown - 6} more differing lines")
    return problems


def main():
    prefix = sys.argv[1] if len(sys.argv) > 1 else ""
    pages = sorted(p.relative_to(ID_DIR).as_posix() for p in ID_DIR.rglob("*.md"))
    bad = 0
    checked = 0
    for rel in pages:
        if not rel.startswith(prefix):
            continue
        guide_page = rel.startswith("guides/") and not rel.endswith("/index.md")
        checked += 1
        problems = check_pair(rel, strict_lines=guide_page)
        if problems:
            bad += 1
            print(f"{rel}")
            for p in problems:
                print(f"   {p}")
    print(f"\n{checked} pages checked, {bad} with problems")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
