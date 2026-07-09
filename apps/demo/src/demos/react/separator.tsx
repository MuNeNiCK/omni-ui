import { Separator } from "@/registry/react/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Horizontal</h2>
        <div className="space-y-2 rounded-lg border px-6 py-4">
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Section Label
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground">
            Use the separator to create visual breathing room between related blocks of content.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Vertical</h2>
        <div className="flex h-20 items-stretch justify-center gap-6 rounded-lg border px-6 py-6">
          <span className="flex items-center font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Item
          </span>
          <Separator orientation="vertical" />
          <span className="flex items-center font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Item
          </span>
        </div>
      </div>
    </div>
  );
}
