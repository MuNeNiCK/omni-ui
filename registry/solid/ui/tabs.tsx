import { splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import * as TabsPrimitive from "@kobalte/core/tabs";
import type { VariantProps } from "cva";
import { cva } from "@/registry/solid/lib/cva";
import { cn } from "@/registry/solid/lib/utils";

export type TabsProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TabsPrimitive.Root<T>
>;

function Tabs<T extends ValidComponent = "div">(props: TabsProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <TabsPrimitive.Root data-slot="tabs" class={cn("flex flex-col gap-2", local.class)} {...rest} />
  );
}

const tabsListVariants = cva({
  base: "inline-flex h-10 w-fit items-center justify-center border border-border/60 bg-muted/30",
  variants: {
    variant: {
      default: "",
      line: "",
      segmented: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type TabsListProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TabsPrimitive.List<T>
> &
  VariantProps<typeof tabsListVariants>;

function TabsList<T extends ValidComponent = "div">(props: TabsListProps<T>) {
  const [local, rest] = splitProps(props, ["class", "variant"]);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={local.variant ?? "default"}
      class={tabsListVariants({ variant: local.variant, class: local.class })}
      {...rest}
    />
  );
}

export type TabsTriggerProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof TabsPrimitive.Trigger<T>
>;

function TabsTrigger<T extends ValidComponent = "button">(props: TabsTriggerProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      class={cn(
        "inline-flex h-10 flex-1 items-center justify-center gap-2 px-3 text-xs font-medium text-muted-foreground/90 transition-[border,background,color,box-shadow] outline-none",
        "border border-transparent rounded-none",
        "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[selected]:border-foreground data-[selected]:bg-foreground data-[selected]:text-background",
        "disabled:pointer-events-none disabled:opacity-40",
        local.class,
      )}
      {...rest}
    />
  );
}

export type TabsContentProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TabsPrimitive.Content<T>
>;

function TabsContent<T extends ValidComponent = "div">(props: TabsContentProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      class={cn("flex-1 outline-none", local.class)}
      {...rest}
    />
  );
}

export type TabsIndicatorProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TabsPrimitive.Indicator<T>
>;

function TabsIndicator<T extends ValidComponent = "div">(props: TabsIndicatorProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      class={cn(
        "absolute inset-0 border border-transparent bg-background shadow-sm transition-[box-shadow,transform,width,height] duration-200",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  type TabsContentProps,
  type TabsIndicatorProps,
  type TabsListProps,
  type TabsProps,
  type TabsTriggerProps,
};
