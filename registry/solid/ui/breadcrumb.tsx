import { type JSX, splitProps, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { ChevronRight, MoreHorizontal } from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";

function Breadcrumb(props: JSX.HTMLAttributes<HTMLElement>) {
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

function BreadcrumbList(props: JSX.OlHTMLAttributes<HTMLOListElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ol
      data-slot="breadcrumb-list"
      class={cn(
        "flex flex-wrap items-center gap-2 break-words sm:gap-3",
        "font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/70",
        local.class,
      )}
      {...rest}
    />
  );
}

function BreadcrumbItem(props: JSX.LiHTMLAttributes<HTMLLIElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <li
      data-slot="breadcrumb-item"
      class={cn("inline-flex items-center gap-2 text-inherit", local.class)}
      {...rest}
    />
  );
}

type BreadcrumbLinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean;
};

function BreadcrumbLink(props: BreadcrumbLinkProps) {
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

function BreadcrumbPage(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      class={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.36em] text-foreground",
        local.class,
      )}
      {...rest}
    />
  );
}

function BreadcrumbSeparator(props: JSX.LiHTMLAttributes<HTMLLIElement>) {
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

function BreadcrumbEllipsis(props: JSX.HTMLAttributes<HTMLSpanElement>) {
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

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
