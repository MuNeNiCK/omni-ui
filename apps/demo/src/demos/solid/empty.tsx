import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/solid/ui/empty";
import { Button } from "@/registry/solid/ui/button";
import { Badge } from "@/registry/solid/ui/badge";

export default function EmptyDemo() {
  return (
    <Empty class="p-6 md:p-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <svg viewBox="0 0 24 24" class="size-8" aria-hidden>
            <path
              d="M5 5h14l-1.5 12.5a2 2 0 0 1-2 1.75H8.5a2 2 0 0 1-2-1.75L5 5Zm4 4h6M9 10v6m6-6v6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </EmptyMedia>
        <EmptyTitle>DEPLOYMENTS NOT FOUND</EmptyTitle>
        <EmptyDescription>
          Connect a Git repository or trigger a pipeline to populate this view.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="ghost" class="tracking-[0.3em]">
          Create Deployment
        </Button>
        <p class="text-xs text-muted-foreground">
          Need help? Visit the <Badge>Runbook</Badge> or contact the SRE team.
        </p>
      </EmptyContent>
    </Empty>
  );
}
