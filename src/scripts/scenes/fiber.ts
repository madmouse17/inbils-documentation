// The fibre plant of the network section: the passive network between the OLT and a customer's home.
//
// Light leaves the OLT on the feeder fibre, splits at the splitter in the cabinet (ODC), splits again at each
// ODP, and reaches every home on its own drop cable; now and then a home answers and its pulse climbs back up to
// the OLT. The equipment is drawn in the same isometric view as the router above it.
// Calm (reduced motion or the pause button): the plant without the pulses.

import { isoBox, isoHouse, leftFace, rightFace, SLOPE, type Tint } from '../iso';
import {
  calm,
  clamp,
  cssVar,
  loop,
  onTheme,
  rgba,
  rgbVar,
  surface,
  type Job,
  type RGB,
  type Surface,
} from '../kit';
import { bend, pointOn, type Path } from '../path';

type Kind = 'olt' | 'odc' | 'odp' | 'home';

interface Node {
  kind: Kind;
  /** The point on the ground the equipment stands on. */
  x: number;
  y: number;
  /** Half the width of the footprint, and the height. */
  r: number;
  h: number;
  /** Fibre that feeds this node, and the fibres that leave it. */
  inbound: number;
  outbound: number[];
  flash: number;
}

interface Fiber {
  from: number;
  to: number;
  path: Path;
  width: number;
}

interface Pulse {
  fiber: number;
  /** Distance travelled along the fibre, in px. */
  d: number;
  /** +1 downstream (toward the homes), -1 upstream. */
  dir: 1 | -1;
  strength: number;
}

const GROUPS = 4;
const HOMES = 3;
const SPEED = 200;
const TAIL = 44;

export default function mount(figure: HTMLElement): void {
  const canvas = figure.querySelector('canvas');
  if (!canvas) return;
  const homeLabel = canvas.dataset.home ?? '';

  let nodes: Node[] = [];
  let fibers: Fiber[] = [];
  let pulses: Pulse[] = [];
  let base: RGB = [31, 85, 214];
  let signal: RGB = [10, 134, 179];
  let ink: RGB = [8, 24, 58];
  let text = '#3d4f72';
  let metal: Tint = { top: '#3a4c78', left: '#26365c', right: '#1a2744', edge: '#ffffff' };
  let wall: Pick<Tint, 'left' | 'right' | 'edge'> = {
    left: '#eaf0fb',
    right: '#d4ddf0',
    edge: '#5b6f94',
  };
  let launchIn = 0.4;
  let answerIn = 3;
  let job: Job | undefined;

  const found = surface(canvas, (s) => layout(s));
  if (!found) return;
  const view: Surface = found;
  const { ctx } = view;

  function colors(): void {
    base = rgbVar('--net-rgb', base);
    signal = rgbVar('--net-signal-rgb', signal);
    ink = rgbVar('--ink-rgb', ink);
    text = cssVar('--fg-muted') || text;
    metal = {
      top: cssVar('--device-top'),
      left: cssVar('--device-front'),
      right: cssVar('--device-side'),
      edge: cssVar('--device-edge'),
    };
    wall = { left: cssVar('--surface-2'), right: cssVar('--line'), edge: cssVar('--outline') };
  }

  /** Places the tree left to right: the OLT, the cabinet, four ODPs and three homes on each. */
  function layout(s: Surface): void {
    const unit = clamp(Math.min(s.w / 1000, s.h / 380), 0.55, 1.3);
    const us = [0.085, 0.31, 0.6, 0.91];
    const spread = 0.062;
    nodes = [];
    fibers = [];
    const add = (kind: Kind, u: number, v: number, r: number, h: number): number => {
      // `v` places the middle of the equipment, not its foot
      nodes.push({
        kind,
        x: u * s.w,
        y: v * s.h + (h * unit) / 2,
        r: r * unit,
        h: h * unit,
        inbound: -1,
        outbound: [],
        flash: 0,
      });
      return nodes.length - 1;
    };
    const link = (from: number, to: number, width: number): void => {
      const a = nodes[from];
      const b = nodes[to];
      const start = rightFace(a.x, a.y, a.r, 0.9, a.h * 0.5);
      const end = leftFace(b.x, b.y, b.r, 0.1, b.h * 0.5);
      fibers.push({ from, to, path: bend(start, end), width });
      nodes[from].outbound.push(fibers.length - 1);
      nodes[to].inbound = fibers.length - 1;
    };
    const olt = add('olt', us[0], 0.5, 24, 64);
    const odc = add('odc', us[1], 0.5, 15, 34);
    link(olt, odc, 2.4);
    for (let g = 0; g < GROUPS; g++) {
      const v = 0.25 + g * 0.19;
      const odp = add('odp', us[2], v, 9, 13);
      link(odc, odp, 1.7);
      for (let k = 0; k < HOMES; k++) {
        const home = add('home', us[3], v + (k - (HOMES - 1) / 2) * spread, 8, 14);
        link(odp, home, 1.2);
      }
    }
    pulses = [];
    redraw();
  }

  function spawn(fiber: number, dir: 1 | -1, strength: number): void {
    pulses.push({ fiber, d: dir === 1 ? 0 : fibers[fiber].path.length, dir, strength });
  }

  function tick(dt: number): void {
    if (!calm() && dt > 0) {
      launchIn -= dt;
      if (launchIn <= 0) {
        spawn(0, 1, 1);
        nodes[0].flash = 0.7;
        launchIn = 1.8;
      }
      answerIn -= dt;
      if (answerIn <= 0) {
        const homes = nodes.filter((n) => n.kind === 'home');
        spawn(homes[Math.floor(Math.random() * homes.length)].inbound, -1, 0.75);
        answerIn = 2.4 + Math.random() * 2;
      }
      const next: Pulse[] = [];
      for (const p of pulses) {
        p.d += p.dir * SPEED * dt;
        const f = fibers[p.fiber];
        if (p.dir === 1 && p.d >= f.path.length) {
          const node = nodes[f.to];
          node.flash = 1;
          for (const o of node.outbound) spawn(o, 1, p.strength);
        } else if (p.dir === -1 && p.d <= 0) {
          const node = nodes[f.from];
          node.flash = 1;
          if (node.inbound >= 0) spawn(node.inbound, -1, p.strength);
        } else next.push(p);
      }
      pulses = next.length > 120 ? next.slice(-120) : next;
    }
    for (const n of nodes) n.flash = Math.max(0, n.flash - dt * 2);
    draw();
  }

  function drawNode(n: Node): void {
    const lit = n.flash;
    if (n.kind === 'home') {
      isoHouse(
        ctx,
        n.x,
        n.y,
        n.r,
        n.h * 0.45,
        n.h * 0.55,
        wall,
        rgba(base, 0.55 + lit * 0.3),
        rgba(base, 0.8 + lit * 0.2),
      );
    } else {
      isoBox(ctx, n.x, n.y, n.r, n.h, metal);
    }
    if (n.kind === 'olt') {
      // line cards on the right face, each with an LED that lights when a pulse leaves
      for (let i = 0; i < 4; i++) {
        const z0 = n.h * (0.14 + i * 0.2);
        const z1 = z0 + n.h * 0.11;
        const a = rightFace(n.x, n.y, n.r, 0.14, z0);
        const b = rightFace(n.x, n.y, n.r, 0.86, z0);
        const c = rightFace(n.x, n.y, n.r, 0.86, z1);
        const d = rightFace(n.x, n.y, n.r, 0.14, z1);
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        for (const p of [b, c, d]) ctx.lineTo(p[0], p[1]);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0,0,0,0.38)';
        ctx.fill();
        const led = rightFace(n.x, n.y, n.r, 0.24, (z0 + z1) / 2);
        ctx.fillStyle = rgba(signal, 0.55 + lit * 0.45);
        ctx.beginPath();
        ctx.arc(led[0], led[1], 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (n.kind === 'odc') {
      // the cabinet door on the right face
      const a = rightFace(n.x, n.y, n.r, 0.16, n.h * 0.12);
      const b = rightFace(n.x, n.y, n.r, 0.84, n.h * 0.12);
      const c = rightFace(n.x, n.y, n.r, 0.84, n.h * 0.88);
      const d = rightFace(n.x, n.y, n.r, 0.16, n.h * 0.88);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      for (const p of [b, c, d]) ctx.lineTo(p[0], p[1]);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    if (lit > 0.02) {
      ctx.strokeStyle = rgba(signal, lit * 0.85);
      ctx.lineWidth = 1.6;
      const grow = n.r * (1.2 + (1 - lit) * 0.9);
      ctx.beginPath();
      ctx.ellipse(n.x, n.y + n.r * SLOPE * 0.5, grow, grow * SLOPE, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function draw(): void {
    const { w, h, dpr } = view;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    for (const f of fibers) {
      ctx.strokeStyle = rgba(ink, 0.3);
      ctx.lineWidth = f.width;
      ctx.beginPath();
      ctx.moveTo(f.path.pts[0][0], f.path.pts[0][1]);
      for (const [x, y] of f.path.pts.slice(1)) ctx.lineTo(x, y);
      ctx.stroke();
    }
    for (const n of [...nodes].sort((a, b) => a.y - b.y)) drawNode(n);

    for (const p of pulses) {
      const f = fibers[p.fiber];
      for (let k = 0; k < 8; k++) {
        const from = pointOn(f.path, p.d - (p.dir * k * TAIL) / 8);
        const to = pointOn(f.path, p.d - (p.dir * (k + 1) * TAIL) / 8);
        const fade = p.strength * (1 - k / 8);
        ctx.beginPath();
        ctx.moveTo(from[0], from[1]);
        ctx.lineTo(to[0], to[1]);
        ctx.strokeStyle = rgba(signal, fade * 0.28);
        ctx.lineWidth = f.width + 5;
        ctx.stroke();
        ctx.strokeStyle = rgba(signal, fade);
        ctx.lineWidth = f.width + 1;
        ctx.stroke();
      }
    }

    ctx.font = '500 12px "Geist Variable", ui-sans-serif, system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = text;
    const tiers = [nodes[0], nodes[1], nodes[2], nodes[3]];
    ['OLT', 'ODC', 'ODP', homeLabel].forEach((name, i) => ctx.fillText(name, tiers[i].x, 16));
  }

  function redraw(): void {
    if (calm()) job?.redraw();
  }

  job = loop(figure, tick);
  colors();
  layout(view);
  onTheme(() => {
    colors();
    redraw();
  });
  void document.fonts?.ready.then(() => redraw());
}
