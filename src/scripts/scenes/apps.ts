// The two phones of the apps section lean toward the pointer, a few degrees, and settle back when it leaves.
// Touch screens have no pointer to follow, so they keep the float alone. Calm (reduced motion or the pause button):
// the phones stay as they are.

import { calm, loop } from '../kit';

const MAX_X = 6;
const MAX_Y = 10;

export default function mount(el: HTMLElement): void {
  const tilt = el.querySelector<HTMLElement>('.tilt');
  const section = el.closest('section');
  if (!tilt || !section) return;

  let want = { x: 0, y: 0 };
  let now = { x: 0, y: 0 };

  section.addEventListener(
    'pointermove',
    (e) => {
      if (calm() || e.pointerType === 'touch') return;
      const box = el.getBoundingClientRect();
      want = {
        x: Math.max(-1, Math.min(1, ((e.clientY - box.top) / box.height - 0.5) * 2)),
        y: Math.max(-1, Math.min(1, ((e.clientX - box.left) / box.width - 0.5) * 2)),
      };
    },
    { passive: true },
  );
  section.addEventListener('pointerleave', () => {
    want = { x: 0, y: 0 };
  });

  loop(el, (dt) => {
    const k = Math.min(1, dt * 5);
    now = { x: now.x + (want.x - now.x) * k, y: now.y + (want.y - now.y) * k };
    tilt.style.setProperty('--rx', `${(-now.x * MAX_X).toFixed(2)}deg`);
    tilt.style.setProperty('--ry', `${(now.y * MAX_Y).toFixed(2)}deg`);
  });
}
