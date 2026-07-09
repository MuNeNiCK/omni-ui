import { splitProps, type ComponentProps, type JSX, type ParentProps } from "solid-js";
import * as ComboboxPrimitive from "@kobalte/core/combobox";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-solid";
import { cn } from "@/registry/solid/lib/utils";

const ComboboxPortal = ComboboxPrimitive.Portal;

export type ComboboxProps<Option, OptGroup = never> = ComboboxPrimitive.ComboboxRootProps<
  Option,
  OptGroup
>;

function Combobox<Option, OptGroup = never>(props: ComboboxProps<Option, OptGroup>) {
  return <ComboboxPrimitive.Root data-slot="combobox" {...props} />;
}

export type ComboboxTriggerProps = ComponentProps<typeof ComboboxPrimitive.Trigger> & {
  placeholder?: JSX.Element | string;
  hideIndicator?: boolean;
  size?: "sm" | "default";
};

function ComboboxTrigger(props: ComboboxTriggerProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "placeholder",
    "hideIndicator",
    "size",
  ]);
  const showPlaceholder = () =>
    local.children === undefined || local.children === null || local.children === "";
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      data-size={local.size ?? "default"}
      data-placeholder={showPlaceholder() ? "true" : undefined}
      class={cn(
        "inline-flex w-fit items-center justify-between gap-2 px-3 text-xs text-foreground/85 transition-[border,background,color,box-shadow] outline-none",
        "omni-glass-surface",
        "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/35",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[placeholder=true]:text-muted-foreground/70",
        "data-[size=default]:h-10 data-[size=default]:min-w-[10rem]",
        "data-[size=sm]:h-9 data-[size=sm]:min-w-[8rem]",
        local.class,
      )}
      {...rest}
    >
      <span class="truncate text-left leading-none">
        {showPlaceholder() ? local.placeholder : local.children}
      </span>
      {local.hideIndicator ? null : (
        <ComboboxPrimitive.Icon>
          <ChevronsUpDownIcon class="size-3.5 shrink-0 opacity-60" />
        </ComboboxPrimitive.Icon>
      )}
    </ComboboxPrimitive.Trigger>
  );
}

export type ComboboxContentProps = ComponentProps<typeof ComboboxPrimitive.Content>;

function ComboboxContent(props: ComboboxContentProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Content
        data-slot="combobox-content"
        class={cn(
          "relative z-50 max-h-[var(--kb-popper-content-available-height)] min-w-[12rem] origin-[var(--kb-combobox-content-transform-origin)] overflow-hidden",
          "omni-glass-surface",
          "data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class,
        )}
        {...rest}
      >
        <ComboboxPrimitive.Listbox class="p-1" />
      </ComboboxPrimitive.Content>
    </ComboboxPrimitive.Portal>
  );
}

export type ComboboxInputProps = ComponentProps<typeof ComboboxPrimitive.Input> & {
  showTrigger?: boolean;
};

function ComboboxInput(props: ComboboxInputProps) {
  const [local, rest] = splitProps(props, ["class", "showTrigger", "disabled", "children"]);
  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={cn(
        "inline-flex h-10 w-full min-w-0 items-center border border-border/60 bg-muted/40 transition-[border,box-shadow] focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring/40",
        "rounded-none",
      )}
    >
      <ComboboxPrimitive.Input
        data-slot="combobox-input"
        disabled={local.disabled}
        class={cn(
          "h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground/90 outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-50",
          local.class,
        )}
        {...rest}
      />
      {(local.showTrigger ?? true) && (
        <ComboboxTrigger
          disabled={local.disabled}
          hideIndicator
          class="h-full min-w-0 border-0 bg-transparent px-2"
        >
          <ChevronsUpDownIcon class="size-3.5 opacity-60" />
        </ComboboxTrigger>
      )}
      {local.children}
    </ComboboxPrimitive.Control>
  );
}

export type ComboboxControlProps<Option = unknown> = ComponentProps<
  typeof ComboboxPrimitive.Control<Option>
>;

function ComboboxControl<Option = unknown>(props: ComboboxControlProps<Option>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={cn(
        "inline-flex h-10 w-full min-w-0 items-center border border-border/60 bg-muted/40 transition-[border,box-shadow] focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring/40",
        "rounded-none",
        local.class,
      )}
      {...rest}
    />
  );
}

export type ComboboxListProps = ComponentProps<typeof ComboboxPrimitive.Listbox>;

function ComboboxList(props: ComboboxListProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ComboboxPrimitive.Listbox
      data-slot="combobox-list"
      class={cn("max-h-72 scroll-py-1 overflow-y-auto overflow-x-hidden p-1", local.class)}
      {...rest}
    />
  );
}

export type ComboboxEmptyProps = JSX.HTMLAttributes<HTMLDivElement> & { class?: string };

function ComboboxEmpty(props: ComboboxEmptyProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="combobox-empty"
      class={cn("py-6 text-center text-xs text-muted-foreground/70", local.class)}
      {...rest}
    />
  );
}

export type ComboboxSectionProps = ParentProps<
  { class?: string } & JSX.HTMLAttributes<HTMLDivElement>
>;

function ComboboxSection(props: ComboboxSectionProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="combobox-section"
      role="group"
      class={cn("overflow-hidden py-1", local.class)}
      {...rest}
    />
  );
}

const ComboboxGroup = ComboboxSection;

export type ComboboxSeparatorProps = ParentProps<
  { class?: string } & JSX.HTMLAttributes<HTMLDivElement>
>;

function ComboboxSeparator(props: ComboboxSeparatorProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="combobox-separator"
      role="separator"
      class={cn(
        "pointer-events-none -mx-1 my-1 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent",
        local.class,
      )}
      {...rest}
    />
  );
}

export type ComboboxItemProps = ComponentProps<typeof ComboboxPrimitive.Item>;

function ComboboxItem(props: ComboboxItemProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      class={cn(
        "relative flex min-h-11 w-full cursor-default items-start gap-3 px-3 py-3 text-sm leading-normal text-muted-foreground/85 outline-hidden select-none transition-[background,color]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        "hover:bg-foreground hover:text-background",
        "data-[highlighted]:bg-foreground data-[highlighted]:text-background",
        "data-[selected]:bg-foreground data-[selected]:text-background",
        "rounded-none",
        local.class,
      )}
      {...rest}
    >
      <span class="mt-0.5 flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
        <ComboboxPrimitive.ItemIndicator>
          <CheckIcon class="size-3.5" />
        </ComboboxPrimitive.ItemIndicator>
      </span>
      <ComboboxPrimitive.ItemLabel class="min-w-0 flex-1 text-left leading-normal [&_*]:leading-normal">
        {local.children}
      </ComboboxPrimitive.ItemLabel>
    </ComboboxPrimitive.Item>
  );
}

export type ComboboxItemLabelProps = ComponentProps<typeof ComboboxPrimitive.ItemLabel>;

function ComboboxItemLabel(props: ComboboxItemLabelProps) {
  return <ComboboxPrimitive.ItemLabel data-slot="combobox-item-label" {...props} />;
}

export type ComboboxDescriptionProps = ComponentProps<typeof ComboboxPrimitive.Description>;

function ComboboxDescription(props: ComboboxDescriptionProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ComboboxPrimitive.Description
      data-slot="combobox-description"
      class={cn("text-sm text-muted-foreground data-[disabled]:opacity-50", local.class)}
      {...rest}
    />
  );
}

export type ComboboxLabelProps = ComponentProps<typeof ComboboxPrimitive.Label>;

function ComboboxLabel(props: ComboboxLabelProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-label"
      class={cn("px-3 py-2 text-xs font-medium text-muted-foreground/90", local.class)}
      {...rest}
    />
  );
}

export type ComboboxErrorMessageProps = ComponentProps<typeof ComboboxPrimitive.ErrorMessage>;

function ComboboxErrorMessage(props: ComboboxErrorMessageProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ComboboxPrimitive.ErrorMessage
      data-slot="combobox-error-message"
      class={cn("text-sm text-destructive data-[disabled]:opacity-50", local.class)}
      {...rest}
    />
  );
}

export type ComboboxValueProps = ComponentProps<"span">;

function ComboboxValue(props: ComboboxValueProps) {
  return <span data-slot="combobox-value" {...props} />;
}

export type ComboboxCollectionProps = ComponentProps<"div">;

function ComboboxCollection(props: ComboboxCollectionProps) {
  return <div data-slot="combobox-collection" {...props} />;
}

export type ComboboxChipsProps = ComponentProps<"div">;

function ComboboxChips(props: ComboboxChipsProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="combobox-chips"
      class={cn(
        "flex min-h-10 flex-wrap items-center gap-1.5 border border-border/60 bg-muted/40 px-2.5 py-1.5 text-sm transition-[border,box-shadow] focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring/40",
        "rounded-none",
        local.class,
      )}
      {...rest}
    />
  );
}

export type ComboboxChipProps = ComponentProps<"span"> & {
  showRemove?: boolean;
};

function ComboboxChip(props: ComboboxChipProps) {
  const [local, rest] = splitProps(props, ["class", "children", "showRemove"]);
  return (
    <span
      data-slot="combobox-chip"
      class={cn(
        "inline-flex h-6 w-fit items-center justify-center gap-1 border border-foreground/30 bg-foreground/10 px-2 text-xs font-medium text-foreground",
        "rounded-none",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      {(local.showRemove ?? true) && (
        <button
          type="button"
          data-slot="combobox-chip-remove"
          class="-mr-1 inline-flex size-5 items-center justify-center opacity-70 hover:opacity-100"
        >
          <XIcon class="size-3" />
        </button>
      )}
    </span>
  );
}

export type ComboboxChipsInputProps = ComponentProps<typeof ComboboxPrimitive.Input>;

function ComboboxChipsInput(props: ComboboxChipsInputProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      class={cn("min-w-16 flex-1 bg-transparent outline-none", local.class)}
      {...rest}
    />
  );
}

function useComboboxAnchor() {
  return undefined;
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxControl,
  ComboboxDescription,
  ComboboxEmpty,
  ComboboxErrorMessage,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxSection,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
