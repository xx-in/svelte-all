<script lang="ts">
  import DragableLayout from "$lib/comps/DragableLayout.svelte";
  import Layout from "$lib/comps/Layout.svelte";
  import Markdown from "$lib/comps/Markdown/Markdown.svelte";
  import MarkdownK from "$lib/comps/Markdown/MarkdownK.svelte";
  import SvgLoading from "$lib/comps/Svg/SvgLoading.svelte";
  import type { PageProps } from "./$types";
  import { twMerge } from "tailwind-merge";

  let { data, params }: PageProps = $props();

  let blogList = $derived(data.files);

  let loading = $state(false);

  // svelte-ignore state_referenced_locally
  let selectBlog = $state(params.blogName || blogList[0]);
  let selectBlogContent = $state("");

  $inspect(selectBlog);

  async function getMarkdown(selectBlog: string) {
    if (!selectBlog) {
      return;
    }
    const mdPath = `/contents/${selectBlog}`;
    loading = true;
    const res = await fetch(mdPath);
    selectBlogContent = await res.text();
    loading = false;
    mdContainer?.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动
    });
  }

  $effect(() => {
    getMarkdown(selectBlog);
  });

  function handleClickBlog(blog: string) {
    selectBlog = blog;
  }

  let mdContainer = $state<HTMLDivElement>();

  function toName(text: string) {
    return text.split(".")[0];
  }
</script>

<svelte:head>
  <title>博客 - {selectBlog.split(".")[0]}</title>
</svelte:head>

<!-- 移动端 -->
<div class="block sm:hidden p-4">
  <ol class="overflow-auto">
    {#each blogList as blog, index}
      <li
        class={twMerge("mb-4 cursor-pointer rounded-2xl border border-gray-200 py-2 pl-8 shadow")}
      >
        <a class="font-bold" href={"/blogs/mobie/" + blog}>
          {index + 1}. {toName(blog)}
        </a>
      </li>
    {/each}
  </ol>
</div>
<!-- PC 端 -->
<div class="hidden h-full sm:block overflow-hidden">
  <div class="flex h-full justify-between">
    <DragableLayout>
      <!-- 左边选择栏 -->
      {#snippet left()}
        <ol class="overflow-auto pt-3">
          {#each blogList as blog, index}
            <li
              class={twMerge(
                "cursor-pointer py-3 pl-8",
                blog == selectBlog && "text-blue-500 underline underline-offset-4",
                "hover:text-blue-500",
              )}
              onclick={() => handleClickBlog(blog)}
            >
              <a href={"/blogs/" + blog}>
                <span class="">
                  {index + 1}. {toName(blog)}
                </span>
              </a>
            </li>
          {/each}
        </ol>
      {/snippet}
      <!-- 右侧渲染栏 -->
      <Layout class="py-5 pl-10 pr-1">
        <Layout>
          {#if loading}
            <div class="flex size-full flex-col items-center justify-center gap-10">
              <SvgLoading class="size-20" />
              <div>加载中……</div>
            </div>
          {:else}
            <div class="pb-10">
              {#if selectBlog.endsWith(".k.md")}
                <MarkdownK raw={selectBlogContent} class="max-w-full" />
              {:else}
                <Markdown raw={selectBlogContent} class="max-w-full"></Markdown>
              {/if}
            </div>
          {/if}
        </Layout>
      </Layout>
    </DragableLayout>
  </div>
</div>
