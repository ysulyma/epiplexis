import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import type { Pt3 } from "@/lib/types.ts";

export function OrbitControls(props: { target?: Pt3 }) {
  const $three = useThree();

  const {
    camera,
    gl: { domElement },
    scene,
  } = $three;
  // biome-ignore lint/suspicious/noExplicitAny:
  (window as any).scene = scene;
  // biome-ignore lint/suspicious/noExplicitAny:
  (window as any).$three = $three;

  // set correct up direction
  camera.up.set(0, 0, 1);

  // controls
  const controls = useRef<React.ComponentRef<typeof DreiOrbitControls>>();
  useFrame(() => controls.current?.update());
  useEffect(() => {
    if (!controls.current) return;
    if (props.target) {
      controls.current.target.set(...props.target);
    }
    // console.log(controls.current);
    $three.controls = controls.current;
  }, [$three, props.target]);

  // // point camera
  // useEffect(() => {
  //   camera.position.set(4.3, -9.5, 6);
  //   // camera.lookAt(new THREE.Vector3(0, 0, 0));
  //   // camera.up.set(0, 0, 1);
  // }, []);

  return (
    <DreiOrbitControls
      args={[camera, domElement]}
      enableDamping={false}
      ref={controls}
    />
  );
}
