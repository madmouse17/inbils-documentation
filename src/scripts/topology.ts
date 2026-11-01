// The shape of an ISP's network, shared by the hero drawing and the page backdrop: a few points of presence
// spread apart, customers clustered around them, a backbone between the points of presence, and one link from
// every customer to its nearest point of presence (a few also link to a close neighbour).

export interface Site {
  /** Home position. */
  hx: number;
  hy: number;
  pop: boolean;
  /** Indexes into the edge list. */
  links: number[];
}

export interface Edge {
  a: number;
  b: number;
  backbone: boolean;
}

export interface Plan {
  w: number;
  h: number;
  /** Sites in all: the points of presence first, then the customers. */
  count: number;
  pops: number;
  /** The farthest a customer sits from its point of presence. */
  spread: number;
  margin: number;
}

/** `make` runs right after each site is placed, so a caller can draw its own random numbers in a fixed order. */
export function topology<T extends Site>(
  rnd: () => number,
  plan: Plan,
  make: (x: number, y: number, pop: boolean) => T,
): { sites: T[]; edges: Edge[] } {
  const { w, h, count, pops, spread, margin } = plan;
  const sites: T[] = [];
  for (let i = 0; i < pops; i++) {
    // best of eight candidates: the one farthest from the points of presence placed so far
    let best = { x: 0, y: 0, d: -1 };
    for (let k = 0; k < 8; k++) {
      const x = margin + rnd() * (w - 2 * margin);
      const y = margin + rnd() * (h - 2 * margin);
      const d = sites.reduce((m, n) => Math.min(m, Math.hypot(n.hx - x, n.hy - y)), Infinity);
      if (d > best.d) best = { x, y, d };
    }
    sites.push(make(best.x, best.y, true));
  }
  while (sites.length < count) {
    const center = sites[Math.floor(rnd() * pops)];
    const angle = rnd() * Math.PI * 2;
    const dist = 26 + Math.pow(rnd(), 1.4) * spread;
    const x = Math.min(w - margin, Math.max(margin, center.hx + Math.cos(angle) * dist));
    const y = Math.min(h - margin, Math.max(margin, center.hy + Math.sin(angle) * dist));
    sites.push(make(x, y, false));
  }

  const edges: Edge[] = [];
  const seen = new Set<number>();
  const connect = (a: number, b: number, backbone: boolean): void => {
    const key = Math.min(a, b) * 1000 + Math.max(a, b);
    if (a === b || seen.has(key)) return;
    seen.add(key);
    edges.push({ a, b, backbone });
    sites[a].links.push(edges.length - 1);
    sites[b].links.push(edges.length - 1);
  };
  const dist = (a: number, b: number): number =>
    Math.hypot(sites[a].hx - sites[b].hx, sites[a].hy - sites[b].hy);

  // backbone: a minimum spanning tree over the points of presence, plus one extra ring link each
  const inTree = [0];
  while (inTree.length < pops) {
    let pick = { a: 0, b: 0, d: Infinity };
    for (const a of inTree) {
      for (let b = 0; b < pops; b++) {
        if (!inTree.includes(b) && dist(a, b) < pick.d) pick = { a, b, d: dist(a, b) };
      }
    }
    connect(pick.a, pick.b, true);
    inTree.push(pick.b);
  }
  for (let a = 0; a < pops; a++) {
    let near = -1;
    for (let b = 0; b < pops; b++)
      if (b !== a && (near < 0 || dist(a, b) < dist(a, near))) near = b;
    if (near >= 0 && rnd() < 0.5) connect(a, near, true);
  }
  // customers hang off their nearest point of presence; a few also link to a close neighbour
  for (let i = pops; i < sites.length; i++) {
    let near = 0;
    for (let p = 1; p < pops; p++) if (dist(i, p) < dist(i, near)) near = p;
    connect(i, near, false);
    if (rnd() < 0.28) {
      let peer = -1;
      for (let j = pops; j < sites.length; j++) {
        if (j !== i && dist(i, j) < 95 && (peer < 0 || dist(i, j) < dist(i, peer))) peer = j;
      }
      if (peer >= 0) connect(i, peer, false);
    }
  }
  return { sites, edges };
}
