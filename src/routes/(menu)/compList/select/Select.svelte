<script lang="ts" generics="T">
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Input from "$lib/comps/Input/Input.svelte";
  import SvgArrow from "$lib/comps/Svg/SvgArrow.svelte";
  import SvgClearable from "$lib/comps/Svg/SvgClearable.svelte";
  import { isDomInBottom } from "$lib/utils";
  import { isEqual } from "lodash";
  // 添加事件监听
  import { onMount, onDestroy } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    options: Array<{
      label: string;
      value: T;
      disabled?: boolean;
    }>;
    value: T | null;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
  }

  let {
    options,
    value = $bindable(null),
    placeholder = "请选择",
    disabled = false,
    clearable = false,
  }: IProps = $props();

  let isOpen = $state(false);

  /**
   * 翻转弹窗位置
   */
  let reverse = $state(false);

  function handleOpen() {
    if (disabled) {
      return;
    }
    reverse = isDomInBottom(container);
    isOpen = true;
  }

  let activeLabel = $derived.by(() => {
    const option = options.find((item) => item.value == value);
    if (option) {
      return option.label;
    }
    return "";
  });

  function handleClick(option: { label: string; value: T; disabled?: boolean }) {
    if (option.disabled) {
      return;
    }
    value = option.value;
    isOpen = false;
  }

  let container: HTMLDivElement;

  // 监听点击和滚动事件，关闭弹窗
  const closeDropdown = (event: Event) => {
    if (isOpen && !container.contains(event.target as Node)) {
      isOpen = false;
    }
  };

  onMount(() => {
    window.addEventListener("click", closeDropdown);
    window.addEventListener("wheel", closeDropdown);
  });

  // 清理事件监听
  onDestroy(() => {
    window.removeEventListener("click", closeDropdown);
    window.removeEventListener("wheel", closeDropdown);
  });

  let isIconOver = $state(false);
  function handleMouseEnter() {
    isIconOver = true;
  }

  function handleMouseLeave() {
    isIconOver = false;
  }

  function handleClear() {
    value = null;
  }
</script>

<div class="relative" bind:this={container}>
  <!-- 输入框 -->
  <Input value={activeLabel} {placeholder} onclick={handleOpen} readonly {disabled}>
    {#snippet right()}
      <Flex
        class="w-10 justify-center"
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        {#if clearable && isIconOver && value && !disabled}
          <SvgClearable onclick={handleClear} class="size-5" />
        {:else}
          <SvgArrow
            class={twMerge("size-4 duration-200", isOpen && "-rotate-180")}
            onclick={handleOpen}
          />
        {/if}
      </Flex>
    {/snippet}
  </Input>

  <!-- 下拉弹窗 -->
  <div
    class={twMerge(
      "absolute z-10 w-full border border-stone-300 rounded-md shadow-lg bg-stone-50 py-3 hidden dark:bg-stone-800 dark:border-stone-600",
      reverse ? "bottom-full mb-3" : "mt-3",
      isOpen && "block",
    )}
  >
    <!-- 三角 -->
    {#if reverse}
      <div
        class="size-3 border absolute bottom-0 left-10 translate-y-1/2 border-b-0 border-r-0 bg-stone-50 border-stone-300 -rotate-135 origin-center dark:bg-stone-800 dark:border-stone-600"
      ></div>
    {:else}
      <div
        class="size-3 border absolute top-0 left-10 -translate-y-1/2 border-b-0 border-r-0 bg-stone-50 border-stone-300 rotate-45 origin-center dark:bg-stone-800 dark:border-stone-600"
      ></div>
    {/if}
    <ul class="max-h-[25vh] overflow-auto">
      {#each options as option}
        <li
          class={twMerge(
            "pr-4 pl-6 py-2 hover:bg-stone-100 cursor-pointer dark:hover:bg-stone-900",
            option.disabled &&
              "text-stone-300 hover:bg-transparent cursor-not-allowed dark:hover:bg-tranparent dark:text-stone-600",
            isEqual(option.value, value) && "text-blue-500 font-semibold",
          )}
          onclick={() => handleClick(option)}
        >
          {option.label}
        </li>
      {/each}
    </ul>
  </div>
</div>
