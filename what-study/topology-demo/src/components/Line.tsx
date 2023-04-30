import {lerp} from "@liqvid/utils/misc";
import classNames from "classnames";
import {useEffect, useRef} from "react";

import {useStore} from "../store";
import {closestPoint, useDrag} from "../utils";

import styles from "./input.module.scss";

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

  // sync with input
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

  // dragging
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

    useStore.setState({line: closest / lengthRef.current});
  });

  // keyboard
  const step = 0.01;
  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      useStore.setState((prev) => ({line: prev.line - step}));
    } else if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      useStore.setState((prev) => ({line: prev.line + step}));
    }
  };

  return (
    <>
      <LineSvg
        {...props}
        ref={line}
        tabIndex={0}
        className={styles.container}
        onKeyDown={onKeyDown}
        stroke="var(--cyan9)"
      />
      <circle
        className={classNames("draggable", styles.handle)}
        r="1"
        strokeWidth="0.25"
        ref={handleRef}
        style={{"--shadow": ".5px"} as React.CSSProperties}
        {...events}
      />
    </>
  );
}
