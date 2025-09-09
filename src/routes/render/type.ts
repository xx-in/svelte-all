import type { Component } from "svelte";

export interface IRenderItem {
  type: Component<any>;
  value: unknown;
  params: Record<string, unknown>;
  events?: {
    [method: string]: (e: Event, item: IRenderItem) => void;
  };
  children?: Array<IRenderItem>;
}

export interface IRenderObject {
  [key: string]: IRenderItem;
}
