<script lang="ts" generics="T">
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Input from "$lib/comps/Input/Input.svelte";
  import SvgArrow from "$lib/comps/Svg/SvgArrow.svelte";
  import { isDomInBottom } from "$lib/utils";
  import { isEqual } from "lodash";
  // 添加事件监听
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    options: Array<{
      label: string;
      value: T;
    }>;
    value: T | null;
    placeholder?: string;
  }

  let { options, value = $bindable(null), placeholder = "请选择" }: IProps = $props();

  let isOpen = $state(false);

  /**
   * 翻转弹窗位置
   */
  let reverse = $state(false);

  function handleOpen() {
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

  function handleClick(option: { label: string; value: T }) {
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
</script>

<div class="relative" bind:this={container}>
  <!-- 输入框 -->
  <Input value={activeLabel} {placeholder} onclick={handleOpen} readonly>
    {#snippet right()}
      <Flex class="pr-4 w-8">
        <SvgArrow class={twMerge("duration-200", isOpen && "-rotate-180")} />
      </Flex>
    {/snippet}
  </Input>

  <!-- 下拉弹窗 -->
  <div
    class={twMerge(
      "absolute z-10 w-full border border-gray-300 rounded-md shadow-lg bg-white py-3 hidden",
      reverse ? "bottom-full mb-3" : "mt-3",
      isOpen && "block",
    )}
  >
    {#if reverse}
      <div
        class="size-3 border absolute bottom-0 left-10 translate-y-1/2 border-b-0 border-r-0 bg-white border-gray-300 -rotate-135 origin-center"
      ></div>
    {:else}
      <div
        class="size-3 border absolute top-0 left-10 -translate-y-1/2 border-b-0 border-r-0 bg-white border-gray-300 rotate-45 origin-center"
      ></div>
    {/if}
    <ul class="max-h-[25vh] overflow-auto">
      {#each options as option}
        <li
          class={twMerge(
            "pr-4 pl-6 py-2 hover:bg-gray-100 cursor-pointer",
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
