import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/solid/ui/collapsible";
import { Button } from "@/registry/solid/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";

export default function CollapsibleDemo() {
  return (
    <Card class="border-border/70">
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">Build Step Summary</CardTitle>
        <CardDescription>
          Toggle the collapsed region to reveal the raw build logs while the summary stays visible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible class="space-y-2">
          <div class="flex items-center justify-between gap-2">
            <div class="text-sm text-muted-foreground">
              Build #2487 completed in 3m21s on cluster-02.
            </div>
            <CollapsibleTrigger as={Button} variant="outline" size="sm">
              View logs
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent class="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
            <pre class="whitespace-pre-wrap">
              {`> pnpm install
> pnpm run build

✓ lint passed
✓ unit tests passed
✓ artifact uploaded to registry`}
            </pre>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
