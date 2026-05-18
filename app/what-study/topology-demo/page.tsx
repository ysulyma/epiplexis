"use client";

import { useId, useRef } from "react";

import { AngleControl } from "./AngleControl.tsx";
import { Circle } from "./Circle.tsx";
import { Line } from "./Line.tsx";
import { ScaleProvider } from "./Scale.tsx";
import { useStore } from "./store.ts";

export default function TopologyDemo() {
  const state = useStore();
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    useStore.setState({ line: parseFloat(e.currentTarget.value) });
  };

  const step = 0.01;

  const rangeId = useId();
  const circleId = useId();

  const ref = useRef<SVGSVGElement>(null);

  return (
    <main className="flex h-full max-h-full flex-col items-center overflow-hidden">
      <form className="w-[90%] p-[1em] text-center">
        <p>
          Use the sliders to adjust the position of the points on the curves
        </p>
        <div className="mx-auto my-0 flex w-[90%] justify-between">
          <input
            className="h-fit w-1/2 self-center"
            id={rangeId}
            max={1}
            min={0}
            onChange={onChange}
            step={step}
            type="range"
            value={state.line}
          />
          <AngleControl
            id={circleId}
            onChange={(circle) => useStore.setState({ circle })}
            value={state.circle}
          />
        </div>
      </form>

      <svg className="flex-1" ref={ref} viewBox="-120 -50 240 100">
        <ScaleProvider svg={ref}>
          <Line width="90" x="-110" y="-50" />
          <Circle width="90" x="30" y="-50" />
        </ScaleProvider>
      </svg>
    </main>
  );
}
