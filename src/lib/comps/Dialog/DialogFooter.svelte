<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps {
    class?: ClassNameValue;
    children?: Snippet;
  }

  let { class: className, children }: IProps = $props();
</script>

<div
  class={twMerge(
    "border-t flex justify-end border-stone-200 font-bold dark:border-gray-700/50 flex-none px-4 py-2 gap-4",
    className,
  )}
>
  {@render children?.()}
</div>
