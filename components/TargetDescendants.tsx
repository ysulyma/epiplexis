import { omit } from "@liqvid/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  type DurationLike,
  type Playback,
  type Script,
  useMarker,
  usePlayback,
  useScriptOptional,
} from "liqvid";
import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

export interface AnimationConfig {
  delay?: DurationLike;
  duration: DurationLike;
  easing?: string;
  fill?: FillMode;
  keyframes: Keyframe[];
}

export type SelectorConfig =
  | {
      class: string;
      id?: undefined;
      selector?: undefined;
    }
  | {
      class?: undefined;
      id: string;
      selector?: undefined;
    }
  | {
      class?: undefined;
      id?: undefined;
      selector: string;
    };

type CleanUpFn = () => void;

export type TargetConfig<M extends string = string> = SelectorConfig & {
  /** animation to apply to target */
  // animate?: AnimationConfig | ((node: Element) => AnimationConfig);

  /** custom handler */
  custom?: <T extends Element = Element>(
    node: T,
    args: {
      playback: Playback;

      script: Script<M> | null;
    },
  ) => CleanUpFn;

  /** optional marker prefix during which target should be visible */
  during?: string;

  /** optional name of marker when targeted content should enter */
  from?: M;

  /** optional name of marker when targeted content should exit */
  to?: M;
};

type IndexedTransform = Omit<TargetConfig, "from" | "to"> & {
  /** index of first marker where transform should apply */
  fromIndex?: number;

  /** index of first marker where transform should no longer apply */
  toIndex?: number;
};

/**
 * Helper to apply transforms to descendants. This is primarily for
 * working with content managed by third-party plugins outside of React,
 * e.g. animating equations rendered by KaTeX.
 */
export function TargetDescendants<M extends string = string>({
  asChild = false,
  children,
  transforms = [],
}: {
  asChild?: boolean;
  children?: React.ReactNode;
  transforms?: TargetConfig<M>[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const invisibleClassName = useInvisibleClassName();
  const playback = usePlayback();

  const script = useScriptOptional();

  const indexedTransforms: IndexedTransform[] = useMemo(() => {
    return transforms.map((t) => {
      const m = omit(t, ["from", "to"]) as IndexedTransform;

      // validate `during`
      if (t.during && !script) {
        throw new Error(
          "Script must be available in order to use `during` in TargetDescendants transform",
        );
      }

      // validate and numerize `from`
      if (t.from) {
        if (!script) {
          throw new Error(
            "Script must be available in order to use `from` in TargetDescendants transform",
          );
        }
        m.fromIndex = script.markers.get(t.from).index;
      }

      // validate and numerize `to`
      if (t.to) {
        if (!script) {
          throw new Error(
            "Script must be available in order to use `to` in TargetDescendants transform",
          );
        }
        m.toIndex = script.markers.get(t.to).index;
      }

      return m as IndexedTransform;
    });
  }, [script, transforms]);

  const unsubscriptions = useRef<CleanUpFn[]>([]);

  /** Apply transformations to descendants */
  const update = useEffectEvent(() => {
    // clean up old transformations
    for (const unsub of unsubscriptions.current) {
      unsub();
    }

    const div = ref.current;
    if (!div) return;

    for (const t of indexedTransforms) {
      const matchesDuring =
        t.during === undefined || script!.active.name.startsWith(t.during);
      const matchesFrom =
        t.fromIndex === undefined || t.fromIndex <= script!.active.index;
      const matchesTo =
        t.toIndex === undefined || script!.active.index < t.toIndex;

      const isActive = matchesDuring && matchesFrom && matchesTo;

      let elts: Element[];
      if (t.class) {
        elts = Array.from(div.getElementsByClassName(t.class));
      } else if (t.id) {
        const elt = document.getElementById(t.id);
        elts = elt ? [elt] : [];
      } else if (t.selector) {
        elts = Array.from(div.querySelectorAll(t.selector));
      } else {
        elts = [];
      }

      for (const elt of elts) {
        if (t.custom) {
          unsubscriptions.current.push(t.custom(elt, { playback, script }));
        } else {
          elt.classList.toggle(invisibleClassName, !isActive);
        }
      }
    }
  });

  // initial render
  useEffect(() => {
    update();
  }, []);

  // update when descendants change
  useEffect(() => {
    if (!ref.current) return;

    const observer = new MutationObserver(update);
    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    });

    // disconnect the observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  // update on marker change
  useMarker(update);

  const Component = asChild ? Slot : "div";

  return <Component ref={ref}>{children}</Component>;
}

/**
 * Although we explicitly set the opacity/pointerEvents above,
 * we keep this class for use by TargetDescendants
 */
export function useInvisibleClassName() {
  const className = "lv-script-invisible";
  const [added, setAdded] = useState(
    () =>
      typeof globalThis.document !== "undefined" &&
      Boolean(document.querySelector(`style#${className}`)),
  );

  useEffect(() => {
    if (added) return;

    // previous check prevents this instance from re-running but doesn't
    // de-dupe other instances (all the useEffect's will run at the
    // same time after page load)
    if (document.querySelector(`style#${className}`)) return;

    const style = document.createElement("style");
    style.setAttribute("id", className);
    style.setAttribute("type", "text/css");
    style.textContent = `.${className}, .${className} * {
      opacity: 0 !important;
      pointer-events: none !important;
    }`;
    document.head.appendChild(style);

    setAdded(true);
  }, [added]);

  return className;
}
