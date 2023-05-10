import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {Suspense, useState} from "react";

import {ControlsContext} from "./components/controls";
import {CurveGraph} from "./components/Curve";
import {PositionHelper} from "./components/PositionHelper";
import {SurfaceGraph} from "./components/Surface";
import {Pt3} from "./utils";

const cameraPosition: Pt3 = [36.18, -17.93, 15.12];
const orbitTarget: Pt3 = [0, 0, 0];

const Scene = () => {
  return (
    <>
      <gridHelper rotation={[Math.PI / 2, 0, 0]} />
      <axesHelper />
      <ambientLight />
      <pointLight intensity={1.0} position={[5, 3, 5]} />
      <CurveGraph />
      <SurfaceGraph />
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
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          up: [0, 0, 1],
          position: cameraPosition,
          zoom: 1,
        }}
        onCreated={({gl}) => {
          gl.setClearColor("#252934");
        }}
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
