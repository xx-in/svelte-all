<!-- Drawer.svelte -->
<script>
	import { fly } from 'svelte/transition';
	let { children, visible = $bindable() } = $props();
	function open() {
		visible = true;
	}

	function hide() {
		visible = false;
	}
</script>

{#if visible}
	<!-- 遮罩层 -->
	<div class="bg-opacity-40 fixed inset-0 z-40 bg-black/50 dark:bg-black/90" onclick={hide}></div>

	<!-- 抽屉主体 -->
	<div
		class={`fixed top-0 right-0 z-50 flex h-screen w-8/9 flex-col 
		bg-zinc-100 p-6 shadow-lg dark:bg-zinc-900`}
		transition:fly={{ x: 320, duration: 300 }}
	>
		<div class="flex justify-between pb-3">
			<div>常用功能</div>
			<button class="cursor-pointer" onclick={hide}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					class="size-5"
					><path fill="currentColor" d="M22 2V1H2v1H1v20h1v1h20v-1h1V2zm-1 19H3V3h18z" /><path
						fill="currentColor"
						d="M15 13h1v1h1v1h1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-2v1h-1v1H9v1H8v-1H7v-1H6v-1h1v-1h1v-1h1v-2H8v-1H7V9H6V8h1V7h1V6h1v1h1v1h1v1h2V8h1V7h1V6h1v1h1v1h1v1h-1v1h-1v1h-1z"
					/></svg
				>
			</button>
		</div>

		<div class="flex-1 overflow-auto">
			{@render children()}
		</div>
	</div>
{/if}
