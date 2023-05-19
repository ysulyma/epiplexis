import {useEffect, useRef} from "react";
import * as THREE from "three";

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

  return (
    <mesh ref={ref} renderOrder={1} position={[0, 0, z]}>
      <planeGeometry args={[4, 4]} />
      <meshPhongMaterial
        color={0xffffff}
        opacity={0.05}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}
