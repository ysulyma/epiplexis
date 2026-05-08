import { useEffect } from "react";

import type { UpwardMessage } from "./messages.ts";

export function useSyncHeight() {
  useEffect(() => {
    const onResize = () => {
      window.parent?.postMessage(
        {
          height: document.body.getBoundingClientRect().height,
          type: "sizing.height",
        } satisfies UpwardMessage,
        "*",
      );
    };

    const observer = new ResizeObserver(() => {
      onResize();
    });

    observer.observe(document.body);

    return () => {
      observer.unobserve(document.body);
      observer.disconnect();
    };
  }, []);
}
