<script lang="ts">
  import Markdown from "$lib/comps/Markdown/Markdown.svelte";
  import MarkdownK from "$lib/comps/Markdown/MarkdownK.svelte";
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
  {#if data.blogName.endsWith(".k.md")}
    <MarkdownK raw={data.detailContent} class="max-w-full" />
  {:else}
    <Markdown raw={data.detailContent} class="max-w-full"></Markdown>
  {/if}
</div>
