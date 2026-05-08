"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import {
  ControlsContext,
  PositionHelper,
} from "@/components/three/PositionHelper.tsx";
import type { Pt3 } from "@/lib/types.ts";

import { Controls } from "./Controls.tsx";
import { Cube } from "./Cube.tsx";
import { Cylinder } from "./Cylinder.tsx";
import { Torus } from "./Torus.tsx";

const cameraPosition: Pt3 = [2.31, -5.86, 2.11];
const orbitTarget: Pt3 = [2.3, -0.29, -1.81];

const Scene = () => {
  return (
    <>
      <ambientLight intensity={Math.PI} />
      <pointLight decay={0} intensity={Math.PI} position={[0, -2, 2]} />
      <pointLight decay={0} intensity={Math.PI} position={[0, 2, 2]} />
      <pointLight decay={0} intensity={Math.PI} position={[-2, 2, 2]} />
      <pointLight decay={0} intensity={Math.PI} position={[2, 2, 2]} />
      <pointLight decay={0} intensity={Math.PI} position={[4, -1, 2]} />
      <Cube position={[-3, -0.5, -0.5]} />
      <Cylinder position={[0, 0, -1]} />
      <Torus position={[5, 0, 0]} />
    </>
  );
};

export default function Examples() {
  const [controls, setControls] = useState<React.ComponentRef<
    typeof OrbitControls
  > | null>(null);

  return (
    <main className="flex h-screen flex-col">
      <Controls />
      <div className="flex-1 bg-grid">
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
    </main>
  );
}
