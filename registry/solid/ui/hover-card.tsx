import { splitProps, type ComponentProps } from "solid-js";
import * as HoverCardPrimitive from "@kobalte/core/hover-card";
import { glassSurfaceClass } from "@/registry/solid/lib/glass";
import { cn } from "@/registry/solid/lib/utils";

function HoverCard(props: ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger(props: ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

function HoverCardContent(props: ComponentProps<typeof HoverCardPrimitive.Content>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        class={cn(
          "relative z-50 w-64 px-4 py-4",
          glassSurfaceClass,
          "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 data-[closed]:animate-out data-[closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "outline-hidden",
          local.class,
        )}
        {...rest}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
