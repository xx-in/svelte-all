<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface IProps {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: IProps = $props();
</script>

<div class={twMerge('relative size-full', className)}>
	<!--  -->
	<div
		class="absolute top-[50%] left-[50%] z-10 hidden size-[90%] origin-center -translate-[50%] rounded-full bg-[repeating-radial-gradient(circle,#333,#333_1px,#fff_1px,#fff_2px)] opacity-95 group-hover:block group-hover:animate-ping-deep"
	></div>
	<div class="relative z-20 size-full">
		{@render children?.()}
	</div>
</div>
