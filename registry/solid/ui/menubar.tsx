import { splitProps, type ComponentProps, type JSX, type ParentProps } from "solid-js";
import * as MenubarPrimitive from "@kobalte/core/menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-solid";

import { cn, omniMonoText } from "@/registry/solid/lib/utils";

function Menubar(props: ComponentProps<typeof MenubarPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      class={cn("omni-glass-inset-surface flex h-9 items-center gap-1 px-1", local.class)}
      {...rest}
    />
  );
}

function MenubarMenu(props: ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup(props: ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal(props: ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup(props: ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarTrigger(props: ComponentProps<typeof MenubarPrimitive.Trigger>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      class={cn(
        "flex items-center gap-2 px-2.5 py-1 text-muted-foreground outline-none transition-[color,background]",
        omniMonoText.compact,
        "hover:bg-muted/60 hover:text-foreground",
        "focus-visible:ring-ring/40 focus-visible:ring-2",
        "data-[expanded]:bg-foreground data-[expanded]:text-background",
        "disabled:pointer-events-none disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
}

function MenubarContent(props: ComponentProps<typeof MenubarPrimitive.Content>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        class={cn(
          "omni-glass-menu-surface z-50 min-w-[12rem] origin-[var(--kb-menu-content-transform-origin)] overflow-hidden p-1",
          "data-[expanded]:animate-in data-[expanded]:zoom-in-95 data-[expanded]:fade-in-0",
          "data-[closed]:animate-out data-[closed]:zoom-out-95 data-[closed]:fade-out-0",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          local.class,
        )}
        {...rest}
      />
    </MenubarPrimitive.Portal>
  );
}

function MenubarItem(
  props: ComponentProps<typeof MenubarPrimitive.Item> & {
    class?: string;
    inset?: boolean;
    variant?: "default" | "destructive";
  },
) {
  const [local, rest] = splitProps(props, ["class", "inset", "variant"]);
  const variant = () => local.variant ?? "default";
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={local.inset}
      data-variant={variant()}
      class={cn(
        "relative flex min-h-9 cursor-default items-center gap-3 px-3 py-2 text-muted-foreground/90 outline-none transition-[color,background]",
        omniMonoText.menu,
        "hover:bg-muted/60 hover:text-foreground data-[highlighted]:bg-muted/60 data-[highlighted]:text-foreground",
        "focus-visible:ring-ring/40 focus-visible:ring-2",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:text-muted-foreground/70",
        local.class,
      )}
      {...rest}
    />
  );
}

function MenubarCheckboxItem(props: ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  const [local, rest] = splitProps(props, ["class", "children", "checked"]);
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      class={cn(
        "relative flex min-h-9 cursor-default items-center gap-3 py-2 pl-9 pr-3 text-muted-foreground/90 outline-none transition-[color,background]",
        omniMonoText.menu,
        "hover:bg-muted/60 hover:text-foreground data-[highlighted]:bg-muted/60 data-[highlighted]:text-foreground",
        "focus-visible:ring-ring/40 focus-visible:ring-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      checked={local.checked}
      {...rest}
    >
      <span class="pointer-events-none absolute left-3 flex size-3.5 items-center justify-center text-current">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon class="size-3" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem(props: ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      class={cn(
        "relative flex min-h-9 cursor-default items-center gap-3 py-2 pl-9 pr-3 text-muted-foreground/90 outline-none transition-[color,background]",
        omniMonoText.menu,
        "hover:bg-muted/60 hover:text-foreground data-[highlighted]:bg-muted/60 data-[highlighted]:text-foreground",
        "focus-visible:ring-ring/40 focus-visible:ring-2",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <span class="pointer-events-none absolute left-3 flex size-3.5 items-center justify-center text-current">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon class="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel(
  props: ParentProps<{ class?: string; inset?: boolean } & JSX.HTMLAttributes<HTMLDivElement>>,
) {
  const [local, rest] = splitProps(props, ["class", "inset"]);
  return (
    <div
      data-slot="menubar-label"
      data-inset={local.inset}
      class={cn(
        "px-3 py-1.5 text-muted-foreground/60",
        omniMonoText.compact,
        "data-[inset]:pl-8",
        local.class,
      )}
      {...rest}
    />
  );
}

function MenubarSeparator(props: ComponentProps<typeof MenubarPrimitive.Separator>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      class={cn("-mx-1 my-1 h-px bg-border/60", local.class)}
      {...rest}
    />
  );
}

function MenubarShortcut(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLSpanElement>>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="menubar-shortcut"
      class={cn("ml-auto text-muted-foreground/60", omniMonoText.base, local.class)}
      {...rest}
    />
  );
}

function MenubarSub(props: ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger(
  props: ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "inset", "children"]);
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={local.inset}
      class={cn(
        "flex min-h-9 cursor-default items-center gap-3 px-3 py-2 text-muted-foreground/90 outline-none transition-[color,background]",
        omniMonoText.menu,
        "hover:bg-muted/60 hover:text-foreground data-[highlighted]:bg-muted/60 data-[highlighted]:text-foreground",
        "focus-visible:ring-ring/40 focus-visible:ring-2",
        "data-[expanded]:bg-muted/60 data-[expanded]:text-foreground",
        "data-[inset]:pl-8",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ChevronRightIcon class="ml-auto size-3" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent(props: ComponentProps<typeof MenubarPrimitive.SubContent>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      class={cn(
        "omni-glass-menu-surface z-50 min-w-[8rem] origin-[var(--kb-menu-content-transform-origin)] overflow-hidden p-1",
        "data-[expanded]:animate-in data-[expanded]:zoom-in-95 data-[expanded]:fade-in-0",
        "data-[closed]:animate-out data-[closed]:zoom-out-95 data-[closed]:fade-out-0",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
