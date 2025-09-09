import type { Component } from "svelte";

export interface IRenderItem {
  type: string;
  Comp?: Component<any>;
  value: unknown;
  params: Record<string, unknown>;
  key?: string;
  events: {
    [method: string]: (e: Event, item: IRenderItem) => void;
  };
  children?: Array<IRenderItem>;
}

export type IRenderArray = Array<IRenderItem>;
