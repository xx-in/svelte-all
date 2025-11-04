<script lang="ts">
  import type { Snippet } from "svelte";

  interface IProps {
    children?: Snippet;
  }
  let { children }: IProps = $props();
</script>

<div
  class="grid grid-cols-1 gap-4 @xs:grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 @xl:grid-cols-6"
>
  {@render children?.()}
</div>
