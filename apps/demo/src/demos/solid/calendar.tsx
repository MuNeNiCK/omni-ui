import { createSignal, createMemo } from "solid-js";

import { Calendar } from "@/registry/solid/ui/calendar";
import { Button } from "@/registry/solid/ui/button";

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function CalendarDemo() {
  const [date, setDate] = createSignal<Date | undefined>(new Date());
  const [range, setRange] = createSignal<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 4),
  });

  const rangeSummary = createMemo(() => {
    const r = range();
    if (!r?.from) return "No range selected.";
    if (!r.to) return `Range starts ${r.from.toLocaleDateString()}.`;
    return `${r.from.toLocaleDateString()} -- ${r.to.toLocaleDateString()}`;
  });

  return (
    <div class="space-y-8">
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-muted-foreground">Single date</h3>
        <div class="max-w-full overflow-x-auto">
          <Calendar
            mode="single"
            selected={date()}
            onSelect={setDate}
            class="rounded-none border border-border/70"
          />
        </div>
        <p class="text-sm text-muted-foreground">
          {date() ? `Selected: ${date()!.toLocaleDateString()}.` : "Select a day."}
        </p>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-medium text-muted-foreground">Date range</h3>
        <div class="max-w-full overflow-x-auto">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={range()}
            onSelect={setRange}
            class="rounded-none border border-border/70"
          />
        </div>
        <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{rangeSummary()}</span>
          <Button variant="ghost" size="sm" onClick={() => setRange(undefined)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
