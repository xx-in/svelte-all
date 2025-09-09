<script lang="ts">
  import { twMerge } from "tailwind-merge";

  let list = $state([
    ["5", "3", "", "", "7", "", "", "", ""],
    ["6", "", "", "1", "9", "5", "", "", ""],
    ["", "9", "8", "", "", "", "", "6", ""],
    ["8", "", "", "", "6", "", "", "", "3"],
    ["4", "", "", "8", "", "3", "", "", "1"],
    ["7", "", "", "", "2", "", "", "", "6"],
    ["", "6", "", "", "", "", "2", "8", ""],
    ["", "", "", "4", "1", "9", "", "", "5"],
    ["", "", "", "", "8", "", "", "7", "9"],
  ]);

  function range(n: number) {
    return Array.from({ length: n }).map((_, i) => i);
  }

  function getPlaceHolder(row_index: number, col_index: number) {
    const sameRowList = [...list[row_index]]; // 当前行的数字
    const sameColList = list.map((row) => row[col_index]); // 当前列的数字
    let top = Math.floor(row_index / 3) * 3;
    let left = Math.floor(col_index / 3) * 3;

    const sameMatrix: string[] = []; // 当前矩阵的数字

    for (let i of range(3)) {
      for (let j of range(3)) {
        sameMatrix.push(list[top + i][left + j]);
      }
    }
    const usedNumbers = new Set([...sameRowList, ...sameColList, ...sameMatrix]);

    // 过滤掉已用的数字并返回可选数字
    let optional_numbers = "123456789";
    for (let num of usedNumbers) {
      optional_numbers = optional_numbers.replace(num, "");
    }
    if (optional_numbers.length >= 3) {
      return "";
    }
    return optional_numbers.split("").join(",");
  }

  function handleReset() {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        list[i][j] = "";
      }
    }
    isDone = false;
  }

  function toMatrixColor(row: number, col: number) {
    let top = Math.floor(row / 3) * 3;
    let left = Math.floor(col / 3) * 3;
    let colors = {
      "0-0": "bg-red-700",
      "0-3": "bg-orange-700",
      "0-6": "bg-yellow-700",
      "3-0": "bg-green-700",
      "3-3": "bg-cyan-700",
      "3-6": "bg-blue-700",
      "6-0": "bg-purple-700",
      "6-3": "bg-pink-700",
      "6-6": "bg-gray-700",
    };
    // @ts-ignore
    return colors[top + "-" + left];
  }

  let isDone = $state(false);
  function handleResolve() {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {
        if (list[i][j]) {
          continue;
        }
        const value = getPlaceHolder(i, j);

        if (value.length == 1) {
          list[i][j] = value;
        }
      }
    }
    if (list.every((row) => row.every((col) => col))) {
      isDone = true;
    }
  }
</script>

<svelte:head>
  <title>数独九宫格</title>
</svelte:head>
<h1 class="my-10 text-center text-2xl font-bold">简单难度数独九宫格</h1>
<div class="flex w-screen justify-center text-white">
  <div class=" inline-grid grid-cols-9 justify-start gap-2">
    {#each list as row, row_index}
      {#each row as col, col_index}
        <input
          class={twMerge(
            "flex size-10 items-center justify-center rounded-sm text-center shadow",
            toMatrixColor(row_index, col_index),
          )}
          maxlength="1"
          placeholder={getPlaceHolder(row_index, col_index)}
          bind:value={list[row_index][col_index]}
        />
      {/each}
    {/each}
  </div>
</div>
<div class="mt-10 flex items-center justify-center gap-4 text-white">
  <button onclick={handleReset} class="cursor-pointer rounded-xl bg-red-500 px-4 py-2">清空</button>

  {#if isDone}
    <button class="cursor-pointer rounded-xl bg-green-500 px-4 py-2">已完成</button>
  {:else}
    <button onclick={handleResolve} class="cursor-pointer rounded-xl bg-blue-500 px-4 py-2"
      >下一步</button
    >
  {/if}
</div>
