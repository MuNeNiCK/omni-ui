import { Label } from "@/registry/solid/ui/label";
import { Textarea } from "@/registry/solid/ui/textarea";

export default function TextareaDemo() {
  return (
    <div class="grid gap-6">
      <div class="grid gap-4">
        <p class="text-xs uppercase tracking-[0.3em] text-muted-foreground">Support Form</p>
        <div class="grid gap-2">
          <Label for="subject">Subject</Label>
          <Textarea id="subject" placeholder="Access issue on ap-tokyo-1" />
        </div>
        <div class="grid gap-2">
          <Label for="details">Message</Label>
          <Textarea
            id="details"
            placeholder="Describe the behaviour you're seeing..."
            class="min-h-40"
          />
        </div>
      </div>

      <div class="grid gap-4">
        <p class="text-xs uppercase tracking-[0.3em] text-muted-foreground">Read-Only</p>
        <div class="grid gap-2">
          <Label for="logs" class="opacity-70">
            Latest Logs
          </Label>
          <Textarea
            id="logs"
            readOnly
            class="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
            value={`[10:21:08] CONNECT ap-tokyo-1 → compute
[10:21:11] SYNC    config state | success
[10:21:18] INFO    scale set at 4 replicas`}
          />
        </div>
      </div>
    </div>
  );
}
