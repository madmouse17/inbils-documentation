// Paths for things that travel: a polyline with its length, the point at a distance along it, and a curve with a
// level (or plumb) start and end, sampled into a polyline, like a cable laid between two boxes.

import { clamp } from './kit';

export type Pt = [number, number];

export interface Path {
  pts: Pt[];
  length: number;
}

export function pathOf(pts: Pt[]): Path {
  let length = 0;
  for (let i = 1; i < pts.length; i++)
    length += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return { pts, length };
}

/** The point `d` px along the path, held to its ends. */
export function pointOn(path: Path, d: number): Pt {
  const { pts } = path;
  let left = clamp(d, 0, path.length);
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (left <= seg || i === pts.length - 1) {
      const k = seg ? left / seg : 0;
      return [
        pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k,
        pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k,
      ];
    }
    left -= seg;
  }
  return pts[pts.length - 1];
}

/** A cubic curve from `a` to `b` that leaves and arrives level, or plumb when `vertical`. */
export function bend(a: Pt, b: Pt, vertical = false, steps = 28): Path {
  const mid = vertical ? (a[1] + b[1]) / 2 : (a[0] + b[0]) / 2;
  const c1: Pt = vertical ? [a[0], mid] : [mid, a[1]];
  const c2: Pt = vertical ? [b[0], mid] : [mid, b[1]];
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const [k0, k1, k2, k3] = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    pts.push([
      k0 * a[0] + k1 * c1[0] + k2 * c2[0] + k3 * b[0],
      k0 * a[1] + k1 * c1[1] + k2 * c2[1] + k3 * b[1],
    ]);
  }
  return pathOf(pts);
}

/** Joins paths end to end into one. */
export const join = (...paths: Path[]): Path => pathOf(paths.flatMap((p) => p.pts));
