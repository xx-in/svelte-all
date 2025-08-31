<script lang="ts">
	import type { Snippet } from 'svelte';
	interface IProps {
		class?: string;
		children: Snippet;
	}
	let { children, class: className }: IProps = $props();
	import { twMerge } from 'tailwind-merge';

	let classList = twMerge([
		// 整体
		'prose dark:prose-invert mx-auto max-w-full md:max-w-1/2 pb-[20vh]',
		// 标题
		'prose-h1:mt-8 prose-h2:my-4 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:xl prose-h5:xl',
		// 段落
		'prose-p:leading-7',
		// 代码片段 pre
		'prose-pre:mb-2 prose-pre:p-0 prose-pre:relative',
		// 代码片段 code
		'prose-code:px-2 prose-code:py-1 prose-code:mx-1 prose-code:rounded-md prose-code:bg-gray-100 dark:prose-code:bg-gray-700 dark:prose-code:text-amber-400',
		// code 两边的内容
		'prose-code:before:content-none prose-code:after:content-none',
		// 链接
		'prose-a:underline-offset-3 prose-a:text-xl',
		className
	]);
</script>

<section class={classList}>
	{@render children()}
</section>

<style>
	:global pre code.hljs {
		padding: 1em 1px 0 1em !important;
	}
</style>
