<script lang="ts">
  import { getThemeMode, setThemeMode, getIsDark } from "$lib/store/theme.svelte";

  /**
   * 切换主题
   */
  function handleToggle() {
    const current = getThemeMode();
    if (current === "light") setThemeMode("system");
    else if (current === "dark") setThemeMode("system");
    else {
      if (dark()) {
        setThemeMode("light");
      } else {
        setThemeMode("dark");
      }
    }
  }

  const mode = () => getThemeMode();
  const dark = () => getIsDark();
</script>

<div class="size-5 pt-0.5 ml-2 cursor-pointer" onclick={handleToggle} title={mode()}>
  {#if mode() === "system"}
    <!-- 跟随系统图标 -->
    <svg class="text-yellow-500 dark:text-orange-500/60 size-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
        ><path
          fill="currentColor"
          d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 8v1a2 2 0 0 1-2 2h-1v2h-1v-2H8.5v2h-1v-2H6v2H5v-2H4a2 2 0 0 1-2-2v-1H0v-1h2V8.5H0v-1h2V6H0V5h2V4a2 2 0 0 1 2-2h1V0h1v2h1.5V0h1v2H10V0h1v2h1a2 2 0 0 1 2 2v1h2v1h-2v1.5h2v1h-2V10h2v1z"
          stroke-width="0.5"
          stroke="currentColor"
        /><rect
          width="6"
          height="6"
          x="5"
          y="5"
          fill="currentColor"
          rx="1"
          stroke-width="0.5"
          stroke="currentColor"
        /></svg
      ></svg
    >
  {:else if dark()}
    <!-- 暗色图标 -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-orange-500"
      ><path
        fill="currentColor"
        d="M2 12C2 6.477 6.477 2 12 2c.463 0 .54.693.143.933a6.5 6.5 0 1 0 8.924 8.924c.24-.396.933-.32.933.143c0 1.138-.19 2.231-.54 3.25H22a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5h.54A10 10 0 0 1 2 12m3 6.25a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5zm3 3a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.48.48 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.48.48 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.48.48 0 0 1-.273-.274z"
        stroke-width="0.5"
        stroke="currentColor"
      /><path
        fill="currentColor"
        d="M16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.48.48 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.48.48 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.48.48 0 0 1-.272-.273z"
        stroke-width="0.5"
        stroke="currentColor"
      /></svg
    >
  {:else}
    <!-- 亮色图标 -->
    <svg class="text-yellow-500 size-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="1.5"
          d="M12 2v1m0 18v1m10-10h-1M3 12H2m17.07-7.07l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393M6.341 10A6 6 0 1 0 10 6.341"
        /></svg
      >
    </svg>
  {/if}
</div>
