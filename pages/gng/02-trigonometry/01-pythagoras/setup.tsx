import { KTX } from "@/components/KTX.tsx";

export default function Statement() {
  const width = 200;
  const height = 100;

  const padX = 1;
  const padY = 1;

  return (
    <svg
      className="mx-auto w-screen stroke-black dark:stroke-white"
      viewBox={`
      ${-padX} ${-height - padY}
      ${width + width / 8} ${height + height / 4}`}
    >
      <title>
        setup of the Pythagorean theorem: a right-angle triangle with side
        lengths a, b and hypotenuse c
      </title>
      <g>
        <path
          className="fill-violet-600"
          d={`M 0 0 l ${width} ${-height} v ${height} z`}
          strokeWidth="1"
        />
        <path d={`M ${width} -20 h -20 v 20`} fill="none" strokeWidth="1" />
      </g>

      {/* a square */}
      <foreignObject
        className="overflow-visible"
        height={height / 2}
        width={height / 2}
        x={width / 2}
        y={0}
      >
        <KTX className="fixed block w-min">a</KTX>
      </foreignObject>

      <foreignObject
        className="overflow-visible"
        height="50"
        width="50"
        x={width}
        y={-height / 2}
      >
        <KTX className="fixed block w-min translate-x-full -translate-y-1/2">
          b
        </KTX>
      </foreignObject>

      <foreignObject
        className="overflow-visible"
        height="50"
        width="50"
        x={width / 2}
        y={-height / 2}
      >
        <KTX className="fixed block w-min -translate-x-full -translate-y-full">
          c
        </KTX>
      </foreignObject>
    </svg>
  );
}
