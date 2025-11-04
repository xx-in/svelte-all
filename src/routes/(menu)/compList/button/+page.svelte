<script lang="ts">
  import Button from "$lib/comps/Button/Button.svelte";
  import Card from "$lib/comps/Card/Card.svelte";
  import { addToast } from "$lib/store";
  import { copy } from "$lib/utils";
  import Grid from "./Grid.svelte";
  import { twMerge } from "tailwind-merge";

  async function handleCopy(type: string) {
    const snippet = `<Button class="${type}"></Button>`;
    await copy(snippet);
    addToast(`代码拷贝完成`, "success");
  }

  async function handleCopySelf() {
    const snippet = `<Button
      class="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg transition-all duration-300 hover:from-pink-500 hover:to-yellow-500"
      ></Button
    >`;
    await copy(snippet);
    addToast(`代码拷贝完成`, "success");
  }
  const tailwindColors = [
    "green",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
  ];

  const blue_fill = twMerge([
    // 白天 正常 禁用 悬浮 激活
    // 夜间 正常 禁用 悬浮 激活
    "text-white bg-blue-500 border-none",
    "disabled:text-stone-100 disabled:bg-blue-300",
    "hover:bg-blue-600",
    "active:bg-blue-500",
    "dark:text-stone-300 dark:bg-blue-700",
    "dark:disabled:text-stone-400 dark:disabled:bg-blue-900",
    "dark:hover:text-stone-100 dark:hover:bg-blue-600",
    "dark:active:text-stone-50 dark:active:bg-blue-700",
  ]);

  const blue_text = twMerge([
    "text-blue-500 bg-transparent border-none",
    "disabled:text-blue-300",
    "hover:text-blue-600",
    "active:text-blue-700",
    "dark:text-blue-300",
    "dark:disabled:text-blue-900",
    "dark:hover:text-blue-400",
    "dark:active:text-blue-500",
  ]);

  const blue_plain = twMerge([
    " text-blue-500 bg-blue-50 border-blue-200",
    "disabled:text-blue-300 disabled:bg-blue-50",
    "hover:bg-blue-500 hover:text-white hover:border-transparent",
    "active:bg-blue-400",
    "dark:text-blue-600 dark:bg-transparent dark:border-blue-900",
    "dark:disabled:text-blue-900 dark:disabled:bg-transparent dark:disabled:border-blue-950",
    "dark:hover:text-stone-200 dark:hover:bg-blue-700",
    "dark:active:text-stone-100 dark:active:bg-blue-800",
  ]);

  async function handleGenarate() {
    const colorMap = { blue_fill, blue_text, blue_plain };
    const result: string[] = [];
    tailwindColors.forEach((color) => {
      let tempText = `<Card caption={"按钮组件 - ${color}"}><Grid>`;
      for (let [key, value] of Object.entries(colorMap)) {
        const newColorStyle = value.replaceAll("blue", color);
        const text = key.replace(/blue/, color);
        const buttonText = `<Button class="${newColorStyle}" onclick={()=>handleCopy("${newColorStyle}")}>按钮 ${text}</Button>`;
        tempText += buttonText;
        tempText += buttonText.replace("onclick", "disabled onclick");
      }
      tempText += `</Grid>
</Card>`;
      result.push(tempText);
    });
    await copy(result.join(""));
    addToast("生成全部样式", "success");
  }
</script>

<svelte:head>
  <title>组件列表 - 按钮组件</title>
</svelte:head>
<!-- <Button class={blue_fill} onclick={handleGenarate}>生成全部</Button> -->
<Card caption={"按钮组件 - blue"}>
  <Grid>
    <Button class={blue_fill} onclick={() => handleCopy(blue_fill)}>按钮 blue_fill</Button>
    <Button disabled class={blue_fill}>按钮 blue_fill</Button>

    <Button class={blue_text} onclick={() => handleCopy(blue_text)}>按钮 blue_text</Button>
    <Button disabled class={blue_text}>按钮 blue_text</Button>

    <Button class={blue_plain} onclick={() => handleCopy(blue_plain)}>按钮 blue_plain</Button>
    <Button disabled class={blue_plain}>按钮 blue_plain</Button>
  </Grid>
</Card>

<Card caption={"按钮组件 - green"}
  ><Grid
    ><Button
      class="text-white bg-green-500 border-none disabled:text-stone-100 disabled:bg-green-300 hover:bg-green-600 active:bg-green-500 dark:text-stone-300 dark:bg-green-700 dark:disabled:text-stone-400 dark:disabled:bg-green-900 dark:hover:text-stone-100 dark:hover:bg-green-600 dark:active:text-stone-50 dark:active:bg-green-700"
      onclick={() =>
        handleCopy(
          "text-white bg-green-500 border-none disabled:text-stone-100 disabled:bg-green-300 hover:bg-green-600 active:bg-green-500 dark:text-stone-300 dark:bg-green-700 dark:disabled:text-stone-400 dark:disabled:bg-green-900 dark:hover:text-stone-100 dark:hover:bg-green-600 dark:active:text-stone-50 dark:active:bg-green-700",
        )}>按钮 green_fill</Button
    ><Button
      class="text-white bg-green-500 border-none disabled:text-stone-100 disabled:bg-green-300 hover:bg-green-600 active:bg-green-500 dark:text-stone-300 dark:bg-green-700 dark:disabled:text-stone-400 dark:disabled:bg-green-900 dark:hover:text-stone-100 dark:hover:bg-green-600 dark:active:text-stone-50 dark:active:bg-green-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-green-500 border-none disabled:text-stone-100 disabled:bg-green-300 hover:bg-green-600 active:bg-green-500 dark:text-stone-300 dark:bg-green-700 dark:disabled:text-stone-400 dark:disabled:bg-green-900 dark:hover:text-stone-100 dark:hover:bg-green-600 dark:active:text-stone-50 dark:active:bg-green-700",
        )}>按钮 green_fill</Button
    ><Button
      class="text-green-500 bg-transparent border-none disabled:text-green-300 hover:text-green-600 active:text-green-700 dark:text-green-300 dark:disabled:text-green-900 dark:hover:text-green-400 dark:active:text-green-500"
      onclick={() =>
        handleCopy(
          "text-green-500 bg-transparent border-none disabled:text-green-300 hover:text-green-600 active:text-green-700 dark:text-green-300 dark:disabled:text-green-900 dark:hover:text-green-400 dark:active:text-green-500",
        )}>按钮 green_text</Button
    ><Button
      class="text-green-500 bg-transparent border-none disabled:text-green-300 hover:text-green-600 active:text-green-700 dark:text-green-300 dark:disabled:text-green-900 dark:hover:text-green-400 dark:active:text-green-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-green-500 bg-transparent border-none disabled:text-green-300 hover:text-green-600 active:text-green-700 dark:text-green-300 dark:disabled:text-green-900 dark:hover:text-green-400 dark:active:text-green-500",
        )}>按钮 green_text</Button
    ><Button
      class="text-green-500 bg-green-50 border-green-200 disabled:text-green-300 disabled:bg-green-50 hover:bg-green-500 hover:text-white hover:border-transparent active:bg-green-400 dark:text-green-600 dark:bg-transparent dark:border-green-900 dark:disabled:text-green-900 dark:disabled:bg-transparent dark:disabled:border-green-950 dark:hover:text-stone-200 dark:hover:bg-green-700 dark:active:text-stone-100 dark:active:bg-green-800"
      onclick={() =>
        handleCopy(
          "text-green-500 bg-green-50 border-green-200 disabled:text-green-300 disabled:bg-green-50 hover:bg-green-500 hover:text-white hover:border-transparent active:bg-green-400 dark:text-green-600 dark:bg-transparent dark:border-green-900 dark:disabled:text-green-900 dark:disabled:bg-transparent dark:disabled:border-green-950 dark:hover:text-stone-200 dark:hover:bg-green-700 dark:active:text-stone-100 dark:active:bg-green-800",
        )}>按钮 green_plain</Button
    ><Button
      class="text-green-500 bg-green-50 border-green-200 disabled:text-green-300 disabled:bg-green-50 hover:bg-green-500 hover:text-white hover:border-transparent active:bg-green-400 dark:text-green-600 dark:bg-transparent dark:border-green-900 dark:disabled:text-green-900 dark:disabled:bg-transparent dark:disabled:border-green-950 dark:hover:text-stone-200 dark:hover:bg-green-700 dark:active:text-stone-100 dark:active:bg-green-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-green-500 bg-green-50 border-green-200 disabled:text-green-300 disabled:bg-green-50 hover:bg-green-500 hover:text-white hover:border-transparent active:bg-green-400 dark:text-green-600 dark:bg-transparent dark:border-green-900 dark:disabled:text-green-900 dark:disabled:bg-transparent dark:disabled:border-green-950 dark:hover:text-stone-200 dark:hover:bg-green-700 dark:active:text-stone-100 dark:active:bg-green-800",
        )}>按钮 green_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - red"}
  ><Grid
    ><Button
      class="text-white bg-red-500 border-none disabled:text-stone-100 disabled:bg-red-300 hover:bg-red-600 active:bg-red-500 dark:text-stone-300 dark:bg-red-700 dark:disabled:text-stone-400 dark:disabled:bg-red-900 dark:hover:text-stone-100 dark:hover:bg-red-600 dark:active:text-stone-50 dark:active:bg-red-700"
      onclick={() =>
        handleCopy(
          "text-white bg-red-500 border-none disabled:text-stone-100 disabled:bg-red-300 hover:bg-red-600 active:bg-red-500 dark:text-stone-300 dark:bg-red-700 dark:disabled:text-stone-400 dark:disabled:bg-red-900 dark:hover:text-stone-100 dark:hover:bg-red-600 dark:active:text-stone-50 dark:active:bg-red-700",
        )}>按钮 red_fill</Button
    ><Button
      class="text-white bg-red-500 border-none disabled:text-stone-100 disabled:bg-red-300 hover:bg-red-600 active:bg-red-500 dark:text-stone-300 dark:bg-red-700 dark:disabled:text-stone-400 dark:disabled:bg-red-900 dark:hover:text-stone-100 dark:hover:bg-red-600 dark:active:text-stone-50 dark:active:bg-red-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-red-500 border-none disabled:text-stone-100 disabled:bg-red-300 hover:bg-red-600 active:bg-red-500 dark:text-stone-300 dark:bg-red-700 dark:disabled:text-stone-400 dark:disabled:bg-red-900 dark:hover:text-stone-100 dark:hover:bg-red-600 dark:active:text-stone-50 dark:active:bg-red-700",
        )}>按钮 red_fill</Button
    ><Button
      class="text-red-500 bg-transparent border-none disabled:text-red-300 hover:text-red-600 active:text-red-700 dark:text-red-300 dark:disabled:text-red-900 dark:hover:text-red-400 dark:active:text-red-500"
      onclick={() =>
        handleCopy(
          "text-red-500 bg-transparent border-none disabled:text-red-300 hover:text-red-600 active:text-red-700 dark:text-red-300 dark:disabled:text-red-900 dark:hover:text-red-400 dark:active:text-red-500",
        )}>按钮 red_text</Button
    ><Button
      class="text-red-500 bg-transparent border-none disabled:text-red-300 hover:text-red-600 active:text-red-700 dark:text-red-300 dark:disabled:text-red-900 dark:hover:text-red-400 dark:active:text-red-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-red-500 bg-transparent border-none disabled:text-red-300 hover:text-red-600 active:text-red-700 dark:text-red-300 dark:disabled:text-red-900 dark:hover:text-red-400 dark:active:text-red-500",
        )}>按钮 red_text</Button
    ><Button
      class="text-red-500 bg-red-50 border-red-200 disabled:text-red-300 disabled:bg-red-50 hover:bg-red-500 hover:text-white hover:border-transparent active:bg-red-400 dark:text-red-600 dark:bg-transparent dark:border-red-900 dark:disabled:text-red-900 dark:disabled:bg-transparent dark:disabled:border-red-950 dark:hover:text-stone-200 dark:hover:bg-red-700 dark:active:text-stone-100 dark:active:bg-red-800"
      onclick={() =>
        handleCopy(
          "text-red-500 bg-red-50 border-red-200 disabled:text-red-300 disabled:bg-red-50 hover:bg-red-500 hover:text-white hover:border-transparent active:bg-red-400 dark:text-red-600 dark:bg-transparent dark:border-red-900 dark:disabled:text-red-900 dark:disabled:bg-transparent dark:disabled:border-red-950 dark:hover:text-stone-200 dark:hover:bg-red-700 dark:active:text-stone-100 dark:active:bg-red-800",
        )}>按钮 red_plain</Button
    ><Button
      class="text-red-500 bg-red-50 border-red-200 disabled:text-red-300 disabled:bg-red-50 hover:bg-red-500 hover:text-white hover:border-transparent active:bg-red-400 dark:text-red-600 dark:bg-transparent dark:border-red-900 dark:disabled:text-red-900 dark:disabled:bg-transparent dark:disabled:border-red-950 dark:hover:text-stone-200 dark:hover:bg-red-700 dark:active:text-stone-100 dark:active:bg-red-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-red-500 bg-red-50 border-red-200 disabled:text-red-300 disabled:bg-red-50 hover:bg-red-500 hover:text-white hover:border-transparent active:bg-red-400 dark:text-red-600 dark:bg-transparent dark:border-red-900 dark:disabled:text-red-900 dark:disabled:bg-transparent dark:disabled:border-red-950 dark:hover:text-stone-200 dark:hover:bg-red-700 dark:active:text-stone-100 dark:active:bg-red-800",
        )}>按钮 red_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - orange"}
  ><Grid
    ><Button
      class="text-white bg-orange-500 border-none disabled:text-stone-100 disabled:bg-orange-300 hover:bg-orange-600 active:bg-orange-500 dark:text-stone-300 dark:bg-orange-700 dark:disabled:text-stone-400 dark:disabled:bg-orange-900 dark:hover:text-stone-100 dark:hover:bg-orange-600 dark:active:text-stone-50 dark:active:bg-orange-700"
      onclick={() =>
        handleCopy(
          "text-white bg-orange-500 border-none disabled:text-stone-100 disabled:bg-orange-300 hover:bg-orange-600 active:bg-orange-500 dark:text-stone-300 dark:bg-orange-700 dark:disabled:text-stone-400 dark:disabled:bg-orange-900 dark:hover:text-stone-100 dark:hover:bg-orange-600 dark:active:text-stone-50 dark:active:bg-orange-700",
        )}>按钮 orange_fill</Button
    ><Button
      class="text-white bg-orange-500 border-none disabled:text-stone-100 disabled:bg-orange-300 hover:bg-orange-600 active:bg-orange-500 dark:text-stone-300 dark:bg-orange-700 dark:disabled:text-stone-400 dark:disabled:bg-orange-900 dark:hover:text-stone-100 dark:hover:bg-orange-600 dark:active:text-stone-50 dark:active:bg-orange-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-orange-500 border-none disabled:text-stone-100 disabled:bg-orange-300 hover:bg-orange-600 active:bg-orange-500 dark:text-stone-300 dark:bg-orange-700 dark:disabled:text-stone-400 dark:disabled:bg-orange-900 dark:hover:text-stone-100 dark:hover:bg-orange-600 dark:active:text-stone-50 dark:active:bg-orange-700",
        )}>按钮 orange_fill</Button
    ><Button
      class="text-orange-500 bg-transparent border-none disabled:text-orange-300 hover:text-orange-600 active:text-orange-700 dark:text-orange-300 dark:disabled:text-orange-900 dark:hover:text-orange-400 dark:active:text-orange-500"
      onclick={() =>
        handleCopy(
          "text-orange-500 bg-transparent border-none disabled:text-orange-300 hover:text-orange-600 active:text-orange-700 dark:text-orange-300 dark:disabled:text-orange-900 dark:hover:text-orange-400 dark:active:text-orange-500",
        )}>按钮 orange_text</Button
    ><Button
      class="text-orange-500 bg-transparent border-none disabled:text-orange-300 hover:text-orange-600 active:text-orange-700 dark:text-orange-300 dark:disabled:text-orange-900 dark:hover:text-orange-400 dark:active:text-orange-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-orange-500 bg-transparent border-none disabled:text-orange-300 hover:text-orange-600 active:text-orange-700 dark:text-orange-300 dark:disabled:text-orange-900 dark:hover:text-orange-400 dark:active:text-orange-500",
        )}>按钮 orange_text</Button
    ><Button
      class="text-orange-500 bg-orange-50 border-orange-200 disabled:text-orange-300 disabled:bg-orange-50 hover:bg-orange-500 hover:text-white hover:border-transparent active:bg-orange-400 dark:text-orange-600 dark:bg-transparent dark:border-orange-900 dark:disabled:text-orange-900 dark:disabled:bg-transparent dark:disabled:border-orange-950 dark:hover:text-stone-200 dark:hover:bg-orange-700 dark:active:text-stone-100 dark:active:bg-orange-800"
      onclick={() =>
        handleCopy(
          "text-orange-500 bg-orange-50 border-orange-200 disabled:text-orange-300 disabled:bg-orange-50 hover:bg-orange-500 hover:text-white hover:border-transparent active:bg-orange-400 dark:text-orange-600 dark:bg-transparent dark:border-orange-900 dark:disabled:text-orange-900 dark:disabled:bg-transparent dark:disabled:border-orange-950 dark:hover:text-stone-200 dark:hover:bg-orange-700 dark:active:text-stone-100 dark:active:bg-orange-800",
        )}>按钮 orange_plain</Button
    ><Button
      class="text-orange-500 bg-orange-50 border-orange-200 disabled:text-orange-300 disabled:bg-orange-50 hover:bg-orange-500 hover:text-white hover:border-transparent active:bg-orange-400 dark:text-orange-600 dark:bg-transparent dark:border-orange-900 dark:disabled:text-orange-900 dark:disabled:bg-transparent dark:disabled:border-orange-950 dark:hover:text-stone-200 dark:hover:bg-orange-700 dark:active:text-stone-100 dark:active:bg-orange-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-orange-500 bg-orange-50 border-orange-200 disabled:text-orange-300 disabled:bg-orange-50 hover:bg-orange-500 hover:text-white hover:border-transparent active:bg-orange-400 dark:text-orange-600 dark:bg-transparent dark:border-orange-900 dark:disabled:text-orange-900 dark:disabled:bg-transparent dark:disabled:border-orange-950 dark:hover:text-stone-200 dark:hover:bg-orange-700 dark:active:text-stone-100 dark:active:bg-orange-800",
        )}>按钮 orange_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - amber"}
  ><Grid
    ><Button
      class="text-white bg-amber-500 border-none disabled:text-stone-100 disabled:bg-amber-300 hover:bg-amber-600 active:bg-amber-500 dark:text-stone-300 dark:bg-amber-700 dark:disabled:text-stone-400 dark:disabled:bg-amber-900 dark:hover:text-stone-100 dark:hover:bg-amber-600 dark:active:text-stone-50 dark:active:bg-amber-700"
      onclick={() =>
        handleCopy(
          "text-white bg-amber-500 border-none disabled:text-stone-100 disabled:bg-amber-300 hover:bg-amber-600 active:bg-amber-500 dark:text-stone-300 dark:bg-amber-700 dark:disabled:text-stone-400 dark:disabled:bg-amber-900 dark:hover:text-stone-100 dark:hover:bg-amber-600 dark:active:text-stone-50 dark:active:bg-amber-700",
        )}>按钮 amber_fill</Button
    ><Button
      class="text-white bg-amber-500 border-none disabled:text-stone-100 disabled:bg-amber-300 hover:bg-amber-600 active:bg-amber-500 dark:text-stone-300 dark:bg-amber-700 dark:disabled:text-stone-400 dark:disabled:bg-amber-900 dark:hover:text-stone-100 dark:hover:bg-amber-600 dark:active:text-stone-50 dark:active:bg-amber-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-amber-500 border-none disabled:text-stone-100 disabled:bg-amber-300 hover:bg-amber-600 active:bg-amber-500 dark:text-stone-300 dark:bg-amber-700 dark:disabled:text-stone-400 dark:disabled:bg-amber-900 dark:hover:text-stone-100 dark:hover:bg-amber-600 dark:active:text-stone-50 dark:active:bg-amber-700",
        )}>按钮 amber_fill</Button
    ><Button
      class="text-amber-500 bg-transparent border-none disabled:text-amber-300 hover:text-amber-600 active:text-amber-700 dark:text-amber-300 dark:disabled:text-amber-900 dark:hover:text-amber-400 dark:active:text-amber-500"
      onclick={() =>
        handleCopy(
          "text-amber-500 bg-transparent border-none disabled:text-amber-300 hover:text-amber-600 active:text-amber-700 dark:text-amber-300 dark:disabled:text-amber-900 dark:hover:text-amber-400 dark:active:text-amber-500",
        )}>按钮 amber_text</Button
    ><Button
      class="text-amber-500 bg-transparent border-none disabled:text-amber-300 hover:text-amber-600 active:text-amber-700 dark:text-amber-300 dark:disabled:text-amber-900 dark:hover:text-amber-400 dark:active:text-amber-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-amber-500 bg-transparent border-none disabled:text-amber-300 hover:text-amber-600 active:text-amber-700 dark:text-amber-300 dark:disabled:text-amber-900 dark:hover:text-amber-400 dark:active:text-amber-500",
        )}>按钮 amber_text</Button
    ><Button
      class="text-amber-500 bg-amber-50 border-amber-200 disabled:text-amber-300 disabled:bg-amber-50 hover:bg-amber-500 hover:text-white hover:border-transparent active:bg-amber-400 dark:text-amber-600 dark:bg-transparent dark:border-amber-900 dark:disabled:text-amber-900 dark:disabled:bg-transparent dark:disabled:border-amber-950 dark:hover:text-stone-200 dark:hover:bg-amber-700 dark:active:text-stone-100 dark:active:bg-amber-800"
      onclick={() =>
        handleCopy(
          "text-amber-500 bg-amber-50 border-amber-200 disabled:text-amber-300 disabled:bg-amber-50 hover:bg-amber-500 hover:text-white hover:border-transparent active:bg-amber-400 dark:text-amber-600 dark:bg-transparent dark:border-amber-900 dark:disabled:text-amber-900 dark:disabled:bg-transparent dark:disabled:border-amber-950 dark:hover:text-stone-200 dark:hover:bg-amber-700 dark:active:text-stone-100 dark:active:bg-amber-800",
        )}>按钮 amber_plain</Button
    ><Button
      class="text-amber-500 bg-amber-50 border-amber-200 disabled:text-amber-300 disabled:bg-amber-50 hover:bg-amber-500 hover:text-white hover:border-transparent active:bg-amber-400 dark:text-amber-600 dark:bg-transparent dark:border-amber-900 dark:disabled:text-amber-900 dark:disabled:bg-transparent dark:disabled:border-amber-950 dark:hover:text-stone-200 dark:hover:bg-amber-700 dark:active:text-stone-100 dark:active:bg-amber-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-amber-500 bg-amber-50 border-amber-200 disabled:text-amber-300 disabled:bg-amber-50 hover:bg-amber-500 hover:text-white hover:border-transparent active:bg-amber-400 dark:text-amber-600 dark:bg-transparent dark:border-amber-900 dark:disabled:text-amber-900 dark:disabled:bg-transparent dark:disabled:border-amber-950 dark:hover:text-stone-200 dark:hover:bg-amber-700 dark:active:text-stone-100 dark:active:bg-amber-800",
        )}>按钮 amber_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - yellow"}
  ><Grid
    ><Button
      class="text-white bg-yellow-500 border-none disabled:text-stone-100 disabled:bg-yellow-300 hover:bg-yellow-600 active:bg-yellow-500 dark:text-stone-300 dark:bg-yellow-700 dark:disabled:text-stone-400 dark:disabled:bg-yellow-900 dark:hover:text-stone-100 dark:hover:bg-yellow-600 dark:active:text-stone-50 dark:active:bg-yellow-700"
      onclick={() =>
        handleCopy(
          "text-white bg-yellow-500 border-none disabled:text-stone-100 disabled:bg-yellow-300 hover:bg-yellow-600 active:bg-yellow-500 dark:text-stone-300 dark:bg-yellow-700 dark:disabled:text-stone-400 dark:disabled:bg-yellow-900 dark:hover:text-stone-100 dark:hover:bg-yellow-600 dark:active:text-stone-50 dark:active:bg-yellow-700",
        )}>按钮 yellow_fill</Button
    ><Button
      class="text-white bg-yellow-500 border-none disabled:text-stone-100 disabled:bg-yellow-300 hover:bg-yellow-600 active:bg-yellow-500 dark:text-stone-300 dark:bg-yellow-700 dark:disabled:text-stone-400 dark:disabled:bg-yellow-900 dark:hover:text-stone-100 dark:hover:bg-yellow-600 dark:active:text-stone-50 dark:active:bg-yellow-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-yellow-500 border-none disabled:text-stone-100 disabled:bg-yellow-300 hover:bg-yellow-600 active:bg-yellow-500 dark:text-stone-300 dark:bg-yellow-700 dark:disabled:text-stone-400 dark:disabled:bg-yellow-900 dark:hover:text-stone-100 dark:hover:bg-yellow-600 dark:active:text-stone-50 dark:active:bg-yellow-700",
        )}>按钮 yellow_fill</Button
    ><Button
      class="text-yellow-500 bg-transparent border-none disabled:text-yellow-300 hover:text-yellow-600 active:text-yellow-700 dark:text-yellow-300 dark:disabled:text-yellow-900 dark:hover:text-yellow-400 dark:active:text-yellow-500"
      onclick={() =>
        handleCopy(
          "text-yellow-500 bg-transparent border-none disabled:text-yellow-300 hover:text-yellow-600 active:text-yellow-700 dark:text-yellow-300 dark:disabled:text-yellow-900 dark:hover:text-yellow-400 dark:active:text-yellow-500",
        )}>按钮 yellow_text</Button
    ><Button
      class="text-yellow-500 bg-transparent border-none disabled:text-yellow-300 hover:text-yellow-600 active:text-yellow-700 dark:text-yellow-300 dark:disabled:text-yellow-900 dark:hover:text-yellow-400 dark:active:text-yellow-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-yellow-500 bg-transparent border-none disabled:text-yellow-300 hover:text-yellow-600 active:text-yellow-700 dark:text-yellow-300 dark:disabled:text-yellow-900 dark:hover:text-yellow-400 dark:active:text-yellow-500",
        )}>按钮 yellow_text</Button
    ><Button
      class="text-yellow-500 bg-yellow-50 border-yellow-200 disabled:text-yellow-300 disabled:bg-yellow-50 hover:bg-yellow-500 hover:text-white hover:border-transparent active:bg-yellow-400 dark:text-yellow-600 dark:bg-transparent dark:border-yellow-900 dark:disabled:text-yellow-900 dark:disabled:bg-transparent dark:disabled:border-yellow-950 dark:hover:text-stone-200 dark:hover:bg-yellow-700 dark:active:text-stone-100 dark:active:bg-yellow-800"
      onclick={() =>
        handleCopy(
          "text-yellow-500 bg-yellow-50 border-yellow-200 disabled:text-yellow-300 disabled:bg-yellow-50 hover:bg-yellow-500 hover:text-white hover:border-transparent active:bg-yellow-400 dark:text-yellow-600 dark:bg-transparent dark:border-yellow-900 dark:disabled:text-yellow-900 dark:disabled:bg-transparent dark:disabled:border-yellow-950 dark:hover:text-stone-200 dark:hover:bg-yellow-700 dark:active:text-stone-100 dark:active:bg-yellow-800",
        )}>按钮 yellow_plain</Button
    ><Button
      class="text-yellow-500 bg-yellow-50 border-yellow-200 disabled:text-yellow-300 disabled:bg-yellow-50 hover:bg-yellow-500 hover:text-white hover:border-transparent active:bg-yellow-400 dark:text-yellow-600 dark:bg-transparent dark:border-yellow-900 dark:disabled:text-yellow-900 dark:disabled:bg-transparent dark:disabled:border-yellow-950 dark:hover:text-stone-200 dark:hover:bg-yellow-700 dark:active:text-stone-100 dark:active:bg-yellow-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-yellow-500 bg-yellow-50 border-yellow-200 disabled:text-yellow-300 disabled:bg-yellow-50 hover:bg-yellow-500 hover:text-white hover:border-transparent active:bg-yellow-400 dark:text-yellow-600 dark:bg-transparent dark:border-yellow-900 dark:disabled:text-yellow-900 dark:disabled:bg-transparent dark:disabled:border-yellow-950 dark:hover:text-stone-200 dark:hover:bg-yellow-700 dark:active:text-stone-100 dark:active:bg-yellow-800",
        )}>按钮 yellow_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - lime"}
  ><Grid
    ><Button
      class="text-white bg-lime-500 border-none disabled:text-stone-100 disabled:bg-lime-300 hover:bg-lime-600 active:bg-lime-500 dark:text-stone-300 dark:bg-lime-700 dark:disabled:text-stone-400 dark:disabled:bg-lime-900 dark:hover:text-stone-100 dark:hover:bg-lime-600 dark:active:text-stone-50 dark:active:bg-lime-700"
      onclick={() =>
        handleCopy(
          "text-white bg-lime-500 border-none disabled:text-stone-100 disabled:bg-lime-300 hover:bg-lime-600 active:bg-lime-500 dark:text-stone-300 dark:bg-lime-700 dark:disabled:text-stone-400 dark:disabled:bg-lime-900 dark:hover:text-stone-100 dark:hover:bg-lime-600 dark:active:text-stone-50 dark:active:bg-lime-700",
        )}>按钮 lime_fill</Button
    ><Button
      class="text-white bg-lime-500 border-none disabled:text-stone-100 disabled:bg-lime-300 hover:bg-lime-600 active:bg-lime-500 dark:text-stone-300 dark:bg-lime-700 dark:disabled:text-stone-400 dark:disabled:bg-lime-900 dark:hover:text-stone-100 dark:hover:bg-lime-600 dark:active:text-stone-50 dark:active:bg-lime-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-lime-500 border-none disabled:text-stone-100 disabled:bg-lime-300 hover:bg-lime-600 active:bg-lime-500 dark:text-stone-300 dark:bg-lime-700 dark:disabled:text-stone-400 dark:disabled:bg-lime-900 dark:hover:text-stone-100 dark:hover:bg-lime-600 dark:active:text-stone-50 dark:active:bg-lime-700",
        )}>按钮 lime_fill</Button
    ><Button
      class="text-lime-500 bg-transparent border-none disabled:text-lime-300 hover:text-lime-600 active:text-lime-700 dark:text-lime-300 dark:disabled:text-lime-900 dark:hover:text-lime-400 dark:active:text-lime-500"
      onclick={() =>
        handleCopy(
          "text-lime-500 bg-transparent border-none disabled:text-lime-300 hover:text-lime-600 active:text-lime-700 dark:text-lime-300 dark:disabled:text-lime-900 dark:hover:text-lime-400 dark:active:text-lime-500",
        )}>按钮 lime_text</Button
    ><Button
      class="text-lime-500 bg-transparent border-none disabled:text-lime-300 hover:text-lime-600 active:text-lime-700 dark:text-lime-300 dark:disabled:text-lime-900 dark:hover:text-lime-400 dark:active:text-lime-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-lime-500 bg-transparent border-none disabled:text-lime-300 hover:text-lime-600 active:text-lime-700 dark:text-lime-300 dark:disabled:text-lime-900 dark:hover:text-lime-400 dark:active:text-lime-500",
        )}>按钮 lime_text</Button
    ><Button
      class="text-lime-500 bg-lime-50 border-lime-200 disabled:text-lime-300 disabled:bg-lime-50 hover:bg-lime-500 hover:text-white hover:border-transparent active:bg-lime-400 dark:text-lime-600 dark:bg-transparent dark:border-lime-900 dark:disabled:text-lime-900 dark:disabled:bg-transparent dark:disabled:border-lime-950 dark:hover:text-stone-200 dark:hover:bg-lime-700 dark:active:text-stone-100 dark:active:bg-lime-800"
      onclick={() =>
        handleCopy(
          "text-lime-500 bg-lime-50 border-lime-200 disabled:text-lime-300 disabled:bg-lime-50 hover:bg-lime-500 hover:text-white hover:border-transparent active:bg-lime-400 dark:text-lime-600 dark:bg-transparent dark:border-lime-900 dark:disabled:text-lime-900 dark:disabled:bg-transparent dark:disabled:border-lime-950 dark:hover:text-stone-200 dark:hover:bg-lime-700 dark:active:text-stone-100 dark:active:bg-lime-800",
        )}>按钮 lime_plain</Button
    ><Button
      class="text-lime-500 bg-lime-50 border-lime-200 disabled:text-lime-300 disabled:bg-lime-50 hover:bg-lime-500 hover:text-white hover:border-transparent active:bg-lime-400 dark:text-lime-600 dark:bg-transparent dark:border-lime-900 dark:disabled:text-lime-900 dark:disabled:bg-transparent dark:disabled:border-lime-950 dark:hover:text-stone-200 dark:hover:bg-lime-700 dark:active:text-stone-100 dark:active:bg-lime-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-lime-500 bg-lime-50 border-lime-200 disabled:text-lime-300 disabled:bg-lime-50 hover:bg-lime-500 hover:text-white hover:border-transparent active:bg-lime-400 dark:text-lime-600 dark:bg-transparent dark:border-lime-900 dark:disabled:text-lime-900 dark:disabled:bg-transparent dark:disabled:border-lime-950 dark:hover:text-stone-200 dark:hover:bg-lime-700 dark:active:text-stone-100 dark:active:bg-lime-800",
        )}>按钮 lime_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - emerald"}
  ><Grid
    ><Button
      class="text-white bg-emerald-500 border-none disabled:text-stone-100 disabled:bg-emerald-300 hover:bg-emerald-600 active:bg-emerald-500 dark:text-stone-300 dark:bg-emerald-700 dark:disabled:text-stone-400 dark:disabled:bg-emerald-900 dark:hover:text-stone-100 dark:hover:bg-emerald-600 dark:active:text-stone-50 dark:active:bg-emerald-700"
      onclick={() =>
        handleCopy(
          "text-white bg-emerald-500 border-none disabled:text-stone-100 disabled:bg-emerald-300 hover:bg-emerald-600 active:bg-emerald-500 dark:text-stone-300 dark:bg-emerald-700 dark:disabled:text-stone-400 dark:disabled:bg-emerald-900 dark:hover:text-stone-100 dark:hover:bg-emerald-600 dark:active:text-stone-50 dark:active:bg-emerald-700",
        )}>按钮 emerald_fill</Button
    ><Button
      class="text-white bg-emerald-500 border-none disabled:text-stone-100 disabled:bg-emerald-300 hover:bg-emerald-600 active:bg-emerald-500 dark:text-stone-300 dark:bg-emerald-700 dark:disabled:text-stone-400 dark:disabled:bg-emerald-900 dark:hover:text-stone-100 dark:hover:bg-emerald-600 dark:active:text-stone-50 dark:active:bg-emerald-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-emerald-500 border-none disabled:text-stone-100 disabled:bg-emerald-300 hover:bg-emerald-600 active:bg-emerald-500 dark:text-stone-300 dark:bg-emerald-700 dark:disabled:text-stone-400 dark:disabled:bg-emerald-900 dark:hover:text-stone-100 dark:hover:bg-emerald-600 dark:active:text-stone-50 dark:active:bg-emerald-700",
        )}>按钮 emerald_fill</Button
    ><Button
      class="text-emerald-500 bg-transparent border-none disabled:text-emerald-300 hover:text-emerald-600 active:text-emerald-700 dark:text-emerald-300 dark:disabled:text-emerald-900 dark:hover:text-emerald-400 dark:active:text-emerald-500"
      onclick={() =>
        handleCopy(
          "text-emerald-500 bg-transparent border-none disabled:text-emerald-300 hover:text-emerald-600 active:text-emerald-700 dark:text-emerald-300 dark:disabled:text-emerald-900 dark:hover:text-emerald-400 dark:active:text-emerald-500",
        )}>按钮 emerald_text</Button
    ><Button
      class="text-emerald-500 bg-transparent border-none disabled:text-emerald-300 hover:text-emerald-600 active:text-emerald-700 dark:text-emerald-300 dark:disabled:text-emerald-900 dark:hover:text-emerald-400 dark:active:text-emerald-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-emerald-500 bg-transparent border-none disabled:text-emerald-300 hover:text-emerald-600 active:text-emerald-700 dark:text-emerald-300 dark:disabled:text-emerald-900 dark:hover:text-emerald-400 dark:active:text-emerald-500",
        )}>按钮 emerald_text</Button
    ><Button
      class="text-emerald-500 bg-emerald-50 border-emerald-200 disabled:text-emerald-300 disabled:bg-emerald-50 hover:bg-emerald-500 hover:text-white hover:border-transparent active:bg-emerald-400 dark:text-emerald-600 dark:bg-transparent dark:border-emerald-900 dark:disabled:text-emerald-900 dark:disabled:bg-transparent dark:disabled:border-emerald-950 dark:hover:text-stone-200 dark:hover:bg-emerald-700 dark:active:text-stone-100 dark:active:bg-emerald-800"
      onclick={() =>
        handleCopy(
          "text-emerald-500 bg-emerald-50 border-emerald-200 disabled:text-emerald-300 disabled:bg-emerald-50 hover:bg-emerald-500 hover:text-white hover:border-transparent active:bg-emerald-400 dark:text-emerald-600 dark:bg-transparent dark:border-emerald-900 dark:disabled:text-emerald-900 dark:disabled:bg-transparent dark:disabled:border-emerald-950 dark:hover:text-stone-200 dark:hover:bg-emerald-700 dark:active:text-stone-100 dark:active:bg-emerald-800",
        )}>按钮 emerald_plain</Button
    ><Button
      class="text-emerald-500 bg-emerald-50 border-emerald-200 disabled:text-emerald-300 disabled:bg-emerald-50 hover:bg-emerald-500 hover:text-white hover:border-transparent active:bg-emerald-400 dark:text-emerald-600 dark:bg-transparent dark:border-emerald-900 dark:disabled:text-emerald-900 dark:disabled:bg-transparent dark:disabled:border-emerald-950 dark:hover:text-stone-200 dark:hover:bg-emerald-700 dark:active:text-stone-100 dark:active:bg-emerald-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-emerald-500 bg-emerald-50 border-emerald-200 disabled:text-emerald-300 disabled:bg-emerald-50 hover:bg-emerald-500 hover:text-white hover:border-transparent active:bg-emerald-400 dark:text-emerald-600 dark:bg-transparent dark:border-emerald-900 dark:disabled:text-emerald-900 dark:disabled:bg-transparent dark:disabled:border-emerald-950 dark:hover:text-stone-200 dark:hover:bg-emerald-700 dark:active:text-stone-100 dark:active:bg-emerald-800",
        )}>按钮 emerald_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - teal"}
  ><Grid
    ><Button
      class="text-white bg-teal-500 border-none disabled:text-stone-100 disabled:bg-teal-300 hover:bg-teal-600 active:bg-teal-500 dark:text-stone-300 dark:bg-teal-700 dark:disabled:text-stone-400 dark:disabled:bg-teal-900 dark:hover:text-stone-100 dark:hover:bg-teal-600 dark:active:text-stone-50 dark:active:bg-teal-700"
      onclick={() =>
        handleCopy(
          "text-white bg-teal-500 border-none disabled:text-stone-100 disabled:bg-teal-300 hover:bg-teal-600 active:bg-teal-500 dark:text-stone-300 dark:bg-teal-700 dark:disabled:text-stone-400 dark:disabled:bg-teal-900 dark:hover:text-stone-100 dark:hover:bg-teal-600 dark:active:text-stone-50 dark:active:bg-teal-700",
        )}>按钮 teal_fill</Button
    ><Button
      class="text-white bg-teal-500 border-none disabled:text-stone-100 disabled:bg-teal-300 hover:bg-teal-600 active:bg-teal-500 dark:text-stone-300 dark:bg-teal-700 dark:disabled:text-stone-400 dark:disabled:bg-teal-900 dark:hover:text-stone-100 dark:hover:bg-teal-600 dark:active:text-stone-50 dark:active:bg-teal-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-teal-500 border-none disabled:text-stone-100 disabled:bg-teal-300 hover:bg-teal-600 active:bg-teal-500 dark:text-stone-300 dark:bg-teal-700 dark:disabled:text-stone-400 dark:disabled:bg-teal-900 dark:hover:text-stone-100 dark:hover:bg-teal-600 dark:active:text-stone-50 dark:active:bg-teal-700",
        )}>按钮 teal_fill</Button
    ><Button
      class="text-teal-500 bg-transparent border-none disabled:text-teal-300 hover:text-teal-600 active:text-teal-700 dark:text-teal-300 dark:disabled:text-teal-900 dark:hover:text-teal-400 dark:active:text-teal-500"
      onclick={() =>
        handleCopy(
          "text-teal-500 bg-transparent border-none disabled:text-teal-300 hover:text-teal-600 active:text-teal-700 dark:text-teal-300 dark:disabled:text-teal-900 dark:hover:text-teal-400 dark:active:text-teal-500",
        )}>按钮 teal_text</Button
    ><Button
      class="text-teal-500 bg-transparent border-none disabled:text-teal-300 hover:text-teal-600 active:text-teal-700 dark:text-teal-300 dark:disabled:text-teal-900 dark:hover:text-teal-400 dark:active:text-teal-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-teal-500 bg-transparent border-none disabled:text-teal-300 hover:text-teal-600 active:text-teal-700 dark:text-teal-300 dark:disabled:text-teal-900 dark:hover:text-teal-400 dark:active:text-teal-500",
        )}>按钮 teal_text</Button
    ><Button
      class="text-teal-500 bg-teal-50 border-teal-200 disabled:text-teal-300 disabled:bg-teal-50 hover:bg-teal-500 hover:text-white hover:border-transparent active:bg-teal-400 dark:text-teal-600 dark:bg-transparent dark:border-teal-900 dark:disabled:text-teal-900 dark:disabled:bg-transparent dark:disabled:border-teal-950 dark:hover:text-stone-200 dark:hover:bg-teal-700 dark:active:text-stone-100 dark:active:bg-teal-800"
      onclick={() =>
        handleCopy(
          "text-teal-500 bg-teal-50 border-teal-200 disabled:text-teal-300 disabled:bg-teal-50 hover:bg-teal-500 hover:text-white hover:border-transparent active:bg-teal-400 dark:text-teal-600 dark:bg-transparent dark:border-teal-900 dark:disabled:text-teal-900 dark:disabled:bg-transparent dark:disabled:border-teal-950 dark:hover:text-stone-200 dark:hover:bg-teal-700 dark:active:text-stone-100 dark:active:bg-teal-800",
        )}>按钮 teal_plain</Button
    ><Button
      class="text-teal-500 bg-teal-50 border-teal-200 disabled:text-teal-300 disabled:bg-teal-50 hover:bg-teal-500 hover:text-white hover:border-transparent active:bg-teal-400 dark:text-teal-600 dark:bg-transparent dark:border-teal-900 dark:disabled:text-teal-900 dark:disabled:bg-transparent dark:disabled:border-teal-950 dark:hover:text-stone-200 dark:hover:bg-teal-700 dark:active:text-stone-100 dark:active:bg-teal-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-teal-500 bg-teal-50 border-teal-200 disabled:text-teal-300 disabled:bg-teal-50 hover:bg-teal-500 hover:text-white hover:border-transparent active:bg-teal-400 dark:text-teal-600 dark:bg-transparent dark:border-teal-900 dark:disabled:text-teal-900 dark:disabled:bg-transparent dark:disabled:border-teal-950 dark:hover:text-stone-200 dark:hover:bg-teal-700 dark:active:text-stone-100 dark:active:bg-teal-800",
        )}>按钮 teal_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - cyan"}
  ><Grid
    ><Button
      class="text-white bg-cyan-500 border-none disabled:text-stone-100 disabled:bg-cyan-300 hover:bg-cyan-600 active:bg-cyan-500 dark:text-stone-300 dark:bg-cyan-700 dark:disabled:text-stone-400 dark:disabled:bg-cyan-900 dark:hover:text-stone-100 dark:hover:bg-cyan-600 dark:active:text-stone-50 dark:active:bg-cyan-700"
      onclick={() =>
        handleCopy(
          "text-white bg-cyan-500 border-none disabled:text-stone-100 disabled:bg-cyan-300 hover:bg-cyan-600 active:bg-cyan-500 dark:text-stone-300 dark:bg-cyan-700 dark:disabled:text-stone-400 dark:disabled:bg-cyan-900 dark:hover:text-stone-100 dark:hover:bg-cyan-600 dark:active:text-stone-50 dark:active:bg-cyan-700",
        )}>按钮 cyan_fill</Button
    ><Button
      class="text-white bg-cyan-500 border-none disabled:text-stone-100 disabled:bg-cyan-300 hover:bg-cyan-600 active:bg-cyan-500 dark:text-stone-300 dark:bg-cyan-700 dark:disabled:text-stone-400 dark:disabled:bg-cyan-900 dark:hover:text-stone-100 dark:hover:bg-cyan-600 dark:active:text-stone-50 dark:active:bg-cyan-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-cyan-500 border-none disabled:text-stone-100 disabled:bg-cyan-300 hover:bg-cyan-600 active:bg-cyan-500 dark:text-stone-300 dark:bg-cyan-700 dark:disabled:text-stone-400 dark:disabled:bg-cyan-900 dark:hover:text-stone-100 dark:hover:bg-cyan-600 dark:active:text-stone-50 dark:active:bg-cyan-700",
        )}>按钮 cyan_fill</Button
    ><Button
      class="text-cyan-500 bg-transparent border-none disabled:text-cyan-300 hover:text-cyan-600 active:text-cyan-700 dark:text-cyan-300 dark:disabled:text-cyan-900 dark:hover:text-cyan-400 dark:active:text-cyan-500"
      onclick={() =>
        handleCopy(
          "text-cyan-500 bg-transparent border-none disabled:text-cyan-300 hover:text-cyan-600 active:text-cyan-700 dark:text-cyan-300 dark:disabled:text-cyan-900 dark:hover:text-cyan-400 dark:active:text-cyan-500",
        )}>按钮 cyan_text</Button
    ><Button
      class="text-cyan-500 bg-transparent border-none disabled:text-cyan-300 hover:text-cyan-600 active:text-cyan-700 dark:text-cyan-300 dark:disabled:text-cyan-900 dark:hover:text-cyan-400 dark:active:text-cyan-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-cyan-500 bg-transparent border-none disabled:text-cyan-300 hover:text-cyan-600 active:text-cyan-700 dark:text-cyan-300 dark:disabled:text-cyan-900 dark:hover:text-cyan-400 dark:active:text-cyan-500",
        )}>按钮 cyan_text</Button
    ><Button
      class="text-cyan-500 bg-cyan-50 border-cyan-200 disabled:text-cyan-300 disabled:bg-cyan-50 hover:bg-cyan-500 hover:text-white hover:border-transparent active:bg-cyan-400 dark:text-cyan-600 dark:bg-transparent dark:border-cyan-900 dark:disabled:text-cyan-900 dark:disabled:bg-transparent dark:disabled:border-cyan-950 dark:hover:text-stone-200 dark:hover:bg-cyan-700 dark:active:text-stone-100 dark:active:bg-cyan-800"
      onclick={() =>
        handleCopy(
          "text-cyan-500 bg-cyan-50 border-cyan-200 disabled:text-cyan-300 disabled:bg-cyan-50 hover:bg-cyan-500 hover:text-white hover:border-transparent active:bg-cyan-400 dark:text-cyan-600 dark:bg-transparent dark:border-cyan-900 dark:disabled:text-cyan-900 dark:disabled:bg-transparent dark:disabled:border-cyan-950 dark:hover:text-stone-200 dark:hover:bg-cyan-700 dark:active:text-stone-100 dark:active:bg-cyan-800",
        )}>按钮 cyan_plain</Button
    ><Button
      class="text-cyan-500 bg-cyan-50 border-cyan-200 disabled:text-cyan-300 disabled:bg-cyan-50 hover:bg-cyan-500 hover:text-white hover:border-transparent active:bg-cyan-400 dark:text-cyan-600 dark:bg-transparent dark:border-cyan-900 dark:disabled:text-cyan-900 dark:disabled:bg-transparent dark:disabled:border-cyan-950 dark:hover:text-stone-200 dark:hover:bg-cyan-700 dark:active:text-stone-100 dark:active:bg-cyan-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-cyan-500 bg-cyan-50 border-cyan-200 disabled:text-cyan-300 disabled:bg-cyan-50 hover:bg-cyan-500 hover:text-white hover:border-transparent active:bg-cyan-400 dark:text-cyan-600 dark:bg-transparent dark:border-cyan-900 dark:disabled:text-cyan-900 dark:disabled:bg-transparent dark:disabled:border-cyan-950 dark:hover:text-stone-200 dark:hover:bg-cyan-700 dark:active:text-stone-100 dark:active:bg-cyan-800",
        )}>按钮 cyan_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - sky"}
  ><Grid
    ><Button
      class="text-white bg-sky-500 border-none disabled:text-stone-100 disabled:bg-sky-300 hover:bg-sky-600 active:bg-sky-500 dark:text-stone-300 dark:bg-sky-700 dark:disabled:text-stone-400 dark:disabled:bg-sky-900 dark:hover:text-stone-100 dark:hover:bg-sky-600 dark:active:text-stone-50 dark:active:bg-sky-700"
      onclick={() =>
        handleCopy(
          "text-white bg-sky-500 border-none disabled:text-stone-100 disabled:bg-sky-300 hover:bg-sky-600 active:bg-sky-500 dark:text-stone-300 dark:bg-sky-700 dark:disabled:text-stone-400 dark:disabled:bg-sky-900 dark:hover:text-stone-100 dark:hover:bg-sky-600 dark:active:text-stone-50 dark:active:bg-sky-700",
        )}>按钮 sky_fill</Button
    ><Button
      class="text-white bg-sky-500 border-none disabled:text-stone-100 disabled:bg-sky-300 hover:bg-sky-600 active:bg-sky-500 dark:text-stone-300 dark:bg-sky-700 dark:disabled:text-stone-400 dark:disabled:bg-sky-900 dark:hover:text-stone-100 dark:hover:bg-sky-600 dark:active:text-stone-50 dark:active:bg-sky-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-sky-500 border-none disabled:text-stone-100 disabled:bg-sky-300 hover:bg-sky-600 active:bg-sky-500 dark:text-stone-300 dark:bg-sky-700 dark:disabled:text-stone-400 dark:disabled:bg-sky-900 dark:hover:text-stone-100 dark:hover:bg-sky-600 dark:active:text-stone-50 dark:active:bg-sky-700",
        )}>按钮 sky_fill</Button
    ><Button
      class="text-sky-500 bg-transparent border-none disabled:text-sky-300 hover:text-sky-600 active:text-sky-700 dark:text-sky-300 dark:disabled:text-sky-900 dark:hover:text-sky-400 dark:active:text-sky-500"
      onclick={() =>
        handleCopy(
          "text-sky-500 bg-transparent border-none disabled:text-sky-300 hover:text-sky-600 active:text-sky-700 dark:text-sky-300 dark:disabled:text-sky-900 dark:hover:text-sky-400 dark:active:text-sky-500",
        )}>按钮 sky_text</Button
    ><Button
      class="text-sky-500 bg-transparent border-none disabled:text-sky-300 hover:text-sky-600 active:text-sky-700 dark:text-sky-300 dark:disabled:text-sky-900 dark:hover:text-sky-400 dark:active:text-sky-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-sky-500 bg-transparent border-none disabled:text-sky-300 hover:text-sky-600 active:text-sky-700 dark:text-sky-300 dark:disabled:text-sky-900 dark:hover:text-sky-400 dark:active:text-sky-500",
        )}>按钮 sky_text</Button
    ><Button
      class="text-sky-500 bg-sky-50 border-sky-200 disabled:text-sky-300 disabled:bg-sky-50 hover:bg-sky-500 hover:text-white hover:border-transparent active:bg-sky-400 dark:text-sky-600 dark:bg-transparent dark:border-sky-900 dark:disabled:text-sky-900 dark:disabled:bg-transparent dark:disabled:border-sky-950 dark:hover:text-stone-200 dark:hover:bg-sky-700 dark:active:text-stone-100 dark:active:bg-sky-800"
      onclick={() =>
        handleCopy(
          "text-sky-500 bg-sky-50 border-sky-200 disabled:text-sky-300 disabled:bg-sky-50 hover:bg-sky-500 hover:text-white hover:border-transparent active:bg-sky-400 dark:text-sky-600 dark:bg-transparent dark:border-sky-900 dark:disabled:text-sky-900 dark:disabled:bg-transparent dark:disabled:border-sky-950 dark:hover:text-stone-200 dark:hover:bg-sky-700 dark:active:text-stone-100 dark:active:bg-sky-800",
        )}>按钮 sky_plain</Button
    ><Button
      class="text-sky-500 bg-sky-50 border-sky-200 disabled:text-sky-300 disabled:bg-sky-50 hover:bg-sky-500 hover:text-white hover:border-transparent active:bg-sky-400 dark:text-sky-600 dark:bg-transparent dark:border-sky-900 dark:disabled:text-sky-900 dark:disabled:bg-transparent dark:disabled:border-sky-950 dark:hover:text-stone-200 dark:hover:bg-sky-700 dark:active:text-stone-100 dark:active:bg-sky-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-sky-500 bg-sky-50 border-sky-200 disabled:text-sky-300 disabled:bg-sky-50 hover:bg-sky-500 hover:text-white hover:border-transparent active:bg-sky-400 dark:text-sky-600 dark:bg-transparent dark:border-sky-900 dark:disabled:text-sky-900 dark:disabled:bg-transparent dark:disabled:border-sky-950 dark:hover:text-stone-200 dark:hover:bg-sky-700 dark:active:text-stone-100 dark:active:bg-sky-800",
        )}>按钮 sky_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - indigo"}
  ><Grid
    ><Button
      class="text-white bg-indigo-500 border-none disabled:text-stone-100 disabled:bg-indigo-300 hover:bg-indigo-600 active:bg-indigo-500 dark:text-stone-300 dark:bg-indigo-700 dark:disabled:text-stone-400 dark:disabled:bg-indigo-900 dark:hover:text-stone-100 dark:hover:bg-indigo-600 dark:active:text-stone-50 dark:active:bg-indigo-700"
      onclick={() =>
        handleCopy(
          "text-white bg-indigo-500 border-none disabled:text-stone-100 disabled:bg-indigo-300 hover:bg-indigo-600 active:bg-indigo-500 dark:text-stone-300 dark:bg-indigo-700 dark:disabled:text-stone-400 dark:disabled:bg-indigo-900 dark:hover:text-stone-100 dark:hover:bg-indigo-600 dark:active:text-stone-50 dark:active:bg-indigo-700",
        )}>按钮 indigo_fill</Button
    ><Button
      class="text-white bg-indigo-500 border-none disabled:text-stone-100 disabled:bg-indigo-300 hover:bg-indigo-600 active:bg-indigo-500 dark:text-stone-300 dark:bg-indigo-700 dark:disabled:text-stone-400 dark:disabled:bg-indigo-900 dark:hover:text-stone-100 dark:hover:bg-indigo-600 dark:active:text-stone-50 dark:active:bg-indigo-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-indigo-500 border-none disabled:text-stone-100 disabled:bg-indigo-300 hover:bg-indigo-600 active:bg-indigo-500 dark:text-stone-300 dark:bg-indigo-700 dark:disabled:text-stone-400 dark:disabled:bg-indigo-900 dark:hover:text-stone-100 dark:hover:bg-indigo-600 dark:active:text-stone-50 dark:active:bg-indigo-700",
        )}>按钮 indigo_fill</Button
    ><Button
      class="text-indigo-500 bg-transparent border-none disabled:text-indigo-300 hover:text-indigo-600 active:text-indigo-700 dark:text-indigo-300 dark:disabled:text-indigo-900 dark:hover:text-indigo-400 dark:active:text-indigo-500"
      onclick={() =>
        handleCopy(
          "text-indigo-500 bg-transparent border-none disabled:text-indigo-300 hover:text-indigo-600 active:text-indigo-700 dark:text-indigo-300 dark:disabled:text-indigo-900 dark:hover:text-indigo-400 dark:active:text-indigo-500",
        )}>按钮 indigo_text</Button
    ><Button
      class="text-indigo-500 bg-transparent border-none disabled:text-indigo-300 hover:text-indigo-600 active:text-indigo-700 dark:text-indigo-300 dark:disabled:text-indigo-900 dark:hover:text-indigo-400 dark:active:text-indigo-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-indigo-500 bg-transparent border-none disabled:text-indigo-300 hover:text-indigo-600 active:text-indigo-700 dark:text-indigo-300 dark:disabled:text-indigo-900 dark:hover:text-indigo-400 dark:active:text-indigo-500",
        )}>按钮 indigo_text</Button
    ><Button
      class="text-indigo-500 bg-indigo-50 border-indigo-200 disabled:text-indigo-300 disabled:bg-indigo-50 hover:bg-indigo-500 hover:text-white hover:border-transparent active:bg-indigo-400 dark:text-indigo-600 dark:bg-transparent dark:border-indigo-900 dark:disabled:text-indigo-900 dark:disabled:bg-transparent dark:disabled:border-indigo-950 dark:hover:text-stone-200 dark:hover:bg-indigo-700 dark:active:text-stone-100 dark:active:bg-indigo-800"
      onclick={() =>
        handleCopy(
          "text-indigo-500 bg-indigo-50 border-indigo-200 disabled:text-indigo-300 disabled:bg-indigo-50 hover:bg-indigo-500 hover:text-white hover:border-transparent active:bg-indigo-400 dark:text-indigo-600 dark:bg-transparent dark:border-indigo-900 dark:disabled:text-indigo-900 dark:disabled:bg-transparent dark:disabled:border-indigo-950 dark:hover:text-stone-200 dark:hover:bg-indigo-700 dark:active:text-stone-100 dark:active:bg-indigo-800",
        )}>按钮 indigo_plain</Button
    ><Button
      class="text-indigo-500 bg-indigo-50 border-indigo-200 disabled:text-indigo-300 disabled:bg-indigo-50 hover:bg-indigo-500 hover:text-white hover:border-transparent active:bg-indigo-400 dark:text-indigo-600 dark:bg-transparent dark:border-indigo-900 dark:disabled:text-indigo-900 dark:disabled:bg-transparent dark:disabled:border-indigo-950 dark:hover:text-stone-200 dark:hover:bg-indigo-700 dark:active:text-stone-100 dark:active:bg-indigo-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-indigo-500 bg-indigo-50 border-indigo-200 disabled:text-indigo-300 disabled:bg-indigo-50 hover:bg-indigo-500 hover:text-white hover:border-transparent active:bg-indigo-400 dark:text-indigo-600 dark:bg-transparent dark:border-indigo-900 dark:disabled:text-indigo-900 dark:disabled:bg-transparent dark:disabled:border-indigo-950 dark:hover:text-stone-200 dark:hover:bg-indigo-700 dark:active:text-stone-100 dark:active:bg-indigo-800",
        )}>按钮 indigo_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - violet"}
  ><Grid
    ><Button
      class="text-white bg-violet-500 border-none disabled:text-stone-100 disabled:bg-violet-300 hover:bg-violet-600 active:bg-violet-500 dark:text-stone-300 dark:bg-violet-700 dark:disabled:text-stone-400 dark:disabled:bg-violet-900 dark:hover:text-stone-100 dark:hover:bg-violet-600 dark:active:text-stone-50 dark:active:bg-violet-700"
      onclick={() =>
        handleCopy(
          "text-white bg-violet-500 border-none disabled:text-stone-100 disabled:bg-violet-300 hover:bg-violet-600 active:bg-violet-500 dark:text-stone-300 dark:bg-violet-700 dark:disabled:text-stone-400 dark:disabled:bg-violet-900 dark:hover:text-stone-100 dark:hover:bg-violet-600 dark:active:text-stone-50 dark:active:bg-violet-700",
        )}>按钮 violet_fill</Button
    ><Button
      class="text-white bg-violet-500 border-none disabled:text-stone-100 disabled:bg-violet-300 hover:bg-violet-600 active:bg-violet-500 dark:text-stone-300 dark:bg-violet-700 dark:disabled:text-stone-400 dark:disabled:bg-violet-900 dark:hover:text-stone-100 dark:hover:bg-violet-600 dark:active:text-stone-50 dark:active:bg-violet-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-violet-500 border-none disabled:text-stone-100 disabled:bg-violet-300 hover:bg-violet-600 active:bg-violet-500 dark:text-stone-300 dark:bg-violet-700 dark:disabled:text-stone-400 dark:disabled:bg-violet-900 dark:hover:text-stone-100 dark:hover:bg-violet-600 dark:active:text-stone-50 dark:active:bg-violet-700",
        )}>按钮 violet_fill</Button
    ><Button
      class="text-violet-500 bg-transparent border-none disabled:text-violet-300 hover:text-violet-600 active:text-violet-700 dark:text-violet-300 dark:disabled:text-violet-900 dark:hover:text-violet-400 dark:active:text-violet-500"
      onclick={() =>
        handleCopy(
          "text-violet-500 bg-transparent border-none disabled:text-violet-300 hover:text-violet-600 active:text-violet-700 dark:text-violet-300 dark:disabled:text-violet-900 dark:hover:text-violet-400 dark:active:text-violet-500",
        )}>按钮 violet_text</Button
    ><Button
      class="text-violet-500 bg-transparent border-none disabled:text-violet-300 hover:text-violet-600 active:text-violet-700 dark:text-violet-300 dark:disabled:text-violet-900 dark:hover:text-violet-400 dark:active:text-violet-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-violet-500 bg-transparent border-none disabled:text-violet-300 hover:text-violet-600 active:text-violet-700 dark:text-violet-300 dark:disabled:text-violet-900 dark:hover:text-violet-400 dark:active:text-violet-500",
        )}>按钮 violet_text</Button
    ><Button
      class="text-violet-500 bg-violet-50 border-violet-200 disabled:text-violet-300 disabled:bg-violet-50 hover:bg-violet-500 hover:text-white hover:border-transparent active:bg-violet-400 dark:text-violet-600 dark:bg-transparent dark:border-violet-900 dark:disabled:text-violet-900 dark:disabled:bg-transparent dark:disabled:border-violet-950 dark:hover:text-stone-200 dark:hover:bg-violet-700 dark:active:text-stone-100 dark:active:bg-violet-800"
      onclick={() =>
        handleCopy(
          "text-violet-500 bg-violet-50 border-violet-200 disabled:text-violet-300 disabled:bg-violet-50 hover:bg-violet-500 hover:text-white hover:border-transparent active:bg-violet-400 dark:text-violet-600 dark:bg-transparent dark:border-violet-900 dark:disabled:text-violet-900 dark:disabled:bg-transparent dark:disabled:border-violet-950 dark:hover:text-stone-200 dark:hover:bg-violet-700 dark:active:text-stone-100 dark:active:bg-violet-800",
        )}>按钮 violet_plain</Button
    ><Button
      class="text-violet-500 bg-violet-50 border-violet-200 disabled:text-violet-300 disabled:bg-violet-50 hover:bg-violet-500 hover:text-white hover:border-transparent active:bg-violet-400 dark:text-violet-600 dark:bg-transparent dark:border-violet-900 dark:disabled:text-violet-900 dark:disabled:bg-transparent dark:disabled:border-violet-950 dark:hover:text-stone-200 dark:hover:bg-violet-700 dark:active:text-stone-100 dark:active:bg-violet-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-violet-500 bg-violet-50 border-violet-200 disabled:text-violet-300 disabled:bg-violet-50 hover:bg-violet-500 hover:text-white hover:border-transparent active:bg-violet-400 dark:text-violet-600 dark:bg-transparent dark:border-violet-900 dark:disabled:text-violet-900 dark:disabled:bg-transparent dark:disabled:border-violet-950 dark:hover:text-stone-200 dark:hover:bg-violet-700 dark:active:text-stone-100 dark:active:bg-violet-800",
        )}>按钮 violet_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - purple"}
  ><Grid
    ><Button
      class="text-white bg-purple-500 border-none disabled:text-stone-100 disabled:bg-purple-300 hover:bg-purple-600 active:bg-purple-500 dark:text-stone-300 dark:bg-purple-700 dark:disabled:text-stone-400 dark:disabled:bg-purple-900 dark:hover:text-stone-100 dark:hover:bg-purple-600 dark:active:text-stone-50 dark:active:bg-purple-700"
      onclick={() =>
        handleCopy(
          "text-white bg-purple-500 border-none disabled:text-stone-100 disabled:bg-purple-300 hover:bg-purple-600 active:bg-purple-500 dark:text-stone-300 dark:bg-purple-700 dark:disabled:text-stone-400 dark:disabled:bg-purple-900 dark:hover:text-stone-100 dark:hover:bg-purple-600 dark:active:text-stone-50 dark:active:bg-purple-700",
        )}>按钮 purple_fill</Button
    ><Button
      class="text-white bg-purple-500 border-none disabled:text-stone-100 disabled:bg-purple-300 hover:bg-purple-600 active:bg-purple-500 dark:text-stone-300 dark:bg-purple-700 dark:disabled:text-stone-400 dark:disabled:bg-purple-900 dark:hover:text-stone-100 dark:hover:bg-purple-600 dark:active:text-stone-50 dark:active:bg-purple-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-purple-500 border-none disabled:text-stone-100 disabled:bg-purple-300 hover:bg-purple-600 active:bg-purple-500 dark:text-stone-300 dark:bg-purple-700 dark:disabled:text-stone-400 dark:disabled:bg-purple-900 dark:hover:text-stone-100 dark:hover:bg-purple-600 dark:active:text-stone-50 dark:active:bg-purple-700",
        )}>按钮 purple_fill</Button
    ><Button
      class="text-purple-500 bg-transparent border-none disabled:text-purple-300 hover:text-purple-600 active:text-purple-700 dark:text-purple-300 dark:disabled:text-purple-900 dark:hover:text-purple-400 dark:active:text-purple-500"
      onclick={() =>
        handleCopy(
          "text-purple-500 bg-transparent border-none disabled:text-purple-300 hover:text-purple-600 active:text-purple-700 dark:text-purple-300 dark:disabled:text-purple-900 dark:hover:text-purple-400 dark:active:text-purple-500",
        )}>按钮 purple_text</Button
    ><Button
      class="text-purple-500 bg-transparent border-none disabled:text-purple-300 hover:text-purple-600 active:text-purple-700 dark:text-purple-300 dark:disabled:text-purple-900 dark:hover:text-purple-400 dark:active:text-purple-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-purple-500 bg-transparent border-none disabled:text-purple-300 hover:text-purple-600 active:text-purple-700 dark:text-purple-300 dark:disabled:text-purple-900 dark:hover:text-purple-400 dark:active:text-purple-500",
        )}>按钮 purple_text</Button
    ><Button
      class="text-purple-500 bg-purple-50 border-purple-200 disabled:text-purple-300 disabled:bg-purple-50 hover:bg-purple-500 hover:text-white hover:border-transparent active:bg-purple-400 dark:text-purple-600 dark:bg-transparent dark:border-purple-900 dark:disabled:text-purple-900 dark:disabled:bg-transparent dark:disabled:border-purple-950 dark:hover:text-stone-200 dark:hover:bg-purple-700 dark:active:text-stone-100 dark:active:bg-purple-800"
      onclick={() =>
        handleCopy(
          "text-purple-500 bg-purple-50 border-purple-200 disabled:text-purple-300 disabled:bg-purple-50 hover:bg-purple-500 hover:text-white hover:border-transparent active:bg-purple-400 dark:text-purple-600 dark:bg-transparent dark:border-purple-900 dark:disabled:text-purple-900 dark:disabled:bg-transparent dark:disabled:border-purple-950 dark:hover:text-stone-200 dark:hover:bg-purple-700 dark:active:text-stone-100 dark:active:bg-purple-800",
        )}>按钮 purple_plain</Button
    ><Button
      class="text-purple-500 bg-purple-50 border-purple-200 disabled:text-purple-300 disabled:bg-purple-50 hover:bg-purple-500 hover:text-white hover:border-transparent active:bg-purple-400 dark:text-purple-600 dark:bg-transparent dark:border-purple-900 dark:disabled:text-purple-900 dark:disabled:bg-transparent dark:disabled:border-purple-950 dark:hover:text-stone-200 dark:hover:bg-purple-700 dark:active:text-stone-100 dark:active:bg-purple-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-purple-500 bg-purple-50 border-purple-200 disabled:text-purple-300 disabled:bg-purple-50 hover:bg-purple-500 hover:text-white hover:border-transparent active:bg-purple-400 dark:text-purple-600 dark:bg-transparent dark:border-purple-900 dark:disabled:text-purple-900 dark:disabled:bg-transparent dark:disabled:border-purple-950 dark:hover:text-stone-200 dark:hover:bg-purple-700 dark:active:text-stone-100 dark:active:bg-purple-800",
        )}>按钮 purple_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - fuchsia"}
  ><Grid
    ><Button
      class="text-white bg-fuchsia-500 border-none disabled:text-stone-100 disabled:bg-fuchsia-300 hover:bg-fuchsia-600 active:bg-fuchsia-500 dark:text-stone-300 dark:bg-fuchsia-700 dark:disabled:text-stone-400 dark:disabled:bg-fuchsia-900 dark:hover:text-stone-100 dark:hover:bg-fuchsia-600 dark:active:text-stone-50 dark:active:bg-fuchsia-700"
      onclick={() =>
        handleCopy(
          "text-white bg-fuchsia-500 border-none disabled:text-stone-100 disabled:bg-fuchsia-300 hover:bg-fuchsia-600 active:bg-fuchsia-500 dark:text-stone-300 dark:bg-fuchsia-700 dark:disabled:text-stone-400 dark:disabled:bg-fuchsia-900 dark:hover:text-stone-100 dark:hover:bg-fuchsia-600 dark:active:text-stone-50 dark:active:bg-fuchsia-700",
        )}>按钮 fuchsia_fill</Button
    ><Button
      class="text-white bg-fuchsia-500 border-none disabled:text-stone-100 disabled:bg-fuchsia-300 hover:bg-fuchsia-600 active:bg-fuchsia-500 dark:text-stone-300 dark:bg-fuchsia-700 dark:disabled:text-stone-400 dark:disabled:bg-fuchsia-900 dark:hover:text-stone-100 dark:hover:bg-fuchsia-600 dark:active:text-stone-50 dark:active:bg-fuchsia-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-fuchsia-500 border-none disabled:text-stone-100 disabled:bg-fuchsia-300 hover:bg-fuchsia-600 active:bg-fuchsia-500 dark:text-stone-300 dark:bg-fuchsia-700 dark:disabled:text-stone-400 dark:disabled:bg-fuchsia-900 dark:hover:text-stone-100 dark:hover:bg-fuchsia-600 dark:active:text-stone-50 dark:active:bg-fuchsia-700",
        )}>按钮 fuchsia_fill</Button
    ><Button
      class="text-fuchsia-500 bg-transparent border-none disabled:text-fuchsia-300 hover:text-fuchsia-600 active:text-fuchsia-700 dark:text-fuchsia-300 dark:disabled:text-fuchsia-900 dark:hover:text-fuchsia-400 dark:active:text-fuchsia-500"
      onclick={() =>
        handleCopy(
          "text-fuchsia-500 bg-transparent border-none disabled:text-fuchsia-300 hover:text-fuchsia-600 active:text-fuchsia-700 dark:text-fuchsia-300 dark:disabled:text-fuchsia-900 dark:hover:text-fuchsia-400 dark:active:text-fuchsia-500",
        )}>按钮 fuchsia_text</Button
    ><Button
      class="text-fuchsia-500 bg-transparent border-none disabled:text-fuchsia-300 hover:text-fuchsia-600 active:text-fuchsia-700 dark:text-fuchsia-300 dark:disabled:text-fuchsia-900 dark:hover:text-fuchsia-400 dark:active:text-fuchsia-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-fuchsia-500 bg-transparent border-none disabled:text-fuchsia-300 hover:text-fuchsia-600 active:text-fuchsia-700 dark:text-fuchsia-300 dark:disabled:text-fuchsia-900 dark:hover:text-fuchsia-400 dark:active:text-fuchsia-500",
        )}>按钮 fuchsia_text</Button
    ><Button
      class="text-fuchsia-500 bg-fuchsia-50 border-fuchsia-200 disabled:text-fuchsia-300 disabled:bg-fuchsia-50 hover:bg-fuchsia-500 hover:text-white hover:border-transparent active:bg-fuchsia-400 dark:text-fuchsia-600 dark:bg-transparent dark:border-fuchsia-900 dark:disabled:text-fuchsia-900 dark:disabled:bg-transparent dark:disabled:border-fuchsia-950 dark:hover:text-stone-200 dark:hover:bg-fuchsia-700 dark:active:text-stone-100 dark:active:bg-fuchsia-800"
      onclick={() =>
        handleCopy(
          "text-fuchsia-500 bg-fuchsia-50 border-fuchsia-200 disabled:text-fuchsia-300 disabled:bg-fuchsia-50 hover:bg-fuchsia-500 hover:text-white hover:border-transparent active:bg-fuchsia-400 dark:text-fuchsia-600 dark:bg-transparent dark:border-fuchsia-900 dark:disabled:text-fuchsia-900 dark:disabled:bg-transparent dark:disabled:border-fuchsia-950 dark:hover:text-stone-200 dark:hover:bg-fuchsia-700 dark:active:text-stone-100 dark:active:bg-fuchsia-800",
        )}>按钮 fuchsia_plain</Button
    ><Button
      class="text-fuchsia-500 bg-fuchsia-50 border-fuchsia-200 disabled:text-fuchsia-300 disabled:bg-fuchsia-50 hover:bg-fuchsia-500 hover:text-white hover:border-transparent active:bg-fuchsia-400 dark:text-fuchsia-600 dark:bg-transparent dark:border-fuchsia-900 dark:disabled:text-fuchsia-900 dark:disabled:bg-transparent dark:disabled:border-fuchsia-950 dark:hover:text-stone-200 dark:hover:bg-fuchsia-700 dark:active:text-stone-100 dark:active:bg-fuchsia-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-fuchsia-500 bg-fuchsia-50 border-fuchsia-200 disabled:text-fuchsia-300 disabled:bg-fuchsia-50 hover:bg-fuchsia-500 hover:text-white hover:border-transparent active:bg-fuchsia-400 dark:text-fuchsia-600 dark:bg-transparent dark:border-fuchsia-900 dark:disabled:text-fuchsia-900 dark:disabled:bg-transparent dark:disabled:border-fuchsia-950 dark:hover:text-stone-200 dark:hover:bg-fuchsia-700 dark:active:text-stone-100 dark:active:bg-fuchsia-800",
        )}>按钮 fuchsia_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - pink"}
  ><Grid
    ><Button
      class="text-white bg-pink-500 border-none disabled:text-stone-100 disabled:bg-pink-300 hover:bg-pink-600 active:bg-pink-500 dark:text-stone-300 dark:bg-pink-700 dark:disabled:text-stone-400 dark:disabled:bg-pink-900 dark:hover:text-stone-100 dark:hover:bg-pink-600 dark:active:text-stone-50 dark:active:bg-pink-700"
      onclick={() =>
        handleCopy(
          "text-white bg-pink-500 border-none disabled:text-stone-100 disabled:bg-pink-300 hover:bg-pink-600 active:bg-pink-500 dark:text-stone-300 dark:bg-pink-700 dark:disabled:text-stone-400 dark:disabled:bg-pink-900 dark:hover:text-stone-100 dark:hover:bg-pink-600 dark:active:text-stone-50 dark:active:bg-pink-700",
        )}>按钮 pink_fill</Button
    ><Button
      class="text-white bg-pink-500 border-none disabled:text-stone-100 disabled:bg-pink-300 hover:bg-pink-600 active:bg-pink-500 dark:text-stone-300 dark:bg-pink-700 dark:disabled:text-stone-400 dark:disabled:bg-pink-900 dark:hover:text-stone-100 dark:hover:bg-pink-600 dark:active:text-stone-50 dark:active:bg-pink-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-pink-500 border-none disabled:text-stone-100 disabled:bg-pink-300 hover:bg-pink-600 active:bg-pink-500 dark:text-stone-300 dark:bg-pink-700 dark:disabled:text-stone-400 dark:disabled:bg-pink-900 dark:hover:text-stone-100 dark:hover:bg-pink-600 dark:active:text-stone-50 dark:active:bg-pink-700",
        )}>按钮 pink_fill</Button
    ><Button
      class="text-pink-500 bg-transparent border-none disabled:text-pink-300 hover:text-pink-600 active:text-pink-700 dark:text-pink-300 dark:disabled:text-pink-900 dark:hover:text-pink-400 dark:active:text-pink-500"
      onclick={() =>
        handleCopy(
          "text-pink-500 bg-transparent border-none disabled:text-pink-300 hover:text-pink-600 active:text-pink-700 dark:text-pink-300 dark:disabled:text-pink-900 dark:hover:text-pink-400 dark:active:text-pink-500",
        )}>按钮 pink_text</Button
    ><Button
      class="text-pink-500 bg-transparent border-none disabled:text-pink-300 hover:text-pink-600 active:text-pink-700 dark:text-pink-300 dark:disabled:text-pink-900 dark:hover:text-pink-400 dark:active:text-pink-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-pink-500 bg-transparent border-none disabled:text-pink-300 hover:text-pink-600 active:text-pink-700 dark:text-pink-300 dark:disabled:text-pink-900 dark:hover:text-pink-400 dark:active:text-pink-500",
        )}>按钮 pink_text</Button
    ><Button
      class="text-pink-500 bg-pink-50 border-pink-200 disabled:text-pink-300 disabled:bg-pink-50 hover:bg-pink-500 hover:text-white hover:border-transparent active:bg-pink-400 dark:text-pink-600 dark:bg-transparent dark:border-pink-900 dark:disabled:text-pink-900 dark:disabled:bg-transparent dark:disabled:border-pink-950 dark:hover:text-stone-200 dark:hover:bg-pink-700 dark:active:text-stone-100 dark:active:bg-pink-800"
      onclick={() =>
        handleCopy(
          "text-pink-500 bg-pink-50 border-pink-200 disabled:text-pink-300 disabled:bg-pink-50 hover:bg-pink-500 hover:text-white hover:border-transparent active:bg-pink-400 dark:text-pink-600 dark:bg-transparent dark:border-pink-900 dark:disabled:text-pink-900 dark:disabled:bg-transparent dark:disabled:border-pink-950 dark:hover:text-stone-200 dark:hover:bg-pink-700 dark:active:text-stone-100 dark:active:bg-pink-800",
        )}>按钮 pink_plain</Button
    ><Button
      class="text-pink-500 bg-pink-50 border-pink-200 disabled:text-pink-300 disabled:bg-pink-50 hover:bg-pink-500 hover:text-white hover:border-transparent active:bg-pink-400 dark:text-pink-600 dark:bg-transparent dark:border-pink-900 dark:disabled:text-pink-900 dark:disabled:bg-transparent dark:disabled:border-pink-950 dark:hover:text-stone-200 dark:hover:bg-pink-700 dark:active:text-stone-100 dark:active:bg-pink-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-pink-500 bg-pink-50 border-pink-200 disabled:text-pink-300 disabled:bg-pink-50 hover:bg-pink-500 hover:text-white hover:border-transparent active:bg-pink-400 dark:text-pink-600 dark:bg-transparent dark:border-pink-900 dark:disabled:text-pink-900 dark:disabled:bg-transparent dark:disabled:border-pink-950 dark:hover:text-stone-200 dark:hover:bg-pink-700 dark:active:text-stone-100 dark:active:bg-pink-800",
        )}>按钮 pink_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - rose"}
  ><Grid
    ><Button
      class="text-white bg-rose-500 border-none disabled:text-stone-100 disabled:bg-rose-300 hover:bg-rose-600 active:bg-rose-500 dark:text-stone-300 dark:bg-rose-700 dark:disabled:text-stone-400 dark:disabled:bg-rose-900 dark:hover:text-stone-100 dark:hover:bg-rose-600 dark:active:text-stone-50 dark:active:bg-rose-700"
      onclick={() =>
        handleCopy(
          "text-white bg-rose-500 border-none disabled:text-stone-100 disabled:bg-rose-300 hover:bg-rose-600 active:bg-rose-500 dark:text-stone-300 dark:bg-rose-700 dark:disabled:text-stone-400 dark:disabled:bg-rose-900 dark:hover:text-stone-100 dark:hover:bg-rose-600 dark:active:text-stone-50 dark:active:bg-rose-700",
        )}>按钮 rose_fill</Button
    ><Button
      class="text-white bg-rose-500 border-none disabled:text-stone-100 disabled:bg-rose-300 hover:bg-rose-600 active:bg-rose-500 dark:text-stone-300 dark:bg-rose-700 dark:disabled:text-stone-400 dark:disabled:bg-rose-900 dark:hover:text-stone-100 dark:hover:bg-rose-600 dark:active:text-stone-50 dark:active:bg-rose-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-rose-500 border-none disabled:text-stone-100 disabled:bg-rose-300 hover:bg-rose-600 active:bg-rose-500 dark:text-stone-300 dark:bg-rose-700 dark:disabled:text-stone-400 dark:disabled:bg-rose-900 dark:hover:text-stone-100 dark:hover:bg-rose-600 dark:active:text-stone-50 dark:active:bg-rose-700",
        )}>按钮 rose_fill</Button
    ><Button
      class="text-rose-500 bg-transparent border-none disabled:text-rose-300 hover:text-rose-600 active:text-rose-700 dark:text-rose-300 dark:disabled:text-rose-900 dark:hover:text-rose-400 dark:active:text-rose-500"
      onclick={() =>
        handleCopy(
          "text-rose-500 bg-transparent border-none disabled:text-rose-300 hover:text-rose-600 active:text-rose-700 dark:text-rose-300 dark:disabled:text-rose-900 dark:hover:text-rose-400 dark:active:text-rose-500",
        )}>按钮 rose_text</Button
    ><Button
      class="text-rose-500 bg-transparent border-none disabled:text-rose-300 hover:text-rose-600 active:text-rose-700 dark:text-rose-300 dark:disabled:text-rose-900 dark:hover:text-rose-400 dark:active:text-rose-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-rose-500 bg-transparent border-none disabled:text-rose-300 hover:text-rose-600 active:text-rose-700 dark:text-rose-300 dark:disabled:text-rose-900 dark:hover:text-rose-400 dark:active:text-rose-500",
        )}>按钮 rose_text</Button
    ><Button
      class="text-rose-500 bg-rose-50 border-rose-200 disabled:text-rose-300 disabled:bg-rose-50 hover:bg-rose-500 hover:text-white hover:border-transparent active:bg-rose-400 dark:text-rose-600 dark:bg-transparent dark:border-rose-900 dark:disabled:text-rose-900 dark:disabled:bg-transparent dark:disabled:border-rose-950 dark:hover:text-stone-200 dark:hover:bg-rose-700 dark:active:text-stone-100 dark:active:bg-rose-800"
      onclick={() =>
        handleCopy(
          "text-rose-500 bg-rose-50 border-rose-200 disabled:text-rose-300 disabled:bg-rose-50 hover:bg-rose-500 hover:text-white hover:border-transparent active:bg-rose-400 dark:text-rose-600 dark:bg-transparent dark:border-rose-900 dark:disabled:text-rose-900 dark:disabled:bg-transparent dark:disabled:border-rose-950 dark:hover:text-stone-200 dark:hover:bg-rose-700 dark:active:text-stone-100 dark:active:bg-rose-800",
        )}>按钮 rose_plain</Button
    ><Button
      class="text-rose-500 bg-rose-50 border-rose-200 disabled:text-rose-300 disabled:bg-rose-50 hover:bg-rose-500 hover:text-white hover:border-transparent active:bg-rose-400 dark:text-rose-600 dark:bg-transparent dark:border-rose-900 dark:disabled:text-rose-900 dark:disabled:bg-transparent dark:disabled:border-rose-950 dark:hover:text-stone-200 dark:hover:bg-rose-700 dark:active:text-stone-100 dark:active:bg-rose-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-rose-500 bg-rose-50 border-rose-200 disabled:text-rose-300 disabled:bg-rose-50 hover:bg-rose-500 hover:text-white hover:border-transparent active:bg-rose-400 dark:text-rose-600 dark:bg-transparent dark:border-rose-900 dark:disabled:text-rose-900 dark:disabled:bg-transparent dark:disabled:border-rose-950 dark:hover:text-stone-200 dark:hover:bg-rose-700 dark:active:text-stone-100 dark:active:bg-rose-800",
        )}>按钮 rose_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - slate"}
  ><Grid
    ><Button
      class="text-white bg-slate-500 border-none disabled:text-stone-100 disabled:bg-slate-300 hover:bg-slate-600 active:bg-slate-500 dark:text-stone-300 dark:bg-slate-700 dark:disabled:text-stone-400 dark:disabled:bg-slate-900 dark:hover:text-stone-100 dark:hover:bg-slate-600 dark:active:text-stone-50 dark:active:bg-slate-700"
      onclick={() =>
        handleCopy(
          "text-white bg-slate-500 border-none disabled:text-stone-100 disabled:bg-slate-300 hover:bg-slate-600 active:bg-slate-500 dark:text-stone-300 dark:bg-slate-700 dark:disabled:text-stone-400 dark:disabled:bg-slate-900 dark:hover:text-stone-100 dark:hover:bg-slate-600 dark:active:text-stone-50 dark:active:bg-slate-700",
        )}>按钮 slate_fill</Button
    ><Button
      class="text-white bg-slate-500 border-none disabled:text-stone-100 disabled:bg-slate-300 hover:bg-slate-600 active:bg-slate-500 dark:text-stone-300 dark:bg-slate-700 dark:disabled:text-stone-400 dark:disabled:bg-slate-900 dark:hover:text-stone-100 dark:hover:bg-slate-600 dark:active:text-stone-50 dark:active:bg-slate-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-slate-500 border-none disabled:text-stone-100 disabled:bg-slate-300 hover:bg-slate-600 active:bg-slate-500 dark:text-stone-300 dark:bg-slate-700 dark:disabled:text-stone-400 dark:disabled:bg-slate-900 dark:hover:text-stone-100 dark:hover:bg-slate-600 dark:active:text-stone-50 dark:active:bg-slate-700",
        )}>按钮 slate_fill</Button
    ><Button
      class="text-slate-500 bg-transparent border-none disabled:text-slate-300 hover:text-slate-600 active:text-slate-700 dark:text-slate-300 dark:disabled:text-slate-900 dark:hover:text-slate-400 dark:active:text-slate-500"
      onclick={() =>
        handleCopy(
          "text-slate-500 bg-transparent border-none disabled:text-slate-300 hover:text-slate-600 active:text-slate-700 dark:text-slate-300 dark:disabled:text-slate-900 dark:hover:text-slate-400 dark:active:text-slate-500",
        )}>按钮 slate_text</Button
    ><Button
      class="text-slate-500 bg-transparent border-none disabled:text-slate-300 hover:text-slate-600 active:text-slate-700 dark:text-slate-300 dark:disabled:text-slate-900 dark:hover:text-slate-400 dark:active:text-slate-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-slate-500 bg-transparent border-none disabled:text-slate-300 hover:text-slate-600 active:text-slate-700 dark:text-slate-300 dark:disabled:text-slate-900 dark:hover:text-slate-400 dark:active:text-slate-500",
        )}>按钮 slate_text</Button
    ><Button
      class="text-slate-500 bg-slate-50 border-slate-200 disabled:text-slate-300 disabled:bg-slate-50 hover:bg-slate-500 hover:text-white hover:border-transparent active:bg-slate-400 dark:text-slate-600 dark:bg-transparent dark:border-slate-900 dark:disabled:text-slate-900 dark:disabled:bg-transparent dark:disabled:border-slate-950 dark:hover:text-stone-200 dark:hover:bg-slate-700 dark:active:text-stone-100 dark:active:bg-slate-800"
      onclick={() =>
        handleCopy(
          "text-slate-500 bg-slate-50 border-slate-200 disabled:text-slate-300 disabled:bg-slate-50 hover:bg-slate-500 hover:text-white hover:border-transparent active:bg-slate-400 dark:text-slate-600 dark:bg-transparent dark:border-slate-900 dark:disabled:text-slate-900 dark:disabled:bg-transparent dark:disabled:border-slate-950 dark:hover:text-stone-200 dark:hover:bg-slate-700 dark:active:text-stone-100 dark:active:bg-slate-800",
        )}>按钮 slate_plain</Button
    ><Button
      class="text-slate-500 bg-slate-50 border-slate-200 disabled:text-slate-300 disabled:bg-slate-50 hover:bg-slate-500 hover:text-white hover:border-transparent active:bg-slate-400 dark:text-slate-600 dark:bg-transparent dark:border-slate-900 dark:disabled:text-slate-900 dark:disabled:bg-transparent dark:disabled:border-slate-950 dark:hover:text-stone-200 dark:hover:bg-slate-700 dark:active:text-stone-100 dark:active:bg-slate-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-slate-500 bg-slate-50 border-slate-200 disabled:text-slate-300 disabled:bg-slate-50 hover:bg-slate-500 hover:text-white hover:border-transparent active:bg-slate-400 dark:text-slate-600 dark:bg-transparent dark:border-slate-900 dark:disabled:text-slate-900 dark:disabled:bg-transparent dark:disabled:border-slate-950 dark:hover:text-stone-200 dark:hover:bg-slate-700 dark:active:text-stone-100 dark:active:bg-slate-800",
        )}>按钮 slate_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - gray"}
  ><Grid
    ><Button
      class="text-white bg-gray-500 border-none disabled:text-stone-100 disabled:bg-gray-300 hover:bg-gray-600 active:bg-gray-500 dark:text-stone-300 dark:bg-gray-700 dark:disabled:text-stone-400 dark:disabled:bg-gray-900 dark:hover:text-stone-100 dark:hover:bg-gray-600 dark:active:text-stone-50 dark:active:bg-gray-700"
      onclick={() =>
        handleCopy(
          "text-white bg-gray-500 border-none disabled:text-stone-100 disabled:bg-gray-300 hover:bg-gray-600 active:bg-gray-500 dark:text-stone-300 dark:bg-gray-700 dark:disabled:text-stone-400 dark:disabled:bg-gray-900 dark:hover:text-stone-100 dark:hover:bg-gray-600 dark:active:text-stone-50 dark:active:bg-gray-700",
        )}>按钮 gray_fill</Button
    ><Button
      class="text-white bg-gray-500 border-none disabled:text-stone-100 disabled:bg-gray-300 hover:bg-gray-600 active:bg-gray-500 dark:text-stone-300 dark:bg-gray-700 dark:disabled:text-stone-400 dark:disabled:bg-gray-900 dark:hover:text-stone-100 dark:hover:bg-gray-600 dark:active:text-stone-50 dark:active:bg-gray-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-gray-500 border-none disabled:text-stone-100 disabled:bg-gray-300 hover:bg-gray-600 active:bg-gray-500 dark:text-stone-300 dark:bg-gray-700 dark:disabled:text-stone-400 dark:disabled:bg-gray-900 dark:hover:text-stone-100 dark:hover:bg-gray-600 dark:active:text-stone-50 dark:active:bg-gray-700",
        )}>按钮 gray_fill</Button
    ><Button
      class="text-gray-500 bg-transparent border-none disabled:text-gray-300 hover:text-gray-600 active:text-gray-700 dark:text-gray-300 dark:disabled:text-gray-900 dark:hover:text-gray-400 dark:active:text-gray-500"
      onclick={() =>
        handleCopy(
          "text-gray-500 bg-transparent border-none disabled:text-gray-300 hover:text-gray-600 active:text-gray-700 dark:text-gray-300 dark:disabled:text-gray-900 dark:hover:text-gray-400 dark:active:text-gray-500",
        )}>按钮 gray_text</Button
    ><Button
      class="text-gray-500 bg-transparent border-none disabled:text-gray-300 hover:text-gray-600 active:text-gray-700 dark:text-gray-300 dark:disabled:text-gray-900 dark:hover:text-gray-400 dark:active:text-gray-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-gray-500 bg-transparent border-none disabled:text-gray-300 hover:text-gray-600 active:text-gray-700 dark:text-gray-300 dark:disabled:text-gray-900 dark:hover:text-gray-400 dark:active:text-gray-500",
        )}>按钮 gray_text</Button
    ><Button
      class="text-gray-500 bg-gray-50 border-gray-200 disabled:text-gray-300 disabled:bg-gray-50 hover:bg-gray-500 hover:text-white hover:border-transparent active:bg-gray-400 dark:text-gray-600 dark:bg-transparent dark:border-gray-900 dark:disabled:text-gray-900 dark:disabled:bg-transparent dark:disabled:border-gray-950 dark:hover:text-stone-200 dark:hover:bg-gray-700 dark:active:text-stone-100 dark:active:bg-gray-800"
      onclick={() =>
        handleCopy(
          "text-gray-500 bg-gray-50 border-gray-200 disabled:text-gray-300 disabled:bg-gray-50 hover:bg-gray-500 hover:text-white hover:border-transparent active:bg-gray-400 dark:text-gray-600 dark:bg-transparent dark:border-gray-900 dark:disabled:text-gray-900 dark:disabled:bg-transparent dark:disabled:border-gray-950 dark:hover:text-stone-200 dark:hover:bg-gray-700 dark:active:text-stone-100 dark:active:bg-gray-800",
        )}>按钮 gray_plain</Button
    ><Button
      class="text-gray-500 bg-gray-50 border-gray-200 disabled:text-gray-300 disabled:bg-gray-50 hover:bg-gray-500 hover:text-white hover:border-transparent active:bg-gray-400 dark:text-gray-600 dark:bg-transparent dark:border-gray-900 dark:disabled:text-gray-900 dark:disabled:bg-transparent dark:disabled:border-gray-950 dark:hover:text-stone-200 dark:hover:bg-gray-700 dark:active:text-stone-100 dark:active:bg-gray-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-gray-500 bg-gray-50 border-gray-200 disabled:text-gray-300 disabled:bg-gray-50 hover:bg-gray-500 hover:text-white hover:border-transparent active:bg-gray-400 dark:text-gray-600 dark:bg-transparent dark:border-gray-900 dark:disabled:text-gray-900 dark:disabled:bg-transparent dark:disabled:border-gray-950 dark:hover:text-stone-200 dark:hover:bg-gray-700 dark:active:text-stone-100 dark:active:bg-gray-800",
        )}>按钮 gray_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - zinc"}
  ><Grid
    ><Button
      class="text-white bg-zinc-500 border-none disabled:text-stone-100 disabled:bg-zinc-300 hover:bg-zinc-600 active:bg-zinc-500 dark:text-stone-300 dark:bg-zinc-700 dark:disabled:text-stone-400 dark:disabled:bg-zinc-900 dark:hover:text-stone-100 dark:hover:bg-zinc-600 dark:active:text-stone-50 dark:active:bg-zinc-700"
      onclick={() =>
        handleCopy(
          "text-white bg-zinc-500 border-none disabled:text-stone-100 disabled:bg-zinc-300 hover:bg-zinc-600 active:bg-zinc-500 dark:text-stone-300 dark:bg-zinc-700 dark:disabled:text-stone-400 dark:disabled:bg-zinc-900 dark:hover:text-stone-100 dark:hover:bg-zinc-600 dark:active:text-stone-50 dark:active:bg-zinc-700",
        )}>按钮 zinc_fill</Button
    ><Button
      class="text-white bg-zinc-500 border-none disabled:text-stone-100 disabled:bg-zinc-300 hover:bg-zinc-600 active:bg-zinc-500 dark:text-stone-300 dark:bg-zinc-700 dark:disabled:text-stone-400 dark:disabled:bg-zinc-900 dark:hover:text-stone-100 dark:hover:bg-zinc-600 dark:active:text-stone-50 dark:active:bg-zinc-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-zinc-500 border-none disabled:text-stone-100 disabled:bg-zinc-300 hover:bg-zinc-600 active:bg-zinc-500 dark:text-stone-300 dark:bg-zinc-700 dark:disabled:text-stone-400 dark:disabled:bg-zinc-900 dark:hover:text-stone-100 dark:hover:bg-zinc-600 dark:active:text-stone-50 dark:active:bg-zinc-700",
        )}>按钮 zinc_fill</Button
    ><Button
      class="text-zinc-500 bg-transparent border-none disabled:text-zinc-300 hover:text-zinc-600 active:text-zinc-700 dark:text-zinc-300 dark:disabled:text-zinc-900 dark:hover:text-zinc-400 dark:active:text-zinc-500"
      onclick={() =>
        handleCopy(
          "text-zinc-500 bg-transparent border-none disabled:text-zinc-300 hover:text-zinc-600 active:text-zinc-700 dark:text-zinc-300 dark:disabled:text-zinc-900 dark:hover:text-zinc-400 dark:active:text-zinc-500",
        )}>按钮 zinc_text</Button
    ><Button
      class="text-zinc-500 bg-transparent border-none disabled:text-zinc-300 hover:text-zinc-600 active:text-zinc-700 dark:text-zinc-300 dark:disabled:text-zinc-900 dark:hover:text-zinc-400 dark:active:text-zinc-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-zinc-500 bg-transparent border-none disabled:text-zinc-300 hover:text-zinc-600 active:text-zinc-700 dark:text-zinc-300 dark:disabled:text-zinc-900 dark:hover:text-zinc-400 dark:active:text-zinc-500",
        )}>按钮 zinc_text</Button
    ><Button
      class="text-zinc-500 bg-zinc-50 border-zinc-200 disabled:text-zinc-300 disabled:bg-zinc-50 hover:bg-zinc-500 hover:text-white hover:border-transparent active:bg-zinc-400 dark:text-zinc-600 dark:bg-transparent dark:border-zinc-900 dark:disabled:text-zinc-900 dark:disabled:bg-transparent dark:disabled:border-zinc-950 dark:hover:text-stone-200 dark:hover:bg-zinc-700 dark:active:text-stone-100 dark:active:bg-zinc-800"
      onclick={() =>
        handleCopy(
          "text-zinc-500 bg-zinc-50 border-zinc-200 disabled:text-zinc-300 disabled:bg-zinc-50 hover:bg-zinc-500 hover:text-white hover:border-transparent active:bg-zinc-400 dark:text-zinc-600 dark:bg-transparent dark:border-zinc-900 dark:disabled:text-zinc-900 dark:disabled:bg-transparent dark:disabled:border-zinc-950 dark:hover:text-stone-200 dark:hover:bg-zinc-700 dark:active:text-stone-100 dark:active:bg-zinc-800",
        )}>按钮 zinc_plain</Button
    ><Button
      class="text-zinc-500 bg-zinc-50 border-zinc-200 disabled:text-zinc-300 disabled:bg-zinc-50 hover:bg-zinc-500 hover:text-white hover:border-transparent active:bg-zinc-400 dark:text-zinc-600 dark:bg-transparent dark:border-zinc-900 dark:disabled:text-zinc-900 dark:disabled:bg-transparent dark:disabled:border-zinc-950 dark:hover:text-stone-200 dark:hover:bg-zinc-700 dark:active:text-stone-100 dark:active:bg-zinc-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-zinc-500 bg-zinc-50 border-zinc-200 disabled:text-zinc-300 disabled:bg-zinc-50 hover:bg-zinc-500 hover:text-white hover:border-transparent active:bg-zinc-400 dark:text-zinc-600 dark:bg-transparent dark:border-zinc-900 dark:disabled:text-zinc-900 dark:disabled:bg-transparent dark:disabled:border-zinc-950 dark:hover:text-stone-200 dark:hover:bg-zinc-700 dark:active:text-stone-100 dark:active:bg-zinc-800",
        )}>按钮 zinc_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - neutral"}
  ><Grid
    ><Button
      class="text-white bg-neutral-500 border-none disabled:text-stone-100 disabled:bg-neutral-300 hover:bg-neutral-600 active:bg-neutral-500 dark:text-stone-300 dark:bg-neutral-700 dark:disabled:text-stone-400 dark:disabled:bg-neutral-900 dark:hover:text-stone-100 dark:hover:bg-neutral-600 dark:active:text-stone-50 dark:active:bg-neutral-700"
      onclick={() =>
        handleCopy(
          "text-white bg-neutral-500 border-none disabled:text-stone-100 disabled:bg-neutral-300 hover:bg-neutral-600 active:bg-neutral-500 dark:text-stone-300 dark:bg-neutral-700 dark:disabled:text-stone-400 dark:disabled:bg-neutral-900 dark:hover:text-stone-100 dark:hover:bg-neutral-600 dark:active:text-stone-50 dark:active:bg-neutral-700",
        )}>按钮 neutral_fill</Button
    ><Button
      class="text-white bg-neutral-500 border-none disabled:text-stone-100 disabled:bg-neutral-300 hover:bg-neutral-600 active:bg-neutral-500 dark:text-stone-300 dark:bg-neutral-700 dark:disabled:text-stone-400 dark:disabled:bg-neutral-900 dark:hover:text-stone-100 dark:hover:bg-neutral-600 dark:active:text-stone-50 dark:active:bg-neutral-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-neutral-500 border-none disabled:text-stone-100 disabled:bg-neutral-300 hover:bg-neutral-600 active:bg-neutral-500 dark:text-stone-300 dark:bg-neutral-700 dark:disabled:text-stone-400 dark:disabled:bg-neutral-900 dark:hover:text-stone-100 dark:hover:bg-neutral-600 dark:active:text-stone-50 dark:active:bg-neutral-700",
        )}>按钮 neutral_fill</Button
    ><Button
      class="text-neutral-500 bg-transparent border-none disabled:text-neutral-300 hover:text-neutral-600 active:text-neutral-700 dark:text-neutral-300 dark:disabled:text-neutral-900 dark:hover:text-neutral-400 dark:active:text-neutral-500"
      onclick={() =>
        handleCopy(
          "text-neutral-500 bg-transparent border-none disabled:text-neutral-300 hover:text-neutral-600 active:text-neutral-700 dark:text-neutral-300 dark:disabled:text-neutral-900 dark:hover:text-neutral-400 dark:active:text-neutral-500",
        )}>按钮 neutral_text</Button
    ><Button
      class="text-neutral-500 bg-transparent border-none disabled:text-neutral-300 hover:text-neutral-600 active:text-neutral-700 dark:text-neutral-300 dark:disabled:text-neutral-900 dark:hover:text-neutral-400 dark:active:text-neutral-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-neutral-500 bg-transparent border-none disabled:text-neutral-300 hover:text-neutral-600 active:text-neutral-700 dark:text-neutral-300 dark:disabled:text-neutral-900 dark:hover:text-neutral-400 dark:active:text-neutral-500",
        )}>按钮 neutral_text</Button
    ><Button
      class="text-neutral-500 bg-neutral-50 border-neutral-200 disabled:text-neutral-300 disabled:bg-neutral-50 hover:bg-neutral-500 hover:text-white hover:border-transparent active:bg-neutral-400 dark:text-neutral-600 dark:bg-transparent dark:border-neutral-900 dark:disabled:text-neutral-900 dark:disabled:bg-transparent dark:disabled:border-neutral-950 dark:hover:text-stone-200 dark:hover:bg-neutral-700 dark:active:text-stone-100 dark:active:bg-neutral-800"
      onclick={() =>
        handleCopy(
          "text-neutral-500 bg-neutral-50 border-neutral-200 disabled:text-neutral-300 disabled:bg-neutral-50 hover:bg-neutral-500 hover:text-white hover:border-transparent active:bg-neutral-400 dark:text-neutral-600 dark:bg-transparent dark:border-neutral-900 dark:disabled:text-neutral-900 dark:disabled:bg-transparent dark:disabled:border-neutral-950 dark:hover:text-stone-200 dark:hover:bg-neutral-700 dark:active:text-stone-100 dark:active:bg-neutral-800",
        )}>按钮 neutral_plain</Button
    ><Button
      class="text-neutral-500 bg-neutral-50 border-neutral-200 disabled:text-neutral-300 disabled:bg-neutral-50 hover:bg-neutral-500 hover:text-white hover:border-transparent active:bg-neutral-400 dark:text-neutral-600 dark:bg-transparent dark:border-neutral-900 dark:disabled:text-neutral-900 dark:disabled:bg-transparent dark:disabled:border-neutral-950 dark:hover:text-stone-200 dark:hover:bg-neutral-700 dark:active:text-stone-100 dark:active:bg-neutral-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-neutral-500 bg-neutral-50 border-neutral-200 disabled:text-neutral-300 disabled:bg-neutral-50 hover:bg-neutral-500 hover:text-white hover:border-transparent active:bg-neutral-400 dark:text-neutral-600 dark:bg-transparent dark:border-neutral-900 dark:disabled:text-neutral-900 dark:disabled:bg-transparent dark:disabled:border-neutral-950 dark:hover:text-stone-200 dark:hover:bg-neutral-700 dark:active:text-stone-100 dark:active:bg-neutral-800",
        )}>按钮 neutral_plain</Button
    ></Grid
  >
</Card><Card caption={"按钮组件 - stone"}
  ><Grid
    ><Button
      class="text-white bg-stone-500 border-none disabled:text-stone-100 disabled:bg-stone-300 hover:bg-stone-600 active:bg-stone-500 dark:text-stone-300 dark:bg-stone-700 dark:disabled:text-stone-400 dark:disabled:bg-stone-900 dark:hover:text-stone-100 dark:hover:bg-stone-600 dark:active:text-stone-50 dark:active:bg-stone-700"
      onclick={() =>
        handleCopy(
          "text-white bg-stone-500 border-none disabled:text-stone-100 disabled:bg-stone-300 hover:bg-stone-600 active:bg-stone-500 dark:text-stone-300 dark:bg-stone-700 dark:disabled:text-stone-400 dark:disabled:bg-stone-900 dark:hover:text-stone-100 dark:hover:bg-stone-600 dark:active:text-stone-50 dark:active:bg-stone-700",
        )}>按钮 stone_fill</Button
    ><Button
      class="text-white bg-stone-500 border-none disabled:text-stone-100 disabled:bg-stone-300 hover:bg-stone-600 active:bg-stone-500 dark:text-stone-300 dark:bg-stone-700 dark:disabled:text-stone-400 dark:disabled:bg-stone-900 dark:hover:text-stone-100 dark:hover:bg-stone-600 dark:active:text-stone-50 dark:active:bg-stone-700"
      disabled
      onclick={() =>
        handleCopy(
          "text-white bg-stone-500 border-none disabled:text-stone-100 disabled:bg-stone-300 hover:bg-stone-600 active:bg-stone-500 dark:text-stone-300 dark:bg-stone-700 dark:disabled:text-stone-400 dark:disabled:bg-stone-900 dark:hover:text-stone-100 dark:hover:bg-stone-600 dark:active:text-stone-50 dark:active:bg-stone-700",
        )}>按钮 stone_fill</Button
    ><Button
      class="text-stone-500 bg-transparent border-none disabled:text-stone-300 hover:text-stone-600 active:text-stone-700 dark:text-stone-300 dark:disabled:text-stone-900 dark:hover:text-stone-400 dark:active:text-stone-500"
      onclick={() =>
        handleCopy(
          "text-stone-500 bg-transparent border-none disabled:text-stone-300 hover:text-stone-600 active:text-stone-700 dark:text-stone-300 dark:disabled:text-stone-900 dark:hover:text-stone-400 dark:active:text-stone-500",
        )}>按钮 stone_text</Button
    ><Button
      class="text-stone-500 bg-transparent border-none disabled:text-stone-300 hover:text-stone-600 active:text-stone-700 dark:text-stone-300 dark:disabled:text-stone-900 dark:hover:text-stone-400 dark:active:text-stone-500"
      disabled
      onclick={() =>
        handleCopy(
          "text-stone-500 bg-transparent border-none disabled:text-stone-300 hover:text-stone-600 active:text-stone-700 dark:text-stone-300 dark:disabled:text-stone-900 dark:hover:text-stone-400 dark:active:text-stone-500",
        )}>按钮 stone_text</Button
    ><Button
      class="text-stone-500 bg-stone-50 border-stone-200 disabled:text-stone-300 disabled:bg-stone-50 hover:bg-stone-500 hover:text-white hover:border-transparent active:bg-stone-400 dark:text-stone-600 dark:bg-transparent dark:border-stone-900 dark:disabled:text-stone-900 dark:disabled:bg-transparent dark:disabled:border-stone-950 dark:hover:text-stone-200 dark:hover:bg-stone-700 dark:active:text-stone-100 dark:active:bg-stone-800"
      onclick={() =>
        handleCopy(
          "text-stone-500 bg-stone-50 border-stone-200 disabled:text-stone-300 disabled:bg-stone-50 hover:bg-stone-500 hover:text-white hover:border-transparent active:bg-stone-400 dark:text-stone-600 dark:bg-transparent dark:border-stone-900 dark:disabled:text-stone-900 dark:disabled:bg-transparent dark:disabled:border-stone-950 dark:hover:text-stone-200 dark:hover:bg-stone-700 dark:active:text-stone-100 dark:active:bg-stone-800",
        )}>按钮 stone_plain</Button
    ><Button
      class="text-stone-500 bg-stone-50 border-stone-200 disabled:text-stone-300 disabled:bg-stone-50 hover:bg-stone-500 hover:text-white hover:border-transparent active:bg-stone-400 dark:text-stone-600 dark:bg-transparent dark:border-stone-900 dark:disabled:text-stone-900 dark:disabled:bg-transparent dark:disabled:border-stone-950 dark:hover:text-stone-200 dark:hover:bg-stone-700 dark:active:text-stone-100 dark:active:bg-stone-800"
      disabled
      onclick={() =>
        handleCopy(
          "text-stone-500 bg-stone-50 border-stone-200 disabled:text-stone-300 disabled:bg-stone-50 hover:bg-stone-500 hover:text-white hover:border-transparent active:bg-stone-400 dark:text-stone-600 dark:bg-transparent dark:border-stone-900 dark:disabled:text-stone-900 dark:disabled:bg-transparent dark:disabled:border-stone-950 dark:hover:text-stone-200 dark:hover:bg-stone-700 dark:active:text-stone-100 dark:active:bg-stone-800",
        )}>按钮 stone_plain</Button
    ></Grid
  >
</Card>

<Card>
  <Grid>
    <Button
      class="text-white bg-rose-500 border-none disabled:text-stone-100 disabled:bg-rose-300 hover:bg-rose-600 active:bg-rose-500 dark:text-stone-300 dark:bg-rose-700 dark:disabled:text-stone-400 dark:disabled:bg-rose-900 dark:hover:text-stone-100 dark:hover:bg-rose-600 dark:active:text-stone-50 dark:active:bg-rose-700 rounded-full"
      >圆角按钮</Button
    >
  </Grid>
</Card>
