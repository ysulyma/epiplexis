import {Curve, DoubleSide, Vector3} from "three";

import {TWOPI, lerp} from "../utils";

class CustomCurve extends Curve<Vector3> {
  constructor() {
    super();
  }

  getPoint(t: number, target = new Vector3()) {
    const r = 5;
    const rotations = 2;
    const angle = t * rotations * TWOPI;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    const z = lerp(-3, 3, t);
    return target.set(x, y, z);
  }
}

export const CurveGraph = () => {
  const curve = new CustomCurve();
  const tubularSegments = 128;
  const radius = 0.1;
  const radialSegments = 16;
  const closed = false;

  return (
    <mesh>
      <tubeGeometry
        args={[curve, tubularSegments, radius, radialSegments, closed]}
      />
      <meshStandardMaterial color="#ff0070" side={DoubleSide} />
    </mesh>
  );
};
