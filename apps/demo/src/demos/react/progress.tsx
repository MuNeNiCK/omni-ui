import { Progress } from "@/registry/react/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function ProgressDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Region sync</CardTitle>
        <CardDescription>
          The indicator uses a solid fill with a glassy overlay highlight to feel consistent with
          buttons and inputs.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Progress value={68} />
        <div className="grid gap-1 text-xs text-muted-foreground">
          <span>Tokyo</span>
          <Progress value={92} />
        </div>
      </CardContent>
    </Card>
  );
}
