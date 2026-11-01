// The billing scene: the payment methods the customer sees, Midtrans, an invoice, and the ledger of receipts.
//
// Unpaid for a few seconds, then a method lights and a pulse runs from it through Midtrans to the invoice, which
// flips to paid; a second pulse carries the receipt to the ledger, where it lands on top (the ledger only ever
// grows; the oldest receipt scrolls out of sight). Then the next invoice. Selecting a method pays the invoice at
// once with that method.
// Calm (reduced motion or the pause button): no loop and no pulses; selecting a method still flips the invoice,
// and selecting the method it was paid with flips it back. Reduced motion starts on the paid side.

import {
  calm,
  loop,
  onTheme,
  rgba,
  rgbVar,
  surface,
  type Job,
  type RGB,
  type Surface,
} from '../kit';
import { bend, join, pathOf, pointOn, type Path, type Pt } from '../path';

type Phase = 'unpaid' | 'paying' | 'paid';

interface Run {
  path: Path;
  d: number;
  done: () => void;
}

/** Seconds into the loop at which the pulse leaves a method, and at which the next invoice starts. */
const T = { pay: 3.2, next: 9.4 };
const SPEED = 480;
const TAIL = 46;

export default function mount(figure: HTMLElement): void {
  const flow = figure.querySelector<HTMLElement>('.flow');
  const canvas = figure.querySelector('canvas');
  const methodsBox = figure.querySelector<HTMLElement>('.methods');
  const hub = figure.querySelector<HTMLElement>('[data-hub]');
  const invoice = figure.querySelector<HTMLElement>('[data-invoice]');
  const ledger = figure.querySelector<HTMLElement>('[data-ledger]');
  const card = figure.querySelector<HTMLElement>('[data-card]');
  const front = figure.querySelector<HTMLElement>('[data-front]');
  const back = figure.querySelector<HTMLElement>('[data-back]');
  const ring = figure.querySelector<HTMLElement>('[data-ring]');
  const via = figure.querySelector<HTMLElement>('[data-via]');
  const status = figure.querySelector<HTMLElement>('[data-status]');
  const methods = [...figure.querySelectorAll<HTMLElement>('.method')];
  const receipts = [...figure.querySelectorAll<HTMLElement>('[data-receipt]')];
  if (!flow || !canvas || !methodsBox || !hub || !invoice || !ledger || !card || !front || !back)
    return;
  if (!ring || !via || !status || !methods.length) return;

  let phase: Phase = 'unpaid';
  let t = 0;
  let cycle = 0;
  /** The method the visitor chose, used by the next payment. */
  let chosen: number | null = null;
  /** The method of the payment in progress or just made. */
  let current = 0;
  /** The slot of the receipt on top of the stack. */
  let head = 0;
  let typed = false;
  let base: RGB = [31, 85, 214];
  let signal: RGB = [10, 134, 179];
  let toHub: Path[] = [];
  let hubToCard: Path = pathOf([]);
  let cardToLedger: Path = pathOf([]);
  let runs: Run[] = [];
  let job: Job | undefined;

  const found = surface(canvas, () => layout());
  if (!found) return;
  const view: Surface = found;
  const { ctx } = view;

  const label = (i: number): string => methods[i].dataset.label ?? '';

  function colors(): void {
    base = rgbVar('--net-rgb', base);
    signal = rgbVar('--net-signal-rgb', signal);
  }

  /** The pipes between the boxes, from where the boxes are now: sideways in a row, downward when stacked. */
  function layout(): void {
    const origin = canvas!.getBoundingClientRect();
    const at = (el: Element, fx: number, fy: number): Pt => {
      const r = el.getBoundingClientRect();
      return [r.left - origin.left + r.width * fx, r.top - origin.top + r.height * fy];
    };
    const row = hub!.getBoundingClientRect().left > methods[0].getBoundingClientRect().right;
    const firstReceipt = receipts[0];
    if (row) {
      toHub = methods.map((m) => bend(at(m, 1, 0.5), at(hub!, 0, 0.5)));
      hubToCard = pathOf([at(hub!, 1, 0.5), at(invoice!, 0, 0.5)]);
      cardToLedger = bend(at(invoice!, 1, 0.5), at(firstReceipt, 0, 0.5));
    } else {
      const trunk = pathOf([at(methodsBox!, 0.5, 1), at(hub!, 0.5, 0)]);
      toHub = methods.map(() => trunk);
      hubToCard = pathOf([at(hub!, 0.5, 1), at(invoice!, 0.5, 0)]);
      cardToLedger = pathOf([at(invoice!, 0.5, 1), at(ledger!, 0.5, 0)]);
    }
    redraw();
  }

  /** Plays a CSS animation again from its start: the class comes off, the layout is read, the class goes on. */
  function restart(el: HTMLElement, name = 'go'): void {
    el.classList.remove(name);
    void el.getBoundingClientRect();
    el.classList.add(name);
  }

  const hide = (el: HTMLElement, on: boolean): void =>
    on ? el.setAttribute('aria-hidden', 'true') : el.removeAttribute('aria-hidden');

  function flip(paid: boolean): void {
    card!.classList.toggle('paid', paid);
    hide(front!, paid);
    hide(back!, !paid);
    via!.textContent = label(current);
  }

  function addReceipt(): void {
    head = (head + receipts.length - 1) % receipts.length;
    receipts.forEach((r, i) => {
      r.dataset.pos = String((i - head + receipts.length) % receipts.length);
    });
    const top = receipts[head];
    top.querySelector('[data-receipt-label]')!.textContent = label(current);
    if (!calm()) restart(top, 'fresh');
  }

  function enter(next: Phase): void {
    phase = next;
    if (next === 'unpaid') {
      flip(false);
    } else if (next === 'paying') {
      current = chosen ?? cycle % methods.length;
      chosen = null;
      methods[current].classList.add('active');
      runs.push({ path: join(toHub[current], hubToCard), d: 0, done: () => enter('paid') });
    } else {
      for (const m of methods) m.classList.remove('active');
      flip(true);
      if (typed) status!.textContent = `${status!.dataset.prefix} ${label(current)}`;
      if (calm()) addReceipt();
      else {
        restart(ring!);
        runs.push({ path: cardToLedger, d: 0, done: addReceipt });
      }
    }
  }

  function tick(dt: number): void {
    if (!calm() && dt > 0) {
      t += dt;
      const finished: Run[] = [];
      runs = runs.filter((run) => {
        run.d += SPEED * dt;
        if (run.d < run.path.length) return true;
        finished.push(run);
        return false;
      });
      // after the list is replaced, so a run that starts another is kept
      for (const run of finished) run.done();
      if (t >= T.next) {
        t = 0;
        cycle += 1;
        enter('unpaid');
      } else if (phase === 'unpaid' && t >= T.pay) enter('paying');
    }
    draw();
  }

  function comet(run: Run): void {
    for (let k = 0; k < 8; k++) {
      const [x, y] = pointOn(run.path, run.d - (k * TAIL) / 8);
      ctx.fillStyle = rgba(signal, (1 - k / 8) * (k === 0 ? 1 : 0.7));
      ctx.beginPath();
      ctx.arc(x, y, 4.2 - k * 0.38, 0, Math.PI * 2);
      ctx.fill();
    }
    const [hx, hy] = pointOn(run.path, run.d);
    ctx.fillStyle = rgba(signal, 0.22);
    ctx.beginPath();
    ctx.arc(hx, hy, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  function draw(): void {
    const { w, h, dpr } = view;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.setLineDash([3, 6]);
    ctx.strokeStyle = rgba(base, 0.45);
    for (const path of [...toHub, hubToCard, cardToLedger]) {
      if (path.pts.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(path.pts[0][0], path.pts[0][1]);
      for (const [x, y] of path.pts.slice(1)) ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    for (const run of runs) comet(run);
  }

  /** One still frame after input while the loop is stopped; a running loop draws it anyway. */
  function redraw(): void {
    if (calm()) job?.redraw();
  }

  methods.forEach((chip, i) =>
    chip.addEventListener('click', () => {
      typed = true;
      if (calm()) {
        // no loop to follow: the invoice flips between paid with this method and unpaid
        if (phase === 'paid' && current === i) enter('unpaid');
        else {
          current = i;
          enter('paid');
        }
        return;
      }
      if (phase === 'paying') return;
      chosen = i;
      if (phase === 'paid') {
        enter('unpaid');
        t = T.pay - 0.9;
      } else t = T.pay;
    }),
  );

  colors();
  layout();
  if (calm()) {
    // the finished picture: paid with the first method, the stack showing the last payments
    receipts.forEach((r, i) => {
      r.querySelector('[data-receipt-label]')!.textContent = label(i);
    });
    phase = 'paid';
    current = 0;
    flip(true);
  }
  job = loop(figure, tick);
  onTheme(() => {
    colors();
    redraw();
  });
}
