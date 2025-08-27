<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	interface IProps {
		class?: string;
		onclick?: () => void;
	}
	let { class: className, onclick }: IProps = $props();
</script>

<svg class={twMerge(className)} {onclick}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><path
			fill="transparent"
			d="M23 11v2h-1v1h-8v8h-1v1h-2v-1h-1v-8H2v-1H1v-2h1v-1h8V2h1V1h2v1h1v8h8v1z"
			stroke-width="0.5"
			stroke="currentColor"
		/></svg
	>
</svg>
