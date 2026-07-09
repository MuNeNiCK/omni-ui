import { Input } from "@/registry/react/ui/input";
import { Label } from "@/registry/react/ui/label";

export default function InputDemo() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Default</p>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@omni.dev" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Omni Cloud" />
        </div>
      </div>

      <div className="grid gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Disabled State</p>
        <div className="grid gap-2">
          <Label htmlFor="api-key" className="opacity-80">
            API Key
          </Label>
          <Input id="api-key" value="sk_live_***" disabled />
        </div>
      </div>
    </div>
  );
}
