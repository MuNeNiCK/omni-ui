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
        <CardTitle class="text-sm font-medium text-muted-foreground">Preferences</CardTitle>
        <CardDescription>Toggles inherit the mono labels used in forms.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-3">
        <div class="group/field flex items-center gap-3">
          <Checkbox id="alerts" defaultChecked />
          <label for="alerts" class="text-xs font-medium text-muted-foreground/90">
            Alerts
          </label>
        </div>
        <div class="group/field flex items-center gap-3">
          <Checkbox id="reports" />
          <label for="reports" class="text-xs font-medium text-muted-foreground/90">
            Weekly reports
          </label>
        </div>
        <div class="group/field flex items-center gap-3 opacity-50">
          <Checkbox id="beta" disabled />
          <label for="beta" class="text-xs font-medium text-muted-foreground/70">
            Beta features
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
