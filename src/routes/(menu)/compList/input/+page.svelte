<script lang="ts">
  import Card from "$lib/comps/Card/Card.svelte";
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Input from "$lib/comps/Input/Input.svelte";
  import SvgSearch from "$lib/comps/Svg/SvgSearch.svelte";

  let text1 = $state("");
</script>

<svelte:head>
  <title>组件列表 - 输入框</title>
</svelte:head>

<Card caption="输入框 - 基本">
  <Input bind:value={text1} placeholder="请输入" />
</Card>

<Card caption="输入框 - 禁用">
  <Input bind:value={text1} placeholder="请输入" disabled />
</Card>

<Card caption="输入框 - 左侧内容">
  <Input bind:value={text1} placeholder="请输入">
    {#snippet left()}
      <Flex class="pl-4 w-10">
        <SvgSearch />
      </Flex>
    {/snippet}
  </Input>
</Card>

<Card caption="输入框 - 右侧内容">
  <Input bind:value={text1} placeholder="请输入">
    {#snippet right()}
      <Flex class="pr-4 w-10">
        <SvgSearch />
      </Flex>
    {/snippet}
  </Input>
</Card>

<Card caption="输入框 - 两侧内容">
  <Input bind:value={text1} placeholder="请输入像素为单位的数值">
    {#snippet left()}
      <Flex class="w-10 pl-4 pr-1">
        <SvgSearch />
      </Flex>
    {/snippet}
    {#snippet right()}
      <Flex
        class="w-14 flex items-center justify-center
       border-stone-200 bg-stone-100 dark:bg-stone-900"
      >
        px
      </Flex>
    {/snippet}
  </Input>
</Card>

<Card caption="输入框 - 圆角">
  <Input bind:value={text1} placeholder="请输入" class="rounded-full px-6"></Input>
</Card>
