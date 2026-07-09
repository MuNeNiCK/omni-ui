import { splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import * as HoverCardPrimitive from "@kobalte/core/hover-card";
import { cn } from "@/registry/solid/lib/utils";

const HoverCardPortal = HoverCardPrimitive.Portal;

export type HoverCardProps = ComponentProps<typeof HoverCardPrimitive.Root>;

function HoverCard(props: HoverCardProps) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

export type HoverCardTriggerProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof HoverCardPrimitive.Trigger<T>
>;

function HoverCardTrigger<T extends ValidComponent = "button">(props: HoverCardTriggerProps<T>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

export type HoverCardContentProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof HoverCardPrimitive.Content<T>
>;

function HoverCardContent<T extends ValidComponent = "div">(props: HoverCardContentProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <HoverCardPrimitive.Content
      data-slot="hover-card-content"
      class={cn(
        "relative z-50 w-64 px-4 py-4",
        "omni-glass-surface",
        "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 data-[closed]:animate-out data-[closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "outline-hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
  type HoverCardContentProps,
  type HoverCardProps,
  type HoverCardTriggerProps,
};
