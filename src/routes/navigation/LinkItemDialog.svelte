<script lang="ts">
  import ColorPicker from "$lib/comps/ColorPicker.svelte";
  import Dialog from "$lib/comps/Dialog/Dialog.svelte";
  import DialogContent from "$lib/comps/Dialog/DialogContent.svelte";
  import DialogFooter from "$lib/comps/Dialog/DialogFooter.svelte";
  import DialogTitle from "$lib/comps/Dialog/DialogTitle.svelte";
  import { addToast } from "$lib/store";
  import { typedKeys } from "$lib/utils";
  import { POST } from "$lib/utils/client";
  import type { ILinkAppendItem, ILinkItem } from "./type";

  interface IProps {
    visible: boolean;
    isEdit: boolean;
    linkItem: ILinkItem;
    onConfirm?: (item: ILinkItem) => Promise<void>;
    onCancel?: () => void;
  }

  let {
    visible = $bindable(),
    isEdit,
    linkItem = $bindable(),
    onConfirm,
    onCancel,
  }: IProps = $props();

  let columns = $state<ILinkAppendItem>({
    href: {
      label: "链接",
      placeholder: "请输入链接地址",
      type: "text",
      onblur: handleChangeHref,
    },
    category: {
      label: "分类",
      type: "text",
      placeholder: "请输入分类",
    },

    title: {
      label: "文本",
      type: "text",
      placeholder: "请输入描述文本",
    },
    icon: {
      label: "图标",
      placeholder: "请输入图标地址",
      type: "text",
    },
    bgColor: {
      type: "color",
      label: "背景",
    },
  });

  async function handleChangeHref() {
    const res = await POST("/api/tools/favicon", {
      target: linkItem.href,
    });
    const body = await res.json();
    linkItem.icon = body.icon;
    linkItem.title = body.title;
  }

  /**
   * 编辑时
   */
  async function handleEdit() {
    const { key, ...rest } = linkItem;
    // 因为可能修改key，所以要先删除
    await POST("/api/kv", {
      operate: "delete",
      params: [key],
    });
    // 更新
    const newKey = ["linkItem", linkItem.category, linkItem.href];
    const res = await POST("/api/kv", {
      operate: "set",
      params: [newKey, rest],
    });
    handleClose();
    await onConfirm?.(linkItem);
    addToast("修改导航成功", "success");
  }

  /**
   * 新增时
   */
  async function handleAppend() {
    const key = ["linkItem", linkItem.category, linkItem.href];
    const res = await POST("/api/kv", {
      operate: "set",
      params: [key, linkItem],
    });
    addToast("新增导航成功", "success");
    handleClose();
    onConfirm?.(linkItem);
  }

  function handleClose() {
    visible = false;
  }
</script>

<Dialog bind:visible hideOnClickMask={false} class="w-1/2">
  <DialogTitle title={isEdit ? "编辑导航" : "新增导航"} bind:visible></DialogTitle>
  <DialogContent>
    <div class="flex flex-col gap-4">
      {#each typedKeys(columns) as prop}
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label>
            <span class="w-20 text-right">{columns[prop].label}：</span>
          </label>

          {#if columns[prop].type == "color"}
            <div class="flex flex-1 items-center gap-2">
              <ColorPicker bind:value={linkItem[prop]} />
              <input bind:value={linkItem[prop]} class="outline-none" />
            </div>
          {:else}
            <input
              class="flex-1 outline-none"
              bind:value={linkItem[prop]}
              placeholder={columns[prop].placeholder}
              onblur={columns[prop].onblur as any}
              type={columns[prop].type}
            />
          {/if}
        </div>
      {/each}
    </div>

    <!-- 操作栏 -->
  </DialogContent>
  <DialogFooter>
    <button
      class="cursor-pointer rounded-lg bg-gray-500 px-4 py-2 text-stone-50 shadow hover:bg-gray-600"
      onclick={() => (visible = false)}
    >
      取消
    </button>
    {#if isEdit}
      <button
        class="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-stone-50 shadow hover:bg-blue-600"
        onclick={handleEdit}
      >
        确定
      </button>
    {:else}
      <button
        class="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-stone-50 shadow hover:bg-blue-600"
        onclick={handleAppend}
      >
        确定
      </button>
    {/if}
  </DialogFooter>
</Dialog>
