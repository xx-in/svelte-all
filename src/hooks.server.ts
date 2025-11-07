// src/hooks.server.ts
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get("theme-mode") || "system";
  // @ts-ignore
  event.locals.themeMode = theme;
  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace("%data-theme%", theme === "light" ? "light" : "dark"),
  });
};
