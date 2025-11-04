<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps extends Omit<HTMLButtonAttributes, "class"> {
    class?: ClassNameValue;
    children?: Snippet;
  }

  const baseClass = twMerge(
    "cursor-pointer py-2 px-4 rounded-md outline-none ",
    "enabled:cursor-pointer",
    "disabled:cursor-not-allowed",
    "transition border border-transparent",
    "inline-flex items-center justify-center",
  );

  const { class: className, children, ...rest }: IProps = $props();
</script>

<button {...rest} class={twMerge(baseClass, className)}>{@render children?.()}</button>
