<script lang="ts">
  import SvgBaidu from "$lib/comps/Svg/SvgBaidu.svelte";
  import SvgBing from "$lib/comps/Svg/SvgBing.svelte";
  import SvgChatgpt from "$lib/comps/Svg/SvgChatgpt.svelte";
  import SvgGoogle from "$lib/comps/Svg/SvgGoogle.svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    value: string;
  }

  let { value = $bindable() }: IProps = $props();

  const engines = [
    {
      text: "google",
      Comp: SvgGoogle,
      handler: (query: string) => `https://www.google.com/search?q=${query}`,
    },
    {
      text: "bing",
      Comp: SvgBing,
      handler: (query: string) => `https://www.bing.com/search?q=${query}`,
    },
    {
      text: "baidu",
      Comp: SvgBaidu,
      handler: (query: string) => `https://www.baidu.com/s?wd=${query}`,
    },
    {
      text: "chatgpt",
      Comp: SvgChatgpt,
      handler: (query: string) => `https://chat.openai.com/?prompt=${query}`,
    },
  ];

  // 读取上一次选择的搜索引擎
  let lastEngineText: string =
    typeof localStorage !== "undefined" ? localStorage.getItem("lastEngine") || "google" : "google";

  let lastEngine = $derived(engines.find((e) => e.text === lastEngineText) || engines[0]);

  function handleJump(engine = lastEngine) {
    // 记住当前选择
    lastEngine = engine;
    localStorage.setItem("lastEngine", engine.text);
    const query = value.trim();
    value = "";
    if (!query) return;

    // 支持直接访问网址
    if (/^https?:\/\//.test(query)) {
      globalThis.open(query);
      return;
    }

    const target = engine.handler(query);
    globalThis.open(target, "_blank");
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleJump();
    }
  }
</script>

<div
  class="flex items-center justify-center my-2 py-1 pl-4 pr-2 mx-20 min-w-1/2"
  ondblclick={(e) => e.stopPropagation()}
>
  <input
    bind:value
    class="text-left outline-none py-1 text-sm flex-1"
    autofocus
    placeholder="输入搜索内容..."
    onkeydown={handleKey}
  />
  {#each engines as engine}
    <button
      class={twMerge(
        "flex justify-center items-center hover:bg-blue-100 dark:hover:bg-slate-600 cursor-pointer p-1 mx-1 rounded-md text-black dark:text-white",
        lastEngine.text === engine.text && "bg-blue-100 dark:bg-slate-600",
      )}
      onclick={() => handleJump(engine)}
      title={engine.text}
    >
      <engine.Comp class="size-5" />
    </button>
  {/each}
</div>
