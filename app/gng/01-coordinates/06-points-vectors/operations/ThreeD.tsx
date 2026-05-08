"use client";

import { combineRefs } from "@liqvid/utils/react";
import { Canvas } from "@react-three/fiber";
import { MathJax } from "better-react-mathjax";
import { memo, useMemo, useReducer } from "react";
import { Vector3 } from "three";

import { OrbitControls } from "@/components/three/OrbitControls.tsx";
import { Point } from "@/components/three/Point.tsx";
import { useMathJaxElements, useMathJaxInputs } from "@/lib/hooks/mathjax.ts";
import type { Pt3 } from "@/lib/types.ts";
import { makeContext } from "@/lib/utils.ts";

import { format, leftColor, resultColor, rightColor } from "./shared.tsx";

/** MathJax helper */
const $$ = memo(function $$({
  children,
  ...props
}: React.ComponentProps<typeof MathJax> & { children: string }) {
  return <MathJax {...props}>{raw`\[${children}\]`}</MathJax>;
});

// state
type Mode = "point" | "vector";

type Action =
  | { type: "setLeft"; value: Vector3 }
  | { type: "setRight"; value: Vector3 }
  | { type: "setResult"; value: Vector3 }
  | { type: "setTLeft"; value: Mode }
  | { type: "setTRight"; value: Mode };

interface State {
  left: Vector3;
  right: Vector3;
  result: Vector3;

  tLeft: Mode;
  tRight: Mode;
}

function reducer(state: State, action: Action) {
  const { tLeft, tRight } = state;
  const op =
    tLeft === "point" && tRight === "point" ? "subVectors" : "addVectors";

  switch (action.type) {
    case "setLeft":
      return {
        ...state,
        left: action.value,
        result: new Vector3()[op](action.value, state.right),
      };
    case "setRight":
      return {
        ...state,
        result: new Vector3()[op](state.left, action.value),
        right: action.value,
      };
    case "setResult":
      if (tLeft === tRight) {
        throw new Error();
      }

      if (tLeft === "point") {
        return {
          ...state,
          result: action.value,
          right: new Vector3().subVectors(action.value, state.left),
        };
      } else {
        return {
          ...state,
          left: new Vector3().subVectors(action.value, state.right),
          result: action.value,
        };
      }

    case "setTLeft":
      return {
        ...state,
        tLeft: action.value,
      };
    case "setTRight":
      return {
        ...state,
        tRight: action.value,
      };
  }
}

const initialState: State = {
  left: new Vector3(-0.5, 2, 2),
  result: new Vector3(),
  right: new Vector3(2, -1, -1),
  tLeft: "vector",
  tRight: "vector",
};
initialState.result.addVectors(initialState.left, initialState.right);

const { context, useIt: useThreeDState } = makeContext<
  State & { dispatch: React.Dispatch<Action> }
>({ ...initialState, dispatch: () => {} });

const { raw } = String;

export function ThreeD() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ ...state, dispatch }}>
      <div className="flex flex-1 flex-col">
        <Scene />
        <Controls />
      </div>
    </context.Provider>
  );
}

const Td = (props: React.ComponentProps<"td">) => (
  <td className="text-center">{props.children}</td>
);

function Scene() {
  const { left, right, result, tLeft, tRight } = useThreeDState();

  const leftVec = useMemo(() => new Vector3(...left), [left]);
  const rightVec = useMemo(() => new Vector3(...right), [right]);
  const resultVec = useMemo(() => new Vector3(...result), [result]);

  const headLength = 0.2;
  const headWidth = 0.1;

  // const groupRef = useRef<THREE.Group>(null);

  return (
    <div className="aspect-video w-full bg-grid">
      <Canvas
        camera={{ position: [3.13, 1.12, 1.04] }}
        gl={{ alpha: true }}
        onCreated={(state) => {
          state.gl.localClippingEnabled = true;
        }}
      >
        <ambientLight intensity={Math.PI} />
        <pointLight decay={0} intensity={Math.PI} position={[0, -2, 2]} />

        <axesHelper args={[10]} />

        <OrbitControls />

        {/* vector + vector */}
        {tLeft === "vector" && tRight === "vector" && (
          <>
            {/* main vectors */}
            <arrowHelper
              args={[
                leftVec.clone().normalize(),
                new Vector3(0, 0, 0),
                leftVec.length(),
                leftColor,
                headLength,
                headWidth,
              ]}
            />
            <arrowHelper
              args={[
                rightVec.clone().normalize(),
                new Vector3(0, 0, 0),
                rightVec.length(),
                rightColor,
                headLength,
                headWidth,
              ]}
            />

            {/* shadow vectors */}
            <arrowHelper
              args={[
                leftVec.clone().normalize(),
                rightVec,
                leftVec.length(),
                leftColor,
                headLength,
                headWidth,
              ]}
            />

            <arrowHelper
              args={[
                rightVec.clone().normalize(),
                leftVec,
                rightVec.length(),
                rightColor,
                headLength,
                headWidth,
              ]}
            />

            <arrowHelper
              args={[
                resultVec.clone().normalize(),
                new Vector3(0, 0, 0),
                resultVec.length(),
                resultColor,
                headLength,
                headWidth,
              ]}
            />
          </>
        )}

        {/* point + vector */}
        {tLeft === "point" && tRight === "vector" && (
          <>
            <Point color={leftColor} position={left} />
            <arrowHelper
              args={[
                rightVec.clone().normalize(),
                leftVec,
                rightVec.length(),
                rightColor,
              ]}
            />
            <Point color={resultColor} position={result} />
          </>
        )}

        {/* vector + point */}
        {tLeft === "vector" && tRight === "point" && (
          <>
            <Point color={rightColor} position={right} />
            <arrowHelper
              args={[
                leftVec.clone().normalize(),
                rightVec,
                leftVec.length(),
                leftColor,
              ]}
            />
            <Point color={resultColor} position={result} />
          </>
        )}

        {/* point - point */}
        {tLeft === "point" && tRight === "point" && (
          <>
            <Point color={leftColor} position={left} />
            <Point color={rightColor} position={right} />
            <arrowHelper
              args={[
                resultVec.clone().normalize(),
                rightVec,
                resultVec.length(),
                resultColor,
              ]}
            />
          </>
        )}
      </Canvas>
    </div>
  );
}

function Controls() {
  const { left, right, result, tLeft, tRight, dispatch } = useThreeDState();

  const $inputs = useMathJaxInputs(
    useMemo(
      () => ({
        ax: {
          className: "matrix-entry",
          initial: format(initialState.left.x),
        },
        ay: {
          className: "matrix-entry",
          initial: format(initialState.left.y),
        },
        az: {
          className: "matrix-entry",
          initial: format(initialState.left.z),
        },
        bx: {
          className: "matrix-entry",
          initial: format(initialState.right.x),
        },
        by: {
          className: "matrix-entry",
          initial: format(initialState.right.y),
        },
        bz: {
          className: "matrix-entry",
          initial: format(initialState.right.z),
        },
      }),
      [],
    ),
  );

  // console.log("inputs", $inputs);

  const $results = useMathJaxElements(
    useMemo(
      () => ({
        rx: {
          className: "matrix-entry",
          initial: format(initialState.result.x),
        },
        ry: {
          className: "matrix-entry",
          initial: format(initialState.result.y),
        },
        rz: {
          className: "matrix-entry",
          initial: format(initialState.result.z),
        },
      }),
      [],
    ),
  );

  // sync inputs
  $inputs.useSyncPointUp(
    ...useMemo(
      () =>
        [
          left.toArray(),
          ["ax", "ay", "az"] as const,
          {
            onChange: (left) =>
              dispatch({ type: "setLeft", value: new Vector3(...left) }),
          },
        ] satisfies Parameters<typeof $inputs.useSyncPointUp<Pt3>>,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [left, dispatch],
    ),
  );

  $inputs.useSyncPointUp(
    ...useMemo(
      () =>
        [
          right.toArray(),
          ["bx", "by", "bz"] as const,
          {
            onChange: (right) =>
              dispatch({ type: "setRight", value: new Vector3(...right) }),
          },
        ] satisfies Parameters<typeof $inputs.useSyncPointUp<Pt3>>,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch, right],
    ),
  );

  $results.useSyncPointDown(
    ...useMemo(
      () =>
        [
          result.toArray(),
          ["rx", "ry", "rz"] as const,
          { format },
        ] satisfies Parameters<typeof $results.useSyncPointDown<Pt3>>,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [result],
    ),
  );

  return (
    <fieldset ref={combineRefs($inputs.ref, $results.ref)}>
      <table className="mx-auto w-full">
        <tbody>
          <tr>
            <Td>
              <$$ onTypeset={$inputs.onTypeset}>
                {raw`
                  \color{${leftColor}}
                  \begin{bmatrix}
                    ${$inputs.map.get("ax").tex}\\
                    ${$inputs.map.get("ay").tex}\\
                    ${$inputs.map.get("az").tex}
                  \end{bmatrix}`}
              </$$>
            </Td>
            <Td>
              <$$>{tLeft === "point" && tRight === "point" ? "-" : "+"}</$$>
            </Td>
            <Td>
              <$$ onTypeset={$inputs.onTypeset}>{raw`
                  \color{${rightColor}}
                  \begin{bmatrix}
                    ${$inputs.map.get("bx").tex}\\
                    ${$inputs.map.get("by").tex}\\
                    ${$inputs.map.get("bz").tex}
                  \end{bmatrix}`}</$$>
            </Td>
            <Td>
              <$$>=</$$>
            </Td>
            <Td>
              <$$ onTypeset={$results.onTypeset}>{raw`
                  \color{${resultColor}}
                  \begin{bmatrix}
                    ${$results.map.get("rx").tex}\\
                    ${$results.map.get("ry").tex}\\
                    ${$results.map.get("rz").tex}
                  \end{bmatrix}
                `}</$$>
            </Td>
          </tr>
          <tr>
            <Td>
              <select
                className="dark dark:bg-stone-700"
                onChange={(e) =>
                  dispatch({ type: "setTLeft", value: e.target.value as Mode })
                }
                value={tLeft}
              >
                <option>point</option>
                <option>vector</option>
              </select>
            </Td>
            <Td />
            <Td>
              <select
                className="dark dark:bg-stone-700"
                onChange={(e) =>
                  dispatch({
                    type: "setTRight",
                    value: e.currentTarget.value as Mode,
                  })
                }
                value={tRight}
              >
                <option>point</option>
                <option>vector</option>
              </select>
            </Td>
            <Td />
            <Td>{tLeft === tRight ? "vector" : "point"}</Td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  );
}
