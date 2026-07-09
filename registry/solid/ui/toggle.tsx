import { splitProps, type ComponentProps } from "solid-js";
import { ToggleButton } from "@kobalte/core/toggle-button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 border border-border/60 bg-muted/30 px-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/90 transition-[border,background,color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40 data-[pressed]:border-foreground data-[pressed]:bg-foreground data-[pressed]:text-background",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent data-[pressed]:bg-foreground data-[pressed]:text-background",
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

function Toggle(props: ComponentProps<typeof ToggleButton> & VariantProps<typeof toggleVariants>) {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);
  return (
    <ToggleButton
      data-slot="toggle"
      class={cn(
        toggleVariants({ variant: local.variant, size: local.size, className: local.class }),
      )}
      {...rest}
    />
  );
}

export { Toggle, toggleVariants };
