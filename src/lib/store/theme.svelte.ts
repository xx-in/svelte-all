const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

let isDark = $state(mediaQuery.matches);

export const getIsDark = () => isDark;

export const setIsDark = (value: boolean) => (isDark = value);

mediaQuery.addEventListener("change", (e) => {
  isDark = e.matches;
  console.log("??change", isDark);
});
