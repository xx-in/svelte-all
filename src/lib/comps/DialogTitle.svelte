<script lang="ts">
	interface IProps {
		title: string;
		visible: boolean;
	}

	let { title, visible = $bindable() }: IProps = $props();

	function handleClose() {
		visible = false;
	}
</script>

<div class="mb-6 flex justify-between border-b-1 border-stone-200 pt-4 pb-2 font-bold">
	<div class="text-xl">{title}</div>
	<button class=" title-gray-700 hover:title-gray-900 cursor-pointer" onclick={handleClose}>
		✕
	</button>
</div>
