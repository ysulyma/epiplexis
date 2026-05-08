import { useEffect, useRef } from "react";
import { BoxGeometry, type Mesh } from "three";

import { pointRadius, resolution } from "@/lib/constants.ts";

import { useStore } from "./store.ts";

const box = new BoxGeometry(1, 1, 1);

/** @package */
export function Cube(props: React.JSX.IntrinsicElements["group"]) {
  const point = useRef<Mesh>(null);

  useEffect(
    () =>
      useStore.subscribe(
        (state) => state.cube,
        (pos) => {
          point.current?.position.set(...pos);
        },
      ),
    [],
  );

  const cube = useStore.getState().cube;

  return (
    <group {...props}>
      <lineSegments name="cube skeleton" position={[0.5, 0.5, 0.5]}>
        <edgesGeometry args={[box]} />
        <lineBasicMaterial color="white" />
      </lineSegments>
      <mesh name="cube" position={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" opacity={0.5} transparent />
      </mesh>
      <mesh name="cube point" position={cube} ref={point}>
        <sphereGeometry args={[pointRadius, resolution, resolution]} />
      </mesh>
    </group>
  );
}
