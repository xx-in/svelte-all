<script lang="ts">
  import Markdown from "$lib/comps/Markdown/index.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  $effect(() => {
    console.log(data);
  });
</script>

<svelte:head>
  <title>{data.blogName}</title>
</svelte:head>
<div class="mx-auto px-8">
  <Markdown raw={data.detailContent}></Markdown>
</div>
