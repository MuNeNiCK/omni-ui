import { useState } from "react";
import { CheckCircle2, LayoutDashboard, Shield, Zap } from "lucide-react";

import { Badge } from "@/registry/react/ui/badge";
import { Button } from "@/registry/react/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/registry/react/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function SidebarDemo() {
  const [active, setActive] = useState("overview");

  return (
    <div className="overflow-hidden rounded-none border border-border/70">
      <SidebarProvider defaultOpen className="relative flex min-h-[360px]">
        <Sidebar className="!absolute !inset-y-0 !left-0 !h-full bg-muted/20">
          <SidebarHeader className="gap-4">
            <SidebarInput aria-label="Search services" placeholder="Search services…" />
          </SidebarHeader>
          <SidebarContent className="overflow-hidden">
            <SidebarGroup>
              <SidebarGroupLabel>Overview</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActive("overview")}
                    isActive={active === "overview"}
                  >
                    <LayoutDashboard className="size-4" />
                    Control plane
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActive("security")}
                    isActive={active === "security"}
                  >
                    <Shield className="size-4" />
                    Security
                    <SidebarMenuBadge>2</SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Automation</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActive("workflows")}
                    isActive={active === "workflows"}
                  >
                    <Zap className="size-4" />
                    Workflows
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <CheckCircle2 className="size-4" />
              Launch checks
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div className="relative flex w-full flex-1 flex-col bg-background/40 p-6">
          <div className="flex items-center justify-between">
            <SidebarTrigger />
            <Badge variant="outline">{active}</Badge>
          </div>
          <Card className="mt-6 border-border/70">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {active === "overview"
                  ? "Control plane"
                  : active === "security"
                    ? "Security posture"
                    : "Workflow automations"}
              </CardTitle>
              <CardDescription>
                Content area demonstrates how the inset pairs with the sidebar.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              This panel inherits the frosted backdrop while the sidebar keeps its glass rail and
              markers.
            </CardContent>
          </Card>
        </div>
      </SidebarProvider>
    </div>
  );
}
