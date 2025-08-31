<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface IProps {
		children: Snippet;
		class?: string;
	}

	let { children, class: className }: IProps = $props();
</script>

<section class={twMerge('flex h-screen w-screen flex-col overflow-hidden', className)}>
	{@render children()}
</section>
