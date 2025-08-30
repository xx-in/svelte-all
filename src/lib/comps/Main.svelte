<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let { children, class: className } = $props();
</script>

<section class={twMerge('flex h-screen w-screen flex-col overflow-hidden', className)}>
	{@render children()}
</section>
