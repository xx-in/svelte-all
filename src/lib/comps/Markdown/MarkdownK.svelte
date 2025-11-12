<script lang="ts">
  import { getIsDark } from "$lib/store/theme.svelte";
  import { removeStyle, setStyle } from "$lib/utils/style";
  import Prose from "./Prose.svelte";
  import hljs from "highlight.js";
  import lightTheme from "highlight.js/styles/atom-one-light.css?raw";
  import darkTheme from "highlight.js/styles/github-dark.min.css?raw";
  import katex from "katex";
  import "katex/dist/katex.min.css";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import { twMerge } from "tailwind-merge";

  // 样式注入
  let styleId = $state<string>("");
  $effect(() => {
    const styleContent = getIsDark() ? darkTheme : lightTheme;
    if (styleId) removeStyle(styleId);
    styleId = setStyle(styleContent, styleId);
  });

  // 组件 props
  interface IProps {
    raw: string;
    class?: string;
  }
  let { raw, class: className }: IProps = $props();

  // ✅ 初始化 Marked 高亮插件
  const marked = new Marked();
  marked.use(
    // @ts-ignore
    markedHighlight({
      highlight: (code, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
    }),
  );

  // HTML 实体解码
  function decodeHtmlEntities(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  // ✅ 优化 KaTeX 渲染
  function renderMarkdownWithLatex(md: string) {
    // 处理块公式 $...$
    md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_: any, expr: any) => {
      try {
        const code = decodeHtmlEntities(expr.trim());
        // 支持所有 KaTeX 功能，包括矩阵、分数、上下标等
        return katex.renderToString(code, {
          displayMode: true,
          throwOnError: false,
          output: "html",
          strict: "warn",
        });
      } catch (e) {
        console.error("KaTeX 块公式渲染失败:", e);
        return `<pre>${expr}</pre>`;
      }
    });

    // 处理行内公式 $...$
    md = md.replace(/(?<!\$)\$(.+?)\$(?!\$)/g, (_: any, expr: any) => {
      try {
        const code = decodeHtmlEntities(expr.trim());
        return katex.renderToString(code, {
          displayMode: false,
          throwOnError: false,
          output: "html",
          strict: "warn",
        });
      } catch (e) {
        console.error("KaTeX 行内公式渲染失败:", e);
        return `<code>${expr}</code>`;
      }
    });

    // 解析 Markdown 内容
    return marked.parse(md) as string;
  }

  // 响应式 HTML
  let html = $derived(renderMarkdownWithLatex(raw));
</script>

<Prose class={twMerge("pb-20 md:pr-10", className)}>
  {@html html}
</Prose>

<style>
  :global(code.hljs) {
    font-style: normal !important;
    margin: 0;
    padding: 0;
  }

  :global(.katex-display) {
    margin: 1em 0;
    overflow: hidden;
  }

  :global(.katex) {
    font-size: 1.02em;
    overflow-x: auto;
    overflow-y: hidden;
    color: #fb2c36 !important;
    margin: 0 0.25em;
  }

  :global(.katex .katex-mathml) {
    display: none; /* 隐藏 MathML 输出，保留 HTML 输出 */
  }

  @media (max-width: 640px) {
    :global(.katex) {
      padding-bottom: 10px;
    }
  }
</style>
