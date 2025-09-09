<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    src: string;
    children?: Snippet;
    ondblclick?: () => void;
  }

  let { ondblclick, src, children, class: className }: IProps = $props();
</script>

<section class={"relative size-full"} {ondblclick}>
  <!-- 背景图片层 -->
  <img {src} class={twMerge("absolute top-0 left-0 size-full ", className)} />
  <!-- 高斯模糊层 -->
  <div class="absolute top-0 left-0 size-full bg-black/10 backdrop-blur-sm"></div>
  <!-- 上层内容 -->
  <div class="absolute top-0 left-0 size-full bg-transparent">
    {@render children?.()}
  </div>
</section>
