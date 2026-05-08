import type { AppProps } from "next/app";

import { initializeDarkMode, useSyncDarkMode } from "@/lib/api/dark-mode";
import { useSyncHeight } from "@/lib/api/height";

import "./global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  initializeDarkMode();
  useSyncDarkMode();
  useSyncHeight();

  return <Component {...pageProps} />;
}
