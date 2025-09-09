<script lang="ts">
  import Render, { parse } from "./Render.svelte";
  import { type IRenderArray } from "./type";

  let compList = $state<IRenderArray>(
    parse([
      {
        type: "Div",
        value: "",
        params: {
          class: "flex items-center",
        },
        events: {},
        children: [
          {
            type: "Span",
            value: "姓名：",
            params: {},
            events: {},
          },
          {
            type: "Input",
            value: "123",
            params: {
              placeholder: "请输入姓名",
              class: "border-none",
            },
            events: {
              oninput(e) {
                console.log(e);
              },
            },
          },
        ],
      },
      {
        type: "Div",
        value: "",
        params: {
          class: "flex items-center",
        },
        events: {},
        children: [
          {
            type: "Span",
            value: "性别：",
            params: {},
            events: {},
          },
          {
            type: "Input",
            value: "男",
            params: {
              placeholder: "请输入性别",
              class: "border-none",
            },
            events: {
              oninput(e) {
                console.log(e);
              },
            },
          },
        ],
      },
    ]),
  );
</script>

<div class="p-2">
  <Render {compList} />
</div>
