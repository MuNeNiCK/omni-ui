import {
  splitProps,
  createSignal,
  createMemo,
  Show,
  type ComponentProps,
  type JSX,
} from "solid-js";
import { CalendarIcon, RotateCcwIcon } from "lucide-solid";
import { format } from "date-fns";
import { cn } from "@/registry/solid/lib/utils";
import { Button } from "@/registry/solid/ui/button";
import { Calendar, type DateRange } from "@/registry/solid/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/solid/ui/popover";

type CalendarComponentProps = ComponentProps<typeof Calendar>;
type CalendarMode = NonNullable<CalendarComponentProps["mode"]>;

type DatePickerValue<M extends CalendarMode> = M extends "range"
  ? DateRange | undefined
  : M extends "multiple"
    ? Date[] | undefined
    : Date | undefined;

type DatePickerProps<M extends CalendarMode = "single"> = Omit<
  CalendarComponentProps,
  "selected" | "mode" | "onSelect"
> & {
  value?: DatePickerValue<M>;
  defaultValue?: DatePickerValue<M>;
  onValueChange?: (value: DatePickerValue<M>) => void;
  placeholder?: string | JSX.Element;
  formatValue?: (value: DatePickerValue<M>) => string | JSX.Element;
  closeOnSelect?: boolean;
  showClearButton?: boolean;
  clearLabel?: string | JSX.Element;
  buttonVariant?: "muted" | "ghost" | "outline" | "default";
  buttonSize?: "sm" | "default" | "lg";
  triggerClassName?: string;
  popoverClassName?: string;
};

function DatePicker<M extends CalendarMode = "single">(props: DatePickerProps<M>) {
  const [local, calendarProps] = splitProps(props, [
    "mode",
    "value",
    "defaultValue",
    "onValueChange",
    "placeholder",
    "formatValue",
    "closeOnSelect",
    "showClearButton",
    "clearLabel",
    "buttonVariant",
    "buttonSize",
    "triggerClassName",
    "popoverClassName",
    "captionLayout",
  ]);

  const pickerMode = () => local.mode ?? "single";
  const shouldCloseOnSelect = () => local.closeOnSelect ?? pickerMode() === "single";
  const buttonVariant = () => local.buttonVariant ?? "muted";
  const buttonSize = () => local.buttonSize ?? "sm";

  const [open, setOpen] = createSignal(false);
  const [internalValue, setInternalValue] = createSignal<DatePickerValue<CalendarMode>>(
    local.defaultValue as DatePickerValue<CalendarMode>,
  );

  const isControlled = () => local.value !== undefined;
  const selected = () => (isControlled() ? local.value : internalValue()) as DatePickerValue<M>;

  const setValue = (next: DatePickerValue<M>) => {
    if (!isControlled()) {
      setInternalValue(next as DatePickerValue<CalendarMode>);
    }
    local.onValueChange?.(next);
  };

  const displayValue = createMemo(() => {
    const sel = selected();
    if (!sel) return null;
    if (local.formatValue) return local.formatValue(sel);

    if (pickerMode() === "multiple") {
      const dates = (sel as Date[] | undefined) ?? [];
      if (!dates.length) return null;
      return `${dates.length} ${dates.length === 1 ? "date" : "dates"}`;
    }

    if (pickerMode() === "range") {
      const range = sel as DateRange | undefined;
      if (!range?.from) return null;
      if (!range.to) return format(range.from, "LLL dd, yyyy");
      return `${format(range.from, "LLL dd")} — ${format(range.to, "LLL dd, yyyy")}`;
    }

    return format(sel as Date, "LLL dd, yyyy");
  });

  const placeholderText = () =>
    local.placeholder ??
    (pickerMode() === "range"
      ? "Select range"
      : pickerMode() === "multiple"
        ? "Select dates"
        : "Select date");

  const hasValue = createMemo(() => {
    const sel = selected();
    if (!sel) return false;
    if (pickerMode() === "range") return !!(sel as DateRange).from;
    if (pickerMode() === "multiple") return ((sel as Date[] | undefined) ?? []).length > 0;
    return true;
  });

  const handleSelect = (nextValue: DatePickerValue<M>) => {
    setValue(nextValue);

    if (!shouldCloseOnSelect()) return;

    if (pickerMode() === "single") {
      if (nextValue) setOpen(false);
      return;
    }

    if (pickerMode() === "multiple") {
      if (Array.isArray(nextValue) && nextValue.length > 0) {
        setOpen(false);
      }
      return;
    }

    if (pickerMode() === "range") {
      const range = nextValue as DateRange | undefined;
      if (range?.from && range?.to) setOpen(false);
    }
  };

  const handleReset = () => setValue(undefined);
  const computedCaptionLayout = (local.captionLayout ??
    (pickerMode() === "single"
      ? "dropdown"
      : undefined)) as CalendarComponentProps["captionLayout"];

  return (
    <Popover open={open()} onOpenChange={setOpen}>
      <PopoverTrigger
        as={Button}
        variant={buttonVariant()}
        size={buttonSize()}
        disabled={local.disabled}
        class={cn(
          "flex min-w-[12rem] items-center gap-3 border border-border/60 bg-muted/40 px-3 text-[11px] font-mono uppercase tracking-[0.28em] text-foreground/85 shadow-[var(--glass-shadow-outline)] hover:border-foreground",
          !hasValue() && "text-muted-foreground/70",
          "rounded-none",
          local.triggerClassName,
        )}
        data-slot="date-picker-trigger"
      >
        <CalendarIcon class="size-3.5 opacity-70" />
        <span class="truncate text-left leading-none">{displayValue() ?? placeholderText()}</span>
      </PopoverTrigger>
      <PopoverContent
        class={cn("w-auto p-0", local.popoverClassName)}
        data-slot="date-picker-content"
      >
        <div class="flex flex-col gap-3 p-3">
          <Calendar
            {...calendarProps}
            mode={pickerMode()}
            selected={selected() as CalendarComponentProps["selected"]}
            onSelect={handleSelect as CalendarComponentProps["onSelect"]}
            captionLayout={computedCaptionLayout}
            buttonVariant="ghost"
          />
          <Show when={local.showClearButton && hasValue()}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              class="h-8 w-full justify-center gap-2 border border-border/40 bg-background/30 text-[11px] font-mono uppercase tracking-[0.28em] text-muted-foreground/80 hover:border-border/60 hover:bg-foreground/10 hover:text-foreground"
            >
              <RotateCcwIcon class="size-3.5" />
              {local.clearLabel ?? "Reset"}
            </Button>
          </Show>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
