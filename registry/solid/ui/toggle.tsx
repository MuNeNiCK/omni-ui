import { splitProps, type ComponentProps } from "solid-js";
import { ToggleButton as ToggleButtonPrimitive } from "@kobalte/core/toggle-button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";

const toggleButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 border border-border/60 bg-muted/30 px-3 text-xs font-medium text-muted-foreground/90 transition-[border,background,color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40 data-[pressed]:border-foreground data-[pressed]:bg-foreground data-[pressed]:text-background",
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

export type ToggleButtonProps = ComponentProps<typeof ToggleButtonPrimitive> &
  VariantProps<typeof toggleButtonVariants>;

function ToggleButton(props: ToggleButtonProps) {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);
  return (
    <ToggleButtonPrimitive
      data-slot="toggle"
      class={cn(
        toggleButtonVariants({ variant: local.variant, size: local.size, className: local.class }),
      )}
      {...rest}
    />
  );
}

const Toggle = ToggleButton;
const toggleVariants = toggleButtonVariants;

export { Toggle, ToggleButton, toggleButtonVariants, toggleVariants };
