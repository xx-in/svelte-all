<script lang="ts">
  import AnimatePing from "$lib/comps/AnimatePing.svelte";
  import ContextMenu, { type IContextMenuPosition } from "$lib/comps/ContextMenu.svelte";
  import HeaderMenu from "$lib/comps/HeaderMenu.svelte";
  import Layout from "$lib/comps/Layout.svelte";
  import Main from "$lib/comps/Main.svelte";
  import SvgDelete from "$lib/comps/Svg/SvgDelete.svelte";
  import SvgEdit from "$lib/comps/Svg/SvgEdit.svelte";
  import SvgUpload from "$lib/comps/Svg/SvgUpload.svelte";
  import { addToast } from "$lib/store";
  import { toPinyin, typedKeys } from "$lib/utils";
  import { POST } from "$lib/utils/client";
  import AppendDialog from "./LinkItemDialog.svelte";
  import SearchBar from "./SearchBar.svelte";
  import type { ILinkItem } from "./type";
  import cloneDeep from "lodash/cloneDeep";
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";

  let visible = $state(false);

  let linkList = $state<Array<ILinkItem>>([]);

  /**
   * 打开新增弹窗
   */
  function handleOpenAppendDialog() {
    isEdit = false;
    activeLinkItem = {
      href: "",
      category: activeCategory ? activeCategory : "编程",
      icon: "",
      title: "",
      bgColor: "bg-white",
    };
    visible = true;
  }

  /**
   * 获取数据
   */
  async function handleGetList() {
    const res = await POST("/api/kv", {
      operate: "list",
      params: [{ prefix: ["linkItem"] }],
    });
    const { data } = await res.json();
    linkList = data;
  }

  let contextMenuVisible = $state(false);
  let contextMenuPosition = $state<IContextMenuPosition>({
    left: "0px",
    top: "0px",
  });

  let contextMenuList = $state([
    {
      text: "删除",
      Icon: SvgDelete,
      onclick(e: MouseEvent) {
        e.stopPropagation();
        contextMenuVisible = false;
        handleDelete();
      },
    },
    {
      text: "编辑",
      Icon: SvgEdit,
      onclick(e: MouseEvent) {
        e.stopPropagation();
        contextMenuVisible = false;
        handleEditDialog();
      },
    },
  ]);

  let activeLinkItem = $state<ILinkItem>({
    href: "",
    category: "编程",
    icon: "",
    title: "",
    bgColor: "bg-white",
  });

  /**
   * 打开右键菜单
   * @param linkItem
   */
  function handleOpenContextMenu(linkItem: ILinkItem) {
    return (e: MouseEvent) => {
      e.preventDefault();
      const { clientX, clientY } = e;
      if (clientX > (windowWidth / 5) * 4) {
        contextMenuPosition = {
          right: windowWidth - clientX + "px",
          top: clientY + "px",
        };
      } else {
        contextMenuPosition = {
          left: clientX + "px",
          top: clientY + "px",
        };
      }
      contextMenuVisible = true;
      activeLinkItem = cloneDeep(linkItem);
    };
  }

  let windowWidth = $state(0);

  async function handleDelete() {
    const res = await POST("/api/kv", {
      operate: "delete",
      params: [activeLinkItem?.key],
    });
    contextMenuVisible = false;
    await handleGetList();
    addToast("删除导航成功", "success");
  }

  /**
   * 打开编辑弹窗
   */
  async function handleEditDialog() {
    visible = true;
    isEdit = true;
  }

  // 切换全屏
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      // 进入全屏
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`无法切换到全屏: ${err.message}`);
      });
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // 生成目录
  let categoryObject = $derived.by(() => {
    const categoryList = new Set<string>();
    linkList.forEach((item) => {
      if (item.key) {
        categoryList.add(item.key[1]);
      }
    });
    let result: Record<string, string> = {
      "": "全部",
    };
    Array.from(categoryList)
      .sort()
      .forEach((category) => {
        result[category] = category;
      });
    return result;
  });

  let activeCategory = $state("");

  /**
   * 根据拼音和分类筛选元素
   */
  let activeCategoryLinkList = $derived(
    linkList.filter((item) => {
      if (filterNamePinyin) {
        const itemPinyin = toPinyin(item.title);
        return itemPinyin.includes(filterNamePinyin);
      }
      if (activeCategory == "") {
        return true;
      }
      if (item.key) {
        return item.key[1] == activeCategory;
      }
      return false;
    }),
  );

  /**
   * 刷新数据
   */
  async function handleRefesh() {
    await handleGetList();
    activeCategory = activeLinkItem.category;
  }

  let isEdit = $state(false);
  let filterName = $state("");
  let filterNamePinyin = $derived(toPinyin(filterName));

  onMount(() => {
    handleGetList();
  });
</script>

<svelte:head>
  <title>网址导航</title>
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />
<svelte:body ondblclick={toggleFullScreen} />
<video
  src="https://video.wetab.link/wallpaper-dynamic/v1gtq6c1g3z5yg0bit0zu13gy7wh.mp4"
  class="absolute z-10 h-[100dvh] w-screen object-cover"
  autoplay
  muted
  loop
></video>
<Layout class="z-20 dark:bg-black/10 text-white">
  {#snippet top()}
    <HeaderMenu activeRoute="/navigation" class="z-40 bg-white/5 sm:py-0">
      <SearchBar bind:value={filterName} />
    </HeaderMenu>
  {/snippet}

  <Layout class="py-4">
    <section class="flex-1 snap-y snap-mandatory overflow-auto scroll-smooth">
      <div
        class=" relative z-30 grid grid-cols-4 gap-6 pb-10 text-black sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 grid-rows-4"
      >
        <!--  导航列表 -->
        {#each activeCategoryLinkList as linkItem (linkItem.key)}
          <a
            class="group relative flex cursor-pointer snap-start flex-col items-center justify-center gap-2
					py-2 select-none"
            href={linkItem.href}
            target="_blank"
            data-type="linkItem"
            oncontextmenu={handleOpenContextMenu(linkItem)}
          >
            <AnimatePing class="z-20 mt-2 size-10  sm:size-12 ">
              {#if linkItem.icon.includes("http")}
                <img
                  src={linkItem.icon}
                  alt={linkItem.title}
                  class={twMerge("size-full rounded-md", linkItem.bgColor)}
                />
              {:else}
                <div
                  class={twMerge(
                    "flex size-full items-center justify-center rounded-md text-white",
                    linkItem.bgColor,
                  )}
                >
                  {linkItem.title[0]}
                </div>
              {/if}
            </AnimatePing>

            <div
              class="relative left-0 z-20 w-4/5 truncate text-center text-white"
              title={linkItem.title}
            >
              <span class="z-20 text-sm">
                {linkItem.title}
              </span>
            </div>
          </a>
        {/each}

        <!-- 添加按钮 -->
        <div
          class="group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-2"
          onclick={handleOpenAppendDialog}
          title="新增导航"
        >
          <AnimatePing class="z-20 mt-2 size-10 sm:size-12">
            <div class="size-full rounded-xl bg-green-500">
              <SvgUpload class="size-full"></SvgUpload>
            </div>
          </AnimatePing>

          <div class="relative z-20 w-full truncate px-4 text-center text-white">
            <span class="z-20 text-sm">新增导航</span>
          </div>
        </div>
      </div>
    </section>
  </Layout>

  {#snippet bottom()}
    <div class="px-4 pt-1 pb-4 text-white">
      <div class="flex gap-4 pb-3 sm:pb-0 w-full overflow-auto justify-center">
        {#each typedKeys(categoryObject) as category}
          <div
            class={twMerge(
              "flex cursor-pointer items-center justify-center rounded-sm bg-black px-2 py-0.5 hover:text-sky-500 tracking-widest",
              activeCategory == category && "text-sky-500",
            )}
            onmouseover={() => {
              activeCategory = category;
              filterName = "";
            }}
          >
            {categoryObject[category]}
          </div>
        {/each}
      </div>
    </div>
  {/snippet}
</Layout>

<AppendDialog bind:visible {isEdit} bind:linkItem={activeLinkItem} onConfirm={handleRefesh} />

<ContextMenu bind:visible={contextMenuVisible} position={contextMenuPosition}>
  <div class="inset-shadow-lg flex flex-col gap-2 p-1 text-sm select-none">
    {#each contextMenuList as item}
      <div
        class="flex w-40 cursor-pointer items-center gap-2 rounded-sm px-2 py-1 hover:bg-sky-500 hover:text-white"
        onclick={item.onclick}
      >
        <item.Icon class="size-6" />
        <span>
          {item.text}
        </span>
      </div>
    {/each}
  </div>
</ContextMenu>
