import { dev } from "$app/environment";
import { json, type RequestHandler } from "@sveltejs/kit";
import fs from "node:fs/promises";
import { join } from "node:path";

async function readDir(dirPath: string) {
  const files = await fs.readdir(dirPath);
  return files;
}

export const GET: RequestHandler = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const path = search.get("path")!;
  const dirPath = dev ? join("./static", path) : join("./build/client", path);
  const files = await readDir(dirPath);

  // 过滤出 .md 或 .k.md 文件
  const mdFiles = files.filter((name) => name.endsWith(".md"));

  // 自定义排序：先普通 .md，再 .k.md，内部按字母排序
  mdFiles.sort((a, b) => {
    const aIsK = a.endsWith(".k.md") ? 1 : 0;
    const bIsK = b.endsWith(".k.md") ? 1 : 0;

    if (aIsK !== bIsK) return aIsK - bIsK; // 普通 .md 在前，.k.md 在后
    return a.localeCompare(b); // 同类按字母排序
  });

  return json(mdFiles);
};
