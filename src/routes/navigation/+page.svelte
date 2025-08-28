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
			// 为了保证只能点到自身才触发
			// 通过data属性进行设置是比较方便的
			const target = e.target as HTMLAnchorElement;
			const type = target.dataset.type;
			if (type !== 'linkItem') {
				return;
			}
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
</script>

<svelte:head>
	<title>网址导航</title>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />
<Main>
	<HeaderMenu activeRoute="/navigation"></HeaderMenu>

	<div class=" flex flex-wrap gap-6 overflow-auto p-4">
		{#each linkList as linkItem}
			<a
				class="flex w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-stone-200 p-2 shadow"
				href={linkItem.href}
				target="_blank"
				data-type="linkItem"
				oncontextmenu={handleOpenContextMenu(linkItem)}
			>
				<img src={linkItem.icon} alt="" class="size-10" />
				<div class="w-full truncate px-4 text-center" title={linkItem.title}>{linkItem.title}</div>
			</a>
		{/each}

		<div
			class="flex w-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-8 border-double border-stone-200 p-2 shadow"
			onclick={handleShowDiaglog}
		>
			<SvgUpload class="title-stone-400 size-10" />
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
