<script lang="ts">
  interface IProps {
    value: string;
    label?: string;
    oninput?: (e: Event) => void;
  }

  let { value = $bindable(), label, oninput }: IProps = $props();
</script>

<label>
  {label}:
  <input bind:value class="border" {oninput} />
</label>
