// The street map of the field scene, drawn at build time: city blocks between a few streets, one park, the
// technician's route from the office to the customer's door and the radius around the customer inside which a
// visit may start. A seeded generator, so every build draws the same town.

import { rng } from './rng';

export const MAP = { w: 400, h: 320 };

const STREETS_X = [60, 150, 250, 340];
const STREETS_Y = [40, 120, 200, 280];
const ROAD = 12;
const GAP = ROAD / 2 + 3;

export interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  park: boolean;
}

export interface MapArt {
  blocks: Block[];
  trees: [number, number][];
  roads: string[];
  route: string;
  office: [number, number];
  customer: [number, number];
  /** Radius of the circle around the customer, in map units. */
  radius: number;
}

const OFFICE: [number, number] = [60, 280];
const CUSTOMER: [number, number] = [292, 86];
const ROUTE: [number, number][] = [
  [60, 268],
  [60, 200],
  [250, 200],
  [250, 112],
  [264, 96],
];

export function mapArt(): MapArt {
  const rnd = rng(31);
  const xs = [-20, ...STREETS_X, MAP.w + 20];
  const ys = [-20, ...STREETS_Y, MAP.h + 20];
  const blocks: Block[] = [];
  const trees: [number, number][] = [];
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < ys.length - 1; j++) {
      const x0 = xs[i] + GAP;
      const y0 = ys[j] + GAP;
      const w = xs[i + 1] - xs[i] - 2 * GAP;
      const h = ys[j + 1] - ys[j] - 2 * GAP;
      const park = i === 2 && j === 3;
      // the customer's block stays whole, so the house sits on a real block; the park too
      const whole = park || (i === 3 && j === 1);
      if (park) {
        for (let t = 0; t < 9; t++)
          trees.push([x0 + 8 + rnd() * (w - 16), y0 + 8 + rnd() * (h - 16)]);
      }
      if (whole || w < 70 || rnd() < 0.35) {
        blocks.push({ x: x0, y: y0, w, h, park });
        continue;
      }
      // otherwise split the block into two lots, across its longer side
      const cut = 0.38 + rnd() * 0.24;
      if (w >= h) {
        const a = Math.round(w * cut) - 2;
        blocks.push(
          { x: x0, y: y0, w: a, h, park: false },
          { x: x0 + a + 4, y: y0, w: w - a - 4, h, park: false },
        );
      } else {
        const a = Math.round(h * cut) - 2;
        blocks.push(
          { x: x0, y: y0, w, h: a, park: false },
          { x: x0, y: y0 + a + 4, w, h: h - a - 4, park: false },
        );
      }
    }
  }
  const roads = [
    ...STREETS_X.map((x) => `M${x},-20V${MAP.h + 20}`),
    ...STREETS_Y.map((y) => `M-20,${y}H${MAP.w + 20}`),
  ];
  return {
    blocks,
    trees,
    roads,
    route: `M${ROUTE.map(([x, y]) => `${x},${y}`).join('L')}`,
    office: OFFICE,
    customer: CUSTOMER,
    radius: 64,
  };
}
