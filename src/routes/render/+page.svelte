<script lang="ts">
  import type { IRenderItem, IRenderObject } from "./type";
  /**
   * 我需要一个可以动态生成表单的工具
   * 工具要求有以下几点：
   * 1. 可以指定组件类型
   * 2. 可以保存输入的值
   * 3. 可以对输入的值进行操作
   * 4. 可以显示错误内容
   * 5. 可以配置组件的属性
   * 6. 可以配置属性联动事件
   * 7. 数据可以是对象、数组、日期、字符串、数字等
   * 8. 数据可能是递归的
   */
  import Text from "./text.svelte";
  import { typedEntries, typedKeys } from "$lib/utils";

  let formObject = $state<IRenderObject>({
    name: {
      type: Text,
      value: "123",
      params: {
        label: "name",
      },
      events: {
        oninput(e) {
          console.log(e);
        },
      },
    },
    sex: {
      type: Text,
      value: "男",
      params: {
        label: "sex",
      },
    },
  });

  function handleWrap<T>(item: IRenderItem, cb?: (e: Event, item: IRenderItem) => void) {
    function asignment(e: Event) {
      if (e.target) {
        // @ts-ignore
        item.value = e.target.value;
      }
    }
    if (!cb) {
      return asignment;
    }
    return (e: Event) => {
      asignment(e);
      cb(e, item);
    };
  }
</script>

{#each typedEntries(formObject) as [key, item]}
  <item.type
    value={item.value}
    {...item.params}
    oninput={handleWrap(item, item?.events?.oninput)}
  />
{/each}

<div>
  {JSON.stringify(formObject)}
</div>
