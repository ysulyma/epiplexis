import { useEffect, useRef } from "react";
import { DoubleSide, type Mesh } from "three";

import { pointRadius, resolution } from "@/lib/constants.ts";
import { toroidal } from "@/lib/parametrizations.ts";

import { useStore } from "./store.ts";

const radius = 2;
const tube = 0.5;

/** @package */
export function Torus(props: React.JSX.IntrinsicElements["group"]) {
  const point = useRef<Mesh>(null);

  useEffect(
    () =>
      useStore.subscribe(
        (state) => state.torus,
        ([theta, phi]) => {
          point.current?.position.set(...toroidal(radius, tube, theta, phi));
        },
      ),
    [],
  );

  const [theta, phi] = useStore.getState().torus;

  return (
    <group {...props}>
      <mesh name="torus">
        <torusGeometry args={[radius, tube, resolution, resolution]} />
        <meshPhysicalMaterial
          color="green"
          metalness={0.3}
          roughness={0}
          side={DoubleSide}
        />
      </mesh>
      <mesh
        name="torus point"
        position={toroidal(radius, tube, theta, phi)}
        ref={point}
      >
        <sphereGeometry args={[pointRadius, resolution, resolution]} />
      </mesh>
    </group>
  );
}
