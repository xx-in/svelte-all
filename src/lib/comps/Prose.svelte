<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    children: Snippet;
  }
  let { children, class: className }: IProps = $props();

  let classList = twMerge([
    "max-w-full",
    "prose dark:prose-invert mx-auto",
    "prose-h1:my-3 prose-h2:my-4",
    "prose-pre:mb-2 prose-pre:p-0 prose-pre:relative",
    className,
  ]);
</script>

<section class={classList}>
  {@render children()}
</section>

<style>
  :global pre code.hljs {
    padding: 1em 1px 0 1em !important;
  }
</style>
