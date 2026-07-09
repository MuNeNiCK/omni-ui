import { type JSX, splitProps, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { ChevronRight, MoreHorizontal } from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";

export type BreadcrumbsProps = JSX.HTMLAttributes<HTMLElement>;

function Breadcrumb(props: BreadcrumbsProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      class={cn("text-muted-foreground/70", local.class)}
      {...rest}
    />
  );
}

export type BreadcrumbListProps = JSX.OlHTMLAttributes<HTMLOListElement>;

function BreadcrumbList(props: BreadcrumbListProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ol
      data-slot="breadcrumb-list"
      class={cn(
        "flex flex-wrap items-center gap-2 break-words sm:gap-3",
        "text-xs text-muted-foreground/70",
        local.class,
      )}
      {...rest}
    />
  );
}

export type BreadcrumbsItemProps = JSX.LiHTMLAttributes<HTMLLIElement>;

function BreadcrumbItem(props: BreadcrumbsItemProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <li
      data-slot="breadcrumb-item"
      class={cn("inline-flex items-center gap-2 text-inherit", local.class)}
      {...rest}
    />
  );
}

export type BreadcrumbsLinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean;
};

function BreadcrumbLink(props: BreadcrumbsLinkProps) {
  const [local, rest] = splitProps(props, ["asChild", "class"]);
  return (
    <Dynamic
      component={local.asChild ? "span" : "a"}
      data-slot="breadcrumb-link"
      class={cn(
        "inline-flex items-center gap-2 text-muted-foreground/70 transition-colors",
        "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        local.class,
      )}
      {...rest}
    />
  );
}

export type BreadcrumbPageProps = JSX.HTMLAttributes<HTMLSpanElement>;

function BreadcrumbPage(props: BreadcrumbPageProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      class={cn("inline-flex items-center gap-2 text-xs font-medium text-foreground", local.class)}
      {...rest}
    />
  );
}

export type BreadcrumbsSeparatorProps = JSX.LiHTMLAttributes<HTMLLIElement>;

function BreadcrumbSeparator(props: BreadcrumbsSeparatorProps) {
  const [local, rest] = splitProps(props, ["children", "class"]);
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      class={cn(
        "flex items-center justify-center text-muted-foreground/50",
        "[&>svg]:size-3",
        local.class,
      )}
      {...rest}
    >
      <Show when={local.children} fallback={<ChevronRight />}>
        {local.children}
      </Show>
    </li>
  );
}

export type BreadcrumbsEllipsisProps = JSX.HTMLAttributes<HTMLSpanElement>;

function BreadcrumbEllipsis(props: BreadcrumbsEllipsisProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      class={cn("flex size-6 items-center justify-center text-muted-foreground/60", local.class)}
      {...rest}
    >
      <MoreHorizontal class="size-4" />
      <span class="sr-only">More</span>
    </span>
  );
}

const Breadcrumbs = Breadcrumb;
const BreadcrumbsItem = BreadcrumbItem;
const BreadcrumbsLink = BreadcrumbLink;
const BreadcrumbsSeparator = BreadcrumbSeparator;
const BreadcrumbsEllipsis = BreadcrumbEllipsis;

export {
  Breadcrumb,
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbsItem,
  BreadcrumbLink,
  BreadcrumbsLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbsSeparator,
  BreadcrumbEllipsis,
  BreadcrumbsEllipsis,
};
