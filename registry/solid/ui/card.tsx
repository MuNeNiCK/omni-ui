import { type JSX, splitProps } from "solid-js";

import { cn } from "@/registry/solid/lib/utils";

export type CardProps = JSX.HTMLAttributes<HTMLDivElement>;

function Card(props: CardProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card"
      class={cn(
        "flex flex-col rounded-none border border-border bg-card text-card-foreground",
        local.class,
      )}
      {...rest}
    />
  );
}

export type CardHeaderProps = JSX.HTMLAttributes<HTMLDivElement>;

function CardHeader(props: CardHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-header"
      class={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 py-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] border-b border-border text-muted-foreground",
        local.class,
      )}
      {...rest}
    />
  );
}

export type CardTitleProps = JSX.HTMLAttributes<HTMLDivElement>;

function CardTitle(props: CardTitleProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-title"
      class={cn("leading-none font-semibold text-card-foreground", local.class)}
      {...rest}
    />
  );
}

export type CardDescriptionProps = JSX.HTMLAttributes<HTMLDivElement>;

function CardDescription(props: CardDescriptionProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-description"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
}

export type CardActionProps = JSX.HTMLAttributes<HTMLDivElement>;

function CardAction(props: CardActionProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-action"
      class={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", local.class)}
      {...rest}
    />
  );
}

export type CardContentProps = JSX.HTMLAttributes<HTMLDivElement>;

function CardContent(props: CardContentProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return <div data-slot="card-content" class={cn("px-6 py-6", local.class)} {...rest} />;
}

export type CardFooterProps = JSX.HTMLAttributes<HTMLDivElement>;

function CardFooter(props: CardFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-footer"
      class={cn(
        "flex items-center justify-between gap-3 border-t border-border px-6 py-4 text-muted-foreground",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
