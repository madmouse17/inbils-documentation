// The hero's network, continued behind the whole page: one fixed canvas, very faint, under every section.
//
// - The drawing is taller than the screen and moves at a third of the page's speed, so it reads as farther away.
// - The nodes beside the section in view grow and their links brighten; the rest stay quiet.
// - A faint packet now and then crosses a link. Nothing here answers the pointer: the hero has the interactive one.
// - Behind the hero the drawing is erased, so the two networks never overlap; the erase fades out under the
//   hero's own drawing, where the hero's fades out too.
// - Calm (reduced motion or the pause button): a still drawing at the top of the world, no parallax.
//
// Contrast: the canvas is faded to 0.85 in CSS, no line is drawn above 0.19 of the azure and no node above 0.28.
// Worst case, with text entirely over a node (checked with the antislop contrast checker): light theme body text
// 10.4:1, muted text 4.9:1, link text 4.5:1; dark theme body 9.5:1, muted 6.3:1, link 5.2:1.

import {
  calm,
  clamp,
  loop,
  onTheme,
  rgba,
  rgbVar,
  rng,
  surface,
  type RGB,
  type Surface,
} from '../kit';
import { topology, type Edge, type Site } from '../topology';

interface Dot extends Site {
  x: number;
  y: number;
  r: number;
  amp: number;
  freq: number;
  phase: number;
  boost: number;
}

interface Packet {
  edge: number;
  from: number;
  t: number;
  speed: number;
}

interface Span {
  top: number;
  bottom: number;
  focus: number;
}

/** The drawing moves at this share of the page's scroll speed. */
const PARALLAX = 0.3;
const AREA_PER_NODE = 26000;
const MAX_NODES = 120;
/** How far (px) the glow around the section in view reaches above and below it. */
const REACH = 160;

export default function mount(canvas: HTMLElement): void {
  if (!(canvas instanceof HTMLCanvasElement)) return;
  let dots: Dot[] = [];
  let edges: Edge[] = [];
  let packets: Packet[] = [];
  let spans: Span[] = [];
  let hero = { top: 0, bottom: 0 };
  let worldHeight = 0;
  let base: RGB = [31, 85, 214];
  let signal: RGB = [10, 134, 179];
  let clock = 0;
  let nextPacket = 1;
  let scroll = 0;

  const found = surface(canvas, (s) => {
    measure(s);
    build(s);
  });
  if (!found) return;
  const view: Surface = found;
  const { ctx } = view;

  function colors(): void {
    base = rgbVar('--net-rgb', base);
    signal = rgbVar('--net-signal-rgb', signal);
  }

  /** Where each section and the hero drawing sit in the document, and how tall the drawing must be. */
  function measure(s: Surface): void {
    const top = window.scrollY;
    const place = (el: Element): Span => {
      const r = el.getBoundingClientRect();
      return { top: r.top + top, bottom: r.bottom + top, focus: 0 };
    };
    spans = [...document.querySelectorAll('main section')].map(place);
    const host = document.querySelector('[data-scene="hero"]');
    hero = host ? place(host) : { top: 0, bottom: 0, focus: 0 };
    const extra = Math.max(0, document.documentElement.scrollHeight - s.h);
    // quantised, so the images and fonts that settle after load do not reshuffle the nodes
    worldHeight = Math.ceil((s.h + PARALLAX * extra) / 120) * 120;
  }

  function build(s: Surface): void {
    const rnd = rng(1103);
    const count = Math.min(
      MAX_NODES,
      Math.max(24, Math.round((s.w * worldHeight) / AREA_PER_NODE)),
    );
    const plan = {
      w: s.w,
      h: worldHeight,
      count,
      pops: Math.max(5, Math.round(count / 13)),
      spread: Math.min(s.w, 520) * 0.5,
      margin: 12,
    };
    const made = topology(rnd, plan, (x, y, pop): Dot => ({
      hx: x,
      hy: y,
      x,
      y,
      pop,
      links: [],
      r: pop ? 3.5 : 1.2 + rnd() * 1.2,
      amp: 3 + rnd() * 7,
      freq: 0.05 + rnd() * 0.06,
      phase: rnd() * 6.28,
      boost: 0,
    }));
    dots = made.sites;
    edges = made.edges;
    packets = [];
  }

  /** How much of its box each section shows in the middle of the screen: 1 when it fills the middle band. */
  function aim(dt: number): void {
    const middle = view.h * 0.3;
    const from = view.h * 0.35;
    for (const s of spans) {
      const shown = Math.min(s.bottom - scroll, from + middle) - Math.max(s.top - scroll, from);
      const want = calm() ? 0 : clamp(shown / middle);
      s.focus += (want - s.focus) * Math.min(1, dt * 3);
    }
  }

  function tick(dt: number): void {
    clock += dt;
    scroll = calm() ? 0 : window.scrollY;
    aim(dt);
    draw(dt);
  }

  function draw(dt: number): void {
    const { w, h, dpr } = view;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const off = scroll * PARALLAX;
    const top = off - 30;
    const bottom = off + h + 30;

    const bands = spans
      .filter((s) => s.focus > 0.02)
      .map((s) => ({ y0: s.top - scroll, y1: s.bottom - scroll, focus: s.focus }));
    for (const d of dots) {
      if (!calm()) {
        d.x = d.hx + Math.sin(clock * d.freq + d.phase) * d.amp;
        d.y = d.hy + Math.cos(clock * d.freq * 0.8 + d.phase) * d.amp;
      }
      let b = 0;
      const sy = d.y - off;
      for (const band of bands) {
        const gap = sy < band.y0 ? band.y0 - sy : sy > band.y1 ? sy - band.y1 : 0;
        b = Math.max(b, band.focus * (1 - gap / REACH));
      }
      d.boost = clamp(b);
    }

    ctx.lineWidth = 1;
    for (const e of edges) {
      const a = dots[e.a];
      const b = dots[e.b];
      if ((a.y < top && b.y < top) || (a.y > bottom && b.y > bottom)) continue;
      const lit = Math.max(a.boost, b.boost);
      ctx.strokeStyle = rgba(base, (e.backbone ? 0.12 : 0.065) * (1 + lit * 0.9));
      ctx.beginPath();
      ctx.moveTo(a.x, a.y - off);
      ctx.lineTo(b.x, b.y - off);
      ctx.stroke();
    }

    for (const d of dots) {
      if (d.y < top || d.y > bottom) continue;
      const y = d.y - off;
      if (d.pop) {
        ctx.fillStyle = rgba(base, 0.035 + d.boost * 0.045);
        ctx.beginPath();
        ctx.arc(d.x, y, 14 + d.boost * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = rgba(base, 0.2 + d.boost * 0.12);
        ctx.beginPath();
        ctx.arc(d.x, y, d.r + 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      // at most 0.33 here, 0.28 after the canvas fade: link text over a node still reaches 4.5:1 in the light theme
      ctx.fillStyle = rgba(base, (d.pop ? 0.3 : 0.2) + d.boost * 0.03);
      ctx.beginPath();
      ctx.arc(d.x, y, d.r * (1 + d.boost * 0.5), 0, Math.PI * 2);
      ctx.fill();
    }

    if (dt > 0) advance(dt, top, bottom);
    for (const p of packets) {
      const e = edges[p.edge];
      const from = dots[p.from];
      const to = dots[e.a === p.from ? e.b : e.a];
      for (let i = 0; i < 3; i++) {
        const t = Math.max(0, p.t - i * 0.05);
        ctx.fillStyle = rgba(signal, 0.45 - i * 0.14);
        ctx.beginPath();
        ctx.arc(
          from.x + (to.x - from.x) * t,
          from.y + (to.y - from.y) * t - off,
          2.4 - i * 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    }

    // behind the hero drawing the page has none of this: erase it, fading out where the hero's own drawing does
    const y0 = hero.top - scroll;
    const y1 = hero.bottom - scroll;
    if (y1 > 0 && y0 < h) {
      const fade = ctx.createLinearGradient(0, y0, 0, y1);
      fade.addColorStop(0, 'rgba(0,0,0,1)');
      fade.addColorStop(0.6, 'rgba(0,0,0,1)');
      fade.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = fade;
      ctx.fillRect(0, y0, w, y1 - y0);
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  /** Packets: one starts on a link near the screen every second or so, and crosses it. */
  function advance(dt: number, top: number, bottom: number): void {
    nextPacket -= dt;
    if (nextPacket <= 0 && edges.length) {
      const index = Math.floor(Math.random() * edges.length);
      const e = edges[index];
      const y = dots[e.a].y;
      if (y > top && y < bottom) {
        const from = Math.random() < 0.5 ? e.a : e.b;
        packets.push({ edge: index, from, t: 0, speed: 110 + Math.random() * 60 });
        nextPacket = 0.7 + Math.random() * 1.1;
      }
    }
    packets = packets.filter((p) => {
      const e = edges[p.edge];
      const from = dots[p.from];
      const to = dots[e.a === p.from ? e.b : e.a];
      p.t += (p.speed * dt) / Math.max(30, Math.hypot(to.x - from.x, to.y - from.y));
      return p.t < 1;
    });
  }

  const job = loop(canvas, tick);
  colors();
  job.redraw();

  new ResizeObserver(() => {
    const before = worldHeight;
    measure(view);
    if (worldHeight !== before) build(view);
    job.redraw();
  }).observe(document.body);
  onTheme(() => {
    colors();
    job.redraw();
  });
  void document.fonts?.ready.then(() => {
    measure(view);
    job.redraw();
  });
}
