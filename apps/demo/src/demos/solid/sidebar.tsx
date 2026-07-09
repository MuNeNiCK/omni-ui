import { createSignal } from "solid-js";
import { CheckCircle2, LayoutDashboard, Shield, Zap } from "lucide-solid";

import { Badge } from "@/registry/solid/ui/badge";
import { Button } from "@/registry/solid/ui/button";
import { Input } from "@/registry/solid/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/registry/solid/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/solid/ui/card";

export default function SidebarDemo() {
  const [active, setActive] = createSignal("overview");

  return (
    <div class="overflow-hidden rounded-none border border-border/70">
      <SidebarProvider defaultOpen class="relative flex min-h-[360px]">
        <Sidebar class="!absolute !inset-y-0 !left-0 !h-full bg-muted/20">
          <SidebarHeader class="gap-4">
            <Input
              data-sidebar="input"
              class="bg-background h-8 w-full shadow-none"
              aria-label="Search services"
              placeholder="Search services…"
            />
          </SidebarHeader>
          <SidebarContent class="overflow-hidden">
            <SidebarGroup>
              <SidebarGroupLabel>Overview</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActive("overview")}
                    isActive={active() === "overview"}
                  >
                    <LayoutDashboard class="size-4" />
                    Control plane
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActive("security")}
                    isActive={active() === "security"}
                  >
                    <Shield class="size-4" />
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
                    isActive={active() === "workflows"}
                  >
                    <Zap class="size-4" />
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
            <Button variant="ghost" class="w-full justify-start gap-3">
              <CheckCircle2 class="size-4" />
              Launch checks
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div class="relative flex w-full flex-1 flex-col bg-background/40 p-6">
          <div class="flex items-center justify-between">
            <SidebarTrigger />
            <Badge variant="outline">{active()}</Badge>
          </div>
          <Card class="mt-6 border-border/70">
            <CardHeader>
              <CardTitle class="text-sm font-medium text-muted-foreground">
                {active() === "overview"
                  ? "Control plane"
                  : active() === "security"
                    ? "Security posture"
                    : "Workflow automations"}
              </CardTitle>
              <CardDescription>
                Content area demonstrates how the inset pairs with the sidebar.
              </CardDescription>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              This panel inherits the frosted backdrop while the sidebar keeps its glass rail and
              markers.
            </CardContent>
          </Card>
        </div>
      </SidebarProvider>
    </div>
  );
}
