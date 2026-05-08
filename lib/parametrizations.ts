import type { Pt3 } from "./types.ts";

const { cos, sin } = Math;

/** Parametrization of a cylinder */
export function cylindrical({
  r,
  z: h,
  theta,
}: {
  z: number;
  r: number;
  theta: number;
}): Pt3 {
  return [r * cos(theta), r * sin(theta), h];
}

/** Parametrization of a torus */
export function toroidal(
  R: number,
  r: number,
  theta: number,
  phi: number,
): Pt3 {
  return [
    (R + r * cos(theta)) * cos(phi),
    (R + r * cos(theta)) * sin(phi),
    r * sin(theta),
  ];
}
