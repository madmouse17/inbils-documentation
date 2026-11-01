// The router scene of the network section: how a MikroTik router serves its subscribers and asks RADIUS first.
//
// - Six subscribers hang off six ports. PPPoE sessions flow as packets from the port down its cable to the
//   subscriber and back; the activity LED of a port blinks when one of its packets leaves.
// - Pointing at a port (or moving the focus to it with the arrow keys) shows its name and its sessions; the
//   uplink says where it leads.
// - Selecting a subscriber isolates it, as the product does for an overdue invoice: RADIUS sends a CoA
//   Disconnect-Request down the uplink, the cable turns red and dashed, the word "isolir" appears and the port's
//   session count drops by one. Selecting it again restores it (Access-Accept).
// - Now and then the router asks RADIUS to authenticate a session (Access-Request, then Access-Accept).
// - Calm (reduced motion or the pause button): no packets, no pulses; hover, focus and selection still work.
//
// The case, the houses and the RADIUS rack are server-rendered (home/Network.astro, lib/router-art.ts); this file
// draws the cables and the traffic on the canvas above them and switches classes.

import {
  calm,
  clamp,
  loop,
  onTheme,
  rgba,
  rgbVar,
  surface,
  type Job,
  type RGB,
  type Surface,
} from '../kit';

type Pt = [number, number];
type Curve = [Pt, Pt, Pt, Pt];

interface Sub {
  button: HTMLElement;
  /** Index of the port that feeds it. */
  port: number;
  isolated: boolean;
  /** Seconds until the next packet down and up. */
  down: number;
  up: number;
  cable: Curve;
}

interface Packet {
  sub: number;
  up: boolean;
  /** Progress along the way it travels, 0 to 1. */
  t: number;
  speed: number;
}

type Message = 'Access-Request' | 'Access-Accept' | 'CoA Disconnect';

interface Pulse {
  message: Message;
  /** True when it travels from the router to RADIUS. */
  toRadius: boolean;
  t: number;
}

/** Sessions on each port when nothing is isolated: made-up example values, said so in the caption. */
const SESSIONS = [0, 42, 37, 51, 29, 44, 33, 0];
const UPLINK = 'sfp';
const empty = (): Curve => [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

function at(c: Curve, t: number): Pt {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [
    k[0] * c[0][0] + k[1] * c[1][0] + k[2] * c[2][0] + k[3] * c[3][0],
    k[0] * c[0][1] + k[1] * c[1][1] + k[2] * c[2][1] + k[3] * c[3][1],
  ];
}

/** Roving tabindex: one tab stop for the group, arrow keys move between its buttons. */
function roving(items: HTMLElement[], onMove: (button: HTMLElement) => void): void {
  items.forEach((item, i) => {
    item.addEventListener('keydown', (e) => {
      const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
      const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
      const edge = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : -1;
      if (!forward && !back && edge < 0) return;
      e.preventDefault();
      const next = edge >= 0 ? edge : (i + (forward ? 1 : -1) + items.length) % items.length;
      for (const other of items) other.tabIndex = -1;
      items[next].tabIndex = 0;
      items[next].focus();
      onMove(items[next]);
    });
  });
}

export default function mount(figure: HTMLElement): void {
  const stage = figure.querySelector<HTMLElement>('.scene-stage');
  const canvas = figure.querySelector('canvas');
  const tip = figure.querySelector<HTMLElement>('[data-tip]');
  const label = figure.querySelector<HTMLElement>('[data-msg]');
  const radius = figure.querySelector<HTMLElement>('[data-radius]');
  const caseBox = figure.querySelector<HTMLElement>('.router');
  const portButtons = [...figure.querySelectorAll<HTMLElement>('[data-port]')];
  const subButtons = [...figure.querySelectorAll<HTMLElement>('[data-sub]')];
  const slots = [...figure.querySelectorAll<SVGGElement>('[data-slot]')];
  if (!stage || !canvas || !tip || !label || !radius || !caseBox) return;

  let base: RGB = [31, 85, 214];
  let signal: RGB = [10, 134, 179];
  let warn: RGB = [200, 30, 45];
  let packets: Packet[] = [];
  let pulses: Pulse[] = [];
  let uplink = empty();
  let authIn = 3.5;
  let hot: number | typeof UPLINK | null = null;
  let tipTimer = 0;
  let labelTimer = 0;
  let job: Job | undefined;
  const blink = new Map<number, number>();
  const subs: Sub[] = subButtons.map((button) => ({
    button,
    port: Number(button.dataset.link),
    isolated: false,
    down: Math.random() * 1.2,
    up: 0.6 + Math.random() * 2,
    cable: empty(),
  }));

  const slotOf = (port: number | typeof UPLINK): SVGGElement | undefined =>
    slots.find((s) => s.dataset.slot === String(port));
  // Ports that carry a subscriber show a steady link LED.
  for (const s of subs) slotOf(s.port)?.querySelector('.link')?.classList.add('on');

  const found = surface(canvas, () => layout());
  if (!found) return;
  const view: Surface = found;
  const { ctx } = view;

  function colors(): void {
    base = rgbVar('--net-rgb', base);
    signal = rgbVar('--net-signal-rgb', signal);
    warn = rgbVar('--warn-rgb', warn);
  }

  /** Stage coordinates of a point inside an element's box: `ax` and `ay` are shares of its width and height. */
  function anchor(el: Element, ax = 0.5, ay = 0.5): Pt {
    const r = el.getBoundingClientRect();
    const s = stage!.getBoundingClientRect();
    return [r.left - s.left + r.width * ax, r.top - s.top + r.height * ay];
  }

  function layout(): void {
    for (const s of subs) {
      const from = anchor(portButtons[s.port], 0.5, 0.78);
      const house = s.button.querySelector('svg');
      const to = anchor(house ?? s.button, 0.5, 0.2);
      const reach = Math.max(36, (to[1] - from[1]) * 0.55);
      s.cable = [from, [from[0], from[1] + reach], [to[0], to[1] - reach], to];
    }
    const sfp = portButtons.find((b) => b.dataset.port === UPLINK);
    if (sfp) {
      const from = anchor(sfp, 0.5, 0.78);
      const to = anchor(radius!.querySelector('svg') ?? radius!, 0.5, 0.86);
      uplink = [from, [from[0] + 36, from[1] + 56], [to[0] - 10, to[1] + 70], to];
      const [mx, my] = at(uplink, 0.55);
      label!.style.left = `${mx}px`;
      label!.style.top = `${my}px`;
    }
    redraw();
  }

  const sessionsOn = (port: number): number =>
    SESSIONS[port] - subs.filter((s) => s.port === port && s.isolated).length;

  function showTip(port: number | typeof UPLINK | null): void {
    hot = port;
    for (const s of slots) s.classList.toggle('hot', port !== null && s === slotOf(port));
    if (port === null) {
      tip!.hidden = true;
      return;
    }
    const d = tip!.dataset;
    let text: string;
    if (port === UPLINK) text = `sfp1: ${d.uplink}`;
    else if (!SESSIONS[port]) text = `ether${port + 1}: ${d.free}`;
    else {
      const isolated = subs.filter((s) => s.port === port && s.isolated).length;
      const tail = isolated ? `, ${isolated} ${d.isolir}` : '';
      text = `ether${port + 1}: ${sessionsOn(port)} ${d.sessions}${tail}`;
    }
    tip!.textContent = text;
    tip!.hidden = false;
    const button = portButtons.find((b) => b.dataset.port === String(port));
    if (!button) return;
    const [x, y] = anchor(button);
    const half = tip!.offsetWidth / 2 + 6;
    tip!.style.left = `${clamp(x, half, view.w - half)}px`;
    tip!.style.top = `${y}px`;
  }

  function say(message: Message): void {
    label!.textContent = message;
    label!.classList.add('show');
    window.clearTimeout(labelTimer);
    labelTimer = window.setTimeout(() => label!.classList.remove('show'), 1800);
  }

  function send(message: Message, toRadius: boolean): void {
    say(message);
    if (!calm()) pulses.push({ message, toRadius, t: 0 });
  }

  function toggle(i: number): void {
    const s = subs[i];
    s.isolated = !s.isolated;
    s.button.setAttribute('aria-pressed', String(s.isolated));
    packets = packets.filter((p) => p.sub !== i);
    send(s.isolated ? 'CoA Disconnect' : 'Access-Accept', false);
    // let the message be read before the next routine one replaces it
    authIn = Math.max(authIn, 2.6);
    if (hot !== null) showTip(hot);
    redraw();
  }

  function launch(i: number, up: boolean, now: number): void {
    packets.push({
      sub: i,
      up,
      t: 0,
      speed: up ? 0.55 + Math.random() * 0.2 : 0.7 + Math.random() * 0.3,
    });
    if (!up) blink.set(subs[i].port, now + 110);
  }

  function tick(dt: number, now: number): void {
    if (!calm() && dt > 0) {
      subs.forEach((s, i) => {
        if (s.isolated) return;
        s.down -= dt;
        s.up -= dt;
        if (s.down <= 0) {
          launch(i, false, now);
          s.down = 0.5 + Math.random() * 0.9;
        }
        if (s.up <= 0) {
          launch(i, true, now);
          s.up = 1.4 + Math.random() * 2;
        }
      });
      packets = packets.filter((p) => {
        p.t += p.speed * dt;
        if (p.t >= 1 && p.up) blink.set(subs[p.sub].port, now + 110);
        return p.t < 1;
      });
      pulses = pulses.filter((p) => (p.t += dt * 1.5) < 1);
      authIn -= dt;
      if (authIn <= 0) {
        send('Access-Request', true);
        window.setTimeout(() => send('Access-Accept', false), 700);
        authIn = 6 + Math.random() * 3;
      }
    }
    for (const [port, until] of blink) {
      slotOf(port)
        ?.querySelector('.act')
        ?.classList.toggle('on', now < until);
      if (now >= until) blink.delete(port);
    }
    draw();
  }

  function dot(x: number, y: number, r: number, color: RGB, alpha: number): void {
    ctx.fillStyle = rgba(color, alpha);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /** A bright head and a short fading trail on a curve; `dir` is +1 when it moves toward the curve's end. */
  function comet(c: Curve, head: number, dir: 1 | -1, r: number, color: RGB, alpha: number): void {
    for (let k = 0; k < 4; k++) {
      const u = head - dir * k * 0.035;
      if (u < 0 || u > 1) continue;
      const [x, y] = at(c, u);
      if (k === 0) dot(x, y, r * 2.4, color, alpha * 0.2);
      dot(x, y, r * (1 - k * 0.18), color, alpha * (1 - k * 0.26));
    }
  }

  function stroke(c: Curve): void {
    ctx.beginPath();
    ctx.moveTo(c[0][0], c[0][1]);
    ctx.bezierCurveTo(c[1][0], c[1][1], c[2][0], c[2][1], c[3][0], c[3][1]);
    ctx.stroke();
  }

  function draw(): void {
    const { w, h, dpr } = view;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';

    ctx.strokeStyle = rgba(base, 0.5);
    stroke(uplink);
    for (const s of subs) {
      ctx.setLineDash(s.isolated ? [5, 5] : []);
      ctx.strokeStyle = s.isolated ? rgba(warn, 0.85) : rgba(base, 0.55);
      stroke(s.cable);
    }
    ctx.setLineDash([]);

    for (const p of packets) {
      const cable = subs[p.sub].cable;
      if (p.up) comet(cable, 1 - p.t, -1, 2, base, 0.8);
      else comet(cable, p.t, 1, 2.6, signal, 0.95);
    }
    for (const p of pulses) {
      const color =
        p.message === 'CoA Disconnect' ? warn : p.message === 'Access-Accept' ? signal : base;
      if (p.toRadius) comet(uplink, p.t, 1, 3.2, color, 1);
      else comet(uplink, 1 - p.t, -1, 3.2, color, 1);
    }
  }

  /** One still frame after input while the loop is stopped; a running loop draws it anyway. */
  function redraw(): void {
    if (calm()) job?.redraw();
  }

  subButtons.forEach((b, i) => b.addEventListener('click', () => toggle(i)));
  roving(subButtons, () => undefined);
  roving(portButtons, (b) => showTip(portOf(b)));

  function portOf(button: HTMLElement): number | typeof UPLINK {
    return button.dataset.port === UPLINK ? UPLINK : Number(button.dataset.port);
  }
  for (const b of portButtons) {
    b.addEventListener('focus', () => showTip(portOf(b)));
    b.addEventListener('blur', () => showTip(null));
  }

  /** The port nearest to a pointer over the case, if it is within reach of a finger. */
  function nearest(e: PointerEvent): number | typeof UPLINK | null {
    let best: number | typeof UPLINK | null = null;
    let bestD = e.pointerType === 'touch' ? 34 : 24;
    for (const b of portButtons) {
      const r = b.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (d < bestD) {
        best = portOf(b);
        bestD = d;
      }
    }
    return best;
  }
  caseBox.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'touch') showTip(nearest(e));
  });
  caseBox.addEventListener('pointerleave', () => {
    if (!document.activeElement?.matches('[data-port]')) showTip(null);
  });
  caseBox.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    showTip(nearest(e));
    window.clearTimeout(tipTimer);
    tipTimer = window.setTimeout(() => showTip(null), 3000);
  });

  job = loop(figure, tick);
  colors();
  layout();
  onTheme(() => {
    colors();
    redraw();
  });
  void document.fonts?.ready.then(() => layout());
}
