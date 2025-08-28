<script lang="ts">
	import RightDrawer from '$lib/comps/RightDrawer.svelte';
	import { twMerge } from 'tailwind-merge';
	import SvgMore from './Svg/SvgMore.svelte';

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
			<img src="/xx.svg" alt="" class="size-6" />
			<span class="text-base font-bold">xx</span>
		</a>

		<button class="size-6 cursor-pointer sm:hidden" onclick={handleShowMenu}>
			<SvgMore class="size-6" />
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
						'underline-offset-14 hover:text-blue-500',
						activeRoute == href && 'text-blue-500  underline decoration-1'
					])}>{text}</a
				>
			{/each}
		</div>
	</div>
</section>
