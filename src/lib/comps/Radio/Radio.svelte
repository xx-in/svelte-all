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
    if (disabled) return;
    if (preventDefault) {
      onchange?.(value);
      return;
    }
    value = !value;
    onchange?.(value);
  }

  let activeClass = "bg-blue-500 border-blue-500 dark:bg-blue-500 dark:border-blue-500";
</script>

<div
  class={twMerge(
    "flex items-center gap-2 cursor-pointer select-none px-4 py-2 rounded-full transition-all duration-200 group",
    disabled && "cursor-not-allowed opacity-60 hover:bg-transparent",
    className,
  )}
  onclick={handleToggle}
>
  <!-- 禁用样式 -->
  {#if disabled}
    <div
      class={twMerge(
        "size-4 border-1 rounded-full border-stone-300 dark:border-stone-600 flex items-center justify-center bg-stone-100 dark:bg-stone-800",
      )}
    >
      {#if value}
        <div class="size-1.5 rounded-full bg-stone-400 dark:bg-stone-500"></div>
      {/if}
    </div>

    {#if label}
      <div class="text-stone-400 dark:text-stone-500 font-normal">
        {label}
      </div>
    {/if}
  {/if}
  <!-- 普通样式 -->
  {#if !disabled}
    <div
      class={twMerge(
        "relative size-4 flex items-center justify-center rounded-full border-1 transition-all",
        "border-stone-200 dark:border-stone-700 group-hover:border-blue-500",
        value && activeClass,
        "group-hover:border-blue-500 duration-200",
      )}
    >
      <!-- 动态小圆点 -->
      <div
        class={twMerge(
          "absolute transition-all duration-200 rounded-full",
          value
            ? "size-1.5 bg-white dark:bg-stone-200 opacity-100 scale-100"
            : "size-1 bg-transparent opacity-0 scale-0",
        )}
      ></div>
    </div>

    {#if label}
      <div
        class={twMerge(
          "text font-medium transition-all duration-200 select-none",
          "text-stone-700 dark:text-stone-300",
          "group-hover:text-blue-500",
          value && "text-blue-500 dark:text-blue-500",
        )}
      >
        {label}
      </div>
    {/if}
  {/if}
</div>
