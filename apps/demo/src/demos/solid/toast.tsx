import { toast } from "solid-sonner";
import { AlertTriangle, CheckCircle2, Info } from "lucide-solid";

import { Button } from "@/registry/solid/ui/button";
import { Toaster } from "@/registry/solid/ui/sonner";

export default function ToastDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Toaster position="top-right" richColors />
      <div class="grid gap-3 sm:grid-cols-3">
        <Button
          onClick={() =>
            toast("Control plane window", {
              description: "Deployments pause at 02:00 JST while upgrades roll out.",
            })
          }
          class="justify-start gap-3"
        >
          <Info class="size-4" />
          Info toast
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            toast.warning("Latency rising", {
              description: "Ingress in Singapore is above the target budget.",
            })
          }
          class="justify-start gap-3"
        >
          <AlertTriangle class="size-4" />
          Warning toast
        </Button>
        <Button
          variant="muted"
          onClick={() => toast.success("Rollback complete")}
          class="justify-start gap-3"
        >
          <CheckCircle2 class="size-4" />
          Success toast
        </Button>
      </div>
    </div>
  );
}
