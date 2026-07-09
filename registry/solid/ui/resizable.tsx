import type { ComponentProps, ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";

import type { DynamicProps, HandleProps, RootProps } from "@corvu/resizable";
import ResizablePrimitive from "@corvu/resizable";
import { GripVerticalIcon } from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";

type ResizablePanelGroupProps<T extends ValidComponent = "div"> = RootProps<T> & {
  class?: string;
  direction?: "horizontal" | "vertical";
};

export type ResizableProps<T extends ValidComponent = "div"> = ResizablePanelGroupProps<T>;

const Resizable = <T extends ValidComponent = "div">(props: DynamicProps<T, ResizableProps<T>>) => {
  const [, rest] = splitProps(props as ResizableProps, ["class", "direction"]);
  return (
    <ResizablePrimitive
      data-slot="resizable"
      orientation={props.direction}
      class={cn("flex size-full data-[orientation=vertical]:flex-col", props.class)}
      {...rest}
    />
  );
};

const ResizablePanelGroup = Resizable;

export type ResizablePanelProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof ResizablePrimitive.Panel<T>
> & {
  defaultSize?: number;
};

const ResizablePanel = <T extends ValidComponent = "div">(props: ResizablePanelProps<T>) => {
  const [, rest] = splitProps(props as ResizablePanelProps, ["defaultSize", "initialSize"]);
  const initialSize = () =>
    props.initialSize ?? (props.defaultSize == null ? undefined : props.defaultSize / 100);

  return (
    <ResizablePrimitive.Panel data-slot="resizable-panel" initialSize={initialSize()} {...rest} />
  );
};

export type ResizableHandleProps<T extends ValidComponent = "button"> = HandleProps<T> & {
  class?: string;
  withHandle?: boolean;
};

const ResizableHandle = <T extends ValidComponent = "button">(
  props: DynamicProps<T, ResizableHandleProps<T>>,
) => {
  const [, rest] = splitProps(props as ResizableHandleProps, ["class", "withHandle"]);
  return (
    <ResizablePrimitive.Handle
      data-slot="resizable-handle"
      class={cn(
        "bg-border focus-visible:ring-ring relative flex w-px shrink-0 items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90",
        props.class,
      )}
      {...rest}
    >
      <Show when={props.withHandle}>
        <div class="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon class="size-2.5" />
        </div>
      </Show>
    </ResizablePrimitive.Handle>
  );
};

export { Resizable, ResizablePanelGroup, ResizablePanel, ResizableHandle };
