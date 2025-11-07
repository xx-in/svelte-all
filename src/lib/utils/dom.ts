/**
 * 获取元素在视口中的位置
 * 在上半部分还是下半部分
 * @param e
 * @returns
 */
export function isDomInBottom(e: HTMLElement) {
  const rect = e.getBoundingClientRect();
  const { top } = rect;
  return top * 2 > globalThis.innerHeight;
}
