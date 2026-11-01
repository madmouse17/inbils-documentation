// The field scene: one work order, from the office to the customer's door, on a street map.
//
// Assigned, then on the way (the pin follows the route), then working (the pin is inside the circle the office
// sets around the customer, so the visit may start: a ripple marks the check-in and the photo evidence appears),
// then done (the office approves and the customer's house turns active). Then the scene fades and starts over.
// The four steps are the ones the technician app shows. Calm (reduced motion or the pause button): a still frame.
// Reduced motion shows the finished visit; the pause button keeps the frame it stopped on.

import { calm, loop, smooth } from '../kit';

/** Seconds into the loop at which each thing happens. */
const T = { go: 1.1, arrive: 5.2, evidence: 5.6, second: 6.3, approve: 7.9, leave: 11.4, end: 12 };

export default function mount(figure: HTMLElement): void {
  const trail = figure.querySelector<SVGPathElement>('[data-trail]');
  const pin = figure.querySelector<SVGGElement>('[data-pin]');
  const fence = figure.querySelector<SVGCircleElement>('[data-fence]');
  const house = figure.querySelector<SVGRectElement>('[data-house]');
  const evidence = figure.querySelector<HTMLElement>('[data-evidence]');
  const ripples = [...figure.querySelectorAll<SVGCircleElement>('[data-ripple]')];
  const steps = [...figure.querySelectorAll<HTMLElement>('[data-step]')];
  if (!trail || !pin || !fence || !house || !evidence) return;

  const total = trail.getTotalLength();
  const center = [Number(fence.getAttribute('cx')), Number(fence.getAttribute('cy'))];
  const radius = Number(fence.getAttribute('r'));
  trail.style.strokeDasharray = String(total);

  let t = calm() ? T.approve + 0.4 : 0;
  let stage = -1;
  let inside = false;
  let arrived = false;
  let leaving = false;

  function apply(): void {
    const p = smooth((t - T.go) / (T.arrive - T.go));
    const at = trail!.getPointAtLength(total * p);
    pin!.setAttribute('transform', `translate(${at.x.toFixed(1)} ${at.y.toFixed(1)})`);
    trail!.style.strokeDashoffset = String(total * (1 - p));

    const now = Math.hypot(at.x - center[0], at.y - center[1]) < radius && t >= T.go;
    if (now !== inside) {
      inside = now;
      fence!.classList.toggle('in', now);
    }
    const next = t < T.go ? 0 : t < T.arrive ? 1 : t < T.approve ? 2 : 3;
    if (next !== stage) {
      stage = next;
      steps.forEach((step, i) => {
        step.classList.toggle('past', i < next);
        step.classList.toggle('now', i === next);
        if (i === next) step.setAttribute('aria-current', 'step');
        else step.removeAttribute('aria-current');
      });
      house!.classList.toggle('on', next === 3);
    }
    evidence!.classList.toggle('in', t >= T.evidence);
    evidence!.classList.toggle('two', t >= T.second);
    evidence!.classList.toggle('ok', t >= T.approve);

    const here = t >= T.arrive;
    if (here !== arrived) {
      arrived = here;
      for (const r of ripples) {
        r.classList.remove('go');
        // restarts the CSS animation when the loop comes round again
        void r.getBoundingClientRect();
        if (here && !calm()) r.classList.add('go');
      }
    }
    const fade = t >= T.leave;
    if (fade !== leaving) {
      leaving = fade;
      figure.classList.toggle('leaving', fade);
    }
  }

  loop(figure, (dt) => {
    if (dt > 0) {
      t += dt;
      if (t >= T.end) t = 0;
    }
    apply();
  });
}
