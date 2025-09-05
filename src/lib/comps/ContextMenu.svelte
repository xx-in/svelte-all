<script lang="ts">
	import { retry } from 'rxjs';
	import type { Snippet } from 'svelte';

	export interface IContextMenuPosition {
		top?: string;
		right?: string;
		bottom?: string;
		left?: string;
	}

	interface IProps {
		children: Snippet;
		visible: boolean;
		position: IContextMenuPosition;
	}

	let { children, visible = $bindable(), position }: IProps = $props();

	function handleHide() {
		visible = false;
	}

	let positionStyle = $derived(
		Object.entries(position)
			.filter(([key, value]) => {
				return key !== undefined;
			})
			.map(([key, value]) => {
				return `${key}:${value}`;
			})
			.join(';')
	);
</script>

<svelte:window onclick={handleHide} onscroll={handleHide} />

{#if visible}
	<div
		class="content fixed z-50 rounded-md border border-gray-300 bg-white dark:border-gray-900 dark:bg-black"
		style={positionStyle}
	>
		{@render children?.()}
	</div>
{/if}
