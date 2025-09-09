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
