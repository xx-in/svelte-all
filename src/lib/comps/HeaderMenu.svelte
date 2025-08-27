<script lang="ts">
	import RightDrawer from '$lib/comps/RightDrawer.svelte';
	import { twMerge } from 'tailwind-merge';

	let routes = [
		{
			href: '/navigation',
			text: '网址导航'
		},

		{
			href: '/blogs',
			text: '博客列表'
		},
		{
			href: '/test',
			text: '测试页'
		}
	];

	let menuVisible = $state(false);

	function handleShowMenu() {
		menuVisible = true;
	}

	function handleHideMenu() {
		menuVisible = false;
	}

	interface IProps {
		activeRoute?: string;
	}

	let { activeRoute = '/' }: IProps = $props();
</script>

<section class="border-b border-b-zinc-200 px-2 dark:border-b-zinc-700">
	<div class="flex items-center justify-between gap-2 pt-3 pb-2">
		<a class="flex flex-1 items-center gap-2" href="/">
			<svg viewBox="0 0 36 21" fill="none" class="h-4 text-black dark:text-white"
				><path
					class="fill-sky-400"
					d="M17.183 0C12.6 0 9.737 2.291 8.59 6.873c1.719-2.29 3.723-3.15 6.014-2.577 1.307.326 2.242 1.274 3.275 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.291 8.591-6.872-1.718 2.29-3.723 3.15-6.013 2.576-1.308-.326-2.243-1.274-3.276-2.324C23.39 1.98 21.44 0 17.183 0ZM8.59 10.309C4.01 10.309 1.145 12.6 0 17.182c1.718-2.291 3.723-3.15 6.013-2.577 1.308.326 2.243 1.274 3.276 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.29 8.59-6.872-1.718 2.29-3.722 3.15-6.013 2.577-1.307-.327-2.242-1.276-3.276-2.325-1.684-1.71-3.634-3.689-7.893-3.689Z"
				></path></svg
			>
			<span class="text-base font-bold">xx</span>
		</a>

		<button class="size-6 cursor-pointer sm:hidden" onclick={handleShowMenu}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				class="size-6"
				><g fill="none"
					><path
						fill="currentColor"
						d="M9 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
					/><path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="1.5"
						d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
					/></g
				></svg
			>
		</button>

		<RightDrawer bind:visible={menuVisible}>
			<div class="flex flex-col gap-2" onclick={handleHideMenu}>
				{#each routes as { text, href }}
					<a
						{href}
						class={twMerge([
							'p-2 text-left text-sm shadow hover:text-blue-500',
							activeRoute == href && 'text-blue-500'
						])}>{text}</a
					>
				{/each}
			</div>
		</RightDrawer>
		<div class="hidden flex-1 justify-end gap-6 pr-24 sm:flex">
			{#each routes as { text, href }}
				<a
					{href}
					class={twMerge([
						'underline-offset-6 hover:text-blue-500',
						activeRoute == href && 'text-blue-500  underline'
					])}>{text}</a
				>
			{/each}
		</div>
	</div>
</section>
