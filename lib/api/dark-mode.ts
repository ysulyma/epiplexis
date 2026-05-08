import { useEventListener } from "usehooks-ts";

import { darkClass } from "./dark-mode-server";
import type { DownwardMessage } from "./messages";
import { Signal, useSignalValue } from "./signal";

type ColorScheme = "light" | "dark";

const signal = new Signal<ColorScheme>("light");

/**
 * Set the color scheme.
 * Passing `true` is the same as passing `"dark"`, and
 * passing `false` is the same as passing `"light"`.
 */
function setColorScheme(value: ColorScheme | boolean) {
  if (typeof value === "boolean") {
    value = value ? "dark" : "light";
  }

  document.documentElement.classList.toggle(darkClass, value === "dark");
  document.documentElement.style.colorScheme = value;
  signal.set(value);
}

export function initializeDarkMode() {
  if (!globalThis.document?.documentElement) return;

  setColorScheme(new URLSearchParams(location.search).has("dark"));
}

export function useSyncDarkMode() {
  useEventListener("message", ({ data }: { data: DownwardMessage }) => {
    if (data.type === "color-scheme") {
      setColorScheme(data.value);
    }
  });
}

export function useColorScheme() {
  return useSignalValue(signal);
}

export function useSchemed<T>(values: { dark: T; light: T }) {
  return values[useColorScheme()];
}
