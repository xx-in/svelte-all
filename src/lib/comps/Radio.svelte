<script lang="ts">
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps {
    label?: string;
    value?: boolean;
    disabled?: boolean;
    class?: ClassNameValue;
    onchange?: (value: boolean) => void;
    preventDefault?: boolean;
  }

  let {
    label = "",
    value = $bindable(false),
    disabled = false,
    class: className,
    onchange,
    preventDefault = false,
  }: IProps = $props();

  function handleToggle() {
    if (disabled) {
      return;
    }
    if (preventDefault) {
      onchange?.(value);
      return;
    }

    value = !value;
    onchange?.(value);
  }

  let activeClass = "bg-blue-500 border-transparent";
</script>

<div
  class={twMerge(
    "flex items-center gap-2 group cursor-pointer select-none px-4 overflow-hidden",
    disabled && "cursor-not-allowed",
    className,
  )}
  onclick={handleToggle}
>
  <!--  禁用时样式 -->
  {#if disabled}
    <div
      class={twMerge(
        "size-4 border-2 rounded-full border-stone-300 flex items-center justify-center cursor-not-allowed dark:border-stone-600",
      )}
    >
      {#if value}
        <div
          class={twMerge(
            "size-1.5 bg-white rounded-full dark:bg-stone-600",
            value && "bg-stone-300 dark:bg-stone-600",
          )}
        ></div>
      {/if}
    </div>
    {#if label}
      <div class={twMerge("text-stone-300 dark:text-stone-600")}>{label}</div>
    {/if}
    <!-- 非禁用时样式 -->
  {:else}
    <div
      class={twMerge(
        "size-4 border-2 rounded-full cursor-pointer border-stone-600 flex items-center justify-center group-hover:border-blue-500 duration-75",
        value && activeClass,
      )}
    >
      {#if value}
        <div class="size-1.5 bg-white dark:bg-stone-200 rounded-full"></div>
      {/if}
    </div>
    {#if label}
      <div class={twMerge("group-hover:text-blue-500", value && "text-blue-500")}>{label}</div>
    {/if}
  {/if}
</div>
