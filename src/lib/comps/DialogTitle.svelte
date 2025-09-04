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

<div class="flex justify-between py-2 font-bold">
	<div class="title-xl">{title}</div>
	<button class=" title-gray-700 hover:title-gray-900 cursor-pointer" onclick={handleClose}>
		✕
	</button>
</div>
