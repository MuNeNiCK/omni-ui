import { splitProps, type ComponentProps, type JSX } from "solid-js";
import * as DialogPrimitive from "@kobalte/core/dialog";
import { XIcon } from "lucide-solid";

import {
  glassCloseButtonClass,
  glassOverlayBackdropClass,
  glassSurfaceStrongClass,
} from "@/registry/solid/lib/glass";
import { cn, omniMonoText } from "@/registry/solid/lib/utils";

function Sheet(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: ComponentProps<typeof DialogPrimitive.CloseButton>) {
  return <DialogPrimitive.CloseButton data-slot="sheet-close" {...props} />;
}

function SheetPortal(props: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay(props: ComponentProps<typeof DialogPrimitive.Overlay>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      class={cn(
        glassOverlayBackdropClass,
        "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[closed]:animate-out data-[closed]:fade-out-0",
        local.class,
      )}
      {...rest}
    />
  );
}

function SheetContent(
  props: ComponentProps<typeof DialogPrimitive.Content> & {
    class?: string;
    side?: "top" | "right" | "bottom" | "left";
  },
) {
  const [local, rest] = splitProps(props, ["class", "children", "side"]);
  const side = () => local.side ?? "right";
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        class={cn(
          "fixed z-50 flex flex-col gap-4 transition ease-in-out data-[closed]:duration-300 data-[expanded]:duration-500",
          glassSurfaceStrongClass,
          side() === "right" &&
            "data-[closed]:slide-out-to-right data-[expanded]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side() === "left" &&
            "data-[closed]:slide-out-to-left data-[expanded]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side() === "top" &&
            "data-[closed]:slide-out-to-top data-[expanded]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side() === "bottom" &&
            "data-[closed]:slide-out-to-bottom data-[expanded]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <DialogPrimitive.CloseButton class={glassCloseButtonClass}>
          <XIcon class="size-4" />
          <span class="sr-only">Close</span>
        </DialogPrimitive.CloseButton>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sheet-header"
      class={cn("flex flex-col gap-2 border-b border-border/60 p-4", local.class)}
      {...rest}
    />
  );
}

function SheetFooter(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sheet-footer"
      class={cn("mt-auto flex flex-col gap-2 border-t border-border/60 p-4", local.class)}
      {...rest}
    />
  );
}

function SheetTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      class={cn(omniMonoText.section, "text-muted-foreground", local.class)}
      {...rest}
    />
  );
}

function SheetDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      class={cn("text-sm text-foreground/80", local.class)}
      {...rest}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
