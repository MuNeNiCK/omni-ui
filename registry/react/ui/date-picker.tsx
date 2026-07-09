"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, RotateCcwIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/registry/react/lib/utils";
import { Button } from "@/registry/react/ui/button";
import { Calendar } from "@/registry/react/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/react/ui/popover";

type CalendarComponentProps = React.ComponentProps<typeof Calendar>;
type CalendarMode = NonNullable<CalendarComponentProps["mode"]>;

type DatePickerValue<M extends CalendarMode> = M extends "multiple"
  ? Date[] | undefined
  : M extends "range"
    ? DateRange | undefined
    : Date | undefined;

type DatePickerProps<M extends CalendarMode = "single"> = Omit<
  CalendarComponentProps,
  "selected" | "mode" | "onSelect"
> & {
  mode?: M;
  value?: DatePickerValue<M>;
  defaultValue?: DatePickerValue<M>;
  onValueChange?: (value: DatePickerValue<M>) => void;
  placeholder?: React.ReactNode;
  formatValue?: (value: DatePickerValue<M>) => React.ReactNode;
  closeOnSelect?: boolean;
  showClearButton?: boolean;
  clearLabel?: React.ReactNode;
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  buttonSize?: React.ComponentProps<typeof Button>["size"];
  triggerClassName?: string;
  popoverClassName?: string;
};

type UseControllableStateProps<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
};

function useControllableState<T>({ value, defaultValue, onChange }: UseControllableStateProps<T>) {
  const [internalValue, setInternalValue] = React.useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (next: T | undefined) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next as T);
    },
    [isControlled, onChange],
  );

  return [current, setValue] as const;
}

function DatePicker<M extends CalendarMode = "single">({
  mode,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  formatValue,
  closeOnSelect,
  showClearButton = false,
  clearLabel = "Reset",
  buttonVariant = "muted",
  buttonSize = "sm",
  triggerClassName,
  popoverClassName,
  captionLayout,
  ...calendarProps
}: DatePickerProps<M>) {
  const [open, setOpen] = React.useState(false);
  const pickerMode = mode ?? "single";
  const shouldCloseOnSelect = closeOnSelect ?? pickerMode === "single";

  const [selected, setSelected] = useControllableState<DatePickerValue<M>>({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const placeholderText =
    placeholder ??
    (pickerMode === "range"
      ? "Select range"
      : pickerMode === "multiple"
        ? "Select dates"
        : "Select date");

  const displayValue = React.useMemo(() => {
    if (!selected) return null;
    if (formatValue) return formatValue(selected);

    if (pickerMode === "multiple" && Array.isArray(selected)) {
      if (!selected.length) return null;
      return `${selected.length} ${selected.length === 1 ? "date" : "dates"}`;
    }

    if (pickerMode === "range") {
      const range = selected as DateRange | undefined;
      if (!range?.from) return null;
      if (!range.to) {
        return format(range.from, "LLL dd, yyyy");
      }
      return `${format(range.from, "LLL dd")} — ${format(range.to, "LLL dd, yyyy")}`;
    }

    return format(selected as Date, "LLL dd, yyyy");
  }, [formatValue, pickerMode, selected]);

  const handleSelect = React.useCallback(
    (nextValue: DatePickerValue<M>) => {
      setSelected(nextValue);

      if (!shouldCloseOnSelect) return;

      if (pickerMode === "single") {
        if (nextValue) setOpen(false);
        return;
      }

      if (pickerMode === "multiple") {
        if (Array.isArray(nextValue) && nextValue.length) {
          setOpen(false);
        }
        return;
      }

      if (pickerMode === "range") {
        const range = nextValue as DateRange | undefined;
        if (range?.from && range?.to) {
          setOpen(false);
        }
      }
    },
    [pickerMode, setSelected, shouldCloseOnSelect],
  );

  const handleReset = React.useCallback(() => {
    setSelected(undefined);
  }, [setSelected]);

  const computedCaptionLayout = (captionLayout ??
    (pickerMode === "single" ? "dropdown" : undefined)) as CalendarComponentProps["captionLayout"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          data-slot="date-picker-trigger"
          variant={buttonVariant}
          size={buttonSize}
          className={cn(
            "flex min-w-[12rem] items-center gap-3 border border-border/60 bg-muted/40 px-3 text-xs text-foreground/85 shadow-[var(--glass-shadow-outline)] hover:border-foreground",
            !displayValue && "text-muted-foreground/70",
            "rounded-none",
            triggerClassName,
          )}
        >
          <CalendarIcon className="size-3.5 opacity-70" aria-hidden="true" />
          <span className="truncate text-left leading-none">{displayValue ?? placeholderText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        data-slot="date-picker-content"
        align="start"
        sideOffset={8}
        className={cn("w-auto p-0", popoverClassName)}
      >
        <div className="flex flex-col gap-3 p-3">
          <Calendar
            {...({
              mode: pickerMode,
              selected,
              onSelect: handleSelect,
              captionLayout: computedCaptionLayout,
              buttonVariant: "ghost",
              ...calendarProps,
            } as unknown as CalendarComponentProps)}
          />
          {showClearButton && selected ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 w-full justify-center gap-2 border border-border/40 bg-background/30 text-xs text-muted-foreground/80 hover:border-border/60 hover:bg-foreground/10 hover:text-foreground"
            >
              <RotateCcwIcon className="size-3.5" />
              {clearLabel}
            </Button>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
