"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import {
  ControlsContext,
  PositionHelper,
} from "@/components/three/PositionHelper.tsx";
import type { Pt3 } from "@/lib/types.ts";

import { CurveGraph } from "./Curve.tsx";
import { SurfaceGraph } from "./Surface.tsx";

const cameraPosition: Pt3 = [10.77, -10.98, 9.41];
const orbitTarget: Pt3 = [0, 0, 0];

const Scene = () => {
  return (
    <>
      <gridHelper rotation={[Math.PI / 2, 0, 0]} />
      <axesHelper />
      <ambientLight intensity={Math.PI} />
      <pointLight decay={0} intensity={Math.PI} position={[5, 3, 5]} />
      <CurveGraph />
      <SurfaceGraph />
    </>
  );
};

export default function Examples() {
  const [controls, setControls] = useState<React.ComponentRef<
    typeof OrbitControls
  > | null>(null);

  return (
    <main className="flex h-screen rounded-md bg-grid">
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
    </main>
  );
}
