<script lang="ts">
	let { children } = $props();
</script>

<section class="flex h-screen w-screen flex-col overflow-hidden">
	{@render children()}
</section>
