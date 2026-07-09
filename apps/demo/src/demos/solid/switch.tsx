import { Switch } from "@/registry/solid/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";

export default function SwitchDemo() {
  return (
    <Card class="border-border/70">
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">Preferences</CardTitle>
        <CardDescription>
          Toggle states render with the same glass treatment as inputs.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-muted-foreground/80">Auto backups</span>
          <Switch defaultChecked />
        </div>
        <div class="flex items-center justify-between opacity-60">
          <span class="text-xs font-medium text-muted-foreground/70">Public access</span>
          <Switch disabled />
        </div>
      </CardContent>
    </Card>
  );
}
