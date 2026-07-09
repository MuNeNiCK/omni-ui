import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/react/ui/navigation-menu";

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>PRODUCTS</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-3 sm:w-[480px] sm:grid-cols-2">
              <NavigationMenuLink
                href="/products/control-plane"
                className="border border-border/60 bg-muted/40 p-3"
              >
                <div className="text-sm font-medium text-foreground">Control Plane</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Manage clusters, roll out deployments, and inspect environment health.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/products/observability"
                className="border border-border/60 bg-muted/40 p-3"
              >
                <div className="text-sm font-medium text-foreground">Observability</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Dashboards, alert routing, and log tailing across all services.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>DOCS</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-3 sm:w-[320px]">
              <NavigationMenuLink
                href="/docs/api"
                className="border border-border/60 bg-muted/40 p-3"
              >
                <div className="text-sm font-medium text-foreground">API Reference</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  REST, GraphQL, and CLI endpoints for the Omni platform.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/docs/guides"
                className="border border-border/60 bg-muted/40 p-3"
              >
                <div className="text-sm font-medium text-foreground">Guides</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Migration playbooks and best practices for operators.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
