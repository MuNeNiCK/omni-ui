import type { Component, ComponentProps, ParentProps, VoidProps } from "solid-js";
import { splitProps } from "solid-js";

import type { DialogRootProps } from "@kobalte/core/dialog";
import * as CommandPrimitive from "cmdk-solid";
import { SearchIcon } from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/solid/ui/dialog";

export type CommandProps = ParentProps<CommandPrimitive.CommandRootProps>;

const Command: Component<CommandProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.CommandRoot
      data-slot="command"
      class={cn(
        "flex h-full w-full flex-col overflow-hidden text-foreground backdrop-blur-[10px]",
        "omni-glass-inset-surface",
        local.class,
      )}
      {...others}
    />
  );
};

export type CommandDialogProps = ParentProps<
  DialogRootProps & { title?: string; description?: string }
>;

const CommandDialog: Component<CommandDialogProps> = (props) => {
  const [local, others] = splitProps(props, ["children", "title", "description"]);
  return (
    <Dialog {...others}>
      <DialogHeader class="sr-only">
        <DialogTitle>{local.title ?? "Command Palette"}</DialogTitle>
        <DialogDescription>{local.description ?? "Search for a command to run…"}</DialogDescription>
      </DialogHeader>
      <DialogContent
        class={cn(
          "overflow-hidden border border-border/60 bg-muted/30 p-0 text-foreground shadow-[var(--glass-shadow-outline-heavy)] backdrop-blur-[12px]",
          "rounded-none",
        )}
      >
        <Command class="border-0 bg-transparent shadow-none backdrop-blur-none">
          {local.children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export type CommandInputProps = VoidProps<CommandPrimitive.CommandInputProps>;

const CommandInput: Component<CommandInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "aria-label", "placeholder"]);
  const inputLabel = () =>
    local["aria-label"] ??
    (typeof local.placeholder === "string" ? local.placeholder : "Search commands");

  return (
    <div
      data-slot="command-input-wrapper"
      class="flex h-11 items-center gap-2.5 border-b border-border/60 bg-muted/40 px-3 transition-[border,box-shadow] focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring/40"
    >
      <SearchIcon class="size-4 shrink-0 opacity-50" aria-hidden="true" />
      <CommandPrimitive.CommandInput
        aria-label={inputLabel()}
        data-slot="command-input"
        placeholder={local.placeholder}
        class={cn(
          "flex h-full w-full bg-transparent text-sm text-foreground/90 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-40",
          local.class,
        )}
        {...others}
      />
    </div>
  );
};

export type CommandListProps = ParentProps<CommandPrimitive.CommandListProps>;

const CommandList: Component<CommandListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.CommandList
      data-slot="command-list"
      class={cn("max-h-[320px] scroll-py-1 overflow-x-hidden overflow-y-auto", local.class)}
      {...others}
    />
  );
};

export type CommandEmptyProps = ParentProps<CommandPrimitive.CommandEmptyProps>;

const CommandEmpty: Component<CommandEmptyProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.CommandEmpty
      data-slot="command-empty"
      class={cn("py-6 text-center text-xs text-muted-foreground", local.class)}
      {...others}
    />
  );
};

export type CommandGroupProps = ParentProps<CommandPrimitive.CommandGroupProps>;

const CommandGroup: Component<CommandGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.CommandGroup
      data-slot="command-group"
      class={cn(
        "overflow-hidden px-1 py-1 text-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        local.class,
      )}
      {...others}
    />
  );
};

export type CommandSeparatorProps = VoidProps<CommandPrimitive.CommandSeparatorProps>;

const CommandSeparator: Component<CommandSeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.CommandSeparator
      data-slot="command-separator"
      class={cn(
        "pointer-events-none -mx-1 my-1 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent",
        local.class,
      )}
      {...others}
    />
  );
};

export type CommandItemProps = ParentProps<CommandPrimitive.CommandItemProps>;

const CommandItem: Component<CommandItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.CommandItem
      data-slot="command-item"
      cmdk-item=""
      class={cn(
        "relative flex min-h-10 cursor-default select-none items-center gap-2.5 px-3 py-2.5 text-sm leading-normal text-muted-foreground/85 outline-hidden transition-[background,color] [&_*]:leading-normal",
        "data-[selected=true]:bg-foreground data-[selected=true]:text-background",
        "data-[selected=true]:[&_[data-slot=command-shortcut]]:text-background/70",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "rounded-none",
        local.class,
      )}
      {...others}
    />
  );
};

export type CommandShortcutProps = ComponentProps<"span">;

const CommandShortcut: Component<CommandShortcutProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="command-shortcut"
      class={cn(
        "ml-auto font-mono text-xs text-muted-foreground/70 transition-colors",
        local.class,
      )}
      {...others}
    />
  );
};

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
