import { splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import { CircleIcon } from "lucide-solid";
import { cn } from "@/registry/solid/lib/utils";

export type RadioGroupProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof RadioGroupPrimitive.Root<T>
>;

function RadioGroup<T extends ValidComponent = "div">(props: RadioGroupProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      class={cn("grid gap-3", local.class)}
      {...rest}
    />
  );
}

export type RadioGroupItemsProps = ComponentProps<"div">;

function RadioGroupItems(props: RadioGroupItemsProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      role="presentation"
      data-slot="radio-group-items"
      class={cn("flex gap-3", local.class)}
      {...rest}
    />
  );
}

export type RadioGroupItemProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof RadioGroupPrimitive.Item<T>
>;

function RadioGroupItem<T extends ValidComponent = "div">(props: RadioGroupItemProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children", "value", "id"]);
  return (
    <RadioGroupPrimitive.Item data-slot="radio-group-item" value={local.value} {...rest}>
      <RadioGroupPrimitive.ItemInput id={local.id} />
      <RadioGroupPrimitive.ItemControl
        data-slot="radio-group-item-control"
        class={cn(
          "flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-foreground/80 shadow-[var(--glass-shadow-inset)] transition-[border,background,color,box-shadow] outline-none",
          "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40",
          "data-[checked]:border-foreground",
          "disabled:cursor-not-allowed disabled:opacity-40",
          local.class,
        )}
      >
        <RadioGroupPrimitive.ItemIndicator
          data-slot="radio-group-indicator"
          class="flex items-center justify-center"
        >
          <CircleIcon class="size-2 fill-foreground text-foreground" />
        </RadioGroupPrimitive.ItemIndicator>
      </RadioGroupPrimitive.ItemControl>
      {local.children}
    </RadioGroupPrimitive.Item>
  );
}

export type RadioGroupItemInputProps<T extends ValidComponent = "input"> = ComponentProps<
  typeof RadioGroupPrimitive.ItemInput<T>
>;

function RadioGroupItemInput<T extends ValidComponent = "input">(
  props: RadioGroupItemInputProps<T>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <RadioGroupPrimitive.ItemInput
      data-slot="radio-group-item-input"
      class={cn("peer/radio-group", local.class)}
      {...rest}
    />
  );
}

export type RadioGroupItemControlProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof RadioGroupPrimitive.ItemControl<T>
>;

function RadioGroupItemControl<T extends ValidComponent = "div">(
  props: RadioGroupItemControlProps<T>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <RadioGroupPrimitive.ItemControl
      data-slot="radio-group-item-control"
      class={cn(
        "flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-foreground/80 shadow-[var(--glass-shadow-inset)] transition-[border,background,color,box-shadow] outline-none",
        "peer-focus-visible/radio-group:border-foreground peer-focus-visible/radio-group:ring-2 peer-focus-visible/radio-group:ring-ring/40 peer-focus-visible/radio-group:ring-offset-2 peer-focus-visible/radio-group:ring-offset-background",
        "data-[invalid]:border-destructive dark:data-[invalid]:ring-destructive/40 data-[invalid]:ring-destructive/20",
        "data-[checked]:border-foreground",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
        local.class,
      )}
      {...rest}
    />
  );
}

export type RadioGroupItemIndicatorProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof RadioGroupPrimitive.ItemIndicator<T>
>;

function RadioGroupItemIndicator<T extends ValidComponent = "div">(
  props: RadioGroupItemIndicatorProps<T>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <RadioGroupPrimitive.ItemIndicator
      forceMount
      data-slot="radio-group-item-indicator"
      class={cn("flex items-center justify-center", local.class)}
      {...rest}
    >
      <CircleIcon class="size-2 fill-foreground text-foreground" />
    </RadioGroupPrimitive.ItemIndicator>
  );
}

export type RadioGroupLabelProps<T extends ValidComponent = "span"> = ComponentProps<
  typeof RadioGroupPrimitive.Label<T>
>;

function RadioGroupLabel<T extends ValidComponent = "span">(props: RadioGroupLabelProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <RadioGroupPrimitive.Label
      forceMount
      data-slot="radio-group-label"
      class={cn("text-sm font-medium select-none", local.class)}
      {...rest}
    />
  );
}

export type RadioGroupItemLabelProps<T extends ValidComponent = "span"> = ComponentProps<
  typeof RadioGroupPrimitive.ItemLabel<T>
>;

function RadioGroupItemLabel<T extends ValidComponent = "span">(
  props: RadioGroupItemLabelProps<T>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <RadioGroupPrimitive.ItemLabel
      forceMount
      data-slot="radio-group-item-label"
      class={cn("text-sm font-medium select-none data-[invalid]:text-destructive", local.class)}
      {...rest}
    />
  );
}

export type RadioGroupDescriptionProps<T extends ValidComponent = "span"> = ComponentProps<
  typeof RadioGroupPrimitive.Description<T>
>;

function RadioGroupDescription<T extends ValidComponent = "span">(
  props: RadioGroupDescriptionProps<T>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <RadioGroupPrimitive.Description
      forceMount
      data-slot="radio-group-description"
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
}

export type RadioGroupErrorMessageProps<T extends ValidComponent = "span"> = ComponentProps<
  typeof RadioGroupPrimitive.ErrorMessage<T>
>;

function RadioGroupErrorMessage<T extends ValidComponent = "span">(
  props: RadioGroupErrorMessageProps<T>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <RadioGroupPrimitive.ErrorMessage
      forceMount
      data-slot="radio-group-error-message"
      class={cn("text-sm text-destructive", local.class)}
      {...rest}
    />
  );
}

export {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupErrorMessage,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupItems,
  RadioGroupLabel,
  type RadioGroupDescriptionProps,
  type RadioGroupErrorMessageProps,
  type RadioGroupItemControlProps,
  type RadioGroupItemIndicatorProps,
  type RadioGroupItemInputProps,
  type RadioGroupItemLabelProps,
  type RadioGroupItemProps,
  type RadioGroupItemsProps,
  type RadioGroupLabelProps,
  type RadioGroupProps,
};
