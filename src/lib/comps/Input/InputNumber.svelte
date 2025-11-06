<script lang="ts">
  import Input from "$lib/comps/Input/Input.svelte";
  import Decimal from "decimal.js";
  import type { ComponentProps } from "svelte";
  import { twMerge } from "tailwind-merge";

  interface IProps extends Omit<ComponentProps<typeof Input>, "type" | "left" | "right" | "value"> {
    precision?: number;
    step?: number;
    value: number;
    min?: number;
    max?: number;
    controls?: boolean;
  }

  let {
    value = $bindable(),
    precision = 0,
    step,
    min = -Infinity,
    max = Infinity,
    disabled = false,
    controls = true,
    ...rest
  }: IProps = $props();

  function getStep(precision: number) {
    return new Decimal(1).dividedBy(new Decimal(10).pow(precision));
  }

  let stepDecimal = $derived(step ? new Decimal(step) : getStep(precision));

  function handleAdd() {
    const result = new Decimal(value).add(stepDecimal).toNumber();
    handleInput(result);
  }

  function handleSetValue(newValue: number) {
    if (newValue >= max) {
      value = max;
    } else if (newValue <= min) {
      value = min;
    } else {
      value = newValue;
    }
  }

  function handleMinus() {
    const result = new Decimal(value).minus(stepDecimal).toNumber();
    handleInput(result);
  }

  function handleInput(newValue: number) {
    handleSetValue(Number(newValue.toFixed(precision)));
  }

  const controlClass =
    twMerge(`px-4 py-0 flex bg-stone-100 hover:bg-blue-500 hover:text-white items-center select-none dark:bg-stone-700
  `);
</script>

<Input
  bind:value={() => value, handleInput}
  {...rest}
  {disabled}
  inputClass="text-center"
  type="number"
>
  {#snippet left()}
    {#if controls && !disabled}
      <div class={controlClass} onclick={handleMinus}>−</div>
    {/if}
  {/snippet}

  {#snippet right()}
    {#if controls && !disabled}
      <div class={controlClass} onclick={handleAdd}>+</div>
    {/if}
  {/snippet}
</Input>
