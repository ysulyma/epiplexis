import {useEffect} from "react";

/** Try to use system color scheme */
export function DarkTheme() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const setTheme = () => {
      document.documentElement.classList.toggle("dark-theme", query.matches);
    };

    query.addEventListener("change", setTheme);

    setTheme();

    return () => query.removeEventListener("change", setTheme);
  });
  return null;
}
