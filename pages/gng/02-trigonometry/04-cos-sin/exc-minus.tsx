import { between, onDrag, screenToSVG, screenToSVGVector } from "@liqvid/utils";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { KTX } from "@/components/KTX.tsx";
import { DEGREES, TURN } from "@/lib/constants.ts";
import { mod } from "@/lib/math.ts";
import { cn } from "@/lib/utils.ts";

const { cos, sin, tan, sqrt, atan2 } = Math;

const KtxLabel = ({
  children,
  className,
  r,
  theta,
  ...attrs
}: React.SVGAttributes<SVGForeignObjectElement> & {
  className?: string;
  children: string;
  r: number;
  theta: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const foreign = useRef<SVGForeignObjectElement>(null);

  const [dims, setDims] = useState({ height: 1, width: 1 });

  useEffect(() => {
    if (!(ref.current && foreign.current)) return;
    const rect = ref.current.getBoundingClientRect();
    const [height, width] = screenToSVGVector(
      foreign.current.ownerSVGElement!,
      rect.height,
      rect.width,
    );
    setDims({ height, width });
  }, []);

  const padding = 3;

  const dr = padding + addedRadius({ h: dims.height, r, theta, w: dims.width });

  return (
    <foreignObject
      className={cn("pointer-events-none overflow-visible", className)}
      ref={foreign}
      x={(r + dr) * cos(theta)}
      y={-(r + dr) * sin(theta)}
      {...attrs}
      height={1000}
      width={2000}
    >
      {/* fixed is only necessary for Safari */}
      <KTX
        className="fixed block w-min -translate-x-1/2 -translate-y-1/2"
        ref={ref}
      >
        {children}
      </KTX>
    </foreignObject>
  );
};

export default function Minus() {
  const [alpha, setAlpha] = useState(75 * DEGREES);
  const [beta, setBeta] = useState(-20 * DEGREES);
  const router = useRouter();

  const r = 45;

  const cx = 0;
  const cy = 0;

  const acx = cx + r * cos(alpha);
  const acy = cy - r * sin(alpha);

  const bcx = cx + r * cos(beta);
  const bcy = cy - r * sin(beta);

  const ref = useRef<SVGSVGElement>(null);

  const events = useCallback(
    (setter: (angle: number) => void) =>
      onDrag(
        // move handler
        (_e, hit) => {
          if (!ref.current) return;
          const [x, y] = screenToSVG(ref.current, hit.x, hit.y);
          setter(mod(atan2(cy - y, x - cx), TURN));
        },
        () => {
          document.body.classList.add("dragging");
        },
        () => {
          document.body.classList.remove("dragging");
        },
      ),
    [],
  );

  const eventsA = useMemo(() => events(setAlpha), [events]);
  const eventsB = useMemo(() => events(setBeta), [events]);

  return (
    <div className="h-screen w-screen">
      <svg className="mx-auto h-full p-2" ref={ref} viewBox="-175 -70 350 140">
        <title>
          two points on the circle, one at alpha (cos alpha, sin alpha) and the
          other at (cos beta, sin beta)
        </title>
        <circle
          className="stroke-violet-600"
          {...{ cx, cy, r }}
          fill="none"
          strokeWidth="1"
        />

        {/* lines */}
        <line className="stroke-red-700" x1={cx} x2={acx} y1={cy} y2={acy} />
        <line className="stroke-blue-700" x1={cx} x2={bcx} y1={cy} y2={bcy} />
        <line
          className="stroke-green-600"
          x1={acx}
          x2={bcx}
          y1={acy}
          y2={bcy}
        />

        {/* labels */}
        <KtxLabel
          className="select-none whitespace-nowrap stroke-red-600 text-red-600"
          fontSize={12}
          r={r}
          theta={alpha}
        >
          {String.raw`(\cos\alpha,\sin\alpha)`}
        </KtxLabel>
        <KtxLabel
          className="select-none whitespace-nowrap text-blue-600"
          fontSize={12}
          r={r}
          theta={beta}
        >
          {String.raw`(\cos\beta,\sin\beta)`}
        </KtxLabel>

        {/* right-angles in solution */}
        {router.query.rightAngle !== undefined && (
          <path
            className="stroke-green-600"
            d={`M ${acx},${acy} V ${bcy} H ${bcx}`}
            fill="none"
            strokeDasharray="0.2,1.5"
            strokeLinecap="round"
          />
        )}

        {/* bisection in solution */}
        {router.query.bisect !== undefined && (
          <path
            className="stroke-green-600"
            d={`M ${cx},${cy} L ${(acx + bcx) / 2} ${(acy + bcy) / 2}`}
            fill="none"
            strokeDasharray="0.2,1.5"
            strokeLinecap="round"
          />
        )}

        {/* circles */}
        <circle className="dark:fill-white" {...{ cx, cy }} r="2" />
        <circle
          className="draggable fill-red-600"
          cx={acx}
          cy={acy}
          r="2"
          {...eventsA}
        />
        <circle
          className="draggable fill-blue-600"
          cx={bcx}
          cy={bcy}
          r="2"
          {...eventsB}
        />
      </svg>
    </div>
  );
}

/**
 * Gives a distance from the circle to the center of the rectangle.
 * @see https://math.stackexchange.com/a/4648012/13632
 */
function addedRadius({
  h,
  w,
  r = 1,
  theta,
}: {
  h: number;
  w: number;
  r?: number;
  theta: number;
}): number {
  // normalize inputs
  h /= r;
  w /= r;
  theta %= TURN / 2;
  if (between(TURN / 4, theta, TURN / 2)) {
    theta = theta - TURN / 4;
    [h, w] = [w, h];
  }

  const maxCenterX = 1 + w / 2;
  const maxCenterY = 1 + h / 2;

  if (theta < atan2(h / 2, maxCenterX)) {
    h = 2 * maxCenterX * tan(theta);
  } else if (theta > atan2(maxCenterY, w / 2)) {
    w = 2 * maxCenterY * tan(Math.PI / 2 - theta);
  }

  const tanTheta = tan(theta);
  const result =
    0.5 *
    (-2 +
      h * sin(theta) +
      cos(theta) *
        (w +
          sqrt(
            4 -
              h ** 2 +
              2 * h * w * tanTheta -
              (w ** 2 - 4) * tanTheta * tanTheta,
          )));
  return r * result;
}
