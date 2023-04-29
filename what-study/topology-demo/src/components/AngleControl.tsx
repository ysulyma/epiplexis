import {screenToSVG} from "@liqvid/utils/svg";
import * as classNames from "classnames";
import {useEffect, useRef} from "react";

import {DEGREES, TWOPI, useDrag} from "../utils";

import styles from "./AngleControl.module.scss";

/** Clamp angles to [0, TWOPI) */
const clampAngle = (t: number) => ((t % TWOPI) + TWOPI) % TWOPI;

export function AngleControl({
  onChange,
  value = 0,
}: {
  onChange?: (value: number) => void;
  value?: number;
}) {
  const r = 45;

  const svg = useRef<SVGSVGElement>(null);
  const handle = useRef<SVGCircleElement>(null);

  // mouse control
  const events = useDrag((e, hit) => {
    if (!handle.current) return;

    const [x, y] = screenToSVG(handle.current, hit.x, hit.y);
    onChange?.(clampAngle(Math.atan2(-y, x)));
  });

  // keyboard control
  useEffect(() => {
    const increment = 0.1;
    const handle = (e: KeyboardEvent) => {
      if (document.activeElement !== svg.current) return;

      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        onChange?.(clampAngle(value + increment));
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        onChange?.(clampAngle(value - increment));
      }
    };

    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  });

  // render
  const degrees = value / DEGREES;

  return (
    <svg
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={degrees}
      aria-valuetext={`${degrees.toFixed(0)} degrees`}
      role="slider"
      focusable
      tabIndex={0}
      className={styles.angleControl}
      ref={svg}
      viewBox="-50 -50 100 100"
    >
      <circle className={styles.track} cx="0" cy="0" r={r} />
      <circle
        className={classNames("draggable", styles.handle)}
        cx={r * Math.cos(value)}
        cy={-r * Math.sin(value)}
        r="4.5"
        ref={handle}
        {...events}
      />
    </svg>
  );
}
