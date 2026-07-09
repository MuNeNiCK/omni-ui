import { splitProps, createSignal, createEffect, For, Show, type JSX } from "solid-js";
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type Table as TableInstance,
} from "@tanstack/solid-table";
import type { SelectRootItemComponentProps } from "@kobalte/core/select";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  SlidersHorizontalIcon,
} from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";
import { Button } from "@/registry/solid/ui/button";
import { Input } from "@/registry/solid/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/solid/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/solid/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/solid/ui/table";

type DataTableColumnMeta = {
  headerLabel?: string;
};

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  class?: string;
  searchKey?: string;
  searchPlaceholder?: string;
  toolbar?: (table: TableInstance<TData>) => JSX.Element;
  emptyMessage?: JSX.Element;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  footer?: JSX.Element;
  viewOptions?: boolean;
};

const defaultPageSizeOptions = [10, 20, 30, 50];

function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const [local] = splitProps(props, [
    "columns",
    "data",
    "class",
    "searchKey",
    "searchPlaceholder",
    "toolbar",
    "emptyMessage",
    "initialPageSize",
    "pageSizeOptions",
    "footer",
    "viewOptions",
  ]);

  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>({});
  const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({});
  const [searchValue, setSearchValue] = createSignal("");

  const table = createSolidTable({
    get data() {
      return local.data;
    },
    get columns() {
      return local.columns;
    },
    state: {
      get sorting() {
        return sorting();
      },
      get columnFilters() {
        return columnFilters();
      },
      get columnVisibility() {
        return columnVisibility();
      },
      get rowSelection() {
        return rowSelection();
      },
    },
    initialState: {
      pagination: {
        pageSize: local.initialPageSize ?? 10,
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

  createEffect(() => {
    if (!local.searchKey) return;
    const column = table.getColumn(local.searchKey);
    column?.setFilterValue(searchValue());
  });

  const isFiltered = () => Boolean(searchValue()) || columnFilters().length > 0;
  const showViewOptions = () => local.viewOptions !== false;

  return (
    <div data-slot="data-table" class={cn("flex flex-col gap-4", local.class)}>
      <div class="flex flex-col gap-3 border border-border/60 bg-muted/40 px-3 py-3 text-xs text-muted-foreground/80 shadow-[var(--glass-shadow-outline)] backdrop-blur-[4px] sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {local.toolbar?.(table)}
          <Show when={isFiltered()}>
            <Button
              variant="ghost"
              size="sm"
              class="h-8 border border-transparent px-3 py-1 text-muted-foreground/70 hover:border-border/60 hover:bg-foreground/10 hover:text-foreground"
              onClick={() => {
                setSearchValue("");
                table.resetColumnFilters();
              }}
            >
              Reset
            </Button>
          </Show>
          <span class="hidden items-center gap-1 text-xs tabular-nums text-muted-foreground/60 sm:inline-flex">
            {table.getFilteredSelectedRowModel().rows.length} selected •{" "}
            {table.getFilteredRowModel().rows.length} total
          </span>
        </div>
        <div class="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <Show when={local.searchKey}>
            <Input
              aria-label={local.searchPlaceholder ?? "Filter results…"}
              autocomplete="off"
              name={local.searchKey}
              value={searchValue()}
              onInput={(e) => setSearchValue(e.currentTarget.value)}
              placeholder={local.searchPlaceholder ?? "Filter results…"}
              class="h-9 w-full min-w-0 border-border/60 bg-background/20 text-sm text-foreground/90 sm:w-56"
            />
          </Show>
          <Show when={showViewOptions()}>
            <DataTableViewOptions table={table} />
          </Show>
        </div>
      </div>
      <div class="max-w-full overflow-x-auto border border-border/60 bg-background/10 shadow-[var(--glass-shadow-outline-subtle)] backdrop-blur-[2px]">
        <Table class="min-w-[680px] text-left sm:min-w-full">
          <TableHeader class="bg-muted/40">
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow class="border-border/40">
                  <For each={headerGroup.headers}>
                    {(header) => {
                      if (header.isPlaceholder) {
                        return <TableHead />;
                      }

                      const canSort = header.column.getCanSort();
                      const sortDirection = () => header.column.getIsSorted();
                      const headerLabel =
                        (header.column.columnDef.meta as DataTableColumnMeta | undefined)
                          ?.headerLabel || header.column.id;

                      return (
                        <TableHead
                          class={cn(
                            "h-12 px-3 text-xs font-medium text-muted-foreground/80",
                            "[&[data-sort=desc]]:text-foreground [&[data-sort=asc]]:text-foreground",
                          )}
                          data-sort={sortDirection() ? String(sortDirection()) : undefined}
                          aria-sort={
                            sortDirection() === "asc"
                              ? "ascending"
                              : sortDirection() === "desc"
                                ? "descending"
                                : canSort
                                  ? "none"
                                  : undefined
                          }
                        >
                          <Show
                            when={canSort}
                            fallback={flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          >
                            <button
                              type="button"
                              aria-label={`Sort by ${headerLabel}`}
                              onClick={header.column.getToggleSortingHandler()}
                              class="group flex w-full items-center gap-2 text-left transition-colors hover:text-foreground"
                            >
                              <span class="truncate">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </span>
                              <span class="flex items-center">
                                <Show when={sortDirection() === "asc"}>
                                  <ArrowUpIcon class="size-3.5" />
                                </Show>
                                <Show when={sortDirection() === "desc"}>
                                  <ArrowDownIcon class="size-3.5" />
                                </Show>
                                <Show when={!sortDirection()}>
                                  <ChevronsUpDownIcon class="size-3.5 opacity-40 group-hover:opacity-70" />
                                </Show>
                              </span>
                            </button>
                          </Show>
                        </TableHead>
                      );
                    }}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody>
            <Show
              when={table.getRowModel().rows.length > 0}
              fallback={
                <TableRow class="border-border/40">
                  <TableCell
                    colSpan={local.columns.length}
                    class="h-24 px-4 text-center text-sm text-muted-foreground"
                  >
                    {local.emptyMessage ?? "No records found."}
                  </TableCell>
                </TableRow>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    class="border-border/40 text-sm text-foreground/85 transition-colors hover:bg-muted/30"
                  >
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell class="px-3 py-3 text-sm text-foreground/80">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </Show>
          </TableBody>
        </Table>
      </div>
      {local.footer}
      <DataTablePagination
        table={table}
        pageSizeOptions={local.pageSizeOptions ?? defaultPageSizeOptions}
      />
    </div>
  );
}

type DataTableViewOptionsProps<TData> = {
  table: TableInstance<TData>;
};

function DataTableViewOptions<TData>(props: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        as={Button}
        type="button"
        variant="ghost"
        size="sm"
        class="h-9 gap-2 border border-border/60 bg-muted/40 px-3 text-muted-foreground/80 hover:bg-foreground/10 hover:text-foreground"
      >
        <SlidersHorizontalIcon class="size-3.5" />
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-[12rem] border-border/60 bg-muted/60 text-foreground shadow-[var(--glass-shadow-outline)]">
        <DropdownMenuLabel class="px-3 py-2 text-xs font-medium text-muted-foreground/70">
          Columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <For each={props.table.getAllLeafColumns().filter((column) => column.getCanHide())}>
          {(column) => (
            <DropdownMenuCheckboxItem
              checked={column.getIsVisible()}
              onChange={(value: boolean) => column.toggleVisibility(value)}
              class="text-sm text-muted-foreground/80 data-[state=checked]:text-foreground"
            >
              {(column.columnDef.meta as DataTableColumnMeta | undefined)?.headerLabel || column.id}
            </DropdownMenuCheckboxItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DataTablePaginationProps<TData> = {
  table: TableInstance<TData>;
  pageSizeOptions?: number[];
};

function DataTablePagination<TData>(props: DataTablePaginationProps<TData>) {
  const pageSizeOptions = () => props.pageSizeOptions ?? defaultPageSizeOptions;
  const pageSize = () => props.table.getState().pagination.pageSize;
  const pageCount = () => props.table.getPageCount();
  const pageIndex = () => props.table.getState().pagination.pageIndex;
  const pageStart = () => pageIndex() * pageSize() + 1;
  const totalRows = () => props.table.getFilteredRowModel().rows.length;
  const pageEnd = () => Math.min(pageStart() + pageSize() - 1, totalRows());

  return (
    <div class="flex flex-col gap-3 border border-border/60 bg-muted/40 px-4 py-3 text-xs text-muted-foreground/80 shadow-[var(--glass-shadow-outline)] backdrop-blur-[4px] sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <span>
          Showing {totalRows() ? `${pageStart()}–${pageEnd()}` : 0} of {totalRows()} rows
        </span>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2">
          <span>Rows</span>
          <Select
            value={String(pageSize())}
            onChange={(val: string) => {
              if (val) props.table.setPageSize(Number(val));
            }}
            options={pageSizeOptions().map(String)}
            itemComponent={(itemProps: SelectRootItemComponentProps<string>) => (
              <SelectItem item={itemProps.item}>{itemProps.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger class="h-8 min-w-[4.5rem] border-border/60 bg-background/20 text-xs text-foreground/85">
              <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
            </SelectTrigger>
            <SelectContent align="end" class="bg-muted/60" />
          </Select>
        </div>
        <div class="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="h-8 w-8 border border-border/60 bg-background/20 p-0 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground"
            onClick={() => props.table.previousPage()}
            disabled={!props.table.getCanPreviousPage()}
          >
            <ChevronLeftIcon class="size-3.5" />
            <span class="sr-only">Previous</span>
          </Button>
          <span class="text-xs tabular-nums text-muted-foreground/70">
            {pageIndex() + 1} / {pageCount() || 1}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="h-8 w-8 border border-border/60 bg-background/20 p-0 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground"
            onClick={() => props.table.nextPage()}
            disabled={!props.table.getCanNextPage()}
          >
            <ChevronRightIcon class="size-3.5" />
            <span class="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { DataTable, DataTablePagination, DataTableViewOptions };
