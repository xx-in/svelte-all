<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps {
    visible?: boolean;
    children?: Snippet;
    hideOnClickMask?: boolean;
    class?: ClassNameValue;
  }

  let {
    visible = $bindable(true),
    children,
    hideOnClickMask = true,
    class: className,
  }: IProps = $props();

  function handleClickMask(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    if (target?.dataset.type == "mask") {
      if (hideOnClickMask) {
        visible = false;
      }
    }
  }
</script>

{#if visible}
  <div
    class="fixed top-0 left-0 z-50 h-[100dvh] w-screen bg-black/50"
    transition:fade={{ duration: 100 }}
    ondblclick={(e) => e.stopPropagation()}
    onclick={handleClickMask}
    data-type="mask"
  >
    <div
      class={twMerge(
        "flex flex-col max-w-4/5 mx-auto mt-20 rounded-xl max-h-6/7 bg-stone-50 overflow-hidden dark:bg-gray-800 dark:text-stone-50 gap-6 w-auto",
        className,
      )}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
