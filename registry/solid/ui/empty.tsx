import { type JSX, splitProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";

function Empty(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty"
      class={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        local.class,
      )}
      {...rest}
    />
  );
}

function EmptyHeader(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty-header"
      class={cn("flex max-w-sm flex-col items-center gap-2 text-center", local.class)}
      {...rest}
    />
  );
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type EmptyMediaProps = JSX.HTMLAttributes<HTMLDivElement> & VariantProps<typeof emptyMediaVariants>;

function EmptyMedia(props: EmptyMediaProps) {
  const [local, rest] = splitProps(props, ["class", "variant"]);
  const variant = () => local.variant ?? "default";
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant()}
      class={cn(emptyMediaVariants({ variant: variant(), className: local.class }))}
      {...rest}
    />
  );
}

function EmptyTitle(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty-title"
      class={cn("text-lg font-medium tracking-tight", local.class)}
      {...rest}
    />
  );
}

function EmptyDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty-description"
      class={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        local.class,
      )}
      {...rest}
    />
  );
}

function EmptyContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="empty-content"
      class={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
