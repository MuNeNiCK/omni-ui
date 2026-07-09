import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/solid/ui/item";
import { Button } from "@/registry/solid/ui/button";

export default function ItemDemo() {
  return (
    <ItemGroup class="divide-y divide-border/60">
      <Item>
        <ItemMedia variant="icon">
          <span class="text-xs font-medium text-muted-foreground">API</span>
        </ItemMedia>
        <ItemContent>
          <ItemHeader>
            <ItemTitle>GATEWAY</ItemTitle>
            <ItemActions>
              <Button variant="muted" size="sm">
                VIEW LOGS
              </Button>
              <Button size="sm">DEPLOY</Button>
            </ItemActions>
          </ItemHeader>
          <ItemDescription>
            Handles routing for external traffic with global caching.
          </ItemDescription>
          <ItemFooter class="text-xs text-muted-foreground/80">
            Last deployment 42 minutes ago
          </ItemFooter>
        </ItemContent>
      </Item>

      <Item>
        <ItemMedia variant="icon">
          <span class="text-xs font-medium text-muted-foreground">DB</span>
        </ItemMedia>
        <ItemContent>
          <ItemHeader>
            <ItemTitle>ANALYTICS</ItemTitle>
            <ItemActions>
              <Button variant="muted" size="sm">
                INSPECT
              </Button>
            </ItemActions>
          </ItemHeader>
          <ItemDescription>Columnar store powering dashboards and custom queries.</ItemDescription>
        </ItemContent>
      </Item>

      <ItemSeparator />

      <Item variant="muted">
        <ItemContent>
          <ItemTitle>ARCHIVE</ItemTitle>
          <ItemDescription>
            Archived services retain the same layout for historical context.
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
