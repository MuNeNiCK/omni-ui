import { Progress } from "@/registry/solid/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";

export default function ProgressDemo() {
  return (
    <Card class="border-border/70">
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">Region sync</CardTitle>
        <CardDescription>
          The indicator uses a solid fill with a glassy overlay highlight to feel consistent with
          buttons and inputs.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-3">
        <Progress value={68} />
        <div class="grid gap-1 text-xs text-muted-foreground">
          <span>Tokyo</span>
          <Progress value={92} />
        </div>
      </CardContent>
    </Card>
  );
}
