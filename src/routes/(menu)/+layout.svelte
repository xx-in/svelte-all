<script>
  import { page } from "$app/state";
  import HeaderMenu from "$lib/comps/HeaderMenu/HeaderMenu.svelte";
  import SearchBar from "$lib/comps/HeaderMenu/SearchBar.svelte";
  import Layout from "$lib/comps/Layout.svelte";
  import Main from "$lib/comps/Main.svelte";

  const { children } = $props();

  let activeRoute = $state("/");

  let searchStr = $state("");

  $effect(() => {
    const { pathname } = page.url;
    activeRoute = pathname;
  });
</script>

<Main>
  <Layout>
    {#snippet top()}
      <HeaderMenu class="dark:bg-stone-800" {activeRoute}>
        <SearchBar bind:value={searchStr} />
      </HeaderMenu>
    {/snippet}
    {@render children()}
  </Layout>
</Main>
