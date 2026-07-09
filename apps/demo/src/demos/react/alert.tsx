import { CheckCheck, InfoIcon, TriangleAlert } from "lucide-react";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/registry/react/ui/alert";
import { Button } from "@/registry/react/ui/button";

export default function AlertDemo() {
  return (
    <div className="grid gap-4">
      <Alert>
        <InfoIcon />
        <AlertTitle>MAINTENANCE WINDOW</AlertTitle>
        <AlertDescription>
          Control plane upgrades start at 02:00 JST. Instances remain online; management APIs may
          respond slower for up to five minutes.
        </AlertDescription>
        <AlertAction>
          <Button variant="muted" size="sm">
            View status page
          </Button>
        </AlertAction>
      </Alert>

      <Alert variant="success">
        <CheckCheck />
        <AlertTitle>ROLLBACK COMPLETE</AlertTitle>
        <AlertDescription>
          Traffic is routed back to the stable build. All regions are serving requests without
          errors and latency is within SLO.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>QUOTA REACHED</AlertTitle>
        <AlertDescription>
          You are nearing the workspace secret limit. Delete unused secrets or request an increased
          quota to avoid deployment failures.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <TriangleAlert />
        <AlertTitle>INCIDENT</AlertTitle>
        <AlertDescription>
          Deployments in the Osaka region are paused while we investigate a networking regression.
          Subscribe for updates in the status center.
        </AlertDescription>
        <AlertAction>
          <Button variant="muted" size="sm">
            Subscribe updates
          </Button>
          <Button size="sm">Open status</Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
