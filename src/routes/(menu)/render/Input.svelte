<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface IProps {
    value: string;
    class?: string;
    placeholder?: string;
    [key: string]: unknown;
  }

  // svelte-ignore custom_element_props_identifier
  let { value = $bindable(""), class: className, placeholder, ...rest }: IProps = $props();
</script>

<input bind:value class={twMerge("outline-none", className)} {placeholder} {...rest} />
