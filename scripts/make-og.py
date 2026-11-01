#!/usr/bin/env python3
"""Draw the social cards, public/og/inbils-en.png and public/og/inbils-id.png (1200 x 630).

    GEIST_DIR=/path/to/geist/dist/fonts/geist-sans python3 scripts/make-og.py

The cards use the logo (src/assets/logo/inbils-wordmark.png), Geist (the site's typeface, from the `geist` npm
package, which is not a dependency of the site), the site's light colours and a small network drawing, the same
motif as the landing page: a few large nodes (points of presence) with many small ones (customers) linked to them.
Pillow draws at twice the size and scales down, so edges are smooth. Run it again when the wording changes.
"""

import math
import os
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = Path(os.environ.get("GEIST_DIR", "/tmp/geist"))
W, H, S = 1200, 630, 2

BG = (246, 249, 255)
INK = (8, 24, 58)
MUTED = (61, 79, 114)
FAINT = (82, 102, 138)
AZURE = (31, 85, 214)
SIGNAL = (10, 134, 179)

CARDS = {
    "en": {
        "title": "ISP management software, from signup to payment.",
        "line": "Customers and subscriptions, RADIUS and MikroTik, work orders, inventory, Midtrans billing, ticketing with SLA.",
    },
    "id": {
        "title": "Aplikasi manajemen ISP, dari pasang baru sampai pembayaran.",
        "line": "Pelanggan dan langganan, RADIUS dan MikroTik, SPK, inventaris, billing Midtrans, tiket dengan SLA.",
    },
}


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size * S)


def wrap(draw, text, face, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=face) <= width * S:
            line = trial
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def network(draw):
    """A fixed drawing: three points of presence on the right, customers around them."""
    rnd = random.Random(11)
    pops = [(930, 150), (1060, 330), (880, 470)]
    nodes = []
    for _ in range(46):
        x, y = rnd.uniform(640, 1170), rnd.uniform(40, 590)
        if x < 730 and y > 170:
            continue
        nodes.append((x, y))
    def near(p):
        return min(pops, key=lambda q: (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2)
    for p in nodes:
        q = near(p)
        d = math.dist(p, q)
        if d < 240:
            draw.line([(p[0] * S, p[1] * S), (q[0] * S, q[1] * S)], fill=AZURE + (46,), width=2)
    for a in range(len(pops)):
        for b in range(a + 1, len(pops)):
            draw.line([(pops[a][0] * S, pops[a][1] * S), (pops[b][0] * S, pops[b][1] * S)], fill=AZURE + (90,), width=3)
    for p in nodes:
        r = rnd.choice((3, 4, 5))
        draw.ellipse([(p[0] - r) * S, (p[1] - r) * S, (p[0] + r) * S, (p[1] + r) * S], fill=AZURE + (96,))
    for x, y in pops:
        draw.ellipse([(x - 22) * S, (y - 22) * S, (x + 22) * S, (y + 22) * S], fill=AZURE + (34,))
        draw.ellipse([(x - 11) * S, (y - 11) * S, (x + 11) * S, (y + 11) * S], fill=AZURE + (255,))
        draw.ellipse([(x - 4) * S, (y - 4) * S, (x + 4) * S, (y + 4) * S], fill=BG + (255,))
    # one packet in flight, the only use of the signal colour
    a, b = pops[0], pops[1]
    px, py = a[0] + (b[0] - a[0]) * 0.58, a[1] + (b[1] - a[1]) * 0.58
    draw.ellipse([(px - 14) * S, (py - 14) * S, (px + 14) * S, (py + 14) * S], fill=SIGNAL + (60,))
    draw.ellipse([(px - 6) * S, (py - 6) * S, (px + 6) * S, (py + 6) * S], fill=SIGNAL + (255,))


def card(lang: str) -> Path:
    base = Image.new("RGBA", (W * S, H * S), BG + (255,))
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    network(ImageDraw.Draw(layer))
    base.alpha_composite(layer)
    draw = ImageDraw.Draw(base)

    logo = Image.open(ROOT / "src/assets/logo/inbils-wordmark.png").convert("RGBA")
    lw = 300 * S
    logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
    base.alpha_composite(logo, (80 * S, 56 * S))

    text = CARDS[lang]
    title_face = font("Geist-SemiBold.ttf", 58)
    y = 196 * S
    for line in wrap(draw, text["title"], title_face, 620):
        draw.text((80 * S, y), line, font=title_face, fill=INK)
        y += 66 * S
    line_face = font("Geist-Regular.ttf", 24)
    y += 12 * S
    for line in wrap(draw, text["line"], line_face, 610):
        draw.text((80 * S, y), line, font=line_face, fill=MUTED)
        y += 34 * S
    draw.text((80 * S, 572 * S), "madmouse17.github.io/inbils-documentation", font=font("Geist-Medium.ttf", 20), fill=FAINT)

    out = ROOT / "public/og" / f"inbils-{lang}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").resize((W, H), Image.LANCZOS).save(out, optimize=True)
    return out


if __name__ == "__main__":
    for lang in CARDS:
        path = card(lang)
        print(f"wrote {path.relative_to(ROOT)} ({path.stat().st_size // 1024} KB)")
