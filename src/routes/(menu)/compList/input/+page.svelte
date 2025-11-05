<script lang="ts">
  import Card from "$lib/comps/Card/Card.svelte";
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import SvgSearch from "$lib/comps/Svg/SvgSearch.svelte";
  import Input from "./Input.svelte";

  let text1 = $state("");
</script>

<Card caption="输入框 - 基本">
  <Input bind:value={text1} placeholder="请输入" />
</Card>

<Card caption="输入框 - 禁用">
  <Input bind:value={text1} placeholder="请输入" disabled />
</Card>

<Card caption="输入框 - 左侧内容">
  <Input bind:value={text1} placeholder="请输入">
    {#snippet left()}
      <div class="pl-4">
        <SvgSearch />
      </div>
    {/snippet}
  </Input>
</Card>

<Card caption="输入框 - 右侧内容">
  <Input bind:value={text1} placeholder="请输入">
    {#snippet right()}
      <div class="pr-4">
        <SvgSearch />
      </div>
    {/snippet}
  </Input>
</Card>

<Card caption="输入框 - 两侧内容">
  <Input bind:value={text1} placeholder="请输入像素为单位的数值">
    {#snippet left()}
      <div class="pl-4 pr-1">
        <SvgSearch />
      </div>
    {/snippet}
    {#snippet right()}
      <div
        class="h-10 flex items-center px-6
       border-stone-200 bg-stone-100 dark:bg-stone-900"
      >
        px
      </div>
    {/snippet}
  </Input>
</Card>

<Card caption="输入框 - 圆角">
  <Input bind:value={text1} placeholder="请输入" class="rounded-full px-6"></Input>
</Card>
