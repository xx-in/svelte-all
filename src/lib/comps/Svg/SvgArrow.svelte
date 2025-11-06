<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    onclick?: () => void;
  }
  let { class: className, onclick }: IProps = $props();
</script>

<svg class={twMerge("size-5", className)} {onclick}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
    ><path
      fill="currentColor"
      d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
      stroke-width="25.5"
      stroke="currentColor"
    /></svg
  >
</svg>
