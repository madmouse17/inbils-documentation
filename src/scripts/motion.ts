// The landing page's motion entry. Every moving part is marked `data-scene="name"` in the markup and lives in
// src/scripts/scenes/name.ts. This file keeps the one IntersectionObserver that says which scenes are on screen
// (kit.ts runs only those), loads a scene's code the first time its box comes near the viewport, and wires the
// pause button in the header.

import { isPaused, setPaused, setSeen } from './kit';

type Mount = (el: HTMLElement) => void;

const scenes = import.meta.glob<{ default: Mount }>('./scenes/*.ts');
const mounted = new WeakSet<Element>();

/** After the first paint: a scene never competes with the headline or with input for the main thread. */
const idle = (fn: () => void): void =>
  'requestIdleCallback' in window
    ? void window.requestIdleCallback(fn, { timeout: 1200 })
    : void setTimeout(fn, 150);

async function mount(el: HTMLElement): Promise<void> {
  const load = scenes[`./scenes/${el.dataset.scene}.ts`];
  if (load) (await load()).default(el);
}

const watcher = new IntersectionObserver(
  (list) => {
    for (const { target, isIntersecting } of list) {
      setSeen(target, isIntersecting);
      if (isIntersecting && !mounted.has(target) && target instanceof HTMLElement) {
        mounted.add(target);
        idle(() => void mount(target).catch((error: unknown) => console.error(error)));
      }
    }
  },
  { rootMargin: '160px 0px' },
);

for (const el of document.querySelectorAll('[data-scene]')) watcher.observe(el);

const buttons = document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]');
for (const button of buttons) {
  button.setAttribute('aria-pressed', String(isPaused()));
  button.addEventListener('click', () => {
    setPaused(!isPaused());
    for (const other of buttons) other.setAttribute('aria-pressed', String(isPaused()));
  });
}

// Tells the inline guard in HomePage.astro that this script runs, so the hidden first state of the reveals holds.
document.documentElement.dataset.landing = 'ready';
