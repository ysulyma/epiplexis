import {useEffect, useRef} from "react";
import * as THREE from "three";

import {useTheme} from "../lib/color-scheme";
import {useStore} from "../store";

export function CuttingPlane() {
  const ref = useRef<THREE.Mesh>(null);
  const {z} = useStore.getState();
  useEffect(() => {
    useStore.subscribe(
      (state) => state.z,
      (z) => {
        ref.current?.position.setZ(z);
      }
    );
  }, []);

  const color = useTheme(0x333333, 0xffffff);

  return (
    <mesh ref={ref} renderOrder={1} position={[0, 0, z]}>
      <planeGeometry args={[4, 4]} />
      <meshPhongMaterial
        color={color}
        opacity={0.05}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}
