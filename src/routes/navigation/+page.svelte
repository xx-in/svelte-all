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
		// const data = [
		// 	{
		// 		href: 'http://localhost:5173/navigation',
		// 		category: '编程',
		// 		icon: 'http://localhost:5173/xx.svg',
		// 		title: '网址导航'
		// 	},
		// 	{
		// 		href: 'https://svelte-all.deno.dev/',
		// 		category: '编程',
		// 		icon: 'https://svelte-all.deno.dev/xx.svg',
		// 		title: '首页'
		// 	},
		// 	{
		// 		href: 'https://juejin.cn/',
		// 		category: '编程',
		// 		icon: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/apple-touch-icon.png',
		// 		title: '稀土掘金'
		// 	},
		// 	{
		// 		href: 'https://dash.deno.com/playground/svelte-kv',
		// 		category: '编程',
		// 		icon: 'https://dash.deno.com/assets/logo.svg?v=173gvenchzef',
		// 		title: 'deno kv '
		// 	},
		// 	{
		// 		href: 'https://github.com/',
		// 		category: '编程',
		// 		icon: 'https://github.githubassets.com/pinned-octocat.svg',
		// 		title:
		// 			'GitHub · Build and ship software on a single, collaborative platform · GitHubAmerican AirlinesDuolingoErnst and YoungFordInfoSysMercado LibreMercedes-BenzShopifyPhilipsSociété GénéraleSpotifyVodafoneAmerican AirlinesDuolingoErnst and YoungFordInfoSysMercado LibreMercedes-BenzShopifyPhilipsSociété GénéraleSpotifyVodafoneInstagramTikTokTwitch'
		// 	},
		// 	{
		// 		href: 'https://dash.deno.com',
		// 		category: '编程',
		// 		icon: 'https://dash.deno.com/assets/logo.svg?v=173gvenchzef',
		// 		title: 'Deno Deploy'
		// 	},
		// 	{
		// 		href: 'https://deno.com/deploy',
		// 		category: '编程',
		// 		icon: 'https://deno.com/favicon.ico?__frsh_c=8cd0085ad698cd374294078523d22a7f4dc59831',
		// 		title: 'Deno Deploylogo'
		// 	},
		// 	{
		// 		href: 'https://www.npmjs.com/',
		// 		category: '编程',
		// 		icon: 'https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png',
		// 		title: 'npm | Home'
		// 	},
		// 	{
		// 		href: 'https://dash.deno.com/account/overview',
		// 		category: '编程',
		// 		icon: 'https://dash.deno.com/favicon.ico',
		// 		title: 'Deno Deploy'
		// 	},
		// 	{
		// 		href: 'https://docs.deno.com/deploy/kv/manual/',
		// 		category: '编程',
		// 		icon: 'https://docs.deno.com/apple-touch-icon.png',
		// 		title: 'Deno KV Quick Start'
		// 	},
		// 	{
		// 		href: 'https://tailwindcss.com/',
		// 		category: '编程',
		// 		icon: 'https://tailwindcss.com/favicons/apple-touch-icon.png?v=4',
		// 		title: 'Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.'
		// 	},
		// 	{
		// 		href: 'https://mirrors.tuna.tsinghua.edu.cn/',
		// 		category: '编程',
		// 		icon: 'https://mirrors.tuna.tsinghua.edu.cn/static/img/favicon.png',
		// 		title:
		// 			'清华大学开源软件镜像站 | Tsinghua Open Source Mirrorbarscubecircle-questiongithubbullhornangles-rightlinkfile-zipperenvelopearrow-up-right-from-squarepaperclipenvelopehashtagweibo'
		// 	},
		// 	{
		// 		href: 'https://caniuse.com/',
		// 		category: '编程',
		// 		icon: 'https://caniuse.com/img/favicon-128.png',
		// 		title: 'Can I use... Support tables for HTML5, CSS3, etc'
		// 	},
		// 	{
		// 		href: 'https://svelte.dev/',
		// 		category: '编程',
		// 		icon: 'https://svelte.dev/favicon.png',
		// 		title: 'Svelte • Web development for the rest of us'
		// 	},
		// 	{
		// 		href: 'https://icon-sets.iconify.design/',
		// 		category: '编程',
		// 		icon: 'https://icon-sets.iconify.design/apple-touch-icon.png',
		// 		title: 'Iconify - home of open source icons'
		// 	},
		// 	{
		// 		href: 'https://bun.sh/',
		// 		category: '编程',
		// 		icon: 'https://bun.sh/icons/apple-touch-icon-152x152.png',
		// 		title: 'Bun — A fast all-in-one JavaScript runtime'
		// 	},
		// 	{
		// 		href: 'https://www.freecodecamp.org/',
		// 		category: '编程',
		// 		icon: 'https://www.freecodecamp.org/icons/icon-72x72.png?v=6cba562cbd10e31af925a976f3db73f7',
		// 		title: 'freecodecamp'
		// 	}
		// ];

		// data.forEach((item) => {
		// 	POST('/api/kv', {
		// 		operate: 'set',
		// 		params: [['linkItem', item.category, item.href], item]
		// 	});
		// });
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
			<img src={`/api/tools/proxy?url=${linkItem.icon}`} alt="" class="size-10" />
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
