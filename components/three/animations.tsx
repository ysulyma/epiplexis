import { useTime } from "@liqvid/playback/react";
import { animate, bezier, easings } from "@liqvid/utils/animation";
import dynamic from "next/dynamic";
import { Children, cloneElement, useRef } from "react";
import type { Object3D } from "three";

import { setOpacity } from "@/lib/animation/three.ts";

export const FadeIn3 = dynamic(
  () =>
    import("liqvid").then(
      ({ useScript }) =>
        function FadeIn3({
          children,
          delay = 0,
          duration = 300,
          start = 0,
          endValue = 1,
        }: {
          children: React.ReactNode;
          duration?: number;
          delay?: number;
          endValue?: number;
          start?: string | number;
        }) {
          const Child = Children.only(children) as React.ReactElement;
          const script = useScript();

          const animOpacity = animate({
            duration,
            easing: bezier(...easings.easeInCubic),
            endValue,
            startTime: script.parseStart(start) + delay,
          });

          const ref = useRef<Object3D>(null);
          useTime((opacity) => {
            if (!ref.current) return;
            setOpacity(ref.current, opacity);
          }, animOpacity);

          return <>{cloneElement(Child, { ref })}</>;
        },
    ),
  { ssr: false },
);

export const FadeInOut3 = dynamic(
  () =>
    import("liqvid").then(
      ({ useScript }) =>
        function FadeIn3({
          children,

          enter,
          enterDelay = 0,
          enterDuration = 300,
          exit,
          exitDelay = 0,
          exitDuration = 300,
          target = 1,
        }: {
          children: React.ReactNode;
          enter: string | number;
          enterDelay?: number;
          enterDuration?: number;

          exit: string | number;
          exitDelay?: number;
          exitDuration?: number;

          target?: number;
        }) {
          const Child = Children.only(children) as React.ReactElement;
          const script = useScript();

          const animOpacity = animate([
            {
              duration: enterDuration,
              easing: bezier(...easings.easeInCubic),
              endValue: target,
              startTime: script.parseStart(enter) + enterDelay,
            },
            {
              duration: exitDuration,
              easing: bezier(...easings.easeOutCubic),
              endValue: 0,
              startTime: script.parseStart(exit) + exitDelay,
              startValue: target,
            },
          ]);

          const ref = useRef<Object3D>(null);
          useTime((opacity) => {
            if (!ref.current) return;
            setOpacity(ref.current, opacity);
          }, animOpacity);

          return <>{cloneElement(Child, { ref })}</>;
        },
    ),
  { ssr: false },
);
