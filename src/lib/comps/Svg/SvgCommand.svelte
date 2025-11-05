<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    onclick?: () => void;
  }
  let { class: className, onclick }: IProps = $props();
</script>

<svg class={twMerge("size-5", className)} {onclick}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"
    ><path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.25"
      d="M11.385 9.77a1.615 1.615 0 1 1-1.616 1.615v-8.77a1.615 1.615 0 1 1 1.616 1.616h-8.77a1.615 1.615 0 1 1 1.616-1.616v8.77a1.616 1.616 0 1 1-1.616-1.616z"
    /></svg
  >
</svg>
