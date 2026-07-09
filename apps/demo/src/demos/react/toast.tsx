import { useCallback } from "react";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { Button } from "@/registry/react/ui/button";
import { Toaster } from "@/registry/react/ui/sonner";

export default function ToastDemo() {
  const fireToast = useCallback(() => {
    toast("Control plane window", {
      description: "Deployments pause at 02:00 JST while upgrades roll out.",
      action: {
        label: "View runbook",
        onClick: () => toast.success("Runbook opened"),
      },
    });
  }, []);

  const fireWarning = useCallback(() => {
    toast.warning("Latency rising", {
      description: "Ingress in Singapore is above the target budget.",
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" richColors />
      <div className="grid gap-3 sm:grid-cols-3">
        <Button onClick={fireToast} className="justify-start gap-3">
          <Info className="size-4" />
          Info toast
        </Button>
        <Button variant="ghost" onClick={fireWarning} className="justify-start gap-3">
          <AlertTriangle className="size-4" />
          Warning toast
        </Button>
        <Button
          variant="muted"
          onClick={() => toast.success("Rollback complete")}
          className="justify-start gap-3"
        >
          <CheckCircle2 className="size-4" />
          Success toast
        </Button>
      </div>
    </div>
  );
}
