import { Badge } from "@/registry/solid/ui/badge";

export default function BadgeDemo() {
  return (
    <div class="flex flex-col gap-6">
      <div class="space-y-2">
        <h2 class="text-sm font-medium text-muted-foreground">Variants</h2>
        <div class="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      <div class="space-y-2">
        <h2 class="text-sm font-medium text-muted-foreground">Inline Usage</h2>
        <div class="flex flex-wrap items-center gap-2 rounded-lg border px-4 py-3 text-sm">
          <span class="text-sm font-medium">Deployment</span>
          <Badge variant="outline">Preview</Badge>
          <Badge>Active</Badge>
          <Badge variant="secondary">Synced</Badge>
        </div>
      </div>
    </div>
  );
}
