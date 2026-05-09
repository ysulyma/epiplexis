import { useTime$ } from "@liqvid/playback/react";
import { Slot } from "@radix-ui/react-slot";
import {
  animate$,
  bezier,
  Duration,
  type DurationLike,
  easings,
  useScript,
} from "liqvid";
import { useRef } from "react";
import type { Object3D } from "three";

import { setOpacity } from "@/lib/animation/three.ts";

const defaultDuration = new Duration({ ms: 300 });

export function FadeIn3<M extends string>({
  children,
  delay = Duration.zero,
  duration = defaultDuration,
  start = Duration.zero,
  endValue = 1,
}: {
  children: React.ReactNode;
  duration?: DurationLike;
  delay?: DurationLike;
  endValue?: number;
  start?: M | DurationLike;
}) {
  const script = useScript<M>();

  const animOpacity = animate$({
    duration,
    easing: bezier(...easings.easeInCubic),
    endValue,
    startTime: (typeof start === "string"
      ? script.markers.get(start).start
      : Duration.from(start)
    ).plus(delay),
  });

  const ref = useRef<Object3D>(null);
  useTime$(animOpacity, (opacity) => {
    if (!ref.current) return;
    setOpacity(ref.current, opacity);
  });

  // biome-ignore lint/suspicious/noExplicitAny: Slot assumes HTML
  return <Slot ref={ref as any}>{children}</Slot>;
}

export function FadeInOut3<M extends string>({
  children,

  enter,
  enterDelay = Duration.zero,
  enterDuration = defaultDuration,
  exit,
  exitDelay = Duration.zero,
  exitDuration = defaultDuration,
  target = 1,
}: {
  children: React.ReactNode;
  enter: M | DurationLike;
  enterDelay?: DurationLike;
  enterDuration?: DurationLike;

  exit: M | DurationLike;
  exitDelay?: DurationLike;
  exitDuration?: DurationLike;

  target?: number;
}) {
  const script = useScript<M>();

  const animOpacity = animate$([
    {
      duration: enterDuration,
      easing: bezier(...easings.easeInCubic),
      endValue: target,
      startTime: (typeof enter === "string"
        ? script.markers.get(enter).start
        : Duration.from(enter)
      ).plus(enterDelay),
    },
    {
      duration: exitDuration,
      easing: bezier(...easings.easeOutCubic),
      endValue: 0,
      startTime: (typeof exit === "string"
        ? script.markers.get(exit).start
        : Duration.from(exit)
      ).plus(exitDelay),
      startValue: target,
    },
  ]);

  const ref = useRef<Object3D>(null);
  useTime$(animOpacity, (opacity) => {
    if (!ref.current) return;
    setOpacity(ref.current, opacity);
  });

  // biome-ignore lint/suspicious/noExplicitAny: Slot assumes HTML
  return <Slot ref={ref as any}>{children}</Slot>;
}
