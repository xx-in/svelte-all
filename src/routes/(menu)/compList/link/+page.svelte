<script>
  import Card from "$lib/comps/Card/Card.svelte";
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Link from "$lib/comps/Link/Link.svelte";
</script>

<svelte:head>
  <title>组件列表 - 文字链接</title>
</svelte:head>
<div>
  <Card caption="文字链接">
    <p class="mb-4">文字链接也可以设置 href 属性，本质就是 a 标签</p>
    <Flex vertical class="gap-4 items-stretch">
      <Flex class="gap-4">
        <Link href="/">默认链接</Link>
        <Link disabled>默认链接</Link>
      </Flex>

      <Flex class="gap-4">
        <Link type="primary">主要链接</Link>
        <Link disabled type="primary">主要链接</Link>
      </Flex>

      <Flex class="gap-4">
        <Link type="success">成功链接</Link>
        <Link disabled type="success">成功链接</Link>
      </Flex>

      <Flex class="gap-4">
        <Link type="warning">警告链接</Link>
        <Link disabled type="warning">警告链接</Link>
      </Flex>

      <Flex class="gap-4">
        <Link type="error">危险链接</Link>
        <Link disabled type="error">危险链接</Link>
      </Flex>

      <Flex class="gap-4">
        <Link type="info">信息链接</Link>
        <Link disabled type="info">信息链接</Link>
      </Flex>
    </Flex>
  </Card>

  <Card caption="文字链接 - 禁用">
    <p class="mb-4">即使设置了href，但通过disabled属性可以阻止跳转。</p>
    <Flex class="gap-4">
      <Link href="/" disabled>禁用链接跳转</Link>
      <Link href="/" type="primary" disabled>禁用链接跳转</Link>
    </Flex>
  </Card>
</div>
