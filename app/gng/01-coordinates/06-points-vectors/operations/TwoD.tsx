"use client";

import { combineRefs } from "@liqvid/utils/react";
import { MathJax } from "better-react-mathjax";
import { Coordinates, Mafs, MovablePoint, Vector, vec } from "mafs";
import { memo, useMemo, useReducer } from "react";

import { useMathJaxElements, useMathJaxInputs } from "@/lib/hooks/mathjax.ts";
import type { Pt2 } from "@/lib/types.ts";
import { makeContext } from "@/lib/utils.ts";

import { format, leftColor, resultColor, rightColor } from "./shared.tsx";

const { raw } = String;

/** MathJax helper */
const $$ = memo(function $$({
  children,
  ...props
}: React.ComponentProps<typeof MathJax> & { children: string }) {
  return <MathJax {...props}>{raw`\[${children}\]`}</MathJax>;
});

// state
type Mode = "point" | "vector";

interface State {
  left: Pt2;
  right: Pt2;
  result: Pt2;

  tLeft: Mode;
  tRight: Mode;
}

const initialState: State = {
  left: [0.4, 0.6],
  result: [1.4, -0.4],
  right: [1, -1],
  tLeft: "vector",
  tRight: "vector",
};

type Action =
  | { type: "setLeft"; value: Pt2 }
  | { type: "setRight"; value: Pt2 }
  | { type: "setResult"; value: Pt2 }
  | { type: "setTLeft"; value: Mode }
  | { type: "setTRight"; value: Mode };

function reducer(state: State, action: Action) {
  const { tLeft, tRight } = state;
  const op = tLeft === "point" && tRight === "point" ? vec.sub : vec.add;

  switch (action.type) {
    case "setLeft":
      return {
        ...state,
        left: action.value,
        result: op(action.value, state.right),
      };
    case "setRight":
      return {
        ...state,
        result: op(state.left, action.value),
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
          right: vec.sub(action.value, state.left),
        };
      } else {
        return {
          ...state,
          left: vec.sub(action.value, state.right),
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

const { context, useIt: useTwoDState } = makeContext<
  State & { dispatch: React.Dispatch<Action> }
>({ ...initialState, dispatch: () => {} });

export function TwoD() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ ...state, dispatch }}>
      <div className="flex flex-1 flex-col">
        <figure className="rounded-md border border-solid dark:border-stone-700">
          <Scene />
        </figure>
        <Controls />
      </div>
    </context.Provider>
  );
}

/** Mafs scene */
function Scene() {
  const { left, right, result, tLeft, tRight } = useTwoDState();

  return (
    <div className="aspect-video w-full">
      <Mafs>
        <Coordinates.Cartesian />
        {/* vector + vector */}
        {tLeft === "vector" && tRight === "vector" && (
          <>
            {/* primary vectors */}
            <Vector color={leftColor} tip={left} />
            <LeftMovablePoint />

            <Vector color={rightColor} tip={right} />
            <RightMovablePoint />

            {/* displaced vectors */}
            <Vector color={`${leftColor}33`} tail={right} tip={result} />
            <Vector color={`${rightColor}33`} tail={left} tip={result} />

            {/* result vector */}
            <Vector color={resultColor} tip={result} />
          </>
        )}

        {/* point + vector */}
        {tLeft === "point" && tRight === "vector" && (
          <>
            <LeftMovablePoint />
            <Vector color={rightColor} tail={left} tip={result} />
            <ResultMovablePoint />
          </>
        )}

        {/* vector + point */}
        {tLeft === "vector" && tRight === "point" && (
          <>
            <RightMovablePoint />
            <Vector color={leftColor} tail={right} tip={result} />
            <ResultMovablePoint />
          </>
        )}

        {/* point - point */}
        {tLeft === "point" && tRight === "point" && (
          <>
            <LeftMovablePoint />
            <RightMovablePoint />
            <Vector color={resultColor} tail={right} tip={left} />
          </>
        )}
      </Mafs>
    </div>
  );
}

function LeftMovablePoint() {
  const { left, dispatch } = useTwoDState();
  return (
    <MovablePoint
      color={leftColor}
      onMove={(left: Coords) => dispatch({ type: "setLeft", value: left })}
      point={left}
    />
  );
}

function RightMovablePoint() {
  const { right, dispatch } = useTwoDState();
  return (
    <MovablePoint
      color={rightColor}
      onMove={(right: Coords) => dispatch({ type: "setRight", value: right })}
      point={right}
    />
  );
}

function ResultMovablePoint() {
  const { result, dispatch } = useTwoDState();
  return (
    <MovablePoint
      color={resultColor}
      onMove={(result: Coords) =>
        dispatch({ type: "setResult", value: result })
      }
      point={result}
    />
  );
}

const Td = (props: React.ComponentProps<"td">) => (
  <td className="text-center">{props.children}</td>
);

/** Input */
function Controls() {
  const { left, right, result, tLeft, tRight, dispatch } = useTwoDState();

  const $inputs = useMathJaxInputs(
    useMemo(
      () => ({
        ax: {
          className: "matrix-entry",
          initial: format(initialState.left[0]),
        },
        ay: {
          className: "matrix-entry",
          initial: format(initialState.left[1]),
        },
        bx: {
          className: "matrix-entry",
          initial: format(initialState.right[0]),
        },
        by: {
          className: "matrix-entry",
          initial: format(initialState.right[1]),
        },
      }),
      [],
    ),
  );

  const $results = useMathJaxElements(
    useMemo(
      () => ({
        ra: {
          className: "matrix-entry",
          initial: format(initialState.result[0]),
        },
        rb: {
          className: "matrix-entry",
          initial: format(initialState.result[1]),
        },
      }),
      [],
    ),
  );

  // sync inputs
  $inputs.useSyncPointDown(left, ["ax", "ay"], { format });
  $inputs.useSyncPointUp(left, ["ax", "ay"], {
    onChange: (left) => dispatch({ type: "setLeft", value: left }),
  });

  $inputs.useSyncPointDown(right, ["bx", "by"], { format });
  $inputs.useSyncPointUp(right, ["bx", "by"], {
    onChange: (right) => dispatch({ type: "setRight", value: right }),
  });

  $results.useSyncPointDown(result, ["ra", "rb"], { format });

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
                    ${$inputs.map.get("ay").tex}
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
                    ${$inputs.map.get("by").tex}
                  \end{bmatrix}`}</$$>
            </Td>
            <Td>
              <$$>=</$$>
            </Td>
            <Td>
              <$$ onTypeset={$results.onTypeset}>{raw`
                  \color{${resultColor}}
                  \begin{bmatrix}
                    {${$results.map.get("ra").tex}}\\
                    {${$results.map.get("rb").tex}}
                  \end{bmatrix}
                `}</$$>
            </Td>
          </tr>
          <tr>
            <Td>
              <select
                className="dark dark:bg-stone-700"
                onChange={(e) =>
                  dispatch({
                    type: "setTLeft",
                    value: e.currentTarget.value as Mode,
                  })
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
