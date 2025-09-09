<script lang="ts">
  import { twMerge } from "tailwind-merge";
  let styleClass = $state("");
  import Ajv from "ajv";
  import { onMount } from "svelte";
  import localize from "ajv-i18n";
  const ajv = new Ajv({ allErrors: true });
  const schema = {
    type: "object",
    properties: {
      foo: { type: "integer" },
      bar: { type: "string" },
    },
    required: ["foo"],
    additionalProperties: false,
  };
  const validate = ajv.compile(schema);

  const data = {
    aa: "12",
  };

  onMount(() => {
    const valid = validate(data);
    const errors = validate.errors;
    localize.zh(validate.errors);
    console.log(errors);
  });
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<section class="flex h-screen w-screen">
  <div class="w-96 bg-green-300"></div>
  <div class="flex-1 bg-red-300"></div>
</section>
