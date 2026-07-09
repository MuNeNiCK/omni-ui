import { Show, mergeProps, splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import type { DynamicProps } from "@corvu/drawer";
import DrawerPrimitive from "@corvu/drawer";

import { cn, omniMonoText } from "@/registry/solid/lib/utils";

export type DrawerProps = ComponentProps<typeof DrawerPrimitive>;

function Drawer(props: DrawerProps) {
  return <DrawerPrimitive data-slot="drawer" {...props} />;
}

export type DrawerTriggerProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof DrawerPrimitive.Trigger<T>
>;

function DrawerTrigger<T extends ValidComponent = "button">(props: DrawerTriggerProps<T>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal(props: ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

export type DrawerCloseProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof DrawerPrimitive.Close<T>
>;

function DrawerClose<T extends ValidComponent = "button">(props: DrawerCloseProps<T>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

type DrawerOverlayProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof DrawerPrimitive.Overlay<T>
> & {
  class?: string;
};

const DrawerOverlay = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerOverlayProps<T>>,
) => {
  const [, rest] = splitProps(props as DrawerOverlayProps, ["class"]);
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      class={cn(
        "omni-glass-overlay",
        "data-[transitioning]:transition-opacity data-[transitioning]:duration-300",
        props.class,
      )}
      {...rest}
    />
  );
};

export type DrawerContentProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof DrawerPrimitive.Content<T>
> & {
  withHandle?: boolean;
};

const DrawerContent = <T extends ValidComponent = "div">(props: DrawerContentProps<T>) => {
  const drawer = DrawerPrimitive.useContext();
  const side = () => drawer.side();
  const merged = mergeProps({ withHandle: side() === "bottom" }, props as DrawerContentProps);
  const [local, rest] = splitProps(merged, ["class", "children", "withHandle"]);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        data-side={side()}
        data-vaul-drawer-direction={side()}
        class={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col",
          "omni-glass-surface-strong",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:mb-24 data-[side=top]:max-h-[80vh] data-[side=top]:border-b",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:mt-24 data-[side=bottom]:max-h-[80vh] data-[side=bottom]:border-t",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md data-[side=right]:border-l",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-full data-[side=left]:sm:max-w-md data-[side=left]:border-r",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-md data-[vaul-drawer-direction=right]:border-l",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:sm:max-w-md data-[vaul-drawer-direction=left]:border-r",
          "data-[transitioning]:transition-transform data-[transitioning]:duration-300 md:select-none",
          local.class,
        )}
        {...rest}
      >
        <Show when={local.withHandle}>
          <div class="mx-auto mt-4 hidden h-1.5 w-28 bg-foreground/20 group-data-[side=bottom]/drawer-content:block group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        </Show>
        {local.children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
};

export type DrawerHeaderProps = ComponentProps<"div">;

function DrawerHeader(props: DrawerHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="drawer-header"
      class={cn("flex flex-col gap-2 border-b border-border/60 p-4", local.class)}
      {...rest}
    />
  );
}

export type DrawerFooterProps = ComponentProps<"div">;

function DrawerFooter(props: DrawerFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="drawer-footer"
      class={cn("mt-auto flex flex-col gap-2 border-t border-border/60 p-4", local.class)}
      {...rest}
    />
  );
}

export type DrawerLabelProps<T extends ValidComponent = "h2"> = ComponentProps<
  typeof DrawerPrimitive.Label<T>
>;

const DrawerLabel = <T extends ValidComponent = "h2">(
  props: DynamicProps<T, DrawerLabelProps<T>>,
) => {
  const [, rest] = splitProps(props as DrawerLabelProps, ["class"]);
  return (
    <DrawerPrimitive.Label
      data-slot="drawer-label"
      class={cn(omniMonoText.section, "text-muted-foreground", props.class)}
      {...rest}
    />
  );
};

export type DrawerTitleProps<T extends ValidComponent = "h2"> = ComponentProps<
  typeof DrawerPrimitive.Label<T>
>;

const DrawerTitle = <T extends ValidComponent = "h2">(
  props: DynamicProps<T, DrawerTitleProps<T>>,
) => {
  const [, rest] = splitProps(props as DrawerTitleProps, ["class"]);
  return (
    <DrawerPrimitive.Label
      data-slot="drawer-title"
      class={cn(omniMonoText.section, "text-muted-foreground", props.class)}
      {...rest}
    />
  );
};

export type DrawerDescriptionProps<T extends ValidComponent = "p"> = ComponentProps<
  typeof DrawerPrimitive.Description<T>
>;

const DrawerDescription = <T extends ValidComponent = "p">(
  props: DynamicProps<T, DrawerDescriptionProps<T>>,
) => {
  const [, rest] = splitProps(props as DrawerDescriptionProps, ["class"]);
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      class={cn("text-sm text-foreground/80", props.class)}
      {...rest}
    />
  );
};

export {
  Drawer,
  DrawerPortal,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerLabel,
  DrawerTitle,
  DrawerDescription,
  type DrawerCloseProps,
  type DrawerContentProps,
  type DrawerDescriptionProps,
  type DrawerFooterProps,
  type DrawerHeaderProps,
  type DrawerLabelProps,
  type DrawerProps,
  type DrawerTitleProps,
  type DrawerTriggerProps,
};
