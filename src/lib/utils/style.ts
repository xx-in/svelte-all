import { nanoid } from "nanoid";

const stylesMap = {} as Record<string, HTMLStyleElement>;
function _setStyle() {
  function inner(styleContent: string, id: string = nanoid()) {
    if (stylesMap[id]) {
      stylesMap[id].textContent = styleContent;
    } else {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = styleContent;
      document.head.appendChild(style);
    }
    return id;
  }
  return inner;
}

/**
 * 使用css修改全局样式
 */
export const setStyle = _setStyle();

/**
 * 移除通过css添加的全局样式
 * @param id
 */
export const removeStyle = (id: string) => {
  const cur = document.getElementById(id);
  cur && cur.remove();
};

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
