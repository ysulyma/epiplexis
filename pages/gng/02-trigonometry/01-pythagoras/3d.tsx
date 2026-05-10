import { animate$, bezier, easings } from "@liqvid/animation";
import { KaTeXProvider, KTX } from "@liqvid/katex";
import { Duration, Script, UniversalHelper } from "liqvid";
import { DoubleSide, Quaternion, Vector3 } from "three";

import { FadeIn } from "@/components/animations/html.tsx";
import {
  Canvas,
  Html,
  KatexAnimations,
  LiqvidPlayer,
} from "@/components/liqvid.tsx";
import { FadeIn3, FadeInOut3 } from "@/components/three/animations.tsx";
import { OrbitControls } from "@/components/three/OrbitControls.tsx";
import { Point } from "@/components/three/Point.tsx";
import { LineSegment } from "@/components/three/Segment.tsx";
import {
  blue600,
  green500,
  pink600,
  red600,
} from "@/components/three/theme.ts";
import type { Pt3 } from "@/lib/types.ts";

import "katex/dist/katex.min.css";
import "liqvid/dist/liqvid.min.css";

import macros from "./symbols.tex";

const a = [5, 3, 2] as Pt3;
const b = [-1, 5, 4] as Pt3;
const va = new Vector3(...a);
const vb = new Vector3(...b);

const aux = [b[0], b[1], a[2]] as Pt3;

const vc = new Vector3(...aux);
const vab = new Vector3().subVectors(va, vb);
const vac = new Vector3().subVectors(vc, va);
const { raw } = String;

const q = new Quaternion();

q.setFromUnitVectors(new Vector3(0, 1, 0), new Vector3(0, 0, 1)).premultiply(
  new Quaternion().setFromUnitVectors(
    new Vector3(-1, 0, 0),
    vab.clone().setZ(0).normalize(),
  ),
);

const q2 = new Quaternion().setFromUnitVectors(
  new Vector3(-1, 0, 0),
  vac.clone().setZ(0).normalize(),
  // )
);

const script = new Script([
  ["back", "1"],
  ["aux", "1"],
  ["ab", "1"],
  ["c", "1"],
  ["plane", "1"],
  ["dab", "1"],
  ["dz", "1"],
  ["plane2", "1"],
  ["dac", "1"],
  ["qed", "1"],
]);

type M = typeof script extends Script<infer M> ? M : never;

const $u = UniversalHelper<M>;

export default function ThreeD() {
  return (
    <KaTeXProvider macros={macros}>
      <LiqvidPlayer script={script}>
        <section
          className="h-full w-full bg-grid dark:text-white"
          data-affords="click"
          style={{ backgroundImage: `url("/epiplexis-next/grid.png")` }}
        >
          <Canvas
            camera={{ position: [11.01, 9.73, 8.79] }}
            onCreated={(state) => {
              state.gl.localClippingEnabled = true;
            }}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <axesHelper args={[10]} />

            {/* A and B points */}
            <Point color={red600} name="a" position={a} />
            <Point color={blue600} name="b" position={b} />
            <LineSegment a={animateLine} from={a} to={b} />

            {/* Question */}
            <Html position={vb}>
              <span className="ml-24 block w-max text-xl">
                distance from <KTX className="text-red-600">(x_1,y_1,z_1)</KTX>{" "}
                to <KTX className="text-blue-600">(x_2,y_2,z_2)</KTX>?
              </span>
            </Html>

            {/* Pyth3 derivation */}
            <FadeIn3 start="aux">
              <Point color={pink600} name="aux" position={aux} />
            </FadeIn3>

            <Html position={a}>
              <FadeIn<M> at="ab">
                <KTX
                  className="-translate-x-1/2 text-red-600"
                  displayMode
                >{`A(x_1, y_1, z_1)`}</KTX>
              </FadeIn>
            </Html>
            <Html position={b}>
              <FadeIn<M> at="ab">
                <KTX
                  className="-translate-x-1/2 text-blue-600"
                  displayMode
                >{raw`B(x_2, y_2, z_2)`}</KTX>
              </FadeIn>
            </Html>
            <Html position={aux}>
              <FadeIn<M> at="c">
                <KTX
                  className="-translate-x-1/2 text-pink-600"
                  displayMode
                >{raw`C(x_2, y_2, z_1)`}</KTX>
              </FadeIn>
            </Html>

            {/* planes */}
            <FadeInOut3<M>
              enter="plane"
              enterDuration={{ ms: 150 }}
              exit="plane2"
              target={0.5}
            >
              <mesh
                name="plane"
                position={vb.clone().addScaledVector(vab, 0.5)}
                quaternion={q}
              >
                <planeGeometry args={[vab.length() * 2, vab.length() * 1]} />
                <meshPhysicalMaterial
                  color={green500}
                  metalness={0.3}
                  roughness={0}
                  side={DoubleSide}
                />
              </mesh>
            </FadeInOut3>
            <FadeIn3<M> endValue={0.5} start="plane2">
              <mesh
                name="plane2"
                position={va.clone().addScaledVector(vac, 0.5)}
                quaternion={q2}
              >
                <planeGeometry args={[vac.length() * 2, vac.length()]} />
                <meshToonMaterial color={green500} side={DoubleSide} />
              </mesh>
            </FadeIn3>
          </Canvas>
        </section>
        <KatexAnimations>
          <$u from="dab">
            <KTX
              className="absolute right-8 bottom-20 rounded-md bg-gray-200/50 p-2 text-xl shadow-lg dark:bg-stone-800/50"
              data-from-first="dab"
              displayMode
              macros={{
                "\\animate": raw`\htmlData{lv-ktx-animate=#1}{#2}`,
                "\\fadeIn": raw`\animate{fadeIn;#1}{#2}`,
                "\\pA": raw`\htmlClass{text-red-600}A`,
                "\\pB": raw`\htmlClass{text-blue-600}B`,
                "\\pC": raw`\htmlClass{text-pink-600}C`,
              }}
            >{raw`
            \begin{aligned}
              \fadeIn{dab;delay:10ms;easing:ease-in-out;duration:300ms}{d(\pA, \pB)^2} &\fadeIn{dab}{=
              d(\pA, \pC)^2 + d(\pC, \pB)^2}\\
              &\fadeIn{dz}{= d(\pA, \pC)^2 + (z_2-z_1)^2}\\
              \fadeIn{dac}{d(\pA, \pC)^2} &\fadeIn{dac}{= (x_2 - x_1)^2 + (y_2 - y_1)^2}\\
              \fadeIn{qed}{d(\pA, \pB)^2} &\fadeIn{qed}{= (x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}
            \end{aligned}
          `}</KTX>
          </$u>
        </KatexAnimations>
      </LiqvidPlayer>
    </KaTeXProvider>
  );
}

const animateLine = animate$({
  duration: { ms: 700 },
  easing: bezier(...easings.easeInCubic),
  startTime: Duration.zero,
});
