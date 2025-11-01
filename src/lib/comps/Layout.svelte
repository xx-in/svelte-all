<script lang="ts">
  import type { Snippet } from "svelte";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps {
    children: Snippet;
    top?: Snippet;
    bottom?: Snippet;
    class?: ClassNameValue;
  }
  let { children, top, bottom, class: className }: IProps = $props();
</script>

<div class={twMerge("flex flex-col size-full", className)}>
  {#if top}
    <div class="flex-none">
      {@render top()}
    </div>
  {/if}

  <div class={"flex-1 min-h-0 overflow-auto"}>
    {@render children()}
  </div>

  {#if bottom}
    <div class="flex-none">
      {@render bottom()}
    </div>
  {/if}
</div>
