import { useMemo, useState } from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/registry/react/ui/calendar";
import { Button } from "@/registry/react/ui/button";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 4),
  });

  const rangeSummary = useMemo(() => {
    if (!range?.from) return "No range selected.";
    if (!range.to) return `Range starts ${range.from.toLocaleDateString()}.`;
    return `${range.from.toLocaleDateString()} -- ${range.to.toLocaleDateString()}`;
  }, [range]);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Single date</h3>
        <div className="max-w-full overflow-x-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-none border border-border/70"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {date ? `Selected: ${date.toLocaleDateString()}.` : "Select a day."}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Date range</h3>
        <div className="max-w-full overflow-x-auto">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
            className="rounded-none border border-border/70"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{rangeSummary}</span>
          <Button variant="ghost" size="sm" onClick={() => setRange(undefined)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
