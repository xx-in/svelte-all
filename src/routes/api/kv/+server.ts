import type { RequestHandler } from "./$types";

/**
 * 处理 kv 操作
 * @param param0
 * @returns
 */
export const POST: RequestHandler = async ({ request }) => {
  // 直接透传到另一个服务器地址
  return fetch("https://svelte-kv.deno.dev", request);
};
