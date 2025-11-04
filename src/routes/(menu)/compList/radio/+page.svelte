<script lang="ts">
  import Card from "$lib/comps/Card/Card.svelte";
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Radio from "$lib/comps/Radio/Radio.svelte";
  import RadioGroup from "$lib/comps/Radio/RadioGroup.svelte";

  let checked = $state(true);
  let notChecked = $state(false);

  let options = [
    {
      label: "上海",
      value: "上海",
    },
    {
      label: "北京",
      value: "北京",
    },
    {
      label: "广州",
      value: "广州",
    },
    {
      label: "深圳",
      value: "深圳",
    },
  ];

  let groupValue = $state("上海");
  let groupValue2 = $state(null);
  let groupValue3 = $state("深圳");
  // $inspect(groupValue);

  let complexOptions = [
    {
      label: "上海",
      value: {
        id: "上海",
      },
    },
    {
      label: "北京",
      value: {
        id: "北京",
      },
    },
    {
      label: "广州",
      value: {
        id: "广州",
      },
    },
    {
      label: "深圳",
      value: {
        id: "深圳",
      },
    },
  ];

  let complexGroupValue = $state({
    id: "广州",
  });
  $inspect(complexGroupValue);
</script>

<svelte:head>
  <title>组件列表 - 单选框</title>
</svelte:head>
<Card caption="单选框">
  <p class="p-4 pt-0">点击单选框时切换，其值只能是布尔值。</p>
  <Flex class="gp-4 flex-wrap">
    <Radio bind:value={checked} label="带标签选中" />
    <Radio bind:value={checked} />
    <Radio bind:value={notChecked} label="带标签未选中" />
    <Radio bind:value={notChecked} />
  </Flex>
</Card>

<Card caption="单选框 - 禁用">
  <Flex class="gp-4 flex-wrap">
    <Radio value={true} label="带标签选中" disabled />
    <Radio value={true} disabled />
    <Radio value={false} label="带标签未选中" disabled />
    <Radio value={false} disabled />
  </Flex>
</Card>

<Card caption="单选框组">
  <p class="p-4 pt-0">
    单选框组才是给多个选项设置的，并且值不一定是布尔值(基本就不可能是布尔值，通常都会多余两个)。
  </p>
  <RadioGroup bind:value={groupValue} {options} />
</Card>

<Card caption="单选框组 - 不可清空">
  <p class="p-4 pt-0">
    默认情况下点击选中的选项可以取消选择，但是也可以添加clearable参数，将其设为false，此时就不能清空选择了。
  </p>
  <RadioGroup clearable={false} bind:value={groupValue2} {options} />
</Card>

<Card caption="单选框组 - 垂直布局">
  <p class="p-4 pt-0">设置 vertical 调整为垂直布局。</p>
  <RadioGroup clearable={false} vertical bind:value={groupValue2} {options} />
</Card>

<Card caption="单选框组 - 禁用">
  <RadioGroup clearable disabled bind:value={groupValue3} {options} />
</Card>

<Card caption="单选框组 - 单个选项禁用">
  <RadioGroup
    clearable
    bind:value={groupValue3}
    options={[
      ...options,
      {
        label: "禁用",
        value: "禁用",
        disabled: true,
      },
    ]}
  />
</Card>

<Card caption="单选框组 - 复杂值">
  <p class="p-4 pt-0">
    单选框组中选项的值可以更复杂，此时可以更好的应对需要同时传 id 和 name
    的场景。但必须注意，两者必须严格相等才可以，并不是通过id比对的。
  </p>
  <RadioGroup bind:value={complexGroupValue} options={complexOptions} />
</Card>
