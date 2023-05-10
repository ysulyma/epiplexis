import {createContext, useContext} from "react";

export const ScaleContext = createContext<number | undefined>(undefined);
ScaleContext.displayName = "ScaleContext";

export function useScale(initial: number): number {
  return useContext(ScaleContext) ?? initial;
}
