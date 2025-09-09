<svelte:options
  customElement={{
    tag: "copy-plugin",
    shadow: "none",
  }}
/>

<script lang="ts">
  let { lang, code } = $props();
  let isCopied = $state(false);
  async function handleClick() {
    await navigator.clipboard.writeText(decodeURIComponent(code));
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 1000);
  }
</script>

<div
  class="absolute top-0 left-0 flex h-8 w-full items-center justify-between bg-zinc-200 pr-2 pl-5 dark:bg-gray-700 dark:text-gray-100"
>
  <span class="flex-1 font-semibold">{lang}</span>
  {#if isCopied}
    <span class="flex items-center text-xs text-green-500"
      >已复制
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        class="size-4"
      >
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
          <path d="m9 10l3.258 2.444a1 1 0 0 0 1.353-.142L20 5" />
          <path d="M21 12a9 9 0 1 1-6.67-8.693" />
        </g>
      </svg>
    </span>
  {:else}
    <button class="flex cursor-pointer items-center gap-1" onclick={handleClick}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 512 512"
        class="size-4 hover:text-sky-500"
      >
        <rect
          width="336"
          height="336"
          x="128"
          y="128"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="32"
          rx="57"
          ry="57"
        />
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
        />
      </svg></button
    >
  {/if}
</div>
