import { Checkbox } from "@/registry/react/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function CheckboxDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Preferences
        </CardTitle>
        <CardDescription>Toggles inherit the mono uppercase labels used in forms.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <label className="group/field flex items-center gap-3">
          <Checkbox id="alerts" defaultChecked />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/90">
            Alerts
          </span>
        </label>
        <label className="group/field flex items-center gap-3">
          <Checkbox id="reports" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/90">
            Weekly reports
          </span>
        </label>
        <label className="group/field flex items-center gap-3 opacity-50">
          <Checkbox id="beta" disabled />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70">
            Beta features
          </span>
        </label>
      </CardContent>
    </Card>
  );
}
