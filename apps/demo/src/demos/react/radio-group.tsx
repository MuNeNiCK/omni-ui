import { Label } from "@/registry/react/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/react/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function RadioGroupDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Data Residency
        </CardTitle>
        <CardDescription>
          Choose a primary region where workloads should be deployed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="tokyo" className="grid gap-3">
          <label className="flex items-center gap-3">
            <RadioGroupItem value="tokyo" id="tokyo" />
            <Label htmlFor="tokyo" className="m-0">
              Tokyo (ap-tokyo-1)
            </Label>
          </label>
          <label className="flex items-center gap-3">
            <RadioGroupItem value="osaka" id="osaka" />
            <Label htmlFor="osaka" className="m-0">
              Osaka (ap-osaka-1)
            </Label>
          </label>
          <label className="flex items-center gap-3 opacity-50">
            <RadioGroupItem value="singapore" id="singapore" disabled />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70">
              Singapore (coming soon)
            </span>
          </label>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
