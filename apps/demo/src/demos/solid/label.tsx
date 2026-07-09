import { Input } from "@/registry/solid/ui/input";
import { Label } from "@/registry/solid/ui/label";

export default function LabelDemo() {
  return (
    <div class="grid gap-6">
      <div class="grid gap-4">
        <p class="text-sm font-medium text-muted-foreground">Default</p>
        <div class="grid gap-2">
          <Label for="project">Project Name</Label>
          <Input id="project" placeholder="Aurora" />
        </div>
        <div class="grid gap-2">
          <Label for="owner">Owner</Label>
          <Input id="owner" placeholder="team@omni.cloud" />
        </div>
      </div>

      <div class="grid gap-4">
        <p class="text-sm font-medium text-muted-foreground">Invalid State</p>
        <div class="group/field grid gap-2" data-invalid="true">
          <Label for="region" class="group-data-[invalid=true]/field:text-destructive">
            Region
          </Label>
          <Input
            id="region"
            placeholder="Select region…"
            aria-invalid
            class="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
          />
          <p class="text-xs text-destructive">Region is required to deploy resources.</p>
        </div>
      </div>
    </div>
  );
}
