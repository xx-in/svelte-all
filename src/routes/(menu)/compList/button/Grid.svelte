<script lang="ts">
  import type { Snippet } from "svelte";

  interface IProps {
    children?: Snippet;
  }
  let { children }: IProps = $props();
</script>

<div
  class="grid grid-cols-2 gap-4 @sm:grid-cols-4 @md:grid-cols-6 @lg:grid-cols-6 @2xl:grid-cols-4"
>
  {@render children?.()}
</div>
