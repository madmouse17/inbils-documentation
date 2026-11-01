// The network drawing behind the landing hero: a few large nodes (points of presence) and many small ones
// (customers), linked the way an ISP's topology is. It is decoration with one job: to show the product's subject.
//
// - Nodes drift slowly. A pointer near a node lights it, and the links that reach it pulse.
// - A click or tap sends short "packets" from the nearest node along its links, hop by hop, and nudges the
//   nodes around it.
// - It draws at most 60 frames a second, stops while the tab is hidden or the hero is off screen, and a visitor
//   can pause it. Under `prefers-reduced-motion` it is a still drawing: nothing drifts or travels, and a click
//   only lights the node and its links.
// - The canvas is `pointer-events: none`; listeners sit on `window`, and a press on a link, a button or any other
//   control is left alone.
//
// Colours come from the CSS variables `--net-rgb` and `--net-signal-rgb`, so the theme switch recolours it.

type RGB = [number, number, number];

interface Node {
  hx: number; // home position
  hy: number;
  x: number; // drawn position
  y: number;
  ox: number; // offset from a nudge, springing back to 0
  oy: number;
  vx: number;
  vy: number;
  ax: number; // drift amplitude and frequency
  ay: number;
  fx: number;
  fy: number;
  px: number;
  py: number;
  r: number;
  pop: boolean;
  glow: number; // 0 to 1, eased toward `want`
  want: number;
  hold: number; // time (ms) until which a click keeps the node lit
  links: number[];
}

interface Link {
  a: number;
  b: number;
  backbone: boolean;
  heat: number;
}

interface Packet {
  link: number;
  from: number;
  t: number;
  hops: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  born: number;
}

const AREA_PER_NODE = 9000;
const MAX_NODES = 160;
const FRAME_MS = 1000 / 60;
const LIGHT_RADIUS = 150;
const NUDGE_RADIUS = 170;
const INTERACTIVE =
  'a,button,input,select,textarea,summary,label,video,[role="button"],[data-net-ignore]';

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readColor(name: string, fallback: RGB): RGB {
  const parts = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
    .split(/\s+/)
    .map(Number);
  return parts.length === 3 && parts.every((n) => Number.isFinite(n))
    ? [parts[0], parts[1], parts[2]]
    : fallback;
}

function sprite(color: RGB, size: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  if (g) {
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${color.join(',')},1)`);
    grad.addColorStop(0.35, `rgba(${color.join(',')},0.35)`);
    grad.addColorStop(1, `rgba(${color.join(',')},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  return c;
}

export function startNetwork(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  toggle: HTMLButtonElement | null,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  let w = 0;
  let h = 0;
  let dpr = 1;
  let nodes: Node[] = [];
  let links: Link[] = [];
  let packets: Packet[] = [];
  let ripples: Ripple[] = [];
  let quiet: DOMRect[] = [];
  let base: RGB = [31, 85, 214];
  let signal: RGB = [10, 134, 179];
  let baseGlow = sprite(base, 64);
  let signalGlow = sprite(signal, 64);
  let pointer = { x: 0, y: 0, inside: false };
  let paused = false;
  let hidden = document.hidden;
  let onScreen = true;
  let raf = 0;
  let last = 0;
  let clock = 0;
  let holdTimer = 0;

  function build(): void {
    const rnd = mulberry32(20241101);
    const count = Math.min(MAX_NODES, Math.max(14, Math.round((w * h) / AREA_PER_NODE)));
    const popCount = Math.max(3, Math.min(9, Math.round(count / 16)));
    const margin = 14;
    const make = (x: number, y: number, pop: boolean): Node => ({
      hx: x,
      hy: y,
      x,
      y,
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
      ax: pop ? 3 : 5 + rnd() * 9,
      ay: pop ? 3 : 5 + rnd() * 9,
      fx: 0.05 + rnd() * 0.07,
      fy: 0.05 + rnd() * 0.07,
      px: rnd() * 6.28,
      py: rnd() * 6.28,
      r: pop ? 5 : 1.6 + rnd() * 1.4,
      pop,
      glow: 0,
      want: 0,
      hold: 0,
      links: [],
    });

    nodes = [];
    for (let i = 0; i < popCount; i++) {
      // best of eight candidates: the one farthest from the points of presence placed so far
      let best = { x: 0, y: 0, d: -1 };
      for (let k = 0; k < 8; k++) {
        const x = margin + rnd() * (w - 2 * margin);
        const y = margin + rnd() * (h - 2 * margin);
        const d = nodes.reduce((m, n) => Math.min(m, Math.hypot(n.hx - x, n.hy - y)), Infinity);
        if (d > best.d) best = { x, y, d };
      }
      nodes.push(make(best.x, best.y, true));
    }
    const spread = Math.min(w, h) * 0.42;
    while (nodes.length < count) {
      const center = nodes[Math.floor(rnd() * popCount)];
      const angle = rnd() * Math.PI * 2;
      const dist = 26 + Math.pow(rnd(), 1.4) * spread;
      const x = Math.min(w - margin, Math.max(margin, center.hx + Math.cos(angle) * dist));
      const y = Math.min(h - margin, Math.max(margin, center.hy + Math.sin(angle) * dist));
      nodes.push(make(x, y, false));
    }

    links = [];
    const seen = new Set<number>();
    const connect = (a: number, b: number, backbone: boolean): void => {
      const key = Math.min(a, b) * 1000 + Math.max(a, b);
      if (a === b || seen.has(key)) return;
      seen.add(key);
      links.push({ a, b, backbone, heat: 0 });
      nodes[a].links.push(links.length - 1);
      nodes[b].links.push(links.length - 1);
    };
    const dist = (a: number, b: number): number =>
      Math.hypot(nodes[a].hx - nodes[b].hx, nodes[a].hy - nodes[b].hy);

    // backbone: a minimum spanning tree over the points of presence, plus one extra ring link each
    const inTree = [0];
    while (inTree.length < popCount) {
      let pick = { a: 0, b: 0, d: Infinity };
      for (const a of inTree) {
        for (let b = 0; b < popCount; b++) {
          if (!inTree.includes(b) && dist(a, b) < pick.d) pick = { a, b, d: dist(a, b) };
        }
      }
      connect(pick.a, pick.b, true);
      inTree.push(pick.b);
    }
    for (let a = 0; a < popCount; a++) {
      let near = -1;
      for (let b = 0; b < popCount; b++)
        if (b !== a && (near < 0 || dist(a, b) < dist(a, near))) near = b;
      if (near >= 0 && rnd() < 0.5) connect(a, near, true);
    }
    // customers hang off their nearest point of presence; a few also link to a close neighbour
    for (let i = popCount; i < nodes.length; i++) {
      let near = 0;
      for (let p = 1; p < popCount; p++) if (dist(i, p) < dist(i, near)) near = p;
      connect(i, near, false);
      if (rnd() < 0.28) {
        let peer = -1;
        for (let j = popCount; j < nodes.length; j++) {
          if (j !== i && dist(i, j) < 95 && (peer < 0 || dist(i, j) < dist(i, peer))) peer = j;
        }
        if (peer >= 0) connect(i, peer, false);
      }
    }
    packets = [];
    ripples = [];
  }

  function measure(): void {
    const box = host.getBoundingClientRect();
    quiet = [...document.querySelectorAll<HTMLElement>('[data-net-quiet]')].map((el) => {
      const r = el.getBoundingClientRect();
      return new DOMRect(r.left - box.left - 14, r.top - box.top - 10, r.width + 28, r.height + 20);
    });
  }

  function resize(): void {
    const box = host.getBoundingClientRect();
    if (!box.width || !box.height) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const changed = Math.abs(box.width - w) > 1 || Math.abs(box.height - h) > 1;
    w = box.width;
    h = box.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    if (changed || !nodes.length) build();
    measure();
    draw();
  }

  function colors(): void {
    base = readColor('--net-rgb', base);
    signal = readColor('--net-signal-rgb', signal);
    baseGlow = sprite(base, 64);
    signalGlow = sprite(signal, 64);
  }

  function step(dt: number, now: number): void {
    clock += dt;
    for (const n of nodes) {
      if (!still.matches) {
        n.vx += (-14 * n.ox - 5 * n.vx) * dt;
        n.vy += (-14 * n.oy - 5 * n.vy) * dt;
        n.ox += n.vx * dt;
        n.oy += n.vy * dt;
        n.x = n.hx + Math.sin(clock * n.fx + n.px) * n.ax + n.ox;
        n.y = n.hy + Math.sin(clock * n.fy + n.py) * n.ay + n.oy;
      }
      const near = pointer.inside
        ? Math.max(0, 1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / LIGHT_RADIUS)
        : 0;
      n.want = Math.max(near * near, now < n.hold ? 1 : 0);
      n.glow += (n.want - n.glow) * (dt === 0 ? 1 : Math.min(1, dt * 7));
    }
    for (const l of links) l.heat = Math.max(nodes[l.a].glow, nodes[l.b].glow);

    const next: Packet[] = [];
    for (const p of packets) {
      const l = links[p.link];
      const from = nodes[p.from];
      const to = nodes[l.a === p.from ? l.b : l.a];
      p.t += (p.speed * dt) / Math.max(24, Math.hypot(to.x - from.x, to.y - from.y));
      if (p.t < 1) {
        next.push(p);
        continue;
      }
      const arrived = l.a === p.from ? l.b : l.a;
      nodes[arrived].hold = now + 450;
      if (p.hops < 3) {
        const options = nodes[arrived].links.filter((i) => i !== p.link);
        const picks = options.sort(() => Math.random() - 0.5).slice(0, Math.random() < 0.3 ? 2 : 1);
        for (const i of picks)
          next.push({ link: i, from: arrived, t: 0, hops: p.hops + 1, speed: p.speed * 0.95 });
      }
    }
    packets = next;
    ripples = ripples.filter((r) => now - r.born < 800);
  }

  function draw(): void {
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const [br, bg, bb] = base;

    ctx.lineWidth = 1;
    for (const l of links) {
      const a = nodes[l.a];
      const b = nodes[l.b];
      const alpha =
        (l.backbone ? 0.2 : 0.1) +
        l.heat * (l.backbone ? 0.4 : 0.5) * (0.65 + 0.35 * Math.sin(clock * 7 + l.a));
      ctx.strokeStyle = `rgba(${br},${bg},${bb},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    for (const n of nodes) {
      const lit = n.glow;
      if (n.pop || lit > 0.02) {
        const size = n.r * (n.pop ? 7 : 11) + lit * 26;
        ctx.globalAlpha = (n.pop ? 0.34 : 0) + lit * 0.6;
        ctx.drawImage(baseGlow, n.x - size / 2, n.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(${br},${bg},${bb},${(n.pop ? 0.7 : 0.42 + lit * 0.45).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + lit * 1.2, 0, Math.PI * 2);
      ctx.fill();
      if (n.pop) {
        ctx.strokeStyle = `rgba(${br},${bg},${bb},${(0.38 + lit * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    for (const p of packets) {
      const l = links[p.link];
      const from = nodes[p.from];
      const to = nodes[l.a === p.from ? l.b : l.a];
      for (let i = 0; i < 4; i++) {
        const t = Math.max(0, p.t - i * 0.045);
        ctx.globalAlpha = (1 - i * 0.24) * 0.9;
        const s = 16 - i * 2.5;
        ctx.drawImage(
          signalGlow,
          from.x + (to.x - from.x) * t - s / 2,
          from.y + (to.y - from.y) * t - s / 2,
          s,
          s,
        );
      }
    }
    const now = performance.now();
    for (const r of ripples) {
      const age = (now - r.born) / 800;
      ctx.globalAlpha = (1 - age) * 0.55;
      ctx.strokeStyle = `rgb(${signal.join(',')})`;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 8 + age * 70, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Keep the drawing away from small text: erase it behind the elements marked data-net-quiet, with a soft edge.
    ctx.globalCompositeOperation = 'destination-out';
    for (const q of quiet) {
      for (const [grow, alpha] of [
        [10, 0.3],
        [5, 0.5],
        [0, 1],
      ] as const) {
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fillRect(q.x - grow, q.y - grow, q.width + grow * 2, q.height + grow * 2);
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function frame(time: number): void {
    raf = 0;
    if (!running()) return;
    raf = requestAnimationFrame(frame);
    if (time - last < FRAME_MS - 1) return;
    const dt = Math.min(0.05, (time - last) / 1000 || 0.016);
    last = time;
    step(dt, time);
    draw();
  }

  function running(): boolean {
    return !still.matches && !paused && !hidden && onScreen;
  }

  function sync(): void {
    if (running() && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!running() && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  /** One still redraw for the reduced-motion case (and while paused), after any input. */
  function redraw(): void {
    if (running()) return;
    step(0, performance.now());
    draw();
  }

  function local(e: PointerEvent): { x: number; y: number; inside: boolean } {
    const r = host.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    return { x, y, inside: x >= 0 && y >= 0 && x <= r.width && y <= r.height };
  }

  function press(x: number, y: number): void {
    let near = -1;
    let nearD = 220;
    nodes.forEach((n, i) => {
      const d = Math.hypot(n.x - x, n.y - y);
      if (d < nearD) {
        near = i;
        nearD = d;
      }
    });
    if (near < 0) return;
    const now = performance.now();
    const origin = nodes[near];
    origin.hold = now + 1400;
    for (const i of origin.links) {
      const l = links[i];
      nodes[l.a === near ? l.b : l.a].hold = now + (still.matches ? 1400 : 700);
    }
    if (still.matches) {
      window.clearTimeout(holdTimer);
      holdTimer = window.setTimeout(redraw, 1450);
      return;
    }
    ripples.push({ x: origin.x, y: origin.y, born: now });
    const launch = origin.links
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    for (const i of launch)
      packets.push({ link: i, from: near, t: 0, hops: 0, speed: 230 + Math.random() * 90 });
    for (const n of nodes) {
      const dx = n.x - x;
      const dy = n.y - y;
      const d = Math.hypot(dx, dy);
      if (d > 0 && d < NUDGE_RADIUS) {
        const k = ((1 - d / NUDGE_RADIUS) * 150) / d;
        n.vx += dx * k;
        n.vy += dy * k;
      }
    }
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      pointer = local(e);
      redraw();
    },
    { passive: true },
  );
  window.addEventListener(
    'pointerdown',
    (e) => {
      if (e.button !== 0 || (e.target instanceof Element && e.target.closest(INTERACTIVE))) return;
      const p = local(e);
      if (!p.inside) return;
      pointer = p;
      press(p.x, p.y);
      redraw();
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.inside = false;
    redraw();
  });
  document.addEventListener('visibilitychange', () => {
    hidden = document.hidden;
    sync();
  });
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  }).observe(host);
  new ResizeObserver(() => resize()).observe(host);
  new MutationObserver(() => {
    colors();
    draw();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  still.addEventListener('change', () => {
    toggle?.toggleAttribute('hidden', still.matches);
    sync();
    draw();
  });
  void document.fonts?.ready.then(() => {
    measure();
    draw();
  });

  if (toggle) {
    toggle.hidden = still.matches;
    toggle.addEventListener('click', () => {
      paused = !paused;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.setAttribute(
        'aria-label',
        (paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause) ?? '',
      );
      sync();
      draw();
    });
  }

  colors();
  resize();
  sync();
}
