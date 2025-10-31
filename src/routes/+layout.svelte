<script lang="ts">
  import Toast from "$lib/comps/Toast.svelte";
  import "./+layout.css";
  import "animate.css";

  let { children } = $props();
</script>

<Toast />
{@render children?.()}
