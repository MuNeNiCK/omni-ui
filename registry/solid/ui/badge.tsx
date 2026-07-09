import { type JSX, splitProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-sm border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,background,border,box-shadow] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "border-foreground/60 bg-foreground/10 text-foreground hover:bg-foreground/15",
        secondary: "border-border/60 bg-muted/40 text-foreground/70 hover:bg-muted/50",
        destructive:
          "border-destructive/60 bg-destructive/10 text-destructive hover:bg-destructive/15 focus-visible:ring-destructive/30",
        outline: "border-border/60 text-muted-foreground hover:bg-muted/30",
        ghost: "border-transparent bg-transparent text-muted-foreground hover:text-foreground",
        link: "border-transparent bg-transparent px-1 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = JSX.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

function Badge(props: BadgeProps) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <span
      data-slot="badge"
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  );
}

export { Badge, badgeVariants };
