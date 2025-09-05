<script lang="ts">
	import HeaderMenu from '$lib/comps/HeaderMenu.svelte';
	import SvgUpload from '$lib/comps/Svg/SvgUpload.svelte';
	import Dialog from '$lib/comps/Dialog.svelte';
	import type { ILinkAppendItem, ILinkItem } from './type';
	import { POST } from '$lib/utils/client';
	import { onMount } from 'svelte';
	import { typedKeys } from '$lib/utils';
	import ContextMenu, { type IContextMenuPosition } from '$lib/comps/ContextMenu.svelte';
	import SvgDelete from '$lib/comps/Svg/SvgDelete.svelte';
	import SvgEdit from '$lib/comps/Svg/SvgEdit.svelte';
	import Main from '$lib/comps/Main.svelte';
	import { twMerge } from 'tailwind-merge';
	import cloneDeep from 'lodash/cloneDeep';
	import DialogContent from '$lib/comps/DialogContent.svelte';
	import DialogTitle from '$lib/comps/DialogTitle.svelte';
	import AnimatePing from '$lib/comps/AnimatePing.svelte';
	import ColorPicker from '$lib/comps/ColorPicker.svelte';

	let visible = $state(false);

	let linkList = $state<Array<ILinkItem>>([]);

	function handleOpenAppendDialog() {
		isEdit = false;
		linkItem = {
			href: '',
			category: activeCategory ? activeCategory : '编程',
			icon: '',
			title: '',
			bgColor: 'bg-white'
		};
		visible = true;
	}

	function handleHideDiaglog() {
		visible = false;
	}

	let linkItem = $state<ILinkItem>({
		href: '',
		category: '编程',
		icon: '',
		title: '',
		bgColor: 'bg-white'
	});

	let columns = $state<ILinkAppendItem>({
		href: {
			label: '链接',
			placeholder: '请输入链接地址',
			type: 'text',
			onblur: handleChangeHref
		},
		category: {
			label: '分类',
			type: 'text',
			placeholder: '请输入分类'
		},

		title: {
			label: '文本',
			type: 'text',
			placeholder: '请输入描述文本'
		},
		icon: {
			label: '图标',
			placeholder: '请输入图标地址',
			type: 'text'
		},
		bgColor: {
			type: 'color',
			label: '背景'
		}
	});

	async function handleChangeHref() {
		const res = await POST('/api/tools/favicon', {
			target: linkItem.href
		});
		const body = await res.json();
		linkItem.icon = body.icon;
		linkItem.title = body.title;
	}

	async function handleAppend() {
		const res = await POST('/api/kv', {
			operate: 'set',
			params: [['linkItem', linkItem.category, linkItem.href], linkItem]
		});
		handleGetList();
		handleHideDiaglog();
		activeCategory = linkItem.category;
	}

	async function handleGetList() {
		const res = await POST('/api/kv', {
			operate: 'list',
			params: [{ prefix: ['linkItem'] }]
		});
		const { data } = await res.json();
		linkList = data;
	}

	onMount(init);

	async function init() {
		await handleGetList();
	}

	let contextMenuVisible = $state(false);
	let contextMenuPosition = $state<IContextMenuPosition>({
		left: '0px',
		top: '0px'
	});

	let contextMenuList = $state([
		{
			text: '删除',
			Icon: SvgDelete,
			onclick(e: MouseEvent) {
				e.stopPropagation();
				contextMenuVisible = false;
				handleDelete();
			}
		},
		{
			text: '编辑',
			Icon: SvgEdit,
			onclick(e: MouseEvent) {
				e.stopPropagation();
				contextMenuVisible = false;
				handleEditDialog();
			}
		}
	]);

	let selectLinkItem = $state<ILinkItem | null>(null);

	function handleOpenContextMenu(linkItem: ILinkItem) {
		return (e: MouseEvent) => {
			e.preventDefault();
			const { clientX, clientY } = e;
			if (clientX > (windowWidth / 5) * 4) {
				contextMenuPosition = {
					right: windowWidth - clientX + 'px',
					top: clientY + 'px'
				};
			} else {
				contextMenuPosition = {
					left: clientX + 'px',
					top: clientY + 'px'
				};
			}
			contextMenuVisible = true;
			selectLinkItem = linkItem;
		};
	}

	let windowWidth = $state(0);

	async function handleDelete() {
		const res = await POST('/api/kv', {
			operate: 'delete',
			params: [selectLinkItem?.key]
		});
		contextMenuVisible = false;
		handleGetList();
	}

	/**
	 * 打开编辑弹窗
	 */
	async function handleEditDialog() {
		visible = true;
		isEdit = true;
		if (selectLinkItem) {
			linkItem = cloneDeep(selectLinkItem);
		}
	}

	// 切换全屏
	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			// 进入全屏
			document.documentElement.requestFullscreen().catch((err) => {
				console.log(`无法切换到全屏: ${err.message}`);
			});
		} else {
			// 退出全屏
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	}

	// 生成目录
	let categoryObject = $derived.by(() => {
		const categoryList = new Set<string>();
		linkList.forEach((item) => {
			if (item.key) {
				categoryList.add(item.key[1]);
			}
		});
		let result: Record<string, string> = {
			'': '全部'
		};
		Array.from(categoryList)
			.sort()
			.forEach((category) => {
				result[category] = category;
			});
		return result;
	});

	let activeCategory = $state('搜索');

	let activeCategoryLinkList = $derived(
		linkList.filter((item) => {
			if (activeCategory == '') {
				return true;
			}
			if (item.key) {
				return item.key[1] == activeCategory;
			}
			return false;
		})
	);

	let isEdit = $state(false);

	/**
	 * 编辑时
	 */
	async function handleEdit() {
		const { key, ...rest } = linkItem;
		// 因为可能修改key，所以要先删除
		await POST('/api/kv', {
			operate: 'delete',
			params: [key]
		});
		// 更新
		const res = await POST('/api/kv', {
			operate: 'set',
			params: [['linkItem', linkItem.category, linkItem.href], rest]
		});
		handleGetList();
		handleHideDiaglog();
		activeCategory = linkItem.category;
	}
</script>

<svelte:head>
	<title>网址导航</title>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />
<svelte:body ondblclick={toggleFullScreen} />
<Main class="relative bg-transparent text-white">
	<video
		src="https://video.wetab.link/wallpaper-dynamic/v1gtq6c1g3z5yg0bit0zu13gy7wh.mp4"
		class="absolute z-10 h-screen w-screen object-cover"
		autoplay
		muted
		loop
	></video>
	<HeaderMenu activeRoute="/navigation" class="z-40 bg-white/5"></HeaderMenu>

	<div class="h-6"></div>
	<section class="flex-1 snap-y snap-mandatory overflow-auto scroll-smooth">
		<div
			class=" relative z-30 grid grid-cols-4 gap-6 pb-10 text-black sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8"
		>
			<!--  导航列表 -->
			{#each activeCategoryLinkList as linkItem (linkItem.key)}
				<a
					class="group relative flex cursor-pointer snap-start flex-col items-center justify-center gap-2
					py-2 select-none"
					href={linkItem.href}
					target="_self"
					data-type="linkItem"
					oncontextmenu={handleOpenContextMenu(linkItem)}
				>
					<AnimatePing class="z-20 mt-2 size-10  sm:size-12 ">
						{#if linkItem.icon.includes('http')}
							<img
								src={linkItem.icon}
								alt={linkItem.title}
								class={twMerge('size-full rounded-md', linkItem.bgColor)}
							/>
						{:else}
							<div
								class={twMerge(
									'flex size-full items-center justify-center rounded-md text-white',
									linkItem.bgColor
								)}
							>
								{linkItem.title[0]}
							</div>
						{/if}
					</AnimatePing>

					<div
						class="relative left-0 z-20 w-full truncate text-center text-white"
						title={linkItem.title}
					>
						<span class="z-20 text-sm">
							{linkItem.title}
						</span>
					</div>
				</a>
			{/each}

			<!-- 添加按钮 -->
			<div
				class="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-2"
				onclick={handleOpenAppendDialog}
				title="新增导航"
			>
				<AnimatePing class="z-20 mt-2 size-10 sm:size-12">
					<div class="size-full rounded-xl bg-green-500">
						<SvgUpload class="size-full"></SvgUpload>
					</div>
				</AnimatePing>

				<div class="relative z-20 w-full truncate px-4 text-center text-white">
					<span class="z-20 text-sm">新增导航</span>
				</div>
			</div>
		</div>
	</section>
	<div class="h-6"></div>
	<div class="z-20 flex items-center justify-center pb-6 text-center">
		<div class="flex gap-4 overscroll-auto select-none">
			{#each typedKeys(categoryObject) as category}
				<div
					class={twMerge(
						'flex cursor-pointer items-center justify-center rounded-sm bg-black px-2 py-0.5 hover:text-sky-500',
						activeCategory == category && 'text-sky-500'
					)}
					onmouseover={() => (activeCategory = category)}
				>
					{categoryObject[category]}
				</div>
			{/each}
		</div>
	</div>
</Main>

<Dialog bind:visible hideOnClickMask={false}>
	<DialogContent>
		<DialogTitle title={isEdit ? '编辑导航' : '新增导航'} bind:visible></DialogTitle>
		<div class="mt-2 flex flex-col gap-4">
			{#each typedKeys(columns) as prop}
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
					<label>
						<span class="w-20 text-right">{columns[prop].label}：</span>
					</label>

					{#if columns[prop].type == 'color'}
						<div class="flex flex-1 items-center gap-2">
							<ColorPicker bind:value={linkItem[prop]} />
							<input bind:value={linkItem[prop]} class="outline-none" />
						</div>
					{:else}
						<input
							class="flex-1 outline-none"
							bind:value={linkItem[prop]}
							placeholder={columns[prop].placeholder}
							onblur={columns[prop].onblur as any}
							type={columns[prop].type}
						/>
					{/if}
				</div>
			{/each}
		</div>

		<!-- 操作栏 -->
		<div class="mt-6 flex items-center justify-end gap-4">
			<button
				class="cursor-pointer rounded-lg bg-gray-500 px-4 py-2 text-white shadow hover:bg-gray-600"
				onclick={() => (visible = false)}
			>
				取消
			</button>
			{#if isEdit}
				<button
					class="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
					onclick={handleEdit}
				>
					确定
				</button>
			{:else}
				<button
					class="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
					onclick={handleAppend}
				>
					确定
				</button>
			{/if}
		</div>
	</DialogContent>
</Dialog>

<ContextMenu bind:visible={contextMenuVisible} position={contextMenuPosition}>
	<div class="inset-shadow-lg flex flex-col gap-2 p-1 text-sm select-none">
		{#each contextMenuList as item}
			<div
				class="flex w-40 cursor-pointer items-center gap-2 rounded-sm px-2 py-1 hover:bg-sky-500 hover:text-white"
				onclick={item.onclick}
			>
				<item.Icon class="size-6" />
				<span>
					{item.text}
				</span>
			</div>
		{/each}
	</div>
</ContextMenu>
