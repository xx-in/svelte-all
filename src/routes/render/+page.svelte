<script lang="ts">
  import { exampleData, removeById, type IRenderItem } from "./utils";
  import Render, { parse } from "./Render.svelte";
  import Tree from "./Tree.svelte";
  import { type IRenderArray } from "./utils";

  let compList = $state<IRenderArray>(parse(exampleData));

  function handleRemove(item: IRenderItem) {
    compList = removeById(compList, item.id);
  }
</script>

<svelte:head>
  <title>渲染器</title>
</svelte:head>

<div class="h-[100dvh] w-screen text-black">
  <div class="flex h-full">
    <div class="w-96 bg-red-200 p-2">
      <Tree list={compList}>
        {#snippet children(item)}
          <div class="flex justify-between pr-2">
            <span class="cursor-pointer">{item.type}</span>
            <div class="flex gap-4">
              <button class="cursor-pointer" onclick={() => handleRemove(item)}>-</button>
              <button class="cursor-pointer">+</button>
            </div>
          </div>
        {/snippet}
      </Tree>
    </div>
    <div class="flex-1 bg-green-200 px-4 py-2">
      <Render {compList} />
    </div>
  </div>
</div>
