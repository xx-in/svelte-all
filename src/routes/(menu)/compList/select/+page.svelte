<script lang="ts">
  import Card from "$lib/comps/Card/Card.svelte";
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Select from "./Select.svelte";

  let value = $state("选项5");

  let options = [
    {
      value: "选项1",
      label: "黄金糕",
    },
    {
      value: "选项2",
      label: "双皮奶",
    },
    {
      value: "选项3",
      label: "蚵仔煎",
    },
    {
      value: "选项4",
      label: "龙须面",
    },
    {
      value: "选项5",
      label: "北京烤鸭",
    },
  ];

  let longOptions = rangeArr(20);
  console.log(longOptions);

  function rangeArr(count: number) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({
        label: "标签" + i,
        value: i,
      });
    }
    return result;
  }

  let value1 = $state(null);
</script>

<Card caption="下拉选择器">
  <Flex vertical class="gap-4">
    <Select {options} bind:value />
    <Select {options} bind:value />
  </Flex>
</Card>

<Card caption="下拉选择器 - 长列表滚动">
  <Flex vertical class="gap-4">
    <Select options={longOptions} bind:value={value1} />
  </Flex>
</Card>
