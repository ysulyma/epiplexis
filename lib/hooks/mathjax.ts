import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { objectEntries } from "ts-extras";

import type { GuaranteedMap, Unsubscribe } from "@/lib/types.ts";

import { callAll } from "../utils.ts";

export interface MathJaxTagConfig {
  className?: string;
  initial?: number | string;
}

export interface MathJaxTag {
  element: Element | undefined;
  tex: string;
  update: (value: string) => void;
}

export interface MathJaxIds<Id extends string> {
  map: GuaranteedMap<Id, MathJaxTag>;

  /** Attach this to MathJax components  */
  onTypeset: () => void;

  /** Ref to attach to an ancestor element */
  ref: React.RefObject<HTMLElement | null>;

  useSyncPointDown: <Point extends number[]>(
    point: Point,
    ids: Overwrite<Id, Point>,
    opts?: {
      format?: (x: number) => string;
    },
  ) => void;
}

/** Query for visible MathJax elements */
const querySelectorMathJax = <T extends Element>(
  elt: HTMLElement,
  selector: string,
) =>
  (
    Array.from(elt.querySelectorAll(selector)).filter(
      (elt) => !elt.closest("mjx-assistive-mml"),
    ) as T[]
  ).at(0);

function useMathJaxMap<
  Id extends string,
  TElement extends MathJaxTag,
  TConfig extends MathJaxTagConfig,
>(
  config: Record<Id, TConfig>,
  {
    selector,
    getItem,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selector: (id: string) => string;
    getItem: (
      elt: TElement["element"],
      id: string,
      config: TConfig,
    ) => TElement;
  },
) {
  const idPrefix = useId();

  const ref = useRef<HTMLElement>(null);

  const [map, setMap] = useState(
    () =>
      new Map(
        objectEntries(config).map(([id, eltConfig]) => [
          id as Id,
          getItem(undefined, idPrefix + id, eltConfig),
        ]),
      ) as GuaranteedMap<Id, TElement>,
  );

  /** Update the refs when MathJax re-renders */
  const onTypeset = useCallback(() => {
    if (!ref.current) return;
    const newMap = new Map() as GuaranteedMap<Id, TElement>;

    for (const [id, eltConfig] of objectEntries(config)) {
      const element = querySelectorMathJax<TElement["element"] & Element>(
        ref.current,
        selector(idPrefix + id),
      );

      newMap.set(id as Id, getItem(element, idPrefix + id, eltConfig));
    }

    setMap(newMap);
  }, [config, getItem, idPrefix, selector]);

  /** Sync the elements with the given point */
  const useSyncPointDown = useCallback(
    function useSyncPointDown<Point extends number[]>(
      point: Point,
      ids: Overwrite<Id, Point>,
      { format = (x) => x.toString() }: { format?: (x: number) => string } = {},
    ) {
      useEffect(() => {
        for (let i = 0; i < ids.length; ++i) {
          const id = ids[i];
          const tag = map.get(id);
          if (tag) {
            tag.update(format(point[i]));
          }
        }
      }, [format, ids, point]);
    },
    [map],
  );

  return { idPrefix, map, onTypeset, ref, useSyncPointDown };
}

export function useMathJaxElements<Id extends string>(
  config: Record<Id, MathJaxTagConfig>,
): MathJaxIds<Id> {
  const { map, onTypeset, ref, useSyncPointDown } = useMathJaxMap<
    Id,
    MathJaxTag,
    // biome-ignore lint/suspicious/noExplicitAny:
    any
  >(
    config,
    useMemo(
      () => ({
        getItem: (
          element,
          id,
          { className, initial = "" }: MathJaxTagConfig,
        ) => {
          let tex = String.raw`\cssId{${id}}{${initial}}`;
          if (className) {
            tex = String.raw`\class{${className}}{${tex}}`;
          }

          return {
            element,
            tex,
            update: (value) => {
              if (element) {
                element.textContent = value;
              }
            },
          };
        },
        selector: (id: string) => `[id="${id}"]`,
      }),
      [],
    ),
  );

  return { map, onTypeset, ref, useSyncPointDown };
}

// inputs
export interface MathJaxInputConfig extends MathJaxTagConfig {
  size?: number;
}

type MathJaxInputEvent = "change" | "input";
type MathJaxInputsEventMap = {
  change: HTMLInputElement;
  input: HTMLInputElement;
};

export interface MathJaxInput extends MathJaxTag {
  element: HTMLInputElement | undefined;
  emit: <K extends MathJaxInputEvent>(
    eventName: K,
    data: MathJaxInputsEventMap[K],
  ) => void;
  on: <K extends MathJaxInputEvent>(
    eventName: MathJaxInputEvent,
    listener: (value: MathJaxInputsEventMap[K]) => void,
  ) => Unsubscribe;
}

export interface MathJaxInputs<Id extends string> extends MathJaxIds<Id> {
  map: GuaranteedMap<Id, MathJaxInput>;
  useSyncPointDown: <Point extends number[]>(
    point: Point,
    ids: Overwrite<Id, Point>,
    opts?: {
      format?: (x: number) => string;
    },
  ) => void;

  useSyncPointUp: <Point extends number[]>(
    point: Point,
    ids: Overwrite<Id, Point>,
    opts?: {
      onChange?: (point: Point) => unknown;
    },
  ) => void;
}

type Overwrite<New, Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Tail]
    ? [New, ...Overwrite<New, Tail>]
    : never;

export function useMathJaxInputs<Id extends string>(
  config: Record<Id, MathJaxInputConfig>,
): MathJaxInputs<Id> {
  const { idPrefix, map, onTypeset, ref, useSyncPointDown } = useMathJaxMap<
    Id,
    MathJaxInput,
    MathJaxInputConfig
  >(
    config,
    useMemo(
      () => ({
        getItem: (
          element,
          id,
          { className = "", initial = "", size = 4 }: MathJaxInputConfig,
        ): MathJaxInput => {
          const listeners: Map<
            MathJaxInputEvent,
            Set<(value: unknown) => unknown>
          > = new Map([
            ["change", new Set()],
            ["input", new Set()],
          ]);

          return {
            element,
            emit: (event: MathJaxInputEvent, value: unknown) => {
              for (const listener of listeners.get(event) ?? []) {
                listener(value);
              }
            },
            on: (
              event: MathJaxInputEvent,
              // biome-ignore lint/suspicious/noExplicitAny:
              listener: (value: any) => unknown,
            ) => {
              listeners.get(event)?.add(listener);

              return () => {
                listeners.get(event)?.delete(listener);
              };
            },
            tex: String.raw`\input[${size}][${className}][${initial}]{${id}}`,
            update: (value) => {
              if (element) {
                element.value = value;
              }
            },
          };
        },
        selector: (id: string) => `input[id="${id}"]`,
      }),
      [],
    ),
  );

  // change listeners
  useEffect(() => {
    /** Change event handler */
    const changeHandler = (e: Event) => {
      const input = e.currentTarget as HTMLInputElement;
      const id = input.id.slice(idPrefix.length) as Id;

      if (!(id in config)) return;

      map.get(id).emit("change", input);
    };

    /** Input event handler */
    const inputHandler = (e: Event) => {
      const input = e.currentTarget as HTMLInputElement;
      const id = input.id.slice(idPrefix.length) as Id;

      if (!(id in config)) return;

      map.get(id).emit("input", input);
    };

    // add listeners
    for (const inputObj of map.values()) {
      inputObj.element?.addEventListener("change", changeHandler);
      inputObj.element?.addEventListener("input", inputHandler);
    }

    // remove listeners
    return () => {
      for (const inputObj of map.values()) {
        inputObj.element?.removeEventListener("change", changeHandler);
        inputObj.element?.removeEventListener("input", inputHandler);
      }
    };
  }, [config, idPrefix, map]);

  const useSyncPointUp = useCallback(
    function useSyncPointUp<Point extends number[]>(
      point: Point,
      ids: Overwrite<Id, Point>,
      { onChange }: { onChange?: (point: Point) => void } = {},
    ) {
      useEffect(
        () =>
          callAll(
            ...ids.map((id, index) =>
              map.get(id).on("change", (input) => {
                const value = Number.parseFloat(input.value);
                if (!Number.isFinite(value)) return;

                point[index] = value;

                onChange?.(point);
              }),
            ),
          ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ids, onChange, point],
      );
    },
    [map],
  );

  return { map, onTypeset, ref, useSyncPointDown, useSyncPointUp };
}
