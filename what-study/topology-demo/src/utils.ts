import {onDrag} from "@liqvid/utils/react";

export type Pt2 = {
  x: number;
  y: number;
};

export function closestPoint({
  min,
  max,
  samples = 100,
  target,
  fn,
}: {
  min: number;
  max: number;
  samples?: number;
  target: Pt2;
  fn: (t: number) => Pt2;
}) {
  const dt = (max - min) / samples;

  const error = (t: number) => {
    const pt = fn(t);
    return (pt.x - target.x) ** 2 + (pt.y - target.y) ** 2;
  };

  let best = min,
    minVal = error(best);

  for (let i = 1; i <= samples; ++i) {
    const ti = min + i * dt;
    const val = error(ti);

    if (val < minVal) {
      minVal = val;
      best = ti;
    }
  }

  return best;
}

export function useDrag(move: Parameters<typeof onDrag>[0]) {
  return onDrag(
    move,
    () => {
      document.body.classList.add("dragging");
    },
    () => {
      document.body.classList.remove("dragging");
    }
  );
}

/** Clamp angles to [0, TWOPI) */
export const clampAngle = (t: number) => ((t % TWOPI) + TWOPI) % TWOPI;

export const TWOPI = 2 * Math.PI;
export const DEGREES = TWOPI / 360;
