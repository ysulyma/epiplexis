import {lerp} from "@liqvid/utils/misc";
import {onDrag} from "@liqvid/utils/react";
import {useRef, useEffect} from "react";

import {useStore} from "../store";
import {closestPoint} from "../utils";

import {ReactComponent as LineSvg} from "../assets/line.svg";

const samples = 200;

export function Line(props: React.SVGProps<SVGSVGElement>) {
  /** The point along the curve */
  const handleRef = useRef<SVGCircleElement>(null);

  /** <svg> of the line */
  const line = useRef<SVGSVGElement>(null);

  /** <path> of the line */
  const pathRef = useRef<SVGPathElement | null>(null);

  /** Total length of the curve */
  const lengthRef = useRef(1);

  useEffect(() => {
    pathRef.current = line.current?.querySelector("path") ?? null;
  });

  // <- input
  useEffect(() => {
    const path = pathRef.current;
    const handle = handleRef.current;

    if (!line.current || !handle || !path) {
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
      const sourcePt = path.getPointAtLength(lerp(0, lengthRef.current, t));

      const pt = sourcePt.matrixTransform(transform);

      handle.setAttribute("cx", String(pt.x));
      handle.setAttribute("cy", String(pt.y));
    };

    // initialize
    updatePosition(useStore.getState().line);

    return useStore.subscribe((state) => state.line, updatePosition);
  });

  // -> input
  const events = onDrag(
    (_, hit) => {
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

      useStore.setState({line: closest / lengthRef.current});
    },
    () => document.body.classList.add("dragging"),
    () => document.body.classList.remove("dragging")
  );

  return (
    <>
      <LineSvg {...props} ref={line} />
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
