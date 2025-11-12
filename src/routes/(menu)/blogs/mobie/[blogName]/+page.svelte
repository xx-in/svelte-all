<script lang="ts">
  import Remark from "$lib/comps/Markdown/Remark.svelte";
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
  <Remark raw={data.detailContent} class="max-w-full" />
</div>
