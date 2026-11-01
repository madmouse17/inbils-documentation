// The platform scene: many ISPs on one installation, as a small turning city.
//
// Each ring on the ground is one tenant, an ISP company with its subsidiaries: its data, roles and integrations
// stay inside the ring. The slab in the middle is the one installation they share; now and then a pulse runs
// from it to a tenant and the tenant's windows light up.
//
// - The view turns by itself, and the visitor can take it: drag (mouse, pen or finger; a vertical swipe still
//   scrolls the page), or focus it and use the arrow keys (it is a slider for the turn).
// - Pointing at a tenant (or tapping it) names it.
// - Calm (reduced motion or the pause button): the view stays where it is and turns only when the visitor turns
//   it, without coasting.
//
// The 3D is a few lines of perspective (src/scripts/project3d.ts): boxes are sorted far to near and their
// visible faces drawn.

import {
  calm,
  clamp,
  cssVar,
  loop,
  onTheme,
  rgba,
  rgbVar,
  rng,
  surface,
  type Job,
  type RGB,
  type Surface,
} from '../kit';
import { newPoint, project, type Point, type View } from '../project3d';

interface Block {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  tenant: number;
  /** Seed for which windows are lit. */
  seed: number;
}

interface Tenant {
  x: number;
  z: number;
  name: string;
  /** 0 to 1: how recently a pulse reached it. */
  flash: number;
}

interface Pulse {
  tenant: number;
  t: number;
}

const RING = 2.2;
const TENANTS = 5;
const SUBSIDIARIES = [1, 2, 1, 2, 2];
const CORNERS: [number, number][] = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];
/** Side faces as pairs of bottom corners, with their outward normals. */
const SIDES: { a: number; b: number; n: [number, number] }[] = [
  { a: 0, b: 1, n: [0, -1] },
  { a: 1, b: 2, n: [1, 0] },
  { a: 2, b: 3, n: [0, 1] },
  { a: 3, b: 0, n: [-1, 0] },
];
const LIGHT: [number, number, number] = [-0.45, 0.78, -0.43];

export default function mount(figure: HTMLElement): void {
  const canvas = figure.querySelector('canvas');
  const dial = figure.querySelector<HTMLElement>('[role="slider"]');
  if (!canvas || !dial) return;
  const prefix = canvas.dataset.name ?? '';

  const rnd = rng(5);
  const blocks: Block[] = [];
  const tenants: Tenant[] = [];
  for (let i = 0; i < TENANTS; i++) {
    const angle = (i / TENANTS) * Math.PI * 2 + 0.3;
    const x = Math.cos(angle) * 4.7;
    const z = Math.sin(angle) * 4.7;
    tenants.push({ x, z, name: `${prefix} ${String.fromCharCode(65 + i)}`, flash: 0 });
    blocks.push({ x, z, w: 0.55, d: 0.55, h: 1.7 + rnd() * 1.0, tenant: i, seed: i * 17 + 1 });
    for (let k = 0; k < SUBSIDIARIES[i]; k++) {
      const side = k % 2 ? 1 : -1;
      blocks.push({
        x: x + side * 1.05,
        z: z + (k ? 0.5 : -0.45),
        w: 0.36 + rnd() * 0.08,
        d: 0.36 + rnd() * 0.08,
        h: 0.8 + rnd() * 0.6,
        tenant: i,
        seed: i * 17 + k + 3,
      });
    }
  }

  let base: RGB = [31, 85, 214];
  let signal: RGB = [10, 134, 179];
  let ink: RGB = [8, 24, 58];
  let paper = '#ffffff';
  let strong = '#08183a';
  let yaw = 0.35;
  let spin = 0.16;
  let idle = 3;
  let pulses: Pulse[] = [];
  let nextPulse = 1;
  let hot = -1;
  let dragging = false;
  let lastX = 0;
  let velocity = 0;
  let job: Job | undefined;
  const view3: View = { yaw, pitch: 0.55, zoom: 40, focal: 22, cx: 0, cy: 0 };
  const p = newPoint();

  const found = surface(canvas, (s) => size(s));
  if (!found) return;
  const view: Surface = found;
  const { ctx } = view;

  function colors(): void {
    base = rgbVar('--net-rgb', base);
    signal = rgbVar('--net-signal-rgb', signal);
    ink = rgbVar('--ink-rgb', ink);
    paper = cssVar('--surface') || paper;
    strong = cssVar('--fg') || strong;
  }

  function size(s: Surface): void {
    view3.zoom = Math.min(s.w / 15.5, s.h / 9.2);
    view3.cx = s.w / 2;
    view3.cy = s.h * 0.58;
    redraw();
  }

  function pt(x: number, y: number, z: number): Point {
    return project(view3, x, y, z, p);
  }

  function poly(points: [number, number][], fill: string, stroke?: string): void {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  }

  /** A circle on the ground, as a polygon in the current view. */
  function ground(cx: number, cz: number, r: number, steps = 44): [number, number][] {
    const out: [number, number][] = [];
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const q = pt(cx + Math.cos(a) * r, 0, cz + Math.sin(a) * r);
      out.push([q.x, q.y]);
    }
    return out;
  }

  function drawBlock(b: Block, lit: boolean, picked: boolean): void {
    const hw = b.w;
    const hd = b.d;
    const top: [number, number][] = [];
    const bottom: [number, number][] = [];
    for (const [cx, cz] of CORNERS) {
      const t = pt(b.x + cx * hw, b.h, b.z + cz * hd);
      top.push([t.x, t.y]);
      const o = pt(b.x + cx * hw, 0, b.z + cz * hd);
      bottom.push([o.x, o.y]);
    }
    // the faces turned toward the camera: the sign of the area of the projected face says which way it faces
    const faces = SIDES.map((side) => {
      const poly4: [number, number][] = [bottom[side.a], bottom[side.b], top[side.b], top[side.a]];
      let area = 0;
      for (let i = 0; i < 4; i++)
        area += poly4[i][0] * poly4[(i + 1) % 4][1] - poly4[(i + 1) % 4][0] * poly4[i][1];
      return { side, poly4, area };
    }).filter((f) => f.area < 0);
    const tint = picked ? 0.34 : 0.18;
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    for (const { side, poly4 } of faces) {
      const shade = clamp(0.65 + 0.5 * (side.n[0] * LIGHT[0] + side.n[1] * LIGHT[2]));
      poly(poly4, rgba(base, tint + shade * 0.45), rgba(base, 0.9));
      windows(b, side, bottom, top, lit);
    }
    poly(top, rgba(base, picked ? 0.62 : 0.3), rgba(base, 0.95));
  }

  /** Windows on one side face: a grid of small squares, some lit. */
  function windows(
    b: Block,
    side: { a: number; b: number },
    bottom: [number, number][],
    top: [number, number][],
    lit: boolean,
  ): void {
    const width = (side.a % 2 === 0 ? b.w : b.d) * 2;
    const cols = Math.max(1, Math.floor(width / 0.5));
    const rows = Math.max(1, Math.floor(b.h / 0.55));
    const at = (u: number, v: number): [number, number] => {
      const x0 = bottom[side.a][0] + (bottom[side.b][0] - bottom[side.a][0]) * u;
      const y0 = bottom[side.a][1] + (bottom[side.b][1] - bottom[side.a][1]) * u;
      const x1 = top[side.a][0] + (top[side.b][0] - top[side.a][0]) * u;
      const y1 = top[side.a][1] + (top[side.b][1] - top[side.a][1]) * u;
      return [x0 + (x1 - x0) * v, y0 + (y1 - y0) * v];
    };
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const u0 = (c + 0.25) / cols;
        const u1 = (c + 0.75) / cols;
        const v0 = (r + 0.28) / rows;
        const v1 = (r + 0.72) / rows;
        const hash =
          Math.sin(b.seed * 12.9898 + c * 78.233 + r * 37.719 + side.a * 5.1) * 43758.5453;
        const on = hash - Math.floor(hash) < (lit ? 0.9 : 0.34);
        poly(
          [at(u0, v0), at(u1, v0), at(u1, v1), at(u0, v1)],
          on ? rgba(signal, lit ? 0.95 : 0.7) : rgba(ink, 0.1),
        );
      }
    }
  }

  function draw(): void {
    const { w, h, dpr } = view;
    view3.yaw = yaw;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineJoin = 'round';

    // the shared ground, then each tenant's ring
    poly(ground(0, 0, 6.9, 64), rgba(ink, 0.045), rgba(ink, 0.16));
    for (const [i, tenant] of tenants.entries()) {
      const ring = ground(tenant.x, tenant.z, RING);
      ctx.lineWidth = i === hot ? 2.2 : 1.4;
      ctx.setLineDash(i === hot ? [] : [5, 5]);
      poly(
        ring,
        rgba(base, i === hot ? 0.16 : 0.06 + tenant.flash * 0.1),
        rgba(base, i === hot ? 0.95 : 0.6),
      );
      ctx.setLineDash([]);
      const a = pt(0, 0, 0);
      const ax = a.x;
      const ay = a.y;
      const b = pt(tenant.x, 0, tenant.z);
      ctx.strokeStyle = rgba(ink, 0.2);
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    for (const pulse of pulses) {
      const tenant = tenants[pulse.tenant];
      const q = pt(tenant.x * pulse.t, 0, tenant.z * pulse.t);
      ctx.fillStyle = rgba(signal, 0.28);
      ctx.beginPath();
      ctx.arc(q.x, q.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rgba(signal, 1);
      ctx.beginPath();
      ctx.arc(q.x, q.y, 3.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // the shared slab and the buildings, far to near
    type Item = { depth: number; paint: () => void };
    const items: Item[] = [];
    items.push({
      depth: pt(0, 0.2, 0).depth,
      paint: () =>
        drawBlock({ x: 0, z: 0, w: 1.2, d: 1.2, h: 0.4, tenant: -1, seed: 99 }, false, false),
    });
    for (const b of blocks) {
      const lit = tenants[b.tenant].flash > 0.2;
      items.push({
        depth: pt(b.x, b.h / 2, b.z).depth,
        paint: () => drawBlock(b, lit, b.tenant === hot),
      });
    }
    items.sort((i, j) => j.depth - i.depth);
    for (const item of items) item.paint();

    if (hot >= 0) {
      const main = blocks.find((b) => b.tenant === hot) as Block;
      const q = pt(tenants[hot].x, main.h, tenants[hot].z);
      tag(tenants[hot].name, q.x, q.y - 12);
    }
    const c = pt(0, 0.4, 0);
    tag('Inbils', c.x, c.y - 16);
  }

  /** A small label whose bottom edge centre is at (x, y). */
  function tag(name: string, x: number, y: number): void {
    ctx.font = '600 12px "Geist Variable", ui-sans-serif, system-ui, sans-serif';
    const width = ctx.measureText(name).width + 16;
    ctx.fillStyle = paper;
    ctx.strokeStyle = rgba(base, 0.9);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - width / 2, y - 22, width, 22, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = strong;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, x, y - 11);
  }

  function tick(dt: number): void {
    if (!dragging && !calm() && dt > 0) {
      idle += dt;
      yaw += velocity * dt;
      velocity *= Math.pow(0.04, dt);
      if (Math.abs(velocity) < 0.02) velocity = 0;
      if (idle > 2.2 && velocity === 0) yaw += spin * dt;
      nextPulse -= dt;
      if (nextPulse <= 0) {
        pulses.push({ tenant: Math.floor(Math.random() * TENANTS), t: 0 });
        nextPulse = 1.1 + Math.random() * 0.8;
      }
      pulses = pulses.filter((q) => {
        q.t += dt / 1.1;
        if (q.t >= 1) tenants[q.tenant].flash = 1;
        return q.t < 1;
      });
    }
    for (const t of tenants) t.flash = Math.max(0, t.flash - dt * 0.8);
    draw();
  }

  function redraw(): void {
    if (calm()) job?.redraw();
  }

  function turn(by: number): void {
    yaw += by;
    dial!.setAttribute(
      'aria-valuenow',
      String(Math.round(((((yaw * 180) / Math.PI) % 360) + 360) % 360)),
    );
    redraw();
  }

  /** The tenant under a pointer, if any: nearest to the pointer within about the width of its main building. */
  function pick(e: PointerEvent): number {
    const box = canvas!.getBoundingClientRect();
    let best = -1;
    let bestD = Infinity;
    tenants.forEach((tenant, i) => {
      const main = blocks.find((b) => b.tenant === i) as Block;
      const q = pt(tenant.x, main.h / 2, tenant.z);
      const d = Math.hypot(e.clientX - box.left - q.x, e.clientY - box.top - q.y);
      if (d < bestD && d < 2.1 * q.k * view3.zoom) {
        best = i;
        bestD = d;
      }
    });
    return best;
  }

  canvas.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    lastX = e.clientX;
    velocity = 0;
    idle = 0;
    canvas.setPointerCapture(e.pointerId);
    hot = pick(e);
    redraw();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (dragging) {
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      turn(dx * 0.008);
      velocity = calm() ? 0 : dx * 0.5;
    } else if (e.pointerType !== 'touch') {
      const next = pick(e);
      if (next !== hot) {
        hot = next;
        redraw();
      }
    }
  });
  const release = (): void => {
    dragging = false;
    idle = 0;
  };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerleave', () => {
    if (!dragging && hot !== -1) {
      hot = -1;
      redraw();
    }
  });
  dial.addEventListener('keydown', (e) => {
    const step =
      e.key === 'ArrowRight' || e.key === 'ArrowUp'
        ? 0.26
        : e.key === 'ArrowLeft' || e.key === 'ArrowDown'
          ? -0.26
          : 0;
    if (!step) return;
    e.preventDefault();
    idle = 0;
    turn(step);
  });

  job = loop(figure, tick);
  colors();
  size(view);
  onTheme(() => {
    colors();
    redraw();
  });
  void document.fonts?.ready.then(() => redraw());
}
