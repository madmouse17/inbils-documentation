// The MikroTik-style router of the network scene, drawn at build time as isometric polygons: a flat metal case,
// eight RJ45 ports with two LEDs each, an SFP cage for the uplink and vents on the lid. Nothing is computed in the
// browser: the page ships the finished SVG, and the scene script only switches classes on the LEDs.
//
// World axes: x along the long side, y into the depth, z up. The projection is the usual 30 degree isometric one.

const UNIT = 20;
const COS = 0.866 * UNIT;
const SIN = 0.5 * UNIT;

/** Case size in world units. */
const L = 11.2;
const D = 4.2;
const H = 1.5;
const PAD = 26;

const project = (x: number, y: number, z: number): [number, number] => [
  PAD + D * COS + (x - y) * COS,
  PAD + H * UNIT + (x + y) * SIN - z * UNIT,
];

const WIDTH = Math.round(PAD * 2 + (L + D) * COS);
const HEIGHT = Math.round(PAD * 2 + H * UNIT + (L + D) * SIN);

const points = (list: [number, number, number][]): string =>
  list
    .map(([x, y, z]) =>
      project(x, y, z)
        .map((v) => v.toFixed(1))
        .join(','),
    )
    .join(' ');

/** A rectangle on the front face (the plane y = D), from x0 to x1 and z0 to z1. */
const front = (x0: number, x1: number, z0: number, z1: number): string =>
  points([
    [x0, D, z0],
    [x1, D, z0],
    [x1, D, z1],
    [x0, D, z1],
  ]);

/** A rectangle on the lid (the plane z = H). */
const lid = (x0: number, x1: number, y0: number, y1: number): string =>
  points([
    [x0, y0, H],
    [x1, y0, H],
    [x1, y1, H],
    [x0, y1, H],
  ]);

export const PORT_COUNT = 8;

export interface Port {
  /** Centre of the socket, as a share of the picture's width and height (for the overlay buttons). */
  left: number;
  top: number;
  socket: string;
  bezel: string;
  link: string;
  act: string;
}

const PITCH = 0.95;
const FIRST = 0.7;

function port(index: number): Port {
  const x0 = FIRST + index * PITCH;
  const x1 = x0 + 0.72;
  const [cx, cy] = project((x0 + x1) / 2, D, 0.65);
  return {
    left: (cx / WIDTH) * 100,
    top: (cy / HEIGHT) * 100,
    socket: front(x0, x1, 0.35, 0.95),
    bezel: front(x0 - 0.07, x1 + 0.07, 0.28, 1.02),
    link: front(x0 + 0.07, x0 + 0.21, 1.14, 1.26),
    act: front(x1 - 0.21, x1 - 0.07, 1.14, 1.26),
  };
}

export interface RouterArt {
  viewBox: string;
  ratio: string;
  shadow: string;
  top: string;
  front: string;
  side: string;
  plate: string;
  vents: string[];
  ports: Port[];
  sfp: { left: number; top: number; cage: string; hole: string; led: string };
}

export function routerArt(): RouterArt {
  const ports = Array.from({ length: PORT_COUNT }, (_, i) => port(i));
  const sfpX0 = 9.05;
  const sfpX1 = 10.55;
  const [sx, sy] = project((sfpX0 + sfpX1) / 2, D, 0.65);
  return {
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    ratio: `${WIDTH} / ${HEIGHT}`,
    shadow: points([
      [-0.7, -0.3, 0],
      [L + 0.5, -0.3, 0],
      [L + 0.5, D + 1.0, 0],
      [-0.7, D + 1.0, 0],
    ]),
    top: points([
      [0, 0, H],
      [L, 0, H],
      [L, D, H],
      [0, D, H],
    ]),
    front: points([
      [0, D, 0],
      [L, D, 0],
      [L, D, H],
      [0, D, H],
    ]),
    side: points([
      [L, 0, 0],
      [L, D, 0],
      [L, D, H],
      [L, 0, H],
    ]),
    plate: lid(0.8, 5.4, 0.8, 3.1),
    vents: Array.from({ length: 5 }, (_, i) => lid(6.6, 10.4, 0.7 + i * 0.6, 0.95 + i * 0.6)),
    ports,
    sfp: {
      left: (sx / WIDTH) * 100,
      top: (sy / HEIGHT) * 100,
      cage: front(sfpX0 - 0.1, sfpX1 + 0.1, 0.22, 1.1),
      hole: front(sfpX0, sfpX1, 0.34, 0.98),
      led: front(sfpX0 + 0.55, sfpX0 + 0.7, 1.14, 1.26),
    },
  };
}
