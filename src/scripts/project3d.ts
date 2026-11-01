// A perspective camera in a few lines: enough to turn the corners of boxes and rings into canvas points.
// World axes: x to the right, y up, z away from the viewer. The camera turns the world about the vertical axis
// (`yaw`), tilts it (`pitch`) and divides by depth. No library, no matrices.

export interface View {
  yaw: number;
  /** Radians; positive looks down on the scene. */
  pitch: number;
  /** Pixels per world unit at the focal distance. */
  zoom: number;
  /** Distance from the camera to the world origin, in world units; larger is flatter. */
  focal: number;
  /** Screen position of the world origin. */
  cx: number;
  cy: number;
}

export interface Point {
  x: number;
  y: number;
  /** Depth after the camera turn: smaller is nearer. Sort by it, far to near, to paint. */
  depth: number;
  /** Perspective scale at this point; 1 at the focal distance. */
  k: number;
}

export function project(v: View, x: number, y: number, z: number, out: Point = newPoint()): Point {
  const cosY = Math.cos(v.yaw);
  const sinY = Math.sin(v.yaw);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;
  const cosP = Math.cos(v.pitch);
  const sinP = Math.sin(v.pitch);
  const y2 = y * cosP + z1 * sinP;
  const z2 = z1 * cosP - y * sinP;
  const k = v.focal / (v.focal + z2);
  out.x = v.cx + x1 * k * v.zoom;
  out.y = v.cy - y2 * k * v.zoom;
  out.depth = z2;
  out.k = k;
  return out;
}

export const newPoint = (): Point => ({ x: 0, y: 0, depth: 0, k: 1 });
