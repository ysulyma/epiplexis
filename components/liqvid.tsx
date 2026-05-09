"use client";

import { ResizeObserver } from "@juggle/resize-observer";
import { useContextBridge } from "@react-three/drei";
import { Html as DreiHtml } from "@react-three/drei/web/Html";
import { Canvas as ThreeCanvas, useThree } from "@react-three/fiber";
import { clsx } from "clsx";
import {
  Controls,
  type DurationLike,
  type HidingStrategy,
  Playback,
  PlaybackProvider,
  Player,
  type Script,
  ScriptProvider,
  SegmentProvider,
  useKeymapOptional,
  usePlayback,
  usePlaybackOptional,
  useScript,
  useScriptOptional,
} from "liqvid";
import { useEffect, useRef, useState } from "react";

import { fadeIn } from "@/lib/animation/css.ts";

import { FullScreen, PlayPause } from "./controls.tsx";
import { shortcuts } from "./shortcuts.ts";

export function LiqvidPlayer<M extends string>({
  classNames: propClassNames,
  children,
  duration,
  hideWith,
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

export function toposort(a: Node, b: Node) {
  const pos = a.compareDocumentPosition(b);
  if (pos & Node.DOCUMENT_POSITION_PRECEDING) return -1;
  if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return 1;
  return 0;
}

export function KatexAnimations({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const playback = usePlayback();
  const script = useScript();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const { target } = mutation;

        // only process KaTeX descendants
        if (!(target instanceof HTMLElement)) continue;
        if (
          !(
            target.classList.contains("katex") ||
            target.classList.contains("katex-display")
          )
        ) {
          continue;
        }

        const anims = Array.from(
          target.querySelectorAll("*[data-anim]"),
        ) as HTMLSpanElement[];
        for (const node of anims) {
          const [, marker] = node.dataset.anim!.split(";");
          fadeIn(
            playback,
            script.markers.get(marker).start.inMilliseconds(),
          )(node);
          // if (name in animations) {
          //   animations[name](marker)(node);
          // }
        }
      }
    });

    observer.observe(ref.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [playback, script]);

  return <div ref={ref}>{children}</div>;
}
