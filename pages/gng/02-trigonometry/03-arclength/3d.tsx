import { useEffect, useEffectEvent, useState } from "react";
import { Curve, CurvePath, LineCurve3, Vector3 } from "three";

import { Canvas } from "@/components/liqvid.tsx";
import { OrbitControls } from "@/components/three/OrbitControls.tsx";
import { red500 } from "@/components/three/theme.ts";

interface State {
  segments: number;
  linearApproximation: CurvePath<Vector3>;
  arclength: number;
}

const initialSegments = 5;

class CustomCurve extends Curve<Vector3> {
  // biome-ignore lint/complexity/noUselessConstructor: need to make the constructor public https://biomejs.dev/linter/rules/no-useless-constructor/#caveat
  constructor() {
    super();
  }

  getPoint(t: number, optionalTarget = new Vector3()) {
    t = -1 + 2 * t;
    const tx = 4 * t * Math.cos(3 * 2 * Math.PI * t);
    const ty = 5 * t * Math.sin(2 * 2 * Math.PI * t);
    const tz = 7 * t + 1 * Math.sin(2 * Math.PI * t);

    return optionalTarget.set(tx, ty, tz);
  }
}

const curve = new CustomCurve();

export default function ThreeD() {
  const [{ segments, linearApproximation, arclength }, setState] =
    useState<State>(() => ({
      arclength: 0,
      linearApproximation: new CurvePath(),
      segments: initialSegments,
    }));

  /**
   * Update the piecewise-linear approximation of the curve
   * and its arclength
   */
  const updateApproximation = useEffectEvent((segments: number) => {
    // initial point
    let prevPt = curve.getPoint(0);
    let arclength = 0;
    const curves: LineCurve3[] = [];

    // sample points along the curve
    for (let i = 1; i <= segments; i++) {
      const pt = curve.getPoint(i / segments);

      // update the linear approximation
      curves.push(new LineCurve3(prevPt, pt));

      // update the arclength calculation
      arclength += prevPt.distanceTo(pt);
      prevPt = pt;
    }

    // update
    const linearApproximation = new CurvePath<Vector3>();
    linearApproximation.curves = curves;
    setState({ arclength, linearApproximation, segments });
  });

  // initial render
  useEffect(() => updateApproximation(initialSegments), []);

  /** Change event handler */
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const segments = +e.target.value;
    updateApproximation(segments);
  };

  return (
    <main className="flex h-screen w-screen flex-col">
      <fieldset>
        <div className="mb-4 flex items-start">
          <div className="flex items-center gap-3">
            <label htmlFor="segments">Segments</label>
            <input
              id="segments"
              max={200}
              min={1}
              onChange={onChange}
              type="range"
              value={segments}
            />
            <span className="w-4 text-right">{segments}</span>
          </div>
          <table className="ml-8 align-top">
            <tbody>
              <tr className="text-red-500">
                <th className="pr-2 text-right" scope="row">
                  Approximate length
                </th>
                <td>
                  <output htmlFor="segments">{arclength.toFixed(4)}</output>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </fieldset>
      <Canvas
        camera={{ position: [11.01, 9.73, 8.79] }}
        className="rounded-md bg-grid"
        onCreated={(state) => {
          state.gl.localClippingEnabled = true;
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <axesHelper args={[10]} />

        <mesh>
          <tubeGeometry args={[curve, 256, 0.1, 8, false]} />
          <meshNormalMaterial />
        </mesh>

        {linearApproximation && (
          <mesh>
            <tubeGeometry args={[linearApproximation, 128, 0.1, 8, false]} />
            <meshPhongMaterial color={red500} />
          </mesh>
        )}
      </Canvas>
    </main>
  );
}
