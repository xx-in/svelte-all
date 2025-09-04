<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	interface IProps {
		visible?: boolean;
		children?: Snippet;
	}

	let { visible = $bindable(true), children }: IProps = $props();

	function handleClickMask() {
		visible = false;
	}
</script>

{#if visible}
	<div
		class="fixed top-0 left-0 z-50 h-screen w-screen bg-black/50"
		transition:fade={{ duration: 100 }}
		ondblclick={(e) => e.stopPropagation()}
		onclick={handleClickMask}
	>
		{@render children?.()}
	</div>
{/if}
