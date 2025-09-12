<script lang="ts">
  import { typedKeys } from "$lib/utils";
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";
  import z from "zod";
  // import { zhCNErrorMap } from "./zh";
  import { zhCN } from "zod/locales";

  let styleClass = $state("");

  z.config(zhCN());
  const Schema = z.object({
    string: z.coerce.string().min(5).max(5).meta({
      type: "text",
    }),
    number: z.coerce.number().min(0).max(10).meta({
      type: "number",
    }),
    boolean: z.coerce.boolean().meta({
      type: "boolean",
    }),
  });

  type ISchema = z.infer<typeof Schema>;

  /**
   * 校验数据
   *
   */
  function handleValidate(input: ISchema) {
    try {
      Schema.parse(input);
      typedKeys(issues).forEach((key) => {
        issues[key] = "";
      });
    } catch (err) {
      const errIssues = (err as z.ZodError).issues;
      errIssues.forEach((item) => {
        // @ts-ignore
        issues[item.path] = item.message;
      });
    }
  }

  let inputValue = $state({
    string: "",
    number: 0,
    boolean: false,
  });

  let issues = $state({
    string: "",
    number: "",
    boolean: "",
  });

  $effect(() => {
    handleValidate(inputValue);
  });

  // $inspect(inputValue);

  function inputType(value: unknown) {
    const type = typeof value;
    if (type == "number") {
      return "number";
    }
    return "text";
  }

  onMount(async () => {});
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<section class="flex h-[100dvh] w-screen">
  <div class="flex w-96 flex-col gap-2 bg-green-300">
    {#each typedKeys(inputValue) as key}
      <div class="">
        <label>{key}:</label>
        <input
          bind:value={inputValue[key]}
          class="border border-black"
          type={inputType(inputValue[key])}
        />
        <div class="text-sm text-red-500">{issues[key]}</div>
      </div>
    {/each}
  </div>
  <div class="flex-1 bg-red-300"></div>
</section>
