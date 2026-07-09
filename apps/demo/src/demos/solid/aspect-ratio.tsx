import { AspectRatio } from "@/registry/solid/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div class="flex flex-col gap-6">
      <AspectRatio ratio={16 / 9}>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.35),transparent_60%)]" />
        <div class="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-background/80 via-background/5 to-transparent p-4">
          <div class="space-y-1">
            <p class="text-xs font-medium text-muted-foreground/80">Throughput</p>
            <p class="text-sm text-foreground">42.8k msg/s</p>
          </div>
          <span class="text-xs font-medium text-muted-foreground/60">Live</span>
        </div>
      </AspectRatio>

      <AspectRatio ratio={1} class="max-w-xs">
        <div class="absolute inset-0 grid place-content-center bg-muted/40">
          <span class="text-xs font-medium text-muted-foreground/80">Workspace</span>
        </div>
      </AspectRatio>
    </div>
  );
}
