import { type JSX, splitProps } from "solid-js";

import { cn } from "@/registry/solid/lib/utils";

export type TableProps = JSX.HTMLAttributes<HTMLTableElement>;

function Table(props: TableProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div data-slot="table-container" class="relative w-full overflow-x-auto">
      <table data-slot="table" class={cn("w-full caption-bottom text-sm", local.class)} {...rest} />
    </div>
  );
}

export type TableHeaderProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

function TableHeader(props: TableHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return <thead data-slot="table-header" class={cn("[&_tr]:border-b", local.class)} {...rest} />;
}

export type TableBodyProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

function TableBody(props: TableBodyProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <tbody data-slot="table-body" class={cn("[&_tr:last-child]:border-0", local.class)} {...rest} />
  );
}

export type TableFooterProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

function TableFooter(props: TableFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <tfoot
      data-slot="table-footer"
      class={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", local.class)}
      {...rest}
    />
  );
}

export type TableRowProps = JSX.HTMLAttributes<HTMLTableRowElement>;

function TableRow(props: TableRowProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <tr
      data-slot="table-row"
      class={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        local.class,
      )}
      {...rest}
    />
  );
}

export type TableHeadProps = JSX.ThHTMLAttributes<HTMLTableCellElement>;

function TableHead(props: TableHeadProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <th
      data-slot="table-head"
      class={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class,
      )}
      {...rest}
    />
  );
}

export type TableCellProps = JSX.TdHTMLAttributes<HTMLTableCellElement>;

function TableCell(props: TableCellProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <td
      data-slot="table-cell"
      class={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class,
      )}
      {...rest}
    />
  );
}

export type TableCaptionProps = JSX.HTMLAttributes<HTMLTableCaptionElement>;

function TableCaption(props: TableCaptionProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <caption
      data-slot="table-caption"
      class={cn("text-muted-foreground mt-4 text-sm", local.class)}
      {...rest}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
