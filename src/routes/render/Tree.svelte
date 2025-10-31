<script lang="ts">
  import Self from "./Tree.svelte";
  import type { Component, Snippet } from "svelte";

  type IChildrenArray = Array<any>;

  interface IProps {
    children?: Snippet<[any]>;
    list: IChildrenArray;
  }

  let { children, list }: IProps = $props();
</script>

{#snippet defaultChildren({ label }: { label?: string })}
  <span>{label}</span>
{/snippet}

{#each list as item}
  <div class="my-1">
    <!-- 带有回退内容的 -->
    {#if children}
      {@render children(item)}
    {:else}
      {defaultChildren(item)}
    {/if}
    <!-- 判断是否进行递归渲染 -->
    {#if item.children}
      <div class="pl-4">
        <Self list={item.children} {children}></Self>
      </div>
    {/if}
  </div>
{/each}
