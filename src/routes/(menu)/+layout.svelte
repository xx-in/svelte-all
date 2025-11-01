<script>
  import { page } from "$app/state";
  import HeaderMenu from "$lib/comps/HeaderMenu.svelte";
  import Layout from "$lib/comps/Layout.svelte";
  import Main from "$lib/comps/Main.svelte";

  const { children } = $props();

  let activeRoute = $state("/");

  $effect(() => {
    const { pathname } = page.url;
    activeRoute = pathname;
  });
</script>

<Main>
  <Layout>
    {#snippet top()}
      <HeaderMenu class="dark:bg-stone-900" {activeRoute}></HeaderMenu>
    {/snippet}
    {@render children()}
  </Layout>
</Main>
