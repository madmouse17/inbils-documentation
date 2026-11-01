// Isometric boxes and houses on a canvas, in the same 30 degree view as the router drawing (lib/router-art.ts),
// so the scenes made of equipment and houses look like one family.

import type { Pt } from './path';

export interface Tint {
  top: string;
  left: string;
  right: string;
  edge: string;
}

/** The slope of an isometric edge: tan 30 degrees. */
export const SLOPE = 0.577;

function face(ctx: CanvasRenderingContext2D, pts: Pt[], fill: string, edge: string): void {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = edge;
  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';
  ctx.stroke();
}

/** A box standing on the ground point (x, y): `r` is half the width of its footprint, `h` its height. */
export function isoBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  h: number,
  t: Tint,
): void {
  const d = r * SLOPE;
  face(
    ctx,
    [
      [x - r, y - h],
      [x, y - h + d],
      [x, y + d],
      [x - r, y],
    ],
    t.left,
    t.edge,
  );
  face(
    ctx,
    [
      [x + r, y - h],
      [x, y - h + d],
      [x, y + d],
      [x + r, y],
    ],
    t.right,
    t.edge,
  );
  face(
    ctx,
    [
      [x, y - h - d],
      [x + r, y - h],
      [x, y - h + d],
      [x - r, y - h],
    ],
    t.top,
    t.edge,
  );
}

/** A house: walls `h` high under a pyramid roof `roof` high. `roofLeft` and `roofRight` are the two roof fills. */
export function isoHouse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  h: number,
  roof: number,
  t: Pick<Tint, 'left' | 'right' | 'edge'>,
  roofLeft: string,
  roofRight: string,
): void {
  const d = r * SLOPE;
  face(
    ctx,
    [
      [x - r, y - h],
      [x, y - h + d],
      [x, y + d],
      [x - r, y],
    ],
    t.left,
    t.edge,
  );
  face(
    ctx,
    [
      [x + r, y - h],
      [x, y - h + d],
      [x, y + d],
      [x + r, y],
    ],
    t.right,
    t.edge,
  );
  const apex: Pt = [x, y - h - roof];
  face(ctx, [[x - r, y - h], [x, y - h + d], apex], roofLeft, t.edge);
  face(ctx, [[x + r, y - h], [x, y - h + d], apex], roofRight, t.edge);
}

/** A point on the right face of a box (see `isoBox`): `s` runs 0 to 1 from the front edge to the right edge. */
export const rightFace = (x: number, y: number, r: number, s: number, z: number): Pt => [
  x + r * s,
  y + r * SLOPE * (1 - s) - z,
];

/** A point on the left face: `s` runs 0 to 1 from the left edge to the front edge. */
export const leftFace = (x: number, y: number, r: number, s: number, z: number): Pt => [
  x - r + r * s,
  y + r * SLOPE * s - z,
];
