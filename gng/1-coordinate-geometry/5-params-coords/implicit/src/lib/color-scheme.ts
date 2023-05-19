import {useEffect, useState} from "react";

const query = window.matchMedia("(prefers-color-scheme: dark)");

export function SyncColorScheme() {
  useEffect(() => {
    const setTheme = () => {
      document.documentElement.classList.toggle("dark-theme", query.matches);
    };

    query.addEventListener("change", setTheme);
    setTheme();

    return () => {
      query.removeEventListener("change", setTheme);
    };
  }, []);

  return null;
}

export function useTheme<T>(light: T, dark: T) {
  const [value, setValue] = useState<T>(query.matches ? dark : light);

  useEffect(() => {
    const setTheme = () => {
      setValue(query.matches ? dark : light);
    };

    query.addEventListener("change", setTheme);
    setTheme();

    return () => {
      query.removeEventListener("change", setTheme);
    };
  });

  return value;
}
