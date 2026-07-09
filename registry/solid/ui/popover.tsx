import { mergeProps, splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import * as PopoverPrimitive from "@kobalte/core/popover";
import { cn } from "@/registry/solid/lib/utils";

const PopoverPortal = PopoverPrimitive.Portal;

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>;

function Popover(props: PopoverProps) {
  const merged = mergeProps({ gutter: 4 }, props);
  return <PopoverPrimitive.Root data-slot="popover" {...merged} />;
}

export type PopoverTriggerProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof PopoverPrimitive.Trigger<T>
>;

function PopoverTrigger<T extends ValidComponent = "button">(props: PopoverTriggerProps<T>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

export type PopoverContentProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof PopoverPrimitive.Content<T>
>;

function PopoverContent<T extends ValidComponent = "div">(props: PopoverContentProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <PopoverPrimitive.Content
      data-slot="popover-content"
      class={cn(
        "relative z-50 w-72 max-w-[calc(100vw-2rem)] px-4 py-4",
        "omni-glass-surface",
        "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 data-[closed]:animate-out data-[closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "outline-hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

export type PopoverHeaderProps = ComponentProps<"div">;

function PopoverHeader(props: PopoverHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="popover-header"
      class={cn("flex flex-col gap-1 text-sm", local.class)}
      {...rest}
    />
  );
}

export type PopoverTitleProps<T extends ValidComponent = "h2"> = ComponentProps<
  typeof PopoverPrimitive.Title<T>
>;

function PopoverTitle<T extends ValidComponent = "h2">(props: PopoverTitleProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      class={cn("font-medium", local.class)}
      {...rest}
    />
  );
}

export type PopoverDescriptionProps<T extends ValidComponent = "p"> = ComponentProps<
  typeof PopoverPrimitive.Description<T>
>;

function PopoverDescription<T extends ValidComponent = "p">(props: PopoverDescriptionProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      class={cn("text-muted-foreground", local.class)}
      {...rest}
    />
  );
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
  type PopoverContentProps,
  type PopoverDescriptionProps,
  type PopoverHeaderProps,
  type PopoverProps,
  type PopoverTitleProps,
  type PopoverTriggerProps,
};
