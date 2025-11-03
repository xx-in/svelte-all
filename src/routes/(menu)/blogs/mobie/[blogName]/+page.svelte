<script lang="ts">
  import Markdown from "$lib/comps/Markdown/Markdown.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  $effect(() => {
    console.log(data);
  });
</script>

<svelte:head>
  <title>{data.blogName}</title>
</svelte:head>
<div class="mx-auto px-8 pt-6">
  <Markdown raw={data.detailContent}></Markdown>
</div>
