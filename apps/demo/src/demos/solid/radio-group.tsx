import { Label } from "@/registry/solid/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/solid/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";

export default function RadioGroupDemo() {
  return (
    <Card class="border-border/70">
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">Data Residency</CardTitle>
        <CardDescription>
          Choose a primary region where workloads should be deployed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="tokyo" class="grid gap-3">
          <div class="flex items-center gap-3">
            <RadioGroupItem value="tokyo" id="tokyo" />
            <Label for="tokyo" class="m-0">
              Tokyo (ap-tokyo-1)
            </Label>
          </div>
          <div class="flex items-center gap-3">
            <RadioGroupItem value="osaka" id="osaka" />
            <Label for="osaka" class="m-0">
              Osaka (ap-osaka-1)
            </Label>
          </div>
          <div class="flex items-center gap-3 opacity-50">
            <RadioGroupItem value="singapore" id="singapore" disabled />
            <span class="text-xs font-medium text-muted-foreground/70">
              Singapore (coming soon)
            </span>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
