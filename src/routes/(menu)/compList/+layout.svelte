<script lang="ts">
  import { page } from "$app/state";
  import DragableLayout from "$lib/comps/DragableLayout.svelte";
  import Layout from "$lib/comps/Layout.svelte";
  import type { Snippet } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps {
    children: Snippet;
  }

  let { children }: IProps = $props();

  let tabList = $state([
    { title: "按钮 Button ✓", href: "/compList/button" },
    { title: "单选框 Radio ✓", href: "/compList/radio" },
    { title: "文字链接 Link ✓", href: "/compList/link" },
    { title: "复选框 Checkbox ✓", href: "/compList/checkbox" },
    { title: "输入框 Input ✓", href: "/compList/input" },
    { title: "数字输入框 InputNumber ✓", href: "/compList/inputNumber" },
    { title: "选择器 Select", href: "/compList/select" },
    { title: "级联选择器 Cascader" },
    { title: "开关 Switch" },
    { title: "滑块 Slider" },
    { title: "时间选择器 TimePicker" },
    { title: "日期选择器 DatePicker" },
    { title: "日期时间选择器 DateTimePicker" },
    { title: "文件上传 Upload" },
    { title: "评分 Rate" },
    { title: "颜色选择器 ColorPicker" },
    { title: "表单 Form" },
    { title: "表格 Table" },
    { title: "标签 Tag" },
    { title: "进度条 Progress" },
    { title: "树形控件 Tree" },
    { title: "分页 Pagination" },
    { title: "描述列表 Descriptions" },
    { title: "加载 Loading" },
    { title: "消息提示 Toast" },
    { title: "通知 Notification" },
    { title: "导航菜单 NavMenu" },
    { title: "标签页 Tabs" },
    { title: "面包屑 Breadcrumbs" },
    { title: "下拉菜单 Dropdown" },
    { title: "步骤条 Steps" },
    { title: "对话框 Dialog" },
    { title: "文字提示 PopTip" },
    { title: "弹出框 PopOver" },
    { title: "气泡确认框 PopConfirm" },
    { title: "卡片 Card" },
    { title: "轮播图 Carousel" },
    { title: "折叠面板 Collapse" },
    { title: "时间线 TimeLine" },
    { title: "虚拟滚动 VirtualScroll" },
    { title: "自动滚动 AutoScroll" },
    { title: "日历 Calendar" },
    { title: "图片 Image" },
    { title: "回到顶部 BackTop" },
    { title: "抽屉 Drawer" },
    { title: "布局 Layout" },
    { title: "可拖拽布局 DragableLayout" },
  ]);

  let activeRoute = $derived(page.url.pathname);
</script>

<DragableLayout>
  {#snippet left()}
    <Layout class="p-4 pr-0 ">
      <div class="flex flex-col gap-2 px-4">
        {#each tabList as tab}
          <a
            class={twMerge(
              "text-left p-1 hover:text-blue-500 cursor-pointer",
              activeRoute == tab.href && "text-blue-500 underline underline-offset-4",
            )}
            href={tab.href}>{tab.title}</a
          >
        {/each}
      </div>
    </Layout>
  {/snippet}
  <Layout class="p-4 pr-0 rounded-lg @container">
    <section class="pr-4 @container">{@render children()}</section>
  </Layout>
</DragableLayout>
