<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    [key: string]: unknown;
    value: string;
  }

  // svelte-ignore custom_element_props_identifier
  let { value = $bindable(""), class: className, placeholder, ...rest }: IProps = $props();
</script>

<div class={twMerge("", className)} {...rest}>
  {value}
</div>
