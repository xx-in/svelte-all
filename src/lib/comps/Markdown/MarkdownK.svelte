<script lang="ts">
  import { getIsDark } from "$lib/store/theme.svelte";
  import { removeStyle, setStyle } from "$lib/utils/style";
  import Prose from "../Prose.svelte";
  import hljs from "highlight.js";
  import lightTheme from "highlight.js/styles/atom-one-light.css?raw";
  import darkTheme from "highlight.js/styles/github-dark.min.css?raw";
  import katex from "katex";
  import "katex/dist/katex.min.css";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import { twMerge } from "tailwind-merge";

  let styleId = $state<string>("");

  $effect(() => {
    const styleContent = getIsDark() ? darkTheme : lightTheme;
    if (styleId) removeStyle(styleId);
    styleId = setStyle(styleContent, styleId);
  });

  interface IProps {
    raw: string;
    class?: string;
  }

  let { raw, class: className }: IProps = $props();

  // ✅ 高亮插件
  const marked = new Marked(
    // @ts-ignore
    markedHighlight({
      emptyLangClass: "hljs",
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return `<div class="max-h-[50vh] overflow-auto pt-10">
          <copy-plugin lang="${lang}" code="${encodeURIComponent(code)}"></copy-plugin>
          ${hljs.highlight(code, { language }).value}
        </div>`;
      },
    }),
  );

  function decodeHtmlEntities(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  function renderMarkdownWithLatex(md: string) {
    // 先处理块公式，避免 Markdown 转义破坏 \ 符号
    md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_: any, expr: any) => {
      try {
        const code = decodeHtmlEntities(expr.trim());
        return katex.renderToString(code, { displayMode: true, throwOnError: false });
      } catch (e) {
        console.error("KaTeX 块公式渲染失败:", e);
        return `<pre>${expr}</pre>`;
      }
    });

    // 再处理行内公式
    md = md.replace(/(?<!\$)\$(.+?)\$(?!\$)/g, (_: any, expr: any) => {
      try {
        const code = decodeHtmlEntities(expr.trim());
        return katex.renderToString(code, { displayMode: false, throwOnError: false });
      } catch (e) {
        console.error("KaTeX 行内公式渲染失败:", e);
        return `<code>${expr}</code>`;
      }
    });

    return marked.parse(md) as string;
  }

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
    font-size: 1em;
    overflow-x: auto;
    overflow-y: hidden;
    color: oklch(64.5% 0.246 16.439);
    /* color: oklch(62.3% 0.214 259.815); */
  }

  @media (max-width: 640px) {
    :global(.katex) {
      padding-bottom: 10px;
    }
  }
</style>
