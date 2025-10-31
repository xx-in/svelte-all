import { nanoid } from "nanoid";

export type IToastItemType = "info" | "success" | "error" | "warning";
export interface IToastItem {
  type: IToastItemType;
  message: string;
  duration: number;
  id: string;
}

export let toastList = $state<Array<IToastItem>>([]);

/**
 * 添加提示
 */
export function addToast(message: string, type: IToastItemType = "info", duration = 3000) {
  const id = nanoid();
  toastList.push({
    type,
    message,
    duration,
    id,
  });
  setTimeout(() => {
    removeToast(id);
  }, duration);
}

export function removeToast(id: string) {
  const index = toastList.findIndex((item) => item.id == id);
  if (index != -1) {
    toastList.splice(index, 1);
  }
}
