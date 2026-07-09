import { Input } from "@/registry/solid/ui/input";
import { Label } from "@/registry/solid/ui/label";

export default function InputDemo() {
  return (
    <div class="grid gap-6">
      <div class="grid gap-4">
        <p class="text-sm font-medium text-muted-foreground">Default</p>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="you@omni.dev" />
        </div>
        <div class="grid gap-2">
          <Label for="company">Company</Label>
          <Input id="company" placeholder="Omni Cloud" />
        </div>
      </div>

      <div class="grid gap-4">
        <p class="text-sm font-medium text-muted-foreground">Disabled State</p>
        <div class="grid gap-2">
          <Label for="api-key" class="opacity-80">
            API Key
          </Label>
          <Input id="api-key" value="sk_live_***" disabled />
        </div>
      </div>
    </div>
  );
}
