let themeMode = $state<"light" | "dark" | "system">("system");
let isDark = $state(false);

let mediaQuery: MediaQueryList | null = null;
const STORAGE_KEY = "theme-mode";
const COOKIE_KEY = "theme-mode";

/** SSR 初始化：在 load 或 hooks.server.ts 中调用 */
export function initDarkSSR(modeFromServer?: "light" | "dark" | "system") {
  if (modeFromServer) {
    themeMode = modeFromServer;
    applyTheme(true);
  }
}

/** 客户端初始化 */
export function initDark() {
  if (typeof window === "undefined") return; // SSR 阶段不执行

  // 从 localStorage 恢复
  const saved = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | "system" | null;
  if (saved === "light" || saved === "dark" || saved === "system") {
    themeMode = saved;
  }

  mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
  applyTheme();

  // 跟随系统变化
  mediaQuery.addEventListener("change", () => {
    if (themeMode === "system") {
      applyTheme();
    }
  });
}

/** 应用主题 */
function applyTheme(skipStorage = false) {
  const dark = themeMode === "system" ? (mediaQuery?.matches ?? false) : themeMode === "dark";

  setIsDark(dark);

  if (!skipStorage && typeof document !== "undefined") {
    localStorage.setItem(STORAGE_KEY, themeMode);
    document.cookie = `${COOKIE_KEY}=${themeMode}; path=/; max-age=31536000`;
  }
}

/** 获取当前是否暗色 */
export const getIsDark = () => isDark;

/** 设置主题模式（"light" | "dark" | "system"） */
export const setThemeMode = (mode: "light" | "dark" | "system") => {
  themeMode = mode;
  applyTheme();
};

/** 获取当前主题模式 */
export const getThemeMode = () => themeMode;

/** 内部使用：直接修改暗色状态 */
export const setIsDark = (value: boolean) => {
  isDark = value;
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = value ? "dark" : "light";
  }
};
