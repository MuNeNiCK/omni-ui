import { Switch } from "@/registry/react/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function SwitchDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Preferences</CardTitle>
        <CardDescription>
          Toggle states render with the same glass treatment as inputs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground/80">Auto backups</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between opacity-60">
          <span className="text-xs font-medium text-muted-foreground/70">Public access</span>
          <Switch disabled />
        </div>
      </CardContent>
    </Card>
  );
}
