<script lang="ts">
  import { twMerge } from "tailwind-merge";

  interface IProps {
    class?: string;
    src: string;
    ondblclick?: () => void;
    defaultSrc?: string;
  }

  let {
    src,
    class: className,
    defaultSrc = "https://img.icons8.com/?size=160&id=t5qeVBjT0Wwb&format=png",
  }: IProps = $props();

  let isError = $state(false);

  function handleError() {
    isError = true;
  }

  function randomGradient() {
    // 随机颜色生成函数
    const randomColor = () =>
      `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;

    // 生成两个随机颜色
    const color1 = randomColor();
    const color2 = randomColor();
    const color3 = randomColor();
    // const color4 = randomColor();

    // 随机角度 0~360
    const angle = Math.floor(Math.random() * 360);

    return `linear-gradient(${angle}deg, ${color1}, ${color2},${color3})`;
  }
</script>

{#if isError}
  <div
    class={twMerge("flex size-full items-center justify-center", className)}
    style:background={randomGradient()}
  ></div>
{:else}
  <img {src} class={twMerge("size-full", className)} onerror={handleError} />
{/if}
