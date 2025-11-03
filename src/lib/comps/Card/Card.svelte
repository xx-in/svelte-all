<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps {
    children?: Snippet;
    class?: ClassNameValue;
    caption?: string;
  }

  let { children, caption, class: className }: IProps = $props();

  const baseClass = twMerge([
    "@container border rounded-lg border-stone-200 shadow-lg p-4 m-4 dark:border-gray-800",
  ]);
</script>

<div class={twMerge(baseClass, className)}>
  {#if caption}
    <div class="border-b border-stone-200 pb-2 mb-4 text-lg font-bold dark:border-gray-800">
      {caption}
    </div>
  {/if}
  {@render children?.()}
</div>
