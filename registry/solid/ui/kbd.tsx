import { type JSX, splitProps } from "solid-js";

import { cn } from "@/registry/solid/lib/utils";

export type KbdProps = JSX.HTMLAttributes<HTMLElement>;

function Kbd(props: KbdProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <kbd
      data-slot="kbd"
      class={cn(
        "pointer-events-none inline-flex h-6 min-w-7 items-center justify-center gap-1 rounded-none border border-border/60 bg-muted/50 px-2 font-mono text-xs text-muted-foreground/80 shadow-[var(--glass-shadow-inset)]",
        "[&_svg:not([class*='size-'])]:size-3 [&_svg]:text-foreground/70",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        local.class,
      )}
      {...rest}
    />
  );
}

export type KbdGroupProps = JSX.HTMLAttributes<HTMLElement>;

function KbdGroup(props: KbdGroupProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <kbd
      data-slot="kbd-group"
      class={cn("inline-flex items-center gap-1", local.class)}
      {...rest}
    />
  );
}

export { Kbd, KbdGroup };
