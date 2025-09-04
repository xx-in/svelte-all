<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface IProps {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: IProps = $props();
</script>

<div
	class={twMerge(
		'mx-auto mt-[10vh] max-h-[70vh] w-[50%] rounded-2xl bg-white px-4 pb-4 text-black',
		className
	)}
>
	{@render children?.()}
</div>
