import { Button } from "@/registry/react/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/react/ui/popover";

export default function PopoverDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="muted">Show summary</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col gap-3 text-sm text-foreground/80">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Capsule 74b
            </p>
            <p>Active nodes: 12</p>
            <p>Latency avg: 128ms</p>
            <p className="text-muted-foreground">
              Replica auto-scaling configured between 4 and 16 pods.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
