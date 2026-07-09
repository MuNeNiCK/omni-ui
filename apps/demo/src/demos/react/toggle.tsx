import { Toggle } from "@/registry/react/ui/toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function ToggleDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Toolbar actions
        </CardTitle>
        <CardDescription>
          Toggles apply the same flat styling seen in the dashboard PoC.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
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
