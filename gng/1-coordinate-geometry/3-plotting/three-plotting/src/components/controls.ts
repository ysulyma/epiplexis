import {OrbitControls} from "@react-three/drei";
import {createContext, useContext} from "react";

export type RefHandle<T> = T extends React.ForwardRefExoticComponent<infer C>
  ? C
  : never;

export const ControlsContext = createContext<
  RefHandle<typeof OrbitControls> | undefined
>(undefined);
ControlsContext.displayName = "Controls";

export function useControls() {
  return useContext(ControlsContext);
}
