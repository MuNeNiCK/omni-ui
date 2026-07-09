import { splitProps, type JSX } from "solid-js";
import { ChevronDownIcon } from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";

function NativeSelect(
  props: Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
    size?: "sm" | "default";
  },
) {
  const [local, rest] = splitProps(props, ["class", "size"]);
  const size = () => local.size ?? "default";

  return (
    <div
      class="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        data-size={size()}
        class={cn(
          "h-10 w-full min-w-0 appearance-none border border-border/60 bg-muted/40 px-3 py-2 pr-9 text-sm text-foreground shadow-[var(--glass-shadow-inset)] transition-[border,box-shadow] outline-none selection:bg-foreground selection:text-background disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/40",
          "hover:border-foreground/70 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          local.class,
        )}
        {...rest}
      />
      <ChevronDownIcon
        class="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption(props: JSX.OptionHTMLAttributes<HTMLOptionElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <option
      data-slot="native-select-option"
      class={cn("bg-[Canvas] text-[CanvasText]", local.class)}
      {...rest}
    />
  );
}

function NativeSelectOptGroup(props: JSX.OptgroupHTMLAttributes<HTMLOptGroupElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <optgroup
      data-slot="native-select-optgroup"
      class={cn("bg-[Canvas] text-[CanvasText]", local.class)}
      {...rest}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
