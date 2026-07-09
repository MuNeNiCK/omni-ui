"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/react/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 border border-border/60 bg-muted/30 px-3 text-xs font-medium text-muted-foreground/90 transition-[border,background,color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40 data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent data-[state=on]:bg-foreground data-[state=on]:text-background",
      },
      size: {
        default: "h-10 min-w-[2.75rem]",
        sm: "h-9 min-w-[2.5rem]",
        lg: "h-11 min-w-[3rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
