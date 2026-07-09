import { createSignal, createMemo } from "solid-js";
import { format, subDays } from "date-fns";

import { Button } from "@/registry/solid/ui/button";
import { DatePicker } from "@/registry/solid/ui/date-picker";
import type { DateRange } from "@/registry/solid/ui/calendar";

export default function DatePickerDemo() {
  const [auditDate, setAuditDate] = createSignal<Date | undefined>(new Date());
  const [maintenanceWindow, setMaintenanceWindow] = createSignal<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  const maintenanceSummary = createMemo(() => {
    const w = maintenanceWindow();
    if (!w?.from) return "No window selected.";
    if (!w.to) {
      return `Window begins ${format(w.from, "PPP")}.`;
    }
    return `Window runs ${format(w.from, "PP")} -- ${format(w.to, "PP")}.`;
  });

  return (
    <div class="space-y-8">
      <div class="flex flex-col gap-3">
        <h3 class="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Single date
        </h3>
        <DatePicker
          value={auditDate()}
          onValueChange={setAuditDate}
          placeholder="Choose audit date"
          buttonVariant="muted"
        />
        <p class="text-sm text-muted-foreground">
          {auditDate()
            ? `Audit anchored to ${format(auditDate()!, "PPPP")}.`
            : "Select a day to generate the audit report."}
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <h3 class="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Range picker
        </h3>
        <DatePicker
          mode="range"
          value={maintenanceWindow()}
          onValueChange={setMaintenanceWindow}
          numberOfMonths={2}
          showClearButton
          closeOnSelect={false}
          placeholder="Select maintenance range"
        />
        <p class="text-sm text-muted-foreground">{maintenanceSummary()}</p>
        <div class="flex gap-2">
          <Button variant="ghost" size="sm">
            Notify workspace
          </Button>
          <Button size="sm">Lock deployments</Button>
        </div>
      </div>
    </div>
  );
}
