import { splitProps, type ParentProps, type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { Dynamic } from "solid-js/web";

import { cn } from "@/registry/solid/lib/utils";
import { Separator } from "@/registry/solid/ui/separator";

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

function ButtonGroup(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>> &
    VariantProps<typeof buttonGroupVariants>,
) {
  const [local, rest] = splitProps(props, ["class", "orientation"]);
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={local.orientation}
      class={cn(buttonGroupVariants({ orientation: local.orientation }), local.class)}
      {...rest}
    />
  );
}

function ButtonGroupText(
  props: ParentProps<
    {
      class?: string;
      asChild?: boolean;
    } & JSX.HTMLAttributes<HTMLDivElement>
  >,
) {
  const [local, rest] = splitProps(props, ["class", "asChild"]);

  return (
    <Dynamic
      component={local.asChild ? "span" : "div"}
      data-slot="button-group-text"
      class={cn(
        "flex min-h-10 items-center gap-3 bg-muted/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/80",
        "[&>svg]:size-3.5 [&>svg]:opacity-70",
        local.class,
      )}
      {...rest}
    />
  );
}

function ButtonGroupSeparator(
  props: ParentProps<
    {
      class?: string;
      orientation?: "horizontal" | "vertical";
    } & JSX.HTMLAttributes<HTMLDivElement>
  >,
) {
  const [local, rest] = splitProps(props, ["class", "orientation"]);
  const orientation = () => local.orientation ?? "vertical";
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation()}
      decorative
      class={cn(
        "relative !m-0 bg-transparent",
        orientation() === "vertical" ? "h-auto w-px" : "h-px w-full",
        "after:absolute after:inset-0 after:content-['']",
        orientation() === "vertical"
          ? "after:bg-gradient-to-b after:from-transparent after:via-border/60 after:to-transparent"
          : "after:bg-gradient-to-r after:from-transparent after:via-border/60 after:to-transparent",
        local.class,
      )}
      {...rest}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
