import { useCallback } from "react";
import { toast } from "sonner";

import { Button } from "@/registry/react/ui/button";
import { Toaster } from "@/registry/react/ui/sonner";
import { CheckCheck, InfoIcon, TriangleAlert } from "lucide-react";

export default function SonnerDemo() {
  const handleInfo = useCallback(() => {
    toast.info("Maintenance window", {
      description: "Control plane upgrades begin at 02:00 JST.",
    });
  }, []);

  const handleSuccess = useCallback(() => {
    toast.success("Rollback complete", {
      description: "Traffic is routing through the stable build again.",
    });
  }, []);

  const handleWarning = useCallback(() => {
    toast.warning("Quota reached", {
      description: "Workspace secrets are almost full.",
    });
  }, []);

  const handleError = useCallback(() => {
    toast.error("Incident detected", {
      description: "Deployments in Osaka are paused while we investigate.",
      cancel: {
        label: "Dismiss",
      },
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" richColors />
      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="muted" className="justify-start gap-3" onClick={handleInfo}>
          <InfoIcon className="size-4" />
          Show info toast
        </Button>
        <Button className="justify-start gap-3" onClick={handleSuccess}>
          <CheckCheck className="size-4" />
          Show success toast
        </Button>
        <Button variant="ghost" className="justify-start gap-3" onClick={handleWarning}>
          <TriangleAlert className="size-4" />
          Show warning toast
        </Button>
        <Button variant="muted" className="justify-start gap-3" onClick={handleError}>
          <TriangleAlert className="size-4" />
          Show error toast
        </Button>
      </div>
    </div>
  );
}
