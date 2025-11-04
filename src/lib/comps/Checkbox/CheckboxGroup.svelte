<script lang="ts" generics="T">
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IOption<T> {
    label: string;
    value: T;
    disabled?: boolean; // 单项禁用
  }

  interface IProps<T> {
    disabled?: boolean; // 整个组件禁用
    class?: ClassNameValue;
    options: IOption<T>[];
    value: Array<T>;
    vertical?: boolean;
    max?: number;
    onchange?: (p: T[]) => void;
  }

  let {
    disabled = false,
    class: className,
    value = $bindable<T[]>(),
    options,
    vertical = false,
    onchange,
    max = Infinity,
  }: IProps<T> = $props();

  function handleChange(newValue: T, optionDisabled?: boolean) {
    if (disabled || optionDisabled) return; // 整体禁用或单项禁用直接返回
    const existIndex = value.findIndex((item) => isEqual(item, newValue));
    if (existIndex != -1) {
      value.splice(existIndex, 1);
    } else {
      // 达到最大选择数量
      if (value.length >= max) {
        return;
      }
      value.push(newValue);
    }
    onchange?.(value);
  }

  function isEqual(a: any, b: any) {
    return JSON.stringify(a) == JSON.stringify(b);
  }

  function isChecked(curValue: T) {
    return value.some((item) => isEqual(item, curValue));
  }
</script>

<Flex
  class={twMerge(
    "gap-4 flex-wrap select-none ",
    vertical && "flex-col items-start gap-2",
    className,
  )}
>
  {#each options as option}
    <div
      class={twMerge(
        "flex items-center gap-2 px-4 py-2 cursor-pointer group",
        (disabled || option.disabled) && "cursor-not-allowed",
      )}
      onclick={() => handleChange(option.value, option.disabled)}
    >
      {#if isChecked(option.value)}
        <div
          class={twMerge(
            "size-4 border rounded-sm flex items-center justify-center",
            "border-blue-500 bg-blue-500",
            (disabled || option.disabled) &&
              "bg-transparent border-stone-300 dark:border-stone-600",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            class={twMerge(
              "size-3 text-white ",
              (disabled || option.disabled) && " text-stone-300 dark:text-stone-600",
            )}
          >
            <path
              fill="currentColor"
              d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256l512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
              stroke-width="25.5"
              stroke="currentColor"
            />
          </svg>
        </div>
        <span
          class={twMerge(
            "text-blue-500",
            (disabled || option.disabled) && "text-stone-300 dark:text-stone-600",
          )}>{option.label}</span
        >
      {:else}
        <div
          class={twMerge(
            "size-4 border rounded-sm border-stone-300 duration-200",
            disabled || option.disabled
              ? "border-stone-300 dark:border-stone-600"
              : "group-hover:border-blue-500",
          )}
        ></div>
        <span
          class={twMerge(
            "duration-200",
            disabled || option.disabled
              ? "text-stone-300 dark:text-stone-600"
              : "group-hover:text-blue-500",
          )}>{option.label}</span
        >
      {/if}
    </div>
  {/each}
</Flex>
