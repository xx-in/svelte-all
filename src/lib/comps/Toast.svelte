<script lang="ts">
  import { removeToast, toastList } from "$lib/store";
  import SvgFail from "./Svg/SvgFail.svelte";
  import SvgInfo from "./Svg/SvgInfo.svelte";
  import SvgSuccess from "./Svg/SvgSuccess.svelte";
  import SvgWarning from "./Svg/SvgWarning.svelte";
  import { fly, scale } from "svelte/transition";

  function typeClasses(type: string) {
    switch (type) {
      case "success":
        return "bg-white/90 text-green-800";
      case "error":
        return "bg-white/90 text-red-800";
      case "warning":
        return "bg-white/90 text-orange-800";
      default:
        return "bg-white/90 text-stone-800"; // info
    }
  }
</script>

<div class="fixed top-16 right-6 z-50 pointer-events-none overflow-hidden">
  {#each toastList as { type, message, id } (id)}
    <div
      class="pointer-events-auto rounded-xl shadow-sm border border-stone-50 transform transition-all duration-300 ease-out overflow-hidden flex justify-end items-center my-2 bg-white/90"
      in:scale={{ duration: 500 }}
      out:fly={{ x: 200 }}
    >
      <div class="${typeClasses(type)} px-4 py-3 flex gap-3 items-center">
        <div class="flex-shrink-0 text-current">
          {#if type == "success"}
            <SvgSuccess class="size-5 text-green-500" />
          {:else if type == "error"}
            <SvgFail class="size-5 text-red-500" />
          {:else if type == "warning"}
            <SvgWarning class="size-5 text-orange-500" />
          {:else}
            <SvgInfo class="size-5 text-stone-500" />
          {/if}
        </div>
        <div class="flex-1 text-sm leading-tight">{message}</div>
        <button
          class="p-1 rounded focus:outline-none cursor-pointer"
          aria-label="close"
          onclick={() => removeToast(id)}
        >
          <svg class="w-4 h-4 opacity-70" viewBox="0 0 20 20" fill="none">
            <path
              d="M6 6l8 8M14 6l-8 8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  {/each}
</div>
