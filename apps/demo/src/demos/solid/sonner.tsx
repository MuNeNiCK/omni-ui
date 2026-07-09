import { toast } from "solid-sonner";

import { Button } from "@/registry/solid/ui/button";
import { Toaster } from "@/registry/solid/ui/sonner";
import { CheckCheck, Info, TriangleAlert } from "lucide-solid";

export default function SonnerDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Toaster position="top-right" richColors />
      <div class="grid gap-3 sm:grid-cols-2">
        <Button
          variant="muted"
          class="justify-start gap-3"
          onClick={() =>
            toast.info("Maintenance window", {
              description: "Control plane upgrades begin at 02:00 JST.",
            })
          }
        >
          <Info class="size-4" />
          Show info toast
        </Button>
        <Button
          class="justify-start gap-3"
          onClick={() =>
            toast.success("Rollback complete", {
              description: "Traffic is routing through the stable build again.",
            })
          }
        >
          <CheckCheck class="size-4" />
          Show success toast
        </Button>
        <Button
          variant="ghost"
          class="justify-start gap-3"
          onClick={() =>
            toast.warning("Quota reached", {
              description: "Workspace secrets are almost full.",
            })
          }
        >
          <TriangleAlert class="size-4" />
          Show warning toast
        </Button>
        <Button
          variant="muted"
          class="justify-start gap-3"
          onClick={() =>
            toast.error("Incident detected", {
              description: "Deployments in Osaka are paused while we investigate.",
              cancel: {
                label: "Dismiss",
              },
            })
          }
        >
          <TriangleAlert class="size-4" />
          Show error toast
        </Button>
      </div>
    </div>
  );
}
