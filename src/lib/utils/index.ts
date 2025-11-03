import { pinyin } from "pinyin";

export * from "./clipboard";

/**
 * 同 Object.keys 但是类型更安全
 * @param obj
 * @returns
 */
export function typedKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * 同 Object.entries 但是类型更安全
 * @param obj
 * @returns
 */
export function typedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 * 将字符串处理为拼音
 * @param text
 * @returns
 */
export function toPinyin(text: string) {
  const result = pinyin(text.toLowerCase(), {
    style: pinyin.STYLE_NORMAL,
  })
    .flat()
    .join("");
  return result;
}
