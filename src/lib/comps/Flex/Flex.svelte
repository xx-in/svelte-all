<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps {
    children?: Snippet;
    class?: ClassNameValue;
    onclick?: () => void;
    vertical?: boolean;
  }

  let { children, vertical = false, class: className, onclick }: IProps = $props();

  const baseClass = twMerge(["@container flex ", vertical ? "flex-col" : "items-center"]);
</script>

<div class={twMerge(baseClass, className)} {onclick}>
  {@render children?.()}
</div>
