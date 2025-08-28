<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	interface IProps {
		class?: string;
		onclick?: () => void;
	}
	let { class: className, onclick }: IProps = $props();
</script>

<svg class={twMerge(className)} {onclick}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
		><g fill="none"
			><path
				fill="url(#SVGYLRiveUz)"
				d="M17 6H3v8.5A2.5 2.5 0 0 0 5.5 17h9a2.5 2.5 0 0 0 2.5-2.5z"
			/><path
				fill="url(#SVGooVp8cew)"
				d="M17 6H3v8.5A2.5 2.5 0 0 0 5.5 17h9a2.5 2.5 0 0 0 2.5-2.5z"
			/><path
				fill="url(#SVGs7Rwfeyk)"
				fill-opacity="0.3"
				d="M17 6H3v8.5A2.5 2.5 0 0 0 5.5 17h9a2.5 2.5 0 0 0 2.5-2.5z"
			/><path
				fill="url(#SVGuDXfYblM)"
				d="M17 5.5A2.5 2.5 0 0 0 14.5 3h-9A2.5 2.5 0 0 0 3 5.5V7h14z"
			/><path fill="url(#SVGQJUyvyRx)" d="M19 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0" /><path
				fill="url(#SVGADIXSbgL)"
				fill-rule="evenodd"
				d="M12.646 12.646a.5.5 0 0 1 .708 0l1.146 1.147l1.146-1.147a.5.5 0 0 1 .708.708L15.207 14.5l1.147 1.146a.5.5 0 0 1-.708.708L14.5 15.207l-1.146 1.147a.5.5 0 0 1-.708-.708l1.147-1.146l-1.147-1.146a.5.5 0 0 1 0-.708"
				clip-rule="evenodd"
			/><defs
				><linearGradient
					id="SVGYLRiveUz"
					x1="8"
					x2="11.5"
					y1="6"
					y2="17"
					gradientUnits="userSpaceOnUse"
					><stop stop-color="#b3e0ff" /><stop offset="1" stop-color="#8cd0ff" /></linearGradient
				><linearGradient
					id="SVGooVp8cew"
					x1="11.5"
					x2="13.5"
					y1="10.5"
					y2="19.5"
					gradientUnits="userSpaceOnUse"
					><stop stop-color="#dcf8ff" stop-opacity="0" /><stop
						offset="1"
						stop-color="#ff6ce8"
						stop-opacity="0.7"
					/></linearGradient
				><linearGradient
					id="SVGuDXfYblM"
					x1="3.563"
					x2="4.904"
					y1="3"
					y2="9.816"
					gradientUnits="userSpaceOnUse"
					><stop stop-color="#0094f0" /><stop offset="1" stop-color="#2764e7" /></linearGradient
				><linearGradient
					id="SVGQJUyvyRx"
					x1="11.406"
					x2="17.313"
					y1="10.563"
					y2="19.281"
					gradientUnits="userSpaceOnUse"
					><stop stop-color="#f83f54" /><stop offset="1" stop-color="#ca2134" /></linearGradient
				><linearGradient
					id="SVGADIXSbgL"
					x1="12.977"
					x2="14.771"
					y1="14.652"
					y2="16.518"
					gradientUnits="userSpaceOnUse"
					><stop stop-color="#fdfdfd" /><stop offset="1" stop-color="#fecbe6" /></linearGradient
				><radialGradient
					id="SVGs7Rwfeyk"
					cx="0"
					cy="0"
					r="1"
					gradientTransform="rotate(90 -.5 15)scale(6.5)"
					gradientUnits="userSpaceOnUse"
					><stop offset=".535" stop-color="#4a43cb" /><stop
						offset="1"
						stop-color="#4a43cb"
						stop-opacity="0"
					/></radialGradient
				></defs
			></g
		></svg
	>
</svg>
