import { Checkbox } from "@/registry/solid/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";

export default function CheckboxDemo() {
  return (
    <Card class="border-border/70">
      <CardHeader>
        <CardTitle class="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Preferences
        </CardTitle>
        <CardDescription>Toggles inherit the mono uppercase labels used in forms.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-3">
        <div class="group/field flex items-center gap-3">
          <Checkbox id="alerts" defaultChecked />
          <label
            for="alerts"
            class="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/90"
          >
            Alerts
          </label>
        </div>
        <div class="group/field flex items-center gap-3">
          <Checkbox id="reports" />
          <label
            for="reports"
            class="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/90"
          >
            Weekly reports
          </label>
        </div>
        <div class="group/field flex items-center gap-3 opacity-50">
          <Checkbox id="beta" disabled />
          <label
            for="beta"
            class="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70"
          >
            Beta features
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
