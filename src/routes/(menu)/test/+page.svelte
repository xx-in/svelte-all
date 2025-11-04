<script lang="ts">
  import HeaderMenu from "$lib/comps/HeaderMenu/HeaderMenu.svelte";
  import Main from "$lib/comps/Main.svelte";
  import AjvTest from "./ajvTest.svelte";
  import ThreeTest from "./threeTest.svelte";
  import ZodTest from "./zodTest.svelte";
</script>

<svelte:head>
  <title>功能测试</title>
</svelte:head>

<Main>
  <!-- <HeaderMenu activeRoute="/test"></HeaderMenu> -->
  <div class="flex-1">
    <ThreeTest />
  </div>
</Main>
