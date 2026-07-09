import { Separator } from "@/registry/solid/ui/separator";

export default function SeparatorDemo() {
  return (
    <div class="flex flex-col gap-6">
      <div class="space-y-4">
        <h2 class="text-sm uppercase tracking-[0.3em] text-muted-foreground">Horizontal</h2>
        <div class="space-y-2 rounded-lg border px-6 py-4">
          <div class="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Section Label
          </div>
          <Separator />
          <p class="text-sm text-muted-foreground">
            Use the separator to create visual breathing room between related blocks of content.
          </p>
        </div>
      </div>
      <div class="space-y-4">
        <h2 class="text-sm uppercase tracking-[0.3em] text-muted-foreground">Vertical</h2>
        <div class="flex h-20 items-stretch justify-center gap-6 rounded-lg border px-6 py-6">
          <span class="flex items-center font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Item
          </span>
          <Separator orientation="vertical" />
          <span class="flex items-center font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Item
          </span>
        </div>
      </div>
    </div>
  );
}
