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
} from "@/registry/react/ui/item";
import { Button } from "@/registry/react/ui/button";

export default function ItemDemo() {
  return (
    <ItemGroup className="divide-y divide-border/60">
      <Item>
        <ItemMedia variant="icon">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            API
          </span>
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
          <ItemFooter className="text-xs text-muted-foreground/80">
            Last deployment 42 minutes ago
          </ItemFooter>
        </ItemContent>
      </Item>

      <Item>
        <ItemMedia variant="icon">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            DB
          </span>
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
