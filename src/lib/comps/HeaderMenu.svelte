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
		class?: string;
	}

	let { activeRoute = '/', class: className }: IProps = $props();
</script>

<section class={twMerge('px-2 shadow-lg', className)}>
	<div class="flex items-center justify-between gap-2 pt-3 pb-2">
		<a class="flex items-center gap-1" href="/">
			<img src="/xx.svg" alt="" class="size-6" />
			<span class="pt-1 text-sm">怀疑一切，是通往知识的第一步</span>
		</a>
		<!-- 移动端显示 -->
		<button class="size-6 cursor-pointer sm:hidden" onclick={handleShowMenu}>
			<SvgMore class="size-6" />
		</button>

		<RightDrawer bind:visible={menuVisible} class="bg-stone-200">
			<div class="flex flex-col gap-2 pr-3" onclick={handleHideMenu}>
				{#each routes as { text, href }, index}
					{#if index != 0}
						<hr class=" text-stone-300" />
					{/if}
					<a
						{href}
						class={twMerge([
							'p-2 text-left text-sm hover:text-sky-500',
							activeRoute == href && 'text-sky-500'
						])}>{text}</a
					>
				{/each}
			</div>
		</RightDrawer>

		<!-- pc 端显示 -->
		<div class="hidden justify-end gap-6 pr-4 sm:flex">
			{#each routes as { text, href } (href)}
				<a {href} class={twMerge(['hover:text-sky-500', activeRoute == href && 'text-sky-500'])}
					>{text}</a
				>
			{/each}
		</div>
	</div>
</section>
