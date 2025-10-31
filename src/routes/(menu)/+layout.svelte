<script lang="ts">
  import "$lib/utils/hmr";

  let { children } = $props();
</script>

{@render children?.()}
