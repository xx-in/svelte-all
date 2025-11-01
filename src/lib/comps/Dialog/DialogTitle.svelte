<script lang="ts">
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps {
    title: string;
    visible: boolean;
    class?: ClassNameValue;
  }

  let { title, visible = $bindable(), class: className }: IProps = $props();

  function handleClose() {
    visible = false;
  }
</script>

<div
  class={twMerge(
    "flex justify-between border-b border-stone-200 pt-4 pb-2 font-bold dark:border-gray-700/50 flex-none px-4",
    className,
  )}
>
  <div class="text-lg">{title}</div>
  <button
    class="flex size-6 cursor-pointer items-center justify-center rounded-full p-1 hover:bg-red-50 hover:text-red-500 duration-100 dark:hover:bg-stone-600 dark:hover:text-red-600"
    onclick={handleClose}
  >
    ✕
  </button>
</div>
