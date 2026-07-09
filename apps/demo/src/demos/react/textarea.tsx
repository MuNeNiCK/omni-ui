import { Label } from "@/registry/react/ui/label";
import { Textarea } from "@/registry/react/ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <p className="text-sm font-medium text-muted-foreground">Support Form</p>
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Textarea id="subject" placeholder="Access issue on ap-tokyo-1" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="details">Message</Label>
          <Textarea
            id="details"
            placeholder="Describe the behaviour you're seeing…"
            className="min-h-40"
          />
        </div>
      </div>

      <div className="grid gap-4">
        <p className="text-sm font-medium text-muted-foreground">Read-Only</p>
        <div className="grid gap-2">
          <Label htmlFor="logs" className="opacity-70">
            Latest Logs
          </Label>
          <Textarea
            id="logs"
            readOnly
            className="text-sm text-muted-foreground"
            defaultValue={`[10:21:08] CONNECT ap-tokyo-1 → compute
[10:21:11] SYNC    config state | success
[10:21:18] INFO    scale set at 4 replicas`}
          />
        </div>
      </div>
    </div>
  );
}
