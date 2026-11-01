#!/usr/bin/env python3
"""Turn the four Inbils user guides into Starlight pages.

The Markdown sources live in the application repository (docs/user-guide/*.md) and are written in Indonesian.
This script splits them into pages and writes the Indonesian copies under src/content/docs/id/docs/guides/.
The English copies are translations of those pages, kept under src/content/docs/docs/guides/ with the same
paths (scripts/check-translations.py compares the two).

    python3 scripts/import-guides.py ../inbils          # checkout of the application repository

What it does, and nothing else:
  * web.md becomes one page per "## N.M" section (the chapters are 300 to 900 lines long); platform.md,
    teknisi.md and pelanggan.md become one page per "# N." chapter (their sections are 5 to 50 lines).
  * Image paths point at the optimised copies in src/assets/guide/ (scripts/optimize-images.mjs makes them).
  * "bagian 8.5" and "bab 9" cross references become links to the page that holds that section or chapter.
  * Mentions of the PDF and Markdown files of the guides become links to the guides on this site, and
    mentions of docs/*.md files become links to the file on GitHub.
  * Headings below the page title move up one level on section pages.
  * The chapter titles and the section titles of the Indonesian source are written back into
    src/data/guides.json (key "id"), which feeds the sidebar.

Run it again after the guides change, then translate the pages that changed and commit the result.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "src/data/guides.json"
ID_OUT = ROOT / "src/content/docs/id/docs/guides"
EN_OUT = ROOT / "src/content/docs/docs/guides"
WORK = ROOT / "scripts/work"
GITHUB_BLOB = "https://github.com/madmouse17/isp_inbils/blob/main/"
IMG_RE = re.compile(r"(!\[[^\]]*\]\()(images/[^)\s]+?)(\.png|\.jpg|\.jpeg)(\))")
HEADING = re.compile(r"^(#{1,6}) (.*)$")


def yaml_str(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def split_blocks(text: str):
    """Yield (level, title, body_lines) for every H1 and H2 outside code fences."""
    lines = text.split("\n")
    fence = False
    marks = []
    for i, line in enumerate(lines):
        if line.startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        m = HEADING.match(line)
        if m and len(m.group(1)) <= 2:
            marks.append((i, len(m.group(1)), m.group(2).strip()))
    blocks = []
    for k, (start, level, title) in enumerate(marks):
        end = marks[k + 1][0] if k + 1 < len(marks) else len(lines)
        blocks.append((level, title, lines[start + 1 : end]))
    return blocks


def strip_blank(lines):
    while lines and not lines[0].strip():
        lines = lines[1:]
    while lines and not lines[-1].strip():
        lines = lines[:-1]
    return lines


def shift_headings(lines, by):
    out, fence = [], False
    for line in lines:
        if line.startswith("```"):
            fence = not fence
        m = None if fence else HEADING.match(line)
        if m and len(m.group(1)) - by >= 2:
            out.append("#" * (len(m.group(1)) - by) + " " + m.group(2))
        else:
            out.append(line)
    return out


def plain(text: str) -> str:
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"`([^`]*)`", r"\1", text)
    return re.sub(r"\s+", " ", text).strip()


def describe(lines, limit=158):
    """First readable prose paragraph of a page, cut at a sentence end, for the meta description."""
    paras, cur, fence = [], [], False
    for line in lines:
        if line.startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        if not line.strip():
            if cur:
                paras.append(" ".join(cur))
                cur = []
            continue
        if re.match(r"^(#|\||!\[|\s*[-*] |\s*\d+\. |>)", line):
            if cur:
                paras.append(" ".join(cur))
                cur = []
            continue
        cur.append(line.strip())
    if cur:
        paras.append(" ".join(cur))
    paras = [plain(p) for p in paras if len(plain(p)) > 30]
    if not paras:
        return ""
    pick = paras[0]
    if pick.startswith("Peran yang dapat memakai") and len(paras) > 1:
        pick = paras[1] + " " + paras[0] if len(paras[1]) < 80 else paras[1]
    if len(pick) <= limit:
        return pick
    cut = pick[:limit]
    end = max(cut.rfind(". "), cut.rfind(": "), cut.rfind("; "))
    if end > 60:
        return cut[: end + 1].rstrip(":; ").rstrip() + ("." if cut[end] != "." else "")
    return cut[: cut.rfind(" ")].rstrip(",;: ")


def fix_inline_code(line: str) -> str:
    """The sources escape < and > inside code spans for the PDF renderer; a code span shows them raw."""

    def inner(m):
        return m.group(0).replace("&lt;", "<").replace("&gt;", ">")

    return re.sub(r"`[^`]*`", inner, line)


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    repo = Path(sys.argv[1]).resolve()
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    WORK.mkdir(parents=True, exist_ok=True)

    parsed = {}
    for key, guide in manifest.items():
        text = (repo / guide["source"]).read_text(encoding="utf-8")
        blocks = split_blocks(text)
        chapters = []
        for level, title, body in blocks:
            if level == 1:
                chapters.append({"title": title, "preamble": body, "sections": []})
            else:
                chapters[-1]["sections"].append({"title": title, "body": body})
        if len(chapters) != len(guide["chapters"]):
            sys.exit(f"{key}: {len(chapters)} chapters in the source, {len(guide['chapters'])} in the manifest")
        if guide["mode"] == "section":
            for n, (src, man) in enumerate(zip(chapters, guide["chapters"]), 1):
                if len(src["sections"]) != len(man["sections"]):
                    sys.exit(f"{key} chapter {n}: {len(src['sections'])} sections in the source, {len(man['sections'])} in the manifest")
                if any(line.strip() for line in src["preamble"]):
                    sys.exit(f"{key} chapter {n} has text between its H1 and its first H2; give it a page first")
        parsed[key] = chapters

    # url map for references
    def page_url(key, n, m=None):
        guide = manifest[key]
        chap = guide["chapters"][n - 1]
        if guide["mode"] == "section":
            if m is None:
                return f"/docs/guides/{key}/{chap['slug']}/{chap['sections'][0]['slug']}/"
            if 1 <= m <= len(chap["sections"]):
                return f"/docs/guides/{key}/{chap['slug']}/{chap['sections'][m - 1]['slug']}/"
            return None
        return f"/docs/guides/{key}/{chap['slug']}/"

    ref_re = re.compile(
        r"(?<![\w`])(?P<word>[Bb]agian|[Bb]ab)\s+(?P<first>\d+(?:\.\d+)?)"
        r"(?P<rest>(?:(?:\s*,\s*|\s+dan\s+|\s+atau\s+)\d+(?:\.\d+)?)*)"
    )
    protect = re.compile(r"(!?\[[^\]]*\]\([^)]*\)|`[^`]*`)")
    warnings = []

    def link_refs(line, key, where):
        def one(num: str):
            if "." in num:
                n, m = (int(x) for x in num.split("."))
                url = page_url(key, n, m)
            else:
                url = page_url(key, int(num))
            if not url:
                warnings.append(f"{where}: no page for reference {num}")
            return url

        def sub(m):
            first = one(m.group("first"))
            if not first:
                return m.group(0)
            out = f"[{m.group('word')} {m.group('first')}]({first})"
            for sep, num in re.findall(r"(\s*,\s*|\s+dan\s+|\s+atau\s+)(\d+(?:\.\d+)?)", m.group("rest")):
                u = one(num)
                out += f"{sep}[{num}]({u})" if u else f"{sep}{num}"
            return out

        parts = protect.split(line)
        return "".join(p if i % 2 else ref_re.sub(sub, p) for i, p in enumerate(parts))

    def convert(lines, key, where):
        out, fence = [], False
        for line in lines:
            if line.startswith("```"):
                fence = not fence
                out.append(line)
                continue
            if fence:
                out.append(line)
                continue
            line = fix_inline_code(line)
            line = IMG_RE.sub(lambda m: f"{m.group(1)}~/assets/guide/{m.group(2)[len('images/'):]}.webp{m.group(4)}", line)
            line = link_refs(line, key, where)
            out.append(line)
        text = "\n".join(out)
        text = re.sub(
            r"\*\*Panduan Panel Operator Inbils\*\* \(`platform\.md` atau `pdf/platform\.pdf`\)",
            "[Panduan Panel Operator Inbils](/docs/guides/platform/)",
            text,
        )
        text = text.replace("Panduan Aplikasi Teknisi dan Panduan Aplikasi Pelanggan", "[Panduan Aplikasi Teknisi](/docs/guides/technician/) dan [Panduan Aplikasi Pelanggan](/docs/guides/customer/)")
        text = re.sub(r"`(docs/[\w./-]+\.md)`", lambda m: f"[`{m.group(1)}`]({GITHUB_BLOB}{m.group(1)})", text)
        return text.split("\n")

    pages = []  # for the work list

    def write_page(path: Path, title: str, description: str, body_lines):
        path.parent.mkdir(parents=True, exist_ok=True)
        body = "\n".join(strip_blank(body_lines))
        path.write_text(
            f"---\ntitle: {yaml_str(title)}\ndescription: {yaml_str(description)}\n---\n\n{body}\n",
            encoding="utf-8",
        )

    for key, guide in manifest.items():
        chapters = parsed[key]
        for n, (src, man) in enumerate(zip(chapters, guide["chapters"]), 1):
            man["title"]["id"] = src["title"]
            if guide["mode"] == "section":
                for m, (sec, mans) in enumerate(zip(src["sections"], man["sections"]), 1):
                    mans["id"] = sec["title"]
                    where = f"{key} {n}.{m}"
                    body = shift_headings(strip_blank(sec["body"]), 1)
                    body = convert(body, key, where)
                    rel = f"{key}/{man['slug']}/{mans['slug']}.md"
                    write_page(ID_OUT / rel, sec["title"], describe(body), body)
                    pages.append({"guide": key, "path": rel, "titleId": sec["title"], "titleEn": mans["en"], "lines": len(sec["body"])})
            else:
                body = []
                for sec in src["sections"]:
                    pass
                # the chapter page keeps the H2 sections as they are
                raw = list(src["preamble"])
                for sec in src["sections"]:
                    raw += ["", f"## {sec['title']}", ""] + sec["body"]
                body = convert(strip_blank(raw), key, f"{key} {n}")
                rel = f"{key}/{man['slug']}.md"
                write_page(ID_OUT / rel, src["title"], describe(body), body)
                pages.append({"guide": key, "path": rel, "titleId": src["title"], "titleEn": man["title"]["en"], "lines": len(raw)})

    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (WORK / "pages.json").write_text(json.dumps(pages, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    # guide index pages, both languages (their text comes from the manifest, so they need no translation pass)
    def index_page(lang, key, guide):
        titles = guide["title"][lang]
        lines = [f"{guide['description'][lang]}", ""]
        who = guide["audience"][lang]
        lines.append(("Written for " if lang == "en" else "Ditulis untuk ") + who + ".")
        lines.append("")
        lines.append("## " + ("Chapters" if lang == "en" else "Bab"))
        lines.append("")
        for n, man in enumerate(guide["chapters"], 1):
            ctitle = man["title"][lang]
            if guide["mode"] == "section":
                lines.append(f"### {ctitle}")
                lines.append("")
                for mans in man["sections"]:
                    stitle = mans["en"] if lang == "en" else mans["id"]
                    lines.append(f"- [{stitle}](/docs/guides/{key}/{man['slug']}/{mans['slug']}/)")
                lines.append("")
            else:
                lines.append(f"- [{ctitle}](/docs/guides/{key}/{man['slug']}/)")
        if guide["mode"] != "section":
            lines.append("")
        return titles, guide["description"][lang], lines

    for lang, out in (("en", EN_OUT), ("id", ID_OUT)):
        for key, guide in manifest.items():
            title, desc, body = index_page(lang, key, guide)
            write_page(out / key / "index.md", title, desc, body)

    for w in warnings:
        print("warning:", w)
    counts = {k: sum(1 for p in pages if p["guide"] == k) for k in manifest}
    print(f"wrote {len(pages)} pages {counts} under {ID_OUT} and 4 index pages per language")


if __name__ == "__main__":
    main()
