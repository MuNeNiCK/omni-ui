"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/react/lib/utils";
import { Button } from "@/registry/react/ui/button";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex w-full min-w-0 items-stretch overflow-hidden",
        "rounded-none border border-border/60 bg-muted/35 text-foreground shadow-[var(--glass-shadow-outline)] backdrop-blur-[6px]",
        "transition-[border,background,color,box-shadow]",
        "focus-within:border-foreground focus-within:shadow-[var(--glass-shadow-outline-strong)] focus-within:ring-2 focus-within:ring-ring/35 focus-within:ring-offset-2 focus-within:ring-offset-background",
        "has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:flex-col",
        "has-[>[data-align=block-start]]:gap-1 has-[>[data-align=block-end]]:gap-1",
        "data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex items-center gap-2 bg-transparent text-xs font-medium text-muted-foreground/75",
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

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="presentation"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("button")) return;
        const control = event.currentTarget.parentElement?.querySelector<HTMLElement>(
          "[data-slot=input-group-control]",
        );
        control?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("font-medium shadow-none transition-colors", {
  variants: {
    size: {
      xs: "h-8 px-3 text-xs",
      sm: "h-9 px-3.5 text-xs",
      "icon-xs": "size-8 p-0",
      "icon-sm": "size-9 p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

function InputGroupButton({
  className,
  type = "button",
  size = "xs",
  variant = "ghost",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      data-slot="input-group-button"
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-2 bg-transparent text-xs text-muted-foreground/70",
        "[&>svg]:size-3.5 [&>svg]:opacity-70",
        className,
      )}
      {...props}
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

const InputGroupInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cn(controlClasses, className)} {...props} />
  ),
);
InputGroupInput.displayName = "InputGroupInput";

const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, rows = 3, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(controlClasses, "resize-none py-3 align-top", className)}
      {...props}
    />
  ),
);
InputGroupTextarea.displayName = "InputGroupTextarea";

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
