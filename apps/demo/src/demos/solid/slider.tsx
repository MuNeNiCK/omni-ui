import { Slider } from "@/registry/solid/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";

export default function SliderDemo() {
  return (
    <Card class="border-border/70">
      <CardHeader>
        <CardTitle class="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Capacity
        </CardTitle>
        <CardDescription>Used for intensity controls and resource allocations.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="space-y-2">
          <span class="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/80">
            Storage
          </span>
          <Slider defaultValue={[60]} maxValue={100} step={5} />
        </div>
        <div class="space-y-2 opacity-60">
          <span class="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/70">
            Throughput
          </span>
          <Slider defaultValue={[20, 80]} maxValue={100} step={10} />
        </div>
      </CardContent>
    </Card>
  );
}
