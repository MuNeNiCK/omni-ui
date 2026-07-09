import { ToggleGroup, ToggleGroupItem } from "@/registry/react/ui/toggle-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function ToggleGroupDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Segment control
        </CardTitle>
        <CardDescription>
          Uses the same squared toggles with shared borders for clarity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleGroup type="single" defaultValue="preview" aria-label="View mode">
          <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
          <ToggleGroupItem value="diff">Diff</ToggleGroupItem>
          <ToggleGroupItem value="raw">Raw</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="multiple" defaultValue={["logs"]} aria-label="Panels">
          <ToggleGroupItem value="metrics">Metrics</ToggleGroupItem>
          <ToggleGroupItem value="logs">Logs</ToggleGroupItem>
          <ToggleGroupItem value="alerts">Alerts</ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
}
