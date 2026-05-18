export const darkClass = "dark";

/** Script to inject into app mode */
export const darkModeScript = `(${() => {
  const isDark = new URLSearchParams(location.search).get("theme") === "dark";

  // transparency
  document
    .getElementById("meta-color-scheme")
    ?.setAttribute("content", isDark ? "dark" : "light");

  document.documentElement.classList.toggle("dark", isDark);

  document.body.classList.toggle("dark:bg-stone-800", parent === window);
}})()
`;
