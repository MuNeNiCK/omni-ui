import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";
import { Button } from "@/registry/solid/ui/button";
import { Badge } from "@/registry/solid/ui/badge";
import { Separator } from "@/registry/solid/ui/separator";

export default function CardDemo() {
  return (
    <Card class="divide-y divide-border">
      <CardHeader>
        <div>
          <CardTitle class="text-sm font-medium text-card-foreground/80 dark:text-card-foreground/70">
            Usage
          </CardTitle>
          <CardDescription class="mt-2 text-base text-card-foreground">
            Daily Active Sessions
          </CardDescription>
        </div>
        <CardAction>
          <Badge variant="outline">Live</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div class="flex items-end justify-between">
          <div class="space-y-1">
            <span class="text-4xl font-semibold tracking-tight text-card-foreground">3,482</span>
            <p class="text-sm text-muted-foreground">+12.4% vs previous cycle</p>
          </div>
          <Button size="sm">View report</Button>
        </div>
      </CardContent>
      <CardFooter>
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <span class="font-medium text-card-foreground/70">Next update</span>
          <Separator orientation="vertical" class="mx-2 h-4" />
          <span class="text-muted-foreground">In 15 minutes</span>
        </div>
      </CardFooter>
    </Card>
  );
}
