import { Button } from "@/registry/solid/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/solid/ui/popover";

export default function PopoverDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger as={Button} variant="muted">
          Show summary
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <div class="flex flex-col gap-3 text-sm text-foreground/80">
            <p class="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Capsule 74b
            </p>
            <p>Active nodes: 12</p>
            <p>Latency avg: 128ms</p>
            <p class="text-muted-foreground">
              Replica auto-scaling configured between 4 and 16 pods.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
