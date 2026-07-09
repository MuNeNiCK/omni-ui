import { Button } from "@/registry/react/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/react/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="muted">Hover me</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2 text-sm text-foreground/80">
          <p className="text-xs font-medium text-muted-foreground">Operator 042</p>
          <p>Admin access &bull; Joined 2024</p>
          <p className="text-muted-foreground">
            Responsible for monitoring cross-region replication status.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
