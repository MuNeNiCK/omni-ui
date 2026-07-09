import { Slider } from "@/registry/react/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function SliderDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Capacity</CardTitle>
        <CardDescription>Used for intensity controls and resource allocations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground/80">Storage</span>
          <Slider defaultValue={[60]} max={100} step={5} />
        </div>
        <div className="space-y-2 opacity-60">
          <span className="text-xs font-medium text-muted-foreground/70">Throughput</span>
          <Slider defaultValue={[20, 80]} max={100} step={10} />
        </div>
      </CardContent>
    </Card>
  );
}
