import { splitProps, type ParentProps, type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";
import { Button, type ButtonProps } from "@/registry/solid/ui/button";

function InputGroup(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="input-group"
      role="group"
      class={cn(
        "group/input-group relative flex w-full min-w-0 items-stretch overflow-hidden",
        "rounded-none border border-border/60 bg-muted/35 text-foreground shadow-[var(--glass-shadow-outline)] backdrop-blur-[6px]",
        "transition-[border,background,color,box-shadow]",
        "focus-within:border-foreground focus-within:shadow-[var(--glass-shadow-outline-strong)] focus-within:ring-2 focus-within:ring-ring/35 focus-within:ring-offset-2 focus-within:ring-offset-background",
        "has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:flex-col",
        "has-[>[data-align=block-start]]:gap-1 has-[>[data-align=block-end]]:gap-1",
        "data-[disabled=true]:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex items-center gap-2 bg-transparent text-[10px] font-mono uppercase tracking-[0.32em] text-muted-foreground/75",
  {
    variants: {
      align: {
        "inline-start": "order-first border-r border-border/60 px-3 py-2",
        "inline-end": "order-last border-l border-border/60 px-3 py-2",
        "block-start": "order-first w-full border-b border-border/60 px-3 pb-2 pt-3",
        "block-end": "order-last w-full border-t border-border/60 px-3 pt-2 pb-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

function InputGroupAddon(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>> &
    VariantProps<typeof inputGroupAddonVariants>,
) {
  const [local, rest] = splitProps(props, ["class", "align"]);
  const align = () => local.align ?? "inline-start";
  return (
    <div
      role="presentation"
      data-slot="input-group-addon"
      data-align={align()}
      class={cn(inputGroupAddonVariants({ align: align() }), local.class)}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("button")) return;
        const control = event.currentTarget.parentElement?.querySelector<HTMLElement>(
          "[data-slot=input-group-control]",
        );
        control?.focus();
      }}
      {...rest}
    />
  );
}

const inputGroupButtonVariants = cva(
  "font-mono uppercase tracking-[0.28em] shadow-none transition-colors",
  {
    variants: {
      size: {
        xs: "h-8 px-3 text-[10px]",
        sm: "h-9 px-3.5 text-[10px]",
        "icon-xs": "size-8 p-0",
        "icon-sm": "size-9 p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
);

function InputGroupButton(
  props: Omit<ButtonProps, "size"> &
    VariantProps<typeof inputGroupButtonVariants> & {
      class?: string;
    },
) {
  const [local, rest] = splitProps(props, ["class", "type", "size", "variant"]);
  return (
    <Button
      type={local.type ?? "button"}
      variant={local.variant ?? "ghost"}
      class={cn(inputGroupButtonVariants({ size: local.size }), local.class)}
      data-slot="input-group-button"
      {...rest}
    />
  );
}

function InputGroupText(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLSpanElement>>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="input-group-text"
      class={cn(
        "flex items-center gap-2 bg-transparent font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/70",
        "[&>svg]:size-3.5 [&>svg]:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
}

const controlBase =
  "data-slot=input-group-control flex-1 bg-transparent px-3 text-sm text-foreground/85 placeholder:text-muted-foreground/60 outline-none disabled:opacity-50";
const controlFocus =
  "focus-visible:outline-none focus-visible:ring-0 focus-visible:text-foreground";
const controlTransition = "transition-[color,background,border,box-shadow]";
const controlBorderReset = "border-0 shadow-none rounded-none";
const controlDisabled =
  "disabled:cursor-not-allowed group-data-[disabled=true]/input-group:cursor-not-allowed";
const controlSpacing = "min-h-10";

const controlClasses = cn(
  controlBase,
  controlFocus,
  controlTransition,
  controlBorderReset,
  controlDisabled,
  controlSpacing,
);

function InputGroupInput(
  props: { class?: string; type?: string } & JSX.InputHTMLAttributes<HTMLInputElement>,
) {
  const [local, rest] = splitProps(props, ["class", "type"]);
  return <input type={local.type ?? "text"} class={cn(controlClasses, local.class)} {...rest} />;
}

function InputGroupTextarea(
  props: { class?: string; rows?: number } & JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const [local, rest] = splitProps(props, ["class", "rows"]);
  return (
    <textarea
      rows={local.rows ?? 3}
      class={cn(controlClasses, "resize-none py-3 align-top", local.class)}
      {...rest}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
