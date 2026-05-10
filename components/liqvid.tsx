"use client";

import { ResizeObserver } from "@juggle/resize-observer";
import { KaTeXProvider, useKaTeXContext } from "@liqvid/katex";
import { parseTime$, timeRegexp } from "@liqvid/utils";
import { useContextBridge } from "@react-three/drei";
import { Html as DreiHtml } from "@react-three/drei/web/Html";
import { Canvas as ThreeCanvas, useThree } from "@react-three/fiber";
import { clsx } from "clsx";
import {
  Controls,
  Duration,
  type DurationLike,
  type HidingStrategy,
  Playback,
  PlaybackProvider,
  Player,
  type Script,
  ScriptProvider,
  SegmentProvider,
} from "liqvid";
import { useEffect, useState } from "react";

import { FullScreen, PlayPause } from "./controls.tsx";
import { shortcuts } from "./shortcuts.ts";
import {
  type AnimationConfig,
  TargetDescendants,
} from "./TargetDescendants.tsx";

export function LiqvidPlayer<M extends string>({
  classNames: propClassNames,
  children,
  duration,
  hideWith = "invisible",
  loadingScreen = false,
  script,
  thumbs,
  ...props
}: React.ComponentProps<typeof Player.Root> &
  Pick<React.ComponentProps<typeof Controls.ScrubberBar>, "thumbs"> & {
    classNames?: {
      canvas?: string;
      controls?: string;
    };

    hideWith?: HidingStrategy;

    loadingScreen?: boolean;
  } & (
    | {
        duration?: DurationLike;
        script?: undefined;
      }
    | {
        duration?: undefined;
        script: Script<M>;
      }
  )) {
  // use playback from provided Script if any, otherwise create one from duration
  const [playback] = useState(() => {
    if (script) {
      return script.playback;
    }
    const playback = new Playback();
    playback.duration$ = duration ?? { minutes: 1 };
    return playback;
  });

  return (
    <ScriptProvider script={script} shortcuts={shortcuts.script}>
      <PlaybackProvider value={playback}>
        <SegmentProvider hideWith={hideWith}>
          <Player.Root {...props}>
            <Player.Controls
              className={propClassNames?.controls}
              hideAfter={{ seconds: 3 }}
            >
              <Controls.ScrubberBar
                shortcuts={shortcuts.seeking}
                thumbs={thumbs}
              />
              {/* <KeyboardShortcuts /> */}
              <div className="lv-controls-buttons h-(--lv-controls-height)">
                <PlayPause />

                <Controls.TimeDisplay />

                {/* right controls */}
                <div className="lv-controls-right h-full">
                  <FullScreen />
                </div>
              </div>
            </Player.Controls>
            <Player.Canvas
              className={clsx(
                "bg-[#eee] text-black",
                "dark:bg-[#202020] dark:text-white",
                "transition-colors duration-150",
                propClassNames?.canvas,
              )}
              pauseOnClick={process.env.NODE_ENV === "production"}
            >
              {children}
            </Player.Canvas>
          </Player.Root>
        </SegmentProvider>
      </PlaybackProvider>
    </ScriptProvider>
  );
}

/**
 * Liqvid-aware Canvas component @react-three/fiber
 */
export function Canvas({
  children,
  "data-affords": dataAffords,
  ...props
}: React.ComponentProps<typeof ThreeCanvas> & { "data-affords"?: string }) {
  const ContextBridge = useLiqvidContextBridge();
  return (
    <ThreeCanvas resize={{ polyfill: ResizeObserver }} {...props}>
      <ContextBridge>
        <Fixes dataAffords={dataAffords} />
        {children}
      </ContextBridge>
    </ThreeCanvas>
  );
}

/**
 * Liqvid-aware HTML component @react-three/fiber
 */
export function Html({
  children,
  ...props
}: React.ComponentProps<typeof DreiHtml>) {
  const ContextBridge = useLiqvidContextBridge();

  return (
    <DreiHtml {...props}>
      <ContextBridge>{children}</ContextBridge>
    </DreiHtml>
  );
}

/**
 * Get a `<ContextBridge>` to bridge Liqvid context into a React Three Fiber scene.
 */
export function useLiqvidContextBridge() {
  const symbols = globalThis as Record<symbol, React.Context<unknown>>;

  return useContextBridge(
    ...[
      symbols[Symbol.for("@lqv/playback")],
      symbols[Symbol.for("@liqvid/script")],
      symbols[Symbol.for("@liqvid/keymap")],
      // mistaken release
      symbols[Symbol.for("@lqv/keymap")],
    ].filter(Boolean),
  );
}

/** Default affordances: click and arrow keys */
const defaultAffords = "click keys(ArrowUp,ArrowDown,ArrowLeft,ArrowRight)";

function Fixes({ dataAffords }: { dataAffords?: string }): null {
  const { gl } = useThree();

  useEffect(() => {
    const affords = dataAffords ?? defaultAffords;
    if (affords) {
      gl.domElement.setAttribute("data-affords", affords);
    }
    gl.domElement.style.touchAction = "none";
  }, [dataAffords, gl.domElement]);

  return null;
}

const { raw } = String;

export function KatexAnimations({ children }: { children: React.ReactNode }) {
  const macros = useKaTeXContext().macros;

  const declaredAnimations = {
    fadeIn: {
      duration: new Duration({ ms: 1000 }),
      easing: "ease-in",
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
    },
  } satisfies Record<string, AnimationConfig>;

  return (
    <KaTeXProvider
      macros={{
        ...macros,
        "\\animate": raw`\htmlData{lv-ktx-animate=#1}{#2}`,
        "\\fadeIn": raw`\animate{fadeIn;#1}{#2}`,
      }}
    >
      <TargetDescendants
        transforms={[
          {
            custom: (node: HTMLSpanElement, { playback, script }) => {
              const data = node.dataset.lvKtxAnimate;
              if (!data) return;

              const args = data.split(";");
              if (args.length < 2) {
                console.error("Invalid animation config:", data);
                return;
              }

              const [animationName, rawAt, ...rawOptions] = args;
              const options: Record<string, unknown> = {};

              let at: Duration;
              if (rawAt.match(timeRegexp)) {
                at = parseTime$(rawAt);
              } else if (script) {
                at = script.markers.get(rawAt).start;
              } else {
                console.error("Invalid animation start time:", rawAt);
                return;
              }

              const animation = (
                declaredAnimations as Record<string, AnimationConfig>
              )[animationName];
              if (!animation) {
                console.error("Unknown animation:", animationName);
                return;
              }

              const config = {
                delay: at
                  .plus(animation.delay ?? Duration.zero)
                  .inMilliseconds(),
                duration: Duration.from(animation.duration).inMilliseconds(),
                easing: animation.easing,
                fill: animation.fill ?? "both",
                keyframes: animation.keyframes,
              };

              const subOrUnsub = playback.newAnimation(
                animation.keyframes,
                config,
              );

              subOrUnsub(node);

              return () => {
                subOrUnsub(null);
              };
            },
            selector: "*[data-lv-ktx-animate]",
          },
        ]}
      >
        {children}
      </TargetDescendants>
    </KaTeXProvider>
  );
}
