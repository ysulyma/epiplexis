import { Html as DreiHtml } from "@react-three/drei";
import katex from "katex";
import dynamic from "next/dynamic";
import Head from "next/head";
import { forwardRef, useEffect, useRef } from "react";

import { fadeIn } from "@/lib/animation/css.ts";

// @todo make Liqvid support Next
export const Player = dynamic(
  () =>
    import("liqvid").then((Liqvid) => {
      return function Player(
        props: React.ComponentPropsWithoutRef<typeof Liqvid.Player>,
      ) {
        return (
          <>
            <Head>
              <style>{`
          .lv-player, .lv-canvas {
            background: transparent !important;
          }`}</style>
            </Head>
            <Liqvid.Player
              controls={
                <>
                  <Liqvid.Controls.PlayPause />
                  <Liqvid.Controls.TimeDisplay />

                  <div className="lv-controls-right">
                    <Liqvid.Controls.FullScreen />
                  </div>
                </>
              }
              {...props}
            />
          </>
        );
      };
    }),
  { ssr: false },
);

export const KTX = forwardRef(function KTX(props, ref) {
  return <DynamicKTX {...props} forwardedRef={ref} />;
});

const DynamicKTX = dynamic(
  () =>
    import("@liqvid/katex").then(({ KTX }) => {
      return function DynamicKTX({
        forwardedRef,
        ...props
      }: React.ComponentProps<typeof KTX> & {
        forwardedRef?: React.ComponentRef<typeof KTX>;
      }) {
        return <KTX {...props} ref={forwardedRef} />;
      };
    }),
  {
    loading: () => <span />,
    ssr: false,
  },
);

export const Canvas = dynamic(
  () => import("@liqvid/react-three").then(({ Canvas }) => Canvas),
  { ssr: false },
);

export const Html = dynamic(
  () =>
    import("liqvid").then(
      ({ Player, usePlayer }) =>
        function Html({
          children,
          ...props
        }: React.PropsWithChildren<React.ComponentProps<typeof DreiHtml>>) {
          return (
            <DreiHtml {...props}>
              <Player.Context.Provider value={usePlayer()}>
                {children}
              </Player.Context.Provider>
            </DreiHtml>
          );
        },
    ),
  { ssr: false },
);

export function LoadKaTeX() {
  if (typeof globalThis.window !== "undefined") {
    // biome-ignore lint/suspicious/noExplicitAny:
    (window as any).katex = katex;
  }

  const base =
    globalThis.location?.origin === "http://localhost:3000"
      ? ""
      : "/epiplexis-next";

  return (
    <Head>
      <script async src={`${base}/symbols.tex`} type="math/tex" />
      {/* @todo fix @liqvid/katex so this isn't necessary */}
      <script async src="katex.js" />
    </Head>
  );
}

export function toposort(a: Node, b: Node) {
  const pos = a.compareDocumentPosition(b);
  if (pos & Node.DOCUMENT_POSITION_PRECEDING) return -1;
  if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return 1;
  return 0;
}

export const KatexAnimations = dynamic(
  () =>
    import("liqvid").then(
      ({ usePlayback, useScript }) =>
        function KatexAnimations({ children }: { children: React.ReactNode }) {
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
                  const [, marker] = node.dataset.anim?.split(";");
                  fadeIn(playback, script.parseStart(marker))(node);
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
        },
    ),
  { ssr: false },
);
