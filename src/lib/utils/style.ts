import { nanoid } from "nanoid";

function _setStyle() {
  const stylesMap = {} as Record<string, HTMLStyleElement>;
  function inner(styleContent: string, id: string = nanoid()) {
    if (stylesMap[id]) {
      stylesMap[id].textContent = styleContent;
    } else {
      const style = document.createElement("style");
      style.textContent = styleContent;
      document.head.appendChild(style);
    }
  }
  return inner;
}

/**
 * 使用css修改全局样式
 */
export const setStyle = _setStyle();

/**
 *  随机的深色颜色
 * @returns
 */
export function getRandomDarkColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100); // 50-100%
  const l = Math.floor(Math.random() * 30) + 10; // 10-40%
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * 随机的深色渐变颜色
 * @returns
 */
export function getRandomDarkGradient() {
  const color1 = getRandomDarkColor();
  const color2 = getRandomDarkColor();
  const angle = Math.floor(Math.random() * 360); // 随机角度
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
