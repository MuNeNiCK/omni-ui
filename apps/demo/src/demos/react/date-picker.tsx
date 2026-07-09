import { useMemo, useState } from "react";
import { format, subDays } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/registry/react/ui/button";
import { DatePicker } from "@/registry/react/ui/date-picker";

export default function DatePickerDemo() {
  const [auditDate, setAuditDate] = useState<Date | undefined>(new Date());
  const [maintenanceWindow, setMaintenanceWindow] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  const maintenanceSummary = useMemo(() => {
    if (!maintenanceWindow?.from) return "No window selected.";
    if (!maintenanceWindow.to) {
      return `Window begins ${format(maintenanceWindow.from, "PPP")}.`;
    }
    return `Window runs ${format(maintenanceWindow.from, "PP")} -- ${format(
      maintenanceWindow.to,
      "PP",
    )}.`;
  }, [maintenanceWindow]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Single date
        </h3>
        <DatePicker
          value={auditDate}
          onValueChange={setAuditDate}
          placeholder="Choose audit date"
          buttonVariant="muted"
        />
        <p className="text-sm text-muted-foreground">
          {auditDate
            ? `Audit anchored to ${format(auditDate, "PPPP")}.`
            : "Select a day to generate the audit report."}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Range picker
        </h3>
        <DatePicker
          mode="range"
          value={maintenanceWindow}
          onValueChange={setMaintenanceWindow}
          numberOfMonths={2}
          showClearButton
          closeOnSelect={false}
          placeholder="Select maintenance range"
        />
        <p className="text-sm text-muted-foreground">{maintenanceSummary}</p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Notify workspace
          </Button>
          <Button size="sm">Lock deployments</Button>
        </div>
      </div>
    </div>
  );
}
