const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

let isDark = $state(mediaQuery.matches);

export const getIsDark = () => isDark;

export const setIsDark = (value: boolean) => {
  isDark = value;
  if (value) {
    document.documentElement.dataset.theme = "dark";
  } else {
    document.documentElement.dataset.theme = "light";
  }
};

setIsDark(isDark);

mediaQuery.addEventListener("change", (e) => {
  setIsDark(e.matches);
});
