import { useEffect, useRef } from "react";
import { DoubleSide, type Mesh } from "three";

import { pointRadius, resolution, TURN } from "@/lib/constants.ts";
import { cylindrical } from "@/lib/parametrizations.ts";

import { useStore } from "./store.ts";

const r = 0.5;
const h = 2;

export function Cylinder(props: JSX.IntrinsicElements["group"]): JSX.Element {
  const point = useRef<Mesh>(null);

  useEffect(
    () =>
      useStore.subscribe(
        (state) => state.cylinder,
        ({ z, theta }) => {
          point.current?.position.set(...cylindrical({ r, theta, z: z * h }));
        },
      ),
    [],
  );

  const { z, theta } = useStore.getState().cylinder;

  return (
    <group {...props}>
      <mesh position={[0, 0, h / 2]} rotation={[TURN / 4, 0, 0]}>
        <cylinderGeometry args={[r, r, h, resolution, resolution, true]} />
        <meshPhysicalMaterial
          color="blue"
          metalness={0.4}
          roughness={0}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={cylindrical({ r, theta, z: z * h })} ref={point}>
        <sphereGeometry args={[pointRadius, resolution, resolution]} />
      </mesh>
    </group>
  );
}
