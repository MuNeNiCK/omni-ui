import {
  createContext,
  splitProps,
  useContext,
  type ComponentProps,
  type ParentProps,
} from "solid-js";
import * as TooltipPrimitive from "@kobalte/core/tooltip";

import { cn } from "@/registry/solid/lib/utils";

type TooltipProviderContextValue = {
  delayDuration: number;
  skipDelayDuration?: number;
};

const TooltipProviderContext = createContext<TooltipProviderContextValue>();

function TooltipProvider(
  props: ParentProps<{
    delayDuration?: number;
    skipDelayDuration?: number;
  }>,
) {
  return (
    <TooltipProviderContext.Provider
      value={{
        delayDuration: props.delayDuration ?? 0,
        skipDelayDuration: props.skipDelayDuration,
      }}
    >
      {props.children}
    </TooltipProviderContext.Provider>
  );
}

function Tooltip(props: ComponentProps<typeof TooltipPrimitive.Root>) {
  const provider = useContext(TooltipProviderContext);
  const [local, rest] = splitProps(props, ["openDelay", "skipDelayDuration"]);
  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      openDelay={local.openDelay ?? provider?.delayDuration ?? 0}
      skipDelayDuration={local.skipDelayDuration ?? provider?.skipDelayDuration}
      {...rest}
    />
  );
}

function TooltipTrigger(props: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent(
  props: ComponentProps<typeof TooltipPrimitive.Content> & {
    sideOffset?: number;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children", "sideOffset"]);
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        gutter={local.sideOffset ?? 0}
        class={cn(
          "relative z-50 w-fit border border-border/60 bg-foreground text-background shadow-[var(--glass-shadow-outline)]",
          "animate-in fade-in-0 zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "rounded-none px-3 py-1.5 text-[11px] uppercase tracking-[0.28em]",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <TooltipPrimitive.Arrow class="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
