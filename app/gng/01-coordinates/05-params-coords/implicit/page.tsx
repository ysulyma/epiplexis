"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import { ControlsContext } from "@/components/three/PositionHelper.tsx";
import type { Pt3 } from "@/lib/types.ts";

import { Form } from "./components/Form.tsx";
import { ImplicitSurface } from "./components/ImplicitSurface.tsx";
import { CuttingPlane } from "./components/Plane.tsx";

const cameraPosition: Pt3 = [3.24, -2.63, 1.71];
const orbitTarget: Pt3 = [0, 0, 0];

const Scene = () => {
  return (
    <>
      <gridHelper args={[4, 4]} rotation={[Math.PI / 2, 0, 0]} />
      <axesHelper />
      <ambientLight intensity={Math.PI} />
      <pointLight decay={0} intensity={Math.PI} position={[5, 3, 5]} />
      <ImplicitSurface />
      <CuttingPlane />
    </>
  );
};

export default function App() {
  const [controls, setControls] = useState<React.ComponentRef<
    typeof OrbitControls
  > | null>(null);

  return (
    <div className="flex h-screen w-screen flex-col">
      <Form />
      <Canvas
        camera={{
          far: 1000,
          near: 0.1,
          position: cameraPosition,
          up: [0, 0, 1],
          zoom: 1,
        }}
        className="flex-1 rounded-md bg-grid"
      >
        <ControlsContext.Provider value={controls}>
          {/* <PositionHelper /> */}
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
