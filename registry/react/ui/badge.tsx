import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/react/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm border px-3 py-[3px] font-mono text-[10px] uppercase tracking-[0.32em] whitespace-nowrap transition-[color,background,border,box-shadow] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "border-foreground/60 bg-foreground/10 text-foreground hover:bg-foreground/15",
        secondary: "border-border/60 bg-muted/40 text-foreground/70 hover:bg-muted/50",
        destructive:
          "border-destructive/60 bg-destructive/10 text-destructive hover:bg-destructive/15 focus-visible:ring-destructive/30",
        outline: "border-border/60 text-muted-foreground hover:bg-muted/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
