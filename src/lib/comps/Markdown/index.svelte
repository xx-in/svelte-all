<script lang="ts">
	import { Marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import lightTheme from 'highlight.js/styles/atom-one-light.css?raw';
	import darkTheme from 'highlight.js/styles/atom-one-dark-reasonable.css?raw';
	import './CopyPlugin.svelte';
	import { nanoid } from 'nanoid';
	import { isDark } from '$lib/utils/theme';
	import { setStyle } from '$lib/utils/style';
	import Prose from '../Prose.svelte';

	const styleId = nanoid();
	isDark.subscribe((isDark) => {
		const styleContent = isDark ? darkTheme : lightTheme;
		setStyle(styleContent, styleId);
	});

	let { raw } = $props();
	const marked = new Marked(
		// @ts-ignore
		markedHighlight({
			emptyLangClass: 'hljs',
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				let wrapper = `<div class="max-h-[50vh] overflow-auto pt-6">`;
				wrapper += `<copy-plugin lang="${lang}" code="${encodeURIComponent(code)}"></copy-plugin>`;
				wrapper += hljs.highlight(code, { language }).value;
				wrapper += `</div>`;
				return wrapper;
			}
		})
	);

	const html = marked.parse(raw);
</script>

<Prose>
	{@html html}
</Prose>

<style>
	:global code.hljs {
		font-style: normal !important;
		margin: 0;
		padding: 0;
	}
</style>
