<script lang="ts">
  import { getIsDark } from "$lib/store/theme.svelte";
  import { removeStyle, setStyle } from "$lib/utils/style";
  import Prose from "./Prose.svelte";
  import darkTheme from "./dark.css?raw";
  import lightTheme from "./light.css?raw";
  import { loadLanguages } from "./load";
  // 插件需要自己引入
  import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js";
  import "prismjs/plugins/line-numbers/prism-line-numbers.css";
  import "prismjs/plugins/toolbar/prism-toolbar.js";
  import { rehype } from "rehype";
  import rehypeKatex from "rehype-katex";
  import rehypePrism from "rehype-prism";
  import { remark } from "remark";
  import remarkGfm from "remark-gfm";
  import remarkHtml from "remark-html";
  import remarkMath from "remark-math";
  import { onMount } from "svelte";

  let styleId = $state<string>("");

  $effect(() => {
    const styleContent = getIsDark() ? darkTheme : lightTheme;
    if (styleId) {
      removeStyle(styleId);
    }
    styleId = setStyle(styleContent, styleId);
  });

  interface IProps {
    raw: string;
    class?: string;
  }

  let { raw, class: className }: IProps = $props();
  let htmlContent = $state(""); // 用来保存最终的 HTML 内容

  // 解析 Markdown 内容，并处理 LaTeX 和代码高亮
  async function parseToHtml(markdownContent: string) {
    const file = await remark()
      .use(remarkGfm) // 使用 remark-gfm 插件来支持表格
      .use(remarkMath) // 解析数学公式
      .use(remarkHtml) // 将 Markdown 转换为 HTML
      .process(markdownContent); // 生成 HTML

    // 使用 rehype 处理 LaTeX 和代码高亮
    const html = await rehype()
      .use(rehypeKatex) // 处理 LaTeX
      .use(rehypePrism, { plugins: ["toolbar", "line-numbers", "copy-to-clipboard"] }) // 使用 Prism 进行代码高亮
      .process(String(file));

    htmlContent = String(html); // 将解析后的 HTML 内容赋给 htmlContent
  }

  onMount(() => {
    loadLanguages();
  });

  // 监听 raw 内容变化，重新解析 Markdown 内容
  $effect(() => {
    parseToHtml(raw);
  });
</script>

<!-- 使用 Prose 组件来展示最终的 HTML 内容 -->
<Prose class={className}>
  {@html htmlContent}
</Prose>

<style>
  :global(.katex-display) {
    margin: 1em 0;
    overflow: hidden;
  }

  :global(.katex) {
    font-size: 1.2em;
    overflow-x: auto;
    overflow-y: hidden;
    color: #fb2c36 !important;
    margin: 0 0.25em;
  }

  :global(.katex .katex-mathml) {
    display: none; /* 隐藏 MathML 输出，保留 HTML 输出 */
  }
  :global(.code-toolbar) {
    position: relative;
  }

  :global(.toolbar) {
    cursor: pointer;
    position: absolute;
    right: 1em;
    top: 0.5em;
  }
</style>
