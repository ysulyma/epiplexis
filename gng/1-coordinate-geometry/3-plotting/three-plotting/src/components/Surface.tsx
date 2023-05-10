import {Object3DNode, extend} from "@react-three/fiber";
import {DoubleSide} from "three";
import {ParametricGeometry} from "three-stdlib";

import {TWOPI, lerp} from "../utils";

extend({ParametricGeometry});

type Parametrization = ConstructorParameters<typeof ParametricGeometry>[0];

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    parametricGeometry: Object3DNode<
      ParametricGeometry,
      typeof ParametricGeometry
    >;
  }
}

export const SurfaceGraph = () => {
  const fn: Parametrization = (u, v, target) => {
    // we want to graph over [-3, 3] x [-3, 3]
    const x = lerp(-TWOPI, TWOPI, u);
    const y = lerp(-TWOPI, TWOPI, v);
    return target.set(x, y, Math.cos(x) * Math.sin(y));
  };

  const slices = 32;
  const stacks = 32;

  return (
    <mesh>
      <parametricGeometry args={[fn, slices, stacks]} />
      <meshStandardMaterial color="#1a69b5" side={DoubleSide} />
    </mesh>
  );
};
