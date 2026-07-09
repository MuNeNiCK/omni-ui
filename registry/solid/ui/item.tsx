import { splitProps, type ParentProps, type JSX, type ComponentProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";
import { Separator } from "@/registry/solid/ui/separator";

function ItemGroup(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      role="list"
      data-slot="item-group"
      class={cn("group/item-group flex flex-col", local.class)}
      {...rest}
    />
  );
}

function ItemSeparator(props: ComponentProps<typeof Separator>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      class={cn("my-0", local.class)}
      {...rest}
    />
  );
}

const itemVariants = cva(
  "group/item relative flex flex-wrap items-center gap-4 rounded-none border border-border/60 bg-muted/40 px-4 py-4 text-muted-foreground/85 shadow-[var(--glass-shadow-inset)] transition-[color,background,border,box-shadow] outline-none focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "hover:border-foreground/60 hover:bg-foreground/10 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        outline:
          "border-border hover:border-foreground/70 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        muted:
          "bg-muted/60 hover:bg-muted/70 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      },
      size: {
        default: "gap-4",
        sm: "gap-3 px-3 py-3",
        xs: "gap-2 px-2 py-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Item(
  props: ParentProps<
    {
      class?: string;
      asChild?: boolean;
    } & JSX.HTMLAttributes<HTMLDivElement>
  > &
    VariantProps<typeof itemVariants>,
) {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "asChild"]);
  const variant = () => local.variant ?? "default";
  const size = () => local.size ?? "default";
  return (
    <Dynamic
      component={local.asChild ? "span" : "div"}
      data-slot="item"
      data-variant={variant()}
      data-size={size()}
      class={cn(itemVariants({ variant: variant(), size: size(), className: local.class }))}
      {...rest}
    />
  );
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-10 border border-border/60 bg-muted/60 text-muted-foreground/80 [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-14 overflow-hidden border border-border/60 bg-muted/40 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function ItemMedia(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>> &
    VariantProps<typeof itemMediaVariants>,
) {
  const [local, rest] = splitProps(props, ["class", "variant"]);
  const variant = () => local.variant ?? "default";
  return (
    <div
      data-slot="item-media"
      data-variant={variant()}
      class={cn(itemMediaVariants({ variant: variant(), className: local.class }))}
      {...rest}
    />
  );
}

function ItemContent(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="item-content"
      class={cn("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", local.class)}
      {...rest}
    />
  );
}

function ItemTitle(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="item-title"
      class={cn("flex w-fit items-center gap-2 text-sm font-medium text-foreground", local.class)}
      {...rest}
    />
  );
}

function ItemDescription(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLParagraphElement>>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <p
      data-slot="item-description"
      class={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-relaxed",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class,
      )}
      {...rest}
    />
  );
}

function ItemActions(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div data-slot="item-actions" class={cn("flex items-center gap-2", local.class)} {...rest} />
  );
}

function ItemHeader(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="item-header"
      class={cn("flex basis-full items-center justify-between gap-2", local.class)}
      {...rest}
    />
  );
}

function ItemFooter(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="item-footer"
      class={cn("flex basis-full items-center justify-between gap-2", local.class)}
      {...rest}
    />
  );
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
