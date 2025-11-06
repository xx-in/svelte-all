import { nanoid } from "nanoid";
import type { Component } from "svelte";

export interface IRenderItem {
  id: string;
  type: string;
  Comp?: Component<any>;
  value: unknown;
  params: Record<string, unknown>;
  key?: string;
  events: {
    [method: string]: string | Function;
  };
  children?: Array<IRenderItem>;
}

export type IRenderArray = Array<IRenderItem>;

/**
 * 测试用数据
 */
export const exampleData: IRenderArray = [
  {
    type: "Div",
    id: nanoid(),
    value: "",
    params: {
      class: "flex items-center",
    },
    events: {},
    children: [
      {
        id: nanoid(),
        type: "Text",
        value: "姓名：",
        params: {},
        events: {},
      },
      {
        type: "Input",
        id: nanoid(),
        value: "123",
        params: {
          placeholder: "请输入姓名",
          class: "border-none",
        },
        events: {},
      },
    ],
  },
  {
    type: "Div",
    value: "",
    params: {
      class: "flex items-center",
    },
    id: nanoid(),
    events: {},
    children: [
      {
        id: nanoid(),
        type: "Text",
        value: "性别：",
        params: {},
        events: {},
      },
      {
        type: "Input",
        value: "男",
        id: nanoid(),
        params: {
          placeholder: "请输入性别",
          class: "border-none",
        },
        events: {},
      },
    ],
  },
  {
    type: "Div",
    value: "",
    id: nanoid(),
    params: {
      class: "flex items-center",
    },
    events: {},
    children: [
      {
        type: "Button",
        id: nanoid(),
        value: "",
        params: {
          class: "py-1 px-4 border bg-blue-500 text-stone-50 rounded-md",
        },
        events: {
          onclick: "()=>{alert('124')}",
        },
        children: [
          {
            type: "Text",
            value: "提交",
            id: nanoid(),
            params: {},
            events: {},
          },
        ],
      },
    ],
  },
];

export function removeById(items: IRenderArray, targetId: string): IRenderArray {
  return items
    .filter((item) => item.id !== targetId) // 过滤掉目标 id
    .map((item) => ({
      ...item,
      children: item.children ? removeById(item.children, targetId) : undefined,
    }));
}
