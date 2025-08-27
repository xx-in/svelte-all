<script lang="ts">
	import HeaderMenu from '$lib/comps/HeaderMenu.svelte';
	import SvgUpload from '$lib/comps/Svg/SvgUpload.svelte';
	import Dialog from '$lib/comps/Dialog.svelte';
	import type { ILinkAppendItem, ILinkItem } from './type';
	import { POST } from '$lib/utils/client';
	import { onMount } from 'svelte';

	let visible = $state(false);

	let linkList = $state<Array<ILinkItem>>([]);

	function handleShowDiaglog() {
		visible = true;
	}

	function handleHideDiaglog() {
		visible = false;
	}

	let formItem = $state<ILinkItem>({
		href: '',
		category: '编程',
		icon: '',
		title: ''
	});

	let formColumns = $state<ILinkAppendItem>({
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
			target: formItem.href
		});
		const body = await res.json();
		formItem.icon = body.icon;
		formItem.title = body.title;
	}

	async function handleAppend() {
		const res = await POST('/api/kv', {
			operate: 'set',
			params: [['linkItem', formItem.category, formItem.href], formItem]
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
		formItem = { href: '', category: '编程', icon: '', title: '' };
	}

	onMount(init);

	async function init() {
		await handleGetList();
	}

	function toProxyPath(item: ILinkItem) {
		const { hostname } = new URL(item.href);
		// 防止死循环
		if (hostname == location.hostname) {
			return item.icon;
		}
		return `/api/tools/proxy?url=${item.icon}`;
	}
</script>

<svelte:head>
	<title>网址导航</title>
</svelte:head>
<HeaderMenu activeRoute="/navigation"></HeaderMenu>

<div class="flex flex-wrap gap-6 p-4">
	{#each linkList as linkItem}
		<a
			class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-stone-200 p-2 shadow"
			href={linkItem.href}
			target="_blank"
		>
			<img src={toProxyPath(linkItem)} alt="" class="size-10" />
			<div class="w-40 truncate px-4 text-center">{linkItem.title}</div>
			<!-- <div>{linkItem.key}</div> -->
		</a>
	{/each}

	<div
		class="flex w-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-8 border-double border-stone-200 p-2 shadow"
		onclick={handleShowDiaglog}
	>
		<SvgUpload class="title-stone-400 size-10" />
	</div>
</div>

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
			{#each Object.keys(formItem) as prop}
				<label class="flex">
					<span>{formColumns[prop].label}</span>
					<input
						type="title"
						class="flex-1 border outline-none"
						bind:value={formItem[prop]}
						placeholder={formColumns[prop].placeholder}
						onblur={formColumns[prop].onblur as any}
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
