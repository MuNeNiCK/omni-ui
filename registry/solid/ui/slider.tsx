import { createMemo, For, splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import * as SliderPrimitive from "@kobalte/core/slider";
import { cn } from "@/registry/solid/lib/utils";

export type SliderProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SliderPrimitive.Root<T>
>;

function Slider<T extends ValidComponent = "div">(props: SliderProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children", "defaultValue", "value"]);
  const thumbCount = createMemo(() => {
    const val = local.value ?? local.defaultValue;
    return Array.isArray(val) ? val.length : 1;
  });
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={local.defaultValue}
      value={local.value}
      class={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-40 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        local.class,
      )}
      {...rest}
    >
      {local.children ?? (
        <>
          <SliderTrack>
            <SliderFill />
          </SliderTrack>
          <For each={Array.from({ length: thumbCount() })}>{() => <SliderThumb />}</For>
        </>
      )}
    </SliderPrimitive.Root>
  );
}

export type SliderTrackProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SliderPrimitive.Track<T>
>;

function SliderTrack<T extends ValidComponent = "div">(props: SliderTrackProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      class={cn(
        "relative grow overflow-hidden border border-border/60 bg-muted/50 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        local.class,
      )}
      {...rest}
    />
  );
}

export type SliderFillProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SliderPrimitive.Fill<T>
>;

function SliderFill<T extends ValidComponent = "div">(props: SliderFillProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SliderPrimitive.Fill
      data-slot="slider-fill"
      class={cn(
        "absolute bg-foreground data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        local.class,
      )}
      {...rest}
    />
  );
}

export type SliderThumbProps<T extends ValidComponent = "span"> = ComponentProps<
  typeof SliderPrimitive.Thumb<T>
>;

function SliderThumb<T extends ValidComponent = "span">(props: SliderThumbProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      class={cn(
        "block size-4 shrink-0 border border-border/60 bg-foreground text-background transition-[border,background,transform] outline-none hover:bg-foreground focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-40",
        local.class,
      )}
      {...rest}
    >
      {local.children ?? <SliderPrimitive.Input />}
    </SliderPrimitive.Thumb>
  );
}

export type SliderGroupProps = ComponentProps<"div">;

function SliderGroup(props: SliderGroupProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="slider-group"
      class={cn("flex w-full justify-between", local.class)}
      {...rest}
    />
  );
}

export type SliderLabelProps<T extends ValidComponent = "label"> = ComponentProps<
  typeof SliderPrimitive.Label<T>
>;

function SliderLabel<T extends ValidComponent = "label">(props: SliderLabelProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      class={cn("text-sm font-medium select-none", local.class)}
      {...rest}
    />
  );
}

export type SliderValueLabelProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SliderPrimitive.ValueLabel<T>
>;

function SliderValueLabel<T extends ValidComponent = "div">(props: SliderValueLabelProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SliderPrimitive.ValueLabel
      data-slot="slider-value-label"
      class={cn("text-sm font-medium select-none", local.class)}
      {...rest}
    />
  );
}

export type SliderDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SliderPrimitive.Description<T>
>;

function SliderDescription<T extends ValidComponent = "div">(props: SliderDescriptionProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SliderPrimitive.Description
      data-slot="slider-description"
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
}

export type SliderErrorMessageProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SliderPrimitive.ErrorMessage<T>
>;

function SliderErrorMessage<T extends ValidComponent = "div">(props: SliderErrorMessageProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SliderPrimitive.ErrorMessage
      data-slot="slider-error-message"
      class={cn("text-sm text-destructive", local.class)}
      {...rest}
    />
  );
}

export {
  Slider,
  SliderDescription,
  SliderErrorMessage,
  SliderFill,
  SliderGroup,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
  type SliderDescriptionProps,
  type SliderErrorMessageProps,
  type SliderFillProps,
  type SliderGroupProps,
  type SliderLabelProps,
  type SliderProps,
  type SliderThumbProps,
  type SliderTrackProps,
  type SliderValueLabelProps,
};
