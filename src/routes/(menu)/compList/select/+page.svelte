<script lang="ts">
  import Card from "$lib/comps/Card/Card.svelte";
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Input from "$lib/comps/Input/Input.svelte";
  import InputNumber from "$lib/comps/Input/InputNumber.svelte";
  import Select from "$lib/comps/Select/Select.svelte";
  import SelectMultiple from "$lib/comps/Select/SelectMultiple.svelte";

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

  let valueM1 = $state([]);
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

<Card caption="下拉选择器 - 可以清空">
  <Flex vertical class="gap-4">
    <Select options={longOptions} bind:value={value1} clearable />
  </Flex>
</Card>

<Card caption="下拉选择器 - 禁用">
  <Flex vertical class="gap-4">
    <Select options={longOptions} bind:value={value1} disabled />

    <Input value="文本框" disabled />
    <InputNumber value={1} disabled />
  </Flex>
</Card>

<Card caption="下拉选择器 - 选项禁用">
  <Flex vertical class="gap-4">
    <Select
      options={[
        {
          label: "禁用",
          value: "禁用",
          disabled: true,
        },
        ...options,
      ]}
      bind:value
    />
  </Flex>
</Card>

<Card caption="下拉选择器 - 多选">
  <Flex vertical class="gap-4">
    <SelectMultiple options={longOptions} bind:value={valueM1} />
    <SelectMultiple options={longOptions} bind:value={valueM1} clearable />
    <SelectMultiple options={longOptions} bind:value={valueM1} clearable disabled />
    <SelectMultiple options={longOptions} bind:value={valueM1} clearable max={2} />
  </Flex>
</Card>
