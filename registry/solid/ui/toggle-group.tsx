import { splitProps, createContext, useContext, createSignal, type JSX } from "solid-js";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";
import { toggleVariants } from "@/registry/solid/ui/toggle";

type ToggleGroupContextValue = VariantProps<typeof toggleVariants> & {
  value: () => string | string[];
  onValueChange: (value: string) => void;
  type: "single" | "multiple";
};

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
  value: () => "",
  onValueChange: () => {},
  type: "single",
});

function useToggleGroupContext() {
  return useContext(ToggleGroupContext);
}

function ToggleGroup(
  props: {
    class?: string;
    type?: "single" | "multiple";
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
  } & JSX.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof toggleVariants>,
) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "variant",
    "size",
    "type",
    "value",
    "defaultValue",
    "onValueChange",
  ]);

  const type = () => local.type ?? "single";

  const [internalValue, setInternalValue] = createSignal<string | string[]>(
    local.defaultValue ?? (type() === "multiple" ? [] : ""),
  );

  const value = () => (local.value !== undefined ? local.value : internalValue());

  const onValueChange = (itemValue: string) => {
    if (type() === "single") {
      const newValue = value() === itemValue ? "" : itemValue;
      setInternalValue(newValue);
      local.onValueChange?.(newValue);
    } else {
      const current = Array.isArray(value()) ? (value() as string[]) : [];
      const newValue = current.includes(itemValue)
        ? current.filter((v) => v !== itemValue)
        : [...current, itemValue];
      setInternalValue(newValue);
      local.onValueChange?.(newValue);
    }
  };

  return (
    <div
      role="group"
      data-slot="toggle-group"
      data-variant={local.variant}
      data-size={local.size}
      class={cn(
        "group/toggle-group flex w-fit items-center border border-border/60 bg-muted/30",
        local.class,
      )}
      {...rest}
    >
      <ToggleGroupContext.Provider
        value={{
          variant: local.variant,
          size: local.size,
          value,
          onValueChange,
          type: type(),
        }}
      >
        {local.children}
      </ToggleGroupContext.Provider>
    </div>
  );
}

function ToggleGroupItem(
  props: {
    class?: string;
    value: string;
  } & JSX.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof toggleVariants>,
) {
  const [local, rest] = splitProps(props, ["class", "children", "variant", "size", "value"]);
  const context = useToggleGroupContext();

  const isPressed = () => {
    const val = context.value();
    if (Array.isArray(val)) {
      return val.includes(local.value);
    }
    return val === local.value;
  };

  return (
    <button
      type="button"
      role="radio"
      aria-pressed={isPressed()}
      data-slot="toggle-group-item"
      data-variant={context.variant || local.variant}
      data-size={context.size || local.size}
      data-pressed={isPressed() ? "" : undefined}
      class={toggleVariants({
        variant: context.variant || local.variant,
        size: context.size || local.size,
        className: cn(
          "min-w-0 flex-1 shrink-0 rounded-none border-l border-border/60 bg-transparent shadow-none first:border-l-0 focus:z-10 focus-visible:z-10",
          local.class,
        ),
      })}
      onClick={() => context.onValueChange(local.value)}
      {...rest}
    >
      {local.children}
    </button>
  );
}

export { ToggleGroup, ToggleGroupItem };
