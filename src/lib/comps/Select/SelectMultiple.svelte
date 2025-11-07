<script lang="ts" generics="T">
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Input from "$lib/comps/Input/Input.svelte";
  import SvgArrow from "$lib/comps/Svg/SvgArrow.svelte";
  import SvgClearable from "$lib/comps/Svg/SvgClearable.svelte";
  import { isDomInBottom, isEqual } from "$lib/utils";
  import { onMount, onDestroy, tick } from "svelte";
  import { slide } from "svelte/transition";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    options: Array<{
      label: string;
      value: T;
      disabled?: boolean;
    }>;
    value: T[];
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    max?: number; // ✅ 新增属性：最大选中数
  }

  let {
    options,
    value = $bindable([]),
    placeholder = "请选择",
    disabled = false,
    clearable = false,
    max = Infinity, // ✅ 默认无限制
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

    await tick();
    const activeEl = container.querySelector("li.active-option") as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "auto",
      });
    }
  }

  // ✅ 计算选中项标签
  let activeLabels = $derived.by(() => {
    return options
      .filter((item) => value.some((v) => isEqual(v, item.value)))
      .map((item) => item.label);
  });

  // ✅ 选项点击逻辑（带 max 限制）
  function handleClick(option: { label: string; value: T; disabled?: boolean }) {
    if (option.disabled) return;

    const index = value.findIndex((v) => isEqual(v, option.value));

    // 已选中 → 取消选中
    if (index !== -1) {
      value = value.filter((v) => !isEqual(v, option.value));
      return;
    }

    // 未选中但达到上限 → 禁止新增
    if (value.length >= max) return;

    // 添加
    value = [...value, option.value];
  }

  // ✅ 点击外部关闭
  const closeDropdown = (event: Event) => {
    if (isOpen && !container.contains(event.target as Node)) {
      isOpen = false;
    }
  };

  onMount(() => {
    globalThis.addEventListener("mouseup", closeDropdown);
    globalThis.addEventListener("wheel", closeDropdown);
  });

  onDestroy(() => {
    globalThis.removeEventListener("mouseup", closeDropdown);
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
    value = [];
  }

  function isActive(newValue: T) {
    return value.some((v) => isEqual(v, newValue));
  }

  // ✅ 计算是否已达上限
  let isMaxed = $derived.by(() => value.length >= max);
</script>

<div class="relative" bind:this={container}>
  <!-- 输入框 -->
  <Input onclick={handleToggle} readonly {disabled} value="">
    {#snippet left()}
      <Flex class="h-full absolute top-0 left-4">
        {#if activeLabels?.length}
          {#if disabled}
            <span class="flex-none">
              {activeLabels.join("、")}
            </span>
          {:else}
            {#each options.filter((item) => value.some((v) => isEqual(v, item.value))) as option}
              <span
                class="flex items-center flex-none border border-stone-200 dark:border-stone-700 pl-3 pr-2 py-0.5 rounded-lg mr-2 gap-2 text-stone-500 dark:text-stone-400"
              >
                {option.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  class="size-4 hover:text-red-500 dark:bg-stone-700 rounded-full p-0.5 cursor-pointer bg-stone-200"
                  onclick={() => handleClick(option)}
                >
                  <path
                    fill="currentColor"
                    d="M764.288 214.592L512 466.88L259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512L214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                    stroke-width="25.5"
                    stroke="currentColor"
                  />
                </svg>
              </span>
            {/each}
          {/if}
        {:else}
          <span class="flex-none text-stone-400 dark:text-stone-600">{placeholder}</span>
        {/if}
      </Flex>
    {/snippet}
    {#snippet right()}
      <Flex
        class="w-10 justify-center"
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        {#if clearable && isIconOver && value.length > 0 && !disabled}
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

      <!-- ✅ 支持多选 + 最大数量限制 -->
      <ul class="max-h-[25vh] overflow-auto">
        {#each options as option}
          {@const active = isActive(option.value)}
          {@const locked = !active && isMaxed && !option.disabled}

          <li
            class={twMerge(
              "pr-4 pl-6 py-2 hover:bg-stone-100 cursor-pointer flex items-center justify-between gap-2 dark:hover:bg-stone-900",
              option.disabled &&
                "text-stone-300 hover:bg-transparent cursor-not-allowed dark:hover:bg-transparent dark:text-stone-600",
              active && "text-blue-500 font-semibold active-option",
              locked && "opacity-50 cursor-not-allowed",
            )}
            onclick={() => {
              if (!option.disabled && !locked) handleClick(option);
            }}
          >
            <span>{option.label}</span>
            {#if active}
              <span class="text-base">✓</span>
            {/if}
          </li>
        {/each}
      </ul>

      {#if isMaxed}
        <div class="text-xs text-stone-500 text-center mt-2 dark:text-stone-400">
          已达到最多可选 {max} 项
        </div>
      {/if}
    </div>
  {/if}
</div>
