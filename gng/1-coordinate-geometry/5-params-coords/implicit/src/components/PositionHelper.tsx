/* eslint-disable @typescript-eslint/no-use-before-define */
import {useThree} from "@react-three/fiber";
import {useEffect} from "react";
import {Vector3} from "three";

import {useControls} from "./controls";

export function PositionHelper() {
  const {camera} = useThree();
  const controls = useControls();

  useEffect(() => {
    const log = (e: MouseEvent) => {
      if (!controls) return;
      if (!e.getModifierState("Shift")) {
        return;
      }

      console.log(fmtVec(camera.position));
      console.log(fmtVec(controls.target as Vector3));
    };

    document.body.addEventListener("click", log);

    return () => {
      document.body.removeEventListener("click", log);
    };
  }, [camera, controls]);

  return null;
}

function fmtVec(vec: Vector3, precision = 2): number[] {
  return Object.values(vec).map((x) => parseFloat(x.toFixed(precision)));
}
