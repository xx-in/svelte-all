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

<div
	class="mb-6 flex justify-between border-b-1 border-stone-200 pt-4 pb-2 font-bold dark:border-gray-600"
>
	<div class="text-lg">{title}</div>
	<button
		class="flex size-6 cursor-pointer items-center justify-center rounded-full bg-stone-100 p-1 text-stone-500 hover:bg-stone-200 hover:text-black"
		onclick={handleClose}
	>
		✕
	</button>
</div>
