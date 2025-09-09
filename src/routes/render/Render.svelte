<script module>
  import Input from "./Input.svelte";
  import Div from "./Div.svelte";
  import Span from "./Span.svelte";

  const CompMap = {
    Input,
    Div,
    Span,
  };

  /**
   * 处理组件数据
   * 1. 根据 type 添加 Comp
   * 2. 将 events 通过 new Function 转变为可执行函数
   * @param compList
   */
  export function parse(compList: IRenderArray): IRenderArray {
    const result = compList.map((comp) => {
      const { type, children, ...rest } = comp;
      if (children) {
        return {
          type,
          ...rest,
          children: parse(children),
          // @ts-ignore
          Comp: CompMap[type] ? CompMap[type] : type,
        };
      }
      return {
        ...rest,
        type,
        // @ts-ignore
        Comp: CompMap[type],
      };
    });
    return result as IRenderArray;
  }
</script>

<script lang="ts">
  import type { IRenderArray, IRenderItem } from "./type";
  import { typedEntries, typedKeys } from "$lib/utils";
  import Self from "./Render.svelte";

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
   * @todo
   * event 应该是字符串
   * type 也要是字符串
   * 要让complist保持一致
   *
   */

  // 定义渲染数据
  interface IProps {
    compList: IRenderArray;
  }

  // 包装函数
  function handleWrap<T>(item: IRenderItem, cb?: (e: Event, item: IRenderItem) => void) {
    if (!cb) {
      return () => {};
    }
    return (e: Event) => {
      cb(e, item);
    };
  }

  // 处理事件
  function toEvents(item: IRenderItem) {
    let events: IRenderItem["events"] = {};
    typedEntries(item.events).forEach(([event, handler]) => {
      events[event] = handleWrap(item, handler);
    });
    return events;
  }

  let { compList = $bindable() }: IProps = $props();
</script>

{#each compList as comp}
  <comp.Comp bind:value={comp.value} {...comp.params} {...toEvents(comp)}>
    {#if comp.children}
      <Self compList={comp.children} />
    {/if}
  </comp.Comp>
{/each}
