import {screenToSVG} from "@liqvid/utils/svg";
import classNames from "classnames";
import {useRef} from "react";

import {DEGREES, clampAngle, useDrag} from "../utils";

import styles from "./AngleControl.module.scss";
import inputStyles from "./input.module.scss";

export function AngleControl({
  onChange,
  value = 0,
  ...attrs
}: Omit<React.SVGAttributes<SVGSVGElement>, "onChange"> & {
  onChange?: (value: number) => void;
  value?: number;
}) {
  const r = 43;

  const svg = useRef<SVGSVGElement>(null);
  const handle = useRef<SVGCircleElement>(null);

  // mouse control
  const events = useDrag((_, hit) => {
    if (!handle.current) return;

    const [x, y] = screenToSVG(handle.current, hit.x, hit.y);
    onChange?.(clampAngle(Math.atan2(-y, x)));
  });

  // keyboard control
  const increment = 0.1;
  const onKeyDown: React.KeyboardEventHandler<SVGSVGElement> = (e) => {
    if (document.activeElement !== svg.current) return;

    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      onChange?.(clampAngle(value + increment));
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      onChange?.(clampAngle(value - increment));
    }
  };

  // render
  const degrees = value / DEGREES;

  return (
    <svg
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={degrees}
      aria-valuetext={`${degrees.toFixed(0)} degrees`}
      role="slider"
      tabIndex={0}
      className={classNames(styles.angleControl, inputStyles.container)}
      ref={svg}
      viewBox="-50 -50 100 100"
      onKeyDown={onKeyDown}
      {...attrs}
    >
      <circle cx="0" cy="0" r={r} className={styles.track} />
      <circle
        className={classNames("draggable", inputStyles.handle)}
        cx={r * Math.cos(value)}
        cy={-r * Math.sin(value)}
        r="4.5"
        ref={handle}
        style={{"--shadow": "1px"} as React.CSSProperties}
        {...events}
      />
    </svg>
  );
}
