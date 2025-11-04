<script lang="ts">
  import CheckboxGroup from "./CheckboxGroup.svelte";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps {
    label?: string;
    value: boolean;
    disabled?: boolean;
    class?: ClassNameValue;
  }

  let { label = "", value = $bindable(), disabled = false, class: className }: IProps = $props();

  function handleToggle() {
    if (disabled) {
      return;
    }
    value = !value;
  }
</script>

<div
  class={twMerge(
    "flex items-center gap-2 px-4 py-2 cursor-pointer select-none group ",
    disabled && "cursor-not-allowed",
    className,
  )}
  onclick={handleToggle}
>
  {#if value}
    <div
      class={twMerge(
        "size-4 border rounded-sm flex items-center justify-center",
        "border-blue-500 bg-blue-500 duration-200",
        disabled && "bg-transparent border-stone-300 dark:border-stone-600",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        class={twMerge("size-3 text-white ", disabled && " text-stone-300 dark:text-stone-600")}
      >
        <path
          fill="currentColor"
          d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256l512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
          stroke-width="25.5"
          stroke="currentColor"
        />
      </svg>
    </div>
    <span class={twMerge("text-blue-500", disabled && "text-stone-300 dark:text-stone-600")}
      >{label}</span
    >
  {:else}
    <div
      class={twMerge(
        "size-4 border rounded-sm border-stone-300 duration-200",
        disabled ? "border-stone-300 dark:border-stone-600" : "group-hover:border-blue-500",
      )}
    ></div>
    <span
      class={twMerge(
        "duration-200",
        disabled ? "text-stone-300 dark:text-stone-600" : "group-hover:text-blue-500",
      )}>{label}</span
    >
  {/if}
</div>
