import { splitProps, type ComponentProps, type JSX, type ParentProps } from "solid-js";
import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-solid";

import { cn, omniMonoText } from "@/registry/solid/lib/utils";

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive.Root>;

function DropdownMenu(props: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal(props: ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

export type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.Trigger>;

function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

export type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive.Content>;

function DropdownMenuContent(props: DropdownMenuContentProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        class={cn(
          "z-50 max-h-[var(--kb-popper-content-available-height)] min-w-[10rem] origin-[var(--kb-menu-content-transform-origin)] overflow-hidden p-1",
          "omni-glass-surface",
          "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 data-[closed]:animate-out data-[closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          local.class,
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export type DropdownMenuGroupProps = ComponentProps<typeof DropdownMenuPrimitive.Group>;

function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

const itemBase = cn(
  "relative flex min-h-9 cursor-default items-center gap-3 px-3 py-2 text-muted-foreground/90 outline-hidden transition-[background,color] data-[disabled]:pointer-events-none data-[disabled]:opacity-40 rounded-none",
  omniMonoText.menu,
);

export type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  class?: string;
  inset?: boolean;
  variant?: "default" | "destructive";
};

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const [local, rest] = splitProps(props, ["class", "inset", "variant"]);
  const variant = () => local.variant ?? "default";
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={local.inset}
      data-variant={variant()}
      class={cn(
        itemBase,
        "hover:bg-foreground hover:text-background",
        variant() === "destructive" &&
          "text-destructive hover:bg-destructive hover:text-background",
        local.inset && "pl-9",
        local.class,
      )}
      {...rest}
    />
  );
}

export type DropdownMenuCheckboxItemProps = ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

function DropdownMenuCheckboxItem(props: DropdownMenuCheckboxItemProps) {
  const [local, rest] = splitProps(props, ["class", "children", "checked"]);
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      class={cn(itemBase, "pl-9 hover:bg-foreground hover:text-background", local.class)}
      checked={local.checked}
      {...rest}
    >
      <span class="pointer-events-none absolute left-3 flex size-3.5 items-center justify-center text-current">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon class="size-3.5" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export type DropdownMenuRadioGroupProps = ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>;

function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

export type DropdownMenuRadioItemProps = ComponentProps<typeof DropdownMenuPrimitive.RadioItem>;

function DropdownMenuRadioItem(props: DropdownMenuRadioItemProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      class={cn(itemBase, "pl-9 hover:bg-foreground hover:text-background", local.class)}
      {...rest}
    >
      <span class="pointer-events-none absolute left-3 flex size-3.5 items-center justify-center text-current">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon class="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel(
  props: ParentProps<{ class?: string; inset?: boolean } & JSX.HTMLAttributes<HTMLDivElement>>,
) {
  const [local, rest] = splitProps(props, ["class", "inset"]);
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={local.inset}
      class={cn(
        "px-3 py-2 text-muted-foreground/70",
        omniMonoText.wide,
        local.inset && "pl-9",
        local.class,
      )}
      {...rest}
    />
  );
}

export type DropdownMenuGroupLabelProps = ComponentProps<
  typeof DropdownMenuPrimitive.GroupLabel
> & {
  inset?: boolean;
};

function DropdownMenuGroupLabel(props: DropdownMenuGroupLabelProps) {
  const [local, rest] = splitProps(props, ["class", "inset"]);
  return (
    <DropdownMenuPrimitive.GroupLabel
      as="div"
      data-slot="dropdown-menu-label"
      data-inset={local.inset}
      class={cn(
        "px-3 py-2 text-muted-foreground/70",
        omniMonoText.wide,
        local.inset && "pl-9",
        local.class,
      )}
      {...rest}
    />
  );
}

export type DropdownMenuItemLabelProps = ComponentProps<typeof DropdownMenuPrimitive.ItemLabel> & {
  inset?: boolean;
};

function DropdownMenuItemLabel(props: DropdownMenuItemLabelProps) {
  const [local, rest] = splitProps(props, ["class", "inset"]);
  return (
    <DropdownMenuPrimitive.ItemLabel
      data-slot="dropdown-menu-item-label"
      data-inset={local.inset}
      class={cn("px-3 py-2 text-foreground", omniMonoText.menu, local.inset && "pl-9", local.class)}
      {...rest}
    />
  );
}

export type DropdownMenuSeparatorProps = ComponentProps<typeof DropdownMenuPrimitive.Separator>;

function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      class={cn(
        "pointer-events-none -mx-1 my-1 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent",
        local.class,
      )}
      {...rest}
    />
  );
}

export type DropdownMenuShortcutProps = ParentProps<
  { class?: string } & JSX.HTMLAttributes<HTMLSpanElement>
>;

function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      class={cn("ml-auto text-muted-foreground/70", omniMonoText.wide, local.class)}
      {...rest}
    />
  );
}

export type DropdownMenuSubProps = ComponentProps<typeof DropdownMenuPrimitive.Sub>;

function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

export type DropdownMenuSubTriggerProps = ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};

function DropdownMenuSubTrigger(props: DropdownMenuSubTriggerProps) {
  const [local, rest] = splitProps(props, ["class", "inset", "children"]);
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={local.inset}
      class={cn(
        itemBase,
        "hover:bg-foreground hover:text-background",
        local.inset && "pl-9",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ChevronRightIcon class="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuPrimitive.SubContent>;

function DropdownMenuSubContent(props: DropdownMenuSubContentProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      class={cn(
        "z-50 min-w-[10rem] origin-[var(--kb-menu-content-transform-origin)] overflow-hidden p-1",
        "omni-glass-surface",
        "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 data-[closed]:animate-out data-[closed]:zoom-out-95",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuItemLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
