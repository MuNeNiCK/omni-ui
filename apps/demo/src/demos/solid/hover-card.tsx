import { Button } from "@/registry/solid/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/solid/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger as={Button} variant="muted">
        Hover me
      </HoverCardTrigger>
      <HoverCardContent>
        <div class="space-y-2 text-sm text-foreground/80">
          <p class="text-xs font-medium text-muted-foreground">Operator 042</p>
          <p>Admin access &bull; Joined 2024</p>
          <p class="text-muted-foreground">
            Responsible for monitoring cross-region replication status.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
