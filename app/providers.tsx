"use client";

import { useSyncDarkMode } from "@/lib/api/dark-mode";
import { useSyncHeight } from "@/lib/api/height";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApplyDarkMode>{children}</ApplyDarkMode>;
}

function ApplyDarkMode({ children }: { children: React.ReactNode }) {
  useSyncDarkMode();
  useSyncHeight();

  return <>{children}</>;
}
