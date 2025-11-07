<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    topHeight?: number;
    bottomHeight?: number;
    top?: Snippet;
    bottom?: Snippet;
    children: Snippet;
    class?: string;
  }

  let {
    topHeight = $bindable(30),
    bottomHeight = $bindable(30),
    top,
    bottom,
    children,
    class: className = "",
  }: IProps = $props();
  let draggingTop = $state(false);
  let topStartY = 0;
  let topStartHeight = 0;

  let draggingBottom = $state(false);
  let bottomStartY = 0;
  let bottomStartHeight = 0;

  const onTopPointerDown = (e: PointerEvent) => {
    draggingTop = true;
    topStartY = e.clientY;
    topStartHeight = topHeight;
    globalThis.addEventListener("pointermove", onTopPointerMove);
    globalThis.addEventListener("pointerup", onTopPointerUp);
    e.preventDefault();
  };

  const onTopPointerMove = (e: PointerEvent) => {
    if (!draggingTop) return;
    const delta = e.clientY - topStartY;
    topHeight = Math.max(30, topStartHeight + delta); // 最小高度50px
  };

  const onTopPointerUp = () => {
    draggingTop = false;
    globalThis.removeEventListener("pointermove", onTopPointerMove);
    globalThis.removeEventListener("pointerup", onTopPointerUp);
  };

  const onBottomPointerDown = (e: PointerEvent) => {
    draggingBottom = true;
    bottomStartY = e.clientY;
    bottomStartHeight = bottomHeight;
    globalThis.addEventListener("pointermove", onBottomPointerMove);
    globalThis.addEventListener("pointerup", onBottomPointerUp);
    e.preventDefault();
  };

  const onBottomPointerMove = (e: PointerEvent) => {
    if (!draggingBottom) return;
    const delta = e.clientY - bottomStartY;
    bottomHeight = Math.max(30, bottomStartHeight - delta); // 最小高度50px
  };

  const onBottomPointerUp = () => {
    draggingBottom = false;
    globalThis.removeEventListener("pointermove", onBottomPointerMove);
    globalThis.removeEventListener("pointerup", onBottomPointerUp);
  };

  function toPx(n: number) {
    return n + "px";
  }
</script>

<section class={twMerge("flex flex-col h-full", className)}>
  <!-- 上侧 -->
  {#if top}
    <div
      class="relative flex-none overflow-auto border-b border-gray-200 dark:border-gray-800"
      style:height={toPx(topHeight)}
    >
      <div
        class="absolute bottom-0 left-0 z-10 w-full h-1 cursor-row-resize bg-transparent duration-200 hover:bg-blue-400"
        onpointerdown={onTopPointerDown}
      ></div>
      {@render top()}
    </div>
  {/if}

  <!-- 中间 -->
  <div class="main flex-1 min-w-0 h-full overflow-auto px-3">{@render children()}</div>

  <!-- 下侧 -->
  {#if bottom}
    <div
      class="relative flex-none overflow-auto border-t border-gray-200 dark:border-gray-800"
      style:height={toPx(bottomHeight)}
    >
      <div
        class="absolute top-0 left-0 z-10 w-full h-1 cursor-row-resize bg-transparent duration-200 hover:bg-blue-400"
        onpointerdown={onBottomPointerDown}
      ></div>
      {@render bottom()}
    </div>
  {/if}
</section>
