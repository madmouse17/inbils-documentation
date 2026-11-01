// What every moving part of the landing page shares: one frame loop, the record of what is on screen and the
// "calm" switch. A scene registers a tick with `loop()` and never owns a requestAnimationFrame, so ten scenes cost
// one loop. The loop does not run at all while the tab is hidden, while nothing is on screen, when the visitor
// asked the system for reduced motion or after the visitor pressed the pause button in the header.
//
// While calm, a scene on screen is drawn once, as a still frame (`tick(0, now)`), and redraws itself on input.

export type Tick = (dt: number, now: number) => void;
export type RGB = [number, number, number];

interface Entry {
  tick: Tick;
  seen: boolean;
  stilled: boolean;
}

/** Ten milliseconds: caps the loop near 70 frames a second on 120 and 144 Hz screens and runs 60 and 90 Hz in full. */
const MIN_FRAME_MS = 10;

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;
const entries = new Map<Element, Entry>();
const onScreen = new WeakSet<Element>();
const calmListeners = new Set<() => void>();
const themeListeners = new Set<() => void>();
let paused = root.dataset.motion === 'off';
let raf = 0;
let last = 0;

/** True when nothing may move by itself: reduced motion was requested or the visitor paused the page. */
export const calm = (): boolean => reduced.matches || paused;
export const isPaused = (): boolean => paused;
/** Runs `fn` when calm turns on or off. */
export const onCalm = (fn: () => void): void => void calmListeners.add(fn);
/** Runs `fn` after the theme switch, when the CSS variables hold the other palette. */
export const onTheme = (fn: () => void): void => void themeListeners.add(fn);

function running(): boolean {
  if (calm() || document.hidden) return false;
  for (const e of entries.values()) if (e.seen) return true;
  return false;
}

function frame(time: number): void {
  raf = 0;
  if (!running()) return;
  raf = requestAnimationFrame(frame);
  if (time - last < MIN_FRAME_MS) return;
  const dt = Math.min(0.05, (time - last) / 1000);
  last = time;
  for (const e of entries.values()) if (e.seen) e.tick(dt, time);
}

function sync(): void {
  const run = running();
  if (run && !raf) {
    last = performance.now();
    raf = requestAnimationFrame(frame);
  } else if (!run && raf) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
  const still = calm();
  for (const e of entries.values()) {
    if (still && e.seen && !e.stilled) e.tick(0, performance.now());
    e.stilled = still && e.seen;
  }
}

function changed(): void {
  sync();
  calmListeners.forEach((fn) => fn());
}

export interface Job {
  /** One frame without advancing time: for input while the loop is stopped, and after a resize. */
  redraw(): void;
}

/** Registers a scene's frame function. `el` is the element whose visibility gates it (see `setSeen`). */
export function loop(el: Element, tick: Tick): Job {
  entries.set(el, { tick, seen: onScreen.has(el), stilled: false });
  sync();
  return { redraw: () => tick(0, performance.now()) };
}

/** Called by the page's one IntersectionObserver. `is-live` lets CSS keyframes run only while a scene is on screen. */
export function setSeen(el: Element, on: boolean): void {
  if (on) onScreen.add(el);
  else onScreen.delete(el);
  el.classList.toggle('is-live', on);
  const entry = entries.get(el);
  if (entry) entry.seen = on;
  sync();
}

const STORE = 'inbils-motion';

export function setPaused(on: boolean): void {
  paused = on;
  root.dataset.motion = on ? 'off' : 'on';
  try {
    localStorage.setItem(STORE, on ? 'off' : 'on');
  } catch {
    // Storage can be blocked; the choice then lasts for this page view.
  }
  changed();
}

reduced.addEventListener('change', changed);
document.addEventListener('visibilitychange', sync);
new MutationObserver(() => themeListeners.forEach((fn) => fn())).observe(root, {
  attributes: true,
  attributeFilter: ['data-theme'],
});

export const clamp = (v: number, lo = 0, hi = 1): number => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
/** 0 to 1 with a soft start and end. */
export const smooth = (t: number): number => {
  const k = clamp(t);
  return k * k * (3 - 2 * k);
};

export { rng } from '../lib/rng';

const style = getComputedStyle(root);

/** A CSS variable as written, for fills that need no alpha (`#fff`, `rgb(...)`). */
export const cssVar = (name: string): string => style.getPropertyValue(name).trim();

/** A CSS variable written as `r g b` (see tokens.css), so the canvas can set its own alpha. */
export function rgbVar(name: string, fallback: RGB): RGB {
  const parts = cssVar(name).split(/\s+/).map(Number);
  return parts.length === 3 && parts.every(Number.isFinite)
    ? [parts[0], parts[1], parts[2]]
    : fallback;
}

export const rgba = (c: RGB, a: number): string => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

/** The size and the context of a canvas, kept in step with its box and the screen's pixel ratio. */
export interface Surface {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  dpr: number;
}

/** Sizes `canvas` to its CSS box and calls `onChange` after every resize. Returns null without a 2D context. */
export function surface(
  canvas: HTMLCanvasElement,
  onChange: (s: Surface) => void,
  maxDpr = 2,
): Surface | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const s: Surface = { ctx, w: 0, h: 0, dpr: 1 };
  const fit = (): void => {
    // clientWidth ignores CSS transforms, so a canvas inside a tilted scene keeps its layout size.
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(maxDpr, window.devicePixelRatio || 1);
    if (w === s.w && h === s.h && dpr === s.dpr) return;
    s.w = w;
    s.h = h;
    s.dpr = dpr;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    onChange(s);
  };
  new ResizeObserver(fit).observe(canvas);
  fit();
  return s;
}
