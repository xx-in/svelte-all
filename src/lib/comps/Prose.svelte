<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    children: Snippet;
  }

  let { children, class: className }: IProps = $props();

  let classList = twMerge([
    "md:max-w-[900px]",
    "prose dark:prose-invert mx-auto",
    "prose-h1:mt-4 prose-h1:mb-6 prose-h2:my-4",
    "prose-p:text-lg prose-p:leading-10",
    "prose-li:text-lg prose-li:leading-10",
    "prose-pre:mb-8 prose-pre:p-0 prose-pre:relative",
    "prose-pre:shadow prose-pre:border dark:prose-pre:border-stone-800",
    className,
  ]);
</script>

<section class={classList}>
  {@render children()}
</section>
