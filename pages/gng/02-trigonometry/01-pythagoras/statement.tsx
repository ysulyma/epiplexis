import { KTX } from "@/components/KTX.tsx";

export default function Statement() {
  const width = 200;
  const height = 100;

  const degrees = Math.PI / 180;

  const turn = Math.PI / 2;

  const angle = Math.atan(height / width);

  // c square
  const c = Math.hypot(width, height);

  const transform = `rotate(${-angle / degrees} 0 0)`;

  const xc = width / 2 + (c / 2) * Math.cos(angle + turn);
  const yc = -(height / 2 + (c / 2) * Math.sin(angle + turn));

  return (
    <svg
      className="mx-auto w-screen stroke-black text-2xl dark:stroke-white"
      strokeWidth="1.5"
      viewBox="-105 -300 410 500"
    >
      {/* a square */}
      <g>
        <rect
          className="fill-red-600"
          height={width}
          strokeWidth="1"
          width={width}
          x="0"
          y="0"
        />
        <foreignObject
          className="overflow-visible"
          height={height / 2}
          width={height / 2}
          x={width / 2}
          y={width / 2}
        >
          <KTX className="fixed block w-min -translate-x-1/2 -translate-y-1/2">
            a^2
          </KTX>
        </foreignObject>
      </g>

      {/* b square */}
      <g>
        <rect
          className="fill-blue-600"
          height={height}
          strokeWidth="1"
          width={height}
          x={width}
          y={-height}
        />
        <foreignObject
          className="overflow-visible"
          height="50"
          width="50"
          x={width + height / 2}
          y={-height / 2}
        >
          <KTX className="fixed block w-min -translate-x-1/2 -translate-y-1/2">
            b^2
          </KTX>
        </foreignObject>
      </g>

      {/* c square */}
      <rect
        className="fill-green-600"
        height={c}
        strokeWidth="1"
        transform={transform}
        width={c}
        x="0"
        y={-c}
      />
      <foreignObject
        className="overflow-visible"
        height="50"
        width="50"
        x={xc}
        y={yc}
      >
        <KTX className="fixed block w-min -translate-x-1/2 -translate-y-1/2">
          c^2
        </KTX>
      </foreignObject>

      {/* triangle */}
      <g>
        <path
          className="fill-violet-600"
          d={`M 0 0 l ${width} ${-height} v ${height} z`}
        />
        <path d={`M ${width} -20 h -20 v 20`} fill="none" />
      </g>
    </svg>
  );
}
