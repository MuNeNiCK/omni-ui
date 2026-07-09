import { Input } from "@/registry/react/ui/input";
import { Label } from "@/registry/react/ui/label";

export default function LabelDemo() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Default</p>
        <div className="grid gap-2">
          <Label htmlFor="project">Project Name</Label>
          <Input id="project" placeholder="Aurora" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="owner">Owner</Label>
          <Input id="owner" placeholder="team@omni.cloud" />
        </div>
      </div>

      <div className="grid gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Invalid State</p>
        <div className="group/field grid gap-2" data-invalid="true">
          <Label htmlFor="region" className="group-data-[invalid=true]/field:text-destructive">
            Region
          </Label>
          <Input
            id="region"
            placeholder="Select region"
            aria-invalid
            className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
          />
          <p className="text-[12px] text-destructive">Region is required to deploy resources.</p>
        </div>
      </div>
    </div>
  );
}
