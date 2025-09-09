import { dev } from "$app/environment";
import fs from "node:fs/promises";
import { join } from "node:path";
import { json, type RequestHandler } from "@sveltejs/kit";

async function readDir(dirPath: string) {
  const files = await fs.readdir(dirPath);
  return files;
}

/**
 * 获取指定目录下的文件列表
 * @param param0
 * @returns
 */
export const GET: RequestHandler = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const path = search.get("path")!;
  const dirPath = dev ? join("./static", path) : join("./build/client", path);
  const files = await readDir(dirPath);
  return json(files);
};
