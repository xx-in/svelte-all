<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    [key: string]: unknown;
    children?: Snippet;
  }

  // svelte-ignore custom_element_props_identifier
  let { value = $bindable(""), class: className, children, ...rest }: IProps = $props();
</script>

<button class={twMerge("", className)} {...rest}>
  {@render children?.()}
</button>
