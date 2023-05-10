import {useEffect, useState} from "react";

import {ScaleContext} from "./scale";

export function ScaleProvider({
  children,
  svg,
}: {
  children: React.ReactNode;
  svg: React.RefObject<SVGSVGElement>;
}) {
  const [scale, setScale] = useState<number | undefined>();

  useEffect(() => {
    const update = () => {
      if (!svg.current) return;

      const rect = svg.current.getBoundingClientRect();
      setScale(1000 / rect.width);
    };
    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <ScaleContext.Provider value={scale}>{children}</ScaleContext.Provider>
  );
}
