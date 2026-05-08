import type { OrbitControls } from "@react-three/drei";
import { createContext, useContext } from "react";

const ControlsContext = createContext<
  React.ComponentRef<typeof OrbitControls> | undefined
>(undefined);
ControlsContext.displayName = "Controls";

export function useControls() {
  return useContext(ControlsContext);
}
