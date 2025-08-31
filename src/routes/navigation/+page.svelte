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

	let visible = $state(false);

	let linkList = $state<Array<ILinkItem>>([]);

	function handleShowDiaglog() {
		visible = true;
	}

	function handleHideDiaglog() {
		visible = false;
	}

	let linkItem = $state<ILinkItem>({
		href: '',
		category: '编程',
		icon: '',
		title: ''
	});

	let columns = $state<ILinkAppendItem>({
		href: {
			label: '链接：',
			placeholder: '请输入链接地址',
			onblur: handleChangeHref
		},
		category: {
			label: '分类：',
			placeholder: '请输入分类'
		},

		title: {
			label: '文本：',
			placeholder: '请输入描述文本'
		},
		icon: {
			label: '图标：',
			placeholder: '请输入图标地址'
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
		handleReset();
	}

	async function handleGetList() {
		const res = await POST('/api/kv', {
			operate: 'list',
			params: [{ prefix: ['linkItem'] }]
		});
		const { data } = await res.json();
		linkList = data;
	}

	function handleReset() {
		linkItem = { href: '', category: '编程', icon: '', title: '' };
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
				handleEdit();
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

	// $inspect(windowWidth);

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
	async function handleEdit() {
		visible = true;
		console.log(selectLinkItem);
		if (selectLinkItem) {
			linkItem = selectLinkItem;
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
</script>

<svelte:head>
	<title>网址导航</title>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />
<svelte:body ondblclick={toggleFullScreen} />
<Main class="relative bg-transparent text-white">
	<!-- <img
		src="/api/tools/proxy?url=https://haowallpaper.com/link/common/file/previewFileImg/17226281061305728"
		class="absolute z-10 size-full"
	/> -->
	<video
		src="https://video.wetab.link/wallpaper-dynamic/v1gtq6c1g3z5yg0bit0zu13gy7wh.mp4"
		class="absolute z-10 h-screen w-screen object-cover"
		autoplay
		muted
		loop
	></video>
	<!-- <div class="absolute z-10 h-full w-full backdrop-blur-2xl"></div> -->
	<HeaderMenu activeRoute="/navigation" class="z-40 bg-white/5"></HeaderMenu>

	<div
		class=" relative z-30 grid grid-cols-2 gap-6 overflow-auto p-4 text-black sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
	>
		{#each linkList as linkItem}
			<a
				class="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-2"
				href={linkItem.href}
				target="_blank"
				data-type="linkItem"
			>
				<div
					class="absolute z-10 h-full w-full rounded-2xl"
					oncontextmenu={handleOpenContextMenu(linkItem)}
				></div>
				<img
					src={linkItem.icon}
					alt=""
					class="z-20
 mt-2 size-10 translate-y-0.5 rounded-xl bg-white p-1 transition-transform group-hover:-translate-y-1 sm:size-12"
				/>
				<div
					class="relative z-20 w-full truncate px-4 text-center text-white"
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
			class="group relative flex h-26 cursor-pointer flex-col items-center justify-center rounded-2xl p-2"
			onclick={handleShowDiaglog}
		>
			<SvgUpload class="z-20 size-10 text-white group-hover:text-blue-500" />
		</div>
	</div>
</Main>

<Dialog bind:visible title="新增导航">
	<div class="mx-auto mt-[15vh] w-[50vw] rounded-2xl bg-white px-6">
		<div class="flex justify-between py-4 font-bold">
			<div class="title-xl">新增链接</div>
			<button
				class=" title-gray-700 hover:title-gray-900 cursor-pointer"
				onclick={handleHideDiaglog}
			>
				✕
			</button>
		</div>
		<div class="flex flex-col gap-4">
			{#each typedKeys(columns) as prop}
				<label class="flex">
					<span>{columns[prop].label}</span>
					<input
						type="title"
						class="flex-1 border outline-none"
						bind:value={linkItem[prop]}
						placeholder={columns[prop].placeholder}
						onblur={columns[prop].onblur as any}
					/>
				</label>
			{/each}
		</div>

		<div class="flex items-center justify-end gap-4 py-6">
			<button
				class="rounded-lg bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
				onclick={handleAppend}
			>
				确定
			</button>
		</div>
	</div>
</Dialog>

<ContextMenu bind:visible={contextMenuVisible} position={contextMenuPosition}>
	<div
		class="inset-shadow-lg flex flex-col gap-2 rounded-sm border border-gray-300 bg-white p-1 text-sm select-none"
	>
		{#each contextMenuList as item}
			<div
				class="flex w-40 cursor-pointer items-center gap-2 rounded-sm px-2 py-1 hover:bg-blue-500 hover:text-white"
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
