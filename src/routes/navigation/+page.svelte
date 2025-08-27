<script lang="ts">
	import HeaderMenu from '$lib/comps/HeaderMenu.svelte';
	import SvgUpload from '$lib/comps/Svg/SvgUpload.svelte';
	import Dialog from '$lib/comps/Dialog.svelte';

	let visible = $state(false);

	function handleShowDiaglog() {
		visible = true;
	}

	function handleHideDiaglog() {
		visible = false;
	}
</script>

<svelte:head>
	<title>网址导航</title>
</svelte:head>
<HeaderMenu activeRoute="/navigation"></HeaderMenu>

<div class="flex gap-4 p-4">
	<div
		class="flex size-20 cursor-pointer flex-col items-center justify-center rounded-2xl border-8 border-double border-stone-400"
		onclick={handleShowDiaglog}
	>
		<SvgUpload class="size-10 text-stone-400" />
	</div>
</div>

<Dialog bind:visible title="新增导航">
	<div class="mt-[15vh] h-[50vh] w-[50vw] rounded-2xl bg-white px-6">
		<div class="flex justify-between py-6">
			<div>title</div>
			<button class=" cursor-pointer text-gray-500 hover:text-gray-700" onclick={handleHideDiaglog}>
				✕
			</button>
		</div>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ea asperiores quas accusamus provident
		velit ullam molestiae doloremque, voluptas rem, autem aliquid delectus reiciendis illo qui cumque
		quos voluptatem minus?
	</div>
</Dialog>
