<script lang="ts" generics="T extends string|number">
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps extends Omit<HTMLInputAttributes, "class"> {
    class?: ClassNameValue;
    left?: Snippet<[T]>;
    right?: Snippet<[T]>;
    value: T;
    inputClass?: ClassNameValue;
  }

  let {
    class: className,
    left,
    right,
    disabled,
    value = $bindable(),
    inputClass = "",
    ...rest
  }: IProps = $props();
</script>

<div
  class={twMerge(
    "relative flex items-stretch border rounded-lg bg-white text-stone-800 border-stone-300 dark:bg-stone-900 dark:text-stone-100 dark:border-stone-800 gap-2 overflow-hidden",
    !left && "pl-4",
    !right && "pr-4",
    disabled
      ? "bg-gray-100 text-stone-500 border-stone-200 cursor-not-allowed dark:bg-stone-900 dark:text-stone-700 dark:border-stone-800"
      : "bg-white text-stone-800 border-stone-300 cursor-pointer dark:bg-stone-800 dark:text-stone-100 dark:border-stone-600 has-[input:focus]:border-blue-500",
    className,
  )}
>
  <!-- 左侧插槽 -->
  {#if left}
    {@render left?.(value)}
  {/if}

  <!-- 输入框 -->
  <input
    {...rest}
    bind:value
    class={twMerge(
      "flex-1 min-w-0 outline-none bg-transparent placeholder-stone-400 dark:placeholder-stone-500 disabled:cursor-not-allowed py-2",
      inputClass,
    )}
    {disabled}
  />

  <!-- 右侧插槽 -->
  {#if right}
    {@render right?.(value)}
  {/if}
</div>
