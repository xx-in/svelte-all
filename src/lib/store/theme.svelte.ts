const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
export let isDark = mediaQuery.matches;

mediaQuery.addEventListener("change", (e) => {
  isDark = e.matches;
});
