import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import "katex/dist/katex.min.css";
import {Suspense, useState} from "react";

import {ControlsContext} from "./components/controls";
import {Form} from "./components/Form";
import {ImplicitSurface} from "./components/ImplicitSurface";
import {CuttingPlane} from "./components/Plane";
import {PositionHelper} from "./components/PositionHelper";
import {SyncColorScheme} from "./lib/color-scheme";
import {Pt3} from "./utils";

const cameraPosition: Pt3 = [3.24, -2.63, 1.71];
const orbitTarget: Pt3 = [0, 0, 0];

const Scene = () => {
  return (
    <>
      <gridHelper args={[4, 4]} rotation={[Math.PI / 2, 0, 0]} />
      <axesHelper />
      <ambientLight />
      <pointLight intensity={1.0} position={[5, 3, 5]} />
      <ImplicitSurface />
      <CuttingPlane />
    </>
  );
};

const App = () => {
  const [controls, setControls] = useState<any>();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <SyncColorScheme />
      <Form />
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          up: [0, 0, 1],
          position: cameraPosition,
          zoom: 1,
        }}
        // onCreated={({gl}) => {
        //   gl.setClearColor("var(--gray1)");
        // }}
      >
        <ControlsContext.Provider value={controls}>
          <PositionHelper />
          <OrbitControls
            enableDamping={false}
            target={orbitTarget}
            ref={(ref) => setControls(ref)}
          />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </ControlsContext.Provider>
      </Canvas>
    </div>
  );
};

export default App;
