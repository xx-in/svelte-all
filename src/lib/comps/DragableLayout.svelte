<script lang="ts">
  import type { Snippet } from "svelte";

  interface IProps {
    leftWidth?: number;
    rightWidth?: number;
    left?: Snippet;
    right?: Snippet;
    children: Snippet;
  }

  let {
    leftWidth = $bindable(300),
    rightWidth = $bindable(300),
    left,
    right,
    children,
  }: IProps = $props();
  let draggingLeft = $state(false);
  let leftStartX = 0;
  let leftStartWidth = 0;

  let draggingRight = $state(false);
  let rightStartX = 0;
  let rightStartWidth = 0;

  const onLeftPointerDown = (e: PointerEvent) => {
    draggingLeft = true;
    leftStartX = e.clientX;
    leftStartWidth = leftWidth;
    window.addEventListener("pointermove", onLeftPointerMove);
    window.addEventListener("pointerup", onLeftPointerUp);
    e.preventDefault();
  };

  const onLeftPointerMove = (e: PointerEvent) => {
    if (!draggingLeft) return;
    const delta = e.clientX - leftStartX;
    leftWidth = Math.max(50, leftStartWidth + delta); // 最小宽度50px
  };

  const onLeftPointerUp = () => {
    draggingLeft = false;
    window.removeEventListener("pointermove", onLeftPointerMove);
    window.removeEventListener("pointerup", onLeftPointerUp);
  };

  const onRightPointerDown = (e: PointerEvent) => {
    draggingRight = true;
    rightStartX = e.clientX;
    rightStartWidth = rightWidth;
    window.addEventListener("pointermove", onRightPointerMove);
    window.addEventListener("pointerup", onRightPointerUp);
    e.preventDefault();
  };

  const onRightPointerMove = (e: PointerEvent) => {
    if (!draggingRight) return;
    const delta = e.clientX - rightStartX;
    rightWidth = Math.max(50, rightStartWidth - delta); // 最小宽度50px
  };

  const onRightPointerUp = () => {
    draggingRight = false;
    window.removeEventListener("pointermove", onRightPointerMove);
    window.removeEventListener("pointerup", onRightPointerUp);
  };

  function toPx(n: number) {
    return n + "px";
  }
</script>

<section class="flex size-full break-all">
  <!-- 左侧 -->
  {#if left}
    <div
      class="relative h-full overflow-auto flex-none border-r border-r-gray-200 pr-1 dark:border-gray-800"
      style:width={toPx(leftWidth)}
    >
      <div
        class="absolute top-0 right-0 z-10 h-full w-1 cursor-col-resize bg-transparent duration-200 hover:bg-blue-400"
        onpointerdown={onLeftPointerDown}
      ></div>
      <div class="h-full overflow-auto">
        {@render left()}
      </div>
    </div>
  {/if}

  <!-- 中间 -->
  <div class="main flex-1 min-w-0 h-full overflow-auto">{@render children()}</div>

  <!-- 右侧 -->
  {#if right}
    <div
      class="relative h-full overflow-auto flex-none border-l border-gray-200 pr-3 break-all dark:border-gray-800"
      style:width={toPx(rightWidth)}
    >
      <div
        class="absolute top-0 left-0 z-10 h-full w-1 cursor-col-resize bg-transparent duration-200 hover:bg-blue-400"
        onpointerdown={onRightPointerDown}
      ></div>
      <div class="h-full overflow-auto pr-3">
        {@render right()}
      </div>
    </div>
  {/if}
</section>
