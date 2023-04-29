import {lerp} from "@liqvid/utils/misc";
import {useEffect, useRef} from "react";

import {useStore} from "../store";
import {TWOPI, closestPoint, useDrag} from "../utils";

import {ReactComponent as CircleSvg} from "../assets/circle.svg";

const samples = 200;

export function Circle(props: React.SVGProps<SVGSVGElement>) {
  /** The point along the curve */
  const handleRef = useRef<SVGCircleElement>(null);

  /** <svg> of the circle */
  const circle = useRef<SVGSVGElement>(null);

  /** <path> of the circle */
  const pathRef = useRef<SVGPathElement | null>(null);

  /** Total length of the curve */
  const lengthRef = useRef(1);

  useEffect(() => {
    pathRef.current = circle.current?.querySelector("path") ?? null;
  });

  // <- input
  useEffect(() => {
    const path = pathRef.current;
    const handle = handleRef.current;

    if (!circle.current || !handle || !path) {
      return;
    }

    const dest = handle.ownerSVGElement!;

    // set length
    lengthRef.current = path.getTotalLength();

    /** Transformation matrix from <path> to host <svg> */
    // https://stackoverflow.com/a/19716648/858315
    const transform = dest
      .getScreenCTM()!
      .inverse()
      .multiply(path.getScreenCTM()!);

    /** Set the position of the handle */
    const updatePosition = (t: number) => {
      const sourcePt = path.getPointAtLength(
        lerp(0, lengthRef.current, t / TWOPI)
      );

      const pt = sourcePt.matrixTransform(transform);

      handle.setAttribute("cx", String(pt.x));
      handle.setAttribute("cy", String(pt.y));
    };

    // initialize
    updatePosition(useStore.getState().circle);

    return useStore.subscribe((state) => state.circle, updatePosition);
  });

  // -> input
  const events = useDrag((_, hit) => {
    const path = pathRef.current!;
    if (!path) return;

    const svg = path.ownerSVGElement!.ownerSVGElement!;

    const transform = path.getScreenCTM()!.inverse();
    let target = svg.createSVGPoint();
    target.x = hit.x;
    target.y = hit.y;

    target = target.matrixTransform(transform);

    const closest = closestPoint({
      min: 0,
      max: lengthRef.current,
      target,
      samples,
      fn: (t) => path.getPointAtLength(t),
    });

    useStore.setState({circle: (closest / lengthRef.current) * TWOPI});
  });

  return (
    <>
      <CircleSvg {...props} ref={circle} />
      <circle
        className="draggable"
        r="1"
        fill="blue"
        ref={handleRef}
        {...events}
      />
    </>
  );
}
