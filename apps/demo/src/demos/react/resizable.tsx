import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/react/ui/resizable";

export default function ResizableDemo() {
  return (
    <div className="h-[320px]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} className="border border-border/60 bg-muted/30 p-4">
          <h3 className="text-xs font-medium text-muted-foreground">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>control-plane</li>
            <li>ingress-gateway</li>
            <li>billing</li>
            <li>reports</li>
          </ul>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65} className="flex flex-col">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} className="border border-border/60 bg-muted/30 p-4">
              <h3 className="text-xs font-medium text-muted-foreground">Live metrics</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Stream duration: 14m 22s -- Latency steady at 162ms.
              </p>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={40}
              className="border border-border/60 bg-background/30 p-4"
            >
              <h3 className="text-xs font-medium text-muted-foreground">Log tail</h3>
              <pre className="mt-3 h-full overflow-auto text-xs leading-relaxed text-muted-foreground/80">
                {`02:11:01 edge-cache rewrite enabled
02:11:03 ingress latency 164ms (target 180ms)
02:11:10 billing job completed (duration 48s)`}
              </pre>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
