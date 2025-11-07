<script lang="ts" generics="T">
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Input from "$lib/comps/Input/Input.svelte";
  import SvgArrow from "$lib/comps/Svg/SvgArrow.svelte";
  import SvgClearable from "$lib/comps/Svg/SvgClearable.svelte";
  import { isDomInBottom, isEqual } from "$lib/utils";
  import { onMount, onDestroy, tick } from "svelte";
  // ✅ 使用 tick 等待 DOM 更新
  import { slide } from "svelte/transition";
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
  let reverse = $state(false);
  let container: HTMLDivElement;

  async function handleToggle() {
    if (disabled) return;
    if (isOpen) {
      isOpen = false;
      return;
    }
    reverse = isDomInBottom(container);
    isOpen = true;

    // ✅ 等待 DOM 渲染后滚动到选中项（无动画）
    await tick();
    const activeEl = container.querySelector("li.active-option") as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "auto", // 🚫 无动画
      });
    }
  }

  let activeLabel = $derived.by(() => {
    const option = options.find((item) => item.value == value);
    return option ? option.label : "";
  });

  function handleClick(option: { label: string; value: T; disabled?: boolean }) {
    if (option.disabled) return;
    value = option.value;
    isOpen = false;
  }

  // 点击或滚动外部关闭弹窗
  const closeDropdown = (event: Event) => {
    if (isOpen && !container.contains(event.target as Node)) {
      isOpen = false;
    }
  };

  onMount(() => {
    globalThis.addEventListener("click", closeDropdown);
    globalThis.addEventListener("wheel", closeDropdown);
  });

  onDestroy(() => {
    globalThis.removeEventListener("click", closeDropdown);
    globalThis.removeEventListener("wheel", closeDropdown);
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
  <Input value={activeLabel} {placeholder} onclick={handleToggle} readonly {disabled}>
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
            onclick={handleToggle}
          />
        {/if}
      </Flex>
    {/snippet}
  </Input>

  <!-- 下拉弹窗 -->
  {#if isOpen}
    <div
      class={twMerge(
        "absolute z-10 w-full border border-stone-300 rounded-md shadow-lg bg-stone-50 py-3 dark:bg-stone-800 dark:border-stone-600",
        reverse ? "bottom-full mb-3" : "mt-3",
      )}
      transition:slide={{ duration: 100 }}
    >
      <!-- 三角 -->
      <div
        class={twMerge(
          "hidden size-3 border absolute bottom-0 left-10 translate-y-1/2 border-b-0 border-r-0 bg-stone-50 border-stone-300 -rotate-135 origin-center dark:bg-stone-800 dark:border-stone-600",
          reverse && "block",
        )}
      ></div>
      <div
        class={twMerge(
          "size-3 border absolute top-0 left-10 -translate-y-1/2 border-b-0 border-r-0 bg-stone-50 border-stone-300 rotate-45 origin-center dark:bg-stone-800 dark:border-stone-600 block",
          reverse && "hidden",
        )}
      ></div>

      <ul class="max-h-[25vh] overflow-auto">
        {#each options as option}
          <li
            class={twMerge(
              "pr-4 pl-6 py-2 hover:bg-stone-100 cursor-pointer dark:hover:bg-stone-900",
              option.disabled &&
                "text-stone-300 hover:bg-transparent cursor-not-allowed dark:hover:bg-tranparent dark:text-stone-600",
              isEqual(option.value, value) && "text-blue-500 font-semibold active-option", // ✅ active-option
            )}
            onclick={() => handleClick(option)}
          >
            {option.label}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
