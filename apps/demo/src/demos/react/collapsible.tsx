import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/react/ui/collapsible";
import { Button } from "@/registry/react/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function CollapsibleDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Build Step Summary
        </CardTitle>
        <CardDescription>
          Toggle the collapsed region to reveal the raw build logs while the summary stays visible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              Build #2487 completed in 3m21s on cluster-02.
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                View logs
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
            <pre className="whitespace-pre-wrap">
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
