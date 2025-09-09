<script lang="ts">
  import HeaderMenu from "$lib/comps/HeaderMenu.svelte";
  import Main from "$lib/comps/Main.svelte";
  import Markdown from "$lib/comps/Markdown/index.svelte";
  import { twMerge } from "tailwind-merge";

  import type { PageProps } from "./$types";

  let { data, params }: PageProps = $props();

  let blogList = $derived(data.files);

  // svelte-ignore state_referenced_locally
  let selectBlog = $state(params.blogName || blogList[0]);
  let selectBlogContent = $state("");

  $inspect(selectBlog);

  async function getMarkdown(selectBlog: string) {
    if (!selectBlog) {
      return;
    }
    const mdPath = `/contents/${selectBlog}`;
    const res = await fetch(mdPath);
    selectBlogContent = await res.text();
  }

  $effect(() => {
    getMarkdown(selectBlog);
  });

  function handleClickBlog(blog: string) {
    console.log("???123");
    selectBlog = blog;
  }
</script>

<svelte:head>
  <title>博客列表</title>
</svelte:head>

<Main>
  <HeaderMenu activeRoute="/blogs" />
  <div class="flex-1 overflow-auto p-4">
    <!-- 移动端 -->
    <div class="block sm:hidden">
      <ol class="overflow-auto">
        {#each blogList as blog, index}
          <li
            class={twMerge(
              "mb-4 cursor-pointer rounded-2xl border border-gray-200 py-2 pl-8 shadow",
            )}
          >
            <a class="font-bold" href={"/blogs/mobie/" + blog}>
              {index + 1}. {blog}
            </a>
          </li>
        {/each}
      </ol>
    </div>
    <!-- PC 端 -->
    <div class="hidden h-full sm:block">
      <div class="flex h-full justify-between">
        <!-- 左边选择栏 -->
        <div class="flex h-full w-60 flex-col shadow">
          <h2 class="pt-2 pb-2 pl-8 text-2xl font-bold">博客列表</h2>
          <ol class="overflow-auto">
            {#each blogList as blog, index}
              <li
                class={twMerge("cursor-pointer py-2 pl-8", blog == selectBlog && "text-blue-500")}
                onclick={() => handleClickBlog(blog)}
              >
                <a href={"/blogs/" + blog}>
                  <span class="underline underline-offset-4">
                    {index + 1}. {blog}
                  </span>
                </a>
              </li>
            {/each}
          </ol>
        </div>
        <!-- 右侧渲染栏 -->
        <div class="hidden w-full flex-1 overflow-auto px-4 sm:block sm:w-[60vw] sm:px-20">
          <div class="pb-10">
            <Markdown raw={selectBlogContent} class="max-w-full"></Markdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</Main>
