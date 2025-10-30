<script lang="ts">
  import { setStyle } from "$lib/utils/style";
  import { isDark } from "$lib/utils/theme";
  import Prose from "../Prose.svelte";
  import "./CopyPlugin.svelte";
  import hljs from "highlight.js";
  import darkTheme from "highlight.js/styles/atom-one-dark-reasonable.css?raw";
  import lightTheme from "highlight.js/styles/atom-one-light.css?raw";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
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

  let html = $derived(marked.parse(raw));
</script>

<Prose class={twMerge("pb-20", className)}>
  {@html html}
</Prose>

<style>
  :global code.hljs {
    font-style: normal !important;
    margin: 0;
    padding: 0;
  }
</style>
