<script lang="ts">
	import HeaderMenu from '$lib/comps/HeaderMenu.svelte';
	import Test1 from './test1.svelte';
	import Test2 from './test2.svelte';
</script>

<svelte:head>
	<title>功能测试</title>
</svelte:head>
<HeaderMenu activeRoute="/test"></HeaderMenu>
<!-- <Test1 /> -->
<Test2 />
