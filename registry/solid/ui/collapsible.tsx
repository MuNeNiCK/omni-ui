import { type ComponentProps } from "solid-js";
import * as CollapsiblePrimitive from "@kobalte/core/collapsible";

export type CollapsibleProps = ComponentProps<typeof CollapsiblePrimitive.Root>;

function Collapsible(props: CollapsibleProps) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export type CollapsibleTriggerProps = ComponentProps<typeof CollapsiblePrimitive.Trigger>;

function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
}

export type CollapsibleContentProps = ComponentProps<typeof CollapsiblePrimitive.Content>;

function CollapsibleContent(props: CollapsibleContentProps) {
  return <CollapsiblePrimitive.Content data-slot="collapsible-content" {...props} />;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
