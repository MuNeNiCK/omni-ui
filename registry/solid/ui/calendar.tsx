import {
  splitProps,
  createSignal,
  createMemo,
  For,
  Show,
  type ComponentProps,
  type JSX,
} from "solid-js";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-solid";
import { cn } from "@/registry/solid/lib/utils";
import { Button } from "@/registry/solid/ui/button";

// --- Helpers ---

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, from: Date, to: Date): boolean {
  const t = date.getTime();
  return t >= from.getTime() && t <= to.getTime();
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// --- Types ---

type CalendarMode = "single" | "multiple" | "range";

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type CalendarBaseProps = {
  class?: string;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  disabled?: (date: Date) => boolean;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  numberOfMonths?: number;
  captionLayout?: "label" | "dropdown";
  buttonVariant?: ComponentProps<typeof Button>["variant"];
};

type CalendarSingleProps = CalendarBaseProps & {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
};

type CalendarMultipleProps = CalendarBaseProps & {
  mode: "multiple";
  selected?: Date[];
  onSelect?: (dates: Date[]) => void;
};

type CalendarRangeProps = CalendarBaseProps & {
  mode: "range";
  selected?: DateRange;
  onSelect?: (range: DateRange) => void;
};

type CalendarProps = CalendarSingleProps | CalendarMultipleProps | CalendarRangeProps;

type CalendarDayButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  day: Date;
  selected?: boolean;
  outside?: boolean;
  today?: boolean;
  rangeStart?: boolean;
  rangeEnd?: boolean;
  rangeMiddle?: boolean;
};

function CalendarDayButton(props: CalendarDayButtonProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "day",
    "selected",
    "outside",
    "today",
    "rangeStart",
    "rangeEnd",
    "rangeMiddle",
  ]);

  return (
    <button
      type="button"
      data-slot="calendar-day"
      data-day={local.day.toLocaleDateString()}
      data-selected-single={
        local.selected && !local.rangeStart && !local.rangeEnd && !local.rangeMiddle
      }
      data-range-start={local.rangeStart}
      data-range-end={local.rangeEnd}
      data-range-middle={local.rangeMiddle}
      class={cn(
        "inline-flex size-9 items-center justify-center rounded-none text-sm font-normal transition-colors",
        "hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        local.outside && "text-muted-foreground/40",
        !local.outside && !local.selected && "text-foreground",
        local.today && !local.selected && "border border-border/60",
        local.selected && "bg-foreground text-background",
        local.rangeMiddle && "bg-foreground/15 text-foreground rounded-none",
        local.rangeStart && "bg-foreground text-background",
        local.rangeEnd && "bg-foreground text-background",
        "disabled:pointer-events-none disabled:opacity-40",
        local.class,
      )}
      {...rest}
    />
  );
}

function Calendar(props: CalendarProps) {
  const [local] = splitProps(props, [
    "class",
    "mode",
    "selected",
    "onSelect",
    "month",
    "onMonthChange",
    "disabled",
    "showOutsideDays",
    "fixedWeeks",
    "numberOfMonths",
    "captionLayout",
    "buttonVariant",
  ]);

  const mode = () => (local.mode ?? "single") as CalendarMode;
  const showOutside = () => local.showOutsideDays !== false;
  const numMonths = () => local.numberOfMonths ?? 1;

  const today = new Date();
  const [currentMonth, setCurrentMonth] = createSignal(
    local.month ?? new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const updateMonth = (date: Date) => {
    setCurrentMonth(date);
    local.onMonthChange?.(date);
  };

  const goToPrevMonth = () => {
    const cur = currentMonth();
    updateMonth(new Date(cur.getFullYear(), cur.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    const cur = currentMonth();
    updateMonth(new Date(cur.getFullYear(), cur.getMonth() + 1, 1));
  };

  const isDateDisabled = (date: Date) => {
    if (local.disabled) return local.disabled(date);
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    if (mode() === "single") {
      const sel = local.selected as Date | undefined;
      return sel ? isSameDay(date, sel) : false;
    }
    if (mode() === "multiple") {
      const sel = (local.selected as Date[] | undefined) ?? [];
      return sel.some((d) => isSameDay(d, date));
    }
    if (mode() === "range") {
      const sel = local.selected as DateRange | undefined;
      if (!sel) return false;
      if (sel.from && sel.to) return isInRange(date, sel.from, sel.to);
      if (sel.from) return isSameDay(date, sel.from);
      return false;
    }
    return false;
  };

  const isRangeStart = (date: Date): boolean => {
    if (mode() !== "range") return false;
    const sel = local.selected as DateRange | undefined;
    return sel?.from ? isSameDay(date, sel.from) : false;
  };

  const isRangeEnd = (date: Date): boolean => {
    if (mode() !== "range") return false;
    const sel = local.selected as DateRange | undefined;
    return sel?.to ? isSameDay(date, sel.to) : false;
  };

  const isRangeMiddle = (date: Date): boolean => {
    if (mode() !== "range") return false;
    const sel = local.selected as DateRange | undefined;
    if (!sel?.from || !sel?.to) return false;
    return (
      isInRange(date, sel.from, sel.to) && !isSameDay(date, sel.from) && !isSameDay(date, sel.to)
    );
  };

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (mode() === "single") {
      const onSelect = local.onSelect as ((d: Date | undefined) => void) | undefined;
      const sel = local.selected as Date | undefined;
      if (sel && isSameDay(date, sel)) {
        onSelect?.(undefined);
      } else {
        onSelect?.(date);
      }
    } else if (mode() === "multiple") {
      const onSelect = local.onSelect as ((d: Date[]) => void) | undefined;
      const sel = ((local.selected as Date[] | undefined) ?? []).slice();
      const idx = sel.findIndex((d) => isSameDay(d, date));
      if (idx >= 0) {
        sel.splice(idx, 1);
      } else {
        sel.push(date);
      }
      onSelect?.(sel);
    } else if (mode() === "range") {
      const onSelect = local.onSelect as ((r: DateRange) => void) | undefined;
      const sel = local.selected as DateRange | undefined;
      if (!sel?.from || (sel.from && sel.to)) {
        onSelect?.({ from: date, to: undefined });
      } else {
        if (date.getTime() < sel.from.getTime()) {
          onSelect?.({ from: date, to: sel.from });
        } else {
          onSelect?.({ from: sel.from, to: date });
        }
      }
    }
  };

  const generateMonthGrid = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const weeks: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    // Leading blanks / outside days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevDays = getDaysInMonth(prevYear, prevMonth);
    for (let i = 0; i < firstDay; i++) {
      if (showOutside()) {
        week.push(new Date(prevYear, prevMonth, prevDays - firstDay + 1 + i));
      } else {
        week.push(null);
      }
    }

    for (let d = 1; d <= daysInMonth; d++) {
      week.push(new Date(year, month, d));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    // Trailing blanks / outside days
    if (week.length > 0) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      let nextDay = 1;
      while (week.length < 7) {
        if (showOutside()) {
          week.push(new Date(nextYear, nextMonth, nextDay++));
        } else {
          week.push(null);
        }
      }
      weeks.push(week);
    }

    // Fixed weeks: always 6 rows
    if (local.fixedWeeks) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      let nextDay = week.length > 0 ? 7 - week.length + 1 : 1;
      // Compute continuation day from last week
      const lastWeek = weeks[weeks.length - 1];
      const lastDate = lastWeek[lastWeek.length - 1];
      if (lastDate) {
        nextDay = lastDate.getDate() + 1;
        if (lastDate.getMonth() !== month) {
          // Already in next month
        }
      }
      while (weeks.length < 6) {
        const extraWeek: (Date | null)[] = [];
        for (let i = 0; i < 7; i++) {
          if (showOutside()) {
            extraWeek.push(new Date(nextYear, nextMonth, nextDay++));
          } else {
            extraWeek.push(null);
          }
        }
        weeks.push(extraWeek);
      }
    }

    return weeks;
  };

  const months = createMemo(() => {
    const cur = currentMonth();
    const result: { year: number; month: number; weeks: (Date | null)[][] }[] = [];
    for (let i = 0; i < numMonths(); i++) {
      const d = new Date(cur.getFullYear(), cur.getMonth() + i, 1);
      result.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        weeks: generateMonthGrid(d.getFullYear(), d.getMonth()),
      });
    }
    return result;
  });

  const isOutsideDay = (date: Date, displayMonth: number) => {
    return date.getMonth() !== displayMonth;
  };

  return (
    <div data-slot="calendar" class={cn("p-3", local.class)}>
      <For each={months()}>
        {(m, idx) => (
          <div class="space-y-4">
            <div class="flex items-center justify-between px-1">
              <Show when={idx() === 0}>
                <Button
                  variant={local.buttonVariant ?? "ghost"}
                  size="icon-sm"
                  class="size-7"
                  onClick={goToPrevMonth}
                  data-slot="calendar-prev"
                >
                  <ChevronLeftIcon class="size-4" />
                  <span class="sr-only">Previous month</span>
                </Button>
              </Show>
              <Show when={idx() > 0}>
                <div />
              </Show>
              <div class="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground">
                {MONTH_NAMES[m.month]} {m.year}
              </div>
              <Show when={idx() === numMonths() - 1}>
                <Button
                  variant={local.buttonVariant ?? "ghost"}
                  size="icon-sm"
                  class="size-7"
                  onClick={goToNextMonth}
                  data-slot="calendar-next"
                >
                  <ChevronRightIcon class="size-4" />
                  <span class="sr-only">Next month</span>
                </Button>
              </Show>
              <Show when={idx() < numMonths() - 1}>
                <div />
              </Show>
            </div>
            <table class="w-full border-collapse" data-slot="calendar-grid">
              <thead>
                <tr class="flex">
                  <For each={DAY_NAMES}>
                    {(day) => (
                      <th class="w-9 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 font-normal">
                        {day}
                      </th>
                    )}
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each={m.weeks}>
                  {(week) => (
                    <tr class="flex mt-1">
                      <For each={week}>
                        {(day) => (
                          <td class="relative p-0 text-center text-sm">
                            <Show when={day} fallback={<div class="size-9" />}>
                              {(d) => {
                                const date = d();
                                const outside = isOutsideDay(date, m.month);
                                const selected = () => isDateSelected(date);
                                const disabled = () => isDateDisabled(date);
                                const isToday = isSameDay(date, today);
                                const rangeStart = () => isRangeStart(date);
                                const rangeEnd = () => isRangeEnd(date);
                                const rangeMiddle = () => isRangeMiddle(date);
                                return (
                                  <CalendarDayButton
                                    day={date}
                                    disabled={disabled()}
                                    outside={outside}
                                    selected={selected()}
                                    today={isToday}
                                    rangeStart={rangeStart()}
                                    rangeEnd={rangeEnd()}
                                    rangeMiddle={rangeMiddle()}
                                    onClick={() => handleDayClick(date)}
                                  >
                                    {date.getDate()}
                                  </CalendarDayButton>
                                );
                              }}
                            </Show>
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        )}
      </For>
    </div>
  );
}

export { Calendar, CalendarDayButton };
export type { CalendarProps, DateRange };
