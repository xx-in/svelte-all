<script lang="ts">
  import Main from "$lib/comps/Main.svelte";
  import Toast from "$lib/comps/Toast/index.svelte";
  import { initDark } from "$lib/store/theme.svelte";
  import "./+layout.css";
  import "animate.css";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(initDark);
</script>

<Main class="@container">
  <Toast />
  {@render children?.()}
</Main>
