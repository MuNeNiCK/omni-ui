import { type JSX, splitProps, mergeProps } from "solid-js";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";

const paginationLinkBase =
  "relative inline-flex min-w-9 items-center justify-center border border-border/60 bg-muted/40 px-2 py-[0.35rem] text-xs font-medium text-muted-foreground/90 transition-[color,background,border,box-shadow] [&_svg]:pointer-events-none [&_svg]:size-3.5";
const paginationStateClasses =
  "hover:border-foreground/60 hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const paginationActiveClasses =
  "data-[active=true]:border-foreground data-[active=true]:bg-foreground data-[active=true]:text-background data-[active=true]:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]";

export type PaginationProps = JSX.HTMLAttributes<HTMLElement>;

function Pagination(props: PaginationProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      class={cn("mx-auto flex w-full items-center justify-center", local.class)}
      {...rest}
    />
  );
}

export type PaginationContentProps = JSX.HTMLAttributes<HTMLUListElement>;

function PaginationContent(props: PaginationContentProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ul
      data-slot="pagination-content"
      class={cn("inline-flex flex-row items-center gap-2", local.class)}
      {...rest}
    />
  );
}

export type PaginationItemProps = JSX.LiHTMLAttributes<HTMLLIElement>;

function PaginationItem(props: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
}

export type PaginationLinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
  size?: "icon" | "default";
};

function PaginationLink(props: PaginationLinkProps) {
  const merged = mergeProps({ size: "icon" as const }, props);
  const [local, rest] = splitProps(merged, ["class", "isActive", "size"]);
  return (
    <a
      aria-current={local.isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={local.isActive}
      class={cn(
        paginationLinkBase,
        paginationStateClasses,
        paginationActiveClasses,
        "rounded-none",
        local.size === "icon" && "h-9 px-0",
        local.size === "default" && "h-9 min-w-[6.5rem] justify-between gap-3 px-3",
        local.class,
      )}
      {...rest}
    />
  );
}

export type PaginationPreviousProps = PaginationLinkProps;

function PaginationPrevious(props: PaginationPreviousProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      class={cn("gap-1 px-2.5 sm:pl-2.5", local.class)}
      {...rest}
    >
      <ChevronLeftIcon />
      <span class="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

export type PaginationNextProps = PaginationLinkProps;

function PaginationNext(props: PaginationNextProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      class={cn("gap-1 px-2.5 sm:pr-2.5", local.class)}
      {...rest}
    >
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

export type PaginationEllipsisProps = JSX.HTMLAttributes<HTMLSpanElement>;

function PaginationEllipsis(props: PaginationEllipsisProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      class={cn(
        "inline-flex h-9 min-w-9 items-center justify-center border border-dashed border-border/60 bg-muted/30 text-xs font-medium text-muted-foreground/80",
        local.class,
      )}
      {...rest}
    >
      <MoreHorizontalIcon class="size-4" />
      <span class="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
