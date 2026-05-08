import { useEffect, useRef } from "react";
import { DoubleSide } from "three";

import { useSchemed } from "@/lib/api/dark-mode.ts";

import { zSignal } from "./state.ts";

/** @package */
export function CuttingPlane() {
  const ref = useRef<THREE.Mesh>(null);
  const z = zSignal.get();

  useEffect(
    () =>
      zSignal.subscribe((z) => {
        ref.current?.position.setZ(z);
      }),
    [],
  );

  const color = useSchemed({ dark: 0xffffff, light: 0x333333 });

  return (
    <mesh position={[0, 0, z]} ref={ref} renderOrder={1}>
      <planeGeometry args={[4, 4]} />
      <meshPhongMaterial
        color={color}
        opacity={0.05}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
}
