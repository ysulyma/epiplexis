import { onDragReact, screenToSVG } from "@liqvid/utils";
import { useRef, useState } from "react";

/** Vector in R^2 */
type Vec2 = [number, number];

/** Circle that we will draw */
interface Circle {
  /** Radius of the circle */
  radius: number;

  /** (x, y) coordinates of the circle's center */
  center: Vec2;

  /** Color */
  fill: string;
}

type AppendCircle = (circle: Omit<Circle, "fill">) => void;

const initialCircles: Circle[] = [
  {
    center: [200, 200],
    fill: "purple",
    radius: 80,
  },
  {
    center: [500, 150],
    fill: "teal",
    radius: 50,
  },
];

export default function DrawingCircles() {
  const [circles, setCircles] = useState<Circle[]>(initialCircles);
  const [color, setColor] = useState("#FF0000");
  const appendCircle: AppendCircle = (circle) =>
    setCircles((prev) => [...prev, { ...circle, fill: color }]);

  return (
    <div className="flex h-screen w-full flex-col dark:text-white">
      <form className="flex items-center border-b p-2">
        Color
        <input
          className="ml-2"
          onChange={(e) => setColor(e.currentTarget.value)}
          type="color"
          value={color}
        />
        <span className="mx-2">Click and drag below to draw circles</span>
        <button
          className="border border-red-800 border-solid bg-red-700 px-2 py-1 text-white"
          onClick={() => setCircles([])}
          type="button"
        >
          Clear
        </button>
      </form>
      <Canvas {...{ appendCircle, circles, color }} />
    </div>
  );
}

/** SVG canvas for drawing the circles */
function Canvas({
  appendCircle,
  circles,
  color,
}: {
  appendCircle: AppendCircle;
  circles: Circle[];
  color: string;
}) {
  /** Ref to the root <svg> element */
  const ref = useRef<SVGSVGElement>(null);

  // behaviors
  const {
    dragging,
    events,
    circleProps: previewCircleProps,
  } = useDrawCircle(ref, appendCircle);

  const { onPointerMove, circleProps: hintCircleProps } = useCursorHint(
    ref,
    dragging,
  );

  // render
  return (
    <svg
      className="w-full flex-1"
      {...events}
      onPointerMove={onPointerMove}
      ref={ref}
    >
      {circles.map((circ, i) => (
        <circle
          cx={circ.center[0]}
          cy={circ.center[1]}
          fill={circ.fill}
          key={
            circleKey(circ) +
            `|${
              // biome-ignore lint/suspicious/noArrayIndexKey: need a way to distinguish multiples
              i
            }`
          }
          r={circ.radius}
        />
      ))}
      {hintCircleProps && <circle {...hintCircleProps} fill={color} r="3" />}
      {previewCircleProps && <circle {...previewCircleProps} fill={color} />}
    </svg>
  );
}

/** Hook for drawing new circles */
function useDrawCircle(
  ref: React.RefObject<SVGSVGElement | null>,
  appendCircle: AppendCircle,
) {
  const dragging = useRef(false);
  const center = useRef<Vec2>(null);
  const radiusRef = useRef(0);
  const [radius, setRadius] = useState(0);

  const events = onDragReact(
    // move handler
    (_e, hit) => {
      if (!ref.current || !center.current) return;
      const position = screenToSVG(ref.current, hit.x, hit.y);
      const radius = Math.hypot(
        position[0] - center.current[0],
        position[1] - center.current[1],
      );
      radiusRef.current = radius;
      setRadius(radius);
    },
    // down handler
    (_e, hit) => {
      dragging.current = true;
      radiusRef.current = 0;

      if (!ref.current) return;
      center.current = screenToSVG(ref.current, hit.x, hit.y);
    },
    // up handler
    () => {
      if (!center.current) return;

      appendCircle({
        center: center.current,
        radius: radiusRef.current,
      });
      center.current = null;
      dragging.current = false;
    },
  );

  return {
    circleProps: center.current
      ? { cx: center.current[0], cy: center.current[1], r: radius }
      : undefined,
    dragging,
    events,
  };
}

/** Hook for displaying the position of the cursor as well as the selected color */
function useCursorHint(
  ref: React.RefObject<SVGSVGElement | null>,
  dragging: React.RefObject<boolean>,
) {
  const [position, setPosition] = useState<Vec2 | undefined>();

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!ref.current) return;

    // disable when a circle is being created
    if (dragging.current) return;

    const position = screenToSVG(ref.current, e.clientX, e.clientY);
    setPosition(position);
  };

  return {
    circleProps: position ? { cx: position[0], cy: position[1] } : undefined,
    onPointerMove,
  };
}

function circleKey(c: Circle) {
  return c.center.join(",") + `|${c.radius}|${c.fill}`;
}
