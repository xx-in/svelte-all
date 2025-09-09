<script lang="ts">
  import type { Snippet } from "svelte";
  import { stopPropagation } from "svelte/legacy";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className }: IProps = $props();
</script>

<div
  class={twMerge(
    "mx-auto mt-[10vh] max-h-[70vh] w-[90%] rounded-2xl bg-white px-4 pb-8 text-black sm:w-[50%] dark:bg-gray-800 dark:text-white",
    className,
  )}
>
  {@render children?.()}
</div>
