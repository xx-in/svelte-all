<script lang="ts">
  import Card from "$lib/comps/Card/Card.svelte";
  import Checkbox from "$lib/comps/Checkbox/Checkbox.svelte";
  import CheckboxGroup from "$lib/comps/Checkbox/CheckboxGroup.svelte";

  let checkValue = $state(false);
  let checkValue2 = $state(true);

  const options = [
    { label: "选项1", value: "1" },
    { label: "选项2", value: "2" },
    { label: "选项3", value: "3" },
  ];

  const complexOptions = [
    { label: "选项1", value: { label: "选项1", value: "1" } },
    { label: "选项2", value: { label: "选项2", value: "2" } },
    { label: "选项3", value: { label: "选项3", value: "3" } },
  ];

  let complexValue = $state([
    {
      label: "选项3",
      value: "3",
    },
    {
      label: "选项5",
      value: "5",
    },
  ]);

  let value = $state([]);
</script>

<Card caption="复选框">
  <Checkbox bind:value={checkValue} label="复选框标签" />
</Card>

<Card caption="复选框 - 默认选中">
  <Checkbox bind:value={checkValue2} label="复选框标签" />
</Card>

<Card caption="复选框 - 禁用">
  <Checkbox value={checkValue} label="复选框标签" disabled />
  <Checkbox bind:value={checkValue2} label="复选框标签" disabled />
</Card>

<Card caption="复选框组">
  <CheckboxGroup {options} bind:value />
</Card>

<Card caption="复选框组 - 垂直布局">
  <CheckboxGroup {options} bind:value vertical />
</Card>

<Card caption="复选框组 - 复杂 value">
  <CheckboxGroup options={complexOptions} bind:value={complexValue} />
</Card>

<Card caption="复选框组 - 禁用">
  <CheckboxGroup {options} bind:value disabled />
</Card>

<Card caption="复选框组 - 选项禁用">
  <CheckboxGroup
    options={[
      ...complexOptions,
      {
        label: "选项4",
        value: {
          label: "选项4",
          value: "4",
        },
        disabled: true,
      },
      {
        label: "选项5",
        value: {
          label: "选项5",
          value: "5",
        },
        disabled: true,
      },
    ]}
    bind:value={complexValue}
  />
</Card>
