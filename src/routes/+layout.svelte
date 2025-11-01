<script lang="ts">
  import Main from "$lib/comps/Main.svelte";
  import Toast from "$lib/comps/Toast.svelte";
  import { isDark } from "$lib/store/theme.svelte";
  import "./+layout.css";
  import "animate.css";

  let { children } = $props();
</script>

<Main>
  <Toast />
  {@render children?.()}
</Main>
