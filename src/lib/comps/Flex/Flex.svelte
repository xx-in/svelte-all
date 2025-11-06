<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    children?: Snippet;
    class?: ClassNameValue;
    onclick?: () => void;
    vertical?: boolean;
  }

  let { children, vertical = false, class: className, onclick, ...rest }: IProps = $props();

  const baseClass = twMerge(["@container flex ", vertical ? "flex-col" : "items-center"]);
</script>

<div class={twMerge(baseClass, className)} {onclick} {...rest}>
  {@render children?.()}
</div>
