// The ticket scene: one ticket against the two targets of its SLA tier, a ring counting the current target down.
//
// Two rounds alternate. In the first both targets are met: the ring counts down the first response, the agent
// answers, the ring counts down the resolution, the ticket is resolved. In the second the first response runs
// out: the ring empties in red, the ticket is marked "SLA breached" (the product's scheduled check does this),
// and the answer comes late. The times are example values, said so in the caption.
// Calm (reduced motion or the pause button): a still frame; reduced motion shows the resolved ticket.

import { calm, lerp, loop } from '../kit';

type State = 'first' | 'resolution' | 'breach' | 'done';

interface Beat {
  until: number;
  state: State;
  /** Share of the ring used up at the start and the end of the beat, and the seconds the full ring stands for. */
  from?: number;
  to?: number;
  total?: number;
}

const MET: Beat[] = [
  { until: 4.8, state: 'first', from: 0, to: 0.62, total: 300 },
  { until: 9.6, state: 'resolution', from: 0, to: 0.45, total: 240 },
  { until: 12.6, state: 'done' },
];
const LATE: Beat[] = [
  { until: 4.8, state: 'first', from: 0, to: 1, total: 300 },
  { until: 7.4, state: 'breach' },
  { until: 11.6, state: 'resolution', from: 0, to: 0.5, total: 240 },
  { until: 14.4, state: 'done' },
];
const CIRCUMFERENCE = 219.9;

export default function mount(figure: HTMLElement): void {
  const card = figure.querySelector<HTMLElement>('[data-ticket]');
  const arc = figure.querySelector<SVGCircleElement>('[data-arc]');
  const time = figure.querySelector<HTMLElement>('[data-time]');
  const status = figure.querySelector<HTMLElement>('[data-status]');
  const first = figure.querySelector<HTMLElement>('[data-target="first"]');
  const resolution = figure.querySelector<HTMLElement>('[data-target="resolution"]');
  if (!card || !arc || !time || !status || !first || !resolution) return;

  let round = 0;
  let t = calm() ? 11 : 0;
  let state: State | '' = '';
  let shown = '';

  const words: Record<State, string | undefined> = {
    first: status.dataset.open,
    resolution: status.dataset.responded,
    breach: status.dataset.breached,
    done: status.dataset.resolved,
  };

  /** Sets the one state class of a target; the other classes of the element, Astro's scope among them, stay. */
  function mark(el: HTMLElement, name: string): void {
    el.classList.remove('live', 'met', 'late');
    if (name) el.classList.add(name);
  }

  function apply(): void {
    const beats = round % 2 ? LATE : MET;
    const late = beats === LATE;
    let start = 0;
    let beat = beats[beats.length - 1];
    for (const b of beats) {
      if (t < b.until) {
        beat = b;
        break;
      }
      start = b.until;
    }
    const u = Math.min(1, (t - start) / (beat.until - start));
    // a breached or finished ticket shows the whole ring, in red or in the signal colour
    const used = beat.from === undefined ? 0 : lerp(beat.from, beat.to ?? 1, u);
    arc!.style.setProperty('--used', (used * CIRCUMFERENCE).toFixed(1));
    const left = Math.round((beat.total ?? 0) * (1 - used));
    const text = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    if (text !== shown) {
      shown = text;
      time!.textContent = text;
    }
    if (beat.state !== state) {
      state = beat.state;
      card!.dataset.state = state;
      status!.textContent = words[state] ?? '';
      mark(first!, state === 'first' ? 'live' : late ? 'late' : 'met');
      mark(
        resolution!,
        state === 'resolution' ? 'live' : state === 'done' ? (late ? 'late' : 'met') : '',
      );
    }
  }

  loop(figure, (dt) => {
    if (dt > 0) {
      t += dt;
      const beats = round % 2 ? LATE : MET;
      if (t >= beats[beats.length - 1].until) {
        t = 0;
        round += 1;
      }
    }
    apply();
  });
}
