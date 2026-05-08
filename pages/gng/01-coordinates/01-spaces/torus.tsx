import { OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { DoubleSide } from "three";

import { ParametricGeometry } from "@/components/three/ParametricGeometry.tsx";
import {
  ControlsContext,
  PositionHelper,
} from "@/components/three/PositionHelper.tsx";
import { blue600, green600, red600 } from "@/components/three/theme.ts";
import type { Pt3 } from "@/lib/types.ts";

extend({ ParametricGeometry });

const cameraPosition: Pt3 = [7.27, -5.04, 4.09];
const orbitTarget: Pt3 = [0, 0, 0];

const Torus = () => (
  <mesh name="torus">
    <torusGeometry args={[4, 1, 32, 64]} />
    <meshPhysicalMaterial
      color={green600}
      metalness={0.7}
      roughness={0.7}
      side={DoubleSide}
    />
  </mesh>
);

const Circle = () => (
  <mesh name="circle 1" position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[1, 0.05, 32, 32]} />
    <meshStandardMaterial color={blue600} />
  </mesh>
);

const Circle2 = () => (
  <mesh name="circle 2" position={[0, 0, 0]}>
    <torusGeometry args={[5, 0.05, 16, 64]} />
    <meshStandardMaterial color={red600} />
  </mesh>
);

const Scene = () => {
  return (
    <>
      <ambientLight intensity={Math.PI} />
      <pointLight decay={0} intensity={Math.PI} position={[5, 3, 5]} />
      <Torus />
      <Circle />
      <Circle2 />
    </>
  );
};

export default function CirclesOnTorus() {
  const [controls, setControls] = useState<React.ComponentRef<
    typeof OrbitControls
  > | null>(null);

  return (
    <div className="h-screen w-screen rounded-md bg-grid">
      <Canvas
        camera={{
          far: 1000,
          near: 0.1,
          position: cameraPosition,
          up: [0, 0, 1],
          zoom: 1,
        }}
      >
        <ControlsContext.Provider value={controls}>
          <PositionHelper />
          <OrbitControls
            enableDamping={false}
            ref={(ref) => setControls(ref)}
            target={orbitTarget}
          />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </ControlsContext.Provider>
      </Canvas>
    </div>
  );
}
