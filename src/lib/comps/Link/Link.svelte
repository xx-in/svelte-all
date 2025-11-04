<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, MouseEventHandler } from "svelte/elements";
  import { twMerge, type ClassNameValue } from "tailwind-merge";

  interface IProps extends Omit<HTMLAnchorAttributes, "class"> {
    children?: Snippet;
    class?: ClassNameValue;
    disabled?: boolean;
    type?: "default" | "primary" | "success" | "error" | "warning" | "info";
    href?: string;
  }
  const {
    children,
    class: className,
    disabled = false,
    type = "default",
    onclick,
    href,
    ...rest
  }: IProps = $props();

  const baseClass = twMerge([
    " underline-offset-4 hover:underline",
    "cursor-pointer",
    disabled && "hover:no-underline cursor-not-allowed",
  ]);

  function toTypeClass(type: IProps["type"]) {
    if (type == "default") {
      return twMerge("hover:text-blue-500", disabled && "hover:text-stone-300 text-stone-300");
    }
    if (type == "primary") {
      return twMerge("text-blue-500", disabled && "text-blue-300");
    }
    if (type == "success") {
      return twMerge("text-green-500", disabled && "text-green-300");
    }
    if (type == "error") {
      return twMerge("text-red-500", disabled && "text-red-300");
    }
    if (type == "warning") {
      return twMerge("text-orange-500", disabled && "text-orange-300");
    }
    if (type == "info") {
      return twMerge("text-gray-500", disabled && "text-gray-300");
    }
  }

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (disabled) {
      e.preventDefault();
    }
    onclick?.(e);
  };
</script>

<a class={twMerge(baseClass, toTypeClass(type), className)} {href} onclick={handleClick} {...rest}>
  {@render children?.()}
</a>
