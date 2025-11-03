<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    children: Snippet;
  }
  let { children, class: className }: IProps = $props();

  let classList = twMerge([
    "md:max-w-3/4",
    "prose dark:prose-invert mx-auto",
    "prose-h1:mt-4 prose-h1:mb-6 prose-h2:my-4",
    "prose-pre:mb-8 prose-pre:p-0 prose-pre:relative",
    "prose-pre:shadow prose-pre:border dark:prose-pre:border-stone-700",
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
