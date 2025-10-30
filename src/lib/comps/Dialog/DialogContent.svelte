<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className }: IProps = $props();
</script>

<div class={twMerge(" text-black  px-4 flex-1", className)}>
  {@render children?.()}
</div>
