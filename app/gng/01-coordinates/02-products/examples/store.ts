import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { TURN } from "@/lib/constants.ts";
import type { Pt3 } from "@/lib/types.ts";

export interface State {
  /** Cube coordinates [x, y, z] */
  cube: Pt3;

  /** Cylinder coordinates */
  cylinder: {
    z: number;

    theta: number;
  };

  /** Torus [theta, phi] coordinates */
  torus: [number, number];
}

export const useStore = create(
  subscribeWithSelector<State>(() => ({
    cube: [1, 0.5, 0.5] as Pt3,
    cylinder: { theta: 0.75 * TURN, z: 0.5 },
    torus: [0.05 * TURN, 0.7 * TURN],
  })),
);
