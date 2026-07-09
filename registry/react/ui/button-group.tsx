import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/react/lib/utils";
import { Separator } from "@/registry/react/ui/separator";

const buttonGroupVariants = cva(
  "isolate inline-flex w-fit items-stretch overflow-hidden rounded-none border border-border/60 bg-muted/30 shadow-[var(--glass-shadow-outline)] backdrop-blur-[6px]",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="button-group-text"
      className={cn(
        "flex min-h-10 items-center gap-3 bg-muted/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/80",
        "[&>svg]:size-3.5 [&>svg]:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      decorative
      className={cn(
        "relative !m-0 bg-transparent",
        orientation === "vertical" ? "h-auto w-px" : "h-px w-full",
        "after:absolute after:inset-0 after:content-['']",
        orientation === "vertical"
          ? "after:bg-gradient-to-b after:from-transparent after:via-border/60 after:to-transparent"
          : "after:bg-gradient-to-r after:from-transparent after:via-border/60 after:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
