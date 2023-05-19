/**
 * Linear interpolation from a to b.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

/**
 * Point in 3d space
 */
export type Pt3 = [number, number, number];

export const TWOPI = 2 * Math.PI;
