<script lang="ts">
  import HeaderMenu from "$lib/comps/HeaderMenu.svelte";
  import AjvTest from "./ajvTest.svelte";
  import ZodTest from "./zodTest.svelte";
</script>

<svelte:head>
  <title>功能测试</title>
</svelte:head>
<HeaderMenu activeRoute="/test"></HeaderMenu>
<AjvTest />
<!-- <ZodTest /> -->
