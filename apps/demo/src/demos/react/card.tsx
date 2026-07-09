import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";
import { Button } from "@/registry/react/ui/button";
import { Badge } from "@/registry/react/ui/badge";
import { Separator } from "@/registry/react/ui/separator";

export default function CardDemo() {
  return (
    <Card className="divide-y divide-border">
      <CardHeader>
        <div>
          <CardTitle className="font-mono text-xs uppercase tracking-[0.28em] text-card-foreground/80 dark:text-card-foreground/70">
            Usage
          </CardTitle>
          <CardDescription className="mt-2 text-base text-card-foreground">
            Daily Active Sessions
          </CardDescription>
        </div>
        <CardAction>
          <Badge variant="outline">Live</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-4xl font-semibold tracking-tight text-card-foreground">
              3,482
            </span>
            <p className="text-sm text-muted-foreground">+12.4% vs previous cycle</p>
          </div>
          <Button size="sm">View report</Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-[0.28em] text-card-foreground/70">
            Next update
          </span>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <span className="text-muted-foreground">In 15 minutes</span>
        </div>
      </CardFooter>
    </Card>
  );
}
