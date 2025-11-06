<script lang="ts">
  import Card from "$lib/comps/Card/Card.svelte";
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Input from "$lib/comps/Input/Input.svelte";
  import InputNumber from "$lib/comps/Input/InputNumber.svelte";

  let value = $state(100);
  let value2 = $state(100.123456);
  let value3 = $state(100.001);
  let value4 = $state(100.001);
  let value5 = $state(100.1);
</script>

<svelte:head>
  <title>组件列表 - 数字输入框</title>
</svelte:head>

<Card caption="整数精度">
  <InputNumber bind:value />
</Card>

<Card caption="浮点数精度 - 1位">
  <p class="mb-4">
    需要注意的是，你设置的默认值不会被最小值、最大值以及精度等限制，因此请将默认值设置为有效的值。
  </p>
  <Flex class="gap-4" vertical>
    <InputNumber bind:value={value2} precision={1} />
    <Input bind:value={value2} />
  </Flex>
</Card>
<Card caption="浮点数精度 - 3位">
  <InputNumber bind:value={value3} precision={3} />
</Card>

<Card caption="浮点数精度 - 独立步长">
  <InputNumber bind:value={value4} precision={3} step={0.003} />
</Card>

<Card caption="浮点数精度 - 最小值和最大值">
  <InputNumber bind:value={value5} precision={1} min={99} max={101} />
</Card>

<Card caption="浮点数精度 - 禁用">
  <InputNumber bind:value={value5} precision={1} min={99} max={101} disabled />
</Card>
