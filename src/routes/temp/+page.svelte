<script lang="ts">
  import Comp from "./Comp.svelte";

  let text = $state(0);
</script>

<h1>temp</h1>
<div>
  <Comp bind:value={text} />
  <Comp bind:value={text} />
</div>
