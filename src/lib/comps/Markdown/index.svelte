<script lang="ts">
  import { setStyle } from "$lib/utils/style";
  import { isDark } from "$lib/utils/theme";
  import Prose from "../Prose.svelte";
  import "./CopyPlugin.svelte";
  import hljs from "highlight.js";
  import darkTheme from "highlight.js/styles/atom-one-dark-reasonable.css?raw";
  import lightTheme from "highlight.js/styles/atom-one-light.css?raw";
  import katex from "katex";
  import "katex/dist/katex.min.css";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  // ✅ 样式文件
  import { nanoid } from "nanoid";
  import { twMerge } from "tailwind-merge";

  const styleId = nanoid();
  isDark.subscribe((isDark) => {
    const styleContent = isDark ? darkTheme : lightTheme;
    setStyle(styleContent, styleId);
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
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        let wrapper = `<div class="max-h-[50vh] overflow-auto pt-6">`;
        wrapper += `<copy-plugin lang="${lang}" code="${encodeURIComponent(code)}"></copy-plugin>`;
        wrapper += hljs.highlight(code, { language }).value;
        wrapper += `</div>`;
        return wrapper;
      },
    }),
  );

  function decodeHtmlEntities(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  function renderMarkdownWithLatex(md: string) {
    let html = marked.parse(md) as any;

    // ✅ 处理块级公式 $...$
    html = html.replace(/\$\$(.+?)\$\$/gs, (_: any, expr: any) => {
      try {
        const decoded = decodeHtmlEntities(expr); // 修复 &amp; 为 &
        return katex.renderToString(decoded, { displayMode: true, throwOnError: false });
      } catch {
        return `<pre>${expr}$</pre>`;
      }
    });

    // ✅ 处理行内公式 $...$
    html = html.replace(/(?<!\$)\$(.+?)\$(?!\$)/g, (_: any, expr: any) => {
      try {
        const decoded = decodeHtmlEntities(expr);
        return katex.renderToString(decoded, { displayMode: false, throwOnError: false });
      } catch {
        return `<code>${expr}</code>`;
      }
    });

    return html;
  }

  // ✅ 自动派生渲染结果
  let html = $derived(renderMarkdownWithLatex(raw));
</script>

<Prose class={twMerge("pb-20", className)}>
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
    font-size: 1.05em;
    overflow: hidden;
  }
</style>
