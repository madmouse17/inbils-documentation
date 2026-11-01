// The inventory scene: boxes moving between the warehouse shelves and the technician's shelves.
//
// A technician's request is approved and a box travels from the warehouse to the technician; what the work did
// not use comes back as a material return. Every move adds a line to the ledger under the shelves (newest on
// top, the ledger only grows), and the counts above the shelves follow the boxes.
// Calm (reduced motion or the pause button): the shelves and a ledger of earlier moves, nothing moving.

import {
  calm,
  clamp,
  cssVar,
  loop,
  onTheme,
  rgba,
  rgbVar,
  rng,
  smooth,
  surface,
  type Job,
  type RGB,
  type Surface,
} from '../kit';
import type { Pt } from '../path';

type Where = 'warehouse' | 'tech';

interface Box {
  kind: 0 | 1 | 2;
  /** Set while the box is in the air: where it left from, and how far along it is. */
  from?: Pt;
  t: number;
}

interface Entry {
  out: boolean;
  age: number;
}

const WAREHOUSE_SLOTS = [5, 5, 5];
const TECH_SLOTS = [2, 2];
const FLIGHT = 1.15;

export default function mount(figure: HTMLElement): void {
  const canvas = figure.querySelector('canvas');
  if (!canvas) return;
  const words = canvas.dataset;
  const rnd = rng(9);

  const warehouse: (Box | null)[] = Array(WAREHOUSE_SLOTS.reduce((a, b) => a + b, 0)).fill(null);
  const tech: (Box | null)[] = Array(TECH_SLOTS.reduce((a, b) => a + b, 0)).fill(null);
  const ledger: Entry[] = [];
  let base: RGB = [31, 85, 214];
  let signal: RGB = [10, 134, 179];
  let ink: RGB = [8, 24, 58];
  let text = '#3d4f72';
  let strong = '#08183a';
  let next = 1.1;
  let job: Job | undefined;

  // seven boxes on the warehouse shelves, one with the technician
  for (const i of [0, 1, 3, 4, 6, 8, 9, 11, 13])
    warehouse[i] = { kind: Math.floor(rnd() * 3) as Box['kind'], t: 1 };
  tech[0] = { kind: 1, t: 1 };
  if (calm()) {
    ledger.push({ out: false, age: 1 }, { out: true, age: 1 }, { out: true, age: 1 });
  }

  const found = surface(canvas, () => redraw());
  if (!found) return;
  const view: Surface = found;
  const { ctx } = view;

  function colors(): void {
    base = rgbVar('--net-rgb', base);
    signal = rgbVar('--net-signal-rgb', signal);
    ink = rgbVar('--ink-rgb', ink);
    text = cssVar('--fg-muted') || text;
    strong = cssVar('--fg') || strong;
  }

  /** The shelves of one rack: its box in the picture, then the centre of every slot. */
  function rack(where: Where): {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    slots: Pt[];
    cell: Pt;
  } {
    const { w, h } = view;
    const rows = where === 'warehouse' ? WAREHOUSE_SLOTS : TECH_SLOTS;
    const x0 = where === 'warehouse' ? w * 0.05 : w * 0.72;
    const x1 = where === 'warehouse' ? w * 0.64 : w * 0.95;
    const y0 = h * 0.17;
    const y1 = h * 0.64;
    const rowH = (y1 - y0) / (where === 'warehouse' ? 3 : 3);
    const slots: Pt[] = [];
    rows.forEach((count, row) => {
      const yBoard = y0 + rowH * (row + 1) + (where === 'tech' ? rowH * 0 : 0);
      for (let i = 0; i < count; i++) slots.push([x0 + ((x1 - x0) * (i + 0.5)) / count, yBoard]);
    });
    return { x0, x1, y0, y1, slots, cell: [(x1 - x0) / Math.max(...rows), rowH] };
  }

  function boxRect(slot: Pt, cell: Pt, kind: number): [number, number, number, number] {
    const bw = cell[0] * (0.52 + kind * 0.14);
    const bh = cell[1] * (0.42 + kind * 0.12);
    return [slot[0] - bw / 2, slot[1] - bh - 2, bw, bh];
  }

  function drawBox(x: number, y: number, bw: number, bh: number, kind: number): void {
    ctx.fillStyle = rgba(base, 0.2 + kind * 0.12);
    ctx.strokeStyle = rgba(base, 0.85);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(x, y, bw, bh, 3);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = rgba(base, 0.5);
    ctx.beginPath();
    ctx.moveTo(x + bw / 2, y);
    ctx.lineTo(x + bw / 2, y + bh * 0.4);
    ctx.stroke();
  }

  function drawRack(where: Where, slots: (Box | null)[]): void {
    const r = rack(where);
    ctx.strokeStyle = rgba(ink, 0.4);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    const rows = where === 'warehouse' ? WAREHOUSE_SLOTS.length : TECH_SLOTS.length;
    const rowH = (r.y1 - r.y0) / 3;
    ctx.beginPath();
    ctx.moveTo(r.x0, r.y0);
    ctx.lineTo(r.x0, r.y1);
    ctx.moveTo(r.x1, r.y0);
    ctx.lineTo(r.x1, r.y1);
    for (let row = 1; row <= rows; row++) {
      ctx.moveTo(r.x0, r.y0 + rowH * row);
      ctx.lineTo(r.x1, r.y0 + rowH * row);
    }
    ctx.stroke();
    slots.forEach((box, i) => {
      if (!box) return;
      const [x, y, bw, bh] = boxRect(r.slots[i], r.cell, box.kind);
      if (box.from && box.t < 1) {
        const k = smooth(box.t);
        const lift = Math.sin(Math.PI * box.t) * Math.min(view.h * 0.12, 44);
        const dx = box.from[0] - (x + bw / 2);
        const dy = box.from[1] - (y + bh);
        drawBox(x + dx * (1 - k), y + dy * (1 - k) - lift, bw, bh, box.kind);
      } else drawBox(x, y, bw, bh, box.kind);
    });
  }

  function count(slots: (Box | null)[]): number {
    return slots.filter((b) => b && b.t >= 1).length;
  }

  function label(name: string, n: number, x: number): void {
    ctx.textAlign = 'left';
    ctx.fillStyle = strong;
    ctx.font = '600 12px "Geist Variable", ui-sans-serif, system-ui, sans-serif';
    ctx.fillText(name, x, view.h * 0.09);
    const width = ctx.measureText(`${name} `).width;
    ctx.fillStyle = text;
    ctx.font = '500 12px "Geist Mono Variable", ui-monospace, monospace';
    ctx.fillText(String(n), x + width, view.h * 0.09);
  }

  function drawLedger(): void {
    const { w, h } = view;
    const top = h * 0.74;
    ctx.strokeStyle = rgba(ink, 0.18);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.05, top - 6);
    ctx.lineTo(w * 0.95, top - 6);
    ctx.stroke();
    ctx.font = '500 12px "Geist Variable", ui-sans-serif, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ledger.slice(0, 3).forEach((entry, i) => {
      const k = smooth(entry.age / 0.35);
      const y = top + 10 + i * 19 - (1 - k) * 8;
      ctx.globalAlpha = k * (1 - i * 0.28);
      const color = entry.out ? signal : base;
      ctx.fillStyle = rgba(color, 1);
      // an arrow toward the technician for a request, back toward the warehouse for a return
      const x = w * 0.05;
      ctx.beginPath();
      if (entry.out) {
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x + 8, y);
        ctx.lineTo(x, y + 4);
      } else {
        ctx.moveTo(x + 8, y - 4);
        ctx.lineTo(x, y);
        ctx.lineTo(x + 8, y + 4);
      }
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = text;
      ctx.fillText(entry.out ? (words.out ?? '') : (words.back ?? ''), x + 16, y);
    });
    ctx.globalAlpha = 1;
  }

  function draw(): void {
    const { w, h, dpr } = view;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.textBaseline = 'middle';
    label(words.warehouse ?? '', count(warehouse), rack('warehouse').x0);
    label(words.technician ?? '', count(tech), rack('tech').x0);
    drawRack('warehouse', warehouse);
    drawRack('tech', tech);
    drawLedger();
  }

  /** Starts one move: a request from the warehouse, or a return from the technician. */
  function move(): void {
    const requests = count(tech) < 3 && (count(tech) === 0 || Math.random() < 0.55);
    const from = requests ? warehouse : tech;
    const to = requests ? tech : warehouse;
    const full = from.map((b, i) => (b && b.t >= 1 ? i : -1)).filter((i) => i >= 0);
    const free = to.map((b, i) => (b ? -1 : i)).filter((i) => i >= 0);
    if (!full.length || !free.length) return;
    const source = full[Math.floor(Math.random() * full.length)];
    const target = free[Math.floor(Math.random() * free.length)];
    const sourceRack = rack(requests ? 'warehouse' : 'tech');
    const box = from[source] as Box;
    const [x, y, bw, bh] = boxRect(sourceRack.slots[source], sourceRack.cell, box.kind);
    from[source] = null;
    to[target] = { kind: box.kind, from: [x + bw / 2, y + bh], t: 0 };
    ledger.unshift({ out: requests, age: 0 });
    ledger.length = Math.min(ledger.length, 4);
  }

  function tick(dt: number): void {
    if (!calm() && dt > 0) {
      for (const slots of [warehouse, tech]) {
        for (const box of slots) if (box && box.t < 1) box.t = Math.min(1, box.t + dt / FLIGHT);
      }
      for (const e of ledger) e.age = Math.min(1, e.age + dt);
      next -= dt;
      if (next <= 0) {
        move();
        next = 1.8 + Math.random() * 0.9;
      }
    }
    draw();
  }

  function redraw(): void {
    if (calm()) job?.redraw();
  }

  job = loop(figure, tick);
  colors();
  onTheme(() => {
    colors();
    redraw();
  });
  void document.fonts?.ready.then(() => redraw());
  void clamp;
}
