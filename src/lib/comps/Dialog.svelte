<script lang="ts">
	// import { intersection } from 'lodash';
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	//   import { createEventDispatcher, onMount, onDestroy } from "svelte";

	//   export let open = true;       // 是否显示
	//   export let closeOnOverlay = true; // 点击遮罩是否关闭

	//   const dispatch = createEventDispatcher();

	//   function close() {
	//     dispatch("close");
	//   }

	//   function handleOverlayClick(e) {
	//     if (closeOnOverlay && e.target === e.currentTarget) {
	//       close();
	//     }
	//   }

	//   function handleKeydown(e) {
	//     if (e.key === "Escape" && open) {
	//       close();
	//     }
	//   }

	//   onMount(() => {
	//     window.addEventListener("keydown", handleKeydown);
	//   });
	//   onDestroy(() => {
	//     window.removeEventListener("keydown", handleKeydown);
	//   });

	interface IProps {
		visible?: boolean;
		children?: Snippet;
		title?: string;
	}

	function handleClose() {
		visible = false;
	}

	let { visible = $bindable(true), children, title }: IProps = $props();
</script>

{#if visible}
	<div
		class="fixed top-0 left-0 z-50 flex h-screen w-screen justify-center bg-black/50"
		transition:fade
	>
		{@render children?.()}
	</div>
{/if}
