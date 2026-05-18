"use client";

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { useEventListener } from "usehooks-ts";

const ScaleContext = createContext<number | undefined>(undefined);
ScaleContext.displayName = "ScaleContext";

/** @package */
export function ScaleProvider({
  children,
  svg,
}: {
  children: React.ReactNode;
  svg: React.RefObject<SVGSVGElement | null>;
}) {
  const [scale, setScale] = useState<number | undefined>();

  const update = useEffectEvent(() => {
    if (!svg.current) return;

    const rect = svg.current.getBoundingClientRect();
    setScale(1_000 / rect.width);
  });

  useEffect(update, []);
  useEventListener("resize", update);

  return (
    <ScaleContext.Provider value={scale}>{children}</ScaleContext.Provider>
  );
}

/** @package */
export function useScale(initial: number): number {
  return useContext(ScaleContext) ?? initial;
}
