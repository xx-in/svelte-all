<script lang="ts" generics="T">
  import Flex from "$lib/comps/Flex/Flex.svelte";
  import Radio from "./Radio.svelte";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IOption<T> {
    label: string;
    value: T;
    disabled?: boolean;
  }

  interface IProps<T> {
    clearable?: boolean;
    disabled?: boolean;
    class?: ClassNameValue;
    options: IOption<T>[];
    value: T | null;
    vertical?: boolean;
  }

  let {
    clearable = true,
    disabled = false,
    class: className,
    value = $bindable<T>(),
    options,
    vertical = false,
  }: IProps<T> = $props();

  function handleChange(newValue: boolean, index: number) {
    const selectOption = options[index];
    if (newValue && clearable) {
      value = null;
    } else {
      value = selectOption.value;
    }
  }

  function isEqual(a: any, b: any) {
    return JSON.stringify(a) == JSON.stringify(b);
  }
</script>

<Flex class={twMerge("gap-4 flex-wrap", vertical && "flex-col items-start gap-2", className)}>
  {#each options as option, index}
    <Radio
      label={option.label}
      value={isEqual(value, option.value)}
      preventDefault
      onchange={(e) => handleChange(e, index)}
      disabled={disabled || option.disabled}
    />
  {/each}
</Flex>
