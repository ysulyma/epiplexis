import {
  forwardRef,
  useCallback,
  useEffect,
  useEffectEvent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { TURN } from "@/lib/constants.ts";

const COLORS = ["red", "green", "blue"] as const;
type Color = (typeof COLORS)[number];

interface Point {
  x: number;
  y: number;
}

interface ColoredPoint extends Point {
  color: Color;
}

const config = {
  dotRadius: 1,
  drawRadius: 5,
  granularity: 3,
};

export default function KNN() {
  const [selectedColor, setColor] = useState<Color>("red");
  const canvas = useRef<CanvasRef>(null);

  return (
    <div className="h-screen w-screen rounded-md p-2">
      <div className="flex items-center gap-2">
        {COLORS.map((color) => (
          <button
            aria-checked={color === selectedColor}
            className="h-6 w-6 border border-solid opacity-30 aria-selected:opacity-100"
            key={color}
            onClick={() => setColor(color)}
            role="switch"
            style={{ backgroundColor: color }}
            type="button"
          />
        ))}
        <button
          className="border border-solid p-1"
          onClick={() => canvas.current?.clear()}
          type="button"
        >
          Clear
        </button>
      </div>
      <Canvas color={selectedColor} ref={canvas} />
    </div>
  );
}

interface CanvasRef {
  /** Clear the canvas */
  clear: () => void;
}

interface CanvasProps {
  /** Currently selected color */
  color: Color;
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(function Canvas(
  { color },
  ref,
) {
  // canvases
  const dotsLayer = useRef<HTMLCanvasElement>(null);
  const drawingLayer = useRef<HTMLCanvasElement>(null);
  useSetCanvasSize(dotsLayer);
  useSetCanvasSize(drawingLayer);

  /** Points drawn on the canvas */
  const points = useRef<ColoredPoint[]>([]);

  /** Add a point to the canvas */
  const addPoint = useEffectEvent((e: React.PointerEvent<HTMLElement>) => {
    const drawingCanvas = drawingLayer.current;
    if (!drawingCanvas) return;

    const ctx = drawingCanvas.getContext("2d");
    if (!ctx) return;

    // convert event coordinates to canvas coordinates
    const rect = drawingCanvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    points.current.push({ color, x, y });

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, config.drawRadius, 0, 2 * Math.PI);
    ctx.fill();

    redraw();
  });

  /** Redraw the KNN canvas */
  const redraw = useCallback(() => {
    const dotsCanvas = dotsLayer.current;
    if (!dotsCanvas) return;

    const ctx = dotsCanvas.getContext("2d");
    if (!ctx) return;

    // clear the canvas
    ctx.clearRect(0, 0, dotsCanvas.width, dotsCanvas.height);

    // early exit if there are no points
    if (points.current.length === 0) return;

    // draw the points
    for (
      let x = config.granularity;
      x < dotsCanvas.width;
      x += config.granularity
    ) {
      for (
        let y = config.granularity;
        y < dotsCanvas.height;
        y += config.granularity
      ) {
        const nearestNeighbor = findNearestNeighbor({ x, y }, points.current);

        ctx.beginPath();
        ctx.fillStyle = nearestNeighbor.color;
        ctx.arc(x, y, config.dotRadius, 0, TURN);
        ctx.fill();
      }
    }
  }, []);

  // component api
  useImperativeHandle(ref, () => ({
    clear: () => {
      // reset the points
      points.current = [];

      // clear the dots canvas
      redraw();

      // clear the drawing canvas
      const drawingCanvas = drawingLayer.current;
      if (!drawingCanvas) return;

      drawingCanvas
        .getContext("2d")
        ?.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    },
  }));

  return (
    <div className="relative h-80 w-full border border-gray-600 border-solid">
      <canvas
        className="pointer-events-none absolute h-full w-full opacity-50"
        ref={dotsLayer}
      />
      <canvas
        className="absolute h-full w-full"
        onPointerDown={addPoint}
        ref={drawingLayer}
      />
    </div>
  );
});

/**
 * Find the nearest neighbor of a point in a set of points
 * @param pt - The point to find the nearest neighbor of
 * @param points - The set of points to find the nearest neighbor in
 * @returns The nearest neighbor of the point
 */
function findNearestNeighbor<T extends Point>(pt: Point, points: T[]): T {
  let minDistance = Number.POSITIVE_INFINITY;

  let nearestNeighbor: T | undefined;

  for (const p of points) {
    const distance = Math.hypot(pt.x - p.x, pt.y - p.y);

    if (distance < minDistance) {
      minDistance = distance;
      nearestNeighbor = p;
    }
  }

  if (!nearestNeighbor) {
    throw new Error("Empty array of points");
  }

  return nearestNeighbor;
}

/** Set the size of a canvas element */
function useSetCanvasSize(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    function update() {
      const canvas = ref.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas.height = height;
      canvas.width = width;
    }

    // initial resize
    update();

    // update the canvas size on window resize
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, [ref.current]);
}
