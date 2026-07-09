import { AspectRatio } from "@/registry/react/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="flex flex-col gap-6">
      <AspectRatio ratio={16 / 9}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.35),transparent_60%)]" />
        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-background/80 via-background/5 to-transparent p-4">
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/80">
              Throughput
            </p>
            <p className="text-sm text-foreground">42.8k msg/s</p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/60">
            Live
          </span>
        </div>
      </AspectRatio>

      <AspectRatio ratio={1} className="max-w-xs">
        <div className="absolute inset-0 grid place-content-center bg-muted/40">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/80">
            Workspace
          </span>
        </div>
      </AspectRatio>
    </div>
  );
}
