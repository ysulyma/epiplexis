import type { Object3DNode } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { DoubleSide } from "three";
import { ParametricGeometry } from "three-stdlib";

import { TURN } from "@/lib/constants";
import { lerp } from "@/lib/math";

extend({ ParametricGeometry });

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
    const x = lerp(-TURN, TURN, u);
    const y = lerp(-TURN, TURN, v);
    return target.set(x, y, Math.cos(x) * Math.sin(y));
  };

  const slices = 32;
  const stacks = 32;

  return (
    <mesh>
      <parametricGeometry args={[fn, slices, stacks]} />
      <meshPhysicalMaterial
        color="#1a69b5"
        metalness={0.3}
        roughness={0}
        side={DoubleSide}
      />
    </mesh>
  );
};
