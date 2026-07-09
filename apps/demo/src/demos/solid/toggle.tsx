import { Toggle } from "@/registry/solid/ui/toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";

export default function ToggleDemo() {
  return (
    <Card class="border-border/70">
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">Toolbar actions</CardTitle>
        <CardDescription>
          Toggles apply the same flat styling seen in the dashboard PoC.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-wrap gap-3">
        <Toggle aria-label="Toggle bold" defaultPressed>
          Bold
        </Toggle>
        <Toggle aria-label="Toggle italic">Italic</Toggle>
        <Toggle aria-label="Toggle underline" disabled>
          Underline
        </Toggle>
      </CardContent>
    </Card>
  );
}
