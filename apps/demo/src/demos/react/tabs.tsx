import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/react/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function TabsDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Overview Tabs</CardTitle>
        <CardDescription>
          Tabs sit directly on the same surface as cards for a seamless look.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Tabs defaultValue="usage" className="w-full">
          <TabsList>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="latency">Latency</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          <div className="border border-border/60 bg-muted/40 p-4">
            <TabsContent value="usage">
              <p className="text-sm text-muted-foreground">
                Requests over the last 24 hours peaked at 1.2M/min.
              </p>
            </TabsContent>
            <TabsContent value="latency">
              <p className="text-sm text-muted-foreground">
                Median latency sits at 128ms across all regions.
              </p>
            </TabsContent>
            <TabsContent value="errors">
              <p className="text-sm text-muted-foreground">
                Error rate remains below 0.08% with automated retries.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
