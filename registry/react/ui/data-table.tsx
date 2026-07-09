"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table as TableInstance,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

import { cn } from "@/registry/react/lib/utils";
import { Button } from "@/registry/react/ui/button";
import { Input } from "@/registry/react/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/react/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/react/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/react/ui/table";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  searchKey?: string;
  searchPlaceholder?: string;
  toolbar?: (table: TableInstance<TData>) => React.ReactNode;
  emptyMessage?: React.ReactNode;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  footer?: React.ReactNode;
  viewOptions?: boolean;
};

type DataTableColumnMeta = {
  headerLabel?: string;
};

const defaultPageSizeOptions = [10, 20, 30, 50];

function DataTable<TData, TValue>({
  columns,
  data,
  className,
  searchKey,
  searchPlaceholder = "Filter results…",
  toolbar,
  emptyMessage = "No records found.",
  initialPageSize = 10,
  pageSizeOptions = defaultPageSizeOptions,
  footer,
  viewOptions = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  React.useEffect(() => {
    if (!searchKey) return;
    const column = table.getColumn(searchKey as string);
    column?.setFilterValue(searchValue);
  }, [table, searchKey, searchValue]);

  const isFiltered = Boolean(searchValue) || columnFilters.length > 0;

  return (
    <div data-slot="data-table" className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-3 border border-border/60 bg-muted/40 px-3 py-3 text-xs text-muted-foreground/80 shadow-[var(--glass-shadow-outline)] backdrop-blur-[4px] sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {toolbar?.(table)}
          {isFiltered ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 border border-transparent px-3 py-1 text-muted-foreground/70 hover:border-border/60 hover:bg-foreground/10 hover:text-foreground"
              onClick={() => {
                setSearchValue("");
                table.resetColumnFilters();
              }}
            >
              Reset
            </Button>
          ) : null}
          <span className="hidden items-center gap-1 text-xs tabular-nums text-muted-foreground/60 sm:inline-flex">
            {table.getFilteredSelectedRowModel().rows.length} selected •{" "}
            {table.getFilteredRowModel().rows.length} total
          </span>
        </div>
        <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          {searchKey ? (
            <Input
              aria-label={searchPlaceholder}
              autoComplete="off"
              name={String(searchKey)}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 w-full min-w-0 border-border/60 bg-background/20 text-sm text-foreground/90 sm:w-56"
            />
          ) : null}
          {viewOptions ? <DataTableViewOptions table={table} /> : null}
        </div>
      </div>
      <div className="max-w-full overflow-x-auto border border-border/60 bg-background/10 shadow-[var(--glass-shadow-outline-subtle)] backdrop-blur-[2px]">
        <Table className="min-w-[680px] text-left sm:min-w-full">
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border/40">
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) {
                    return <TableHead key={header.id} />;
                  }

                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();
                  const headerLabel =
                    (header.column.columnDef.meta as DataTableColumnMeta | undefined)
                      ?.headerLabel || header.column.id;

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-12 px-3 text-xs font-medium text-muted-foreground/80",
                        "[&[data-sort=desc]]:text-foreground [&[data-sort=asc]]:text-foreground",
                      )}
                      data-sort={sortDirection ? String(sortDirection) : undefined}
                      aria-sort={
                        sortDirection === "asc"
                          ? "ascending"
                          : sortDirection === "desc"
                            ? "descending"
                            : canSort
                              ? "none"
                              : undefined
                      }
                    >
                      {canSort ? (
                        <button
                          type="button"
                          aria-label={`Sort by ${headerLabel}`}
                          onClick={header.column.getToggleSortingHandler()}
                          className="group flex w-full items-center gap-2 text-left transition-colors hover:text-foreground"
                        >
                          <span className="truncate">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          <span className="flex items-center">
                            {sortDirection === "asc" ? (
                              <ArrowUpIcon className="size-3.5" />
                            ) : sortDirection === "desc" ? (
                              <ArrowDownIcon className="size-3.5" />
                            ) : (
                              <ChevronsUpDownIcon className="size-3.5 opacity-40 group-hover:opacity-70" />
                            )}
                          </span>
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="border-border/40 text-sm text-foreground/85 transition-colors hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-3 text-sm text-foreground/80">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-border/40">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 px-4 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {footer}
      <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}

type DataTableViewOptionsProps<TData> = {
  table: TableInstance<TData>;
};

function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 gap-2 border border-border/60 bg-muted/40 px-3 text-muted-foreground/80 hover:bg-foreground/10 hover:text-foreground"
        >
          <SlidersHorizontalIcon className="size-3.5" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[12rem] border-border/60 bg-muted/60 text-foreground shadow-[var(--glass-shadow-outline)]"
      >
        <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-muted-foreground/70">
          Columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllLeafColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
              className="text-sm text-muted-foreground/80 data-[state=checked]:text-foreground"
            >
              {(column.columnDef.meta as DataTableColumnMeta | undefined)?.headerLabel || column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DataTablePaginationProps<TData> = {
  table: TableInstance<TData>;
  pageSizeOptions?: number[];
};

function DataTablePagination<TData>({
  table,
  pageSizeOptions = defaultPageSizeOptions,
}: DataTablePaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageStart = pageIndex * pageSize + 1;
  const pageEnd = Math.min(pageStart + pageSize - 1, table.getFilteredRowModel().rows.length);

  return (
    <div className="flex flex-col gap-3 border border-border/60 bg-muted/40 px-4 py-3 text-xs text-muted-foreground/80 shadow-[var(--glass-shadow-outline)] backdrop-blur-[4px] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span>
          Showing {table.getFilteredRowModel().rows.length ? `${pageStart}–${pageEnd}` : 0} of{" "}
          {table.getFilteredRowModel().rows.length} rows
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span>Rows</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 min-w-[4.5rem] border-border/60 bg-background/20 text-xs text-foreground/85">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end" className="bg-muted/60">
              <SelectGroup>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 border border-border/60 bg-background/20 p-0 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-3.5" />
            <span className="sr-only">Previous</span>
          </Button>
          <span className="text-xs tabular-nums text-muted-foreground/70">
            {pageIndex + 1} / {pageCount || 1}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 border border-border/60 bg-background/20 p-0 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-3.5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { DataTable, DataTablePagination, DataTableViewOptions };
