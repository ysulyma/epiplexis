import { KTX } from "@/components/KTX.tsx";

const KtxLabel = ({
  children,
  ...attrs
}: React.SVGAttributes<SVGForeignObjectElement> & {
  children: string;
}) => (
  <foreignObject
    className="overflow-visible"
    {...attrs}
    height={100}
    width={200}
  >
    {/* fixed is only necessary for Safari */}
    <KTX className="fixed block w-min -translate-x-1/2 -translate-y-1/2">
      {children}
    </KTX>
  </foreignObject>
);

export default function Proof() {
  const a = 200;
  const b = 100;

  const padX = 24;
  const gap = 150;
  const padY = 24;

  return (
    // get around a weird rendering bug
    <div className="w-screen p-2">
      <svg
        className="w-full stroke-black p-2 dark:stroke-white"
        strokeWidth="1.5"
        viewBox={`${-a - b - gap / 2 - padX} ${-padY} ${
          (a + b) * 2 + gap + 2 * padX
        } ${a + b + 2 * padY}`}
      >
        {/* left square */}
        <g transform={`translate(${-(a + b + gap / 2)}, 0)`}>
          <rect className="fill-red-600" height={a} width={a} x="0" y="0" />
          <rect className="fill-violet-600" height={a} width={b} x={a} y="0" />
          <rect className="fill-violet-600" height={b} width={a} x="0" y={a} />
          <rect className="fill-blue-600" height={b} width={b} x={a} y={a} />
          <g className="text-white">
            <KtxLabel {...centroid([0, 0], [a, a])}>a^2</KtxLabel>
            <KtxLabel {...centroid([a, 0], [a + b, a])}>ab</KtxLabel>
            <KtxLabel {...centroid([0, a], [a, a + b])}>ab</KtxLabel>
            <KtxLabel {...centroid([a, a], [a + b, a + b])}>b^2</KtxLabel>
          </g>
          <g className="opacity-50">
            {/* top */}
            <KtxLabel {...centroid([0, 0], [a, -padY])}>a</KtxLabel>
            <KtxLabel {...centroid([a, 0], [a + b, -padY])}>b</KtxLabel>

            {/* left */}
            <KtxLabel {...centroid([0, 0], [-padX, a])}>a</KtxLabel>
            <KtxLabel {...centroid([0, a], [-padX, a + b])}>b</KtxLabel>

            {/* right */}
            <KtxLabel {...centroid([a + b, 0], [a + b + padX, a])}>a</KtxLabel>
            <KtxLabel {...centroid([a + b, a], [a + b + padX, a + b])}>
              b
            </KtxLabel>

            {/* bottom */}
            <KtxLabel {...centroid([0, a + b], [a, a + b + padY])}>a</KtxLabel>
            <KtxLabel {...centroid([a, a + b], [a + b, a + b + padY])}>
              b
            </KtxLabel>
          </g>
        </g>
        {/* right square */}
        <g transform={`translate(${gap / 2}, 0)`}>
          <polygon className="fill-violet-600" points={`0,0 0,${b} ${a},0`} />
          <rect className="fill-violet-600" height={a + b} width={a + b} />
          <polygon
            className="fill-green-600"
            points={`0,${b} ${a},0 ${a + b},${a} ${b},${a + b}`}
          />
          <g className="text-white">
            <KtxLabel {...centroid([0, 0], [a, 0], [0, b])}>\frac12ab</KtxLabel>
            <KtxLabel {...centroid([a, 0], [a + b, 0], [a + b, a])}>
              \frac12 ab
            </KtxLabel>
            <KtxLabel {...centroid([0, 0], [a, 0], [0, b])}>
              \frac12 ab
            </KtxLabel>
            <KtxLabel {...centroid([0, b], [0, a + b], [b, a + b])}>
              \frac12 ab
            </KtxLabel>
            <KtxLabel {...centroid([b, a + b], [a + b, a], [a + b, a + b])}>
              \frac12 ab
            </KtxLabel>
            <KtxLabel {...centroid([0, 0], [a + b, a + b])}>c^2</KtxLabel>
          </g>
          <g className="opacity-50">
            {/* top */}
            <KtxLabel {...centroid([0, 0], [a, -padY])}>a</KtxLabel>
            <KtxLabel {...centroid([a, 0], [a + b, -padY])}>b</KtxLabel>

            {/* left */}
            <KtxLabel {...centroid([0, 0], [-padX, b])}>b</KtxLabel>
            <KtxLabel {...centroid([0, b], [-padX, a + b])}>a</KtxLabel>

            {/* right */}
            <KtxLabel {...centroid([a + b, 0], [a + b + padX, a])}>a</KtxLabel>
            <KtxLabel {...centroid([a + b, a], [a + b + padX, a + b])}>
              b
            </KtxLabel>

            {/* bottom */}
            <KtxLabel {...centroid([0, a + b], [b, a + b + padY])}>b</KtxLabel>
            <KtxLabel {...centroid([b, a + b], [a + b, a + b + padY])}>
              a
            </KtxLabel>
          </g>
        </g>
      </svg>
    </div>
  );
}

type Pt2 = [number, number];
function centroid(...points: Pt2[]): { x: number; y: number } {
  const [totalX, totalY] = points.reduce(
    ([x, y], [x1, y1]) => [x + x1, y + y1],
    [0, 0],
  );

  return {
    x: totalX / points.length,
    y: totalY / points.length,
  };
}
