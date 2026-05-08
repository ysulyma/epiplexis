import { useEffect, useEffectEvent, useRef, useState } from "react";

import { Curve, Svg } from "./curve.tsx";

interface State {
  segments: number;
  d: string;
  arclength: number;
}

const initialSegments = 5;

export default function Approx() {
  const [{ segments, d, arclength }, setState] = useState<State>({
    arclength: 0,
    d: "",
    segments: initialSegments,
  });

  /** Ref for the curve we're approximating */
  const ref = useRef<SVGPathElement>(null);

  /**
   * Update the piecewise-linear approximation of the curve
   * and its arclength
   */
  const updateApproximation = useEffectEvent((segments: number) => {
    const path = ref.current;
    if (!path) return;

    // initial point
    let prevPt = path.getPointAtLength(0);
    let d = `M ${prevPt.x} ${prevPt.y}`;
    let arclength = 0;

    // sample points along the curve
    const mesh = path.getTotalLength() / segments;
    for (let i = 1; i <= segments; i++) {
      const pt = path.getPointAtLength(i * mesh);

      // update the linear approximation
      d += ` L ${pt.x} ${pt.y}`;

      // update the arclength calculation
      arclength += Math.hypot(pt.x - prevPt.x, pt.y - prevPt.y);
      prevPt = pt;
    }

    // update
    setState({ arclength, d, segments });
  });

  // initial render
  useEffect(() => updateApproximation(initialSegments), []);

  /** Change event handler */
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const segments = +e.target.value;
    updateApproximation(segments);
  };

  return (
    <main className="mx-auto w-max p-4 text-xl">
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
            <tr>
              <th className="pr-2 text-right" scope="row">
                Actual length
              </th>
              <td>{ref.current?.getTotalLength().toFixed(4) ?? ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Svg>
        <Curve ref={ref} />

        {/* piecewise-linear approximation */}
        {d && <path className="fill-none stroke-red-500" d={d} />}
      </Svg>
    </main>
  );
}
